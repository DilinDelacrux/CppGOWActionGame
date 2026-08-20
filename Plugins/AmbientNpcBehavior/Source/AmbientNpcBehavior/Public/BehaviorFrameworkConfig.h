#pragma once

#include "CoreMinimal.h"
#include "Engine/DataAsset.h"
#include "BehaviorFrameworkConfig.generated.h"

/**
 * Configuration for the Ambient NPC Behavior Framework.
 *
 * Holds the paths to the JSON configuration files loaded by the framework plus
 * the runtime settings used during initialization. Create one of these in the
 * editor, fill in the paths, and reference it from a
 * ABehaviorFrameworkManagerBase actor.
 */
UCLASS(BlueprintType)
class AMBIENTNPCBEHAVIOR_API UBehaviorFrameworkConfig : public UDataAsset
{
	GENERATED_BODY()

public:
	/** Path to the entity schema configuration file (entity_states / interruption_handlers). Relative paths are resolved from the project directory. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Files")
	FString SchemaFilePath;

	/** Path to the action sequences configuration file. Relative paths are resolved from the project directory. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Files")
	FString SequencesFilePath;

	/** Path to the actions configuration file. Relative paths are resolved from the project directory. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Files")
	FString ActionsFilePath;

	/** Path to the environmental conditions configuration file. Relative paths are resolved from the project directory. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Files")
	FString EnvironmentalConditionsFilePath;

	/**
	 * Path to the daily NPC schedule JSON consumed by the schedule demo. Relative
	 * paths are resolved from the project directory. This stays on the same data
	 * asset as the framework files so a level has one authoritative config.
	 */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Files")
	FString DailyScheduleFilePath = TEXT("Content/AmbientNpcBehavior/daily_schedule.json");

	/** Path where the framework writes its log file. Relative paths are resolved from the project directory. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Logging")
	FString LogFilePath;

	/**
	 * Logging verbosity.
	 * 0 = Debug, 1 = Info, 2 = Warning, 3 = Error.
	 */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Logging", meta = (ClampMin = "0", ClampMax = "3"))
	int32 LogLevel = 3;

	/**
	 * Selection algorithm to use.
	 * 0 = Memory-based, 1 = Uniform random.
	 */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Selection", meta = (ClampMin = "0", ClampMax = "1"))
	int32 SelectionAlgorithmOption = 0;

	/** Random seed. Use -1 to leave the seed unset. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Selection")
	int64 Seed = -1;

	/** Maximum number of NPCs to update per tick. */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Runtime", meta = (ClampMin = "1"))
	int32 UpdateBatchSize = 64;
};
