"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const UE = require("ue");
const react_umg_1 = require("react-umg");
const menuRoots = new WeakMap();
// ReactUMG 生成的控件声明缺少标准 JSX 构造签名；运行时导出实际是控件名字符串。
const UBorder = react_umg_1.Border;
const UButton = react_umg_1.Button;
const UOverlay = react_umg_1.Overlay;
const USizeBox = react_umg_1.SizeBox;
const USpacer = react_umg_1.Spacer;
const UTextBlock = react_umg_1.TextBlock;
const UVerticalBox = react_umg_1.VerticalBox;
const color = (red, green, blue, alpha = 1) => new UE.LinearColor(red, green, blue, alpha);
const textColor = (red, green, blue, alpha = 1) => new UE.SlateColor(color(red, green, blue, alpha), UE.ESlateColorStylingMode.UseColor_Specified);
function MenuButton(props) {
    return (React.createElement(USizeBox, { WidthOverride: 360, HeightOverride: 62, bOverride_WidthOverride: true, bOverride_HeightOverride: true, Slot: {
            Padding: new UE.Margin(0, 7, 0, 7),
            HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
            VerticalAlignment: UE.EVerticalAlignment.VAlign_Center,
        } },
        React.createElement(UButton, { BackgroundColor: props.background, IsFocusable: true, OnClicked: props.onClick },
            React.createElement(UTextBlock, { Text: props.label, Font: { Size: 24 }, ColorAndOpacity: textColor(0.94, 0.97, 1), Justification: UE.ETextJustify.Center, Slot: {
                    Padding: new UE.Margin(16, 8, 16, 8),
                    HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                    VerticalAlignment: UE.EVerticalAlignment.VAlign_Center,
                } }))));
}
function MainMenu(props) {
    const [showCredits, setShowCredits] = React.useState(false);
    return (React.createElement(UOverlay, null,
        React.createElement(UBorder, { BrushColor: color(0.015, 0.025, 0.045, 0.94), Slot: {
                HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Fill,
                VerticalAlignment: UE.EVerticalAlignment.VAlign_Fill,
            } }),
        React.createElement(UVerticalBox, { Slot: {
                Padding: new UE.Margin(40, 40, 40, 40),
                HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                VerticalAlignment: UE.EVerticalAlignment.VAlign_Center,
            } },
            React.createElement(UTextBlock, { Text: "REACT UMG MENU", Font: { Size: 42, LetterSpacing: 120 }, ColorAndOpacity: textColor(0.70, 0.86, 1), Justification: UE.ETextJustify.Center, Slot: {
                    Padding: new UE.Margin(0, 0, 0, 20),
                    HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                } }),
            React.createElement(UTextBlock, { Text: "\u5168 TypeScript / TSX \u9A71\u52A8", Font: { Size: 17 }, ColorAndOpacity: textColor(0.55, 0.62, 0.72), Justification: UE.ETextJustify.Center, Slot: {
                    Padding: new UE.Margin(0, 0, 0, 22),
                    HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                } }),
            React.createElement(MenuButton, { label: "\u5F00\u59CB\u6E38\u620F", background: color(0.08, 0.34, 0.48), onClick: props.onStartGame }),
            React.createElement(MenuButton, { label: "\u7ED3\u675F\u6E38\u620F", background: color(0.42, 0.11, 0.13), onClick: props.onQuitGame }),
            React.createElement(MenuButton, { label: "\u81F4\u8C22", background: showCredits ? color(0.34, 0.25, 0.08) : color(0.16, 0.18, 0.25), onClick: () => setShowCredits(value => !value) }),
            React.createElement(USizeBox, { HeightOverride: showCredits ? 92 : 1, bOverride_HeightOverride: true, Slot: {
                    Padding: new UE.Margin(0, 12, 0, 0),
                    HorizontalAlignment: UE.EHorizontalAlignment.HAlign_Center,
                } }, showCredits ? (React.createElement(UBorder, { Padding: new UE.Margin(18, 12, 18, 12), BrushColor: color(0.05, 0.065, 0.095, 0.96) },
                React.createElement(UTextBlock, { Text: '感谢 Unreal Engine、Puerts 与 ReactUMG 社区。\n这个菜单没有手写蓝图或 WBP。', Font: { Size: 16 }, ColorAndOpacity: textColor(0.72, 0.78, 0.88), Justification: UE.ETextJustify.Center, AutoWrapText: true }))) : (React.createElement(USpacer, { Size: new UE.Vector2D(1, 1) }))))));
}
function setGameInput(actor) {
    const controller = UE.GameplayStatics.GetPlayerController(actor, 0);
    if (!controller)
        return;
    controller.bShowMouseCursor = false;
    UE.WidgetBlueprintLibrary.SetInputMode_GameOnly(controller, true);
}
function setMenuInput(actor, widget) {
    const controller = UE.GameplayStatics.GetPlayerController(actor, 0);
    if (!controller)
        return;
    controller.bShowMouseCursor = true;
    UE.WidgetBlueprintLibrary.SetInputMode_UIOnlyEx(controller, widget, UE.EMouseLockMode.DoNotLock, true);
}
function removeMenu(actor) {
    const root = menuRoots.get(actor);
    if (!root)
        return;
    root.removeFromViewport();
    menuRoots.delete(actor);
}
class ReactUmgMenuDemo extends UE.Actor {
    Constructor() {
        this.RootComponent = new UE.SceneComponent(this, 'Root');
    }
    ReceiveBeginPlay() {
        const world = this.GetWorld();
        if (!world) {
            console.error('[ReactUmgMenuDemo] 无法获取 World，菜单创建失败。');
            return;
        }
        react_umg_1.ReactUMG.init(world);
        let root;
        root = react_umg_1.ReactUMG.render(React.createElement(MainMenu, { onStartGame: () => {
                removeMenu(this);
                setGameInput(this);
                console.warn('[ReactUmgMenuDemo] 点击“开始游戏”：菜单已隐藏。');
            }, onQuitGame: () => {
                const controller = UE.GameplayStatics.GetPlayerController(this, 0);
                console.warn('[ReactUmgMenuDemo] 点击“结束游戏”：请求退出游戏。');
                UE.KismetSystemLibrary.QuitGame(this, controller, UE.EQuitPreference.Quit, false);
            } }));
        menuRoots.set(this, root);
        setMenuInput(this, root.getWidget());
        console.warn('[ReactUmgMenuDemo] ReactUMG 菜单已创建：开始游戏 / 结束游戏 / 致谢。');
    }
    ReceiveEndPlay(_endPlayReason) {
        removeMenu(this);
    }
}
exports.default = ReactUmgMenuDemo;
//# sourceMappingURL=ReactUmgMenuDemo.js.map