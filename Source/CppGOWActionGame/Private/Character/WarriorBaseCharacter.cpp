// Fill out your copyright notice in the Description page of Project Settings.


#include "Character/WarriorBaseCharacter.h"

#include "WarriorAttributeSet.h"
#include "AbilitySystem/WarriorAbilitySystemComponent.h"

// Sets default values
AWarriorBaseCharacter::AWarriorBaseCharacter()
{
	PrimaryActorTick.bCanEverTick = false;
	PrimaryActorTick.bStartWithTickEnabled=false;
	GetMesh()->bReceivesDecals=false;
	WarriorAbilitySystemComponent=CreateDefaultSubobject<UWarriorAbilitySystemComponent>("WarriorAbilitySystemComponent");
	WarriorAttributeSet=CreateDefaultSubobject<UWarriorAttributeSet>("WarriorAttributeSet");

}

UAbilitySystemComponent* AWarriorBaseCharacter::GetAbilitySystemComponent() const
{
	return GetWarriorAbilitySystemComponent();
}

// Called when the game starts or when spawned
void AWarriorBaseCharacter::BeginPlay()
{
	Super::BeginPlay();
	
}

void AWarriorBaseCharacter::PossessedBy(AController* NewController)
{
	Super::PossessedBy(NewController);

	if(WarriorAbilitySystemComponent)
	{
		WarriorAbilitySystemComponent->InitAbilityActorInfo(this,this);
	}
}

// Called every frame
void AWarriorBaseCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

// Called to bind functionality to input
void AWarriorBaseCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

}

