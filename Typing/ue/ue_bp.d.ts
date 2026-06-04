/// <reference path="puerts.d.ts" />
declare module "ue" {
    import {$Ref, $Nullable} from "puerts"

    import * as cpp from "cpp"

    import * as UE from "ue"

// __TYPE_DECL_START: 2232CF3C4B8F96CB3F7B9BB0E83B6464
    namespace Game.Asset._MyAsset.Blueprint.Hero.BP_HeroController {
        class BP_HeroController_C extends UE.WarriorHeroController {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_HeroController_C;
            static Load(InName: string): BP_HeroController_C;
        
            __tid_BP_HeroController_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 43BFDAFC49E66974B9A22BA62DCB4614
    namespace Game.Asset._MyAsset.Widget.WarriorTextBlock {
        class WarriorTextBlock_C extends UE.TextBlock {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WarriorTextBlock_C;
            static Load(InName: string): WarriorTextBlock_C;
        
            __tid_WarriorTextBlock_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9225DC3D47C75EE9476D6CB97FEB2BCF
    namespace Game.Asset._MyAsset.Blueprint.Hero.BP_WarriorHeroCharacter {
        class BP_WarriorHeroCharacter_C extends UE.WarriorHeroCharacter {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            PauseScreen: UE.UserWidget;
            ExecuteUbergraph_BP_WarriorHeroCharacter(EntryPoint: number) : void;
            InpActEvt_IA_PauseGame_K2Node_EnhancedInputActionEvent_0(ActionValue: UE.InputActionValue, ElapsedTime: number, TriggeredTime: number, SourceAction: $Nullable<UE.InputAction>) : void;
            OnLoaded_14A4B262469B4B5823AC27B72FC58BA8(Loaded: $Nullable<UE.Class>) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_WarriorHeroCharacter_C;
            static Load(InName: string): BP_WarriorHeroCharacter_C;
        
            __tid_BP_WarriorHeroCharacter_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 3410432C47F6248BA62207A0C3A7165F
    namespace Game.Asset._MyAsset.Blueprint.BP_SurvivalGamemode {
        class BP_SurvivalGamemode_C extends UE.WarriorSurvivalGameMode {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            CreateWaveWidgetWithCountDown(TextContentToDisplay: string, InTotalCountDownTime: number) : void;
            CreateWaveWidgetWithoutCountDown(TextContentToDisplay: string) : void;
            ExecuteUbergraph_BP_SurvivalGamemode(EntryPoint: number) : void;
            OnLoaded_D4B9468E49ED6F9FE1C0F2BB44BD811B(Loaded: $Nullable<UE.Class>) : void;
            OnLoaded_EC57AA0E4676EB9C89EB92ACD932BB49(Loaded: $Nullable<UE.Class>) : void;
            OnSurvivalGameModeStateChanged_Event(CurrentState: UE.EWarriorSurvivalGameModeState) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_SurvivalGamemode_C;
            static Load(InName: string): BP_SurvivalGamemode_C;
        
            __tid_BP_SurvivalGamemode_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 5F2727D5478D526B876BE989BAADB589
    namespace Game.Asset._MyAsset.Blueprint.BP_WarriorGameInstance {
        class BP_WarriorGameInstance_C extends UE.WarriorGameInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_WarriorGameInstance_C;
            static Load(InName: string): BP_WarriorGameInstance_C;
        
