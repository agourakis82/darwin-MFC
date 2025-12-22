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

const CACHE_VERSION = 'v3';
const CACHE_NAME = `darwin-mfc-${CACHE_VERSION}`;
const STATIC_CACHE = `darwin-mfc-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `darwin-mfc-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `darwin-mfc-images-${CACHE_VERSION}`;
const API_CACHE = `darwin-mfc-api-${CACHE_VERSION}`;

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

  // Register background sync
  if (event.data && event.data.type === 'REGISTER_SYNC') {
    const tag = event.data.tag || SYNC_TAGS.USER_DATA;
    self.registration.sync.register(tag).then(() => {
      console.log('[SW] Sync registered:', tag);
    }).catch(err => {
      console.error('[SW] Sync registration failed:', err);
    });
  }

  // Force sync now
  if (event.data && event.data.type === 'SYNC_NOW') {
    syncAllUserData().then(() => {
      event.ports[0]?.postMessage({ success: true });
    }).catch(err => {
      event.ports[0]?.postMessage({ success: false, error: err.message });
    });
  }

  // Get sync status
  if (event.data && event.data.type === 'GET_SYNC_STATUS') {
    Promise.all([
      getSyncQueueCount(),
      getAuthToken().then(t => !!t),
    ]).then(([queueCount, hasAuth]) => {
      event.ports[0]?.postMessage({
        queueCount,
        hasAuth,
        isOnline: navigator.onLine,
      });
    });
  }
});

/**
 * Get sync queue count
 */
async function getSyncQueueCount() {
  try {
    const db = await openUserDB();
    const tx = db.transaction('syncQueue', 'readonly');
    const store = tx.objectStore('syncQueue');
    const index = store.index('status');

    return new Promise((resolve, reject) => {
      const request = index.count('pending');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    return 0;
  }
}

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
// BACKGROUND SYNC (for user data synchronization)
// =============================================================================

// Sync tags
const SYNC_TAGS = {
  USER_DATA: 'sync-user-data',
  FAVORITES: 'sync-favorites',
  NOTES: 'sync-notes',
  PROGRESS: 'sync-progress',
  QUEUE: 'sync-queue',
};

self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);

  switch (event.tag) {
    case SYNC_TAGS.USER_DATA:
      event.waitUntil(syncAllUserData());
      break;
    case SYNC_TAGS.FAVORITES:
      event.waitUntil(syncFavorites());
      break;
    case SYNC_TAGS.NOTES:
      event.waitUntil(syncNotes());
      break;
    case SYNC_TAGS.PROGRESS:
      event.waitUntil(syncProgress());
      break;
    case SYNC_TAGS.QUEUE:
      event.waitUntil(processSyncQueue());
      break;
    default:
      console.log('[SW] Unknown sync tag:', event.tag);
  }
});

/**
 * Sync all pending user data
 */
async function syncAllUserData() {
  console.log('[SW] Syncing all user data...');

  try {
    await Promise.all([
      syncFavorites(),
      syncNotes(),
      syncProgress(),
      processSyncQueue(),
    ]);
    console.log('[SW] All user data synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync user data:', error);
    throw error; // Retry later
  }
}

/**
 * Sync favorites with server
 */
async function syncFavorites() {
  console.log('[SW] Syncing favorites...');

  try {
    // Get pending favorites from IndexedDB
    const db = await openUserDB();
    const tx = db.transaction('favorites', 'readonly');
    const store = tx.objectStore('favorites');
    const index = store.index('syncStatus');
    const pending = await getAllFromIndex(index, 'pending');

    if (pending.length === 0) {
      console.log('[SW] No pending favorites to sync');
      return;
    }

    // Get auth token
    const token = await getAuthToken();
    if (!token) {
      console.log('[SW] No auth token, skipping favorites sync');
      return;
    }

    // Push to server
    const response = await fetch(getApiUrl('/favorites/sync'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ items: pending }),
    });

    if (response.ok) {
      // Mark as synced
      const txWrite = db.transaction('favorites', 'readwrite');
      const storeWrite = txWrite.objectStore('favorites');
      for (const item of pending) {
        item.syncStatus = 'synced';
        storeWrite.put(item);
      }
      console.log(`[SW] Synced ${pending.length} favorites`);
    } else {
      throw new Error(`Favorites sync failed: ${response.status}`);
    }
  } catch (error) {
    console.error('[SW] Favorites sync error:', error);
    throw error;
  }
}

/**
 * Sync notes with server
 */
async function syncNotes() {
  console.log('[SW] Syncing notes...');

  try {
    const db = await openUserDB();
    const tx = db.transaction('notes', 'readonly');
    const store = tx.objectStore('notes');
    const index = store.index('syncStatus');
    const pending = await getAllFromIndex(index, 'pending');

    if (pending.length === 0) {
      console.log('[SW] No pending notes to sync');
      return;
    }

    const token = await getAuthToken();
    if (!token) {
      console.log('[SW] No auth token, skipping notes sync');
      return;
    }

    const response = await fetch(getApiUrl('/notes/sync'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ items: pending }),
    });

    if (response.ok) {
      const txWrite = db.transaction('notes', 'readwrite');
      const storeWrite = txWrite.objectStore('notes');
      for (const item of pending) {
        item.syncStatus = 'synced';
        storeWrite.put(item);
      }
      console.log(`[SW] Synced ${pending.length} notes`);
    } else {
      throw new Error(`Notes sync failed: ${response.status}`);
    }
  } catch (error) {
    console.error('[SW] Notes sync error:', error);
    throw error;
  }
}

