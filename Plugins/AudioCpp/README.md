# Audio.cpp UE runtime plugin

This plugin runs `audiocpp_server.exe` locally and gives Blueprints/C++ a `UAudioCppRuntimeSubsystem` for offline TTS.

## Setup

1. Put the tested `audiocpp_server.exe` and its DLLs into `ThirdParty/audio.cpp/Win64`.
2. Download an **audio.cpp-native** TTS GGUF model separately, then configure its real file path in **Project Settings > Plugins > Audio.cpp Local Runtime**. Do not substitute another project's same-named GGUF conversion.
3. Configure the model family/id to match your audio.cpp server build. The defaults target Qwen3-TTS CustomVoice (`qwen3-tts-customvoice` / `qwen3_tts`).
4. At game startup, call `StartServer`; wait until `GetServerState` returns `Ready`.
5. Call `SynthesizeSpeech`. Its callback returns a WAV written to `Saved/AudioCpp/Generated`.

The plugin never contacts an online API. It binds the child process to `127.0.0.1` and sends requests to it over localhost.

## Packaging the model

Model weights must remain loose files because audio.cpp reads them by an OS path. Stage your chosen model directory as `NonUFS` through Project Settings > Packaging > Additional Non-Asset Directories to Copy, then set `Model File Path` to the equivalent file under the installed game.

For Qwen3-TTS CustomVoice, ship the GGUF together with the model metadata/tokenizer files required by the audio.cpp builtin model spec: `config.json`, `generation_config.json`, `preprocessor_config.json`, `tokenizer_config.json`, `vocab.json`, `merges.txt`, and the `speech_tokenizer` metadata directory. The supplied project configuration stages `Content/AudioCpp/Models` as loose NonUFS content.
