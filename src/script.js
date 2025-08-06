const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const LATITUDE = 43.5081;
const LONGITUDE = 16.4402;
const UPDATE_INTERVAL = 30 * 60 * 1000; // 30 minutes

// iOS-style weather icons mapping (using Weather Icons font)
const weatherIcons = {
    // Clear sky
    '01d': 'wi-day-sunny',
    '01n': 'wi-night-clear',
    
    // Few clouds
    '02d': 'wi-day-cloudy',
    '02n': 'wi-night-alt-cloudy',
    
    // Scattered clouds
    '03d': 'wi-cloud',
    '03n': 'wi-cloud',
    
    // Broken clouds
    '04d': 'wi-cloudy',
    '04n': 'wi-cloudy',
    
    // Shower rain
    '09d': 'wi-showers',
    '09n': 'wi-showers',
    
    // Rain
    '10d': 'wi-day-rain',
    '10n': 'wi-night-rain',
    
    // Thunderstorm
    '11d': 'wi-thunderstorm',
    '11n': 'wi-thunderstorm',
    
    // Snow
    '13d': 'wi-snow',
    '13n': 'wi-snow',
    
    // Mist
    '50d': 'wi-fog',
    '50n': 'wi-fog'
};

// Weather condition descriptions
const weatherDescriptions = {
    '01d': 'Sunny',
    '01n': 'Clear',
    '02d': 'Partly Cloudy',
    '02n': 'Partly Cloudy',
    '03d': 'Cloudy',
    '03n': 'Cloudy',
    '04d': 'Overcast',
    '04n': 'Overcast',
    '09d': 'Showers',
    '09n': 'Showers',
    '10d': 'Rain',
    '10n': 'Rain',
    '11d': 'Thunderstorms',
    '11n': 'Thunderstorms',
    '13d': 'Snow',
    '13n': 'Snow',
    '50d': 'Foggy',
    '50n': 'Foggy'
};

// Enhanced time update with smooth transitions
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Europe/Zagreb' // Split timezone
    });
    const dateString = now.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Europe/Zagreb'
    });
    
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    // Smooth transition effect
    if (timeElement.textContent !== timeString) {
        timeElement.style.opacity = '0.7';
        setTimeout(() => {
            timeElement.textContent = timeString;
            timeElement.style.opacity = '1';
        }, 100);
    }
    
    if (dateElement.textContent !== dateString) {
        dateElement.textContent = dateString;
        dateElement.classList.add('fade-in');
        setTimeout(() => dateElement.classList.remove('fade-in'), 800);
    }
}

// Enhanced weather fetching with better error handling
async function fetchWeather() {
    const loadingElements = document.querySelectorAll('#current-temp, #current-range, #current-details');
    loadingElements.forEach(el => el.classList.add('loading'));
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Animate updates
        setTimeout(() => {
            updateCurrentWeather(data.current, data.daily[0]);
            updateForecast(data.daily.slice(1, 8));
            updateTheme(data.current.weather[0].main.toLowerCase(), data.current.weather[0].description);
            loadingElements.forEach(el => el.classList.remove('loading'));
        }, 500);
        
    } catch (error) {
        console.error('Failed to fetch weather:', error);
        showOfflineData();
        loadingElements.forEach(el => el.classList.remove('loading'));
    }
}

