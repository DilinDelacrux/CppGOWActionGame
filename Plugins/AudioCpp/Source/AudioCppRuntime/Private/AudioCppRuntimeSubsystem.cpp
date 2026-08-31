#include "AudioCppRuntimeSubsystem.h"

#include "AudioCppSettings.h"
#include "Dom/JsonObject.h"
#include "HAL/FileManager.h"
#include "HAL/PlatformProcess.h"
#include "HAL/PlatformTime.h"
#include "HttpModule.h"
#include "Interfaces/IHttpResponse.h"
#include "JsonObjectConverter.h"
#include "Kismet/GameplayStatics.h"
#include "Misc/DateTime.h"
#include "Misc/FileHelper.h"
#include "Misc/Guid.h"
#include "Misc/Paths.h"
#include "Serialization/JsonSerializer.h"
#include "Serialization/JsonWriter.h"
#include "TimerManager.h"
#include "Interfaces/IPluginManager.h"

namespace AudioCppRuntime
{
	static FString ToAbsolutePath(const FString& Path, const FString& BasePath)
	{
		return FPaths::ConvertRelativePathToFull(FPaths::IsRelative(Path) ? FPaths::Combine(BasePath, Path) : Path);
	}
}

void UAudioCppRuntimeSubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
	Super::Initialize(Collection);
}

void UAudioCppRuntimeSubsystem::Deinitialize()
{
	StopServer();
	Super::Deinitialize();
}

bool UAudioCppRuntimeSubsystem::ShouldCreateSubsystem(UObject* Outer) const
{
	return !CastChecked<UGameInstance>(Outer)->IsDedicatedServerInstance();
}

bool UAudioCppRuntimeSubsystem::StartServer()
{
	if (ServerState == EAudioCppServerState::Ready || ServerState == EAudioCppServerState::Starting)
	{
		return true;
	}

	FString ConfigPath;
	FString Error;
	if (!WriteServerConfig(ConfigPath, Error))
	{
		UE_LOG(LogTemp, Error, TEXT("Audio.cpp server configuration failed: %s"), *Error);
		ServerState = EAudioCppServerState::Failed;
		return false;
	}

	const FString ExecutablePath = ResolveServerExecutablePath();
	if (!FPaths::FileExists(ExecutablePath))
	{
		UE_LOG(LogTemp, Error, TEXT("Audio.cpp server executable is missing: %s"), *ExecutablePath);
		ServerState = EAudioCppServerState::Failed;
		return false;
	}

	UE_LOG(LogTemp, Log, TEXT("Starting audio.cpp server: %s --config \"%s\" --no-ui"), *ExecutablePath, *ConfigPath);
	ServerProcess = FPlatformProcess::CreateProc(*ExecutablePath, *FString::Printf(TEXT("--config \"%s\" --no-ui"), *ConfigPath), true, false, false, nullptr, 0, *FPaths::GetPath(ExecutablePath), nullptr);
	if (!ServerProcess.IsValid())
	{
		UE_LOG(LogTemp, Error, TEXT("Unable to start audio.cpp server."));
		ServerState = EAudioCppServerState::Failed;
		return false;
	}

	const UAudioCppSettings* Settings = GetDefault<UAudioCppSettings>();
	ServerState = EAudioCppServerState::Starting;
	StartupDeadlineSeconds = FPlatformTime::Seconds() + (Settings->StartupTimeoutMs / 1000.0);
	GetWorld()->GetTimerManager().SetTimer(HealthTimer, this, &ThisClass::PollHealth, 0.25f, true);
	return true;
}

void UAudioCppRuntimeSubsystem::StopServer()
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
	ServerState = EAudioCppServerState::Stopped;
}

