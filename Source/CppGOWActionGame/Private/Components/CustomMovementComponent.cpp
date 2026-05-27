// Fill out your copyright notice in the Description page of Project Settings.


#include "Components/CustomMovementComponent.h"

#include "MotionWarpingComponent.h"
#include "Character/WarriorHeroCharacter.h"
#include "Misc/WarriorDebugHelper.h"
#include "Components/CapsuleComponent.h"
#include "Evaluation/Blending/MovieSceneBlendType.h"
#include "GameFramework/Character.h"
#include "Kismet/KismetMathLibrary.h"
#include "Kismet/KismetSystemLibrary.h"

#pragma  region Climb Traces
void UCustomMovementComponent::BeginPlay()
{
	Super::BeginPlay();
	
	OwningPlayerAnimInstance=CharacterOwner->GetMesh()->GetAnimInstance();

	if(OwningPlayerAnimInstance)
	{
		OwningPlayerAnimInstance->OnMontageEnded.AddDynamic(this,&UCustomMovementComponent::OnClimbMontageEnded);
		OwningPlayerAnimInstance->OnMontageBlendingOut.AddDynamic(this,&UCustomMovementComponent::OnClimbMontageEnded);
	}

	OwningPlayerCharacter=Cast<AWarriorHeroCharacter>(CharacterOwner);
}

void UCustomMovementComponent::TickComponent(float DeltaTime, enum ELevelTick TickType,
                                             FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);
	// TraceClimbableSurfaces();
	// TraceFromEyeHeight(100.f);
	
}

void UCustomMovementComponent::OnMovementModeChanged(EMovementMode PreviousMovementMode, uint8 PreviousCustomMode)
{
	if(IsClimbing())
	{
		bOrientRotationToMovement=false;
		CharacterOwner->GetCapsuleComponent()->SetCapsuleHalfHeight(48.f);

		OnEnterClimbStateDelegate.ExecuteIfBound();
	}
	if(PreviousMovementMode==MOVE_Custom&&PreviousCustomMode==ECustomMovementMode::MOVE_Climb)
	{
		bOrientRotationToMovement=true;
		CharacterOwner->GetCapsuleComponent()->SetCapsuleHalfHeight(96.f);

		const FRotator DirtyRotation =UpdatedComponent->GetComponentRotation();
		const FRotator CleanStandRotation=FRotator(0.f,DirtyRotation.Yaw,0.f);
		UpdatedComponent->SetRelativeRotation(CleanStandRotation);
		
		StopMovementImmediately();

		OnExitClimbStateDelegate.ExecuteIfBound();
	}
	Super::OnMovementModeChanged(PreviousMovementMode, PreviousCustomMode);

	
}

void UCustomMovementComponent::PhysCustom(float deltaTime, int32 Iterations)
{
	if(IsClimbing())
	{
		PhysClimb(deltaTime, Iterations);
	}
	Super::PhysCustom(deltaTime, Iterations);
}

float UCustomMovementComponent::GetMaxSpeed() const
{
	if(IsClimbing())
	{
		return MaxClimbSpeed;
	}
	else
	{
		return Super::GetMaxSpeed();
	}
}

float UCustomMovementComponent::GetMaxAcceleration() const
{
	if(IsClimbing())
	{
		return MaxClimbAcceleration;
	}
	else
	{
		return Super::GetMaxAcceleration();
	}
}

FVector UCustomMovementComponent::ConstrainAnimRootMotionVelocity(const FVector& RootMotionVelocity,
	const FVector& CurrentVelocity) const
{
	const bool bIsPlayingRMMontage
	=IsFalling()&&OwningPlayerAnimInstance&&OwningPlayerAnimInstance->IsAnyMontagePlaying();

	if(bIsPlayingRMMontage)
	{
		return RootMotionVelocity;
	}
	else
	{
		return Super::ConstrainAnimRootMotionVelocity(RootMotionVelocity, CurrentVelocity);
	}
}

