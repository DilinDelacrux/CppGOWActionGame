#pragma once

#include "CoreMinimal.h"
#include "Engine/DeveloperSettings.h"
#include "AudioCppSettings.generated.h"

UCLASS(Config=Game, DefaultConfig, meta=(DisplayName="Audio.cpp Local Runtime"))
class AUDIOCPPRUNTIME_API UAudioCppSettings : public UDeveloperSettings
{
	GENERATED_BODY()

public:
	/** A relative path is resolved from this plugin's directory. */
	UPROPERTY(Config, EditAnywhere, Category="Server")
	FFilePath ServerExecutablePath;

	UPROPERTY(Config, EditAnywhere, Category="Server", meta=(ClampMin="1024", ClampMax="65535"))
	int32 Port = 18180;

	UPROPERTY(Config, EditAnywhere, Category="Server")
	FString Backend = TEXT("cpu");

	UPROPERTY(Config, EditAnywhere, Category="Server", meta=(ClampMin="1", ClampMax="64"))
	int32 Threads = 2;

	/** GGUF model file. Relative paths are resolved from the game root. */
	UPROPERTY(Config, EditAnywhere, Category="Model")
	FFilePath ModelFilePath;

	UPROPERTY(Config, EditAnywhere, Category="Model")
	FString ModelId = TEXT("qwen3-tts-customvoice");

	UPROPERTY(Config, EditAnywhere, Category="Model")
	FString ModelFamily = TEXT("qwen3_tts");

	UPROPERTY(Config, EditAnywhere, Category="Model")
	FString Language = TEXT("auto");

	/** Optional model-native voice id. For PocketTTS, this is its built-in voice id. */
	UPROPERTY(Config, EditAnywhere, Category="Model")
	FString DefaultVoice;

	/** Qwen3-TTS CustomVoice built-in speaker, such as vivian, dylan, or uncle_fu. */
	UPROPERTY(Config, EditAnywhere, Category="Model")
	FString DefaultSpeaker = TEXT("vivian");

	UPROPERTY(Config, EditAnywhere, Category="Server", meta=(ClampMin="1000", ClampMax="600000"))
	int32 StartupTimeoutMs = 30000;

	virtual FName GetCategoryName() const override { return TEXT("Plugins"); }
};
