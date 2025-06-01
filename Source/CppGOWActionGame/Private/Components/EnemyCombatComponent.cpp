// Fill out your copyright notice in the Description page of Project Settings.


#include "Components/EnemyCombatComponent.h"

void UEnemyCombatComponent::OnHitTargetActor(AActor* HitActor)
{
	Super::OnHitTargetActor(HitActor);
}

void UEnemyCombatComponent::OnWeaponPulledFromTargetActor(AActor* HitActor)
{
	Super::OnWeaponPulledFromTargetActor(HitActor);
}
