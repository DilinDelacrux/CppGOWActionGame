import * as UE from 'ue'

/**
 * 方案二：UMG 只负责外观，TypeScript 负责菜单逻辑。
 *
 * UMG Widget Blueprint 必须把以下控件勾选为 Is Variable：
 * - Btn_StartGame: Button
 * - Btn_QuitGame: Button
 * - Btn_Credits: Button
 * - Panel_Credits: 任意 Widget 容器
 */
type UmgMenuView = UE.UserWidget & {
    Btn_StartGame: UE.Button
    Btn_QuitGame: UE.Button
    Btn_Credits: UE.Button
    Panel_Credits: UE.Widget
}

type MenuCallbacks = {
    startGame: () => void
    quitGame: () => void
    toggleCredits: () => void
}

type MenuRuntime = {
    widget: UmgMenuView
    controller: UE.PlayerController
    callbacks: MenuCallbacks
}

const runtimes = new WeakMap<object, MenuRuntime>()
const DEFAULT_WIDGET_CLASS_PATH = '/Game/AmbientNpcBehavior/BP/UMG/WBP_TsMenuDemo.WBP_TsMenuDemo_C'

class UmgMenuLogicDemo extends UE.Actor {
    /**
     * 使用字符串而不是 TSubclassOf，避免 Puerts TypeScript Blueprint 在
     * 编辑器重建类时把 WidgetBlueprintGeneratedClass 创建成错误的子对象。
     */
    MenuWidgetClassPath: string = DEFAULT_WIDGET_CLASS_PATH

    Constructor(): void {
        this.RootComponent = new UE.SceneComponent(this, 'Root')
    }

    ReceiveBeginPlay(): void {
        this.openMenu()
    }

    ReceiveEndPlay(_endPlayReason: UE.EEndPlayReason): void {
        this.closeMenu(false)
    }

    // @no-blueprint
    private openMenu(): void {
        if (runtimes.has(this)) return

        const controller = UE.GameplayStatics.GetPlayerController(this, 0)
        if (!controller) {
            console.error('[UmgMenuLogicDemo] 找不到 PlayerController，无法创建菜单。')
            return
        }

        const widgetClass = this.resolveWidgetClass()
        if (!widgetClass) {
            console.error(
                `[UmgMenuLogicDemo] 无法加载 UMG Class：${this.widgetClassPath()}。` +
                '请检查 MenuWidgetClassPath 是否是以 _C 结尾的完整生成类路径。'
            )
            return
        }

        const createdWidget = UE.WidgetBlueprintLibrary.Create(this, widgetClass, controller)
        if (!createdWidget) {
            console.error('[UmgMenuLogicDemo] WidgetBlueprintLibrary.Create 创建菜单失败。')
            return
        }

        const widget = createdWidget as UmgMenuView
        const missingWidgets = this.findMissingWidgets(widget)
        if (missingWidgets.length > 0) {
            console.error(
                `[UmgMenuLogicDemo] UMG 控件契约不完整：${missingWidgets.join(', ')}。` +
                '请检查控件名称、类型以及 Is Variable。'
            )
            createdWidget.RemoveFromParent()
            return
        }

        const callbacks: MenuCallbacks = {
            startGame: () => {
                this.closeMenu(true)
                console.warn('[UmgMenuLogicDemo] 点击“开始游戏”：UMG 菜单已隐藏。')
            },
            quitGame: () => {
                console.warn('[UmgMenuLogicDemo] 点击“结束游戏”：请求退出游戏。')
                UE.KismetSystemLibrary.QuitGame(this, controller, UE.EQuitPreference.Quit, false)
            },
            toggleCredits: () => {
                const isVisible = widget.Panel_Credits.GetVisibility() === UE.ESlateVisibility.Visible
                widget.Panel_Credits.SetVisibility(
                    isVisible ? UE.ESlateVisibility.Collapsed : UE.ESlateVisibility.Visible
                )
                console.warn(`[UmgMenuLogicDemo] 致谢面板：${isVisible ? '关闭' : '打开'}。`)
            }
        }

        widget.Btn_StartGame.OnClicked.Add(callbacks.startGame)
        widget.Btn_QuitGame.OnClicked.Add(callbacks.quitGame)
        widget.Btn_Credits.OnClicked.Add(callbacks.toggleCredits)
        widget.AddToViewport(100)

        runtimes.set(this, { widget, controller, callbacks })
        UE.WidgetBlueprintLibrary.SetInputMode_UIOnlyEx(
            controller,
            widget,
            UE.EMouseLockMode.DoNotLock,
            false
        )
        controller.bShowMouseCursor = true

        console.warn('[UmgMenuLogicDemo] 方案二启动：外观来自 UMG，交互逻辑来自 TypeScript。')
    }

    // @no-blueprint
    private closeMenu(restoreGameInput: boolean): void {
        const runtime = runtimes.get(this)
        if (!runtime) return

        runtime.widget.Btn_StartGame.OnClicked.Remove(runtime.callbacks.startGame)
        runtime.widget.Btn_QuitGame.OnClicked.Remove(runtime.callbacks.quitGame)
        runtime.widget.Btn_Credits.OnClicked.Remove(runtime.callbacks.toggleCredits)
        runtime.widget.RemoveFromParent()
        runtimes.delete(this)

        if (restoreGameInput) {
            UE.WidgetBlueprintLibrary.SetInputMode_GameOnly(runtime.controller, false)
            runtime.controller.bShowMouseCursor = false
        }
    }

    // @no-blueprint
    private resolveWidgetClass(): UE.Class | undefined {
        const classPath = this.widgetClassPath()
        try {
            return UE.Class.Load(classPath) || undefined
        } catch (error) {
            console.error(`[UmgMenuLogicDemo] UMG Class 加载失败：${classPath} | ${String(error)}`)
            return undefined
        }
    }

    // @no-blueprint
    private widgetClassPath(): string {
        const configuredPath = typeof this.MenuWidgetClassPath === 'string'
            ? this.MenuWidgetClassPath.trim()
            : ''
        return configuredPath || DEFAULT_WIDGET_CLASS_PATH
    }

    // @no-blueprint
    private findMissingWidgets(widget: UmgMenuView): string[] {
        const missing: string[] = []
        if (!widget.Btn_StartGame || !widget.Btn_StartGame.IsA(UE.Button.StaticClass())) missing.push('Btn_StartGame (Button)')
        if (!widget.Btn_QuitGame || !widget.Btn_QuitGame.IsA(UE.Button.StaticClass())) missing.push('Btn_QuitGame (Button)')
        if (!widget.Btn_Credits || !widget.Btn_Credits.IsA(UE.Button.StaticClass())) missing.push('Btn_Credits (Button)')
        if (!widget.Panel_Credits || !widget.Panel_Credits.IsA(UE.Widget.StaticClass())) missing.push('Panel_Credits (Widget)')
        return missing
    }
}

export default UmgMenuLogicDemo
