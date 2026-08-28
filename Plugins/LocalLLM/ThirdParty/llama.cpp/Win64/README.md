# llama.cpp Windows runtime

Place the CUDA-enabled `llama-server.exe` release and every DLL from the same release in this directory. The build rules stage `.exe` and `.dll` files as NonUFS runtime dependencies.

The default server command is configured by `ULocalLLMSettings` and expects `llama-server.exe`.
