# Local LLM + TTS Subsystem 测试

`LocalAiSubsystemTest.ts` 会自动完成以下流程：

1. 从当前 GameInstance 获取 `LocalLLMRuntimeSubsystem` 和 `AudioCppRuntimeSubsystem`。
2. 调用两个 Subsystem 的 `StartServer()`。
3. 等待两个服务都进入 `Ready`。
4. 调用 LLM 生成一句中世纪 NPC 对话。
5. 把 LLM 返回文本交给 TTS。
6. 在 Output Log 输出生成的 WAV 绝对路径；文件位于 `Saved/AudioCpp/Generated`。

## 使用方式

1. 确认 LocalLLM 与 AudioCpp 的 Project Settings 已配置可执行文件、模型和端口。
2. 同步 TypeScript Blueprint，得到 `/Game/Asset/TsBlueprints/LocalAiSubsystemTest`。
3. 把该 Actor 放进测试关卡，并且只放一个实例。
4. PIE 后在 Output Log 搜索 `[LocalAiTest]`。

在蓝图中调用 `Run Local AI Test` 即可启动；这份最小测试脚本的参数默认值定义在函数内部，不依赖 TypeScript Blueprint 成员默认值序列化。需要从蓝图传入角色、提示词、Voice/Speaker 并取得可播放声音时，请使用 `NPCSubsystem` 提供的异步对话节点。脚本不会在 EndPlay 主动关闭服务，方便连续 PIE 复用由 GameInstanceSubsystem 管理的进程。
