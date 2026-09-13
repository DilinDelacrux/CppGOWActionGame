#include "NPC/NPCSubsystem.h"

#include "Audio.h"
#include "Components/AudioComponent.h"
#include "Components/SceneComponent.h"
#include "Engine/Engine.h"
#include "Engine/GameInstance.h"
#include "Engine/World.h"
#include "GameFramework/Actor.h"
#include "HAL/FileManager.h"
#include "Kismet/GameplayStatics.h"
#include "Dom/JsonObject.h"
#include "Misc/FileHelper.h"
#include "Misc/Guid.h"
#include "Misc/Paths.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"
#include "Sound/SoundBase.h"
#include "Sound/SoundWaveProcedural.h"
#include "TimerManager.h"
#include "WarriorFunctionLibrary.h"

DEFINE_LOG_CATEGORY_STATIC(LogNPCSubsystem, Log, All);

namespace NPCSubsystemPrivate
{
	constexpr double ServiceStartTimeoutSeconds = 180.0;
	constexpr float ServicePollIntervalSeconds = 0.1f;
	constexpr int32 MaxConversationLines = 10;

	FString NormalizeConversationKey(const FString& ConversationId)
	{
		FString Key = ConversationId;
		Key.TrimStartAndEndInline();
		Key.ToLowerInline();
		return Key;
	}

	FString EscapeCsvCell(FString Value)
	{
		Value.ReplaceInline(TEXT("\r"), TEXT(" "));
		Value.ReplaceInline(TEXT("\n"), TEXT(" "));
		Value.ReplaceInline(TEXT("\""), TEXT("\"\""));
		return FString::Printf(TEXT("\"%s\""), *Value);
	}
}

void UNPCSubsystem::Deinitialize()
{
	const TArray<TObjectPtr<UNPCVoiceDialogueTask>> TasksToCancel = ActiveTasks;
	for (UNPCVoiceDialogueTask* Task : TasksToCancel)
	{
		if (IsValid(Task))
		{
			Task->Cancel();
		}
	}

	const TArray<TObjectPtr<UNPCConversationCsvGenerationTask>> CsvGenerationTasksToCancel = ActiveConversationCsvGenerationTasks;
	for (UNPCConversationCsvGenerationTask* Task : CsvGenerationTasksToCancel)
	{
		if (IsValid(Task))
		{
			Task->Cancel();
		}
	}

	const TArray<TObjectPtr<UNPCConversationPreGenerateTask>> PreGenerateTasksToCancel = ActiveConversationPreGenerateTasks;
	for (UNPCConversationPreGenerateTask* Task : PreGenerateTasksToCancel)
	{
		if (IsValid(Task))
		{
			Task->Cancel();
		}
	}

	const TArray<TObjectPtr<UNPCConversationPlaybackTask>> PlaybackTasksToCancel = ActiveConversationPlaybackTasks;
	for (UNPCConversationPlaybackTask* Task : PlaybackTasksToCancel)
	{
		if (IsValid(Task))
		{
			Task->Cancel();
		}
	}

	ActiveTasks.Reset();
	ActiveConversationCsvGenerationTasks.Reset();
	ActiveConversationPreGenerateTasks.Reset();
	ActiveConversationPlaybackTasks.Reset();
	GeneratedVoiceCache.Reset();
	CachedConversations.Reset();
	Super::Deinitialize();
}

void UNPCSubsystem::GenerateNPCVoiceDialogue(const FNPCLocalAIDialogueRequest& Request, FNPCVoiceDialogueCompleted Completed)
{
	UNPCVoiceDialogueTask* Task = NewObject<UNPCVoiceDialogueTask>(this);
	ActiveTasks.Add(Task);
	UE_LOG(LogNPCSubsystem, Display, TEXT("NPC voice request queued. Active requests: %d"), ActiveTasks.Num());
	Task->Initialize(this, Request, Completed);
	Task->Start();
}

void UNPCSubsystem::PreGenerateNPCConversation(
	const FString& CsvFilePath,
	const FString& ConversationId,
	FNPCConversationPrepareCompleted Completed)
{
	UNPCConversationPreGenerateTask* Task = NewObject<UNPCConversationPreGenerateTask>(this);
	ActiveConversationPreGenerateTasks.Add(Task);
	UE_LOG(LogNPCSubsystem, Display, TEXT("Conversation pre-generation queued: %s"), *ConversationId);
	Task->Initialize(this, CsvFilePath, ConversationId, Completed);
	Task->Start();
}

void UNPCSubsystem::PlayCachedNPCConversation(
	const FString& ConversationId,
	AActor* ActorA,
	AActor* ActorB,
	FNPCConversationPlayCompleted Completed)
{
	UNPCConversationPlaybackTask* Task = NewObject<UNPCConversationPlaybackTask>(this);
	ActiveConversationPlaybackTasks.Add(Task);
	Task->Initialize(this, ConversationId, ActorA, ActorB, Completed);
	Task->Start();
}

void UNPCSubsystem::GenerateNPCConversationCsv(
	const FNPCConversationCsvGenerationRequest& Request,
	FNPCConversationCsvGenerationCompleted Completed)
{
	UNPCConversationCsvGenerationTask* Task = NewObject<UNPCConversationCsvGenerationTask>(this);
	ActiveConversationCsvGenerationTasks.Add(Task);
	UE_LOG(LogNPCSubsystem, Display, TEXT("Conversation CSV generation queued: %s"), *Request.ConversationId);
	Task->Initialize(this, Request, Completed);
	Task->Start();
}

void UNPCSubsystem::ClearCachedNPCConversations()
{
	CachedConversations.Reset();
}

void UNPCSubsystem::ClearGeneratedVoiceCache()
{
	GeneratedVoiceCache.Reset();
}

USoundBase* UNPCSubsystem::CreateSoundBaseFromWav(const FString& WavFilePath, FString& OutError)
{
	OutError.Reset();

	TArray<uint8> WavData;
	if (!FFileHelper::LoadFileToArray(WavData, *WavFilePath))
	{
		OutError = FString::Printf(TEXT("无法读取 TTS WAV 文件：%s"), *WavFilePath);
		return nullptr;
	}

	FWaveModInfo WaveInfo;
	FString WaveError;
	if (!WaveInfo.ReadWaveInfo(WavData.GetData(), WavData.Num(), &WaveError))
	{
		OutError = FString::Printf(TEXT("WAV 解析失败：%s"), *WaveError);
		return nullptr;
	}

	if (!WaveInfo.pFormatTag || *WaveInfo.pFormatTag != FWaveModInfo::WAVE_INFO_FORMAT_PCM)
	{
		OutError = TEXT("当前只支持 PCM WAV。");
		return nullptr;
	}

	if (!WaveInfo.pBitsPerSample || *WaveInfo.pBitsPerSample != 16)
	{
		OutError = TEXT("当前只支持 16-bit PCM WAV。");
		return nullptr;
	}

	if (!WaveInfo.pChannels || !WaveInfo.pSamplesPerSec || !WaveInfo.pAvgBytesPerSec ||
		!WaveInfo.SampleDataStart || WaveInfo.SampleDataSize == 0 || *WaveInfo.pChannels == 0 ||
		*WaveInfo.pSamplesPerSec == 0 || *WaveInfo.pAvgBytesPerSec == 0)
	{
		OutError = TEXT("WAV 缺少有效的声道、采样率或 PCM 数据。");
		return nullptr;
	}

	USoundWaveProcedural* Sound = NewObject<USoundWaveProcedural>(this, NAME_None, RF_Transient);
	Sound->NumChannels = *WaveInfo.pChannels;
	Sound->SetSampleRate(*WaveInfo.pSamplesPerSec);
	Sound->SampleByteSize = *WaveInfo.pBitsPerSample / 8;
	Sound->Duration = static_cast<float>(WaveInfo.SampleDataSize) / static_cast<float>(*WaveInfo.pAvgBytesPerSec);
	Sound->bLooping = false;
	Sound->SoundGroup = SOUNDGROUP_Voice;
	Sound->QueueAudio(WaveInfo.SampleDataStart, static_cast<int32>(WaveInfo.SampleDataSize));

	GeneratedVoiceCache.Add(Sound);
	if (GeneratedVoiceCache.Num() > MaxGeneratedVoiceCache)
	{
		GeneratedVoiceCache.RemoveAt(0, GeneratedVoiceCache.Num() - MaxGeneratedVoiceCache, EAllowShrinking::No);
	}

	return Sound;
}

