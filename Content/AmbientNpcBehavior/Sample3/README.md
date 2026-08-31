# W1-02：春溪营地三人样板

版本：`camp.schema_version = 1`。目标：用一个互相依赖的采集生存小团体，验证人物状态、关系和世界事实的数据定义。不是已经实现的完整社会模拟。

**W1-03 已补充 ReactUMG 状态面板和固定初值重置。** 可直接打开 `/Game/AmbientNpcBehavior/Sample3/L_AmbientNpcSample3` 后Play，使用说明见 `TypeScript/AmbientNpcCampPanel.README.md`。下文“验证记录”保留W1-02交付当时的范围，W1-03的UE实测报告另存于 `Saved/W1-03/`。

用户确定：三人采集生存；翠花与狗蛋互相喜欢；牛二喜欢翠花、讨厌狗蛋，会挖苦狗蛋并向翠花调情；春天、晴天。职业、年龄、秘密和下列具体数值为本次设计的可调初值。

## 三名居民

| ID / 人物 | 生存分工 | 初始私人口粮 | 崇拜值 | 心情 | 私人秘密 |
| --- | --- | ---: | ---: | ---: | --- |
| `cuihua` / 翠花，24岁 | 采集野菜、辨药、照料小伤病 | 3（稳定） | 40（中立） | 10 | 珍藏狗蛋送的木鱼挂坠，藏在药袋里睡前看 |
| `goudan` / 狗蛋，25岁 | 岸边捕鱼、编鱼笼、修补工具和棚屋 | 1（拮据） | 80（虔诚） | 10 | 曾溺水获救，隐瞒怕深水，把获救归功于神 |
| `niuer` / 牛二，27岁 | 狩猎、制作肉干、搬柴、营地警戒 | 8（相对富足） | 10（不敬神） | 0 | 八份私人口粮中的两份藏在营地外，留作后手或送翠花 |

三人承认神存在，但崇拜程度不同。狗蛋不去深水区与“岸边渔夫”的职业并不冲突。牛二的秘密不是公共仓库失窃，不自动构成神罚事件。翠花有自己的选择，不会因为牛二提供物资就接受追求。

生存依赖：翠花需要鱼肉、柴火和工具；狗蛋需要木料、草药与野菜；牛二需要修补工具和处理伤口。共享营地和补给形成合作，私人储备和感情分歧提供冲突。不引入村长、商店或货币经济。

## 初始关系（方向不能互换）

| 从 → 到 | 好感 affection | 恋爱倾向 attraction | 信任 trust |
| --- | ---: | ---: | ---: |
| 翠花 → 狗蛋 | 75 | 85 | 80 |
| 狗蛋 → 翠花 | 80 | 90 | 85 |
| 牛二 → 翠花 | 70 | 85 | 45 |
| 翠花 → 牛二 | 10 | 0 | 35 |
| 牛二 → 狗蛋 | -65 | 0 | 20 |
| 狗蛋 → 牛二 | -25 | 0 | 35 |

好感与恋爱倾向分开：翠花能认可牛二的生存贡献，但不喜欢他的追求。牛二的喜欢也不代表翠花回应。数值表达状态，不代表已经实现聊天后的自动增减规则。

## 初始世界

- 春天 `spring`、晴天 `clear`，资源丰度系数 `1.0`（正常）；没有活动事件。
- 公共储备：食物18份、饮水12份、柴火8捆、草药3份。
- 私人口粮合计12份，与公共储备分开计数；牛二藏的2份已经包含在他的8份里。
- 消耗设计基准：每人每游戏日1份食物、1份饮水。仅靠公共储备、不补给时，食物支持6天、饮水支持4天；本卡只定义数值，尚未自动消耗或结算采集产出。
- 沿用日程演示时间：120现实秒等于24游戏小时，从第1日00:00开始。未引入新的世界时钟；06:00起陆续工作。没有随机日程偏移，便于重复检查。
- 职业工作仍映射到现有 Action 1“工作”，并不表示已经执行了捕鱼、采药或打猎。精力仍由原日程逻辑处理。

