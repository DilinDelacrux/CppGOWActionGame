import * as UE from 'ue'

/**
 * AmbientNpcBehavior 插件的最小测试（分步版，用于定位崩溃点）。
 *
 * 运行方式：
 *   1. 在 Puerts 中将此 TS 类绑定为 BehaviorFrameworkManagerBase 的蓝图子类，放置到关卡。
 *   2. 运行 PIE，在 Output Log 中搜索 `[AmbientNpcTest]`。
 *
 * 每一步都会输出一个 step 日志；如果崩溃，看最后输出到 step 几即可定位。
 */
class AmbientNpcBehaviorTest extends UE.BehaviorFrameworkManagerBase {

    ReceiveBeginPlay(): void {
        this.Step('1: ReceiveBeginPlay entered');

        // step2: 创建配置资产（不涉及框架）
        const cfg = new UE.BehaviorFrameworkConfig();
        this.Step('2: BehaviorFrameworkConfig created');

        // step3: 基础字段赋值（不涉及 int64/bigint）
        cfg.LogLevel = 1;                 // Info
        cfg.SelectionAlgorithmOption = 0; // Memory-based
        this.Step('3: basic fields set');

        // step4: 拼接 JSON 路径
        const projectDir = UE.BlueprintPathsLibrary.ProjectDir();
        cfg.SchemaFilePath = projectDir + 'Plugins/AmbientNpcBehavior/Configs/schema.json';
        cfg.SequencesFilePath = projectDir + 'Plugins/AmbientNpcBehavior/Configs/sequences.json';
        cfg.ActionsFilePath = projectDir + 'Plugins/AmbientNpcBehavior/Configs/actions.json';
        cfg.EnvironmentalConditionsFilePath = projectDir + 'Plugins/AmbientNpcBehavior/Configs/environmental_conditions.json';
        cfg.LogFilePath = projectDir + 'Saved/Logs/ambient_npc_test.log';
        this.Step('4: paths set');

        // step5: 把 Config 挂到 manager 上
        this.Config = cfg;
        this.Step('5: Config assigned to manager');

        // step6: 初始化框架（最可能的崩溃点）
        this.InitializeFramework();
        this.Step(`6: InitializeFramework returned, IsInitialized = ${this.IsInitialized()}`);

        this.Step('test done');
    }

    private Step(msg: string): void {
        // Warning 级别，确保在 Output Log 中可见（黄色）。
        console.warn(`[AmbientNpcTest] ${msg}`);
    }
}

export default AmbientNpcBehaviorTest;