void UNPCSubsystem::ReleaseTask(UNPCVoiceDialogueTask* Task)
{
	ActiveTasks.Remove(Task);
}

void UNPCSubsystem::ReleaseCsvGenerationTask(UNPCConversationCsvGenerationTask* Task)
{
	ActiveConversationCsvGenerationTasks.Remove(Task);
}

void UNPCSubsystem::ReleasePreGenerateTask(UNPCConversationPreGenerateTask* Task)
{
	ActiveConversationPreGenerateTasks.Remove(Task);
}

void UNPCSubsystem::ReleasePlaybackTask(UNPCConversationPlaybackTask* Task)
{
	ActiveConversationPlaybackTasks.Remove(Task);
}

bool UNPCSubsystem::IsConversationCacheCurrent(
	const FString& ConversationId,
	uint32 SourceSignature,
	int32& OutLineCount) const
{
	OutLineCount = 0;
	const FNPCCachedConversation* Cached = CachedConversations.Find(NPCSubsystemPrivate::NormalizeConversationKey(ConversationId));
	if (!Cached || Cached->SourceSignature != SourceSignature || Cached->Lines.IsEmpty())
	{
		return false;
	}

	for (const FNPCCachedDialogueLine& Line : Cached->Lines)
	{
		if (Line.WavFilePath.IsEmpty() || !FPaths::FileExists(Line.WavFilePath))
		{
			return false;
		}
	}

	OutLineCount = Cached->Lines.Num();
	return true;
}

bool UNPCSubsystem::GetCachedConversation(
	const FString& ConversationId,
	FNPCCachedConversation& OutConversation) const
{
	const FNPCCachedConversation* Cached = CachedConversations.Find(NPCSubsystemPrivate::NormalizeConversationKey(ConversationId));
	if (!Cached)
	{
		return false;
	}

	OutConversation = *Cached;
	return true;
}

void UNPCSubsystem::StoreCachedConversation(FNPCCachedConversation&& Conversation)
{
	const FString Key = NPCSubsystemPrivate::NormalizeConversationKey(Conversation.ConversationId);
	CachedConversations.Add(Key, MoveTemp(Conversation));
}

void UNPCConversationCsvGenerationTask::Initialize(
	UNPCSubsystem* InOwner,
	const FNPCConversationCsvGenerationRequest& InRequest,
	FNPCConversationCsvGenerationCompleted InCompletion)
{
	OwnerSubsystem = InOwner;
	Request = InRequest;
	Completion = InCompletion;
}

void UNPCConversationCsvGenerationTask::Start()
{
	if (!IsValid(OwnerSubsystem))
	{
		Fail(TEXT("NPC Subsystem 无效。"));
		return;
	}

	Request.ConversationId.TrimStartAndEndInline();
	Request.Scenario.TrimStartAndEndInline();
	Request.SpeakerAProfile.TrimStartAndEndInline();
	Request.SpeakerBProfile.TrimStartAndEndInline();
	Request.SpeakerATtsSpeaker.TrimStartAndEndInline();
	Request.SpeakerBTtsSpeaker.TrimStartAndEndInline();
	Request.FinalEndAction.TrimStartAndEndInline();
	Request.OutputFileName.TrimStartAndEndInline();
	Request.MaxLines = FMath::Clamp(Request.MaxLines, 2, NPCSubsystemPrivate::MaxConversationLines);
	Request.Temperature = FMath::Clamp(Request.Temperature, 0.0f, 2.0f);
	Request.PauseAfterSeconds = FMath::Clamp(Request.PauseAfterSeconds, 0.0f, 10.0f);

	if (Request.ConversationId.IsEmpty())
	{
		Fail(TEXT("Conversation ID 不能为空。"));
		return;
	}
	if (Request.Scenario.IsEmpty())
	{
		Fail(TEXT("Scenario 不能为空。"));
		return;
	}
	if (Request.SpeakerAProfile.IsEmpty())
	{
		Request.SpeakerAProfile = TEXT("中世纪村民 A");
	}
	if (Request.SpeakerBProfile.IsEmpty())
	{
		Request.SpeakerBProfile = TEXT("中世纪村民 B");
	}
	if (Request.SpeakerATtsSpeaker.IsEmpty())
	{
		Request.SpeakerATtsSpeaker = TEXT("M1");
	}
	if (Request.SpeakerBTtsSpeaker.IsEmpty())
	{
		Request.SpeakerBTtsSpeaker = TEXT("W1");
	}
	if (Request.FinalEndAction.IsEmpty())
	{
		Request.FinalEndAction = TEXT("ReturnToWork");
	}

	UGameInstance* GameInstance = OwnerSubsystem->GetGameInstance();
	LLMSubsystem = IsValid(GameInstance) ? GameInstance->GetSubsystem<ULocalLLMRuntimeSubsystem>() : nullptr;
	if (!IsValid(LLMSubsystem))
	{
		Fail(TEXT("Qwen Cloud Subsystem 不可用。"));
		return;
	}
	const ELocalLLMServerState LLMState = LLMSubsystem->GetServerState();
	if ((LLMState == ELocalLLMServerState::Stopped || LLMState == ELocalLLMServerState::Failed) && !LLMSubsystem->StartServer())
	{
		Fail(TEXT("Qwen Cloud API 配置失败。"));
		return;
	}

	UWorld* World = GetWorld();
	if (!IsValid(World))
	{
		Fail(TEXT("NPC Subsystem 当前没有有效的游戏世界。"));
		return;
	}

	ServiceWaitStartedAt = FPlatformTime::Seconds();
	World->GetTimerManager().SetTimer(
		ServicePollTimer,
		this,
		&UNPCConversationCsvGenerationTask::PollLLMService,
		NPCSubsystemPrivate::ServicePollIntervalSeconds,
		true);
	PollLLMService();
}

void UNPCConversationCsvGenerationTask::Cancel()
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(ServicePollTimer);
	}
	Completion.Unbind();
}

UWorld* UNPCConversationCsvGenerationTask::GetWorld() const
{
	return IsValid(OwnerSubsystem) ? OwnerSubsystem->GetWorld() : nullptr;
}

