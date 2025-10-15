// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameplayTagContainer.h"
#include "Components/PawnExtensionComponentBase.h"
#include "PawnUIComponent.generated.h"

/**
 * 
 */
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnPercentChangedDelegate,float,NewPercent);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnEquippedWeaponChangedDelegate,TSoftObjectPtr<UTexture2D>,SoftWeaponIcon);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnAbilityIconSlotUpdatedDelegate,FGameplayTag,AbilityInputTag,TSoftObjectPtr<UMaterialInterface>,SoftAbilityIconMaterial);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_ThreeParams(FOnAbilityCooldownBeginDelegate,FGameplayTag,AbilityInputTag,float,TotalCooldownTime,float,RemainingCooldownTime);

UCLASS()
class CPPGOWACTIONGAME_API UPawnUIComponent : public UPawnExtensionComponentBase
{
	GENERATED_BODY()

public:
	UPROPERTY(BlueprintAssignable)
	FOnPercentChangedDelegate OnCurrentHealthChanged;

	UPROPERTY(BlueprintCallable,BlueprintAssignable)
	FOnEquippedWeaponChangedDelegate OnEquippedWeaponChanged;
	
};
