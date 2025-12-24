/**
 * MOBILE PERFORMANCE OPTIMIZATIONS
 * ==================================
 *
 * Performance utilities for mobile PWA
 * Lazy loading, image optimization, network awareness
 *
 * Features:
 * - Network-aware loading strategies
 * - Battery-aware performance tuning
 * - Device capability detection
 * - Memory management
 * - Image optimization
 * - Virtual scrolling helpers
 * - Performance monitoring
 */

import { useEffect, useState, useRef, useCallback } from 'react';

// ============================================================================
// NETWORK DETECTION
// ============================================================================

export type ConnectionType = '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';
export type EffectiveConnectionType = 'slow' | 'moderate' | 'fast' | 'unknown';

export interface NetworkInformation extends EventTarget {
  readonly effectiveType: ConnectionType;
  readonly downlink: number;
  readonly rtt: number;
  readonly saveData: boolean;
  onchange: ((this: NetworkInformation, ev: Event) => any) | null;
}

declare global {
  interface Navigator {
    readonly connection?: NetworkInformation;
    readonly mozConnection?: NetworkInformation;
    readonly webkitConnection?: NetworkInformation;
  }
}

export function getNetworkInformation(): NetworkInformation | null {
  if (typeof navigator === 'undefined') return null;
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
}

export function getEffectiveConnectionType(): EffectiveConnectionType {
  const connection = getNetworkInformation();
  if (!connection) return 'unknown';

  const effectiveType = connection.effectiveType;

  if (effectiveType === '4g') return 'fast';
  if (effectiveType === '3g') return 'moderate';
  if (effectiveType === '2g' || effectiveType === 'slow-2g') return 'slow';

  return 'unknown';
}

export function useNetworkStatus() {
  const [networkType, setNetworkType] = useState<EffectiveConnectionType>('unknown');
  const [saveData, setSaveData] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateNetworkStatus = () => {
      setNetworkType(getEffectiveConnectionType());
      const connection = getNetworkInformation();
      setSaveData(connection?.saveData || false);
      setIsOnline(navigator.onLine);
    };

    updateNetworkStatus();

    const connection = getNetworkInformation();
    connection?.addEventListener('change', updateNetworkStatus);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      connection?.removeEventListener('change', updateNetworkStatus);
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  return {
    networkType,
    saveData,
    isOnline,
    isFastConnection: networkType === 'fast',
    isSlowConnection: networkType === 'slow',
  };
}

// ============================================================================
// BATTERY DETECTION
// ============================================================================

export interface BatteryManager extends EventTarget {
  readonly charging: boolean;
  readonly chargingTime: number;
  readonly dischargingTime: number;
  readonly level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
  onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => any) | null;
}

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryManager>;
  }
}

export function useBatteryStatus() {
  const [batteryLevel, setBatteryLevel] = useState<number>(1);
  const [isCharging, setIsCharging] = useState<boolean>(true);
  const [isLowBattery, setIsLowBattery] = useState<boolean>(false);

  useEffect(() => {
    let battery: BatteryManager | null = null;

    const updateBatteryStatus = (bat: BatteryManager) => {
      setBatteryLevel(bat.level);
      setIsCharging(bat.charging);
      setIsLowBattery(bat.level < 0.2 && !bat.charging);
    };

    if (navigator.getBattery) {
      navigator.getBattery().then((bat) => {
        battery = bat;
        updateBatteryStatus(bat);

        bat.addEventListener('levelchange', () => updateBatteryStatus(bat));
        bat.addEventListener('chargingchange', () => updateBatteryStatus(bat));
      });
    }

    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', () => {});
        battery.removeEventListener('chargingchange', () => {});
      }
    };
  }, []);

  return {
    batteryLevel,
    isCharging,
    isLowBattery,
    shouldReducePerformance: isLowBattery,
  };
}

// ============================================================================
// DEVICE CAPABILITY DETECTION
// ============================================================================

export interface DeviceCapabilities {
  deviceMemory: number; // GB
  hardwareConcurrency: number; // CPU cores
  maxTouchPoints: number;
  devicePixelRatio: number;
  screenResolution: { width: number; height: number };
  isLowEndDevice: boolean;
  isMobile: boolean;
  isTablet: boolean;
}

export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      deviceMemory: 8,
      hardwareConcurrency: 4,
      maxTouchPoints: 0,
      devicePixelRatio: 1,
      screenResolution: { width: 1920, height: 1080 },
      isLowEndDevice: false,
      isMobile: false,
      isTablet: false,
    };
  }

  // @ts-ignore
  const deviceMemory = navigator.deviceMemory || 8;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const devicePixelRatio = window.devicePixelRatio || 1;
  const screenResolution = {
    width: window.screen.width,
    height: window.screen.height,
  };

  // Low-end device heuristics
  const isLowEndDevice = deviceMemory <= 2 || hardwareConcurrency <= 2;

  // Mobile/tablet detection
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);

  return {
    deviceMemory,
    hardwareConcurrency,
    maxTouchPoints,
    devicePixelRatio,
    screenResolution,
    isLowEndDevice,
    isMobile,
    isTablet,
  };
}

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(getDeviceCapabilities());

  useEffect(() => {
    setCapabilities(getDeviceCapabilities());
  }, []);

  return capabilities;
}