void UNPCConversationCsvGenerationTask::PollLLMService()
{
	if (bFinished)
	{
		return;
	}
	if (!IsValid(LLMSubsystem))
	{
		Fail(TEXT("等待 Qwen Cloud 时 Subsystem 已失效。"));
		return;
	}
	if (LLMSubsystem->GetServerState() == ELocalLLMServerState::Failed)
	{
		Fail(TEXT("等待 Qwen Cloud 时服务失败。"));
		return;
	}
	if (FPlatformTime::Seconds() - ServiceWaitStartedAt > NPCSubsystemPrivate::ServiceStartTimeoutSeconds)
	{
		Fail(TEXT("等待 Qwen Cloud 服务就绪超时。"));
		return;
	}
	if (LLMSubsystem->IsServerReady())
	{
		if (UWorld* World = GetWorld())
		{
			World->GetTimerManager().ClearTimer(ServicePollTimer);
		}
		StartChat();
	}
}

void UNPCConversationCsvGenerationTask::StartChat()
{
	FLocalLLMChatRequest ChatRequest;
	ChatRequest.SystemPrompt = TEXT(
		"你是中世纪游戏的NPC对话编剧。严格只返回一个合法的JSON字符串数组，不要Markdown代码块、解释、旁白或思考过程。"
		"数组中的每个字符串必须只有可直接送入TTS朗读的语音正文，每句不超过40个汉字。"
		"严禁在正文中包含任何发言者名称、职业名称、角色标识或说话前缀；严禁使用“A：”“B：”“铁匠：”“裁缝：”“[A]”“角色A”等形式。"
		"正确示例：[\"上午好，今天的活还顺利吗？\",\"还不错，只是订单比往常多。\"]。"
		"错误示例：[\"铁匠：上午好。\",\"B：还不错。\"]。"
		"对话由A先说，随后A、B交替；人物先自然寒暄，再简短谈论当前场景，最后道别并各自回去工作。"
		"发言者身份由程序根据数组下标分配，你绝对不要把身份写进字符串。");
	ChatRequest.UserPrompt = FString::Printf(
		TEXT("场景：%s\n角色A设定：%s\n角色B设定：%s\n生成2到%d句对话。只返回不带任何发言者名称或前缀的JSON语音正文数组。"),
		*Request.Scenario,
		*Request.SpeakerAProfile,
		*Request.SpeakerBProfile,
		Request.MaxLines);
	ChatRequest.MaxTokens = FMath::Clamp(Request.MaxLines * 96, 256, 1536);
	ChatRequest.Temperature = Request.Temperature;
	ChatRequest.bDisableThinking = true;

	FLocalLLMChatCompleted ChatCompleted;
	ChatCompleted.BindDynamic(this, &UNPCConversationCsvGenerationTask::HandleChatCompleted);
	LLMSubsystem->GenerateChat(ChatRequest, ChatCompleted);
}

void UNPCConversationCsvGenerationTask::HandleChatCompleted(const FLocalLLMChatResult& Result)
{
	if (bFinished)
	{
		return;
	}
	if (!Result.bSuccess)
	{
		Fail(FString::Printf(TEXT("LLM 生成 CSV 台词失败：%s"), *Result.Error));
		return;
	}

	FString CsvFilePath;
	FString Error;
	int32 GeneratedLineCount = 0;
	if (!ParseAndSaveCsv(Result.Text, CsvFilePath, GeneratedLineCount, Error))
	{
		Fail(Error);
		return;
	}

	Finish(CsvFilePath, GeneratedLineCount);
}

bool UNPCConversationCsvGenerationTask::ParseAndSaveCsv(
	const FString& LlmText,
	FString& OutCsvPath,
	int32& OutLineCount,
	FString& OutError) const
{
	OutCsvPath.Reset();
	OutLineCount = 0;
	OutError.Reset();

	int32 JsonStart = INDEX_NONE;
	int32 JsonEnd = INDEX_NONE;
	if (!LlmText.FindChar(TEXT('['), JsonStart) || !LlmText.FindLastChar(TEXT(']'), JsonEnd) || JsonEnd <= JsonStart)
	{
		OutError = TEXT("LLM 没有返回 JSON 字符串数组。" );
		return false;
	}

	const FString JsonText = LlmText.Mid(JsonStart, JsonEnd - JsonStart + 1);
	TArray<TSharedPtr<FJsonValue>> JsonLines;
	const TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(JsonText);
	if (!FJsonSerializer::Deserialize(Reader, JsonLines))
	{
		OutError = TEXT("LLM 返回的台词 JSON 无法解析。" );
		return false;
	}
	if (JsonLines.Num() < 2)
	{
		OutError = TEXT("LLM 返回的有效台词少于2句。" );
		return false;
	}

	TArray<FString> DialogueLines;
	DialogueLines.Reserve(FMath::Min(JsonLines.Num(), Request.MaxLines));
	for (int32 Index = 0; Index < JsonLines.Num() && DialogueLines.Num() < Request.MaxLines; ++Index)
	{
		if (!JsonLines[Index].IsValid() || JsonLines[Index]->Type != EJson::String)
		{
			OutError = FString::Printf(TEXT("LLM 返回数组的第 %d 项不是字符串。"), Index + 1);
			return false;
		}

		FString Line = JsonLines[Index]->AsString();
		Line.TrimStartAndEndInline();
		Line.ReplaceInline(TEXT("\r"), TEXT(" "));
		Line.ReplaceInline(TEXT("\n"), TEXT(" "));
		if (Line.IsEmpty())
		{
			OutError = FString::Printf(TEXT("LLM 返回数组的第 %d 句为空。"), Index + 1);
			return false;
		}
		if (Line.Len() > 100)
		{
			OutError = FString::Printf(TEXT("LLM 返回数组的第 %d 句过长。"), Index + 1);
			return false;
		}
		DialogueLines.Add(MoveTemp(Line));
	}

	FString FileStem = FPaths::GetBaseFilename(FPaths::GetCleanFilename(Request.OutputFileName));
	if (FileStem.IsEmpty())
	{
		FileStem = Request.ConversationId;
	}
	FileStem = FPaths::MakeValidFileName(FileStem, TEXT('_'));
	if (FileStem.IsEmpty() || FileStem == TEXT(".") || FileStem == TEXT(".."))
	{
		OutError = TEXT("无法根据 Conversation ID 生成有效的 CSV 文件名。" );
		return false;
	}

	const FString DialogueDirectory = FPaths::ConvertRelativePathToFull(
		FPaths::Combine(FPaths::ProjectContentDir(), TEXT("AmbientNpcBehavior/Diagloue")));
	IFileManager& FileManager = IFileManager::Get();
	if (!FileManager.MakeDirectory(*DialogueDirectory, true) && !FPaths::DirectoryExists(DialogueDirectory))
	{
		OutError = FString::Printf(TEXT("无法创建 NPC 对话目录：%s"), *DialogueDirectory);
		return false;
	}

	OutCsvPath = FPaths::Combine(DialogueDirectory, FileStem + TEXT(".csv"));
	FPaths::NormalizeFilename(OutCsvPath);
	if (FPaths::FileExists(OutCsvPath) && !Request.bOverwriteExisting)
	{
		OutError = FString::Printf(TEXT("CSV 已存在；如需替换请启用 Overwrite Existing：%s"), *OutCsvPath);
		OutCsvPath.Reset();
		return false;
	}

	FString CsvText = TEXT("RowName,ConversationId,LineIndex,SpeakerSlot,Text,TtsSpeaker,PauseAfterSeconds,EndAction\r\n");
	for (int32 Index = 0; Index < DialogueLines.Num(); ++Index)
	{
		const bool bSpeakerA = Index % 2 == 0;
		const bool bLastLine = Index == DialogueLines.Num() - 1;
		const FString RowName = FString::Printf(TEXT("%s_%02d"), *FileStem, Index + 1);
		const FString SpeakerSlot = bSpeakerA ? TEXT("A") : TEXT("B");
		const FString& TtsSpeaker = bSpeakerA ? Request.SpeakerATtsSpeaker : Request.SpeakerBTtsSpeaker;
		const FString EndAction = bLastLine ? Request.FinalEndAction : TEXT("Continue");
		const float PauseSeconds = bLastLine ? 0.0f : Request.PauseAfterSeconds;

		CsvText += FString::Printf(
			TEXT("%s,%s,%d,%s,%s,%s,%.2f,%s\r\n"),
			*NPCSubsystemPrivate::EscapeCsvCell(RowName),
			*NPCSubsystemPrivate::EscapeCsvCell(Request.ConversationId),
			Index + 1,
			*NPCSubsystemPrivate::EscapeCsvCell(SpeakerSlot),
			*NPCSubsystemPrivate::EscapeCsvCell(DialogueLines[Index]),
			*NPCSubsystemPrivate::EscapeCsvCell(TtsSpeaker),
			PauseSeconds,
			*NPCSubsystemPrivate::EscapeCsvCell(EndAction));
	}

	const FString TempPath = OutCsvPath + TEXT(".") + FGuid::NewGuid().ToString(EGuidFormats::Digits) + TEXT(".tmp");
	if (!FFileHelper::SaveStringToFile(
		CsvText,
		*TempPath,
		FFileHelper::EEncodingOptions::ForceUTF8WithoutBOM,
		&FileManager,
		FILEWRITE_AllowRead))
	{
		OutError = FString::Printf(TEXT("无法写入临时 NPC 对话 CSV：%s"), *TempPath);
		OutCsvPath.Reset();
		return false;
	}

	if (!FileManager.Move(*OutCsvPath, *TempPath, Request.bOverwriteExisting, true, false, true))
	{
		FileManager.Delete(*TempPath, false, true, true);
		OutError = FString::Printf(TEXT("无法保存 NPC 对话 CSV，目标文件可能正被占用：%s"), *OutCsvPath);
		OutCsvPath.Reset();
		return false;
	}

	OutLineCount = DialogueLines.Num();
	return true;
}

