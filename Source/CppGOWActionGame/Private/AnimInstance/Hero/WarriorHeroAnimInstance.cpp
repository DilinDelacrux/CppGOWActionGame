// Fill out your copyright notice in the Description page of Project Settings.


#include "AnimInstance/Hero/WarriorHeroAnimInstance.h"

#include "GameFramework/CharacterMovementComponent.h"

void UWarriorHeroAnimInstance::NativeInitializeAnimation()
{
	Super::NativeInitializeAnimation();
	OwningCharacter=Cast<AWarriorBaseCharacter>(TryGetPawnOwner());

	if(OwningCharacter)
	{
		OwningMovementComponent=OwningCharacter->GetCharacterMovement();
	}
}

void UWarriorHeroAnimInstance::NativeThreadSafeUpdateAnimation(float DeltaSeconds)
{
	Super::NativeThreadSafeUpdateAnimation(DeltaSeconds);
	if(!OwningCharacter||!OwningMovementComponent)
	{
		return;	
	}
	GroundSpeed=OwningCharacter->GetVelocity().Size2D();
	bHasAcceleration=OwningMovementComponent->GetCurrentAcceleration().SizeSquared2D()>0;
}
