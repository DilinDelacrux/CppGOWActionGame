# AmbientNpcBehavior FAQ

## Puerts 显示已绑定模块，但 `ReceiveBeginPlay` 和 `ReceiveTick` 没有任何日志

### 现象

Output Log 中能看到类似内容：

```text
Puerts: Bind module [AmbientNpcDailyScheduleDemo]
```

但 `AmbientNpcDailyScheduleDemo.ts` 中的 `ReceiveBeginPlay()`、`ReceiveTick()` 都没有打印，日程状态也不更新。

### 原因

项目内曾同时存在两份 AmbientNpcBehavior 类型声明：

- Puerts 自动生成的 `Typing/ue/ue.d.ts`
- 手工维护的 `TypeScript/ambient_npc.d.ts`

这会触发 `Duplicate identifier` TypeScript 错误，导致 Puerts 的自动分析与 TypeScript Blueprint 事件桥接无法可靠刷新。模块虽然被加载，但生命周期事件可能不会进入 TS。

### 修复

1. 删除手工声明 `TypeScript/ambient_npc.d.ts`。
2. 只使用 Puerts 自动生成的 `Typing/ue/ue.d.ts`。
3. 在 `tsconfig.json` 启用：

   ```json
   "skipLibCheck": true
   ```

4. 运行 TypeScript 校验：

   ```powershell
   npx tsc --noEmit
   ```

5. 重启 Unreal Editor，让 Puerts Auto Mode 重新分析 TS 并刷新 `AmbientNpcDailyScheduleDemo` 蓝图。

### 验证结果

进入 PIE 后，Output Log 应至少出现：

```text
[AmbientNpcSchedule] 日程 Demo 启动：120 秒 = 游戏内 24 小时...
```

随后每秒会有 NPC 状态变化或新的放松对话日志。

### 相关配置

`BehaviorFrameworkConfig` 的文件路径支持相对于项目根目录的写法：

```text
Plugins/AmbientNpcBehavior/Configs/schema.json
Plugins/AmbientNpcBehavior/Configs/sequences.json
Plugins/AmbientNpcBehavior/Configs/actions.json
Plugins/AmbientNpcBehavior/Configs/environmental_conditions.json
Saved/Logs/ambient_npc_schedule.log
```

并确保场景中的 `BP_AmbientNpcDailyScheduleDemo` 已设置 `Config` 数据资产。
