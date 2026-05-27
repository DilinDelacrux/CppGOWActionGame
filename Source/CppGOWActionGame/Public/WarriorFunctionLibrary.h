// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameplayTagContainer.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "Misc/WarriorEnumTypes.h"
#include "WarriorFunctionLibrary.generated.h"

class UWarriorGameInstance;
struct FGameplayEffectSpecHandle;
struct FScalableFloat;
class UPawnCombatComponent;
class UWarriorAbilitySystemComponent;

/**
 * 
 */
UCLASS()
class CPPGOWACTIONGAME_API UWarriorFunctionLibrary : public UBlueprintFunctionLibrary
{
	GENERATED_BODY()

public:
	static UWarriorAbilitySystemComponent* NativeGetWarriorASCFromActor(AActor* InActor);

	UFUNCTION(BlueprintCallable,Category="Warrior|FunctionLibrary")
	static void AddGameplayTagToActorIfNone(AActor* InActor,FGameplayTag TagToAdd);
	
	UFUNCTION(BlueprintCallable,Category="Warrior|FunctionLibrary")
	static void RemoveGameplayTagToActorIfFound(AActor* InActor,FGameplayTag TagToRemove);

	static bool NativeDoesActorHaveTag(AActor* InActor,FGameplayTag TagToCheck);

	UFUNCTION(BlueprintCallable,Category="Warrior|FunctionLibrary",meta=(DisplayName="Does Actor Have Tag",ExpandEnumAsExecs="OutConfirmType"))
	static void BP_DoesActorHaveTag(AActor* InActor,FGameplayTag TagToCheck,EWarriorConfirmType& OutConfirmType );

	static UPawnCombatComponent* NativeGetCombatComponentFromActor(AActor* InActor);

	UFUNCTION(BlueprintCallable,Category="Warrior|FunctionLibrary",meta=(DisplayName="Get Pawn Combat Component From Actor",ExpandEnumAsExecs="OutValidType"))
	static UPawnCombatComponent* BP_GetCombatComponentFromActor(AActor* InActor,EWarriorValidType& OutValidType);

	UFUNCTION(BlueprintPure, Category = "Warrior|FunctionLibrary")
	static bool IsTargetPawnHostile(APawn* QueryPawn,APawn* TargetPawn);

	UFUNCTION(BlueprintPure, Category = "Warrior|FunctionLibrary", meta = (CompactNodeTitle = "Get Value At Level"))
	static float GetScalableFloatValueAtLevel(const FScalableFloat& InScalableFloat,float InLevel = 1.f);

	UFUNCTION(BlueprintPure, Category = "Warrior|FunctionLibrary")
	static FGameplayTag ComputeHitReactDirectionTag(AActor* InAttacker,AActor* InVictim,float& OutAngleDifference);

	UFUNCTION(BlueprintPure, Category = "Warrior|FunctionLibrary")
	static bool IsValidBlock(AActor* InAttacker,AActor* InDefender,float threshold=0.1f);

	UFUNCTION(BlueprintCallable,Category = "Warrior|FunctionLibrary")
	static bool ApplyGameplayEffectSpecHandleToTargetActor(AActor* InInstigator,AActor* InTargetActor,const FGameplayEffectSpecHandle& InSpecHandle);
	
	UFUNCTION(BlueprintCallable, Category = "Warrior|FunctionLibrary", meta = (Latent, WorldContext = "WorldContextObject", LatentInfo = "LatentInfo", ExpandEnumAsExecs = "CountDownInput|CountDownOutput",TotalTime = "1.0",UpdateInterval = "0.1"))
	static void CountDown(const UObject* WorldContextObject,float TotalTime,float UpdateInterval,float& OutRemainingTime,EWarriorCountDownActionInput CountDownInput,UPARAM(DisplayName = "Output") EWarriorCountDownActionOutput & CountDownOutput, FLatentActionInfo LatentInfo);

	UFUNCTION(BlueprintPure, Category = "Warrior|FunctionLibrary", meta = (WorldContext = "WorldContextObject"))
	static UWarriorGameInstance* GetWarriorGameInstance(const UObject* WorldContextObject);

	UFUNCTION(BlueprintCallable,Category = "Warrior|FunctionLibrary", meta = (WorldContext = "WorldContextObject"))
	static void ToggleInputMode(const UObject* WorldContextObject,EWarriorInputMode InInputMode);

	UFUNCTION(BlueprintCallable,Category = "Warrior|FunctionLibrary")
	static void SaveCurrentGameDifficulty(EWarriorGameDifficulty InDifficultyToSave);

	UFUNCTION(BlueprintCallable,Category = "Warrior|FunctionLibrary")
	static bool TryLoadSavedGameDifficulty(EWarriorGameDifficulty& OutSavedDifficulty);

	UFUNCTION(BlueprintCallable,Category = "Warrior|FunctionLibrary")
	static FVector2D CalculateUIScreenPositionByActor(AActor* Actor, FVector2D WidgetSize);

	UFUNCTION(BlueprintCallable, BlueprintPure, Category = "Trace|Utilities", meta = (DisplayName = "Find Closest Hit Ignore Actors"))
	static bool FindClosestHitIgnoreActors(const TArray<FHitResult>& HitResults,FHitResult& OutClosestHit,const TArray<AActor*>& ActorsToIgnore);

	UFUNCTION(BlueprintCallable, BlueprintPure, Category = "Trace|Utilities", meta = (DisplayName = "Find Closest Hit To Reference Point"))
	static bool FindClosestHitToReferencePoint(const TArray<FHitResult>& HitResults,const FVector& ReferencePoint,FHitResult& OutClosestHit,AActor* ActorToIgnore = nullptr);

	/**
	 * 在指定范围和体积内，查找距离最近的敌对Pawn。
	 * 使用Actor的世界坐标、一个中心点偏移和半长宽高来定义搜索范围。
	 * @param WorldContextObject 用于获取世界的对象（通常为 'this' 或任意对象）
	 * @param QueryActor 发起查询的Actor，用于确定搜索范围的原点。
	 * @param BoxCenterOffset 相对于QueryActor位置的中心偏移。
	 * @param BoxHalfSize 搜索盒的半长宽高（Half Extents）。
	 * @param OutNearestPawn 找到的最近的敌对Pawn（如果找到）。
	 * @return 如果成功找到一个最近的敌对Pawn，则返回true。
	 */
	/**
		 * 在指定范围和体积内，查找距离最近的敌对Actor。
		 * 使用Actor的世界坐标、一个中心点偏移和半长宽高来定义搜索范围。
		 * @param WorldContextObject 用于获取世界的对象（通常为 'this' 或任意对象）
		 * @param QueryActor 发起查询的Actor，用于确定搜索范围的原点。
		 * @param BoxCenterOffset 相对于QueryActor位置的中心偏移。
		 * @param BoxHalfSize 搜索盒的半长宽高（Half Extents）。
		 * @param OutNearestActor 找到的最近的敌对Actor（如果找到）。
		 * @return 如果成功找到一个最近的敌对Actor，则返回true。
		 */
	UFUNCTION(BlueprintCallable, Category = "Warrior|FunctionLibrary", meta = (WorldContext = "WorldContextObject", DeterminesOutputType = "OutNearestActor"))
	static bool FindNearestHostileActorInBox(
		const UObject* WorldContextObject, 
		AActor* QueryActor, 
		const FVector BoxCenterOffset, 
		const FVector BoxHalfSize, 
		AActor*& OutNearestActor
	);
};
