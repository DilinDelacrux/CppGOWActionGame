"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
// 绑定到 BehaviorFrameworkManagerBase 的蓝图子类：底层仍由 AmbientNpcBehavior
// 初始化和 Tick；这里仅演示其上层的日程状态与对话决策。
class AmbientNpcDailyScheduleDemo extends UE.BehaviorFrameworkManagerBase {
    daySeconds = 120;
    elapsed = 0;
    lastLoggedSecond = -1;
    activePairs = new Set();
    npcs = [
        { name: '阿诺', job: '铁匠', workStart: 6, workEnd: 12, relaxStart: 17, relaxEnd: 22 },
        { name: '贝拉', job: '裁缝', workStart: 7, workEnd: 12, relaxStart: 16, relaxEnd: 21 },
        { name: '科尔', job: '面包师', workStart: 4, workEnd: 11, relaxStart: 15, relaxEnd: 20 },
        { name: '黛西', job: '药剂师', workStart: 8, workEnd: 12, relaxStart: 18, relaxEnd: 22 },
        { name: '埃德', job: '木匠', workStart: 6, workEnd: 12, relaxStart: 17, relaxEnd: 21 },
        { name: '菲奥娜', job: '陶工', workStart: 8, workEnd: 12, relaxStart: 16, relaxEnd: 22 },
        { name: '加文', job: '猎人', workStart: 5, workEnd: 11, relaxStart: 17, relaxEnd: 20 },
        { name: '海伦', job: '旅店老板', workStart: 9, workEnd: 12, relaxStart: 15, relaxEnd: 21 },
        { name: '伊万', job: '农夫', workStart: 5, workEnd: 12, relaxStart: 16, relaxEnd: 20 },
        { name: '朱恩', job: '书记员', workStart: 8, workEnd: 12, relaxStart: 18, relaxEnd: 22 },
    ];
    ReceiveBeginPlay() {
        console.log('[AmbientNpcSchedule] 日程 Demo 启动：120 秒 = 游戏内 24 小时；请确保蓝图已配置 AmbientNpcBehavior Config。');
        this.update(0);
    }
    ReceiveTick(deltaSeconds) {
        this.elapsed = (this.elapsed + deltaSeconds) % this.daySeconds;
        const second = Math.floor(this.elapsed);
        if (second === this.lastLoggedSecond)
            return;
        this.lastLoggedSecond = second; // 每秒输出一次，即每次推进 12 个游戏分钟
        this.update(this.gameHour());
    }
    update(hour) {
        const time = this.formatTime(hour);
        const relaxing = [];
        for (const npc of this.npcs) {
            const state = this.stateAt(npc, hour);
            if (state !== npc.state) {
                npc.state = state;
                console.log(`[AmbientNpcSchedule] ${time} | ${npc.name}（${npc.job}）→ ${state}`);
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
            if (!this.activePairs.has(pair))
                console.log(`[AmbientNpcSchedule] ${time} | 对话开始：${pair}`);
        }
        this.activePairs = pairs;
    }
    stateAt(npc, hour) {
        if (hour >= 12 && hour < 13)
            return '午饭';
        if (hour >= 18 && hour < 19)
            return '晚饭';
        if ((hour >= npc.workStart && hour < npc.workEnd) || (hour >= 13 && hour < 17))
            return '工作';
        if (hour >= npc.relaxStart && hour < npc.relaxEnd)
            return '放松';
        return '睡觉';
    }
    gameHour() {
        return this.elapsed / this.daySeconds * 24;
    }
    formatTime(hour) {
        const minutes = Math.floor(hour * 60);
        return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
    }
}
exports.default = AmbientNpcDailyScheduleDemo;
//# sourceMappingURL=AmbientNpcDailyScheduleDemo.js.map