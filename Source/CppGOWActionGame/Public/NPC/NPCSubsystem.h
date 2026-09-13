#pragma once

#include "CoreMinimal.h"
#include "AudioCppRuntimeSubsystem.h"
#include "Kismet/BlueprintAsyncActionBase.h"
#include "LocalLLMRuntimeSubsystem.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "NPCSubsystem.generated.h"

class USoundBase;
class USoundWaveProcedural;
class UAudioComponent;
class AActor;
class UNPCVoiceDialogueTask;
class UNPCConversationCsvGenerationTask;
class UNPCConversationPreGenerateTask;
class UNPCConversationPlaybackTask;

/** Parameters for one local LLM -> cloud TTS NPC dialogue request. */
USTRUCT(BlueprintType)
struct CPPGOWACTIONGAME_API FNPCLocalAIDialogueRequest
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Local AI")
	FString SystemPrompt = TEXT("你是一名中世纪村民。只回答一句不超过三十个汉字的话，不要使用 Markdown。");

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Local AI")
	FString UserPrompt = TEXT("村里的铁匠今天为什么提前关门？");

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Local AI", meta = (ClampMin = "1", ClampMax = "4096"))
	int32 LlmMaxTokens = 96;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Local AI", meta = (ClampMin = "0.0", ClampMax = "2.0"))
	float Temperature = 0.6f;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Local AI")
	bool bDisableThinking = true;

	/** Optional CosyVoice voice id. Takes priority over Speaker and the configured default. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Local AI")
	FString Voice;

	/** Character id/name from the configured voice map, or a raw CosyVoice voice id. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Local AI")
	FString Speaker;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Local AI", meta = (ClampMin = "1", ClampMax = "4096"))
	int32 TtsMaxTokens = 256;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Local AI")
	int32 Seed = -1;
};

/** Inputs for one LLM-authored, C++-validated conversation CSV. */
USTRUCT(BlueprintType)
struct CPPGOWACTIONGAME_API FNPCConversationCsvGenerationRequest
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation")
	FString ConversationId;

	/** Scene facts and the conversational goal. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation")
	FString Scenario;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation")
	FString SpeakerAProfile;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation")
	FString SpeakerBProfile;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation")
	FString SpeakerATtsSpeaker;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation")
	FString SpeakerBTtsSpeaker;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation", meta = (ClampMin = "2", ClampMax = "10"))
	int32 MaxLines = 8;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation", meta = (ClampMin = "0.0", ClampMax = "2.0"))
	float Temperature = 0.7f;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation", meta = (ClampMin = "0.0", ClampMax = "10.0"))
	float PauseAfterSeconds = 0.25f;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation")
	FString FinalEndAction;

	/** File name only. Empty becomes <ConversationId>.csv in the existing Diagloue directory. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation")
	FString OutputFileName;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "NPC|Conversation")
	bool bOverwriteExisting = false;
};

/** One prepared CSV dialogue line. WAV paths are cached so playback can create a fresh procedural sound each time. */
USTRUCT()
struct CPPGOWACTIONGAME_API FNPCCachedDialogueLine
{
	GENERATED_BODY()

	UPROPERTY()
	FString SpeakerSlot;

	UPROPERTY()
	FString Text;

	UPROPERTY()
	FString TtsSpeaker;

	UPROPERTY()
	float PauseAfterSeconds = 0.0f;

	UPROPERTY()
	FString EndAction;

	UPROPERTY()
	FString WavFilePath;
};

USTRUCT()
struct CPPGOWACTIONGAME_API FNPCCachedConversation
{
	GENERATED_BODY()

	UPROPERTY()
	FString ConversationId;

	UPROPERTY()
	uint32 SourceSignature = 0;

	UPROPERTY()
	TArray<FNPCCachedDialogueLine> Lines;
};

