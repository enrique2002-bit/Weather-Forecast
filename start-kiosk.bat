@echo off
echo Starting Split Weather Forecast in Kiosk Mode...
echo.

REM Check if Chrome is available
where chrome >nul 2>nul
if %errorlevel% == 0 (
    echo Starting with Chrome...
    start chrome --kiosk --app="file:///%~dp0src/index.html" --disable-web-security --disable-features=TranslateUI --disable-ipc-flooding-protection
    goto :end
)

REM Check if Edge is available
where msedge >nul 2>nul
if %errorlevel% == 0 (
    echo Starting with Microsoft Edge...
    start msedge --kiosk --app="file:///%~dp0src/index.html" --disable-web-security --disable-features=TranslateUI
    goto :end
)

REM Fallback to default browser
echo Starting with default browser...
start "" "file:///%~dp0src/index.html"

:end
echo.
echo Weather forecast is now running in kiosk mode!
echo Press Ctrl+Alt+Del or Alt+F4 to exit kiosk mode.
echo.
pause
