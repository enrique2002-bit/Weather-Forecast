/**
 * Apple Weather DNA - Working Implementation with Your WeatherAPI Key
 * Handles API errors gracefully and provides beautiful fallback experience
 */

// Configuration with your WeatherAPI key
const CONFIG = {
    WEATHER_API_KEY: 'd0701321dc2c478d980151115253007', // Your WeatherAPI key
    OPENWEATHER_API_KEY: 'YOUR_OPENWEATHER_KEY', // Backup OpenWeather key
    LOCATION: {
        lat: 43.508,
        lon: 16.440,
        name: 'Split',
        country: 'Croatia'
    },
    UPDATE_INTERVAL: 15 * 60 * 1000, // 15 minutes
    CACHE_EXPIRY: 60 * 60 * 1000, // 1 hour
};

// Weather Icons DNA Mapping (WeatherAPI codes)
const WEATHER_ICONS = {
    1000: { day: 'wi-day-sunny', night: 'wi-night-clear', desc: 'Clear' },
    1003: { day: 'wi-day-cloudy', night: 'wi-night-alt-cloudy', desc: 'Partly Cloudy' },
    1006: { day: 'wi-cloudy', night: 'wi-cloudy', desc: 'Cloudy' },
    1009: { day: 'wi-cloudy', night: 'wi-cloudy', desc: 'Overcast' },
    1030: { day: 'wi-fog', night: 'wi-fog', desc: 'Mist' },
    1063: { day: 'wi-day-rain', night: 'wi-night-rain', desc: 'Light Rain' },
    1066: { day: 'wi-day-snow', night: 'wi-night-snow', desc: 'Light Snow' },
    1087: { day: 'wi-day-thunderstorm', night: 'wi-night-thunderstorm', desc: 'Thundery' },
    1135: { day: 'wi-fog', night: 'wi-fog', desc: 'Fog' },
    1180: { day: 'wi-day-showers', night: 'wi-night-showers', desc: 'Patchy Rain' },
    1183: { day: 'wi-showers', night: 'wi-showers', desc: 'Light Rain' },
    1186: { day: 'wi-rain', night: 'wi-rain', desc: 'Moderate Rain' },
    1189: { day: 'wi-rain', night: 'wi-rain', desc: 'Moderate Rain' },
    1192: { day: 'wi-rain', night: 'wi-rain', desc: 'Heavy Rain' },
    1195: { day: 'wi-rain', night: 'wi-rain', desc: 'Heavy Rain' },
    1273: { day: 'wi-day-storm-showers', night: 'wi-night-storm-showers', desc: 'Light Thunder' },
    1276: { day: 'wi-thunderstorm', night: 'wi-thunderstorm', desc: 'Moderate Thunder' }
};

// Apple Weather DNA Theme System
const WEATHER_THEMES = {
    clear: { hue: '0deg', overlay: 0.05, gradient: 'linear-gradient(135deg, #87CEEB 0%, #98D8E8 50%, #B0E2FF 100%)' },
    cloudy: { hue: '-12deg', overlay: 0.18, gradient: 'linear-gradient(135deg, #708090 0%, #778899 50%, #87CEEB 100%)' },
    rainy: { hue: '-30deg', overlay: 0.28, gradient: 'linear-gradient(135deg, #4682B4 0%, #5F9EA0 50%, #6495ED 100%)' },
    stormy: { hue: '-40deg', overlay: 0.35, gradient: 'linear-gradient(135deg, #2F4F4F 0%, #483D8B 50%, #4169E1 100%)' },
    snowy: { hue: '10deg', overlay: 0.22, gradient: 'linear-gradient(135deg, #F0F8FF 0%, #E6E6FA 50%, #D3D3D3 100%)' },
    foggy: { hue: '-8deg', overlay: 0.25, gradient: 'linear-gradient(135deg, #696969 0%, #778899 50%, #A9A9A9 100%)' }
};

// Global State
let weatherData = null;
let particleSystem = null;
let animationFrameId = null;

/**
 * Apple Weather DNA - Main Application Class
 */
class AppleWeatherApp {
    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        console.log('🍎 Initializing Apple Weather DNA...');
        
        // Initialize core systems
        this.initializeTimeDisplay();
        this.initializeLivingBackground();
        this.initializeParticleSystem();
        
        // Load weather data with multiple API fallbacks
        await this.fetchWeatherWithFallback();
        
        // Setup update cycle
        this.startUpdateCycle();
        
