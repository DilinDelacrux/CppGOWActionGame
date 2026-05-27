// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "AbilitySystem/Abilities/WarriorGameplayAbility.h"
#include "WarriorHeroGameplayAbility.generated.h"

class UHeroCombatComponent;
class AWarriorHeroController;
class AWarriorHeroCharacter;
/**
 * 
 */
UCLASS()
class CPPGOWACTIONGAME_API UWarriorHeroGameplayAbility : public UWarriorGameplayAbility
{
	GENERATED_BODY()

public:
	UFUNCTION(BlueprintPure, Category = "Warrior|Abilities")
	AWarriorHeroCharacter* GetHeroCharacterFromActorInfo();
	UFUNCTION(BlueprintPure, Category = "Warrior|Abilities")
	AWarriorHeroController* GetHeroControllerFromActorInfo();
	UFUNCTION(BlueprintPure, Category = "Warrior|Abilities")
	UHeroCombatComponent* GetHeroCombatComponent();
	UFUNCTION(BlueprintPure, Category = "Warrior|Abilities")
	FGameplayEffectSpecHandle MakeHeroDamageEffectSpecHandle(TSubclassOf<UGameplayEffect> EffectClass,float InWeaponBaseDamage,FGameplayTag InCurrentAttackTypeTag,int32 InUsedComboCount);
	UFUNCTION(BlueprintPure, Category = "Warrior|Abilities")
	FGameplayEffectSpecHandle MakeHeroDamageEffectSpecHandleSimple(TSubclassOf<UGameplayEffect> EffectClass,FGameplayTag InCurrentAttackTypeTag);
	UFUNCTION(BlueprintPure, Category = "Warrior|Abilities")
	FGameplayEffectSpecHandle MakeHeroStatusEffectSpecHandle(TSubclassOf<UGameplayEffect> EffectClass,float InWeaponBaseDamage,FGameplayTag InCurrentAttackTypeTag,FGameplayTag InElementTypeTag,int32 InUsedComboCount,int32 ElementStack,float InDuration);
	UFUNCTION(BlueprintPure, Category = "Warrior|Abilities")
	bool GetAbilityRemainingCooldownByTag(FGameplayTag InCooldownTag,float& TotalCooldownTime,float& RemainingCooldownTime);

	UFUNCTION(BlueprintPure, Category = "Warrior|Ability")
	UHeroUIComponent* GetHeroUIComponentFromActorInfo();
	
private:
	 TWeakObjectPtr<AWarriorHeroCharacter> CachedHeroCharacter;
	 TWeakObjectPtr<AWarriorHeroController> CachedHeroController; 
};
