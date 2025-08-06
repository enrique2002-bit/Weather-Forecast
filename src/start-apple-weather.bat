@echo off
echo 🍎 Apple Weather DNA - Quick Start Script
echo ==========================================
echo.

echo Setting up Apple Weather DNA for Split, Croatia...
echo.

echo 📁 Creating directory structure...
if not exist "assets" mkdir assets

echo 🎬 Creating video placeholders...
echo. > assets\weather-clear.mp4
echo. > assets\weather-cloudy.mp4  
echo. > assets\weather-rainy.mp4

echo 🔧 Configuration needed:
echo.
echo 1. Get WeatherAPI key from: https://www.weatherapi.com/
echo 2. Get Mapbox token from: https://www.mapbox.com/
echo 3. Edit script-apple.js and replace:
echo    - YOUR_WEATHERAPI_KEY
echo    - YOUR_MAPBOX_TOKEN
echo.

echo 🚀 Starting local server...
echo Open your browser to: http://localhost:8000/index-apple.html
echo.

python -m http.server 8000

pause
