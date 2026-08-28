# UMG 外观 + TypeScript 逻辑菜单 Demo（方案二）

这个方案不使用 ReactUMG 创建控件。UMG Widget Blueprint 只保存布局、字体、颜色、图片和动画；`UmgMenuLogicDemo.ts` 负责创建菜单、绑定按钮、切换致谢面板、输入模式和退出游戏。

## 需要手动完成的 UMG 内容

1. 先同步 `UmgMenuLogicDemo.ts`，得到 Actor：`/Game/Asset/TsBlueprints/UmgMenuLogicDemo`。
2. 使用现有 Widget Blueprint：`/Game/AmbientNpcBehavior/BP/UMG/WBP_TsMenuDemo`。
3. 外观可以自由设计，但必须存在下面四个控件，并勾选 **Is Variable**：
   - `Btn_StartGame`：Button
   - `Btn_QuitGame`：Button
   - `Btn_Credits`：Button
   - `Panel_Credits`：任意 Widget 容器，例如 Border、Overlay 或 VerticalBox
4. 建议把 `Panel_Credits` 的默认 Visibility 设为 **Collapsed**。
5. 不需要在 Event Graph 中编写任何逻辑，也不要给三个按钮绑定 OnClicked。
6. 把 `/Game/Asset/TsBlueprints/UmgMenuLogicDemo` 放进关卡。
7. Actor 的 `Menu Widget Class Path` 默认已经填写为：
   `/Game/AmbientNpcBehavior/BP/UMG/WBP_TsMenuDemo.WBP_TsMenuDemo_C`。
   不要再把 Widget Blueprint 资产拖入 Class 属性；如果移动了 WBP，只需把这里改为新的完整生成类路径，并保留结尾的 `_C`。

## 运行结果

- 开始游戏：移除菜单，切回 Game Only 输入并隐藏鼠标。
- 结束游戏：调用 Unreal 的 QuitGame。
- 致谢：在 Visible 与 Collapsed 之间切换 `Panel_Credits`。
- 如果控件名称、类型或 Is Variable 配置不正确，Output Log 会一次列出所有缺失项。

不要同时在关卡中放置方案一的 `ReactUmgMenuDemo`，否则两个菜单会同时创建。
