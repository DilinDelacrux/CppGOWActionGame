#include "AudioCppRuntimeSubsystem.h"

#include "AudioCppSettings.h"
#include "Dom/JsonObject.h"
#include "HAL/FileManager.h"
#include "HAL/PlatformMisc.h"
#include "HAL/PlatformTime.h"
#include "HttpModule.h"
#include "Interfaces/IHttpResponse.h"
#include "Misc/DateTime.h"
#include "Misc/FileHelper.h"
#include "Misc/Guid.h"
#include "Misc/Paths.h"
#include "Misc/SecureHash.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"
#include "Serialization/JsonWriter.h"

namespace AudioCppRuntime
{
	static FString ResolveVoice(const UAudioCppSettings* Settings, const FAudioCppSpeechRequest& Request)
	{
		FString Voice = Request.Voice.TrimStartAndEnd();
		const FString Character = Request.Speaker.TrimStartAndEnd();
		if (Voice.IsEmpty() && !Character.IsEmpty())
		{
			for (const TPair<FString, FString>& Entry : Settings->CharacterVoices)
			{
				if (Entry.Key.Equals(Character, ESearchCase::IgnoreCase))
				{
					Voice = Entry.Value.TrimStartAndEnd();
					break;
				}
			}
			if (Voice.IsEmpty())
			{
				Voice = Character;
			}
		}
		return Voice.IsEmpty() ? Settings->DefaultVoice.TrimStartAndEnd() : Voice;
	}

	static FString GetCachedWavPath(const UAudioCppSettings* Settings, const FString& Voice, const FString& Text)
	{
		const FString CacheKey = FString::Printf(TEXT("%s\n%s\n%s\n%s\n%d\n%d\n%.3f\n%.3f"),
			*Settings->ModelId, *Voice, *Text, *Settings->LanguageHint,
			Settings->SampleRate, Settings->Volume, Settings->Rate, Settings->Pitch);
		FTCHARToUTF8 Utf8(*CacheKey);
		FMD5 Md5;
		Md5.Update(reinterpret_cast<const uint8*>(Utf8.Get()), Utf8.Length());
		uint8 Digest[16];
		Md5.Final(Digest);

		const FString Directory = FPaths::Combine(FPaths::ProjectSavedDir(), TEXT("AudioCpp"), TEXT("Generated"));
		IFileManager::Get().MakeDirectory(*Directory, true);
		return FPaths::Combine(Directory, BytesToHex(Digest, UE_ARRAY_COUNT(Digest)).ToLower() + TEXT(".wav"));
	}

	static bool IsWav(const TArray<uint8>& Bytes)
	{
		return Bytes.Num() >= 12 &&
			Bytes[0] == 'R' && Bytes[1] == 'I' && Bytes[2] == 'F' && Bytes[3] == 'F' &&
			Bytes[8] == 'W' && Bytes[9] == 'A' && Bytes[10] == 'V' && Bytes[11] == 'E';
	}

	static uint32 ReadUInt32LE(const TArray<uint8>& Bytes, const int32 Offset)
	{
		return static_cast<uint32>(Bytes[Offset]) |
			(static_cast<uint32>(Bytes[Offset + 1]) << 8) |
			(static_cast<uint32>(Bytes[Offset + 2]) << 16) |
			(static_cast<uint32>(Bytes[Offset + 3]) << 24);
	}

	static void WriteUInt32LE(TArray<uint8>& Bytes, const int32 Offset, const uint32 Value)
	{
		Bytes[Offset] = static_cast<uint8>(Value);
		Bytes[Offset + 1] = static_cast<uint8>(Value >> 8);
		Bytes[Offset + 2] = static_cast<uint8>(Value >> 16);
		Bytes[Offset + 3] = static_cast<uint8>(Value >> 24);
	}

