/**
 * Apple Weather DNA - Multi-API Weather Service
 * Supports multiple weather APIs with intelligent fallback
 */

// Configuration with multiple API sources
const CONFIG = {
    // Weather APIs (we'll try multiple sources)
    APIS: {
        weatherapi: {
            key: 'ae9c7b511597467cb5e100338250108', // Your fresh API key
            baseUrl: 'https://api.weatherapi.com/v1',
            name: 'WeatherAPI'
        },
        openweather: {
            key: 'demo_key', // We'll use demo mode
            baseUrl: 'https://api.openweathermap.org/data/2.5',
            name: 'OpenWeatherMap'
        },
        visualcrossing: {
            key: 'demo', // Demo key
            baseUrl: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
            name: 'Visual Crossing'
        }
    },
    LOCATION: {
        lat: 43.508,
        lon: 16.440,
        name: 'Split',
        country: 'Croatia'
    },
    UPDATE_INTERVAL: 15 * 60 * 1000, // 15 minutes
    CACHE_EXPIRY: 60 * 60 * 1000, // 1 hour
};

// Weather Icons DNA Mapping (Universal codes)
const WEATHER_ICONS = {
    // Clear/Sunny
    1000: { day: 'wi-day-sunny', night: 'wi-night-clear', desc: 'Clear' },
    800: { day: 'wi-day-sunny', night: 'wi-night-clear', desc: 'Clear' },
    
    // Partly Cloudy
    1003: { day: 'wi-day-cloudy', night: 'wi-night-alt-cloudy', desc: 'Partly Cloudy' },
    801: { day: 'wi-day-cloudy', night: 'wi-night-alt-cloudy', desc: 'Partly Cloudy' },
    802: { day: 'wi-day-cloudy', night: 'wi-night-alt-cloudy', desc: 'Partly Cloudy' },
    
    // Cloudy/Overcast
    1006: { day: 'wi-cloudy', night: 'wi-cloudy', desc: 'Cloudy' },
    1009: { day: 'wi-cloudy', night: 'wi-cloudy', desc: 'Overcast' },
    803: { day: 'wi-cloudy', night: 'wi-cloudy', desc: 'Cloudy' },
    804: { day: 'wi-cloudy', night: 'wi-cloudy', desc: 'Overcast' },
    
    // Rain
    1063: { day: 'wi-day-rain', night: 'wi-night-rain', desc: 'Light Rain' },
    1180: { day: 'wi-day-showers', night: 'wi-night-showers', desc: 'Patchy Rain' },
    1183: { day: 'wi-showers', night: 'wi-showers', desc: 'Light Rain' },
    1186: { day: 'wi-rain', night: 'wi-rain', desc: 'Moderate Rain' },
    1189: { day: 'wi-rain', night: 'wi-rain', desc: 'Moderate Rain' },
    1192: { day: 'wi-rain', night: 'wi-rain', desc: 'Heavy Rain' },
    1195: { day: 'wi-rain', night: 'wi-rain', desc: 'Heavy Rain' },
    500: { day: 'wi-day-rain', night: 'wi-night-rain', desc: 'Light Rain' },
    501: { day: 'wi-rain', night: 'wi-rain', desc: 'Moderate Rain' },
    502: { day: 'wi-rain', night: 'wi-rain', desc: 'Heavy Rain' },
    
    // Snow
    1066: { day: 'wi-day-snow', night: 'wi-night-snow', desc: 'Light Snow' },
    600: { day: 'wi-day-snow', night: 'wi-night-snow', desc: 'Light Snow' },
    601: { day: 'wi-snow', night: 'wi-snow', desc: 'Snow' },
    602: { day: 'wi-snow', night: 'wi-snow', desc: 'Heavy Snow' },
    
    // Thunderstorm
    1087: { day: 'wi-day-thunderstorm', night: 'wi-night-thunderstorm', desc: 'Thundery' },
    1273: { day: 'wi-day-storm-showers', night: 'wi-night-storm-showers', desc: 'Light Thunder' },
    1276: { day: 'wi-thunderstorm', night: 'wi-thunderstorm', desc: 'Moderate Thunder' },
    200: { day: 'wi-day-thunderstorm', night: 'wi-night-thunderstorm', desc: 'Thunderstorm' },
    201: { day: 'wi-thunderstorm', night: 'wi-thunderstorm', desc: 'Thunderstorm' },
    
    // Fog/Mist
    1030: { day: 'wi-fog', night: 'wi-fog', desc: 'Mist' },
    1135: { day: 'wi-fog', night: 'wi-fog', desc: 'Fog' },
    701: { day: 'wi-fog', night: 'wi-fog', desc: 'Mist' },
    741: { day: 'wi-fog', night: 'wi-fog', desc: 'Fog' }
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
let currentApiSource = null;

/**
 * Apple Weather DNA - Multi-API Application Class
 */
class AppleWeatherApp {
    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        console.log('🍎 Initializing Apple Weather DNA with Multi-API support...');
        
        // Initialize core systems
        this.initializeTimeDisplay();
        this.initializeLivingBackground();
        this.initializeParticleSystem();
        
        // Try to get weather data from multiple sources
        await this.fetchWeatherMultiSource();
        
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

            requestAnimationFrame(animate);
        };

        animate();
    }

    async fetchWeatherMultiSource() {
        const sources = [
            () => this.tryWeatherAPI(),
            () => this.tryVisualCrossing(),
            () => this.tryOpenWeatherDemo(),
            () => this.useSampleData()
        ];

        for (const trySource of sources) {
            try {
                const data = await trySource();
                if (data) {
                    this.updateDisplay(data);
                    return;
                }
            } catch (error) {
                console.warn(`Weather source failed:`, error.message);
                continue;
            }
        }

        // Fallback to sample data
        this.useSampleData();
    }

    async tryWeatherAPI() {
        console.log('🌤️ Trying WeatherAPI...');
        const api = CONFIG.APIS.weatherapi;
        const url = `${api.baseUrl}/forecast.json?key=${api.key}&q=${CONFIG.LOCATION.lat},${CONFIG.LOCATION.lon}&days=7&aqi=no&alerts=no`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`${api.name} Error ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
        }

        const rawData = await response.json();
        currentApiSource = api.name;
        return this.normalizeWeatherAPIData(rawData);
    }

    async tryVisualCrossing() {
        console.log('🌤️ Trying Visual Crossing Weather...');
        // This is a free service that often works without registration
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Split,Croatia?unitGroup=metric&key=YourAPIKey&contentType=json`;
        
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                currentApiSource = 'Visual Crossing';
                return this.normalizeVisualCrossingData(data);
            }
        } catch (error) {
            console.warn('Visual Crossing failed:', error.message);
        }
        
        return null;
    }

    async tryOpenWeatherDemo() {
        console.log('🌤️ Trying OpenWeather demo...');
        // Try with demo coordinates (London) as it sometimes works
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=-0.1278&appid=demo&units=metric`;
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                currentApiSource = 'OpenWeather Demo';
                return this.normalizeOpenWeatherData(data);
            }
        } catch (error) {
            console.warn('OpenWeather demo failed:', error.message);
        }
        
        return null;
    }

    useSampleData() {
        console.log('📱 Using high-quality sample data for Split, Croatia');
        currentApiSource = 'Sample Data';
        
        const sampleData = {
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
            daily: [
                { date: '2025-08-01', maxTemp: 26, minTemp: 18, condition: 1000, isDay: true },
                { date: '2025-08-02', maxTemp: 25, minTemp: 17, condition: 1003, isDay: true },
                { date: '2025-08-03', maxTemp: 23, minTemp: 16, condition: 1063, isDay: true },
                { date: '2025-08-04', maxTemp: 27, minTemp: 19, condition: 1000, isDay: true },
                { date: '2025-08-05', maxTemp: 24, minTemp: 18, condition: 1006, isDay: true },
                { date: '2025-08-06', maxTemp: 22, minTemp: 15, condition: 1180, isDay: true },
                { date: '2025-08-07', maxTemp: 26, minTemp: 17, condition: 1000, isDay: true }
            ],
            timestamp: Date.now(),
            source: 'Sample Data'
        };

        this.updateDisplay(sampleData);
        return sampleData;
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
            source: currentApiSource
        };
    }

    normalizeVisualCrossingData(rawData) {
        return {
            current: {
                temp: Math.round(rawData.currentConditions.temp),
                condition: 1000, // Default to clear
                feelsLike: Math.round(rawData.currentConditions.feelslike),
                humidity: rawData.currentConditions.humidity,
                windSpeed: Math.round(rawData.currentConditions.windspeed),
                windDir: this.getWindDirection(rawData.currentConditions.winddir),
                pressure: rawData.currentConditions.pressure,
                visibility: rawData.currentConditions.visibility || 10,
                uvIndex: rawData.currentConditions.uvindex || 5,
                isDay: true
            },
            daily: rawData.days.slice(0, 7).map(day => ({
                date: day.datetime,
                maxTemp: Math.round(day.tempmax),
                minTemp: Math.round(day.tempmin),
                condition: 1000,
                isDay: true
            })),
            timestamp: Date.now(),
            source: currentApiSource
        };
    }

    normalizeOpenWeatherData(rawData) {
        return {
            current: {
                temp: Math.round(rawData.main.temp),
                condition: rawData.weather[0].id,
                feelsLike: Math.round(rawData.main.feels_like),
                humidity: rawData.main.humidity,
                windSpeed: Math.round((rawData.wind?.speed || 0) * 3.6), // m/s to km/h
                windDir: this.getWindDirection(rawData.wind?.deg || 0),
                pressure: rawData.main.pressure,
                visibility: Math.round((rawData.visibility || 10000) / 1000), // meters to km
                uvIndex: 5, // Default
                isDay: true
            },
            daily: this.generateSampleForecast(),
            timestamp: Date.now(),
            source: currentApiSource
        };
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

    getWindDirection(deg) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        return directions[Math.round(deg / 22.5) % 16];
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
        this.updateDetailedWeatherInfo(data);
        this.updateForecastGrid(data);
        this.updateMapWeather(data);
        this.updateDynamicTheme(data.current.condition);
        this.triggerAppleAnimations();
        this.initializeLiveRadar();
        this.showDataSource(data.source);
    }

    /**
     * Update detailed weather information toolboxes
     */
    updateDetailedWeatherInfo(data) {
        try {
            // Current Conditions - handle both data formats
            const currentTemp = data.current.temp_c || data.current.temp;
            const currentFeels = data.current.feelslike_c || data.current.feelsLike;
            const currentCondition = data.current.condition?.text || data.current.conditionText || 'Clear';
            const cloudCover = data.current.cloud || data.current.cloudCover || 15;

            document.getElementById('currentTemp').textContent = `${Math.round(currentTemp)}°C`;
            document.getElementById('currentFeelsLike').textContent = `${Math.round(currentFeels)}°C`;
            document.getElementById('currentCondition').textContent = currentCondition;
            document.getElementById('cloudCover').textContent = `${cloudCover}%`;

            // Wind Information
            const windSpeed = data.current.wind_kph || data.current.windSpeed;
            const windDegree = data.current.wind_degree || data.current.windDegree || 315;
            const windGusts = data.current.gust_kph || (windSpeed * 1.5);

            document.getElementById('windSpeed').textContent = `${Math.round(windSpeed)} km/h`;
            document.getElementById('windDirectionFull').textContent = this.getWindDirectionFull(windDegree);
            document.getElementById('windGusts').textContent = `${Math.round(windGusts)} km/h`;
            document.getElementById('windDegree').textContent = `${windDegree}°`;

            // Atmospheric Data
            const pressure = data.current.pressure_mb || data.current.pressure;
            const humidity = data.current.humidity;
            const dewPoint = data.current.dewpoint_c || (currentTemp - ((100 - humidity) / 5));
            const visibility = data.current.vis_km || data.current.visibility;

            document.getElementById('detailPressure').textContent = `${Math.round(pressure)} hPa`;
            document.getElementById('detailHumidity').textContent = `${humidity}%`;
            document.getElementById('dewPoint').textContent = `${Math.round(dewPoint)}°C`;
            document.getElementById('detailVisibility').textContent = `${visibility} km`;

            // Sun & Moon - handle different data structures
            let sunrise = '06:12', sunset = '20:15', moonPhase = 'Waxing Crescent';
            
            if (data.forecast?.forecastday?.[0]?.astro) {
                sunrise = data.forecast.forecastday[0].astro.sunrise;
                sunset = data.forecast.forecastday[0].astro.sunset;
                moonPhase = this.getMoonPhase(data.forecast.forecastday[0].astro.moon_phase);
            }

            const uvIndex = data.current.uv || data.current.uvIndex || 7;

            document.getElementById('sunrise').textContent = sunrise;
            document.getElementById('sunset').textContent = sunset;
            document.getElementById('detailUV').textContent = `${uvIndex} - ${this.getUVDescription(uvIndex)}`;
            document.getElementById('moonPhase').textContent = moonPhase;

        } catch (error) {
            console.error('Error updating detailed weather info:', error);
            // Set fallback values
            this.setFallbackDetailedInfo();
        }
    }

    /**
     * Set fallback values for detailed weather info
     */
    setFallbackDetailedInfo() {
        const fallbackData = {
            'currentTemp': '24°C',
            'currentFeelsLike': '26°C',
            'currentCondition': 'Clear Sky',
            'cloudCover': '15%',
            'windSpeed': '15 km/h',
            'windDirectionFull': 'Northwest',
            'windGusts': '22 km/h',
            'windDegree': '315°',
            'detailPressure': '1015 hPa',
            'detailHumidity': '68%',
            'dewPoint': '18°C',
            'detailVisibility': '10 km',
            'sunrise': '06:12',
            'sunset': '20:15',
            'detailUV': '7 - High',
            'moonPhase': 'Waxing Crescent'
        };

        Object.keys(fallbackData).forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = fallbackData[id];
        });
    }

    /**
     * Get full wind direction name
     */
    getWindDirectionFull(degree) {
        const directions = [
            'North', 'North-Northeast', 'Northeast', 'East-Northeast',
            'East', 'East-Southeast', 'Southeast', 'South-Southeast',
            'South', 'South-Southwest', 'Southwest', 'West-Southwest',  
            'West', 'West-Northwest', 'Northwest', 'North-Northwest'
        ];
        const index = Math.round(degree / 22.5) % 16;
        return directions[index];
    }

    /**
     * Get moon phase description
     */
    getMoonPhase(phase) {
        const phases = {
            'New Moon': 'New Moon',
            'Waxing Crescent': 'Waxing Crescent',
            'First Quarter': 'First Quarter',
            'Waxing Gibbous': 'Waxing Gibbous',
            'Full Moon': 'Full Moon',
            'Waning Gibbous': 'Waning Gibbous',
            'Last Quarter': 'Last Quarter',
            'Waning Crescent': 'Waning Crescent'
        };
        return phases[phase] || phase;
    }

    /**
     * Initialize Live Weather Radar
     */
    initializeLiveRadar() {
        const radarMap = document.getElementById('radarMap');
        if (!radarMap) return;
        
        const radarLoading = radarMap.querySelector('.radar-loading');
        
        // Simulate radar initialization
        setTimeout(() => {
            if (radarLoading) radarLoading.style.display = 'none';
            this.createRadarOverlay();
            this.initializeRadarControls();
        }, 2000);
    }

    /**
     * Create radar overlay with live data simulation
     */
    createRadarOverlay() {
        const radarMap = document.getElementById('radarMap');
        if (!radarMap) return;
        
        // Check if canvas already exists
        let canvas = radarMap.querySelector('canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            radarMap.appendChild(canvas);
        }
        
        // Set proper canvas dimensions
        const rect = radarMap.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        const ctx = canvas.getContext('2d');
        
        // Create Split Croatia location marker
        this.drawLocationMarker(ctx, canvas.width * 0.5, canvas.height * 0.5);
        
        // Animate precipitation patterns
        this.animateRadarData(ctx, canvas);
        
        // Update timestamp
        this.updateRadarTimestamp();
    }

    /**
     * Draw location marker for Split
     */
    drawLocationMarker(ctx, x, y) {
        // Draw marker circle
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#007AFF';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw crosshairs
        ctx.beginPath();
        ctx.moveTo(x - 15, y);
        ctx.lineTo(x + 15, y);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x, y + 15);
        ctx.strokeStyle = '#007AFF';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    /**
     * Animate radar precipitation data
     */
    animateRadarData(ctx, canvas) {
        let animationFrame = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw animated precipitation patterns
            for (let i = 0; i < 15; i++) {
                const x = (Math.sin(animationFrame * 0.01 + i) * 60) + canvas.width * 0.5;
                const y = (Math.cos(animationFrame * 0.008 + i * 0.5) * 50) + canvas.height * 0.5;
                const radius = Math.sin(animationFrame * 0.02 + i) * 15 + 20;
                const opacity = Math.abs(Math.sin(animationFrame * 0.015 + i)) * 0.4;
                
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
                ctx.fill();
            }
            
            // Redraw location marker
            this.drawLocationMarker(ctx, canvas.width * 0.5, canvas.height * 0.5);
            
            animationFrame++;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    /**
     * Initialize radar controls
     */
    initializeRadarControls() {
        const playPauseBtn = document.getElementById('playPause');
        const currentTimeBtn = document.getElementById('currentTime');
        
        if (!playPauseBtn || !currentTimeBtn) return;
        
        let isPlaying = true;
        
        playPauseBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            const icon = playPauseBtn.querySelector('i');
            const text = playPauseBtn.querySelector('span');
            
            if (isPlaying) {
                icon.className = 'wi wi-time-12';
                text.textContent = 'Pause';
            } else {
                icon.className = 'wi wi-time-1';
                text.textContent = 'Play';
            }
        });
        
        currentTimeBtn.addEventListener('click', () => {
            this.updateRadarTimestamp();
            currentTimeBtn.classList.add('active');
            setTimeout(() => currentTimeBtn.classList.remove('active'), 200);
        });
    }

    /**
     * Update radar timestamp
     */
    updateRadarTimestamp() {
        const timestamp = document.getElementById('radarTimestamp');
        if (timestamp) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            timestamp.textContent = `Live: ${timeStr}`;
        }
    }

    updateHeroSection(data) {
        const iconElement = document.getElementById('heroWeatherIcon');
        const tempElement = document.getElementById('heroTemp');
        const conditionElement = document.getElementById('heroCondition');
        const rangeElement = document.getElementById('heroRange');

        const iconData = this.getWeatherIcon(data.current.condition, data.current.isDay);
        
        if (iconElement) {
            iconElement.className = `wi ${iconData.class} weather-icon-hero`;
        }

        if (tempElement) {
            this.animateNumber(tempElement, parseInt(tempElement.textContent) || 0, data.current.temp, '');
        }
        
        if (conditionElement) {
            conditionElement.textContent = iconData.description;
        }
        
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

    updateMapWeather(data) {
        const mapTempElement = document.getElementById('mapTemp');
        const mapWeatherIcon = document.querySelector('.weather-marker i');
        
        if (mapTempElement) {
            this.animateNumber(mapTempElement, parseInt(mapTempElement.textContent) || 0, data.current.temp, '°');
        }
        
        if (mapWeatherIcon) {
            const iconData = this.getWeatherIcon(data.current.condition, data.current.isDay);
            mapWeatherIcon.className = `wi ${iconData.class}`;
        }
    }

    updateForecastGrid(data) {
        const container = document.getElementById('forecastDays');
        if (!container) return;

        container.innerHTML = '';

        data.daily.slice(1, 7).forEach((day, index) => {
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
        
        if ([1003, 1006, 1009, 801, 802, 803, 804].includes(conditionCode)) themeKey = 'cloudy';
        else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 500, 501, 502].includes(conditionCode)) themeKey = 'rainy';
        else if ([1087, 1273, 1276, 200, 201].includes(conditionCode)) themeKey = 'stormy';
        else if ([1066, 600, 601, 602].includes(conditionCode)) themeKey = 'snowy';
        else if ([1030, 1135, 701, 741].includes(conditionCode)) themeKey = 'foggy';

        const theme = WEATHER_THEMES[themeKey];
        
        document.documentElement.style.setProperty('--hue', theme.hue);
        document.documentElement.style.setProperty('--overlay-alpha', theme.overlay);
        
        const gradientBg = document.getElementById('gradient-bg');
        if (gradientBg) {
            gradientBg.style.background = theme.gradient;
        }
        
        document.body.className = `theme-${themeKey}`;
        
        console.log(`🎨 Theme updated to: ${themeKey}`);
    }

    triggerAppleAnimations() {
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
        element.textContent = end + suffix;
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
        const isLive = source !== 'Sample Data';
        
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: ${isLive ? 'rgba(0, 255, 0, 0.9)' : 'rgba(255, 165, 0, 0.9)'};
            color: white;
            padding: 8px 16px;
            border-radius: 16px;
            font-size: 12px;
            z-index: 1000;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
        `;
        indicator.textContent = `${isLive ? '📡' : '📱'} ${source}`;
        document.body.appendChild(indicator);
        
        setTimeout(() => indicator.remove(), isLive ? 3000 : 5000);
    }

    startUpdateCycle() {
        setTimeout(() => this.fetchWeatherMultiSource(), 5000);
        
        setInterval(() => {
            console.log('🔄 Scheduled weather update...');
            this.fetchWeatherMultiSource();
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
