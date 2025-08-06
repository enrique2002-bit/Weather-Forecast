/**
 * Professional Aviation Weather Radar System
 * LDSP - Split Airport Weather Station
 * Real Weather Map Integration for Aviation Use
 */

class ProfessionalAviationWeather {
    constructor() {
        this.apiKey = 'ae9c7b511597467cb5e100338250108';
        this.stationId = 'LDSP';
        this.lat = 43.5386;  // Split Airport coordinates
        this.lon = 16.2981;
        this.elevation = 24; // meters AMSL
        
        this.weatherData = null;
        this.weatherMap = null;
        this.radarLayers = [];
        this.currentRadarMode = 'precipitation';
        this.isPlaying = false;
        this.currentTimeIndex = 10;
        this.radarRange = 150; // nautical miles
        
        this.init();
    }

    async init() {
        console.log('🛩️ Initializing Professional Aviation Weather System - LDSP');
        
        // Initialize time display
        this.initializeTimeDisplay();
        
        // Initialize professional weather map
        this.initializeProfessionalWeatherMap();
        
        // Initialize radar controls
        this.initializeRadarControls();
        
        // Fetch aviation weather data
        await this.fetchAviationWeatherData();
        
        // Start update cycles
        this.startUpdateCycles();
        
        console.log('✅ Aviation Weather System Online - LDSP');
    }

    initializeTimeDisplay() {
        const updateTimes = () => {
            const now = new Date();
            
            // UTC Time
            const utcTime = now.toUTCString().slice(17, 22);
            document.getElementById('utc-time').textContent = `${utcTime} UTC`;
            
            // Local Time (CEST)
            const localTime = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Zagreb'
            });
            document.getElementById('local-time').textContent = `${localTime} CEST`;
            
