# CosyVoice Cloud TTS UE runtime plugin

The module keeps its original `AudioCppRuntime` name so existing C++ and Blueprint references remain valid, but it now calls Alibaba Cloud Model Studio instead of launching a local `audio.cpp` process.

## Setup

1. Enable Alibaba Cloud Model Studio in the Beijing region and create a CosyVoice v3.5 Flash voice for each character.
2. Set `DASHSCOPE_API_KEY` in the environment that launches Unreal Editor, then restart the editor.
3. In **Project Settings > Plugins > CosyVoice Cloud TTS**, set `Default Voice` and add each game character id/name to `Character Voices` with its CosyVoice voice id.
4. For lower mainland-China latency, replace `ApiUrl` with the workspace-specific endpoint shown by Model Studio: `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/api/v1/services/audio/tts/SpeechSynthesizer`.
5. Existing code may keep calling `StartServer`, wait for `Ready`, and call `SynthesizeSpeech`. `StartServer` now validates cloud configuration and returns immediately.

After creating the first voice, verify the account and voice id without opening Unreal:

```powershell
.\Scripts\TestCosyVoiceApi.ps1 -VoiceId "your_voice_id"
```

`Voice` on a speech request takes priority. Otherwise `Speaker` is looked up in `Character Voices`; when no mapping exists it is treated as a raw CosyVoice voice id. The generated WAV is cached under `Saved/AudioCpp/Generated` by model, voice, and text, so repeated dialogue has no API cost or network delay.

Do not store a production API key in project config or ship it in a public game build. Use a backend relay or short-lived credentials before distribution.
