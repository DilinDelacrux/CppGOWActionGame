# Western UI fonts

2026-09-04：导入四个开源英文字体家族，共八个静态 TTF。未修改字体字形，未安装系统字体，未替换现有 ReactUMG UI。

## UE 中使用

内容浏览器打开 `/Game/UI/Fonts/Western`。每个字形有一个 Font Face 和一个以 `_Font` 结尾的 Font。UMG 的 Font Object 选择 **`_Font` 资源**，Typeface 选择 `Default`，字号按控件设置。

| 子目录 | Font 资源 | 用途建议 |
| --- | --- | --- |
| Rye | `Rye_Regular_Font` | 西部标题、招牌 |
| IMFellEnglish | `IMFellEnglish_Regular_Font`、`IMFellEnglish_Italic_Font` | 日记、信件 |
| RobotoSlab | `RobotoSlab_Regular_Font`、`RobotoSlab_Bold_Font` | 地名、面板标题 |
| BarlowSemiCondensed | `BarlowSemiCondensed_Regular_Font`、`BarlowSemiCondensed_Medium_Font`、`BarlowSemiCondensed_SemiBold_Font` | 正文、按钮、资源及关系数字 |

推荐首版组合：Rye 标题 + Barlow Semi Condensed Medium 正文。小字号不添加破损或网点。字体主要用于英文，不提供完整中文字库；中文 UI 仍需单独设置并验证中文回退字体。

## 资源与复现

- 原始字体、原始授权文件：本目录各家族子目录。
- 下载地址、文件大小和 SHA-256：`manifest.json`；文件未经变形或重新生成。
- 导入脚本：工程根目录下 `Scripts/ImportWesternFonts.py`。
- UE 资源：`Content/UI/Fonts/Western`。
- 验证报告：`Saved/FontImport/validation.json`。

已在 UE 5.8.2 完成导入和新编辑器进程的重新加载验证：8 对资源类型、硬引用、Runtime 缓存、Inline 数据和来源相对路径均通过；重跑没有创建重复资源，16 个资源文件的 SHA-256 未改变。此次使用 NullRHI，尚未做实际 UI 渲染或打包验证。

脚本从 UE 的工程目录解析路径，检查所有输入的 SHA-256，并且不覆盖已有资源。Font 使用 Runtime 缓存，Font Face 使用 Inline；运行时字体数据嵌入 UE 资源，不读取开发机 TTF 路径。只有被游戏引用或被明确纳入 cook 的资源才会随包发布；本次未改 cook 配置。

需要在另一份检出中生成缺失资源时，启用 Python Editor Script Plugin 与 Editor Scripting Utilities，在编辑器 Python 控制台执行：

```python
import runpy, unreal
runpy.run_path(unreal.Paths.project_dir() + 'Scripts/ImportWesternFonts.py', run_name='__main__')
```

不要用 `-run=pythonscript` 导入 Font Face：本引擎的字体导入需要已初始化的 Slate。脚本可重复运行以检查资源；已有资源只验证，不重新导入或覆盖。资源中的 Source Filename 是工程相对路径，仅用于记录来源；编辑器的直接 Reimport 不会自动以工程目录解析它，如以后更换字体文件，需显式定位该工程中的 TTF 并更新校验清单。

## 来源与授权

- Rye：[Google Fonts](https://github.com/google/fonts/tree/main/ofl/rye)，SIL OFL 1.1，保留名称 Rye。
- IM Fell English：[Google Fonts](https://github.com/google/fonts/tree/main/ofl/imfellenglish)，SIL OFL 1.1。
- Barlow Semi Condensed：[Google Fonts](https://github.com/google/fonts/tree/main/ofl/barlowsemicondensed)，SIL OFL 1.1。
- Roboto Slab：[Google Fonts 项目源仓库](https://github.com/googlefonts/robotoslab/tree/main/fonts/ttf)，Apache 2.0；随附 LICENSE.txt 与 AUTHORS.txt。

发布游戏时，须把所使用字体的版权及许可证一并放入发行包或第三方许可页面。本目录在 SourceArt 下，不会自动随 UE 打包；发布前请纳入发行清单。若未来修改字体，需重新核对对应许可及保留名称要求。
