@echo off
echo.
echo ==========================================
echo  Split Weather Forecast - Electron Setup
echo ==========================================
echo.

echo Installing Electron for professional kiosk deployment...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

REM Install Electron
echo Installing Electron...
npm install electron --save-dev

if %errorlevel% neq 0 (
    echo ERROR: Failed to install Electron
    echo Make sure you have internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo  Setup Complete!
echo ==========================================
echo.
echo To start the weather forecast in Electron:
echo   npm start
echo.
echo To build executable:
echo   npm install electron-builder --save-dev
echo   npm run build
echo.
echo The Electron version provides:
echo  - True fullscreen kiosk mode
echo  - Auto-refresh every hour
echo  - Prevents accidental closing
echo  - Professional deployment
echo.
pause