	static bool NormalizeWavHeader(TArray<uint8>& Bytes, bool& bOutChanged, FString& OutError)
	{
		bOutChanged = false;
		if (!IsWav(Bytes))
		{
			OutError = TEXT("Missing RIFF/WAVE header.");
			return false;
		}

		for (int32 ChunkOffset = 12; ChunkOffset + 8 <= Bytes.Num();)
		{
			const uint32 DeclaredChunkSize = ReadUInt32LE(Bytes, ChunkOffset + 4);
			const bool bIsData = Bytes[ChunkOffset] == 'd' && Bytes[ChunkOffset + 1] == 'a' &&
				Bytes[ChunkOffset + 2] == 't' && Bytes[ChunkOffset + 3] == 'a';
			if (bIsData)
			{
				const uint32 ActualRiffSize = static_cast<uint32>(Bytes.Num() - 8);
				const uint32 ActualDataSize = static_cast<uint32>(Bytes.Num() - ChunkOffset - 8);
				bOutChanged = ReadUInt32LE(Bytes, 4) != ActualRiffSize || DeclaredChunkSize != ActualDataSize;
				WriteUInt32LE(Bytes, 4, ActualRiffSize);
				WriteUInt32LE(Bytes, ChunkOffset + 4, ActualDataSize);
				return true;
			}

			const int64 NextChunkOffset = static_cast<int64>(ChunkOffset) + 8 + DeclaredChunkSize + (DeclaredChunkSize & 1);
			if (NextChunkOffset > Bytes.Num())
			{
				OutError = TEXT("A WAV chunk exceeds the file boundary before the data chunk.");
				return false;
			}
			ChunkOffset = static_cast<int32>(NextChunkOffset);
		}

		OutError = TEXT("Missing WAV data chunk.");
		return false;
	}

