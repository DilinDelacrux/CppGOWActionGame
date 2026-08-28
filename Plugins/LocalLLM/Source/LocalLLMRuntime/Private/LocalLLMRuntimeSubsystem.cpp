#include "LocalLLMRuntimeSubsystem.h"

#include "LocalLLMSettings.h"
#include "Dom/JsonObject.h"
#include "HAL/PlatformProcess.h"
#include "HttpModule.h"
#include "Interfaces/IHttpResponse.h"
#include "Interfaces/IPluginManager.h"
#include "Misc/Paths.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"
#include "Serialization/JsonWriter.h"
#include "TimerManager.h"

namespace LocalLLMRuntime
{
	static FString ToAbsolutePath(const FString& Path, const FString& BasePath)
	{
		return FPaths::ConvertRelativePathToFull(FPaths::IsRelative(Path) ? FPaths::Combine(BasePath, Path) : Path);
	}
}

void ULocalLLMRuntimeSubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
	Super::Initialize(Collection);
}

void ULocalLLMRuntimeSubsystem::Deinitialize()
{
	StopServer();
	Super::Deinitialize();
}

bool ULocalLLMRuntimeSubsystem::ShouldCreateSubsystem(UObject* Outer) const
{
	return !CastChecked<UGameInstance>(Outer)->IsDedicatedServerInstance();
}

bool ULocalLLMRuntimeSubsystem::StartServer()
{
	if (ServerState == ELocalLLMServerState::Ready || ServerState == ELocalLLMServerState::Starting)
	{
		return true;
	}

	const FString ExecutablePath = ResolveServerExecutablePath();
	const FString ModelPath = ResolveModelPath();
	if (!FPaths::FileExists(ExecutablePath) || !FPaths::FileExists(ModelPath))
	{
		UE_LOG(LogTemp, Error, TEXT("Local LLM runtime is missing. Server: %s, Model: %s"), *ExecutablePath, *ModelPath);
		ServerState = ELocalLLMServerState::Failed;
		return false;
	}

	const ULocalLLMSettings* Settings = GetDefault<ULocalLLMSettings>();
	const FString Arguments = FString::Printf(TEXT("--model \"%s\" --host 127.0.0.1 --port %d --ctx-size %d --n-gpu-layers %d --jinja"), *ModelPath, Settings->Port, Settings->ContextSize, Settings->GpuLayers);
	ServerProcess = FPlatformProcess::CreateProc(*ExecutablePath, *Arguments, true, false, false, nullptr, 0, *FPaths::GetPath(ExecutablePath), nullptr);
	if (!ServerProcess.IsValid())
	{
		UE_LOG(LogTemp, Error, TEXT("Unable to start llama.cpp server."));
		ServerState = ELocalLLMServerState::Failed;
		return false;
	}

	ServerState = ELocalLLMServerState::Starting;
	StartupDeadlineSeconds = FPlatformTime::Seconds() + (Settings->StartupTimeoutMs / 1000.0);
	GetWorld()->GetTimerManager().SetTimer(HealthTimer, this, &ThisClass::PollHealth, 0.25f, true);
	return true;
}

void ULocalLLMRuntimeSubsystem::StopServer()
{
	if (GetWorld())
	{
		GetWorld()->GetTimerManager().ClearTimer(HealthTimer);
	}

	if (ServerProcess.IsValid())
	{
		if (FPlatformProcess::IsProcRunning(ServerProcess))
		{
			FPlatformProcess::TerminateProc(ServerProcess, true);
		}
		FPlatformProcess::CloseProc(ServerProcess);
		ServerProcess.Reset();
	}
	ServerState = ELocalLLMServerState::Stopped;
}

