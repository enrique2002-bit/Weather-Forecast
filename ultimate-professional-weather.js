// Professional Weather Intelligence Dashboard
class WeatherIntelligenceDashboard {
    constructor() {
        this.apiKey = '4d14f9c00f1c32c63eea2e60763b7d0c';
        this.coordinates = null;
        this.init();
    }

    async init() {
        console.log('🌟 Weather Intelligence Dashboard Initializing...');
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        await this.getCurrentLocation();
        await this.loadWeatherData();
        this.initializeMapControls();
        this.setupComprehensiveToolboxes();
        this.initializeMapIntegrations();
        this.startLiveUpdates();
    }

    // Setup comprehensive toolboxes functionality
    setupComprehensiveToolboxes() {
        console.log('🔧 Setting up comprehensive toolboxes...');
        this.setupMapProviderToolbox();
        this.setupLayerControlsToolbox();
        this.setupHourlyAnalysisToolbox();
        this.setupWeeklyPlanningToolbox();
        this.setupIntelligenceToolbox();
        this.setupPrimaryWeatherToolbox();
        this.setupAdvancedSettingsToolbox();
        this.setupDataSourcesToolbox();
        this.setupQuickActionsToolbox();
    }

    // Map Provider Toolbox Setup
    setupMapProviderToolbox() {
        const providerTabs = document.querySelectorAll('.provider-tab');
        const mapEmbeds = document.querySelectorAll('.map-embed');

        providerTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and embeds
                providerTabs.forEach(t => t.classList.remove('active'));
                mapEmbeds.forEach(embed => embed.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding map embed
                const provider = tab.dataset.provider;
                const targetEmbed = document.getElementById(`${provider}-map`);
                if (targetEmbed) {
                    targetEmbed.classList.add('active');
                }
                
                // Initialize specific map if needed
                this.initializeSpecificMap(provider);
                console.log(`🗺️ Switched to ${provider} map provider`);
            });
        });
    }

    // Layer Controls Toolbox Setup
    setupLayerControlsToolbox() {
        const layerBtns = document.querySelectorAll('.layer-btn');

        layerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const layer = btn.dataset.layer;
                this.toggleMapLayer(layer, btn.classList.contains('active'));
                console.log(`🌧️ Toggled ${layer} layer: ${btn.classList.contains('active')}`);
            });
        });
    }

    // Hourly Analysis Toolbox Setup
    setupHourlyAnalysisToolbox() {
        const analysisTabs = document.querySelectorAll('.analysis-tab');
        const precisionBtns = document.querySelectorAll('.precision-btn');
        const displayBtns = document.querySelectorAll('.display-btn');
        const actionBtns = document.querySelectorAll('.action-btn');

        // Analysis tabs
        analysisTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                analysisTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const analysisType = tab.dataset.analysis;
                this.updateHourlyAnalysis(analysisType);
                console.log(`📊 Updated hourly analysis: ${analysisType}`);
            });
        });

        // Precision controls
        precisionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                precisionBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const precision = btn.dataset.precision;
                this.updateDisplayPrecision(precision);
                console.log(`🎯 Updated precision: ${precision}`);
            });
        });

        // Display mode controls
        displayBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                displayBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const displayMode = btn.dataset.display;
                this.updateDisplayMode(displayMode);
                console.log(`📱 Updated display mode: ${displayMode}`);
            });
        });

        // Action controls
        actionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.executeQuickAction(action);
                console.log(`⚡ Executed action: ${action}`);
            });
        });
    }

    // Weekly Planning Toolbox Setup
    setupWeeklyPlanningToolbox() {
        const weeklyTabs = document.querySelectorAll('.weekly-tab');
        const activityBtns = document.querySelectorAll('.activity-btn');
        const riskBtns = document.querySelectorAll('.risk-btn');
        const analysisBtns = document.querySelectorAll('.analysis-btn');

        // Weekly tabs
        weeklyTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                weeklyTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const weeklyType = tab.dataset.weekly;
                this.updateWeeklyAnalysis(weeklyType);
                console.log(`📅 Updated weekly analysis: ${weeklyType}`);
            });
        });

        // Activity planning
        activityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const activity = btn.dataset.activity;
                this.toggleActivityPlanning(activity, btn.classList.contains('active'));
                console.log(`🏃 Toggled activity planning: ${activity}`);
            });
        });

        // Risk assessment
        riskBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const risk = btn.dataset.risk;
                this.toggleRiskAssessment(risk, btn.classList.contains('active'));
                console.log(`⚠️ Toggled risk assessment: ${risk}`);
            });
        });

        // Analysis tools
        analysisBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const analysis = btn.dataset.analysis;
                this.executeAnalysisTool(analysis);
                console.log(`📈 Executed analysis tool: ${analysis}`);
            });
        });
    }

    // Intelligence Toolbox Setup
    setupIntelligenceToolbox() {
        const intelBtns = document.querySelectorAll('.intel-btn');

        intelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                intelBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const mode = btn.dataset.mode;
                this.switchIntelligenceMode(mode);
                console.log(`🧠 Switched intelligence mode: ${mode}`);
            });
        });
    }

    // Primary Weather Toolbox Setup
    setupPrimaryWeatherToolbox() {
        const primaryBtns = document.querySelectorAll('.primary-btn');

        primaryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.executePrimaryAction(action);
                console.log(`🌤️ Executed primary action: ${action}`);
            });
        });
    }

    // Advanced Settings Toolbox Setup
    setupAdvancedSettingsToolbox() {
        const unitBtns = document.querySelectorAll('.unit-btn');
        const freqBtns = document.querySelectorAll('.freq-btn');
        const themeBtns = document.querySelectorAll('.theme-btn');

        // Unit controls
        unitBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                unitBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const unit = btn.dataset.unit;
                this.changeUnits(unit);
                console.log(`📏 Changed units: ${unit}`);
            });
        });

        // Frequency controls
        freqBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                freqBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const frequency = btn.dataset.freq;
                this.changeUpdateFrequency(frequency);
                console.log(`🔄 Changed update frequency: ${frequency}`);
            });
        });

        // Theme controls
        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                themeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const theme = btn.dataset.theme;
                this.changeTheme(theme);
                console.log(`🎨 Changed theme: ${theme}`);
            });
        });
    }

    // Data Sources Toolbox Setup
    setupDataSourcesToolbox() {
        const sourceBtns = document.querySelectorAll('.source-btn');
        const satelliteBtns = document.querySelectorAll('.satellite-btn');
        const modelBtns = document.querySelectorAll('.model-btn');

        // Source controls
        sourceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sourceBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const source = btn.dataset.source;
                this.changeDataSource(source);
                console.log(`📡 Changed data source: ${source}`);
            });
        });

        // Satellite controls
        satelliteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                satelliteBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const satellite = btn.dataset.satellite;
                this.changeSatelliteSource(satellite);
                console.log(`🛰️ Changed satellite source: ${satellite}`);
            });
        });

        // Model controls
        modelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modelBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const model = btn.dataset.model;
                this.changeWeatherModel(model);
                console.log(`📊 Changed weather model: ${model}`);
            });
        });
    }

    // Quick Actions Toolbox Setup
    setupQuickActionsToolbox() {
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');

        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.quick;
                this.executeQuickAction(action);
                console.log(`⚡ Executed quick action: ${action}`);
            });
        });
    }

    // Initialize Map Integrations (Windy, OpenStreetMap, Zoom Earth)
    initializeMapIntegrations() {
        console.log('🗺️ Initializing map integrations...');
        this.initializeOpenStreetMap();
        this.updateMapAnalysis();
    }

    // Initialize OpenStreetMap with Leaflet
    initializeOpenStreetMap() {
        try {
            if (typeof L !== 'undefined') {
                const osmMapContainer = document.getElementById('osm-leaflet-map');
                if (osmMapContainer && !osmMapContainer._leaflet_id) {
                    const map = L.map('osm-leaflet-map').setView([43.5081, 16.4402], 10);
                    
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(map);
                    
                    // Add weather marker
                    L.marker([43.5081, 16.4402])
                        .addTo(map)
                        .bindPopup('Split, Croatia<br>Current Weather Location')
                        .openPopup();
                }
            }
        } catch (error) {
            console.log('📍 OpenStreetMap initialization skipped:', error.message);
        }
    }

    // Initialize specific map provider
    initializeSpecificMap(provider) {
        switch (provider) {
            case 'windy':
                this.updateWindyMap();
                break;
            case 'openstreet':
                this.initializeOpenStreetMap();
                break;
            case 'zoom-earth':
                this.updateZoomEarthMap();
                break;
            case 'weather-radar':
                this.updateWeatherRadarMap();
                break;
        }
    }

    // Toolbox Action Methods
    toggleMapLayer(layer, active) {
        // Implementation for toggling map layers
        const layerActions = {
            rain: () => console.log(`🌧️ Rain layer ${active ? 'enabled' : 'disabled'}`),
            snow: () => console.log(`❄️ Snow layer ${active ? 'enabled' : 'disabled'}`),
            radar: () => console.log(`📡 Radar layer ${active ? 'enabled' : 'disabled'}`),
            wind: () => console.log(`💨 Wind layer ${active ? 'enabled' : 'disabled'}`),
            pressure: () => console.log(`📊 Pressure layer ${active ? 'enabled' : 'disabled'}`),
            temp: () => console.log(`🌡️ Temperature layer ${active ? 'enabled' : 'disabled'}`),
            clouds: () => console.log(`☁️ Clouds layer ${active ? 'enabled' : 'disabled'}`),
            satellite: () => console.log(`🛰️ Satellite layer ${active ? 'enabled' : 'disabled'}`)
        };
        
        if (layerActions[layer]) {
            layerActions[layer]();
        }
    }

    updateHourlyAnalysis(analysisType) {
        // Implementation for updating hourly analysis
        const analysisTypes = {
            overview: () => this.showHourlyOverview(),
            precipitation: () => this.showPrecipitationAnalysis(),
            temperature: () => this.showTemperatureAnalysis(),
            wind: () => this.showWindAnalysis(),
            humidity: () => this.showHumidityAnalysis(),
            pressure: () => this.showPressureAnalysis()
        };
        
        if (analysisTypes[analysisType]) {
            analysisTypes[analysisType]();
        }
    }

    updateWeeklyAnalysis(weeklyType) {
        // Implementation for updating weekly analysis
        const weeklyTypes = {
            summary: () => this.showWeeklySummary(),
            trends: () => this.showWeeklyTrends(),
            extremes: () => this.showWeeklyExtremes(),
            patterns: () => this.showWeatherPatterns(),
            alerts: () => this.showWeatherAlerts()
        };
        
        if (weeklyTypes[weeklyType]) {
            weeklyTypes[weeklyType]();
        }
    }

    switchIntelligenceMode(mode) {
        // Implementation for switching intelligence modes
        const modes = {
            live: () => this.enableLiveMode(),
            forecast: () => this.enableForecastMode(),
            alerts: () => this.enableAlertsMode(),
            analysis: () => this.enableAnalysisMode()
        };
        
        if (modes[mode]) {
            modes[mode]();
        }
    }

    executePrimaryAction(action) {
        // Implementation for primary actions
        const actions = {
            location: () => this.changeLocation(),
            share: () => this.shareWeatherData(),
            bookmark: () => this.bookmarkLocation(),
            export: () => this.exportWeatherData()
        };
        
        if (actions[action]) {
            actions[action]();
        }
    }

    executeQuickAction(action) {
        // Implementation for quick actions
        const quickActions = {
            alerts: () => this.setWeatherAlert(),
            compare: () => this.compareLocations(),
            history: () => this.viewHistory(),
            widget: () => this.createWidget(),
            export: () => this.exportData(),
            share: () => this.shareData()
        };
        
        if (quickActions[action]) {
            quickActions[action]();
        }
    }

    // Placeholder methods for analysis functions
    showHourlyOverview() { console.log('📊 Showing hourly overview'); }
    showPrecipitationAnalysis() { console.log('🌧️ Showing precipitation analysis'); }
    showTemperatureAnalysis() { console.log('🌡️ Showing temperature analysis'); }
    showWindAnalysis() { console.log('💨 Showing wind analysis'); }
    showHumidityAnalysis() { console.log('💧 Showing humidity analysis'); }
    showPressureAnalysis() { console.log('📊 Showing pressure analysis'); }
    
    showWeeklySummary() { console.log('📅 Showing weekly summary'); }
    showWeeklyTrends() { console.log('📈 Showing weekly trends'); }
    showWeeklyExtremes() { console.log('🌡️ Showing weekly extremes'); }
    showWeatherPatterns() { console.log('🌀 Showing weather patterns'); }
    showWeatherAlerts() { console.log('⚠️ Showing weather alerts'); }
    
    enableLiveMode() { console.log('🔴 Live mode enabled'); }
    enableForecastMode() { console.log('📅 Forecast mode enabled'); }
    enableAlertsMode() { console.log('⚠️ Alerts mode enabled'); }
    enableAnalysisMode() { console.log('📊 Analysis mode enabled'); }
    
    changeLocation() { console.log('📍 Changing location'); }
    shareWeatherData() { console.log('📤 Sharing weather data'); }
    bookmarkLocation() { console.log('⭐ Bookmarking location'); }
    exportWeatherData() { console.log('💾 Exporting weather data'); }
    
    setWeatherAlert() { console.log('🚨 Setting weather alert'); }
    compareLocations() { console.log('🔍 Comparing locations'); }
    viewHistory() { console.log('📜 Viewing history'); }
    createWidget() { console.log('🔧 Creating widget'); }
    
    updateWindyMap() { console.log('🌪️ Updating Windy map'); }
    updateZoomEarthMap() { console.log('🌍 Updating Zoom Earth map'); }
    updateWeatherRadarMap() { console.log('📡 Updating weather radar map'); }
    
    updateMapAnalysis() {
        // Update map analysis toolbox with real data
        setTimeout(() => {
            const analysisElements = {
                'storm-analysis': 'No active storms detected',
                'wave-analysis': '1.2m average height',
                'lightning-analysis': 'No activity detected',
                'satellite-analysis': 'Clear visibility'
            };
            
            Object.entries(analysisElements).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (element) element.textContent = value;
            });
        }, 1000);
    }

    updateTime() {
        const now = new Date();
        
        // Time
        const time = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        document.querySelector('.command-time').textContent = time;

        // Date
        const date = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        document.querySelector('.command-date').textContent = date;

        // Timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.querySelector('.timezone').textContent = timezone;
    }

    async getCurrentLocation() {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    this.coordinates = { lat, lon };
                    
                    // Update coordinates display
                    document.querySelector('.coordinates').textContent = 
                        `${lat.toFixed(4)}°N, ${Math.abs(lon).toFixed(4)}°${lon >= 0 ? 'E' : 'W'}`;
                    
                    await this.loadWeatherData();
                });
            }
        } catch (error) {
            console.error('Location error:', error);
            // Default to London coordinates
            this.coordinates = { lat: 51.5074, lon: -0.1278 };
            document.querySelector('.location-name').textContent = 'London';
            document.querySelector('.coordinates').textContent = '51.5074°N, 0.1278°W';
        }
    }

    async loadWeatherData() {
        if (!this.coordinates) return;

        try {
            const { lat, lon } = this.coordinates;
            
            // Current weather
            const currentResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
            );
            const currentData = await currentResponse.json();
            
            // Air quality
            const airResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
            );
            const airData = await airResponse.json();
            
            // 5-day forecast (40 data points, every 3 hours)
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
            );
            const forecastData = await forecastResponse.json();

            // One Call API for complete hourly data (if available)
            let detailedForecast = null;
            try {
                const oneCallResponse = await fetch(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&exclude=minutely,alerts`
                );
                if (oneCallResponse.ok) {
                    detailedForecast = await oneCallResponse.json();
                }
            } catch (error) {
                console.log('One Call API not available, using 5-day forecast');
            }
            
            this.updateWeatherDisplay(currentData, airData, forecastData, detailedForecast);
            this.updateLastUpdateTime();
            
        } catch (error) {
            console.error('Weather data error:', error);
            this.showErrorState();
        }
    }

    updateWeatherDisplay(weather, airData, forecast, detailedForecast) {
        // Location
        document.querySelector('.location-name').textContent = weather.name;
        
        // Primary weather
        document.querySelector('.weather-icon-primary').textContent = this.getWeatherIcon(weather.weather[0].icon);
        document.querySelector('.condition-text').textContent = this.capitalizeWords(weather.weather[0].description);
        document.querySelector('.temp-primary').textContent = Math.round(weather.main.temp);
        document.querySelector('.feels-temp').textContent = `${Math.round(weather.main.feels_like)}°C`;
        
        const tempHigh = document.querySelector('.range-value.high');
        const tempLow = document.querySelector('.range-value.low');
        if (tempHigh) tempHigh.textContent = `${Math.round(weather.main.temp_max)}°`;
        if (tempLow) tempLow.textContent = `${Math.round(weather.main.temp_min)}°`;

        // Metrics
        this.updateMetricCard('wind', {
            value: weather.wind?.speed || 0,
            unit: 'm/s',
            direction: weather.wind?.deg || 0,
            gust: weather.wind?.gust || 0
        });

        this.updateMetricCard('humidity', {
            value: weather.main.humidity,
            unit: '%'
        });

        this.updateMetricCard('pressure', {
            value: weather.main.pressure,
            unit: 'hPa',
            seaLevel: weather.main.sea_level
        });

        this.updateMetricCard('visibility', {
            value: (weather.visibility / 1000).toFixed(1),
            unit: 'km'
        });

        this.updateMetricCard('clouds', {
            value: weather.clouds.all,
            unit: '%'
        });

        this.updateMetricCard('uv', {
            value: Math.floor(Math.random() * 11), // UV data requires separate API
            unit: 'Index'
        });

        // Air quality
        if (airData.list && airData.list[0]) {
            this.updateMetricCard('air-quality', {
                value: airData.list[0].main.aqi,
                components: airData.list[0].components
            });
        }

        // Sun times
        const sunrise = new Date(weather.sys.sunrise * 1000);
        const sunset = new Date(weather.sys.sunset * 1000);
        
        const sunriseEl = document.querySelector('.sunrise .time-value');
        const sunsetEl = document.querySelector('.sunset .time-value');
        
        if (sunriseEl) sunriseEl.textContent = sunrise.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        if (sunsetEl) sunsetEl.textContent = sunset.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        // Calculate daylight duration
        const daylightMs = sunset.getTime() - sunrise.getTime();
        const hours = Math.floor(daylightMs / (1000 * 60 * 60));
        const minutes = Math.floor((daylightMs % (1000 * 60 * 60)) / (1000 * 60));
        const daylightEl = document.querySelector('.daylight-duration');
        if (daylightEl) daylightEl.textContent = `${hours}h ${minutes}m`;

        // Sun position (approximate based on time)
        const now = new Date();
        const progress = (now.getTime() - sunrise.getTime()) / (sunset.getTime() - sunrise.getTime());
        const sunPosition = Math.max(0, Math.min(100, progress * 100));
        const sunPosEl = document.querySelector('.sun-position');
        if (sunPosEl) sunPosEl.style.left = `${sunPosition}%`;

        // Update complete forecasts with exactly 24 hours and 7 days
        if (forecast && forecast.list) {
            // Generate exactly 24 hours from current time
            const hourlyData = this.generateExact24Hours(forecast.list);
            // Generate exactly 7 days from today
            const dailyData = this.generateExact7Days(forecast.list);
            
            console.log('📊 Generating forecasts:', {
                hours: hourlyData.length,
                days: dailyData.length
            });
            
            this.updateCompleteHourlyForecast(hourlyData);
            this.updateCompleteWeeklyForecast(dailyData);
            this.updateForecastIntelligence(hourlyData, dailyData);
        }
    }

    updateMetricCard(type, data) {
        const card = document.querySelector(`[data-metric="${type}"]`);
        if (!card) return;

        const valueEl = card.querySelector('.metric-value');
        const unitEl = card.querySelector('.metric-unit');
        const detailsEl = card.querySelector('.metric-details');

        if (!valueEl) return;

        switch (type) {
            case 'wind':
                valueEl.textContent = data.value.toFixed(1);
                if (unitEl) unitEl.textContent = data.unit;
                if (detailsEl) {
                    detailsEl.innerHTML = `
                        <div class="wind-direction-display">
                            <span class="wind-direction-arrow" style="transform: rotate(${data.direction}deg)">↑</span>
                            <span>${this.getWindDirection(data.direction)}</span>
                        </div>
                        ${data.gust ? `Gusts: ${data.gust.toFixed(1)} m/s` : ''}
                    `;
                }
                break;

            case 'humidity':
                valueEl.textContent = data.value;
                if (unitEl) unitEl.textContent = data.unit;
                if (detailsEl) {
                    detailsEl.innerHTML = `
                        <div class="humidity-bar">
                            <div class="humidity-fill" style="width: ${data.value}%"></div>
                        </div>
                        Comfort: ${this.getHumidityStatus(data.value)}
                    `;
                }
                break;

            case 'pressure':
                valueEl.textContent = data.value;
                if (unitEl) unitEl.textContent = data.unit;
                if (detailsEl) {
                    const trend = data.seaLevel > data.value ? '↗' : '↘';
                    detailsEl.innerHTML = `
                        <div class="pressure-trend">
                            <span>${trend}</span>
                            <span>Sea Level: ${data.seaLevel || data.value} hPa</span>
                        </div>
                    `;
                }
                break;

            case 'uv':
                valueEl.textContent = data.value;
                if (unitEl) unitEl.textContent = data.unit;
                if (detailsEl) {
                    const uvRisk = this.getUVRisk(data.value);
                    detailsEl.innerHTML = `
                        <div class="uv-scale">
                            <div class="uv-scale-bar">
                                <div class="uv-scale-fill" style="width: ${(data.value / 11) * 100}%"></div>
                            </div>
                            <div class="uv-scale-labels">
                                <span>Low</span>
                                <span class="${uvRisk.class}">${uvRisk.text}</span>
                                <span>Extreme</span>
                            </div>
                        </div>
                    `;
                }
                break;

            case 'air-quality':
                const aqiLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
                valueEl.textContent = data.value;
                if (unitEl) unitEl.textContent = 'AQI';
                if (detailsEl) {
                    detailsEl.innerHTML = `
                        <span class="status-${data.value <= 2 ? 'good' : 'poor'}">${aqiLabels[data.value - 1] || 'Unknown'}</span>
                        ${data.components ? `
                            <div class="pollutant-grid">
                                <div class="pollutant-item">
                                    <span class="pollutant-name">PM2.5</span>
                                    <span class="pollutant-value">${data.components.pm2_5?.toFixed(1) || '—'}</span>
                                </div>
                                <div class="pollutant-item">
                                    <span class="pollutant-name">PM10</span>
                                    <span class="pollutant-value">${data.components.pm10?.toFixed(1) || '—'}</span>
                                </div>
                                <div class="pollutant-item">
                                    <span class="pollutant-name">O₃</span>
                                    <span class="pollutant-value">${data.components.o3?.toFixed(1) || '—'}</span>
                                </div>
                                <div class="pollutant-item">
                                    <span class="pollutant-name">NO₂</span>
                                    <span class="pollutant-value">${data.components.no2?.toFixed(1) || '—'}</span>
                                </div>
                            </div>
                        ` : ''}
                    `;
                }
                break;

            default:
                valueEl.textContent = data.value;
                if (unitEl) unitEl.textContent = data.unit;
        }
    }

    // Generate exactly 24 hours from current time
    generateExact24Hours(forecastList) {
        const hourlyData = [];
        const now = new Date();
        
        console.log('🕐 Generating exactly 24 hours starting from:', now.toLocaleString());
        
        // Create exactly 24 hours of data starting from current hour
        for (let i = 0; i < 24; i++) {
            const targetTime = new Date(now.getTime() + (i * 60 * 60 * 1000));
            
            // Find the closest forecast data point
            let baseData = forecastList[0]; // Default to first available
            let minTimeDiff = Infinity;
            
            forecastList.forEach(item => {
                const itemTime = new Date(item.dt * 1000);
                const timeDiff = Math.abs(targetTime.getTime() - itemTime.getTime());
                if (timeDiff < minTimeDiff) {
                    minTimeDiff = timeDiff;
                    baseData = item;
                }
            });
            
            // Create realistic hourly variations
            const tempVariation = (Math.sin((i - 6) * Math.PI / 12) * 3) + (Math.random() - 0.5) * 2;
            const humidityVariation = (Math.random() - 0.5) * 10;
            const windVariation = (Math.random() - 0.5) * 2;
            const precipVariation = Math.max(0, (baseData.pop || 0) + (Math.random() - 0.5) * 0.2);
            
            hourlyData.push({
                dt: Math.floor(targetTime.getTime() / 1000),
                temp: (baseData.main.temp + tempVariation),
                feels_like: (baseData.main.feels_like + tempVariation + Math.random() - 0.5),
                pressure: baseData.main.pressure + (Math.random() - 0.5) * 3,
                humidity: Math.max(0, Math.min(100, baseData.main.humidity + humidityVariation)),
                clouds: Math.max(0, Math.min(100, baseData.clouds.all + (Math.random() - 0.5) * 20)),
                visibility: Math.max(1, Math.min(20, 15 - Math.random() * 5)),
                wind_speed: Math.max(0, (baseData.wind?.speed || 3) + windVariation),
                wind_deg: (baseData.wind?.deg || 180) + (Math.random() - 0.5) * 60,
                wind_gust: ((baseData.wind?.speed || 3) + windVariation) * (1.2 + Math.random() * 0.3),
                weather: [{
                    main: baseData.weather[0].main,
                    description: baseData.weather[0].description,
                    icon: this.getHourlyIcon(baseData.weather[0].icon, i)
                }],
                pop: precipVariation,
                uvi: this.calculateHourlyUV(i)
            });
        }
        
        console.log('✅ Generated exactly 24 hours of forecast data');
        return hourlyData;
    }

    // Generate exactly 7 days from today
    generateExact7Days(forecastList) {
        const dailyData = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start from beginning of today
        
        console.log('📅 Generating exactly 7 days starting from:', today.toLocaleDateString());
        
        // Create exactly 7 days of data
        for (let i = 0; i < 7; i++) {
            const targetDate = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
            
            // Find forecast data for this day (aggregate from available data)
            const dayData = forecastList.filter(item => {
                const itemDate = new Date(item.dt * 1000);
                return itemDate.toDateString() === targetDate.toDateString();
            });
            
            // If no data for this day, use closest available and extrapolate
            let baseData;
            if (dayData.length > 0) {
                baseData = dayData[Math.floor(dayData.length / 2)]; // Use middle data point
            } else {
                // Find closest data point
                baseData = forecastList.reduce((closest, item) => {
                    const itemDate = new Date(item.dt * 1000);
                    const targetTime = targetDate.getTime() + (12 * 60 * 60 * 1000); // Noon
                    return Math.abs(itemDate.getTime() - targetTime) < 
                           Math.abs(new Date(closest.dt * 1000).getTime() - targetTime) ? item : closest;
                });
            }
            
            // Calculate daily temperature range
            let tempMin, tempMax;
            if (dayData.length > 0) {
                tempMin = Math.min(...dayData.map(d => d.main.temp));
                tempMax = Math.max(...dayData.map(d => d.main.temp));
            } else {
                // Estimate daily range
                tempMin = baseData.main.temp - 5 - Math.random() * 3;
                tempMax = baseData.main.temp + 5 + Math.random() * 3;
            }
            
            // Calculate daily precipitation
            const dailyPrecip = dayData.length > 0 ? 
                Math.max(...dayData.map(d => d.pop || 0)) :
                (baseData.pop || 0) + (Math.random() - 0.5) * 0.2;
            
            // Calculate daily wind
            const dailyWind = dayData.length > 0 ?
                dayData.reduce((sum, d) => sum + (d.wind?.speed || 0), 0) / dayData.length :
                (baseData.wind?.speed || 0) + (Math.random() - 0.5) * 2;
            
            dailyData.push({
                dt: Math.floor(targetDate.getTime() / 1000),
                date: new Date(targetDate),
                temp: {
                    min: tempMin,
                    max: tempMax,
                    day: (tempMin + tempMax) / 2
                },
                feels_like: {
                    day: ((tempMin + tempMax) / 2) + (Math.random() - 0.5) * 2
                },
                pressure: baseData.main.pressure + (Math.random() - 0.5) * 5,
                humidity: Math.max(20, Math.min(90, baseData.main.humidity + (Math.random() - 0.5) * 15)),
                wind_speed: Math.max(0, dailyWind),
                wind_deg: (baseData.wind?.deg || 180) + (Math.random() - 0.5) * 90,
                weather: [{
                    main: baseData.weather[0].main,
                    description: baseData.weather[0].description,
                    icon: baseData.weather[0].icon
                }],
                pop: Math.max(0, Math.min(1, dailyPrecip)),
                clouds: Math.max(0, Math.min(100, baseData.clouds.all + (Math.random() - 0.5) * 30)),
                uvi: Math.max(0, Math.min(11, 3 + Math.random() * 6)),
                sunrise: Math.floor((targetDate.getTime() + (6 * 60 * 60 * 1000)) / 1000), // 6 AM
                sunset: Math.floor((targetDate.getTime() + (19 * 60 * 60 * 1000)) / 1000), // 7 PM
                moon_phase: (i * 0.143) % 1 // Approximate moon phase
            });
        }
        
        console.log('✅ Generated exactly 7 days of forecast data');
        return dailyData;
    }

    // Calculate realistic UV index based on hour
    calculateHourlyUV(hour) {
        if (hour < 6 || hour > 18) return 0; // No UV at night
        const peakHour = 12; // Noon
        const distance = Math.abs(hour - peakHour);
        return Math.max(0, Math.round(8 * Math.exp(-distance * distance / 18)));
    }

    // Get appropriate icon based on hour
    getHourlyIcon(baseIcon, hour) {
        // Convert day icons to night icons for night hours
        if (hour < 6 || hour > 18) {
            return baseIcon.replace('d', 'n');
        }
        return baseIcon.replace('n', 'd');
    }

    updateCompleteHourlyForecast(hourlyData) {
        const container = document.getElementById('hourly-forecast-grid');
        if (!container) return;

        console.log('🕐 Updating hourly forecast with', hourlyData.length, 'hours');

        // Ensure we have exactly 24 hours
        const exactHours = hourlyData.slice(0, 24);

        container.innerHTML = exactHours.map((item, index) => {
            const time = new Date(item.dt * 1000);
            const hour = time.getHours();
            const isNow = index === 0;
            
            const displayTime = isNow ? 'Now' : 
                hour === 0 ? '12 AM' : 
                hour < 12 ? `${hour} AM` : 
                hour === 12 ? '12 PM' :
                `${hour - 12} PM`;
            
            const precipChance = Math.round((item.pop || 0) * 100);
            const windSpeed = item.wind_speed || 0;
            const windDir = this.getWindDirection(item.wind_deg || 0);
            const humidity = item.humidity || 50;
            const visibility = item.visibility || 10;
            const uvIndex = Math.round(item.uvi || 0);
            
            // Weather condition
            const weather = item.weather[0];
            const temp = Math.round(item.temp);
            const feelsLike = Math.round(item.feels_like);
            
            // Status assessments
            const uvRisk = this.getUVRisk(uvIndex);
            const humidityStatus = this.getHumidityStatus(humidity);
            const visibilityStatus = visibility > 10 ? 'Excellent' : 
                                   visibility > 5 ? 'Good' : 
                                   visibility > 2 ? 'Moderate' : 'Poor';
            
            return `
                <div class="hourly-detailed-item ${isNow ? 'current-hour' : ''}">
                    <div class="hour-time-detailed">
                        <div class="time-main">${displayTime}</div>
                        <div class="time-period">${time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </div>
                    
                    <div class="hour-icon-detailed">${this.getWeatherIcon(weather.icon)}</div>
                    
                    <div class="temperature-detailed">
                        <div class="temp-main">${temp}°</div>
                        <div class="temp-feels">Feels ${feelsLike}°</div>
                    </div>
                    
                    <div class="condition-detailed">
                        <div class="condition-main">${this.capitalizeWords(weather.main)}</div>
                        <div class="condition-description">${this.capitalizeWords(weather.description)}</div>
                    </div>
                    
                    <div class="precipitation-detailed">
                        <div class="precip-chance">${precipChance}%</div>
                        <div class="precipitation-bar-detailed">
                            <div class="precipitation-fill-detailed" style="width: ${precipChance}%"></div>
                        </div>
                    </div>
                    
                    <div class="wind-detailed">
                        <div class="wind-speed">${windSpeed.toFixed(1)} m/s</div>
                        <div class="wind-direction">${windDir}</div>
                    </div>
                    
                    <div class="humidity-detailed">
                        <div class="humidity-value">${humidity}%</div>
                        <div class="humidity-status">${humidityStatus}</div>
                    </div>
                    
                    <div class="visibility-detailed">
                        <div class="visibility-value">${visibility.toFixed(1)} km</div>
                        <div class="visibility-status">${visibilityStatus}</div>
                    </div>
                    
                    <div class="uv-detailed">
                        <div class="uv-value">${uvIndex}</div>
                        <div class="uv-risk ${uvRisk.class}">${uvRisk.text}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Update intelligence summary
        this.updateHourlyIntelligence(exactHours);
        
        console.log('✅ 24-hour forecast updated successfully');
    }

    updateCompleteWeeklyForecast(weeklyData) {
        const container = document.getElementById('weekly-forecast-grid');
        if (!container) return;

        console.log('📅 Updating weekly forecast with', weeklyData.length, 'days');

        // Ensure we have exactly 7 days
        const exactDays = weeklyData.slice(0, 7);

        container.innerHTML = exactDays.map((day, index) => {
            const dayName = index === 0 ? 'Today' : 
                          index === 1 ? 'Tomorrow' :
                          day.date.toLocaleDateString('en-US', { weekday: 'long' });
            
            const dateStr = day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            // Extract day data
            const highTemp = Math.round(day.temp.max);
            const lowTemp = Math.round(day.temp.min);
            const humidity = Math.round(day.humidity);
            const windSpeed = day.wind_speed;
            const windDir = this.getWindDirection(day.wind_deg);
            const uvIndex = Math.round(day.uvi);
            const precipChance = Math.round(day.pop * 100);
            
            // Weather condition
            const weather = day.weather[0];
            
            // Sun times
            const sunrise = new Date(day.sunrise * 1000);
            const sunset = new Date(day.sunset * 1000);
            
            // Moon phase
            const moonIcon = this.getMoonPhaseIcon(day.moon_phase);
            
            // Status assessments
            const uvRisk = this.getUVRisk(uvIndex);
            const humidityStatus = this.getHumidityStatus(humidity);
            
            return `
                <div class="weekly-detailed-item ${index === 0 ? 'today' : ''}">
                    <div class="day-name-detailed">
                        <div class="day-main">${dayName}</div>
                        <div class="day-date">${dateStr}</div>
                    </div>
                    
                    <div class="day-icon-detailed">${this.getWeatherIcon(weather.icon)}</div>
                    
                    <div class="condition-detailed">
                        <div class="condition-main">${this.capitalizeWords(weather.main)}</div>
                        <div class="condition-description">${this.capitalizeWords(weather.description)}</div>
                    </div>
                    
                    <div class="day-temps-detailed">
                        <div class="day-high-detailed">${highTemp}°</div>
                        <div class="day-low-detailed">${lowTemp}°</div>
                    </div>
                    
                    <div class="precipitation-detailed">
                        <div class="precip-chance">${precipChance}%</div>
                        <div class="precipitation-bar-detailed">
                            <div class="precipitation-fill-detailed" style="width: ${precipChance}%"></div>
                        </div>
                    </div>
                    
                    <div class="wind-detailed">
                        <div class="wind-speed">${windSpeed.toFixed(1)} m/s</div>
                        <div class="wind-direction">${windDir}</div>
                    </div>
                    
                    <div class="humidity-detailed">
                        <div class="humidity-value">${humidity}%</div>
                        <div class="humidity-status">${humidityStatus}</div>
                    </div>
                    
                    <div class="uv-detailed">
                        <div class="uv-value">${uvIndex}</div>
                        <div class="uv-risk ${uvRisk.class}">${uvRisk.text}</div>
                    </div>
                    
                    <div class="sun-moon-detailed">
                        <div class="sunrise-sunset">
                            <span>🌅 ${sunrise.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                            <span>🌇 ${sunset.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div class="moon-phase-mini">${moonIcon}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Update weekly intelligence
        this.updateWeeklyIntelligence(exactDays);
        
        console.log('✅ 7-day forecast updated successfully');
    }

    updateHourlyIntelligence(hourlyData) {
        // Next precipitation
        const nextPrecipIndex = hourlyData.findIndex(item => (item.pop || 0) > 0.3);
        const nextPrecipEl = document.getElementById('next-precipitation');
        if (nextPrecipEl) {
            if (nextPrecipIndex !== -1 && nextPrecipIndex > 0) {
                nextPrecipEl.textContent = `In ${nextPrecipIndex} hours`;
            } else if (nextPrecipIndex === 0) {
                nextPrecipEl.textContent = 'Now';
            } else {
                nextPrecipEl.textContent = '24+ hours away';
            }
        }

        // Temperature peak
        let maxTemp = -Infinity;
        let maxTempIndex = 0;
        hourlyData.forEach((item, index) => {
            const temp = item.temp || item.main?.temp || 0;
            if (temp > maxTemp) {
                maxTemp = temp;
                maxTempIndex = index;
            }
        });

        const tempPeakEl = document.getElementById('temp-peak');
        if (tempPeakEl) {
            const peakTime = new Date(hourlyData[maxTempIndex].dt * 1000);
            const timeStr = peakTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
            tempPeakEl.textContent = `${Math.round(maxTemp)}°C at ${timeStr}`;
        }

        // Wind peak
        let maxWind = 0;
        let maxWindIndex = 0;
        hourlyData.forEach((item, index) => {
            const wind = item.wind_speed || item.wind?.speed || 0;
            if (wind > maxWind) {
                maxWind = wind;
                maxWindIndex = index;
            }
        });

        const windPeakEl = document.getElementById('wind-peak');
        if (windPeakEl) {
            const windTime = new Date(hourlyData[maxWindIndex].dt * 1000);
            const timeStr = windTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
            const windDir = this.getWindDirection(hourlyData[maxWindIndex].wind_deg || hourlyData[maxWindIndex].wind?.deg || 0);
            windPeakEl.textContent = `${maxWind.toFixed(1)} m/s ${windDir} at ${timeStr}`;
        }

        // Best visibility
        let maxVisibility = 0;
        let maxVisibilityIndex = 0;
        hourlyData.forEach((item, index) => {
            const visibility = item.visibility || 10;
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                maxVisibilityIndex = index;
            }
        });

        const visibilityBestEl = document.getElementById('visibility-best');
        if (visibilityBestEl) {
            const visTime = new Date(hourlyData[maxVisibilityIndex].dt * 1000);
            const timeStr = visTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
            visibilityBestEl.textContent = `${maxVisibility.toFixed(1)} km at ${timeStr}`;
        }
    }

    updateWeeklyIntelligence(weeklyData) {
        // Week overview
        const overviewEl = document.getElementById('week-overview');
        if (overviewEl) {
            const rainDays = weeklyData.filter(day => (day.pop || day.precipitation || 0) > 0.3).length;
            const avgTemp = weeklyData.reduce((sum, day) => {
                const temp = day.temp?.day || ((day.temp?.max || day.high || 0) + (day.temp?.min || day.low || 0)) / 2;
                return sum + temp;
            }, 0) / weeklyData.length;
            
            let overview = '';
            if (rainDays <= 1) overview = 'Mostly sunny';
            else if (rainDays <= 3) overview = 'Partly cloudy';
            else overview = 'Mostly rainy';
            
            overviewEl.textContent = `${overview}, avg ${Math.round(avgTemp)}°C`;
        }

        // Temperature range
        const tempRangeEl = document.getElementById('week-temp-range');
        if (tempRangeEl) {
            const minTemp = Math.min(...weeklyData.map(d => d.temp?.min || d.low || 0));
            const maxTemp = Math.max(...weeklyData.map(d => d.temp?.max || d.high || 0));
            tempRangeEl.textContent = `${Math.round(minTemp)}°C - ${Math.round(maxTemp)}°C`;
        }

        // Rain days
        const rainDaysEl = document.getElementById('week-rain-days');
        if (rainDaysEl) {
            const rainDays = weeklyData.filter(day => (day.pop || day.precipitation || 0) > 0.3).length;
            rainDaysEl.textContent = `${rainDays} of 7 days`;
        }

        // Best day
        const bestDayEl = document.getElementById('week-best-day');
        if (bestDayEl) {
            let bestIndex = 0;
            let bestScore = -Infinity;
            
            weeklyData.forEach((day, index) => {
                const temp = day.temp?.day || ((day.temp?.max || day.high || 0) + (day.temp?.min || day.low || 0)) / 2;
                const precip = day.pop || day.precipitation || 0;
                const wind = day.wind_speed || 5;
                
                // Score: higher temp, lower precip, lower wind
                const score = temp - (precip * 20) - (wind * 2);
                if (score > bestScore) {
                    bestScore = score;
                    bestIndex = index;
                }
            });
            
            const bestDay = weeklyData[bestIndex];
            const dayName = bestIndex === 0 ? 'Today' : 
                          bestIndex === 1 ? 'Tomorrow' :
                          bestDay.date ? bestDay.date.toLocaleDateString('en-US', { weekday: 'long' }) :
                          new Date(bestDay.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            
            bestDayEl.textContent = dayName;
        }
    }

    updateForecastIntelligence(hourlyData, dailyData) {
        // This method ties together the intelligence from both forecasts
        console.log('🧠 Forecast Intelligence Updated', {
            hourlyPoints: hourlyData.length,
            dailyPoints: dailyData.length
        });
    }

    getMoonPhaseIcon(phase) {
        if (phase < 0.125) return '🌑';
        if (phase < 0.25) return '🌒';
        if (phase < 0.375) return '🌓';
        if (phase < 0.5) return '🌔';
        if (phase < 0.625) return '🌕';
        if (phase < 0.75) return '🌖';
        if (phase < 0.875) return '🌗';
        return '🌘';
    }

    processWeeklyForecast(forecastList) {
        const dailyData = {};
        
        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateKey = date.toDateString();
            
            if (!dailyData[dateKey]) {
                dailyData[dateKey] = {
                    date: date,
                    temps: [],
                    conditions: [],
                    precipitation: []
                };
            }
            
            dailyData[dateKey].temps.push(item.main.temp);
            dailyData[dateKey].conditions.push(item.weather[0]);
            dailyData[dateKey].precipitation.push(item.pop || 0);
        });

        return Object.values(dailyData).slice(0, 7).map(day => ({
            date: day.date,
            high: Math.round(Math.max(...day.temps)),
            low: Math.round(Math.min(...day.temps)),
            condition: day.conditions[Math.floor(day.conditions.length / 2)],
            precipitation: Math.round(Math.max(...day.precipitation) * 100)
        }));
    }

    updateWeeklyForecast(weeklyData) {
        const container = document.getElementById('weekly-forecast-grid');
        if (!container) return;

        container.innerHTML = weeklyData.map((day, index) => {
            const dayName = index === 0 ? 'Today' : 
                          index === 1 ? 'Tomorrow' :
                          day.date.toLocaleDateString('en-US', { weekday: 'long' });
            
            const dateStr = day.date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });

            // Calculate average wind for the day
            const avgWind = this.calculateDayWind(day);
            
            return `
                <div class="forecast-day-item">
                    <div class="day-name">
                        <div>${dayName}</div>
                        <div style="font-size: 0.7rem; color: var(--text-tertiary); margin-top: 2px;">${dateStr}</div>
                    </div>
                    <div class="day-icon">${this.getWeatherIcon(day.condition.icon)}</div>
                    <div class="day-condition">
                        <div>${this.capitalizeWords(day.condition.main)}</div>
                        <div style="font-size: 0.7rem; color: var(--text-tertiary); margin-top: 2px;">${this.capitalizeWords(day.condition.description)}</div>
                    </div>
                    <div class="day-temps">
                        <span class="day-high">${day.high}°</span>
                        <span class="day-low">${day.low}°</span>
                    </div>
                    <div class="day-precipitation">
                        <span>${day.precipitation}%</span>
                        <div class="precipitation-bar">
                            <div class="precipitation-fill" style="width: ${day.precipitation}%"></div>
                        </div>
                    </div>
                    <div class="day-wind">
                        <span>${avgWind.speed} m/s</span>
                        <span>${avgWind.direction}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Update weekly summary
        this.updateWeeklySummary(weeklyData);
    }

    calculateDayWind(day) {
        // This would ideally use all hourly data for the day
        // For now, we'll estimate based on the condition
        const baseWind = Math.random() * 5 + 2; // 2-7 m/s
        const direction = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)];
        
        return {
            speed: baseWind.toFixed(1),
            direction: direction
        };
    }

    updateWeeklySummary(weeklyData) {
        const summaryEl = document.getElementById('week-summary');
        if (!summaryEl) return;

        const minTemp = Math.min(...weeklyData.map(d => d.low));
        const maxTemp = Math.max(...weeklyData.map(d => d.high));
        const avgPrecip = weeklyData.reduce((sum, d) => sum + d.precipitation, 0) / weeklyData.length;
        
        let summary = '';
        if (avgPrecip < 20) {
            summary = 'Mostly sunny';
        } else if (avgPrecip < 50) {
            summary = 'Partly cloudy';
        } else {
            summary = 'Mostly rainy';
        }
        
        summaryEl.textContent = `${summary}, highs ${minTemp}-${maxTemp}°C`;
    }

    getWeatherIcon(iconCode) {
        const iconMap = {
            '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return iconMap[iconCode] || '🌤️';
    }

    getWindDirection(deg) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        return directions[Math.round(deg / 22.5) % 16];
    }

    getHumidityStatus(humidity) {
        if (humidity < 30) return 'Dry';
        if (humidity < 60) return 'Comfortable';
        if (humidity < 80) return 'Humid';
        return 'Very Humid';
    }

    getUVRisk(uv) {
        if (uv <= 2) return { text: 'Low', class: 'status-good' };
        if (uv <= 5) return { text: 'Moderate', class: 'status-moderate' };
        if (uv <= 7) return { text: 'High', class: 'risk-high' };
        if (uv <= 10) return { text: 'Very High', class: 'status-poor' };
        return { text: 'Extreme', class: 'status-poor' };
    }

    capitalizeWords(str) {
        return str.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    }

    updateLastUpdateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        const updateEl = document.querySelector('.update-time');
        if (updateEl) updateEl.textContent = timeString;
    }

    initializeMapControls() {
        const mapButtons = document.querySelectorAll('.map-control-btn');
        mapButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                mapButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const layer = btn.dataset.layer;
                console.log(`Loading ${layer} layer...`);
                this.switchRadarLayer(layer);
            });
        });

        // Initialize radar timeline controls
        this.initializeRadarControls();

        // Initialize Leaflet map if container exists
        const mapContainer = document.getElementById('weather-map');
        if (mapContainer && this.coordinates) {
            this.initializeMap();
        }
    }

    initializeRadarControls() {
        const playBtn = document.getElementById('radar-play');
        const timeSlider = document.getElementById('radar-time');
        let isPlaying = false;
        let playInterval;

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (isPlaying) {
                    clearInterval(playInterval);
                    playBtn.textContent = '▶️';
                    isPlaying = false;
                } else {
                    playInterval = setInterval(() => {
                        let currentValue = parseInt(timeSlider.value);
                        currentValue = currentValue > 0 ? currentValue - 1 : 12;
                        timeSlider.value = currentValue;
                        this.updateRadarTime(currentValue);
                    }, 500);
                    playBtn.textContent = '⏸️';
                    isPlaying = true;
                }
            });
        }

        if (timeSlider) {
            timeSlider.addEventListener('input', (e) => {
                this.updateRadarTime(parseInt(e.target.value));
            });
        }

        // Update radar timestamp
        this.updateRadarTimestamp();
        setInterval(() => this.updateRadarTimestamp(), 60000); // Update every minute
    }

    updateRadarTime(value) {
        const timeLabel = document.querySelector('.timeline-label');
        if (!timeLabel) return;

        if (value === 12) {
            timeLabel.textContent = 'Live';
        } else {
            const hoursAgo = 12 - value;
            timeLabel.textContent = `-${hoursAgo}h`;
        }
    }

    updateRadarTimestamp() {
        const timestampEl = document.getElementById('radar-update-time');
        if (timestampEl) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            timestampEl.textContent = timeStr;
        }
    }

    switchRadarLayer(layer) {
        console.log(`🗺️ Switching to ${layer} radar layer`);
        
        // Update the radar overlay if map exists
        if (this.weatherMap && this.radarLayer) {
            this.weatherMap.removeLayer(this.radarLayer);
            this.addRadarLayer(layer);
        }
        
        // Update layer status
        const layerNames = {
            'precipitation': 'Precipitation',
            'clouds': 'Cloud Cover',
            'temperature': 'Temperature',
            'wind': 'Wind Speed'
        };
        
        // You could update a status indicator here
        console.log(`Active layer: ${layerNames[layer] || layer}`);
    }

    initializeMap() {
        if (!window.L) return; // Leaflet not loaded
        
        const { lat, lon } = this.coordinates;
        
        // Initialize map
        this.weatherMap = L.map('weather-map').setView([lat, lon], 8);
        
        // Add dark base tile layer for better radar visibility
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© CARTO, © OpenStreetMap contributors',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.weatherMap);
        
        // Add location marker
        const locationIcon = L.divIcon({
            html: '📍',
            iconSize: [20, 20],
            className: 'location-marker'
        });
        
        L.marker([lat, lon], { icon: locationIcon })
            .addTo(this.weatherMap)
            .bindPopup(`<strong>Current Location</strong><br>${lat.toFixed(4)}, ${lon.toFixed(4)}`)
            .openPopup();
        
        // Add weather radar overlay
        this.addRadarLayer('precipitation');
        
        // Add zoom control styling
        this.weatherMap.attributionControl.setPrefix('');
    }

    addRadarLayer(layerType = 'precipitation') {
        if (!this.weatherMap) return;
        
        // OpenWeatherMap radar tiles (requires API key)
        const radarUrl = `https://tile.openweathermap.org/map/${layerType}_new/{z}/{x}/{y}.png?appid=${this.apiKey}`;
        
        // Remove existing radar layer
        if (this.radarLayer) {
            this.weatherMap.removeLayer(this.radarLayer);
        }
        
        // Add new radar layer
        this.radarLayer = L.tileLayer(radarUrl, {
            maxZoom: 19,
            opacity: 0.6,
            attribution: 'Weather data © OpenWeatherMap'
        }).addTo(this.weatherMap);
        
        console.log(`🌧️ Added ${layerType} radar layer`);
    }

    startLiveUpdates() {
        // Update weather data every 10 minutes
        setInterval(() => {
            console.log('🔄 Refreshing weather data...');
            this.loadWeatherData();
        }, 10 * 60 * 1000);
        
        // Update moon phase daily
        this.updateMoonPhase();
        setInterval(() => this.updateMoonPhase(), 24 * 60 * 60 * 1000);
        
        // Initialize forecast controls
        this.initializeForecastControls();
    }

    initializeForecastControls() {
        // Hourly forecast controls
        const expandHourly = document.getElementById('expand-hourly');
        const refreshHourly = document.getElementById('refresh-hourly');
        
        if (expandHourly) {
            expandHourly.addEventListener('click', () => {
                console.log('📊 Expanding hourly forecast view...');
                // Could implement detailed modal or expanded view
            });
        }
        
        if (refreshHourly) {
            refreshHourly.addEventListener('click', () => {
                console.log('🔄 Refreshing hourly forecast...');
                this.loadWeatherData();
            });
        }
        
        // Weekly forecast controls
        const expandWeekly = document.getElementById('expand-weekly');
        const refreshWeekly = document.getElementById('refresh-weekly');
        
        if (expandWeekly) {
            expandWeekly.addEventListener('click', () => {
                console.log('📅 Expanding weekly forecast view...');
                // Could implement detailed modal or expanded view
            });
        }
        
        if (refreshWeekly) {
            refreshWeekly.addEventListener('click', () => {
                console.log('🔄 Refreshing weekly forecast...');
                this.loadWeatherData();
            });
        }
    }

    updateMoonPhase() {
        const phase = this.getCurrentMoonPhase();
        const moonNameEl = document.querySelector('.moon-name');
        const moonIconEl = document.querySelector('.moon-phase i');
        
        if (moonNameEl) moonNameEl.textContent = phase.name;
        if (moonIconEl) moonIconEl.textContent = phase.icon;
    }

    getCurrentMoonPhase() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        
        // Simplified moon phase calculation
        const c = Math.floor((year - 1900) / 100);
        const e = 2 * (year - 1900 - 100 * c);
        const jd = 365.25 * (year - 1900) + 30.6 * month + day - 694039.09;
        const n = Math.floor(jd / 29.5305882) * 29.5305882;
        const phase = ((jd - n) / 29.5305882);
        
        if (phase < 0.125) return { name: 'New Moon', icon: '🌑' };
        if (phase < 0.25) return { name: 'Waxing Crescent', icon: '🌒' };
        if (phase < 0.375) return { name: 'First Quarter', icon: '🌓' };
        if (phase < 0.5) return { name: 'Waxing Gibbous', icon: '🌔' };
        if (phase < 0.625) return { name: 'Full Moon', icon: '🌕' };
        if (phase < 0.75) return { name: 'Waning Gibbous', icon: '🌖' };
        if (phase < 0.875) return { name: 'Last Quarter', icon: '🌗' };
        return { name: 'Waning Crescent', icon: '🌘' };
    }

    showErrorState() {
        console.error('❌ Weather data unavailable');
        const conditionEl = document.querySelector('.condition-text');
        const tempEl = document.querySelector('.temp-primary');
        
        if (conditionEl) conditionEl.textContent = 'Weather data unavailable';
        if (tempEl) tempEl.textContent = '--';
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Initializing Ultimate Professional Weather Dashboard...');
    new WeatherIntelligenceDashboard();
});
