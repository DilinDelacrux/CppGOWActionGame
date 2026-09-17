// Fill out your copyright notice in the Description page of Project Settings.


#include "WarriorFunctionLibrary.h"
#include "AbilitySystem/WarriorAbilitySystemComponent.h"
#include "AbilitySystemBlueprintLibrary.h"
#include "GenericTeamAgentInterface.h"
#include "WarriorGameplayTags.h"
#include "Interfaces/PawnCombatInterface.h"
#include "Kismet/KismetMathLibrary.h"
#include "Misc/WarriorCountDownAction.h"
#include "Misc/WarriorDebugHelper.h"
#include "WarriorGameInstance.h"
#include "Blueprint/WidgetLayoutLibrary.h"
#include "Components/SizeBox.h"
#include "Kismet/GameplayStatics.h"
#include "Kismet/KismetSystemLibrary.h"
#include "HAL/FileManager.h"
#include "Misc/DateTime.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"
#include "SaveGame/WarriorSaveGame.h"
#include "Serialization/Csv/CsvParser.h"

namespace WarriorDialogueCsv
{
	FString ResolvePath(const FString& InputPath)
	{
		FString NormalizedPath = InputPath;
		NormalizedPath.TrimStartAndEndInline();
		FPaths::NormalizeFilename(NormalizedPath);

		if (!FPaths::IsRelative(NormalizedPath))
		{
			return FPaths::ConvertRelativePathToFull(NormalizedPath);
		}

		if (NormalizedPath.StartsWith(TEXT("Content/"), ESearchCase::IgnoreCase))
		{
			return FPaths::ConvertRelativePathToFull(FPaths::Combine(FPaths::ProjectDir(), NormalizedPath));
		}

		return FPaths::ConvertRelativePathToFull(FPaths::Combine(FPaths::ProjectContentDir(), NormalizedPath));
	}

	FString NormalizeHeader(const TCHAR* Header)
	{
		FString Result = Header ? Header : TEXT("");
		Result.TrimStartAndEndInline();
		Result.ToLowerInline();
		return Result;
	}

	FString GetCell(const TArray<const TCHAR*>& Row, int32 ColumnIndex)
	{
		if (!Row.IsValidIndex(ColumnIndex) || Row[ColumnIndex] == nullptr)
		{
			return FString();
		}

		FString Value(Row[ColumnIndex]);
		Value.TrimStartAndEndInline();
		return Value;
	}
}


UWarriorAbilitySystemComponent* UWarriorFunctionLibrary::NativeGetWarriorASCFromActor(AActor* InActor)
{
	check(InActor);
	return CastChecked<UWarriorAbilitySystemComponent>(UAbilitySystemBlueprintLibrary::GetAbilitySystemComponent(InActor));
}

void UWarriorFunctionLibrary::AddGameplayTagToActorIfNone(AActor* InActor, FGameplayTag TagToAdd)
{
	UWarriorAbilitySystemComponent* ASC = NativeGetWarriorASCFromActor(InActor);
	if(!ASC->HasMatchingGameplayTag(TagToAdd))
	{
		ASC->AddLooseGameplayTag(TagToAdd);
	}
}

void UWarriorFunctionLibrary::RemoveGameplayTagToActorIfFound(AActor* InActor, FGameplayTag TagToRemove)
{
	UWarriorAbilitySystemComponent* ASC = NativeGetWarriorASCFromActor(InActor);
	if(ASC->HasMatchingGameplayTag(TagToRemove))
	{
		ASC->RemoveLooseGameplayTag(TagToRemove);
	}
}
bool UWarriorFunctionLibrary::NativeDoesActorHaveTag(AActor* InActor, FGameplayTag TagToCheck)
{
	UWarriorAbilitySystemComponent* ASC = NativeGetWarriorASCFromActor(InActor);
	return ASC->HasMatchingGameplayTag(TagToCheck);
}

void UWarriorFunctionLibrary::BP_DoesActorHaveTag(AActor* InActor, FGameplayTag TagToCheck,
	EWarriorConfirmType& OutConfirmType)
{
	OutConfirmType = NativeDoesActorHaveTag(InActor,TagToCheck)?EWarriorConfirmType::YES:EWarriorConfirmType::NO;
}

