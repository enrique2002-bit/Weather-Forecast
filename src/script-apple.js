/**
 * Apple Weather DNA - Complete JavaScript Implementation
 * Includes living backgrounds, particle systems, advanced animations, and 24/7 stability
 */

// Configuration & Constants
const CONFIG = {
    API_KEY: 'YOUR_API_KEY_HERE', // Replace with your WeatherAPI key
    LOCATION: {
        lat: 43.508,
        lon: 16.440,
        name: 'Split',
        country: 'Croatia'
    },
    UPDATE_INTERVAL: 15 * 60 * 1000, // 15 minutes
    CACHE_EXPIRY: 60 * 60 * 1000, // 1 hour
    WEEKLY_REFRESH: 7 * 24 * 60 * 60 * 1000, // Weekly page refresh
    MAPBOX_TOKEN: 'YOUR_MAPBOX_TOKEN' // Replace with your Mapbox token
};

// Apple Weather Icons DNA Mapping
const WEATHER_ICONS = {
    1000: { day: 'wi-day-sunny', night: 'wi-night-clear', desc: 'Clear' },
    1003: { day: 'wi-day-cloudy', night: 'wi-night-alt-cloudy', desc: 'Partly Cloudy' },
    1006: { day: 'wi-cloudy', night: 'wi-cloudy', desc: 'Cloudy' },
    1009: { day: 'wi-cloudy', night: 'wi-cloudy', desc: 'Overcast' },
    1030: { day: 'wi-fog', night: 'wi-fog', desc: 'Mist' },
    1063: { day: 'wi-day-rain', night: 'wi-night-rain', desc: 'Light Rain' },
    1066: { day: 'wi-day-snow', night: 'wi-night-snow', desc: 'Light Snow' },
    1069: { day: 'wi-day-sleet', night: 'wi-night-sleet', desc: 'Light Sleet' },
    1072: { day: 'wi-day-rain-mix', night: 'wi-night-rain-mix', desc: 'Light Drizzle' },
    1087: { day: 'wi-day-thunderstorm', night: 'wi-night-thunderstorm', desc: 'Thundery' },
    1114: { day: 'wi-snow', night: 'wi-snow', desc: 'Blowing Snow' },
    1117: { day: 'wi-snow-wind', night: 'wi-snow-wind', desc: 'Blizzard' },
    1135: { day: 'wi-fog', night: 'wi-fog', desc: 'Fog' },
    1147: { day: 'wi-fog', night: 'wi-fog', desc: 'Freezing Fog' },
    1150: { day: 'wi-sprinkle', night: 'wi-sprinkle', desc: 'Patchy Drizzle' },
    1153: { day: 'wi-sprinkle', night: 'wi-sprinkle', desc: 'Light Drizzle' },
    1168: { day: 'wi-rain-mix', night: 'wi-rain-mix', desc: 'Freezing Drizzle' },
    1171: { day: 'wi-rain-mix', night: 'wi-rain-mix', desc: 'Heavy Freezing Drizzle' },
    1180: { day: 'wi-day-showers', night: 'wi-night-showers', desc: 'Patchy Rain' },
    1183: { day: 'wi-showers', night: 'wi-showers', desc: 'Light Rain' },
    1186: { day: 'wi-rain', night: 'wi-rain', desc: 'Moderate Rain' },
    1189: { day: 'wi-rain', night: 'wi-rain', desc: 'Moderate Rain' },
    1192: { day: 'wi-rain', night: 'wi-rain', desc: 'Heavy Rain' },
    1195: { day: 'wi-rain', night: 'wi-rain', desc: 'Heavy Rain' },
    1198: { day: 'wi-rain-mix', night: 'wi-rain-mix', desc: 'Light Freezing Rain' },
    1201: { day: 'wi-rain-mix', night: 'wi-rain-mix', desc: 'Moderate Freezing Rain' },
    1204: { day: 'wi-sleet', night: 'wi-sleet', desc: 'Light Sleet' },
    1207: { day: 'wi-sleet', night: 'wi-sleet', desc: 'Moderate Sleet' },
    1210: { day: 'wi-day-snow', night: 'wi-night-snow', desc: 'Patchy Snow' },
    1213: { day: 'wi-snow', night: 'wi-snow', desc: 'Light Snow' },
    1216: { day: 'wi-snow', night: 'wi-snow', desc: 'Patchy Snow' },
    1219: { day: 'wi-snow', night: 'wi-snow', desc: 'Moderate Snow' },
    1222: { day: 'wi-snow', night: 'wi-snow', desc: 'Patchy Heavy Snow' },
    1225: { day: 'wi-snow', night: 'wi-snow', desc: 'Heavy Snow' },
    1237: { day: 'wi-hail', night: 'wi-hail', desc: 'Ice Pellets' },
    1240: { day: 'wi-day-showers', night: 'wi-night-showers', desc: 'Light Rain Shower' },
    1243: { day: 'wi-showers', night: 'wi-showers', desc: 'Moderate Rain Shower' },
    1246: { day: 'wi-showers', night: 'wi-showers', desc: 'Torrential Rain Shower' },
    1249: { day: 'wi-sleet', night: 'wi-sleet', desc: 'Light Sleet Shower' },
    1252: { day: 'wi-sleet', night: 'wi-sleet', desc: 'Moderate Sleet Shower' },
    1255: { day: 'wi-day-snow', night: 'wi-night-snow', desc: 'Light Snow Shower' },
    1258: { day: 'wi-snow', night: 'wi-snow', desc: 'Moderate Snow Shower' },
    1261: { day: 'wi-hail', night: 'wi-hail', desc: 'Light Hail Shower' },
    1264: { day: 'wi-hail', night: 'wi-hail', desc: 'Moderate Hail Shower' },
    1273: { day: 'wi-day-storm-showers', night: 'wi-night-storm-showers', desc: 'Light Thunder' },
    1276: { day: 'wi-thunderstorm', night: 'wi-thunderstorm', desc: 'Moderate Thunder' },
    1279: { day: 'wi-day-snow-thunderstorm', night: 'wi-night-snow-thunderstorm', desc: 'Light Snow Thunder' },
    1282: { day: 'wi-snow-thunderstorm', night: 'wi-snow-thunderstorm', desc: 'Heavy Snow Thunder' }
};

