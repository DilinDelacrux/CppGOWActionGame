import * as UE from 'ue'

type Jitter = { min: number, max: number }
type StateEffect = { target_id_name: string, state_key_name: string }
type ActionDef = {
    action_id: number
    action_name: string
    preconditions: StateEffect[]
    immediate_effects: StateEffect[]
    completion_effects: StateEffect[]
    interruption_effects: StateEffect[]
}
type SequenceNode = { node_id: number, node_type: string, target_action_id?: number }
type SequenceDef = { sequence_id: number, sequence_name: string, nodes: SequenceNode[] }
type ScheduleEvent = { at: string, node_id: number, jitter_minutes?: Jitter }
type NpcSchedule = { id: string, name: string, profession: string, sequence_id: number, events: ScheduleEvent[] }
type InteractionRule = { when_action_id: number, conversation_action_id: number, pairing: 'sequential' }
type DailyConfig = { day_duration_seconds: number, interaction_rules: InteractionRule[], npcs: NpcSchedule[] }

type ResolvedEvent = { minute: number, actionId: number, actionName: string }
type NpcRuntime = NpcSchedule & { resolvedEvents: ResolvedEvent[], currentActionId?: number }
type Runtime = {
    elapsed: number
    day: number
    dayDuration: number
    lastLoggedSecond: number
    frameworkStatusLogged: boolean
    actions: Map<number, ActionDef>
    sequences: Map<number, SequenceDef>
    environmentNames: Map<number, string>
    sourceNpcs: NpcSchedule[]
    rules: InteractionRule[]
    npcs: NpcRuntime[]
    activeInteractions: Set<string>
}

type ConfigLoader = {
    LoadSchemaJson(): string
    LoadSequencesJson(): string
    LoadActionsJson(): string
    LoadEnvironmentalConditionsJson(): string
    LoadDailyScheduleJson(): string
}

const runtimes = new WeakMap<object, Runtime>()
const invalidInstances = new WeakSet<object>()
const MINUTES_PER_DAY = 24 * 60

/**
 * 五配置文件数据驱动 Demo。
 * daily_schedule 只记录时间与 sequence/node 引用；实际行为名称来自
 * actions，节点关系来自 sequences，状态键由 schema 校验，游戏分钟由
 * environmental_conditions 声明并通过 QueryEnvironmentalCondition 提供。
 */
class AmbientNpcDataDrivenScheduleDemo extends UE.BehaviorFrameworkManagerBase {
    ReceiveBeginPlay(): void {
        const runtime = this.runtime()
        if (!runtime) return

        console.warn(`[AmbientNpcSchedule] 五配置数据驱动 Demo 启动：${runtime.dayDuration} 秒 = 游戏内 24 小时。`)
        this.beginDay(runtime)
        this.update(runtime, 0)
    }

    ReceiveTick(deltaSeconds: number): void {
        const runtime = this.runtime()
        if (!runtime) return

        if (!runtime.frameworkStatusLogged) {
            runtime.frameworkStatusLogged = true
            console.warn(`[AmbientNpcSchedule] 5/5 配置已解析；AmbientNpcBehavior 初始化=${this.IsInitialized()}`)
        }

        runtime.elapsed += deltaSeconds
        while (runtime.elapsed >= runtime.dayDuration) {
            runtime.elapsed -= runtime.dayDuration
            runtime.day++
            runtime.lastLoggedSecond = -1
            runtime.activeInteractions.clear()
            this.beginDay(runtime)
        }

        const second = Math.floor(runtime.elapsed)
        if (second === runtime.lastLoggedSecond) return
        runtime.lastLoggedSecond = second
        this.update(runtime, this.gameMinute(runtime))
    }

    QueryEnvironmentalCondition(conditionKey: number): number {
        const runtime = this.runtime()
        if (!runtime) return 0
        return runtime.environmentNames.get(conditionKey) === 'game_minute' ? this.gameMinute(runtime) : 0
    }

    private update(runtime: Runtime, minute: number): void {
        const now = this.formatTime(minute)
        for (const npc of runtime.npcs) {
            const event = this.eventAt(npc, minute)
            if (event.actionId !== npc.currentActionId) {
                npc.currentActionId = event.actionId
                console.warn(`[AmbientNpcSchedule] 第 ${runtime.day + 1} 日 ${now} | ${npc.name}（${npc.profession}）→ ${event.actionName} [Action ${event.actionId}]`)
            }
        }
        this.runInteractionRules(runtime, now)
    }