UPawnCombatComponent* UWarriorFunctionLibrary::NativeGetCombatComponentFromActor(AActor* InActor)
{
	check(InActor);

	if(IPawnCombatInterface* PawnCombatInterface = Cast<IPawnCombatInterface>(InActor))
	{
		return PawnCombatInterface->GetPawnCombatComponent();
	}
	return nullptr;
}

UPawnCombatComponent* UWarriorFunctionLibrary::BP_GetCombatComponentFromActor(AActor* InActor,
	EWarriorValidType& OutValidType)
{
	UPawnCombatComponent* CombatComponent = NativeGetCombatComponentFromActor(InActor);
	
	OutValidType=CombatComponent?EWarriorValidType::Valid:EWarriorValidType::Invalid;

	return CombatComponent;
}

bool UWarriorFunctionLibrary::IsTargetPawnHostile(APawn* QueryPawn, APawn* TargetPawn)
{
	check(QueryPawn && TargetPawn);

	IGenericTeamAgentInterface* QueryTeamAgent = Cast<IGenericTeamAgentInterface>(QueryPawn->GetController());
	IGenericTeamAgentInterface* TargetTeamAgent = Cast<IGenericTeamAgentInterface>(TargetPawn->GetController());

	if (QueryTeamAgent && TargetTeamAgent)
	{
		return QueryTeamAgent->GetGenericTeamId() != TargetTeamAgent->GetGenericTeamId();
	}

	return false;
}

float UWarriorFunctionLibrary::GetScalableFloatValueAtLevel(const FScalableFloat& InScalableFloat, float InLevel)
{
	return InScalableFloat.GetValueAtLevel(InLevel);
}

FGameplayTag UWarriorFunctionLibrary::ComputeHitReactDirectionTag(AActor* InAttacker, AActor* InVictim,
	float& OutAngleDifference)
{
	check(InAttacker && InVictim);

	const FVector VictimForward = InVictim->GetActorForwardVector();
	const FVector VictimToAttackerNormalized = (InAttacker->GetActorLocation() - InVictim->GetActorLocation()).GetSafeNormal();

	const float DotResult = FVector::DotProduct(VictimForward,VictimToAttackerNormalized);
	OutAngleDifference = UKismetMathLibrary::DegAcos(DotResult);

	const FVector CrossResult = FVector::CrossProduct(VictimForward,VictimToAttackerNormalized);

	if (CrossResult.Z < 0.f)
	{
		OutAngleDifference *= -1.f;
	}

	if (OutAngleDifference>=-45.f && OutAngleDifference <=45.f)
	{
		return WarriorGameplayTags::Shared_Status_HitReact_Front;
	}
	else if (OutAngleDifference<-45.f && OutAngleDifference>=-135.f)
	{
		return WarriorGameplayTags::Shared_Status_HitReact_Left;
	}
	else if (OutAngleDifference<-135.f || OutAngleDifference>135.f)
	{
		return WarriorGameplayTags::Shared_Status_HitReact_Back;
	}
	else if(OutAngleDifference>45.f && OutAngleDifference<=135.f)
	{
		return WarriorGameplayTags::Shared_Status_HitReact_Right;
	}

	return WarriorGameplayTags::Shared_Status_HitReact_Front;
}

bool UWarriorFunctionLibrary::IsValidBlock(AActor* InAttacker, AActor* InDefender,float threshold)
{
	check(InAttacker && InDefender);

	const FVector DefenderForward = InDefender->GetActorForwardVector().GetSafeNormal2D();
	const FVector DefenderToAttacker = (InAttacker->GetActorLocation() - InDefender->GetActorLocation()).GetSafeNormal2D();

	const float FacingDot = FVector::DotProduct(DefenderForward, DefenderToAttacker);
	const bool bValidBlock = FacingDot > threshold;

	const FString DebugString = FString::Printf(TEXT("Facing Dot Result: %f %s"), FacingDot, bValidBlock ? TEXT("Valid Block") : TEXT("InvalidBlock"));
	Debug::Print(DebugString, bValidBlock ? FColor::Green : FColor::Red);

	return bValidBlock;
}

