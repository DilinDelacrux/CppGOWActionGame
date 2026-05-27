
@REM -stdout
@title puerts fix ......
@REM start "puerts fix" /WAIT cmd /C "call fix.bat"
call fix.bat
echo puerts fix ok

@taskkill /F /IM UnrealEditor* /T >nul 2>&1
@taskkill /F /IM CrashReportClientEditor* /T  >nul 2>&1

@title puerts gen d.ts ......
start "puerts gen d.ts" /WAIT ..\..\Engine\Binaries\Win64\UnrealEditor-Cmd.exe .\t6.uproject -TestExit="Fixed up redirectors for" -TestExitExecCmds="Puerts.Gen" -nullrhi -log -nosplash -nosound -nopauseonsuccess -nocontentbrowser -silent

echo puerts gen d.ts ok

@title tsc ......
call tsc
@if %errorlevel%==0 (
  echo tsc ok
) else (
  powershell -command "& {$output = 'tsc error'; Write-Host $output -ForegroundColor Red}"
  pause
  exit /b 1
)


@del /f .\ts_file_versions_info.json > nul 2>&1

@title puerts gen bp and js ......

@taskkill /F /IM UnrealEditor.exe >nul 2>&1
@taskkill /F /IM UnrealEditor-Cmd.exe >nul 2>&1

setlocal EnableDelayedExpansion

set max_retry=1
set retryCount=0

:retry
start "puerts gen bp and js" /WAIT ..\..\Engine\Binaries\Win64\UnrealEditor-Cmd.exe .\t6.uproject -TestExit="Puerts FINISH" -nullrhi -log -nosplash -nosound -nopauseonsuccess -nocontentbrowser -silent
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