void UNPCConversationCsvGenerationTask::Finish(const FString& CsvFilePath, int32 GeneratedLineCount)
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	UE_LOG(LogNPCSubsystem, Display, TEXT("Conversation CSV generated: %s (%d lines)"), *CsvFilePath, GeneratedLineCount);
	FNPCConversationCsvGenerationCompleted Callback = Completion;
	Callback.ExecuteIfBound(true, CsvFilePath, GeneratedLineCount, FString());
	if (IsValid(OwnerSubsystem))
	{
		OwnerSubsystem->ReleaseCsvGenerationTask(this);
	}
}

void UNPCConversationCsvGenerationTask::Fail(const FString& Error)
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(ServicePollTimer);
	}
	UE_LOG(LogNPCSubsystem, Error, TEXT("Conversation CSV generation failed: %s"), *Error);

	FNPCConversationCsvGenerationCompleted Callback = Completion;
	Callback.ExecuteIfBound(false, FString(), 0, Error);
	if (IsValid(OwnerSubsystem))
	{
		OwnerSubsystem->ReleaseCsvGenerationTask(this);
	}
}

void UNPCVoiceDialogueTask::Initialize(UNPCSubsystem* InOwner, const FNPCLocalAIDialogueRequest& InRequest, FNPCVoiceDialogueCompleted InCompletion)
{
	OwnerSubsystem = InOwner;
	Request = InRequest;
	Completion = InCompletion;
}

void UNPCVoiceDialogueTask::Start()
{
	if (!IsValid(OwnerSubsystem))
	{
		Fail(TEXT("NPC Subsystem 无效。"));
		return;
	}

	Request.SystemPrompt.TrimStartAndEndInline();
	Request.UserPrompt.TrimStartAndEndInline();
	if (Request.UserPrompt.IsEmpty())
	{
		Fail(TEXT("User Prompt 不能为空。"));
		return;
	}

	UGameInstance* GameInstance = OwnerSubsystem->GetGameInstance();
	if (!IsValid(GameInstance))
	{
		Fail(TEXT("无法取得 Game Instance。"));
		return;
	}

	LLMSubsystem = GameInstance->GetSubsystem<ULocalLLMRuntimeSubsystem>();
	TTSSubsystem = GameInstance->GetSubsystem<UAudioCppRuntimeSubsystem>();
	if (!IsValid(LLMSubsystem) || !IsValid(TTSSubsystem))
	{
		Fail(TEXT("Qwen Cloud 或 CosyVoice TTS Subsystem 不可用。"));
		return;
	}

	if (TTSSubsystem->GetServerState() == EAudioCppServerState::Failed)
	{
		Fail(TEXT("CosyVoice 服务处于失败状态，请检查 API 配置。"));
		return;
	}

	const ELocalLLMServerState LLMState = LLMSubsystem->GetServerState();
	if ((LLMState == ELocalLLMServerState::Stopped || LLMState == ELocalLLMServerState::Failed) && !LLMSubsystem->StartServer())
	{
		Fail(TEXT("Qwen Cloud API 配置失败。"));
		return;
	}

	if (TTSSubsystem->GetServerState() == EAudioCppServerState::Stopped && !TTSSubsystem->StartServer())
	{
		Fail(TEXT("CosyVoice 服务配置失败。"));
		return;
	}

	UWorld* World = GetWorld();
	if (!IsValid(World))
	{
		Fail(TEXT("NPC Subsystem 当前没有有效的游戏世界。"));
		return;
	}

	ServiceWaitStartedAt = FPlatformTime::Seconds();
	UE_LOG(LogNPCSubsystem, Display, TEXT("Waiting for Qwen Cloud and CosyVoice services."));
	World->GetTimerManager().SetTimer(
		ServicePollTimer,
		this,
		&UNPCVoiceDialogueTask::PollServices,
		NPCSubsystemPrivate::ServicePollIntervalSeconds,
		true);
	PollServices();
}

void UNPCVoiceDialogueTask::Cancel()
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(ServicePollTimer);
	}
	Completion.Unbind();
}

UWorld* UNPCVoiceDialogueTask::GetWorld() const
{
	return IsValid(OwnerSubsystem) ? OwnerSubsystem->GetWorld() : nullptr;
}

void UNPCVoiceDialogueTask::PollServices()
{
	if (bFinished)
	{
		return;
	}

	if (!IsValid(LLMSubsystem) || !IsValid(TTSSubsystem))
	{
		Fail(TEXT("等待服务时 Subsystem 已失效。"));
		return;
	}

	if (LLMSubsystem->GetServerState() == ELocalLLMServerState::Failed ||
		TTSSubsystem->GetServerState() == EAudioCppServerState::Failed)
	{
		Fail(TEXT("等待 Qwen Cloud 或 CosyVoice 就绪时服务失败。"));
		return;
	}

	if (FPlatformTime::Seconds() - ServiceWaitStartedAt > NPCSubsystemPrivate::ServiceStartTimeoutSeconds)
	{
		Fail(TEXT("等待 Qwen Cloud 与 CosyVoice 服务就绪超时。"));
		return;
	}

	if (LLMSubsystem->IsServerReady() && TTSSubsystem->IsServerReady())
	{
		if (UWorld* World = GetWorld())
		{
			World->GetTimerManager().ClearTimer(ServicePollTimer);
		}
		StartChat();
	}
}