bool UWarriorFunctionLibrary::ApplyGameplayEffectSpecHandleToTargetActor(AActor* InInstigator, AActor* InTargetActor,
	const FGameplayEffectSpecHandle& InSpecHandle)
{
	UWarriorAbilitySystemComponent* SourceASC = NativeGetWarriorASCFromActor(InInstigator);
	UWarriorAbilitySystemComponent* TargetASC = NativeGetWarriorASCFromActor(InTargetActor);

	FActiveGameplayEffectHandle ActiveGameplayEffectHandle = SourceASC->ApplyGameplayEffectSpecToTarget(*InSpecHandle.Data,TargetASC);

	return ActiveGameplayEffectHandle.WasSuccessfullyApplied();
}

void UWarriorFunctionLibrary::CountDown(const UObject* WorldContextObject, float TotalTime, float UpdateInterval,
	float& OutRemainingTime, EWarriorCountDownActionInput CountDownInput,
	EWarriorCountDownActionOutput& CountDownOutput, FLatentActionInfo LatentInfo)
{
	UWorld* World = nullptr;
	if (GEngine)
	{
		World = GEngine->GetWorldFromContextObject(WorldContextObject,EGetWorldErrorMode::LogAndReturnNull);
	}
	if (!World)
	{
		return;
	}

	FLatentActionManager& LatentActionManager = World->GetLatentActionManager();

	FWarriorCountDownAction* FoundAction = LatentActionManager.FindExistingAction<FWarriorCountDownAction>(LatentInfo.CallbackTarget,LatentInfo.UUID);

	if (CountDownInput == EWarriorCountDownActionInput::Start)
	{
		if (!FoundAction)
		{
			LatentActionManager.AddNewAction(LatentInfo.CallbackTarget,LatentInfo.UUID,
			new FWarriorCountDownAction(TotalTime,UpdateInterval,OutRemainingTime,CountDownOutput,LatentInfo)
			);
		}
	}

	if (CountDownInput == EWarriorCountDownActionInput::Cancel)
	{
		if (FoundAction)
		{
			FoundAction->CancelAction();
		}
	}
}

UWarriorGameInstance* UWarriorFunctionLibrary::GetWarriorGameInstance(const UObject* WorldContextObject)
{
	if (GEngine)
	{
		if (UWorld* World = GEngine->GetWorldFromContextObject(WorldContextObject, EGetWorldErrorMode::LogAndReturnNull))
		{
			return World->GetGameInstance<UWarriorGameInstance>();
		}
	}
	return nullptr;
}

void UWarriorFunctionLibrary::ToggleInputMode(const UObject* WorldContextObject, EWarriorInputMode InInputMode)
{
	APlayerController* PlayerController = nullptr;

	if (GEngine)
	{
		if (UWorld* World = GEngine->GetWorldFromContextObject(WorldContextObject, EGetWorldErrorMode::LogAndReturnNull))
		{
			PlayerController = World->GetFirstPlayerController();
		}
	}

	if (!PlayerController)
	{
		return;
	}
	
	FInputModeGameOnly GameOnlyMode;
	FInputModeUIOnly UIOnlyMode;

	switch (InInputMode)
	{
	case EWarriorInputMode::GameOnly:
		PlayerController->SetInputMode(GameOnlyMode);
		PlayerController->bShowMouseCursor = false;
		break;

	case EWarriorInputMode::UIOnly:
		PlayerController->SetInputMode(UIOnlyMode);
		PlayerController->bShowMouseCursor = true;
		break;

	default:
		break;
	}
}

