// Fill out your copyright notice in the Description page of Project Settings.


#include "Components/EnemyCombatComponent.h"

#include "AbilitySystemBlueprintLibrary.h"
#include "WarriorGameplayTags.h"
#include "Abilities/GameplayAbilityTypes.h"
#include "Misc/WarriorDebugHelper.h"

void UEnemyCombatComponent::OnHitTargetActor(AActor* HitActor)
{
	if (OverlappedActors.Contains(HitActor))
	{
		return;
	}
	OverlappedActors.AddUnique(HitActor);
	
	bool bIsValidBlock = false;
	const bool bIsPlayerBlocking = false;
	const bool bIsMyAttackUnblockable = false;

	if (bIsPlayerBlocking && !bIsMyAttackUnblockable)
	{
		//TODO::check if the block is valid
	}

	FGameplayEventData EventData;
	EventData.Instigator = GetOwningPawn();
	EventData.Target = HitActor;

	if (bIsValidBlock)
	{
		//TODO::Handle successful block
	}
	else
	{
		UAbilitySystemBlueprintLibrary::SendGameplayEventToActor(GetOwningPawn(),WarriorGameplayTags::Shared_Event_MeleeHit,EventData);
	}
}

void UEnemyCombatComponent::OnWeaponPulledFromTargetActor(AActor* HitActor)
{
	Super::OnWeaponPulledFromTargetActor(HitActor);
}
