@echo off
echo 🖥️ Starting Weather Dashboard in KIOSK MODE...
echo ====================================================
echo Launching Split Croatia Weather Dashboard
echo Mode: FULLSCREEN KIOSK (No browser UI visible)
echo Location: Split, Croatia (43.5081°N, 16.4402°E)
echo ====================================================
echo.

REM Get the absolute path to the KIOSK HTML file
set "HTML_FILE=%~dp0Weather-Dashboard-KIOSK-MODE.html"

echo Starting Chrome in Kiosk Mode...
echo Press ALT+F4 to exit kiosk mode
echo.

REM Launch Chrome in kiosk mode (fullscreen, no UI)
start "" "chrome.exe" --kiosk --disable-web-security --disable-features=VizDisplayCompositor --autoplay-policy=no-user-gesture-required --disable-backgrounding-occluded-windows --disable-renderer-backgrounding --disable-field-trial-config --disable-background-timer-throttling --start-fullscreen "file:///%HTML_FILE%"

REM Wait a moment then check if Chrome started
timeout /t 3 /nobreak >nul

echo ✅ Kiosk mode launched!
echo.
echo 🔑 KIOSK MODE CONTROLS:
echo • ALT + F4 = Exit kiosk mode
echo • F5 = Refresh dashboard
echo • F11 = Toggle fullscreen (if needed)
echo.
echo Press any key to close this launcher window...
pause >nul