void UWarriorFunctionLibrary::SaveCurrentGameDifficulty(EWarriorGameDifficulty InDifficultyToSave)
{
	USaveGame* SaveGameObject = UGameplayStatics::CreateSaveGameObject(UWarriorSaveGame::StaticClass());

	if (UWarriorSaveGame* WarriorSaveGameObject = Cast<UWarriorSaveGame>(SaveGameObject))
	{
		WarriorSaveGameObject->SavedCurrentGameDifficulty = InDifficultyToSave;

		const bool bWasSaved = UGameplayStatics::SaveGameToSlot(WarriorSaveGameObject,WarriorGameplayTags::GameData_SaveGame_Slot_1.GetTag().ToString(),0);

		Debug::Print(bWasSaved? TEXT("Difficulty Saved") : TEXT("Difficulty NOT Saved"));
	}
}

bool UWarriorFunctionLibrary::TryLoadSavedGameDifficulty(EWarriorGameDifficulty& OutSavedDifficulty)
{
	if (UGameplayStatics::DoesSaveGameExist(WarriorGameplayTags::GameData_SaveGame_Slot_1.GetTag().ToString(), 0))
	{
		USaveGame* SaveGameObject = UGameplayStatics::LoadGameFromSlot(WarriorGameplayTags::GameData_SaveGame_Slot_1.GetTag().ToString(),0);

		if (UWarriorSaveGame* WarriorSaveGameObject = Cast<UWarriorSaveGame>(SaveGameObject))
		{
			OutSavedDifficulty = WarriorSaveGameObject->SavedCurrentGameDifficulty;

			Debug::Print(TEXT("Loading Successful"),FColor::Green);

			return true;
		}
	}

	return false;
}

void UWarriorFunctionLibrary::PrintStringWithTimestamp(
	const UObject* WorldContextObject,
	const FString& InString,
	bool bPrintToScreen,
	bool bPrintToLog,
	FLinearColor TextColor,
	float Duration,
	FName Key)
{
	const FString TimestampedString = FString::Printf(
		TEXT("%s-%s"),
		*FDateTime::Now().ToString(TEXT("%H:%M:%S:%s")),
		*InString);

	UKismetSystemLibrary::PrintString(
		WorldContextObject,
		TimestampedString,
		bPrintToScreen,
		bPrintToLog,
		TextColor,
		Duration,
		Key);
}

