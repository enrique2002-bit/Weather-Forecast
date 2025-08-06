/**
 * Glassmorphism Weather Dashboard with Live Radar
 * Split, Croatia Weather App
 */

class WeatherRadarApp {
    constructor() {
        this.apiKey = 'ae9c7b511597467cb5e100338250108'; // Working API key
        this.city = 'Split';
        this.country = 'Croatia';
        this.lat = 43.5081;
        this.lon = 16.4402;
        
        this.weatherData = null;
        this.radarMap = null;
        this.isRadarPlaying = false;
        
        this.init();
    }

    async init() {
        console.log('🌊 Initializing Glassmorphism Weather Radar App...');
        
        // Initialize components
        this.initializeTime();
        this.initializeRadarMap();
        this.initializeRadarControls();
        
        // Fetch weather data
        await this.fetchWeatherData();
        
        // Start update cycles
        this.startUpdateCycle();
        
        console.log('✅ Weather Radar App initialized successfully');
    }

    initializeTime() {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Europe/Zagreb'
            });
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                timeZone: 'Europe/Zagreb'
            });

            document.getElementById('current-time').textContent = timeString;
            document.getElementById('current-date').textContent = dateString;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    async fetchWeatherData() {
        try {
            this.updateDataSource('Loading...', false);
            
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.lat},${this.lon}&days=7&aqi=yes`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.weatherData = data;
            this.updateUI(data);
            this.updateDataSource('Live WeatherAPI', true);
            
            console.log('✅ Weather data fetched successfully');
            
        } catch (error) {
            console.error('❌ Error fetching weather data:', error);
            this.useFallbackData();
        }
    }

    useFallbackData() {
        console.log('🔄 Using fallback weather data for Split, Croatia');
        
        const fallbackData = {
            current: {
                temp_c: 24,
                condition: { text: 'Clear Sky', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
                feelslike_c: 26,
                humidity: 68,
                wind_kph: 15,
                wind_dir: 'NW',
                pressure_mb: 1015,
                vis_km: 10,
                uv: 7
            },
            forecast: {
                forecastday: [
                    {
                        date: '2025-08-01',
                        day: { maxtemp_c: 26, mintemp_c: 18, condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' } }
                    },
                    {
                        date: '2025-08-02',
                        day: { maxtemp_c: 25, mintemp_c: 17, condition: { text: 'Partly Cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' } }
                    },
                    {
                        date: '2025-08-03',
                        day: { maxtemp_c: 23, mintemp_c: 16, condition: { text: 'Light Rain', icon: '//cdn.weatherapi.com/weather/64x64/day/296.png' } }
                    },
                    {
                        date: '2025-08-04',
                        day: { maxtemp_c: 27, mintemp_c: 19, condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' } }
                    },
                    {
                        date: '2025-08-05',
                        day: { maxtemp_c: 24, mintemp_c: 18, condition: { text: 'Cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' } }
                    },
                    {
                        date: '2025-08-06',
                        day: { maxtemp_c: 22, mintemp_c: 15, condition: { text: 'Light Rain', icon: '//cdn.weatherapi.com/weather/64x64/day/296.png' } }
                    },
                    {
                        date: '2025-08-07',
                        day: { maxtemp_c: 26, mintemp_c: 17, condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' } }
                    }
                ]
            }
        };

        this.weatherData = fallbackData;
        this.updateUI(fallbackData);
        this.updateDataSource('Sample Data', false);
    }

    updateUI(data) {
        // Update main weather display
        const mainTemp = document.getElementById('main-temperature');
        const weatherDesc = document.getElementById('weather-description');
        const highTemp = document.getElementById('high-temp');
        const lowTemp = document.getElementById('low-temp');
        const weatherIcon = document.getElementById('main-weather-icon');

        if (mainTemp) mainTemp.textContent = Math.round(data.current.temp_c);
        if (weatherDesc) weatherDesc.textContent = data.current.condition.text;
        if (highTemp) highTemp.textContent = `H: ${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°`;
        if (lowTemp) lowTemp.textContent = `L: ${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°`;
        
        // Update weather icon
        if (weatherIcon) {
            weatherIcon.className = this.getWeatherIconClass(data.current.condition.text);
        }

        // Update weather details
        document.getElementById('feels-like').textContent = `${Math.round(data.current.feelslike_c)}°C`;
        document.getElementById('humidity').textContent = `${data.current.humidity}%`;
        document.getElementById('wind-speed').textContent = `${Math.round(data.current.wind_kph)} km/h`;
        document.getElementById('wind-direction').textContent = data.current.wind_dir;
        document.getElementById('pressure').textContent = `${Math.round(data.current.pressure_mb)} hPa`;
        document.getElementById('visibility').textContent = `${data.current.vis_km} km`;
        document.getElementById('uv-index').textContent = data.current.uv;
        document.getElementById('uv-description').textContent = this.getUVDescription(data.current.uv);

        // Update forecast
        this.updateForecast(data.forecast.forecastday);

        // Update radar timestamp
        this.updateRadarTimestamp();
    }

    getWeatherIconClass(condition) {
        const iconMap = {
            'clear': 'wi wi-day-sunny',
            'sunny': 'wi wi-day-sunny',
            'partly cloudy': 'wi wi-day-cloudy',
            'cloudy': 'wi wi-cloudy',
            'overcast': 'wi wi-cloudy',
            'mist': 'wi wi-fog',
            'fog': 'wi wi-fog',
            'light rain': 'wi wi-day-rain',
            'moderate rain': 'wi wi-rain',
            'heavy rain': 'wi wi-rain',
            'thunderstorm': 'wi wi-thunderstorm',
            'snow': 'wi wi-snow',
            'blizzard': 'wi wi-snow-wind'
        };

        const key = condition.toLowerCase();
        return iconMap[key] || 'wi wi-day-sunny';
    }

    getUVDescription(uv) {
        if (uv <= 2) return 'Low';
        if (uv <= 5) return 'Moderate';
        if (uv <= 7) return 'High';
        if (uv <= 10) return 'Very High';
        return 'Extreme';
    }

    updateForecast(forecastData) {
        const forecastGrid = document.getElementById('forecast-grid');
        if (!forecastGrid) return;

        forecastGrid.innerHTML = '';

        forecastData.slice(1, 7).forEach((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item glass-morphism';
            
            forecastItem.innerHTML = `
                <div class="forecast-day">${dayName}</div>
                <i class="${this.getWeatherIconClass(day.day.condition.text)} forecast-icon"></i>
                <div class="forecast-temps">
                    <span class="forecast-high">${Math.round(day.day.maxtemp_c)}°</span>
                    <span class="forecast-low">${Math.round(day.day.mintemp_c)}°</span>
                </div>
            `;

            forecastGrid.appendChild(forecastItem);

            // Add animation delay
            setTimeout(() => {
                forecastItem.style.opacity = '0';
                forecastItem.style.transform = 'translateY(20px)';
                forecastItem.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    forecastItem.style.opacity = '1';
                    forecastItem.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    initializeRadarMap() {
        const mapContainer = document.getElementById('weather-radar-map');
        if (!mapContainer) return;

        // Initialize Leaflet map centered on Split
        this.radarMap = L.map('weather-radar-map', {
            center: [this.lat, this.lon],
            zoom: 10,
            zoomControl: false,
            attributionControl: false
        });

        // Add base map layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            opacity: 0.6
        }).addTo(this.radarMap);

        // Add Split marker
        const splitMarker = L.marker([this.lat, this.lon]).addTo(this.radarMap);
        splitMarker.bindPopup('<b>Split, Croatia</b><br>Current Location').openPopup();

        // Add weather radar overlay (OpenWeatherMap radar)
        this.addWeatherRadarLayer();

        // Start radar animation
        this.startRadarAnimation();

        console.log('🗺️ Radar map initialized');
    }

    addWeatherRadarLayer() {
        // Add precipitation layer from OpenWeatherMap
        const precipitationLayer = L.tileLayer(
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${this.apiKey}`,
            {
                opacity: 0.7,
                attribution: 'Weather data by OpenWeatherMap'
            }
        );

        precipitationLayer.addTo(this.radarMap);

        console.log('🌧️ Weather radar layer added');
    }

    startRadarAnimation() {
        // Simulate animated radar sweeps
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1000';
        
        const mapContainer = document.getElementById('weather-radar-map');
        mapContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let angle = 0;
        
        const animate = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw radar sweep
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(canvas.width, canvas.height) / 2;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + 0.5);
            ctx.closePath();
            
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            angle += 0.05;
            if (angle > Math.PI * 2) angle = 0;
            
            if (this.isRadarPlaying) {
                requestAnimationFrame(animate);
            }
        };
        
        this.isRadarPlaying = true;
        animate();
    }

    initializeRadarControls() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const currentTimeBtn = document.getElementById('current-time-btn');

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.isRadarPlaying = !this.isRadarPlaying;
                const icon = playPauseBtn.querySelector('i');
                const text = playPauseBtn.querySelector('span');
                
                if (this.isRadarPlaying) {
                    icon.className = 'wi wi-pause';
                    text.textContent = 'Pause';
                    this.startRadarAnimation();
                } else {
                    icon.className = 'wi wi-play';
                    text.textContent = 'Play';
                }
            });
        }

        if (currentTimeBtn) {
            currentTimeBtn.addEventListener('click', () => {
                this.updateRadarTimestamp();
                currentTimeBtn.classList.add('active');
                setTimeout(() => currentTimeBtn.classList.remove('active'), 300);
            });
        }
    }

    updateRadarTimestamp() {
        const radarTime = document.getElementById('radar-time');
        if (radarTime) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
            radarTime.textContent = `Live: ${timeStr}`;
        }
    }

    updateDataSource(source, isLive) {
        const dataSourceEl = document.getElementById('data-source');
        if (dataSourceEl) {
            const icon = dataSourceEl.querySelector('i');
            const text = dataSourceEl.querySelector('span');
            
            if (isLive) {
                dataSourceEl.classList.add('live');
                icon.className = 'wi wi-cloud-refresh';
                text.textContent = `Live: ${source}`;
            } else {
                dataSourceEl.classList.remove('live');
                icon.className = 'wi wi-cloud-down';
                text.textContent = source;
            }
        }
    }

    startUpdateCycle() {
        // Update weather data every 15 minutes
        setInterval(() => {
            console.log('🔄 Scheduled weather update...');
            this.fetchWeatherData();
        }, 15 * 60 * 1000);

        // Update radar timestamp every minute
        setInterval(() => {
            this.updateRadarTimestamp();
        }, 60 * 1000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherRadarApp();
});

// Handle window resize for map
window.addEventListener('resize', () => {
    // Resize map if it exists
    if (window.radarMap) {
        setTimeout(() => {
            window.radarMap.invalidateSize();
        }, 100);
    }
});
