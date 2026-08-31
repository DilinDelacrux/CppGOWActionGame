"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInitialCampState = void 0;
function requireValue(condition, message) {
    if (!condition)
        throw new Error(`[AmbientNpcCamp] ${message}`);
}
function text(value, field) {
    requireValue(typeof value === 'string' && value.trim().length > 0, `${field} 不能为空`);
}
function identifier(value, field) {
    requireValue(typeof value === 'string' && /^[a-z][a-z0-9_]*$/.test(value), `${field} 必须是稳定的小写英文 ID`);
}
function range(value, min, max, field) {
    requireValue(Number.isFinite(value) && value >= min && value <= max, `${field} 超出范围 [${min}, ${max}]`);
}
function resource(value, field) {
    requireValue(Number.isSafeInteger(value) && value >= 0, `${field} 必须是非负安全整数`);
}
/** 每次返回新的状态副本。旧的十人日程没有 camp，保持兼容。仅在新会话/显式重置时调用。 */
function createInitialCampState(daily) {
    if (daily.camp === undefined)
        return undefined;
    const camp = daily.camp;
    requireValue(!!camp && camp.schema_version === 1, '不支持的 camp.schema_version');
    identifier(camp.id, 'camp.id');
    text(camp.name, 'camp.name');
    text(camp.premise, 'camp.premise');
    requireValue(Array.isArray(daily.npcs) && daily.npcs.length >= 2, '营地至少需要两名居民');
    const ids = new Set();
    const residents = Object.create(null);
    for (const npc of daily.npcs) {
        identifier(npc.id, 'npc.id');
        requireValue(!ids.has(npc.id), `重复居民 ID：${npc.id}`);
        ids.add(npc.id);
        text(npc.name, `${npc.id}.name`);
        text(npc.profession, `${npc.id}.profession`);
        requireValue(!!npc.profile && !!npc.initial_state, `${npc.id} 缺少 profile 或 initial_state`);
        const profile = npc.profile;
        requireValue(Number.isInteger(profile.age), `${npc.id}.age 必须是整数`);
        range(profile.age, 18, 120, `${npc.id}.age`);
        for (const key of ['personality', 'contribution', 'speech_style', 'faith_attitude'])
            text(profile[key], `${npc.id}.${key}`);
        requireValue(Array.isArray(profile.sensitive_topics) && profile.sensitive_topics.length > 0, `${npc.id} 缺少敏感话题`);
        profile.sensitive_topics.forEach(topic => text(topic, `${npc.id}.sensitive_topics`));
        const state = npc.initial_state;
        resource(state.personal_food, `${npc.id}.personal_food`);
        range(state.worship, 0, 100, `${npc.id}.worship`);
        range(state.mood, -100, 100, `${npc.id}.mood`);
        residents[npc.id] = { ...state };
    }
    const world = camp.initial_world;
    requireValue(!!world && ['spring', 'summer', 'autumn', 'winter'].includes(world.season), 'initial_world.season 无效');
    requireValue(['clear', 'rain', 'storm', 'snow'].includes(world.weather), 'initial_world.weather 无效');
    range(world.resource_abundance, 0, 2, 'resource_abundance');
    requireValue(!!world.shared_resources && !!world.daily_consumption_per_resident, '缺少公共资源或消耗定义');
    for (const key of ['food', 'water', 'wood', 'herbs'])
        resource(world.shared_resources[key], `shared_resources.${key}`);
    for (const key of ['food', 'water'])
        resource(world.daily_consumption_per_resident[key], `daily_consumption_per_resident.${key}`);
    // W1-02 尚无事件定义/执行器，不能用未知 ID 假装已有事件在运行。
    requireValue(Array.isArray(world.active_event_ids) && world.active_event_ids.length === 0, '初始样板暂不支持 active_event_ids');
    requireValue(Array.isArray(camp.relationships), '缺少 relationships');
    const pairs = new Set();
    for (const relation of camp.relationships) {
        requireValue(ids.has(relation.from) && ids.has(relation.to) && relation.from !== relation.to, '关系引用了无效居民或自身');
        const key = `${relation.from}:${relation.to}`;
        requireValue(!pairs.has(key), `重复定向关系：${key}`);
        pairs.add(key);
        range(relation.affection, -100, 100, `${key}.affection`);
        range(relation.attraction, 0, 100, `${key}.attraction`);
        range(relation.trust, 0, 100, `${key}.trust`);
    }
    requireValue(pairs.size === ids.size * (ids.size - 1), '必须定义每对居民的两个关系方向');
    requireValue(Array.isArray(camp.facts), '缺少 facts');
    const factIds = new Set();
    for (const fact of camp.facts) {
        identifier(fact.id, 'fact.id');
        requireValue(!factIds.has(fact.id), `重复事实 ID：${fact.id}`);
        factIds.add(fact.id);
        text(fact.text, `${fact.id}.text`);
        requireValue(Array.isArray(fact.subject_ids) && fact.subject_ids.every(id => ids.has(id)) && new Set(fact.subject_ids).size === fact.subject_ids.length, `${fact.id}.subject_ids 无效`);
        requireValue(fact.visibility === 'public' || fact.visibility === 'private', `${fact.id}.visibility 无效`);
        if (fact.visibility === 'private') {
            requireValue(Array.isArray(fact.known_by) && fact.known_by.length > 0 && fact.known_by.every(id => ids.has(id)) && new Set(fact.known_by).size === fact.known_by.length, `${fact.id}.known_by 无效`);
        }
        else {
            requireValue(fact.known_by === undefined, `${fact.id} 公开事实无需 known_by`);
        }
    }
    // JSON 数据不含对象方法，深复制同时隔离初始模板和不同游戏实例。
    return JSON.parse(JSON.stringify({
        id: camp.id, name: camp.name, world, residents,
        relationships: camp.relationships, facts: camp.facts,
    }));
}
exports.createInitialCampState = createInitialCampState;
//# sourceMappingURL=AmbientNpcCampData.js.map