bool UWarriorFunctionLibrary::LoadNPCDialogueCsv(
	const FString& CsvFilePath,
	const FString& ConversationId,
	TArray<FWarriorNPCDialogueCsvRow>& OutRows,
	FString& OutError)
{
	OutRows.Reset();
	OutError.Reset();

	if (CsvFilePath.TrimStartAndEnd().IsEmpty())
	{
		OutError = TEXT("CSV 路径不能为空。");
		return false;
	}

	const FString AbsolutePath = WarriorDialogueCsv::ResolvePath(CsvFilePath);
	if (!FPaths::FileExists(AbsolutePath))
	{
		OutError = FString::Printf(TEXT("找不到 NPC 对话 CSV：%s"), *AbsolutePath);
		return false;
	}

	FString CsvContent;
	// CSV is an authoring file and may still be open in a spreadsheet editor or
	// touched by Unreal's directory watcher. Allow concurrent writers while we
	// take a read snapshot so data-driven dialogue can be reloaded during PIE.
	if (!FFileHelper::LoadFileToString(
		CsvContent,
		*AbsolutePath,
		FFileHelper::EHashOptions::None,
		FILEREAD_AllowWrite | FILEREAD_Silent))
	{
		OutError = FString::Printf(
			TEXT("无法读取 NPC 对话 CSV（文件可能正被独占占用）：%s"),
			*AbsolutePath);
		return false;
	}

	FCsvParser Parser(MoveTemp(CsvContent));
	const FCsvParser::FRows& CsvRows = Parser.GetRows();
	if (CsvRows.Num() < 2)
	{
		OutError = TEXT("NPC 对话 CSV 没有数据行。");
		return false;
	}

	TMap<FString, int32> Columns;
	for (int32 ColumnIndex = 0; ColumnIndex < CsvRows[0].Num(); ++ColumnIndex)
	{
		Columns.Add(WarriorDialogueCsv::NormalizeHeader(CsvRows[0][ColumnIndex]), ColumnIndex);
	}

	const TArray<FString> RequiredHeaders = {
		TEXT("rowname"),
		TEXT("conversationid"),
		TEXT("lineindex"),
		TEXT("speakerslot"),
		TEXT("text"),
		TEXT("ttsspeaker"),
		TEXT("pauseafterseconds"),
		TEXT("endaction")
	};

	for (const FString& RequiredHeader : RequiredHeaders)
	{
		if (!Columns.Contains(RequiredHeader))
		{
			OutError = FString::Printf(TEXT("NPC 对话 CSV 缺少列：%s"), *RequiredHeader);
			return false;
		}
	}

	const FString RequestedConversationId = ConversationId.TrimStartAndEnd();
	TSet<FString> SeenRowNames;
	TSet<FString> SeenConversationLines;

	for (int32 CsvRowIndex = 1; CsvRowIndex < CsvRows.Num(); ++CsvRowIndex)
	{
		const TArray<const TCHAR*>& CsvRow = CsvRows[CsvRowIndex];
		bool bHasAnyValue = false;
		for (const TCHAR* Cell : CsvRow)
		{
			if (Cell != nullptr && !FString(Cell).TrimStartAndEnd().IsEmpty())
			{
				bHasAnyValue = true;
				break;
			}
		}
		if (!bHasAnyValue)
		{
			continue;
		}

		FWarriorNPCDialogueCsvRow ParsedRow;
		ParsedRow.RowName = WarriorDialogueCsv::GetCell(CsvRow, Columns[TEXT("rowname")]);
		ParsedRow.ConversationId = WarriorDialogueCsv::GetCell(CsvRow, Columns[TEXT("conversationid")]);
		ParsedRow.SpeakerSlot = WarriorDialogueCsv::GetCell(CsvRow, Columns[TEXT("speakerslot")]);
		ParsedRow.Text = WarriorDialogueCsv::GetCell(CsvRow, Columns[TEXT("text")]);
		ParsedRow.TtsSpeaker = WarriorDialogueCsv::GetCell(CsvRow, Columns[TEXT("ttsspeaker")]);
		ParsedRow.EndAction = WarriorDialogueCsv::GetCell(CsvRow, Columns[TEXT("endaction")]);

		const FString LineIndexText = WarriorDialogueCsv::GetCell(CsvRow, Columns[TEXT("lineindex")]);
		if (!LexTryParseString(ParsedRow.LineIndex, *LineIndexText) || ParsedRow.LineIndex <= 0)
		{
			OutError = FString::Printf(TEXT("CSV 第 %d 行的 LineIndex 无效：%s"), CsvRowIndex + 1, *LineIndexText);
			OutRows.Reset();
			return false;
		}

		const FString PauseText = WarriorDialogueCsv::GetCell(CsvRow, Columns[TEXT("pauseafterseconds")]);
		if (!PauseText.IsEmpty() && !LexTryParseString(ParsedRow.PauseAfterSeconds, *PauseText))
		{
			OutError = FString::Printf(TEXT("CSV 第 %d 行的 PauseAfterSeconds 无效：%s"), CsvRowIndex + 1, *PauseText);
			OutRows.Reset();
			return false;
		}
		ParsedRow.PauseAfterSeconds = FMath::Max(0.0f, ParsedRow.PauseAfterSeconds);

		if (ParsedRow.RowName.IsEmpty() || ParsedRow.ConversationId.IsEmpty() ||
			ParsedRow.SpeakerSlot.IsEmpty() || ParsedRow.Text.IsEmpty())
		{
			OutError = FString::Printf(
				TEXT("CSV 第 %d 行缺少必填值：RowName、ConversationId、SpeakerSlot 或 Text。"),
				CsvRowIndex + 1);
			OutRows.Reset();
			return false;
		}

		const FString NormalizedRowName = ParsedRow.RowName.ToLower();
		if (SeenRowNames.Contains(NormalizedRowName))
		{
			OutError = FString::Printf(TEXT("CSV 第 %d 行存在重复 RowName：%s"), CsvRowIndex + 1, *ParsedRow.RowName);
			OutRows.Reset();
			return false;
		}
		SeenRowNames.Add(NormalizedRowName);

		const FString ConversationLineKey = FString::Printf(
			TEXT("%s:%d"),
			*ParsedRow.ConversationId.ToLower(),
			ParsedRow.LineIndex);
		if (SeenConversationLines.Contains(ConversationLineKey))
		{
			OutError = FString::Printf(
				TEXT("CSV 第 %d 行存在重复的 ConversationId + LineIndex：%s"),
				CsvRowIndex + 1,
				*ConversationLineKey);
			OutRows.Reset();
			return false;
		}
		SeenConversationLines.Add(ConversationLineKey);

		if (RequestedConversationId.IsEmpty() ||
			ParsedRow.ConversationId.Equals(RequestedConversationId, ESearchCase::IgnoreCase))
		{
			OutRows.Add(MoveTemp(ParsedRow));
		}
	}

	if (OutRows.IsEmpty())
	{
		OutError = RequestedConversationId.IsEmpty()
			? TEXT("NPC 对话 CSV 没有有效数据行。")
			: FString::Printf(TEXT("CSV 中找不到 ConversationId：%s"), *RequestedConversationId);
		return false;
	}

	OutRows.Sort([](const FWarriorNPCDialogueCsvRow& Left, const FWarriorNPCDialogueCsvRow& Right)
	{
		const int32 ConversationCompare = Left.ConversationId.Compare(Right.ConversationId, ESearchCase::IgnoreCase);
		return ConversationCompare == 0
			? Left.LineIndex < Right.LineIndex
			: ConversationCompare < 0;
	});

	return true;
}

