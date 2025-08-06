# Split Weather Forecast - Kiosk Mode Deployment Guide

## 🖥️ Kiosk Mode Setup Instructions

### Windows Deployment

1. **Copy to USB Drive**:
   - Copy the entire project folder to your USB drive
   - Recommended path: `D:\weather\` (or your USB drive letter)

2. **Start Kiosk Mode**:
   ```bash
   # Double-click this file or run in Command Prompt:
   start-kiosk.bat
   ```

3. **Manual Browser Launch** (alternative):
   ```bash
   # Chrome (recommended):
   chrome --kiosk --app="file:///D:/weather/src/index.html"
   
   # Microsoft Edge:
   msedge --kiosk --app="file:///D:/weather/src/index.html"
   
   # Firefox:
   firefox --kiosk "file:///D:/weather/src/index.html"
   ```

### Linux Deployment

1. **Make script executable**:
   ```bash
   chmod +x start-kiosk.sh
   ```

2. **Run kiosk mode**:
   ```bash
   ./start-kiosk.sh
   ```

## 🎯 Display Optimization Steps

### Step 1: Browser Kiosk Mode
- **Why**: Full screen without scrollbars or browser UI
- **Action**: Use the provided batch/shell scripts

### Step 2: Viewport DPI Adaptation
- **Why**: 4K displays often scale >100%
- **Action**: ✅ Already implemented in `<head>`:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  ```

### Step 3: Container Responsive Design
- **Why**: Handles slight panel deviations (e.g., overscan)
- **Action**: ✅ Already changed from fixed `2160px × 3840px` to:
  ```css
  width: 100vw; 
  height: 100vh;
  ```

### Step 4: Orientation Lock
- **Why**: Prevents accidental landscape mode
- **Action**: In Windows:
  1. Right-click desktop → Display Settings
  2. Set Orientation to "Portrait (flipped)" 
  3. Lock the setting

### Step 5: Final Pixel Check
- **Why**: Ensure nothing is cut off
- **Action**: Take screenshot with `Win + Shift + S`
- Zoom in on UI elements to verify perfect fit

## 🚀 Advanced Deployment Options

### Option 1: Electron Shell (Recommended)
For maximum reliability, wrap in a minimal Electron app:

```javascript
// main.js (5 lines)
const { app, BrowserWindow } = require('electron');
app.whenReady().then(() => {
  const win = new BrowserWindow({ fullscreen: true, frame: false });
  win.loadFile('src/index.html');
});
```

### Option 2: Digital Signage Software
- **Screenly OSE** (Open Source)
- **Xibo** 
- **OptiSigns**
- **Rise Vision**

## 🔧 Browser-Specific Optimizations

### Chrome/Chromium Flags:
```bash
--kiosk                          # Full kiosk mode
--app="file://..."              # App mode without browser UI
--disable-web-security          # Allow local file access
--disable-features=TranslateUI   # Remove translation popups
--disable-ipc-flooding-protection # Prevent connection issues
--autoplay-policy=no-user-gesture-required # Allow auto-refresh
```

### Firefox Flags:
```bash
--kiosk                          # Full screen mode
--new-instance                   # Fresh instance
```

## 📱 Mobile/Tablet Deployment

For Android tablets or mobile devices:

1. **Chrome Mobile**:
   - Add to Home Screen
   - Enable "Desktop Site"
   - Use full-screen gesture

2. **Kiosk Browser Apps**:
   - KioWare
   - Fully Kiosk Browser
   - SiteKiosk

## 🔄 Auto-Restart & Monitoring

### Windows Task Scheduler:
1. Create basic task
2. Trigger: At startup
3. Action: Start `start-kiosk.bat`
4. Settings: Restart if fails

### Linux Systemd Service:
```ini
[Unit]
Description=Weather Forecast Kiosk
After=graphical.target

[Service]
ExecStart=/path/to/start-kiosk.sh
Restart=always
User=pi

[Install]
WantedBy=graphical.target
```

## 🎨 Perfect Display Results

With these optimizations, you'll get:
- ✅ **Perfect Full Screen**: No browser UI elements
- ✅ **Pixel Perfect**: Responsive scaling for any DPI
- ✅ **Auto-Sizing**: Adapts to actual screen dimensions
- ✅ **No Scrollbars**: Complete kiosk experience
- ✅ **Touch Optimized**: Works on touch displays
- ✅ **24/7 Ready**: Handles power cycles and reconnections

## 🔑 API Key Setup

Before deployment, replace `YOUR_API_KEY_HERE` in `src/script.js`:

1. Get free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Edit `src/script.js`, line 1:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

## 🛠️ Troubleshooting

- **Display too small**: Check Windows display scaling (should be 100%)
- **Content cut off**: Verify monitor overscan settings
- **Browser UI visible**: Ensure kiosk flags are working
- **Touch not working**: Enable touch in browser settings
- **Auto-refresh fails**: Check internet connection and API key

Your weather forecast is now ready for professional 24/7 deployment! 🌟