// Apple Weather DNA Theme System
const WEATHER_THEMES = {
    clear: { hue: '0deg', overlay: 0.05, particles: 'sun-rays' },
    cloudy: { hue: '-12deg', overlay: 0.18, particles: 'clouds' },
    rainy: { hue: '-30deg', overlay: 0.28, particles: 'rain-drops' },
    stormy: { hue: '-40deg', overlay: 0.35, particles: 'lightning' },
    snowy: { hue: '10deg', overlay: 0.22, particles: 'snow-flakes' },
    foggy: { hue: '-8deg', overlay: 0.25, particles: 'mist' }
};

// Global State
let weatherData = null;
let particleSystem = null;
let appleMap = null;
let animationFrameId = null;

/**
 * Apple Weather DNA - Core Application Class
 */
class AppleWeatherDNA {
    constructor() {
        this.initializeApp();
        this.setupEventListeners();
        this.startUpdateCycle();
        this.setupPerformanceOptimizations();
    }

    async initializeApp() {
        console.log('🍎 Initializing Apple Weather DNA...');
        
        // Initialize core systems
        this.initializeTimeDisplay();
        this.initializeLivingBackground();
        this.initializeParticleSystem();
        await this.initializeMap();
        
        // Load weather data
        await this.fetchWeatherData();
        
        // Setup 24/7 stability features
        this.setupStabilityFeatures();
        
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

            document.getElementById('time').textContent = timeString;
            document.getElementById('date').textContent = dateString;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    initializeLivingBackground() {
        const video = document.getElementById('skyScene');
        const canvas = document.getElementById('particleCanvas');
        
        // Setup video background
        video.addEventListener('loadeddata', () => {
            console.log('🎬 Living background video loaded');
        });

        video.addEventListener('error', (e) => {
            console.warn('Video background failed, using fallback', e);
            this.setupFallbackBackground();
        });

        // Setup canvas for particle effects
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    setupFallbackBackground() {
        const backdrop = document.getElementById('backdrop-container');
        backdrop.style.background = `
            linear-gradient(135deg, 
                hsl(200, 100%, 85%) 0%,
                hsl(220, 100%, 75%) 50%,
                hsl(240, 100%, 65%) 100%
            )
        `;
    }

    initializeParticleSystem() {
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        
        this.particles = [];
        this.particleConfig = {
            count: 50,
            type: 'sun-rays',
            speed: 0.5,
            size: 2,
            opacity: 0.6
        };

        this.createParticles();
        this.animateParticles();
    }

    createParticles() {
        this.particles = [];
        const canvas = document.getElementById('particleCanvas');
        
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

                // Draw particle based on type
                this.drawParticle(ctx, particle);

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

    drawParticle(ctx, particle) {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        switch (this.particleConfig.type) {
            case 'sun-rays':
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'rain-drops':
                ctx.beginPath();
                ctx.ellipse(particle.x, particle.y, particle.size * 0.5, particle.size * 2, Math.PI / 6, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'snow-flakes':
                this.drawSnowflake(ctx, particle.x, particle.y, particle.size);
                break;
                
            case 'clouds':
                ctx.filter = 'blur(3px)';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                ctx.fill();
                break;
        }
        
        ctx.restore();
    }

    drawSnowflake(ctx, x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            ctx.moveTo(x, y);
            ctx.lineTo(
                x + Math.cos(i * Math.PI / 3) * size,
                y + Math.sin(i * Math.PI / 3) * size
            );
        }
        ctx.stroke();
    }

    async initializeMap() {
        if (!CONFIG.MAPBOX_TOKEN || CONFIG.MAPBOX_TOKEN === 'YOUR_MAPBOX_TOKEN') {
            console.warn('Mapbox token not configured, using fallback map');
            this.setupFallbackMap();
            return;
        }

        try {
            mapboxgl.accessToken = CONFIG.MAPBOX_TOKEN;
            
            appleMap = new mapboxgl.Map({
                container: 'appleMap',
                style: 'mapbox://styles/mapbox/satellite-streets-v12',
                center: [CONFIG.LOCATION.lon, CONFIG.LOCATION.lat],
                zoom: 9,
                bearing: 0,
                pitch: 45,
                interactive: false
            });

            appleMap.on('load', () => {
                console.log('🗺️ Apple Map loaded successfully');
                this.addWeatherLayers();
            });

        } catch (error) {
            console.error('Map initialization failed:', error);
            this.setupFallbackMap();
        }
    }

    setupFallbackMap() {
        const mapContainer = document.getElementById('appleMap');
        mapContainer.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                border-radius: 32px;
            ">
                📍 Split, Croatia<br>
                <small style="font-size: 16px; opacity: 0.7;">Map unavailable</small>
            </div>
        `;
    }

    addWeatherLayers() {
        // Add weather radar layer
        appleMap.addSource('radar', {
            type: 'raster',
            tiles: ['https://tilecache.rainviewer.com/v2/radar/1641764400/512/{z}/{x}/{y}/2/1_1.png'],
            tileSize: 512
        });

        appleMap.addLayer({
            id: 'radar',
            type: 'raster',
            source: 'radar',
            paint: {
                'raster-opacity': 0.6
            }
        });
    }

    async fetchWeatherData() {
        try {
            const cachedData = this.getCachedWeatherData();
            if (cachedData && this.isCacheValid(cachedData.timestamp)) {
                console.log('📱 Using cached weather data');
                this.updateDisplay(cachedData.data);
                return;
            }

            console.log('🌤️ Fetching fresh weather data...');
            
            // Using WeatherAPI.com (more reliable than OpenWeatherMap)
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${CONFIG.API_KEY}&q=${CONFIG.LOCATION.lat},${CONFIG.LOCATION.lon}&days=7&aqi=yes&alerts=yes`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const rawData = await response.json();
            weatherData = this.normalizeWeatherData(rawData);
            
            // Cache the data
            this.cacheWeatherData(weatherData);
            
            // Update display
            this.updateDisplay(weatherData);
            
            console.log('✅ Weather data updated successfully');

        } catch (error) {
            console.error('Weather fetch failed:', error);
            this.handleOfflineMode();
        }
    }

    normalizeWeatherData(rawData) {
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
                isDay: current.is_day
            },
            daily: forecast.map(day => ({
                date: day.date,
                maxTemp: Math.round(day.day.maxtemp_c),
                minTemp: Math.round(day.day.mintemp_c),
                condition: day.day.condition.code,
                icon: this.getWeatherIcon(day.day.condition.code, true)
            })),
            timestamp: Date.now()
        };
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
    }

