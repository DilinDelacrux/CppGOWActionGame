"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountCampPanel = exports.CampPanel = void 0;
const React = require("react");
const UE = require("ue");
const react_umg_1 = require("react-umg");
// ReactUMG exports widget names at runtime; its declarations lack JSX construct signatures.
const UBorder = react_umg_1.Border;
const UButton = react_umg_1.Button;
const UHorizontalBox = react_umg_1.HorizontalBox;
const UOverlay = react_umg_1.Overlay;
const UScrollBox = react_umg_1.ScrollBox;
const USizeBox = react_umg_1.SizeBox;
const UText = react_umg_1.TextBlock;
const UVerticalBox = react_umg_1.VerticalBox;
const color = (r, g, b, a = 1) => new UE.LinearColor(r, g, b, a);
const ink = (r = 0.88, g = 0.93, b = 0.90) => new UE.SlateColor(color(r, g, b), UE.ESlateColorStylingMode.UseColor_Specified);
const margin = (bottom = 8) => ({ Padding: new UE.Margin(0, 0, 0, bottom) });
const seasons = { spring: '春天', summer: '夏天', autumn: '秋天', winter: '冬天' };
const weather = { clear: '晴天', rain: '雨天', storm: '风暴', snow: '下雪' };
function Label(props) {
    return React.createElement(UText, { Text: props.text, Font: { Size: props.size ?? 16 }, AutoWrapText: true, ColorAndOpacity: props.muted ? ink(0.57, 0.68, 0.63) : ink(), Slot: margin() });
}
function Action(props) {
    return React.createElement(UButton, { OnClicked: props.onClick, IsFocusable: true, BackgroundColor: props.selected ? color(0.12, 0.39, 0.27) : color(0.11, 0.16, 0.14), Slot: { Padding: new UE.Margin(0, 0, 8, 0) } },
        React.createElement(UText, { Text: props.text, Font: { Size: 16 }, ColorAndOpacity: ink(), Slot: { Padding: new UE.Margin(12, 8, 12, 8) } }));
}
exports.CampPanel = React.forwardRef((props, ref) => {
    const initial = props.api.snapshot();
    const [snapshot, setSnapshot] = React.useState(initial);
    const [selectedId, setSelectedId] = React.useState(initial.residents[0]?.id ?? '');
    const [message, setMessage] = React.useState('查看实时状态；不会改写初始 JSON。');
    const refresh = () => {
        const next = props.api.snapshot();
        setSnapshot(next);
        setSelectedId(previous => next.residents.some(npc => npc.id === previous) ? previous : next.residents[0]?.id ?? '');
    };
    React.useImperativeHandle(ref, () => ({ refresh }));
    const run = (action, nextMessage) => {
        try {
            action();
            refresh();
            setMessage(nextMessage);
        }
        catch (error) {
            setMessage(`操作失败：${String(error)}`);
            console.error(`[AmbientNpcCampPanel] ${String(error)}`);
        }
    };
    const npc = snapshot.residents.find(resident => resident.id === selectedId);
    const resources = snapshot.world.shared_resources;
    const relations = snapshot.relationships.filter(relation => relation.from === npc?.id);
    const nameOf = (id) => snapshot.residents.find(resident => resident.id === id)?.name ?? id;
    return React.createElement(UOverlay, { Visibility: UE.ESlateVisibility.SelfHitTestInvisible },
        React.createElement(USizeBox, { WidthOverride: 470, HeightOverride: 640, bOverride_WidthOverride: true, bOverride_HeightOverride: true, Slot: { Padding: new UE.Margin(20, 20, 20, 20), HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Left,
                VerticalAlignment: UE.EVerticalAlignment.VAlign_Top } },
            React.createElement(UBorder, { BrushColor: color(0.025, 0.046, 0.035, 0.97), Padding: new UE.Margin(20, 16, 20, 16) },
                React.createElement(UVerticalBox, null,
                    React.createElement(Label, { text: `${snapshot.name}  /  状态查看`, size: 25 }),
                    React.createElement(Label, { text: `第 ${snapshot.day} 日 ${snapshot.time}   ·   ${snapshot.paused ? '已暂停' : '运行中'}   ·   重置 ${snapshot.resetCount} 次`, muted: true }),
                    React.createElement(Label, { text: `${seasons[snapshot.world.season]} / ${weather[snapshot.world.weather]}    资源丰度 ${snapshot.world.resource_abundance.toFixed(1)}` }),
                    React.createElement(Label, { text: `公共储备：食物 ${resources.food} · 饮水 ${resources.water} · 柴火 ${resources.wood} · 草药 ${resources.herbs}`, size: 14, muted: true }),
                    React.createElement(UHorizontalBox, { Slot: margin(16) }, snapshot.residents.map(resident => React.createElement(Action, { key: resident.id, text: resident.name, selected: resident.id === selectedId, onClick: () => setSelectedId(resident.id) }))),
                    React.createElement(UScrollBox, { Slot: { Size: { SizeRule: UE.ESlateSizeRule.Fill, Value: 1 }, Padding: new UE.Margin(0, 0, 0, 12) } },
                        React.createElement(UVerticalBox, null,
                            React.createElement(Label, { text: npc ? `${npc.name}  ·  ${npc.profession}` : '没有可显示的居民', size: 19 }),
                            React.createElement(Label, { text: `稳定 ID：${npc?.id ?? '—'}`, size: 14, muted: true }),
                            React.createElement(Label, { text: `当前行为：${npc?.action ?? '—'}    精力：${npc?.energy.toFixed(1) ?? '—'} / ${npc?.maxEnergy ?? '—'}` }),
                            React.createElement(Label, { text: `私人口粮：${npc?.personal_food ?? '—'} 份    崇拜：${npc?.worship ?? '—'} / 100    心情：${npc?.mood ?? '—'}` }),
                            React.createElement(Label, { text: "\u5BF9\u5916\u5173\u7CFB  /  \u597D\u611F \u00B7 \u604B\u7231\u503E\u5411 \u00B7 \u4FE1\u4EFB", size: 15, muted: true }),
                            React.createElement(Label, { text: relations.map(relation => `→ ${nameOf(relation.to)}：${relation.affection} / ${relation.attraction} / ${relation.trust}`).join('\n') }),
                            React.createElement(Label, { text: `活动事件：${snapshot.world.active_event_ids.length ? snapshot.world.active_event_ids.join('、') : '无'}`, size: 14, muted: true }),
                            React.createElement(Label, { text: snapshot.frameworkReady ? 'AmbientNPC 框架已初始化' : '警告：AmbientNPC 框架未初始化', size: 14, muted: snapshot.frameworkReady }),
                            React.createElement(Label, { text: "W1-03 \u8C03\u8BD5\u89C6\u56FE\uFF1A\u8D44\u6E90\u3001\u5173\u7CFB\u548C\u5929\u6C14\u662F\u72B6\u6001\u6570\u636E\uFF0C\u5C1A\u672A\u63A5\u5165\u91C7\u96C6\u7ED3\u7B97\u4E0E\u573A\u666F\u8868\u73B0\u3002", size: 13, muted: true }))),
                    React.createElement(UHorizontalBox, { Slot: margin(10) },
                        React.createElement(Action, { text: snapshot.paused ? '继续日程' : '暂停日程', onClick: () => run(props.api.togglePaused, '已切换日程暂停状态。') }),
                        React.createElement(Action, { text: "\u6062\u590D\u521D\u59CB\u72B6\u6001", onClick: () => run(props.api.reset, '已重置到第1日 00:00并暂停；居民 ID 不变。') })),
                    React.createElement(Label, { text: message, size: 13, muted: true })))));
});
function mountCampPanel(actor, api) {
    const world = actor.GetWorld();
    const controller = UE.GameplayStatics.GetPlayerController(actor, 0);
    if (!world || !controller)
        throw new Error('没有本地 World / PlayerController，无法挂载面板');
    react_umg_1.ReactUMG.init(world);
    let component = null;
    const previousCursor = controller.bShowMouseCursor;
    const root = react_umg_1.ReactUMG.render(React.createElement(exports.CampPanel, { api: api, ref: instance => { component = instance; } }));
    controller.bShowMouseCursor = true;
    UE.WidgetBlueprintLibrary.SetInputMode_GameAndUIEx(controller, root.getWidget(), UE.EMouseLockMode.DoNotLock, false, false);
    let disposed = false;
    return {
        refresh: () => { if (!disposed)
            component?.refresh(); },
        dispose: () => {
            if (disposed)
                return;
            disposed = true;
            root.removeFromViewport();
            component = null;
            controller.bShowMouseCursor = previousCursor;
            UE.WidgetBlueprintLibrary.SetInputMode_GameOnly(controller, false);
        },
    };
}
exports.mountCampPanel = mountCampPanel;
//# sourceMappingURL=AmbientNpcCampPanel.js.map