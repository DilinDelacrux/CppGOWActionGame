#include "BehaviorFrameworkManagerBase.h"

#include "BehaviorFrameworkInterface.h"
#include "Engine/World.h"
#include "EngineUtils.h"

// The environmental-condition callback does not receive a framework or manager
// handle, so the active manager is tracked here during the synchronous Update call.
static ABehaviorFrameworkManagerBase* GActiveAmbientNpcManager = nullptr;

ABehaviorFrameworkManagerBase::ABehaviorFrameworkManagerBase()
{
	PrimaryActorTick.bCanEverTick = true;
}

void ABehaviorFrameworkManagerBase::BeginPlay()
{
	Super::BeginPlay();

	InitializeFramework();
}

void ABehaviorFrameworkManagerBase::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	ShutdownFramework();

	Super::EndPlay(EndPlayReason);
}

void ABehaviorFrameworkManagerBase::Tick(float DeltaSeconds)
{
	Super::Tick(DeltaSeconds);

	TickFramework();
}

void ABehaviorFrameworkManagerBase::InitializeFramework()
{
	if (bInitialized)
	{
		return;
	}

	if (!Config)
	{
		UE_LOG(LogTemp, Warning, TEXT("ABehaviorFrameworkManagerBase: no UBehaviorFrameworkConfig assigned."));
		return;
	}

	FrameworkHandle = ::CreateAmbientBehaviorFramework(
		&ABehaviorFrameworkManagerBase::StaticQueryEnvironmentalCondition,
		&ABehaviorFrameworkManagerBase::StaticStartCharacterAction,
		&ABehaviorFrameworkManagerBase::StaticQueryEntityPosition);

	if (!FrameworkHandle)
	{
		UE_LOG(LogTemp, Error, TEXT("ABehaviorFrameworkManagerBase: failed to create the framework handle."));
		return;
	}

	FTCHARToUTF8 SchemaPath(*Config->SchemaFilePath);
	FTCHARToUTF8 SequencesPath(*Config->SequencesFilePath);
	FTCHARToUTF8 ActionsPath(*Config->ActionsFilePath);
	FTCHARToUTF8 ConditionsPath(*Config->EnvironmentalConditionsFilePath);
	FTCHARToUTF8 LogFileUtf8(*Config->LogFilePath);

	bInitialized = ::InitializeAmbientBehaviorFramework(
		FrameworkHandle,
		SchemaPath.Get(),
		SequencesPath.Get(),
		ActionsPath.Get(),
		ConditionsPath.Get(),
		LogFileUtf8.Get(),
		Config->LogLevel,
		Config->SelectionAlgorithmOption,
		Config->Seed);

	if (!bInitialized)
	{
		UE_LOG(LogTemp, Error, TEXT("ABehaviorFrameworkManagerBase: framework initialization failed. Check the config file paths."));
	}
}

void ABehaviorFrameworkManagerBase::ShutdownFramework()
{
	if (FrameworkHandle)
	{
		::ShutdownAmbientBehaviorFramework(FrameworkHandle);
		FrameworkHandle = nullptr;
	}

	bInitialized = false;
	RegisteredEntities.Reset();
}

void ABehaviorFrameworkManagerBase::TickFramework()
{
	if (!bInitialized || !FrameworkHandle || !Config)
	{
		return;
	}

	const int64 CurrentTimeMs = static_cast<int64>(GetWorld()->GetTimeSeconds() * 1000.0);

	GActiveAmbientNpcManager = this;
	::Update(FrameworkHandle, Config->UpdateBatchSize, CurrentTimeMs);
	GActiveAmbientNpcManager = nullptr;

	// Discover and register entities that have not been registered yet.
	for (TActorIterator<AAmbientEntityBase> It(GetWorld()); It; ++It)
	{
		AAmbientEntityBase* Entity = *It;
		if (Entity && !RegisteredEntities.Contains(Entity))
		{
			RegisterEntity(Entity);
		}
	}
}

void ABehaviorFrameworkManagerBase::RegisterEntity(AAmbientEntityBase* Entity)
{
	if (!Entity || !FrameworkHandle || RegisteredEntities.Contains(Entity))
	{
		return;
	}

	Entity->SetManager(this);

	const FVector Location = Entity->GetActorLocation();
	FTCHARToUTF8 ConfigPath(*Entity->EntityConfigFilePath);

	::RegisterEntity(
		FrameworkHandle,
		static_cast<void*>(Entity),
		ConfigPath.Get(),
		FMath::RoundToInt32(Location.X),
		FMath::RoundToInt32(Location.Y),
		FMath::RoundToInt32(Location.Z));

	RegisteredEntities.Add(Entity);
}

void ABehaviorFrameworkManagerBase::UnregisterEntity(AAmbientEntityBase* Entity)
{
	if (!Entity)
	{
		return;
	}

	if (FrameworkHandle)
	{
		::UnregisterEntity(FrameworkHandle, static_cast<void*>(Entity));
	}

	RegisteredEntities.Remove(Entity);

	if (Entity->GetManager() == this)
	{
		Entity->SetManager(nullptr);
	}
}

void ABehaviorFrameworkManagerBase::CompleteCharacterAction(AAmbientEntityBase* Entity, int32 ActionId, int64 ActionToken)
{
	if (FrameworkHandle && Entity)
	{
		::CompleteCharacterAction(FrameworkHandle, static_cast<void*>(Entity), ActionId, ActionToken);
	}
}

void ABehaviorFrameworkManagerBase::ProcessInterruption(int32 InterruptionId, const TArray<AAmbientEntityBase*>& Entities)
{
	if (!FrameworkHandle || Entities.Num() == 0)
	{
		return;
	}

	TArray<void*> Handles;
	Handles.Reserve(Entities.Num());
	for (AAmbientEntityBase* Entity : Entities)
	{
		if (Entity)
		{
			Handles.Add(static_cast<void*>(Entity));
		}
	}

	if (Handles.Num() > 0)
	{
		::ProcessInterruption(FrameworkHandle, InterruptionId, Handles.GetData(), Handles.Num());
	}
}

int32 ABehaviorFrameworkManagerBase::QueryEnvironmentalCondition_Implementation(int32 ConditionKey)
{
	return 0;
}

int32 ABehaviorFrameworkManagerBase::StaticQueryEnvironmentalCondition(int32 ConditionKey)
{
	return GActiveAmbientNpcManager ? GActiveAmbientNpcManager->QueryEnvironmentalCondition(ConditionKey) : 0;
}

void ABehaviorFrameworkManagerBase::StaticStartCharacterAction(void* EntityHandle, int32 ActionId, int64 ActionToken, int64 ActionDurationMs, void* TargetEntityHandle)
{
	AAmbientEntityBase* Entity = static_cast<AAmbientEntityBase*>(EntityHandle);
	AAmbientEntityBase* Target = static_cast<AAmbientEntityBase*>(TargetEntityHandle);

	if (Entity)
	{
		Entity->NotifyStartAction(ActionId, ActionToken, ActionDurationMs, Target);
	}
}

bool ABehaviorFrameworkManagerBase::StaticQueryEntityPosition(void* EntityId, int32* OutXyz)
{
	if (!OutXyz)
	{
		return false;
	}

	AAmbientEntityBase* Entity = static_cast<AAmbientEntityBase*>(EntityId);
	if (!Entity)
	{
		return false;
	}

	int32 X = 0;
	int32 Y = 0;
	int32 Z = 0;
	if (!Entity->GetEntityPosition(X, Y, Z))
	{
		return false;
	}

	OutXyz[0] = X;
	OutXyz[1] = Y;
	OutXyz[2] = Z;
	return true;
}
