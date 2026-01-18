/**
 * SERVICE WORKER - DARWIN-MFC
 * ===========================
 *
 * Comprehensive offline-first caching for medical data and static assets.
 *
 * Features:
 * - Cache-first for static assets (JS, CSS, images, fonts)
 * - Stale-while-revalidate for medical data JSON files
 * - Offline fallback page for navigation failures
 * - Cache versioning and automatic cleanup
 * - Support for all 9 locales
 *
 * Cache Strategy Summary:
 * - Static Assets (JS, CSS, fonts, images): Cache-first
 * - Medical Data JSON: Stale-while-revalidate
 * - Navigation (HTML pages): Network-first with cache fallback
 */

// =============================================================================
// CACHE VERSIONING
// =============================================================================

const CACHE_VERSION = 'darwin-mfc-v1';
const DATA_CACHE = 'darwin-mfc-data-v1';

// Additional cache names for organization
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

// Cache size limits
const MAX_CACHE_ITEMS = 200;
const MAX_DATA_CACHE_ITEMS = 100;

// Supported locales
const LOCALES = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

// =============================================================================
// BASE PATH DETECTION (for GitHub Pages compatibility)
// =============================================================================

const getBasePath = () => {
  const swPath = self.location.pathname;
  // Check for GitHub Pages deployment
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

const PRECACHE_RESOURCES = [
  path('/'),
  path('/offline.html'),
  path('/manifest.json'),
  // Core pages (default locale - pt)
  path('/doencas'),
  path('/medicamentos'),
  path('/calculadoras'),
  path('/protocolos'),
  path('/busca'),
  // Assets
  path('/logos/sus-logo.svg'),
];

// Generate locale-specific URLs for precaching
const LOCALE_PAGES = [
  '/doencas',
  '/medicamentos',
  '/calculadoras',
  '/protocolos',
  '/busca',
];

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
  console.log('[SW] Cache version:', CACHE_VERSION);

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Precaching critical resources...');
        // Use Promise.allSettled to handle individual failures gracefully
        return Promise.allSettled(
          PRECACHE_RESOURCES.map(url =>
            cache.add(url).catch(err => {
              console.warn(`[SW] Failed to cache: ${url}`, err.message);
              return null;
            })
          )
        );
      })
      .then((results) => {
        const succeeded = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;
        console.log(`[SW] Precaching complete: ${succeeded} cached, ${failed} failed`);
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Install failed:', error);
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
              // Delete caches that don't match current versions
              return (name.startsWith('darwin-mfc-') || name.startsWith(CACHE_VERSION)) &&
                     name !== CACHE_VERSION &&
                     name !== DATA_CACHE &&
                     name !== STATIC_CACHE &&
                     name !== IMAGE_CACHE &&
                     name !== FONT_CACHE;
            })
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim(),
    ]).then(() => {
      console.log('[SW] Activation complete');
    })
  );
});

