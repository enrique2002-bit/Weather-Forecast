@echo off
echo 🌐 Starting Weather Dashboard in EDGE KIOSK MODE...
echo ====================================================
echo Launching Split Croatia Weather Dashboard
echo Mode: FULLSCREEN KIOSK (Microsoft Edge)
echo Location: Split, Croatia (43.5081°N, 16.4402°E)
echo ====================================================
echo.

REM Get the absolute path to the KIOSK HTML file
set "HTML_FILE=%~dp0Weather-Dashboard-KIOSK-MODE.html"

echo Starting Microsoft Edge in Kiosk Mode...
echo Press ALT+F4 to exit kiosk mode
echo.

REM Launch Edge in kiosk mode (fullscreen, no UI)
start "" "msedge.exe" --kiosk --edge-kiosk-type=fullscreen --no-first-run --disable-features=msEdgeEnableKioskMode --start-fullscreen "file:///%HTML_FILE%"

REM Wait a moment then check if Edge started
timeout /t 3 /nobreak >nul

echo ✅ Edge Kiosk mode launched!
echo.
echo 🔑 KIOSK MODE CONTROLS:
echo • ALT + F4 = Exit kiosk mode
echo • F5 = Refresh dashboard
echo • Ctrl + Shift + I = Developer tools (if needed)
echo.
echo Press any key to close this launcher window...
pause >nul
