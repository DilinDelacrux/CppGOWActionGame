// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameplayEffectTypes.h"
#include "Character/WarriorBaseCharacter.h"
#include "WarriorEnemyCharacter.generated.h"

struct FScalableFloat;
class UGameplayEffect;
class UWidgetComponent;
class UEnemyUIComponent;
class UEnemyCombatComponent;
/**
 * 
 */
UCLASS()
class CPPGOWACTIONGAME_API AWarriorEnemyCharacter : public AWarriorBaseCharacter
{
	GENERATED_BODY()

public:
	AWarriorEnemyCharacter();
	virtual void PossessedBy(AController* NewController) override;
	virtual UPawnCombatComponent* GetPawnCombatComponent() const;
	virtual UPawnUIComponent* GetPawnUIComponent() const override;
	virtual UEnemyUIComponent* GetEnemyUIComponent() const;
	

protected:
	virtual void BeginPlay() override;
	
	UPROPERTY(VisibleAnywhere,BlueprintReadOnly,Category="Combat")
	UEnemyCombatComponent* CombatComponent;
	
	UPROPERTY(VisibleAnywhere,BlueprintReadOnly,Category="UI")
	UEnemyUIComponent *EnemyUIComponent;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "UI")
	UWidgetComponent* EnemyHealthWidgetComponent;

public:
	FORCEINLINE UEnemyCombatComponent* GetCombatComponent() const { return CombatComponent; }

private:
	void InitEnemySetupData();
	
};
