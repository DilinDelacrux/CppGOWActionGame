"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const scheduleStates = new WeakMap();
const MINUTES_PER_DAY = 24 * 60;
// 绑定到 BehaviorFrameworkManagerBase 的蓝图子类：底层仍由 AmbientNpcBehavior
// 初始化和 Tick；日程数据由其 Config Data Asset 指定的 JSON 文件提供。
class AmbientNpcDailyScheduleDemo extends UE.BehaviorFrameworkManagerBase {
    ReceiveBeginPlay() {
        const schedule = this.schedule();
        if (!schedule)
            return;
        console.warn(`[AmbientNpcSchedule] 日程 Demo 启动：${schedule.dayDurationSeconds} 秒 = 游戏内 24 小时；日程来自 Config Data Asset。`);
        this.applyDailyWakeOffsets(schedule);
        this.update(0, schedule);
    }
    ReceiveTick(deltaSeconds) {
        const schedule = this.schedule();
        if (!schedule)
            return;
        schedule.elapsed += deltaSeconds;
        while (schedule.elapsed >= schedule.dayDurationSeconds) {
            schedule.elapsed -= schedule.dayDurationSeconds;
            schedule.dayIndex++;
            schedule.lastLoggedSecond = -1;
            schedule.activePairs.clear();
            for (const npc of schedule.npcs)
                npc.state = undefined;
            this.applyDailyWakeOffsets(schedule);
        }
        const second = Math.floor(schedule.elapsed);
        if (second === schedule.lastLoggedSecond)
            return;
        schedule.lastLoggedSecond = second;
        this.update(this.gameMinute(schedule), schedule);
    }
    update(minute, schedule) {
        const time = this.formatTime(minute);
        const relaxing = [];
        for (const npc of schedule.npcs) {
            const state = this.stateAt(npc, minute);
            if (state !== npc.state) {
                npc.state = state;
                console.warn(`[AmbientNpcSchedule] 第 ${schedule.dayIndex + 1} 日 ${time} | ${npc.name}（${npc.job}）→ ${state}`);
            }
            if (state === '放松')
                relaxing.push(npc);
        }
        const pairs = new Set();
        for (let i = 0; i + 1 < relaxing.length; i += 2) {
            const a = relaxing[i];
            const b = relaxing[i + 1];
            const pair = `${a.name}（${a.job}）↔ ${b.name}（${b.job}）`;
            pairs.add(pair);
            if (!schedule.activePairs.has(pair))
                console.warn(`[AmbientNpcSchedule] 第 ${schedule.dayIndex + 1} 日 ${time} | 对话开始：${pair}`);
        }
        schedule.activePairs = pairs;
    }
    stateAt(npc, minute) {
        if (minute >= npc.lunchStart && minute < npc.lunchEnd)
            return '午饭';
        if (minute >= npc.dinnerStart && minute < npc.dinnerEnd)
            return '晚饭';
        if ((minute >= npc.wakeTime + npc.wakeOffset && minute < npc.lunchStart) || (minute >= npc.lunchEnd && minute < npc.workEnd))
            return '工作';
        if ((minute >= npc.workEnd && minute < npc.dinnerStart) || (minute >= npc.dinnerEnd && minute < npc.sleepStart))
            return '放松';
        return '睡觉';
    }
    applyDailyWakeOffsets(schedule) {
        console.warn(`[AmbientNpcSchedule] 第 ${schedule.dayIndex + 1} 日：重新生成起床时间（±${schedule.wakeJitterMin}–${schedule.wakeJitterMax} 分钟）`);
        schedule.npcs.forEach((npc, index) => {
            const hash = (((schedule.dayIndex + 1) * 73856093) ^ ((index + 1) * 19349663)) >>> 0;
            const magnitude = schedule.wakeJitterMin + hash % (schedule.wakeJitterMax - schedule.wakeJitterMin + 1);
            npc.wakeOffset = (hash & 1) === 0 ? -magnitude : magnitude;
            console.warn(`[AmbientNpcSchedule] ${npc.name}（${npc.job}）起床：${this.formatTime(npc.wakeTime + npc.wakeOffset)}（${npc.wakeOffset >= 0 ? '+' : ''}${npc.wakeOffset} 分钟）`);
        });
    }
    gameMinute(schedule) {
        return Math.floor(schedule.elapsed / schedule.dayDurationSeconds * MINUTES_PER_DAY);
    }
    formatTime(minute) {
        const normalized = (minute + MINUTES_PER_DAY) % MINUTES_PER_DAY;
        return `${String(Math.floor(normalized / 60)).padStart(2, '0')}:${String(normalized % 60).padStart(2, '0')}`;
    }
    parseTime(value) {
        const match = /^(\d{1,2}):(\d{2})$/.exec(value);
        if (!match)
            throw new Error(`无效的时间格式：${value}（应为 HH:MM）`);
        const hour = Number(match[1]);
        const minute = Number(match[2]);
        if (hour > 23 || minute > 59)
            throw new Error(`无效的时间：${value}`);
        return hour * 60 + minute;
    }
    schedule() {
        const existing = scheduleStates.get(this);
        if (existing)
            return existing;
        // 新增 UFUNCTION 会在下次生成 Puerts typings 后出现在 UE 类型中；此处
        // 的局部类型让当前脚本也能直接编译。
        const loader = this;
        const rawJson = loader.LoadDailyScheduleJson();
        if (!rawJson) {
            console.error('[AmbientNpcSchedule] 无法读取日程 JSON。请检查 Data Asset 的 Daily Schedule File Path。');
            return undefined;
        }
        try {
            const data = JSON.parse(rawJson);
            if (!Array.isArray(data.npcs) || data.npcs.length === 0)
                throw new Error('npcs 必须是非空数组');
            const min = data.wake_jitter_minutes?.min ?? 10;
            const max = data.wake_jitter_minutes?.max ?? 15;
            if (min < 0 || max < min)
                throw new Error('wake_jitter_minutes 配置无效');
            const schedule = {
                elapsed: 0,
                dayIndex: 0,
                dayDurationSeconds: data.day_duration_seconds ?? 120,
                lastLoggedSecond: -1,
                activePairs: new Set(),
                wakeJitterMin: min,
                wakeJitterMax: max,
                npcs: data.npcs.map(npc => ({
                    name: npc.name,
                    job: npc.job,
                    wakeTime: this.parseTime(npc.wake_time),
                    lunchStart: this.parseTime(npc.lunch_start),
                    lunchEnd: this.parseTime(npc.lunch_end),
                    workEnd: this.parseTime(npc.work_end),
                    dinnerStart: this.parseTime(npc.dinner_start),
                    dinnerEnd: this.parseTime(npc.dinner_end),
                    sleepStart: this.parseTime(npc.sleep_start),
                    wakeOffset: 0,
                })),
            };
            if (schedule.dayDurationSeconds <= 0)
                throw new Error('day_duration_seconds 必须大于 0');
            scheduleStates.set(this, schedule);
            return schedule;
        }
        catch (error) {
            console.error(`[AmbientNpcSchedule] 日程 JSON 解析失败：${String(error)}`);
            return undefined;
        }
    }
}
exports.default = AmbientNpcDailyScheduleDemo;
//# sourceMappingURL=AmbientNpcDailyScheduleDemo.js.map