FVector2D UWarriorFunctionLibrary::CalculateUIScreenPositionByActor(AActor* Actor,FVector2D WidgetSize)
{
	FVector2D ScreenPosition = FVector2D::ZeroVector; 
	
    if (!Actor)
    {
        return ScreenPosition;
    }
    APlayerController* PlayerController = UGameplayStatics::GetPlayerController(Actor->GetWorld(), 0); 
    
    if (!PlayerController)
    {
        return ScreenPosition;
    }
    UWidgetLayoutLibrary::ProjectWorldLocationToWidgetPosition(
       PlayerController, // 传入 PlayerController
       Actor->GetActorLocation(),
       ScreenPosition,
       true
    );

    // 如果 `WidgetSize` 不是零，则进行居中偏移。
    if (WidgetSize != FVector2D::ZeroVector)
    {
        // 计算 UI 控件需要偏移的量，以使其中心对准世界位置的投影点
        ScreenPosition -= (WidgetSize / 2.f);
    }
    // ⚠️ 注意：如果 WidgetSize 为零，UI 将不会被正确居中。

    return ScreenPosition;
}

bool UWarriorFunctionLibrary::FindClosestHitIgnoreActors(const TArray<FHitResult>& HitResults,
	FHitResult& OutClosestHit, const TArray<AActor*>& ActorsToIgnore)
{
	if (HitResults.IsEmpty())
	{
		return false;
	}

	float ClosestDistance = FLT_MAX;
	FHitResult ClosestHit;
	bool bFoundValidHit = false;

	for (const FHitResult& Hit : HitResults)
	{
		if (!Hit.IsValidBlockingHit() || !Hit.GetActor())
		{
			continue;
		}

		// 检查是否在忽略列表中
		bool bShouldIgnore = false;
		for (AActor* IgnoredActor : ActorsToIgnore)
		{
			if (IgnoredActor && Hit.GetActor() == IgnoredActor)
			{
				bShouldIgnore = true;
				break;
			}
		}

		if (bShouldIgnore)
		{
			continue;
		}

		if (Hit.Distance < ClosestDistance)
		{
			ClosestDistance = Hit.Distance;
			ClosestHit = Hit;
			bFoundValidHit = true;
		}
	}

	if (bFoundValidHit)
	{
		OutClosestHit = ClosestHit;
		return true;
	}

	return false;
}

