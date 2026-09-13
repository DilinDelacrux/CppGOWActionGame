#pragma once

#include "CoreMinimal.h"
#include "Engine/DeveloperSettings.h"
#include "AudioCppSettings.generated.h"

UCLASS(Config=Game, DefaultConfig, meta=(DisplayName="CosyVoice Cloud TTS"))
class AUDIOCPPRUNTIME_API UAudioCppSettings : public UDeveloperSettings
{
	GENERATED_BODY()

public:
	/** CosyVoice HTTP endpoint. The workspace-specific Beijing endpoint has the lowest mainland-China latency. */
	UPROPERTY(Config, EditAnywhere, Category="API")
	FString ApiUrl = TEXT("https://dashscope.aliyuncs.com/api/v1/services/audio/tts/SpeechSynthesizer");

	/** Environment variable containing the API key. Never store a production key in DefaultGame.ini. */
	UPROPERTY(Config, EditAnywhere, Category="API")
	FString ApiKeyEnvironmentVariable = TEXT("DASHSCOPE_API_KEY");

	UPROPERTY(Config, EditAnywhere, Category="Model")
	FString ModelId = TEXT("cosyvoice-v3.5-flash");

	UPROPERTY(Config, EditAnywhere, Category="Model")
	FString LanguageHint = TEXT("zh");

	/** Used when a request has neither Voice nor a matching Character Voice entry. */
	UPROPERTY(Config, EditAnywhere, Category="Voices")
	FString DefaultVoice;

	/** Maps game character ids/names to the voice ids created in Alibaba Cloud Model Studio. */
	UPROPERTY(Config, EditAnywhere, Category="Voices")
	TMap<FString, FString> CharacterVoices;

	UPROPERTY(Config, EditAnywhere, Category="Audio", meta=(ClampMin="8000", ClampMax="48000"))
	int32 SampleRate = 24000;

	UPROPERTY(Config, EditAnywhere, Category="Audio", meta=(ClampMin="0", ClampMax="100"))
	int32 Volume = 50;

	UPROPERTY(Config, EditAnywhere, Category="Audio", meta=(ClampMin="0.5", ClampMax="2.0"))
	float Rate = 1.0f;

	UPROPERTY(Config, EditAnywhere, Category="Audio", meta=(ClampMin="0.5", ClampMax="2.0"))
	float Pitch = 1.0f;

	virtual FName GetCategoryName() const override { return TEXT("Plugins"); }
};