void UNPCVoiceDialogueTask::StartChat()
{
	FLocalLLMChatRequest ChatRequest;
	ChatRequest.SystemPrompt = Request.SystemPrompt;
	ChatRequest.UserPrompt = Request.UserPrompt;
	ChatRequest.MaxTokens = FMath::Clamp(Request.LlmMaxTokens, 1, 4096);
	ChatRequest.Temperature = FMath::Clamp(Request.Temperature, 0.0f, 2.0f);
	ChatRequest.bDisableThinking = Request.bDisableThinking;

	FLocalLLMChatCompleted ChatCompleted;
	ChatCompleted.BindDynamic(this, &UNPCVoiceDialogueTask::HandleChatCompleted);
	LLMSubsystem->GenerateChat(ChatRequest, ChatCompleted);
}

void UNPCVoiceDialogueTask::HandleChatCompleted(const FLocalLLMChatResult& Result)
{
	if (bFinished)
	{
		return;
	}

	if (!Result.bSuccess)
	{
		Fail(FString::Printf(TEXT("LLM 生成失败：%s"), *Result.Error));
		return;
	}

	FString DialogueText = Result.Text;
	DialogueText.TrimStartAndEndInline();
	if (DialogueText.IsEmpty())
	{
		Fail(TEXT("LLM 返回了空文本。"));
		return;
	}
	UE_LOG(LogNPCSubsystem, Display, TEXT("LLM dialogue generated: %s"), *DialogueText);

	FAudioCppSpeechRequest SpeechRequest;
	SpeechRequest.Text = DialogueText;
	SpeechRequest.Voice = Request.Voice;
	SpeechRequest.Speaker = Request.Speaker;
	SpeechRequest.MaxTokens = FMath::Clamp(Request.TtsMaxTokens, 1, 4096);
	SpeechRequest.Seed = Request.Seed;

	FAudioCppSpeechCompleted SpeechCompleted;
	SpeechCompleted.BindDynamic(this, &UNPCVoiceDialogueTask::HandleSpeechCompleted);
	TTSSubsystem->SynthesizeSpeech(SpeechRequest, SpeechCompleted);
}

void UNPCVoiceDialogueTask::HandleSpeechCompleted(const FAudioCppSpeechResult& Result)
{
	if (bFinished)
	{
		return;
	}

	if (!Result.bSuccess)
	{
		Fail(FString::Printf(TEXT("TTS 生成失败：%s"), *Result.Error));
		return;
	}

	FString Error;
	USoundBase* Sound = OwnerSubsystem->CreateSoundBaseFromWav(Result.WavFilePath, Error);
	if (!IsValid(Sound))
	{
		Fail(Error.IsEmpty() ? TEXT("无法从 TTS WAV 创建 SoundBase。") : Error);
		return;
	}
	UE_LOG(LogNPCSubsystem, Display, TEXT("NPC voice generated from: %s"), *Result.WavFilePath);

	Finish(Sound);
}

void UNPCVoiceDialogueTask::Finish(USoundBase* Sound)
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	FNPCVoiceDialogueCompleted Callback = Completion;
	Callback.ExecuteIfBound(Sound, FString());
	if (IsValid(OwnerSubsystem))
	{
		OwnerSubsystem->ReleaseTask(this);
	}
}

void UNPCVoiceDialogueTask::Fail(const FString& Error)
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	UE_LOG(LogNPCSubsystem, Error, TEXT("NPC voice request failed: %s"), *Error);
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(ServicePollTimer);
	}

	FNPCVoiceDialogueCompleted Callback = Completion;
	Callback.ExecuteIfBound(nullptr, Error);
	if (IsValid(OwnerSubsystem))
	{
		OwnerSubsystem->ReleaseTask(this);
	}
}

void UNPCConversationPreGenerateTask::Initialize(
	UNPCSubsystem* InOwner,
	const FString& InCsvFilePath,
	const FString& InConversationId,
	FNPCConversationPrepareCompleted InCompletion)
{
	OwnerSubsystem = InOwner;
	CsvFilePath = InCsvFilePath;
	ConversationId = InConversationId;
	Completion = InCompletion;
}

void UNPCConversationPreGenerateTask::Start()
{
	if (!IsValid(OwnerSubsystem))
	{
		Fail(TEXT("NPC Subsystem 无效。"));
		return;
	}

	CsvFilePath.TrimStartAndEndInline();
	ConversationId.TrimStartAndEndInline();
	if (ConversationId.IsEmpty())
	{
		Fail(TEXT("Conversation ID 不能为空。"));
		return;
	}

	TArray<FWarriorNPCDialogueCsvRow> CsvRows;
	FString CsvError;
	if (!UWarriorFunctionLibrary::LoadNPCDialogueCsv(CsvFilePath, ConversationId, CsvRows, CsvError))
	{
		Fail(CsvError);
		return;
	}

	if (CsvRows.Num() > NPCSubsystemPrivate::MaxConversationLines)
	{
		Fail(FString::Printf(
			TEXT("会话 %s 包含 %d 句，当前最多支持 %d 句。"),
			*ConversationId,
			CsvRows.Num(),
			NPCSubsystemPrivate::MaxConversationLines));
		return;
	}

	WorkingConversation.ConversationId = ConversationId;
	uint32 SourceSignature = GetTypeHash(ConversationId.ToLower());
	for (const FWarriorNPCDialogueCsvRow& CsvRow : CsvRows)
	{
		FNPCCachedDialogueLine& Line = WorkingConversation.Lines.AddDefaulted_GetRef();
		Line.SpeakerSlot = CsvRow.SpeakerSlot;
		Line.Text = CsvRow.Text;
		Line.TtsSpeaker = CsvRow.TtsSpeaker;
		Line.PauseAfterSeconds = CsvRow.PauseAfterSeconds;
		Line.EndAction = CsvRow.EndAction;

		SourceSignature = HashCombine(SourceSignature, GetTypeHash(Line.SpeakerSlot.ToLower()));
		SourceSignature = HashCombine(SourceSignature, GetTypeHash(Line.Text));
		SourceSignature = HashCombine(SourceSignature, GetTypeHash(Line.TtsSpeaker.ToLower()));
		SourceSignature = HashCombine(SourceSignature, GetTypeHash(Line.PauseAfterSeconds));
		SourceSignature = HashCombine(SourceSignature, GetTypeHash(Line.EndAction.ToLower()));
	}
	WorkingConversation.SourceSignature = SourceSignature;

	int32 CachedLineCount = 0;
	if (OwnerSubsystem->IsConversationCacheCurrent(ConversationId, SourceSignature, CachedLineCount))
	{
		bFinished = true;
		UE_LOG(LogNPCSubsystem, Display, TEXT("Conversation cache hit: %s (%d lines)"), *ConversationId, CachedLineCount);
		FNPCConversationPrepareCompleted Callback = Completion;
		Callback.ExecuteIfBound(true, CachedLineCount, FString());
		OwnerSubsystem->ReleasePreGenerateTask(this);
		return;
	}

	UGameInstance* GameInstance = OwnerSubsystem->GetGameInstance();
	TTSSubsystem = IsValid(GameInstance) ? GameInstance->GetSubsystem<UAudioCppRuntimeSubsystem>() : nullptr;
	if (!IsValid(TTSSubsystem))
	{
		Fail(TEXT("AudioCppRuntime Subsystem 不可用。"));
		return;
	}

	if (TTSSubsystem->GetServerState() == EAudioCppServerState::Failed)
	{
		Fail(TEXT("CosyVoice 服务处于失败状态，请检查 API 配置。"));
		return;
	}

	if (TTSSubsystem->GetServerState() == EAudioCppServerState::Stopped && !TTSSubsystem->StartServer())
	{
		Fail(TEXT("CosyVoice 服务配置失败。"));
		return;
	}

	UWorld* World = GetWorld();
	if (!IsValid(World))
	{
		Fail(TEXT("NPC Subsystem 当前没有有效的游戏世界。"));
		return;
	}

	ServiceWaitStartedAt = FPlatformTime::Seconds();
	World->GetTimerManager().SetTimer(
		ServicePollTimer,
		this,
		&UNPCConversationPreGenerateTask::PollTTSService,
		NPCSubsystemPrivate::ServicePollIntervalSeconds,
		true);
	PollTTSService();
}

