#include "LocalLLMRuntimeSubsystem.h"

#include "LocalLLMSettings.h"
#include "Dom/JsonObject.h"
#include "HAL/PlatformMisc.h"
#include "HAL/PlatformTime.h"
#include "HttpModule.h"
#include "Interfaces/IHttpResponse.h"
#include "Misc/DateTime.h"
#include "Misc/Guid.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"
#include "Serialization/JsonWriter.h"

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
	if (ServerState == ELocalLLMServerState::Ready)
	{
		return true;
	}

	const ULocalLLMSettings* Settings = GetDefault<ULocalLLMSettings>();
	const FString ApiKey = FPlatformMisc::GetEnvironmentVariable(*Settings->ApiKeyEnvironmentVariable);
	if (Settings->ApiUrl.TrimStartAndEnd().IsEmpty() ||
		Settings->ModelId.TrimStartAndEnd().IsEmpty() ||
		Settings->ApiKeyEnvironmentVariable.TrimStartAndEnd().IsEmpty() ||
		ApiKey.IsEmpty())
	{
		UE_LOG(LogTemp, Error, TEXT("Alibaba Cloud Qwen configuration is incomplete. Check ApiUrl, ModelId, and environment variable %s."),
			*Settings->ApiKeyEnvironmentVariable);
		ServerState = ELocalLLMServerState::Failed;
		return false;
	}

	ServerState = ELocalLLMServerState::Ready;
	UE_LOG(LogTemp, Log, TEXT("Alibaba Cloud Qwen is ready (model=%s)."), *Settings->ModelId);
	return true;
}

void ULocalLLMRuntimeSubsystem::StopServer()
{
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
		CompleteChat(Completed, { false, TEXT(""), TEXT("Alibaba Cloud Qwen is not ready. Call StartServer first.") });
		return;
	}

	const ULocalLLMSettings* Settings = GetDefault<ULocalLLMSettings>();
	const FString ApiKey = FPlatformMisc::GetEnvironmentVariable(*Settings->ApiKeyEnvironmentVariable);
	if (ApiKey.IsEmpty())
	{
		CompleteChat(Completed, { false, TEXT(""), FString::Printf(TEXT("Environment variable %s is empty."), *Settings->ApiKeyEnvironmentVariable) });
		return;
	}

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
	UserMessage->SetStringField(TEXT("content"), Request.UserPrompt);
	Messages.Add(MakeShared<FJsonValueObject>(UserMessage));

	TSharedRef<FJsonObject> Body = MakeShared<FJsonObject>();
	Body->SetStringField(TEXT("model"), Settings->ModelId);
	Body->SetArrayField(TEXT("messages"), Messages);
	Body->SetNumberField(TEXT("max_completion_tokens"), Request.MaxTokens > 0 ? Request.MaxTokens : Settings->DefaultMaxTokens);
	Body->SetNumberField(TEXT("temperature"), Request.Temperature >= 0.0f ? Request.Temperature : Settings->DefaultTemperature);
	Body->SetBoolField(TEXT("enable_thinking"), !Request.bDisableThinking);
	Body->SetBoolField(TEXT("stream"), false);

	FString Json;
	const TSharedRef<TJsonWriter<>> Writer = TJsonWriterFactory<>::Create(&Json);
	FJsonSerializer::Serialize(Body, Writer);

	TSharedRef<IHttpRequest> HttpRequest = FHttpModule::Get().CreateRequest();
	HttpRequest->SetURL(Settings->ApiUrl);
	HttpRequest->SetVerb(TEXT("POST"));
	HttpRequest->SetHeader(TEXT("Authorization"), FString::Printf(TEXT("Bearer %s"), *ApiKey));
	HttpRequest->SetHeader(TEXT("Content-Type"), TEXT("application/json"));
	HttpRequest->SetTimeout(Settings->RequestTimeoutSeconds);
	HttpRequest->SetContentAsString(Json);

	const FString RequestId = FGuid::NewGuid().ToString(EGuidFormats::Digits);
	const double RequestStartedAt = FPlatformTime::Seconds();
	UE_LOG(LogTemp, Display, TEXT("Qwen generation started at %s (request=%s, model=%s)"),
		*FDateTime::Now().ToString(TEXT("%H:%M:%S:%s")), *RequestId, *Settings->ModelId);

	HttpRequest->OnProcessRequestComplete().BindWeakLambda(this, [this, Completed, RequestId, RequestStartedAt](FHttpRequestPtr, FHttpResponsePtr Response, bool bConnectedSuccessfully)
	{
		const FString CompletedAt = FDateTime::Now().ToString(TEXT("%H:%M:%S:%s"));
		const double ElapsedMs = (FPlatformTime::Seconds() - RequestStartedAt) * 1000.0;
		FLocalLLMChatResult Result;
		if (!bConnectedSuccessfully || !Response.IsValid())
		{
			Result.Error = TEXT("Failed to reach Alibaba Cloud Model Studio.");
		}
		else if (Response->GetResponseCode() < 200 || Response->GetResponseCode() >= 300)
		{
			Result.Error = FString::Printf(TEXT("Alibaba Cloud Qwen returned HTTP %d: %s"), Response->GetResponseCode(), *Response->GetContentAsString());
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
					if (Message.IsValid() && Message->TryGetStringField(TEXT("content"), Result.Text))
					{
						Result.Text.TrimStartAndEndInline();
						Result.bSuccess = !Result.Text.IsEmpty();
					}
				}
			}
			if (!Result.bSuccess)
			{
				Result.Error = TEXT("Alibaba Cloud Qwen returned a response without choices[0].message.content.");
			}
		}

		if (Result.bSuccess)
		{
			UE_LOG(LogTemp, Display, TEXT("Qwen generation completed at %s (request=%s, elapsed=%.0f ms)"), *CompletedAt, *RequestId, ElapsedMs);
		}
		else
		{
			UE_LOG(LogTemp, Warning, TEXT("Qwen generation failed at %s (request=%s, elapsed=%.0f ms)"), *CompletedAt, *RequestId, ElapsedMs);
		}
		CompleteChat(Completed, Result);
	});

	if (!HttpRequest->ProcessRequest())
	{
		CompleteChat(Completed, { false, TEXT(""), TEXT("Alibaba Cloud Qwen request could not be started.") });
	}
}

void ULocalLLMRuntimeSubsystem::CompleteChat(const FLocalLLMChatCompleted& Completed, const FLocalLLMChatResult& Result) const
{
	if (Completed.IsBound())
	{
		Completed.Execute(Result);
	}
}