// Enhanced current weather display with iOS-style animations
function updateCurrentWeather(current, today) {
    // Update main weather icon with animation
    const iconElement = document.querySelector('.weather-icon i');
    if (iconElement) {
        const iconCode = current.weather[0].icon;
        const newIcon = weatherIcons[iconCode] || 'wi-na';
        
        iconElement.style.opacity = '0';
        iconElement.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            iconElement.className = `wi ${newIcon}`;
            iconElement.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            iconElement.style.opacity = '1';
            iconElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Update temperature with smooth animation
    const tempEl = document.querySelector('.temperature');
    if (tempEl) {
        animateValue(tempEl, parseFloat(tempEl.textContent) || 0, Math.round(current.temp), '°');
    }
    
    // Update description
    const descEl = document.querySelector('.description');
    if (descEl) {
        const iconCode = current.weather[0].icon;
        const description = weatherDescriptions[iconCode] || current.weather[0].description;
        descEl.textContent = description;
    }
    
    // Update high/low temperatures
    const rangeEl = document.querySelector('.temp-range');
    if (rangeEl) {
        rangeEl.innerHTML = `H:${Math.round(today.temp.max)}° L:${Math.round(today.temp.min)}°`;
    }
    
    // Update weather details with iOS-style values
    updateWeatherDetails(current, today);
}

// Update weather details with proper iOS formatting
function updateWeatherDetails(current, today) {
    const details = {
        'feels-like': `${Math.round(current.feels_like)}°`,
        'humidity': `${current.humidity}%`,
        'wind': `${Math.round(current.wind_speed * 3.6)} km/h ${getWindDirection(current.wind_deg || 0)}`,
        'pressure': `${current.pressure} hPa`,
        'visibility': `${(current.visibility / 1000).toFixed(1)} km`,
        'clouds': `${current.clouds}%`,
        'uv-index': Math.round(current.uvi).toString(),
        'sunrise': formatTime(current.sunrise),
        'sunset': formatTime(current.sunset)
    };
    
    Object.keys(details).forEach((key, index) => {
        const element = document.querySelector(`[data-detail="${key}"] .detail-value`);
        if (element) {
            // Add staggered animation to each detail
            setTimeout(() => {
                element.style.opacity = '0.6';
                element.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    element.textContent = details[key];
                    element.style.transition = 'all 0.3s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 50);
        }
    });
}

// Get wind direction
function getWindDirection(deg) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(deg / 22.5) % 16];
}

// Format time for iOS style
function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
    });
}

// Animated number counter
function animateValue(element, start, end, suffix = '') {
    const duration = 1000;
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, 16);
}

// Enhanced forecast with iOS-style weather icons and animations
function updateForecast(days) {
    const container = document.querySelector('.forecast-days');
    if (!container) return;
    
    // Clear existing forecast items
    container.innerHTML = '';
    
    // Add new items with iOS-style formatting
    days.forEach((day, index) => {
        const date = new Date(day.dt * 1000);
        const item = document.createElement('div');
        item.className = 'forecast-day';
        
        const iconCode = day.weather[0].icon;
        const weatherIcon = weatherIcons[iconCode] || 'wi-na';
        
        item.innerHTML = `
            <div class="day-name">${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <i class="wi ${weatherIcon}"></i>
            <div class="day-temps">
                <span class="high">${Math.round(day.temp.max)}°</span>
                <span class="low">${Math.round(day.temp.min)}°</span>
            </div>
        `;
        
        // Add staggered animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        container.appendChild(item);
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });
}

// Enhanced theme system with smooth transitions
function updateTheme(condition, description) {
    const body = document.body;
    const currentClasses = ['sunny', 'rainy', 'cloudy'];
    
    // Remove all weather classes
    body.classList.remove(...currentClasses);
    
    // Add appropriate class based on condition
    let newTheme = 'sunny'; // default
    
    if (condition.includes('rain') || condition.includes('storm') || description.includes('rain')) {
        newTheme = 'rainy';
    } else if (condition.includes('cloud') || condition.includes('overcast') || description.includes('cloud')) {
        newTheme = 'cloudy';
    } else if (condition.includes('clear') || condition.includes('sun')) {
        newTheme = 'sunny';
    }
    
    // Smooth theme transition
    body.style.transition = 'background 2s ease-in-out, color 1s ease-in-out';
    body.classList.add(newTheme);
    
    console.log(`Theme updated to: ${newTheme} (${condition} - ${description})`);
}

