# Local LLM UE runtime plugin

`ULocalLLMRuntimeSubsystem` runs a bundled CUDA-enabled `llama-server.exe` and calls its local OpenAI-compatible `/v1/chat/completions` endpoint asynchronously.

## Setup

1. Put `llama-server.exe` and its matching CUDA/DLL runtime files under `ThirdParty/llama.cpp/Win64`.
2. Put `Qwen3-4B-Q4_K_M.gguf` under `Content/LocalLLM/Models`.
3. In **Project Settings > Plugins > Local LLM Runtime**, set the model path if it differs from the project default.
4. Call `StartServer`, wait until `IsServerReady` is true, then call `GenerateChat`.

`GenerateChat` disables Qwen3's reasoning mode by default (`/no_think`). Keep it enabled for short NPC dialogue; enable reasoning only for an explicitly slower, more complex task.

## NPC dialogue contract

Use deterministic game code to select the NPC pair, scene, topic, and relationship state. Pass those facts in `SystemPrompt` and ask for a short JSON payload in `UserPrompt`. Keep output below 96 tokens and cache completed dialogue before handing each line to AudioCpp for TTS.

The model file is staged loose as NonUFS because llama.cpp needs an OS file path at runtime.
