@echo off
setlocal EnableExtensions
cd /d "%~dp0"
set "PROJECT_FILE=%~dp0CppGOWActionGame.uproject"
for /f "delims=" %%E in ('powershell.exe -NoProfile -File "%~dp0Scripts\ResolveEngine.ps1"') do set "UE_ENGINE_DIR=%%E"
if not exist "%UE_ENGINE_DIR%\Engine\Binaries\Win64\UnrealEditor-Cmd.exe" exit /b 1
@title puerts gen bp and js ......

@taskkill /F /IM UnrealEditor.exe >nul 2>&1
@taskkill /F /IM UnrealEditor-Cmd.exe >nul 2>&1

setlocal EnableDelayedExpansion

set max_retry=1
set retryCount=0

:retry
start "puerts gen bp and js" /WAIT "%UE_ENGINE_DIR%\Engine\Binaries\Win64\UnrealEditor-Cmd.exe" "%PROJECT_FILE%" -TestExit="Puerts FINISH" -nullrhi -log -nosplash -nosound -nopauseonsuccess -nocontentbrowser -silent
set /a retryCount+=1
if not exist ".\ts_file_versions_info.json" (
  if !retryCount! lss %max_retry% (
    powershell -command "& {$output = 'puerts gen bp and js error, Retrying...'; Write-Host $output -ForegroundColor Yellow}"
    goto retry
  ) else (
    powershell -command "& {$output = 'puerts gen bp and js fail.'; Write-Host $output -ForegroundColor Red}"
    exit /b 1
  )
) else (
  echo puerts gen bp and js ok
)

exit /b 0
