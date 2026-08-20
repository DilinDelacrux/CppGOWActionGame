#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "AmbientEntityBase.generated.h"

class ABehaviorFrameworkManagerBase;

/**
 * Base class for entities registered with the Ambient NPC Behavior Framework.
 *
 * Framework entities (non-behavioral, e.g. static props/anchors) can be
 * instances of this class directly. Behavioral NPCs should derive from
 * ABehavioralEntityBase instead.
 */
UCLASS(BlueprintType, Blueprintable)
class AMBIENTNPCBEHAVIOR_API AAmbientEntityBase : public AActor
{
	GENERATED_BODY()

public:
	AAmbientEntityBase();

	/** Path to the per-entity JSON configuration file. Relative paths are resolved from the project directory. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "AmbientNpc")
	FString EntityConfigFilePath;

	/** Returns the manager this entity is registered with, if any. */
	ABehaviorFrameworkManagerBase* GetManager() const { return Manager; }

	/** Internal: called by the manager when the framework starts an action on this entity. */
	virtual void NotifyStartAction(int32 ActionId, int64 ActionToken, int64 ActionDurationMs, AAmbientEntityBase* TargetEntity);

	/** Internal: fills integer world coordinates from the actor location. */
	bool GetEntityPosition(int32& OutX, int32& OutY, int32& OutZ) const;

	/** Internal: associates this entity with a manager. */
	void SetManager(ABehaviorFrameworkManagerBase* InManager) { Manager = InManager; }

protected:
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;

private:
	ABehaviorFrameworkManagerBase* Manager = nullptr;
};
