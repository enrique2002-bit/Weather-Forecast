@echo off
echo 🌤️ Starting Split Croatia Weather Dashboard...
echo ====================================================
echo Opening Weather Intelligence Dashboard
echo Location: Split, Croatia (43.5081°N, 16.4402°E)
echo Features: Live Weather Data, 24h Forecast, 7-Day Outlook
echo ====================================================
echo.
echo Choose your presentation option:
echo [1] Direct Dashboard (Recommended)
echo [2] Professional Launcher Page
echo [3] Exit
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    start "" "Weather-Dashboard-Split-Croatia.html"
    echo ✅ Dashboard launched successfully!
) else if "%choice%"=="2" (
    start "" "PRESENTATION_LAUNCHER.html"
    echo ✅ Presentation launcher opened!
) else if "%choice%"=="3" (
    echo Goodbye!
    exit
) else (
    echo Invalid choice. Opening direct dashboard...
    start "" "Weather-Dashboard-Split-Croatia.html"
    echo ✅ Dashboard launched successfully!
)

echo.
echo Press any key to close this window...
pause >nul