// ============================================================================
// LAZY IMAGE LOADING
// ============================================================================

export interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  className?: string;
}

export function useLazyImage(src: string, threshold: number = 0.1) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [src, threshold]);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setIsLoaded(true);
  }, [imageSrc]);

  return { imgRef, imageSrc, isLoaded };
}

// ============================================================================
// OPTIMIZED IMAGE URL GENERATION
// ============================================================================

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  // For Next.js Image Optimization API
  const params = new URLSearchParams();

  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());

  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

export function useAdaptiveImageQuality() {
  const { networkType, saveData } = useNetworkStatus();
  const { isLowEndDevice } = useDeviceCapabilities();

  // Determine optimal quality based on conditions
  let quality = 75; // Default

  if (saveData || isLowEndDevice) {
    quality = 50; // Low quality for data saving
  } else if (networkType === 'slow') {
    quality = 60;
  } else if (networkType === 'fast') {
    quality = 85;
  }

  return quality;
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number; // MB
  connectionSpeed: number; // Mbps
  latency: number; // ms
}

export function usePerformanceMonitoring(interval: number = 1000) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    connectionSpeed: 0,
    latency: 0,
  });

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + interval) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));

        // @ts-ignore
        const memory = performance.memory
          ? // @ts-ignore
            Math.round(performance.memory.usedJSHeapSize / 1048576)
          : 0;

        const connection = getNetworkInformation();
        const connectionSpeed = connection?.downlink || 0;
        const latency = connection?.rtt || 0;

        setMetrics({
          fps,
          memoryUsage: memory,
          connectionSpeed,
          latency,
        });

        frames = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const rafId = requestAnimationFrame(measureFPS);

    return () => cancelAnimationFrame(rafId);
  }, [interval]);

  return metrics;
}

// ============================================================================
// ADAPTIVE LOADING STRATEGY
// ============================================================================

export type LoadingStrategy = 'eager' | 'lazy' | 'minimal';

export function useAdaptiveLoadingStrategy(): LoadingStrategy {
  const { networkType, saveData } = useNetworkStatus();
  const { isLowBattery } = useBatteryStatus();
  const { isLowEndDevice } = useDeviceCapabilities();

  if (saveData || isLowBattery || isLowEndDevice || networkType === 'slow') {
    return 'minimal'; // Load only essential content
  }

  if (networkType === 'moderate') {
    return 'lazy'; // Load on-demand
  }

  return 'eager'; // Preload aggressively
}

// ============================================================================
// MEMORY MANAGEMENT
// ============================================================================

export function useMemoryPressure(threshold: number = 100) {
  const [isMemoryPressure, setIsMemoryPressure] = useState(false);

  useEffect(() => {
    const checkMemory = () => {
      // @ts-ignore
      if (performance.memory) {
        // @ts-ignore
        const usedMemory = performance.memory.usedJSHeapSize / 1048576; // MB
        setIsMemoryPressure(usedMemory > threshold);
      }
    };

    const intervalId = setInterval(checkMemory, 5000); // Check every 5s
    checkMemory();

    return () => clearInterval(intervalId);
  }, [threshold]);

  const clearCache = useCallback(() => {
    // Clear any in-memory caches
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          if (name.includes('runtime')) {
            caches.delete(name);
          }
        });
      });
    }
  }, []);

  return {
    isMemoryPressure,
    clearCache,
  };
}

// ============================================================================
// VIRTUAL SCROLLING HELPER
// ============================================================================

export interface VirtualScrollOptions {
  itemHeight: number;
  itemCount: number;
  overscan?: number;
}

export function useVirtualScroll(options: VirtualScrollOptions) {
  const { itemHeight, itemCount, overscan = 3 } = options;
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      setContainerHeight(entries[0].contentRect.height);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Calculate visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    itemCount - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = [];
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push(i);
  }

  const totalHeight = itemCount * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    containerRef,
    handleScroll,
    visibleItems,
    totalHeight,
    offsetY,
  };
}

// ============================================================================
// PREFETCH UTILITIES
// ============================================================================

export function prefetchResource(url: string, as: 'script' | 'style' | 'image' | 'fetch') {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
}

export function preloadResource(url: string, as: 'script' | 'style' | 'image' | 'fetch') {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
}

export function usePrefetchOnHover(urls: string[]) {
  const prefetchedRef = useRef(new Set<string>());

  const handleMouseEnter = useCallback(() => {
    urls.forEach((url) => {
      if (!prefetchedRef.current.has(url)) {
        prefetchResource(url, 'fetch');
        prefetchedRef.current.add(url);
      }
    });
  }, [urls]);

  return { onMouseEnter: handleMouseEnter };
}

// ============================================================================
// DEBOUNCE & THROTTLE
// ============================================================================

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [value, interval]);

  return throttledValue;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
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

  // Performance
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
};
