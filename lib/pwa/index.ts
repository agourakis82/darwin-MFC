/**
 * PWA MODULE - EXPORTS
 * ======================
 *
 * Progressive Web App features for Darwin-MFC
 * Complete mobile-first PWA implementation
 *
 * @example
 * ```tsx
 * import {
 *   // Manifest & Service Worker
 *   generateManifest,
 *   registerServiceWorker,
 *   isPWAInstallable,
 *   isInstalledPWA,
 *
 *   // Components
 *   InstallPrompt,
 *   OfflineBanner,
 *   BottomNavBar,
 *   MobileHeader,
 *   AppShell,
 *   FloatingActionButton,
 *   ActionSheet,
 *
 *   // Performance
 *   useNetworkStatus,
 *   useBatteryStatus,
 *   useAdaptiveLoadingStrategy,
 *
 *   // Notifications
 *   showClinicalAlert,
 *   subscribeToPushNotifications,
 *
 *   // Touch Gestures
 *   PullToRefresh,
 *   SwipeActions,
 *   LongPressMenu,
 * } from '@/lib/pwa';
 * ```
 */

// Import functions needed for initializePWA
import {
  registerServiceWorker as registerSW,
  isOffline as checkIsOffline,
  prefetchURLs as prefetch
} from './service-worker';
import {
  isInstalledPWA as checkIsInstalledPWA,
  isPWAInstallable as checkIsPWAInstallable,
  getPWADisplayMode as getDisplayMode
} from './manifest-generator';
import { getDeviceCapabilities as getCapabilities } from './performance';

// ============================================================================
// MANIFEST & SERVICE WORKER
// ============================================================================

export {
  // Types
  type PWAManifestConfig,
  type Screenshot,
  type Shortcut,
  type Icon,

  // Constants
  DARWIN_MFC_MANIFEST,

  // Functions
  generateManifest,
  generateManifestJSON,
  generateIconSizes,
  generateMaskableIcons,
  isPWAInstallable,
  isInstalledPWA,
  getPWADisplayMode,
} from './manifest-generator';

export {
  // Constants
  SW_VERSION,
  CACHE_NAME,
  CACHE_CONFIG,

  // Functions
  registerServiceWorker,
  unregisterServiceWorker,
  updateServiceWorker,
  skipWaiting,
  clearAllCaches,
  getCacheSize,
  formatCacheSize,
  isOffline,
  onConnectionChange,
  prefetchURLs,
  sendMessageToSW,
} from './service-worker';

// ============================================================================
// COMPONENTS
// ============================================================================

// Install & Offline
export {
  InstallPrompt,
  InstallButton,
  PWAStatusBadge,
} from './components/install-prompt';

export {
  OfflineBanner,
  OfflineStatusIndicator,
  OfflineFallback,
} from './components/offline-indicator';

// Navigation
export {
  type NavItem,
  type NavSection,
  BottomNavBar,
  HamburgerMenu,
  MobileHeader,
  SwipeableTabs,
  type SwipeableTab,
  SafeArea,
  MobileLayout,
} from './components/mobile-navigation';

// Touch Gestures
export {
  PullToRefresh,
  SwipeActions,
  type SwipeAction,
  LongPressMenu,
  type LongPressMenuItem,
  OverscrollEffect,
  TouchRipple,
  MomentumScroll,
} from './components/touch-gestures';

// Mobile Components
export {
  ActionSheet,
  type ActionSheetOption,
  Toast,
  type ToastVariant,
  useToast,
  FloatingActionButton,
  MobileSearchBar,
  MobileFilterSheet,
  type FilterOption,
  type FilterGroup,
  ShareSheet,
} from './components/mobile-components';

// App Shell
export {
  AppShell,
  HeaderSkeleton,
  SidebarSkeleton,
  BottomNavSkeleton,
  ContentSkeleton,
  CardSkeleton,
  TableSkeleton,
  RouteLoader,
  ProgressiveLoad,
  LoadingSpinner,
  PageTransition,
  AppShellPreloader,
} from './app-shell';

// ============================================================================
// PERFORMANCE
// ============================================================================