bool UWarriorFunctionLibrary::FindClosestHitToReferencePoint(const TArray<FHitResult>& HitResults,
	const FVector& ReferencePoint, FHitResult& OutClosestHit, AActor* ActorToIgnore)
{
	if (HitResults.IsEmpty())
	{
		return false;
	}

	float ClosestDistance = FLT_MAX;
	FHitResult ClosestHit;
	bool bFoundValidHit = false;

	for (const FHitResult& Hit : HitResults)
	{
		// 跳过无效的Hit
		if (!Hit.IsValidBlockingHit() || !Hit.GetActor())
		{
			continue;
		}

		// 跳过指定的Actor
		if (ActorToIgnore && Hit.GetActor() == ActorToIgnore)
		{
			continue;
		}

		// 使用参照点到Hit位置的距离（而不是Trace的距离）
		float DistanceToReference = FVector::Distance(ReferencePoint, Hit.ImpactPoint);
        
		if (DistanceToReference < ClosestDistance)
		{
			ClosestDistance = DistanceToReference;
			ClosestHit = Hit;
			bFoundValidHit = true;
		}
	}

	if (bFoundValidHit)
	{
		OutClosestHit = ClosestHit;
		return true;
	}

	return false;
}

bool UWarriorFunctionLibrary::FindNearestHostileActorInBox(const UObject* WorldContextObject, AActor* QueryActor,
	const FVector BoxCenterOffset, const FVector BoxHalfSize, AActor*& OutNearestActor)
{
	OutNearestActor = nullptr;

	if (!WorldContextObject || !QueryActor)
	{
		return false;
	}

	APawn* QueryPawn = Cast<APawn>(QueryActor);
	if (!QueryPawn) 
	{
		// 如果发起查询的Actor不是Pawn，则无法判断敌对关系，返回失败
		return false; 
	}
    
	// 1. 计算搜索盒的世界中心位置
	const FVector SearchBoxCenter = QueryActor->GetActorLocation() + QueryActor->GetActorRotation().RotateVector(BoxCenterOffset);

	// 2. 准备 BoxOverlapActors 的参数
	TArray<AActor*> OverlappingActors;
	
	// 定义要忽略的Actor，通常是自身
	TArray<AActor*> ActorsToIgnore;
	ActorsToIgnore.Add(QueryActor);

	// 使用 KismetSystemLibrary::BoxOverlapActors 进行碰撞查询。
	// ECC_Pawn 是一个常见且适用于Pawn的碰撞通道，您可能需要根据项目设置调整。
	// APawn::StaticClass() 意味着我们只关心那些是 Pawn 类的 Actor。
	bool bOverlapped = UKismetSystemLibrary::BoxOverlapActors(
		WorldContextObject, 
		SearchBoxCenter, 
		BoxHalfSize, 
		// 目标 Actor 类型：只查询 Pawn 类
		TArray<TEnumAsByte<EObjectTypeQuery>>({ UEngineTypes::ConvertToObjectType(ECollisionChannel::ECC_Pawn) }),
		APawn::StaticClass(), 
		ActorsToIgnore, 
		OverlappingActors
	);

	if (!bOverlapped || OverlappingActors.Num() == 0)
	{
		return false;
	}

	float NearestSqDistance = FLT_MAX;
	AActor* CurrentNearestActor = nullptr;
    
	// 3. 遍历找到的Actor，筛选敌对Actor/Pawn，并找到最近的一个
	for (AActor* Actor : OverlappingActors)
	{
		// Cast 确保它是 Pawn，因为 IsTargetPawnHostile 需要 Pawn
		APawn* TargetPawn = Cast<APawn>(Actor);

		if (TargetPawn)
		{
			// 使用提供的函数判断是否敌对
			if (IsTargetPawnHostile(QueryPawn, TargetPawn))
			{
				// 计算平方距离以避免开方运算，提高性能
				const float SqDistance = FVector::DistSquared(QueryActor->GetActorLocation(), Actor->GetActorLocation());
				
				if (SqDistance < NearestSqDistance)
				{
					NearestSqDistance = SqDistance;
					CurrentNearestActor = Actor; // 保存 Actor (符合您的要求)
				}
			}
		}
	}

	OutNearestActor = CurrentNearestActor;
	return OutNearestActor != nullptr;
}
