#include "AmbientEntityBase.h"

#include "BehaviorFrameworkManagerBase.h"

AAmbientEntityBase::AAmbientEntityBase()
{
	PrimaryActorTick.bCanEverTick = false;
}

void AAmbientEntityBase::NotifyStartAction(int32 ActionId, int64 ActionToken, int64 ActionDurationMs, AAmbientEntityBase* TargetEntity)
{
	// Framework entities do not execute actions. Behavioral entities override this.
}

bool AAmbientEntityBase::GetEntityPosition(int32& OutX, int32& OutY, int32& OutZ) const
{
	const FVector Location = GetActorLocation();
	OutX = FMath::RoundToInt32(Location.X);
	OutY = FMath::RoundToInt32(Location.Y);
	OutZ = FMath::RoundToInt32(Location.Z);
	return true;
}

void AAmbientEntityBase::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	if (Manager && IsValid(Manager))
	{
		Manager->UnregisterEntity(this);
	}

	Super::EndPlay(EndPlayReason);
}
