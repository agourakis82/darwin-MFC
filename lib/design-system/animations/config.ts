/**
 * ANIMATION CONFIGURATION & CONTROLS
 * ===================================
 *
 * Global animation settings and controls
 * Accessibility preferences, reduced motion, performance settings
 *
 * Features:
 * - Reduced motion support
 * - Animation performance settings
 * - Global animation toggle
 * - Per-component animation control
 * - Accessibility compliance
 *
 * @example
 * ```tsx
 * import { animationConfig, useReducedMotion } from '@/lib/design-system/animations/config';
 *
 * const prefersReducedMotion = useReducedMotion();
 *
 * if (!prefersReducedMotion) {
 *   // Play animation
 * }
 * ```
 */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useState } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface AnimationConfig {
  // Global settings
  enabled: boolean;
  respectReducedMotion: boolean;

  // Performance settings
  reducedPerformance: boolean;
  disableScrollAnimations: boolean;
  disableParallax: boolean;

  // Duration multipliers (1 = normal, 0.5 = faster, 2 = slower)
  durationMultiplier: number;

  // Component-specific toggles
  enableTransitions: boolean;
  enableMicroInteractions: boolean;
  enablePageTransitions: boolean;
  enableScrollAnimations: boolean;
  enableHaptics: boolean;
  enableLoadingAnimations: boolean;
}

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

const DEFAULT_CONFIG: AnimationConfig = {
  enabled: true,
  respectReducedMotion: true,
  reducedPerformance: false,
  disableScrollAnimations: false,
  disableParallax: false,
  durationMultiplier: 1,
  enableTransitions: true,
  enableMicroInteractions: true,
  enablePageTransitions: true,
  enableScrollAnimations: true,
  enableHaptics: true,
  enableLoadingAnimations: true,
};

// ============================================================================
// ZUSTAND STORE
// ============================================================================

interface AnimationConfigStore extends AnimationConfig {
  // Actions
  setEnabled: (enabled: boolean) => void;
  setRespectReducedMotion: (respect: boolean) => void;
  setReducedPerformance: (reduced: boolean) => void;
  setDurationMultiplier: (multiplier: number) => void;
  toggleTransitions: (enabled: boolean) => void;
  toggleMicroInteractions: (enabled: boolean) => void;
  togglePageTransitions: (enabled: boolean) => void;
  toggleScrollAnimations: (enabled: boolean) => void;
  toggleHaptics: (enabled: boolean) => void;
  toggleLoadingAnimations: (enabled: boolean) => void;
  reset: () => void;
}

export const useAnimationConfig = create<AnimationConfigStore>()(
  persist(
    (set) => ({
      ...DEFAULT_CONFIG,

      setEnabled: (enabled) => set({ enabled }),
      setRespectReducedMotion: (respect) => set({ respectReducedMotion: respect }),
      setReducedPerformance: (reduced) => set({ reducedPerformance: reduced }),
      setDurationMultiplier: (multiplier) => set({ durationMultiplier: multiplier }),
      toggleTransitions: (enabled) => set({ enableTransitions: enabled }),
      toggleMicroInteractions: (enabled) => set({ enableMicroInteractions: enabled }),
      togglePageTransitions: (enabled) => set({ enablePageTransitions: enabled }),
      toggleScrollAnimations: (enabled) => set({ enableScrollAnimations: enabled }),
      toggleHaptics: (enabled) => set({ enableHaptics: enabled }),
      toggleLoadingAnimations: (enabled) => set({ enableLoadingAnimations: enabled }),
      reset: () => set(DEFAULT_CONFIG),
    }),
    {
      name: 'darwin-mfc-animation-config',
      version: 1,
    }
  )
);

// ============================================================================
// REDUCED MOTION DETECTION
// ============================================================================

/**
 * Hook to detect if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const respectReducedMotion = useAnimationConfig((state) => state.respectReducedMotion);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return respectReducedMotion && prefersReducedMotion;
}

/**
 * Check if animations should be enabled
 */
export function useShouldAnimate(): boolean {
  const enabled = useAnimationConfig((state) => state.enabled);
  const prefersReducedMotion = useReducedMotion();

  return enabled && !prefersReducedMotion;
}

// ============================================================================
// PERFORMANCE DETECTION
// ============================================================================

/**
 * Hook to detect device performance level
 */
export function useDevicePerformance(): 'high' | 'medium' | 'low' {
  const [performance, setPerformance] = useState<'high' | 'medium' | 'low'>('medium');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;

    // Check device memory (if available)
    // @ts-ignore - deviceMemory may not be in navigator type
    const memory = navigator.deviceMemory || 4;

    // Check connection speed
    // @ts-ignore - connection may not be in navigator type
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const effectiveType = connection?.effectiveType || '4g';

    // Determine performance level
    if (cores >= 8 && memory >= 8 && effectiveType === '4g') {
      setPerformance('high');
    } else if (cores >= 4 && memory >= 4) {
      setPerformance('medium');
    } else {
      setPerformance('low');
    }
  }, []);

  return performance;
}

