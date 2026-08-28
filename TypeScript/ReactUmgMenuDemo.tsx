import * as React from 'react'
import * as UE from 'ue'
import {
    Border,
    Button,
    Overlay,
    SizeBox,
    Spacer,
    TextBlock,
    VerticalBox,
    ReactUMG,
} from 'react-umg'

type ReactUmgRoot = {
    removeFromViewport(): void
    getWidget(): UE.Widget
}

type MainMenuProps = {
    onStartGame(): void
    onQuitGame(): void
}

type MenuButtonProps = {
    label: string
    onClick(): void
    background: UE.LinearColor
}

const menuRoots = new WeakMap<ReactUmgMenuDemo, ReactUmgRoot>()

// ReactUMG 生成的控件声明缺少标准 JSX 构造签名；运行时导出实际是控件名字符串。
const UBorder = Border as unknown as React.ComponentType<any>
const UButton = Button as unknown as React.ComponentType<any>
const UOverlay = Overlay as unknown as React.ComponentType<any>
const USizeBox = SizeBox as unknown as React.ComponentType<any>
const USpacer = Spacer as unknown as React.ComponentType<any>
const UTextBlock = TextBlock as unknown as React.ComponentType<any>
const UVerticalBox = VerticalBox as unknown as React.ComponentType<any>

const color = (red: number, green: number, blue: number, alpha = 1): UE.LinearColor =>
    new UE.LinearColor(red, green, blue, alpha)

const textColor = (red: number, green: number, blue: number, alpha = 1): UE.SlateColor =>
    new UE.SlateColor(color(red, green, blue, alpha), UE.ESlateColorStylingMode.UseColor_Specified)

function MenuButton(props: MenuButtonProps): React.ReactElement {
    return (
        <USizeBox
            WidthOverride={360}
            HeightOverride={62}
            bOverride_WidthOverride={true}
            bOverride_HeightOverride={true}
            Slot={{
                Padding: new UE.Margin(0, 7, 0, 7),
                HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                VerticalAlignment: UE.EVerticalAlignment.VAlign_Center,
            }}
        >
            <UButton
                BackgroundColor={props.background}
                IsFocusable={true}
                OnClicked={props.onClick}
            >
                <UTextBlock
                    Text={props.label}
                    Font={{ Size: 24 }}
                    ColorAndOpacity={textColor(0.94, 0.97, 1)}
                    Justification={UE.ETextJustify.Center}
                    Slot={{
                        Padding: new UE.Margin(16, 8, 16, 8),
                        HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                        VerticalAlignment: UE.EVerticalAlignment.VAlign_Center,
                    }}
                />
            </UButton>
        </USizeBox>
    )
}

