#pragma once

#include "CoreMinimal.h"
#include "Engine/DeveloperSettings.h"
#include "LocalLLMSettings.generated.h"

UCLASS(Config=Game, DefaultConfig, meta=(DisplayName="Local LLM Runtime"))
class LOCALLLMRUNTIME_API ULocalLLMSettings : public UDeveloperSettings
{
	GENERATED_BODY()

public:
	/** A relative path is resolved from this plugin's directory. */
	UPROPERTY(Config, EditAnywhere, Category="Server")
	FFilePath ServerExecutablePath;

	UPROPERTY(Config, EditAnywhere, Category="Server", meta=(ClampMin="1024", ClampMax="65535"))
	int32 Port = 18181;

	/** GGUF model file. Relative paths are resolved from the game root. */
	UPROPERTY(Config, EditAnywhere, Category="Model")
	FFilePath ModelFilePath;

	UPROPERTY(Config, EditAnywhere, Category="Model", meta=(ClampMin="256", ClampMax="32768"))
	int32 ContextSize = 2048;

	/** -1 lets llama.cpp offload as many layers as it can to CUDA. */
	UPROPERTY(Config, EditAnywhere, Category="Server", meta=(ClampMin="-1", ClampMax="999"))
	int32 GpuLayers = -1;

	UPROPERTY(Config, EditAnywhere, Category="Generation", meta=(ClampMin="1", ClampMax="4096"))
	int32 DefaultMaxTokens = 96;

	UPROPERTY(Config, EditAnywhere, Category="Generation", meta=(ClampMin="0.0", ClampMax="2.0"))
	float DefaultTemperature = 0.7f;

	UPROPERTY(Config, EditAnywhere, Category="Server", meta=(ClampMin="1000", ClampMax="600000"))
	int32 StartupTimeoutMs = 30000;

	virtual FName GetCategoryName() const override { return TEXT("Plugins"); }
};