DECLARE_DYNAMIC_DELEGATE_TwoParams(FNPCVoiceDialogueCompleted, USoundBase*, Sound, const FString&, Error);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FNPCVoiceDialogueAsyncResult, USoundBase*, Sound, const FString&, Error);
DECLARE_DYNAMIC_DELEGATE_ThreeParams(FNPCConversationPrepareCompleted, bool, bSuccess, int32, PreparedLineCount, const FString&, Error);
DECLARE_DYNAMIC_DELEGATE_TwoParams(FNPCConversationPlayCompleted, FName, EndAction, const FString&, Error);
DECLARE_DYNAMIC_DELEGATE_FourParams(FNPCConversationCsvGenerationCompleted, bool, bSuccess, const FString&, CsvFilePath, int32, GeneratedLineCount, const FString&, Error);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FNPCConversationPrepareSucceeded, int32, PreparedLineCount);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FNPCConversationPlaySucceeded, FName, EndAction);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FNPCConversationCsvGenerationSucceeded, const FString&, CsvFilePath, int32, GeneratedLineCount);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FNPCConversationAsyncFailed, const FString&, Error);

/**
 * Game-instance-scoped owner of NPC local-AI requests and generated voice objects.
 * It survives level changes and allows several NPCs to request dialogue concurrently.
 */
UCLASS()
class CPPGOWACTIONGAME_API UNPCSubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()

public:
	virtual void Deinitialize() override;

	/** Main API for C++, Blueprint delegate calls, and Puerts/TypeScript. */
	UFUNCTION(BlueprintCallable, Category = "NPC|Local AI")
	void GenerateNPCVoiceDialogue(const FNPCLocalAIDialogueRequest& Request, FNPCVoiceDialogueCompleted Completed);

	/** Loads one CSV conversation and synthesizes every line before replacing the current cache. */
	UFUNCTION(BlueprintCallable, Category = "NPC|Conversation")
	void PreGenerateNPCConversation(const FString& CsvFilePath, const FString& ConversationId, FNPCConversationPrepareCompleted Completed);

	/** Plays an already prepared conversation, alternating between Actor A/B according to SpeakerSlot. */
	UFUNCTION(BlueprintCallable, Category = "NPC|Conversation")
	void PlayCachedNPCConversation(const FString& ConversationId, AActor* ActorA, AActor* ActorB, FNPCConversationPlayCompleted Completed);

	/** Uses the local LLM to author dialogue, validates it, then writes an import-compatible CSV. */
	UFUNCTION(BlueprintCallable, Category = "NPC|Conversation")
	void GenerateNPCConversationCsv(const FNPCConversationCsvGenerationRequest& Request, FNPCConversationCsvGenerationCompleted Completed);

	UFUNCTION(BlueprintCallable, Category = "NPC|Conversation")
	void ClearCachedNPCConversations();

	/** Releases the subsystem's cache; sounds already owned by audio components remain valid. */
	UFUNCTION(BlueprintCallable, Category = "NPC|Local AI")
	void ClearGeneratedVoiceCache();

private:
	friend class UNPCVoiceDialogueTask;
	friend class UNPCConversationCsvGenerationTask;
	friend class UNPCConversationPreGenerateTask;
	friend class UNPCConversationPlaybackTask;

	USoundBase* CreateSoundBaseFromWav(const FString& WavFilePath, FString& OutError);
	void ReleaseTask(UNPCVoiceDialogueTask* Task);
	void ReleaseCsvGenerationTask(UNPCConversationCsvGenerationTask* Task);
	void ReleasePreGenerateTask(UNPCConversationPreGenerateTask* Task);
	void ReleasePlaybackTask(UNPCConversationPlaybackTask* Task);
	bool IsConversationCacheCurrent(const FString& ConversationId, uint32 SourceSignature, int32& OutLineCount) const;
	bool GetCachedConversation(const FString& ConversationId, FNPCCachedConversation& OutConversation) const;
	void StoreCachedConversation(FNPCCachedConversation&& Conversation);

	UPROPERTY(Transient)
	TArray<TObjectPtr<UNPCVoiceDialogueTask>> ActiveTasks;

	UPROPERTY(Transient)
	TArray<TObjectPtr<UNPCConversationCsvGenerationTask>> ActiveConversationCsvGenerationTasks;

	UPROPERTY(Transient)
	TArray<TObjectPtr<UNPCConversationPreGenerateTask>> ActiveConversationPreGenerateTasks;

	UPROPERTY(Transient)
	TArray<TObjectPtr<UNPCConversationPlaybackTask>> ActiveConversationPlaybackTasks;

	UPROPERTY(Transient)
	TArray<TObjectPtr<USoundWaveProcedural>> GeneratedVoiceCache;

	UPROPERTY(Transient)
	TMap<FString, FNPCCachedConversation> CachedConversations;

	static constexpr int32 MaxGeneratedVoiceCache = 16;
};

