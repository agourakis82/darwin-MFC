/**
 * SERVICE WORKER REGISTRATION UTILITIES - DARWIN-MFC
 * ====================================================
 *
 * Provides utilities for registering, unregistering, and managing
 * the service worker for offline functionality.
 *
 * SSG Compatible: All functions safely handle environments where
 * service workers are unavailable (SSR, build time, unsupported browsers).
 *
 * @example
 * ```tsx
 * import { registerServiceWorker, checkForUpdates } from '@/lib/utils/service-worker-registration';
 *
 * // In a client component or useEffect
 * useEffect(() => {
 *   registerServiceWorker().then((registration) => {
 *     if (registration) {
 *       console.log('SW registered');
 *     }
 *   });
 * }, []);
 * ```
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Service Worker registration result with additional metadata
 */
export interface ServiceWorkerRegistrationResult {
  registration: ServiceWorkerRegistration;
  isNewInstall: boolean;
  updateAvailable: boolean;
}

/**
 * Service Worker update event detail
 */
export interface ServiceWorkerUpdateEvent {
  type: 'update-available' | 'update-installed' | 'update-failed';
  registration?: ServiceWorkerRegistration;
  error?: Error;
}

/**
 * Message types for communicating with the service worker
 */
export type ServiceWorkerMessageType =
  | 'SKIP_WAITING'
  | 'CACHE_URLS'
  | 'CLEAR_CACHE'
  | 'CLEAR_DATA_CACHE'
  | 'GET_CACHE_SIZE'
  | 'GET_CACHE_VERSION'
  | 'PREFETCH_LOCALE';

/**
 * Message payload structure
 */
export interface ServiceWorkerMessage {
  type: ServiceWorkerMessageType;
  payload?: Record<string, unknown>;
}

// =============================================================================
// ENVIRONMENT CHECKS
// =============================================================================

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if service workers are supported
 */
function isServiceWorkerSupported(): boolean {
  return isBrowser() && 'serviceWorker' in navigator;
}

/**
 * Check if caches API is supported
 */
function isCacheAPISupported(): boolean {
  return isBrowser() && 'caches' in window;
}

// =============================================================================
// REGISTRATION FUNCTIONS
// =============================================================================

/**
 * Register the service worker for offline functionality.
 *
 * This function is SSG-safe and will return null if:
 * - Running during server-side rendering
 * - Service workers are not supported by the browser
 * - Registration fails for any reason
 *
 * @returns Promise resolving to ServiceWorkerRegistration or null
 *
 * @example
 * ```tsx
 * const registration = await registerServiceWorker();
 * if (registration) {
 *   console.log('Service Worker registered successfully');
 * }
 * ```
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  // SSG/SSR safety check
  if (!isServiceWorkerSupported()) {
    if (isBrowser()) {
      console.log('[SW Registration] Service workers not supported in this browser');
    }
    return null;
  }

  try {
    // Determine the correct service worker path
    // This handles both root deployment and GitHub Pages (with basePath)
    const swPath = getServiceWorkerPath();

    const registration = await navigator.serviceWorker.register(swPath, {
      scope: getScopeForPath(swPath),
    });

    console.log('[SW Registration] Service Worker registered successfully');
    console.log('[SW Registration] Scope:', registration.scope);

    // Set up update listener
    registration.addEventListener('updatefound', () => {
      const installingWorker = registration.installing;

      if (installingWorker) {
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New update available
              console.log('[SW Registration] New service worker available');
              dispatchUpdateEvent('update-available', registration);
            } else {
              // First install
              console.log('[SW Registration] Service worker installed for the first time');
            }
          }
        });
      }
    });

    // Listen for controller change (when new SW takes over)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW Registration] New service worker activated');
      dispatchUpdateEvent('update-installed', registration);
    });

    return registration;
  } catch (error) {
    console.error('[SW Registration] Registration failed:', error);
    return null;
  }
}

/**
 * Unregister all service workers.
 *
 * Useful for debugging or when you need to completely remove
 * service worker functionality.
 *
 * @returns Promise resolving to true if unregistration was successful
 *
 * @example
 * ```tsx
 * const success = await unregisterServiceWorker();
 * if (success) {
 *   console.log('Service Worker unregistered');
 * }
 * ```
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  // SSG/SSR safety check
  if (!isServiceWorkerSupported()) {
    return false;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();

    if (registrations.length === 0) {
      console.log('[SW Registration] No service workers to unregister');
      return true;
    }

    const results = await Promise.all(
      registrations.map((registration) => registration.unregister())
    );

    const allUnregistered = results.every((result) => result === true);

    if (allUnregistered) {
      console.log('[SW Registration] All service workers unregistered');
    } else {
      console.warn('[SW Registration] Some service workers failed to unregister');
    }

    return allUnregistered;
  } catch (error) {
    console.error('[SW Registration] Unregistration failed:', error);
    return false;
  }
}

/**
 * Check for service worker updates.
 *
 * Manually triggers an update check. Returns true if an update
 * is available and waiting to be installed.
 *
 * @returns Promise resolving to true if an update is available
 *
 * @example
 * ```tsx
 * const hasUpdate = await checkForUpdates();
 * if (hasUpdate) {
 *   // Show update notification to user
 *   showUpdateBanner();
 * }
 * ```
 */
