#include "BehavioralEntityBase.h"

#include "BehaviorFrameworkManagerBase.h"

ABehavioralEntityBase::ABehavioralEntityBase()
{
	PrimaryActorTick.bCanEverTick = false;
}

void ABehavioralEntityBase::NotifyStartAction(int32 ActionId, int64 ActionToken, int64 ActionDurationMs, AAmbientEntityBase* TargetEntity)
{
	OnStartCharacterAction(ActionId, ActionToken, ActionDurationMs, TargetEntity);
}

void ABehavioralEntityBase::CompleteCurrentAction(int32 ActionId, int64 ActionToken)
{
	ABehaviorFrameworkManagerBase* Mgr = GetManager();
	if (Mgr)
	{
		Mgr->CompleteCharacterAction(this, ActionId, ActionToken);
	}
	else
	{
		UE_LOG(LogTemp, Warning, TEXT("ABehavioralEntityBase::CompleteCurrentAction called with no manager assigned."));
	}
}