TArray<FHitResult> UCustomMovementComponent::DoCapsuleTraceMultiByObjects(const FVector& Start, const FVector& End,
                                                                          bool bShowDebugShape,bool bDrawPersistentShapes)
{
	TArray<FHitResult> OutCapsuleTraceMultiResults;

	EDrawDebugTrace::Type DebugTraceType= EDrawDebugTrace::None;
	if(bShowDebugShape)
	{
		DebugTraceType=EDrawDebugTrace::ForOneFrame;
		if(bDrawPersistentShapes)
		{
			DebugTraceType=EDrawDebugTrace::Persistent;
		}
	}
	UKismetSystemLibrary::CapsuleTraceMultiForObjects(
		this,
		Start,
		End,
		ClimbCapsuleTraceRadius,
		ClimbCapsuleTraceHalfHeight,
		ClimbableSurfaceTraceTypes,
		false,
		TArray<AActor*>(),
		DebugTraceType,
		OutCapsuleTraceMultiResults,
		false
		);
	
	return OutCapsuleTraceMultiResults;
}

FHitResult UCustomMovementComponent::DoLineTraceSingleByObject(const FVector& Start, const FVector& End,
	bool bShowDebugShape,bool bDrawPersistentShapes)
{
	FHitResult OutHit;
	EDrawDebugTrace::Type DebugTraceType= EDrawDebugTrace::None;
	if(bShowDebugShape)
	{
		DebugTraceType=EDrawDebugTrace::ForOneFrame;
		if(bDrawPersistentShapes)
		{
			DebugTraceType=EDrawDebugTrace::Persistent;
		}
	}
	UKismetSystemLibrary::LineTraceSingleForObjects(
	this,
	Start,
	End,
	ClimbableSurfaceTraceTypes,
	false,
	TArray<AActor*>(),
	DebugTraceType,
	OutHit,
	false
	);
	return OutHit;
}
#pragma endregion

#pragma region Climb Core
void UCustomMovementComponent::ToggleClimbing(bool bEnableClimb)
{
	if(bEnableClimb)
	{
		if(CanStartClimbing())
		{
			PlayClimbMontage(IdleToClimbMontage);
		}
		else if(CanClimbDownLedge())
		{
			PlayClimbMontage(ClimbDownLedgeMontage);
		}
		else
		{
			TryStartVaulting();
		}
	}
	else
	{
		//stop climbing
		StopClimbing();
	}
}


bool UCustomMovementComponent::IsClimbing() const
{
	return MovementMode==MOVE_Custom &&CustomMovementMode==ECustomMovementMode::MOVE_Climb;
}

FVector UCustomMovementComponent::GetUnrotatedClimbVelocity() const
{
	return UKismetMathLibrary::Quat_UnrotateVector(UpdatedComponent->GetComponentQuat(),Velocity);
}

//return true if valid surface
bool UCustomMovementComponent::TraceClimbableSurfaces()
{
	const FVector StartOffset =UpdatedComponent->GetForwardVector()*30.f;
	const FVector Start= UpdatedComponent->GetComponentLocation()+StartOffset;
	const FVector End = Start+UpdatedComponent->GetForwardVector()*1.f;
	ClimbableSurfacesTracedResults=DoCapsuleTraceMultiByObjects(Start,End,true,false);
	return !ClimbableSurfacesTracedResults.IsEmpty();
}

FHitResult UCustomMovementComponent::TraceFromEyeHeight(float TraceDistance, float TraceStartOffset,bool bDrawPersistentshapes)
{
	const FVector ComponentLocation=UpdatedComponent->GetComponentLocation();
	const FVector EyeHeightOffset=UpdatedComponent->GetUpVector()*(CharacterOwner->BaseEyeHeight+TraceStartOffset);
	const FVector Start=ComponentLocation+EyeHeightOffset;
	const FVector End =Start+UpdatedComponent->GetForwardVector()*TraceDistance;
	return DoLineTraceSingleByObject(Start,End,true,bDrawPersistentshapes);
}

bool UCustomMovementComponent::CanStartClimbing()
{
	if(IsFalling())
	{
		Debug::Print(TEXT("Can NOT Start Climbing:Player is falling"));
		return false;
	}
		
	if(!TraceClimbableSurfaces())
	{
		Debug::Print(TEXT("Can NOT Start Climbing:Unable To Find Surface"));
		return false;
	}
	if(!TraceFromEyeHeight(100.f).bBlockingHit)
	{
		Debug::Print(TEXT("Can NOT Start Climbing:Surface too low"));
		return false;
	}
	return true;
}

