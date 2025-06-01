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
	FGameplayEffectSpecHandle MakeHeroDamageEffectSpecHandle(TSubclassOf<UGameplayEffect> EffectClass,float InWeaponBaseDamage,
		FGameplayTag  InCurrentAttackTypeTag,int32 InUsedComboCount);

	
private:
	 TWeakObjectPtr<AWarriorHeroCharacter> CachedHeroCharacter;
	 TWeakObjectPtr<AWarriorHeroController> CachedHeroController; 
};
