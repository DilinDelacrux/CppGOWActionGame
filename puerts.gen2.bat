@echo off
setlocal

:: ========================================================
:: 配置区域
:: ========================================================
:: 项目名称
set PROJECT_NAME=CppGOWActionGame
:: .uproject 绝对路径
set PROJECT_PATH=%~dp0%PROJECT_NAME%.uproject
:: UE 5.5 编辑器路径
set UE_EDITOR_CMD="C:\Program Files\Epic Games\UE_5.5\Engine\Binaries\Win64\UnrealEditor-Cmd.exe"

echo [1/3] 正在生成 d.ts...
%UE_EDITOR_CMD% "%PROJECT_PATH%" -TestExit="Fixed up redirectors for" -TestExitExecCmds="Puerts.Gen" -nullrhi -log -nosplash -nosound -nopauseonsuccess -nocontentbrowser -silent
echo d.ts 生成完毕.

echo [2/3] 正在执行 tsc 编译...
call tsc
if %errorlevel% neq 0 (
    echo [错误] TypeScript 编译失败！
    pause
    exit /b 1
)
echo tsc 编译成功.

echo [3/3] 正在生成蓝图 (Blueprint) 和 JS 绑定...
:: 强制关闭可能残留的编辑器进程，避免占用文件
taskkill /F /IM UnrealEditor.exe >nul 2>&1
taskkill /F /IM UnrealEditor-Cmd.exe >nul 2>&1

:: 删除版本缓存以触发全量重新生成
del /f /q ".\ts_file_versions_info.json" > nul 2>&1

:: 执行生成
%UE_EDITOR_CMD% "%PROJECT_PATH%" -TestExit="Puerts FINISH" -nullrhi -log -nosplash -nosound -nopauseonsuccess -nocontentbrowser

if %errorlevel% equ 0 (
    echo [成功] 蓝图生成完成！
) else (
    echo [错误] 蓝图生成过程中出错，请查看上面的日志。
    pause
    exit /b 1
)

endlocal
pause