bool UCustomMovementComponent::CanClimbDownLedge()
{
	if(IsFalling()) return false;

	const FVector ComponentLocation= UpdatedComponent->GetComponentLocation();
	const FVector ComponentForward =UpdatedComponent->GetForwardVector();
	const FVector DownVector= -UpdatedComponent->GetUpVector();

	const FVector WalkableSurfaceTraceStart=ComponentLocation+ComponentForward*ClimbDownWalkableSurfaceTraceOffset;
	const FVector WalkableSurfaceTraceEnd=WalkableSurfaceTraceStart+DownVector*100.f;

	FHitResult WalkableSurfaceHit =DoLineTraceSingleByObject(WalkableSurfaceTraceStart,WalkableSurfaceTraceEnd,true,false);

	const FVector LedgeTraceStart=WalkableSurfaceHit.TraceStart+ComponentForward*ClimbDownLedgeSurfaceTraceOffset;
	const FVector LedgeTraceEnd=LedgeTraceStart+DownVector*300.f;

	FHitResult LedgeTraceHit=DoLineTraceSingleByObject(LedgeTraceStart,LedgeTraceEnd,true,false);

	if(WalkableSurfaceHit.bBlockingHit&&!LedgeTraceHit.bBlockingHit)
	{
		return true;
	}
	return false;
}

void UCustomMovementComponent::StartClimbing()
{
	SetMovementMode(MOVE_Custom,ECustomMovementMode::MOVE_Climb);
}

void UCustomMovementComponent::StopClimbing()
{
	SetMovementMode(MOVE_Falling);
}

void UCustomMovementComponent::PhysClimb(float deltaTime, int32 Iterations)
{
	if (deltaTime < MIN_TICK_TIME)
	{
		return;
	}
	//process all the climbable surfaces info
	TraceClimbableSurfaces();
	ProcessClimbableSurfaceInfo();
	
	//check if we should stop climbing
	if(CheckShouldStopClimbing()||CheckHasReachedFloor())
	{
		StopClimbing();
	}
	RestorePreAdditiveRootMotionVelocity();
	if( !HasAnimRootMotion() && !CurrentRootMotion.HasOverrideVelocity() )
	{
		//Define the max climb speed and acceleration
		CalcVelocity(deltaTime, 0.f, true, MaxbrakingClimbDeceleration);
	}

	ApplyRootMotionToVelocity(deltaTime);

	FVector OldLocation = UpdatedComponent->GetComponentLocation();
	const FVector Adjusted = Velocity * deltaTime;
	FHitResult Hit(1.f);
	
	//handle climb rotation
	SafeMoveUpdatedComponent(Adjusted, GetClimbRotation(deltaTime), true, Hit);

	if (Hit.Time < 1.f)
	{
		//adjust and try again
		HandleImpact(Hit, deltaTime, Adjusted);
		SlideAlongSurface(Adjusted, (1.f - Hit.Time), Hit.Normal, Hit, true);
	}

	if( !bJustTeleported && !HasAnimRootMotion() && !CurrentRootMotion.HasOverrideVelocity() )
	{
		Velocity = (UpdatedComponent->GetComponentLocation() - OldLocation) / deltaTime;
	}
	//snap movement to climbable surfaces
	SnapMovementToClimbableSurfaces(deltaTime);

	if(CheckHasReachedLedge())
	{
		// Debug::Print(TEXT("Ledge Detected"),FColor::Green,1);
		// StopClimbing();
		PlayClimbMontage(ClimbToTopMontage);
	}
	else
	{
		// Debug::Print(TEXT("Ledge Not Detected"),FColor::Red,1);

	}
}

void UCustomMovementComponent::ProcessClimbableSurfaceInfo()
{
	CurrentClimbableSurfaceLocation = FVector::ZeroVector;
	CurrentClimbableSurfaceNormal=FVector::ZeroVector;

	if(ClimbableSurfacesTracedResults.IsEmpty()) return;

	for(const FHitResult& TracedHitResult:ClimbableSurfacesTracedResults)
	{
		CurrentClimbableSurfaceLocation+=TracedHitResult.ImpactPoint;
		CurrentClimbableSurfaceNormal+=TracedHitResult.ImpactNormal;
	}

	CurrentClimbableSurfaceLocation /=ClimbableSurfacesTracedResults.Num();
	CurrentClimbableSurfaceNormal =CurrentClimbableSurfaceNormal.GetSafeNormal();

	// Debug::Print(TEXT("ClimbableSurfaceLocation:")+CurrentClimbableSurfaceLocation.ToCompactString(),FColor::Cyan,1);
	// Debug::Print(TEXT("ClimbableSurfaceNormal:")+CurrentClimbableSurfaceNormal.ToCompactString(),FColor::Red,2);
}