/** Internal local-LLM task that owns service waiting, validation, and CSV persistence. */
UCLASS()
class CPPGOWACTIONGAME_API UNPCConversationCsvGenerationTask : public UObject
{
	GENERATED_BODY()

public:
	void Initialize(UNPCSubsystem* InOwner, const FNPCConversationCsvGenerationRequest& InRequest, FNPCConversationCsvGenerationCompleted InCompletion);
	void Start();
	void Cancel();

	virtual UWorld* GetWorld() const override;

private:
	void PollLLMService();
	void StartChat();
	bool ParseAndSaveCsv(const FString& LlmText, FString& OutCsvPath, int32& OutLineCount, FString& OutError) const;
	void Finish(const FString& CsvFilePath, int32 GeneratedLineCount);
	void Fail(const FString& Error);

	UFUNCTION()
	void HandleChatCompleted(const FLocalLLMChatResult& Result);

	UPROPERTY(Transient)
	TObjectPtr<UNPCSubsystem> OwnerSubsystem;

	UPROPERTY(Transient)
	TObjectPtr<ULocalLLMRuntimeSubsystem> LLMSubsystem;

	UPROPERTY(Transient)
	FNPCConversationCsvGenerationRequest Request;

	UPROPERTY(Transient)
	FNPCConversationCsvGenerationCompleted Completion;

	FTimerHandle ServicePollTimer;
	double ServiceWaitStartedAt = 0.0;
	bool bFinished = false;
};

/** Internal per-request object used to receive the two native dynamic delegates safely. */
UCLASS()
class CPPGOWACTIONGAME_API UNPCVoiceDialogueTask : public UObject
{
	GENERATED_BODY()

public:
	void Initialize(UNPCSubsystem* InOwner, const FNPCLocalAIDialogueRequest& InRequest, FNPCVoiceDialogueCompleted InCompletion);
	void Start();
	void Cancel();

	virtual UWorld* GetWorld() const override;

private:
	void PollServices();
	void StartChat();
	void Finish(USoundBase* Sound);
	void Fail(const FString& Error);

	UFUNCTION()
	void HandleChatCompleted(const FLocalLLMChatResult& Result);

	UFUNCTION()
	void HandleSpeechCompleted(const FAudioCppSpeechResult& Result);

	UPROPERTY(Transient)
	TObjectPtr<UNPCSubsystem> OwnerSubsystem;

	UPROPERTY(Transient)
	TObjectPtr<ULocalLLMRuntimeSubsystem> LLMSubsystem;

	UPROPERTY(Transient)
	TObjectPtr<UAudioCppRuntimeSubsystem> TTSSubsystem;

	UPROPERTY(Transient)
	FNPCLocalAIDialogueRequest Request;

	UPROPERTY(Transient)
	FNPCVoiceDialogueCompleted Completion;

	FTimerHandle ServicePollTimer;
	double ServiceWaitStartedAt = 0.0;
	bool bFinished = false;
};

/** Internal sequential TTS producer for one CSV conversation. */
UCLASS()
class CPPGOWACTIONGAME_API UNPCConversationPreGenerateTask : public UObject
{
	GENERATED_BODY()

public:
	void Initialize(UNPCSubsystem* InOwner, const FString& InCsvFilePath, const FString& InConversationId, FNPCConversationPrepareCompleted InCompletion);
	void Start();
	void Cancel();

	virtual UWorld* GetWorld() const override;

private:
	void PollTTSService();
	void GenerateNextLine();
	void Finish();
	void Fail(const FString& Error);

	UFUNCTION()
	void HandleSpeechCompleted(const FAudioCppSpeechResult& Result);

	UPROPERTY(Transient)
	TObjectPtr<UNPCSubsystem> OwnerSubsystem;

