// Fill out your copyright notice in the Description page of Project Settings.


#include "AbilitySystem/WarriorAttributeSet.h"
#include "WarriorFunctionLibrary.h"
#include "WarriorGameplayTags.h"
#include "GameplayEffectExtension.h"
#include "Components/UI/PawnUIComponent.h"
#include "Components/UI/HeroUIComponent.h"
#include "Interfaces/PawnUIInterface.h"
#include "Misc/WarriorDebugHelper.h"

UWarriorAttributeSet::UWarriorAttributeSet()
{
	InitCurrentHealth(1.f);
	InitMaxHealth(1.f);
	InitCurrentRage(1.f);
	InitMaxRage(1.f);
	InitAttackPower(1.f);
	InitDefensePower(1.f);
	InitFireResistance(0.1f);
	InitIceResistance(0.1f);
}

// bool UWarriorAttributeSet::PreGameplayEffectExecute(struct FGameplayEffectModCallbackData& Data)
// {
// 	return Super::PreGameplayEffectExecute(Data);
// }

void UWarriorAttributeSet::PostGameplayEffectExecute(const struct FGameplayEffectModCallbackData& Data)
{
	if (!CachedPawnUIInterface.IsValid())
	{
		CachedPawnUIInterface = TWeakInterfacePtr<IPawnUIInterface>(Data.Target.GetAvatarActor());
	}

	UPawnUIComponent* PawnUIComponent = CachedPawnUIInterface->GetPawnUIComponent();
	if(Data.EvaluatedData.Attribute==GetCurrentHealthAttribute())
	{
		const float NewCurrentHealth=FMath::Clamp(GetCurrentHealth(),0.0f,GetMaxHealth());
		SetCurrentHealth(NewCurrentHealth);
		PawnUIComponent->OnCurrentHealthChanged.Broadcast(GetCurrentHealth()/GetMaxHealth());
	}
	if (Data.EvaluatedData.Attribute == GetCurrentRageAttribute())
	{
		const float NewCurrentRage = FMath::Clamp(GetCurrentRage(),0.f,GetMaxRage());
		SetCurrentRage(NewCurrentRage);
		
		if (GetCurrentRage() == GetMaxRage())
		{
			UWarriorFunctionLibrary::AddGameplayTagToActorIfNone(Data.Target.GetAvatarActor(),WarriorGameplayTags::Player_Status_Rage_Full);
		}
		else if (GetCurrentRage() == 0.f)
		{
			UWarriorFunctionLibrary::AddGameplayTagToActorIfNone(Data.Target.GetAvatarActor(),WarriorGameplayTags::Player_Status_Rage_None);
		}
		else
		{
			UWarriorFunctionLibrary::RemoveGameplayTagToActorIfFound(Data.Target.GetAvatarActor(),WarriorGameplayTags::Player_Status_Rage_Full);
			UWarriorFunctionLibrary::RemoveGameplayTagToActorIfFound(Data.Target.GetAvatarActor(),WarriorGameplayTags::Player_Status_Rage_None);
		}
		
		if (UHeroUIComponent* HeroUIComponent = CachedPawnUIInterface->GetHeroUIComponent())
		{
			HeroUIComponent->OnCurrentRageChanged.Broadcast(GetCurrentRage()/GetMaxRage());
		}
	}

	if (Data.EvaluatedData.Attribute == GetDamageTakenAttribute())
	{
		const float OldHealth = GetCurrentHealth();
		const float DamageDone = GetDamageTaken();
		const float NewCurrentHealth = FMath::Clamp(OldHealth - DamageDone,0.f,GetMaxHealth());
		if (Data.EffectSpec.Def->GetAssetTags().HasTagExact(WarriorGameplayTags::Shared_DamageType_Fire))
		{
			PawnUIComponent->OnReceiveDamage.Broadcast(DamageDone,EDamageType::Fire);
		}
		else if (Data.EffectSpec.Def->GetAssetTags().HasTagExact(WarriorGameplayTags::Shared_DamageType_Ice))
		{
			PawnUIComponent->OnReceiveDamage.Broadcast(DamageDone,EDamageType::Ice);
		}
		else
		{
			PawnUIComponent->OnReceiveDamage.Broadcast(DamageDone,EDamageType::Physical);
		}
		
		SetCurrentHealth(NewCurrentHealth);

		const FString DebugString = FString::Printf(
			TEXT("Old Health: %.2f, Damage Done: %.2f, NewCurrentHealth: %.2f"),
			OldHealth,
			DamageDone,
			NewCurrentHealth
		);
		Debug::Print(DebugString,FColor::Green);

		PawnUIComponent->OnCurrentHealthChanged.Broadcast(GetCurrentHealth()/GetMaxHealth());

		if (NewCurrentHealth == 0.f)
		{
			UWarriorFunctionLibrary::AddGameplayTagToActorIfNone(Data.Target.GetAvatarActor(),WarriorGameplayTags::Shared_Status_Dead);
			
		}
	}
}
