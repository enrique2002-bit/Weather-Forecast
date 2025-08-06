// Apple Weather DNA - Service Worker for 24/7 Operation
const CACHE_NAME = 'apple-weather-dna-v1';
const urlsToCache = [
  '/',
  '/index-apple.html',
  '/style-apple.css',
  '/script-apple.js',
  '/assets/weather-clear.mp4',
  '/assets/weather-cloudy.mp4',
  '/assets/weather-rainy.mp4',
  'https://cdn.jsdelivr.net/npm/weather-icons@2.0.12/css/weather-icons.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=SF+Pro+Display:wght@100;200;300;400;500;600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
];

// Install event
self.addEventListener('install', event => {
  console.log('🍎 Apple Weather DNA Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache installation failed:', error);
        // Don't fail the installation if some resources can't be cached
        return Promise.resolve();
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  // Handle API requests differently
  if (event.request.url.includes('api.weatherapi.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If successful, cache the response
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Handle app shell requests
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Add to cache
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline fallback if available
            if (event.request.destination === 'document') {
              return caches.match('/index-apple.html');
            }
          });
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('🔄 Apple Weather DNA Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for weather updates
self.addEventListener('sync', event => {
  if (event.tag === 'weather-update') {
    console.log('🔄 Background sync: weather update');
    event.waitUntil(
      // Fetch fresh weather data when connection is restored
      fetch('/api/weather-update')
        .then(response => response.json())
        .then(data => {
          // Notify the app about new data
          self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'WEATHER_UPDATE',
                data: data
              });
            });
          });
        })
        .catch(error => {
          console.error('Background sync failed:', error);
        })
    );
  }
});

// Push notifications for severe weather alerts
self.addEventListener('push', event => {
  console.log('🚨 Push notification received');
  
  const options = {
    body: 'Severe weather alert for Split, Croatia',
    icon: '/assets/icon-192.png',
    badge: '/assets/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/assets/checkmark.png'
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: '/assets/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Weather Alert', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('📱 Notification clicked');
  event.notification.close();

  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