export async function checkForUpdates(): Promise<boolean> {
  // SSG/SSR safety check
  if (!isServiceWorkerSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    // Trigger update check
    await registration.update();

    // Check if there's a waiting worker (update available)
    const hasUpdate = registration.waiting !== null;

    if (hasUpdate) {
      console.log('[SW Registration] Update available');
    } else {
      console.log('[SW Registration] No updates available');
    }

    return hasUpdate;
  } catch (error) {
    console.error('[SW Registration] Update check failed:', error);
    return false;
  }
}

// =============================================================================
// SERVICE WORKER COMMUNICATION
// =============================================================================

/**
 * Send a message to the active service worker.
 *
 * @param message - The message to send
 * @returns Promise resolving to the response from the service worker
 *
 * @example
 * ```tsx
 * // Request cache size
 * const response = await sendMessageToServiceWorker({
 *   type: 'GET_CACHE_SIZE'
 * });
 * console.log('Cache size:', response.size);
 * ```
 */
export async function sendMessageToServiceWorker<T = unknown>(
  message: ServiceWorkerMessage
): Promise<T | null> {
  // SSG/SSR safety check
  if (!isServiceWorkerSupported()) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const activeWorker = registration.active;

    if (!activeWorker) {
      console.warn('[SW Registration] No active service worker');
      return null;
    }

    // Create a message channel for the response
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = (event) => {
        resolve(event.data as T);
      };

      // Send message with response port
      activeWorker.postMessage(message, [messageChannel.port2]);

      // Timeout after 5 seconds
      setTimeout(() => {
        resolve(null);
      }, 5000);
    });
  } catch (error) {
    console.error('[SW Registration] Message send failed:', error);
    return null;
  }
}

/**
 * Skip waiting and activate the new service worker immediately.
 *
 * Call this after the user confirms they want to update.
 *
 * @example
 * ```tsx
 * // User clicked "Update now" button
 * skipWaitingServiceWorker();
 * window.location.reload();
 * ```
 */
export function skipWaitingServiceWorker(): void {
  if (!isServiceWorkerSupported()) {
    return;
  }

  navigator.serviceWorker.ready.then((registration) => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  });
}

// =============================================================================
// CACHE MANAGEMENT
// =============================================================================

/**
 * Clear all service worker caches.
 *
 * @returns Promise resolving to true if caches were cleared
 */
export async function clearAllCaches(): Promise<boolean> {
  if (!isCacheAPISupported()) {
    return false;
  }

  try {
    const cacheNames = await caches.keys();
    const darwinCaches = cacheNames.filter((name) =>
      name.startsWith('darwin-mfc')
    );

    await Promise.all(darwinCaches.map((name) => caches.delete(name)));

    console.log('[SW Registration] All caches cleared');
    return true;
  } catch (error) {
    console.error('[SW Registration] Cache clear failed:', error);
    return false;
  }
}

/**
 * Get the total size of all caches in bytes.
 *
 * @returns Promise resolving to the total cache size in bytes
 */
