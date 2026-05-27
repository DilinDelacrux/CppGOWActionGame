// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Components/PawnCombatComponent.h"
#include "GameFramework/Actor.h"
#include "WarriorWeaponBase.generated.h"

class UBoxComponent;

DECLARE_DELEGATE_OneParam(FOnTargetInteractedDelegate,AActor*)

UCLASS()
class CPPGOWACTIONGAME_API AWarriorWeaponBase : public AActor
{
	GENERATED_BODY()
	
public:	
	AWarriorWeaponBase();
	
	FOnTargetInteractedDelegate OnWeaponHitTarget;
	FOnTargetInteractedDelegate OnWeaponPulledFromTarget;

	UFUNCTION(BlueprintImplementableEvent, Category = "Weapons")
	void BP_OnEquipWeapon(USkeletalMeshComponent* TargetMesh);
	UFUNCTION(BlueprintImplementableEvent, Category = "Weapons")
	void BP_OnWeaponRegister();
	UFUNCTION(BlueprintImplementableEvent, Category = "Weapons")
	void BP_OnUnequip(USkeletalMeshComponent* TargetMesh);
	UFUNCTION(BlueprintImplementableEvent, Category = "Weapons")
	void BP_ToggleCurrentEquippedWeaponCollision(bool bShouldEnable, EToggleDamageType ToggleDamageType);

	
	UFUNCTION(BlueprintCallable, Category = "Weapons")
	virtual void EquipWeapon(USkeletalMeshComponent* TargetMesh);
	UFUNCTION(BlueprintCallable, Category = "Weapons")
	virtual void Unequip(USkeletalMeshComponent* TargetMesh);
	UFUNCTION(BlueprintNativeEvent, Category = "Collision")
	void OnCollisionBoxBeginOverlap(UPrimitiveComponent* OverlappedComponent,AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);

	UFUNCTION(BlueprintNativeEvent, Category = "Collision")
	void OnCollisionBoxEndOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex);

	// UFUNCTION(BlueprintCallable, Category = "Weapons")
	// virtual void BP_OnCollisionBoxBeginOverlap(UPrimitiveComponent* OverlappedComponent,AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);
	//
	// UFUNCTION(BlueprintCallable, Category = "Weapons")
	// virtual void BP_OnCollisionBoxEndOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex);

	UFUNCTION(BlueprintCallable, Category = "Collision")
	virtual void HandleBeginOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult);

	UFUNCTION(BlueprintCallable, Category = "Collision")
	virtual void HandleEndOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex);
	
protected:
	UPROPERTY(VisibleAnywhere,BlueprintReadOnly,Category="Weapons")
	UStaticMeshComponent* WeaponMeshComponent;
	UPROPERTY(VisibleAnywhere,BlueprintReadOnly,Category="Weapons")
	UBoxComponent* WeaponCollisionBox;




public:
	FORCEINLINE UBoxComponent* GetWeaponCollisionBox()const{return WeaponCollisionBox;}


};