    private beginDay(runtime: Runtime): void {
        console.warn(`[AmbientNpcSchedule] 第 ${runtime.day + 1} 日：从 sequence/node 引用生成当天行为。`)
        runtime.npcs = runtime.sourceNpcs.map((sourceNpc, npcIndex) => {
            const sequence = runtime.sequences.get(sourceNpc.sequence_id)!
            const nodes = new Map(sequence.nodes.map(node => [node.node_id, node]))
            const resolvedEvents = sourceNpc.events.map((event, eventIndex) => {
                const node = nodes.get(event.node_id)!
                const action = runtime.actions.get(node.target_action_id!)!
                const baseMinute = this.parseTime(event.at)
                const offset = event.jitter_minutes
                    ? this.dailyOffset(runtime.day, npcIndex, eventIndex, event.jitter_minutes)
                    : 0
                if (offset !== 0) {
                    console.warn(`[AmbientNpcSchedule] ${sourceNpc.name} | ${action.action_name}：${this.formatTime(baseMinute + offset)}（${offset > 0 ? '+' : ''}${offset} 分钟）`)
                }
                return { minute: baseMinute + offset, actionId: action.action_id, actionName: action.action_name }
            }).sort((first, second) => first.minute - second.minute)
            return { ...sourceNpc, resolvedEvents }
        })
    }

    private eventAt(npc: NpcRuntime, minute: number): ResolvedEvent {
        let current = npc.resolvedEvents[0]
        for (const event of npc.resolvedEvents) {
            if (event.minute > minute) break
            current = event
        }
        return current
    }

    private runInteractionRules(runtime: Runtime, now: string): void {
        const currentInteractions = new Set<string>()
        runtime.rules.forEach((rule, ruleIndex) => {
            const matching = runtime.npcs.filter(npc => npc.currentActionId === rule.when_action_id)
            for (let index = 0; index + 1 < matching.length; index += 2) {
                const first = matching[index]
                const second = matching[index + 1]
                const key = `${ruleIndex}:${first.id}:${second.id}`
                currentInteractions.add(key)
                if (!runtime.activeInteractions.has(key)) {
                    const actionName = runtime.actions.get(rule.conversation_action_id)!.action_name
                    console.warn(`[AmbientNpcSchedule] 第 ${runtime.day + 1} 日 ${now} | ${actionName}开始：${first.name}（${first.profession}）↔ ${second.name}（${second.profession}）`)
                }
            }
        })
        runtime.activeInteractions = currentInteractions
    }

    private dailyOffset(day: number, npcIndex: number, eventIndex: number, jitter: Jitter): number {
        if (jitter.min < 0 || jitter.max < jitter.min) throw new Error('jitter_minutes 配置无效')
        const hash = (((day + 1) * 73856093) ^ ((npcIndex + 1) * 19349663) ^ ((eventIndex + 1) * 83492791)) >>> 0
        const magnitude = jitter.min + hash % (jitter.max - jitter.min + 1)
        return (hash & 1) === 0 ? -magnitude : magnitude
    }

    private gameMinute(runtime: Runtime): number {
        return Math.floor(runtime.elapsed / runtime.dayDuration * MINUTES_PER_DAY)
    }

    private parseTime(value: string): number {
        const match = /^(\d{1,2}):(\d{2})$/.exec(value)
        if (!match) throw new Error(`无效时间格式：${value}`)
        const hour = Number(match[1])
        const minute = Number(match[2])
        if (hour > 23 || minute > 59) throw new Error(`无效时间：${value}`)
        return hour * 60 + minute
    }

    private formatTime(minute: number): string {
        const normalized = (minute + MINUTES_PER_DAY) % MINUTES_PER_DAY
        return `${String(Math.floor(normalized / 60)).padStart(2, '0')}:${String(normalized % 60).padStart(2, '0')}`
    }

