@echo off
setlocal enabledelayedexpansion

:: 设置脚本运行的起始目录（默认为脚本所在目录）
set "ROOT_DIR=%~dp0"
cd /d "%ROOT_DIR%"

echo 正在开始清理任务...
echo ------------------------------------------

:: 1. 删除当前目录下的 Typing 文件夹
if exist "Typing" (
    echo [正在删除] 发现 Typing 文件夹...
    rd /s /q "Typing"
    echo [完成] Typing 已删除。
) else (
    echo [跳过] 未找到 Typing 文件夹。
)

:: 2. 删除 Content 目录下的 Javascript 文件夹
if exist "Content\Javascript" (
    echo [正在删除] 发现 Content\Javascript 文件夹...
    rd /s /q "Content\Javascript"
    echo [完成] Content\Javascript 已删除。
) else (
    echo [跳过] 未找到 Content\Javascript 文件夹。
)

echo ------------------------------------------
echo 所有指定文件夹已清理完毕！
pause