            __tid_BP_WarriorGameInstance_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 14AE057542F1485D75391EABFE93A5EC
    namespace Game.Asset._MyAsset.Widget.WBP_WaveTextNoCountDown {
        class WBP_WaveTextNoCountDown_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            WaveFadeOutAnimation: UE.WidgetAnimation;
            WaveEntryAnimation: UE.WidgetAnimation;
            TextBlock_WaveText: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_WaveTextNoCountDown(EntryPoint: number) : void;
            Finished_C0CF4DBB4D778EF0D1C5ADAD02A21769() : void;
            StartCountDown(inTotalCountDownTime: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_WaveTextNoCountDown_C;
            static Load(InName: string): WBP_WaveTextNoCountDown_C;
        
            __tid_WBP_WaveTextNoCountDown_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 60B1C494488C1AC8E1304BAD30FDEB24
    namespace Game.Asset._MyAsset.Widget.WBP_WaveTextWithCountDown {
        class WBP_WaveTextWithCountDown_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            WaveEntryAnimation: UE.WidgetAnimation;
            TextBlock_CountDown: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            TextBlock_WaveText: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_WaveTextWithCountDown(EntryPoint: number) : void;
            StartCountDown(inTotalCountDownTime: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_WaveTextWithCountDown_C;
            static Load(InName: string): WBP_WaveTextWithCountDown_C;
        
            __tid_WBP_WaveTextWithCountDown_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 2E09F1844E882CBF87777EB1D7BCEB0E
    namespace Game.Asset._MyAsset.Animation.ALI_Hero {
        class ALI_Hero_C extends UE.AnimLayerInterface {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ArmedLocomotionState(ArmedLocomotionState: $Ref<UE.PoseLink>) : void;
            ClimbingLocomotionState(ClimbingLocomotionState: $Ref<UE.PoseLink>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ALI_Hero_C;
            static Load(InName: string): ALI_Hero_C;
        
            __tid_ALI_Hero_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D50A6A204593984A2401A0A10E07306D
    namespace Game.Asset._MyAsset.Animation.MasterAnimLayer_Climbing {
        class AnimBlueprintGeneratedConstantData extends UE.AnimBlueprintConstantData {
            constructor();
            constructor(__NameProperty_9: string, __NameProperty_10: string, __StructProperty_11: UE.AnimNodeFunctionRef, __NameProperty_12: string, __NameProperty_13: string, AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystem_PropertyAccess, AnimBlueprintExtension_Base: UE.AnimSubsystem_Base, AnimGraphNode_Root_2: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_Root_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_Root: UE.AnimNodeExposedValueHandler_PropertyAccess);
            __NameProperty_9: string;
            __NameProperty_10: string;
            __StructProperty_11: UE.AnimNodeFunctionRef;
            __NameProperty_12: string;
            __NameProperty_13: string;
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystem_PropertyAccess;
            AnimBlueprintExtension_Base: UE.AnimSubsystem_Base;
            AnimGraphNode_Root_2: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_Root_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_Root: UE.AnimNodeExposedValueHandler_PropertyAccess;
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_AnimBlueprintGeneratedConstantData_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D50A6A204593984A2401A0A10E07306D
    namespace Game.Asset._MyAsset.Animation.MasterAnimLayer_Climbing {
        class MasterAnimLayer_Climbing_C extends UE.WarriorHeroLinkedAnimLayer {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root_2: UE.AnimNode_Root;
            AnimGraphNode_Root_1: UE.AnimNode_Root;
            AnimGraphNode_Root: UE.AnimNode_Root;
            AnimGraph(AnimGraph: $Ref<UE.PoseLink>) : void;
            ArmedLocomotionState(ArmedLocomotionState: $Ref<UE.PoseLink>) : void;
            ClimbingLocomotionState(ClimbingLocomotionState: $Ref<UE.PoseLink>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MasterAnimLayer_Climbing_C;
            static Load(InName: string): MasterAnimLayer_Climbing_C;
        
            __tid_MasterAnimLayer_Climbing_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 434CF9504BAF52B1AA05249C407B81BF
    namespace Game.Asset._MyAsset.Animation.MasterAnimLayer_Hero {
        class AnimBlueprintGeneratedConstantData extends UE.AnimBlueprintConstantData {
            constructor();
            constructor(__NameProperty_30: string, __NameProperty_31: string, __FloatProperty_32: number, __BoolProperty_33: boolean, __FloatProperty_34: number, __EnumProperty_35: UE.EAnimSyncMethod, __ByteProperty_36: UE.EAnimGroupRole, __BlendProfile_37: UE.BlendProfile, __CurveFloat_38: UE.CurveFloat, __BoolProperty_39: boolean, __EnumProperty_40: UE.EAlphaBlendOption, __EnumProperty_41: UE.EBlendListTransitionType, __ArrayProperty_42: TArray<number>, __StructProperty_43: UE.AnimNodeFunctionRef, __NameProperty_44: string, __NameProperty_45: string, AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystem_PropertyAccess, AnimBlueprintExtension_Base: UE.AnimSubsystem_Base, AnimGraphNode_Root_2: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_Root_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_BlendSpacePlayer_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_BlendSpacePlayer: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_BlendListByBool: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_Root: UE.AnimNodeExposedValueHandler_PropertyAccess);
            __NameProperty_30: string;
            __NameProperty_31: string;
            __FloatProperty_32: number;
            __BoolProperty_33: boolean;
            __FloatProperty_34: number;
            __EnumProperty_35: UE.EAnimSyncMethod;
            __ByteProperty_36: UE.EAnimGroupRole;
            __BlendProfile_37: UE.BlendProfile;
            __CurveFloat_38: UE.CurveFloat;
            __BoolProperty_39: boolean;
            __EnumProperty_40: UE.EAlphaBlendOption;
            __EnumProperty_41: UE.EBlendListTransitionType;
            __ArrayProperty_42: TArray<number>;
            __StructProperty_43: UE.AnimNodeFunctionRef;
            __NameProperty_44: string;
            __NameProperty_45: string;
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystem_PropertyAccess;
            AnimBlueprintExtension_Base: UE.AnimSubsystem_Base;
            AnimGraphNode_Root_2: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_Root_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_BlendSpacePlayer_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_BlendSpacePlayer: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_BlendListByBool: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_Root: UE.AnimNodeExposedValueHandler_PropertyAccess;
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_AnimBlueprintGeneratedConstantData_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 434CF9504BAF52B1AA05249C407B81BF
    namespace Game.Asset._MyAsset.Animation.MasterAnimLayer_Hero {
        class AnimBlueprintGeneratedMutableData extends UE.AnimBlueprintMutableData {
            constructor();
            constructor(__FloatProperty: number, __FloatProperty_0: number, __FloatProperty_1: number, __BoolProperty_2: boolean);
            __FloatProperty: number;
            __FloatProperty_0: number;
            __FloatProperty_1: number;
            __BoolProperty_2: boolean;
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_AnimBlueprintGeneratedMutableData_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 434CF9504BAF52B1AA05249C407B81BF
    namespace Game.Asset._MyAsset.Animation.MasterAnimLayer_Hero {
        class MasterAnimLayer_Hero_C extends UE.WarriorHeroLinkedAnimLayer {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            __AnimBlueprintMutables: UE.Game.Asset._MyAsset.Animation.MasterAnimLayer_Hero.AnimBlueprintGeneratedMutableData;
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root_2: UE.AnimNode_Root;
            AnimGraphNode_Root_1: UE.AnimNode_Root;
            AnimGraphNode_BlendSpacePlayer_1: UE.AnimNode_BlendSpacePlayer;
            AnimGraphNode_BlendSpacePlayer: UE.AnimNode_BlendSpacePlayer;
            AnimGraphNode_BlendListByBool: UE.AnimNode_BlendListByBool;
            AnimGraphNode_Root: UE.AnimNode_Root;
            DefaultLocomotionBlendSpace: UE.BlendSpace;
            DirectionalLocomotionBlendSpace: UE.BlendSpace;
            AnimGraph(AnimGraph: $Ref<UE.PoseLink>) : void;
            ArmedLocomotionState(ArmedLocomotionState: $Ref<UE.PoseLink>) : void;
            ClimbingLocomotionState(ClimbingLocomotionState: $Ref<UE.PoseLink>) : void;
            EvaluateGraphExposedInputs_ExecuteUbergraph_MasterAnimLayer_Hero_AnimGraphNode_BlendListByBool_39C407284D9038CB1804568E13889759() : void;
            EvaluateGraphExposedInputs_ExecuteUbergraph_MasterAnimLayer_Hero_AnimGraphNode_BlendSpacePlayer_6C68657E442C150A9BF46590F29EBEA3() : void;
            EvaluateGraphExposedInputs_ExecuteUbergraph_MasterAnimLayer_Hero_AnimGraphNode_BlendSpacePlayer_BD3DABED4E98393B318457A98346C270() : void;
            ExecuteUbergraph_MasterAnimLayer_Hero(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MasterAnimLayer_Hero_C;
            static Load(InName: string): MasterAnimLayer_Hero_C;
        
            __tid_MasterAnimLayer_Hero_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D2E6171443C9F38A346DF58228CDE8AA
    namespace Game.Asset._MyAsset.Animation.AnimLayer.AnimLayer_HeroLegArmour {
        class AnimBlueprintGeneratedConstantData extends UE.Game.Asset._MyAsset.Animation.MasterAnimLayer_Hero.AnimBlueprintGeneratedConstantData {
            constructor();
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_AnimBlueprintGeneratedConstantData_1__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D2E6171443C9F38A346DF58228CDE8AA
    namespace Game.Asset._MyAsset.Animation.AnimLayer.AnimLayer_HeroLegArmour {
        class AnimLayer_HeroLegArmour_C extends UE.Game.Asset._MyAsset.Animation.MasterAnimLayer_Hero.MasterAnimLayer_Hero_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): AnimLayer_HeroLegArmour_C;
            static Load(InName: string): AnimLayer_HeroLegArmour_C;
        
            __tid_AnimLayer_HeroLegArmour_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 584049BA4E32FE50C067A7ABD71B6078
    namespace Game.Asset._MyAsset.Animation.ABP_Hero {
        class AnimBlueprintGeneratedMutableData extends UE.AnimBlueprintMutableData {
            constructor();
            constructor(__FloatProperty: number, __BoolProperty_0: boolean, __BoolProperty_1: boolean, __BoolProperty_2: boolean);
            __FloatProperty: number;
            __BoolProperty_0: boolean;
            __BoolProperty_1: boolean;
            __BoolProperty_2: boolean;
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_AnimBlueprintGeneratedMutableData_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 584049BA4E32FE50C067A7ABD71B6078
    namespace Game.Asset._MyAsset.Animation.ABP_Hero {
        class ABP_Hero_C extends UE.WarriorHeroAnimInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            __AnimBlueprintMutables: UE.Game.Asset._MyAsset.Animation.ABP_Hero.AnimBlueprintGeneratedMutableData;
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root_2: UE.AnimNode_Root;
            AnimGraphNode_Root_1: UE.AnimNode_Root;
            AnimGraphNode_Root: UE.AnimNode_Root;
            AnimGraphNode_TransitionResult_3: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_2: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_1: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult: UE.AnimNode_TransitionResult;
            AnimGraphNode_RandomPlayer: UE.AnimNode_RandomPlayer;
            AnimGraphNode_StateResult_2: UE.AnimNode_StateResult;
            AnimGraphNode_BlendSpacePlayer: UE.AnimNode_BlendSpacePlayer;
            AnimGraphNode_StateResult_1: UE.AnimNode_StateResult;
            AnimGraphNode_SequencePlayer: UE.AnimNode_SequencePlayer;
            AnimGraphNode_StateResult: UE.AnimNode_StateResult;
            AnimGraphNode_StateMachine: UE.AnimNode_StateMachine;
            AnimGraphNode_SaveCachedPose_1: UE.AnimNode_SaveCachedPose;
            AnimGraphNode_UseCachedPose_3: UE.AnimNode_UseCachedPose;
            AnimGraphNode_LayeredBoneBlend: UE.AnimNode_LayeredBoneBlend;
            AnimGraphNode_UseCachedPose_2: UE.AnimNode_UseCachedPose;
            AnimGraphNode_Slot_1: UE.AnimNode_Slot;
            AnimGraphNode_BlendListByBool_2: UE.AnimNode_BlendListByBool;
            AnimGraphNode_LinkedAnimLayer_1: UE.AnimNode_LinkedAnimLayer;
            AnimGraphNode_Slot: UE.AnimNode_Slot;
            AnimGraphNode_SaveCachedPose: UE.AnimNode_SaveCachedPose;
            AnimGraphNode_UseCachedPose_1: UE.AnimNode_UseCachedPose;
            AnimGraphNode_BlendListByBool_1: UE.AnimNode_BlendListByBool;
            AnimGraphNode_UseCachedPose: UE.AnimNode_UseCachedPose;
            AnimGraphNode_BlendListByBool: UE.AnimNode_BlendListByBool;
            AnimGraphNode_LinkedAnimLayer: UE.AnimNode_LinkedAnimLayer;
            K2Node_PropertyAccess: UE.GameplayTag;
            AnimGraph(AnimGraph: $Ref<UE.PoseLink>) : void;
            ArmedLocomotionState(ArmedLocomotionState: $Ref<UE.PoseLink>) : void;
            ClimbingLocomotionState(ClimbingLocomotionState: $Ref<UE.PoseLink>) : void;
            EvaluateGraphExposedInputs_ExecuteUbergraph_ABP_Hero_AnimGraphNode_BlendListByBool_BBD9C05C43C98437C3B8AFA84CE8B83A() : void;
            EvaluateGraphExposedInputs_ExecuteUbergraph_ABP_Hero_AnimGraphNode_BlendListByBool_EA07C7FC4F8AA965E5FDBCAA54022402() : void;
            ExecuteUbergraph_ABP_Hero(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Hero_C;
            static Load(InName: string): ABP_Hero_C;
        
            __tid_ABP_Hero_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 584049BA4E32FE50C067A7ABD71B6078
    namespace Game.Asset._MyAsset.Animation.ABP_Hero {
        class AnimBlueprintGeneratedConstantData extends UE.AnimBlueprintConstantData {
            constructor();
            constructor(__NameProperty_124: string, __NameProperty_125: string, __NameProperty_126: string, __NameProperty_127: string, __IntProperty_128: number, __NameProperty_129: string, __IntProperty_130: number, __BoolProperty_131: boolean, __FloatProperty_132: number, __StructProperty_133: UE.InputScaleBiasClampConstants, __FloatProperty_134: number, __EnumProperty_135: UE.EAnimSyncMethod, __ByteProperty_136: UE.EAnimGroupRole, __NameProperty_137: string, __NameProperty_138: string, __NameProperty_139: string, __IntProperty_140: number, __BlendProfile_141: UE.BlendProfile, __CurveFloat_142: UE.CurveFloat, __BoolProperty_143: boolean, __EnumProperty_144: UE.EAlphaBlendOption, __EnumProperty_145: UE.EBlendListTransitionType, __ArrayProperty_146: TArray<number>, __StructProperty_147: UE.AnimNodeFunctionRef, AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystem_PropertyAccess, AnimBlueprintExtension_Base: UE.AnimSubsystem_Base, AnimGraphNode_Root_2: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_Root_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_Root: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_TransitionResult_3: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_TransitionResult_2: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_TransitionResult_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_TransitionResult: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_RandomPlayer: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_StateResult_2: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_BlendSpacePlayer: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_StateResult_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_SequencePlayer: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_StateResult: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_StateMachine: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_SaveCachedPose_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_UseCachedPose_3: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_LayeredBoneBlend: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_UseCachedPose_2: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_Slot_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_BlendListByBool_2: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_LinkedAnimLayer_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_Slot: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_SaveCachedPose: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_UseCachedPose_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_BlendListByBool_1: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_UseCachedPose: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_BlendListByBool: UE.AnimNodeExposedValueHandler_PropertyAccess, AnimGraphNode_LinkedAnimLayer: UE.AnimNodeExposedValueHandler_PropertyAccess);
            __NameProperty_124: string;
            __NameProperty_125: string;
            __NameProperty_126: string;
            __NameProperty_127: string;
            __IntProperty_128: number;
            __NameProperty_129: string;
            __IntProperty_130: number;
            __BoolProperty_131: boolean;
            __FloatProperty_132: number;
            __StructProperty_133: UE.InputScaleBiasClampConstants;
            __FloatProperty_134: number;
            __EnumProperty_135: UE.EAnimSyncMethod;
            __ByteProperty_136: UE.EAnimGroupRole;
            __NameProperty_137: string;
            __NameProperty_138: string;
            __NameProperty_139: string;
            __IntProperty_140: number;
            __BlendProfile_141: UE.BlendProfile;
            __CurveFloat_142: UE.CurveFloat;
            __BoolProperty_143: boolean;
            __EnumProperty_144: UE.EAlphaBlendOption;
            __EnumProperty_145: UE.EBlendListTransitionType;
            __ArrayProperty_146: TArray<number>;
            __StructProperty_147: UE.AnimNodeFunctionRef;
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystem_PropertyAccess;
            AnimBlueprintExtension_Base: UE.AnimSubsystem_Base;
            AnimGraphNode_Root_2: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_Root_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_Root: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_TransitionResult_3: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_TransitionResult_2: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_TransitionResult_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_TransitionResult: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_RandomPlayer: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_StateResult_2: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_BlendSpacePlayer: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_StateResult_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_SequencePlayer: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_StateResult: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_StateMachine: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_SaveCachedPose_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_UseCachedPose_3: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_LayeredBoneBlend: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_UseCachedPose_2: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_Slot_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_BlendListByBool_2: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_LinkedAnimLayer_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_Slot: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_SaveCachedPose: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_UseCachedPose_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_BlendListByBool_1: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_UseCachedPose: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_BlendListByBool: UE.AnimNodeExposedValueHandler_PropertyAccess;
            AnimGraphNode_LinkedAnimLayer: UE.AnimNodeExposedValueHandler_PropertyAccess;
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_AnimBlueprintGeneratedConstantData_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: A8D593434751452E3092D38AFE35681B
    namespace Game.Asset.EditorTools.FixNamingConvetion {
        class FixNamingConvetion_C extends UE.AssetActionUtility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            AssetNamingConventionMap: TMap<UE.Class, string>;
            FixAssetNamingConvention() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): FixNamingConvetion_C;
            static Load(InName: string): FixNamingConvetion_C;
        
            __tid_FixNamingConvetion_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 631F5910415F4DD605E1028CEF6C22C9
    namespace Game.Asset.EditorTools.Create_MI_AdvancedHelper {
        class Create_MI_AdvancedHelper_C extends UE.AssetActionUtility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            CreateMaterialInstanceAdvanced(bChangeMainName: boolean, NewMainName: string) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): Create_MI_AdvancedHelper_C;
            static Load(InName: string): Create_MI_AdvancedHelper_C;
        
            __tid_Create_MI_AdvancedHelper_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 64FB867844A68D036594B9BD42E01403
    namespace Game._ThirdParty.Knife_light.Blueprints.BP_DisplayEffects {
        class BP_DisplayEffects_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            ["System Template"]: UE.NiagaraSystem;
            active() : void;
            ExecuteUbergraph_BP_DisplayEffects(EntryPoint: number) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_DisplayEffects_C;
            static Load(InName: string): BP_DisplayEffects_C;
        
            __tid_BP_DisplayEffects_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: F5D64672482DD0C2F7D92083D4E9118E
    namespace Game._ThirdParty.Itadori_aura.Blueprint.BP_aura_jujutsu {
        class BP_aura_jujutsu_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            NewNiagaraSystem1: UE.NiagaraComponent;
            NewNiagaraSystem: UE.NiagaraComponent;
            SkeletalMesh: UE.SkeletalMeshComponent;
            DefaultSceneRoot: UE.SceneComponent;
            ExecuteUbergraph_BP_aura_jujutsu(EntryPoint: number) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_aura_jujutsu_C;
            static Load(InName: string): BP_aura_jujutsu_C;
        
            __tid_BP_aura_jujutsu_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C54173E04729C81FE63B3798570F5371
    namespace Game._ThirdParty.ArrowTrail.Demo.BP_Demo {
        class BP_Demo_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            NS_Niagara: UE.NiagaraComponent;
            DefaultSceneRoot: UE.SceneComponent;
            Niagara: UE.NiagaraSystem;
            Speed: number;
            InitialPos: UE.Vector;
            ExecuteUbergraph_BP_Demo(EntryPoint: number) : void;
            Move() : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            /*
             *Construction script, the place to spawn components and do other setup.
             *@note Name used in CreateBlueprint function
             */
            UserConstructionScript() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Demo_C;
            static Load(InName: string): BP_Demo_C;
        
            __tid_BP_Demo_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 6819908548EDC324965ADDB0196C1E02
    namespace Game.StarterResource.ThirdPerson.Blueprints.BP_ThirdPersonGameMode {
        class BP_ThirdPersonGameMode_C extends UE.GameModeBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            DefaultSceneRoot: UE.SceneComponent;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_ThirdPersonGameMode_C;
            static Load(InName: string): BP_ThirdPersonGameMode_C;
        
            __tid_BP_ThirdPersonGameMode_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 5D7EC3F8492DA60486482DA2E8DFFD33
    namespace Game.StarterResource.ThirdPerson.Blueprints.BP_ThirdPersonCharacter {
        class BP_ThirdPersonCharacter_C extends UE.Character {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            FollowCamera: UE.CameraComponent;
            CameraBoom: UE.SpringArmComponent;
            ExecuteUbergraph_BP_ThirdPersonCharacter(EntryPoint: number) : void;
            InpActEvt_IA_EquipAxe_K2Node_EnhancedInputActionEvent_2(ActionValue: UE.InputActionValue, ElapsedTime: number, TriggeredTime: number, SourceAction: $Nullable<UE.InputAction>) : void;
            InpActEvt_IA_EquipAxe_K2Node_EnhancedInputActionEvent_3(ActionValue: UE.InputActionValue, ElapsedTime: number, TriggeredTime: number, SourceAction: $Nullable<UE.InputAction>) : void;
            InpActEvt_IA_Look_K2Node_EnhancedInputActionEvent_0(ActionValue: UE.InputActionValue, ElapsedTime: number, TriggeredTime: number, SourceAction: $Nullable<UE.InputAction>) : void;
            InpActEvt_IA_Move_K2Node_EnhancedInputActionEvent_1(ActionValue: UE.InputActionValue, ElapsedTime: number, TriggeredTime: number, SourceAction: $Nullable<UE.InputAction>) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_ThirdPersonCharacter_C;
            static Load(InName: string): BP_ThirdPersonCharacter_C;
        
            __tid_BP_ThirdPersonCharacter_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 41C614CC46B5D5283B315188BED1B3B6
    namespace Game.StarterResource.Characters.Mannequins.Rigs.CR_Mannequin_BasicFootIK {
        class CR_Mannequin_BasicFootIK_C extends UE.ControlRig {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ZOffset_L_Target: number;
            ZOffset_R_Target: number;
            ZOffset_L: number;
            ZOffset_R: number;
            ZOffset_Pelvis: number;
            ShouldDoIKTrace: boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): CR_Mannequin_BasicFootIK_C;
            static Load(InName: string): CR_Mannequin_BasicFootIK_C;
        
            __tid_CR_Mannequin_BasicFootIK_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 42A509B048AB76749DF674A962BCCE90
    namespace Game.StarterResource.Characters.Mannequins.Rigs.CR_Mannequin_Body {
        class CR_Mannequin_Body_C extends UE.ControlRig {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ["L Arm IK Mode"]: boolean;
            ["R Arm IK Mode"]: boolean;
            ["L Leg IK Mode "]: boolean;
            ["R Leg IK Mode"]: boolean;
            ["Spine IK Mode"]: boolean;
            ["Neck IK Mode"]: boolean;
            ["Spine Offsets"]: TArray<UE.Transform>;
            ["Spine Length"]: number;
            ["Neck Length"]: number;
            ["L Arm IK Align"]: boolean;
            ["R Arm IK Align"]: boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): CR_Mannequin_Body_C;
            static Load(InName: string): CR_Mannequin_Body_C;
        
            __tid_CR_Mannequin_Body_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 0A1EBF804B05AC5E47F4669F4EC97649
    namespace Game.StarterResource.Characters.Mannequins.Rigs.CR_Mannequin_Procedural {
        class CR_Mannequin_Procedural_C extends UE.ControlRig {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): CR_Mannequin_Procedural_C;
            static Load(InName: string): CR_Mannequin_Procedural_C;
        
            __tid_CR_Mannequin_Procedural_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 0AF2F7224C46A296290E66BA2455EC7F
    namespace Game.StarterResource.Characters.Mannequins.Rigs.ABP_Manny_PostProcess {
        class ABP_Manny_PostProcess_C extends UE.AnimInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root: UE.AnimNode_Root;
            AnimGraphNode_LinkedInputPose: UE.AnimNode_LinkedInputPose;
            AnimGraphNode_ControlRig: UE.AnimNode_ControlRig;
            AnimGraphNode_PoseDriver_13: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_12: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_11: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_10: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_9: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_8: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_7: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_6: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_5: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_4: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_3: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_2: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_1: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver: UE.AnimNode_PoseDriver;
            AnimGraph(InPose: UE.PoseLink, AnimGraph: $Ref<UE.PoseLink>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Manny_PostProcess_C;
            static Load(InName: string): ABP_Manny_PostProcess_C;
        
            __tid_ABP_Manny_PostProcess_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 0C1E648B469F2C95F9408D878873FDDE
    namespace Game.StarterResource.Characters.Mannequins.Rigs.ABP_Quinn_PostProcess {
        class ABP_Quinn_PostProcess_C extends UE.AnimInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root: UE.AnimNode_Root;
            AnimGraphNode_LinkedInputPose: UE.AnimNode_LinkedInputPose;
            AnimGraphNode_ControlRig: UE.AnimNode_ControlRig;
            AnimGraphNode_PoseDriver_13: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_12: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_11: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_10: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_9: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_8: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_7: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_6: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_5: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_4: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_3: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_2: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_1: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver: UE.AnimNode_PoseDriver;
            AnimGraph(InPose: UE.PoseLink, AnimGraph: $Ref<UE.PoseLink>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Quinn_PostProcess_C;
            static Load(InName: string): ABP_Quinn_PostProcess_C;
        
            __tid_ABP_Quinn_PostProcess_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: FE4FE9F7482DE50B699FC39CE34100EC
    namespace Game.StarterResource.Characters.Mannequins.Animations.ABP_Manny {
        class AnimBlueprintGeneratedMutableData extends UE.AnimBlueprintMutableData {
            constructor();
            constructor(__FloatProperty: number);
            __FloatProperty: number;
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_AnimBlueprintGeneratedMutableData_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: FE4FE9F7482DE50B699FC39CE34100EC
    namespace Game.StarterResource.Characters.Mannequins.Animations.ABP_Manny {
        class ABP_Manny_C extends UE.AnimInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            __AnimBlueprintMutables: UE.Game.StarterResource.Characters.Mannequins.Animations.ABP_Manny.AnimBlueprintGeneratedMutableData;
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root: UE.AnimNode_Root;
            AnimGraphNode_TransitionResult_7: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_6: UE.AnimNode_TransitionResult;
            AnimGraphNode_BlendSpacePlayer: UE.AnimNode_BlendSpacePlayer;
            AnimGraphNode_StateResult_5: UE.AnimNode_StateResult;
            AnimGraphNode_SequencePlayer_3: UE.AnimNode_SequencePlayer;
            AnimGraphNode_StateResult_4: UE.AnimNode_StateResult;
            AnimGraphNode_StateMachine_1: UE.AnimNode_StateMachine;
            AnimGraphNode_SaveCachedPose: UE.AnimNode_SaveCachedPose;
            AnimGraphNode_TransitionResult_5: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_4: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_3: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_2: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_1: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult: UE.AnimNode_TransitionResult;
            AnimGraphNode_ApplyAdditive: UE.AnimNode_ApplyAdditive;
            AnimGraphNode_UseCachedPose_1: UE.AnimNode_UseCachedPose;
            AnimGraphNode_SequencePlayer_2: UE.AnimNode_SequencePlayer;
            AnimGraphNode_StateResult_3: UE.AnimNode_StateResult;
            AnimGraphNode_SequencePlayer_1: UE.AnimNode_SequencePlayer;
            AnimGraphNode_StateResult_2: UE.AnimNode_StateResult;
            AnimGraphNode_SequencePlayer: UE.AnimNode_SequencePlayer;
            AnimGraphNode_StateResult_1: UE.AnimNode_StateResult;
            AnimGraphNode_UseCachedPose: UE.AnimNode_UseCachedPose;
            AnimGraphNode_StateResult: UE.AnimNode_StateResult;
            AnimGraphNode_StateMachine: UE.AnimNode_StateMachine;
            AnimGraphNode_Slot: UE.AnimNode_Slot;
            AnimGraphNode_ControlRig: UE.AnimNode_ControlRig;
            __CustomProperty_ShouldDoIKTrace_385011E94C94F6DE70691192D3E0622C: boolean;
            Character: UE.Character;
            MovementComponent: UE.CharacterMovementComponent;
            Velocity: UE.Vector;
            GroundSpeed: number;
            ShouldMove: boolean;
            IsFalling: boolean;
            AnimGraph(AnimGraph: $Ref<UE.PoseLink>) : void;
            /*
             *Executed when the Animation is initialized
             */
            BlueprintInitializeAnimation() : void;
            /*
             *Executed when the Animation is updated
             */
            BlueprintUpdateAnimation(DeltaTimeX: number) : void;
            EvaluateGraphExposedInputs_ExecuteUbergraph_ABP_Manny_AnimGraphNode_TransitionResult_305F37BB4A5AD886760B8E99A5C561E1() : void;
            ExecuteUbergraph_ABP_Manny(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Manny_C;
            static Load(InName: string): ABP_Manny_C;
        
            __tid_ABP_Manny_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 8C377A0B48E638D0259E8A9F764D8931
    namespace Game.StarterResource.Characters.Mannequins.Animations.ABP_Quinn {
        class ABP_Quinn_C extends UE.Game.StarterResource.Characters.Mannequins.Animations.ABP_Manny.ABP_Manny_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Quinn_C;
            static Load(InName: string): ABP_Quinn_C;
        
            __tid_ABP_Quinn_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 0DC55B444844AB2956A6C6848154E69D
    namespace Game.GameplayCues.GC_Shared_Burning {
        class GC_Shared_Burning_C extends UE.GameplayCueNotify_Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            DefaultSceneRoot: UE.SceneComponent;
            AttachedRageFX: UE.NiagaraComponent;
            /*
             *Called when a GameplayCue with duration is first activated, this will only be called if the client witnessed the activation
             */
            OnActive(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            /*
             *Called when a GameplayCue with duration is removed
             */
            OnRemove(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            /*
             *Called when a GameplayCue with duration is first seen as active, even if it wasn't actually just applied (Join in progress, etc)
             */
            WhileActive(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Shared_Burning_C;
            static Load(InName: string): GC_Shared_Burning_C;
        
            __tid_GC_Shared_Burning_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9610C88B4C71594B538646A60135493D
    namespace Game.GameplayCues.GC_Hero_SuccessfullyBlock {
        class GC_Hero_SuccessfullyBlock_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_SuccessfullyBlock_C;
            static Load(InName: string): GC_Hero_SuccessfullyBlock_C;
        
            __tid_GC_Hero_SuccessfullyBlock_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 18CACCE042DF34E11A0B1DB479BD676B
    namespace Game.GameplayCues.GC_Hero_PerfectBlock {
        class GC_Hero_PerfectBlock_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_PerfectBlock_C;
            static Load(InName: string): GC_Hero_PerfectBlock_C;
        
            __tid_GC_Hero_PerfectBlock_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 1ED96935407DA6C6431999927703B9D5
    namespace Game.GameplayCues.GC_Hero_MagicShield {
        class GC_Hero_MagicShield_C extends UE.GameplayCueNotify_Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            DefaultSceneRoot: UE.SceneComponent;
            SpawnedMagicShieldSystem: UE.NiagaraComponent;
            /*
             *Called when a GameplayCue with duration is removed
             */
            OnRemove(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            /*
             *Called when a GameplayCue with duration is first seen as active, even if it wasn't actually just applied (Join in progress, etc)
             */
            WhileActive(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_MagicShield_C;
            static Load(InName: string): GC_Hero_MagicShield_C;
        
            __tid_GC_Hero_MagicShield_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: FD432BCF478C2830DC1CCABA7A382249
    namespace Game.GameplayCues.GC_Hero_AxeHit1 {
        class GC_Hero_AxeHit1_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_AxeHit1_C;
            static Load(InName: string): GC_Hero_AxeHit1_C;
        
            __tid_GC_Hero_AxeHit1_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: DC4781DB40682576EC1FE38913148321
    namespace Game.GameplayCues.GC_Hero_AxeHit {
        class GC_Hero_AxeHit_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_AxeHit_C;
            static Load(InName: string): GC_Hero_AxeHit_C;
        
            __tid_GC_Hero_AxeHit_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 815D78A84EA054DFF7E09EA5D52558E9
    namespace Game.GameplayCues.GC_Hero_ActivateRage {
        class GC_Hero_ActivateRage_C extends UE.GameplayCueNotify_Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            DefaultSceneRoot: UE.SceneComponent;
            AttachedRageFX: UE.NiagaraComponent;
            /*
             *Called when a GameplayCue with duration is first activated, this will only be called if the client witnessed the activation
             */
            OnActive(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            /*
             *Called when a GameplayCue with duration is removed
             */
            OnRemove(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            /*
             *Called when a GameplayCue with duration is first seen as active, even if it wasn't actually just applied (Join in progress, etc)
             */
            WhileActive(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_ActivateRage_C;
            static Load(InName: string): GC_Hero_ActivateRage_C;
        
            __tid_GC_Hero_ActivateRage_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 95433D194C3EE587723767AB5C7B5F53
    namespace Game.GameplayCues.GC_Guardian_DeadSound {
        class GC_Guardian_DeadSound_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Guardian_DeadSound_C;
            static Load(InName: string): GC_Guardian_DeadSound_C;
        
            __tid_GC_Guardian_DeadSound_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 926447C14858D8853ADB248ACA130535
    namespace Game.GameplayCues.GC_FrostGiant_DeathSound {
        class GC_FrostGiant_DeathSound_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_FrostGiant_DeathSound_C;
            static Load(InName: string): GC_FrostGiant_DeathSound_C;
        
            __tid_GC_FrostGiant_DeathSound_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 612882484E394DB1E746398B079E52B9
    namespace Game.GameplayCues.GC_Enemy_HitSound_Stick {
        class GC_Enemy_HitSound_Stick_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Enemy_HitSound_Stick_C;
            static Load(InName: string): GC_Enemy_HitSound_Stick_C;
        
            __tid_GC_Enemy_HitSound_Stick_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 969C917743530DF615CBAFB920B4B3A8
    namespace Game.GameplayCues.GC_Enemy_AttackWarning {
        class GC_Enemy_AttackWarning_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Enemy_AttackWarning_C;
            static Load(InName: string): GC_Enemy_AttackWarning_C;
        
            __tid_GC_Enemy_AttackWarning_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: AEC6F1464562F5701371F4A11BB280CB
    namespace Game.ClimbSystem.CR_ClimbIK {
        class CR_ClimbIK_C extends UE.ControlRig {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ShouldDoClimbIKTrace: boolean;
            Foot_L_TargetOffset: UE.Vector;
            Foot_L_CurrentOffset: UE.Vector;
            Foot_R_CurrentOffset: UE.Vector;
            Foot_R_TargetOffset: UE.Vector;
            Hand_L_TargetOffset: UE.Vector;
            Hand_L_CurrentOffset: UE.Vector;
            Hand_R_TargetOffset: UE.Vector;
            Hand_R_CurrentOffset: UE.Vector;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): CR_ClimbIK_C;
            static Load(InName: string): CR_ClimbIK_C;
        
            __tid_CR_ClimbIK_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: BCA382AF41A385E6A0A542867C8059AA
    namespace Game.Characters.Mannequins.Rigs.CR_Mannequin_BasicFootIK {
        class CR_Mannequin_BasicFootIK_C extends UE.ControlRig {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ZOffset_L_Target: number;
            ZOffset_R_Target: number;
            ZOffset_L: number;
            ZOffset_R: number;
            ZOffset_Pelvis: number;
            ShouldDoIKTrace: boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): CR_Mannequin_BasicFootIK_C;
            static Load(InName: string): CR_Mannequin_BasicFootIK_C;
        
            __tid_CR_Mannequin_BasicFootIK_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B518191B492C79DDE6409C83F58F26FB
    namespace Game.Characters.Mannequins.Rigs.CR_Mannequin_Body {
        class CR_Mannequin_Body_C extends UE.ControlRig {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ["L Arm IK Mode"]: boolean;
            ["R Arm IK Mode"]: boolean;
            ["L Leg IK Mode "]: boolean;
            ["R Leg IK Mode"]: boolean;
            ["Spine IK Mode"]: boolean;
            ["Neck IK Mode"]: boolean;
            ["Spine Offsets"]: TArray<UE.Transform>;
            ["Spine Length"]: number;
            ["Neck Length"]: number;
            ["L Arm IK Align"]: boolean;
            ["R Arm IK Align"]: boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): CR_Mannequin_Body_C;
            static Load(InName: string): CR_Mannequin_Body_C;
        
            __tid_CR_Mannequin_Body_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9B415F4D45B1026B508612ACDB0B616A
    namespace Game.Characters.Mannequins.Rigs.CR_Mannequin_Procedural {
        class CR_Mannequin_Procedural_C extends UE.ControlRig {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): CR_Mannequin_Procedural_C;
            static Load(InName: string): CR_Mannequin_Procedural_C;
        
            __tid_CR_Mannequin_Procedural_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 126035A2497B4DA5B775798CFAA7DE99
    namespace Game.Characters.Mannequins.Rigs.ABP_Manny_PostProcess {
        class ABP_Manny_PostProcess_C extends UE.AnimInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root: UE.AnimNode_Root;
            AnimGraphNode_LinkedInputPose: UE.AnimNode_LinkedInputPose;
            AnimGraphNode_ControlRig: UE.AnimNode_ControlRig;
            AnimGraphNode_PoseDriver_13: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_12: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_11: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_10: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_9: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_8: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_7: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_6: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_5: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_4: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_3: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_2: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_1: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver: UE.AnimNode_PoseDriver;
            AnimGraph(InPose: UE.PoseLink, AnimGraph: $Ref<UE.PoseLink>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Manny_PostProcess_C;
            static Load(InName: string): ABP_Manny_PostProcess_C;
        
            __tid_ABP_Manny_PostProcess_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9E6EC46A4FB7A3E989465399F1E653BC
    namespace Game.Characters.Mannequins.Rigs.ABP_Quinn_PostProcess {
        class ABP_Quinn_PostProcess_C extends UE.AnimInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root: UE.AnimNode_Root;
            AnimGraphNode_LinkedInputPose: UE.AnimNode_LinkedInputPose;
            AnimGraphNode_ControlRig: UE.AnimNode_ControlRig;
            AnimGraphNode_PoseDriver_13: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_12: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_11: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_10: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_9: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_8: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_7: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_6: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_5: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_4: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_3: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_2: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver_1: UE.AnimNode_PoseDriver;
            AnimGraphNode_PoseDriver: UE.AnimNode_PoseDriver;
            AnimGraph(InPose: UE.PoseLink, AnimGraph: $Ref<UE.PoseLink>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Quinn_PostProcess_C;
            static Load(InName: string): ABP_Quinn_PostProcess_C;
        
            __tid_ABP_Quinn_PostProcess_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 7B7D15D645E3A2E94B557BBACCFA9D39
    namespace Game.Characters.Mannequins.Animations.ABP_Manny {
        class AnimBlueprintGeneratedMutableData extends UE.AnimBlueprintMutableData {
            constructor();
            constructor(__FloatProperty: number);
            __FloatProperty: number;
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_AnimBlueprintGeneratedMutableData_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 7B7D15D645E3A2E94B557BBACCFA9D39
    namespace Game.Characters.Mannequins.Animations.ABP_Manny {
        class ABP_Manny_C extends UE.AnimInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            __AnimBlueprintMutables: UE.Game.Characters.Mannequins.Animations.ABP_Manny.AnimBlueprintGeneratedMutableData;
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root: UE.AnimNode_Root;
            AnimGraphNode_TransitionResult_7: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_6: UE.AnimNode_TransitionResult;
            AnimGraphNode_BlendSpacePlayer: UE.AnimNode_BlendSpacePlayer;
            AnimGraphNode_StateResult_5: UE.AnimNode_StateResult;
            AnimGraphNode_SequencePlayer_3: UE.AnimNode_SequencePlayer;
            AnimGraphNode_StateResult_4: UE.AnimNode_StateResult;
            AnimGraphNode_StateMachine_1: UE.AnimNode_StateMachine;
            AnimGraphNode_SaveCachedPose: UE.AnimNode_SaveCachedPose;
            AnimGraphNode_TransitionResult_5: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_4: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_3: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_2: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult_1: UE.AnimNode_TransitionResult;
            AnimGraphNode_TransitionResult: UE.AnimNode_TransitionResult;
            AnimGraphNode_ApplyAdditive: UE.AnimNode_ApplyAdditive;
            AnimGraphNode_UseCachedPose_1: UE.AnimNode_UseCachedPose;
            AnimGraphNode_SequencePlayer_2: UE.AnimNode_SequencePlayer;
            AnimGraphNode_StateResult_3: UE.AnimNode_StateResult;
            AnimGraphNode_SequencePlayer_1: UE.AnimNode_SequencePlayer;
            AnimGraphNode_StateResult_2: UE.AnimNode_StateResult;
            AnimGraphNode_SequencePlayer: UE.AnimNode_SequencePlayer;
            AnimGraphNode_StateResult_1: UE.AnimNode_StateResult;
            AnimGraphNode_UseCachedPose: UE.AnimNode_UseCachedPose;
            AnimGraphNode_StateResult: UE.AnimNode_StateResult;
            AnimGraphNode_StateMachine: UE.AnimNode_StateMachine;
            AnimGraphNode_Slot: UE.AnimNode_Slot;
            AnimGraphNode_ControlRig: UE.AnimNode_ControlRig;
            __CustomProperty_ShouldDoIKTrace_385011E94C94F6DE70691192D3E0622C: boolean;
            Character: UE.Character;
            MovementComponent: UE.CharacterMovementComponent;
            Velocity: UE.Vector;
            GroundSpeed: number;
            ShouldMove: boolean;
            IsFalling: boolean;
            AnimGraph(AnimGraph: $Ref<UE.PoseLink>) : void;
            /*
             *Executed when the Animation is initialized
             */
            BlueprintInitializeAnimation() : void;
            /*
             *Executed when the Animation is updated
             */
            BlueprintUpdateAnimation(DeltaTimeX: number) : void;
            EvaluateGraphExposedInputs_ExecuteUbergraph_ABP_Manny_AnimGraphNode_TransitionResult_305F37BB4A5AD886760B8E99A5C561E1() : void;
            ExecuteUbergraph_ABP_Manny(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Manny_C;
            static Load(InName: string): ABP_Manny_C;
        
            __tid_ABP_Manny_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: CEF0A70148D95DDBBC354F85E2B4BB63
    namespace Game.Characters.Mannequins.Animations.ABP_Quinn {
        class ABP_Quinn_C extends UE.Game.Characters.Mannequins.Animations.ABP_Manny.ABP_Manny_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Quinn_C;
            static Load(InName: string): ABP_Quinn_C;
        
            __tid_ABP_Quinn_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 5653AB1E48ADE13FF45428AA9CBB3073
    namespace Game.Asset._MyAsset.Widget.HeroWidget.WBP_HeroOverlay {
        class WBP_HeroOverlay_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            WBP_AbilityIconSlot_Heavy: UE.Game.Asset._MyAsset.Widget.TPWBP_AbilityIconSlot.TPWBP_AbilityIconSlot_C;
            WBP_AbilityIconSlot_Light: UE.Game.Asset._MyAsset.Widget.TPWBP_AbilityIconSlot.TPWBP_AbilityIconSlot_C;
            WBP_HeroEquippedWeaponSlot: UE.Game.Asset._MyAsset.Widget.TPWBP_IconSlot.TPWBP_IconSlot_C;
            WBP_HeroHealthBar: UE.Game.Asset._MyAsset.Widget.TPWBP_StatusBar.TPWBP_StatusBar_C;
            WBP_HeroRageBar: UE.Game.Asset._MyAsset.Widget.TPWBP_StatusBar.TPWBP_StatusBar_C;
            WBP_InputKeySlot: UE.Game.Asset._MyAsset.Widget.TPWBP_InputKeySlot.TPWBP_InputKeySlot_C;
            ["Owning Hero UIComponent"]: UE.HeroUIComponent;
            BP_OnOwningHeroUIComponentInitialized(OwningHeroUIComponent: $Nullable<UE.HeroUIComponent>) : void;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_HeroOverlay(EntryPoint: number) : void;
            OnCurrentHealthChanged_Event(NewPercent: number) : void;
            OnCurrentRageChanged_Event(NewPercent: number) : void;
            OnEquippedWeaponChanged_Event(SoftWeaponIcon: TSoftObjectPtr<UE.Texture2D>) : void;
            OnStoneInteracted_Event(bShouldDisplayInputKey: boolean) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_HeroOverlay_C;
            static Load(InName: string): WBP_HeroOverlay_C;
        
            __tid_WBP_HeroOverlay_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 834D48154D0CCCA0AA808D8B941D7D76
    namespace Game.Asset._MyAsset.Widget.TPWBP_AbilityIconSlot {
        class TPWBP_AbilityIconSlot_C extends UE.Game.Asset._MyAsset.Widget.TPWBP_IconSlot.TPWBP_IconSlot_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            TextBlock_Cooldowntext: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            ["Ability Input Tag"]: UE.GameplayTag;
            IconMaterialInstance: UE.MaterialInstanceDynamic;
            BP_OnOwningHeroUIComponentInitialized(OwningHeroUIComponent: $Nullable<UE.HeroUIComponent>) : void;
            CancelCountDownAction() : void;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_TPWBP_AbilityIconSlot(EntryPoint: number) : void;
            OnAbilityCooldownBegin_Event(AbilityInputTag: UE.GameplayTag, TotalCooldownTime: number, RemainingCooldownTime: number) : void;
            OnAbilityIconSlotUpdated_Event(AbilityInputTag: UE.GameplayTag, SoftAbilityIconMaterial: TSoftObjectPtr<UE.MaterialInterface>) : void;
            OnLoaded_D70049CB42781F053E8044A219667A27(Loaded: $Nullable<UE.Object>) : void;
            UpdateAbilityCoolDownText(InRemainingCoolDown: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TPWBP_AbilityIconSlot_C;
            static Load(InName: string): TPWBP_AbilityIconSlot_C;
        
            __tid_TPWBP_AbilityIconSlot_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 95229F834648548040EFE3A6D475F1ED
    namespace Game.Asset._MyAsset.Widget.TPWBP_IconSlot {
        class TPWBP_IconSlot_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            Image_Icon: UE.Image;
            NamedSlot_BaseIconSlot: UE.NamedSlot;
            WarriorSizeBox_Base: UE.Game.Asset._MyAsset.Widget.WarriorSizeBox.WarriorSizeBox_C;
            ["Size Box Width Override"]: number;
            ["Size Box Height Override"]: number;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_TPWBP_IconSlot(EntryPoint: number) : void;
            LoadSoftTextureAndSetAsIcon(InSoftTexture: TSoftObjectPtr<UE.Texture2D>) : void;
            OnLoaded_6D133C654B519F12FD998786834B06E0(Loaded: $Nullable<UE.Object>) : void;
            /*
             *Called by both the game and the editor.  Allows users to run initial setup for their widgets to better preview
             *the setup in the designer and since generally that same setup code is required at runtime, it's called there
             *as well.
             *
             ***WARNING**
             *This is intended purely for cosmetic updates using locally owned data, you can not safely access any game related
             *state, if you call something that doesn't expect to be run at editor time, you may crash the editor.
             *
             *In the event you save the asset with blueprint code that causes a crash on evaluation.  You can turn off
             *PreConstruct evaluation in the Widget Designer settings in the Editor Preferences.
             */
            PreConstruct(IsDesignTime: boolean) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TPWBP_IconSlot_C;
            static Load(InName: string): TPWBP_IconSlot_C;
        
            __tid_TPWBP_IconSlot_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 975E4EFA45C6220DEBFDE183CDD8AAEB
    namespace Game.Asset._MyAsset.Widget.TPWBP_InputKeySlot {
        class TPWBP_InputKeySlot_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            SizeBox_Base: UE.Game.Asset._MyAsset.Widget.WarriorSizeBox.WarriorSizeBox_C;
            TextBlock_InputKeyText: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            ["Size Box Width"]: number;
            ["Size Box Height "]: number;
            ExecuteUbergraph_TPWBP_InputKeySlot(EntryPoint: number) : void;
            /*
             *Called by both the game and the editor.  Allows users to run initial setup for their widgets to better preview
             *the setup in the designer and since generally that same setup code is required at runtime, it's called there
             *as well.
             *
             ***WARNING**
             *This is intended purely for cosmetic updates using locally owned data, you can not safely access any game related
             *state, if you call something that doesn't expect to be run at editor time, you may crash the editor.
             *
             *In the event you save the asset with blueprint code that causes a crash on evaluation.  You can turn off
             *PreConstruct evaluation in the Widget Designer settings in the Editor Preferences.
             */
            PreConstruct(IsDesignTime: boolean) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TPWBP_InputKeySlot_C;
            static Load(InName: string): TPWBP_InputKeySlot_C;
        
            __tid_TPWBP_InputKeySlot_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 933E05AC42996A61B73CCC980AC3E7BF
    namespace Game.Asset._MyAsset.Widget.TPWBP_MainMenuButton {
        class TPWBP_MainMenuButton_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            TextBlock_ButtonText: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            WarriorButton_Base: UE.Game.Asset._MyAsset.Widget.WarriorButton.WarriorButton_C;
            WarriorSizeBox_Base: UE.Game.Asset._MyAsset.Widget.WarriorSizeBox.WarriorSizeBox_C;
            ["Size Box Width Override"]: number;
            ["Size Box Height Override"]: number;
            ButtonText: string;
            OnButtonClick: $MulticastDelegate<() => void>;
            ButtonResponseDelayTime: number;
            BndEvt__TPWBP_PauseScreenButton_WarriorButton_Base_K2Node_ComponentBoundEvent_0_OnButtonClickedEvent__DelegateSignature() : void;
            ExecuteUbergraph_TPWBP_MainMenuButton(EntryPoint: number) : void;
            OnButtonClick__DelegateSignature() : void;
            /*
             *Called by both the game and the editor.  Allows users to run initial setup for their widgets to better preview
             *the setup in the designer and since generally that same setup code is required at runtime, it's called there
             *as well.
             *
             ***WARNING**
             *This is intended purely for cosmetic updates using locally owned data, you can not safely access any game related
             *state, if you call something that doesn't expect to be run at editor time, you may crash the editor.
             *
             *In the event you save the asset with blueprint code that causes a crash on evaluation.  You can turn off
             *PreConstruct evaluation in the Widget Designer settings in the Editor Preferences.
             */
            PreConstruct(IsDesignTime: boolean) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TPWBP_MainMenuButton_C;
            static Load(InName: string): TPWBP_MainMenuButton_C;
        
            __tid_TPWBP_MainMenuButton_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 8292523A4B12C2B438AE899B0C6FF3B8
    namespace Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton {
        class TPWBP_PauseScreenButton_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            TextBlock_ButtonText: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            WarriorButton_Base: UE.Game.Asset._MyAsset.Widget.WarriorButton.WarriorButton_C;
            WarriorSizeBox_Base: UE.Game.Asset._MyAsset.Widget.WarriorSizeBox.WarriorSizeBox_C;
            ["Size Box Width Override"]: number;
            ["Size Box Height Override"]: number;
            ButtonText: string;
            OnButtonClick: $MulticastDelegate<() => void>;
            ButtonResponseDelayTime: number;
            BndEvt__TPWBP_PauseScreenButton_WarriorButton_Base_K2Node_ComponentBoundEvent_0_OnButtonClickedEvent__DelegateSignature() : void;
            ExecuteUbergraph_TPWBP_PauseScreenButton(EntryPoint: number) : void;
            OnButtonClick__DelegateSignature() : void;
            /*
             *Called by both the game and the editor.  Allows users to run initial setup for their widgets to better preview
             *the setup in the designer and since generally that same setup code is required at runtime, it's called there
             *as well.
             *
             ***WARNING**
             *This is intended purely for cosmetic updates using locally owned data, you can not safely access any game related
             *state, if you call something that doesn't expect to be run at editor time, you may crash the editor.
             *
             *In the event you save the asset with blueprint code that causes a crash on evaluation.  You can turn off
             *PreConstruct evaluation in the Widget Designer settings in the Editor Preferences.
             */
            PreConstruct(IsDesignTime: boolean) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TPWBP_PauseScreenButton_C;
            static Load(InName: string): TPWBP_PauseScreenButton_C;
        
            __tid_TPWBP_PauseScreenButton_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 4095E83E42D7BF8F22BB67B2C0264461
    namespace Game.Asset._MyAsset.Widget.TPWBP_StatusBar {
        class TPWBP_StatusBar_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ProgressBar_Main: UE.ProgressBar;
            WarriorSizeBox_Base: UE.Game.Asset._MyAsset.Widget.WarriorSizeBox.WarriorSizeBox_C;
            ["Size Box Width Override"]: number;
            ["Size Box Height Override"]: number;
            StatusBarStyle: UE.ProgressBarStyle;
            StatusBarPreviewFillColor: UE.LinearColor;
            ChangeStatusBarFillColorByPercent: boolean;
            StatusBarDefaultFillColor: UE.LinearColor;
            StatusBarWarningFillColor: UE.LinearColor;
            StatusBarCriticalFillColor: UE.LinearColor;
            ExecuteUbergraph_TPWBP_StatusBar(EntryPoint: number) : void;
            /*
             *Called by both the game and the editor.  Allows users to run initial setup for their widgets to better preview
             *the setup in the designer and since generally that same setup code is required at runtime, it's called there
             *as well.
             *
             ***WARNING**
             *This is intended purely for cosmetic updates using locally owned data, you can not safely access any game related
             *state, if you call something that doesn't expect to be run at editor time, you may crash the editor.
             *
             *In the event you save the asset with blueprint code that causes a crash on evaluation.  You can turn off
             *PreConstruct evaluation in the Widget Designer settings in the Editor Preferences.
             */
            PreConstruct(IsDesignTime: boolean) : void;
            SetStatusBarPercent(InPercent: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TPWBP_StatusBar_C;
            static Load(InName: string): TPWBP_StatusBar_C;
        
            __tid_TPWBP_StatusBar_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 286273D74A8606921F70C98AE63116C0
    namespace Game.Asset._MyAsset.Widget.WBP_DefaultBossHealthBar {
        class WBP_DefaultBossHealthBar_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            T_BossName: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            WBP_BossBar: UE.Game.Asset._MyAsset.Widget.TPWBP_StatusBar.TPWBP_StatusBar_C;
            BP_OnOwningEnemyUIComponentInitialized(OwningEnemyUIComponent: $Nullable<UE.EnemyUIComponent>) : void;
            ExecuteUbergraph_WBP_DefaultBossHealthBar(EntryPoint: number) : void;
            OnCurrentHealthChanged_Event(NewPercent: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_DefaultBossHealthBar_C;
            static Load(InName: string): WBP_DefaultBossHealthBar_C;
        
            __tid_WBP_DefaultBossHealthBar_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B15F7C82424037FB177EC183E652DA06
    namespace Game.Asset._MyAsset.Widget.WBP_DefaultEnemyHealthBar {
        class WBP_DefaultEnemyHealthBar_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            WBP_HealthBar: UE.Game.Asset._MyAsset.Widget.TPWBP_StatusBar.TPWBP_StatusBar_C;
            HideHealthBarTimerHandle: UE.TimerHandle;
            IsFirstBoardcast: boolean;
            ShouldCreateDamageValue: boolean;
            CachedOwningActor: UE.Actor;
            Offset: UE.Vector2D;
            ["Widget Size"]: UE.Vector2D;
            RandomOffset: number;
            BP_OnOwningEnemyUIComponentInitialized(OwningEnemyUIComponent: $Nullable<UE.EnemyUIComponent>) : void;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_DefaultEnemyHealthBar(EntryPoint: number) : void;
            HideHealthBar() : void;
            OnCurrentHealthChanged_Event(NewPercent: number) : void;
            OnReceiveDamage_Event(Damage: number, DamageType: UE.EDamageType) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_DefaultEnemyHealthBar_C;
            static Load(InName: string): WBP_DefaultEnemyHealthBar_C;
        
            __tid_WBP_DefaultEnemyHealthBar_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C692AB694240807AE80842B24E16912E
    namespace Game.Asset._MyAsset.Widget.WBP_EnemyDamageValue {
        class WBP_EnemyDamageValue_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            FadeOut: UE.WidgetAnimation;
            SizeBox: UE.Game.Asset._MyAsset.Widget.WarriorSizeBox.WarriorSizeBox_C;
            ValueText: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            ["Size Box Width Override"]: number;
            ["Size Box Height Override"]: number;
            Damage: number;
            DamageType: UE.EDamageType;
            PhysicalColor: UE.LinearColor;
            FireColor: UE.LinearColor;
            IceColor: UE.LinearColor;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_EnemyDamageValue(EntryPoint: number) : void;
            Finished_119832ED466DD9BDFCFD66B0D107AC93() : void;
            /*
             *Called by both the game and the editor.  Allows users to run initial setup for their widgets to better preview
             *the setup in the designer and since generally that same setup code is required at runtime, it's called there
             *as well.
             *
             ***WARNING**
             *This is intended purely for cosmetic updates using locally owned data, you can not safely access any game related
             *state, if you call something that doesn't expect to be run at editor time, you may crash the editor.
             *
             *In the event you save the asset with blueprint code that causes a crash on evaluation.  You can turn off
             *PreConstruct evaluation in the Widget Designer settings in the Editor Preferences.
             */
            PreConstruct(IsDesignTime: boolean) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_EnemyDamageValue_C;
            static Load(InName: string): WBP_EnemyDamageValue_C;
        
            __tid_WBP_EnemyDamageValue_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 022794A54B957D9628C6059BE4A0F4F0
    namespace Game.Asset._MyAsset.Widget.WBP_LoseScreen {
        class WBP_LoseScreen_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            FadeInAnimation: UE.WidgetAnimation;
            Image_Background: UE.Image;
            WarriorTextBlock_YOUDIED: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            WBP_MainMenuButton: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
            WBP_Quit: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
            WBP_TryAgainButton: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
            BndEvt__WBP_LoseScreen_WBP_MainMenuButton_K2Node_ComponentBoundEvent_1_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_LoseScreen_WBP_QUIT_K2Node_ComponentBoundEvent_0_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_LoseScreen_WBP_TryAgainButton_K2Node_ComponentBoundEvent_2_OnButtonClick__DelegateSignature() : void;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_LoseScreen(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_LoseScreen_C;
            static Load(InName: string): WBP_LoseScreen_C;
        
            __tid_WBP_LoseScreen_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 6BAF39724949729222BBCB8CE7E1DE09
    namespace Game.Asset._MyAsset.Widget.WBP_MainMenu {
        class WBP_MainMenu_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            WBP_OptionButton: UE.Game.Asset._MyAsset.Widget.TPWBP_MainMenuButton.TPWBP_MainMenuButton_C;
            WBP_QuitButton: UE.Game.Asset._MyAsset.Widget.TPWBP_MainMenuButton.TPWBP_MainMenuButton_C;
            WBP_StartGameButton: UE.Game.Asset._MyAsset.Widget.TPWBP_MainMenuButton.TPWBP_MainMenuButton_C;
            BndEvt__WBP_MainMenu_WBP_OptionButton_K2Node_ComponentBoundEvent_2_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_MainMenu_WBP_QuitButton_K2Node_ComponentBoundEvent_1_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_MainMenu_WBP_StartGameButton_K2Node_ComponentBoundEvent_0_OnButtonClick__DelegateSignature() : void;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_MainMenu(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_MainMenu_C;
            static Load(InName: string): WBP_MainMenu_C;
        
            __tid_WBP_MainMenu_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 53D4A08A42EB26485FDC298966D8AB16
    namespace Game.Asset._MyAsset.Widget.WBP_OptionMenu {
        class WBP_OptionMenu_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            FadeInAnimation: UE.WidgetAnimation;
            Overlay_Base: UE.Overlay;
            TextBlock_DifficultyTextContent: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            WBP_Back: UE.Game.Asset._MyAsset.Widget.TPWBP_MainMenuButton.TPWBP_MainMenuButton_C;
            WBP_DifficultyBackButton: UE.Game.Asset._MyAsset.Widget.TPWBP_MainMenuButton.TPWBP_MainMenuButton_C;
            WBP_DifficultyForwardButton: UE.Game.Asset._MyAsset.Widget.TPWBP_MainMenuButton.TPWBP_MainMenuButton_C;
            CurrentGameDifficulty: UE.EWarriorGameDifficulty;
            BndEvt__WBP_OptionMenu_WBP_Back_K2Node_ComponentBoundEvent_2_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_OptionMenu_WBP_DifficultyBackButton_K2Node_ComponentBoundEvent_0_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_OptionMenu_WBP_DifficultyForwardButton_K2Node_ComponentBoundEvent_1_OnButtonClick__DelegateSignature() : void;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_OptionMenu(EntryPoint: number) : void;
            Finished_72B8DE53450226106103D69A32A41EFD() : void;
            SetDifficultyTextContent() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_OptionMenu_C;
            static Load(InName: string): WBP_OptionMenu_C;
        
            __tid_WBP_OptionMenu_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 869ED6284F17B338BDEEE7ACA894AB22
    namespace Game.Asset._MyAsset.Widget.WBP_PauseScreen {
        class WBP_PauseScreen_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            WBP_BackButton: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
            WBP_MainMenuButton: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
            WBP_Quit: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
            BndEvt__WBP_PauseScreen_WBP_BackButton_K2Node_ComponentBoundEvent_0_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_PauseScreen_WBP_MainMenuButton_K2Node_ComponentBoundEvent_2_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_PauseScreen_WBP_Quit_K2Node_ComponentBoundEvent_1_OnButtonClick__DelegateSignature() : void;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_PauseScreen(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_PauseScreen_C;
            static Load(InName: string): WBP_PauseScreen_C;
        
            __tid_WBP_PauseScreen_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 6E41738943DAADFF130906BF3DF253EA
    namespace Game.Asset._MyAsset.Widget.WBP_TargetLockIndicator {
        class WBP_TargetLockIndicator_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_TargetLockIndicator_C;
            static Load(InName: string): WBP_TargetLockIndicator_C;
        
            __tid_WBP_TargetLockIndicator_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 30A60CB14C36608CF2138CA362D2F0BB
    namespace Game.Asset._MyAsset.Widget.WBP_WinScreen {
        class WBP_WinScreen_C extends UE.WarriorWidgetBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            FadeInAnimation: UE.WidgetAnimation;
            Image_Background: UE.Image;
            WarriorTextBlock_YOUDIED: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
            WBP_MainMenuButton: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
            WBP_PlayAgainButton: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
            WBP_Quit: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
            BndEvt__WBP_LoseScreen_WBP_MainMenuButton_K2Node_ComponentBoundEvent_1_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_LoseScreen_WBP_QUIT_K2Node_ComponentBoundEvent_0_OnButtonClick__DelegateSignature() : void;
            BndEvt__WBP_LoseScreen_WBP_TryAgainButton_K2Node_ComponentBoundEvent_2_OnButtonClick__DelegateSignature() : void;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_WBP_WinScreen(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WBP_WinScreen_C;
            static Load(InName: string): WBP_WinScreen_C;
        
            __tid_WBP_WinScreen_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 452D2D124FF7CDB07F57ABBBE5530C5E
    namespace Game.Asset._MyAsset.Widget.WarriorSizeBox {
        class WarriorSizeBox_C extends UE.SizeBox {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ["Set Width Height Override"](SizeBoxWidthOverride: number, SizeBoxHeightOverride: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WarriorSizeBox_C;
            static Load(InName: string): WarriorSizeBox_C;
        
            __tid_WarriorSizeBox_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: E4935B724577E49AC5551A91CFC883A0
    namespace Game.Asset._MyAsset.Widget.WarriorButton {
        class WarriorButton_C extends UE.Button {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): WarriorButton_C;
            static Load(InName: string): WarriorButton_C;
        
            __tid_WarriorButton_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 42D8151347D9D6A70588CEA8E5732C98
    namespace Game.Asset._MyAsset.Misc.CameraShake_HeroMelee {
        class CameraShake_HeroMelee_C extends UE.CameraShakeBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): CameraShake_HeroMelee_C;
            static Load(InName: string): CameraShake_HeroMelee_C;
        
            __tid_CameraShake_HeroMelee_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B0ACE14D4E6DD72ED7BD748342B02D4F
    namespace Game.Asset._MyAsset.GameplayCues.GC_Hero_SuccessfullyBlock {
        class GC_Hero_SuccessfullyBlock_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_SuccessfullyBlock_C;
            static Load(InName: string): GC_Hero_SuccessfullyBlock_C;
        
            __tid_GC_Hero_SuccessfullyBlock_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 83727099486CBE3D5BC81BAABE7DE8CE
    namespace Game.Asset._MyAsset.GameplayCues.GC_Hero_PerfectBlock {
        class GC_Hero_PerfectBlock_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_PerfectBlock_C;
            static Load(InName: string): GC_Hero_PerfectBlock_C;
        
            __tid_GC_Hero_PerfectBlock_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 72CBDF1344061CC3CE15A4972E5BC2E7
    namespace Game.Asset._MyAsset.GameplayCues.GC_Hero_MagicShield {
        class GC_Hero_MagicShield_C extends UE.GameplayCueNotify_Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            DefaultSceneRoot: UE.SceneComponent;
            SpawnedMagicShieldSystem: UE.NiagaraComponent;
            /*
             *Called when a GameplayCue with duration is removed
             */
            OnRemove(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            /*
             *Called when a GameplayCue with duration is first seen as active, even if it wasn't actually just applied (Join in progress, etc)
             */
            WhileActive(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_MagicShield_C;
            static Load(InName: string): GC_Hero_MagicShield_C;
        
            __tid_GC_Hero_MagicShield_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C38ED2114A42B9343901559242E33004
    namespace Game.Asset._MyAsset.GameplayCues.GC_Hero_AxeHit1 {
        class GC_Hero_AxeHit1_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_AxeHit1_C;
            static Load(InName: string): GC_Hero_AxeHit1_C;
        
            __tid_GC_Hero_AxeHit1_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 65CC14B4414972F9E0CDCA93B1D8D836
    namespace Game.Asset._MyAsset.GameplayCues.GC_Hero_AxeHit {
        class GC_Hero_AxeHit_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_AxeHit_C;
            static Load(InName: string): GC_Hero_AxeHit_C;
        
            __tid_GC_Hero_AxeHit_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: BE7D63CC45A847C2FEA566A90ADE138C
    namespace Game.Asset._MyAsset.GameplayCues.GC_Hero_ActivateRage {
        class GC_Hero_ActivateRage_C extends UE.GameplayCueNotify_Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            DefaultSceneRoot: UE.SceneComponent;
            AttachedRageFX: UE.NiagaraComponent;
            /*
             *Called when a GameplayCue with duration is removed
             */
            OnRemove(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            /*
             *Called when a GameplayCue with duration is first seen as active, even if it wasn't actually just applied (Join in progress, etc)
             */
            WhileActive(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Hero_ActivateRage_C;
            static Load(InName: string): GC_Hero_ActivateRage_C;
        
            __tid_GC_Hero_ActivateRage_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D568950F44E38F38DFC682B2C73EC8FB
    namespace Game.Asset._MyAsset.GameplayCues.GC_Guardian_DeadSound {
        class GC_Guardian_DeadSound_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Guardian_DeadSound_C;
            static Load(InName: string): GC_Guardian_DeadSound_C;
        
            __tid_GC_Guardian_DeadSound_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 522EB7234251427F37F695BB64E82D8A
    namespace Game.Asset._MyAsset.GameplayCues.GC_FrostGiant_DeathSound {
        class GC_FrostGiant_DeathSound_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_FrostGiant_DeathSound_C;
            static Load(InName: string): GC_FrostGiant_DeathSound_C;
        
            __tid_GC_FrostGiant_DeathSound_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: DAC9CDDA4D152FA5E07772A9DCAFB92A
    namespace Game.Asset._MyAsset.GameplayCues.GC_Enemy_HitSound_Stick {
        class GC_Enemy_HitSound_Stick_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Enemy_HitSound_Stick_C;
            static Load(InName: string): GC_Enemy_HitSound_Stick_C;
        
            __tid_GC_Enemy_HitSound_Stick_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C1A2119F4349623988067D8F3C6FDF9A
    namespace Game.Asset._MyAsset.GameplayCues.GC_Enemy_AttackWarning {
        class GC_Enemy_AttackWarning_C extends UE.GameplayCueNotify_Static {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            /*
             *Called when a GameplayCue is executed, this is used for instant effects or periodic ticks
             */
            OnExecute(MyTarget: $Nullable<UE.Actor>, Parameters: UE.GameplayCueParameters) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GC_Enemy_AttackWarning_C;
            static Load(InName: string): GC_Enemy_AttackWarning_C;
        
            __tid_GC_Enemy_AttackWarning_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 993DFF6943D4BA5DEC84658CAC8FD8BD
    namespace Game.Asset._MyAsset.GameEffect.GE_Shared_IceDamage {
        class GE_Shared_IceDamage_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Shared_IceDamage_C;
            static Load(InName: string): GE_Shared_IceDamage_C;
        
            __tid_GE_Shared_IceDamage_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9114C65344BFCECCAFB273A227EF471F
    namespace Game.Asset._MyAsset.GameEffect.GE_Shared_DealDamage {
        class GE_Shared_DealDamage_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Shared_DealDamage_C;
            static Load(InName: string): GE_Shared_DealDamage_C;
        
            __tid_GE_Shared_DealDamage_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: A116C7A1445C05D5AB5792A8D0D57423
    namespace Game.Asset._MyAsset.GameEffect.GE_Shared_BurningDamage {
        class GE_Shared_BurningDamage_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Shared_BurningDamage_C;
            static Load(InName: string): GE_Shared_BurningDamage_C;
        
            __tid_GE_Shared_BurningDamage_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 1B5C87C349B0E964B4EC76A33F4EF36E
    namespace Game.Asset._MyAsset.GameEffect.GE_Hero_Static {
        class GE_Hero_Static_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Hero_Static_C;
            static Load(InName: string): GE_Hero_Static_C;
        
            __tid_GE_Hero_Static_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B5810D0643DBDAB0DB9492AD9B40C80A
    namespace Game.Asset._MyAsset.GameEffect.GE_Hero_StartUp {
        class GE_Hero_StartUp_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Hero_StartUp_C;
            static Load(InName: string): GE_Hero_StartUp_C;
        
            __tid_GE_Hero_StartUp_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: FD27E5524FE1C19630ADCBA8163B1A21
    namespace Game.Asset._MyAsset.GameEffect.GE_Hero_GainRage {
        class GE_Hero_GainRage_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Hero_GainRage_C;
            static Load(InName: string): GE_Hero_GainRage_C;
        
            __tid_GE_Hero_GainRage_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C1D6247E4286E50EE5E84B94F5D93511
    namespace Game.Asset._MyAsset.GameEffect.GE_Hero_Cost_Rage {
        class GE_Hero_Cost_Rage_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Hero_Cost_Rage_C;
            static Load(InName: string): GE_Hero_Cost_Rage_C;
        
            __tid_GE_Hero_Cost_Rage_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: F14E926C4256CB476756A194292DA003
    namespace Game.Asset._MyAsset.GameEffect.GE_Hero_Cooldown_AxeAbility_Light {
        class GE_Hero_Cooldown_AxeAbility_Light_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Hero_Cooldown_AxeAbility_Light_C;
            static Load(InName: string): GE_Hero_Cooldown_AxeAbility_Light_C;
        
            __tid_GE_Hero_Cooldown_AxeAbility_Light_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9E310D2F4902957FE489888FAEF102AB
    namespace Game.Asset._MyAsset.GameEffect.GE_Hero_Cooldown_AxeAbility_Heavy {
        class GE_Hero_Cooldown_AxeAbility_Heavy_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Hero_Cooldown_AxeAbility_Heavy_C;
            static Load(InName: string): GE_Hero_Cooldown_AxeAbility_Heavy_C;
        
            __tid_GE_Hero_Cooldown_AxeAbility_Heavy_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 1358D438492E63F00280809BCDB7E1F8
    namespace Game.Asset._MyAsset.GameEffect.GE_Guardian_StartUp {
        class GE_Guardian_StartUp_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Guardian_StartUp_C;
            static Load(InName: string): GE_Guardian_StartUp_C;
        
            __tid_GE_Guardian_StartUp_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: E0231D2344AAD64B2F84E6A7B690815C
    namespace Game.Asset._MyAsset.GameEffect.GE_Glacer_StartUp {
        class GE_Glacer_StartUp_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Glacer_StartUp_C;
            static Load(InName: string): GE_Glacer_StartUp_C;
        
            __tid_GE_Glacer_StartUp_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 44BC262F4F45895A5D1CC19A93D9106B
    namespace Game.Asset._MyAsset.GameEffect.GE_FrostGiant_StartUp {
        class GE_FrostGiant_StartUp_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_FrostGiant_StartUp_C;
            static Load(InName: string): GE_FrostGiant_StartUp_C;
        
            __tid_GE_FrostGiant_StartUp_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: A8EA240E4DA55816BF49C1B3A9D832C0
    namespace Game.Asset._MyAsset.GameEffect.GE_Enemy_UnderAttack {
        class GE_Enemy_UnderAttack_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Enemy_UnderAttack_C;
            static Load(InName: string): GE_Enemy_UnderAttack_C;
        
            __tid_GE_Enemy_UnderAttack_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: E68FAF8C48BDAE87D6161F9A608F1AB6
    namespace Game.Asset._MyAsset.GameEffect.GE_Enemy_Static {
        class GE_Enemy_Static_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Enemy_Static_C;
            static Load(InName: string): GE_Enemy_Static_C;
        
            __tid_GE_Enemy_Static_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 29C03541409ECE654523B4AC42BA187C
    namespace Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Glacer_SpawnWeapon {
        class GA_Glacer_SpawnWeapon_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_SharedSpawnWeapon_Base.GA_SharedSpawnWeapon_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Glacer_SpawnWeapon_C;
            static Load(InName: string): GA_Glacer_SpawnWeapon_C;
        
            __tid_GA_Glacer_SpawnWeapon_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 7EBDAF6B4C9C91602671BA89B1E5D925
    namespace Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Guardian_SpawnWeapon {
        class GA_Guardian_SpawnWeapon_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_SharedSpawnWeapon_Base.GA_SharedSpawnWeapon_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Guardian_SpawnWeapon_C;
            static Load(InName: string): GA_Guardian_SpawnWeapon_C;
        
            __tid_GA_Guardian_SpawnWeapon_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 00D453FF4BEB97DDC5367AB9BCD5BD06
    namespace Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_SharedSpawnWeapon_Base {
        class GA_SharedSpawnWeapon_Base_C extends UE.WarriorGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            WeaponClassToSpawn: UE.Class;
            SocketNameToAttachTo: string;
            ["Weapon Tag to Register"]: UE.GameplayTag;
            ["Register as Equipped Weapon"]: boolean;
            ExecuteUbergraph_GA_SharedSpawnWeapon_Base(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_SharedSpawnWeapon_Base_C;
            static Load(InName: string): GA_SharedSpawnWeapon_Base_C;
        
            __tid_GA_SharedSpawnWeapon_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 0BBC950048C91F1A964D11ACD22017EC
    namespace Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_FrostGiant_HitReact {
        class GA_FrostGiant_HitReact_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Enemy_HitReact_Base.GA_Enemy_HitReact_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_FrostGiant_HitReact_C;
            static Load(InName: string): GA_FrostGiant_HitReact_C;
        
            __tid_GA_FrostGiant_HitReact_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 3B6C2C594DB0614A54076AB1B485158D
    namespace Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_FrostGiant_DrawBossStatusBar {
        class GA_FrostGiant_DrawBossStatusBar_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Enemy_DrawBossStatusBar.GA_Enemy_DrawBossStatusBar_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_FrostGiant_DrawBossStatusBar_C;
            static Load(InName: string): GA_FrostGiant_DrawBossStatusBar_C;
        
            __tid_GA_FrostGiant_DrawBossStatusBar_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 2ED3A28F483FDC361353CD895AA0520B
    namespace Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_FrostGiant_Death {
        class GA_FrostGiant_Death_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Enemy_Death_Base.GA_Enemy_Death_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_FrostGiant_Death_C;
            static Load(InName: string): GA_FrostGiant_Death_C;
        
            __tid_GA_FrostGiant_Death_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 333FFDB2483ADE7DA0D0BEB33F8380C4
    namespace Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Enemy_HitReact_Base {
        class GA_Enemy_HitReact_Base_C extends UE.WarriorEnemyGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            HasHitReactMontagesToPlay: boolean;
            MontagetoPlay: TArray<UE.AnimMontage>;
            FaceAttacker: boolean;
            ExecuteUbergraph_GA_Enemy_HitReact_Base(EntryPoint: number) : void;
            K2_ActivateAbilityFromEvent(EventData: UE.GameplayEventData) : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnBlendedIn_E5E5DD1E477B749DE2881284028D7FB8() : void;
            OnBlendOut_E5E5DD1E477B749DE2881284028D7FB8() : void;
            OnCancelled_E5E5DD1E477B749DE2881284028D7FB8() : void;
            OnCompleted_E5E5DD1E477B749DE2881284028D7FB8() : void;
            OnInterrupted_E5E5DD1E477B749DE2881284028D7FB8() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Enemy_HitReact_Base_C;
            static Load(InName: string): GA_Enemy_HitReact_Base_C;
        
            __tid_GA_Enemy_HitReact_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 482D92F8492B39B44DA84AAE34AB91A2
    namespace Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Enemy_DrawBossStatusBar {
        class GA_Enemy_DrawBossStatusBar_C extends UE.WarriorEnemyGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            BossName: string;
            ExecuteUbergraph_GA_Enemy_DrawBossStatusBar(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Enemy_DrawBossStatusBar_C;
            static Load(InName: string): GA_Enemy_DrawBossStatusBar_C;
        
            __tid_GA_Enemy_DrawBossStatusBar_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 19599837472DCFF5E4197A8673A1FB5B
    namespace Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Enemy_Death_Base {
        class GA_Enemy_Death_Base_C extends UE.WarriorEnemyGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Montage to Play"]: TArray<UE.AnimMontage>;
            DeathSoundGameplayCueTag: UE.GameplayTag;
            ["Dissolve Niagara System"]: TSoftObjectPtr<UE.NiagaraSystem>;
            ExecuteUbergraph_GA_Enemy_Death_Base(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnBlendedIn_A26DFD394BD1CB5CBFD946B8145B7CAE() : void;
            OnBlendOut_A26DFD394BD1CB5CBFD946B8145B7CAE() : void;
            OnCancelled_A26DFD394BD1CB5CBFD946B8145B7CAE() : void;
            OnCompleted_A26DFD394BD1CB5CBFD946B8145B7CAE() : void;
            OnInterrupted_A26DFD394BD1CB5CBFD946B8145B7CAE() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Enemy_Death_Base_C;
            static Load(InName: string): GA_Enemy_Death_Base_C;
        
            __tid_GA_Enemy_Death_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D231F6774B7297336E28DB98AEF6CDCF
    namespace Game.Asset._MyAsset.Blueprint.Shared.AnimNotifyState.ANS_ToggleWeaponCollision {
        class ANS_ToggleWeaponCollision_C extends UE.AnimNotifyState {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ["Toggle Damage Type"]: UE.EToggleDamageType;
            /*
             *Implementable event to get a custom name for the notify
             */
            GetNotifyName() : string;
            Received_NotifyBegin(MeshComp: $Nullable<UE.SkeletalMeshComponent>, Animation: $Nullable<UE.AnimSequenceBase>, TotalDuration: number, EventReference: UE.AnimNotifyEventReference) : boolean;
            Received_NotifyEnd(MeshComp: $Nullable<UE.SkeletalMeshComponent>, Animation: $Nullable<UE.AnimSequenceBase>, EventReference: UE.AnimNotifyEventReference) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ANS_ToggleWeaponCollision_C;
            static Load(InName: string): ANS_ToggleWeaponCollision_C;
        
            __tid_ANS_ToggleWeaponCollision_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 4F6CD14E4D1D169F5C3B7BAA228A5AD4
    namespace Game.Asset._MyAsset.Blueprint.Shared.AnimNotifyState.ANS_ToggleGameplayTag {
        class ANS_ToggleGameplayTag_C extends UE.AnimNotifyState {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ["Tag to Toggle"]: UE.GameplayTag;
            Received_NotifyBegin(MeshComp: $Nullable<UE.SkeletalMeshComponent>, Animation: $Nullable<UE.AnimSequenceBase>, TotalDuration: number, EventReference: UE.AnimNotifyEventReference) : boolean;
            Received_NotifyEnd(MeshComp: $Nullable<UE.SkeletalMeshComponent>, Animation: $Nullable<UE.AnimSequenceBase>, EventReference: UE.AnimNotifyEventReference) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ANS_ToggleGameplayTag_C;
            static Load(InName: string): ANS_ToggleGameplayTag_C;
        
            __tid_ANS_ToggleGameplayTag_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 367D57EC43D6A6317EFC0FBF9EE4B9A9
    namespace Game.Asset._MyAsset.Blueprint.Shared.AnimNotifyState.ANS_ToggleAttackAnimState {
        class ANS_ToggleAttackAnimState_C extends UE.AnimNotifyState {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            AnimState: UE.Game.Asset._MyAsset.Blueprint.Shared.AnimNotifyState.EAttackAnimState.EAttackAnimState;
            /*
             *Implementable event to get a custom name for the notify
             */
            GetNotifyName() : string;
            Received_NotifyBegin(MeshComp: $Nullable<UE.SkeletalMeshComponent>, Animation: $Nullable<UE.AnimSequenceBase>, TotalDuration: number, EventReference: UE.AnimNotifyEventReference) : boolean;
            Received_NotifyEnd(MeshComp: $Nullable<UE.SkeletalMeshComponent>, Animation: $Nullable<UE.AnimSequenceBase>, EventReference: UE.AnimNotifyEventReference) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ANS_ToggleAttackAnimState_C;
            static Load(InName: string): ANS_ToggleAttackAnimState_C;
        
            __tid_ANS_ToggleAttackAnimState_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: E08C4B214198947A56EAEDA1C841715F
    namespace Game.Asset._MyAsset.Blueprint.Shared.AnimNotifyState.ANS_SlowMotion {
        class ANS_SlowMotion_C extends UE.AnimNotifyState {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ["Time Dilation"]: number;
            Received_NotifyBegin(MeshComp: $Nullable<UE.SkeletalMeshComponent>, Animation: $Nullable<UE.AnimSequenceBase>, TotalDuration: number, EventReference: UE.AnimNotifyEventReference) : boolean;
            Received_NotifyEnd(MeshComp: $Nullable<UE.SkeletalMeshComponent>, Animation: $Nullable<UE.AnimSequenceBase>, EventReference: UE.AnimNotifyEventReference) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ANS_SlowMotion_C;
            static Load(InName: string): ANS_SlowMotion_C;
        
            __tid_ANS_SlowMotion_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 3B31697C4599CA9920C88A81E4FAFEC5
    namespace Game.Asset._MyAsset.Blueprint.Shared.AnimNotifyState.EAttackAnimState {
        enum EAttackAnimState { Active, Recover, Startup, EAttackAnimState_MAX, __typeKeyDoNoAccess}
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B1A4D6984B54349B22342B837973746A
    namespace Game.Asset._MyAsset.Blueprint.Shared.AnimNotify.AN_SendGameplayEventToOwner {
        class AN_SendGameplayEventToOwner_C extends UE.AnimNotify {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ["Event Tag"]: UE.GameplayTag;
            /*
             *Implementable event to get a custom name for the notify
             */
            GetNotifyName() : string;
            Received_Notify(MeshComp: $Nullable<UE.SkeletalMeshComponent>, Animation: $Nullable<UE.AnimSequenceBase>, EventReference: UE.AnimNotifyEventReference) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): AN_SendGameplayEventToOwner_C;
            static Load(InName: string): AN_SendGameplayEventToOwner_C;
        
            __tid_AN_SendGameplayEventToOwner_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B7717B214219884CF4E4B4B707EA7E96
    namespace Game.Asset._MyAsset.Blueprint.Items.Stones.GE_Item_RageStone {
        class GE_Item_RageStone_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Item_RageStone_C;
            static Load(InName: string): GE_Item_RageStone_C;
        
            __tid_GE_Item_RageStone_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: F06EF6D74D03D9FDB77BEBBA936DCAF1
    namespace Game.Asset._MyAsset.Blueprint.Items.Stones.GE_Item_HealingStone {
        class GE_Item_HealingStone_C extends UE.GameplayEffect {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GE_Item_HealingStone_C;
            static Load(InName: string): GE_Item_HealingStone_C;
        
            __tid_GE_Item_HealingStone_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B82F190D4511991BEC764CBEA02859F3
    namespace Game.Asset._MyAsset.Blueprint.Items.Stones.BP_Stone_RageStone {
        class BP_Stone_RageStone_C extends UE.Game.Asset._MyAsset.Blueprint.Items.Stones.BP_Stone_Base.BP_Stone_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Stone_RageStone_C;
            static Load(InName: string): BP_Stone_RageStone_C;
        
            __tid_BP_Stone_RageStone_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 17BC0EB34869F2454E9C79B3BE6DB3B1
    namespace Game.Asset._MyAsset.Blueprint.Items.Stones.BP_Stone_HealingStone {
        class BP_Stone_HealingStone_C extends UE.Game.Asset._MyAsset.Blueprint.Items.Stones.BP_Stone_Base.BP_Stone_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Stone_HealingStone_C;
            static Load(InName: string): BP_Stone_HealingStone_C;
        
            __tid_BP_Stone_HealingStone_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C50318424409E386AD13448D5E856883
    namespace Game.Asset._MyAsset.Blueprint.Items.Stones.BP_Stone_Base {
        class BP_Stone_Base_C extends UE.WarriorStoneBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            StoneNiagaraComponent: UE.NiagaraComponent;
            ConsumeSound: UE.SoundBase;
            ConsumeFX: UE.NiagaraSystem;
            BP_OnStoneConsumed() : void;
            ExecuteUbergraph_BP_Stone_Base(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Stone_Base_C;
            static Load(InName: string): BP_Stone_Base_C;
        
            __tid_BP_Stone_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 3CBA924F43EA56E2435363AC1D74401C
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_HeroSpawnWeapon {
        class GA_HeroSpawnWeapon_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_SharedSpawnWeapon_Base.GA_SharedSpawnWeapon_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_HeroSpawnWeapon_C;
            static Load(InName: string): GA_HeroSpawnWeapon_C;
        
            __tid_GA_HeroSpawnWeapon_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B92DD89848CFB3AAE15EF592947FCF2D
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_HeroSpawnWeapon_LegArmour {
        class GA_HeroSpawnWeapon_LegArmour_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_SharedSpawnWeapon_Base.GA_SharedSpawnWeapon_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_GA_HeroSpawnWeapon_LegArmour(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_HeroSpawnWeapon_LegArmour_C;
            static Load(InName: string): GA_HeroSpawnWeapon_LegArmour_C;
        
            __tid_GA_HeroSpawnWeapon_LegArmour_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 311447DE44737E45CB7D0D97ECB6D35C
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_EquipAxe {
        class GA_Hero_EquipAxe_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            EventReceived_E7A641E941A831B6A764F49088C0952F(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_EquipAxe(EntryPoint: number) : void;
            HandleEquipWeapon(InWeaponToEquip: $Nullable<UE.WarriorHeroWeapon>) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_CCBC892442D71BE302E7F8B196FF6717() : void;
            OnBlendOut_CCBC892442D71BE302E7F8B196FF6717() : void;
            OnCancelled_CCBC892442D71BE302E7F8B196FF6717() : void;
            OnCompleted_CCBC892442D71BE302E7F8B196FF6717() : void;
            OnInterrupted_CCBC892442D71BE302E7F8B196FF6717() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_EquipAxe_C;
            static Load(InName: string): GA_Hero_EquipAxe_C;
        
            __tid_GA_Hero_EquipAxe_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 510B84B74A6A8675CC76358338063BEB
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_Equip_LegArmour {
        class GA_Hero_Equip_LegArmour_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            EventReceived_5A3D37D04ECED154AF2C89B148BADF48(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_Equip_LegArmour(EntryPoint: number) : void;
            HandleEquipWeapon(InWeaponToEquip: $Nullable<UE.WarriorHeroWeapon>) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_9D6D780641AD19B2EF2E30A46EB48F22() : void;
            OnBlendOut_9D6D780641AD19B2EF2E30A46EB48F22() : void;
            OnCancelled_9D6D780641AD19B2EF2E30A46EB48F22() : void;
            OnCompleted_9D6D780641AD19B2EF2E30A46EB48F22() : void;
            OnInterrupted_9D6D780641AD19B2EF2E30A46EB48F22() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_Equip_LegArmour_C;
            static Load(InName: string): GA_Hero_Equip_LegArmour_C;
        
            __tid_GA_Hero_Equip_LegArmour_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B9CD4E52485E74F1516473A060F3CBF4
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_HeavyAttackMaster {
        class GA_Hero_HeavyAttackMaster_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ComboCountResetTimerHandle: UE.TimerHandle;
            AttackMontageMap: TMap<number, UE.AnimMontage>;
            CurrentHeavytAttackComboCount: number;
            UsedComboCount: number;
            WeaponHitSoundGameplayCueTag: UE.GameplayTag;
            ComboResetThreshold: number;
            EventReceived_4B1628B84628DE008416FA8ABCEDFAFD(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_HeavyAttackMaster(EntryPoint: number) : void;
            HandleApplyDamage(GameplayEventData: UE.GameplayEventData) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_40D02D0F476D94A7A10C90BD3E3BB195() : void;
            OnBlendOut_40D02D0F476D94A7A10C90BD3E3BB195() : void;
            OnCancelled_40D02D0F476D94A7A10C90BD3E3BB195() : void;
            OnCompleted_40D02D0F476D94A7A10C90BD3E3BB195() : void;
            OnInterrupted_40D02D0F476D94A7A10C90BD3E3BB195() : void;
            ResetAttackComboCount() : void;
            WhileRageActive() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_HeavyAttackMaster_C;
            static Load(InName: string): GA_Hero_HeavyAttackMaster_C;
        
            __tid_GA_Hero_HeavyAttackMaster_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 84E17B62406EDF4D43B76488017BBAC6
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_HeavyAttack_Axe {
        class GA_Hero_HeavyAttack_Axe_C extends UE.Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_HeavyAttackMaster.GA_Hero_HeavyAttackMaster_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            SlashDamage: UE.ScalableFloat;
            SlashDuration: UE.ScalableFloat;
            EventReceived_68A391B9432023F7C0960F848E09673F(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_HeavyAttack_Axe(EntryPoint: number) : void;
            WhileRageActive() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_HeavyAttack_Axe_C;
            static Load(InName: string): GA_Hero_HeavyAttack_Axe_C;
        
            __tid_GA_Hero_HeavyAttack_Axe_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 260B52DB496C97984BC3E681541A9EAA
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_HeavyAttack_LegArmour {
        class GA_Hero_HeavyAttack_LegArmour_C extends UE.Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_HeavyAttackMaster.GA_Hero_HeavyAttackMaster_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            SlashDamage: UE.ScalableFloat;
            SlashDuration: UE.ScalableFloat;
            EventReceived_1740497D42BDE80EC4CBC8BB9DED6929(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_HeavyAttack_LegArmour(EntryPoint: number) : void;
            WhileRageActive() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_HeavyAttack_LegArmour_C;
            static Load(InName: string): GA_Hero_HeavyAttack_LegArmour_C;
        
            __tid_GA_Hero_HeavyAttack_LegArmour_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 1610AF1B460A7A64C33BC49DB2C9AE0E
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_LightAttackMaster {
        class GA_Hero_LightAttackMaster_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ComboCountResetTimerHandle: UE.TimerHandle;
            AttackMontageMap: TMap<number, UE.AnimMontage>;
            CurrentLightAttackComboCount: number;
            UsedComboCount: number;
            WeaponHitSoundGameplayCueTag: UE.GameplayTag;
            ResetComboCountThreshold: number;
            EventReceived_EDBA40AF470A7F4200294CB18AC9B22C(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_LightAttackMaster(EntryPoint: number) : void;
            HandleApplyDamage(GameplayEventData: UE.GameplayEventData) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnBlendedIn_A00FD67144E458245FB07FBD34506086() : void;
            OnBlendOut_A00FD67144E458245FB07FBD34506086() : void;
            OnCancelled_A00FD67144E458245FB07FBD34506086() : void;
            OnCompleted_A00FD67144E458245FB07FBD34506086() : void;
            OnInterrupted_A00FD67144E458245FB07FBD34506086() : void;
            ResetAttackComboCount() : void;
            WhileRageActive() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_LightAttackMaster_C;
            static Load(InName: string): GA_Hero_LightAttackMaster_C;
        
            __tid_GA_Hero_LightAttackMaster_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: AA017FCA4D109F9DF44BF9A190514D91
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_LightAttack_Axe {
        class GA_Hero_LightAttack_Axe_C extends UE.Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_LightAttackMaster.GA_Hero_LightAttackMaster_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            SlashDamage: UE.ScalableFloat;
            SlashDuration: UE.ScalableFloat;
            EventReceived_CDE8DA77495BB8A2865F5DBA14631BDB(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_LightAttack_Axe(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            WhileRageActive() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_LightAttack_Axe_C;
            static Load(InName: string): GA_Hero_LightAttack_Axe_C;
        
            __tid_GA_Hero_LightAttack_Axe_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: AC9EA4734DFE39DA4D750BBAFB1119CB
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_LightAttack_LegArmour {
        class GA_Hero_LightAttack_LegArmour_C extends UE.Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_LightAttackMaster.GA_Hero_LightAttackMaster_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            SlashDamage: UE.ScalableFloat;
            SlashDuration: UE.ScalableFloat;
            Class: UE.Class;
            EventReceived_C7D4E29A43A0B4E84EBBFA82F6CA0A3B(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_LightAttack_LegArmour(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            WhileRageActive() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_LightAttack_LegArmour_C;
            static Load(InName: string): GA_Hero_LightAttack_LegArmour_C;
        
            __tid_GA_Hero_LightAttack_LegArmour_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: E4D8005F47451A755BB9FABA68425CDE
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_UnequipAxe {
        class GA_Hero_UnequipAxe_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            EventReceived_1790D9564AF9A4F4DC69AB8F8DAA52A3(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_UnequipAxe(EntryPoint: number) : void;
            HandleUnequipWeapon(InWeaponToEquip: $Nullable<UE.WarriorHeroWeapon>) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_119BBB3A45E4042E9403909C0925DC3D() : void;
            OnBlendOut_119BBB3A45E4042E9403909C0925DC3D() : void;
            OnCancelled_119BBB3A45E4042E9403909C0925DC3D() : void;
            OnCompleted_119BBB3A45E4042E9403909C0925DC3D() : void;
            OnInterrupted_119BBB3A45E4042E9403909C0925DC3D() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_UnequipAxe_C;
            static Load(InName: string): GA_Hero_UnequipAxe_C;
        
            __tid_GA_Hero_UnequipAxe_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 4A43599948F0C99EB425C3A139E15F99
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_Unequip_LegArmour {
        class GA_Hero_Unequip_LegArmour_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            EventReceived_B771E42B4BCDD75199423DBDFFADD7B5(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_Unequip_LegArmour(EntryPoint: number) : void;
            HandleUnequipWeapon(InWeaponToEquip: $Nullable<UE.WarriorHeroWeapon>) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_3B8A4EDE442384B8A4EE7BB26385A2B1() : void;
            OnBlendOut_3B8A4EDE442384B8A4EE7BB26385A2B1() : void;
            OnCancelled_3B8A4EDE442384B8A4EE7BB26385A2B1() : void;
            OnCompleted_3B8A4EDE442384B8A4EE7BB26385A2B1() : void;
            OnInterrupted_3B8A4EDE442384B8A4EE7BB26385A2B1() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_Unequip_LegArmour_C;
            static Load(InName: string): GA_Hero_Unequip_LegArmour_C;
        
            __tid_GA_Hero_Unequip_LegArmour_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 7CA39A00419DDAF161380B837A4B23DA
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_WeaponAbility_LegArmour_Light {
        class GA_Hero_WeaponAbility_LegArmour_Light_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            WeaponHitSoundGameplayCueTag: UE.GameplayTag;
            ["In Gameplay Effect"]: UE.GameplayEffect;
            BurningDamage: UE.ScalableFloat;
            StartDamage: UE.ScalableFloat;
            BurningDuration: UE.ScalableFloat;
            ["Object Types"]: TArray<UE.EObjectTypeQuery>;
            ComputeMotionWarping() : void;
            EventReceived_9DFB6E964ADA058D4AA0089021E9AFD1(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_WeaponAbility_LegArmour_Light(EntryPoint: number) : void;
            HandleApplyDamage(GameplayEventData: UE.GameplayEventData) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnBlendedIn_B3466D6D43ED28AB370F75953F9F925C() : void;
            OnBlendOut_B3466D6D43ED28AB370F75953F9F925C() : void;
            OnCancelled_B3466D6D43ED28AB370F75953F9F925C() : void;
            OnCompleted_B3466D6D43ED28AB370F75953F9F925C() : void;
            OnInterrupted_B3466D6D43ED28AB370F75953F9F925C() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_WeaponAbility_LegArmour_Light_C;
            static Load(InName: string): GA_Hero_WeaponAbility_LegArmour_Light_C;
        
            __tid_GA_Hero_WeaponAbility_LegArmour_Light_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 8912E7B245005B8F8CB2DCAA672D374F
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_WeaponAbility_LegArmour_Heavy {
        class GA_Hero_WeaponAbility_LegArmour_Heavy_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Object Types"]: TArray<UE.EObjectTypeQuery>;
            EventReceived_56DB2AA24E5E3D6774168182913178B2(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_WeaponAbility_LegArmour_Heavy(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_0D307EA14C8075FE672C4DA9314768E8() : void;
            OnBlendOut_0D307EA14C8075FE672C4DA9314768E8() : void;
            OnCancelled_0D307EA14C8075FE672C4DA9314768E8() : void;
            OnCompleted_0D307EA14C8075FE672C4DA9314768E8() : void;
            OnInterrupted_0D307EA14C8075FE672C4DA9314768E8() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_WeaponAbility_LegArmour_Heavy_C;
            static Load(InName: string): GA_Hero_WeaponAbility_LegArmour_Heavy_C;
        
            __tid_GA_Hero_WeaponAbility_LegArmour_Heavy_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: E2E235A2457D4F0D1C4C89AAFE5247EF
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_WeaponAbility_Axe_Light {
        class GA_Hero_WeaponAbility_Axe_Light_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            WeaponHitSoundGameplayCueTag: UE.GameplayTag;
            ["In Gameplay Effect"]: UE.GameplayEffect;
            BurningDamage: UE.ScalableFloat;
            StartDamage: UE.ScalableFloat;
            BurningDuration: UE.ScalableFloat;
            EventReceived_6227A33041A31C75D28FDA957D857B19(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_WeaponAbility_Axe_Light(EntryPoint: number) : void;
            HandleApplyDamage(GameplayEventData: UE.GameplayEventData) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_4DF1F31348A4CAEBCE4018861416312F() : void;
            OnBlendOut_4DF1F31348A4CAEBCE4018861416312F() : void;
            OnCancelled_4DF1F31348A4CAEBCE4018861416312F() : void;
            OnCompleted_4DF1F31348A4CAEBCE4018861416312F() : void;
            OnInterrupted_4DF1F31348A4CAEBCE4018861416312F() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_WeaponAbility_Axe_Light_C;
            static Load(InName: string): GA_Hero_WeaponAbility_Axe_Light_C;
        
            __tid_GA_Hero_WeaponAbility_Axe_Light_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 7728FAEA44BC7A8C711D14905CF1316F
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_WeaponAbility_Axe_Heavy {
        class GA_Hero_WeaponAbility_Axe_Heavy_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Object Types"]: TArray<UE.EObjectTypeQuery>;
            EventReceived_61997C674747C8D1DB0BB2880ACA2992(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_WeaponAbility_Axe_Heavy(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_CEB331CC46660B591D2E36B0FDE431EB() : void;
            OnBlendOut_CEB331CC46660B591D2E36B0FDE431EB() : void;
            OnCancelled_CEB331CC46660B591D2E36B0FDE431EB() : void;
            OnCompleted_CEB331CC46660B591D2E36B0FDE431EB() : void;
            OnInterrupted_CEB331CC46660B591D2E36B0FDE431EB() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_WeaponAbility_Axe_Heavy_C;
            static Load(InName: string): GA_Hero_WeaponAbility_Axe_Heavy_C;
        
            __tid_GA_Hero_WeaponAbility_Axe_Heavy_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9B6680264244D64EEC99149D4D240786
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_TargetLock {
        class GA_Hero_TargetLock_C extends UE.HeroGameplayAbility_TargetLock {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            EventReceived_4B9ED4444097592B1159F789C8617CEF(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_TargetLock(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnAbilityTaskTick_0AB3AF6648C29B19C4902B80D9A75B7B(DeltaTime: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_TargetLock_C;
            static Load(InName: string): GA_Hero_TargetLock_C;
        
            __tid_GA_Hero_TargetLock_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 4B8AFE04482A555CC2406CB367B590DA
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_Roll_LegArmour {
        class GA_Hero_Roll_LegArmour_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Object Types"]: TArray<UE.EObjectTypeQuery>;
            RollingDistanceScalableFloat: UE.ScalableFloat;
            ["Montage to Play"]: UE.AnimMontage;
            bRollBack: boolean;
            WeaponHitSoundGameplayCueTag: UE.GameplayTag;
            ["Roll Back Threshold"]: number;
            ComputeRollDirectionAndDistance() : void;
            EventReceived_FFC2813246072F456CEFDB89143D63ED(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_Roll_LegArmour(EntryPoint: number) : void;
            HandleApplyDamage(GameplayEventData: UE.GameplayEventData) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnBlendedIn_A49F785C4AA7162EED3D5E937FF3B7BF() : void;
            OnBlendOut_A49F785C4AA7162EED3D5E937FF3B7BF() : void;
            OnCancelled_A49F785C4AA7162EED3D5E937FF3B7BF() : void;
            OnCompleted_A49F785C4AA7162EED3D5E937FF3B7BF() : void;
            OnInterrupted_A49F785C4AA7162EED3D5E937FF3B7BF() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_Roll_LegArmour_C;
            static Load(InName: string): GA_Hero_Roll_LegArmour_C;
        
            __tid_GA_Hero_Roll_LegArmour_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: CBC754DB4CCE491268D337BA2CFB5EF4
    namespace Game.Asset.HeroCharacter.Animations.CR_Hero_ClimbIK {
        class CR_Hero_ClimbIK_C extends UE.ControlRig {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ShouldDoClimbIKTrace: boolean;
            Foot_L_TargetOffset: UE.Vector;
            Foot_L_CurrentOffset: UE.Vector;
            Foot_R_CurrentOffset: UE.Vector;
            Foot_R_TargetOffset: UE.Vector;
            Hand_L_TargetOffset: UE.Vector;
            Hand_L_CurrentOffset: UE.Vector;
            Hand_R_TargetOffset: UE.Vector;
            Hand_R_CurrentOffset: UE.Vector;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): CR_Hero_ClimbIK_C;
            static Load(InName: string): CR_Hero_ClimbIK_C;
        
            __tid_CR_Hero_ClimbIK_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 8D1F3D814DE17EEFB0B04C98C05FC8E0
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_Roll {
        class GA_Hero_Roll_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Object Types"]: TArray<UE.EObjectTypeQuery>;
            RollingDistanceScalableFloat: UE.ScalableFloat;
            ComputeRollDirectionAndDistance() : void;
            ExecuteUbergraph_GA_Hero_Roll(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnBlendedIn_E9BCE35047D6424B4AC83EAC853D8E41() : void;
            OnBlendOut_E9BCE35047D6424B4AC83EAC853D8E41() : void;
            OnCancelled_E9BCE35047D6424B4AC83EAC853D8E41() : void;
            OnCompleted_E9BCE35047D6424B4AC83EAC853D8E41() : void;
            OnInterrupted_E9BCE35047D6424B4AC83EAC853D8E41() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_Roll_C;
            static Load(InName: string): GA_Hero_Roll_C;
        
            __tid_GA_Hero_Roll_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 48AE154C486E4BD08D2762B67BE1BE1E
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_Rage {
        class GA_Hero_Rage_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            AppliedRageCostGameplayEffectHandle: UE.ActiveGameplayEffectHandle;
            ["Gameplay Cue Tag"]: UE.GameplayTag;
            Added_413F400A49FF37344724B78487C7A777() : void;
            EventReceived_6E9671B1404AB31E6669BA83A9274360(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_Rage(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnBlendedIn_85633BFD47BE346703DE7EA1027EE1C4() : void;
            OnBlendOut_85633BFD47BE346703DE7EA1027EE1C4() : void;
            OnCancelled_85633BFD47BE346703DE7EA1027EE1C4() : void;
            OnCompleted_85633BFD47BE346703DE7EA1027EE1C4() : void;
            OnInterrupted_85633BFD47BE346703DE7EA1027EE1C4() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_Rage_C;
            static Load(InName: string): GA_Hero_Rage_C;
        
            __tid_GA_Hero_Rage_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 0EEEA7BD42323AFB89F7E0B88FE33682
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_PickUp_Stones {
        class GA_Hero_PickUp_Stones_C extends UE.HeroGameplayAbility_PickUpStones {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            EventReceived_DC5E2DD54C6CABD4C2741F9BC0678170(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_PickUp_Stones(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnAbilityTaskTick_E954CBA24F813FC5E371EF949ED4E661(DeltaTime: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_PickUp_Stones_C;
            static Load(InName: string): GA_Hero_PickUp_Stones_C;
        
            __tid_GA_Hero_PickUp_Stones_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: CCDE480F43E45121ED6FA0BD808CC6C8
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_HitReact {
        class GA_Hero_HitReact_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Montage to Play"]: UE.AnimMontage;
            ExecuteUbergraph_GA_Hero_HitReact(EntryPoint: number) : void;
            K2_ActivateAbilityFromEvent(EventData: UE.GameplayEventData) : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnBlendedIn_3962B7B0476AD1CC4570CBB3A0311AC3() : void;
            OnBlendOut_3962B7B0476AD1CC4570CBB3A0311AC3() : void;
            OnCancelled_3962B7B0476AD1CC4570CBB3A0311AC3() : void;
            OnCompleted_3962B7B0476AD1CC4570CBB3A0311AC3() : void;
            OnInterrupted_3962B7B0476AD1CC4570CBB3A0311AC3() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_HitReact_C;
            static Load(InName: string): GA_Hero_HitReact_C;
        
            __tid_GA_Hero_HitReact_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 683696804081BBC9336BEBA14308E3C4
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_HitPause {
        class GA_Hero_HitPause_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_GA_Hero_HitPause(EntryPoint: number) : void;
            K2_ActivateAbilityFromEvent(EventData: UE.GameplayEventData) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_HitPause_C;
            static Load(InName: string): GA_Hero_HitPause_C;
        
            __tid_GA_Hero_HitPause_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 126D2F5D404FF7829BC496A1DC5E2A4D
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_DrawOverlayWidget {
        class GA_Hero_DrawOverlayWidget_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_GA_Hero_DrawOverlayWidget(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_DrawOverlayWidget_C;
            static Load(InName: string): GA_Hero_DrawOverlayWidget_C;
        
            __tid_GA_Hero_DrawOverlayWidget_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 0E7BD65F447FEA4D410EF8AF6B0A79E2
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_Death {
        class GA_Hero_Death_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Montage to Play"]: TArray<UE.AnimMontage>;
            ExecuteUbergraph_GA_Hero_Death(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            OnBlendedIn_1209DC8946CA2AB81918DD8D753CD795() : void;
            OnBlendOut_1209DC8946CA2AB81918DD8D753CD795() : void;
            OnCancelled_1209DC8946CA2AB81918DD8D753CD795() : void;
            OnCompleted_1209DC8946CA2AB81918DD8D753CD795() : void;
            OnInterrupted_1209DC8946CA2AB81918DD8D753CD795() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_Death_C;
            static Load(InName: string): GA_Hero_Death_C;
        
            __tid_GA_Hero_Death_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 6C0EE71B4F6F21F35BF2F598FBAD5DB5
    namespace Game.Asset._MyAsset.Blueprint.Hero.Ability.GA_Hero_Block {
        class GA_Hero_Block_C extends UE.WarriorHeroGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            HeroBlockActivatedTime: number;
            IsPerfectBlock: boolean;
            PerfectBlockThreshold: number;
            PerfectBlockParryWindow: number;
            EventReceived_F2344FA34BA52FF1DC50E4909FCCC818(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Hero_Block(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            /*
             *Blueprint event, will be called if an ability ends normally or abnormally
             */
            K2_OnEndAbility(bWasCancelled: boolean) : void;
            MakeBlockGameplayParams() : UE.GameplayCueParameters;
            OnBlendedIn_8174A158482309310F1FCB9D6BA574A7() : void;
            OnBlendOut_8174A158482309310F1FCB9D6BA574A7() : void;
            OnCancelled_8174A158482309310F1FCB9D6BA574A7() : void;
            OnCompleted_8174A158482309310F1FCB9D6BA574A7() : void;
            OnFinish_214645B54E9D74E297F4C3B21B46A7C5() : void;
            OnInterrupted_8174A158482309310F1FCB9D6BA574A7() : void;
            ResetJumpToFinishState() : void;
            StartResetJumpToFinishTimer() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Hero_Block_C;
            static Load(InName: string): GA_Hero_Block_C;
        
            __tid_GA_Hero_Block_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9485898D4C1CFCF4B89D8385A65D7570
    namespace Game.Asset._MyAsset.Blueprint.Hero.BP_HeroWeapon_LegArmour {
        class BP_HeroWeapon_LegArmour_C extends UE.Game.Asset._MyAsset.Blueprint.Hero.BP_HeroWeapon_Base.BP_HeroWeapon_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            LeftLegCollision: UE.SphereComponent;
            RightLegCollision: UE.SphereComponent;
            RightArmLegCollision: UE.SphereComponent;
            RightLeg: UE.StaticMeshComponent;
            LeftLeg: UE.StaticMeshComponent;
            RightArm: UE.StaticMeshComponent;
            Timeline_NormalizedFloatTrack_78C24B1947A3A2B13FC1C5B447BEEF35: number;
            Timeline__Direction_78C24B1947A3A2B13FC1C5B447BEEF35: UE.ETimelineDirection;
            Timeline: UE.TimelineComponent;
            Timeline_0_NormalizedFloatTrack_E12E7C53469F2887D0717497F856B0D6: number;
            Timeline_0__Direction_E12E7C53469F2887D0717497F856B0D6: UE.ETimelineDirection;
            Timeline_0: UE.TimelineComponent;
            ["AttachToSkeletal Mesh"](Mesh: $Nullable<UE.SkeletalMeshComponent>, ScaleRule: UE.EAttachmentRule) : void;
            BP_OnEquipWeapon(TargetMesh: $Nullable<UE.SkeletalMeshComponent>) : void;
            BP_OnUnequip(TargetMesh: $Nullable<UE.SkeletalMeshComponent>) : void;
            BP_OnWeaponRegister() : void;
            BP_ToggleCurrentEquippedWeaponCollision(bShouldEnable: boolean, ToggleDamageType: UE.EToggleDamageType) : void;
            DetachFromSkeletalMesh(Mesh: $Nullable<UE.SkeletalMeshComponent>) : void;
            ExecuteUbergraph_BP_HeroWeapon_LegArmour(EntryPoint: number) : void;
            /*
             *Event when this actor overlaps another actor, for example a player walking into a trigger.
             *For events when objects have a blocking collision, for example a player hitting a wall, see 'Hit' events.
             *@note Components on both this and the other Actor must have bGenerateOverlapEvents set to true to generate overlap events.
             */
            ReceiveActorBeginOverlap(OtherActor: $Nullable<UE.Actor>) : void;
            Timeline_0__FinishedFunc() : void;
            Timeline_0__UpdateFunc() : void;
            Timeline__FinishedFunc() : void;
            Timeline__UpdateFunc() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_HeroWeapon_LegArmour_C;
            static Load(InName: string): BP_HeroWeapon_LegArmour_C;
        
            __tid_BP_HeroWeapon_LegArmour_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 02561A81491809C56C9F79833C7A700F
    namespace Game.Asset._MyAsset.Blueprint.Hero.BP_HeroWeapon_Base {
        class BP_HeroWeapon_Base_C extends UE.WarriorHeroWeapon {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_HeroWeapon_Base_C;
            static Load(InName: string): BP_HeroWeapon_Base_C;
        
            __tid_BP_HeroWeapon_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 420984744E6CD3DE69D4EDBECD591B80
    namespace Game.Asset._MyAsset.Blueprint.Hero.BP_HeroWeapon_Axe {
        class BP_HeroWeapon_Axe_C extends UE.Game.Asset._MyAsset.Blueprint.Hero.BP_HeroWeapon_Base.BP_HeroWeapon_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            Timeline_0_NormalizedFloatTrack_7A5363A34544C21742EF74929DF59F1E: number;
            Timeline_0__Direction_7A5363A34544C21742EF74929DF59F1E: UE.ETimelineDirection;
            Timeline_0: UE.TimelineComponent;
            Timeline_NormalizedFloatTrack_2F9595124D361300AE646BA72349836D: number;
            Timeline__Direction_2F9595124D361300AE646BA72349836D: UE.ETimelineDirection;
            Timeline: UE.TimelineComponent;
            BP_OnEquipWeapon(TargetMesh: $Nullable<UE.SkeletalMeshComponent>) : void;
            BP_OnUnequip(TargetMesh: $Nullable<UE.SkeletalMeshComponent>) : void;
            BP_OnWeaponRegister() : void;
            BP_ToggleCurrentEquippedWeaponCollision(bShouldEnable: boolean, ToggleDamageType: UE.EToggleDamageType) : void;
            ExecuteUbergraph_BP_HeroWeapon_Axe(EntryPoint: number) : void;
            Timeline_0__FinishedFunc() : void;
            Timeline_0__UpdateFunc() : void;
            Timeline__FinishedFunc() : void;
            Timeline__UpdateFunc() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_HeroWeapon_Axe_C;
            static Load(InName: string): BP_HeroWeapon_Axe_C;
        
            __tid_BP_HeroWeapon_Axe_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D897DC024DAB5E64A11EBD9649BB3D6A
    namespace Game.Asset._MyAsset.Blueprint.Hero.BP_HeroDummy {
        class BP_HeroDummy_C extends UE.WarriorHeroCharacter {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_BP_HeroDummy(EntryPoint: number) : void;
            InpActEvt_IA_PauseGame_K2Node_EnhancedInputActionEvent_0(ActionValue: UE.InputActionValue, ElapsedTime: number, TriggeredTime: number, SourceAction: $Nullable<UE.InputAction>) : void;
            InpActEvt_IA_PickupStones_K2Node_EnhancedInputActionEvent_1(ActionValue: UE.InputActionValue, ElapsedTime: number, TriggeredTime: number, SourceAction: $Nullable<UE.InputAction>) : void;
            OnLoaded_3EBFE6F6405637D707A4FCA06AEEA37A(Loaded: $Nullable<UE.Class>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_HeroDummy_C;
            static Load(InName: string): BP_HeroDummy_C;
        
            __tid_BP_HeroDummy_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: A35E8B104C4EA807E6521CA2F02A6213
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Guardian.BP_Guardian_Weapon {
        class BP_Guardian_Weapon_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_EnemyWeapon_Base.BP_EnemyWeapon_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            BP_ToggleCurrentEquippedWeaponCollision(bShouldEnable: boolean, ToggleDamageType: UE.EToggleDamageType) : void;
            ExecuteUbergraph_BP_Guardian_Weapon(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Guardian_Weapon_C;
            static Load(InName: string): BP_Guardian_Weapon_C;
        
            __tid_BP_Guardian_Weapon_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 6BE11B964F330452393470AC6DB453AD
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Guardian.BP_Gruntling_Guardian {
        class BP_Gruntling_Guardian_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_Gruntling_Base.BP_Gruntling_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Gruntling_Guardian_C;
            static Load(InName: string): BP_Gruntling_Guardian_C;
        
            __tid_BP_Gruntling_Guardian_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 505EC33C4CBB4B6886737D9B9BC397EA
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Guardian.AIC_Gruntling_Guardian {
        class AIC_Gruntling_Guardian_C extends UE.WarriorAIController {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            BehaviorTreeToRun: UE.BehaviorTree;
            ExecuteUbergraph_AIC_Gruntling_Guardian(EntryPoint: number) : void;
            /*
             *Blueprint implementable event to react to the controller possessing a pawn
             */
            ReceivePossess(PossessedPawn: $Nullable<UE.Pawn>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): AIC_Gruntling_Guardian_C;
            static Load(InName: string): AIC_Gruntling_Guardian_C;
        
            __tid_AIC_Gruntling_Guardian_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 078E3EDE4E15617FD983F08A6C82AC18
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Glacer.BP_Projectile_Glacer {
        class BP_Projectile_Glacer_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_Projectile_Base.BP_Projectile_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Projectile_Glacer_C;
            static Load(InName: string): BP_Projectile_Glacer_C;
        
            __tid_BP_Projectile_Glacer_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B39F07F64E350C282D0406897EA4A196
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Glacer.BP_Gruntling_Glacer {
        class BP_Gruntling_Glacer_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_Gruntling_Base.BP_Gruntling_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Gruntling_Glacer_C;
            static Load(InName: string): BP_Gruntling_Glacer_C;
        
            __tid_BP_Gruntling_Glacer_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: F9D0119742081B12758C3195F6487BA7
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Glacer.BP_Glacer_Weapon {
        class BP_Glacer_Weapon_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_EnemyWeapon_Base.BP_EnemyWeapon_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            BP_ToggleCurrentEquippedWeaponCollision(bShouldEnable: boolean, ToggleDamageType: UE.EToggleDamageType) : void;
            ExecuteUbergraph_BP_Glacer_Weapon(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Glacer_Weapon_C;
            static Load(InName: string): BP_Glacer_Weapon_C;
        
            __tid_BP_Glacer_Weapon_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 527291F94FCEDC3B3ECE0F9E12292BCB
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Glacer.AIC_Gruntling_Glacer {
        class AIC_Gruntling_Glacer_C extends UE.WarriorAIController {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            BehaviorTreeToRun: UE.BehaviorTree;
            ExecuteUbergraph_AIC_Gruntling_Glacer(EntryPoint: number) : void;
            /*
             *Blueprint implementable event to react to the controller possessing a pawn
             */
            ReceivePossess(PossessedPawn: $Nullable<UE.Pawn>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): AIC_Gruntling_Glacer_C;
            static Load(InName: string): AIC_Gruntling_Glacer_C;
        
            __tid_AIC_Gruntling_Glacer_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C26CFBA341FE15FCED3CCEABD69A404D
    namespace Game.Asset._MyAsset.Blueprint.Enemy.FrostGiant.BP_FrostGiant {
        class BP_FrostGiant_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_EnemyCharacter_Base.BP_EnemyCharacter_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_BP_FrostGiant(EntryPoint: number) : void;
            OnEnemyDied(DissolveNiagaraSystem: TSoftObjectPtr<UE.NiagaraSystem>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_FrostGiant_C;
            static Load(InName: string): BP_FrostGiant_C;
        
            __tid_BP_FrostGiant_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9D6AE812440965B08CCA658CA54B52F7
    namespace Game.Asset._MyAsset.Blueprint.Enemy.FrostGiant.AIC_FrostGiant {
        class AIC_FrostGiant_C extends UE.WarriorAIController {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            BehaviorTreeToRun: UE.BehaviorTree;
            ExecuteUbergraph_AIC_FrostGiant(EntryPoint: number) : void;
            /*
             *Blueprint implementable event to react to the controller possessing a pawn
             */
            ReceivePossess(PossessedPawn: $Nullable<UE.Pawn>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): AIC_FrostGiant_C;
            static Load(InName: string): AIC_FrostGiant_C;
        
            __tid_AIC_FrostGiant_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: BF36547D4E0EF56827D94C9B655B6394
    namespace Game.Asset._MyAsset.Blueprint.Enemy.EQS.EQS_TestPawn {
        class EQS_TestPawn_C extends UE.EQSTestingPawn {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): EQS_TestPawn_C;
            static Load(InName: string): EQS_TestPawn_C;
        
            __tid_EQS_TestPawn_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 72E4DB1D4B7026DE68830B8AE6E9FE3D
    namespace Game.Asset._MyAsset.Blueprint.Enemy.EQS.EQSContext_TargetActor {
        class EQSContext_TargetActor_C extends UE.EnvQueryContext_BlueprintBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ProvideSingleActor(QuerierObject: $Nullable<UE.Object>, QuerierActor: $Nullable<UE.Actor>, ResultingActor: $Ref<UE.Actor>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): EQSContext_TargetActor_C;
            static Load(InName: string): EQSContext_TargetActor_C;
        
            __tid_EQSContext_TargetActor_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 6985F6D64C71B01C1F0D55B8AEEE3360
    namespace Game.Asset._MyAsset.Blueprint.Enemy.DummyEnemy.BP_Dummy_Guardian_NoMove {
        class BP_Dummy_Guardian_NoMove_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Guardian.BP_Gruntling_Guardian.BP_Gruntling_Guardian_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Dummy_Guardian_NoMove_C;
            static Load(InName: string): BP_Dummy_Guardian_NoMove_C;
        
            __tid_BP_Dummy_Guardian_NoMove_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: CC3B877B4AC4AC4FD84698AD681FD7D3
    namespace Game.Asset._MyAsset.Blueprint.Enemy.DummyEnemy.BP_Dummy_Guardian_AttackOnly {
        class BP_Dummy_Guardian_AttackOnly_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Guardian.BP_Gruntling_Guardian.BP_Gruntling_Guardian_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Dummy_Guardian_AttackOnly_C;
            static Load(InName: string): BP_Dummy_Guardian_AttackOnly_C;
        
            __tid_BP_Dummy_Guardian_AttackOnly_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 3F6BBEE4430FCFA79CFFB593E58D0F0E
    namespace Game.Asset._MyAsset.Blueprint.Enemy.DummyEnemy.AIC_Dummy_Guardian_NoMove {
        class AIC_Dummy_Guardian_NoMove_C extends UE.WarriorAIController {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            BehaviorTreeToRun: UE.BehaviorTree;
            ExecuteUbergraph_AIC_Dummy_Guardian_NoMove(EntryPoint: number) : void;
            /*
             *Blueprint implementable event to react to the controller possessing a pawn
             */
            ReceivePossess(PossessedPawn: $Nullable<UE.Pawn>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): AIC_Dummy_Guardian_NoMove_C;
            static Load(InName: string): AIC_Dummy_Guardian_NoMove_C;
        
            __tid_AIC_Dummy_Guardian_NoMove_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: DE53C21B431FC0CF978A859B5B71D996
    namespace Game.Asset._MyAsset.Blueprint.Enemy.DummyEnemy.AIC_Dummy_Guardian_AttackOnly {
        class AIC_Dummy_Guardian_AttackOnly_C extends UE.WarriorAIController {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            BehaviorTreeToRun: UE.BehaviorTree;
            ExecuteUbergraph_AIC_Dummy_Guardian_AttackOnly(EntryPoint: number) : void;
            /*
             *Blueprint implementable event to react to the controller possessing a pawn
             */
            ReceivePossess(PossessedPawn: $Nullable<UE.Pawn>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): AIC_Dummy_Guardian_AttackOnly_C;
            static Load(InName: string): AIC_Dummy_Guardian_AttackOnly_C;
        
            __tid_AIC_Dummy_Guardian_AttackOnly_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D75322304C59F203D1AA99AB3625E548
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTTask.BTTask_ToggleStrafingState {
        class BTTask_ToggleStrafingState_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BTTask.BTTask_EnemyBase.BTTask_EnemyBase_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ShouldEnable: boolean;
            ShouldChangeWalkSpeed: boolean;
            StraflingWalkSpeed: number;
            InDefaultMaxWalkSpeedKey: UE.BlackboardKeySelector;
            OnEnemyExecuteTask() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BTTask_ToggleStrafingState_C;
            static Load(InName: string): BTTask_ToggleStrafingState_C;
        
            __tid_BTTask_ToggleStrafingState_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 5AC94ECB4E28F4B47DAE06A896D16A0A
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTTask.BTTask_EnemyBase {
        class BTTask_EnemyBase_C extends UE.BTTask_BlueprintBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            OwningEnemyCharacter: UE.WarriorEnemyCharacter;
            ExecuteUbergraph_BTTask_EnemyBase(EntryPoint: number) : void;
            OnEnemyExecuteTask() : void;
            /*
             *Alternative AI version of ReceiveExecute
             *     @see ReceiveExecute for more details
             *    @Note that if both generic and AI event versions are implemented only the more
             *    suitable one will be called, meaning the AI version if called for AI, generic one otherwise
             */
            ReceiveExecuteAI(OwnerController: $Nullable<UE.AIController>, ControlledPawn: $Nullable<UE.Pawn>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BTTask_EnemyBase_C;
            static Load(InName: string): BTTask_EnemyBase_C;
        
            __tid_BTTask_EnemyBase_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 1BEFB74A429B2362D78A4F97CE6D35C7
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTTask.BTTask_ActivateAbilityByTag {
        class BTTask_ActivateAbilityByTag_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BTTask.BTTask_EnemyBase.BTTask_EnemyBase_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ["Ability Tag to Activate"]: UE.GameplayTag;
            OnEnemyExecuteTask() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BTTask_ActivateAbilityByTag_C;
            static Load(InName: string): BTTask_ActivateAbilityByTag_C;
        
            __tid_BTTask_ActivateAbilityByTag_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: D66E9DD64FEE4A13AAC16688DBA537A9
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTService.BTService_UpdateMotionWarp_AttackTarget {
        class BTService_UpdateMotionWarp_AttackTarget_C extends UE.BTService_BlueprintBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            OwningEnemyCharacter: UE.WarriorEnemyCharacter;
            InTargetActorKey: UE.BlackboardKeySelector;
            ExecuteUbergraph_BTService_UpdateMotionWarp_AttackTarget(EntryPoint: number) : void;
            /*
             *Alternative AI version of ReceiveTick function.
             *    @see ReceiveTick for more details
             *    @Note that if both generic and AI event versions are implemented only the more
             *    suitable one will be called, meaning the AI version if called for AI, generic one otherwise
             */
            ReceiveTickAI(OwnerController: $Nullable<UE.AIController>, ControlledPawn: $Nullable<UE.Pawn>, DeltaSeconds: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BTService_UpdateMotionWarp_AttackTarget_C;
            static Load(InName: string): BTService_UpdateMotionWarp_AttackTarget_C;
        
            __tid_BTService_UpdateMotionWarp_AttackTarget_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 17DF93864CEBFE36C7C91B9E18A986B4
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTService.BTService_GetDistToTarget {
        class BTService_GetDistToTarget_C extends UE.BTService_BlueprintBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            InTargetActorKey: UE.BlackboardKeySelector;
            OutDistToTargetKey: UE.BlackboardKeySelector;
            ExecuteUbergraph_BTService_GetDistToTarget(EntryPoint: number) : void;
            /*
             *Alternative AI version of ReceiveTick function.
             *    @see ReceiveTick for more details
             *    @Note that if both generic and AI event versions are implemented only the more
             *    suitable one will be called, meaning the AI version if called for AI, generic one otherwise
             */
            ReceiveTickAI(OwnerController: $Nullable<UE.AIController>, ControlledPawn: $Nullable<UE.Pawn>, DeltaSeconds: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BTService_GetDistToTarget_C;
            static Load(InName: string): BTService_GetDistToTarget_C;
        
            __tid_BTService_GetDistToTarget_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C9FC989441243FD234D9DA8C1D8509FD
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTDecorator.BTDecorator_ShouldAbortAllLogic {
        class BTDecorator_ShouldAbortAllLogic_C extends UE.BTDecorator_BlueprintBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            InTargetActorKey: UE.BlackboardKeySelector;
            IsTargetActorDead: boolean;
            IsOwningAIDead: boolean;
            InDistTargetKey: UE.BlackboardKeySelector;
            /*
             *Alternative AI version of ReceiveConditionCheck
             *    @see ReceiveConditionCheck for more details
             *    @Note that if both generic and AI event versions are implemented only the more
             *    suitable one will be called, meaning the AI version if called for AI, generic one otherwise
             */
            PerformConditionCheckAI(OwnerController: $Nullable<UE.AIController>, ControlledPawn: $Nullable<UE.Pawn>) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BTDecorator_ShouldAbortAllLogic_C;
            static Load(InName: string): BTDecorator_ShouldAbortAllLogic_C;
        
            __tid_BTDecorator_ShouldAbortAllLogic_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 97C0EBBC48D7E7EE6450BAA27B076A66
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTDecorator.BTDecorator_DoesActorHaveTag {
        class BTDecorator_DoesActorHaveTag_C extends UE.BTDecorator_BlueprintBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            ["In ActorKeyToCheck"]: UE.BlackboardKeySelector;
            TagToCheck: UE.GameplayTag;
            InverseConditionCheck: boolean;
            /*
             *Alternative AI version of ReceiveConditionCheck
             *    @see ReceiveConditionCheck for more details
             *    @Note that if both generic and AI event versions are implemented only the more
             *    suitable one will be called, meaning the AI version if called for AI, generic one otherwise
             */
            PerformConditionCheckAI(OwnerController: $Nullable<UE.AIController>, ControlledPawn: $Nullable<UE.Pawn>) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BTDecorator_DoesActorHaveTag_C;
            static Load(InName: string): BTDecorator_DoesActorHaveTag_C;
        
            __tid_BTDecorator_DoesActorHaveTag_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 327CF2B34996761D9440C195B4E5CA8A
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTDecorator.BTDecorator_ComputeSuccessChance {
        class BTDecorator_ComputeSuccessChance_C extends UE.BTDecorator_BlueprintBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            SuccessChanceMin: number;
            SuccessChanceMax: number;
            /*
             *Alternative AI version of ReceiveConditionCheck
             *    @see ReceiveConditionCheck for more details
             *    @Note that if both generic and AI event versions are implemented only the more
             *    suitable one will be called, meaning the AI version if called for AI, generic one otherwise
             */
            PerformConditionCheckAI(OwnerController: $Nullable<UE.AIController>, ControlledPawn: $Nullable<UE.Pawn>) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BTDecorator_ComputeSuccessChance_C;
            static Load(InName: string): BTDecorator_ComputeSuccessChance_C;
        
            __tid_BTDecorator_ComputeSuccessChance_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 4D55FC314673F8FE933040930DAB2CF1
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTDecorator.BTDecorator_CheckCurrentHealthPercent {
        class BTDecorator_CheckCurrentHealthPercent_C extends UE.BTDecorator_BlueprintBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            CheckOperation: UE.Game.Asset._MyAsset.Blueprint.Enemy.BTDecorator.EWarriorDecoratorOperator.EWarriorDecoratorOperator;
            ThresholdToCheck: number;
            /*
             *Alternative AI version of ReceiveConditionCheck
             *    @see ReceiveConditionCheck for more details
             *    @Note that if both generic and AI event versions are implemented only the more
             *    suitable one will be called, meaning the AI version if called for AI, generic one otherwise
             */
            PerformConditionCheckAI(OwnerController: $Nullable<UE.AIController>, ControlledPawn: $Nullable<UE.Pawn>) : boolean;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BTDecorator_CheckCurrentHealthPercent_C;
            static Load(InName: string): BTDecorator_CheckCurrentHealthPercent_C;
        
            __tid_BTDecorator_CheckCurrentHealthPercent_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 512D43A44C44CAF1B1F4DF8E791B204C
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BTDecorator.EWarriorDecoratorOperator {
        enum EWarriorDecoratorOperator { IsLessThan, IsLessThanOrEqualTo, IsEqualTo, IsGreaterThanOrEqualTo, IsGreaterThan, EWarriorDecoratorOperator_MAX, __typeKeyDoNoAccess}
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 0E837A6941AEF9BD3AA81FB3B321C2E4
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_SummonEnemy_FrostGiant {
        class GA_SummonEnemy_FrostGiant_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_SummonEnemy_Base.GA_SummonEnemy_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_SummonEnemy_FrostGiant_C;
            static Load(InName: string): GA_SummonEnemy_FrostGiant_C;
        
            __tid_GA_SummonEnemy_FrostGiant_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: DCF4991A4B5E1BBC20119388DA5C31EC
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_SummonEnemy_Base {
        class GA_SummonEnemy_Base_C extends UE.WarriorEnemyGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Montage to Play"]: UE.AnimMontage;
            ["Soft Enemy Class to Spawn"]: TSoftClassPtr<UE.WarriorEnemyCharacter>;
            ["Num to Spawn"]: number;
            DidNotSpawn_18C62743486B58E561023BB58B4B0DC2(SpawnedEnemies: TArray<UE.WarriorEnemyCharacter>) : void;
            ExecuteUbergraph_GA_SummonEnemy_Base(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_4DDF13FC471BD44ED5FF7E8697C05A2A() : void;
            OnBlendOut_4DDF13FC471BD44ED5FF7E8697C05A2A() : void;
            OnCancelled_4DDF13FC471BD44ED5FF7E8697C05A2A() : void;
            OnCompleted_4DDF13FC471BD44ED5FF7E8697C05A2A() : void;
            OnInterrupted_4DDF13FC471BD44ED5FF7E8697C05A2A() : void;
            OnSpawnFinished_18C62743486B58E561023BB58B4B0DC2(SpawnedEnemies: TArray<UE.WarriorEnemyCharacter>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_SummonEnemy_Base_C;
            static Load(InName: string): GA_SummonEnemy_Base_C;
        
            __tid_GA_SummonEnemy_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: EC56687044F7C6B7657A7C8CAEA15698
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Guardian_SpawnStone {
        class GA_Guardian_SpawnStone_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_SpawnStone_Base.GA_Enemy_SpawnStone_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Guardian_SpawnStone_C;
            static Load(InName: string): GA_Guardian_SpawnStone_C;
        
            __tid_GA_Guardian_SpawnStone_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 8BB912D24F0CFE63ABF52397A0CFF96A
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Guardian_Melee_2 {
        class GA_Guardian_Melee_2_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_MeleeAttack_Base.GA_Enemy_MeleeAttack_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Guardian_Melee_2_C;
            static Load(InName: string): GA_Guardian_Melee_2_C;
        
            __tid_GA_Guardian_Melee_2_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 6DBC6309411639C1C16EEE9D5EFB1FB2
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Guardian_Melee_1 {
        class GA_Guardian_Melee_1_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_MeleeAttack_Base.GA_Enemy_MeleeAttack_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Guardian_Melee_1_C;
            static Load(InName: string): GA_Guardian_Melee_1_C;
        
            __tid_GA_Guardian_Melee_1_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: DEFE678B4FE8281EBEAB13B3D24B6EB0
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Guardian_HitReact {
        class GA_Guardian_HitReact_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Enemy_HitReact_Base.GA_Enemy_HitReact_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Guardian_HitReact_C;
            static Load(InName: string): GA_Guardian_HitReact_C;
        
            __tid_GA_Guardian_HitReact_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: E67CC83E4E08A08B64EB49AD87315A74
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Guardian_Death {
        class GA_Guardian_Death_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Enemy_Death_Base.GA_Enemy_Death_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Guardian_Death_C;
            static Load(InName: string): GA_Guardian_Death_C;
        
            __tid_GA_Guardian_Death_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 625D979F4D7DE0F36CBEAE9E0EBB7033
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Glacer_SpawnStone {
        class GA_Glacer_SpawnStone_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_SpawnStone_Base.GA_Enemy_SpawnStone_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Glacer_SpawnStone_C;
            static Load(InName: string): GA_Glacer_SpawnStone_C;
        
            __tid_GA_Glacer_SpawnStone_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 343DEC614DCE9F3B630BB89439F67E57
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Glacer_Projectile {
        class GA_Glacer_Projectile_C extends UE.WarriorEnemyGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ProjectileDamageScalableFloat: UE.ScalableFloat;
            EventReceived_44B6491540D7B2207CD9FF8AECF8EE56(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Glacer_Projectile(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_9F67F1E54B29EE4E8C9F95B527DD4AD3() : void;
            OnBlendOut_9F67F1E54B29EE4E8C9F95B527DD4AD3() : void;
            OnCancelled_9F67F1E54B29EE4E8C9F95B527DD4AD3() : void;
            OnCompleted_9F67F1E54B29EE4E8C9F95B527DD4AD3() : void;
            OnInterrupted_9F67F1E54B29EE4E8C9F95B527DD4AD3() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Glacer_Projectile_C;
            static Load(InName: string): GA_Glacer_Projectile_C;
        
            __tid_GA_Glacer_Projectile_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9AAB939F451FB1A125A5CF95DE22A664
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Glacer_Melee1 {
        class GA_Glacer_Melee1_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_MeleeAttack_Base.GA_Enemy_MeleeAttack_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Glacer_Melee1_C;
            static Load(InName: string): GA_Glacer_Melee1_C;
        
            __tid_GA_Glacer_Melee1_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: A3029F7548BB7E6C9CF279B032E0998B
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Glacer_Death {
        class GA_Glacer_Death_C extends UE.Game.Asset._MyAsset.Blueprint.Shared.GameplayAbility.GA_Enemy_Death_Base.GA_Enemy_Death_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Glacer_Death_C;
            static Load(InName: string): GA_Glacer_Death_C;
        
            __tid_GA_Glacer_Death_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 86ABAE184E783589FB4A028AE074A051
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_FrostGiant_MeleeAttack_3 {
        class GA_FrostGiant_MeleeAttack_3_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_MeleeAttack_Base.GA_Enemy_MeleeAttack_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_FrostGiant_MeleeAttack_3_C;
            static Load(InName: string): GA_FrostGiant_MeleeAttack_3_C;
        
            __tid_GA_FrostGiant_MeleeAttack_3_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 8C08A2C14D8114ACC46C48A8C0A6AE67
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_FrostGiant_MeleeAttack_2 {
        class GA_FrostGiant_MeleeAttack_2_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_MeleeAttack_Base.GA_Enemy_MeleeAttack_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_FrostGiant_MeleeAttack_2_C;
            static Load(InName: string): GA_FrostGiant_MeleeAttack_2_C;
        
            __tid_GA_FrostGiant_MeleeAttack_2_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 040EC82B428D27316E05D281CD331C1F
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_FrostGiant_MeleeAttack_1 {
        class GA_FrostGiant_MeleeAttack_1_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_MeleeAttack_Base.GA_Enemy_MeleeAttack_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_FrostGiant_MeleeAttack_1_C;
            static Load(InName: string): GA_FrostGiant_MeleeAttack_1_C;
        
            __tid_GA_FrostGiant_MeleeAttack_1_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: CB5632224DBE3FBE2FD8158A921CF84C
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_SpawnStone_Base {
        class GA_Enemy_SpawnStone_Base_C extends UE.WarriorEnemyGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Object Types"]: TArray<UE.EObjectTypeQuery>;
            RandomSpawnLocation: UE.Vector;
            StoneClassToSpawn: TSoftClassPtr<UE.Object>;
            SpawnChance: UE.ScalableFloat;
            ExecuteUbergraph_GA_Enemy_SpawnStone_Base(EntryPoint: number) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnLoaded_C386B2C14115ED46DCE1AEB4E2CE0B66(Loaded: $Nullable<UE.Class>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Enemy_SpawnStone_Base_C;
            static Load(InName: string): GA_Enemy_SpawnStone_Base_C;
        
            __tid_GA_Enemy_SpawnStone_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 3F4026CE474FD7ABDDF47E8F927F1A9A
    namespace Game.Asset._MyAsset.Blueprint.Enemy.Ability.GA_Enemy_MeleeAttack_Base {
        class GA_Enemy_MeleeAttack_Base_C extends UE.WarriorEnemyGameplayAbility {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ["Montage to Play"]: UE.AnimMontage;
            ["In Damage Scalable Float"]: UE.ScalableFloat;
            WeaponHitSoundGameCueTag: UE.GameplayTag;
            UnblockableWarningSpawnedDistance: number;
            EventReceived_99FBBF4F49AAA7BE970451BE031CF874(Payload: UE.GameplayEventData) : void;
            ExecuteUbergraph_GA_Enemy_MeleeAttack_Base(EntryPoint: number) : void;
            ["Handle Apply Damage"](InPayload: UE.GameplayEventData) : void;
            /*
             *The main function that defines what an ability does.
             * -Child classes will want to override this
             * -This function graph should call CommitAbility
             * -This function graph should call EndAbility
             *
             * Latent_async actions are ok in this graph. Note that Commit and EndAbility calling requirements speak to the K2_ActivateAbility graph.
             * In C++, the call to K2_ActivateAbility() may return without CommitAbility or EndAbility having been called. But it is expected that this
             * will only occur when latent_async actions are pending. When K2_ActivateAbility logically finishes, then we will expect Commit_End to have been called.
             */
            K2_ActivateAbility() : void;
            OnBlendedIn_B329E96B402FEE4A2B91538F6BFA19E9() : void;
            OnBlendOut_B329E96B402FEE4A2B91538F6BFA19E9() : void;
            OnCancelled_B329E96B402FEE4A2B91538F6BFA19E9() : void;
            OnCompleted_B329E96B402FEE4A2B91538F6BFA19E9() : void;
            OnInterrupted_B329E96B402FEE4A2B91538F6BFA19E9() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): GA_Enemy_MeleeAttack_Base_C;
            static Load(InName: string): GA_Enemy_MeleeAttack_Base_C;
        
            __tid_GA_Enemy_MeleeAttack_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 9EEA85C14CED37D668436DBC2945C966
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BP_Projectile_IceSlash {
        class BP_Projectile_IceSlash_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_Projectile_Base.BP_Projectile_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Projectile_IceSlash_C;
            static Load(InName: string): BP_Projectile_IceSlash_C;
        
            __tid_BP_Projectile_IceSlash_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 5377433545F585BEAEA2A4A612FFA563
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BP_Projectile_IceBullet {
        class BP_Projectile_IceBullet_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_Projectile_Base.BP_Projectile_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Projectile_IceBullet_C;
            static Load(InName: string): BP_Projectile_IceBullet_C;
        
            __tid_BP_Projectile_IceBullet_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: ED4D2AB645187D7DAF4C668E87F5502E
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BP_Projectile_HeroSlash {
        class BP_Projectile_HeroSlash_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_Projectile_Base.BP_Projectile_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Projectile_HeroSlash_C;
            static Load(InName: string): BP_Projectile_HeroSlash_C;
        
            __tid_BP_Projectile_HeroSlash_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: AF29BBA448342BC18764B48503C4C033
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BP_Projectile_Base {
        class BP_Projectile_Base_C extends UE.WarriorProjectileBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ProjectileImpactSound: UE.SoundBase;
            ProjectileImpactFX: UE.NiagaraSystem;
            ProjectileSpawnSound: UE.SoundBase;
            ProjectileFlySound: UE.SoundBase;
            ProjectileMuzzleEffect: UE.NiagaraSystem;
            BP_OnSpawnProjectileHitFX(HitLocation: UE.Vector) : void;
            ExecuteUbergraph_BP_Projectile_Base(EntryPoint: number) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            /*
             *Called when the actor has been explicitly destroyed.
             */
            ReceiveDestroyed() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Projectile_Base_C;
            static Load(InName: string): BP_Projectile_Base_C;
        
            __tid_BP_Projectile_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 6EB63FE64926373873D59296AFDB18ED
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BP_Gruntling_Base {
        class BP_Gruntling_Base_C extends UE.Game.Asset._MyAsset.Blueprint.Enemy.BP_EnemyCharacter_Base.BP_EnemyCharacter_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_Gruntling_Base_C;
            static Load(InName: string): BP_Gruntling_Base_C;
        
            __tid_BP_Gruntling_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: EC72AC044DBFE942366E5F983F671365
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BP_EnemyWeapon_Base {
        class BP_EnemyWeapon_Base_C extends UE.WarriorWeaponBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_EnemyWeapon_Base_C;
            static Load(InName: string): BP_EnemyWeapon_Base_C;
        
            __tid_BP_EnemyWeapon_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 0C96D463437C5C8B3BC94DA354A14791
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BP_EnemyCharacter_Base {
        class BP_EnemyCharacter_Base_C extends UE.WarriorEnemyCharacter {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            EntryRestoreTimeline_NormalizedFloatTrack_F7B5312443996E0A5421719E23B7C7CD: number;
            EntryRestoreTimeline__Direction_F7B5312443996E0A5421719E23B7C7CD: UE.ETimelineDirection;
            EntryRestoreTimeline: UE.TimelineComponent;
            DissolveTimeline_NormalizedFloatTrack_BDBB3B3B413CFB13FB0D62B79C76D306: number;
            DissolveTimeline__Direction_BDBB3B3B413CFB13FB0D62B79C76D306: UE.ETimelineDirection;
            DissolveTimeline: UE.TimelineComponent;
            TotalDissolveTime: number;
            TotalEntryRestoreTime: number;
            EntryMontageToPlay: TArray<UE.AnimMontage>;
            DissolveTimeline__FinishedFunc() : void;
            DissolveTimeline__UpdateFunc() : void;
            EntryRestoreTimeline__FinishedFunc() : void;
            EntryRestoreTimeline__UpdateFunc() : void;
            ExecuteUbergraph_BP_EnemyCharacter_Base(EntryPoint: number) : void;
            OnEnemyDied(DissolveNiagaraSystem: TSoftObjectPtr<UE.NiagaraSystem>) : void;
            OnLoaded_3CA3956B4C469B1C89CA49B176B86D4D(Loaded: $Nullable<UE.Object>) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_EnemyCharacter_Base_C;
            static Load(InName: string): BP_EnemyCharacter_Base_C;
        
            __tid_BP_EnemyCharacter_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 3A70C51D4369C5F05624ACADABBCA2EE
    namespace Game.Asset._MyAsset.Blueprint.Enemy.BPI_EnemyDeath {
        class BPI_EnemyDeath_C extends UE.Interface {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            OnEnemyDied(DissolveNiagaraSystem: TSoftObjectPtr<UE.NiagaraSystem>) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BPI_EnemyDeath_C;
            static Load(InName: string): BPI_EnemyDeath_C;
        
            __tid_BPI_EnemyDeath_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: B53BCB5E4D69FB245598C280C4369632
    namespace Game.Asset._MyAsset.Blueprint.HeroGameMode {
        class HeroGameMode_C extends UE.GWOGameMode {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            ExecuteUbergraph_HeroGameMode(EntryPoint: number) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): HeroGameMode_C;
            static Load(InName: string): HeroGameMode_C;
        
            __tid_HeroGameMode_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 364FF35A4628FF2D5867E9A14C868C36
    namespace Game.Asset._MyAsset.Blueprint.BP_MainMenuGamemode {
        class BP_MainMenuGamemode_C extends UE.Game.Asset._MyAsset.Blueprint.HeroGameMode.HeroGameMode_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_BP_MainMenuGamemode(EntryPoint: number) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_MainMenuGamemode_C;
            static Load(InName: string): BP_MainMenuGamemode_C;
        
            __tid_BP_MainMenuGamemode_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: A3F3E77E4E30368CC96DEBB2839FD948
    namespace Game.Asset._MyAsset.Blueprint.BP_EnemyDebugMode {
        class BP_EnemyDebugMode_C extends UE.Game.Asset._MyAsset.Blueprint.HeroGameMode.HeroGameMode_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): BP_EnemyDebugMode_C;
            static Load(InName: string): BP_EnemyDebugMode_C;
        
            __tid_BP_EnemyDebugMode_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 4330A70A45967B501C95068287DDC4A3
    namespace Game.Asset._MyAsset.Animation.AnimLayer.AnimLayer_HeroAxe {
        class AnimLayer_HeroAxe_C extends UE.Game.Asset._MyAsset.Animation.MasterAnimLayer_Hero.MasterAnimLayer_Hero_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): AnimLayer_HeroAxe_C;
            static Load(InName: string): AnimLayer_HeroAxe_C;
        
            __tid_AnimLayer_HeroAxe_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: F4674DFB4775B4293F6FE8B7423E8E05
    namespace Game.Asset._MyAsset.Animation.ABP_Enemy_Base {
        class AnimBlueprintGeneratedMutableData extends UE.AnimBlueprintMutableData {
            constructor();
            constructor(__FloatProperty: number, __FloatProperty_0: number, __FloatProperty_1: number, __BoolProperty_2: boolean);
            __FloatProperty: number;
            __FloatProperty_0: number;
            __FloatProperty_1: number;
            __BoolProperty_2: boolean;
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_AnimBlueprintGeneratedMutableData_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: F4674DFB4775B4293F6FE8B7423E8E05
    namespace Game.Asset._MyAsset.Animation.ABP_Enemy_Base {
        class ABP_Enemy_Base_C extends UE.WarriorCharacterAnimInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            __AnimBlueprintMutables: UE.Game.Asset._MyAsset.Animation.ABP_Enemy_Base.AnimBlueprintGeneratedMutableData;
            AnimBlueprintExtension_PropertyAccess: UE.AnimSubsystemInstance;
            AnimBlueprintExtension_Base: UE.AnimSubsystemInstance;
            AnimGraphNode_Root: UE.AnimNode_Root;
            AnimGraphNode_BlendSpacePlayer_1: UE.AnimNode_BlendSpacePlayer;
            AnimGraphNode_BlendSpacePlayer: UE.AnimNode_BlendSpacePlayer;
            AnimGraphNode_BlendListByBool: UE.AnimNode_BlendListByBool;
            AnimGraphNode_Slot: UE.AnimNode_Slot;
            DefaultBlendSpace: UE.BlendSpace;
            StrafingBlendSpace: UE.BlendSpace;
            AnimGraph(AnimGraph: $Ref<UE.PoseLink>) : void;
            EvaluateGraphExposedInputs_ExecuteUbergraph_ABP_Enemy_Base_AnimGraphNode_BlendListByBool_3F8A40D1481011F798C3E6BBAEDD5BD6() : void;
            ExecuteUbergraph_ABP_Enemy_Base(EntryPoint: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Enemy_Base_C;
            static Load(InName: string): ABP_Enemy_Base_C;
        
            __tid_ABP_Enemy_Base_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: CEE1FB3B4146FA4000784A8172FAF3F0
    namespace Game.Asset._MyAsset.Animation.ABP_Enemy_Guardian {
        class ABP_Enemy_Guardian_C extends UE.Game.Asset._MyAsset.Animation.ABP_Enemy_Base.ABP_Enemy_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_Enemy_Guardian_C;
            static Load(InName: string): ABP_Enemy_Guardian_C;
        
            __tid_ABP_Enemy_Guardian_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 6953D4B14F65300A97EC72973226D46C
    namespace Game.Asset._MyAsset.Animation.ABP_FrostGiant {
        class ABP_FrostGiant_C extends UE.Game.Asset._MyAsset.Animation.ABP_Enemy_Base.ABP_Enemy_Base_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ABP_FrostGiant_C;
            static Load(InName: string): ABP_FrostGiant_C;
        
            __tid_ABP_FrostGiant_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: EF3C0ABB42EE3C4585FB3587F0A31C4B
    namespace Game.Asset.TsBlueprints.TS_BaseGun {
        class TS_BaseGun_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            GunMesh: UE.StaticMeshComponent;
            MaxBulletDistance: number;
            Damage: number;
            FireRate: number;
            PS_BulletImpact: UE.ParticleSystem;
            ExecuteUbergraph_TS_BaseGun(EntryPoint: number) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TS_BaseGun_C;
            static Load(InName: string): TS_BaseGun_C;
        
            __tid_TS_BaseGun_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 99ADAB5B4D823E07072BF3A2D20E1E4F
    namespace Game.Asset.TsBlueprints.TS_Player {
        class TS_Player_C extends UE.Character {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TS_Player_C;
            static Load(InName: string): TS_Player_C;
        
            __tid_TS_Player_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
}
