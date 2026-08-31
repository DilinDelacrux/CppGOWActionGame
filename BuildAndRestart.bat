@echo off
setlocal EnableExtensions

REM Build the Editor target, then reopen this project with UE 5.8.
REM Close gracefully: allow UE to prompt for unsaved work; never force-kill it.
set "PROJECT_FILE=%~dp0CppGOWActionGame.uproject"
for /f "delims=" %%E in ('powershell.exe -NoProfile -File "%~dp0Scripts\ResolveEngine.ps1"') do set "UE_ENGINE_DIR=%%E"
set "BUILD_BAT=%UE_ENGINE_DIR%\Engine\Build\BatchFiles\Build.bat"
set "EDITOR_EXE=%UE_ENGINE_DIR%\Engine\Binaries\Win64\UnrealEditor.exe"

if not exist "%PROJECT_FILE%" (
    echo [ERROR] Project file not found: "%PROJECT_FILE%"
    goto :failed
)
if not exist "%BUILD_BAT%" (
    echo [ERROR] Build tool not found: "%BUILD_BAT%"
    goto :failed
)
if not exist "%EDITOR_EXE%" (
    echo [ERROR] Editor not found: "%EDITOR_EXE%"
    goto :failed
)

echo [1/3] Closing this project's editor. Save your work if UE prompts you.
echo       Other projects will be left open. Canceling shutdown aborts the build after 120 seconds.
powershell.exe -NoProfile -Command  "$ErrorActionPreference = 'Stop'; try {  $pattern = '(?i)(?:^|[\s\x22=])' + [regex]::Escape($env:PROJECT_FILE) + '(?=[\x22\s]|$)';  $editors = @(Get-CimInstance Win32_Process -Filter 'Name = ''UnrealEditor.exe''' | Where-Object { $_.CommandLine -and ($_.CommandLine.Replace('/', '\') -match $pattern) });  foreach ($editor in $editors) {  $process = Get-Process -Id $editor.ProcessId -ErrorAction SilentlyContinue;  if ($null -eq $process -or $process.HasExited) { continue };  if (-not $process.CloseMainWindow()) { throw 'Cannot close the editor automatically. Save and close it manually, then run this script again.' };  if (-not $process.WaitForExit(120000)) { throw 'Editor is still open. Build canceled; no process was force-killed.' };  };  } catch { Write-Host ('[ERROR] ' + $_.Exception.Message); exit 1 }"
if errorlevel 1 goto :failed

echo [2/3] Building CppGOWActionGameEditor with "%UE_ENGINE_DIR%"...
call "%BUILD_BAT%" CppGOWActionGameEditor Win64 Development -Project="%PROJECT_FILE%" -WaitMutex -NoHotReloadFromIDE
if errorlevel 1 goto :failed

echo [3/3] Opening project...
start "" "%EDITOR_EXE%" "%PROJECT_FILE%"
if errorlevel 1 goto :failed
exit /b 0

:failed
echo.
echo [ERROR] BuildAndRestart did not complete. Fix the error above and run it again.
pause
exit /b 1