FQuat UCustomMovementComponent::GetClimbRotation(float DeltaTime)
{
	const FQuat CurrentQuat=UpdatedComponent->GetComponentQuat();
	if(HasAnimRootMotion()||CurrentRootMotion.HasOverrideVelocity())
	{
		return CurrentQuat;
	}
	const FQuat TargetQuat = FRotationMatrix::MakeFromX(-CurrentClimbableSurfaceNormal).ToQuat();
	return FMath::QInterpTo(CurrentQuat,TargetQuat,DeltaTime,5.f);
}

bool UCustomMovementComponent::CheckShouldStopClimbing()
{
	if(ClimbableSurfacesTracedResults.IsEmpty()) return true;
	
	const float DotResult =FVector::DotProduct(CurrentClimbableSurfaceNormal,FVector::UpVector);
	const float DegreeDiff =FMath::RadiansToDegrees(FMath::Acos(DotResult));
	
	if(DegreeDiff<=60.f)
	{
		Debug::Print(TEXT("Degree Diff = ")+FString::SanitizeFloat(DegreeDiff)+TEXT(" Stop Climbing"),FColor::Cyan,1);
		return true;	
	} 
	
	return false;
}

bool UCustomMovementComponent::CheckHasReachedFloor()
{
	const FVector DownVector=-UpdatedComponent->GetUpVector();
	const FVector StartOffset=DownVector*50.f;
	const FVector Start =UpdatedComponent->GetComponentLocation()+StartOffset;
	const FVector End=Start + DownVector;

	TArray<FHitResult> PossibleFloorHits =DoCapsuleTraceMultiByObjects(Start,End,true);

	if(PossibleFloorHits.IsEmpty()) return false;

	for(const FHitResult& PossibleFloorHit: PossibleFloorHits)
	{
		//Climbing Down
		const bool bfloorReached=
		FVector::Parallel(-PossibleFloorHit.ImpactNormal,FVector::UpVector)&&
		GetUnrotatedClimbVelocity().Z<-10.f;

		if(bfloorReached)
		{
			Debug::Print(TEXT("Floor Reached"),FColor::Green,1);
			return true;
		}
	}
	
	return false;
}

void UCustomMovementComponent::SnapMovementToClimbableSurfaces(float DeltaTime)
{
	const FVector ComponentForward=UpdatedComponent->GetForwardVector();
	const FVector ComponentLocation =UpdatedComponent->GetComponentLocation();
	const FVector ProjectedCharacterToSurface =
		(CurrentClimbableSurfaceLocation- ComponentLocation).ProjectOnTo(ComponentForward);

	const FVector SnapVector =-CurrentClimbableSurfaceNormal*ProjectedCharacterToSurface.Length();
	UpdatedComponent->MoveComponent(SnapVector*DeltaTime*MaxClimbSpeed,
		UpdatedComponent->GetComponentQuat(),true);
}

bool UCustomMovementComponent::CheckHasReachedLedge()
{
	FHitResult LedgeHitResult = TraceFromEyeHeight(100.f,50.f,false);
	if(!LedgeHitResult.bBlockingHit)
	{
		const FVector WalkableSurfaceTraceStart=LedgeHitResult.TraceEnd;
		const FVector DownVector=-UpdatedComponent->GetUpVector();
		const FVector WalkableSurfaceTraceEnd=WalkableSurfaceTraceStart+DownVector*100;

		FHitResult WalkableSurfaceHitResult;
		
		WalkableSurfaceHitResult=DoLineTraceSingleByObject(WalkableSurfaceTraceStart,WalkableSurfaceTraceEnd,true,false);
		if(WalkableSurfaceHitResult.bBlockingHit && GetUnrotatedClimbVelocity().Z>10.f)
		{
			return true;
		}
	}
	return false;
}

void UCustomMovementComponent::PlayClimbMontage(UAnimMontage* MontageToPlay)
{
	if(!MontageToPlay) return;
	if(!OwningPlayerAnimInstance) return;
	if(OwningPlayerAnimInstance->IsAnyMontagePlaying()) return;
	
	OwningPlayerAnimInstance->Montage_Play(MontageToPlay);
}

