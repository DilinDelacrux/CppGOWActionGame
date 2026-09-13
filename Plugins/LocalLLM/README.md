# Alibaba Cloud Qwen UE runtime plugin

`ULocalLLMRuntimeSubsystem` keeps its existing Blueprint/C++ API but now calls Alibaba Cloud Model Studio asynchronously instead of starting a local llama.cpp process.

## Setup

1. Enable Model Studio in the Beijing region and create an API key.
2. Store the key in the `DASHSCOPE_API_KEY` environment variable, then restart Unreal Editor.
3. In **Project Settings > Plugins > Alibaba Cloud Qwen**, keep `Model Id` as `qwen-flash` for inexpensive, low-latency NPC dialogue.
4. Existing code may call `StartServer`, check `IsServerReady`, and call `GenerateChat`. `StartServer` now only validates cloud configuration and returns immediately.

Run a direct connectivity check from the project root:

```powershell
.\Scripts\TestQwenApi.ps1
```

Keep `bDisableThinking` enabled for short NPC dialogue. Do not store a production API key in project config or ship it in a public game build; use a backend relay or short-lived credentials before distribution.
