我会从三个角度并行梳理：整体架构与游戏模块、当前重点开发的前端 UI 插件、以及构建配置与第三方依赖，最后给出项目现状、风险和建议。

分析已展开。重点会区分“核心动作游戏框架”和“近期正在开发的 CommonUI 设置菜单”，并把源码事实、当前工作区改动、以及推断出的风险分开说明。

构建侧已经有结论：项目可辨识为 UE 5.5 + Gameplay Ability System/CommonUI，并且仓库卫生和 PuerTS 构建副作用比一般代码风格问题更值得优先处理。我还在等玩法架构和 UI 数据流两部分完成，以避免只给出表层目录总结。

整体架构分析也已完成：核心玩法并不是普通角色类堆叠，而是以 GAS、Gameplay Tag、组件组合和 Data Asset 为主干；前端 UI 则是独立插件边界。最后还需要核对当前 OptionData/TabList 的具体完成度，才能准确评价眼下这批改动。

## 总体结论

这是一个**架构意识较强、核心玩法已成形的 UE 5.5 单机动作游戏项目**。玩法层已经明显超过普通原型：Gameplay Ability System、Gameplay Tag、数据资产、AI、生存波次、武器能力、属性伤害和 CommonUI 前端都形成了较完整的链路。

但工程仍处于从“功能丰富的学习/垂直切片项目”向“可长期维护的生产项目”过渡阶段。当前最需要关注的不是重写玩法架构，而是：

1. 修复正在开发的 Options 数据模型编译问题；
2. 打通设置页面的数据到 UI 闭环；
3. 整理生成文件和第三方依赖；
4. 补测试、构建验证与项目文档。

本次是只读静态分析，**没有修改文件，也没有实际执行完整编译或打包**。

---

## 1. 项目定位与技术栈

项目关联 **Unreal Engine 5.5**：

- [CppGOWActionGame.uproject:3](CppGOWActionGame.uproject:3)

整体可以概括为：

```text
UE 5.5
├── CppGOWActionGame
│   ├── GAS 驱动的战斗与角色框架
│   ├── Gameplay Tag 输入、事件和状态协议
│   ├── Hero / Enemy / Weapon / AI
│   ├── 属性、伤害与元素抗性
│   ├── 生存波次 GameMode
│   └── 游戏内 HUD
│
├── AdvancedFrontedUI
│   ├── CommonUI 页面栈
│   ├── 异步页面加载
│   ├── 主菜单与确认框
│   └── 正在开发的 Options 系统
│
├── Puerts
│   └── V8 / TypeScript 工具链
│
└── ReactUMG
    └── 基于 Puerts 的实验性 UI 路线
```

当前正式业务 C++ 仍集中在单一 Runtime 模块：

- [CppGOWActionGame.uproject:6](CppGOWActionGame.uproject:6)
- [CppGOWActionGame.Build.cs:9](Source/CppGOWActionGame/CppGOWActionGame.Build.cs:9)

---

## 2. 核心玩法架构

### GAS 是整个游戏的主干

项目不是只把 Gameplay Ability System 用于几个技能，而是将其用于：

- 输入激活；
- 轻重攻击；
- 格挡与翻滚；
- 武器装备和技能授予；
- 目标锁定；
- 怒气；
- 受击与死亡；
- 元素伤害；
- 敌人技能；
- UI 冷却反馈。

角色基类同时实现 Ability System、Combat 和 UI 接口：

- [WarriorBaseCharacter.h:17](Source/CppGOWActionGame/Public/Character/WarriorBaseCharacter.h:17)

被 Controller 占有后初始化 ASC：

- [WarriorBaseCharacter.cpp:55](Source/CppGOWActionGame/Private/Character/WarriorBaseCharacter.cpp:55)

英雄输入不是直接调用攻击函数，而是经过：

```text
Enhanced Input
→ Gameplay Tag
→ AbilitySystemComponent
→ GameplayAbility
→ Gameplay Event / Gameplay Effect
```

相关入口：

- [WarriorHeroCharacter.cpp:32](Source/CppGOWActionGame/Private/Character/WarriorHeroCharacter.cpp:32)
- [WarriorAbilitySystemComponent.cpp:9](Source/CppGOWActionGame/Private/AbilitySystem/WarriorAbilitySystemComponent.cpp:9)

这是当前项目最成熟、最统一的架构决策。

### Gameplay Tag 是跨系统协议

Gameplay Tag 同时承担：

- 输入标识；
- Ability 标识；
- 状态；
- 战斗事件；
- SetByCaller 参数；
- 武器注册；
- UI 页面和 UI Stack；
- 关卡；
- 存档槽。

主要定义集中在：

- [WarriorGameplayTags.h:7](Source/CppGOWActionGame/Public/WarriorGameplayTags.h:7)

