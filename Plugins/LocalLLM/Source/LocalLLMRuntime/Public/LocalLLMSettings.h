#pragma once

#include "CoreMinimal.h"
#include "Engine/DeveloperSettings.h"
#include "LocalLLMSettings.generated.h"

UCLASS(Config=Game, DefaultConfig, meta=(DisplayName="Alibaba Cloud Qwen"))
class LOCALLLMRUNTIME_API ULocalLLMSettings : public UDeveloperSettings
{
	GENERATED_BODY()

public:
	UPROPERTY(Config, EditAnywhere, Category="API")
	FString ApiUrl = TEXT("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions");

	/** Environment variable containing the API key. Never put the key itself in project config. */
	UPROPERTY(Config, EditAnywhere, Category="API")
	FString ApiKeyEnvironmentVariable = TEXT("DASHSCOPE_API_KEY");

	UPROPERTY(Config, EditAnywhere, Category="Model")
	FString ModelId = TEXT("qwen-flash");

	UPROPERTY(Config, EditAnywhere, Category="Generation", meta=(ClampMin="1", ClampMax="4096"))
	int32 DefaultMaxTokens = 96;

	UPROPERTY(Config, EditAnywhere, Category="Generation", meta=(ClampMin="0.0", ClampMax="2.0"))
	float DefaultTemperature = 0.7f;

	UPROPERTY(Config, EditAnywhere, Category="API", meta=(ClampMin="1.0", ClampMax="300.0"))
	float RequestTimeoutSeconds = 30.0f;

	virtual FName GetCategoryName() const override { return TEXT("Plugins"); }
};
