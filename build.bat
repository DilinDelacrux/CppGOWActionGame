@echo off
setlocal EnableExtensions

REM ============================================================
REM  One-click build for CppGOWActionGame (Unreal Engine 5.8)
REM  Builds the project without opening Visual Studio or Rider.
REM
REM  Usage:
REM    build.bat                  Build Editor (Development Win64)
REM    build.bat Game             Build Game target (Development Win64)
REM    build.bat Game Shipping    Build Game target, Shipping config
REM    build.bat Editor Shipping  Build Editor, Shipping config
REM ============================================================

REM ---- Project / build settings ----
set "PROJECT_FILE=%~dp0CppGOWActionGame.uproject"
set "TARGET_NAME=CppGOWActionGameEditor"
set "PLATFORM=Win64"
set "CONFIG=Development"

if /i "%~1"=="Game" set "TARGET_NAME=CppGOWActionGame"
if not "%~2"=="" set "CONFIG=%~2"

REM ---- Locate the engine ----
for /f "delims=" %%E in ('powershell.exe -NoProfile -File "%~dp0Scripts\ResolveEngine.ps1"') do set "UE_ENGINE_DIR=%%E"

set "BUILD_BAT=%UE_ENGINE_DIR%\Engine\Build\BatchFiles\Build.bat"

if not exist "%BUILD_BAT%" (
    echo.
    echo [ERROR] Could not find Unreal Engine 5.8.
    echo         Looked at: "%UE_ENGINE_DIR%"
    echo         Register the project engine or set UE_ENGINE_DIR relative to the project root.
    echo.
    pause
    exit /b 1
)

echo ============================================================
echo  Target  : %TARGET_NAME%
echo  Platform: %PLATFORM%
echo  Config  : %CONFIG%
echo  Engine  : %UE_ENGINE_DIR%
echo  Project : %PROJECT_FILE%
echo ============================================================
echo.

call "%BUILD_BAT%" %TARGET_NAME% %PLATFORM% %CONFIG% -project="%PROJECT_FILE%" -waitmutex

if errorlevel 1 (
    echo.
    echo [ERROR] Build FAILED ^(exit code %errorlevel%^).
    echo.
    pause
    exit /b %errorlevel%
)

echo.
echo [OK] Build succeeded.
echo.
pause
endlocal
