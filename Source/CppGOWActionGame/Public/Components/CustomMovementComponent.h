// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "CustomMovementComponent.generated.h"

class AWarriorHeroCharacter;
DECLARE_DELEGATE(FOnEnterClimbState)
DECLARE_DELEGATE(FOnExitClimbState)


class UAnimMontage;
class UAnimInstance;

UENUM(BlueprintType)
namespace ECustomMovementMode
{
	enum Type
	{
		MOVE_Climb UMETA(DisplayName="Climb Mode")
	};
}
/**
 * 
 */
UCLASS()
class CPPGOWACTIONGAME_API UCustomMovementComponent : public UCharacterMovementComponent
{
	GENERATED_BODY()

public:
	FOnEnterClimbState OnEnterClimbStateDelegate;
	FOnExitClimbState OnExitClimbStateDelegate;
protected:
#pragma region overridefunctions
	virtual void BeginPlay() override;
	virtual void TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;
	virtual void OnMovementModeChanged(EMovementMode PreviousMovementMode, uint8 PreviousCustomMode) override;
	virtual void PhysCustom(float deltaTime, int32 Iterations) override;
	virtual float GetMaxSpeed() const override;
	virtual float GetMaxAcceleration() const override;
	virtual FVector ConstrainAnimRootMotionVelocity(const FVector& RootMotionVelocity, const FVector& CurrentVelocity) const override;
#pragma endregion
#pragma  region ClimbTraces
	TArray<FHitResult> DoCapsuleTraceMultiByObjects(const FVector& Start,const FVector& End,bool bShowDebugShape=false,bool bDrawPersistentShapes=false);
	FHitResult DoLineTraceSingleByObject(const FVector& Start,const FVector& End,bool bShowDebugShape=false,bool bDrawPersistentShapes=false);
#pragma endregion

#pragma region ClimbCore
	bool TraceClimbableSurfaces();
	FHitResult TraceFromEyeHeight(float TraceDistance, float TraceStartOffset = 0.f,bool bDrawPersistentshapes=true);
	bool CanStartClimbing();
	bool CanClimbDownLedge();
	void StartClimbing();
	void StopClimbing();
	void PhysClimb(float deltaTime, int32 Iterations);
	void ProcessClimbableSurfaceInfo();
	FQuat GetClimbRotation(float DeltaTime);
	bool CheckShouldStopClimbing();
	bool CheckHasReachedFloor();
	void SnapMovementToClimbableSurfaces(float DeltaTime);
	bool CheckHasReachedLedge();
	void PlayClimbMontage(UAnimMontage* MontageToPlay);

	void TryStartVaulting();
	bool CanStartVaulting(FVector& OutVaultStartPosition, FVector& OutVaultEndPosition);
	
	UFUNCTION()
	void OnClimbMontageEnded(UAnimMontage* Montage,bool bInterrupted);
	void SetMotionWarpTarget(const FName& InWarpTargetName,const FVector& InWarpLocation);
	void HandleHopUp();
	bool CheckCanHopUp(FVector& OutHopUpTargetPosition);
	void HandleHopDown();
	bool CheckCanHopDown(FVector& OutHopUpTargetPosition);
	void HandleHopLeft();
	bool CheckCanHopLeft(FVector& OutHopLeftTargetPosition);
	void HandleHopRight();
	bool CheckCanHopRight(FVector& OutHopRightTargetPosition);
#pragma endregion

#pragma region ClimbCoreVariables
	TArray<FHitResult> ClimbableSurfacesTracedResults;
	FVector CurrentClimbableSurfaceLocation;
	FVector CurrentClimbableSurfaceNormal;

	UPROPERTY(EditAnywhere)
	UAnimInstance* OwningPlayerAnimInstance;

	UPROPERTY()
	AWarriorHeroCharacter* OwningPlayerCharacter;
#pragma endregion
	
#pragma region ClimbBPVariables
	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	TArray<TEnumAsByte<EObjectTypeQuery> >  ClimbableSurfaceTraceTypes;
	
	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	float ClimbCapsuleTraceRadius=50.f;

	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	float ClimbCapsuleTraceHalfHeight=72.f;
	
	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	float MaxbrakingClimbDeceleration=400.f;
	
	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	float MaxClimbSpeed =100.f;

	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	float MaxClimbAcceleration =300.f;

	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	float ClimbDownWalkableSurfaceTraceOffset =100.f;

	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	float ClimbDownLedgeSurfaceTraceOffset =50.f;

	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	UAnimMontage* IdleToClimbMontage;

	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	UAnimMontage* ClimbToTopMontage;

	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	UAnimMontage* ClimbDownLedgeMontage;

	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	UAnimMontage* VaultMontage;

	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	UAnimMontage* HopUpMontage;
	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	UAnimMontage* HopDownMontage;
	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	UAnimMontage* HopLeftMontage;
	UPROPERTY(EditDefaultsOnly,BlueprintReadOnly,Category="Character Movement:Climbing",meta = (AllowPrivateAccess = "true"))
	UAnimMontage* HopRightMontage;
	
#pragma endregion

public:
	void ToggleClimbing(bool bEnableClimb);
	void RequestHopping();
	bool IsClimbing() const;
	FORCEINLINE FVector GetClimbableSurfaceNormal()const{return CurrentClimbableSurfaceNormal;};
	FVector GetUnrotatedClimbVelocity()const;
};