    updateHeroSection(data) {
        const iconElement = document.getElementById('heroWeatherIcon');
        const tempElement = document.getElementById('heroTemp');
        const conditionElement = document.getElementById('heroCondition');
        const rangeElement = document.getElementById('heroRange');

        const iconData = this.getWeatherIcon(data.current.condition, data.current.isDay);
        
        // Animate icon change
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

        // Animate temperature
        this.animateNumber(tempElement, parseInt(tempElement.textContent) || 0, data.current.temp, '°');
        
        // Update condition and range
        conditionElement.textContent = iconData.description;
        
        const todayForecast = data.daily[0];
        rangeElement.innerHTML = `
            <span class="high">H:${todayForecast.maxTemp}°</span>
            <span class="low">L:${todayForecast.minTemp}°</span>
        `;
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
                gsap.fromTo(element, 
                    { opacity: 0.6, y: 10 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: 'power2.out',
                        onStart: () => {
                            element.textContent = metrics[key];
                        }
                    }
                );
            }
        });
    }

    updateForecastGrid(data) {
        const container = document.getElementById('forecastDays');
        container.innerHTML = '';

        data.daily.slice(1, 8).forEach((day, index) => {
            const dayElement = document.createElement('div');
            dayElement.className = 'forecast-day';
            
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const iconData = this.getWeatherIcon(day.condition, true);
            
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
            gsap.fromTo(dayElement,
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                }
            );
        });
    }

    updateDynamicTheme(conditionCode) {
        let themeKey = 'clear';
        
        if ([1003, 1006, 1009].includes(conditionCode)) themeKey = 'cloudy';
        else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) themeKey = 'rainy';
        else if ([1087, 1273, 1276].includes(conditionCode)) themeKey = 'stormy';
        else if ([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(conditionCode)) themeKey = 'snowy';
        else if ([1030, 1135, 1147].includes(conditionCode)) themeKey = 'foggy';

        const theme = WEATHER_THEMES[themeKey];
        
        document.documentElement.style.setProperty('--hue', theme.hue);
        document.documentElement.style.setProperty('--overlay-alpha', theme.overlay);
        
        // Update particle system
        this.particleConfig.type = theme.particles;
        this.createParticles();
        
        // Update body class for theme
        document.body.className = `theme-${themeKey}`;
        
        console.log(`🎨 Theme updated to: ${themeKey}`);
    }

    triggerAppleAnimations() {
        // Animate metric tiles
        gsap.fromTo('.metric-tile',
            { opacity: 0, y: 30, scale: 0.95 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }
        );

        // Animate hero elements
        gsap.fromTo('.temp-hero',
            { scale: 0.9, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.3)'
            }
        );
    }

    animateNumber(element, start, end, suffix = '') {
        gsap.to({ value: start }, {
            value: end,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function() {
                element.textContent = Math.round(this.targets()[0].value) + suffix;
            }
        });
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

    cacheWeatherData(data) {
        try {
            localStorage.setItem('apple-weather-cache', JSON.stringify({
                data: data,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.warn('Failed to cache weather data:', error);
        }
    }

    getCachedWeatherData() {
        try {
            const cached = localStorage.getItem('apple-weather-cache');
            return cached ? JSON.parse(cached) : null;
        } catch (error) {
            console.warn('Failed to read cached weather data:', error);
            return null;
        }
    }

    isCacheValid(timestamp) {
        return (Date.now() - timestamp) < CONFIG.CACHE_EXPIRY;
    }

    handleOfflineMode() {
        console.log('📱 Entering offline mode with sample data');
        
        const offlineData = {
            current: {
                temp: 22,
                condition: 1000,
                feelsLike: 24,
                humidity: 65,
                windSpeed: 12,
                windDir: 'NW',
                pressure: 1013,
                visibility: 10,
                uvIndex: 6,
                isDay: true
            },
            daily: [
                { date: '2025-08-01', maxTemp: 26, minTemp: 18, condition: 1000 },
                { date: '2025-08-02', maxTemp: 24, minTemp: 17, condition: 1003 },
                { date: '2025-08-03', maxTemp: 21, minTemp: 15, condition: 1063 },
                { date: '2025-08-04', maxTemp: 26, minTemp: 19, condition: 1000 },
                { date: '2025-08-05', maxTemp: 23, minTemp: 16, condition: 1006 },
                { date: '2025-08-06', maxTemp: 20, minTemp: 14, condition: 1180 },
                { date: '2025-08-07', maxTemp: 25, minTemp: 18, condition: 1000 }
            ],
            timestamp: Date.now()
        };

        this.updateDisplay(offlineData);
        
        // Show offline indicator
        const offlineIndicator = document.createElement('div');
        offlineIndicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 1000;
        `;
        offlineIndicator.textContent = '📶 Offline Mode';
        document.body.appendChild(offlineIndicator);
        
        setTimeout(() => offlineIndicator.remove(), 5000);
    }

    setupEventListeners() {
        // Map layer switching
        document.querySelectorAll('.map-layer').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll('.map-layer').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const layer = e.target.dataset.layer;
                console.log(`🗺️ Switching to ${layer} layer`);
                // Implement layer switching logic here
            });
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const canvas = document.getElementById('particleCanvas');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                this.createParticles();
            }, 250);
        });

        // Handle visibility change (for 24/7 operation)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('🔄 Tab became visible, refreshing data...');
                this.fetchWeatherData();
            }
        });
    }

    startUpdateCycle() {
        // Immediate first update
        setTimeout(() => this.fetchWeatherData(), 1000);
        
        // Regular updates every 15 minutes
        setInterval(() => {
            console.log('🔄 Scheduled weather update...');
            this.fetchWeatherData();
        }, CONFIG.UPDATE_INTERVAL);
    }

    setupStabilityFeatures() {
        // Weekly page refresh for long-term stability
        setTimeout(() => {
            console.log('🔄 Weekly refresh for stability');
            window.location.reload();
        }, CONFIG.WEEKLY_REFRESH);

        // Memory cleanup
        setInterval(() => {
            if (window.gc && typeof window.gc === 'function') {
                window.gc();
            }
            
            // Clean old cache entries
            this.cleanupCache();
        }, 60 * 60 * 1000); // Every hour

        // Error boundary
        window.addEventListener('error', (error) => {
            console.error('🚨 Global error caught:', error);
            // Implement error recovery logic
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('🚨 Unhandled promise rejection:', event.reason);
            event.preventDefault();
        });
    }

    setupPerformanceOptimizations() {
        // Use requestIdleCallback for non-critical tasks
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.optimizeAnimations();
                this.preloadAssets();
            });
        }

        // Disable animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduced-motion');
        }
    }

    optimizeAnimations() {
        // Reduce particle count on slower devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 8) {
            this.particleConfig.count = Math.min(this.particleConfig.count, 25);
        }
    }

    preloadAssets() {
        // Preload video assets for different weather conditions
        const videoSources = [
            'assets/weather-clear.mp4',
            'assets/weather-cloudy.mp4',
            'assets/weather-rainy.mp4'
        ];

        videoSources.forEach(src => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = src;
        });
    }

    cleanupCache() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('apple-weather-') && key !== 'apple-weather-cache') {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.timestamp && (Date.now() - data.timestamp) > CONFIG.CACHE_EXPIRY * 2) {
                        localStorage.removeItem(key);
                    }
                }
            });
        } catch (error) {
            console.warn('Cache cleanup failed:', error);
        }
    }
}

// Initialize Apple Weather DNA when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AppleWeatherDNA();
});

// Service Worker registration for offline capability
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
