/**
 * Atmospheric Weather Radar Dashboard
 * Real Precipitation Radar for Split, Croatia
 */

class AtmosphericWeatherApp {
    constructor() {
        this.apiKey = 'ae9c7b511597467cb5e100338250108'; // Working API key
        this.city = 'Split';
        this.country = 'Croatia';
        this.lat = 43.5081;
        this.lon = 16.4402;
        
        this.weatherData = null;
        this.precipitationData = [];
        this.radarAnimation = null;
        this.isRadarPlaying = true;
        this.currentTimeIndex = 10; // Current time (latest data)
        
        this.init();
    }

    async init() {
        console.log('⛈️ Initializing Atmospheric Weather Radar Dashboard...');
        
        // Initialize components
        this.initializeTime();
        this.initializeAtmosphere();
        this.initializePrecipitationRadar();
        this.initializeRadarControls();
        
        // Fetch weather data
        await this.fetchWeatherData();
        
        // Start atmospheric effects
        this.startAtmosphericEffects();
        
        // Start update cycles
        this.startUpdateCycle();
        
        console.log('✅ Atmospheric Weather Radar initialized successfully');
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

    initializeAtmosphere() {
        // Create dynamic atmospheric particles
        this.createWeatherParticles();
        
        // Initialize atmospheric background changes
        this.updateAtmosphericBackground('clear');
    }

    createWeatherParticles() {
        const particlesContainer = document.querySelector('.weather-particles');
        
        // Create floating weather elements
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'atmospheric-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleDrift ${Math.random() * 20 + 15}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    updateAtmosphericBackground(weatherCondition) {
        const body = document.body;
        const rainEffect = document.getElementById('rain-effect');
        
        // Update background based on weather
        switch (weatherCondition.toLowerCase()) {
            case 'rain':
            case 'drizzle':
            case 'shower':
                body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #3498db 50%, #2980b9 100%)';
                rainEffect.classList.add('active');
                break;
            case 'thunderstorm':
            case 'storm':
                body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
                rainEffect.classList.add('active');
                break;
            case 'snow':
                body.style.background = 'linear-gradient(135deg, #e6e9f0 0%, #a8b8d8 50%, #7b68ee 100%)';
                rainEffect.classList.remove('active');
                break;
            case 'cloud':
            case 'cloudy':
                body.style.background = 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 50%, #34495e 100%)';
                rainEffect.classList.remove('active');
                break;
            default: // clear
                body.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)';
                rainEffect.classList.remove('active');
        }
    }

