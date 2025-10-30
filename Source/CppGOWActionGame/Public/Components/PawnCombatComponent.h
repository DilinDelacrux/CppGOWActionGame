// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameplayTagContainer.h"
#include "Components/PawnExtensionComponentBase.h"
#include "PawnCombatComponent.generated.h"

class AWarriorWeaponBase;
/**
 * 
 */
UENUM(BlueprintType)
enum class EToggleDamageType : uint8
{
	CurrentEquippedWeapon,
	LeftHand,
	RightHand,
	LeftLeg,
	RightLeg
};
UCLASS()
class CPPGOWACTIONGAME_API UPawnCombatComponent : public UPawnExtensionComponentBase
{
	GENERATED_BODY()
public:
	UFUNCTION(BlueprintCallable,Category="Warrior|Combat")
	void RegisterSpawnedWeapon(FGameplayTag InWeaponTagToRegister,AWarriorWeaponBase* InWeaponToRegister,bool bRegisterAsEquippedWeapon=false);
	UFUNCTION(BlueprintCallable,Category="Warrior|Combat")
	AWarriorWeaponBase* GetCharacterCarriedWeaponByTag(FGameplayTag InWeaponTagToGet)const;
	UPROPERTY(BlueprintReadWrite,Category="Warrior|Combat")
	FGameplayTag CurrentEquippedWeaponTag;
	UFUNCTION(BlueprintCallable,Category="Warrior|Combat")
	AWarriorWeaponBase* GetCharacterCurrentEquippedWeapon() const;

	UFUNCTION(BlueprintCallable, Category = "Warrior|Combat", DisplayName = "Toggle Weapon Collision")
	void BP_ToggleWeaponCollision(bool bShouldEnable,EToggleDamageType ToggleDamageType = EToggleDamageType::CurrentEquippedWeapon);

	virtual void ToggleWeaponCollision(bool bShouldEnable,EToggleDamageType ToggleDamageType = EToggleDamageType::CurrentEquippedWeapon);
	virtual void OnHitTargetActor(AActor* HitActor);
	virtual void OnWeaponPulledFromTargetActor(AActor* HitActor);
protected:
	virtual void ToggleCurrentEquippedWeaponCollision(bool bShouldEnable, EToggleDamageType ToggleDamageType);
	virtual void ToggleBodyCollisionBoxCollision(bool bShouldEnable,EToggleDamageType ToggleDamageType);
	
	TArray<AActor*> OverlappedActors;
	
private:
	TMap<FGameplayTag,AWarriorWeaponBase*> CharacterCarriedWeaponMap;
};