export {
  // Types
  type ConnectionType,
  type EffectiveConnectionType,
  type DeviceCapabilities,
  type PerformanceMetrics,
  type LoadingStrategy,
  type ImageOptimizationOptions,

  // Network
  getNetworkInformation,
  getEffectiveConnectionType,
  useNetworkStatus,

  // Battery
  useBatteryStatus,

  // Device
  getDeviceCapabilities,
  useDeviceCapabilities,

  // Images
  useLazyImage,
  getOptimizedImageUrl,
  useAdaptiveImageQuality,

  // Performance Monitoring
  usePerformanceMonitoring,
  useAdaptiveLoadingStrategy,

  // Memory
  useMemoryPressure,

  // Virtual Scroll
  useVirtualScroll,

  // Prefetch
  prefetchResource,
  preloadResource,
  usePrefetchOnHover,

  // Utils
  useDebounce,
  useThrottle,
} from './performance';

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export {
  // Types
  type NotificationPreferences,
  type PushSubscriptionState,
  type NotificationPayload,

  // Store
  useNotificationStore,

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
} from './notifications';

// ============================================================================
// PWA INITIALIZATION HELPER
// ============================================================================

export interface PWAConfig {
  vapidPublicKey?: string;
  enableNotifications?: boolean;
  enableOfflineMode?: boolean;
  showInstallPrompt?: boolean;
  installPromptDelay?: number;
}

/**
 * Initialize all PWA features
 * Call this once in your app's root component
 */
export async function initializePWA(config: PWAConfig = {}) {
  const {
    vapidPublicKey,
    enableNotifications = true,
    enableOfflineMode = true,
    showInstallPrompt = true,
    installPromptDelay = 30000,
  } = config;

  console.log('🚀 Initializing Darwin-MFC PWA...');

  // Register Service Worker
  if (enableOfflineMode) {
    try {
      await registerSW();
      console.log('✅ Service Worker registered');
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  }

  // Initialize Notifications
  if (enableNotifications && vapidPublicKey) {
    try {
      const { initializeNotifications } = await import('./notifications');
      await initializeNotifications(vapidPublicKey);
      console.log('✅ Notifications initialized');
    } catch (error) {
      console.error('❌ Notifications initialization failed:', error);
    }
  }

  // Check PWA installation status
  const installed = checkIsInstalledPWA();
  const installable = checkIsPWAInstallable();

  console.log('📱 PWA Status:', {
    installed,
    installable,
    displayMode: getDisplayMode(),
  });

  // Log device capabilities
  const capabilities = getCapabilities();
  console.log('📊 Device Capabilities:', {
    memory: `${capabilities.deviceMemory}GB`,
    cores: capabilities.hardwareConcurrency,
    isLowEnd: capabilities.isLowEndDevice,
    isMobile: capabilities.isMobile,
  });

  console.log('✅ PWA initialization complete');

  return {
    installed,
    installable,
    capabilities,
  };
}

// ============================================================================
// PWA UTILITIES
// ============================================================================

/**
 * Check if app is running in standalone mode (installed PWA)
 */
export function isStandalone(): boolean {
  return checkIsInstalledPWA();
}

/**
 * Get comprehensive PWA status
 */
export function getPWAStatus() {
  return {
    isInstalled: checkIsInstalledPWA(),
    isInstallable: checkIsPWAInstallable(),
    isStandalone: isStandalone(),
    displayMode: getDisplayMode(),
    isOffline: checkIsOffline(),
    capabilities: getCapabilities(),
  };
}

/**
 * Prefetch critical resources for offline use
 */
export async function prefetchCriticalResources(urls: string[]) {
  try {
    await prefetch(urls);
    console.log('✅ Critical resources prefetched:', urls.length);
  } catch (error) {
    console.error('❌ Prefetch failed:', error);
  }
}

// ============================================================================
// RE-EXPORTS FROM NESTED MODULES
// ============================================================================

// Note: Default exports commented out as modules use named exports
// export { default as manifestGenerator } from './manifest-generator';
// export { default as serviceWorker } from './service-worker';
// export { default as performance } from './performance';
// export { default as notifications } from './notifications';
// export { default as appShell } from './app-shell';
// export { default as mobileComponents } from './components/mobile-components';