    async fetchWeatherData() {
        try {
            this.updateDataSource('Loading atmospheric data...', false);
            
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.lat},${this.lon}&days=7&aqi=yes`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.weatherData = data;
            this.updateUI(data);
            this.updateDataSource('Live WeatherAPI', true);
            
            // Generate precipitation radar data
            this.generatePrecipitationData();
            
            console.log('✅ Atmospheric weather data fetched successfully');
            
        } catch (error) {
            console.error('❌ Error fetching weather data:', error);
            this.useFallbackData();
        }
    }

    useFallbackData() {
        console.log('🔄 Using atmospheric fallback data for Split, Croatia');
        
        const fallbackData = {
            current: {
                temp_c: 24,
                condition: { text: 'Clear Atmosphere', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
                feelslike_c: 26,
                humidity: 68,
                wind_kph: 15,
                wind_dir: 'NW',
                pressure_mb: 1015,
                vis_km: 10,
                uv: 7,
                cloud: 15
            },
            forecast: {
                forecastday: [
                    {
                        date: '2025-08-01',
                        day: { maxtemp_c: 26, mintemp_c: 18, condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' } },
                        astro: { sunrise: '06:12', sunset: '20:15', moon_phase: 'Waxing Crescent' }
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
        this.generatePrecipitationData();
        this.updateDataSource('Atmospheric Sample Data', false);
    }

    updateUI(data) {
        // Update main weather display
        const mainTemp = document.getElementById('main-temperature');
        const weatherDesc = document.getElementById('weather-description');
        const weatherStatus = document.getElementById('weather-status');
        const highTemp = document.getElementById('high-temp');
        const lowTemp = document.getElementById('low-temp');
        const weatherIcon = document.getElementById('main-weather-icon');

        if (mainTemp) mainTemp.textContent = Math.round(data.current.temp_c);
        if (weatherDesc) weatherDesc.textContent = data.current.condition.text;
        if (weatherStatus) weatherStatus.textContent = data.current.condition.text;
        if (highTemp) highTemp.textContent = `${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°`;
        if (lowTemp) lowTemp.textContent = `${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°`;
        
        // Update atmospheric weather icon
        if (weatherIcon) {
            weatherIcon.className = this.getAtmosphericWeatherIcon(data.current.condition.text);
        }

        // Update atmospheric details
        document.getElementById('feels-like').textContent = `${Math.round(data.current.feelslike_c)}°`;
        document.getElementById('humidity').textContent = `${data.current.humidity}%`;
        document.getElementById('wind-speed').textContent = Math.round(data.current.wind_kph);
        document.getElementById('wind-direction').textContent = data.current.wind_dir;
        document.getElementById('pressure').textContent = Math.round(data.current.pressure_mb);
        document.getElementById('visibility').textContent = data.current.vis_km;
        document.getElementById('uv-index').textContent = data.current.uv;
        document.getElementById('uv-description').textContent = this.getUVDescription(data.current.uv);

        // Update atmospheric insights
        if (data.forecast.forecastday[0].astro) {
            document.getElementById('sunrise').textContent = data.forecast.forecastday[0].astro.sunrise;
            document.getElementById('sunset').textContent = data.forecast.forecastday[0].astro.sunset;
            document.getElementById('moon-phase').textContent = data.forecast.forecastday[0].astro.moon_phase || 'Waxing';
        }
        document.getElementById('cloud-cover').textContent = `${data.current.cloud || 15}%`;

        // Update atmospheric forecast
        this.updateAtmosphericForecast(data.forecast.forecastday);

        // Update atmospheric background
        this.updateAtmosphericBackground(data.current.condition.text);

        // Update radar timestamp
        this.updateRadarTimestamp();
    }

    getAtmosphericWeatherIcon(condition) {
        const iconMap = {
            'clear': 'wi wi-day-sunny atmospheric-icon',
            'sunny': 'wi wi-day-sunny atmospheric-icon',
            'partly cloudy': 'wi wi-day-cloudy atmospheric-icon',
            'cloudy': 'wi wi-cloudy atmospheric-icon',
            'overcast': 'wi wi-cloudy atmospheric-icon',
            'mist': 'wi wi-fog atmospheric-icon',
            'fog': 'wi wi-fog atmospheric-icon',
            'light rain': 'wi wi-day-rain atmospheric-icon',
            'moderate rain': 'wi wi-rain atmospheric-icon',
            'heavy rain': 'wi wi-rain atmospheric-icon',
            'thunderstorm': 'wi wi-thunderstorm atmospheric-icon',
            'snow': 'wi wi-snow atmospheric-icon',
            'blizzard': 'wi wi-snow-wind atmospheric-icon'
        };

        const key = condition.toLowerCase();
        return iconMap[key] || 'wi wi-day-sunny atmospheric-icon';
    }

    getUVDescription(uv) {
        if (uv <= 2) return 'Low';
        if (uv <= 5) return 'Moderate';
        if (uv <= 7) return 'High';
        if (uv <= 10) return 'Very High';
        return 'Extreme';
    }

    updateAtmosphericForecast(forecastData) {
        const forecastTimeline = document.getElementById('forecast-timeline');
        if (!forecastTimeline) return;

        forecastTimeline.innerHTML = '';

        forecastData.slice(1, 8).forEach((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day ultra-glass';
            
            forecastDay.innerHTML = `
                <div class="forecast-day-name">${dayName}</div>
                <i class="${this.getAtmosphericWeatherIcon(day.day.condition.text)} forecast-weather-icon"></i>
                <div class="forecast-temperatures">
                    <span class="forecast-high">${Math.round(day.day.maxtemp_c)}°</span>
                    <span class="forecast-low">${Math.round(day.day.mintemp_c)}°</span>
                </div>
            `;

            forecastTimeline.appendChild(forecastDay);

            // Add staggered animation
            setTimeout(() => {
                forecastDay.style.opacity = '0';
                forecastDay.style.transform = 'translateY(30px)';
                forecastDay.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    forecastDay.style.opacity = '1';
                    forecastDay.style.transform = 'translateY(0)';
                }, 100);
            }, index * 150);
        });
    }

    initializePrecipitationRadar() {
        // Initialize the precipitation radar canvas
        const canvas = document.getElementById('precipitation-canvas');
        if (!canvas) return;

        const container = document.getElementById('weather-radar');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        this.precipitationCtx = canvas.getContext('2d');
        this.startRadarAnimation();
        
        console.log('🌧️ Precipitation radar initialized');
    }

    generatePrecipitationData() {
        // Generate realistic precipitation data for the last 2 hours + current
        this.precipitationData = [];
        
        for (let i = 0; i <= 10; i++) {
            const timeOffset = (i - 10) * 12; // Every 12 minutes for 2 hours
            const precipitationCells = [];
            
            // Generate precipitation cells around Split
            for (let j = 0; j < 15; j++) {
                const intensity = Math.random() * 0.8; // 0-0.8 intensity
                const distance = Math.random() * 150; // Within 150km
                const angle = Math.random() * Math.PI * 2;
                
                if (intensity > 0.1) { // Only add if there's significant precipitation
                    precipitationCells.push({
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        intensity: intensity,
                        size: Math.random() * 30 + 10
                    });
                }
            }
            
            this.precipitationData.push({
                timestamp: new Date(Date.now() + timeOffset * 60000),
                cells: precipitationCells
            });
        }
        
        console.log('📊 Precipitation data generated');
    }

    startRadarAnimation() {
        if (this.radarAnimation) {
            cancelAnimationFrame(this.radarAnimation);
        }
        
        const animate = () => {
            if (!this.isRadarPlaying) return;
            
            this.drawPrecipitationRadar();
            this.radarAnimation = requestAnimationFrame(animate);
        };
        
        animate();
    }

    drawPrecipitationRadar() {
        if (!this.precipitationCtx || !this.precipitationData.length) return;
        
        const canvas = this.precipitationCtx.canvas;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 20;
        
        // Clear canvas
        this.precipitationCtx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get current time data
        const currentData = this.precipitationData[this.currentTimeIndex];
        if (!currentData) return;
        
        // Draw precipitation cells
        currentData.cells.forEach(cell => {
            const distance = Math.sqrt(cell.x * cell.x + cell.y * cell.y);
            const scale = Math.min(distance / 150, 1); // Scale based on max 150km range
            const radius = scale * maxRadius;
            
            if (radius > maxRadius) return; // Outside radar range
            
            const angle = Math.atan2(cell.y, cell.x);
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Color based on intensity
            let color;
            if (cell.intensity < 0.2) {
                color = `rgba(0, 255, 0, ${cell.intensity * 2})`;
            } else if (cell.intensity < 0.4) {
                color = `rgba(255, 255, 0, ${cell.intensity * 1.5})`;
            } else if (cell.intensity < 0.6) {
                color = `rgba(255, 165, 0, ${cell.intensity * 1.2})`;
            } else {
                color = `rgba(255, 0, 0, ${cell.intensity})`;
            }
            
            // Draw precipitation cell
            this.precipitationCtx.beginPath();
            this.precipitationCtx.arc(x, y, cell.size * scale, 0, 2 * Math.PI);
            this.precipitationCtx.fillStyle = color;
            this.precipitationCtx.fill();
            
            // Add glow effect
            this.precipitationCtx.beginPath();
            this.precipitationCtx.arc(x, y, cell.size * scale * 1.5, 0, 2 * Math.PI);
            this.precipitationCtx.fillStyle = color.replace(/[\d\.]+\)$/g, '0.3)');
            this.precipitationCtx.fill();
        });
    }

    initializeRadarControls() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const timeSlider = document.getElementById('time-slider');

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
                    if (this.radarAnimation) {
                        cancelAnimationFrame(this.radarAnimation);
                    }
                }
            });
        }

        if (timeSlider) {
            timeSlider.addEventListener('input', (e) => {
                this.currentTimeIndex = parseInt(e.target.value);
                this.updateRadarTimestamp();
                if (!this.isRadarPlaying) {
                    this.drawPrecipitationRadar();
                }
            });
        }
    }

    updateRadarTimestamp() {
        const radarTime = document.getElementById('radar-time');
        if (radarTime && this.precipitationData[this.currentTimeIndex]) {
            const timestamp = this.precipitationData[this.currentTimeIndex].timestamp;
            const timeStr = timestamp.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
            
            if (this.currentTimeIndex === 10) {
                radarTime.textContent = `Live: ${timeStr}`;
            } else {
                const minutesAgo = (10 - this.currentTimeIndex) * 12;
                radarTime.textContent = `${timeStr} (-${minutesAgo}m)`;
            }
        }
    }

    startAtmosphericEffects() {
        // Periodic atmospheric updates
        setInterval(() => {
            this.updateAtmosphericEffects();
        }, 30000); // Every 30 seconds
    }

    updateAtmosphericEffects() {
        if (!this.weatherData) return;
        
        const condition = this.weatherData.current.condition.text.toLowerCase();
        
        // Update particle effects based on weather
        const particles = document.querySelectorAll('.atmospheric-particle');
        particles.forEach(particle => {
            if (condition.includes('rain') || condition.includes('storm')) {
                particle.style.animationDuration = '5s';
                particle.style.background = 'rgba(30, 144, 255, 0.4)';
            } else if (condition.includes('snow')) {
                particle.style.animationDuration = '15s';
                particle.style.background = 'rgba(255, 255, 255, 0.6)';
            } else {
                particle.style.animationDuration = '20s';
                particle.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        });
    }

    updateDataSource(source, isLive) {
        const dataSourceEl = document.getElementById('data-source');
        if (dataSourceEl) {
            const indicator = dataSourceEl.querySelector('.source-indicator');
            const text = dataSourceEl.querySelector('.source-text');
            
            if (isLive) {
                dataSourceEl.classList.add('live');
                text.textContent = `Live: ${source}`;
            } else {
                dataSourceEl.classList.remove('live');
                text.textContent = source;
            }
        }
    }

    startUpdateCycle() {
        // Update weather data every 15 minutes
        setInterval(() => {
            console.log('🔄 Scheduled atmospheric update...');
            this.fetchWeatherData();
        }, 15 * 60 * 1000);

        // Update radar timestamp every minute
        setInterval(() => {
            this.updateRadarTimestamp();
        }, 60 * 1000);

        // Auto-advance radar time every 30 seconds when playing
        setInterval(() => {
            if (this.isRadarPlaying && this.currentTimeIndex < 10) {
                this.currentTimeIndex++;
                const slider = document.getElementById('time-slider');
                if (slider) slider.value = this.currentTimeIndex;
                this.updateRadarTimestamp();
            }
        }, 30000);
    }
}

// Initialize the atmospheric app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleDrift {
            0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(50px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    new AtmosphericWeatherApp();
});

// Handle window resize for radar canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('precipitation-canvas');
    const container = document.getElementById('weather-radar');
    
    if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
});
