@echo off
title Split Weather Forecast - Professional Dashboard
color 0B
echo.
echo  ╔══════════════════════════════════════════════════════╗
echo  ║          🌟 Split Weather Forecast 🌟              ║
echo  ║         Professional Dashboard Starting...          ║
echo  ╚══════════════════════════════════════════════════════╝
echo.
echo Starting local server...
echo Open your browser to: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
python -m http.server 8080
pause
