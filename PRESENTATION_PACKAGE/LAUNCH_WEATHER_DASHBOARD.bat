@echo off
echo 🌤️ Starting Split Croatia Weather Dashboard...
echo ====================================================
echo Opening Weather Intelligence Dashboard
echo Location: Split, Croatia (43.5081°N, 16.4402°E)
echo Features: Live Weather Data, 24h Forecast, 7-Day Outlook
echo ====================================================
echo.
echo Choose your presentation mode:
echo [1] Normal Dashboard (Browser Window)
echo [2] Professional Launcher Page  
echo [3] 🖥️ KIOSK MODE - Chrome (Fullscreen, No UI)
echo [4] 🌐 KIOSK MODE - Edge (Fullscreen, No UI)
echo [5] Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    start "" "Weather-Dashboard-Split-Croatia.html"
    echo ✅ Normal dashboard launched!
) else if "%choice%"=="2" (
    start "" "PRESENTATION_LAUNCHER.html"
    echo ✅ Professional launcher opened!
) else if "%choice%"=="3" (
    call "LAUNCH_KIOSK_MODE.bat"
    echo ✅ Chrome Kiosk mode started!
) else if "%choice%"=="4" (
    call "LAUNCH_EDGE_KIOSK.bat"
    echo ✅ Edge Kiosk mode started!
) else if "%choice%"=="5" (
    echo Goodbye!
    exit
) else (
    echo Invalid choice. Opening normal dashboard...
    start "" "Weather-Dashboard-Split-Croatia.html"
    echo ✅ Normal dashboard launched!
)

echo.
echo Press any key to close this launcher window...
pause >nul
