// Fill out your copyright notice in the Description page of Project Settings.


#include "Character/WarriorEnemyCharacter.h"
#include "Engine/AssetManager.h"
#include "Components/EnemyCombatComponent.h"
#include "DataAssets/StartUpData/DataAsset_StartUpDataBase.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "Misc/WarriorDebugHelper.h"

AWarriorEnemyCharacter::AWarriorEnemyCharacter()
{
	AutoPossessAI=EAutoPossessAI::PlacedInWorldOrSpawned;
	bUseControllerRotationPitch=false;
	bUseControllerRotationYaw=false;
	bUseControllerRotationRoll=false;

	GetCharacterMovement()->bUseControllerDesiredRotation=false;
	GetCharacterMovement()->bOrientRotationToMovement=true;
	GetCharacterMovement()->RotationRate=FRotator(0.0f,180.0f,0.0f);
	GetCharacterMovement()->MaxWalkSpeed=300.f;
	GetCharacterMovement()->BrakingDecelerationWalking=1000.f;

	CombatComponent=CreateDefaultSubobject<UEnemyCombatComponent>("EnemyCombatComponent");
}

void AWarriorEnemyCharacter::PossessedBy(AController* NewController)
{
	Super::PossessedBy(NewController);
	InitEnemySetupData();
}

UPawnCombatComponent* AWarriorEnemyCharacter::GetPawnCombatComponent() const
{
	return CombatComponent;
}

void AWarriorEnemyCharacter::InitEnemySetupData()
{
	if(CharacterStartUpData.IsNull()) return;
	UAssetManager::GetStreamableManager().RequestAsyncLoad(
		CharacterStartUpData.ToSoftObjectPath(),

		FStreamableDelegate::CreateLambda([this]()
		{
			if(UDataAsset_StartUpDataBase* LoadedData=CharacterStartUpData.Get())
			{
				LoadedData->GiveToAbilitySystemComponent(WarriorAbilitySystemComponent);
				Debug::Print(TEXT("EnemyStartUpDataLoaded"),FColor::Green);
			}
		})
		);
}
