/**
 * PUSH NOTIFICATION SYSTEM
 * =========================
 *
 * Complete push notification system for PWA
 * Permission management, subscription, and notifications
 *
 * Features:
 * - Push notification subscription
 * - Permission handling
 * - Notification display
 * - Background sync integration
 * - Rich notifications with actions
 * - Notification preferences
 * - Badge management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================================================
// TYPES
// ============================================================================

export interface NotificationPreferences {
  enabled: boolean;
  clinical: boolean;
  updates: boolean;
  reminders: boolean;
  alerts: boolean;
}

export interface PushSubscriptionState {
  subscription: PushSubscription | null;
  isSupported: boolean;
  isSubscribed: boolean;
  permission: NotificationPermission;
  preferences: NotificationPreferences;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  vibrate?: number[];
  actions?: NotificationAction[];
  data?: any;
}

// ============================================================================
// NOTIFICATION STORE
// ============================================================================

interface NotificationStore extends PushSubscriptionState {
  setSubscription: (subscription: PushSubscription | null) => void;
  setPermission: (permission: NotificationPermission) => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      subscription: null,
      isSupported: false,
      isSubscribed: false,
      permission: 'default',
      preferences: {
        enabled: true,
        clinical: true,
        updates: true,
        reminders: true,
        alerts: true,
      },

      setSubscription: (subscription) =>
        set({ subscription, isSubscribed: subscription !== null }),

      setPermission: (permission) => set({ permission }),

      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),
    }),
    {
      name: 'darwin-mfc-notifications',
      version: 1,
    }
  )
);

// ============================================================================
// NOTIFICATION PERMISSION
// ============================================================================

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('Notifications not supported');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  useNotificationStore.getState().setPermission(permission);

  return permission;
}

export function getNotificationPermission(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }

  return Notification.permission;
}

export function isNotificationSupported(): boolean {
  return (
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

// ============================================================================
// PUSH SUBSCRIPTION
// ============================================================================

export interface SubscribeOptions {
  vapidPublicKey: string;
  userVisibleOnly?: boolean;
}

export async function subscribeToPushNotifications(
  options: SubscribeOptions
): Promise<PushSubscription | null> {
  if (!isNotificationSupported()) {
    console.error('Push notifications not supported');
    return null;
  }

  try {
    // Request permission first
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }

    // Get service worker registration
    const registration = await navigator.serviceWorker.ready;

    // Check for existing subscription
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      useNotificationStore.getState().setSubscription(existingSubscription);
      return existingSubscription;
    }

    // Create new subscription
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: options.userVisibleOnly ?? true,
      applicationServerKey: urlBase64ToUint8Array(options.vapidPublicKey) as BufferSource,
    });

    useNotificationStore.getState().setSubscription(subscription);
    console.log('Push subscription created:', subscription);

    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    return null;
  }
}

export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const success = await subscription.unsubscribe();
      if (success) {
        useNotificationStore.getState().setSubscription(null);
        console.log('Unsubscribed from push notifications');
      }
      return success;
    }

    return false;
  } catch (error) {
    console.error('Failed to unsubscribe from push notifications:', error);
    return false;
  }
}

export async function getPushSubscription(): Promise<PushSubscription | null> {
  if (!isNotificationSupported()) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    useNotificationStore.getState().setSubscription(subscription);
    return subscription;
  } catch (error) {
    console.error('Failed to get push subscription:', error);
    return null;
  }
}

// ============================================================================
// NOTIFICATION DISPLAY
// ============================================================================

export async function showNotification(
  payload: NotificationPayload
): Promise<void> {
  if (!('Notification' in window)) {
    console.warn('Notifications not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    await registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon || '/icons/icon-192x192.png',
      badge: payload.badge || '/icons/badge-96x96.png',
      image: payload.image,
      tag: payload.tag,
      requireInteraction: payload.requireInteraction,
      silent: payload.silent,
      vibrate: payload.vibrate || [200, 100, 200],
      actions: payload.actions,
      data: payload.data,
    } as any);

    console.log('Notification shown:', payload.title);
  } catch (error) {
    console.error('Failed to show notification:', error);
  }
}

// ============================================================================
// PREDEFINED NOTIFICATIONS
// ============================================================================

export async function showClinicalAlert(
  title: string,
  message: string,
  severity: 'info' | 'warning' | 'critical' = 'info'
): Promise<void> {
  const preferences = useNotificationStore.getState().preferences;
  if (!preferences.enabled || !preferences.clinical) {
    return;
  }

  const icons = {
    info: '/icons/alert-info.png',
    warning: '/icons/alert-warning.png',
    critical: '/icons/alert-critical.png',
  };

  await showNotification({
    title: `🏥 ${title}`,
    body: message,
    icon: icons[severity],
    requireInteraction: severity === 'critical',
    vibrate: severity === 'critical' ? [300, 100, 300, 100, 300] : [200, 100, 200],
    tag: `clinical-alert-${severity}`,
    actions: [
      {
        action: 'view',
        title: 'View Details',
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
      },
    ],
    data: {
      type: 'clinical-alert',
      severity,
    },
  });
}

export async function showDrugInteractionWarning(
  drug1: string,
  drug2: string,
  severity: string
): Promise<void> {
  const preferences = useNotificationStore.getState().preferences;
  if (!preferences.enabled || !preferences.alerts) {
    return;
  }

  await showNotification({
    title: '⚠️ Drug Interaction Detected',
    body: `Potential ${severity} interaction between ${drug1} and ${drug2}`,
    icon: '/icons/drug-interaction.png',
    requireInteraction: severity === 'major' || severity === 'contraindicated',
    vibrate: [300, 100, 300],
    tag: 'drug-interaction',
    actions: [
      {
        action: 'view-interaction',
        title: 'View Interaction',
      },
      {
        action: 'check-alternatives',
        title: 'Check Alternatives',
      },
    ],
    data: {
      type: 'drug-interaction',
      drug1,
      drug2,
      severity,
    },
  });
}

export async function showReminderNotification(
  title: string,
  message: string,
  time: Date
): Promise<void> {
  const preferences = useNotificationStore.getState().preferences;
  if (!preferences.enabled || !preferences.reminders) {
    return;
  }

  await showNotification({
    title: `⏰ ${title}`,
    body: message,
    icon: '/icons/reminder.png',
    vibrate: [200, 100, 200],
    tag: `reminder-${time.getTime()}`,
    actions: [
      {
        action: 'complete',
        title: 'Mark Complete',
      },
      {
        action: 'snooze',
        title: 'Snooze 10min',
      },
    ],
    data: {
      type: 'reminder',
      time: time.toISOString(),
    },
  });
}

export async function showUpdateNotification(version: string): Promise<void> {
  const preferences = useNotificationStore.getState().preferences;
  if (!preferences.enabled || !preferences.updates) {
    return;
  }

  await showNotification({
    title: '🔄 Update Available',
    body: `Version ${version} is now available. Update to get the latest features and improvements.`,
    icon: '/icons/update.png',
    requireInteraction: false,
    vibrate: [200, 100, 200],
    tag: 'app-update',
    actions: [
      {
        action: 'update-now',
        title: 'Update Now',
      },
      {
        action: 'later',
        title: 'Later',
      },
    ],
    data: {
      type: 'update',
      version,
    },
  });
}

// ============================================================================
// BADGE MANAGEMENT
// ============================================================================

export async function setBadgeCount(count: number): Promise<void> {
  if (!('setAppBadge' in navigator)) {
    console.warn('Badge API not supported');
    return;
  }

  try {
    if (count > 0) {
      // @ts-ignore
      await navigator.setAppBadge(count);
    } else {
      // @ts-ignore
      await navigator.clearAppBadge();
    }
  } catch (error) {
    console.error('Failed to set badge count:', error);
  }
}

export async function clearBadge(): Promise<void> {
  if (!('clearAppBadge' in navigator)) {
    return;
  }

  try {
    // @ts-ignore
    await navigator.clearAppBadge();
  } catch (error) {
    console.error('Failed to clear badge:', error);
  }
}

// ============================================================================
// NOTIFICATION ACTIONS
// ============================================================================

export async function handleNotificationClick(
  event: any
): Promise<void> {
  const notification = event.notification;
  const action = event.action;
  const data = notification.data;

  console.log('Notification clicked:', { action, data });

  notification.close();

  // Handle different action types
  switch (action) {
    case 'view':
    case 'view-interaction':
      // Open relevant page
      if (data.type === 'drug-interaction') {
        await openWindow('/medicamentos/interacoes');
      } else if (data.type === 'clinical-alert') {
        await openWindow('/alerts');
      }
      break;

    case 'check-alternatives':
      await openWindow(`/medicamentos/comparador`);
      break;

    case 'complete':
      // Mark reminder as complete
      // This would integrate with your reminder system
      break;

    case 'snooze':
      // Snooze reminder for 10 minutes
      // This would reschedule the notification
      break;

    case 'update-now':
      // Trigger app update
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        await registration.update();
        await openWindow('/');
      }
      break;

    default:
      // Default: open app
      await openWindow('/');
  }
}

async function openWindow(url: string): Promise<void> {
  const clients = await (self as any).clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  // Check if there's already a window open
  for (const client of clients) {
    if ('focus' in client) {
      await client.focus();
      if ('navigate' in client) {
        // @ts-ignore
        await client.navigate(url);
      }
      return;
    }
  }

  // No window open, open a new one
  if ('openWindow' in (self as any).clients) {
    await (self as any).clients.openWindow(url);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// ============================================================================
// INITIALIZATION
// ============================================================================

export async function initializeNotifications(
  vapidPublicKey?: string
): Promise<void> {
  if (!isNotificationSupported()) {
    console.warn('Notifications not supported');
    useNotificationStore.setState({ isSupported: false });
    return;
  }

  useNotificationStore.setState({ isSupported: true });

  // Check current permission
  const permission = getNotificationPermission();
  useNotificationStore.getState().setPermission(permission);

  // Get existing subscription
  const subscription = await getPushSubscription();

  // Subscribe if permission granted and VAPID key provided
  if (permission === 'granted' && vapidPublicKey && !subscription) {
    await subscribeToPushNotifications({ vapidPublicKey });
  }

  console.log('Notification system initialized');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Permission
  requestNotificationPermission,
  getNotificationPermission,
  isNotificationSupported,

  // Subscription
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  getPushSubscription,

  // Notifications
  showNotification,
  showClinicalAlert,
  showDrugInteractionWarning,
  showReminderNotification,
  showUpdateNotification,

  // Badge
  setBadgeCount,
  clearBadge,

  // Actions
  handleNotificationClick,

  // Initialization
  initializeNotifications,

  // Store
  useNotificationStore,
};