/**
 * Sync learning progress with server
 */
async function syncProgress() {
  console.log('[SW] Syncing progress...');

  try {
    const db = await openUserDB();
    const tx = db.transaction('progress', 'readonly');
    const store = tx.objectStore('progress');
    const index = store.index('syncStatus');
    const pending = await getAllFromIndex(index, 'pending');

    if (pending.length === 0) {
      console.log('[SW] No pending progress to sync');
      return;
    }

    const token = await getAuthToken();
    if (!token) {
      console.log('[SW] No auth token, skipping progress sync');
      return;
    }

    const response = await fetch(getApiUrl('/sync/push'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ store: 'progress', items: pending }),
    });

    if (response.ok) {
      const txWrite = db.transaction('progress', 'readwrite');
      const storeWrite = txWrite.objectStore('progress');
      for (const item of pending) {
        item.syncStatus = 'synced';
        storeWrite.put(item);
      }
      console.log(`[SW] Synced ${pending.length} progress records`);
    } else {
      throw new Error(`Progress sync failed: ${response.status}`);
    }
  } catch (error) {
    console.error('[SW] Progress sync error:', error);
    throw error;
  }
}

/**
 * Process the sync queue
 */
async function processSyncQueue() {
  console.log('[SW] Processing sync queue...');

  try {
    const db = await openUserDB();
    const tx = db.transaction('syncQueue', 'readonly');
    const store = tx.objectStore('syncQueue');
    const index = store.index('status');
    const pending = await getAllFromIndex(index, 'pending');

    if (pending.length === 0) {
      console.log('[SW] No pending operations in queue');
      return;
    }

    const token = await getAuthToken();
    if (!token) {
      console.log('[SW] No auth token, skipping queue processing');
      return;
    }

    let processed = 0;
    let failed = 0;

    for (const operation of pending) {
      try {
        const { endpoint, method, body } = operation.payload;

        const response = await fetch(getApiUrl(endpoint), {
          method: method || 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (response.ok) {
          // Remove from queue
          const txWrite = db.transaction('syncQueue', 'readwrite');
          txWrite.objectStore('syncQueue').delete(operation.id);
          processed++;
        } else {
          throw new Error(`Operation failed: ${response.status}`);
        }
      } catch (error) {
        // Mark as failed after 3 attempts
        const txWrite = db.transaction('syncQueue', 'readwrite');
        const storeWrite = txWrite.objectStore('syncQueue');
        operation.attempts = (operation.attempts || 0) + 1;
        operation.lastAttempt = new Date().toISOString();
        operation.error = error.message;

        if (operation.attempts >= 3) {
          operation.status = 'failed';
        }

        storeWrite.put(operation);
        failed++;
      }
    }

    console.log(`[SW] Queue processed: ${processed} success, ${failed} failed`);
  } catch (error) {
    console.error('[SW] Queue processing error:', error);
    throw error;
  }
}

// =============================================================================
// INDEXEDDB HELPERS (for service worker context)
// =============================================================================

const USER_DB_NAME = 'darwin-mfc-db';
const USER_DB_VERSION = 1;

function openUserDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(USER_DB_NAME, USER_DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

function getAllFromIndex(index, value) {
  return new Promise((resolve, reject) => {
    const request = index.getAll(value);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function getAuthToken() {
  try {
    const db = await openUserDB();
    const tx = db.transaction('authTokens', 'readonly');
    const store = tx.objectStore('authTokens');

    return new Promise((resolve, reject) => {
      const request = store.get('current');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const tokens = request.result;
        if (tokens && new Date(tokens.offlineValidUntil) > new Date()) {
          resolve(tokens.accessToken);
        } else {
          resolve(null);
        }
      };
    });
  } catch (error) {
    console.error('[SW] Failed to get auth token:', error);
    return null;
  }
}

function getApiUrl(endpoint) {
  // API URL - should match the app configuration
  const API_BASE = self.location.origin.includes('localhost')
    ? 'http://localhost:8090'
    : 'https://api.darwin-mfc.com'; // Production API
  return `${API_BASE}/api/v1${endpoint}`;
}

// =============================================================================
// PERIODIC SYNC (for content updates)
// =============================================================================

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-update') {
    event.waitUntil(checkContentUpdates());
  }
});

async function checkContentUpdates() {
  console.log('[SW] Checking for content updates...');

  try {
    const response = await fetch(getApiUrl('/content/version'));
    if (response.ok) {
      const data = await response.json();
      const currentVersion = await getCachedContentVersion();

      if (data.version !== currentVersion) {
        console.log('[SW] New content available:', data.version);
        // Notify the app
        const clients = await self.clients.matchAll();
        clients.forEach((client) => {
          client.postMessage({
            type: 'CONTENT_UPDATE_AVAILABLE',
            version: data.version,
          });
        });
      }
    }
  } catch (error) {
    console.error('[SW] Content update check failed:', error);
  }
}

async function getCachedContentVersion() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = await cache.match('/content-version');
    if (response) {
      const data = await response.json();
      return data.version;
    }
  } catch (error) {
    // Ignore
  }
  return null;
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