## 数据字典与归属

所有路径均以工程目录为基准。稳定 ID 不随显示名改变。数值是策划初值，不由 LLM 决定。

| 字段 | 含义 / 合法值 | 初始来源与运行边界 |
| --- | --- | --- |
| `npcs[].id/name/profession` | 稳定英文ID、显示名、职业描述 | 本 JSON；尚不等于场景 Actor 的实体ID |
| `npcs[].profile` | 年龄、性格、贡献、说话方式、信仰态度和敏感话题 | 静态人物设定；年龄整数18～120，本样板三人均成年 |
| `npcs[].initial_state.personal_food` | 可支配口粮份数，非负安全整数；不是金币或饥饿值 | 运行副本位于 `runtime.camp.residents[id]`；后续经济逻辑修改副本 |
| `initial_state.worship` | 0～100，0不崇拜、100极虔诚，不表示神是否存在 | 同上；后续神迹、事件规则更新 |
| `initial_state.mood` | -100～100，负数低落、0平静、正数愉快 | 同上；后续事件更新，不是表情动画枚举 |
| `energy.max/initial` | 正数上限、0～上限的初始精力 | 保留已有日程实现；当前每天重建精力，不影响营地社会状态 |
| `sequence_id/events[].node_id` | 引用现有 sequence/node；时间HH:mm | 原TS校验引用并推进日程；样板固定顺序、无jitter |
| `camp.schema_version/id/name/premise` | 数据契约版本1、营地稳定ID、显示名和场景设定 | 版本不兼容时拒绝加载，不静默忽略 |
| `camp.initial_world.season` | spring / summer / autumn / winter | 初值spring；仅状态数据，未驱动视觉季节 |
| `camp.initial_world.weather` | clear / rain / storm / snow | 初值clear；仅状态数据，未驱动天气组件 |
| `resource_abundance` | 0～2，1为正常丰度 | 后续采集产出乘数，目前不结算 |
| `shared_resources` | food份 / water人日份 / wood捆 / herbs份，均非负安全整数 | 公共库存，与个人库存分开；后续资源结算更新 |
| `daily_consumption_per_resident` | food / water 的每日人均消耗，非负安全整数 | 设计参数，目前不自动扣除 |
| `active_event_ids` | 当前必须为空数组 | 尚未定义事件执行器，拒绝未知事件ID |
| `relationships[].from/to` | 已有居民的两个不同ID；每个方向只能一条 | 三人必须有6条；不能默认对称 |
| `affection/attraction/trust` | 好感-100～100 / 恋爱倾向0～100 / 信任0～100 | 运行副本位于 `runtime.camp.relationships`；尚未实现关系结算 |
| `facts[].id/text` | 唯一事实ID、事实文本 | 初始事实；世界变化后需由后续事实维护逻辑修订旧描述 |
| `facts[].subject_ids` | 事实涉及的人，不等于知情人；世界事实可为空 | 引用必须存在 |
| `facts[].visibility/known_by` | public所有人知道；private仅指定居民知道 | private必须列出非空知情人；禁止用“涉及的人”推断其知道 |

原 `DataDriven/schema.json` 中的 `social` 是行为框架标量，不是这里的关系矩阵。营地经济/关系由TS保存初始运行副本，不伪装成已接入原生实体状态。

## 事实与秘密的使用规则

8条初始事实：4条公开事实、4条私有事实。私有事实包含双方私下表达好感，以及每人一个秘密。

- `mutual_affection`：只有翠花、狗蛋知道他们私下表达过好感；牛二知道两人亲近，不知道那次表达。
- `cuihua_keeps_wooden_fish`：只有翠花知道。狗蛋是事实涉及人，但不知道她珍藏挂坠。
- `goudan_fears_deep_water`：只有狗蛋知道。
- `niuer_hidden_jerky`：只有牛二知道。

