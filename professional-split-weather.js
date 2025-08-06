/**
 * Professional Split Weather Dashboard
 * Beautiful Glassmorphism Design with Live Weather Data
 * Using WeatherAPI.com for Split, Croatia
 */

class ProfessionalSplitWeather {
    constructor() {
        this.apiKey = 'ae9c7b511597467cb5e100338250108';
        this.city = 'Split';
        this.country = 'Croatia';
        this.lat = 43.5081;
        this.lon = 16.4402;
        
        this.weatherData = null;
        this.weatherMap = null;
        this.currentMapLayer = 'precipitation';
        
        // Premium Beautiful Weather Symbols - Professional & Elegant
        this.weatherSymbols = {
            1000: { day: '☀️', night: '🌙', name: 'Clear' },
            1003: { day: '🌤️', night: '🌙', name: 'Partly Cloudy' },
            1006: { day: '☁️', night: '☁️', name: 'Cloudy' },
            1009: { day: '☁️', night: '☁️', name: 'Overcast' },
            1030: { day: '🌫️', night: '🌫️', name: 'Mist' },
            1063: { day: '🌦️', night: '🌧️', name: 'Patchy Rain' },
            1066: { day: '🌨️', night: '🌨️', name: 'Patchy Snow' },
            1069: { day: '🌨️', night: '🌨️', name: 'Patchy Sleet' },
            1072: { day: '🌨️', night: '🌨️', name: 'Patchy Freezing Drizzle' },
            1087: { day: '⛈️', night: '⛈️', name: 'Thundery Outbreaks' },
            1114: { day: '❄️', night: '❄️', name: 'Blowing Snow' },
            1117: { day: '🌪️', night: '🌪️', name: 'Blizzard' },
            1135: { day: '🌫️', night: '🌫️', name: 'Fog' },
            1147: { day: '🌫️', night: '🌫️', name: 'Freezing Fog' },
            1150: { day: '🌦️', night: '🌧️', name: 'Patchy Light Drizzle' },
            1153: { day: '🌧️', night: '🌧️', name: 'Light Drizzle' },
            1168: { day: '🌧️', night: '🌧️', name: 'Freezing Drizzle' },
            1171: { day: '🌧️', night: '🌧️', name: 'Heavy Freezing Drizzle' },
            1180: { day: '🌦️', night: '🌧️', name: 'Patchy Light Rain' },
            1183: { day: '🌧️', night: '🌧️', name: 'Light Rain' },
            1186: { day: '🌧️', night: '🌧️', name: 'Moderate Rain' },
            1189: { day: '🌧️', night: '🌧️', name: 'Moderate Rain' },
            1192: { day: '🌧️', night: '🌧️', name: 'Heavy Rain' },
            1195: { day: '⛈️', night: '⛈️', name: 'Heavy Rain' },
            1198: { day: '🌧️', night: '🌧️', name: 'Light Freezing Rain' },
            1201: { day: '🌧️', night: '🌧️', name: 'Moderate Freezing Rain' },
            1204: { day: '🌨️', night: '🌨️', name: 'Light Sleet' },
            1207: { day: '🌨️', night: '🌨️', name: 'Moderate Sleet' },
            1210: { day: '🌨️', night: '🌨️', name: 'Patchy Light Snow' },
            1213: { day: '❄️', night: '❄️', name: 'Light Snow' },
            1216: { day: '🌨️', night: '🌨️', name: 'Patchy Moderate Snow' },
            1219: { day: '❄️', night: '❄️', name: 'Moderate Snow' },
            1222: { day: '❄️', night: '❄️', name: 'Patchy Heavy Snow' },
            1225: { day: '❄️', night: '❄️', name: 'Heavy Snow' },
            1237: { day: '🧊', night: '🧊', name: 'Ice Pellets' },
            1240: { day: '🌦️', night: '🌧️', name: 'Light Rain Shower' },
            1243: { day: '🌧️', night: '🌧️', name: 'Moderate Rain Shower' },
            1246: { day: '⛈️', night: '⛈️', name: 'Torrential Rain Shower' },
            1249: { day: '🌨️', night: '🌨️', name: 'Light Sleet' },
            1252: { day: '🌨️', night: '🌨️', name: 'Moderate Sleet' },
            1255: { day: '🌨️', night: '🌨️', name: 'Light Snow Showers' },
            1258: { day: '❄️', night: '❄️', name: 'Moderate Snow Showers' },
            1261: { day: '🧊', night: '🧊', name: 'Light Ice Pellet Showers' },
            1264: { day: '🧊', night: '🧊', name: 'Moderate Ice Pellet Showers' },
            1273: { day: '⛈️', night: '⛈️', name: 'Patchy Light Rain with Thunder' },
            1276: { day: '⛈️', night: '⛈️', name: 'Moderate Rain with Thunder' },
            1279: { day: '⛈️', night: '⛈️', name: 'Patchy Light Snow with Thunder' },
            1282: { day: '⛈️', night: '⛈️', name: 'Moderate Snow with Thunder' }
        };
        
        this.init();
    }

