#!/bin/bash
echo "Starting Split Weather Forecast in Kiosk Mode..."
echo

# Get the directory of this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Check if Chromium is available
if command -v chromium-browser &> /dev/null; then
    echo "Starting with Chromium..."
    chromium-browser --kiosk --app="file://$DIR/src/index.html" --disable-web-security --disable-features=TranslateUI --disable-ipc-flooding-protection &
elif command -v google-chrome &> /dev/null; then
    echo "Starting with Chrome..."
    google-chrome --kiosk --app="file://$DIR/src/index.html" --disable-web-security --disable-features=TranslateUI --disable-ipc-flooding-protection &
elif command -v firefox &> /dev/null; then
    echo "Starting with Firefox..."
    firefox --kiosk "file://$DIR/src/index.html" &
else
    echo "Starting with default browser..."
    xdg-open "file://$DIR/src/index.html" &
fi

echo
echo "Weather forecast is now running in kiosk mode!"
echo "Press Alt+F4 or Ctrl+Alt+Del to exit kiosk mode."
echo
