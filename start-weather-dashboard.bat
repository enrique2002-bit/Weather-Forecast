@echo off
echo 🌟 Starting Professional Split Weather Dashboard...
echo.
echo 📍 Location: Split, Croatia
echo 🔑 API: WeatherAPI.com (Live Data)
echo 🌐 Server: http://localhost:3000
echo.
cd /d "%~dp0"
echo Starting HTTP server...
start "" "http://localhost:3000/split-professional-weather.html"
python -m http.server 3000
pause
