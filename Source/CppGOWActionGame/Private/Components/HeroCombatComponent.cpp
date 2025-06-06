// Fill out your copyright notice in the Description page of Project Settings.


#include "Components/HeroCombatComponent.h"
#include "AbilitySystemBlueprintLibrary.h"
#include "WarriorGameplayTags.h"
#include "Items/Weapons/WarriorHeroWeapon.h"
#include "Misc/WarriorDebugHelper.h"

AWarriorHeroWeapon* UHeroCombatComponent::GetHeroCarriedWeaponByTag(FGameplayTag InWeaponTag) const
{
	return Cast<AWarriorHeroWeapon>(GetCharacterCarriedWeaponByTag(InWeaponTag));
}

AWarriorHeroWeapon* UHeroCombatComponent::GetHeroCurrentEquipWeapon() const
{
	return Cast<AWarriorHeroWeapon>(GetCharacterCurrentEquippedWeapon());
}

float UHeroCombatComponent::GetHeroCurrentEquipWeaponDamageAtLevel(float InLevel) const
{
	return GetHeroCurrentEquipWeapon()->HeroWeaponData.WeaponBaseDamage.GetValueAtLevel(InLevel);
}

void UHeroCombatComponent::OnHitTargetActor(AActor* HitActor)
{
	Debug::Print(GetOwningPawn()->GetActorNameOrLabel() + TEXT(" hit ") + HitActor->GetActorNameOrLabel(),FColor::Green);
	if (OverlappedActors.Contains(HitActor))
	{
		return;
	}

	OverlappedActors.AddUnique(HitActor);

	FGameplayEventData Data;
	Data.Instigator = GetOwningPawn();
	Data.Target = HitActor;

	UAbilitySystemBlueprintLibrary::SendGameplayEventToActor(
		GetOwningPawn(),
		WarriorGameplayTags::Shared_Event_MeleeHit,
		Data
	);
	UAbilitySystemBlueprintLibrary::SendGameplayEventToActor(
	GetOwningPawn(),
	WarriorGameplayTags::Player_Event_HitPause,
	FGameplayEventData()
);
}

void UHeroCombatComponent::OnWeaponPulledFromTargetActor(AActor* HitActor)
{
	Super::OnWeaponPulledFromTargetActor(HitActor);
	UAbilitySystemBlueprintLibrary::SendGameplayEventToActor(
	GetOwningPawn(),
	WarriorGameplayTags::Player_Event_HitPause,
	FGameplayEventData()
);
}
