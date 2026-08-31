import * as React from 'react'
import * as UE from 'ue'
import { ReactUMG, Border, Button, HorizontalBox, Overlay, ScrollBox, SizeBox, TextBlock, VerticalBox } from 'react-umg'
import type { CampRelationship, CampWorld, ResidentInitialState } from './AmbientNpcCampData'

export type CampPanelSnapshot = {
    name: string
    day: number
    time: string
    paused: boolean
    resetCount: number
    frameworkReady: boolean
    world: CampWorld
    residents: (ResidentInitialState & {
        id: string, name: string, profession: string, energy: number, maxEnergy: number, action: string
    })[]
    relationships: CampRelationship[]
}
export type CampPanelApi = { snapshot(): CampPanelSnapshot, reset(): void, togglePaused(): void }
export type CampPanelHandle = { refresh(): void, dispose(): void }

// ReactUMG exports widget names at runtime; its declarations lack JSX construct signatures.
const UBorder = Border as unknown as React.ComponentType<any>
const UButton = Button as unknown as React.ComponentType<any>
const UHorizontalBox = HorizontalBox as unknown as React.ComponentType<any>
const UOverlay = Overlay as unknown as React.ComponentType<any>
const UScrollBox = ScrollBox as unknown as React.ComponentType<any>
const USizeBox = SizeBox as unknown as React.ComponentType<any>
const UText = TextBlock as unknown as React.ComponentType<any>
const UVerticalBox = VerticalBox as unknown as React.ComponentType<any>
const color = (r: number, g: number, b: number, a = 1) => new UE.LinearColor(r, g, b, a)
const ink = (r = 0.88, g = 0.93, b = 0.90) => new UE.SlateColor(color(r, g, b), UE.ESlateColorStylingMode.UseColor_Specified)
const margin = (bottom = 8) => ({ Padding: new UE.Margin(0, 0, 0, bottom) })
const seasons = { spring: '春天', summer: '夏天', autumn: '秋天', winter: '冬天' }
const weather = { clear: '晴天', rain: '雨天', storm: '风暴', snow: '下雪' }

function Label(props: { text: string, size?: number, muted?: boolean }): React.ReactElement {
    return <UText Text={props.text} Font={{ Size: props.size ?? 16 }} AutoWrapText={true}
        ColorAndOpacity={props.muted ? ink(0.57, 0.68, 0.63) : ink()} Slot={margin()} />
}
function Action(props: { text: string, onClick(): void, selected?: boolean }): React.ReactElement {
    return <UButton OnClicked={props.onClick} IsFocusable={true}
        BackgroundColor={props.selected ? color(0.12, 0.39, 0.27) : color(0.11, 0.16, 0.14)}
        Slot={{ Padding: new UE.Margin(0, 0, 8, 0) }}>
        <UText Text={props.text} Font={{ Size: 16 }} ColorAndOpacity={ink()}
            Slot={{ Padding: new UE.Margin(12, 8, 12, 8) }} />
    </UButton>
}

