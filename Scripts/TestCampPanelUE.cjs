// Against a dedicated UE standalone test process with Puerts Inspector on the chosen port.
// Broadcasts native UMG button delegates and captures actual rendered UI; not physical mouse input.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const port = Number(process.argv[2] || 9337);
const root = path.resolve(__dirname, '..');
let socket;
async function main() {
    socket = new WebSocket(`ws://127.0.0.1:${port}`);
    let nextId = 0, contextId;
    const pending = new Map();
    socket.onmessage = ({data}) => {
        const response = JSON.parse(data);
        if (response.method === 'Runtime.executionContextCreated') contextId = response.params.context.id;
        pending.get(response.id)?.(response);
    };
    await new Promise((resolve, reject) => {socket.onopen=resolve; socket.onerror=reject;});
    async function call(method, params = {}) {
        const id = ++nextId;
        const reply = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {pending.delete(id); reject(new Error('Inspector request timed out'));}, 10000);
            pending.set(id, value => {clearTimeout(timeout); pending.delete(id); resolve(value);});
        });
        socket.send(JSON.stringify({id, method, params}));
        const response = await reply;
        if(response.error || response.result?.exceptionDetails) throw new Error(JSON.stringify(response));
        return response.result;
    }
    await call('Runtime.enable');
    const evaluate = async expression => (await call('Runtime.evaluate', {expression, contextId, returnByValue:true})).result.value;
    const result = await evaluate(`(() => {
        const UE=require('ue'), puerts=require('puerts');
        const command=UE.KismetSystemLibrary.GetCommandLine();
        if(!command.includes('L_AmbientNpcSample3') || !command.includes('-game') || !command.includes('-JsEnvDebugPort=${port}')) throw new Error('Not the dedicated sample test process');
        const actor=UE.Actor.Find('/Game/AmbientNpcBehavior/Sample3/L_AmbientNpcSample3.L_AmbientNpcSample3:PersistentLevel.BP_AmbientNpcDataDrivenScheduleDemo_C_0');
        if(!actor) throw new Error('Sample manager not found');
        const methods=require('AmbientNpcDataDrivenScheduleDemo').default.prototype;
        const runtime=methods.runtime.call(actor);
        const widgets=puerts.$ref();
        UE.WidgetBlueprintLibrary.GetAllWidgetsOfClass(actor,widgets,UE.ReactWidget.StaticClass(),true);
        if(puerts.$unref(widgets).Num()!==1)throw new Error('Expected one UI root');
        const root=puerts.$unref(widgets).Get(0);
        function walk(w,result=[]) { result.push(w); if(w.IsA(UE.PanelWidget.StaticClass())) for(let i=0;i<w.GetChildrenCount();i++)walk(w.GetChildAt(i),result); return result; }
        function click(label) {
            const button=walk(root.WidgetTree.RootWidget).find(w=>w.IsA(UE.Button.StaticClass()) && w.GetContent().Text===label);
            if(!button)throw new Error('Button not found: '+label);
            button.OnClicked.Broadcast();
        }
        function text() { return walk(root.WidgetTree.RootWidget).filter(w=>w.IsA(UE.TextBlock.StaticClass())).map(w=>w.Text).join(String.fromCharCode(10)); }
        const checks=[];
        function check(name,passed){ if(!passed)throw new Error(name); checks.push(name); }
        click('恢复初始状态');
        check('reset button pauses at day 1 midnight',runtime.paused && runtime.day===0 && runtime.elapsed===0);
        for(const [name,id] of [['翠花','cuihua'],['狗蛋','goudan'],['牛二','niuer']]) {click(name); check('select '+id,text().includes('稳定 ID：'+id));}
        runtime.npcs.find(n=>n.id==='niuer').name='牛二改名';
        runtime.camp.residents.niuer.personal_food=0;
        runtime.camp.world.active_event_ids.push('previous_event');
        runtime.camp.facts.push({id:'previous_fact',visibility:'public',subject_ids:[],text:'test'});
        runtime.activeInteractions.add('previous_pair');
        click('继续日程');
        check('selection survives display-name change',text().includes('稳定 ID：niuer') && text().includes('牛二改名'));
        check('UI reads authoritative personal food',text().includes('私人口粮：0'));
        click('暂停日程');
        check('pause button reaches runtime',runtime.paused);
        for(let i=0;i<3;i++)click('恢复初始状态');
        check('reset restores name and personal food',text().includes('私人口粮：8') && !text().includes('牛二改名'));
        check('reset clears old events and facts',runtime.camp.world.active_event_ids.length===0 && runtime.camp.facts.length===8 && runtime.activeInteractions.size===0);
        const actors=puerts.$ref(); UE.GameplayStatics.GetAllActorsOfClass(actor,actor.GetClass(),actors);
        check('reset keeps one manager and three stable IDs',puerts.$unref(actors).Num()===1 && runtime.npcs.length===3 && new Set(runtime.npcs.map(n=>n.id)).size===3);
        check('native framework reinitialized',actor.IsInitialized());
        const textResult=text();
        const snapshot=methods.campSnapshot.call(actor);
        globalThis.w103Test={actor,root,click,walk};
        UE.KismetSystemLibrary.ExecuteConsoleCommand(actor,'Shot SHOWUI filename=W1-03-panel -nosuffix');
        return {checks,text:textResult,snapshot};
    })()`);
    assert.equal(result.snapshot.residents.length, 3);
    // The screenshot request is processed by the next UE frame.
    await new Promise(resolve => setTimeout(resolve, 1000));
    const cleanup = await evaluate(`(() => {
        const UE=require('ue'),puerts=require('puerts'),test=globalThis.w103Test;
        test.actor.K2_DestroyActor();
        const widgets=puerts.$ref();
        UE.WidgetBlueprintLibrary.GetAllWidgetsOfClass(test.root,widgets,UE.ReactWidget.StaticClass(),true);
        const result={viewportRoots:puerts.$unref(widgets).Num(),rootDetached:!test.root.WidgetTree.RootWidget};
        return result;
    })()`);
    assert.equal(cleanup.viewportRoots, 0);
    assert.equal(cleanup.rootDetached, true);
    const output = path.join(root, 'Saved/W1-03');
    fs.mkdirSync(output, {recursive:true});
    fs.writeFileSync(path.join(output, 'ui-validation.json'), JSON.stringify({timestamp:new Date().toISOString(),scope:'UE standalone; real ReactUMG widget tree and native button delegates; not physical mouse input',...result,cleanup},null,2));
    console.log(`W1-03 UE UI PASS: ${result.checks.length} checks + EndPlay cleanup`);
}
main().catch(error => {console.error(error);process.exitCode=1;}).finally(() => socket?.close());
