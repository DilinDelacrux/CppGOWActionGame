// Fill out your copyright notice in the Description page of Project Settings.


#include "DataAssets/StartUpData/DataAsset_HeroStartUpData.h"
#include "WarriorStructTypes.h"
#include "AbilitySystem/WarriorAbilitySystemComponent.h"
#include "AbilitySystem/Abilities/WarriorHeroGameplayAbility.h"
#include "GameplayAbilitySpec.h"


void UDataAsset_HeroStartUpData::GiveToAbilitySystemComponent(UWarriorAbilitySystemComponent* InWarriorASCToGive,
                                                              int32 ApplyLevel)
{
	Super::GiveToAbilitySystemComponent(InWarriorASCToGive, ApplyLevel);

	for(const FWarriorHeroAbilitySet& AbilitySet:HeroStartUpAbilitySets)
	{
		if(!AbilitySet.IsValid()) continue;

		FGameplayAbilitySpec AbilitySpec(AbilitySet.AbilityToGrant);
		AbilitySpec.SourceObject = InWarriorASCToGive->GetAvatarActor();
		AbilitySpec.Level = ApplyLevel;
		AbilitySpec.DynamicAbilityTags.AddTag(AbilitySet.InputTag);
		
		InWarriorASCToGive->GiveAbility(AbilitySpec);
	}



}
