class SimpleWeatherRadar {
    constructor() {
        this.lat = 43.5081;
        this.lon = 16.4402;
        this.apiKey = 'ae9c7b511597467cb5e100338250108';
        this.weatherMap = null;
        this.radarLayer = null;
        this.baseLayer = null;
        
        this.initializeMap();
        this.fetchWeatherData();
        this.startUpdateCycle();
    }

    initializeMap() {
        const mapElement = document.getElementById('weather-map');
        if (!mapElement) {
            console.error('Weather map element not found');
            return;
        }

        // Initialize Leaflet map
        this.weatherMap = L.map('weather-map', {
            center: [this.lat, this.lon],
            zoom: 8,
            zoomControl: true,
            attributionControl: true
        });

        // Add base map layer
        this.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
        this.baseLayer.addTo(this.weatherMap);

        // Add weather radar
        this.addWeatherRadar();

        // Add Split marker
        const marker = L.marker([this.lat, this.lon]).addTo(this.weatherMap);
        marker.bindPopup('<b>Split, Croatia</b><br>Weather Center').openPopup();

        console.log('✅ Simple weather radar map initialized');
    }

    async addWeatherRadar() {
        try {
            console.log('🌧️ Adding weather radar...');

            // Try RainViewer first
            const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
            const data = await response.json();

            if (data && data.radar && data.radar.past && data.radar.past.length > 0) {
                // Get latest radar data
                const latest = data.radar.past[data.radar.past.length - 1];
                const timestamp = latest.time;

                console.log('🕒 Latest radar timestamp:', new Date(timestamp * 1000));

                // Remove existing radar if any
                if (this.radarLayer && this.weatherMap.hasLayer(this.radarLayer)) {
                    this.weatherMap.removeLayer(this.radarLayer);
                }

                // Add RainViewer radar layer
                this.radarLayer = L.tileLayer(`https://tilecache.rainviewer.com/v2/radar/${timestamp}/512/{z}/{x}/{y}/2/1_1.png`, {
                    attribution: 'Weather radar by RainViewer',
                    opacity: 0.6,
                    maxZoom: 16,
                    zIndex: 10,
                    tileSize: 512,
                    zoomOffset: -1
                });

                this.radarLayer.addTo(this.weatherMap);
                console.log('✅ RainViewer radar added successfully');

            } else {
                // Fallback to OpenWeatherMap
                this.addOpenWeatherMapRadar();
            }

        } catch (error) {
            console.error('❌ Error adding RainViewer radar:', error);
            this.addOpenWeatherMapRadar();
        }
    }

    addOpenWeatherMapRadar() {
        console.log('🌤️ Adding OpenWeatherMap radar...');

        // Remove existing radar if any
        if (this.radarLayer && this.weatherMap.hasLayer(this.radarLayer)) {
            this.weatherMap.removeLayer(this.radarLayer);
        }

        // Add OpenWeatherMap precipitation layer
        this.radarLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${this.apiKey}`, {
            attribution: 'Weather data by OpenWeatherMap',
            opacity: 0.5,
            maxZoom: 16,
            zIndex: 10
        });

        this.radarLayer.addTo(this.weatherMap);
        console.log('✅ OpenWeatherMap radar added');
    }

    async fetchWeatherData() {
        try {
            console.log('🌡️ Fetching weather data...');
            
            const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.lat},${this.lon}&aqi=yes`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.current) {
                // Update basic weather info
                const current = data.current;
                
                // Update city name
                const cityElement = document.getElementById('city-name');
                if (cityElement) cityElement.textContent = data.location.name;

                // Update temperature
                const tempElement = document.getElementById('temperature');
                if (tempElement) tempElement.textContent = `${Math.round(current.temp_c)}°C`;

                // Update condition
                const conditionElement = document.getElementById('weather-condition');
                if (conditionElement) conditionElement.textContent = current.condition.text;

                // Update humidity
                const humidityElement = document.getElementById('humidity');
                if (humidityElement) humidityElement.textContent = `${current.humidity}%`;

                // Update wind
                const windElement = document.getElementById('wind-speed');
                if (windElement) windElement.textContent = `${current.wind_kph} km/h`;

                console.log('✅ Weather data updated');
            }

        } catch (error) {
            console.error('❌ Error fetching weather data:', error);
        }
    }

    startUpdateCycle() {
        // Update weather data every 5 minutes
        setInterval(() => {
            this.fetchWeatherData();
        }, 300000);

        // Update radar every 10 minutes
        setInterval(() => {
            console.log('🔄 Refreshing radar...');
            this.addWeatherRadar();
        }, 600000);

        console.log('🔄 Update cycles started');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Initializing Simple Weather Radar...');
    try {
        const radar = new SimpleWeatherRadar();
        window.simpleRadar = radar;
        console.log('✅ Simple Weather Radar initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing radar:', error);
    }
});
