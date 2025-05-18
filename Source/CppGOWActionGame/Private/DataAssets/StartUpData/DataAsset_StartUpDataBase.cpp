// Fill out your copyright notice in the Description page of Project Settings.


#include "DataAssets/StartUpData/DataAsset_StartUpDataBase.h"
#include "AbilitySystem/WarriorAbilitySystemComponent.h"
#include "AbilitySystem/Abilities/WarriorGameplayAbility.h"
#include "Misc/WarriorDebugHelper.h"

void UDataAsset_StartUpDataBase::GiveToAbilitySystemComponent(UWarriorAbilitySystemComponent* InWarriorASCToGive,
                                                              int32 ApplyLevel)
{
	if(!InWarriorASCToGive)
	{
		Debug::Print("InWarriorASCToGive");
		return;
	}
	GrantAbilities(ActivateOnGivenAbilities,InWarriorASCToGive,ApplyLevel);
	GrantAbilities(ReactiveOnGivenAbilities,InWarriorASCToGive,ApplyLevel);
}

void UDataAsset_StartUpDataBase::GrantAbilities(TArray<TSubclassOf<UWarriorGameplayAbility>>& InAbilityToGive,
	UWarriorAbilitySystemComponent* InWarriorASCToGive, int32 ApplyLevel)
{
	if(InAbilityToGive.IsEmpty())
	{
		return;
	}
	for(const TSubclassOf<UWarriorGameplayAbility>& Ability : InAbilityToGive)
	{
		FGameplayAbilitySpec Spec(Ability);
		Spec.SourceObject=InWarriorASCToGive->GetAvatarActor();
		Spec.Level=ApplyLevel;
		InWarriorASCToGive->GiveAbility(Spec);
	}
}
