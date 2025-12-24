/**
 * SERVICE WORKER CONFIGURATION
 * ==============================
 *
 * Advanced service worker with caching strategies
 * Offline support, background sync, and push notifications
 *
 * Caching Strategies:
 * - Cache First: Static assets, images, fonts
 * - Network First: API calls, dynamic content
 * - Stale While Revalidate: HTML pages, CSS, JS
 * - Cache Only: Offline fallbacks
 * - Network Only: Real-time data
 *
 * @example
 * ```tsx
 * import { registerServiceWorker } from './service-worker';
 *
 * registerServiceWorker();
 * ```
 */

export const SW_VERSION = 'v1.0.0';
export const CACHE_NAME = `darwin-mfc-${SW_VERSION}`;

// Cache configuration
export const CACHE_CONFIG = {
  // Static assets - Cache First
  static: {
    name: `${CACHE_NAME}-static`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxItems: 100,
    patterns: [
      /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
      /\.(?:woff|woff2|ttf|eot)$/,
      /\.(?:css|js)$/,
    ],
  },

  // Dynamic content - Network First
  dynamic: {
    name: `${CACHE_NAME}-dynamic`,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxItems: 50,
    patterns: [
      /^https:\/\/api\./,
      /\/api\//,
    ],
  },

  // Pages - Stale While Revalidate
  pages: {
    name: `${CACHE_NAME}-pages`,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxItems: 50,
    patterns: [
      /\/$/,
      /\.html$/,
    ],
  },
};

/**
 * Service Worker Registration
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered:', registration);

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker installed, prompt user to reload
            console.log('New Service Worker available');
            dispatchSWUpdateEvent();
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
}

/**
 * Unregister Service Worker
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const unregistered = await registration.unregister();
    console.log('Service Worker unregistered:', unregistered);
    return unregistered;
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
    return false;
  }
}

/**
 * Update Service Worker
 */
export async function updateServiceWorker(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    console.log('Service Worker update check complete');
  } catch (error) {
    console.error('Service Worker update failed:', error);
  }
}

/**
 * Skip waiting and activate new Service Worker
 */
export function skipWaiting(): void {
  if (typeof window === 'undefined' || !navigator.serviceWorker.controller) {
    return;
  }

  navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
}

/**
 * Dispatch custom event for SW updates
 */
function dispatchSWUpdateEvent(): void {
  const event = new CustomEvent('swUpdate', {
    detail: { type: 'update-available' },
  });
  window.dispatchEvent(event);
}

/**
 * Clear all caches
 */
export async function clearAllCaches(): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((cacheName) => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  } catch (error) {
    console.error('Cache clearing failed:', error);
  }
}

/**
 * Get cache size
 */
export async function getCacheSize(): Promise<number> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return 0;
  }

  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();

      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }

    return totalSize;
  } catch (error) {
    console.error('Cache size calculation failed:', error);
    return 0;
  }
}

/**
 * Format cache size for display
 */
export function formatCacheSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Check if offline
 */
export function isOffline(): boolean {
  if (typeof window === 'undefined') return false;
  return !navigator.onLine;
}

/**
 * Listen for online/offline events
 */
export function onConnectionChange(
  callback: (isOnline: boolean) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

/**
 * Prefetch URLs for offline use
 */
export async function prefetchURLs(urls: string[]): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return;
  }

  try {
    const cache = await caches.open(CACHE_CONFIG.pages.name);
    await cache.addAll(urls);
    console.log('URLs prefetched:', urls);
  } catch (error) {
    console.error('Prefetch failed:', error);
  }
}

/**
 * Service Worker message handler
 */
export function sendMessageToSW(message: any): void {
  if (typeof window === 'undefined' || !navigator.serviceWorker.controller) {
    return;
  }

  navigator.serviceWorker.controller.postMessage(message);
}
