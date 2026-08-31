const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8').replace(/^\uFEFF/, '');
const source = read('Content/AmbientNpcBehavior/Sample3/daily_schedule.json');
const initial = JSON.parse(source);
const data = require('../Content/JavaScript/AmbientNpcCampData');
const moduleExports = {};
const errors = [];
vm.runInNewContext(read('Content/JavaScript/AmbientNpcDataDrivenScheduleDemo.js'), {
    exports: moduleExports,
    require: name => name === 'ue' ? {BehaviorFrameworkManagerBase: class {}} : data,
    console: {warn() {}, error: e => errors.push(e)},
});
const actor = new moduleExports.default();
let starts = 0, stops = 0;
actor.IsInitialized = () => true;
actor.InitializeFramework = () => { starts++; };
actor.ShutdownFramework = () => { stops++; };
actor.LoadDailyScheduleJson = () => source;
for (const [method, file] of Object.entries({LoadSchemaJson:'schema', LoadSequencesJson:'sequences', LoadActionsJson:'actions', LoadEnvironmentalConditionsJson:'environmental_conditions'})) {
    actor[method] = () => read(`Content/AmbientNpcBehavior/DataDriven/${file}.json`);
}
actor.OnAmbientNpcScriptBeginPlay();
const runtime = actor.runtime();
const results = [];
function check(name, run) { run(); results.push({name, passed:true}); console.log('PASS ' + name); }
check('snapshot isolates the UI from authoritative world and relationship state', () => {
    const view = actor.campSnapshot();
    view.world.shared_resources.food = 0;
    view.residents[0].worship = 0;
    view.relationships[0].affection = -100;
    assert.equal(runtime.camp.world.shared_resources.food, 18);
    assert.equal(runtime.camp.residents.cuihua.worship, 40);
    assert.equal(runtime.camp.relationships[0].affection, 75);
});
check('display-name changes preserve the resident ID and state lookup', () => {
    runtime.npcs.find(npc => npc.id === 'niuer').name = '牛二改名';
    const view = actor.campSnapshot().residents.find(npc => npc.id === 'niuer');
    assert.equal(view.name, '牛二改名');
    assert.equal(view.personal_food, 8);
});
check('reset restores the startup template and clears previous events, facts and pairing', () => {
    runtime.elapsed = 40;
    runtime.day = 5;
    runtime.camp.world.weather = 'storm';
    runtime.camp.world.active_event_ids.push('previous_event');
    runtime.camp.facts.push({id:'previous_fact',visibility:'public',subject_ids:[],text:'上一轮'});
    runtime.camp.residents.niuer.personal_food = 0;
    runtime.activeInteractions.add('stale_pair');
    actor.LoadDailyScheduleJson = () => '{}'; // Reset must not silently reload changed disk data.
    actor.resetCamp();
    assert.equal(runtime.elapsed, 0);
    assert.equal(runtime.day, 0);
    assert.equal(runtime.paused, true);
    assert.equal(runtime.lastProcessedMinute, 0);
    assert.equal(runtime.camp.world.weather, 'clear');
    assert.equal(runtime.camp.world.active_event_ids.length, 0);
    assert.equal(runtime.activeInteractions.size, 0);
    assert.equal(runtime.camp.facts.length, initial.camp.facts.length);
    assert.equal(runtime.camp.residents.niuer.personal_food, 8);
    assert.equal(runtime.npcs.find(npc => npc.id === 'niuer').name, '牛二');
});
check('paused time and energy do not advance; resume advances the existing schedule', () => {
    const energy = runtime.npcs.map(npc => npc.currentEnergy);
    actor.OnAmbientNpcScriptTick(50);
    assert.equal(runtime.elapsed, 0);
    assert.deepEqual(runtime.npcs.map(npc => npc.currentEnergy), energy);
    runtime.paused = false;
    actor.OnAmbientNpcScriptTick(40);
    assert.equal(runtime.elapsed, 40);
    assert.ok(runtime.npcs.some(npc => npc.currentEnergy < npc.maxEnergy));
});
check('100 resets retain the same manager and exactly three unique resident IDs', () => {
    for (let i = 0; i < 100; i++) actor.resetCamp();
    assert.strictEqual(actor.runtime(), runtime);
    assert.equal(runtime.npcs.length, 3);
    assert.equal(new Set(runtime.npcs.map(npc => npc.id)).size, 3);
    assert.equal(starts, 101);
    assert.equal(stops, 101);
    assert.equal(runtime.resetCount, 101);
    assert.equal(read('Content/AmbientNpcBehavior/Sample3/daily_schedule.json'), source);
});
check('native framework failure is reported without losing the reset data', () => {
    actor.IsInitialized = () => false;
    assert.throws(() => actor.resetCamp(), /框架重启失败/);
    assert.equal(runtime.camp.residents.goudan.personal_food, 1);
    assert.equal(runtime.paused, true);
    assert.equal(errors.length, 0);
});
const output = path.join(root, 'Saved/W1-03');
fs.mkdirSync(output, {recursive:true});
fs.writeFileSync(path.join(output, 'state-validation.json'), JSON.stringify({timestamp:new Date().toISOString(),scope:'Real compiled TS; UE framework methods mocked',results}, null, 2));
console.log(`W1-03 STATE PASS: ${results.length} checks`);