/**
 * Hook to check if animations should be simplified
 */
export function useShouldSimplify(): boolean {
  const reducedPerformance = useAnimationConfig((state) => state.reducedPerformance);
  const devicePerformance = useDevicePerformance();

  return reducedPerformance || devicePerformance === 'low';
}

// ============================================================================
// BATTERY STATUS
// ============================================================================

/**
 * Hook to detect battery status
 */
export function useBatteryStatus(): {
  level: number;
  charging: boolean;
  lowBattery: boolean;
} {
  const [batteryStatus, setBatteryStatus] = useState({
    level: 1,
    charging: true,
    lowBattery: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('getBattery' in navigator)) return;

    // @ts-ignore - getBattery may not be in navigator type
    navigator.getBattery().then((battery: any) => {
      const updateBatteryStatus = () => {
        setBatteryStatus({
          level: battery.level,
          charging: battery.charging,
          lowBattery: battery.level < 0.2 && !battery.charging,
        });
      };

      updateBatteryStatus();

      battery.addEventListener('levelchange', updateBatteryStatus);
      battery.addEventListener('chargingchange', updateBatteryStatus);

      return () => {
        battery.removeEventListener('levelchange', updateBatteryStatus);
        battery.removeEventListener('chargingchange', updateBatteryStatus);
      };
    });
  }, []);

  return batteryStatus;
}

/**
 * Hook to check if animations should be disabled due to low battery
 */
export function useShouldDisableForBattery(): boolean {
  const { lowBattery } = useBatteryStatus();
  return lowBattery;
}

// ============================================================================
// DURATION HELPERS
// ============================================================================

/**
 * Get adjusted animation duration based on config
 */
export function getAdjustedDuration(baseDuration: number): number {
  const multiplier = useAnimationConfig.getState().durationMultiplier;
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return 0.01; // Near-instant for reduced motion
  }

  return baseDuration * multiplier;
}

/**
 * Hook to get adjusted duration
 */
export function useAdjustedDuration(baseDuration: number): number {
  const multiplier = useAnimationConfig((state) => state.durationMultiplier);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return 0.01;
  }

  return baseDuration * multiplier;
}

// ============================================================================
// COMPONENT-SPECIFIC CHECKS
// ============================================================================

/**
 * Check if transitions should be enabled
 */
export function useTransitionsEnabled(): boolean {
  const enabled = useAnimationConfig((state) => state.enableTransitions);
  const shouldAnimate = useShouldAnimate();
  return enabled && shouldAnimate;
}

/**
 * Check if micro-interactions should be enabled
 */
export function useMicroInteractionsEnabled(): boolean {
  const enabled = useAnimationConfig((state) => state.enableMicroInteractions);
  const shouldAnimate = useShouldAnimate();
  return enabled && shouldAnimate;
}

/**
 * Check if page transitions should be enabled
 */
export function usePageTransitionsEnabled(): boolean {
  const enabled = useAnimationConfig((state) => state.enablePageTransitions);
  const shouldAnimate = useShouldAnimate();
  return enabled && shouldAnimate;
}

/**
 * Check if scroll animations should be enabled
 */
export function useScrollAnimationsEnabled(): boolean {
  const enabled = useAnimationConfig((state) => state.enableScrollAnimations);
  const disableScroll = useAnimationConfig((state) => state.disableScrollAnimations);
  const shouldAnimate = useShouldAnimate();
  return enabled && !disableScroll && shouldAnimate;
}

/**
 * Check if haptics should be enabled
 */
export function useHapticsEnabled(): boolean {
  const enabled = useAnimationConfig((state) => state.enableHaptics);
  const shouldAnimate = useShouldAnimate();
  return enabled && shouldAnimate;
}

/**
 * Check if loading animations should be enabled
 */
export function useLoadingAnimationsEnabled(): boolean {
  const enabled = useAnimationConfig((state) => state.enableLoadingAnimations);
  const shouldAnimate = useShouldAnimate();
  return enabled && shouldAnimate;
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize animation config with smart defaults
 */
export function initializeAnimationConfig(): void {
  const performance = useDevicePerformance();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    useAnimationConfig.getState().setDurationMultiplier(0.01);
  }

  if (performance === 'low') {
    useAnimationConfig.getState().setReducedPerformance(true);
    useAnimationConfig.getState().toggleScrollAnimations(false);
  }
}

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

/**
 * Get ARIA-safe animation props
 */
export function getA11yAnimationProps(baseProps: any): any {
  const shouldAnimate = useShouldAnimate();

  if (!shouldAnimate) {
    // Return instant transitions for accessibility
    return {
      ...baseProps,
      transition: { duration: 0.01 },
    };
  }

  return baseProps;
}

/**
 * Hook for A11y-safe animation props
 */
export function useA11yAnimation(baseProps: any): any {
  const shouldAnimate = useShouldAnimate();

  if (!shouldAnimate) {
    return {
      ...baseProps,
      transition: { duration: 0.01 },
    };
  }

  return baseProps;
}
