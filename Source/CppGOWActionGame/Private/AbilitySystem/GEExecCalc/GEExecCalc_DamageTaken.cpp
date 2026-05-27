// Fill out your copyright notice in the Description page of Project Settings.


#include "AbilitySystem/GEExecCalc/GEExecCalc_DamageTaken.h"

#include "GameplayEffectExecutionCalculation.h"
#include "WarriorGameplayTags.h"
#include "AbilitySystem/WarriorAttributeSet.h"
#include "Misc/WarriorDebugHelper.h"
#include "Misc/WarriorEnumTypes.h"

struct FWarriorDamageCapture
{
	DECLARE_ATTRIBUTE_CAPTUREDEF(AttackPower)
	DECLARE_ATTRIBUTE_CAPTUREDEF(DefensePower)
	DECLARE_ATTRIBUTE_CAPTUREDEF(DamageTaken)
	DECLARE_ATTRIBUTE_CAPTUREDEF(FireResistance)
	DECLARE_ATTRIBUTE_CAPTUREDEF(IceResistance)

	FWarriorDamageCapture()
	{
		DEFINE_ATTRIBUTE_CAPTUREDEF(UWarriorAttributeSet,AttackPower,Source,false)
		DEFINE_ATTRIBUTE_CAPTUREDEF(UWarriorAttributeSet,DefensePower,Target,false)
		DEFINE_ATTRIBUTE_CAPTUREDEF(UWarriorAttributeSet,DamageTaken,Target,false)
		DEFINE_ATTRIBUTE_CAPTUREDEF(UWarriorAttributeSet,FireResistance,Target,false)
		DEFINE_ATTRIBUTE_CAPTUREDEF(UWarriorAttributeSet,IceResistance,Target,false)
	}
};

static const FWarriorDamageCapture& GetWarriorDamageCapture()
{
	static FWarriorDamageCapture warriorDamageCapture;
	return warriorDamageCapture;
}

UGEExecCalc_DamageTaken::UGEExecCalc_DamageTaken()
{
	RelevantAttributesToCapture.Add(GetWarriorDamageCapture().AttackPowerDef);
	RelevantAttributesToCapture.Add(GetWarriorDamageCapture().DefensePowerDef);
	RelevantAttributesToCapture.Add(GetWarriorDamageCapture().FireResistanceDef);
	RelevantAttributesToCapture.Add(GetWarriorDamageCapture().IceResistanceDef);
}

float UGEExecCalc_DamageTaken::HandlePhysicalDamage(float SourceAttackPower, float BaseDamage, int32 UsedLightAttackComboCount, int32 UsedHeavyAttackComboCount, float TargetDefensePower) const
{
	float OriginalBaseDamage = BaseDamage;
	if (UsedLightAttackComboCount != 0)
	{
		const float DamageIncreasePercentLight = (UsedLightAttackComboCount - 1) * 0.05 + 1.f;
		BaseDamage *= DamageIncreasePercentLight;
	}

	if (UsedHeavyAttackComboCount != 0)
	{
		const float DamageIncreasePercentHeavy = UsedHeavyAttackComboCount * 0.15f + 1.f;
		BaseDamage *= DamageIncreasePercentHeavy;
	}
	float FinalDamage = BaseDamage * SourceAttackPower / TargetDefensePower;
	
	// Debug::Print(FString::Printf(TEXT("物理伤害计算: 基础伤害=%.1f, 轻击连段=%d, 重击连段=%d, 攻击力=%.1f, 防御力=%.1f, 最终伤害=%.1f"), 
	// 	OriginalBaseDamage, UsedLightAttackComboCount, UsedHeavyAttackComboCount, SourceAttackPower, TargetDefensePower, FinalDamage), 
	// 	FColor::Cyan);
	
	return FinalDamage;

}

float UGEExecCalc_DamageTaken::HandleIceDamage(float BaseDamage,int StackCount, float IceResistance) const
{
	// 每层冰霜效果增加受到的冰伤害
	float VulnerabilityMultiplier = 1.0f + (StackCount * 0.1f);
	// 计算抗性减免后的基础伤害
	float ResistanceReduction = 1.0f - IceResistance;
	float FinalDamage = BaseDamage * ResistanceReduction * VulnerabilityMultiplier;
	// Debug::Print(FString::Printf(TEXT("冰霜伤害计算: 基础伤害=%.1f, 层数=%d, 冰抗=%.2f, 易伤系数=%.2f, 最终伤害=%.1f"), 
	// 	BaseDamage, StackCount, IceResistance, VulnerabilityMultiplier, FinalDamage), 
	// 	FColor::Blue);
	return FinalDamage;
}