// Enhanced map initialization with custom styling
function initMap() {
    const map = L.map('map', {
        center: [LATITUDE, LONGITUDE],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false
    });
    
    // Custom tile layer with better styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        className: 'map-tiles'
    }).addTo(map);
    
    // Custom marker
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #fff; border-radius: 50%; width: 20px; height: 20px; border: 3px solid #007bff; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    L.marker([LATITUDE, LONGITUDE], { icon: customIcon }).addTo(map);
    
    // Add subtle map animations
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

// Offline fallback data
// Show offline data with iOS-style formatting
function showOfflineData() {
    console.log('📱 Loading offline mode with iOS styling');
    
    // Update main weather display with sample data
    const iconElement = document.querySelector('.weather-icon i');
    const tempElement = document.querySelector('.temperature');
    const descElement = document.querySelector('.description');
    const rangeElement = document.querySelector('.temp-range');
    
    if (iconElement) {
        iconElement.className = 'wi wi-day-sunny';
        iconElement.style.animation = 'weatherIconFadeIn 0.6s ease-out';
    }
    
    if (tempElement) {
        tempElement.textContent = '22°';
        tempElement.style.animation = 'tempUpdate 0.4s ease-out';
    }
    
    if (descElement) {
        descElement.textContent = 'Partly Cloudy';
    }
    
    if (rangeElement) {
        rangeElement.textContent = 'H:25° L:18°';
    }
    
    // Update weather details with sample data
    const sampleDetails = {
        'feels-like': '24°',
        'humidity': '65%',
        'wind': '12 km/h NW',
        'pressure': '1013 hPa',
        'visibility': '10.0 km',
        'clouds': '40%',
        'uv-index': '6',
        'sunrise': '06:15',
        'sunset': '19:45'
    };
    
    Object.keys(sampleDetails).forEach((key, index) => {
        const element = document.querySelector(`[data-detail="${key}"] .detail-value`);
        if (element) {
            setTimeout(() => {
                element.textContent = sampleDetails[key];
                element.style.animation = 'detailUpdate 0.3s ease-out';
            }, index * 50);
        }
    });
    
    // Show sample 7-day forecast
    const forecastContainer = document.querySelector('.forecast-days');
    if (forecastContainer) {
        const sampleForecast = [
            { day: 'Fri', icon: 'wi-day-cloudy', high: 24, low: 17 },
            { day: 'Sat', icon: 'wi-day-rain', high: 21, low: 15 },
            { day: 'Sun', icon: 'wi-day-sunny', high: 26, low: 19 },
            { day: 'Mon', icon: 'wi-day-cloudy', high: 23, low: 16 },
            { day: 'Tue', icon: 'wi-showers', high: 20, low: 14 },
            { day: 'Wed', icon: 'wi-day-sunny', high: 25, low: 18 },
            { day: 'Thu', icon: 'wi-day-cloudy', high: 22, low: 15 }
        ];
        
        forecastContainer.innerHTML = '';
        
        sampleForecast.forEach((forecast, index) => {
            const item = document.createElement('div');
            item.className = 'forecast-day';
            item.innerHTML = `
                <div class="day-name">${forecast.day}</div>
                <i class="wi ${forecast.icon}"></i>
                <div class="day-temps">
                    <span class="high">${forecast.high}°</span>
                    <span class="low">${forecast.low}°</span>
                </div>
            `;
            
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            forecastContainer.appendChild(item);
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100 + 300);
        });
    }
    
    // Set theme to sunny for offline mode
    updateTheme('clear', 'clear sky');
}

// Initialize application
function initApp() {
    console.log('🌤️ Split Weather Forecast initialized');
    
    // Set initial loading state
    document.getElementById('date').textContent = 'Loading...';
    
    // Start time updates
    updateTime();
    setInterval(updateTime, 1000);
    
    // Initialize map
    setTimeout(initMap, 1000);
    
    // Fetch initial weather data
    setTimeout(fetchWeather, 1500);
    
    // Set up periodic updates
    setInterval(fetchWeather, UPDATE_INTERVAL);
    
    // Add page visibility handling for 24/7 operation
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            fetchWeather(); // Refresh when page becomes visible
        }
    });
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
