// AmbientNpcBehavior 插件的类型声明（Puerts 未随插件自动生成，手动补充）。
// 命名遵循 UE 反射约定：去除 C++ 类前缀 A/U，例如
//   AAmbientEntityBase          -> AmbientEntityBase
//   ABehavioralEntityBase       -> BehavioralEntityBase
//   ABehaviorFrameworkManagerBase -> BehaviorFrameworkManagerBase
//   UBehaviorFrameworkConfig    -> BehaviorFrameworkConfig

declare module "ue" {
    import * as UE from "ue";

    class BehaviorFrameworkConfig extends UE.DataAsset {
        constructor(Outer?: UE.Object, Name?: string, ObjectFlags?: number);
        SchemaFilePath: string;
        SequencesFilePath: string;
        ActionsFilePath: string;
        EnvironmentalConditionsFilePath: string;
        LogFilePath: string;
        LogLevel: number;
        SelectionAlgorithmOption: number;
        Seed: bigint;
        UpdateBatchSize: number;
        static StaticClass(): UE.Class;
        static Find(OrigInName: string, Outer?: UE.Object): BehaviorFrameworkConfig;
        static Load(InName: string): BehaviorFrameworkConfig;
    }

    class AmbientEntityBase extends UE.Actor {
        constructor(Outer?: UE.Object, Name?: string, ObjectFlags?: number);
        EntityConfigFilePath: string;
        static StaticClass(): UE.Class;
        static Find(OrigInName: string, Outer?: UE.Object): AmbientEntityBase;
        static Load(InName: string): AmbientEntityBase;
    }

    class BehavioralEntityBase extends UE.AmbientEntityBase {
        constructor(Outer?: UE.Object, Name?: string, ObjectFlags?: number);
        OnStartCharacterAction(ActionId: number, ActionToken: bigint, ActionDurationMs: bigint, TargetEntity: UE.AmbientEntityBase): void;
        CompleteCurrentAction(ActionId: number, ActionToken: bigint): void;
        static StaticClass(): UE.Class;
        static Find(OrigInName: string, Outer?: UE.Object): BehavioralEntityBase;
        static Load(InName: string): BehavioralEntityBase;
    }

    class BehaviorFrameworkManagerBase extends UE.Actor {
        constructor(Outer?: UE.Object, Name?: string, ObjectFlags?: number);
        Config: UE.BehaviorFrameworkConfig;
        InitializeFramework(): void;
        ShutdownFramework(): void;
        IsInitialized(): boolean;
        CompleteCharacterAction(Entity: UE.AmbientEntityBase, ActionId: number, ActionToken: bigint): void;
        ProcessInterruption(InterruptionId: number, Entities: TArray<UE.AmbientEntityBase>): void;
        QueryEnvironmentalCondition(ConditionKey: number): number;
        static StaticClass(): UE.Class;
        static Find(OrigInName: string, Outer?: UE.Object): BehaviorFrameworkManagerBase;
        static Load(InName: string): BehaviorFrameworkManagerBase;
    }
}
