#pragma once

#include "CoreMinimal.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "LocalLLMRuntimeSubsystem.generated.h"

UENUM(BlueprintType)
enum class ELocalLLMServerState : uint8
{
	Stopped,
	Starting,
	Ready,
	Failed
};

USTRUCT(BlueprintType)
struct FLocalLLMChatRequest
{
	GENERATED_BODY()

	/** Keep this short: NPC roles, current scene facts, and output limits. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Local LLM")
	FString SystemPrompt;

	/** The immediate event or question the NPC dialogue should answer. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Local LLM")
	FString UserPrompt;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Local LLM", meta=(ClampMin="1", ClampMax="4096"))
	int32 MaxTokens = 0;

	/** Negative uses the Project Settings default. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Local LLM")
	float Temperature = -1.0f;

	/** Qwen3 defaults to reasoning. Keep this enabled for low-latency NPC dialogue. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Local LLM")
	bool bDisableThinking = true;
};

USTRUCT(BlueprintType)
struct FLocalLLMChatResult
{
	GENERATED_BODY()

	UPROPERTY(BlueprintReadOnly, Category="Local LLM")
	bool bSuccess = false;

	UPROPERTY(BlueprintReadOnly, Category="Local LLM")
	FString Text;

	UPROPERTY(BlueprintReadOnly, Category="Local LLM")
	FString Error;
};

DECLARE_DYNAMIC_DELEGATE_OneParam(FLocalLLMChatCompleted, const FLocalLLMChatResult&, Result);

UCLASS()
class LOCALLLMRUNTIME_API ULocalLLMRuntimeSubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()

public:
	virtual void Initialize(FSubsystemCollectionBase& Collection) override;
	virtual void Deinitialize() override;
	virtual bool ShouldCreateSubsystem(UObject* Outer) const override;

	UFUNCTION(BlueprintCallable, Category="Local LLM")
	bool StartServer();

	UFUNCTION(BlueprintCallable, Category="Local LLM")
	void StopServer();

	UFUNCTION(BlueprintPure, Category="Local LLM")
	ELocalLLMServerState GetServerState() const { return ServerState; }

	UFUNCTION(BlueprintPure, Category="Local LLM")
	bool IsServerReady() const { return ServerState == ELocalLLMServerState::Ready; }

	UFUNCTION(BlueprintCallable, Category="Local LLM")
	void GenerateChat(const FLocalLLMChatRequest& Request, FLocalLLMChatCompleted Completed);

private:
	FString ResolveServerExecutablePath() const;
	FString ResolveModelPath() const;
	FString GetBaseUrl() const;
	void PollHealth();
	void CompleteChat(const FLocalLLMChatCompleted& Completed, const FLocalLLMChatResult& Result) const;

	ELocalLLMServerState ServerState = ELocalLLMServerState::Stopped;
	FProcHandle ServerProcess;
	FTimerHandle HealthTimer;
	double StartupDeadlineSeconds = 0.0;
};