	UPROPERTY(Transient)
	TObjectPtr<UAudioCppRuntimeSubsystem> TTSSubsystem;

	UPROPERTY(Transient)
	FNPCCachedConversation WorkingConversation;

	UPROPERTY(Transient)
	FNPCConversationPrepareCompleted Completion;

	FString CsvFilePath;
	FString ConversationId;
	FTimerHandle ServicePollTimer;
	double ServiceWaitStartedAt = 0.0;
	int32 CurrentLineIndex = 0;
	bool bFinished = false;
};

/** Internal consumer that plays cached lines and completes after the last audio and configured pause. */
UCLASS()
class CPPGOWACTIONGAME_API UNPCConversationPlaybackTask : public UObject
{
	GENERATED_BODY()

public:
	void Initialize(UNPCSubsystem* InOwner, const FString& InConversationId, AActor* InActorA, AActor* InActorB, FNPCConversationPlayCompleted InCompletion);
	void Start();
	void Cancel();

	virtual UWorld* GetWorld() const override;

private:
	void PlayNextLine();
	void Complete();
	void Fail(const FString& Error);

	UFUNCTION()
	void HandleAudioFinished();

	UPROPERTY(Transient)
	TObjectPtr<UNPCSubsystem> OwnerSubsystem;

	UPROPERTY(Transient)
	TObjectPtr<AActor> ActorA;

	UPROPERTY(Transient)
	TObjectPtr<AActor> ActorB;

	UPROPERTY(Transient)
	TObjectPtr<UAudioComponent> ActiveAudioComponent;

	UPROPERTY(Transient)
	FNPCCachedConversation Conversation;

	UPROPERTY(Transient)
	FNPCConversationPlayCompleted Completion;

	FString ConversationId;
	FName FinalEndAction = NAME_None;
	FTimerHandle AudioFinishedTimer;
	FTimerHandle PauseTimer;
	int32 CurrentLineIndex = 0;
	bool bFinished = false;
};

/**
 * Thin Blueprint async-node facade. The subsystem owns all service and request lifetime logic.
 * In Blueprint this appears as a node with Completed and Failed execution outputs.
 */
UCLASS()
class CPPGOWACTIONGAME_API UNPCGenerateVoiceDialogueAsyncAction : public UBlueprintAsyncActionBase
{
	GENERATED_BODY()

public:
	UPROPERTY(BlueprintAssignable, Category = "NPC|Local AI")
	FNPCVoiceDialogueAsyncResult Completed;

	UPROPERTY(BlueprintAssignable, Category = "NPC|Local AI")
	FNPCVoiceDialogueAsyncResult Failed;

	UFUNCTION(BlueprintCallable, Category = "NPC|Local AI", meta = (BlueprintInternalUseOnly = "true", WorldContext = "WorldContextObject", DisplayName = "Generate NPC Voice Dialogue"))
	static UNPCGenerateVoiceDialogueAsyncAction* GenerateNPCVoiceDialogue(UObject* WorldContextObject, const FNPCLocalAIDialogueRequest& Request);

	virtual void Activate() override;

private:
	UFUNCTION()
	void HandleCompleted(USoundBase* Sound, const FString& Error);

	UPROPERTY(Transient)
	TObjectPtr<UObject> WorldContextObject;

	UPROPERTY(Transient)
	FNPCLocalAIDialogueRequest Request;
};

/** Blueprint async node that generates and persists one validated dialogue CSV. */
UCLASS()
class CPPGOWACTIONGAME_API UNPCGenerateConversationCsvAsyncAction : public UBlueprintAsyncActionBase
{
	GENERATED_BODY()

public:
	UPROPERTY(BlueprintAssignable, Category = "NPC|Conversation")
	FNPCConversationCsvGenerationSucceeded Completed;

	UPROPERTY(BlueprintAssignable, Category = "NPC|Conversation")
	FNPCConversationAsyncFailed Failed;

