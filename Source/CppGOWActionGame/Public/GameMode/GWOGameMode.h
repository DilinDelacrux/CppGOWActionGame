// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "GWOGameMode.generated.h"

enum class EWarriorGameDifficulty : uint8;
/**
 * 
 */
UCLASS()
class CPPGOWACTIONGAME_API AGWOGameMode : public AGameModeBase
{
	GENERATED_BODY()
public:
	AGWOGameMode();
protected:
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Game Settings")
	EWarriorGameDifficulty CurrentGameDifficulty;
public:
	FORCEINLINE EWarriorGameDifficulty GetCurrentGameDifficulty() const { return CurrentGameDifficulty;}
};
