import * as UE from 'ue'
import * as puerts from 'puerts'

type LocalLLMChatRequest = {
    SystemPrompt: string
    UserPrompt: string
    MaxTokens: number
    Temperature: number
    bDisableThinking: boolean
}

type LocalLLMChatResult = {
    bSuccess: boolean
    Text: string
    Error: string
}

type AudioCppSpeechRequest = {
    Text: string
    Voice: string
    Speaker: string
    MaxTokens: number
    Seed: number
}

type AudioCppSpeechResult = {
    bSuccess: boolean
    WavFilePath: string
    Error: string
}

type LocalAiTestConfig = {
    SystemPrompt: string
    UserPrompt: string
    LlmMaxTokens: number
    Temperature: number
    bDisableThinking: boolean
    Voice: string
    Speaker: string
    TtsMaxTokens: number
    Seed: number
}

type CallbackDelegate = ReturnType<typeof puerts.toDelegate>

type LocalLLMSubsystem = UE.GameInstanceSubsystem & {
    StartServer(): boolean
    GetServerState(): number
    IsServerReady(): boolean
    GenerateChat(request: LocalLLMChatRequest, completed: CallbackDelegate): void
}

type AudioCppSubsystem = UE.GameInstanceSubsystem & {
    StartServer(): boolean
    GetServerState(): number
    IsServerReady(): boolean
    SynthesizeSpeech(request: AudioCppSpeechRequest, completed: CallbackDelegate): void
}

type LocalAIRuntimeTypes = typeof UE & {
    LocalLLMRuntimeSubsystem: { StaticClass(): UE.Class }
    AudioCppRuntimeSubsystem: { StaticClass(): UE.Class }
    LocalLLMChatRequest: new () => LocalLLMChatRequest
    AudioCppSpeechRequest: new () => AudioCppSpeechRequest
    ELocalLLMServerState: { Failed: number }
    EAudioCppServerState: { Failed: number }
}

type TestRuntime = {
    llm: LocalLLMSubsystem
    tts: AudioCppSubsystem
    config: LocalAiTestConfig
    pipelineStarted: boolean
    failed: boolean
    lastLlmState: number
    lastTtsState: number
    llmCompleted?: CallbackDelegate
    ttsCompleted?: CallbackDelegate
}

const LocalAI = UE as unknown as LocalAIRuntimeTypes
const runtimes = new WeakMap<object, TestRuntime>()
const SERVER_STATE_NAMES = ['Stopped', 'Starting', 'Ready', 'Failed']

const DEFAULT_TEST_CONFIG: Readonly<LocalAiTestConfig> = {
    SystemPrompt: '你是一名中世纪村民。只回答一句不超过三十个汉字的话，不要使用 Markdown。',
    UserPrompt: '村里的铁匠今天为什么提前关门？',
    LlmMaxTokens: 96,
    Temperature: 0.6,
    bDisableThinking: true,
    Voice: '',
    Speaker: '',
    TtsMaxTokens: 256,
    Seed: -1
}

/**
 * LocalLLM + AudioCpp 串联测试：LLM 生成一句 NPC 对话，再由 TTS 合成为 WAV。
 */
class LocalAiSubsystemTest extends UE.Actor {
    Constructor(): void {
        this.RootComponent = new UE.SceneComponent(this, 'Root')
        this.PrimaryActorTick.bCanEverTick = true
        this.PrimaryActorTick.bStartWithTickEnabled = false
    }

    /**
     * 从 Blueprint 调用此函数启动测试。所有默认值都在函数内部创建，
     * 不再依赖 TypeScript Blueprint 成员变量的默认值序列化。
     */
    RunLocalAiTest(): void {
        if (runtimes.has(this)) {
            console.warn('[LocalAiTest] 测试已经启动，忽略重复调用。')
            return
        }

        const llm = UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(
            this,
            LocalAI.LocalLLMRuntimeSubsystem.StaticClass()
        ) as LocalLLMSubsystem
        const tts = UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(
            this,
            LocalAI.AudioCppRuntimeSubsystem.StaticClass()
        ) as AudioCppSubsystem

        if (!llm || !tts) {
            console.error(`[LocalAiTest] Subsystem 获取失败：LLM=${!!llm}，TTS=${!!tts}`)
            this.SetActorTickEnabled(false)
            return
        }

        const runtime: TestRuntime = {
            llm,
            tts,
            config: { ...DEFAULT_TEST_CONFIG },
            pipelineStarted: false,
            failed: false,
            lastLlmState: -1,
            lastTtsState: -1
        }
        runtimes.set(this, runtime)
        this.SetActorTickEnabled(true)

        const llmStarted = llm.StartServer()
        const ttsStarted = tts.StartServer()
        console.warn(`[LocalAiTest] 启动服务：LLM=${llmStarted}，TTS=${ttsStarted}`)

        if (!llmStarted || !ttsStarted) {
            runtime.failed = true
            console.error('[LocalAiTest] 至少一个服务启动失败，请检查 Project Settings、可执行文件和模型路径。')
            this.SetActorTickEnabled(false)
        }
    }