    private runtime(): Runtime | undefined {
        const existing = runtimes.get(this)
        if (existing) return existing
        if (invalidInstances.has(this)) return undefined

        try {
            const loader = this as unknown as ConfigLoader
            const raw = {
                schema: loader.LoadSchemaJson(),
                sequences: loader.LoadSequencesJson(),
                actions: loader.LoadActionsJson(),
                environment: loader.LoadEnvironmentalConditionsJson(),
                daily: loader.LoadDailyScheduleJson(),
            }
            const missing = Object.entries(raw).filter(([, value]) => !value).map(([name]) => name)
            if (missing.length > 0) throw new Error(`无法读取配置：${missing.join(', ')}`)

            const schema = JSON.parse(raw.schema) as { entity_states: { name: string, key: number }[] }
            const actionConfig = JSON.parse(raw.actions) as { actions: ActionDef[] }
            const sequenceConfig = JSON.parse(raw.sequences) as { sequences: SequenceDef[] }
            const environmentConfig = JSON.parse(raw.environment) as { environmental_conditions: { condition_key: number, name: string }[] }
            const daily = JSON.parse(raw.daily) as DailyConfig
            const stateNames = new Set(schema.entity_states.map(state => state.name))
            const actions = new Map(actionConfig.actions.map(action => [action.action_id, action]))
            const sequences = new Map(sequenceConfig.sequences.map(sequence => [sequence.sequence_id, sequence]))
            const environmentNames = new Map(environmentConfig.environmental_conditions.map(condition => [condition.condition_key, condition.name]))

            if (!environmentConfig.environmental_conditions.some(condition => condition.name === 'game_minute')) {
                throw new Error('environmental_conditions 缺少 game_minute')
            }
            for (const action of actions.values()) {
                const effects = [...action.preconditions, ...action.immediate_effects, ...action.completion_effects, ...action.interruption_effects]
                for (const effect of effects) {
                    if (effect.target_id_name !== 'ENVIRONMENT' && effect.target_id_name !== 'DISTANCE_TO_ENTITY' && !stateNames.has(effect.state_key_name)) {
                        throw new Error(`Action ${action.action_id} 引用了 schema 中不存在的状态 ${effect.state_key_name}`)
                    }
                }
            }
            for (const sequence of sequences.values()) {
                for (const node of sequence.nodes) {
                    if (node.node_type === 'ACTION' && !actions.has(node.target_action_id!)) {
                        throw new Error(`Sequence ${sequence.sequence_id}/Node ${node.node_id} 引用了不存在的 Action ${node.target_action_id}`)
                    }
                }
            }
            if (!Array.isArray(daily.npcs) || daily.npcs.length === 0 || daily.day_duration_seconds <= 0) {
                throw new Error('daily_schedule 的 npcs 或 day_duration_seconds 无效')
            }
            for (const npc of daily.npcs) {
                const sequence = sequences.get(npc.sequence_id)
                if (!sequence) throw new Error(`${npc.name} 引用了不存在的 Sequence ${npc.sequence_id}`)
                const nodes = new Map(sequence.nodes.map(node => [node.node_id, node]))
                if (!npc.events.length) throw new Error(`${npc.name} 没有 events`)
                for (const event of npc.events) {
                    this.parseTime(event.at)
                    const node = nodes.get(event.node_id)
                    if (!node || node.node_type !== 'ACTION') throw new Error(`${npc.name} 引用了无效的 Node ${event.node_id}`)
                }
            }
            for (const rule of daily.interaction_rules ?? []) {
                if (!actions.has(rule.when_action_id) || !actions.has(rule.conversation_action_id)) {
                    throw new Error('interaction_rules 引用了不存在的 Action')
                }
            }

            const runtime: Runtime = {
                elapsed: 0,
                day: 0,
                dayDuration: daily.day_duration_seconds,
                lastLoggedSecond: -1,
                frameworkStatusLogged: false,
                actions,
                sequences,
                environmentNames,
                sourceNpcs: daily.npcs,
                rules: daily.interaction_rules ?? [],
                npcs: [],
                activeInteractions: new Set<string>(),
            }
            runtimes.set(this, runtime)
            return runtime
        } catch (error) {
            invalidInstances.add(this)
            console.error(`[AmbientNpcSchedule] 五配置初始化失败：${String(error)}`)
            return undefined
        }
    }
}

export default AmbientNpcDataDrivenScheduleDemo