void UCustomMovementComponent::TryStartVaulting()
{
	FVector VaultStartPosition;
	FVector VaultEndPosition;
	
	if(CanStartVaulting(VaultStartPosition,VaultEndPosition))
	{
		SetMotionWarpTarget(FName("VaultStartPoint"),VaultStartPosition);
		SetMotionWarpTarget(FName("VaultLandPoint"),VaultEndPosition);

		StartClimbing();
		PlayClimbMontage(VaultMontage);
		//Start Vaulting
		Debug::Print(TEXT("Start Position: ")+VaultStartPosition.ToCompactString());
		Debug::Print(TEXT("Start Position: ")+VaultEndPosition.ToCompactString());
	}
	else
	{
		Debug::Print(TEXT("(Unable to Vault)"));
	}
}

bool UCustomMovementComponent::CanStartVaulting(FVector& OutVaultStartPosition, FVector& OutVaultEndPosition)
{
	if(IsFalling()) return false;

	OutVaultStartPosition=FVector::ZeroVector;
	OutVaultEndPosition=FVector::ZeroVector;
	
	const FVector ComponentLocation =UpdatedComponent->GetComponentLocation();
	const FVector ComponentForward=UpdatedComponent->GetForwardVector();
	const FVector DownVector=-UpdatedComponent->GetUpVector();
	const FVector UpVector=UpdatedComponent->GetUpVector();

	for (int i =0 ; i<5 ; i++)
	{
		const FVector Start =ComponentLocation +UpVector*100.f +ComponentForward *100.f *(i+1);
		const FVector End=Start + DownVector *100.f *(i+1);

		FHitResult VaultTraceHit = DoLineTraceSingleByObject(Start,End,true,true);
		if(VaultTraceHit.bBlockingHit)
		{
			if(i==0) OutVaultStartPosition=VaultTraceHit.ImpactPoint;

			if(i==4) OutVaultEndPosition=VaultTraceHit.ImpactPoint;
		}
	}
	if(OutVaultStartPosition!=FVector::ZeroVector&&OutVaultEndPosition!=FVector::ZeroVector) return true;
	
	return false;
}

void UCustomMovementComponent::OnClimbMontageEnded(UAnimMontage* Montage, bool bInterrupted)
{
	Debug::Print(TEXT("OnClimbMontageEnded"));
	
	if(Montage==IdleToClimbMontage||Montage == ClimbDownLedgeMontage)
	{
		StartClimbing();
		//disable the velocity from montage
		StopMovementImmediately();
	}
	if(Montage==ClimbToTopMontage||Montage==VaultMontage)
	{
		SetMovementMode(MOVE_Walking);	
	}
	
	
}

void UCustomMovementComponent::SetMotionWarpTarget(const FName& InWarpTargetName, const FVector& InWarpLocation)
{
	if(!OwningPlayerCharacter) return;

	OwningPlayerCharacter->GetMotionWarpingComponent()->AddOrUpdateWarpTargetFromLocation(
		InWarpTargetName,InWarpLocation
		);
}
void UCustomMovementComponent::RequestHopping()
{
	const FVector UnrotatedVector = 
	UKismetMathLibrary::Quat_UnrotateVector(UpdatedComponent->GetComponentQuat(),GetLastInputVector());
	// Debug::Print(UnrotatedVelocity.GetSafeNormal().ToCompactString(),FColor::Cyan,1);
	const float DotResult= FVector::DotProduct(UnrotatedVector.GetSafeNormal(),FVector::UpVector);
	const FVector CrossResult = FVector::CrossProduct(UnrotatedVector.GetSafeNormal(), FVector::UpVector);
	// Debug::Print(UnrotatedVelocity.GetSafeNormal().ToCompactString(),FColor::Cyan,1);

	// Debugging: print the DotResult and CrossResult for clarity
	Debug::Print(FString::Printf(TEXT("DotResult: %f"), DotResult), FColor::Cyan, 1);
	Debug::Print(FString::Printf(TEXT("CrossResult: %s"), *CrossResult.ToCompactString()), FColor::Cyan, 1);
	
	if(DotResult > 0.9f)
	{
		HandleHopUp();
	}
	else if(DotResult<-0.9)
	{
		HandleHopDown();
	}
	else if (DotResult<0.1&&DotResult>-0.1)
	{
		if(CrossResult.X>0)
		{
			HandleHopRight();
			// Debug::Print(FString::Printf("Try Hop Right"), FColor::Cyan, 1);

		}
		else
		{
			// Debug::Print(FString::Printf("Try Hop Left"), FColor::Cyan, 1);
			HandleHopLeft();

		}
		
	}
	else
	{
		
	}
}