export const CampPanel = React.forwardRef((props: { api: CampPanelApi }, ref: React.Ref<Pick<CampPanelHandle, 'refresh'>>) => {
    const initial = props.api.snapshot()
    const [snapshot, setSnapshot] = React.useState(initial)
    const [selectedId, setSelectedId] = React.useState(initial.residents[0]?.id ?? '')
    const [message, setMessage] = React.useState('查看实时状态；不会改写初始 JSON。')
    const refresh = () => {
        const next = props.api.snapshot()
        setSnapshot(next)
        setSelectedId(previous => next.residents.some(npc => npc.id === previous) ? previous : next.residents[0]?.id ?? '')
    }
    React.useImperativeHandle(ref, () => ({ refresh }))
    const run = (action: () => void, nextMessage: string): void => {
        try {
            action()
            refresh()
            setMessage(nextMessage)
        } catch (error) {
            setMessage(`操作失败：${String(error)}`)
            console.error(`[AmbientNpcCampPanel] ${String(error)}`)
        }
    }
        const npc = snapshot.residents.find(resident => resident.id === selectedId)
        const resources = snapshot.world.shared_resources
        const relations = snapshot.relationships.filter(relation => relation.from === npc?.id)
        const nameOf = (id: string) => snapshot.residents.find(resident => resident.id === id)?.name ?? id
        return <UOverlay Visibility={UE.ESlateVisibility.SelfHitTestInvisible}>
            <USizeBox WidthOverride={470} HeightOverride={640} bOverride_WidthOverride={true} bOverride_HeightOverride={true}
                Slot={{ Padding: new UE.Margin(20, 20, 20, 20), HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Left,
                    VerticalAlignment: UE.EVerticalAlignment.VAlign_Top }}>
                <UBorder BrushColor={color(0.025, 0.046, 0.035, 0.97)} Padding={new UE.Margin(20, 16, 20, 16)}>
                    <UVerticalBox>
                        <Label text={`${snapshot.name}  /  状态查看`} size={25} />
                        <Label text={`第 ${snapshot.day} 日 ${snapshot.time}   ·   ${snapshot.paused ? '已暂停' : '运行中'}   ·   重置 ${snapshot.resetCount} 次`} muted />
                        <Label text={`${seasons[snapshot.world.season]} / ${weather[snapshot.world.weather]}    资源丰度 ${snapshot.world.resource_abundance.toFixed(1)}`} />
                        <Label text={`公共储备：食物 ${resources.food} · 饮水 ${resources.water} · 柴火 ${resources.wood} · 草药 ${resources.herbs}`} size={14} muted />
                        <UHorizontalBox Slot={margin(16)}>
                            {snapshot.residents.map(resident => <Action key={resident.id} text={resident.name}
                                selected={resident.id === selectedId}
                                onClick={() => setSelectedId(resident.id)} />)}
                        </UHorizontalBox>
                        <UScrollBox Slot={{ Size: { SizeRule: UE.ESlateSizeRule.Fill, Value: 1 }, Padding: new UE.Margin(0, 0, 0, 12) }}>
                            <UVerticalBox>
                                <Label text={npc ? `${npc.name}  ·  ${npc.profession}` : '没有可显示的居民'} size={19} />
                                <Label text={`稳定 ID：${npc?.id ?? '—'}`} size={14} muted />
                                <Label text={`当前行为：${npc?.action ?? '—'}    精力：${npc?.energy.toFixed(1) ?? '—'} / ${npc?.maxEnergy ?? '—'}`} />
                                <Label text={`私人口粮：${npc?.personal_food ?? '—'} 份    崇拜：${npc?.worship ?? '—'} / 100    心情：${npc?.mood ?? '—'}`} />
                                <Label text="对外关系  /  好感 · 恋爱倾向 · 信任" size={15} muted />
                                <Label text={relations.map(relation => `→ ${nameOf(relation.to)}：${relation.affection} / ${relation.attraction} / ${relation.trust}`).join('\n')} />
                                <Label text={`活动事件：${snapshot.world.active_event_ids.length ? snapshot.world.active_event_ids.join('、') : '无'}`} size={14} muted />
                                <Label text={snapshot.frameworkReady ? 'AmbientNPC 框架已初始化' : '警告：AmbientNPC 框架未初始化'} size={14} muted={snapshot.frameworkReady} />
                                <Label text="W1-03 调试视图：资源、关系和天气是状态数据，尚未接入采集结算与场景表现。" size={13} muted />
                            </UVerticalBox>
                        </UScrollBox>
                        <UHorizontalBox Slot={margin(10)}>
                            <Action text={snapshot.paused ? '继续日程' : '暂停日程'} onClick={() => run(
                                props.api.togglePaused, '已切换日程暂停状态。')} />
                            <Action text="恢复初始状态" onClick={() => run(props.api.reset, '已重置到第1日 00:00并暂停；居民 ID 不变。')} />
                        </UHorizontalBox>
                        <Label text={message} size={13} muted />
                    </UVerticalBox>
                </UBorder>
            </USizeBox>
        </UOverlay>
})

export function mountCampPanel(actor: UE.Actor, api: CampPanelApi): CampPanelHandle {
    const world = actor.GetWorld()
    const controller = UE.GameplayStatics.GetPlayerController(actor, 0)
    if (!world || !controller) throw new Error('没有本地 World / PlayerController，无法挂载面板')
    ReactUMG.init(world)
    let component: Pick<CampPanelHandle, 'refresh'> | null = null
    const previousCursor = controller.bShowMouseCursor
    const root = ReactUMG.render(<CampPanel api={api} ref={instance => { component = instance }} />) as unknown as {
        getWidget(): UE.Widget, removeFromViewport(): void
    }
    controller.bShowMouseCursor = true
    UE.WidgetBlueprintLibrary.SetInputMode_GameAndUIEx(controller, root.getWidget(), UE.EMouseLockMode.DoNotLock, false, false)
    let disposed = false
    return {
        refresh: () => { if (!disposed) component?.refresh() },
        dispose: () => {
            if (disposed) return
            disposed = true
            root.removeFromViewport()
            component = null
            controller.bShowMouseCursor = previousCursor
            UE.WidgetBlueprintLibrary.SetInputMode_GameOnly(controller, false)
        },
    }
}