    async init() {
        console.log('🌟 Initializing Professional Split Weather Dashboard');
        
        try {
            this.initializeTimeDisplay();
            this.initializeWeatherParticles();
            this.initializeWeatherMap();
            await this.fetchWeatherData();
            this.startUpdateCycles();
            
            console.log('✅ Professional Split Weather Dashboard initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing weather dashboard:', error);
            this.useFallbackData();
        }
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
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Europe/Zagreb'
            });

            const timeElement = document.getElementById('current-time');
            const weatherTimeElement = document.getElementById('current-time-weather');
            const dateElement = document.getElementById('current-date');
            
            if (timeElement) timeElement.textContent = timeString;
            if (weatherTimeElement) weatherTimeElement.textContent = timeString;
            if (dateElement) dateElement.textContent = dateString;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    initializeWeatherParticles() {
        const particlesContainer = document.querySelector('.weather-particles');
        
        if (!particlesContainer) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 20 + 20}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
            `;
            
            particlesContainer.appendChild(particle);
        }

        if (!document.getElementById('particle-animation-style')) {
            const style = document.createElement('style');
            style.id = 'particle-animation-style';
            style.textContent = `
                @keyframes floatParticle {
                    0% { 
                        transform: translateY(0px) translateX(0px) rotate(0deg); 
                        opacity: 0; 
                    }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { 
                        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeWeatherMap() {
        const mapElement = document.getElementById('weather-map');
        if (!mapElement) {
            console.log('Weather map element not found');
            return;
        }

        try {
            console.log('🗺️ Initializing direct map embed...');
            
            // Add OpenStreetMap with weather overlay (no Leaflet)
            this.addOpenStreetMapWithWeather();

            console.log('✅ Weather map initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing weather map:', error);
        }
    }

    addZoomEarthRadar() {
        try {
            console.log('🌍 Adding Zoom.Earth live weather radar...');
            
            // Base map layer (Zoom.Earth satellite/streets)
            const baseLayer = L.tileLayer('https://zoom.earth/tiles/v1/satellite/{z}/{x}/{y}.jpg', {
                attribution: '© Zoom.Earth',
                opacity: 1.0,
                maxZoom: 16,
                zIndex: 1
            });
            
            // Live weather radar overlay from Zoom.Earth
            const radarLayer = L.tileLayer('https://zoom.earth/tiles/v1/radar/{z}/{x}/{y}.png', {
                attribution: 'Weather radar by Zoom.Earth',
                opacity: 0.7,
                maxZoom: 16,
                zIndex: 10
            });
            
            // Add layers to map
            baseLayer.addTo(this.weatherMap);
            radarLayer.addTo(this.weatherMap);
            
            // Store references
            this.baseLayer = baseLayer;
            this.radarLayer = radarLayer;
            
            // Add error handling
            baseLayer.on('tileerror', (e) => {
                console.warn('⚠️ Base layer tile error:', e);
            });
            
            radarLayer.on('tileerror', (e) => {
                console.warn('⚠️ Radar layer tile error:', e);
            });
            
            radarLayer.on('tileload', (e) => {
                console.log('✅ Weather radar tile loaded successfully');
            });
            
            // Auto-refresh radar every 5 minutes
            this.setupRadarRefresh();
            
            console.log('🌍 Zoom.Earth weather radar initialized successfully');
            
        } catch (error) {
            console.error('❌ Error adding Zoom.Earth radar:', error);
            this.addFallbackRadar();
        }
    }

    setupRadarRefresh() {
        // Refresh radar layer every 5 minutes to get latest weather data
        setInterval(() => {
            if (this.radarLayer && this.weatherMap) {
                console.log('🔄 Refreshing weather radar...');
                
                // Remove and re-add radar layer to refresh
                this.weatherMap.removeLayer(this.radarLayer);
                
                setTimeout(() => {
                    // Create new radar layer with cache-busting timestamp
                    const timestamp = Date.now();
                    this.radarLayer = L.tileLayer(`https://zoom.earth/tiles/v1/radar/{z}/{x}/{y}.png?t=${timestamp}`, {
                        attribution: 'Weather radar by Zoom.Earth',
                        opacity: 0.7,
                        maxZoom: 16,
                        zIndex: 10
                    });
                    
                    this.radarLayer.addTo(this.weatherMap);
                }, 1000);
            }
        }, 300000); // 5 minutes
    }

    addFallbackRadar() {
        console.log('🔄 Adding fallback weather radar...');
        
        // Fallback to OpenStreetMap base
        const fallbackBase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
        
        // Fallback weather radar using OpenWeatherMap
        const fallbackRadar = L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=' + this.apiKey, {
            attribution: 'Weather radar by OpenWeatherMap',
            opacity: 0.6,
            maxZoom: 18,
            zIndex: 10
        });
        
        fallbackBase.addTo(this.weatherMap);
        fallbackRadar.addTo(this.weatherMap);
        
        this.baseLayer = fallbackBase;
        this.radarLayer = fallbackRadar;
    }

    addLiveWeatherRadar() {
        try {
            console.log('🌧️ Adding live weather radar...');
            
            // Base OpenStreetMap layer
            const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                opacity: 1.0,
                maxZoom: 18,
                zIndex: 1
            });
            
            // Add base layer
            baseLayer.addTo(this.weatherMap);
            this.baseLayer = baseLayer;
            
            // Add live precipitation radar from RainViewer
            this.addRainViewerRadar();
            
            console.log('✅ Live weather radar initialized');
            
        } catch (error) {
            console.error('❌ Error adding weather radar:', error);
            this.addSimpleBaseMap();
        }
    }
    
    async addRainViewerRadar() {
        try {
            console.log('🌧️ Fetching RainViewer radar data...');
            
            // Get available radar timestamps from RainViewer API
            const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
            const data = await response.json();
            
            if (data && data.radar && data.radar.past && data.radar.past.length > 0) {
                // Get the most recent radar timestamp
                const latestRadar = data.radar.past[data.radar.past.length - 1];
                const timestamp = latestRadar.time;
                
                console.log('🕒 Latest radar timestamp:', new Date(timestamp * 1000));
                
                // Remove existing radar layer if any
                if (this.radarLayer && this.weatherMap.hasLayer(this.radarLayer)) {
                    this.weatherMap.removeLayer(this.radarLayer);
                }
                
                // Add new radar layer with latest timestamp
                this.radarLayer = L.tileLayer(`https://tilecache.rainviewer.com/v2/radar/${timestamp}/512/{z}/{x}/{y}/2/1_1.png`, {
                    attribution: 'Weather radar by RainViewer',
                    opacity: 0.6,
                    maxZoom: 16,
                    zIndex: 10,
                    tileSize: 512,
                    zoomOffset: -1
                });
                
                this.radarLayer.addTo(this.weatherMap);
                
                // Set up automatic refresh every 10 minutes
                this.setupRainViewerRefresh();
                
                console.log('✅ RainViewer radar layer added successfully');
                
            } else {
                console.warn('⚠️ No radar data available from RainViewer');
                this.addBasicWeatherOverlay();
            }
            
        } catch (error) {
            console.error('❌ Error fetching RainViewer data:', error);
            this.addBasicWeatherOverlay();
        }
    }
    
    setupRainViewerRefresh() {
        // Refresh radar every 10 minutes to get latest data
        setInterval(() => {
            console.log('🔄 Refreshing RainViewer radar...');
            this.addRainViewerRadar();
        }, 600000); // 10 minutes
    }
    
    addBasicWeatherOverlay() {
        console.log('🌤️ Adding basic weather overlay...');
        
        // Add OpenWeatherMap precipitation layer as fallback
        this.radarLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=ae9c7b511597467cb5e100338250108`, {
            attribution: 'Weather data by OpenWeatherMap',
            opacity: 0.5,
            maxZoom: 16,
            zIndex: 10
        });
        
        this.radarLayer.addTo(this.weatherMap);
        console.log('✅ Basic weather overlay added');
    }

    addSimpleBaseMap() {
        console.log('🗺️ Adding simple direct OpenStreetMap fallback...');
        this.addSimpleDirectMap();
    }

    addZoomEarthEmbed() {
        try {
            console.log('🌍 Adding Zoom.Earth iframe embed...');
            
            // Get the map container
            const mapContainer = document.getElementById('weather-map');
            if (!mapContainer) {
                console.error('❌ Map container not found');
                return;
            }
            
            // Clear existing content
            mapContainer.innerHTML = '';
            
            // Create iframe for Zoom.Earth embed
            const iframe = document.createElement('iframe');
            iframe.src = 'https://zoom.earth/';
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.style.borderRadius = '26px';
            iframe.style.border = 'none';
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('loading', 'lazy');
            
            // Add iframe to container
            mapContainer.appendChild(iframe);
            
            console.log('✅ Zoom.Earth iframe embed added successfully');
            
        } catch (error) {
            console.error('❌ Error adding Zoom.Earth iframe embed:', error);
            // Fallback to OpenStreetMap
            this.addOpenStreetMapWithWeather();
        }
    }

    addOpenStreetMapWithWeather() {
        try {
            console.log('🗺️ Adding Enhanced Live Weather Map with Windy...');
            
            // Get the map container
            const mapContainer = document.getElementById('weather-map');
            if (!mapContainer) {
                console.error('❌ Map container not found');
                return;
            }
            
            // Clear existing content
            mapContainer.innerHTML = '';
            
            // Create enhanced 4K iframe for ultra-high quality live weather radar
            const iframe = document.createElement('iframe');
            iframe.src = 'https://embed.windy.com/embed2.html?lat=43.508&lon=16.440&detailLat=43.508&detailLon=16.440&width=1200&height=900&zoom=10&level=surface&overlay=rain&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1&autoplay=1&quality=hd';
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.style.borderRadius = '22px';
            iframe.style.border = 'none';
            iframe.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
            iframe.style.willChange = 'transform, opacity';
            iframe.style.transform = 'translateZ(0)';
            iframe.style.backfaceVisibility = 'hidden';
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('loading', 'eager');
            iframe.setAttribute('title', '4K Live Weather Radar - Split, Croatia');
            
            // Add ultra-smooth dynamic hover effect
            iframe.addEventListener('mouseenter', () => {
                iframe.style.transform = 'translateZ(0) scale(1.001)';
                iframe.style.boxShadow = '0 25px 50px rgba(0,0,0,0.12)';
            });
            
            iframe.addEventListener('mouseleave', () => {
                iframe.style.transform = 'translateZ(0) scale(1)';
                iframe.style.boxShadow = 'none';
            });
            
            // Add iframe to container
            mapContainer.appendChild(iframe);
            
            // Add live refresh functionality for dynamic weather updates
            this.setupLiveMapRefresh(iframe);
            
            console.log('✅ Enhanced Live Weather Map added successfully with bigger dimensions and live updates');
            
        } catch (error) {
            console.error('❌ Error adding Enhanced Live Weather Map:', error);
            this.addSimpleDirectMap();
        }
    }
    
    setupLiveMapRefresh(iframe) {
        // Ultra-smooth refresh with performance optimization
        setInterval(() => {
            try {
                console.log('🔄 Refreshing 4K live weather map...');
                const currentTime = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
                const currentSrc = iframe.src;
                
                // Update with 4K quality parameters
                let updatedSrc = currentSrc.replace(/calendar=now/, `calendar=${currentTime}`);
                updatedSrc = updatedSrc.replace(/width=800/, 'width=1200');
                updatedSrc = updatedSrc.replace(/height=750/, 'height=900');
                
                // Ultra-smooth refresh with fade effect
                iframe.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                iframe.style.opacity = '0.85';
                
                setTimeout(() => {
                    iframe.src = updatedSrc;
                    iframe.style.opacity = '1';
                }, 600);
                
                console.log('✅ 4K live weather map refreshed smoothly');
            } catch (error) {
                console.error('❌ Error refreshing 4K live map:', error);
            }
        }, 600000); // 10 minutes = 600,000ms
    }
    
    addSimpleDirectMap() {
        try {
            console.log('🗺️ Adding simple direct OpenStreetMap...');
            
            // Get the map container
            const mapContainer = document.getElementById('weather-map');
            if (!mapContainer) {
                console.error('❌ Map container not found');
                return;
            }
            
            // Clear existing content
            mapContainer.innerHTML = '';
            
            // Create iframe for direct OpenStreetMap
            const iframe = document.createElement('iframe');
            iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=16.3,43.4,16.6,43.6&layer=mapnik&marker=43.508,16.440';
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.style.borderRadius = '26px';
            iframe.style.border = 'none';
            iframe.setAttribute('loading', 'lazy');
            
            // Add iframe to container
            mapContainer.appendChild(iframe);
            
            console.log('✅ Direct OpenStreetMap embed added successfully');
            
        } catch (error) {
            console.error('❌ Error adding direct OpenStreetMap:', error);
        }
    }
    
    addOpenWeatherMapOverlay() {
        try {
            console.log('🌧️ Adding OpenWeatherMap weather overlay...');
            
            // Remove existing weather layer if any
            if (this.radarLayer && this.weatherMap.hasLayer(this.radarLayer)) {
                this.weatherMap.removeLayer(this.radarLayer);
            }
            
            // Add precipitation layer from OpenWeatherMap
            this.radarLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${this.apiKey}`, {
                attribution: 'Weather data by OpenWeatherMap',
                opacity: 0.6,
                maxZoom: 18,
                zIndex: 10
            });
            
            this.radarLayer.addTo(this.weatherMap);
            
            // Set up automatic refresh every 10 minutes
            this.setupWeatherOverlayRefresh();
            
            console.log('✅ OpenWeatherMap overlay added successfully');
            
        } catch (error) {
            console.error('❌ Error adding OpenWeatherMap overlay:', error);
        }
    }
    
    setupWeatherOverlayRefresh() {
        // Refresh weather overlay every 10 minutes
        setInterval(() => {
            console.log('🔄 Refreshing weather overlay...');
            this.addOpenWeatherMapOverlay();
        }, 600000); // 10 minutes
    }

    setupRadarRefresh() {
        // Refresh radar layer every 5 minutes to get latest weather data
        setInterval(() => {
            if (this.radarLayer && this.weatherMap) {
                console.log('🔄 Refreshing weather radar...');
                
                // Remove and re-add radar layer to refresh
                this.weatherMap.removeLayer(this.radarLayer);
                
                setTimeout(() => {
                    // Create new radar layer with cache-busting timestamp
                    const timestamp = Date.now();
                    this.radarLayer = L.tileLayer(`https://zoom.earth/tiles/v1/radar/{z}/{x}/{y}.png?t=${timestamp}`, {
                        attribution: 'Weather radar by Zoom.Earth',
                        opacity: 0.7,
                        maxZoom: 16,
                        zIndex: 10
                    });
                    
                    this.radarLayer.addTo(this.weatherMap);
                }, 1000);
            }
        }, 300000); // 5 minutes
    }

    setupAutoRefresh() {
        // Auto-refresh weather data layers every 5 minutes
        setInterval(() => {
            if (this.weatherLayers && this.currentMapLayer !== 'street') {
                console.log('🔄 Auto-refreshing weather layer:', this.currentMapLayer);
                // Remove current layer and re-add it to refresh
                if (this.weatherMap.hasLayer(this.weatherLayers[this.currentMapLayer])) {
                    this.weatherMap.removeLayer(this.weatherLayers[this.currentMapLayer]);
                    setTimeout(() => {
                        this.weatherLayers[this.currentMapLayer].addTo(this.weatherMap);
                    }, 100);
                }
            }
        }, 300000); // 5 minutes
    }

    updateMapStatus() {
        const statusElement = document.getElementById('map-layer-status');
        if (statusElement) {
            const statusText = statusElement.querySelector('span');
            const layerNames = {
                street: 'Street Map',
                precipitation: 'Precipitation Radar',
                temperature: 'Temperature Map',
                wind: 'Wind Patterns',
                clouds: 'Cloud Coverage',
                pressure: 'Pressure Systems'
            };
            
            if (statusText) {
                statusText.textContent = layerNames[this.currentMapLayer] || 'Unknown Layer';
            }
        }
    }

    updateMapLegend() {
        const legendElement = document.getElementById('map-legend');
        const legendContent = document.getElementById('legend-content');
        
        if (!legendElement || !legendContent) return;
        
        // Hide legend for street map view
        if (this.currentMapLayer === 'street') {
            legendElement.style.display = 'none';
            return;
        }
        
        // Show legend for weather data
        legendElement.style.display = 'block';
        
        const legends = {
            precipitation: [
                { color: '#87CEEB', label: 'Light Rain (0.1-2.5 mm/h)' },
                { color: '#4169E1', label: 'Moderate Rain (2.5-10 mm/h)' },
                { color: '#FF4500', label: 'Heavy Rain (10-50 mm/h)' },
                { color: '#8B0000', label: 'Extreme Rain (>50 mm/h)' }
            ],
            temperature: [
                { color: '#4B0082', label: 'Very Cold (<-10°C)' },
                { color: '#0000FF', label: 'Cold (-10-0°C)' },
                { color: '#00CED1', label: 'Cool (0-10°C)' },
                { color: '#32CD32', label: 'Mild (10-20°C)' },
                { color: '#FFD700', label: 'Warm (20-30°C)' },
                { color: '#FF8C00', label: 'Hot (30-40°C)' },
                { color: '#FF0000', label: 'Very Hot (>40°C)' }
            ],
            wind: [
                { color: '#98FB98', label: 'Light Breeze (0-15 km/h)' },
                { color: '#87CEEB', label: 'Moderate Wind (15-30 km/h)' },
                { color: '#DAA520', label: 'Strong Wind (30-50 km/h)' },
                { color: '#DC143C', label: 'Gale Force (>50 km/h)' }
            ],
            clouds: [
                { color: '#F0F8FF', label: 'Clear Sky (0-25%)' },
                { color: '#D3D3D3', label: 'Partly Cloudy (25-50%)' },
                { color: '#A9A9A9', label: 'Mostly Cloudy (50-75%)' },
                { color: '#696969', label: 'Overcast (75-100%)' }
            ],
            pressure: [
                { color: '#8A2BE2', label: 'Very Low (<1000 hPa)' },
                { color: '#4169E1', label: 'Low (1000-1010 hPa)' },
                { color: '#32CD32', label: 'Normal (1010-1020 hPa)' },
                { color: '#FFD700', label: 'High (1020-1030 hPa)' },
                { color: '#FF6347', label: 'Very High (>1030 hPa)' }
            ]
        };
        
        const currentLegend = legends[this.currentMapLayer];
        if (currentLegend) {
            legendContent.innerHTML = currentLegend.map(item => 
                `<div class="legend-item">
                    <div class="legend-color" style="background-color: ${item.color}"></div>
                    <span>${item.label}</span>
                </div>`
            ).join('');
        }
    }

    addFallbackRadar() {
        console.log('🔄 Adding fallback weather radar...');
        
        // Fallback to OpenStreetMap base
        const fallbackBase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
        
        // Fallback weather radar using OpenWeatherMap
        const fallbackRadar = L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=' + this.apiKey, {
            attribution: 'Weather radar by OpenWeatherMap',
            opacity: 0.6,
            maxZoom: 18,
            zIndex: 10
        });
        
        fallbackBase.addTo(this.weatherMap);
        fallbackRadar.addTo(this.weatherMap);
        
        this.baseLayer = fallbackBase;
        this.radarLayer = fallbackRadar;
    }

    setupRadarRefresh() {
        const buttons = document.querySelectorAll('.map-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Get layer name from button id
                this.currentMapLayer = e.target.id.replace('-layer', '');
                
                this.updateMapLayer();
                this.updateMapStatus();
                this.updateMapLegend();
            });
        });
        
        console.log('🎛️ Map controls initialized');
    }

    updateMapStatus() {
        const statusElement = document.getElementById('map-layer-status');
        if (statusElement) {
            const statusText = statusElement.querySelector('span');
            const layerNames = {
                satellite: '📡 Satellite View',
                precipitation: '🌧️ Precipitation Radar',
                temperature: '🌡️ Temperature Map',
                wind: '💨 Wind Patterns',
                clouds: '☁️ Cloud Coverage',
                pressure: '📊 Pressure Systems'
            };
            
            if (statusText) {
                statusText.textContent = layerNames[this.currentMapLayer] || 'Weather Data';
            }
        }
    }

    updateMapLegend() {
        const legendElement = document.getElementById('map-legend');
        const legendContent = document.getElementById('legend-content');
        
        if (!legendElement || !legendContent) return;
        
        // Hide legend for satellite view
        if (this.currentMapLayer === 'satellite') {
            legendElement.style.display = 'none';
            return;
        }
        
        // Show and populate legend for weather layers
        legendElement.style.display = 'block';
        
        const legends = {
            precipitation: [
                { color: '#87CEEB', text: 'Light Rain (0.1-2.5 mm/h)' },
                { color: '#4169E1', text: 'Moderate Rain (2.5-7.5 mm/h)' },
                { color: '#0000FF', text: 'Heavy Rain (7.5-20 mm/h)' },
                { color: '#8B008B', text: 'Very Heavy Rain (>20 mm/h)' }
            ],
            temperature: [
                { color: '#0000FF', text: 'Very Cold (<-10°C)' },
                { color: '#87CEEB', text: 'Cold (-10°C to 0°C)' },
                { color: '#90EE90', text: 'Cool (0°C to 10°C)' },
                { color: '#FFFF00', text: 'Warm (10°C to 25°C)' },
                { color: '#FFA500', text: 'Hot (25°C to 35°C)' },
                { color: '#FF0000', text: 'Very Hot (>35°C)' }
            ],
            wind: [
                { color: '#87CEEB', text: 'Light Wind (0-15 km/h)' },
                { color: '#4169E1', text: 'Moderate Wind (15-30 km/h)' },
                { color: '#0000FF', text: 'Strong Wind (30-50 km/h)' },
                { color: '#8B008B', text: 'Very Strong Wind (>50 km/h)' }
            ],
            clouds: [
                { color: '#F0F8FF', text: 'Clear Sky (0-10%)' },
                { color: '#E6E6FA', text: 'Partly Cloudy (10-50%)' },
                { color: '#D3D3D3', text: 'Mostly Cloudy (50-90%)' },
                { color: '#A9A9A9', text: 'Overcast (90-100%)' }
            ],
            pressure: [
                { color: '#8B008B', text: 'Very Low (<980 hPa)' },
                { color: '#0000FF', text: 'Low (980-1000 hPa)' },
                { color: '#90EE90', text: 'Normal (1000-1020 hPa)' },
                { color: '#FFFF00', text: 'High (1020-1040 hPa)' },
                { color: '#FF0000', text: 'Very High (>1040 hPa)' }
            ]
        };
        
        const currentLegend = legends[this.currentMapLayer];
        if (currentLegend) {
            legendContent.innerHTML = currentLegend.map(item => `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${item.color}"></div>
                    <span>${item.text}</span>
                </div>
            `).join('');
        }
    }

    updateMapLayer() {
        if (!this.weatherMap || !this.weatherLayers) {
            console.warn('⚠️ Map or layers not initialized');
            return;
        }

        // Remove all layers first
        Object.values(this.weatherLayers).forEach(layer => {
            if (this.weatherMap.hasLayer(layer)) {
                this.weatherMap.removeLayer(layer);
            }
        });

        // Special handling for precipitation layer (refresh with latest timestamp)
        if (this.currentMapLayer === 'precipitation') {
            this.addRainViewerLayer();
        }

        // Add the selected layer
        if (this.weatherLayers[this.currentMapLayer]) {
            try {
                this.weatherLayers[this.currentMapLayer].addTo(this.weatherMap);
                console.log(`🗺️ Map layer switched to: ${this.currentMapLayer}`);
                
                // Show loading status briefly
                this.showMapLoadingStatus();
                
            } catch (error) {
                console.error('❌ Error switching map layer:', error);
                // Fallback to satellite if there's an error
                if (this.currentMapLayer !== 'satellite' && this.weatherLayers.satellite) {
                    this.weatherLayers.satellite.addTo(this.weatherMap);
                    this.currentMapLayer = 'satellite';
                    this.updateMapStatus();
                }
            }
        }
    }

    showMapLoadingStatus() {
        const statusElement = document.getElementById('map-layer-status');
        if (statusElement) {
            const statusText = statusElement.querySelector('span');
            const originalText = statusText.textContent;
            
            statusText.textContent = 'Loading...';
            
            // Restore original text after 2 seconds
            setTimeout(() => {
                if (statusText) {
                    statusText.textContent = originalText;
                }
            }, 2000);
        }
    }

    async fetchWeatherData() {
        try {
            console.log('🌡️ Starting weather data fetch...');
            this.updateApiStatus('Fetching data...', 'loading');
            
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.lat},${this.lon}&days=7&aqi=yes&alerts=yes`;
            console.log('🔗 API URL:', url);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('📡 Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Weather data received:', data);
            this.weatherData = data;
            
            this.updateWeatherDisplay(data);
            this.updateApiStatus('Live Data', 'online');
            
            console.log('✅ Weather data fetched successfully');
            
        } catch (error) {
            console.error('❌ Error fetching weather data:', error);
            console.log('🔄 Using fallback data instead');
            this.useFallbackData();
            this.updateApiStatus('Offline Data', 'offline');
        }
    }

    useFallbackData() {
        const fallbackData = {
            current: {
                temp_c: 25,
                condition: { 
                    text: 'Partly Cloudy', 
                    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
                    code: 1003
                },
                feelslike_c: 27,
                humidity: 65,
                wind_kph: 12,
                wind_dir: 'NW',
                pressure_mb: 1013,
                vis_km: 10,
                uv: 6,
                cloud: 30,
                dewpoint_c: 18,
                is_day: 1
            },
            forecast: {
                forecastday: [
                    {
                        date: '2025-08-01',
                        day: { 
                            maxtemp_c: 28, 
                            mintemp_c: 20, 
                            condition: { 
                                text: 'Partly Cloudy', 
                                icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
                                code: 1003
                            }
                        },
                        astro: { 
                            sunrise: '06:05', 
                            sunset: '20:25',
                            moon_phase: 'Waning Crescent'
                        },
                        hour: Array.from({length: 24}, (_, i) => ({
                            time: `2025-08-01 ${i.toString().padStart(2, '0')}:00`,
                            temp_c: 20 + Math.sin(i * Math.PI / 12) * 8,
                            condition: { 
                                text: 'Clear', 
                                icon: i > 6 && i < 19 ? '//cdn.weatherapi.com/weather/64x64/day/113.png' : '//cdn.weatherapi.com/weather/64x64/night/113.png',
                                code: 1000
                            },
                            wind_kph: 10 + Math.random() * 10,
                            humidity: 60 + Math.random() * 20,
                            chance_of_rain: Math.random() * 30
                        }))
                    },
                    ...Array.from({length: 6}, (_, i) => ({
                        date: new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        day: { 
                            maxtemp_c: 25 + Math.random() * 8, 
                            mintemp_c: 18 + Math.random() * 6, 
                            condition: { 
                                text: ['Sunny', 'Partly Cloudy', 'Cloudy'][Math.floor(Math.random() * 3)], 
                                icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
                                code: [1000, 1003, 1006][Math.floor(Math.random() * 3)]
                            } 
                        }
                    }))
                ]
            },
            location: {
                name: 'Split',
                region: 'Splitsko-Dalmatinska',
                country: 'Croatia',
                lat: 43.5081,
                lon: 16.4402,
                localtime: new Date().toISOString().replace('T', ' ').slice(0, 16)
            }
        };

        this.weatherData = fallbackData;
        this.updateWeatherDisplay(fallbackData);
        console.log('🔄 Using fallback weather data');
    }

    updateWeatherDisplay(data) {
        const current = data.current;
        
        const mainTempElement = document.getElementById('main-temperature');
        if (mainTempElement) mainTempElement.textContent = Math.round(current.temp_c);
        
        const highTempElement = document.getElementById('high-temp');
        if (highTempElement) highTempElement.textContent = `${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°C`;
        
        const lowTempElement = document.getElementById('low-temp');
        if (lowTempElement) lowTempElement.textContent = `${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°C`;
        
        const feelsLikeValue = document.getElementById('feels-like-value');
        if (feelsLikeValue) {
            feelsLikeValue.textContent = `${Math.round(current.feelslike_c)}°C`;
        }
        
        this.updateWeatherIcon(current.condition.code, current.is_day);
        
        const windSpeedElement = document.getElementById('wind-speed');
        if (windSpeedElement) windSpeedElement.textContent = `${Math.round(current.wind_kph)} km/h`;
        
        const windDirectionElement = document.getElementById('wind-direction');
        if (windDirectionElement) windDirectionElement.textContent = current.wind_dir;
        
        const humidityElement = document.getElementById('humidity');
        if (humidityElement) humidityElement.textContent = `${current.humidity}%`;
        
        const visibilityElement = document.getElementById('visibility');
        if (visibilityElement) visibilityElement.textContent = `${current.vis_km} km`;
        
        const pressureElement = document.getElementById('pressure');
        if (pressureElement) pressureElement.textContent = `${Math.round(current.pressure_mb)} mb`;
        
        const uvIndexElement = document.getElementById('uv-index');
        if (uvIndexElement) uvIndexElement.textContent = current.uv;
        
        const uvDescriptionElement = document.getElementById('uv-description');
        if (uvDescriptionElement) uvDescriptionElement.textContent = this.getUVDescription(current.uv);
        
        const cloudCoverElement = document.getElementById('cloud-cover');
        if (cloudCoverElement) cloudCoverElement.textContent = `${current.cloud}%`;
        
        if (data.forecast.forecastday[0].astro) {
            const sunriseElement = document.getElementById('sunrise');
            if (sunriseElement) sunriseElement.textContent = data.forecast.forecastday[0].astro.sunrise;
            
            const sunsetElement = document.getElementById('sunset');
            if (sunsetElement) sunsetElement.textContent = data.forecast.forecastday[0].astro.sunset;
            
            const moonPhaseElement = document.getElementById('moon-phase');
            if (moonPhaseElement) moonPhaseElement.textContent = data.forecast.forecastday[0].astro.moon_phase;
        }
        
        const dewpointElement = document.getElementById('dewpoint');
        if (dewpointElement) dewpointElement.textContent = `${Math.round(current.dewpoint_c || 15)}°C`;
        
        this.updateHourlyForecast(data.forecast.forecastday);
        this.updateDailyForecast(data.forecast.forecastday);
        this.updateMapPopup(current);
        
        console.log('✅ Weather display updated successfully');
    }

    updateWeatherIcon(conditionCode, isDay) {
        const iconElement = document.getElementById('main-weather-icon');
        if (!iconElement) return;
        
        const weatherSymbol = this.getWeatherSymbol(conditionCode, isDay);
        
        iconElement.innerHTML = '';
        iconElement.textContent = weatherSymbol;
        iconElement.className = 'weather-icon-standalone premium-weather-symbol';
        
        if (conditionCode === 1000) {
            iconElement.classList.add(isDay ? 'sunny-day' : 'clear-night');
        } else if ([1003, 1006, 1009].includes(conditionCode)) {
            iconElement.classList.add('cloudy-weather');
        } else if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) {
            iconElement.classList.add('rainy-weather');
        } else if ([1066, 1069, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(conditionCode)) {
            iconElement.classList.add('snowy-weather');
        } else if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
            iconElement.classList.add('stormy-weather');
        } else if ([1030, 1135, 1147].includes(conditionCode)) {
            iconElement.classList.add('misty-weather');
        }
    }

    getWeatherSymbol(code, isDay) {
        const weatherInfo = this.weatherSymbols[code];
        if (weatherInfo) {
            return isDay ? weatherInfo.day : weatherInfo.night;
        }
        return isDay ? '☀️' : '🌙';
    }

    getUVDescription(uv) {
        if (uv <= 2) return 'Low';
        if (uv <= 5) return 'Moderate';
        if (uv <= 7) return 'High';
        if (uv <= 10) return 'Very High';
        return 'Extreme';
    }

    updateHourlyForecast(forecastDays) {
        const container = document.getElementById('hourly-forecast');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Get current time
        const now = new Date();
        const next24Hours = [];
        
        // Combine hourly data from all forecast days
        forecastDays.forEach(day => {
            if (day.hour) {
                day.hour.forEach(hour => {
                    const hourTime = new Date(hour.time);
                    // Only include hours from current time forward
                    if (hourTime >= now) {
                        next24Hours.push(hour);
                    }
                });
            }
        });
        
        // Sort by time and take first 24 hours
        next24Hours.sort((a, b) => new Date(a.time) - new Date(b.time));
        const hoursToShow = next24Hours.slice(0, 24);
        
        hoursToShow.forEach((hour, index) => {
            const time = new Date(hour.time);
            const hourElement = document.createElement('div');
            hourElement.className = 'hourly-item glass-forecast-item';
            
            const isDay = time.getHours() > 6 && time.getHours() < 20;
            const conditionCode = hour.condition?.code || 1000;
            const weatherSymbol = this.getWeatherSymbol(conditionCode, isDay);
            
            const hourString = time.getHours().toString().padStart(2, '0');
            const minuteString = time.getMinutes().toString().padStart(2, '0');
            
            // Mark current hour
            const isCurrentHour = Math.abs(time - now) < 3600000; // within 1 hour
            const currentClass = isCurrentHour ? ' current-hour' : '';
            
            // Add day indicator for tomorrow's hours
            const isToday = time.toDateString() === now.toDateString();
            const dayIndicator = !isToday ? `<div class="day-indicator">Tomorrow</div>` : '';
            
            hourElement.innerHTML = `
                ${dayIndicator}
                <div class="hourly-time${currentClass}">${hourString}:${minuteString}</div>
                <div class="hourly-weather-icon ultra-weather-symbol">${weatherSymbol}</div>
                <div class="hourly-temp glass-temp">${Math.round(hour.temp_c)}°</div>
                <div class="hourly-condition">${hour.condition?.text || 'Clear'}</div>
                <div class="hourly-details">
                    <span class="hourly-humidity">💧${hour.humidity}%</span>
                    <span class="hourly-wind">💨${Math.round(hour.wind_kph)}km/h</span>
                </div>
            `;
            
            container.appendChild(hourElement);
        });
        
        console.log(`✅ Updated hourly forecast with ${hoursToShow.length} hours from current time`);
    }

    updateDailyForecast(dailyData) {
        const container = document.getElementById('daily-forecast');
        if (!container) return;
        
        container.innerHTML = '';
        
        dailyData.slice(1, 8).forEach(day => {
            const date = new Date(day.date);
            const dayElement = document.createElement('div');
            dayElement.className = 'daily-item';
            
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const weatherSymbol = this.getWeatherSymbol(day.day.condition.code || 1000, true);
            
            dayElement.innerHTML = `
                <div class="daily-day">${dayName}</div>
                <div class="daily-weather-icon">${weatherSymbol}</div>
                <div class="daily-high-low">
                    <span class="daily-high">${Math.round(day.day.maxtemp_c)}°</span>
                    <span class="daily-low">${Math.round(day.day.mintemp_c)}°</span>
                </div>
                <div class="daily-condition">${day.day.condition.text}</div>
            `;
            
            container.appendChild(dayElement);
        });
    }

    updateMapPopup(current) {
        const popupElement = document.getElementById('popup-weather');
        if (popupElement) {
            const isDay = current.is_day === 1;
            const weatherSymbol = this.getWeatherSymbol(current.condition.code, isDay);
            
            popupElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
                    <span style="font-size: 1.8rem;">${weatherSymbol}</span>
                    <span style="font-size: 1.6rem; font-weight: 700; color: #1e40af;">${Math.round(current.temp_c)}°C</span>
                </div>
                <div style="margin-bottom: 6px; font-weight: 600; color: #374151;">
                    ${current.condition.text}
                </div>
                <div style="font-size: 0.9rem; color: #6b7280; line-height: 1.4;">
                    Feels like ${Math.round(current.feelslike_c)}°C<br>
                    Humidity: ${current.humidity}% | Wind: ${Math.round(current.wind_kph)} km/h
                </div>
            `;
        }
    }

    updateApiStatus(status, type) {
        const statusElement = document.getElementById('api-status');
        if (!statusElement) return;
        
        const dot = statusElement.querySelector('.status-dot');
        const text = statusElement.querySelector('.status-text');
        
        if (dot && text) {
            text.textContent = status;
            dot.className = `status-dot ${type}`;
        }
    }

    startUpdateCycles() {
        setInterval(() => {
            this.fetchWeatherData();
        }, 300000); // 5 minutes
        
        console.log('🔄 Update cycles started (5 minutes interval)');
    }
}

// Initialize Professional Split Weather Dashboard
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 DOM loaded, initializing Professional Split Weather...');
    try {
        const weatherApp = new ProfessionalSplitWeather();
        window.splitWeather = weatherApp;
        console.log('✅ Professional Split Weather initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing weather app:', error);
    }
});

// Handle window resize for map
window.addEventListener('resize', () => {
    setTimeout(() => {
        if (window.splitWeather && window.splitWeather.weatherMap) {
            window.splitWeather.weatherMap.invalidateSize();
        }
    }, 250);
});
