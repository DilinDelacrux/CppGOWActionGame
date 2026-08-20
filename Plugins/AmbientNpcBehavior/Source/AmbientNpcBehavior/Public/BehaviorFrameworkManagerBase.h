#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "AmbientEntityBase.h"
#include "BehaviorFrameworkConfig.h"
#include "BehaviorFrameworkManagerBase.generated.h"

/**
 * Manages the lifecycle of the Ambient NPC Behavior Framework.
 *
 * Place one instance in the level, assign a UBehaviorFrameworkConfig, and the
 * framework is created/initialized on BeginPlay and shut down on EndPlay.
 * Ambient entities in the world are discovered and registered automatically.
 */
UCLASS(BlueprintType, Blueprintable)
class AMBIENTNPCBEHAVIOR_API ABehaviorFrameworkManagerBase : public AActor
{
	GENERATED_BODY()

public:
	ABehaviorFrameworkManagerBase();

	/** Framework configuration asset. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "AmbientNpc")
	UBehaviorFrameworkConfig* Config;

	/** Creates and initializes the framework. Called automatically on BeginPlay. */
	UFUNCTION(BlueprintCallable, Category = "AmbientNpc")
	void InitializeFramework();

	/** Shuts down and releases the framework. Called automatically on EndPlay. */
	UFUNCTION(BlueprintCallable, Category = "AmbientNpc")
	void ShutdownFramework();

	UFUNCTION(BlueprintPure, Category = "AmbientNpc")
	bool IsInitialized() const { return bInitialized; }

	/** Explicit script lifecycle hook, called after framework initialization. */
	UFUNCTION(BlueprintImplementableEvent, Category = "AmbientNpc|Script")
	void OnAmbientNpcScriptBeginPlay();

	/** Explicit script lifecycle hook, called once per actor tick. */
	UFUNCTION(BlueprintImplementableEvent, Category = "AmbientNpc|Script")
	void OnAmbientNpcScriptTick(float DeltaSeconds);

	/** Reads the daily-schedule JSON selected on Config. Returns an empty string if it cannot be read. */
	UFUNCTION(BlueprintCallable, Category = "AmbientNpc|Schedule")
	FString LoadDailyScheduleJson() const;

	UFUNCTION(BlueprintCallable, Category = "AmbientNpc|Configuration")
	FString LoadSchemaJson() const;

	UFUNCTION(BlueprintCallable, Category = "AmbientNpc|Configuration")
	FString LoadSequencesJson() const;

	UFUNCTION(BlueprintCallable, Category = "AmbientNpc|Configuration")
	FString LoadActionsJson() const;

	UFUNCTION(BlueprintCallable, Category = "AmbientNpc|Configuration")
	FString LoadEnvironmentalConditionsJson() const;

	/** Signals that an entity finished executing an action. */
	UFUNCTION(BlueprintCallable, Category = "AmbientNpc")
	void CompleteCharacterAction(AAmbientEntityBase* Entity, int32 ActionId, int64 ActionToken);

	/** Triggers an interruption on a set of entities. */
	UFUNCTION(BlueprintCallable, Category = "AmbientNpc")
	void ProcessInterruption(int32 InterruptionId, const TArray<AAmbientEntityBase*>& Entities);

	/** Internal: registers an entity with the framework. */
	void RegisterEntity(AAmbientEntityBase* Entity);

	/** Internal: unregisters an entity from the framework. */
	void UnregisterEntity(AAmbientEntityBase* Entity);

	/**
	 * Queries the current value of an environmental condition.
	 * Override in Blueprint to return values for your condition keys.
	 */
	UFUNCTION(BlueprintNativeEvent, Category = "AmbientNpc")
	int32 QueryEnvironmentalCondition(int32 ConditionKey);

protected:
	virtual void BeginPlay() override;
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;
	virtual void Tick(float DeltaSeconds) override;

private:
	void TickFramework();
	FString LoadConfigJson(const FString& FilePath, const TCHAR* ConfigName) const;

	static int32 StaticQueryEnvironmentalCondition(int32 ConditionKey);
	static void StaticStartCharacterAction(void* EntityHandle, int32 ActionId, int64 ActionToken, int64 ActionDurationMs, void* TargetEntityHandle);
	static bool StaticQueryEntityPosition(void* EntityId, int32* OutXyz);

	void* FrameworkHandle = nullptr;
	bool bInitialized = false;
	bool bLoggedFirstScriptTick = false;
	TSet<AAmbientEntityBase*> RegisteredEntities;
};