    ReceiveTick(_deltaSeconds: number): void {
        const runtime = runtimes.get(this)
        if (!runtime || runtime.pipelineStarted || runtime.failed) return

        const llmState = runtime.llm.GetServerState()
        const ttsState = runtime.tts.GetServerState()
        if (llmState !== runtime.lastLlmState || ttsState !== runtime.lastTtsState) {
            runtime.lastLlmState = llmState
            runtime.lastTtsState = ttsState
            console.warn(
                `[LocalAiTest] 服务状态：LLM=${this.serverStateName(llmState)}，` +
                `TTS=${this.serverStateName(ttsState)}`
            )
        }

        if (llmState === LocalAI.ELocalLLMServerState.Failed ||
            ttsState === LocalAI.EAudioCppServerState.Failed) {
            runtime.failed = true
            console.error('[LocalAiTest] 服务进入 Failed 状态，测试终止。请查看此前的 LogTemp Error。')
            this.SetActorTickEnabled(false)
            return
        }

        if (runtime.llm.IsServerReady() && runtime.tts.IsServerReady()) {
            runtime.pipelineStarted = true
            this.SetActorTickEnabled(false)
            this.generateDialogue(runtime)
        }
    }

    ReceiveEndPlay(_endPlayReason: UE.EEndPlayReason): void {
        runtimes.delete(this)
    }

    // @no-blueprint
    private generateDialogue(runtime: TestRuntime): void {
        const request = new LocalAI.LocalLLMChatRequest()
        request.SystemPrompt = runtime.config.SystemPrompt
        request.UserPrompt = runtime.config.UserPrompt
        request.MaxTokens = runtime.config.LlmMaxTokens
        request.Temperature = runtime.config.Temperature
        request.bDisableThinking = runtime.config.bDisableThinking

        console.warn(`[LocalAiTest] 请求 LLM：${request.UserPrompt}`)
        runtime.llmCompleted = puerts.toDelegate(this, (result: LocalLLMChatResult) => {
            if (!result.bSuccess) {
                runtime.failed = true
                console.error(`[LocalAiTest] LLM 失败：${result.Error}`)
                return
            }

            console.warn(`[LocalAiTest] LLM 回答：${result.Text}`)
            this.synthesizeDialogue(runtime, result.Text)
        })
        runtime.llm.GenerateChat(request, runtime.llmCompleted)
    }

    // @no-blueprint
    private synthesizeDialogue(runtime: TestRuntime, text: string): void {
        const request = new LocalAI.AudioCppSpeechRequest()
        request.Text = text
        request.Voice = runtime.config.Voice
        request.Speaker = runtime.config.Speaker
        request.MaxTokens = runtime.config.TtsMaxTokens
        request.Seed = runtime.config.Seed

        console.warn(`[LocalAiTest] 请求 TTS：${text}`)
        runtime.ttsCompleted = puerts.toDelegate(this, (result: AudioCppSpeechResult) => {
            if (!result.bSuccess) {
                runtime.failed = true
                console.error(`[LocalAiTest] TTS 失败：${result.Error}`)
                return
            }

            console.warn(`[LocalAiTest] 测试成功，WAV：${result.WavFilePath}`)
        })
        runtime.tts.SynthesizeSpeech(request, runtime.ttsCompleted)
    }

    // @no-blueprint
    private serverStateName(state: number): string {
        return SERVER_STATE_NAMES[state] ?? `Unknown(${state})`
    }
}

export default LocalAiSubsystemTest