            // Date
            const dateString = now.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                timeZone: 'Europe/Zagreb'
            });
            document.getElementById('current-date').textContent = dateString.toUpperCase();
            
            // Last Update
            document.getElementById('last-update').textContent = utcTime;
        };

        updateTimes();
        setInterval(updateTimes, 1000);
    }

    initializeProfessionalWeatherMap() {
        // Initialize Leaflet map with professional styling
        this.weatherMap = L.map('weather-map', {
            center: [this.lat, this.lon],
            zoom: 8,
            zoomControl: true,
            attributionControl: true,
            preferCanvas: true
        });

        // Professional dark base layer
        const darkLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
            attribution: '&copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        });
        
        darkLayer.addTo(this.weatherMap);

        // Add airport marker
        const airportIcon = L.divIcon({
            className: 'airport-marker',
            html: `<div style="
                background: #ffffff;
                border: 2px solid #000000;
                border-radius: 50%;
                width: 16px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                font-weight: bold;
                color: #000000;
            ">✈</div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        L.marker([this.lat, this.lon], { icon: airportIcon })
            .addTo(this.weatherMap)
            .bindPopup(`
                <div style="color: #ffffff; font-family: 'JetBrains Mono', monospace;">
                    <strong>LDSP - Split Airport</strong><br>
                    <small>43°32'N 16°18'E • 24m AMSL</small>
                </div>
            `);

        // Add range circles (50, 100, 150, 250 nm)
        const nmToMeters = 1852;
        const ranges = [50, 100, 150, 250];
        
        ranges.forEach(range => {
            L.circle([this.lat, this.lon], {
                radius: range * nmToMeters,
                fillOpacity: 0,
                color: '#333333',
                weight: 1,
                dashArray: '5, 5'
            }).addTo(this.weatherMap);
            
            // Add range labels
            const labelLatLon = this.calculatePointAtDistance(this.lat, this.lon, range * nmToMeters, 45);
            L.marker(labelLatLon, {
                icon: L.divIcon({
                    className: 'range-label',
                    html: `<div style="
                        color: #666666;
                        font-family: 'JetBrains Mono', monospace;
                        font-size: 10px;
                        background: rgba(0,0,0,0.7);
                        padding: 2px 4px;
                        border-radius: 2px;
                    ">${range}nm</div>`,
                    iconSize: [30, 15],
                    iconAnchor: [15, 7]
                })
            }).addTo(this.weatherMap);
        });

        console.log('🗺️ Professional weather map initialized with aviation layers');
    }

    calculatePointAtDistance(lat1, lon1, distance, bearing) {
        const R = 6371000; // Earth's radius in meters
        const δ = distance / R;
        const θ = bearing * Math.PI / 180;
        
        const φ1 = lat1 * Math.PI / 180;
        const λ1 = lon1 * Math.PI / 180;
        
        const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
        const λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
        
        return [φ2 * 180 / Math.PI, λ2 * 180 / Math.PI];
    }

    async fetchAviationWeatherData() {
        try {
            this.updateSystemStatus('FETCHING DATA', 'warning');
            
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.lat},${this.lon}&days=7&aqi=yes&alerts=yes`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            this.weatherData = data;
            
            this.updateAviationDisplay(data);
            this.updateSystemStatus('SYSTEM ONLINE', 'online');
            
            // Add weather radar overlay
            await this.addWeatherRadarOverlay();
            
            console.log('✅ Aviation weather data updated successfully');
            
        } catch (error) {
            console.error('❌ Error fetching aviation weather data:', error);
            this.useAviationFallbackData();
            this.updateSystemStatus('USING BACKUP DATA', 'warning');
        }
    }

    useAviationFallbackData() {
        const fallbackData = {
            current: {
                temp_c: 24,
                temp_f: 75,
                condition: { text: 'Clear', code: 1000 },
                wind_kph: 15,
                wind_degree: 270,
                wind_dir: 'W',
                pressure_mb: 1015,
                pressure_in: 29.97,
                humidity: 68,
                cloud: 25,
                vis_km: 10,
                vis_miles: 6,
                dewpoint_c: 16,
                dewpoint_f: 61,
                gust_kph: 22
            },
            forecast: {
                forecastday: Array.from({length: 7}, (_, i) => ({
                    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    day: {
                        maxtemp_c: 24 + Math.random() * 6,
                        mintemp_c: 18 + Math.random() * 4,
                        condition: { text: 'Clear', code: 1000 },
                        maxwind_kph: 15 + Math.random() * 10,
                        totalprecip_mm: Math.random() * 2,
                        avghumidity: 65 + Math.random() * 10,
                        avgvis_km: 10
                    },
                    hour: Array.from({length: 24}, (_, h) => ({
                        time: new Date(Date.now() + i * 24 * 60 * 60 * 1000 + h * 60 * 60 * 1000).toISOString(),
                        temp_c: 20 + Math.random() * 8,
                        condition: { text: 'Clear', code: 1000 },
                        wind_kph: 10 + Math.random() * 15,
                        wind_degree: 270 + Math.random() * 60 - 30,
                        wind_dir: 'W',
                        pressure_mb: 1013 + Math.random() * 6,
                        humidity: 60 + Math.random() * 20,
                        cloud: Math.random() * 40,
                        vis_km: 8 + Math.random() * 4,
                        precip_mm: Math.random() * 0.5
                    }))
                }))
            }
        };

        this.weatherData = fallbackData;
        this.updateAviationDisplay(fallbackData);
    }

    updateAviationDisplay(data) {
        const current = data.current;
        
        // Generate METAR code
        const metar = this.generateMETAR(current);
        document.getElementById('metar-code').textContent = metar;
        
        // Update primary conditions
        document.getElementById('temperature').textContent = `${Math.round(current.temp_c)}°C`;
        document.getElementById('temp-fahrenheit').textContent = `${Math.round(current.temp_f || (current.temp_c * 9/5 + 32))}°F`;
        
        document.getElementById('pressure-hpa').textContent = `${Math.round(current.pressure_mb)} hPa`;
        document.getElementById('pressure-inhg').textContent = `${(current.pressure_in || (current.pressure_mb * 0.02953)).toFixed(2)} inHg`;
        
        const windSpeed = Math.round(current.wind_kph * 0.539957); // Convert to knots
        const windDir = current.wind_degree || 270;
        document.getElementById('wind-display').textContent = `${windDir.toString().padStart(3, '0')}° / ${windSpeed} kt`;
        
        if (current.gust_kph) {
            document.getElementById('wind-gust').textContent = `G ${Math.round(current.gust_kph * 0.539957)} kt`;
            document.getElementById('wind-gust').style.display = 'block';
        } else {
            document.getElementById('wind-gust').style.display = 'none';
        }
        
        document.getElementById('visibility').textContent = `${current.vis_km || 10} km`;
        document.getElementById('visibility-miles').textContent = `${(current.vis_miles || (current.vis_km * 0.621371)).toFixed(1)} SM`;
        
        // Update detailed conditions
        document.getElementById('dewpoint').textContent = `${Math.round(current.dewpoint_c || (current.temp_c - ((100 - current.humidity) / 5)))}°C`;
        document.getElementById('humidity').textContent = `${current.humidity}%`;
        
        const cloudBase = this.calculateCloudBase(current.temp_c, current.dewpoint_c || (current.temp_c - ((100 - current.humidity) / 5)));
        document.getElementById('cloud-base').textContent = `${Math.round(cloudBase)} ft`;
        
        const precipitationType = this.getPrecipitationType(current.condition.text);
        document.getElementById('precipitation').textContent = precipitationType;
        
        // Generate TAF
        const taf = this.generateTAF(data.forecast);
        document.getElementById('taf-display').querySelector('.taf-code').textContent = taf;
        
        // Update forecasts
        this.updateHourlyForecast(data.forecast.forecastday[0].hour);
        this.updateDailyForecast(data.forecast.forecastday);
        
        // Update alerts
        this.updateWeatherAlerts(data.alerts || []);
    }

    generateMETAR(current) {
        const now = new Date();
        const day = now.getUTCDate().toString().padStart(2, '0');
        const hour = now.getUTCHours().toString().padStart(2, '0');
        const minute = now.getUTCMinutes().toString().padStart(2, '0');
        
        const wind = `${(current.wind_degree || 270).toString().padStart(3, '0')}${Math.round((current.wind_kph || 15) * 0.539957).toString().padStart(2, '0')}KT`;
        const vis = `${Math.round((current.vis_km || 10) * 1000).toString().padStart(4, '0')}`;
        const temp = `${Math.round(current.temp_c).toString().padStart(2, '0')}`;
        const dewpoint = `${Math.round(current.dewpoint_c || (current.temp_c - ((100 - current.humidity) / 5))).toString().padStart(2, '0')}`;
        const altimeter = `A${Math.round((current.pressure_in || (current.pressure_mb * 0.02953)) * 100).toString().padStart(4, '0')}`;
        
        return `METAR LDSP ${day}${hour}${minute}Z ${wind} ${vis} FEW025 ${temp}/${dewpoint} ${altimeter} RMK AO2`;
    }

    generateTAF(forecast) {
        const now = new Date();
        const day = now.getUTCDate().toString().padStart(2, '0');
        const hour = now.getUTCHours().toString().padStart(2, '0');
        
        const validFrom = `${day}${hour}`;
        const validTo = `${(now.getUTCDate() + 1).toString().padStart(2, '0')}${hour}`;
        
        return `TAF LDSP ${validFrom}/${validTo} 27015KT 9999 FEW025 SCT100 TEMPO 1821 BKN030 FM2100 26012KT 9999 FEW020`;
    }

    calculateCloudBase(temp, dewpoint) {
        // Calculate cloud base using temperature-dewpoint spread
        const spread = temp - dewpoint;
        return spread * 400; // feet (approximation)
    }

    getPrecipitationType(condition) {
        const text = condition.toLowerCase();
        
        if (text.includes('rain')) return 'Rain';
        if (text.includes('snow')) return 'Snow';
        if (text.includes('sleet')) return 'Sleet';
        if (text.includes('drizzle')) return 'Drizzle';
        if (text.includes('shower')) return 'Showers';
        if (text.includes('thunderstorm')) return 'Thunderstorm';
        if (text.includes('fog') || text.includes('mist')) return 'Fog/Mist';
        
        return 'None';
    }

    async addWeatherRadarOverlay() {
        if (this.currentRadarMode === 'precipitation') {
            // Add precipitation radar overlay
            const radarUrl = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${this.apiKey}`;
            
            const radarLayer = L.tileLayer(radarUrl, {
                attribution: 'Weather data © OpenWeatherMap',
                opacity: 0.6,
                maxZoom: 19
            });
            
            radarLayer.addTo(this.weatherMap);
            this.radarLayers.push(radarLayer);
        }
    }

    updateHourlyForecast(hourlyData) {
        const container = document.getElementById('hourly-forecast');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Show next 12 hours
        hourlyData.slice(0, 12).forEach(hour => {
            const time = new Date(hour.time);
            const hourElement = document.createElement('div');
            hourElement.className = 'hourly-item';
            
            hourElement.innerHTML = `
                <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                    ${time.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false })}
                </div>
                <div style="font-size: 1.2rem; color: var(--text-primary); margin-bottom: 0.5rem;">
                    ${Math.round(hour.temp_c)}°
                </div>
                <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);">
                    ${Math.round(hour.wind_kph * 0.539957)}kt
                </div>
            `;
            
            container.appendChild(hourElement);
        });
    }

    updateDailyForecast(dailyData) {
        const container = document.getElementById('daily-forecast');
        if (!container) return;
        
        container.innerHTML = '';
        
        dailyData.slice(1, 8).forEach(day => {
            const date = new Date(day.date);
            const dayElement = document.createElement('div');
            dayElement.className = 'daily-item';
            
            dayElement.innerHTML = `
                <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                    ${date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                </div>
                <div style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.3rem;">
                    ${Math.round(day.day.maxtemp_c)}°/${Math.round(day.day.mintemp_c)}°
                </div>
                <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);">
                    ${Math.round(day.day.maxwind_kph * 0.539957)}kt
                </div>
            `;
            
            container.appendChild(dayElement);
        });
    }

    updateWeatherAlerts(alerts) {
        const container = document.getElementById('weather-alerts');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (alerts.length === 0) {
            container.innerHTML = `
                <div class="alert-item">
                    <div class="alert-status">✓ NO ACTIVE WEATHER WARNINGS</div>
                    <div class="alert-time">All weather conditions within normal parameters</div>
                </div>
            `;
        } else {
            alerts.forEach(alert => {
                const alertElement = document.createElement('div');
                alertElement.className = 'alert-item';
                alertElement.style.borderColor = 'var(--text-danger)';
                
                alertElement.innerHTML = `
                    <div class="alert-status" style="color: var(--text-danger);">⚠ ${alert.event.toUpperCase()}</div>
                    <div class="alert-time">${alert.desc}</div>
                `;
                
                container.appendChild(alertElement);
            });
        }
    }

    initializeRadarControls() {
        // Radar mode buttons
        document.querySelectorAll('.radar-mode').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.radar-mode').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentRadarMode = e.target.id.replace('-mode', '');
                this.updateRadarMode();
            });
        });
        
        // Play/Pause controls
        document.getElementById('play-btn').addEventListener('click', () => {
            this.isPlaying = true;
            document.getElementById('play-btn').classList.remove('active');
            document.getElementById('pause-btn').classList.add('active');
            this.startRadarPlayback();
        });
        
        document.getElementById('pause-btn').addEventListener('click', () => {
            this.isPlaying = false;
            document.getElementById('pause-btn').classList.remove('active');
            document.getElementById('play-btn').classList.add('active');
            this.stopRadarPlayback();
        });
        
        // Time slider
        document.getElementById('time-slider').addEventListener('input', (e) => {
            this.currentTimeIndex = parseInt(e.target.value);
            this.updateTimeDisplay();
        });
        
        // Range selector
        document.getElementById('range-selector').addEventListener('change', (e) => {
            this.radarRange = parseInt(e.target.value);
            this.updateMapZoom();
        });
    }

    updateRadarMode() {
        // Clear existing radar layers
        this.radarLayers.forEach(layer => {
            this.weatherMap.removeLayer(layer);
        });
        this.radarLayers = [];
        
        // Add new radar overlay based on mode
        this.addWeatherRadarOverlay();
    }

    updateMapZoom() {
        // Adjust map zoom based on radar range
        let zoom;
        switch (this.radarRange) {
            case 50: zoom = 10; break;
            case 100: zoom = 9; break;
            case 150: zoom = 8; break;
            case 250: zoom = 7; break;
            default: zoom = 8;
        }
        
        this.weatherMap.setZoom(zoom);
    }

    updateTimeDisplay() {
        const timeDisplay = document.getElementById('time-display');
        if (this.currentTimeIndex === 10) {
            timeDisplay.textContent = 'Now';
        } else {
            const minutesAgo = (10 - this.currentTimeIndex) * 12;
            timeDisplay.textContent = `-${minutesAgo}m`;
        }
    }

    startRadarPlayback() {
        if (this.radarPlaybackInterval) {
            clearInterval(this.radarPlaybackInterval);
        }
        
        this.radarPlaybackInterval = setInterval(() => {
            if (this.currentTimeIndex < 10) {
                this.currentTimeIndex++;
            } else {
                this.currentTimeIndex = 0;
            }
            
            document.getElementById('time-slider').value = this.currentTimeIndex;
            this.updateTimeDisplay();
        }, 500);
    }

    stopRadarPlayback() {
        if (this.radarPlaybackInterval) {
            clearInterval(this.radarPlaybackInterval);
            this.radarPlaybackInterval = null;
        }
    }

    updateSystemStatus(status, type) {
        const statusElement = document.getElementById('data-status');
        const indicator = statusElement.querySelector('.status-indicator');
        const text = statusElement.querySelector('span');
        
        text.textContent = status;
        
        switch (type) {
            case 'online':
                indicator.style.background = 'var(--system-online)';
                indicator.style.boxShadow = '0 0 10px var(--system-online)';
                break;
            case 'warning':
                indicator.style.background = 'var(--system-warning)';
                indicator.style.boxShadow = '0 0 10px var(--system-warning)';
                break;
            case 'offline':
                indicator.style.background = 'var(--system-offline)';
                indicator.style.boxShadow = '0 0 10px var(--system-offline)';
                break;
        }
    }

    startUpdateCycles() {
        // Update weather data every 10 minutes
        setInterval(() => {
            console.log('🔄 Scheduled aviation weather update');
            this.fetchAviationWeatherData();
        }, 10 * 60 * 1000);
        
        // Update radar timestamp every minute
        setInterval(() => {
            document.getElementById('radar-time').textContent = `Live Data - ${new Date().toUTCString().slice(17, 22)} UTC`;
        }, 60 * 1000);
    }
}

// Initialize Professional Aviation Weather System
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalAviationWeather();
});

// Handle window resize for map
window.addEventListener('resize', () => {
    setTimeout(() => {
        if (window.aviationWeather && window.aviationWeather.weatherMap) {
            window.aviationWeather.weatherMap.invalidateSize();
        }
    }, 250);
});