// =============================================================================
// FETCH EVENT - MAIN ROUTING LOGIC
// =============================================================================

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (different origin)
  if (url.origin !== self.location.origin) {
    return;
  }

  // Skip chrome-extension and other special protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Determine caching strategy based on request type
  if (isNavigationRequest(request)) {
    event.respondWith(handleNavigationRequest(request));
  } else if (isDataRequest(request, url)) {
    event.respondWith(handleDataRequest(request));
  } else if (isImageRequest(request, url)) {
    event.respondWith(handleStaticRequest(request, IMAGE_CACHE));
  } else if (isFontRequest(request, url)) {
    event.respondWith(handleStaticRequest(request, FONT_CACHE));
  } else if (isStaticAsset(request, url)) {
    event.respondWith(handleStaticRequest(request, STATIC_CACHE));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

// =============================================================================
// REQUEST TYPE DETECTION
// =============================================================================

function isNavigationRequest(request) {
  return request.mode === 'navigate' || request.destination === 'document';
}

function isDataRequest(request, url) {
  // Medical data JSON files
  return url.pathname.endsWith('.json') ||
         url.pathname.includes('/api/') ||
         url.pathname.includes('/data/');
}

function isStaticAsset(request, url) {
  return url.pathname.includes('/_next/static/') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.map');
}

function isImageRequest(request, url) {
  return request.destination === 'image' ||
         /\.(png|jpg|jpeg|gif|svg|webp|ico|avif)$/i.test(url.pathname);
}

function isFontRequest(request, url) {
  return request.destination === 'font' ||
         /\.(woff|woff2|ttf|eot|otf)$/i.test(url.pathname);
}

// =============================================================================
// CACHE-FIRST STRATEGY (for static assets)
// =============================================================================

async function handleStaticRequest(request, cacheName = STATIC_CACHE) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If not in cache, fetch from network
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      // Clone response before caching (response can only be read once)
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.warn('[SW] Static request failed:', request.url, error.message);

    // Return a minimal error response for static assets
    return new Response('Resource unavailable offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// =============================================================================
// STALE-WHILE-REVALIDATE STRATEGY (for medical data)
// =============================================================================

async function handleDataRequest(request) {
  const cache = await caches.open(DATA_CACHE);

  try {
    // Get cached response (stale)
    const cachedResponse = await cache.match(request);

    // Start network fetch (revalidate) in parallel
    const fetchPromise = fetch(request)
      .then(async (networkResponse) => {
        if (networkResponse.ok) {
          // Update cache with fresh data
          await cache.put(request, networkResponse.clone());

          // Trim cache if too large
          trimCache(DATA_CACHE, MAX_DATA_CACHE_ITEMS);
        }
        return networkResponse;
      })
      .catch((error) => {
        console.warn('[SW] Data fetch failed:', request.url, error.message);
        return null;
      });

    // Return cached response immediately if available (stale)
    // Otherwise wait for network response
    if (cachedResponse) {
      // Don't await fetchPromise - let it update cache in background
      fetchPromise.catch(() => {}); // Prevent unhandled rejection
      return cachedResponse;
    }

    // No cache available, must wait for network
    const networkResponse = await fetchPromise;
    if (networkResponse) {
      return networkResponse;
    }

    // Both cache and network failed
    return new Response(JSON.stringify({ error: 'Data unavailable offline' }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[SW] Data request error:', error);

    // Try cache as last resort
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response(JSON.stringify({ error: 'Data unavailable offline' }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// =============================================================================
// NETWORK-FIRST STRATEGY (for navigation/HTML pages)
// =============================================================================

async function handleNavigationRequest(request) {
  try {
    // Try network first for fresh content
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache the successful response
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.warn('[SW] Navigation fetch failed:', request.url, error.message);

    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // No cache available, return offline page
    const offlinePage = await caches.match(OFFLINE_URL);
    if (offlinePage) {
      return offlinePage;
    }

    // Absolute fallback
    return new Response(
      '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }
}

// =============================================================================
// DYNAMIC REQUEST HANDLER (fallback)
// =============================================================================

async function handleDynamicRequest(request) {
  const cache = await caches.open(STATIC_CACHE);

  try {
    // Try network first
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('Resource unavailable offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// =============================================================================
// CACHE MANAGEMENT UTILITIES
// =============================================================================

/**
 * Trim cache to maximum number of items (LRU-style removal)
 */
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    if (keys.length > maxItems) {
      const deleteCount = keys.length - maxItems;
      // Delete oldest entries (first in array)
      for (let i = 0; i < deleteCount; i++) {
        await cache.delete(keys[i]);
      }
      console.log(`[SW] Trimmed ${deleteCount} items from ${cacheName}`);
    }
  } catch (error) {
    console.error('[SW] Cache trim failed:', error);
  }
}

/**
 * Get total cache size in bytes
 */
async function getCacheSize() {
  let totalSize = 0;

  try {
    const cacheNames = await caches.keys();

    for (const cacheName of cacheNames) {
      if (!cacheName.startsWith('darwin-mfc')) continue;

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
  } catch (error) {
    console.error('[SW] Cache size calculation failed:', error);
  }

  return totalSize;
}

// =============================================================================
// MESSAGE HANDLING
// =============================================================================

self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};

  switch (type) {
    case 'SKIP_WAITING':
      // Activate new service worker immediately
      self.skipWaiting();
      break;

    case 'CACHE_URLS':
      // Cache specific URLs on demand
      if (payload && Array.isArray(payload.urls)) {
        caches.open(DATA_CACHE).then((cache) => {
          payload.urls.forEach(url => {
            cache.add(url).catch(err => {
              console.warn('[SW] Failed to cache URL:', url, err.message);
            });
          });
        });
      }
      break;

    case 'CLEAR_CACHE':
      // Clear all caches
      caches.keys().then((names) => {
        Promise.all(
          names
            .filter(name => name.startsWith('darwin-mfc'))
            .map(name => caches.delete(name))
        ).then(() => {
          console.log('[SW] All caches cleared');
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ success: true });
          }
        });
      });
      break;

    case 'CLEAR_DATA_CACHE':
      // Clear only the data cache
      caches.delete(DATA_CACHE).then((deleted) => {
        console.log('[SW] Data cache cleared:', deleted);
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: deleted });
        }
      });
      break;

    case 'GET_CACHE_SIZE':
      // Return total cache size
      getCacheSize().then(size => {
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ size });
        }
      });
      break;

    case 'GET_CACHE_VERSION':
      // Return current cache version
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({
          version: CACHE_VERSION,
          dataCache: DATA_CACHE,
        });
      }
      break;

    case 'PREFETCH_LOCALE':
      // Prefetch pages for a specific locale
      if (payload && payload.locale && LOCALES.includes(payload.locale)) {
        const urls = LOCALE_PAGES.map(page => path(`/${payload.locale}${page}`));
        caches.open(STATIC_CACHE).then((cache) => {
          Promise.allSettled(urls.map(url => cache.add(url))).then((results) => {
            const succeeded = results.filter(r => r.status === 'fulfilled').length;
            console.log(`[SW] Prefetched ${succeeded}/${urls.length} pages for locale: ${payload.locale}`);
          });
        });
      }
      break;

    default:
      console.log('[SW] Unknown message type:', type);
  }
});

// =============================================================================
// ERROR HANDLING
// =============================================================================

self.addEventListener('error', (event) => {
  console.error('[SW] Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled rejection:', event.reason);
});

// =============================================================================
// INITIALIZATION LOG
// =============================================================================

console.log('[SW] Service worker loaded');
console.log('[SW] Cache version:', CACHE_VERSION);
console.log('[SW] Data cache:', DATA_CACHE);
console.log('[SW] Base path:', BASE_PATH || '(root)');