void ULocalLLMRuntimeSubsystem::GenerateChat(const FLocalLLMChatRequest& Request, FLocalLLMChatCompleted Completed)
{
	if (Request.UserPrompt.TrimStartAndEnd().IsEmpty())
	{
		CompleteChat(Completed, { false, TEXT(""), TEXT("User Prompt cannot be empty.") });
		return;
	}
	if (ServerState != ELocalLLMServerState::Ready)
	{
		CompleteChat(Completed, { false, TEXT(""), TEXT("Local LLM server is not ready. Call StartServer and wait for Ready.") });
		return;
	}

	const ULocalLLMSettings* Settings = GetDefault<ULocalLLMSettings>();
	TArray<TSharedPtr<FJsonValue>> Messages;
	if (!Request.SystemPrompt.TrimStartAndEnd().IsEmpty())
	{
		TSharedRef<FJsonObject> SystemMessage = MakeShared<FJsonObject>();
		SystemMessage->SetStringField(TEXT("role"), TEXT("system"));
		SystemMessage->SetStringField(TEXT("content"), Request.SystemPrompt);
		Messages.Add(MakeShared<FJsonValueObject>(SystemMessage));
	}
	TSharedRef<FJsonObject> UserMessage = MakeShared<FJsonObject>();
	UserMessage->SetStringField(TEXT("role"), TEXT("user"));
	UserMessage->SetStringField(TEXT("content"), Request.bDisableThinking ? Request.UserPrompt + TEXT("\n/no_think") : Request.UserPrompt);
	Messages.Add(MakeShared<FJsonValueObject>(UserMessage));

	TSharedRef<FJsonObject> Body = MakeShared<FJsonObject>();
	Body->SetStringField(TEXT("model"), TEXT("local-town-dialogue"));
	Body->SetArrayField(TEXT("messages"), Messages);
	Body->SetNumberField(TEXT("max_tokens"), Request.MaxTokens > 0 ? Request.MaxTokens : Settings->DefaultMaxTokens);
	Body->SetNumberField(TEXT("temperature"), Request.Temperature >= 0.0f ? Request.Temperature : Settings->DefaultTemperature);
	Body->SetBoolField(TEXT("stream"), false);

	FString Json;
	const TSharedRef<TJsonWriter<>> Writer = TJsonWriterFactory<>::Create(&Json);
	FJsonSerializer::Serialize(Body, Writer);

	TSharedRef<IHttpRequest> HttpRequest = FHttpModule::Get().CreateRequest();
	HttpRequest->SetURL(GetBaseUrl() + TEXT("/v1/chat/completions"));
	HttpRequest->SetVerb(TEXT("POST"));
	HttpRequest->SetHeader(TEXT("Content-Type"), TEXT("application/json"));
	HttpRequest->SetContentAsString(Json);
	HttpRequest->OnProcessRequestComplete().BindWeakLambda(this, [this, Completed](FHttpRequestPtr, FHttpResponsePtr Response, bool bConnectedSuccessfully)
	{
		FLocalLLMChatResult Result;
		if (!bConnectedSuccessfully || !Response.IsValid())
		{
			Result.Error = TEXT("Failed to reach the local llama.cpp server.");
		}
		else if (Response->GetResponseCode() < 200 || Response->GetResponseCode() >= 300)
		{
			Result.Error = FString::Printf(TEXT("llama.cpp returned HTTP %d: %s"), Response->GetResponseCode(), *Response->GetContentAsString());
		}
		else
		{
			TSharedPtr<FJsonObject> Root;
			const TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(Response->GetContentAsString());
			const TArray<TSharedPtr<FJsonValue>>* Choices = nullptr;
			if (FJsonSerializer::Deserialize(Reader, Root) && Root.IsValid() && Root->TryGetArrayField(TEXT("choices"), Choices) && Choices && Choices->Num() > 0)
			{
				const TSharedPtr<FJsonObject> Choice = (*Choices)[0]->AsObject();
				if (Choice.IsValid() && Choice->HasTypedField<EJson::Object>(TEXT("message")))
				{
					const TSharedPtr<FJsonObject> Message = Choice->GetObjectField(TEXT("message"));
					if (Message.IsValid() && Message->TryGetStringField(TEXT("content"), Result.Text) && !Result.Text.IsEmpty())
					{
						Result.bSuccess = true;
					}
				}
			}
			if (!Result.bSuccess)
			{
				Result.Error = TEXT("llama.cpp returned a response without choices[0].message.content.");
			}
		}
		CompleteChat(Completed, Result);
	});
	HttpRequest->ProcessRequest();
}