这种设计扩展性很好，但意味着标签命名和配置必须严格治理，否则错误通常要到运行时才会暴露。

### 属性和伤害链路比较完整

AttributeSet 包含：

- 生命与怒气；
- 攻击力与防御力；
- 火焰/冰霜抗性；
- DamageTaken 中间属性。

定义见：

- [WarriorAttributeSet.h:23](Source/CppGOWActionGame/Public/AbilitySystem/WarriorAttributeSet.h:23)

伤害使用自定义 Gameplay Effect Execution Calculation，支持：

- 物理伤害；
- 火焰伤害；
- 冰霜伤害；
- 连段倍率；
- 抗性；
- 状态层数；
- SetByCaller 参数。

实现见：

- [GEExecCalc_DamageTaken.cpp:44](Source/CppGOWActionGame/Private/AbilitySystem/GEExecCalc/GEExecCalc_DamageTaken.cpp:44)

这部分已经具备动作 RPG 框架的基本深度。

---

## 3. C++ 与蓝图的分工

当前分工总体合理：

### C++ 负责

- Character/Component 系统骨架；
- ASC、AttributeSet 和 Ability 基类；
- 伤害公式；
- 输入到 Ability 的路由；
- Combat Component；
- AIController 和感知；
- 自定义 Ability Task；
- 生存波次状态机；
- CommonUI Subsystem；
- 异步资源加载。

### 蓝图负责

- 具体 Hero/Enemy 派生类；
- 具体 GA、GE 和 Gameplay Cue；
- Montage、Anim Blueprint、Linked Anim Layer；
- 武器和启动 Data Asset；
- Behavior Tree；
- Widget Blueprint；
- 地图、GameMode 和视觉表现。

因此项目遵循的是：

> C++ 规定系统如何运行，蓝图配置具体角色、技能、武器和表现。

这比把所有玩法直接堆在 Character Blueprint 中更适合持续扩展。

---

## 4. AI、关卡和数据驱动

AI 层已经具备：

- AI Perception；
- Generic Team；
- Blackboard 目标写入；
- Detour Crowd Avoidance；
- Behavior Tree C++ 扩展。

主要入口：

- [WarriorAIController.h:13](Source/CppGOWActionGame/Public/Controllers/WarriorAIController.h:13)
- [WarriorAIController.cpp:49](Source/CppGOWActionGame/Private/Controllers/WarriorAIController.cpp:49)

生存模式使用状态机、DataTable、Soft Class 和异步预加载：

- [WarriorSurvivalGameMode.h:18](Source/CppGOWActionGame/Public/GameMode/WarriorSurvivalGameMode.h:18)
- [WarriorSurvivalGameMode.cpp:113](Source/CppGOWActionGame/Private/GameMode/WarriorSurvivalGameMode.cpp:113)
- [WarriorSurvivalGameMode.cpp:163](Source/CppGOWActionGame/Private/GameMode/WarriorSurvivalGameMode.cpp:163)

角色启动 Ability 和 Gameplay Effect 也由 Data Asset 驱动：

- [DataAsset_StartUpDataBase.h:15](Source/CppGOWActionGame/Public/DataAssets/StartUpData/DataAsset_StartUpDataBase.h:15)
- [DataAsset_HeroStartUpData.cpp:11](Source/CppGOWActionGame/Private/DataAssets/StartUpData/DataAsset_HeroStartUpData.cpp:11)

说明项目已经形成较明确的数据驱动意识。

---

## 5. 前端 UI 架构

`AdvancedFrontedUI` 是独立的内容型 Runtime 插件，负责主菜单和前端页面：

- [AdvancedFrontedUI.uplugin:13](Plugins/AdvancedFrontedUI/AdvancedFrontedUI.uplugin:13)

主要流程是：

```text
Gameplay Tag
→ Developer Settings 查找 Soft Widget Class
→ FrontendUISubsystem 异步加载
→ CommonUI Widget Stack
→ Activatable Widget
```

相关实现：

- [FrontendDeveloperSettings.h:16](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Public/FontendSettings/FrontendDeveloperSettings.h:16)
- [FrontendUISubsystem.cpp:38](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Private/Subsystems/FrontendUISubsystem.cpp:38)
- [Widget_PrimaryLayout.cpp:6](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Private/Widgets/Widget_PrimaryLayout.cpp:6)

配置也已使用 CommonUI Viewport Client：

- [DefaultEngine.ini:61](Config/DefaultEngine.ini:61)

因此主菜单到 Options 页面的外层导航基础是成立的。

---

## 6. 当前 Options 功能的真实完成度

这是目前工作区的重点，也是当前最明显的问题区域。

