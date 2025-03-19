// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Character/WarriorBaseCharacter.h"
#include "WarriorHeroCharacter.generated.h"

class UCameraComponent;
class USpringArmComponent;
/**
 * 
 */
UCLASS()
class CPPGOWACTIONGAME_API AWarriorHeroCharacter : public AWarriorBaseCharacter
{
	GENERATED_BODY()

protected:
	virtual void BeginPlay() override;
public:
	AWarriorHeroCharacter();
	
private:
#pragma region component
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly,Category="Camera",meta=(AllowPrivateAccess=true))
	USpringArmComponent* CameraBoom;
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly,Category="Camera",meta=(AllowPrivateAccess=true))
	UCameraComponent* FollowCamera;
	
#pragma endregion
};
