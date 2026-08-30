# llama.cpp Windows runtime

Run `Plugins/LocalLLM/SetupRuntime.ps1` from PowerShell to install the pinned official llama.cpp Windows Vulkan runtime. The current tested release is `b10621`.

The build rules stage `llama-server.exe` and its DLLs as NonUFS runtime dependencies. Runtime binaries are ignored by Git, so rerun the setup script after cloning or cleaning ignored files.

The default server command is configured by `ULocalLLMSettings` and expects `llama-server.exe`.