| 部分 | 状态 |
|---|---|
| 主菜单打开 Options | 已完成 |
| CommonUI 页面压栈 | 已完成 |
| Back 关闭页面 | 已完成 |
| Options 视觉外壳 | 已完成 |
| TabList 编辑器预览 | 部分完成 |
| 运行时 Tab 注册 | 未闭环 |
| OptionData | 初始骨架 |
| Registry | 未实现 |
| 设置 ListView/Entry | 未实现 |
| 设置读取与保存 | 未实现 |
| Reset | 有输入入口，但逻辑为空 |

### 当前存在确定性编译阻断

Collection 调用了不存在的 `InitDataObject()`：

- [ListDataObject_Collection.cpp:9](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Private/Widgets/OptionData/ListDataObject_Collection.cpp:9)

但 Base 中没有对应声明：

- [ListDataObject_Base.h:14](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Public/Widgets/OptionData/ListDataObject_Base.h:14)

因此当前新增源码一旦真正进入编译，会失败。

现有插件 DLL 和 UHT 生成物早于这些源码，所以“编辑器目前能打开”并不能证明这批 OptionData 代码可编译。

### Collection 查询逻辑错误

Collection 的两个覆盖目前返回基类结果：

- [ListDataObject_Collection.cpp:17](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Private/Widgets/OptionData/ListDataObject_Collection.cpp:17)

基类固定返回空数组和 `false`：

- [ListDataObject_Base.h:28](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Public/Widgets/OptionData/ListDataObject_Base.h:28)

所以即使成功添加了子项，公开查询仍会认为 Collection 没有任何内容。

### Options 页面目前没有数据闭环

`UWidget_OptionScreen` 目前主要注册 Reset 和 Back：

- [Widget_OptionScreen.cpp:12](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Private/Widgets/Widget_OptionScreen.cpp:12)

但缺少：

- TabList 的 `BindWidget`；
- `NativeOnActivated` 数据初始化；
- `OnTabSelected`；
- OptionsDataRegistry；
- ListView；
- Entry Widget 映射；
- 默认焦点；
- 设置 Apply/Save；
- ResettableDataArray。

Reset 回调本身也还是空实现：

- [Widget_OptionScreen.cpp:35](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Private/Widgets/Widget_OptionScreen.cpp:35)

### 仓库中已经有完整参考实现

`code/Source/FrontendUI` 中保留了一套更完整的参考代码，但它**不属于当前活动模块**。

其中已经包含：

- 完整 OptionData 类型层次；
- `UOptionsDataRegistry`；
- String/Scalar/Bool/Resolution；
- Key Remap；
- ListView 与 Entry；
- Details View；
- Reset、Apply 和 Dependency。

例如：

- [参考版 ListDataObject_Base.h:23](code/Source/FrontendUI/Public/Widgets/Options/DataObjects/ListDataObject_Base.h:23)
- [参考版 OptionsDataRegistry.h:14](code/Source/FrontendUI/Public/Widgets/Options/OptionsDataRegistry.h:14)
- [参考版 Widget_OptionsScreen.cpp:19](code/Source/FrontendUI/Private/Widgets/Options/Widget_OptionsScreen.cpp:19)

当前插件看起来是在从这套代码逐步迁移，但目前只迁移到 Base/Collection 骨架阶段。

---

## 7. 构建与依赖风险

### UE 5.5 项目仍使用旧构建兼容设置

两个活动 Target 仍配置为：

- `BuildSettingsVersion.V4`
- `EngineIncludeOrderVersion.Unreal5_3`

位置：

- [CppGOWActionGame.Target.cs:10](Source/CppGOWActionGame.Target.cs:10)
- [CppGOWActionGameEditor.Target.cs:10](Source/CppGOWActionGameEditor.Target.cs:10)

这不一定立即失败，但说明 UE 5.5 迁移尚未完全收尾。仓库里的参考 Target 已经采用 V5 和 Unreal5_5。

### AdvancedFrontedUI 的公共依赖声明不够准确

多个 Public Header 直接暴露 CommonUI 类型，但 `CommonUI` 目前放在 Private dependencies：

- [AdvancedFrontedUI.Build.cs:25](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/AdvancedFrontedUI.Build.cs:25)
- [Widget_ActivatableBase.h:13](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Public/Widgets/Widget_ActivatableBase.h:13)
- [FrontendTabListWidgetBase.h:13](Plugins/AdvancedFrontedUI/Source/AdvancedFrontedUI/Public/Widgets/Components/FrontendTabListWidgetBase.h:13)

这可能在其他模块包含插件 Public Header、非 Unity 构建或独立迁移插件时暴露问题。

插件描述文件也没有声明 CommonUI、CommonInput、EnhancedInput 等插件级依赖。

### PuerTS Build.cs 会写入项目源码树

PuerTS 在 ModuleRules 求值期间复制 Content 和 Typing 文件：