void UCustomMovementComponent::HandleHopUp()
{
	FVector HopUpTargetPoint;
	if(CheckCanHopUp(HopUpTargetPoint))
	{
		SetMotionWarpTarget("HopUpTargetPoint",HopUpTargetPoint);
		PlayClimbMontage(HopUpMontage);
	}
	else
	{
		Debug::Print(TEXT("Unable to Hop Up"));
	}
}

bool UCustomMovementComponent::CheckCanHopUp(FVector& OutHopUpTargetPosition)
{
	FHitResult HopupHit=TraceFromEyeHeight(100.f,-30.f,true);
	FHitResult SafetyLedgeHit=TraceFromEyeHeight(100.f,150.f,true);
	if(HopupHit.bBlockingHit&&SafetyLedgeHit.bBlockingHit)
	{
		OutHopUpTargetPosition=HopupHit.ImpactPoint;
		return true;
	}
	return false;
}

void UCustomMovementComponent::HandleHopDown()
{
	FVector HopDownTargetPoint;
	if(CheckCanHopDown(HopDownTargetPoint))
	{
		SetMotionWarpTarget("HopDownTargetPoint",HopDownTargetPoint);
		PlayClimbMontage(HopDownMontage);
	}
	else
	{
		Debug::Print(TEXT("Unable to Hop Down"));
	}
}

bool UCustomMovementComponent::CheckCanHopDown(FVector& OutHopUpTargetPosition)
{
	FHitResult HopDownHit=TraceFromEyeHeight(100.f,-300.f,true);
	// FHitResult SafetyLedgeHit=TraceFromEyeHeight(100.f,150.f,true);
	if(HopDownHit.bBlockingHit)
	{
		OutHopUpTargetPosition=HopDownHit.ImpactPoint;
		return true;
	}
	return false;
}

void UCustomMovementComponent::HandleHopLeft()
{
	FVector HopLeftTargetPoint;
	if(CheckCanHopLeft(HopLeftTargetPoint))
	{
		SetMotionWarpTarget("HopLeftTargetPoint",HopLeftTargetPoint);
		PlayClimbMontage(HopLeftMontage);
	}
	else
	{
		Debug::Print(TEXT("Unable to Hop Left"));
	}
}

bool UCustomMovementComponent::CheckCanHopLeft(FVector& OutHopLeftTargetPosition)
{
	const FVector ComponentLocation=UpdatedComponent->GetComponentLocation();
	const FVector Start=ComponentLocation;
	const FVector End =Start-UpdatedComponent->GetRightVector()*200.f;
	FHitResult LeftHit= DoLineTraceSingleByObject(Start,End,true,true);
	if(LeftHit.bBlockingHit) return false;

	const FVector NewEnd = End+UpdatedComponent->GetForwardVector()*100;
	FHitResult WallHit= DoLineTraceSingleByObject(End,NewEnd,true,true);

	if(WallHit.bBlockingHit)
	{
		OutHopLeftTargetPosition=WallHit.ImpactPoint;
		return true;
	}
	
	return false;
}

void UCustomMovementComponent::HandleHopRight()
{
	FVector HopRightTargetPoint;
	if(CheckCanHopRight(HopRightTargetPoint))
	{
		SetMotionWarpTarget("HopRightTargetPoint",HopRightTargetPoint);
		PlayClimbMontage(HopRightMontage);
	}
	else
	{
		Debug::Print(TEXT("Unable to Hop Right"));
	}
}

bool UCustomMovementComponent::CheckCanHopRight(FVector& OutHopRightTargetPosition)
{
	const FVector ComponentLocation=UpdatedComponent->GetComponentLocation();
	const FVector Start=ComponentLocation;
	const FVector End =Start+UpdatedComponent->GetRightVector()*200.f;
	FHitResult RightHit= DoLineTraceSingleByObject(Start,End,true,true);
	if(RightHit.bBlockingHit) return false;

	const FVector NewEnd = End+UpdatedComponent->GetForwardVector()*100;
	
	FHitResult WallHit= DoLineTraceSingleByObject(End,NewEnd,true,true);

	if(WallHit.bBlockingHit)
	{
		OutHopRightTargetPosition=WallHit.ImpactPoint;
		return true;
	}
	
	return false;
}


#pragma endregion



