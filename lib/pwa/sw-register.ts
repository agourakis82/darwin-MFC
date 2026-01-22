/**
 * Service Worker Registration
 * Handles PWA setup, offline support, and push notifications
 */

export function registerServiceWorker() {
  // Only register in browser environment
  if (typeof window === 'undefined') {
    return;
  }

  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers not supported');
    return;
  }

  // Register service worker
  navigator.serviceWorker.register('/service-worker.js', {
    scope: '/',
  })
    .then((registration) => {
      console.log('Service Worker registered:', registration);

      // Check for updates
      const checkForUpdates = () => {
        registration.update().catch(err => console.error('Update check failed:', err));
      };

      // Check for updates periodically (every 6 hours)
      setInterval(checkForUpdates, 6 * 60 * 60 * 1000);

      // Listen for new service worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker ready
            console.log('New service worker available');
            notifyUserOfUpdate();
          }
        });
      });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });

  // Handle controller change (new SW taking over)
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

/**
 * Notify user of PWA update
 */
function notifyUserOfUpdate() {
  // You could show a toast or modal here
  console.log('PWA update available - user should refresh');
  
  // Optionally send message to service worker
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SKIP_WAITING'
    });
  }
}

/**
 * Request permission for push notifications
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPushNotifications() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return null;
  }

  const permission = await requestNotificationPermission();
  if (!permission) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    });

    console.log('Push subscription successful:', subscription);
    return subscription;
  } catch (error) {
    console.error('Push subscription failed:', error);
    return null;
  }
}

/**
 * Register background sync
 */
export async function registerBackgroundSync(tag: string) {
  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
    console.log('Background sync not supported');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const syncRegistration = registration as any;
    if (syncRegistration.sync) {
      await syncRegistration.sync.register(tag);
      console.log('Background sync registered:', tag);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Background sync registration failed:', error);
    return false;
  }
}

/**
 * Check if app is installable
 */
export function isAppInstallable() {
  if (typeof window === 'undefined') return false;
  return 'beforeinstallprompt' in window;
}

/**
 * Show install prompt
 */
export async function showInstallPrompt(event: Event) {
  const deferredPrompt = event as any;
  
  if (!deferredPrompt) {
    console.log('Install prompt not available');
    return false;
  }

  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    return outcome === 'accepted';
  } catch (error) {
    console.error('Install prompt error:', error);
    return false;
  }
}

/**
 * Get installation status
 */
export async function getInstallationStatus() {
  if (typeof window === 'undefined') return 'not-installed';

  // Check if running as PWA
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'installed-standalone';
  }

  const nav = navigator as any;
  if (nav.standalone === true) {
    return 'installed-ios';
  }

  if ('beforeinstallprompt' in window) {
    return 'installable';
  }

  return 'not-installable';
}