void UNPCConversationPreGenerateTask::Cancel()
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(ServicePollTimer);
	}
	Completion.Unbind();
}

UWorld* UNPCConversationPreGenerateTask::GetWorld() const
{
	return IsValid(OwnerSubsystem) ? OwnerSubsystem->GetWorld() : nullptr;
}

void UNPCConversationPreGenerateTask::PollTTSService()
{
	if (bFinished)
	{
		return;
	}

	if (!IsValid(TTSSubsystem) || TTSSubsystem->GetServerState() == EAudioCppServerState::Failed)
	{
		Fail(TEXT("等待 CosyVoice 就绪时服务失败。"));
		return;
	}

	if (FPlatformTime::Seconds() - ServiceWaitStartedAt > NPCSubsystemPrivate::ServiceStartTimeoutSeconds)
	{
		Fail(TEXT("等待 CosyVoice 服务就绪超时。"));
		return;
	}

	if (TTSSubsystem->IsServerReady())
	{
		if (UWorld* World = GetWorld())
		{
			World->GetTimerManager().ClearTimer(ServicePollTimer);
		}
		GenerateNextLine();
	}
}

void UNPCConversationPreGenerateTask::GenerateNextLine()
{
	if (bFinished)
	{
		return;
	}

	if (!WorkingConversation.Lines.IsValidIndex(CurrentLineIndex))
	{
		Finish();
		return;
	}

	const FNPCCachedDialogueLine& Line = WorkingConversation.Lines[CurrentLineIndex];
	FAudioCppSpeechRequest SpeechRequest;
	SpeechRequest.Text = Line.Text;
	SpeechRequest.Speaker = Line.TtsSpeaker;
	SpeechRequest.MaxTokens = 256;
	SpeechRequest.Seed = -1;

	UE_LOG(
		LogNPCSubsystem,
		Display,
		TEXT("Pre-generating conversation %s: line %d/%d, speaker=%s"),
		*ConversationId,
		CurrentLineIndex + 1,
		WorkingConversation.Lines.Num(),
		*Line.TtsSpeaker);

	FAudioCppSpeechCompleted SpeechCompleted;
	SpeechCompleted.BindDynamic(this, &UNPCConversationPreGenerateTask::HandleSpeechCompleted);
	TTSSubsystem->SynthesizeSpeech(SpeechRequest, SpeechCompleted);
}

void UNPCConversationPreGenerateTask::HandleSpeechCompleted(const FAudioCppSpeechResult& Result)
{
	if (bFinished)
	{
		return;
	}

	if (!Result.bSuccess)
	{
		Fail(FString::Printf(
			TEXT("会话 %s 第 %d 句 TTS 生成失败：%s"),
			*ConversationId,
			CurrentLineIndex + 1,
			*Result.Error));
		return;
	}

	if (!FPaths::FileExists(Result.WavFilePath) || !WorkingConversation.Lines.IsValidIndex(CurrentLineIndex))
	{
		Fail(FString::Printf(TEXT("TTS 返回的 WAV 不存在：%s"), *Result.WavFilePath));
		return;
	}

	WorkingConversation.Lines[CurrentLineIndex].WavFilePath = Result.WavFilePath;
	++CurrentLineIndex;
	GenerateNextLine();
}

void UNPCConversationPreGenerateTask::Finish()
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	const int32 PreparedLineCount = WorkingConversation.Lines.Num();
	UE_LOG(LogNPCSubsystem, Display, TEXT("Conversation prepared: %s (%d lines)"), *ConversationId, PreparedLineCount);
	OwnerSubsystem->StoreCachedConversation(MoveTemp(WorkingConversation));

	FNPCConversationPrepareCompleted Callback = Completion;
	Callback.ExecuteIfBound(true, PreparedLineCount, FString());
	if (IsValid(OwnerSubsystem))
	{
		OwnerSubsystem->ReleasePreGenerateTask(this);
	}
}

void UNPCConversationPreGenerateTask::Fail(const FString& Error)
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(ServicePollTimer);
	}
	UE_LOG(LogNPCSubsystem, Error, TEXT("Conversation pre-generation failed: %s"), *Error);

	FNPCConversationPrepareCompleted Callback = Completion;
	Callback.ExecuteIfBound(false, 0, Error);
	if (IsValid(OwnerSubsystem))
	{
		OwnerSubsystem->ReleasePreGenerateTask(this);
	}
}

void UNPCConversationPlaybackTask::Initialize(
	UNPCSubsystem* InOwner,
	const FString& InConversationId,
	AActor* InActorA,
	AActor* InActorB,
	FNPCConversationPlayCompleted InCompletion)
{
	OwnerSubsystem = InOwner;
	ConversationId = InConversationId;
	ActorA = InActorA;
	ActorB = InActorB;
	Completion = InCompletion;
}

void UNPCConversationPlaybackTask::Start()
{
	ConversationId.TrimStartAndEndInline();
	if (!IsValid(OwnerSubsystem))
	{
		Fail(TEXT("NPC Subsystem 无效。"));
		return;
	}
	if (ConversationId.IsEmpty())
	{
		Fail(TEXT("Conversation ID 不能为空。"));
		return;
	}
	if (!IsValid(ActorA) || !IsValid(ActorB))
	{
		Fail(TEXT("播放会话需要有效的 Actor A 和 Actor B。"));
		return;
	}
	if (!OwnerSubsystem->GetCachedConversation(ConversationId, Conversation) || Conversation.Lines.IsEmpty())
	{
		Fail(FString::Printf(TEXT("会话尚未预生成或缓存不存在：%s"), *ConversationId));
		return;
	}

	UE_LOG(LogNPCSubsystem, Display, TEXT("Playing cached conversation: %s"), *ConversationId);
	PlayNextLine();
}

void UNPCConversationPlaybackTask::Cancel()
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(AudioFinishedTimer);
		World->GetTimerManager().ClearTimer(PauseTimer);
	}
	if (IsValid(ActiveAudioComponent))
	{
		ActiveAudioComponent->OnAudioFinished.RemoveDynamic(this, &UNPCConversationPlaybackTask::HandleAudioFinished);
		ActiveAudioComponent->Stop();
	}
	Completion.Unbind();
}

UWorld* UNPCConversationPlaybackTask::GetWorld() const
{
	return IsValid(OwnerSubsystem) ? OwnerSubsystem->GetWorld() : nullptr;
}