void UAudioCppRuntimeSubsystem::SynthesizeSpeech(const FAudioCppSpeechRequest& Request, FAudioCppSpeechCompleted Completed)
{
	if (Request.Text.TrimStartAndEnd().IsEmpty())
	{
		CompleteSpeech(Completed, { false, TEXT(""), TEXT("Text cannot be empty.") });
		return;
	}
	if (ServerState != EAudioCppServerState::Ready)
	{
		CompleteSpeech(Completed, { false, TEXT(""), TEXT("Local audio.cpp server is not ready. Call StartServer and wait for Ready.") });
		return;
	}

	const UAudioCppSettings* Settings = GetDefault<UAudioCppSettings>();
	TSharedRef<FJsonObject> Body = MakeShared<FJsonObject>();
	Body->SetStringField(TEXT("model"), Settings->ModelId);
	Body->SetStringField(TEXT("input"), Request.Text);
	Body->SetNumberField(TEXT("max_tokens"), Request.MaxTokens);
	if (!Request.Voice.IsEmpty()) Body->SetStringField(TEXT("voice"), Request.Voice);
	if (!Request.Speaker.IsEmpty())
	{
		TSharedRef<FJsonObject> Options = MakeShared<FJsonObject>();
		Options->SetStringField(TEXT("speaker"), Request.Speaker);
		Body->SetObjectField(TEXT("options"), Options);
	}
	if (Request.Seed >= 0) Body->SetNumberField(TEXT("seed"), Request.Seed);

	FString Json;
	const TSharedRef<TJsonWriter<>> Writer = TJsonWriterFactory<>::Create(&Json);
	FJsonSerializer::Serialize(Body, Writer);

	TSharedRef<IHttpRequest> HttpRequest = FHttpModule::Get().CreateRequest();
	HttpRequest->SetURL(GetBaseUrl() + TEXT("/v1/audio/speech"));
	HttpRequest->SetVerb(TEXT("POST"));
	HttpRequest->SetHeader(TEXT("Content-Type"), TEXT("application/json"));
	HttpRequest->SetContentAsString(Json);
	const FString RequestId = FGuid::NewGuid().ToString(EGuidFormats::Digits);
	const double RequestStartedAt = FPlatformTime::Seconds();
	UE_LOG(LogTemp, Display, TEXT("TTS generation started at %s (request=%s)"),
		*FDateTime::Now().ToString(TEXT("%H:%M:%S:%s")), *RequestId);
	HttpRequest->OnProcessRequestComplete().BindWeakLambda(this, [this, Completed, RequestId, RequestStartedAt](FHttpRequestPtr, FHttpResponsePtr Response, bool bConnectedSuccessfully)
	{
		const FString CompletedAt = FDateTime::Now().ToString(TEXT("%H:%M:%S:%s"));
		const double ElapsedMs = (FPlatformTime::Seconds() - RequestStartedAt) * 1000.0;
		FAudioCppSpeechResult Result;
		if (!bConnectedSuccessfully || !Response.IsValid())
		{
			Result.Error = TEXT("Failed to reach the local audio.cpp server.");
		}
		else if (Response->GetResponseCode() < 200 || Response->GetResponseCode() >= 300)
		{
			Result.Error = FString::Printf(TEXT("audio.cpp returned HTTP %d: %s"), Response->GetResponseCode(), *Response->GetContentAsString());
		}
		else
		{
			const FString OutputDirectory = FPaths::Combine(FPaths::ProjectSavedDir(), TEXT("AudioCpp"), TEXT("Generated"));
			IFileManager::Get().MakeDirectory(*OutputDirectory, true);
			Result.WavFilePath = FPaths::Combine(OutputDirectory, FString::Printf(TEXT("tts_%s.wav"), *FGuid::NewGuid().ToString(EGuidFormats::Digits)));
			if (FFileHelper::SaveArrayToFile(Response->GetContent(), *Result.WavFilePath))
			{
				Result.bSuccess = true;
			}
			else
			{
				Result.WavFilePath.Reset();
				Result.Error = TEXT("Could not write the generated WAV file.");
			}
		}
		if (Result.bSuccess)
		{
			UE_LOG(LogTemp, Display, TEXT("TTS generation completed at %s (request=%s, elapsed=%.0f ms)"),
				*CompletedAt, *RequestId, ElapsedMs);
		}
		else
		{
			UE_LOG(LogTemp, Warning, TEXT("TTS generation failed at %s (request=%s, elapsed=%.0f ms)"),
				*CompletedAt, *RequestId, ElapsedMs);
		}
		CompleteSpeech(Completed, Result);
	});
	if (!HttpRequest->ProcessRequest())
	{
		UE_LOG(LogTemp, Warning, TEXT("TTS request could not be started at %s (request=%s)"),
			*FDateTime::Now().ToString(TEXT("%H:%M:%S:%s")), *RequestId);
	}
}

