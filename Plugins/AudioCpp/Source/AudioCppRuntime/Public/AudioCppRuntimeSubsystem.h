#pragma once

#include "CoreMinimal.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "AudioCppRuntimeSubsystem.generated.h"

UENUM(BlueprintType)
enum class EAudioCppServerState : uint8
{
	Stopped,
	Starting,
	Ready,
	Failed
};

USTRUCT(BlueprintType)
struct FAudioCppSpeechRequest
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Audio.cpp")
	FString Text;

	/** Empty uses the model configured in Project Settings. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Audio.cpp")
	FString Voice;

	/** Qwen3-TTS CustomVoice speaker. Empty uses the Project Settings default. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Audio.cpp")
	FString Speaker;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Audio.cpp", meta=(ClampMin="1", ClampMax="4096"))
	int32 MaxTokens = 256;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Audio.cpp")
	int32 Seed = -1;
};

USTRUCT(BlueprintType)
struct FAudioCppSpeechResult
{
	GENERATED_BODY()

	UPROPERTY(BlueprintReadOnly, Category="Audio.cpp")
	bool bSuccess = false;

	/** Absolute path to the generated WAV. */
	UPROPERTY(BlueprintReadOnly, Category="Audio.cpp")
	FString WavFilePath;

	UPROPERTY(BlueprintReadOnly, Category="Audio.cpp")
	FString Error;
};

DECLARE_DYNAMIC_DELEGATE_OneParam(FAudioCppSpeechCompleted, const FAudioCppSpeechResult&, Result);

UCLASS()
class AUDIOCPPRUNTIME_API UAudioCppRuntimeSubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()

public:
	virtual void Initialize(FSubsystemCollectionBase& Collection) override;
	virtual void Deinitialize() override;
	virtual bool ShouldCreateSubsystem(UObject* Outer) const override;

	UFUNCTION(BlueprintCallable, Category="Audio.cpp")
	bool StartServer();

	UFUNCTION(BlueprintCallable, Category="Audio.cpp")
	void StopServer();

	UFUNCTION(BlueprintPure, Category="Audio.cpp")
	EAudioCppServerState GetServerState() const { return ServerState; }

	UFUNCTION(BlueprintPure, Category="Audio.cpp")
	bool IsServerReady() const { return ServerState == EAudioCppServerState::Ready; }

	UFUNCTION(BlueprintCallable, Category="Audio.cpp")
	void SynthesizeSpeech(const FAudioCppSpeechRequest& Request, FAudioCppSpeechCompleted Completed);

private:
	bool WriteServerConfig(FString& OutConfigPath, FString& OutError) const;
	FString ResolveServerExecutablePath() const;
	void PollHealth();
	void CompleteSpeech(const FAudioCppSpeechCompleted& Completed, const FAudioCppSpeechResult& Result) const;
	FString GetBaseUrl() const;

	EAudioCppServerState ServerState = EAudioCppServerState::Stopped;
	FProcHandle ServerProcess;
	FTimerHandle HealthTimer;
	double StartupDeadlineSeconds = 0.0;
};
