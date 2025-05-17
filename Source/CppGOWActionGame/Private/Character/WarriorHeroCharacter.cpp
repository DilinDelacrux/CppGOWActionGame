// Fill out your copyright notice in the Description page of Project Settings.


#include "Character/WarriorHeroCharacter.h"

#include "Camera/CameraComponent.h"
#include "Components/CapsuleComponent.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "GameFramework/SpringArmComponent.h"
#include "EnhancedInputSubsystems.h"
#include "WarriorGameplayTags.h"
#include "Component/Input/WarriorInputComponent.h"
#include "DataAssets/Input/DataAsset_InputConfig.h"

#include "Misc/WarriorDebugHelper.h"

void AWarriorHeroCharacter::BeginPlay()
{
	Super::BeginPlay();
}

void AWarriorHeroCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{

	// checkf(InputConfigDataAsset,TEXT("InputConfigDataAsset Invalid"));
	ULocalPlayer* LocalPlayer = GetController<APlayerController>()->GetLocalPlayer();
	UEnhancedInputLocalPlayerSubsystem* EnhancedInputLocalPlayerSubsystem = ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(LocalPlayer);
	check(EnhancedInputLocalPlayerSubsystem);

	EnhancedInputLocalPlayerSubsystem->AddMappingContext(InputConfigDataAsset->DefaultMappingContext,0);
	UWarriorInputComponent* WarriorInputComponent=Cast<UWarriorInputComponent>(PlayerInputComponent);
	WarriorInputComponent->BindNativeInputAction(InputConfigDataAsset,WarriorGameplayTags::InputTag_Move,ETriggerEvent::Triggered,this,&ThisClass::Input_Move);
	WarriorInputComponent->BindNativeInputAction(InputConfigDataAsset,WarriorGameplayTags::InputTag_Look,ETriggerEvent::Triggered,this,&ThisClass::Input_Look);
}

AWarriorHeroCharacter::AWarriorHeroCharacter()
{
	GetCapsuleComponent()->InitCapsuleSize(42.f,96.f);
	bUseControllerRotationPitch=false;
	bUseControllerRotationYaw=false;
	bUseControllerRotationRoll=false;

	CameraBoom=CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraBoom"));
	CameraBoom->SetupAttachment(GetRootComponent());
	CameraBoom->TargetArmLength=200.f;
	CameraBoom->SocketOffset=FVector(0.f,55.f,65.f);
	CameraBoom->bUsePawnControlRotation=true;

	FollowCamera=CreateDefaultSubobject<UCameraComponent>(TEXT("FollowCamera"));
	FollowCamera->SetupAttachment(CameraBoom,USpringArmComponent::SocketName);
	FollowCamera->bUsePawnControlRotation=false;

	GetCharacterMovement()->bOrientRotationToMovement=true;
	GetCharacterMovement()->RotationRate=FRotator(0.f,500.f,0.f);
	GetCharacterMovement()->MaxWalkSpeed=400.f;
	GetCharacterMovement()->BrakingDecelerationWalking=2000.f;
}

void AWarriorHeroCharacter::PossessedBy(AController* NewController)
{
	Super::PossessedBy(NewController);
	if(WarriorAbilitySystemComponent&&WarriorAttributeSet)
	{
		Debug::Print("PossessedBy WarriorAbilitySystemComponent");
	}
}

void AWarriorHeroCharacter::Input_Move(const FInputActionValue& InputActionValue)
{
	const FVector2D movementVector=InputActionValue.Get<FVector2D>();
	const FRotator movementRotation(0.f,Controller->GetControlRotation().Yaw,0.f);

	if(movementVector.Y!=0.f)
	{
		const FVector forwardDirction =movementRotation.RotateVector(FVector::ForwardVector);
		AddMovementInput(forwardDirction,movementVector.Y);
	}
	if(movementVector.X!=0.f)
	{
		const FVector forwardDirction =movementRotation.RotateVector(FVector::ForwardVector);
		AddMovementInput(forwardDirction,movementVector.X);
	}
}

void AWarriorHeroCharacter::Input_Look(const FInputActionValue& InputActionValue)
{
	const FVector2d LookAxisVector=InputActionValue.Get<FVector2d>();

	if(LookAxisVector.X!=0.f)
	{
		AddControllerYawInput(LookAxisVector.X);
	}
	if(LookAxisVector.Y!=0.f)
	{
		AddControllerPitchInput(LookAxisVector.Y);
	}

}