void UNPCConversationPlaybackTask::PlayNextLine()
{
	if (bFinished)
	{
		return;
	}

	if (!Conversation.Lines.IsValidIndex(CurrentLineIndex))
	{
		Complete();
		return;
	}

	const FNPCCachedDialogueLine& Line = Conversation.Lines[CurrentLineIndex];
	AActor* SourceActor = nullptr;
	if (Line.SpeakerSlot.Equals(TEXT("A"), ESearchCase::IgnoreCase))
	{
		SourceActor = ActorA;
	}
	else if (Line.SpeakerSlot.Equals(TEXT("B"), ESearchCase::IgnoreCase))
	{
		SourceActor = ActorB;
	}
	else
	{
		Fail(FString::Printf(TEXT("第 %d 句的 SpeakerSlot 必须是 A 或 B：%s"), CurrentLineIndex + 1, *Line.SpeakerSlot));
		return;
	}

	USceneComponent* AttachComponent = IsValid(SourceActor) ? SourceActor->GetRootComponent() : nullptr;
	if (!IsValid(AttachComponent))
	{
		Fail(FString::Printf(TEXT("第 %d 句对应的 Actor 没有有效 RootComponent。"), CurrentLineIndex + 1));
		return;
	}

	FString SoundError;
	USoundBase* Sound = OwnerSubsystem->CreateSoundBaseFromWav(Line.WavFilePath, SoundError);
	if (!IsValid(Sound))
	{
		Fail(SoundError);
		return;
	}

	ActiveAudioComponent = UGameplayStatics::SpawnSoundAttached(
		Sound,
		AttachComponent,
		NAME_None,
		FVector::ZeroVector,
		FRotator::ZeroRotator,
		EAttachLocation::KeepRelativeOffset,
		true,
		1.0f,
		1.0f,
		0.0f,
		nullptr,
		nullptr,
		true);

	if (!IsValid(ActiveAudioComponent))
	{
		Fail(FString::Printf(TEXT("第 %d 句无法创建 AudioComponent。"), CurrentLineIndex + 1));
		return;
	}

	ActiveAudioComponent->OnAudioFinished.AddDynamic(this, &UNPCConversationPlaybackTask::HandleAudioFinished);

	// USoundWaveProcedural does not reliably broadcast OnAudioFinished when its
	// queued PCM buffer is exhausted. Use the parsed WAV duration as the
	// authoritative end-of-line signal, while keeping OnAudioFinished for sound
	// devices that do report it. HandleAudioFinished is idempotent because the
	// first path clears this timer and removes the delegate.
	const float PlaybackDuration = FMath::Max(0.01f, Sound->GetDuration());
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().SetTimer(
			AudioFinishedTimer,
			this,
			&UNPCConversationPlaybackTask::HandleAudioFinished,
			PlaybackDuration + 0.05f,
			false);
	}
	else
	{
		Fail(TEXT("播放会话时无法取得有效 World。"));
		return;
	}

	UE_LOG(
		LogNPCSubsystem,
		Display,
		TEXT("Conversation %s playing line %d/%d from Actor %s (%.2fs)"),
		*ConversationId,
		CurrentLineIndex + 1,
		Conversation.Lines.Num(),
		*SourceActor->GetName(),
		PlaybackDuration);
}

void UNPCConversationPlaybackTask::HandleAudioFinished()
{
	if (bFinished || !Conversation.Lines.IsValidIndex(CurrentLineIndex))
	{
		return;
	}

	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(AudioFinishedTimer);
	}
	if (IsValid(ActiveAudioComponent))
	{
		ActiveAudioComponent->OnAudioFinished.RemoveDynamic(this, &UNPCConversationPlaybackTask::HandleAudioFinished);
		ActiveAudioComponent->Stop();
	}
	ActiveAudioComponent = nullptr;

	const FNPCCachedDialogueLine& FinishedLine = Conversation.Lines[CurrentLineIndex];
	if (!FinishedLine.EndAction.IsEmpty() &&
		!FinishedLine.EndAction.Equals(TEXT("Continue"), ESearchCase::IgnoreCase))
	{
		FinalEndAction = FName(*FinishedLine.EndAction);
	}

	const float PauseAfterSeconds = FMath::Max(0.0f, FinishedLine.PauseAfterSeconds);
	++CurrentLineIndex;
	if (PauseAfterSeconds > 0.0f)
	{
		if (UWorld* World = GetWorld())
		{
			World->GetTimerManager().SetTimer(
				PauseTimer,
				this,
				&UNPCConversationPlaybackTask::PlayNextLine,
				PauseAfterSeconds,
				false);
			return;
		}
	}

	PlayNextLine();
}

void UNPCConversationPlaybackTask::Complete()
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	UE_LOG(LogNPCSubsystem, Display, TEXT("Conversation completed: %s, EndAction=%s"), *ConversationId, *FinalEndAction.ToString());
	FNPCConversationPlayCompleted Callback = Completion;
	Callback.ExecuteIfBound(FinalEndAction, FString());
	if (IsValid(OwnerSubsystem))
	{
		OwnerSubsystem->ReleasePlaybackTask(this);
	}
}

void UNPCConversationPlaybackTask::Fail(const FString& Error)
{
	if (bFinished)
	{
		return;
	}

	bFinished = true;
	if (UWorld* World = GetWorld())
	{
		World->GetTimerManager().ClearTimer(AudioFinishedTimer);
		World->GetTimerManager().ClearTimer(PauseTimer);
	}
	if (IsValid(ActiveAudioComponent))
	{
		ActiveAudioComponent->OnAudioFinished.RemoveDynamic(this, &UNPCConversationPlaybackTask::HandleAudioFinished);
		ActiveAudioComponent->Stop();
		ActiveAudioComponent = nullptr;
	}
	UE_LOG(LogNPCSubsystem, Error, TEXT("Conversation playback failed: %s"), *Error);

	FNPCConversationPlayCompleted Callback = Completion;
	Callback.ExecuteIfBound(NAME_None, Error);
	if (IsValid(OwnerSubsystem))
	{
		OwnerSubsystem->ReleasePlaybackTask(this);
	}
}

UNPCGenerateVoiceDialogueAsyncAction* UNPCGenerateVoiceDialogueAsyncAction::GenerateNPCVoiceDialogue(
	UObject* InWorldContextObject,
	const FNPCLocalAIDialogueRequest& InRequest)
{
	UNPCGenerateVoiceDialogueAsyncAction* Action = NewObject<UNPCGenerateVoiceDialogueAsyncAction>();
	Action->WorldContextObject = InWorldContextObject;
	Action->Request = InRequest;
	if (IsValid(InWorldContextObject))
	{
		Action->RegisterWithGameInstance(InWorldContextObject);
	}
	return Action;
}

void UNPCGenerateVoiceDialogueAsyncAction::Activate()
{
	UWorld* World = GEngine ? GEngine->GetWorldFromContextObject(WorldContextObject, EGetWorldErrorMode::ReturnNull) : nullptr;
	UGameInstance* GameInstance = World ? World->GetGameInstance() : nullptr;
	UNPCSubsystem* Subsystem = GameInstance ? GameInstance->GetSubsystem<UNPCSubsystem>() : nullptr;
	if (!IsValid(Subsystem))
	{
		HandleCompleted(nullptr, TEXT("无法取得 NPC Subsystem。"));
		return;
	}

	FNPCVoiceDialogueCompleted Callback;
	Callback.BindDynamic(this, &UNPCGenerateVoiceDialogueAsyncAction::HandleCompleted);
	Subsystem->GenerateNPCVoiceDialogue(Request, Callback);
}

