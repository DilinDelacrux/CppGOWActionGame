// Uses the shipped JS and real JSON. UE file-loading methods are mocked; this is not a PIE test.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8').replace(/^\uFEFF/, '');
const samplePath = 'Content/AmbientNpcBehavior/Sample3/daily_schedule.json';
const sample = JSON.parse(read(samplePath));
const legacy = JSON.parse(read('Content/AmbientNpcBehavior/DataDriven/daily_schedule.json'));
const clone = value => JSON.parse(JSON.stringify(value));
const { createInitialCampState } = require('../Content/JavaScript/AmbientNpcCampData.js');
const results = [];
function check(name, run) {
    run();
    results.push({ name, passed: true });
    console.log(`PASS ${name}`);
}

const logs = [];
const errors = [];
const script = { exports: {} };
vm.runInNewContext(read('Content/JavaScript/AmbientNpcDataDrivenScheduleDemo.js'), {
    exports: script.exports,
    require: name => {
        if (name === 'ue') return { BehaviorFrameworkManagerBase: class {} };
        if (name === './AmbientNpcCampData') return { createInitialCampState };
        throw new Error(`Unexpected dependency: ${name}`);
    },
    console: { warn: line => logs.push(line), error: line => errors.push(line) },
}, { filename: 'AmbientNpcDataDrivenScheduleDemo.js' });
function manager(daily) {
    const instance = new script.exports.default();
    for (const [method, file] of Object.entries({
        LoadSchemaJson: 'schema.json', LoadSequencesJson: 'sequences.json',
        LoadActionsJson: 'actions.json', LoadEnvironmentalConditionsJson: 'environmental_conditions.json',
    })) instance[method] = () => read(`Content/AmbientNpcBehavior/DataDriven/${file}`);
    instance.LoadDailyScheduleJson = () => JSON.stringify(daily);
    instance.IsInitialized = () => true;
    return instance;
}

check('three residents, six directed relations, spring and clear weather', () => {
    const state = createInitialCampState(sample);
    assert.deepEqual(Object.keys(state.residents), ['cuihua', 'goudan', 'niuer']);
    assert.equal(state.relationships.length, 6);
    assert.equal(state.world.season, 'spring');
    assert.equal(state.world.weather, 'clear');
    assert.equal(state.world.active_event_ids.length, 0);
    const relation = (from, to) => state.relationships.find(r => r.from === from && r.to === to);
    assert.ok(relation('cuihua', 'goudan').attraction >= 80);
    assert.ok(relation('goudan', 'cuihua').attraction >= 80);
    assert.ok(relation('niuer', 'cuihua').attraction >= 80);
    assert.equal(relation('cuihua', 'niuer').attraction, 0);
    assert.ok(relation('niuer', 'goudan').affection < 0);
    assert.equal(state.facts.filter(f => f.visibility === 'private' && f.known_by.length === 1).length, 3);
});
check('fresh initial states do not share resources, relationships or private knowledge', () => {
    const before = JSON.stringify(sample);
    const first = createInitialCampState(sample);
    first.world.shared_resources.food = 0;
    first.residents.cuihua.worship = 99;
    first.relationships[0].affection = -100;
    first.facts.find(f => f.visibility === 'private').known_by.push('niuer');
    assert.equal(JSON.stringify(sample), before);
    const second = createInitialCampState(sample);
    assert.notStrictEqual(second, first);
    assert.equal(second.world.shared_resources.food, 18);
    assert.equal(second.residents.cuihua.worship, 40);
    assert.equal(second.relationships[0].affection, 75);
    assert.deepEqual(second.facts.find(f => f.id === 'mutual_affection').known_by, ['cuihua', 'goudan']);
});
check('real schedule loader accepts new config; social state survives two midnights', () => {
    const instance = manager(sample);
    instance.OnAmbientNpcScriptBeginPlay();
    const runtime = instance.runtime();
    assert.ok(runtime);
    assert.equal(runtime.npcs.length, 3);
    const camp = runtime.camp;
    camp.residents.goudan.personal_food = 7;
    camp.relationships[0].affection = 30;
    camp.world.weather = 'rain';
    for (let i = 0; i < sample.day_duration_seconds * 2; i++) instance.OnAmbientNpcScriptTick(1);
    assert.equal(runtime.day, 2);
    assert.strictEqual(runtime.camp, camp);
    assert.equal(camp.residents.goudan.personal_food, 7);
    assert.equal(camp.relationships[0].affection, 30);
    assert.equal(camp.world.weather, 'rain');
    assert.equal(createInitialCampState(sample).residents.goudan.personal_food, 1);
    for (const fact of sample.camp.facts.filter(f => f.visibility === 'private')) {
        assert.ok(!logs.some(line => line.includes(fact.text)), 'startup log leaked a private fact');
    }
    assert.equal(errors.length, 0);
});
check('existing ten-resident config still runs without camp fields', () => {
    const instance = manager(legacy);
    instance.OnAmbientNpcScriptBeginPlay();
    assert.equal(instance.runtime().npcs.length, 10);
    assert.equal(instance.runtime().camp, undefined);
    instance.OnAmbientNpcScriptTick(legacy.day_duration_seconds);
    assert.equal(instance.runtime().day, 1);
    assert.equal(errors.length, 0);
});

const invalidCases = [
    ['duplicate resident ID', d => { d.npcs[1].id = d.npcs[0].id; }],
    ['unknown relationship target', d => { d.camp.relationships[0].to = 'missing'; }],
    ['missing reverse relationship', d => { d.camp.relationships.pop(); }],
    ['duplicate relationship', d => { d.camp.relationships[0] = d.camp.relationships[1]; }],
    ['out-of-range worship', d => { d.npcs[0].initial_state.worship = 101; }],
    ['negative food reserve', d => { d.npcs[0].initial_state.personal_food = -1; }],
    ['unknown private fact recipient', d => { d.camp.facts[4].known_by = ['missing']; }],
    ['private fact without recipients', d => { delete d.camp.facts[4].known_by; }],
    ['unknown fact subject', d => { d.camp.facts[4].subject_ids = ['missing']; }],
    ['duplicate fact ID', d => { d.camp.facts[1].id = d.camp.facts[0].id; }],
    ['unsupported schema', d => { d.camp.schema_version = 2; }],
    ['undefined initial event', d => { d.camp.initial_world.active_event_ids = ['unknown']; }],
];
for (const [name, mutate] of invalidCases) check(`reject ${name}`, () => {
    const invalid = clone(sample);
    mutate(invalid);
    assert.throws(() => createInitialCampState(invalid), /AmbientNpcCamp/);
});
for (const [name, mutate] of [
    ['unknown sequence node', d => { d.npcs[0].events[0].node_id = 999; }],
    ['invalid schedule time', d => { d.npcs[0].events[0].at = '25:00'; }],
]) check(`schedule loader rejects ${name}`, () => {
    const invalid = clone(sample);
    mutate(invalid);
    const instance = manager(invalid);
    const count = errors.length;
    instance.OnAmbientNpcScriptBeginPlay();
    assert.equal(instance.runtime(), undefined);
    assert.equal(errors.length, count + 1);
    instance.OnAmbientNpcScriptTick(1);
    assert.equal(errors.length, count + 1, 'failed instance should not retry/log every tick');
});

const output = path.join(root, 'Saved/W1-02');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'data-validation.json'), JSON.stringify({
    timestamp: new Date().toISOString(), sample: samplePath,
    scope: 'Node/VM with real compiled TS and five JSON files; UE methods mocked, not PIE',
    results,
}, null, 2));
console.log(`W1-02 DATA PASS: ${results.length} checks`);
