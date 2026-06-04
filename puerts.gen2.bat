@title puerts gen bp and js ......

@taskkill /F /IM UnrealEditor.exe >nul 2>&1
@taskkill /F /IM UnrealEditor-Cmd.exe >nul 2>&1

setlocal EnableDelayedExpansion

set max_retry=1
set retryCount=0

:retry
start "puerts gen bp and js" /WAIT "C:\Program Files\Epic Games\UE_5.5\Engine\Binaries\Win64\UnrealEditor-Cmd.exe" C:\Users\admin\Documents\Unreal Projects\CppGOWActionGame\CppGOWActionGame.uproject -TestExit="Puerts FINISH" -nullrhi -log -nosplash -nosound -nopauseonsuccess -nocontentbrowser -silent
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