void UNPCGenerateVoiceDialogueAsyncAction::HandleCompleted(USoundBase* Sound, const FString& Error)
{
	if (IsValid(Sound) && Error.IsEmpty())
	{
		Completed.Broadcast(Sound, Error);
	}
	else
	{
		Failed.Broadcast(nullptr, Error.IsEmpty() ? TEXT("NPC 语音生成失败。") : Error);
	}

	WorldContextObject = nullptr;
	SetReadyToDestroy();
}

UNPCGenerateConversationCsvAsyncAction* UNPCGenerateConversationCsvAsyncAction::GenerateNPCConversationCsv(
	UObject* InWorldContextObject,
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
	bool bOverwriteExisting)
{
	UNPCGenerateConversationCsvAsyncAction* Action = NewObject<UNPCGenerateConversationCsvAsyncAction>();
	Action->WorldContextObject = InWorldContextObject;
	Action->Request.ConversationId = MoveTemp(ConversationId);
	Action->Request.Scenario = MoveTemp(Scenario);
	Action->Request.SpeakerAProfile = MoveTemp(SpeakerAProfile);
	Action->Request.SpeakerBProfile = MoveTemp(SpeakerBProfile);
	Action->Request.SpeakerATtsSpeaker = MoveTemp(SpeakerATtsSpeaker);
	Action->Request.SpeakerBTtsSpeaker = MoveTemp(SpeakerBTtsSpeaker);
	Action->Request.MaxLines = MaxLines;
	Action->Request.Temperature = Temperature;
	Action->Request.PauseAfterSeconds = PauseAfterSeconds;
	Action->Request.FinalEndAction = MoveTemp(FinalEndAction);
	Action->Request.OutputFileName = MoveTemp(OutputFileName);
	Action->Request.bOverwriteExisting = bOverwriteExisting;
	if (IsValid(InWorldContextObject))
	{
		Action->RegisterWithGameInstance(InWorldContextObject);
	}
	return Action;
}

void UNPCGenerateConversationCsvAsyncAction::Activate()
{
	UWorld* World = GEngine ? GEngine->GetWorldFromContextObject(WorldContextObject, EGetWorldErrorMode::ReturnNull) : nullptr;
	UGameInstance* GameInstance = World ? World->GetGameInstance() : nullptr;
	UNPCSubsystem* Subsystem = GameInstance ? GameInstance->GetSubsystem<UNPCSubsystem>() : nullptr;
	if (!IsValid(Subsystem))
	{
		HandleCompleted(false, FString(), 0, TEXT("无法取得 NPC Subsystem。"));
		return;
	}

	FNPCConversationCsvGenerationCompleted Callback;
	Callback.BindDynamic(this, &UNPCGenerateConversationCsvAsyncAction::HandleCompleted);
	Subsystem->GenerateNPCConversationCsv(Request, Callback);
}

void UNPCGenerateConversationCsvAsyncAction::HandleCompleted(
	bool bSuccess,
	const FString& CsvFilePath,
	int32 GeneratedLineCount,
	const FString& Error)
{
	if (bSuccess && !CsvFilePath.IsEmpty() && Error.IsEmpty())
	{
		Completed.Broadcast(CsvFilePath, GeneratedLineCount);
	}
	else
	{
		Failed.Broadcast(Error.IsEmpty() ? TEXT("NPC 对话 CSV 生成失败。") : Error);
	}

	WorldContextObject = nullptr;
	SetReadyToDestroy();
}

UNPCPreGenerateConversationAsyncAction* UNPCPreGenerateConversationAsyncAction::PreGenerateNPCConversation(
	UObject* InWorldContextObject,
	FString InCsvFilePath,
	FString InConversationId)
{
	UNPCPreGenerateConversationAsyncAction* Action = NewObject<UNPCPreGenerateConversationAsyncAction>();
	Action->WorldContextObject = InWorldContextObject;
	Action->CsvFilePath = MoveTemp(InCsvFilePath);
	Action->ConversationId = MoveTemp(InConversationId);
	if (IsValid(InWorldContextObject))
	{
		Action->RegisterWithGameInstance(InWorldContextObject);
	}
	return Action;
}

void UNPCPreGenerateConversationAsyncAction::Activate()
{
	UWorld* World = GEngine ? GEngine->GetWorldFromContextObject(WorldContextObject, EGetWorldErrorMode::ReturnNull) : nullptr;
	UGameInstance* GameInstance = World ? World->GetGameInstance() : nullptr;
	UNPCSubsystem* Subsystem = GameInstance ? GameInstance->GetSubsystem<UNPCSubsystem>() : nullptr;
	if (!IsValid(Subsystem))
	{
		HandleCompleted(false, 0, TEXT("无法取得 NPC Subsystem。"));
		return;
	}

	FNPCConversationPrepareCompleted Callback;
	Callback.BindDynamic(this, &UNPCPreGenerateConversationAsyncAction::HandleCompleted);
	Subsystem->PreGenerateNPCConversation(CsvFilePath, ConversationId, Callback);
}

void UNPCPreGenerateConversationAsyncAction::HandleCompleted(
	bool bSuccess,
	int32 PreparedLineCount,
	const FString& Error)
{
	if (bSuccess && Error.IsEmpty())
	{
		Completed.Broadcast(PreparedLineCount);
	}
	else
	{
		Failed.Broadcast(Error.IsEmpty() ? TEXT("NPC 会话预生成失败。") : Error);
	}

	WorldContextObject = nullptr;
	SetReadyToDestroy();
}

UNPCPlayCachedConversationAsyncAction* UNPCPlayCachedConversationAsyncAction::PlayCachedNPCConversation(
	UObject* InWorldContextObject,
	FString InConversationId,
	AActor* InActorA,
	AActor* InActorB)
{
	UNPCPlayCachedConversationAsyncAction* Action = NewObject<UNPCPlayCachedConversationAsyncAction>();
	Action->WorldContextObject = InWorldContextObject;
	Action->ConversationId = MoveTemp(InConversationId);
	Action->ActorA = InActorA;
	Action->ActorB = InActorB;
	if (IsValid(InWorldContextObject))
	{
		Action->RegisterWithGameInstance(InWorldContextObject);
	}
	return Action;
}

void UNPCPlayCachedConversationAsyncAction::Activate()
{
	UWorld* World = GEngine ? GEngine->GetWorldFromContextObject(WorldContextObject, EGetWorldErrorMode::ReturnNull) : nullptr;
	UGameInstance* GameInstance = World ? World->GetGameInstance() : nullptr;
	UNPCSubsystem* Subsystem = GameInstance ? GameInstance->GetSubsystem<UNPCSubsystem>() : nullptr;
	if (!IsValid(Subsystem))
	{
		HandleCompleted(NAME_None, TEXT("无法取得 NPC Subsystem。"));
		return;
	}

	FNPCConversationPlayCompleted Callback;
	Callback.BindDynamic(this, &UNPCPlayCachedConversationAsyncAction::HandleCompleted);
	Subsystem->PlayCachedNPCConversation(ConversationId, ActorA, ActorB, Callback);
}

void UNPCPlayCachedConversationAsyncAction::HandleCompleted(FName EndAction, const FString& Error)
{
	if (Error.IsEmpty())
	{
		Completed.Broadcast(EndAction);
	}
	else
	{
		Failed.Broadcast(Error);
	}

	WorldContextObject = nullptr;
	ActorA = nullptr;
	ActorB = nullptr;
	SetReadyToDestroy();
}
