// Fill out your copyright notice in the Description page of Project Settings.


#include "GameMode/GWOGameMode.h"
#include "Misc/WarriorEnumTypes.h"
AGWOGameMode::AGWOGameMode()
{
	PrimaryActorTick.bCanEverTick = true;
	PrimaryActorTick.bStartWithTickEnabled=true;

	CurrentGameDifficulty=EWarriorGameDifficulty::Easy;
}