- [JsEnv.Build.cs:170](Plugins/Puerts/Source/JsEnv/JsEnv.Build.cs:170)
- [JsEnv.Build.cs:712](Plugins/Puerts/Source/JsEnv/JsEnv.Build.cs:712)

这意味着编译、生成工程文件或 Target 扫描都可能修改工作区，容易造成：

- Git 自动变脏；
- 构建不确定；
- CI 只读环境失败；
- 插件和项目出现重复文件。

这是当前构建治理里优先级很高的问题。

---

## 8. 仓库卫生状况

当前工作区同时包含：

- UI 功能源码；
- `.uasset` 改动；
- IDE 工作空间文件；
- Rider/DotSettings 用户配置；
- PuerTS C# `obj`；
- TypeScript 缓存。

尤其三个新增源码文件处于 `AM` 状态，意味着暂存区版本和工作区最终版本不同。如果直接提交暂存区，可能提交到不完整版本。

仓库还跟踪了：

- 根 `node_modules`；
- 嵌套 `node_modules`；
- `.idea`；
- C# `obj`；
- TypeScript 缓存。

但现有 [.gitignore](.gitignore) 没有完整覆盖这些目录。仅添加 ignore 规则也不会自动停止跟踪已经入库的文件。

---

## 9. 项目主要优点

1. **GAS 使用深入且方向统一**，不是零散接入。
2. **Gameplay Tag 构成跨系统语义协议**。
3. **Character、Combat、UI、Input 使用组件组合**，避免角色类无限膨胀。
4. **Data Asset、DataTable 和 Soft Reference 使用较充分**。
5. **C++ 与蓝图分工清晰**。
6. **游戏内 HUD 与前端菜单形成了合理边界**。
7. **AI、元素伤害、波次、目标锁定等玩法覆盖比较完整**。
8. **CommonUI 页面栈和异步页面加载方向正确**。

---

## 10. 主要短板

1. 当前 Options 数据模型存在编译错误，功能尚未闭环。
2. 正式玩法代码仍全部集中在单一模块。
3. 没有发现项目级自动化测试或 CI。
4. 没有网络复制基础，目前应按纯单机项目理解。
5. 强制断言较多，资产配置错误时生产容错较弱。
6. 英雄启动数据仍使用同步加载，而敌人和波次已经异步化。
7. `code/Source/FrontendUI` 与正式插件代码并存，容易误改非活动副本。
8. Puerts/ReactUMG 已完整进入仓库，但业务使用仍偏实验性。
9. README 几乎为空，缺少构建、运行和生成流程。
10. 存在多处命名不一致，如 `Fronted`、`FontendSettings`、`Survial` 等；大规模修正需要考虑资产重定向，不适合直接批量重命名。

---

## 建议优先顺序

### P0：先恢复当前 Options 源码可编译

- 补齐 `InitDataObject()`；
- 修正 Collection 的子项查询；
- 增加空指针和自引用保护；
- 做一次完整 Editor Target 构建，而不是依赖旧 DLL。

### P1：打通最小设置页面闭环

先只实现一个简单设置项：

```text
OptionsDataRegistry
→ 顶层 Collection
→ 运行时注册 Tab
→ OnTabSelected
→ ListView
→ 一个 Bool 或 Scalar Entry
```

不要在数据闭环之前继续堆叠蓝图视觉元素。

### P1：隔离仓库污染

- 将 UI 功能提交与 `.idea`、`obj`、TS 缓存分离；
- 补齐 `.gitignore`；
- 再单独决定哪些已跟踪生成物需要取消跟踪；
- 不要直接批量删除 Puerts/Typing/编译后 JS，先明确生成策略。

### P1：修正构建和插件依赖

- 验证 UE 5.5 V5/include-order 迁移；
- 修正 AdvancedFrontedUI 的 Public/Private dependencies；
- 在 `.uplugin` 中显式声明依赖；
- 将 PuerTS 复制步骤移出 ModuleRules。

### P2：补工程化能力

- 添加最小 Editor 编译 CI；
- 添加 OptionData C++ Automation Test；
- 添加 MainMenu/Options Functional Test；
- 文档化 UE、Visual Studio、.NET、Node 和 PuerTS 版本；
- 明确 `code/Source` 是参考代码还是待迁移代码。

---

## 最终评价

这个项目的核心价值在于：**玩法架构已经有清晰主干，且 GAS、Gameplay Tag、数据驱动和 C++/蓝图分工使用得比较成熟。** 当前瓶颈主要是工程化收尾，以及正在迁移的 Options 子系统尚未形成端到端功能。

准确定位是：**一个技术深度明显高于普通原型、核心玩法丰富的 UE5 动作游戏垂直切片，但尚未达到生产级可维护性。**