后续组装某居民的 LLM 上下文时，必须只取公开事实，以及 `known_by` 包含该居民ID的私有事实；其他人的完整档案和所有方向的关系数值也不能直接作为该居民的全知知识。不得把整份 JSON 直接塞给每个居民。当前没有改变 LLM 提示词或自动接入事实过滤；这些是对话接入时的实现要求，元数据本身不是访问控制。

## 如何使用

1. 已创建 `DA_AmbientNpcSample3Config.uasset`。它复用 `DataDriven/` 下的 `schema.json`、`sequences.json`、`actions.json`、`environmental_conditions.json`，仅将日程路径改到本目录 `daily_schedule.json`。
2. 在测试地图里使用 `BP_AmbientNpcDataDrivenScheduleDemo`，将该实例的 **Config** 指定为 `DA_AmbientNpcSample3Config`。保留原十人配置，可随时切回。此次未修改现有地图或蓝图默认值。
3. 如果编辑了TS，在工程目录执行 `tsc --project tsconfig.json`，确保 Puerts 加载更新后的 `Content/JavaScript`；结束并重新进入PIE，已有实例不保证热更新。
4. 新样板加载时应出现 `[AmbientNpcCamp] 春溪营地 | residents=3 | relationships=6 | season=spring | weather=clear | 初始数据已加载`，以及原五配置日程日志。此条是预期PIE日志；本次已经在Node/VM里验证同一加载代码，但未完成PIE验收。
5. `createInitialCampState(daily)` 校验并深复制模板。午夜的 `beginDay` 不调用它。W1-03已接查看面板和显式重置按钮；重置读取启动时保存的固定模板，不直接重读磁盘。完整参数编辑器留给后续任务。

重新生成资产可在启用 PythonScriptPlugin、EditorScriptingUtilities 的UE Python环境执行 `Scripts/CreateSample3Config.py`。脚本只创建该样板资产；若已有资产配置不同则报错，避免覆盖手动修改。命令行运行时用 `-SCCProvider=None`，避免UE源控插件自动暂存新资产。不需要修改工程的插件启用配置。

## 验证记录与限制

2026-08-31，UE `5.8.2-56702186+++UE5+Release-5.8`：

- `tsc --project tsconfig.json --noEmit`：通过。
- `node Scripts/TestSample3Config.cjs`：18项通过。覆盖3人/6条关系、模板和实例隔离、跨两次午夜保留社会状态、十人旧配置兼容，以及错误ID、缺失关系、越界数值、私有知情人和错误日程引用的拒绝。
- UE Python commandlet：真实创建并保存 Data Asset，再启动第二个UE进程从磁盘读取、核对属性及五份JSON，均为0错误。第二次的2条警告是原有Python类型重名（DamageType、MyClass）。详细报告在工程的 `Saved/W1-02/asset-validation.json`，离线报告在 `Saved/W1-02/data-validation.json`；运行日志 `Saved/Logs/W1-02-CreateAsset.log` 和 `Saved/Logs/W1-02-VerifyAsset.log`。
- 本次未编译C++、未修改现有地图、未验证可视化PIE或打包。离线测试的UE加载方法为替身，不证明UE场景中的人物与语音链路已接通。
- 原 `pairing: sequential` 仍按数组顺序两两配对，三人同时空闲时有一人不参与；此处仅记录配对日志，不会自动让牛二插话。三角关系驱动的交互调度属于后续任务。
- 图服务传输中断，覆盖率检查未完成；本次根据相关源码、资产及本地运行验证，没有进行全仓库审计。

本卡完成的是**人物与初始世界数据，以及其加载校验**。采集产出、消耗、调情/挖苦后的关系变化、秘密泄露、神迹反馈、角色Actor绑定、LLM/TTS和UI表现不在本卡完成声明内。
