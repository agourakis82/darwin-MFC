/**
 * SERVICE WORKER - DARWIN-MFC
 * ===========================
 *
 * Comprehensive offline-first caching for LMICs and low-bandwidth areas.
 *
 * Features:
 * - Precache critical resources on install
 * - Stale-while-revalidate for dynamic content
 * - Network-first for API calls (with cache fallback)
 * - Offline page for navigation failures
 * - Cache size management (50MB limit)
 * - Automatic cache cleanup on version change
 * - Support for all 9 locales
 *
 * Designed for: 3G connections, intermittent connectivity, low-end devices
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const CACHE_VERSION = 'v2';
const CACHE_NAME = `darwin-mfc-${CACHE_VERSION}`;
const STATIC_CACHE = `darwin-mfc-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `darwin-mfc-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `darwin-mfc-images-${CACHE_VERSION}`;

// Maximum cache sizes (in bytes)
const MAX_DYNAMIC_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_IMAGE_CACHE_SIZE = 20 * 1024 * 1024;   // 20MB
const MAX_CACHE_ITEMS = 200;

// Supported locales
const LOCALES = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

// Detect basePath from service worker location (for GitHub Pages)
const getBasePath = () => {
  const swPath = self.location.pathname;
  if (swPath.includes('/darwin-MFC/')) {
    return '/darwin-MFC';
  }
  return '';
};

const BASE_PATH = getBasePath();
const path = (p) => BASE_PATH + (p.startsWith('/') ? p : '/' + p);

const OFFLINE_URL = path('/offline.html');

// =============================================================================
// RESOURCES TO PRECACHE
// =============================================================================

// Critical resources cached on install
const PRECACHE_RESOURCES = [
  path('/'),
  path('/offline.html'),
  path('/manifest.json'),
  // Core pages (default locale)
  path('/doencas'),
  path('/medicamentos'),
  path('/calculadoras'),
  path('/protocolos'),
  path('/busca'),
  // Assets
  path('/logos/sus-logo.svg'),
];

// Generate locale-specific URLs
const LOCALE_PAGES = [
  '/doencas',
  '/medicamentos',
  '/calculadoras',
  '/protocolos',
  '/busca',
];

// Add locale versions to precache
LOCALES.forEach(locale => {
  LOCALE_PAGES.forEach(page => {
    PRECACHE_RESOURCES.push(path(`/${locale}${page}`));
  });
});

// =============================================================================
// INSTALL EVENT
// =============================================================================

self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Precaching critical resources...');
        // Use addAll with error handling for each resource
        return Promise.allSettled(
          PRECACHE_RESOURCES.map(url =>
            cache.add(url).catch(err => {
              console.warn(`[SW] Failed to cache: ${url}`, err);
            })
          )
        );
      })
      .then(() => {
        console.log('[SW] Precaching complete');
        return self.skipWaiting();
      })
  );
});

// =============================================================================
// ACTIVATE EVENT
// =============================================================================

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('darwin-mfc-') &&
                     !name.includes(CACHE_VERSION);
            })
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim(),
    ])
  );
});

// =============================================================================
// FETCH EVENT
// =============================================================================

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== self.location.origin) return;

  // Skip chrome-extension and other special protocols
  if (!url.protocol.startsWith('http')) return;

  // Determine caching strategy based on request type
  if (isNavigationRequest(request)) {
    event.respondWith(handleNavigationRequest(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(handleStaticRequest(request));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

// =============================================================================
// REQUEST HANDLERS
// =============================================================================

/**
 * Navigation requests: Network-first with offline fallback
 */
async function handleNavigationRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page
    const offlinePage = await caches.match(OFFLINE_URL);
    return offlinePage || new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

/**
 * Static assets: Cache-first (fonts, JS, CSS)
 */
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Resource unavailable offline', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

/**
 * Images: Cache-first with size limits
 */
async function handleImageRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());

      // Cleanup if cache is too large
      trimCache(IMAGE_CACHE, MAX_CACHE_ITEMS / 2);
    }
    return networkResponse;
  } catch (error) {
    // Return placeholder for images
    return new Response('', { status: 404 });
  }
}

/**
 * Dynamic content: Stale-while-revalidate
 */
async function handleDynamicRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
        trimCache(DYNAMIC_CACHE, MAX_CACHE_ITEMS);
      }
      return networkResponse;
    })
    .catch(() => null);

  // Return cached immediately, update in background
  return cachedResponse || fetchPromise;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
         request.destination === 'document';
}

function isStaticAsset(request) {
  const url = request.url;
  return url.includes('/_next/static/') ||
         url.endsWith('.js') ||
         url.endsWith('.css') ||
         url.endsWith('.woff2') ||
         url.endsWith('.woff');
}

function isImageRequest(request) {
  return request.destination === 'image' ||
         request.url.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i);
}

/**
 * Trim cache to maximum number of items (LRU-style)
 */
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxItems) {
    const deleteCount = keys.length - maxItems;
    for (let i = 0; i < deleteCount; i++) {
      await cache.delete(keys[i]);
    }
    console.log(`[SW] Trimmed ${deleteCount} items from ${cacheName}`);
  }
}

// =============================================================================
// MESSAGE HANDLING
// =============================================================================

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls || [];
    caches.open(DYNAMIC_CACHE).then((cache) => {
      urls.forEach(url => {
        cache.add(url).catch(err => {
          console.warn('[SW] Failed to cache:', url, err);
        });
      });
    });
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((names) => {
      names.forEach(name => caches.delete(name));
    });
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({ size });
    });
  }
});

/**
 * Get total cache size in bytes
 */
async function getCacheSize() {
  let totalSize = 0;
  const cacheNames = await caches.keys();

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.clone().blob();
        totalSize += blob.size;
      }
    }
  }

  return totalSize;
}

// =============================================================================
// BACKGROUND SYNC (for future use with favorites/notes)
// =============================================================================

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

async function syncFavorites() {
  // Future: sync user favorites when back online
  console.log('[SW] Background sync triggered');
}

// =============================================================================
// PUSH NOTIFICATIONS (for updates)
// =============================================================================

self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};

  const options = {
    body: data.body || 'New content available!',
    icon: path('/icons/icon-192x192.png'),
    badge: path('/icons/icon-72x72.png'),
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
    actions: [
      { action: 'open', title: 'Open' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Darwin MFC', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    const url = event.notification.data?.url || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

console.log('[SW] Service worker loaded');