bool UAudioCppRuntimeSubsystem::WriteServerConfig(FString& OutConfigPath, FString& OutError) const
{
	const UAudioCppSettings* Settings = GetDefault<UAudioCppSettings>();
	if (Settings->ModelFilePath.FilePath.IsEmpty())
	{
		OutError = TEXT("Set Audio.cpp > Model File Path in Project Settings first.");
		return false;
	}

	const FString ModelPath = AudioCppRuntime::ToAbsolutePath(Settings->ModelFilePath.FilePath, FPaths::ProjectDir());
	if (!FPaths::FileExists(ModelPath))
	{
		OutError = FString::Printf(TEXT("Configured GGUF model file does not exist: %s"), *ModelPath);
		return false;
	}

	TSharedRef<FJsonObject> Root = MakeShared<FJsonObject>();
	Root->SetStringField(TEXT("host"), TEXT("127.0.0.1"));
	Root->SetNumberField(TEXT("port"), Settings->Port);
	Root->SetStringField(TEXT("backend"), Settings->Backend);
	Root->SetNumberField(TEXT("threads"), Settings->Threads);
	Root->SetBoolField(TEXT("lazy_load"), true);
	Root->SetNumberField(TEXT("busy_timeout_ms"), 60000);

	TSharedRef<FJsonObject> Model = MakeShared<FJsonObject>();
	Model->SetStringField(TEXT("id"), Settings->ModelId);
	Model->SetStringField(TEXT("family"), Settings->ModelFamily);
	Model->SetStringField(TEXT("path"), ModelPath);
	Model->SetStringField(TEXT("task"), TEXT("tts"));
	Model->SetStringField(TEXT("mode"), TEXT("offline"));
	if (!Settings->DefaultVoice.IsEmpty())
	{
		TSharedRef<FJsonObject> Voice = MakeShared<FJsonObject>();
		Voice->SetStringField(TEXT("voice_id"), Settings->DefaultVoice);
		Model->SetObjectField(TEXT("default_voice_preset"), Voice);
	}
	if (!Settings->DefaultSpeaker.IsEmpty())
	{
		TSharedRef<FJsonObject> DefaultRequestOptions = MakeShared<FJsonObject>();
		DefaultRequestOptions->SetStringField(TEXT("speaker"), Settings->DefaultSpeaker);
		Model->SetObjectField(TEXT("default_request_options"), DefaultRequestOptions);
	}
	Root->SetArrayField(TEXT("models"), { MakeShared<FJsonValueObject>(Model) });

	const FString ConfigDirectory = FPaths::Combine(FPaths::ProjectSavedDir(), TEXT("AudioCpp"));
	IFileManager::Get().MakeDirectory(*ConfigDirectory, true);
	// The child process runs from the plugin runtime directory, not UE's base directory.
	OutConfigPath = FPaths::ConvertRelativePathToFull(FPaths::Combine(ConfigDirectory, TEXT("server.json")));
	FString Json;
	const TSharedRef<TJsonWriter<>> Writer = TJsonWriterFactory<>::Create(&Json);
	FJsonSerializer::Serialize(Root, Writer);
	if (!FFileHelper::SaveStringToFile(Json, *OutConfigPath))
	{
		OutError = FString::Printf(TEXT("Could not write server config: %s"), *OutConfigPath);
		return false;
	}
	return true;
}

FString UAudioCppRuntimeSubsystem::ResolveServerExecutablePath() const
{
	const UAudioCppSettings* Settings = GetDefault<UAudioCppSettings>();
	const TSharedPtr<IPlugin> Plugin = IPluginManager::Get().FindPlugin(TEXT("AudioCpp"));
	const FString PluginPath = Plugin.IsValid() ? Plugin->GetBaseDir() : FPaths::ProjectPluginsDir();
	const FString ConfiguredPath = Settings->ServerExecutablePath.FilePath.IsEmpty() ? TEXT("ThirdParty/audio.cpp/Win64/audiocpp_server.exe") : Settings->ServerExecutablePath.FilePath;
	return AudioCppRuntime::ToAbsolutePath(ConfiguredPath, PluginPath);
}

void UAudioCppRuntimeSubsystem::PollHealth()
{
	if (!ServerProcess.IsValid() || !FPlatformProcess::IsProcRunning(ServerProcess))
	{
		GetWorld()->GetTimerManager().ClearTimer(HealthTimer);
		ServerState = EAudioCppServerState::Failed;
		UE_LOG(LogTemp, Error, TEXT("audio.cpp server exited during startup."));
		return;
	}
	if (FPlatformTime::Seconds() >= StartupDeadlineSeconds)
	{
		GetWorld()->GetTimerManager().ClearTimer(HealthTimer);
		ServerState = EAudioCppServerState::Failed;
		UE_LOG(LogTemp, Error, TEXT("Timed out waiting for audio.cpp server health check."));
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
			ServerState = EAudioCppServerState::Ready;
			UE_LOG(LogTemp, Log, TEXT("audio.cpp local server is ready."));
		}
	});
	Request->ProcessRequest();
}

void UAudioCppRuntimeSubsystem::CompleteSpeech(const FAudioCppSpeechCompleted& Completed, const FAudioCppSpeechResult& Result) const
{
	if (Completed.IsBound()) Completed.Execute(Result);
}

FString UAudioCppRuntimeSubsystem::GetBaseUrl() const
{
	return FString::Printf(TEXT("http://127.0.0.1:%d"), GetDefault<UAudioCppSettings>()->Port);
}
