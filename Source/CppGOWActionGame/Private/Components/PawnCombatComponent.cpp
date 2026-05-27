// Fill out your copyright notice in the Description page of Project Settings.


#include "Components/PawnCombatComponent.h"
#include "Components/BoxComponent.h"
#include "Items/Weapons/WarriorWeaponBase.h"
#include "Misc/WarriorDebugHelper.h"

void UPawnCombatComponent::RegisterSpawnedWeapon(FGameplayTag InWeaponTagToRegister,
                                                 AWarriorWeaponBase* InWeaponToRegister, bool bRegisterAsEquippedWeapon)
{
	checkf(!CharacterCarriedWeaponMap.Contains(InWeaponTagToRegister),TEXT("A named name %s has already been added as carried weapon"),*InWeaponTagToRegister.ToString());
	check(InWeaponToRegister);
	CharacterCarriedWeaponMap.Emplace(InWeaponTagToRegister,InWeaponToRegister);

	InWeaponToRegister->OnWeaponHitTarget.BindUObject(this,&ThisClass::OnHitTargetActor);
	InWeaponToRegister->OnWeaponPulledFromTarget.BindUObject(this,&ThisClass::OnWeaponPulledFromTargetActor);
	InWeaponToRegister->BP_OnWeaponRegister();
	if(bRegisterAsEquippedWeapon)
	{
		CurrentEquippedWeaponTag=InWeaponTagToRegister;
	}
}


AWarriorWeaponBase* UPawnCombatComponent::GetCharacterCarriedWeaponByTag(FGameplayTag InWeaponTagToGet) const
{
	if(CharacterCarriedWeaponMap.Contains(InWeaponTagToGet))
	{
		// AWarriorWeaponBase* - Pointer to AWarriorWeaponBase class
		// const* - This is a pointer to a constant pointer (the pointer itself isn't constant, but what it points to is constant)
		AWarriorWeaponBase* const* FoundWeapon = CharacterCarriedWeaponMap.Find(InWeaponTagToGet);
		return *FoundWeapon;
	}
	return nullptr;
}

AWarriorWeaponBase* UPawnCombatComponent::GetCharacterCurrentEquippedWeapon() const
{
	if(!CurrentEquippedWeaponTag.IsValid())
	{
		return nullptr;
	}
	return GetCharacterCarriedWeaponByTag(CurrentEquippedWeaponTag);
}

void UPawnCombatComponent::BP_ToggleWeaponCollision(bool bShouldEnable, EToggleDamageType ToggleDamageType)
{
	ToggleWeaponCollision(bShouldEnable,ToggleDamageType);
}

void UPawnCombatComponent::ToggleWeaponCollision(bool bShouldEnable, EToggleDamageType ToggleDamageType)
{
	if (ToggleDamageType == EToggleDamageType::CurrentEquippedWeapon)
	{
		ToggleCurrentEquippedWeaponCollision(bShouldEnable,ToggleDamageType);
	}
	else
	{
		ToggleBodyCollisionBoxCollision(bShouldEnable,ToggleDamageType);
	}
}

void UPawnCombatComponent::OnHitTargetActor(AActor* HitActor)
{
}

void UPawnCombatComponent::OnWeaponPulledFromTargetActor(AActor* HitActor)
{
}

void UPawnCombatComponent::ToggleCurrentEquippedWeaponCollision(bool bShouldEnable, EToggleDamageType ToggleDamageType)
{
	AWarriorWeaponBase* WeaponToToggle = GetCharacterCurrentEquippedWeapon();

	check(WeaponToToggle);
	WeaponToToggle->BP_ToggleCurrentEquippedWeaponCollision(bShouldEnable,ToggleDamageType);

	if (!bShouldEnable)
	{
		OverlappedActors.Empty();
	}
}

void UPawnCombatComponent::ToggleBodyCollisionBoxCollision(bool bShouldEnable, EToggleDamageType ToggleDamageType)
{
}
