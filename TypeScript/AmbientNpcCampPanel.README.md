# W1-03：ReactUMG 最小状态面板

## 直接运行

在UE内容浏览器打开 `/Game/AmbientNpcBehavior/Sample3/L_AmbientNpcSample3`，点击 Play。

这个独立测试关卡已经放置一个 `BP_AmbientNpcDataDrivenScheduleDemo`，并指定 `DA_AmbientNpcSample3Config`。会自动显示左侧 ReactUMG 面板，不需要手建 WBP 或另放一个 UI Actor。地图使用空场景，只用于检查数据和UI；三名居民目前是日程中的逻辑居民，不是三个可见的角色Actor。

在其他地图使用时，只需给已有的 `BP_AmbientNpcDataDrivenScheduleDemo` 实例设置同一份样板 Config。不要同时放多个管理器或另一个全屏菜单。原十人配置没有 camp 字段，不会自动显示这个面板。原演示地图和蓝图默认值没有被改动。

TS / TSX 编译后重进 PIE；不依赖运行中的实例热更新：

```powershell
tsc --project tsconfig.json
tsc --project tsconfig.react-umg.json
```

## 面板功能

- 翠花、狗蛋、牛二三个选择按钮。选择值为稳定 ID，不以名字或数组位置查状态。
- 显示游戏日/时间、春夏秋冬、天气、资源丰度和公共库存。
- 显示所选居民的ID、职业、行为、精力、私人口粮、崇拜、心情，以及指向另外两人的好感/恋爱倾向/信任。
- **暂停日程 / 继续日程**：停止/恢复这套TS日程时钟与精力消耗，不是全局暂停游戏，也不承诺停止地图中其他系统。
- **恢复初始状态**：恢复本轮开始时加载的固定模板，回到第1日00:00并暂停；恢复精力、名字、个人/公共物资、关系、信仰、天气、事实和活动事件。选中的ID保留。修改磁盘JSON后需重新进入PIE才会采用新的初值。
- 重置同时重启原生行为框架、清空TS配对记录；不生成Actor、不叠加管理器或UI。没有引入新的LLM/TTS请求；其他系统独立运行的生成任务不属于此处重置范围。
- 主体可滚动，操作按钮固定在底部；使用 Game and UI 输入模式，显示鼠标。

这是状态查看和重置入口，不是参数编辑器。资源消耗/产出、天气视觉、三角恋行为、秘密泄露和对话接入仍由后续任务实现。

## 状态来源与生命周期

`AmbientNpcDataDrivenScheduleDemo.ts` 的 `runtime.camp` 是社会与世界状态的唯一运行来源；精力、动作和时钟沿用同一管理器的日程运行状态。`campSnapshot()` 返回副本用于显示，UI只保存选中ID和显示快照，不持有另一套可修改的世界状态。

`initialDailyJson` 保存启动时读到的原始日程模板。`resetCamp()` 从它重建运行数据，避免运行中的改名、上一轮事件、私有事实变化或磁盘临时编辑污染初值。重置失败会在面板显示错误，不把框架初始化失败当作成功。

面板不使用轮询计时器：日程推进时推送刷新；按钮操作立即刷新。管理器 EndPlay 时卸载React树、移除UMG根节点与回调，清除对应实例缓存。关闭时恢复原鼠标显示值并回到Game Only；当前最小面板假定是这个测试关卡唯一的交互UI。

原ReactUMG只移除视口但没有卸载React树，本次补上卸载、递归解绑和容器移除，以防结束游玩后留下旧回调。没有重写渲染器。该版本不实现 `insertBefore`，关系显示使用固定文本区域更新，不在切换NPC时插入新的关系行。

## 文件

- UI：`TypeScript/AmbientNpcCampPanel.tsx`。
- 状态读取、重置和挂载：`TypeScript/AmbientNpcDataDrivenScheduleDemo.ts`。
- 初始数据：`Content/AmbientNpcBehavior/Sample3/daily_schedule.json`。
- 行为与世界字段说明：`Content/AmbientNpcBehavior/Sample3/README.md`。
- 关卡创建/核对脚本：`Scripts/CreateSample3Level.py`，用于UE Python commandlet。已有关卡只检查，不覆盖修改。需要 PythonScriptPlugin、EditorScriptingUtilities；命令行使用 `-SCCProvider=None` 避免源控自动暂存。
- 对应 `Content/JavaScript` 编译产物已更新。

## 已验证（2026-08-31，UE 5.8.2）

- 工程TS与ReactUMG渲染器类型检查通过。
- `node Scripts/TestSample3Config.cjs`：原W1-02的18项检查继续通过。
- `node Scripts/TestCampState.cjs`：6项检查通过，含100次连续重置、改名ID稳定、状态快照隔离、暂停恢复、旧事件清理及原生框架失败反馈。此组原生UE方法使用替身。
- `node Scripts/TestCampPanelUE.cjs 9337`：独立UE游戏进程11项检查与EndPlay清理通过；调用实际UMG按钮委托，检查原生控件文字、框架重启、管理器数量、居民ID和状态来源。此组不是浏览器或模拟UI，也不是物理鼠标点击测试。
- 已人工检查1280×720的真实渲染截图；按钮、中文、选中状态、属性和重置反馈可见。未进行打包、多玩家、屏幕阅读器或其他分辨率适配验收。
- 验证报告：`Saved/W1-03/state-validation.json`、`ui-validation.json`、`level-validation.json`。
- 截图：`Saved/Screenshots/WindowsEditor/W1-03-panel.png`。
- 最终UE日志：`Saved/Logs/W1-03-PanelSmoke-Final.log`；不含Puerts运行错误。已有Steam未配置和LatentInfo导入提示仍存在，不影响本次面板检查。

原生UI测试必须针对独立测试进程：启动此关卡时使用 `-game -RenderOffscreen -windowed -ResX=1280 -ResY=720 -JsEnvDebugPort=9337 -ini:Puerts:[/Script/Puerts.PuertsSetting]:DebugEnable=True`，再运行上述Node脚本。它会改动该进程的临时状态、重置、截图并销毁测试管理器；**不要对自己正在编辑或游玩的进程执行**。调试开关只通过该测试进程命令行启用，没有写入工程配置，验证结束后应关闭测试进程。