FString ULocalLLMRuntimeSubsystem::ResolveServerExecutablePath() const
{
	const ULocalLLMSettings* Settings = GetDefault<ULocalLLMSettings>();
	const TSharedPtr<IPlugin> Plugin = IPluginManager::Get().FindPlugin(TEXT("LocalLLM"));
	const FString PluginPath = Plugin.IsValid() ? Plugin->GetBaseDir() : FPaths::ProjectPluginsDir();
	const FString ConfiguredPath = Settings->ServerExecutablePath.FilePath.IsEmpty() ? TEXT("ThirdParty/llama.cpp/Win64/llama-server.exe") : Settings->ServerExecutablePath.FilePath;
	const FString PluginExecutablePath = LocalLLMRuntime::ToAbsolutePath(ConfiguredPath, PluginPath);
	if (FPaths::FileExists(PluginExecutablePath))
	{
		return PluginExecutablePath;
	}

	return FPaths::Combine(FPlatformProcess::BaseDir(), FPaths::GetCleanFilename(ConfiguredPath));
}

FString ULocalLLMRuntimeSubsystem::ResolveModelPath() const
{
	const FString ConfiguredPath = GetDefault<ULocalLLMSettings>()->ModelFilePath.FilePath;
	return LocalLLMRuntime::ToAbsolutePath(ConfiguredPath, FPaths::ProjectDir());
}

FString ULocalLLMRuntimeSubsystem::GetBaseUrl() const
{
	return FString::Printf(TEXT("http://127.0.0.1:%d"), GetDefault<ULocalLLMSettings>()->Port);
}

void ULocalLLMRuntimeSubsystem::PollHealth()
{
	if (!ServerProcess.IsValid() || !FPlatformProcess::IsProcRunning(ServerProcess))
	{
		GetWorld()->GetTimerManager().ClearTimer(HealthTimer);
		ServerState = ELocalLLMServerState::Failed;
		UE_LOG(LogTemp, Error, TEXT("llama.cpp server exited during startup."));
		return;
	}
	if (FPlatformTime::Seconds() >= StartupDeadlineSeconds)
	{
		GetWorld()->GetTimerManager().ClearTimer(HealthTimer);
		ServerState = ELocalLLMServerState::Failed;
		UE_LOG(LogTemp, Error, TEXT("Timed out waiting for llama.cpp server health check."));
		return;
	}

	TSharedRef<IHttpRequest> Request = FHttpModule::Get().CreateRequest();
	Request->SetURL(GetBaseUrl() + TEXT("/health"));
	Request->SetVerb(TEXT("GET"));
	Request->OnProcessRequestComplete().BindWeakLambda(this, [this](FHttpRequestPtr, FHttpResponsePtr Response, bool bSucceeded)
	{
		if (bSucceeded && Response.IsValid() && Response->GetResponseCode() == 200)
		{
			GetWorld()->GetTimerManager().ClearTimer(HealthTimer);
			ServerState = ELocalLLMServerState::Ready;
			UE_LOG(LogTemp, Log, TEXT("Local llama.cpp server is ready."));
		}
	});
	Request->ProcessRequest();
}

void ULocalLLMRuntimeSubsystem::CompleteChat(const FLocalLLMChatCompleted& Completed, const FLocalLLMChatResult& Result) const
{
	if (Completed.IsBound())
	{
		Completed.Execute(Result);
	}
}
