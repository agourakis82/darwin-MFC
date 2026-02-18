/**
 * Type augmentations for browser APIs not yet in TypeScript's lib.dom.d.ts.
 *
 * NOTE: NetworkInformation (navigator.connection), BatteryManager, and
 * navigator.getBattery are already declared in lib/pwa/performance.ts.
 * This file covers the remaining Chrome-specific / newer web APIs.
 */

// Chrome-specific performance.memory
interface PerformanceMemory {
  totalJSHeapSize: number;
  usedJSHeapSize: number;
  jsHeapSizeLimit: number;
}

declare global {
  interface Navigator {
    /** Chrome-specific: device RAM in GiB */
    deviceMemory?: number;
    /** Badging API */
    setAppBadge?(count?: number): Promise<void>;
    clearAppBadge?(): Promise<void>;
  }

  interface Performance {
    /** Chrome-specific memory info */
    memory?: PerformanceMemory;
  }

  /** Service Worker client with navigation capability */
  interface WindowClient extends Client {
    navigate(url: string): Promise<WindowClient>;
    readonly focused: boolean;
    readonly visibilityState: DocumentVisibilityState;
  }
}

export {};
