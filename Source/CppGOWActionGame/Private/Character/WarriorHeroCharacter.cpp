// Fill out your copyright notice in the Description page of Project Settings.


#include "Character/WarriorHeroCharacter.h"

#include "AbilitySystemBlueprintLibrary.h"
#include "Camera/CameraComponent.h"
#include "Components/CapsuleComponent.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "GameFramework/SpringArmComponent.h"
#include "EnhancedInputSubsystems.h"
#include "WarriorFunctionLibrary.h"
#include "WarriorGameplayTags.h"
#include "AbilitySystem/WarriorAbilitySystemComponent.h"
#include "Components/CustomMovementComponent.h"
#include "Components/HeroCombatComponent.h"
#include "Components/Input/WarriorInputComponent.h"
#include "Components/UI/EnemyUIComponent.h"
#include "Components/UI/HeroUIComponent.h"
#include "DataAssets/Input/DataAsset_InputConfig.h"
#include "DataAssets/StartUpData/DataAsset_StartUpDataBase.h"
#include "GameMode/GWOGameMode.h"

#include "Misc/WarriorDebugHelper.h"
#include "Misc/WarriorEnumTypes.h"

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
	WarriorInputComponent->BindNativeInputAction(InputConfigDataAsset,WarriorGameplayTags::InputTag_SwitchTarget,ETriggerEvent::Triggered,this,&ThisClass::Input_SwitchTargetTriggered);
	WarriorInputComponent->BindNativeInputAction(InputConfigDataAsset,WarriorGameplayTags::InputTag_SwitchTarget,ETriggerEvent::Completed,this,&ThisClass::Input_SwitchTargetCompleted);
	WarriorInputComponent->BindAbilityInputAction(InputConfigDataAsset,this,&ThisClass::Input_AbilityInputPressed,&ThisClass::Input_AbilityInputReleased);
	WarriorInputComponent->BindNativeInputAction(InputConfigDataAsset,WarriorGameplayTags::InputTag_PickUp_Stones,ETriggerEvent::Started,this,&ThisClass::Input_PickUpStonesStarted);
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

	HeroCombatComponent=CreateDefaultSubobject<UHeroCombatComponent>(TEXT("HeroCombatComponent"));
	HeroUIComponent=CreateDefaultSubobject<UHeroUIComponent>(TEXT("HeroUIComponent"));
	CustomMovementComponent=CreateDefaultSubobject<UCustomMovementComponent>(TEXT("CustomMovementComponent"));
}

void AWarriorHeroCharacter::PossessedBy(AController* NewController)
{
	Super::PossessedBy(NewController);
	if(!CharacterStartUpData.IsNull())
	{
		if(UDataAsset_StartUpDataBase* LoadedData=CharacterStartUpData.LoadSynchronous())
		{
			int32 AbilityApplyLevel = 1;
			LoadedData->GiveToAbilitySystemComponent(WarriorAbilitySystemComponent,AbilityApplyLevel);
		}
	}
	UWarriorFunctionLibrary::AddGameplayTagToActorIfNone(this,WarriorGameplayTags::Player_Status_BareHand);
}

UPawnCombatComponent* AWarriorHeroCharacter::GetPawnCombatComponent() const
{
	return HeroCombatComponent;
}

UPawnUIComponent* AWarriorHeroCharacter::GetPawnUIComponent() const
{
	return HeroUIComponent;
}

UHeroUIComponent* AWarriorHeroCharacter::GetHeroUIComponent() const
{
	return HeroUIComponent;
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
	if (movementVector.X != 0.f)
	{
		const FVector RightDirection = movementRotation.RotateVector(FVector::RightVector);
		AddMovementInput(RightDirection,movementVector.X);
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

void AWarriorHeroCharacter::Input_AbilityInputPressed(FGameplayTag InInputTag)
{
	WarriorAbilitySystemComponent->OnAbilityInputPressed(InInputTag);
}

void AWarriorHeroCharacter::Input_AbilityInputReleased(FGameplayTag InInputTag)
{
	WarriorAbilitySystemComponent->OnAbilityInputReleased(InInputTag);
}

void AWarriorHeroCharacter::Input_SwitchTargetTriggered(const FInputActionValue& InputActionValue)
{
	SwitchDirection = InputActionValue.Get<FVector2D>();
}

void AWarriorHeroCharacter::Input_SwitchTargetCompleted(const FInputActionValue& InputActionValue)
{
	FGameplayEventData Data;

	UAbilitySystemBlueprintLibrary::SendGameplayEventToActor(
		this,
		SwitchDirection.X>0.f? WarriorGameplayTags::Player_Event_SwitchTarget_Right : WarriorGameplayTags::Player_Event_SwitchTarget_Left,
		Data
	);
}

void AWarriorHeroCharacter::Input_PickUpStonesStarted(const FInputActionValue& InputActionValue)
{
	FGameplayEventData Data;

	UAbilitySystemBlueprintLibrary::SendGameplayEventToActor(
		this,
		WarriorGameplayTags::Player_Event_ConsumeStones,
		Data
	);
}
