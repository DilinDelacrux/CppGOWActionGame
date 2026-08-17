@echo off
setlocal EnableExtensions

REM ============================================================
REM  One-click build for CppGOWActionGame (Unreal Engine 5.5)
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
set "UE_ENGINE_DIR=C:\Program Files\Epic Games\UE_5.5"

REM Fall back to the registry if the default path is missing.
if not exist "%UE_ENGINE_DIR%\Engine\Build\BatchFiles\Build.bat" (
    for /f "tokens=2,*" %%A in ('reg query "HKCU\SOFTWARE\Epic Games\Unreal Engine\Builds\5.5" /v InstalledDirectory 2^>nul ^| findstr /i InstalledDirectory') do set "UE_ENGINE_DIR=%%B"
)

set "BUILD_BAT=%UE_ENGINE_DIR%\Engine\Build\BatchFiles\Build.bat"

if not exist "%BUILD_BAT%" (
    echo.
    echo [ERROR] Could not find Unreal Engine 5.5.
    echo         Looked at: "%UE_ENGINE_DIR%"
    echo         Set UE_ENGINE_DIR at the top of this script to the correct path.
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