        console.log('✅ Apple Weather DNA initialized successfully');
    }

    initializeTimeDisplay() {
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

            const timeEl = document.getElementById('time');
            const dateEl = document.getElementById('date');
            
            if (timeEl) timeEl.textContent = timeString;
            if (dateEl) dateEl.textContent = dateString;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    initializeLivingBackground() {
        const gradientBg = document.getElementById('gradient-bg');
        if (gradientBg) {
            gradientBg.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${WEATHER_THEMES.clear.gradient};
                transition: background 2s ease-in-out;
            `;
        }

        // Setup canvas for particle effects
        const canvas = document.getElementById('particleCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    initializeParticleSystem() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        this.particles = [];
        this.particleConfig = {
            count: 30,
            type: 'sun-rays',
            speed: 0.3,
            size: 2,
            opacity: 0.4
        };

        this.createParticles();
        this.animateParticles();
    }

    createParticles() {
        this.particles = [];
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        for (let i = 0; i < this.particleConfig.count; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * this.particleConfig.speed,
                vy: (Math.random() - 0.5) * this.particleConfig.speed,
                size: Math.random() * this.particleConfig.size + 1,
                opacity: Math.random() * this.particleConfig.opacity,
                life: Math.random() * 100
            });
        }
    }

    animateParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(particle => {
                // Update particle position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life++;

                // Wrap around screen
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;

                // Draw particle
                ctx.save();
                ctx.globalAlpha = particle.opacity;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // Reset particle if too old
                if (particle.life > 1000) {
                    particle.life = 0;
                    particle.x = Math.random() * canvas.width;
                    particle.y = Math.random() * canvas.height;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
    }

    async fetchWeatherWithFallback() {
        try {
            console.log('🌤️ Trying WeatherAPI...');
            const data = await this.fetchFromWeatherAPI();
            if (data) {
                console.log('✅ WeatherAPI successful');
                this.updateDisplay(data);
                return;
            }
        } catch (error) {
            console.warn('WeatherAPI failed:', error.message);
        }

        try {
            console.log('🌤️ Trying OpenWeatherMap...');
            const data = await this.fetchFromOpenWeather();
            if (data) {
                console.log('✅ OpenWeatherMap successful');
                this.updateDisplay(data);
                return;
            }
        } catch (error) {
            console.warn('OpenWeatherMap failed:', error.message);
        }

        console.log('📱 Using offline sample data');
        this.handleOfflineMode();
    }

    async fetchFromWeatherAPI() {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${CONFIG.WEATHER_API_KEY}&q=${CONFIG.LOCATION.lat},${CONFIG.LOCATION.lon}&days=7&aqi=no&alerts=no`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`WeatherAPI Error ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
        }

        const rawData = await response.json();
        return this.normalizeWeatherAPIData(rawData);
    }

    async fetchFromOpenWeather() {
        if (!CONFIG.OPENWEATHER_API_KEY || CONFIG.OPENWEATHER_API_KEY === 'YOUR_OPENWEATHER_KEY') {
            throw new Error('OpenWeatherMap API key not configured');
        }

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${CONFIG.LOCATION.lat}&lon=${CONFIG.LOCATION.lon}&appid=${CONFIG.OPENWEATHER_API_KEY}&units=metric`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`OpenWeatherMap Error ${response.status}`);
        }

        const rawData = await response.json();
        return this.normalizeOpenWeatherData(rawData);
    }

    normalizeWeatherAPIData(rawData) {
        const current = rawData.current;
        const forecast = rawData.forecast.forecastday;
        
        return {
            current: {
                temp: Math.round(current.temp_c),
                condition: current.condition.code,
                feelsLike: Math.round(current.feelslike_c),
                humidity: current.humidity,
                windSpeed: Math.round(current.wind_kph),
                windDir: current.wind_dir,
                pressure: current.pressure_mb,
                visibility: current.vis_km,
                uvIndex: current.uv,
                isDay: current.is_day === 1
            },
            daily: forecast.slice(0, 7).map(day => ({
                date: day.date,
                maxTemp: Math.round(day.day.maxtemp_c),
                minTemp: Math.round(day.day.mintemp_c),
                condition: day.day.condition.code,
                isDay: true
            })),
            timestamp: Date.now(),
            source: 'WeatherAPI'
        };
    }

    normalizeOpenWeatherData(rawData) {
        // Basic normalization for OpenWeatherMap data
        const current = rawData.list[0];
        
        return {
            current: {
                temp: Math.round(current.main.temp),
                condition: 1000, // Default to clear
                feelsLike: Math.round(current.main.feels_like),
                humidity: current.main.humidity,
                windSpeed: Math.round(current.wind.speed * 3.6), // m/s to km/h
                windDir: this.getWindDirection(current.wind.deg),
                pressure: current.main.pressure,
                visibility: 10, // Default
                uvIndex: 5, // Default
                isDay: true
            },
            daily: this.generateSampleForecast(),
            timestamp: Date.now(),
            source: 'OpenWeatherMap'
        };
    }

    getWindDirection(deg) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        return directions[Math.round(deg / 22.5) % 16];
    }

    generateSampleForecast() {
        const days = ['Today', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
        return days.map((day, index) => ({
            date: `2025-08-${String(1 + index).padStart(2, '0')}`,
            maxTemp: 26 - index,
            minTemp: 18 - index,
            condition: [1000, 1003, 1063, 1000, 1006, 1180, 1000][index],
            isDay: true
        }));
    }

    getWeatherIcon(conditionCode, isDay = true) {
        const iconData = WEATHER_ICONS[conditionCode] || WEATHER_ICONS[1000];
        return {
            class: isDay ? iconData.day : iconData.night,
            description: iconData.desc
        };
    }

    updateDisplay(data) {
        this.updateHeroSection(data);
        this.updateMetricsGrid(data);
        this.updateForecastGrid(data);
        this.updateDynamicTheme(data.current.condition);
        this.triggerAppleAnimations();
        
        // Show data source indicator
        this.showDataSource(data.source);
    }

    updateHeroSection(data) {
        const iconElement = document.getElementById('heroWeatherIcon');
        const tempElement = document.getElementById('heroTemp');
        const conditionElement = document.getElementById('heroCondition');
        const rangeElement = document.getElementById('heroRange');

        const iconData = this.getWeatherIcon(data.current.condition, data.current.isDay);
        
        if (iconElement) {
            // Animate icon change
            if (typeof gsap !== 'undefined') {
                gsap.to(iconElement, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        iconElement.className = `wi ${iconData.class}`;
                        gsap.to(iconElement, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            ease: 'back.out(1.7)'
                        });
                    }
                });
            } else {
                iconElement.className = `wi ${iconData.class}`;
            }
        }

        // Update temperature
        if (tempElement) {
            this.animateNumber(tempElement, parseInt(tempElement.textContent) || 0, data.current.temp, '°');
        }
        
        // Update condition
        if (conditionElement) {
            conditionElement.textContent = iconData.description;
        }
        
        // Update range
        if (rangeElement) {
            const todayForecast = data.daily[0];
            rangeElement.innerHTML = `
                <span class="high">H:${todayForecast.maxTemp}°</span>
                <span class="low">L:${todayForecast.minTemp}°</span>
            `;
        }
    }

    updateMetricsGrid(data) {
        const metrics = {
            feelsLikeValue: `${data.current.feelsLike}°`,
            humidityValue: `${data.current.humidity}%`,
            windValue: `${data.current.windSpeed} km/h`,
            windDirection: data.current.windDir,
            uvValue: data.current.uvIndex.toString(),
            uvDescription: this.getUVDescription(data.current.uvIndex),
            visibilityValue: `${data.current.visibility} km`,
            pressureValue: `${data.current.pressure} hPa`,
            pressureDescription: this.getPressureDescription(data.current.pressure)
        };

        Object.keys(metrics).forEach((key, index) => {
            const element = document.getElementById(key);
            if (element) {
                // Add smooth update animation
                setTimeout(() => {
                    element.style.opacity = '0.6';
                    setTimeout(() => {
                        element.textContent = metrics[key];
                        element.style.transition = 'opacity 0.3s ease';
                        element.style.opacity = '1';
                    }, 100);
                }, index * 50);
            }
        });
    }

    updateForecastGrid(data) {
        const container = document.getElementById('forecastDays');
        if (!container) return;

        container.innerHTML = '';

        data.daily.slice(1, 8).forEach((day, index) => {
            const dayElement = document.createElement('div');
            dayElement.className = 'forecast-day';
            
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const iconData = this.getWeatherIcon(day.condition, day.isDay);
            
            dayElement.innerHTML = `
                <div class="day-name">${dayName}</div>
                <i class="wi ${iconData.class}"></i>
                <div class="day-temps">
                    <div class="high">${day.maxTemp}°</div>
                    <div class="low">${day.minTemp}°</div>
                </div>
            `;

            container.appendChild(dayElement);

            // Animate in
            setTimeout(() => {
                dayElement.style.opacity = '0';
                dayElement.style.transform = 'translateY(20px)';
                dayElement.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                
                setTimeout(() => {
                    dayElement.style.opacity = '1';
                    dayElement.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    updateDynamicTheme(conditionCode) {
        let themeKey = 'clear';
        
        if ([1003, 1006, 1009].includes(conditionCode)) themeKey = 'cloudy';
        else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(conditionCode)) themeKey = 'rainy';
        else if ([1087, 1273, 1276].includes(conditionCode)) themeKey = 'stormy';
        else if ([1066].includes(conditionCode)) themeKey = 'snowy';
        else if ([1030, 1135].includes(conditionCode)) themeKey = 'foggy';

        const theme = WEATHER_THEMES[themeKey];
        
        // Update CSS variables
        document.documentElement.style.setProperty('--hue', theme.hue);
        document.documentElement.style.setProperty('--overlay-alpha', theme.overlay);
        
        // Update background gradient
        const gradientBg = document.getElementById('gradient-bg');
        if (gradientBg) {
            gradientBg.style.background = theme.gradient;
        }
        
        // Update body class for theme
        document.body.className = `theme-${themeKey}`;
        
        console.log(`🎨 Theme updated to: ${themeKey}`);
    }

    triggerAppleAnimations() {
        // Simple CSS animations fallback if GSAP not available
        const metricTiles = document.querySelectorAll('.metric-tile');
        metricTiles.forEach((tile, index) => {
            tile.style.opacity = '0';
            tile.style.transform = 'translateY(30px)';
            tile.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            setTimeout(() => {
                tile.style.opacity = '1';
                tile.style.transform = 'translateY(0)';
            }, index * 100 + 300);
        });

        // Animate hero temperature
        const tempHero = document.querySelector('.temp-hero');
        if (tempHero) {
            tempHero.style.transform = 'scale(0.9)';
            tempHero.style.opacity = '0.8';
            tempHero.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            setTimeout(() => {
                tempHero.style.transform = 'scale(1)';
                tempHero.style.opacity = '1';
            }, 500);
        }
    }

    animateNumber(element, start, end, suffix = '') {
        if (typeof gsap !== 'undefined') {
            gsap.to({ value: start }, {
                value: end,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: function() {
                    element.textContent = Math.round(this.targets()[0].value) + suffix;
                }
            });
        } else {
            // Fallback without GSAP
            element.textContent = end + suffix;
        }
    }

    getUVDescription(uvIndex) {
        if (uvIndex <= 2) return 'Low';
        if (uvIndex <= 5) return 'Moderate';
        if (uvIndex <= 7) return 'High';
        if (uvIndex <= 10) return 'Very High';
        return 'Extreme';
    }

    getPressureDescription(pressure) {
        if (pressure < 1000) return 'Low';
        if (pressure > 1020) return 'High';
        return 'Steady';
    }

    showDataSource(source) {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: rgba(0, 255, 0, 0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 16px;
            font-size: 12px;
            z-index: 1000;
            font-family: 'Inter', sans-serif;
        `;
        indicator.textContent = `📡 ${source || 'Live Data'}`;
        document.body.appendChild(indicator);
        
        setTimeout(() => indicator.remove(), 3000);
    }

    handleOfflineMode() {
        console.log('📱 Entering offline mode with sample data');
        
        const offlineData = {
            current: {
                temp: 24,
                condition: 1000,
                feelsLike: 26,
                humidity: 68,
                windSpeed: 15,
                windDir: 'NW',
                pressure: 1015,
                visibility: 10,
                uvIndex: 7,
                isDay: true
            },
            daily: this.generateSampleForecast(),
            timestamp: Date.now(),
            source: 'Sample Data'
        };

        this.updateDisplay(offlineData);
        
        // Show offline indicator
        const offlineIndicator = document.createElement('div');
        offlineIndicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 165, 0, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 1000;
            font-family: 'Inter', sans-serif;
        `;
        offlineIndicator.textContent = '📶 Offline Mode - Sample Data';
        document.body.appendChild(offlineIndicator);
        
        setTimeout(() => offlineIndicator.remove(), 5000);
    }

    startUpdateCycle() {
        // Initial delay, then regular updates
        setTimeout(() => this.fetchWeatherWithFallback(), 5000);
        
        setInterval(() => {
            console.log('🔄 Scheduled weather update...');
            this.fetchWeatherWithFallback();
        }, CONFIG.UPDATE_INTERVAL);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AppleWeatherApp();
});

// Handle window resize for particles
window.addEventListener('resize', () => {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