	static bool NormalizeCachedWav(const FString& Path, FString& OutError)
	{
		TArray<uint8> Bytes;
		if (!FFileHelper::LoadFileToArray(Bytes, *Path))
		{
			OutError = TEXT("Could not read the cached WAV file.");
			return false;
		}

		bool bChanged = false;
		if (!NormalizeWavHeader(Bytes, bChanged, OutError))
		{
			return false;
		}
		if (bChanged && !FFileHelper::SaveArrayToFile(Bytes, *Path))
		{
			OutError = TEXT("Could not repair the cached WAV header.");
			return false;
		}
		return true;
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
	if (ServerState == EAudioCppServerState::Ready)
	{
		return true;
	}

	const UAudioCppSettings* Settings = GetDefault<UAudioCppSettings>();
	if (Settings->ApiUrl.TrimStartAndEnd().IsEmpty() || Settings->ModelId.TrimStartAndEnd().IsEmpty() ||
		Settings->ApiKeyEnvironmentVariable.TrimStartAndEnd().IsEmpty())
	{
		UE_LOG(LogTemp, Error, TEXT("CosyVoice API URL and model must be configured in Project Settings."));
		ServerState = EAudioCppServerState::Failed;
		return false;
	}

	if (FPlatformMisc::GetEnvironmentVariable(*Settings->ApiKeyEnvironmentVariable).IsEmpty())
	{
		UE_LOG(LogTemp, Error, TEXT("CosyVoice API key is missing. Set environment variable %s and restart Unreal Editor."),
			*Settings->ApiKeyEnvironmentVariable);
		ServerState = EAudioCppServerState::Failed;
		return false;
	}

	ServerState = EAudioCppServerState::Ready;
	UE_LOG(LogTemp, Log, TEXT("CosyVoice cloud TTS is configured and ready."));
	return true;
}

void UAudioCppRuntimeSubsystem::StopServer()
{
	ServerState = EAudioCppServerState::Stopped;
}

void UAudioCppRuntimeSubsystem::SynthesizeSpeech(const FAudioCppSpeechRequest& Request, FAudioCppSpeechCompleted Completed)
{
	const FString Text = Request.Text.TrimStartAndEnd();
	if (Text.IsEmpty())
	{
		CompleteSpeech(Completed, { false, TEXT(""), TEXT("Text cannot be empty.") });
		return;
	}
	if (ServerState != EAudioCppServerState::Ready)
	{
		CompleteSpeech(Completed, { false, TEXT(""), TEXT("CosyVoice cloud TTS is not ready. Call StartServer first.") });
		return;
	}

	const UAudioCppSettings* Settings = GetDefault<UAudioCppSettings>();
	const FString Voice = AudioCppRuntime::ResolveVoice(Settings, Request);
	if (Voice.IsEmpty())
	{
		CompleteSpeech(Completed, { false, TEXT(""), TEXT("No CosyVoice voice id was supplied or configured.") });
		return;
	}

	const FString CachedWavPath = AudioCppRuntime::GetCachedWavPath(Settings, Voice, Text);
	if (FPaths::FileExists(CachedWavPath))
	{
		FString WavError;
		if (!AudioCppRuntime::NormalizeCachedWav(CachedWavPath, WavError))
		{
			CompleteSpeech(Completed, { false, TEXT(""), FString::Printf(TEXT("Invalid cached WAV: %s"), *WavError) });
			return;
		}
		UE_LOG(LogTemp, Display, TEXT("TTS cache hit: %s"), *CachedWavPath);
		CompleteSpeech(Completed, { true, CachedWavPath, TEXT("") });
		return;
	}

	TSharedRef<FJsonObject> Input = MakeShared<FJsonObject>();
	Input->SetStringField(TEXT("text"), Text);
	Input->SetStringField(TEXT("voice"), Voice);
	Input->SetStringField(TEXT("format"), TEXT("wav"));
	Input->SetNumberField(TEXT("sample_rate"), Settings->SampleRate);
	Input->SetNumberField(TEXT("volume"), Settings->Volume);
	Input->SetNumberField(TEXT("rate"), Settings->Rate);
	Input->SetNumberField(TEXT("pitch"), Settings->Pitch);
	if (!Settings->LanguageHint.IsEmpty())
	{
		Input->SetArrayField(TEXT("language_hints"), { MakeShared<FJsonValueString>(Settings->LanguageHint) });
	}
	if (Request.Seed >= 0)
	{
		Input->SetNumberField(TEXT("seed"), FMath::Clamp(Request.Seed, 0, 65535));
	}

	TSharedRef<FJsonObject> Body = MakeShared<FJsonObject>();
	Body->SetStringField(TEXT("model"), Settings->ModelId);
	Body->SetObjectField(TEXT("input"), Input);
	FString Json;
	FJsonSerializer::Serialize(Body, TJsonWriterFactory<>::Create(&Json));

	const FString ApiKey = FPlatformMisc::GetEnvironmentVariable(*Settings->ApiKeyEnvironmentVariable);
	TSharedRef<IHttpRequest> HttpRequest = FHttpModule::Get().CreateRequest();
	HttpRequest->SetURL(Settings->ApiUrl);
	HttpRequest->SetVerb(TEXT("POST"));
	HttpRequest->SetHeader(TEXT("Authorization"), TEXT("Bearer ") + ApiKey);
	HttpRequest->SetHeader(TEXT("Content-Type"), TEXT("application/json"));
	HttpRequest->SetContentAsString(Json);

	const FString RequestId = FGuid::NewGuid().ToString(EGuidFormats::Digits);
	const double RequestStartedAt = FPlatformTime::Seconds();
	UE_LOG(LogTemp, Display, TEXT("CosyVoice generation started at %s (request=%s, voice=%s)"),
		*FDateTime::Now().ToString(TEXT("%H:%M:%S:%s")), *RequestId, *Voice);

	HttpRequest->OnProcessRequestComplete().BindWeakLambda(this,
		[this, Completed, CachedWavPath, RequestId, RequestStartedAt](FHttpRequestPtr, FHttpResponsePtr Response, bool bConnected)
	{
		if (!bConnected || !Response.IsValid())
		{
			CompleteSpeech(Completed, { false, TEXT(""), TEXT("Failed to reach the CosyVoice API.") });
			return;
		}
		if (Response->GetResponseCode() < 200 || Response->GetResponseCode() >= 300)
		{
			CompleteSpeech(Completed, { false, TEXT(""), FString::Printf(TEXT("CosyVoice returned HTTP %d: %s"),
				Response->GetResponseCode(), *Response->GetContentAsString()) });
			return;
		}

		TSharedPtr<FJsonObject> Root;
		if (!FJsonSerializer::Deserialize(TJsonReaderFactory<>::Create(Response->GetContentAsString()), Root) || !Root.IsValid())
		{
			CompleteSpeech(Completed, { false, TEXT(""), TEXT("CosyVoice returned invalid JSON.") });
			return;
		}

		const TSharedPtr<FJsonObject>* Output = nullptr;
		const TSharedPtr<FJsonObject>* Audio = nullptr;
		FString AudioUrl;
		if (!Root->TryGetObjectField(TEXT("output"), Output) || Output == nullptr || !Output->IsValid() ||
			!(*Output)->TryGetObjectField(TEXT("audio"), Audio) || Audio == nullptr || !Audio->IsValid() ||
			!(*Audio)->TryGetStringField(TEXT("url"), AudioUrl) || AudioUrl.IsEmpty())
		{
			CompleteSpeech(Completed, { false, TEXT(""), TEXT("CosyVoice response did not contain an audio URL.") });
			return;
		}

		TSharedRef<IHttpRequest> Download = FHttpModule::Get().CreateRequest();
		Download->SetURL(AudioUrl);
		Download->SetVerb(TEXT("GET"));
		Download->OnProcessRequestComplete().BindWeakLambda(this,
			[this, Completed, CachedWavPath, RequestId, RequestStartedAt](FHttpRequestPtr, FHttpResponsePtr AudioResponse, bool bDownloaded)
		{
			FAudioCppSpeechResult Result;
			if (!bDownloaded || !AudioResponse.IsValid())
			{
				Result.Error = TEXT("Failed to download the generated CosyVoice audio.");
			}
			else if (AudioResponse->GetResponseCode() < 200 || AudioResponse->GetResponseCode() >= 300)
			{
				Result.Error = FString::Printf(TEXT("CosyVoice audio download returned HTTP %d."), AudioResponse->GetResponseCode());
			}
			else
			{
				TArray<uint8> WavBytes = AudioResponse->GetContent();
				bool bHeaderChanged = false;
				if (!AudioCppRuntime::NormalizeWavHeader(WavBytes, bHeaderChanged, Result.Error))
				{
					Result.Error = TEXT("CosyVoice audio download was not a valid WAV file: ") + Result.Error;
				}
				else if (!FFileHelper::SaveArrayToFile(WavBytes, *CachedWavPath))
				{
					Result.Error = TEXT("Could not write the generated WAV file.");
				}
				else
				{
					Result.bSuccess = true;
					Result.WavFilePath = CachedWavPath;
				}
			}

			const double ElapsedMs = (FPlatformTime::Seconds() - RequestStartedAt) * 1000.0;
			if (Result.bSuccess)
			{
				UE_LOG(LogTemp, Display, TEXT("CosyVoice generation completed (request=%s, elapsed=%.0f ms)"), *RequestId, ElapsedMs);
			}
			else
			{
				UE_LOG(LogTemp, Warning, TEXT("CosyVoice generation failed (request=%s, elapsed=%.0f ms): %s"),
					*RequestId, ElapsedMs, *Result.Error);
			}
			CompleteSpeech(Completed, Result);
		});
		if (!Download->ProcessRequest())
		{
			CompleteSpeech(Completed, { false, TEXT(""), TEXT("CosyVoice audio download could not be started.") });
		}
	});

	if (!HttpRequest->ProcessRequest())
	{
		CompleteSpeech(Completed, { false, TEXT(""), TEXT("CosyVoice request could not be started.") });
	}
}

void UAudioCppRuntimeSubsystem::CompleteSpeech(const FAudioCppSpeechCompleted& Completed, const FAudioCppSpeechResult& Result) const
{
	if (Completed.IsBound())
	{
		Completed.Execute(Result);
	}
}
