// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameplayEffectExecutionCalculation.h"
#include "GEExecCalc_DamageTaken.generated.h"

/**
 * 
 */
UCLASS()
class CPPGOWACTIONGAME_API UGEExecCalc_DamageTaken : public UGameplayEffectExecutionCalculation
{
	GENERATED_BODY()

public:
	UGEExecCalc_DamageTaken();

	virtual void Execute_Implementation(const FGameplayEffectCustomExecutionParameters& ExecutionParams, FGameplayEffectCustomExecutionOutput& OutExecutionOutput) const override;
	
private:
	float HandlePhysicalDamage(float SourceAttackPower, float BaseDamage, int32 UsedLightAttackComboCount,int32 UsedHeavyAttackComboCount, float TargetDefensePower) const;
	float HandleIceDamage(float BaseDamage,int StackCount, float IceResistance) const;
	float HandleFireDamage(float BaseDamage,int StackCount, float FireResistance) const;
};
