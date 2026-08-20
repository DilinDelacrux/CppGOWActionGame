#include "BehaviorFrameworkManagerBase.h"

#include "BehaviorFrameworkInterface.h"
#include "Engine/World.h"
#include "EngineUtils.h"
#include "HAL/FileManager.h"
#include "Misc/FileHelper.h"
#include "Misc/Paths.h"

// The environmental-condition callback does not receive a framework or manager
// handle, so the active manager is tracked here during the synchronous Update call.
static ABehaviorFrameworkManagerBase* GActiveAmbientNpcManager = nullptr;

namespace
{
FString ResolveProjectPath(const FString& Path)
{
	return Path.IsEmpty() || !FPaths::IsRelative(Path)
		? Path
		: FPaths::ConvertRelativePathToFull(FPaths::ProjectDir(), Path);
}
}

ABehaviorFrameworkManagerBase::ABehaviorFrameworkManagerBase()
{
	PrimaryActorTick.bCanEverTick = true;
	PrimaryActorTick.bStartWithTickEnabled = true;
}

void ABehaviorFrameworkManagerBase::BeginPlay()
{
	Super::BeginPlay();
	SetActorTickEnabled(true);

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

	const FString SchemaFilePath = ResolveProjectPath(Config->SchemaFilePath);
	const FString SequencesFilePath = ResolveProjectPath(Config->SequencesFilePath);
	const FString ActionsFilePath = ResolveProjectPath(Config->ActionsFilePath);
	const FString ConditionsFilePath = ResolveProjectPath(Config->EnvironmentalConditionsFilePath);
	const FString LogFilePath = ResolveProjectPath(Config->LogFilePath);

	if (!LogFilePath.IsEmpty())
	{
		IFileManager::Get().MakeDirectory(*FPaths::GetPath(LogFilePath), true);
	}

	FTCHARToUTF8 SchemaPath(*SchemaFilePath);
	FTCHARToUTF8 SequencesPath(*SequencesFilePath);
	FTCHARToUTF8 ActionsPath(*ActionsFilePath);
	FTCHARToUTF8 ConditionsPath(*ConditionsFilePath);
	FTCHARToUTF8 LogFileUtf8(*LogFilePath);

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

FString ABehaviorFrameworkManagerBase::LoadDailyScheduleJson() const
{
	if (!Config)
	{
		UE_LOG(LogTemp, Warning, TEXT("ABehaviorFrameworkManagerBase: cannot load daily schedule; no UBehaviorFrameworkConfig assigned."));
		return FString();
	}

	return LoadConfigJson(Config->DailyScheduleFilePath, TEXT("daily schedule"));
}

FString ABehaviorFrameworkManagerBase::LoadSchemaJson() const
{
	return Config ? LoadConfigJson(Config->SchemaFilePath, TEXT("schema")) : FString();
}

FString ABehaviorFrameworkManagerBase::LoadSequencesJson() const
{
	return Config ? LoadConfigJson(Config->SequencesFilePath, TEXT("sequences")) : FString();
}

FString ABehaviorFrameworkManagerBase::LoadActionsJson() const
{
	return Config ? LoadConfigJson(Config->ActionsFilePath, TEXT("actions")) : FString();
}

FString ABehaviorFrameworkManagerBase::LoadEnvironmentalConditionsJson() const
{
	return Config ? LoadConfigJson(Config->EnvironmentalConditionsFilePath, TEXT("environmental conditions")) : FString();
}

FString ABehaviorFrameworkManagerBase::LoadConfigJson(const FString& FilePath, const TCHAR* ConfigName) const
{
	const FString ResolvedPath = ResolveProjectPath(FilePath);
	FString Json;
	if (ResolvedPath.IsEmpty() || !FFileHelper::LoadFileToString(Json, *ResolvedPath))
	{
		UE_LOG(LogTemp, Warning, TEXT("ABehaviorFrameworkManagerBase: cannot load %s JSON: %s"), ConfigName, *ResolvedPath);
		return FString();
	}

	return Json;
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
	const FString EntityConfigFilePath = ResolveProjectPath(Entity->EntityConfigFilePath);
	FTCHARToUTF8 ConfigPath(*EntityConfigFilePath);

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
