# 🌤️ Split Weather Forecast - iOS Style

A beautiful, professional weather forecast application for Split, Croatia, designed to look exactly like Apple's iOS Weather app. Built for 24/7 operation on 2160x3840px vertical displays with realistic weather icons and authentic iOS styling.

![Weather App Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![iOS Style](https://img.shields.io/badge/Design-iOS%20Weather%20App-blue)
![Kiosk Ready](https://img.shields.io/badge/Deployment-Kiosk%20Ready-orange)

## ✨ Features

### 🎨 **Authentic iOS Design**
- **Pixel-perfect iOS Weather app replica** with exact styling
- **SF Pro Display font** for authentic Apple typography
- **Realistic weather icons** using Weather Icons font library
- **Dynamic iOS-style animations** for weather conditions
- **Authentic iOS color schemes** and card layouts

### 🌡️ **Comprehensive Weather Data**
- **Real-time weather** from OpenWeatherMap API
- **Current conditions** with temperature, humidity, wind
- **7-day forecast** with detailed daily predictions
- **Weather details grid** showing all essential metrics
- **Dynamic theming** based on weather conditions

### 🖥️ **Professional Kiosk Mode**
- **24/7 operation** capability with auto-refresh
- **Vertical display optimization** for 2160x3840px screens
- **Responsive design** with clamp() functions for perfect scaling
- **Electron wrapper** for desktop deployment
- **Cross-platform scripts** (Windows/Linux) for easy setup

### 🌍 **Location-Specific**
- **Split, Croatia focus** (43.5081°N, 16.4402°E)
- **Interactive map** integration with Leaflet.js
- **Local timezone** handling (Europe/Zagreb)
- **Croatian localization** support

### 💻 **Advanced Technical Features**
- **Glassmorphism effects** with backdrop-filter blur
- **Smooth animations** with cubic-bezier transitions
- **Offline mode** with fallback data display
- **Error handling** with graceful degradation
- **Optimized performance** for continuous operation

## 🚀 Quick Start

### 1. **Get Your API Key**
- Sign up at [OpenWeatherMap](https://openweathermap.org/api)
- Get your free API key
- Replace `YOUR_API_KEY_HERE` in `src/script.js`

### 2. **Basic Setup**
```bash
# Clone or download the project
git clone [your-repo-url]
cd Weather-Forecast

# Open in any web server
# For quick testing: python -m http.server 8000
```

### 3. **Professional Kiosk Deployment**

#### **Windows (Recommended)**
```batch
# Run the setup script
setup-electron.bat

# Start in kiosk mode
start-kiosk.bat
```

#### **Linux**
```bash
# Make scripts executable
chmod +x *.sh

# Start in kiosk mode
./start-kiosk.sh
```

#### **Web Browser Kiosk**
```bash
# Chrome kiosk mode
chrome --kiosk --app=file:///path/to/index.html

# Firefox kiosk mode  
firefox --kiosk file:///path/to/index.html
```

## 📁 Project Structure

```
Weather-Forecast/
├── src/
│   ├── index.html          # iOS-style HTML structure
│   ├── style.css           # Complete iOS Weather app styling
│   ├── script.js           # Weather API & iOS animations
│   └── assets/             # Weather icons & fonts
├── deployment/
│   ├── electron-main.js    # Electron wrapper
│   ├── package.json        # Node.js dependencies
│   ├── start-kiosk.bat     # Windows kiosk script
│   ├── start-kiosk.sh      # Linux kiosk script
│   └── setup-electron.bat  # Windows setup script
├── DEPLOYMENT.md           # Detailed deployment guide
└── # Split Weather Forecast - Professional Dashboard

## 🌟 Ultimate Glassmorphism Weather Experience

### 🚀 Quick Start from USB
1. Copy this entire folder to your USB stick
2. Double-click `START_WEATHER_FORECAST.bat`
3. Open browser to `http://localhost:8080/split-professional-weather.html`

### ✨ Features
- **Live Weather Data** for Split, Croatia
- **Interactive Weather Map** with precipitation radar
- **24-Hour & 7-Day Forecasts**
- **Ultimate Liquid Glassmorphism Design**
- **Responsive Design** for all devices
- **Portable** - runs from USB stick

### 🎨 Design
- Advanced liquid glass morphism effects
- Multi-layer glassmorphism with realistic depth
- Animated backgrounds with breathing effects
- Professional weather icons and transitions
- Beautiful color gradients and reflections

### 📋 Requirements
- Python 3.x (for local server)
- Modern web browser
- Internet connection for live weather data

### 🌍 Weather Data Sources
- WeatherAPI.com for live weather data
- Windy.com for interactive weather maps
- OpenStreetMap for geographical data

Enjoy your beautiful weather forecast! 🌤️              # This file
```

## 🎯 Design Philosophy

This application replicates Apple's iOS Weather app with **pixel-perfect accuracy**:

- **Typography**: SF Pro Display font family (100-900 weights)
- **Layout**: Authentic iOS card-based design with proper spacing
- **Icons**: Professional Weather Icons font for realistic weather display
- **Animations**: iOS-style transitions with cubic-bezier easing
- **Colors**: Dynamic theming matching iOS Weather app color schemes
- **Interactions**: Smooth, responsive animations for all weather updates

## 📱 iOS Weather App Features Implemented

✅ **Exact visual replica** of iOS Weather app interface  
✅ **SF Pro Display typography** with proper weights  
✅ **Realistic weather icons** with condition-specific animations  
✅ **Dynamic backgrounds** that change with weather conditions  
✅ **iOS-style cards** with proper blur and transparency effects  
✅ **Authentic spacing and layout** matching iOS design guidelines  
✅ **Smooth animations** for weather updates and transitions  
✅ **Weather details grid** with proper iOS-style formatting  
✅ **7-day forecast** with day/night icons and temperature ranges  

## 🛠️ Customization

### **Change Location**
```javascript
// In src/script.js
const LATITUDE = 43.5081;  // Your latitude
const LONGITUDE = 16.4402; // Your longitude
```

### **Update Interval**
```javascript
// In src/script.js
const UPDATE_INTERVAL = 30 * 60 * 1000; // 30 minutes
```

### **Screen Resolution**
The app automatically adapts to your screen size using responsive clamp() functions. For custom optimization, adjust the CSS variables in `src/style.css`.

## 🔧 Technical Specifications

- **Framework**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with advanced features (backdrop-filter, clamp, CSS Grid)
- **API**: OpenWeatherMap One Call API 3.0
- **Fonts**: SF Pro Display (Google Fonts), Weather Icons
- **Maps**: Leaflet.js with OpenStreetMap tiles
- **Deployment**: Electron for desktop, direct browser for web
- **Compatibility**: Modern browsers (Chrome 88+, Firefox 87+, Safari 14+)

## 🌟 Advanced Features

- **Smart caching** for offline operation
- **Automatic error recovery** with retry mechanisms  
- **Performance optimization** for 24/7 operation
- **Memory leak prevention** with proper cleanup
- **Responsive scaling** for any screen size
- **Professional deployment** options for enterprise use

To use this application with real weather data, obtain an API key from [OpenWeatherMap](https://openweathermap.org/api) and replace `YOUR_API_KEY_HERE` in `src/script.js`.

Open `src/index.html` in a browser on a vertical 2160×3840 display to run the forecast continuously with authentic iOS Weather app styling.

## 📄 License

This project is open source and available under the MIT License. Weather data provided by OpenWeatherMap.

---

**Perfect for**: Digital signage, office displays, smart home dashboards, weather stations, kiosk deployments, and any application requiring a beautiful, professional weather interface with authentic iOS styling.