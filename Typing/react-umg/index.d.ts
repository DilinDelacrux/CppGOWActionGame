declare module "react-umg" {
    import * as React from 'react';
    import * as UE from 'ue';
    import * as cpp from 'cpp';
    type TArray<T> = UE.TArray<T>;
    type TSet<T> = UE.TSet<T>;
    type TMap<TKey, TValue> = UE.TMap<TKey, TValue>;

    type RecursivePartial<T> = {
        [P in keyof T]?:
        T[P] extends (infer U)[] ? RecursivePartial<U>[] :
        T[P] extends object ? RecursivePartial<T[P]> :
        T[P];
    };

    interface PanelSlot {
    }

    interface BackgroundBlurSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface BorderSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface ButtonSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface CanvasPanelSlot extends PanelSlot {
        LayoutData?: RecursivePartial<UE.AnchorData>;
        bAutoSize?: boolean;
        ZOrder?: number;
    }

    interface GridSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        Row?: number;
        RowSpan?: number;
        Column?: number;
        ColumnSpan?: number;
        Layer?: number;
        Nudge?: RecursivePartial<UE.Vector2D>;
    }

    interface HorizontalBoxSlot extends PanelSlot {
        Size?: RecursivePartial<UE.SlateChildSize>;
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface OverlaySlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface SafeZoneSlot extends PanelSlot {
        bIsTitleSafe?: boolean;
        SafeAreaScale?: RecursivePartial<UE.Margin>;
        HAlign?: UE.EHorizontalAlignment;
        VAlign?: UE.EVerticalAlignment;
        Padding?: RecursivePartial<UE.Margin>;
    }

    interface ScaleBoxSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface ScrollBoxSlot extends PanelSlot {
        Size?: RecursivePartial<UE.SlateChildSize>;
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface SizeBoxSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface StackBoxSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        Size?: RecursivePartial<UE.SlateChildSize>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface UniformGridSlot extends PanelSlot {
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        Row?: number;
        Column?: number;
    }

    interface VerticalBoxSlot extends PanelSlot {
        Size?: RecursivePartial<UE.SlateChildSize>;
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface WidgetSwitcherSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface WindowTitleBarAreaSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface WrapBoxSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        FillSpanWhenLessThan?: number;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        bFillEmptySpace?: boolean;
        bForceNewLine?: boolean;
    }

    interface LoadGuardSlot extends PanelSlot {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
    }

    interface CommonVisibilitySwitcherSlot extends OverlaySlot {
    }

    export interface Props {
        Slot ? : PanelSlot;
    }

    interface WidgetProps extends Props {
        bIsEnabledDelegate?: () => boolean;
        ToolTipTextDelegate?: () => string;
        ToolTipText?: string;
        VisibilityDelegate?: () => UE.ESlateVisibility;
        RenderTransform?: RecursivePartial<UE.WidgetTransform>;
        RenderTransformPivot?: RecursivePartial<UE.Vector2D>;
        FlowDirectionPreference?: UE.EFlowDirectionPreference;
        bIsVariable?: boolean;
        bCreatedByConstructionScript?: boolean;
        bIsEnabled?: boolean;
        bOverride_Cursor?: boolean;
        bOverrideAccessibleDefaults?: boolean;
        bCanChildrenBeAccessible?: boolean;
        AccessibleBehavior?: UE.ESlateAccessibleBehavior;
        AccessibleSummaryBehavior?: UE.ESlateAccessibleBehavior;
        AccessibleText?: string;
        AccessibleTextDelegate?: () => string;
        AccessibleSummaryText?: string;
        AccessibleSummaryTextDelegate?: () => string;
        bIsVolatile?: boolean;
        bHiddenInDesigner?: boolean;
        bExpandedInDesigner?: boolean;
        bLockedInDesigner?: boolean;
        Cursor?: UE.EMouseCursor;
        Clipping?: UE.EWidgetClipping;
        Visibility?: UE.ESlateVisibility;
        PixelSnapping?: UE.EWidgetPixelSnapping;
        RenderOpacity?: number;
        DesignerFlags?: number;
        DisplayLabel?: string;
        CategoryName?: string;
    }

    class Widget extends React.Component<WidgetProps> {
        nativePtr: UE.Widget;
    }

    interface UserWidgetProps extends WidgetProps {
        ColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        ColorAndOpacityDelegate?: () => UE.LinearColor;
        ForegroundColor?: RecursivePartial<UE.SlateColor>;
        ForegroundColorDelegate?: () => UE.SlateColor;
        OnVisibilityChanged?: (InVisibility: UE.ESlateVisibility) => void;
        Padding?: RecursivePartial<UE.Margin>;
        Priority?: number;
        bIsFocusable?: boolean;
        bStopAction?: boolean;
        bAutomaticallyRegisterInputOnConstruction?: boolean;
        QueuedWidgetAnimationTransitions?: TArray<UE.QueuedWidgetAnimationTransition>;
        NamedSlotBindings?: TArray<UE.NamedSlotBinding>;
        DesignTimeSize?: RecursivePartial<UE.Vector2D>;
        DesignSizeMode?: UE.EDesignPreviewSizeMode;
        PaletteCategory?: string;
        bHasScriptImplementedTick?: boolean;
        bHasScriptImplementedPaint?: boolean;
        TickFrequency?: UE.EWidgetTickFrequency;
        DesiredFocusWidget?: RecursivePartial<UE.WidgetChild>;
        AnimationCallbacks?: TArray<UE.AnimationEventBinding>;
    }

    class UserWidget extends React.Component<UserWidgetProps> {
        nativePtr: UE.UserWidget;
    }

    interface VREditorBaseUserWidgetProps extends UserWidgetProps {
    }

    class VREditorBaseUserWidget extends React.Component<VREditorBaseUserWidgetProps> {
        nativePtr: UE.VREditorBaseUserWidget;
    }

    interface RadialSliderProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        bUseCustomDefaultValue?: boolean;
        CustomDefaultValue?: number;
        SliderRange?: RecursivePartial<UE.RuntimeFloatCurve>;
        ValueTags?: TArray<number>;
        SliderHandleStartAngle?: number;
        SliderHandleEndAngle?: number;
        AngularOffset?: number;
        HandStartEndRatio?: RecursivePartial<UE.Vector2D>;
        WidgetStyle?: RecursivePartial<UE.SliderStyle>;
        SliderBarColor?: RecursivePartial<UE.LinearColor>;
        SliderProgressColor?: RecursivePartial<UE.LinearColor>;
        SliderHandleColor?: RecursivePartial<UE.LinearColor>;
        CenterBackgroundColor?: RecursivePartial<UE.LinearColor>;
        Locked?: boolean;
        MouseUsesStep?: boolean;
        RequiresControllerLock?: boolean;
        StepSize?: number;
        IsFocusable?: boolean;
        UseVerticalDrag?: boolean;
        ShowSliderHandle?: boolean;
        ShowSliderHand?: boolean;
        OnMouseCaptureBegin?: () => void;
        OnMouseCaptureEnd?: () => void;
        OnControllerCaptureBegin?: () => void;
        OnControllerCaptureEnd?: () => void;
        OnValueChanged?: (Value: number) => void;
    }

    class RadialSlider extends React.Component<RadialSliderProps> {
        nativePtr: UE.RadialSlider;
    }

    interface AssetThumbnailWidgetProps extends WidgetProps {
        AssetToShow?: RecursivePartial<UE.AssetData>;
        Resolution?: RecursivePartial<UE.IntPoint>;
        ThumbnailSettings?: RecursivePartial<UE.AssetThumbnailWidgetSettings>;
    }

    class AssetThumbnailWidget extends React.Component<AssetThumbnailWidgetProps> {
        nativePtr: UE.AssetThumbnailWidget;
    }

    interface ListViewBaseProps extends WidgetProps {
        WheelScrollMultiplier?: number;
        bEnableScrollAnimation?: boolean;
        ScrollingAnimationInterpolationSpeed?: number;
        bInEnableTouchAnimatedScrolling?: boolean;
        AllowOverscroll?: boolean;
        bEnableRightClickScrolling?: boolean;
        bEnableTouchScrolling?: boolean;
        bIsPointerScrollingEnabled?: boolean;
        bIsGamepadScrollingEnabled?: boolean;
        bEnableFixedLineOffset?: boolean;
        FixedLineScrollOffset?: number;
        bAllowDragging?: boolean;
        NumDesignerPreviewEntries?: number;
        EntryWidgetPool?: RecursivePartial<UE.UserWidgetPool>;
    }

    class ListViewBase extends React.Component<ListViewBaseProps> {
        nativePtr: UE.ListViewBase;
    }

    interface ListViewProps extends ListViewBaseProps {
        WidgetStyle?: RecursivePartial<UE.TableViewStyle>;
        ScrollBarStyle?: RecursivePartial<UE.ScrollBarStyle>;
        Orientation?: UE.EOrientation;
        SelectionMode?: UE.ESelectionMode;
        ConsumeMouseWheel?: UE.EConsumeMouseWheel;
        bClearSelectionOnClick?: boolean;
        bIsFocusable?: boolean;
        bReturnFocusToSelection?: boolean;
        ScrollIntoViewAlignment?: UE.EScrollIntoViewAlignment;
        EntrySpacing?: number;
        HorizontalEntrySpacing?: number;
        VerticalEntrySpacing?: number;
        ScrollBarPadding?: RecursivePartial<UE.Margin>;
        BP_OnListViewScrolled?: (ItemOffset: number, DistanceRemaining: number) => void;
    }

    class ListView extends React.Component<ListViewProps> {
        nativePtr: UE.ListView;
    }

    interface PanelWidgetProps extends WidgetProps {
    }

    class PanelWidget extends React.Component<PanelWidgetProps> {
        nativePtr: UE.PanelWidget;
    }

    interface ContentWidgetProps extends PanelWidgetProps {
    }

    class ContentWidget extends React.Component<ContentWidgetProps> {
        nativePtr: UE.ContentWidget;
    }

    interface BackgroundBlurProps extends ContentWidgetProps {
        Padding?: RecursivePartial<UE.Margin>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        bApplyAlphaToBlur?: boolean;
        BlurStrength?: number;
        bOverrideAutoRadiusCalculation?: boolean;
        BlurRadius?: number;
        CornerRadius?: RecursivePartial<UE.Vector4>;
        LowQualityFallbackBrush?: RecursivePartial<UE.SlateBrush>;
    }

    class BackgroundBlur extends React.Component<BackgroundBlurProps> {
        nativePtr: UE.BackgroundBlur;
    }

    interface BorderProps extends ContentWidgetProps {
        HorizontalAlignment?: UE.EHorizontalAlignment;
        VerticalAlignment?: UE.EVerticalAlignment;
        bShowEffectWhenDisabled?: boolean;
        ContentColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        ContentColorAndOpacityDelegate?: () => UE.LinearColor;
        Padding?: RecursivePartial<UE.Margin>;
        Background?: RecursivePartial<UE.SlateBrush>;
        BackgroundDelegate?: () => UE.SlateBrush;
        BrushColor?: RecursivePartial<UE.LinearColor>;
        BrushColorDelegate?: () => UE.LinearColor;
        DesiredSizeScale?: RecursivePartial<UE.Vector2D>;
        bFlipForRightToLeftFlowDirection?: boolean;
        OnMouseButtonDownEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
        OnMouseButtonUpEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
        OnMouseMoveEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
        OnMouseDoubleClickEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
    }

    class Border extends React.Component<BorderProps> {
        nativePtr: UE.Border;
    }

    interface ButtonProps extends ContentWidgetProps {
        WidgetStyle?: RecursivePartial<UE.ButtonStyle>;
        ColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        BackgroundColor?: RecursivePartial<UE.LinearColor>;
        ClickMethod?: UE.EButtonClickMethod;
        TouchMethod?: UE.EButtonTouchMethod;
        PressMethod?: UE.EButtonPressMethod;
        IsFocusable?: boolean;
        OnClicked?: () => void;
        OnPressed?: () => void;
        OnReleased?: () => void;
        OnHovered?: () => void;
        OnUnhovered?: () => void;
    }

    class Button extends React.Component<ButtonProps> {
        nativePtr: UE.Button;
    }

    interface CanvasPanelProps extends PanelWidgetProps {
    }

    class CanvasPanel extends React.Component<CanvasPanelProps> {
        nativePtr: UE.CanvasPanel;
    }

    interface CheckBoxProps extends ContentWidgetProps {
        CheckedState?: UE.ECheckBoxState;
        CheckedStateDelegate?: () => UE.ECheckBoxState;
        WidgetStyle?: RecursivePartial<UE.CheckBoxStyle>;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        ClickMethod?: UE.EButtonClickMethod;
        TouchMethod?: UE.EButtonTouchMethod;
        PressMethod?: UE.EButtonPressMethod;
        IsFocusable?: boolean;
        OnCheckStateChanged?: (bIsChecked: boolean) => void;
    }

    class CheckBox extends React.Component<CheckBoxProps> {
        nativePtr: UE.CheckBox;
    }

    interface CircularThrobberProps extends WidgetProps {
        NumberOfPieces?: number;
        Period?: number;
        Radius?: number;
        Image?: RecursivePartial<UE.SlateBrush>;
        bEnableRadius?: boolean;
    }

    class CircularThrobber extends React.Component<CircularThrobberProps> {
        nativePtr: UE.CircularThrobber;
    }

    interface ComboBoxProps extends WidgetProps {
        ScrollBarStyle?: RecursivePartial<UE.ScrollBarStyle>;
        bIsFocusable?: boolean;
    }

    class ComboBox extends React.Component<ComboBoxProps> {
        nativePtr: UE.ComboBox;
    }

    interface ComboBoxKeyProps extends WidgetProps {
        Options?: TArray<string>;
        SelectedOption?: string;
        WidgetStyle?: RecursivePartial<UE.ComboBoxStyle>;
        ItemStyle?: RecursivePartial<UE.TableRowStyle>;
        ScrollBarStyle?: RecursivePartial<UE.ScrollBarStyle>;
        ForegroundColor?: RecursivePartial<UE.SlateColor>;
        ContentPadding?: RecursivePartial<UE.Margin>;
        MaxListHeight?: number;
        bHasDownArrow?: boolean;
        bEnableGamepadNavigationMode?: boolean;
        bIsFocusable?: boolean;
        OnSelectionChanged?: (SelectedItem: string, SelectionType: UE.ESelectInfo) => void;
        OnOpening?: () => void;
    }

    class ComboBoxKey extends React.Component<ComboBoxKeyProps> {
        nativePtr: UE.ComboBoxKey;
    }

    interface ComboBoxStringProps extends WidgetProps {
        DefaultOptions?: TArray<string>;
        SelectedOption?: string;
        WidgetStyle?: RecursivePartial<UE.ComboBoxStyle>;
        ItemStyle?: RecursivePartial<UE.TableRowStyle>;
        ScrollBarStyle?: RecursivePartial<UE.ScrollBarStyle>;
        ContentPadding?: RecursivePartial<UE.Margin>;
        MaxListHeight?: number;
        HasDownArrow?: boolean;
        EnableGamepadNavigationMode?: boolean;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        ForegroundColor?: RecursivePartial<UE.SlateColor>;
        bIsFocusable?: boolean;
        OnSelectionChanged?: (SelectedItem: string, SelectionType: UE.ESelectInfo) => void;
        OnOpening?: () => void;
    }

    class ComboBoxString extends React.Component<ComboBoxStringProps> {
        nativePtr: UE.ComboBoxString;
    }

    interface DynamicEntryBoxBaseProps extends WidgetProps {
        EntrySpacing?: RecursivePartial<UE.Vector2D>;
        SpacingPattern?: TArray<UE.Vector2D>;
        EntryBoxType?: UE.EDynamicBoxType;
        EntrySizeRule?: RecursivePartial<UE.SlateChildSize>;
        EntryHorizontalAlignment?: UE.EHorizontalAlignment;
        EntryVerticalAlignment?: UE.EVerticalAlignment;
        MaxElementSize?: number;
        RadialBoxSettings?: RecursivePartial<UE.RadialBoxSettings>;
        EntryWidgetPool?: RecursivePartial<UE.UserWidgetPool>;
    }

    class DynamicEntryBoxBase extends React.Component<DynamicEntryBoxBaseProps> {
        nativePtr: UE.DynamicEntryBoxBase;
    }

    interface DynamicEntryBoxProps extends DynamicEntryBoxBaseProps {
        NumDesignerPreviewEntries?: number;
    }

    class DynamicEntryBox extends React.Component<DynamicEntryBoxProps> {
        nativePtr: UE.DynamicEntryBox;
    }

    interface EditableTextProps extends WidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: RecursivePartial<UE.EditableTextStyle>;
        IsReadOnly?: boolean;
        IsPassword?: boolean;
        MinimumDesiredWidth?: number;
        IsCaretMovedWhenGainFocus?: boolean;
        SelectAllTextWhenFocused?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        AllowContextMenu?: boolean;
        KeyboardType?: UE.EVirtualKeyboardType;
        VirtualKeyboardOptions?: RecursivePartial<UE.VirtualKeyboardOptions>;
        VirtualKeyboardTrigger?: UE.EVirtualKeyboardTrigger;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        Justification?: UE.ETextJustify;
        OverflowPolicy?: UE.ETextOverflowPolicy;
        ShapedTextOptions?: RecursivePartial<UE.ShapedTextOptions>;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
    }

    class EditableText extends React.Component<EditableTextProps> {
        nativePtr: UE.EditableText;
    }

    interface EditableTextBoxProps extends WidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        WidgetStyle?: RecursivePartial<UE.EditableTextBoxStyle>;
        HintText?: string;
        HintTextDelegate?: () => string;
        IsReadOnly?: boolean;
        IsPassword?: boolean;
        MinimumDesiredWidth?: number;
        IsCaretMovedWhenGainFocus?: boolean;
        SelectAllTextWhenFocused?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        AllowContextMenu?: boolean;
        KeyboardType?: UE.EVirtualKeyboardType;
        VirtualKeyboardOptions?: RecursivePartial<UE.VirtualKeyboardOptions>;
        VirtualKeyboardTrigger?: UE.EVirtualKeyboardTrigger;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        Justification?: UE.ETextJustify;
        OverflowPolicy?: UE.ETextOverflowPolicy;
        ShapedTextOptions?: RecursivePartial<UE.ShapedTextOptions>;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
        bIsFontDeprecationDone?: boolean;
    }

    class EditableTextBox extends React.Component<EditableTextBoxProps> {
        nativePtr: UE.EditableTextBox;
    }

    interface ExpandableAreaProps extends WidgetProps {
        Style?: RecursivePartial<UE.ExpandableAreaStyle>;
        BorderBrush?: RecursivePartial<UE.SlateBrush>;
        BorderColor?: RecursivePartial<UE.SlateColor>;
        bIsExpanded?: boolean;
        MaxHeight?: number;
        HeaderPadding?: RecursivePartial<UE.Margin>;
        AreaPadding?: RecursivePartial<UE.Margin>;
    }

    class ExpandableArea extends React.Component<ExpandableAreaProps> {
        nativePtr: UE.ExpandableArea;
    }

    interface GridPanelProps extends PanelWidgetProps {
        ColumnFill?: TArray<number>;
        RowFill?: TArray<number>;
    }

    class GridPanel extends React.Component<GridPanelProps> {
        nativePtr: UE.GridPanel;
    }

    interface HorizontalBoxProps extends PanelWidgetProps {
    }

    class HorizontalBox extends React.Component<HorizontalBoxProps> {
        nativePtr: UE.HorizontalBox;
    }

    interface ImageProps extends WidgetProps {
        Brush?: RecursivePartial<UE.SlateBrush>;
        BrushDelegate?: () => UE.SlateBrush;
        ColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        ColorAndOpacityDelegate?: () => UE.LinearColor;
        bFlipForRightToLeftFlowDirection?: boolean;
        OnMouseButtonDownEvent?: (MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) => UE.EventReply;
    }

    class Image extends React.Component<ImageProps> {
        nativePtr: UE.Image;
    }

    interface InputKeySelectorProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.ButtonStyle>;
        TextStyle?: RecursivePartial<UE.TextBlockStyle>;
        SelectedKey?: RecursivePartial<UE.InputChord>;
        Margin?: RecursivePartial<UE.Margin>;
        KeySelectionText?: string;
        NoKeySpecifiedText?: string;
        bAllowModifierKeys?: boolean;
        bAllowGamepadKeys?: boolean;
        EscapeKeys?: TArray<UE.Key>;
        OnKeySelected?: (SelectedKey: UE.InputChord) => void;
        OnIsSelectingKeyChanged?: () => void;
    }

    class InputKeySelector extends React.Component<InputKeySelectorProps> {
        nativePtr: UE.InputKeySelector;
    }

    interface InvalidationBoxProps extends ContentWidgetProps {
        bCanCache?: boolean;
    }

    class InvalidationBox extends React.Component<InvalidationBoxProps> {
        nativePtr: UE.InvalidationBox;
    }

    interface MenuAnchorProps extends ContentWidgetProps {
        Placement?: UE.EMenuPlacement;
        bFitInWindow?: boolean;
        ShouldDeferPaintingAfterWindowContent?: boolean;
        UseApplicationMenuStack?: boolean;
        OnMenuOpenChanged?: (bIsOpen: boolean) => void;
    }

    class MenuAnchor extends React.Component<MenuAnchorProps> {
        nativePtr: UE.MenuAnchor;
    }

    interface TextLayoutWidgetProps extends WidgetProps {
        ShapedTextOptions?: RecursivePartial<UE.ShapedTextOptions>;
        Justification?: UE.ETextJustify;
        WrappingPolicy?: UE.ETextWrappingPolicy;
        AutoWrapText?: boolean;
        ApplyLineHeightToBottomLine?: boolean;
        WrapTextAt?: number;
        Margin?: RecursivePartial<UE.Margin>;
        LineHeightPercentage?: number;
    }

    class TextLayoutWidget extends React.Component<TextLayoutWidgetProps> {
        nativePtr: UE.TextLayoutWidget;
    }

    interface MultiLineEditableTextProps extends TextLayoutWidgetProps {
        Text?: string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: RecursivePartial<UE.TextBlockStyle>;
        bIsReadOnly?: boolean;
        SelectAllTextWhenFocused?: boolean;
        ClearTextSelectionOnFocusLoss?: boolean;
        RevertTextOnEscape?: boolean;
        ClearKeyboardFocusOnCommit?: boolean;
        AllowContextMenu?: boolean;
        VirtualKeyboardOptions?: RecursivePartial<UE.VirtualKeyboardOptions>;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
    }

    class MultiLineEditableText extends React.Component<MultiLineEditableTextProps> {
        nativePtr: UE.MultiLineEditableText;
    }

    interface MultiLineEditableTextBoxProps extends TextLayoutWidgetProps {
        Text?: string;
        HintText?: string;
        HintTextDelegate?: () => string;
        WidgetStyle?: RecursivePartial<UE.EditableTextBoxStyle>;
        TextStyle?: RecursivePartial<UE.TextBlockStyle>;
        bIsReadOnly?: boolean;
        AllowContextMenu?: boolean;
        VirtualKeyboardOptions?: RecursivePartial<UE.VirtualKeyboardOptions>;
        VirtualKeyboardDismissAction?: UE.EVirtualKeyboardDismissAction;
        OnTextChanged?: (Text: string) => void;
        OnTextCommitted?: (Text: string, CommitMethod: UE.ETextCommit) => void;
        bIsFontDeprecationDone?: boolean;
    }

    class MultiLineEditableTextBox extends React.Component<MultiLineEditableTextBoxProps> {
        nativePtr: UE.MultiLineEditableTextBox;
    }

    interface NamedSlotProps extends ContentWidgetProps {
        bExposeOnInstanceOnly?: boolean;
        SlotGuid?: RecursivePartial<UE.Guid>;
    }

    class NamedSlot extends React.Component<NamedSlotProps> {
        nativePtr: UE.NamedSlot;
    }

    interface NativeWidgetHostProps extends WidgetProps {
    }

    class NativeWidgetHost extends React.Component<NativeWidgetHostProps> {
        nativePtr: UE.NativeWidgetHost;
    }

    interface OverlayProps extends PanelWidgetProps {
    }

    class Overlay extends React.Component<OverlayProps> {
        nativePtr: UE.Overlay;
    }

    interface PostBufferUpdateProps extends WidgetProps {
        bPerformDefaultPostBufferUpdate?: boolean;
        BuffersToUpdate?: TArray<UE.ESlatePostRT>;
        UpdateBufferInfos?: TArray<UE.SlatePostBufferUpdateInfo>;
    }

    class PostBufferUpdate extends React.Component<PostBufferUpdateProps> {
        nativePtr: UE.PostBufferUpdate;
    }

    interface ProgressBarProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.ProgressBarStyle>;
        Percent?: number;
        BarFillType?: UE.EProgressBarFillType;
        BarFillStyle?: UE.EProgressBarFillStyle;
        bIsMarquee?: boolean;
        BorderPadding?: RecursivePartial<UE.Vector2D>;
        PercentDelegate?: () => number;
        FillColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        FillColorAndOpacityDelegate?: () => UE.LinearColor;
    }

    class ProgressBar extends React.Component<ProgressBarProps> {
        nativePtr: UE.ProgressBar;
    }

    interface RetainerBoxProps extends ContentWidgetProps {
        bRetainRender?: boolean;
        RenderOnInvalidation?: boolean;
        RenderOnPhase?: boolean;
        Phase?: number;
        PhaseCount?: number;
        TextureParameter?: string;
        bShowEffectsInDesigner?: boolean;
    }

    class RetainerBox extends React.Component<RetainerBoxProps> {
        nativePtr: UE.RetainerBox;
    }

    interface RichTextBlockProps extends TextLayoutWidgetProps {
        Text?: string;
        DefaultTextStyleOverride?: RecursivePartial<UE.TextBlockStyle>;
        MinDesiredWidth?: number;
        bOverrideDefaultStyle?: boolean;
        TextTransformPolicy?: UE.ETextTransformPolicy;
        TextOverflowPolicy?: UE.ETextOverflowPolicy;
        DefaultTextStyle?: RecursivePartial<UE.TextBlockStyle>;
    }

    class RichTextBlock extends React.Component<RichTextBlockProps> {
        nativePtr: UE.RichTextBlock;
    }

    interface SafeZoneProps extends ContentWidgetProps {
        PadLeft?: boolean;
        PadRight?: boolean;
        PadTop?: boolean;
        PadBottom?: boolean;
    }

    class SafeZone extends React.Component<SafeZoneProps> {
        nativePtr: UE.SafeZone;
    }

    interface ScaleBoxProps extends ContentWidgetProps {
        Stretch?: UE.EStretch;
        StretchDirection?: UE.EStretchDirection;
        UserSpecifiedScale?: number;
        IgnoreInheritedScale?: boolean;
    }

    class ScaleBox extends React.Component<ScaleBoxProps> {
        nativePtr: UE.ScaleBox;
    }

    interface ScrollBarProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.ScrollBarStyle>;
        bAlwaysShowScrollbar?: boolean;
        bAlwaysShowScrollbarTrack?: boolean;
        Orientation?: UE.EOrientation;
        Thickness?: RecursivePartial<UE.Vector2D>;
        Padding?: RecursivePartial<UE.Margin>;
    }

    class ScrollBar extends React.Component<ScrollBarProps> {
        nativePtr: UE.ScrollBar;
    }

    interface ScrollBoxProps extends PanelWidgetProps {
        ScrollAnimationInterpolationSpeed?: number;
        bEnableTouchScrolling?: boolean;
        WidgetStyle?: RecursivePartial<UE.ScrollBoxStyle>;
        WidgetBarStyle?: RecursivePartial<UE.ScrollBarStyle>;
        Orientation?: UE.EOrientation;
        ScrollBarVisibility?: UE.ESlateVisibility;
        ConsumeMouseWheel?: UE.EConsumeMouseWheel;
        ScrollbarThickness?: RecursivePartial<UE.Vector2D>;
        ScrollbarPadding?: RecursivePartial<UE.Margin>;
        AlwaysShowScrollbar?: boolean;
        AlwaysShowScrollbarTrack?: boolean;
        AllowOverscroll?: boolean;
        BackPadScrolling?: boolean;
        FrontPadScrolling?: boolean;
        bAnimateWheelScrolling?: boolean;
        NavigationDestination?: UE.EDescendantScrollDestination;
        NavigationScrollPadding?: number;
        ScrollWhenFocusChanges?: UE.EScrollWhenFocusChanges;
        bAllowRightClickDragScrolling?: boolean;
        WheelScrollMultiplier?: number;
        OnUserScrolled?: (CurrentOffset: number) => void;
        OnScrollBarVisibilityChanged?: (NewVisibility: UE.ESlateVisibility) => void;
    }

    class ScrollBox extends React.Component<ScrollBoxProps> {
        nativePtr: UE.ScrollBox;
    }

    interface SizeBoxProps extends ContentWidgetProps {
        WidthOverride?: number;
        HeightOverride?: number;
        MinDesiredWidth?: number;
        MinDesiredHeight?: number;
        MaxDesiredWidth?: number;
        MaxDesiredHeight?: number;
        MinAspectRatio?: number;
        MaxAspectRatio?: number;
        bOverride_WidthOverride?: boolean;
        bOverride_HeightOverride?: boolean;
        bOverride_MinDesiredWidth?: boolean;
        bOverride_MinDesiredHeight?: boolean;
        bOverride_MaxDesiredWidth?: boolean;
        bOverride_MaxDesiredHeight?: boolean;
        bOverride_MinAspectRatio?: boolean;
        bOverride_MaxAspectRatio?: boolean;
    }

    class SizeBox extends React.Component<SizeBoxProps> {
        nativePtr: UE.SizeBox;
    }

    interface SliderProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        MinValue?: number;
        MaxValue?: number;
        WidgetStyle?: RecursivePartial<UE.SliderStyle>;
        Orientation?: UE.EOrientation;
        SliderBarColor?: RecursivePartial<UE.LinearColor>;
        SliderHandleColor?: RecursivePartial<UE.LinearColor>;
        IndentHandle?: boolean;
        Locked?: boolean;
        MouseUsesStep?: boolean;
        RequiresControllerLock?: boolean;
        StepSize?: number;
        IsFocusable?: boolean;
        OnMouseCaptureBegin?: () => void;
        OnMouseCaptureEnd?: () => void;
        OnControllerCaptureBegin?: () => void;
        OnControllerCaptureEnd?: () => void;
        OnValueChanged?: (Value: number) => void;
    }

    class Slider extends React.Component<SliderProps> {
        nativePtr: UE.Slider;
    }

    interface SpacerProps extends WidgetProps {
        Size?: RecursivePartial<UE.Vector2D>;
    }

    class Spacer extends React.Component<SpacerProps> {
        nativePtr: UE.Spacer;
    }

    interface SpinBoxProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        WidgetStyle?: RecursivePartial<UE.SpinBoxStyle>;
        MinFractionalDigits?: number;
        MaxFractionalDigits?: number;
        bAlwaysUsesDeltaSnap?: boolean;
        bEnableSlider?: boolean;
        Delta?: number;
        SliderExponent?: number;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        Justification?: UE.ETextJustify;
        MinDesiredWidth?: number;
        KeyboardType?: UE.EVirtualKeyboardType;
        ClearKeyboardFocusOnCommit?: boolean;
        SelectAllTextOnCommit?: boolean;
        ForegroundColor?: RecursivePartial<UE.SlateColor>;
        OnValueChanged?: (InValue: number) => void;
        OnValueCommitted?: (InValue: number, CommitMethod: UE.ETextCommit) => void;
        OnBeginSliderMovement?: () => void;
        OnEndSliderMovement?: (InValue: number) => void;
        bOverride_MinValue?: boolean;
        bOverride_MaxValue?: boolean;
        bOverride_MinSliderValue?: boolean;
        bOverride_MaxSliderValue?: boolean;
        MinValue?: number;
        MaxValue?: number;
        MinSliderValue?: number;
        MaxSliderValue?: number;
    }

    class SpinBox extends React.Component<SpinBoxProps> {
        nativePtr: UE.SpinBox;
    }

    interface StackBoxProps extends PanelWidgetProps {
        Orientation?: UE.EOrientation;
    }

    class StackBox extends React.Component<StackBoxProps> {
        nativePtr: UE.StackBox;
    }

    interface TextBlockProps extends TextLayoutWidgetProps {
        Text?: string;
        TextDelegate?: () => string;
        ColorAndOpacity?: RecursivePartial<UE.SlateColor>;
        ColorAndOpacityDelegate?: () => UE.SlateColor;
        MinDesiredWidth?: number;
        Font?: RecursivePartial<UE.SlateFontInfo>;
        StrikeBrush?: RecursivePartial<UE.SlateBrush>;
        ShadowOffset?: RecursivePartial<UE.Vector2D>;
        ShadowColorAndOpacity?: RecursivePartial<UE.LinearColor>;
        ShadowColorAndOpacityDelegate?: () => UE.LinearColor;
        bWrapWithInvalidationPanel?: boolean;
        TextTransformPolicy?: UE.ETextTransformPolicy;
        TextOverflowPolicy?: UE.ETextOverflowPolicy;
        bSimpleTextMode?: boolean;
    }

    class TextBlock extends React.Component<TextBlockProps> {
        nativePtr: UE.TextBlock;
    }

    interface ThrobberProps extends WidgetProps {
        NumberOfPieces?: number;
        bAnimateHorizontally?: boolean;
        bAnimateVertically?: boolean;
        bAnimateOpacity?: boolean;
        Image?: RecursivePartial<UE.SlateBrush>;
    }

    class Throbber extends React.Component<ThrobberProps> {
        nativePtr: UE.Throbber;
    }

    interface TileViewProps extends ListViewProps {
        EntryHeight?: number;
        EntryWidth?: number;
        TileAlignment?: UE.EListItemAlignment;
        bWrapHorizontalNavigation?: boolean;
        ScrollbarDisabledVisibility?: UE.ESlateVisibility;
        bEntrySizeIncludesEntrySpacing?: boolean;
    }

    class TileView extends React.Component<TileViewProps> {
        nativePtr: UE.TileView;
    }

    interface TreeViewProps extends ListViewProps {
    }

    class TreeView extends React.Component<TreeViewProps> {
        nativePtr: UE.TreeView;
    }

    interface UniformGridPanelProps extends PanelWidgetProps {
        SlotPadding?: RecursivePartial<UE.Margin>;
        MinDesiredSlotWidth?: number;
        MinDesiredSlotHeight?: number;
    }

    class UniformGridPanel extends React.Component<UniformGridPanelProps> {
        nativePtr: UE.UniformGridPanel;
    }

    interface VerticalBoxProps extends PanelWidgetProps {
    }

    class VerticalBox extends React.Component<VerticalBoxProps> {
        nativePtr: UE.VerticalBox;
    }

    interface ViewportProps extends ContentWidgetProps {
        BackgroundColor?: RecursivePartial<UE.LinearColor>;
    }

    class Viewport extends React.Component<ViewportProps> {
        nativePtr: UE.Viewport;
    }

    interface WidgetSwitcherProps extends PanelWidgetProps {
        ActiveWidgetIndex?: number;
    }

    class WidgetSwitcher extends React.Component<WidgetSwitcherProps> {
        nativePtr: UE.WidgetSwitcher;
    }

    interface WindowTitleBarAreaProps extends ContentWidgetProps {
        bWindowButtonsEnabled?: boolean;
        bDoubleClickTogglesFullscreen?: boolean;
    }

    class WindowTitleBarArea extends React.Component<WindowTitleBarAreaProps> {
        nativePtr: UE.WindowTitleBarArea;
    }

    interface WrapBoxProps extends PanelWidgetProps {
        InnerSlotPadding?: RecursivePartial<UE.Vector2D>;
        WrapSize?: number;
        bExplicitWrapSize?: boolean;
        HorizontalAlignment?: UE.EHorizontalAlignment;
        Orientation?: UE.EOrientation;
    }

    class WrapBox extends React.Component<WrapBoxProps> {
        nativePtr: UE.WrapBox;
    }

    interface LevelSequenceBurnInProps extends UserWidgetProps {
        FrameInformation?: RecursivePartial<UE.LevelSequencePlayerSnapshot>;
    }

    class LevelSequenceBurnIn extends React.Component<LevelSequenceBurnInProps> {
        nativePtr: UE.LevelSequenceBurnIn;
    }

    interface PropertyViewBaseProps extends WidgetProps {
        SoftObjectPath?: RecursivePartial<UE.SoftObjectPath>;
        bAutoLoadAsset?: boolean;
        OnPropertyChanged?: (PropertyName: string) => void;
    }

    class PropertyViewBase extends React.Component<PropertyViewBaseProps> {
        nativePtr: UE.PropertyViewBase;
    }

    interface DetailsViewProps extends PropertyViewBaseProps {
        bAllowFiltering?: boolean;
        bAllowFavoriteSystem?: boolean;
        bShowModifiedPropertiesOption?: boolean;
        bShowKeyablePropertiesOption?: boolean;
        bShowAnimatedPropertiesOption?: boolean;
        ColumnWidth?: number;
        bShowScrollBar?: boolean;
        bForceHiddenPropertyVisibility?: boolean;
        ViewIdentifier?: string;
        CategoriesToShow?: TArray<string>;
        PropertiesToShow?: TArray<string>;
        bShowOnlyAllowed?: boolean;
    }

    class DetailsView extends React.Component<DetailsViewProps> {
        nativePtr: UE.DetailsView;
    }

    interface SinglePropertyViewProps extends PropertyViewBaseProps {
        PropertyName?: string;
        NameOverride?: string;
    }

    class SinglePropertyView extends React.Component<SinglePropertyViewProps> {
        nativePtr: UE.SinglePropertyView;
    }

    interface EditorUtilityWidgetProps extends UserWidgetProps {
        TabDisplayName?: string;
        HelpText?: string;
        bAlwaysReregisterWithWindowsMenu?: boolean;
        bAutoRunDefaultAction?: boolean;
    }

    class EditorUtilityWidget extends React.Component<EditorUtilityWidgetProps> {
        nativePtr: UE.EditorUtilityWidget;
    }

    interface EditorUtilityButtonProps extends ButtonProps {
    }

    class EditorUtilityButton extends React.Component<EditorUtilityButtonProps> {
        nativePtr: UE.EditorUtilityButton;
    }

    interface EditorUtilityCheckBoxProps extends CheckBoxProps {
    }

    class EditorUtilityCheckBox extends React.Component<EditorUtilityCheckBoxProps> {
        nativePtr: UE.EditorUtilityCheckBox;
    }

    interface EditorUtilityCircularThrobberProps extends CircularThrobberProps {
    }

    class EditorUtilityCircularThrobber extends React.Component<EditorUtilityCircularThrobberProps> {
        nativePtr: UE.EditorUtilityCircularThrobber;
    }

    interface EditorUtilityComboBoxKeyProps extends ComboBoxKeyProps {
    }

    class EditorUtilityComboBoxKey extends React.Component<EditorUtilityComboBoxKeyProps> {
        nativePtr: UE.EditorUtilityComboBoxKey;
    }

    interface EditorUtilityComboBoxStringProps extends ComboBoxStringProps {
    }

    class EditorUtilityComboBoxString extends React.Component<EditorUtilityComboBoxStringProps> {
        nativePtr: UE.EditorUtilityComboBoxString;
    }

    interface EditorUtilityEditableTextProps extends EditableTextProps {
    }

    class EditorUtilityEditableText extends React.Component<EditorUtilityEditableTextProps> {
        nativePtr: UE.EditorUtilityEditableText;
    }

    interface EditorUtilityEditableTextBoxProps extends EditableTextBoxProps {
    }

    class EditorUtilityEditableTextBox extends React.Component<EditorUtilityEditableTextBoxProps> {
        nativePtr: UE.EditorUtilityEditableTextBox;
    }

    interface EditorUtilityExpandableAreaProps extends ExpandableAreaProps {
    }

    class EditorUtilityExpandableArea extends React.Component<EditorUtilityExpandableAreaProps> {
        nativePtr: UE.EditorUtilityExpandableArea;
    }

    interface EditorUtilityInputKeySelectorProps extends InputKeySelectorProps {
    }

    class EditorUtilityInputKeySelector extends React.Component<EditorUtilityInputKeySelectorProps> {
        nativePtr: UE.EditorUtilityInputKeySelector;
    }

    interface EditorUtilityListViewProps extends ListViewProps {
    }

    class EditorUtilityListView extends React.Component<EditorUtilityListViewProps> {
        nativePtr: UE.EditorUtilityListView;
    }

    interface EditorUtilityMultiLineEditableTextProps extends MultiLineEditableTextProps {
    }

    class EditorUtilityMultiLineEditableText extends React.Component<EditorUtilityMultiLineEditableTextProps> {
        nativePtr: UE.EditorUtilityMultiLineEditableText;
    }

    interface EditorUtilityMultiLineEditableTextBoxProps extends MultiLineEditableTextBoxProps {
    }

    class EditorUtilityMultiLineEditableTextBox extends React.Component<EditorUtilityMultiLineEditableTextBoxProps> {
        nativePtr: UE.EditorUtilityMultiLineEditableTextBox;
    }

    interface EditorUtilityProgressBarProps extends ProgressBarProps {
    }

    class EditorUtilityProgressBar extends React.Component<EditorUtilityProgressBarProps> {
        nativePtr: UE.EditorUtilityProgressBar;
    }

    interface EditorUtilityScrollBarProps extends ScrollBarProps {
    }

    class EditorUtilityScrollBar extends React.Component<EditorUtilityScrollBarProps> {
        nativePtr: UE.EditorUtilityScrollBar;
    }

    interface EditorUtilityScrollBoxProps extends ScrollBoxProps {
    }

    class EditorUtilityScrollBox extends React.Component<EditorUtilityScrollBoxProps> {
        nativePtr: UE.EditorUtilityScrollBox;
    }

    interface EditorUtilitySliderProps extends SliderProps {
    }

    class EditorUtilitySlider extends React.Component<EditorUtilitySliderProps> {
        nativePtr: UE.EditorUtilitySlider;
    }

    interface EditorUtilitySpinBoxProps extends SpinBoxProps {
    }

    class EditorUtilitySpinBox extends React.Component<EditorUtilitySpinBoxProps> {
        nativePtr: UE.EditorUtilitySpinBox;
    }

    interface EditorUtilityThrobberProps extends ThrobberProps {
    }

    class EditorUtilityThrobber extends React.Component<EditorUtilityThrobberProps> {
        nativePtr: UE.EditorUtilityThrobber;
    }

    interface EditorUtilityTreeViewProps extends TreeViewProps {
    }

    class EditorUtilityTreeView extends React.Component<EditorUtilityTreeViewProps> {
        nativePtr: UE.EditorUtilityTreeView;
    }

    interface ToolMenuWidgetProps extends WidgetProps {
        MenuName?: string;
        MenuType?: UE.EMultiBoxType;
        FullMenuName?: string;
    }

    class ToolMenuWidget extends React.Component<ToolMenuWidgetProps> {
        nativePtr: UE.ToolMenuWidget;
    }

    interface TakeRecorderOverlayWidgetProps extends UserWidgetProps {
    }

    class TakeRecorderOverlayWidget extends React.Component<TakeRecorderOverlayWidgetProps> {
        nativePtr: UE.TakeRecorderOverlayWidget;
    }

    interface AudioMaterialButtonProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.AudioMaterialButtonStyle>;
        OnButtonPressedChangedEvent?: (bIsPressed: boolean) => void;
        bIsPressed?: boolean;
    }

    class AudioMaterialButton extends React.Component<AudioMaterialButtonProps> {
        nativePtr: UE.AudioMaterialButton;
    }

    interface AudioMaterialEnvelopeProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.AudioMaterialEnvelopeStyle>;
        EnvelopeSettings?: RecursivePartial<UE.AudioMaterialEnvelopeSettings>;
    }

    class AudioMaterialEnvelope extends React.Component<AudioMaterialEnvelopeProps> {
        nativePtr: UE.AudioMaterialEnvelope;
    }

    interface AudioMaterialKnobProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.AudioMaterialKnobStyle>;
        OnKnobValueChanged?: (Value: number) => void;
        Value?: number;
        TuneSpeed?: number;
        FineTuneSpeed?: number;
        bLocked?: boolean;
        bMouseUsesStep?: boolean;
        StepSize?: number;
    }

    class AudioMaterialKnob extends React.Component<AudioMaterialKnobProps> {
        nativePtr: UE.AudioMaterialKnob;
    }

    interface AudioMaterialMeterProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.AudioMaterialMeterStyle>;
        Orientation?: UE.EOrientation;
        MeterChannelInfoDelegate?: () => TArray<UE.MeterChannelInfo>;
        MeterChannelInfo?: TArray<UE.MeterChannelInfo>;
    }

    class AudioMaterialMeter extends React.Component<AudioMaterialMeterProps> {
        nativePtr: UE.AudioMaterialMeter;
    }

    interface AudioMaterialSliderProps extends WidgetProps {
        WidgetStyle?: RecursivePartial<UE.AudioMaterialSliderStyle>;
        OnValueChanged?: (Value: number) => void;
        Value?: number;
        Orientation?: UE.EOrientation;
        TuneSpeed?: number;
        FineTuneSpeed?: number;
        bLocked?: boolean;
        bMouseUsesStep?: boolean;
        StepSize?: number;
    }

    class AudioMaterialSlider extends React.Component<AudioMaterialSliderProps> {
        nativePtr: UE.AudioMaterialSlider;
    }

    interface AudioMeterProps extends WidgetProps {
        MeterChannelInfo?: TArray<UE.MeterChannelInfo>;
        MeterChannelInfoDelegate?: () => TArray<UE.MeterChannelInfo>;
        WidgetStyle?: RecursivePartial<UE.AudioMeterStyle>;
        Orientation?: UE.EOrientation;
        BackgroundColor?: RecursivePartial<UE.LinearColor>;
        MeterBackgroundColor?: RecursivePartial<UE.LinearColor>;
        MeterValueColor?: RecursivePartial<UE.LinearColor>;
        MeterPeakColor?: RecursivePartial<UE.LinearColor>;
        MeterClippingColor?: RecursivePartial<UE.LinearColor>;
        MeterScaleColor?: RecursivePartial<UE.LinearColor>;
        MeterScaleLabelColor?: RecursivePartial<UE.LinearColor>;
    }

    class AudioMeter extends React.Component<AudioMeterProps> {
        nativePtr: UE.AudioMeter;
    }

    interface AudioOscilloscopeProps extends WidgetProps {
        OscilloscopeStyle?: RecursivePartial<UE.AudioOscilloscopePanelStyle>;
        MaxTimeWindowMs?: number;
        TimeWindowMs?: number;
        AnalysisPeriodMs?: number;
        bShowTimeGrid?: boolean;
        TimeGridLabelsUnit?: UE.EXAxisLabelsUnit;
        bShowAmplitudeGrid?: boolean;
        bShowAmplitudeLabels?: boolean;
        AmplitudeGridLabelsUnit?: UE.EYAxisLabelsUnit;
        TriggerMode?: UE.EAudioOscilloscopeTriggerMode;
        TriggerThreshold?: number;
        PanelLayoutType?: UE.EAudioPanelLayoutType;
        ChannelToAnalyze?: number;
    }

    class AudioOscilloscope extends React.Component<AudioOscilloscopeProps> {
        nativePtr: UE.AudioOscilloscope;
    }

    interface AudioRadialSliderProps extends WidgetProps {
        Value?: number;
        ValueDelegate?: () => number;
        WidgetLayout?: UE.EAudioRadialSliderLayout;
        CenterBackgroundColor?: RecursivePartial<UE.LinearColor>;
        SliderProgressColor?: RecursivePartial<UE.LinearColor>;
        SliderBarColor?: RecursivePartial<UE.LinearColor>;
        HandStartEndRatio?: RecursivePartial<UE.Vector2D>;
        UnitsText?: string;
        TextLabelBackgroundColor?: RecursivePartial<UE.LinearColor>;
        ShowLabelOnlyOnHover?: boolean;
        ShowUnitsText?: boolean;
        IsUnitsTextReadOnly?: boolean;
        IsValueTextReadOnly?: boolean;
        SliderThickness?: number;
        OutputRange?: RecursivePartial<UE.Vector2D>;
        OnValueChanged?: (Value: number) => void;
    }

    class AudioRadialSlider extends React.Component<AudioRadialSliderProps> {
        nativePtr: UE.AudioRadialSlider;
    }

    interface AudioVolumeRadialSliderProps extends AudioRadialSliderProps {
    }

    class AudioVolumeRadialSlider extends React.Component<AudioVolumeRadialSliderProps> {
        nativePtr: UE.AudioVolumeRadialSlider;
    }

    interface AudioFrequencyRadialSliderProps extends AudioRadialSliderProps {
    }

    class AudioFrequencyRadialSlider extends React.Component<AudioFrequencyRadialSliderProps> {
        nativePtr: UE.AudioFrequencyRadialSlider;
    }

    interface AudioSliderBaseProps extends WidgetProps {
        Value?: number;
        UnitsText?: string;
        TextLabelBackgroundColor?: RecursivePartial<UE.LinearColor>;
        TextLabelBackgroundColorDelegate?: () => UE.LinearColor;
        ShowLabelOnlyOnHover?: boolean;
        ShowUnitsText?: boolean;
        IsUnitsTextReadOnly?: boolean;
        IsValueTextReadOnly?: boolean;
        ValueDelegate?: () => number;
        SliderBackgroundColor?: RecursivePartial<UE.LinearColor>;
        SliderBackgroundColorDelegate?: () => UE.LinearColor;
        SliderBarColor?: RecursivePartial<UE.LinearColor>;
        SliderBarColorDelegate?: () => UE.LinearColor;
        SliderThumbColor?: RecursivePartial<UE.LinearColor>;
        SliderThumbColorDelegate?: () => UE.LinearColor;
        WidgetBackgroundColor?: RecursivePartial<UE.LinearColor>;
        WidgetBackgroundColorDelegate?: () => UE.LinearColor;
        Orientation?: UE.EOrientation;
        OnValueChanged?: (Value: number) => void;
    }

    class AudioSliderBase extends React.Component<AudioSliderBaseProps> {
        nativePtr: UE.AudioSliderBase;
    }

    interface AudioSliderProps extends AudioSliderBaseProps {
    }

    class AudioSlider extends React.Component<AudioSliderProps> {
        nativePtr: UE.AudioSlider;
    }

    interface AudioVolumeSliderProps extends AudioSliderProps {
    }

    class AudioVolumeSlider extends React.Component<AudioVolumeSliderProps> {
        nativePtr: UE.AudioVolumeSlider;
    }

    interface AudioFrequencySliderProps extends AudioSliderBaseProps {
        OutputRange?: RecursivePartial<UE.Vector2D>;
    }

    class AudioFrequencySlider extends React.Component<AudioFrequencySliderProps> {
        nativePtr: UE.AudioFrequencySlider;
    }

    interface AudioVectorscopeProps extends WidgetProps {
        VectorscopeStyle?: RecursivePartial<UE.AudioVectorscopePanelStyle>;
        bShowGrid?: boolean;
        GridDivisions?: number;
        MaxDisplayPersistenceMs?: number;
        DisplayPersistenceMs?: number;
        Scale?: number;
        PanelLayoutType?: UE.EAudioPanelLayoutType;
    }

    class AudioVectorscope extends React.Component<AudioVectorscopeProps> {
        nativePtr: UE.AudioVectorscope;
    }

    interface Synth2DSliderProps extends WidgetProps {
        ValueX?: number;
        ValueY?: number;
        ValueXDelegate?: () => number;
        ValueYDelegate?: () => number;
        WidgetStyle?: RecursivePartial<UE.Synth2DSliderStyle>;
        SliderHandleColor?: RecursivePartial<UE.LinearColor>;
        IndentHandle?: boolean;
        Locked?: boolean;
        StepSize?: number;
        IsFocusable?: boolean;
        OnMouseCaptureBegin?: () => void;
        OnMouseCaptureEnd?: () => void;
        OnControllerCaptureBegin?: () => void;
        OnControllerCaptureEnd?: () => void;
        OnValueChangedX?: (Value: number) => void;
        OnValueChangedY?: (Value: number) => void;
    }

    class Synth2DSlider extends React.Component<Synth2DSliderProps> {
        nativePtr: UE.Synth2DSlider;
    }

    interface SynthKnobProps extends WidgetProps {
        Value?: number;
        StepSize?: number;
        MouseSpeed?: number;
        MouseFineTuneSpeed?: number;
        ShowTooltipInfo?: boolean;
        ParameterName?: string;
        ParameterUnits?: string;
        ValueDelegate?: () => number;
        WidgetStyle?: RecursivePartial<UE.SynthKnobStyle>;
        Locked?: boolean;
        IsFocusable?: boolean;
        OnMouseCaptureBegin?: () => void;
        OnMouseCaptureEnd?: () => void;
        OnControllerCaptureBegin?: () => void;
        OnControllerCaptureEnd?: () => void;
        OnValueChanged?: (Value: number) => void;
    }

    class SynthKnob extends React.Component<SynthKnobProps> {
        nativePtr: UE.SynthKnob;
    }

    interface ReactWidgetProps extends UserWidgetProps {
    }

    class ReactWidget extends React.Component<ReactWidgetProps> {
        nativePtr: UE.ReactWidget;
    }

    interface WarriorWidgetBaseProps extends UserWidgetProps {
    }

    class WarriorWidgetBase extends React.Component<WarriorWidgetBaseProps> {
        nativePtr: UE.WarriorWidgetBase;
    }

    interface AnalogSliderProps extends SliderProps {
        OnAnalogCapture?: (Value: number) => void;
    }

    class AnalogSlider extends React.Component<AnalogSliderProps> {
        nativePtr: UE.AnalogSlider;
    }

    interface CommonActionWidgetProps extends WidgetProps {
        OnInputMethodChanged?: (bUsingGamepad: boolean) => void;
        OnInputIconUpdated?: () => void;
        ProgressMaterialBrush?: RecursivePartial<UE.SlateBrush>;
        ProgressMaterialParam?: string;
        IconRimBrush?: RecursivePartial<UE.SlateBrush>;
        InputActions?: TArray<UE.DataTableRowHandle>;
        InputActionDataRow?: RecursivePartial<UE.DataTableRowHandle>;
        DesignTimeKey?: RecursivePartial<UE.Key>;
        Icon?: RecursivePartial<UE.SlateBrush>;
    }

    class CommonActionWidget extends React.Component<CommonActionWidgetProps> {
        nativePtr: UE.CommonActionWidget;
    }

    interface CommonUserWidgetProps extends UserWidgetProps {
        bDisplayInActionBar?: boolean;
        bConsumePointerInput?: boolean;
    }

    class CommonUserWidget extends React.Component<CommonUserWidgetProps> {
        nativePtr: UE.CommonUserWidget;
    }

    interface CommonActivatableWidgetProps extends CommonUserWidgetProps {
        bIsBackHandler?: boolean;
        bIsBackActionDisplayedInActionBar?: boolean;
        bAutoActivate?: boolean;
        bSupportsActivationFocus?: boolean;
        bIsModal?: boolean;
        bAutoRestoreFocus?: boolean;
        bOverrideActionDomain?: boolean;
        InputMappingPriority?: number;
        BP_OnWidgetActivated?: () => void;
        BP_OnWidgetDeactivated?: () => void;
        bIsActive?: boolean;
        bSetVisibilityOnActivated?: boolean;
        ActivatedVisibility?: UE.ESlateVisibility;
        bSetVisibilityOnDeactivated?: boolean;
        DeactivatedVisibility?: UE.ESlateVisibility;
    }

    class CommonActivatableWidget extends React.Component<CommonActivatableWidgetProps> {
        nativePtr: UE.CommonActivatableWidget;
    }

    interface CommonAnimatedSwitcherProps extends WidgetSwitcherProps {
        TransitionType?: UE.ECommonSwitcherTransition;
        TransitionCurveType?: UE.ETransitionCurve;
        TransitionDuration?: number;
        TransitionFallbackStrategy?: UE.ECommonSwitcherTransitionFallbackStrategy;
    }

    class CommonAnimatedSwitcher extends React.Component<CommonAnimatedSwitcherProps> {
        nativePtr: UE.CommonAnimatedSwitcher;
    }

    interface CommonActivatableWidgetSwitcherProps extends CommonAnimatedSwitcherProps {
        bClearFocusRestorationTargetOfDeactivatedWidgets?: boolean;
    }

    class CommonActivatableWidgetSwitcher extends React.Component<CommonActivatableWidgetSwitcherProps> {
        nativePtr: UE.CommonActivatableWidgetSwitcher;
    }

    interface CommonBorderProps extends BorderProps {
        bReducePaddingBySafezone?: boolean;
        MinimumPadding?: RecursivePartial<UE.Margin>;
        bStyleNoLongerNeedsConversion?: boolean;
    }

    class CommonBorder extends React.Component<CommonBorderProps> {
        nativePtr: UE.CommonBorder;
    }

    interface CommonButtonInternalBaseProps extends ButtonProps {
        OnDoubleClicked?: () => void;
        MinWidth?: number;
        MinHeight?: number;
        bButtonEnabled?: boolean;
        bInteractionEnabled?: boolean;
    }

    class CommonButtonInternalBase extends React.Component<CommonButtonInternalBaseProps> {
        nativePtr: UE.CommonButtonInternalBase;
    }

    interface CommonButtonBaseProps extends CommonUserWidgetProps {
        ClickEvent?: RecursivePartial<UE.WidgetEventField>;
        MinWidth?: number;
        MinHeight?: number;
        bHideInputAction?: boolean;
        PressedSlateSoundOverride?: RecursivePartial<UE.SlateSound>;
        HoveredSlateSoundOverride?: RecursivePartial<UE.SlateSound>;
        SelectedPressedSlateSoundOverride?: RecursivePartial<UE.SlateSound>;
        SelectedHoveredSlateSoundOverride?: RecursivePartial<UE.SlateSound>;
        LockedPressedSlateSoundOverride?: RecursivePartial<UE.SlateSound>;
        LockedHoveredSlateSoundOverride?: RecursivePartial<UE.SlateSound>;
        bApplyAlphaOnDisable?: boolean;
        bLocked?: boolean;
        bSelectable?: boolean;
        bShouldSelectUponReceivingFocus?: boolean;
        bInteractableWhenSelected?: boolean;
        bToggleable?: boolean;
        bTriggerClickedAfterSelection?: boolean;
        bDisplayInputActionWhenNotInteractable?: boolean;
        bHideInputActionWithKeyboard?: boolean;
        bShouldUseFallbackDefaultInputAction?: boolean;
        bRequiresHold?: boolean;
        bSimulateHoverOnTouchInput?: boolean;
        ClickMethod?: UE.EButtonClickMethod;
        TouchMethod?: UE.EButtonTouchMethod;
        PressMethod?: UE.EButtonPressMethod;
        InputPriority?: number;
        TriggeringInputAction?: RecursivePartial<UE.DataTableRowHandle>;
        bStyleNoLongerNeedsConversion?: boolean;
        bIsPersistentBinding?: boolean;
        InputModeOverride?: UE.ECommonInputMode;
        NormalStyle?: RecursivePartial<UE.ButtonStyle>;
        SelectedStyle?: RecursivePartial<UE.ButtonStyle>;
        DisabledStyle?: RecursivePartial<UE.ButtonStyle>;
        LockedStyle?: RecursivePartial<UE.ButtonStyle>;
        bStopDoubleClickPropagation?: boolean;
    }

    class CommonButtonBase extends React.Component<CommonButtonBaseProps> {
        nativePtr: UE.CommonButtonBase;
    }

    interface CommonCustomNavigationProps extends BorderProps {
        OnNavigationEvent?: (NavigationType: UE.EUINavigation) => boolean;
    }

    class CommonCustomNavigation extends React.Component<CommonCustomNavigationProps> {
        nativePtr: UE.CommonCustomNavigation;
    }

    interface CommonTextBlockProps extends TextBlockProps {
        MobileFontSizeMultiplier?: number;
        bIsScrollingEnabled?: boolean;
        bDisplayAllCaps?: boolean;
        bAutoCollapseWithEmptyText?: boolean;
        bStyleNoLongerNeedsConversion?: boolean;
    }

    class CommonTextBlock extends React.Component<CommonTextBlockProps> {
        nativePtr: UE.CommonTextBlock;
    }

    interface CommonDateTimeTextBlockProps extends CommonTextBlockProps {
        CustomTimespanFormat?: string;
        bCustomTimespanLeadingZeros?: boolean;
    }

    class CommonDateTimeTextBlock extends React.Component<CommonDateTimeTextBlockProps> {
        nativePtr: UE.CommonDateTimeTextBlock;
    }

    interface CommonHardwareVisibilityBorderProps extends CommonBorderProps {
        VisibilityQuery?: RecursivePartial<UE.GameplayTagQuery>;
        VisibleType?: UE.ESlateVisibility;
        HiddenType?: UE.ESlateVisibility;
    }

    class CommonHardwareVisibilityBorder extends React.Component<CommonHardwareVisibilityBorderProps> {
        nativePtr: UE.CommonHardwareVisibilityBorder;
    }

    interface CommonHierarchicalScrollBoxProps extends ScrollBoxProps {
    }

    class CommonHierarchicalScrollBox extends React.Component<CommonHierarchicalScrollBoxProps> {
        nativePtr: UE.CommonHierarchicalScrollBox;
    }

    interface CommonLazyImageProps extends ImageProps {
        bShowLoading?: boolean;
        LoadingBackgroundBrush?: RecursivePartial<UE.SlateBrush>;
        MaterialTextureParamName?: string;
        BP_OnLoadingStateChanged?: (bIsLoading: boolean) => void;
    }

    class CommonLazyImage extends React.Component<CommonLazyImageProps> {
        nativePtr: UE.CommonLazyImage;
    }

    interface CommonLazyWidgetProps extends WidgetProps {
        LoadingBackgroundBrush?: RecursivePartial<UE.SlateBrush>;
        BP_OnLoadingStateChanged?: (bIsLoading: boolean) => void;
    }

    class CommonLazyWidget extends React.Component<CommonLazyWidgetProps> {
        nativePtr: UE.CommonLazyWidget;
    }

    interface CommonListViewProps extends ListViewProps {
    }

    class CommonListView extends React.Component<CommonListViewProps> {
        nativePtr: UE.CommonListView;
    }

    interface CommonLoadGuardProps extends ContentWidgetProps {
        bShowLoading?: boolean;
        LoadingBackgroundBrush?: RecursivePartial<UE.SlateBrush>;
        ThrobberAlignment?: UE.EHorizontalAlignment;
        ThrobberPadding?: RecursivePartial<UE.Margin>;
        LoadingText?: string;
        BP_OnLoadingStateChanged?: (bIsLoading: boolean) => void;
        SpinnerMaterialPath?: RecursivePartial<UE.SoftObjectPath>;
        bStyleNoLongerNeedsConversion?: boolean;
    }

    class CommonLoadGuard extends React.Component<CommonLoadGuardProps> {
        nativePtr: UE.CommonLoadGuard;
    }

    interface CommonNumericTextBlockProps extends CommonTextBlockProps {
        CurrentNumericValue?: number;
        NumericType?: UE.ECommonNumericType;
        FormattingSpecification?: RecursivePartial<UE.CommonNumberFormattingOptions>;
        EaseOutInterpolationExponent?: number;
        InterpolationUpdateInterval?: number;
        PostInterpolationShrinkDuration?: number;
        PerformSizeInterpolation?: boolean;
        IsPercentage?: boolean;
    }

    class CommonNumericTextBlock extends React.Component<CommonNumericTextBlockProps> {
        nativePtr: UE.CommonNumericTextBlock;
    }

    interface CommonRichTextBlockProps extends RichTextBlockProps {
        InlineIconDisplayMode?: UE.ERichTextInlineIconDisplayMode;
        bTintInlineIcon?: boolean;
        MobileTextBlockScale?: number;
        bIsScrollingEnabled?: boolean;
        bDisplayAllCaps?: boolean;
        bAutoCollapseWithEmptyText?: boolean;
    }

    class CommonRichTextBlock extends React.Component<CommonRichTextBlockProps> {
        nativePtr: UE.CommonRichTextBlock;
    }

    interface CommonRotatorProps extends CommonButtonBaseProps {
        OnRotatedWithDirection?: (Value: number, RotatorDir: UE.ERotatorDirection) => void;
        OnRotated?: (Value: number) => void;
    }

    class CommonRotator extends React.Component<CommonRotatorProps> {
        nativePtr: UE.CommonRotator;
    }

    interface CommonTabListWidgetBaseProps extends CommonUserWidgetProps {
        OnTabSelected?: (TabId: string) => void;
        OnTabListRebuilt?: () => void;
        NextTabInputActionData?: RecursivePartial<UE.DataTableRowHandle>;
        PreviousTabInputActionData?: RecursivePartial<UE.DataTableRowHandle>;
        bAutoListenForInput?: boolean;
        bDeferRebuildingTabList?: boolean;
        RegisteredTabsByID?: TMap<string, UE.CommonRegisteredTabInfo>;
        TabButtonWidgetPool?: RecursivePartial<UE.UserWidgetPool>;
    }

    class CommonTabListWidgetBase extends React.Component<CommonTabListWidgetBaseProps> {
        nativePtr: UE.CommonTabListWidgetBase;
    }

    interface CommonTileViewProps extends TileViewProps {
    }

    class CommonTileView extends React.Component<CommonTileViewProps> {
        nativePtr: UE.CommonTileView;
    }

    interface CommonTreeViewProps extends TreeViewProps {
    }

    class CommonTreeView extends React.Component<CommonTreeViewProps> {
        nativePtr: UE.CommonTreeView;
    }

    interface CommonVideoPlayerProps extends WidgetProps {
        bMatchSize?: boolean;
        VideoBrush?: RecursivePartial<UE.SlateBrush>;
    }

    class CommonVideoPlayer extends React.Component<CommonVideoPlayerProps> {
        nativePtr: UE.CommonVideoPlayer;
    }

    interface CommonVisibilitySwitcherProps extends OverlayProps {
        ShownVisibility?: UE.ESlateVisibility;
        ActiveWidgetIndex?: number;
        bAutoActivateSlot?: boolean;
        bActivateFirstSlotOnAdding?: boolean;
    }

    class CommonVisibilitySwitcher extends React.Component<CommonVisibilitySwitcherProps> {
        nativePtr: UE.CommonVisibilitySwitcher;
    }

    interface UCommonVisibilityWidgetBaseProps extends CommonBorderProps {
        VisibilityControls?: TMap<string, boolean>;
        bShowForGamepad?: boolean;
        bShowForMouseAndKeyboard?: boolean;
        bShowForTouch?: boolean;
        VisibleType?: UE.ESlateVisibility;
        HiddenType?: UE.ESlateVisibility;
    }

    class UCommonVisibilityWidgetBase extends React.Component<UCommonVisibilityWidgetBaseProps> {
        nativePtr: UE.UCommonVisibilityWidgetBase;
    }

    interface CommonVisualAttachmentProps extends SizeBoxProps {
        ContentAnchor?: RecursivePartial<UE.Vector2D>;
    }

    class CommonVisualAttachment extends React.Component<CommonVisualAttachmentProps> {
        nativePtr: UE.CommonVisualAttachment;
    }

    interface CommonWidgetCarouselProps extends PanelWidgetProps {
        ActiveWidgetIndex?: number;
        MoveSpeed?: number;
    }

    class CommonWidgetCarousel extends React.Component<CommonWidgetCarouselProps> {
        nativePtr: UE.CommonWidgetCarousel;
    }

    interface CommonWidgetCarouselNavBarProps extends WidgetProps {
        ButtonPadding?: RecursivePartial<UE.Margin>;
    }

    class CommonWidgetCarouselNavBar extends React.Component<CommonWidgetCarouselNavBarProps> {
        nativePtr: UE.CommonWidgetCarouselNavBar;
    }

    interface CommonBoundActionBarProps extends DynamicEntryBoxBaseProps {
        bDisplayOwningPlayerActionsOnly?: boolean;
        bIgnoreDuplicateActions?: boolean;
        OnActionBarUpdated?: () => void;
    }

    class CommonBoundActionBar extends React.Component<CommonBoundActionBarProps> {
        nativePtr: UE.CommonBoundActionBar;
    }

    interface CommonBoundActionButtonProps extends CommonButtonBaseProps {
    }

    class CommonBoundActionButton extends React.Component<CommonBoundActionButtonProps> {
        nativePtr: UE.CommonBoundActionButton;
    }

    interface CommonActivatableWidgetContainerBaseProps extends WidgetProps {
        TransitionType?: UE.ECommonSwitcherTransition;
        TransitionCurveType?: UE.ETransitionCurve;
        TransitionDuration?: number;
        TransitionFallbackStrategy?: UE.ECommonSwitcherTransitionFallbackStrategy;
        GeneratedWidgetsPool?: RecursivePartial<UE.UserWidgetPool>;
    }

    class CommonActivatableWidgetContainerBase extends React.Component<CommonActivatableWidgetContainerBaseProps> {
        nativePtr: UE.CommonActivatableWidgetContainerBase;
    }

    interface CommonActivatableWidgetStackProps extends CommonActivatableWidgetContainerBaseProps {
    }

    class CommonActivatableWidgetStack extends React.Component<CommonActivatableWidgetStackProps> {
        nativePtr: UE.CommonActivatableWidgetStack;
    }

    interface CommonActivatableWidgetQueueProps extends CommonActivatableWidgetContainerBaseProps {
    }

    class CommonActivatableWidgetQueue extends React.Component<CommonActivatableWidgetQueueProps> {
        nativePtr: UE.CommonActivatableWidgetQueue;
    }

    interface ObjectMixerEditorUWidgetProps extends WidgetProps {
        ObjectMixerWidgetUserConfig?: RecursivePartial<UE.ObjectMixerWidgetUserConfig>;
    }

    class ObjectMixerEditorUWidget extends React.Component<ObjectMixerEditorUWidgetProps> {
        nativePtr: UE.ObjectMixerEditorUWidget;
    }

    interface FrontendCommonButtonBaseProps extends CommonButtonBaseProps {
        ButtonDisplayText?: string;
        bUserUpperCaseForButtonText?: boolean;
        ButtonDescriptionText?: string;
    }

    class FrontendCommonButtonBase extends React.Component<FrontendCommonButtonBaseProps> {
        nativePtr: UE.FrontendCommonButtonBase;
    }

    interface FrontendTabListWidgetBaseProps extends CommonTabListWidgetBaseProps {
        DebugEditorPreviewTabCount?: number;
    }

    class FrontendTabListWidgetBase extends React.Component<FrontendTabListWidgetBaseProps> {
        nativePtr: UE.FrontendTabListWidgetBase;
    }

    interface Widget_ActivatableBaseProps extends CommonActivatableWidgetProps {
    }

    class Widget_ActivatableBase extends React.Component<Widget_ActivatableBaseProps> {
        nativePtr: UE.Widget_ActivatableBase;
    }

    interface Widget_ConfirmScreenProps extends Widget_ActivatableBaseProps {
    }

    class Widget_ConfirmScreen extends React.Component<Widget_ConfirmScreenProps> {
        nativePtr: UE.Widget_ConfirmScreen;
    }

    interface Widget_OptionScreenProps extends Widget_ActivatableBaseProps {
        ResetAction?: RecursivePartial<UE.DataTableRowHandle>;
    }

    class Widget_OptionScreen extends React.Component<Widget_OptionScreenProps> {
        nativePtr: UE.Widget_OptionScreen;
    }

    interface Widget_PrimaryLayoutProps extends CommonUserWidgetProps {
        RegisteredWidgetStackMap?: TMap<UE.GameplayTag, UE.CommonActivatableWidgetContainerBase>;
    }

    class Widget_PrimaryLayout extends React.Component<Widget_PrimaryLayoutProps> {
        nativePtr: UE.Widget_PrimaryLayout;
    }

    interface WarriorSizeBox_CProps extends SizeBoxProps {
    }

    class WarriorSizeBox_C extends React.Component<WarriorSizeBox_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WarriorSizeBox.WarriorSizeBox_C;
    }

    interface WarriorTextBlock_CProps extends TextBlockProps {
    }

    class WarriorTextBlock_C extends React.Component<WarriorTextBlock_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WarriorTextBlock.WarriorTextBlock_C;
    }

    interface WarriorButton_CProps extends ButtonProps {
    }

    class WarriorButton_C extends React.Component<WarriorButton_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WarriorButton.WarriorButton_C;
    }

    interface WBP_CUW_PrimaryLayout_CProps extends Widget_PrimaryLayoutProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
    }

    class WBP_CUW_PrimaryLayout_C extends React.Component<WBP_CUW_PrimaryLayout_CProps> {
        nativePtr: UE.AdvancedFrontedUI.Blueprints.Widgets.Layout.WBP_CUW_PrimaryLayout.WBP_CUW_PrimaryLayout_C;
    }

    interface DefaultBurnIn_CProps extends LevelSequenceBurnInProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        BackgroundColor?: RecursivePartial<UE.LinearColor>;
        Date?: string;
        hh?: string;
        mm?: string;
        ss?: string;
        ff?: string;
        MasterFrame?: string;
        ShotFrame?: string;
        MasterName?: string;
        ShotName?: string;
        FocalLength?: string;
        FocusDistance?: string;
        Aperture?: string;
        SensorWidth?: string;
        SensorHeight?: string;
        SensorAspectRatio?: string;
        Translation?: RecursivePartial<UE.Vector>;
        Rotation?: RecursivePartial<UE.Rotator>;
        bCached?: boolean;
        EngineVersion?: string;
        SourceTimecode?: string;
    }

    class DefaultBurnIn_C extends React.Component<DefaultBurnIn_CProps> {
        nativePtr: UE.Engine.Sequencer.DefaultBurnIn.DefaultBurnIn_C;
    }

    interface TPWBP_IconSlot_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        SizeBoxWidthOverride?: number;
        SizeBoxHeightOverride?: number;
    }

    class TPWBP_IconSlot_C extends React.Component<TPWBP_IconSlot_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.TPWBP_IconSlot.TPWBP_IconSlot_C;
    }

    interface TPWBP_AbilityIconSlot_CProps extends TPWBP_IconSlot_CProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        AbilityInputTag?: RecursivePartial<UE.GameplayTag>;
    }

    class TPWBP_AbilityIconSlot_C extends React.Component<TPWBP_AbilityIconSlot_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.TPWBP_AbilityIconSlot.TPWBP_AbilityIconSlot_C;
    }

    interface TPWBP_InputKeySlot_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        SizeBoxWidth?: number;
        SizeBoxHeight?: number;
    }

    class TPWBP_InputKeySlot_C extends React.Component<TPWBP_InputKeySlot_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.TPWBP_InputKeySlot.TPWBP_InputKeySlot_C;
    }

    interface TPWBP_StatusBar_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        SizeBoxWidthOverride?: number;
        SizeBoxHeightOverride?: number;
        StatusBarStyle?: RecursivePartial<UE.ProgressBarStyle>;
        StatusBarPreviewFillColor?: RecursivePartial<UE.LinearColor>;
        ChangeStatusBarFillColorByPercent?: boolean;
        StatusBarDefaultFillColor?: RecursivePartial<UE.LinearColor>;
        StatusBarWarningFillColor?: RecursivePartial<UE.LinearColor>;
        StatusBarCriticalFillColor?: RecursivePartial<UE.LinearColor>;
    }

    class TPWBP_StatusBar_C extends React.Component<TPWBP_StatusBar_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.TPWBP_StatusBar.TPWBP_StatusBar_C;
    }

    interface WBP_HeroOverlay_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
    }

    class WBP_HeroOverlay_C extends React.Component<WBP_HeroOverlay_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.HeroWidget.WBP_HeroOverlay.WBP_HeroOverlay_C;
    }

    interface TPWBP_MainMenuButton_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        SizeBoxWidthOverride?: number;
        SizeBoxHeightOverride?: number;
        ButtonText?: string;
        OnButtonClick?: () => void;
        ButtonResponseDelayTime?: number;
    }

    class TPWBP_MainMenuButton_C extends React.Component<TPWBP_MainMenuButton_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.TPWBP_MainMenuButton.TPWBP_MainMenuButton_C;
    }

    interface TPWBP_PauseScreenButton_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        SizeBoxWidthOverride?: number;
        SizeBoxHeightOverride?: number;
        ButtonText?: string;
        OnButtonClick?: () => void;
        ButtonResponseDelayTime?: number;
    }

    class TPWBP_PauseScreenButton_C extends React.Component<TPWBP_PauseScreenButton_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.TPWBP_PauseScreenButton.TPWBP_PauseScreenButton_C;
    }

    interface WBP_DefaultBossHealthBar_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
    }

    class WBP_DefaultBossHealthBar_C extends React.Component<WBP_DefaultBossHealthBar_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_DefaultBossHealthBar.WBP_DefaultBossHealthBar_C;
    }

    interface WBP_EnemyDamageValue_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        SizeBoxWidthOverride?: number;
        SizeBoxHeightOverride?: number;
        Damage?: number;
        DamageType?: UE.EDamageType;
        PhysicalColor?: RecursivePartial<UE.LinearColor>;
        FireColor?: RecursivePartial<UE.LinearColor>;
        IceColor?: RecursivePartial<UE.LinearColor>;
    }

    class WBP_EnemyDamageValue_C extends React.Component<WBP_EnemyDamageValue_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_EnemyDamageValue.WBP_EnemyDamageValue_C;
    }

    interface WBP_DefaultEnemyHealthBar_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        HideHealthBarTimerHandle?: RecursivePartial<UE.TimerHandle>;
        IsFirstBoardcast?: boolean;
        ShouldCreateDamageValue?: boolean;
        Offset?: RecursivePartial<UE.Vector2D>;
        WidgetSize?: RecursivePartial<UE.Vector2D>;
        RandomOffset?: number;
    }

    class WBP_DefaultEnemyHealthBar_C extends React.Component<WBP_DefaultEnemyHealthBar_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_DefaultEnemyHealthBar.WBP_DefaultEnemyHealthBar_C;
    }

    interface WBP_LoseScreen_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
    }

    class WBP_LoseScreen_C extends React.Component<WBP_LoseScreen_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_LoseScreen.WBP_LoseScreen_C;
    }

    interface WBP_OptionMenu_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
        CurrentGameDifficulty?: UE.EWarriorGameDifficulty;
    }

    class WBP_OptionMenu_C extends React.Component<WBP_OptionMenu_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_OptionMenu.WBP_OptionMenu_C;
    }

    interface WBP_MainMenu_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
    }

    class WBP_MainMenu_C extends React.Component<WBP_MainMenu_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_MainMenu.WBP_MainMenu_C;
    }

    interface WBP_PauseScreen_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
    }

    class WBP_PauseScreen_C extends React.Component<WBP_PauseScreen_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_PauseScreen.WBP_PauseScreen_C;
    }

    interface WBP_TargetLockIndicator_CProps extends WarriorWidgetBaseProps {
    }

    class WBP_TargetLockIndicator_C extends React.Component<WBP_TargetLockIndicator_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_TargetLockIndicator.WBP_TargetLockIndicator_C;
    }

    interface WBP_WaveTextNoCountDown_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
    }

    class WBP_WaveTextNoCountDown_C extends React.Component<WBP_WaveTextNoCountDown_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_WaveTextNoCountDown.WBP_WaveTextNoCountDown_C;
    }

    interface WBP_WaveTextWithCountDown_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
    }

    class WBP_WaveTextWithCountDown_C extends React.Component<WBP_WaveTextWithCountDown_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_WaveTextWithCountDown.WBP_WaveTextWithCountDown_C;
    }

    interface WBP_WinScreen_CProps extends WarriorWidgetBaseProps {
        UberGraphFrame?: RecursivePartial<UE.PointerToUberGraphFrame>;
    }

    class WBP_WinScreen_C extends React.Component<WBP_WinScreen_CProps> {
        nativePtr: UE.Game.Asset._MyAsset.Widget.WBP_WinScreen.WBP_WinScreen_C;
    }


    interface Root {
        removeFromViewport() : void;
        getWidget(): any;
    }

    interface TReactUMG {
        render(element: React.ReactElement) : Root;
        init(world: any) : void;
    }

    var ReactUMG : TReactUMG;
}    
    