float UGEExecCalc_DamageTaken::HandleFireDamage(float BaseDamage, int StackCount, float FireResistance) const
{
	// 使用平方根函数让层数收益递减
	float StackBonus = FMath::Sqrt(static_cast<float>(StackCount)) * 0.15f;
	float DamageMultiplier = 1.0f + FMath::Min(StackBonus, 1.0f); // 最多100%加成
	float ResistanceReduction = 1.0f - FireResistance;
	float FinalDamage = BaseDamage * ResistanceReduction * DamageMultiplier;
	// Debug::Print(FString::Printf(TEXT("火焰伤害计算: 基础伤害=%.1f, 层数=%d, 火抗=%.2f, 伤害系数=%.2f, 最终伤害=%.1f"), 
	// 	BaseDamage, StackCount, FireResistance, DamageMultiplier, FinalDamage), 
	// 	FColor::Red);
	return FinalDamage;
}

void UGEExecCalc_DamageTaken::Execute_Implementation(const FGameplayEffectCustomExecutionParameters& ExecutionParams,
                                                     FGameplayEffectCustomExecutionOutput& OutExecutionOutput) const
{
	const FGameplayEffectSpec& EffectSpec = ExecutionParams.GetOwningSpec();
	
	FAggregatorEvaluateParameters EvaluateParameters;
	EvaluateParameters.SourceTags = EffectSpec.CapturedSourceTags.GetAggregatedTags();
	EvaluateParameters.TargetTags = EffectSpec.CapturedTargetTags.GetAggregatedTags();

	float SourceAttackPower = 0.f;
	ExecutionParams.AttemptCalculateCapturedAttributeMagnitude(GetWarriorDamageCapture().AttackPowerDef,EvaluateParameters,SourceAttackPower);

	float BaseDamage = 0.f;
	int32 UsedLightAttackComboCount = 0;
	int32 UsedHeavyAttackComboCount = 0;
	EDamageType DamageType = EDamageType::Physical;
	int32 ElementDamageStack=0;

	for (const TPair<FGameplayTag, float>& TagMagnitude : EffectSpec.SetByCallerTagMagnitudes)
	{
		if (TagMagnitude.Key.MatchesTagExact(WarriorGameplayTags::Shared_SetByCaller_BaseDamage))
		{
			BaseDamage = TagMagnitude.Value;
		}
		if (TagMagnitude.Key.MatchesTagExact(WarriorGameplayTags::Shared_DamageType_Ice))
		{
			DamageType=EDamageType::Ice;
			ElementDamageStack=TagMagnitude.Value;
		}
		if (TagMagnitude.Key.MatchesTagExact(WarriorGameplayTags::Shared_DamageType_Fire))
		{
			DamageType=EDamageType::Fire;
			ElementDamageStack=TagMagnitude.Value;
		}
		if (TagMagnitude.Key.MatchesTagExact(WarriorGameplayTags::Shared_DamageType_Physical))
		{
			DamageType=EDamageType::Physical;
			ElementDamageStack=0;
		}
		if (TagMagnitude.Key.MatchesTagExact(WarriorGameplayTags::Player_SetByCaller_AttackType_Light))
		{
			UsedLightAttackComboCount = TagMagnitude.Value;
		}

		if (TagMagnitude.Key.MatchesTagExact(WarriorGameplayTags::Player_SetByCaller_AttackType_Heavy))
		{
			UsedHeavyAttackComboCount = TagMagnitude.Value;
		}

	}
	float FinalDamageDone=0;
	switch (DamageType)
	{
	case EDamageType::Physical:
		{
			float TargetDefensePower = 0.f;
			ExecutionParams.AttemptCalculateCapturedAttributeMagnitude(GetWarriorDamageCapture().DefensePowerDef,EvaluateParameters,TargetDefensePower);
			FinalDamageDone = HandlePhysicalDamage(SourceAttackPower, BaseDamage, UsedLightAttackComboCount, UsedHeavyAttackComboCount,TargetDefensePower);
			break;
		}
	case EDamageType::Ice:
		{
			float IceResistance = 0.f;
			ExecutionParams.AttemptCalculateCapturedAttributeMagnitude(GetWarriorDamageCapture().IceResistanceDef,EvaluateParameters,IceResistance);
			FinalDamageDone = HandleIceDamage(BaseDamage,ElementDamageStack,IceResistance);
			break;
		}
	case EDamageType::Fire:
		{
			float FireResistance = 0.f;
			ExecutionParams.AttemptCalculateCapturedAttributeMagnitude(GetWarriorDamageCapture().FireResistanceDef,EvaluateParameters,FireResistance);
			FinalDamageDone = HandleFireDamage(BaseDamage,ElementDamageStack,FireResistance);
			break;
		}
	default:
		break;
	}

	if (FinalDamageDone > 0.f)
	{
		if (EffectSpec.Def->GetAssetTags().HasTagExact(WarriorGameplayTags::Player_SetByCaller_AttackType_Status))
		{
			OutExecutionOutput.AddOutputModifier(FGameplayModifierEvaluatedData(GetWarriorDamageCapture().DamageTakenProperty,EGameplayModOp::Override,FinalDamageDone+BaseDamage));
		}
		else
		{
			OutExecutionOutput.AddOutputModifier(FGameplayModifierEvaluatedData(GetWarriorDamageCapture().DamageTakenProperty,EGameplayModOp::Override,FinalDamageDone));
		}
		
	}
}
