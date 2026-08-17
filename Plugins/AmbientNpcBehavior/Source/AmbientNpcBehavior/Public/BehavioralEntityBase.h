#pragma once

#include "CoreMinimal.h"
#include "AmbientEntityBase.h"
#include "BehavioralEntityBase.generated.h"

/**
 * A behavioral ambient NPC driven by the framework.
 *
 * Implement OnStartCharacterAction in Blueprint to execute an action, and call
 * CompleteCurrentAction with the matching ActionId/ActionToken once the action
 * finishes.
 */
UCLASS(BlueprintType, Blueprintable)
class AMBIENTNPCBEHAVIOR_API ABehavioralEntityBase : public AAmbientEntityBase
{
	GENERATED_BODY()

public:
	ABehavioralEntityBase();

	/**
	 * Called when the framework requests this NPC to start an action.
	 * Store ActionToken and return it later via CompleteCurrentAction.
	 */
	UFUNCTION(BlueprintImplementableEvent, Category = "AmbientNpc")
	void OnStartCharacterAction(int32 ActionId, int64 ActionToken, int64 ActionDurationMs, AAmbientEntityBase* TargetEntity);

	/** Signals that the current action has completed. */
	UFUNCTION(BlueprintCallable, Category = "AmbientNpc")
	void CompleteCurrentAction(int32 ActionId, int64 ActionToken);

	virtual void NotifyStartAction(int32 ActionId, int64 ActionToken, int64 ActionDurationMs, AAmbientEntityBase* TargetEntity) override;
};