export async function getCacheSize(): Promise<number> {
  if (!isCacheAPISupported()) {
    return 0;
  }

  try {
    const response = await sendMessageToServiceWorker<{ size: number }>({
      type: 'GET_CACHE_SIZE',
    });

    return response?.size ?? 0;
  } catch (error) {
    console.error('[SW Registration] Cache size check failed:', error);
    return 0;
  }
}

/**
 * Format bytes to a human-readable string.
 *
 * @param bytes - The number of bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatCacheSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const base = 1024;
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
  const value = bytes / Math.pow(base, unitIndex);

  return `${value.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Prefetch URLs for offline access.
 *
 * @param urls - Array of URLs to cache
 */
export async function prefetchURLs(urls: string[]): Promise<void> {
  if (!isServiceWorkerSupported()) {
    return;
  }

  await sendMessageToServiceWorker({
    type: 'CACHE_URLS',
    payload: { urls },
  });
}

/**
 * Prefetch all pages for a specific locale.
 *
 * @param locale - The locale code (e.g., 'en', 'pt', 'es')
 */
export async function prefetchLocale(locale: string): Promise<void> {
  if (!isServiceWorkerSupported()) {
    return;
  }

  await sendMessageToServiceWorker({
    type: 'PREFETCH_LOCALE',
    payload: { locale },
  });
}

// =============================================================================
// EVENT HELPERS
// =============================================================================

/**
 * Custom event name for service worker updates
 */
export const SW_UPDATE_EVENT = 'darwin-mfc-sw-update';

/**
 * Dispatch a custom event for service worker updates.
 *
 * @param type - The type of update event
 * @param registration - The service worker registration
 */
function dispatchUpdateEvent(
  type: ServiceWorkerUpdateEvent['type'],
  registration?: ServiceWorkerRegistration
): void {
  if (!isBrowser()) {
    return;
  }

  const event = new CustomEvent<ServiceWorkerUpdateEvent>(SW_UPDATE_EVENT, {
    detail: { type, registration },
  });

  window.dispatchEvent(event);
}

/**
 * Listen for service worker update events.
 *
 * @param callback - Function to call when an update event occurs
 * @returns Cleanup function to remove the listener
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const cleanup = onServiceWorkerUpdate((event) => {
 *     if (event.type === 'update-available') {
 *       setShowUpdateBanner(true);
 *     }
 *   });
 *
 *   return cleanup;
 * }, []);
 * ```
 */
export function onServiceWorkerUpdate(
  callback: (event: ServiceWorkerUpdateEvent) => void
): () => void {
  if (!isBrowser()) {
    return () => {};
  }

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ServiceWorkerUpdateEvent>;
    callback(customEvent.detail);
  };

  window.addEventListener(SW_UPDATE_EVENT, handler);

  return () => {
    window.removeEventListener(SW_UPDATE_EVENT, handler);
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get the service worker path based on the current environment.
 *
 * Handles both root deployment and GitHub Pages deployment.
 */
function getServiceWorkerPath(): string {
  // Check if we're on GitHub Pages
  const pathname = window.location.pathname;

  if (pathname.startsWith('/darwin-MFC/')) {
    return '/darwin-MFC/sw.js';
  }

  return '/sw.js';
}

/**
 * Get the appropriate scope for the service worker path.
 */
function getScopeForPath(swPath: string): string {
  if (swPath.startsWith('/darwin-MFC/')) {
    return '/darwin-MFC/';
  }

  return '/';
}

/**
 * Check if the app is currently running offline.
 */
export function isOffline(): boolean {
  if (!isBrowser()) {
    return false;
  }

  return !navigator.onLine;
}

/**
 * Get the current service worker registration.
 *
 * @returns Promise resolving to the registration or null
 */
export async function getRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!isServiceWorkerSupported()) {
    return null;
  }

  try {
    return await navigator.serviceWorker.ready;
  } catch (error) {
    return null;
  }
}

/**
 * Check if a service worker is currently active.
 */
export async function isServiceWorkerActive(): Promise<boolean> {
  if (!isServiceWorkerSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    return registration.active !== null;
  } catch (error) {
    return false;
  }
}
