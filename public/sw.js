/**
 * SERVICE WORKER - DARWIN-MFC
 * ===========================
 * 
 * Cache-first strategy for offline access
 * Supports basePath for GitHub Pages deployment
 */

// Detect basePath from service worker location
const getBasePath = () => {
  // Get the pathname of the service worker script
  // e.g., /darwin-MFC/sw.js -> /darwin-MFC
  const swPath = self.location.pathname;
  if (swPath.startsWith('/darwin-MFC/')) {
    return '/darwin-MFC';
  }
  return '';
};

const BASE_PATH = getBasePath();
const path = (p) => {
  // Ensure path starts with / and doesn't duplicate basePath
  const cleanPath = p.startsWith('/') ? p : '/' + p;
  return BASE_PATH + cleanPath;
};

const CACHE_NAME = 'darwin-mfc-v1';
const OFFLINE_URL = path('/offline.html');

// Resources to cache on install
const PRECACHE_RESOURCES = [
  path('/'),
  path('/doencas/'),
  path('/medicamentos/'),
  path('/calculadoras/'),
  path('/protocolos/'),
  path('/sus/'),
  path('/busca/'),
  path('/manifest.json'),
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching resources');
      return cache.addAll(PRECACHE_RESOURCES);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - stale-while-revalidate for most resources
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip API requests (if any)
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Cache the new response
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // If offline and no cache, return offline page for navigations
            if (event.request.mode === 'navigate') {
              return cache.match(OFFLINE_URL);
            }
            return null;
          });

        // Return cached response immediately, update in background
        return cachedResponse || fetchPromise;
      });
    })
  );
});

// Background sync for favorites/notes (optional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Background sync triggered');
    // Implement sync logic here if needed
  }
});

// Push notifications (optional for updates)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Nova atualização disponível!',
    icon: path('/logos/sus-logo.svg'),
    badge: path('/logos/sus-logo.svg'),
    vibrate: [100, 50, 100],
  };

  event.waitUntil(
    self.registration.showNotification('Darwin MFC', options)
  );
});