function MainMenu(props: MainMenuProps): React.ReactElement {
    const [showCredits, setShowCredits] = React.useState(false)

    return (
        <UOverlay>
            <UBorder
                BrushColor={color(0.015, 0.025, 0.045, 0.94)}
                Slot={{
                    HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Fill,
                    VerticalAlignment: UE.EVerticalAlignment.VAlign_Fill,
                }}
            />

            <UVerticalBox
                Slot={{
                    Padding: new UE.Margin(40, 40, 40, 40),
                    HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                    VerticalAlignment: UE.EVerticalAlignment.VAlign_Center,
                }}
            >
                <UTextBlock
                    Text="REACT UMG MENU"
                    Font={{ Size: 42, LetterSpacing: 120 }}
                    ColorAndOpacity={textColor(0.70, 0.86, 1)}
                    Justification={UE.ETextJustify.Center}
                    Slot={{
                        Padding: new UE.Margin(0, 0, 0, 20),
                        HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                    }}
                />

                <UTextBlock
                    Text="全 TypeScript / TSX 驱动"
                    Font={{ Size: 17 }}
                    ColorAndOpacity={textColor(0.55, 0.62, 0.72)}
                    Justification={UE.ETextJustify.Center}
                    Slot={{
                        Padding: new UE.Margin(0, 0, 0, 22),
                        HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                    }}
                />

                <MenuButton
                    label="开始游戏"
                    background={color(0.08, 0.34, 0.48)}
                    onClick={props.onStartGame}
                />
                <MenuButton
                    label="结束游戏"
                    background={color(0.42, 0.11, 0.13)}
                    onClick={props.onQuitGame}
                />
                <MenuButton
                    label="致谢"
                    background={showCredits ? color(0.34, 0.25, 0.08) : color(0.16, 0.18, 0.25)}
                    onClick={() => setShowCredits(value => !value)}
                />

                <USizeBox
                    HeightOverride={showCredits ? 92 : 1}
                    bOverride_HeightOverride={true}
                    Slot={{
                        Padding: new UE.Margin(0, 12, 0, 0),
                        HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                    }}
                >
                    {showCredits ? (
                        <UBorder
                            Padding={new UE.Margin(18, 12, 18, 12)}
                            BrushColor={color(0.05, 0.065, 0.095, 0.96)}
                        >
                            <UTextBlock
                                Text={'感谢 Unreal Engine、Puerts 与 ReactUMG 社区。\n这个菜单没有手写蓝图或 WBP。'}
                                Font={{ Size: 16 }}
                                ColorAndOpacity={textColor(0.72, 0.78, 0.88)}
                                Justification={UE.ETextJustify.Center}
                                AutoWrapText={true}
                            />
                        </UBorder>
                    ) : (
                        <USpacer Size={new UE.Vector2D(1, 1)} />
                    )}
                </USizeBox>
            </UVerticalBox>
        </UOverlay>
    )
}

function setGameInput(actor: ReactUmgMenuDemo): void {
    const controller = UE.GameplayStatics.GetPlayerController(actor, 0)
    if (!controller) return
    controller.bShowMouseCursor = false
    UE.WidgetBlueprintLibrary.SetInputMode_GameOnly(controller, true)
}

function setMenuInput(actor: ReactUmgMenuDemo, widget: UE.Widget): void {
    const controller = UE.GameplayStatics.GetPlayerController(actor, 0)
    if (!controller) return
    controller.bShowMouseCursor = true
    UE.WidgetBlueprintLibrary.SetInputMode_UIOnlyEx(controller, widget, UE.EMouseLockMode.DoNotLock, true)
}

function removeMenu(actor: ReactUmgMenuDemo): void {
    const root = menuRoots.get(actor)
    if (!root) return
    root.removeFromViewport()
    menuRoots.delete(actor)
}

class ReactUmgMenuDemo extends UE.Actor {
    Constructor(): void {
        this.RootComponent = new UE.SceneComponent(this, 'Root')
    }

    ReceiveBeginPlay(): void {
        const world = this.GetWorld()
        if (!world) {
            console.error('[ReactUmgMenuDemo] 无法获取 World，菜单创建失败。')
            return
        }

        ReactUMG.init(world)

        let root: ReactUmgRoot
        root = ReactUMG.render(
            <MainMenu
                onStartGame={() => {
                    removeMenu(this)
                    setGameInput(this)
                    console.warn('[ReactUmgMenuDemo] 点击“开始游戏”：菜单已隐藏。')
                }}
                onQuitGame={() => {
                    const controller = UE.GameplayStatics.GetPlayerController(this, 0)
                    console.warn('[ReactUmgMenuDemo] 点击“结束游戏”：请求退出游戏。')
                    UE.KismetSystemLibrary.QuitGame(this, controller, UE.EQuitPreference.Quit, false)
                }}
            />
        ) as unknown as ReactUmgRoot

        menuRoots.set(this, root)
        setMenuInput(this, root.getWidget())
        console.warn('[ReactUmgMenuDemo] ReactUMG 菜单已创建：开始游戏 / 结束游戏 / 致谢。')
    }

    ReceiveEndPlay(_endPlayReason: UE.EEndPlayReason): void {
        removeMenu(this)
    }
}

export default ReactUmgMenuDemo
