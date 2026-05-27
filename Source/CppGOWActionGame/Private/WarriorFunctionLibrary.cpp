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
#include "SaveGame/WarriorSaveGame.h"


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

	const float DotResult = FVector::DotProduct(InAttacker->GetActorForwardVector(),InDefender->GetActorForwardVector());

	const FString DebugString = FString::Printf(TEXT("Dot Result: %f %s"),DotResult,DotResult<-threshold? TEXT("Valid Block") : TEXT("InvalidBlock"));

	Debug::Print(DebugString,DotResult<-threshold? FColor::Green : FColor::Red);

	return DotResult<-threshold? true : false;
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
	const FVector SearchBoxCenter = QueryActor->GetActorLocation() + BoxCenterOffset;

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
