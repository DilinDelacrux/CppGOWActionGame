import * as UE from 'ue'

type Jitter = { min: number, max: number }
type EventJson = { at: string, state: string, jitter_minutes?: Jitter }
type NpcJson = { id: string, name: string, profession: string, events: EventJson[] }
type InteractionRule = { type: 'pair_conversation', required_state: string, pairing?: 'sequential' }
type ScheduleJson = { day_duration_seconds: number, npcs: NpcJson[], interaction_rules?: InteractionRule[] }

type TimedState = { minute: number, state: string }
type Npc = { id: string, name: string, profession: string, events: TimedState[], state?: string }
type Runtime = {
    elapsed: number
    day: number
    dayDuration: number
    lastLoggedSecond: number
    sourceNpcs: NpcJson[]
    rules: InteractionRule[]
    npcs: Npc[]
    activeInteractions: Set<string>
}

const runtimes = new WeakMap<object, Runtime>()
const invalidInstances = new WeakSet<object>()
const MINUTES_PER_DAY = 24 * 60

/**
 * 最基础的数据驱动日程 Demo。
 *
 * 此脚本不包含职业、餐食或睡眠的时间规则；它只解释 JSON 的 events。
 * 想增加状态，只需在 JSON 里增加一个 { at, state } 事件，不需要修改脚本。
 */
class AmbientNpcDataDrivenScheduleDemo extends UE.BehaviorFrameworkManagerBase {
    ReceiveBeginPlay(): void {
        const runtime = this.runtime()
        if (!runtime) return

        console.warn(`[AmbientNpcSchedule] 数据驱动 Demo 启动：${runtime.dayDuration} 秒 = 游戏内 24 小时。`)
        this.beginDay(runtime)
        this.update(runtime, 0)
    }

    ReceiveTick(deltaSeconds: number): void {
        const runtime = this.runtime()
        if (!runtime) return

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

    private update(runtime: Runtime, minute: number): void {
        const now = this.formatTime(minute)
        for (const npc of runtime.npcs) {
            const state = this.stateAt(npc, minute)
            if (state !== npc.state) {
                npc.state = state
                console.warn(`[AmbientNpcSchedule] 第 ${runtime.day + 1} 日 ${now} | ${npc.name}（${npc.profession}）→ ${state}`)
            }
        }
        this.runInteractionRules(runtime, now)
    }

    private beginDay(runtime: Runtime): void {
        console.warn(`[AmbientNpcSchedule] 第 ${runtime.day + 1} 日：根据 JSON 生成当天事件。`)
        runtime.npcs = runtime.sourceNpcs.map((sourceNpc, npcIndex) => ({
            id: sourceNpc.id,
            name: sourceNpc.name,
            profession: sourceNpc.profession,
            events: sourceNpc.events.map((event, eventIndex) => {
                const baseMinute = this.parseTime(event.at)
                const offset = event.jitter_minutes
                    ? this.dailyOffset(runtime.day, npcIndex, eventIndex, event.jitter_minutes)
                    : 0
                if (offset !== 0) {
                    console.warn(`[AmbientNpcSchedule] ${sourceNpc.name} | ${event.state} 事件：${this.formatTime(baseMinute + offset)}（${offset > 0 ? '+' : ''}${offset} 分钟）`)
                }
                return { minute: baseMinute + offset, state: event.state }
            }).sort((a, b) => a.minute - b.minute),
        }))
    }

    private runInteractionRules(runtime: Runtime, now: string): void {
        const currentInteractions = new Set<string>()
        runtime.rules.forEach((rule, ruleIndex) => {
            if (rule.type !== 'pair_conversation') return

            const matching = runtime.npcs.filter(npc => npc.state === rule.required_state)
            for (let index = 0; index + 1 < matching.length; index += 2) {
                const first = matching[index]
                const second = matching[index + 1]
                const key = `${ruleIndex}:${first.id}:${second.id}`
                currentInteractions.add(key)
                if (!runtime.activeInteractions.has(key)) {
                    console.warn(`[AmbientNpcSchedule] 第 ${runtime.day + 1} 日 ${now} | 对话开始：${first.name}（${first.profession}）↔ ${second.name}（${second.profession}）`)
                }
            }
        })
        runtime.activeInteractions = currentInteractions
    }

    private stateAt(npc: Npc, minute: number): string {
        let current = npc.events[0]?.state ?? '未定义'
        for (const event of npc.events) {
            if (event.minute > minute) break
            current = event.state
        }
        return current
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

        const loader = this as unknown as { LoadDailyScheduleJson(): string }
        const rawJson = loader.LoadDailyScheduleJson()
        if (!rawJson) return this.fail('无法读取日程 JSON；请检查 Config Data Asset 的 Daily Schedule File Path。')

        try {
            const data = JSON.parse(rawJson) as ScheduleJson
            if (!Array.isArray(data.npcs) || data.npcs.length === 0) throw new Error('npcs 必须是非空数组')
            if (data.day_duration_seconds <= 0) throw new Error('day_duration_seconds 必须大于 0')
            for (const npc of data.npcs) {
                if (!npc.id || !npc.name || !npc.profession || !Array.isArray(npc.events) || npc.events.length === 0) {
                    throw new Error('每个 NPC 必须包含 id、name、profession 和非空 events')
                }
                npc.events.forEach(event => this.parseTime(event.at))
            }

            const runtime: Runtime = {
                elapsed: 0,
                day: 0,
                dayDuration: data.day_duration_seconds,
                lastLoggedSecond: -1,
                sourceNpcs: data.npcs,
                rules: data.interaction_rules ?? [],
                npcs: [],
                activeInteractions: new Set<string>(),
            }
            runtimes.set(this, runtime)
            return runtime
        } catch (error) {
            return this.fail(`日程 JSON 解析失败：${String(error)}`)
        }
    }

    private fail(message: string): undefined {
        invalidInstances.add(this)
        console.error(`[AmbientNpcSchedule] ${message}`)
        return undefined
    }
}

export default AmbientNpcDataDrivenScheduleDemo