	UFUNCTION(BlueprintCallable, Category = "NPC|Conversation", meta = (
		BlueprintInternalUseOnly = "true",
		WorldContext = "WorldContextObject",
		DisplayName = "Generate NPC Conversation CSV",
		CPP_Default_SpeakerATtsSpeaker = "M1",
		CPP_Default_SpeakerBTtsSpeaker = "W1",
		CPP_Default_MaxLines = "8",
		CPP_Default_Temperature = "0.7",
		CPP_Default_PauseAfterSeconds = "0.25",
		CPP_Default_FinalEndAction = "ReturnToWork",
		CPP_Default_OutputFileName = "",
		CPP_Default_bOverwriteExisting = "false"))
	static UNPCGenerateConversationCsvAsyncAction* GenerateNPCConversationCsv(
		UObject* WorldContextObject,
		FString ConversationId,
		FString Scenario,
		FString SpeakerAProfile,
		FString SpeakerBProfile,
		FString SpeakerATtsSpeaker,
		FString SpeakerBTtsSpeaker,
		int32 MaxLines,
		float Temperature,
		float PauseAfterSeconds,
		FString FinalEndAction,
		FString OutputFileName,
		bool bOverwriteExisting);

	virtual void Activate() override;

private:
	UFUNCTION()
	void HandleCompleted(bool bSuccess, const FString& CsvFilePath, int32 GeneratedLineCount, const FString& Error);

	UPROPERTY(Transient)
	TObjectPtr<UObject> WorldContextObject;

	UPROPERTY(Transient)
	FNPCConversationCsvGenerationRequest Request;
};

/** Blueprint async node that fully prepares a CSV conversation before completing. */
UCLASS()
class CPPGOWACTIONGAME_API UNPCPreGenerateConversationAsyncAction : public UBlueprintAsyncActionBase
{
	GENERATED_BODY()

public:
	UPROPERTY(BlueprintAssignable, Category = "NPC|Conversation")
	FNPCConversationPrepareSucceeded Completed;

	UPROPERTY(BlueprintAssignable, Category = "NPC|Conversation")
	FNPCConversationAsyncFailed Failed;

	UFUNCTION(BlueprintCallable, Category = "NPC|Conversation", meta = (
		BlueprintInternalUseOnly = "true",
		WorldContext = "WorldContextObject",
		DisplayName = "Pre Generate NPC Conversation",
		CPP_Default_CsvFilePath = "Content/AmbientNpcBehavior/Diagloue/npc_dialogue.csv",
		CPP_Default_ConversationId = "VillageGreeting_01"))
	static UNPCPreGenerateConversationAsyncAction* PreGenerateNPCConversation(
		UObject* WorldContextObject,
		FString CsvFilePath,
		FString ConversationId);

	virtual void Activate() override;

private:
	UFUNCTION()
	void HandleCompleted(bool bSuccess, int32 PreparedLineCount, const FString& Error);

	UPROPERTY(Transient)
	TObjectPtr<UObject> WorldContextObject;

	FString CsvFilePath;
	FString ConversationId;
};

/** Blueprint async node that completes only after the final cached sound has finished playing. */
UCLASS()
class CPPGOWACTIONGAME_API UNPCPlayCachedConversationAsyncAction : public UBlueprintAsyncActionBase
{
	GENERATED_BODY()

public:
	UPROPERTY(BlueprintAssignable, Category = "NPC|Conversation")
	FNPCConversationPlaySucceeded Completed;

	UPROPERTY(BlueprintAssignable, Category = "NPC|Conversation")
	FNPCConversationAsyncFailed Failed;

	UFUNCTION(BlueprintCallable, Category = "NPC|Conversation", meta = (
		BlueprintInternalUseOnly = "true",
		WorldContext = "WorldContextObject",
		DisplayName = "Play Cached NPC Conversation",
		CPP_Default_ConversationId = "VillageGreeting_01"))
	static UNPCPlayCachedConversationAsyncAction* PlayCachedNPCConversation(
		UObject* WorldContextObject,
		FString ConversationId,
		AActor* ActorA,
		AActor* ActorB);

	virtual void Activate() override;

private:
	UFUNCTION()
	void HandleCompleted(FName EndAction, const FString& Error);

	UPROPERTY(Transient)
	TObjectPtr<UObject> WorldContextObject;

	UPROPERTY(Transient)
	TObjectPtr<AActor> ActorA;

	UPROPERTY(Transient)
	TObjectPtr<AActor> ActorB;

	FString ConversationId;
};
