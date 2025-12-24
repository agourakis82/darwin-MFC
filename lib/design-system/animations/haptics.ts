/**
 * HAPTIC FEEDBACK UTILITIES
 * ==========================
 *
 * Haptic feedback utilities for mobile devices
 * Provides tactile feedback for user interactions
 *
 * Features:
 * - Vibration API support
 * - Pattern-based vibrations
 * - Haptic feedback presets
 * - Feature detection
 * - Cross-platform support (iOS, Android)
 *
 * @example
 * ```tsx
 * import { haptic, HapticPattern } from '@/lib/design-system/animations/haptics';
 *
 * // Simple haptic feedback
 * haptic.impact('medium');
 *
 * // Pattern vibration
 * haptic.pattern(HapticPattern.SUCCESS);
 *
 * // Selection feedback
 * haptic.selection();
 * ```
 */

'use client';

import React from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type HapticIntensity = 'light' | 'medium' | 'heavy';
export type HapticNotificationType = 'success' | 'warning' | 'error';

export enum HapticPattern {
  // Single vibrations
  TAP = 'tap',
  CLICK = 'click',
  SELECTION = 'selection',

  // Impact patterns
  LIGHT_IMPACT = 'lightImpact',
  MEDIUM_IMPACT = 'mediumImpact',
  HEAVY_IMPACT = 'heavyImpact',

  // Notification patterns
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',

  // Custom patterns
  DOUBLE_TAP = 'doubleTap',
  TRIPLE_TAP = 'tripleTap',
  LONG_PRESS = 'longPress',
  SWIPE = 'swipe',
  BOUNCE = 'bounce',
  HEARTBEAT = 'heartbeat',
}

// ============================================================================
// VIBRATION PATTERNS
// ============================================================================

/**
 * Vibration pattern definitions (in milliseconds)
 * Format: [vibrate, pause, vibrate, pause, ...]
 */
const VIBRATION_PATTERNS: Record<HapticPattern, number | number[]> = {
  // Single vibrations (duration in ms)
  [HapticPattern.TAP]: 10,
  [HapticPattern.CLICK]: 15,
  [HapticPattern.SELECTION]: 5,

  // Impact patterns
  [HapticPattern.LIGHT_IMPACT]: 20,
  [HapticPattern.MEDIUM_IMPACT]: 40,
  [HapticPattern.HEAVY_IMPACT]: 60,

  // Notification patterns
  [HapticPattern.SUCCESS]: [20, 40, 20], // Short-pause-short
  [HapticPattern.WARNING]: [30, 50, 30, 50, 30], // Three pulses
  [HapticPattern.ERROR]: [50, 30, 50], // Long-pause-long

  // Custom patterns
  [HapticPattern.DOUBLE_TAP]: [10, 50, 10], // Two quick taps
  [HapticPattern.TRIPLE_TAP]: [10, 50, 10, 50, 10], // Three quick taps
  [HapticPattern.LONG_PRESS]: [100], // Single long vibration
  [HapticPattern.SWIPE]: [20, 20, 20, 20, 20], // Continuous light vibration
  [HapticPattern.BOUNCE]: [10, 30, 20, 40, 30, 50, 40], // Bouncing effect
  [HapticPattern.HEARTBEAT]: [50, 100, 50, 500, 50, 100, 50], // Heartbeat pattern
};

// ============================================================================
// FEATURE DETECTION
// ============================================================================

/**
 * Check if Vibration API is supported
 */
export function isHapticSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    ('vibrate' in navigator || 'mozVibrate' in navigator || 'webkitVibrate' in navigator)
  );
}

/**
 * Check if running on iOS
 */
function isIOS(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/**
 * Check if running on Android
 */
function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;

  return /Android/.test(navigator.userAgent);
}

// ============================================================================
// VIBRATION UTILITY
// ============================================================================

/**
 * Trigger device vibration
 */
function vibrate(pattern: number | number[]): boolean {
  if (!isHapticSupported()) {
    return false;
  }

  try {
    // @ts-ignore - vibrate may not be on navigator type
    const vibrateMethod = navigator.vibrate || navigator.mozVibrate || navigator.webkitVibrate;

    if (vibrateMethod) {
      vibrateMethod.call(navigator, pattern as any);
      return true;
    }

    return false;
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
    return false;
  }
}

/**
 * Cancel ongoing vibration
 */
function cancelVibration(): void {
  if (isHapticSupported()) {
    vibrate(0);
  }
}

// ============================================================================
// HAPTIC FEEDBACK CLASS
// ============================================================================

class HapticFeedback {
  private enabled: boolean = true;

  /**
   * Enable/disable haptic feedback
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Check if haptics are enabled
   */
  isEnabled(): boolean {
    return this.enabled && isHapticSupported();
  }

  /**
   * Trigger haptic feedback with a pattern
   */
  pattern(pattern: HapticPattern): boolean {
    if (!this.isEnabled()) return false;

    const vibrationPattern = VIBRATION_PATTERNS[pattern];
    return vibrate(vibrationPattern);
  }

  /**
   * Impact feedback (light, medium, heavy)
   */
  impact(intensity: HapticIntensity = 'medium'): boolean {
    if (!this.isEnabled()) return false;

    const patternMap: Record<HapticIntensity, HapticPattern> = {
      light: HapticPattern.LIGHT_IMPACT,
      medium: HapticPattern.MEDIUM_IMPACT,
      heavy: HapticPattern.HEAVY_IMPACT,
    };

    return this.pattern(patternMap[intensity]);
  }

  /**
   * Notification feedback (success, warning, error)
   */
  notification(type: HapticNotificationType): boolean {
    if (!this.isEnabled()) return false;

    const patternMap: Record<HapticNotificationType, HapticPattern> = {
      success: HapticPattern.SUCCESS,
      warning: HapticPattern.WARNING,
      error: HapticPattern.ERROR,
    };

    return this.pattern(patternMap[type]);
  }

  /**
   * Selection change feedback (light tap)
   */
  selection(): boolean {
    if (!this.isEnabled()) return false;

    return this.pattern(HapticPattern.SELECTION);
  }

  /**
   * Tap feedback
   */
  tap(): boolean {
    if (!this.isEnabled()) return false;

    return this.pattern(HapticPattern.TAP);
  }

  /**
   * Click feedback (slightly stronger than tap)
   */
  click(): boolean {
    if (!this.isEnabled()) return false;

    return this.pattern(HapticPattern.CLICK);
  }

  /**
   * Double tap feedback
   */
  doubleTap(): boolean {
    if (!this.isEnabled()) return false;

    return this.pattern(HapticPattern.DOUBLE_TAP);
  }

  /**
   * Long press feedback
   */
  longPress(): boolean {
    if (!this.isEnabled()) return false;

    return this.pattern(HapticPattern.LONG_PRESS);
  }

  /**
   * Custom vibration pattern
   */
  custom(pattern: number | number[]): boolean {
    if (!this.isEnabled()) return false;

    return vibrate(pattern);
  }

  /**
   * Cancel ongoing vibration
   */
  cancel(): void {
    cancelVibration();
  }

  /**
   * Success feedback (visual + haptic)
   */
  success(): boolean {
    return this.notification('success');
  }

  /**
   * Error feedback (visual + haptic)
   */
  error(): boolean {
    return this.notification('error');
  }

  /**
   * Warning feedback (visual + haptic)
   */
  warning(): boolean {
    return this.notification('warning');
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const haptic = new HapticFeedback();

// ============================================================================
// REACT HOOKS
// ============================================================================

/**
 * Hook for triggering haptic feedback
 */
export function useHaptic() {
  const trigger = (pattern: HapticPattern | HapticIntensity | HapticNotificationType) => {
    if (pattern in HapticPattern) {
      return haptic.pattern(pattern as HapticPattern);
    } else if (['light', 'medium', 'heavy'].includes(pattern)) {
      return haptic.impact(pattern as HapticIntensity);
    } else if (['success', 'warning', 'error'].includes(pattern)) {
      return haptic.notification(pattern as HapticNotificationType);
    }

    return false;
  };

  return {
    trigger,
    impact: haptic.impact.bind(haptic),
    notification: haptic.notification.bind(haptic),
    selection: haptic.selection.bind(haptic),
    tap: haptic.tap.bind(haptic),
    click: haptic.click.bind(haptic),
    success: haptic.success.bind(haptic),
    error: haptic.error.bind(haptic),
    warning: haptic.warning.bind(haptic),
    cancel: haptic.cancel.bind(haptic),
    isSupported: isHapticSupported,
    isEnabled: haptic.isEnabled.bind(haptic),
  };
}

/**
 * Hook for haptic feedback on button clicks
 */
export function useHapticClick(
  intensity: HapticIntensity = 'medium'
): React.MouseEventHandler {
  return () => {
    haptic.impact(intensity);
  };
}

/**
 * Hook for haptic feedback on input change
 */
export function useHapticChange(): React.ChangeEventHandler {
  return () => {
    haptic.selection();
  };
}

// ============================================================================
// HIGHER-ORDER COMPONENTS
// ============================================================================

/**
 * Add haptic feedback to onClick handler
 */
export function withHapticClick<P extends { onClick?: () => void }>(
  Component: React.ComponentType<P>,
  intensity: HapticIntensity = 'medium'
): React.FC<P> {
  return (props: P) => {
    const handleClick = () => {
      haptic.impact(intensity);
      props.onClick?.();
    };

    return React.createElement(Component as any, { ...props, onClick: handleClick });
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a custom haptic pattern
 */
export function createHapticPattern(
  vibrations: number[],
  pauses: number[]
): number[] {
  const pattern: number[] = [];

  for (let i = 0; i < Math.max(vibrations.length, pauses.length); i++) {
    if (i < vibrations.length) {
      pattern.push(vibrations[i]);
    }
    if (i < pauses.length) {
      pattern.push(pauses[i]);
    }
  }

  return pattern;
}

/**
 * Test haptic feedback support
 */
export function testHapticFeedback(): void {
  if (!isHapticSupported()) {
    console.log('Haptic feedback is not supported on this device');
    return;
  }

  console.log('Testing haptic feedback patterns...');

  Object.values(HapticPattern).forEach((pattern, index) => {
    setTimeout(() => {
      console.log(`Testing pattern: ${pattern}`);
      haptic.pattern(pattern as HapticPattern);
    }, index * 1000);
  });
}

// ============================================================================
// PLATFORM-SPECIFIC UTILITIES
// ============================================================================

/**
 * Get recommended haptic settings for current platform
 */
export function getPlatformHapticSettings() {
  return {
    isSupported: isHapticSupported(),
    platform: isIOS() ? 'ios' : isAndroid() ? 'android' : 'other',
    recommendedIntensity: isIOS() ? 'light' : 'medium' as HapticIntensity,
    enabledByDefault: isIOS() || isAndroid(),
  };
}

/**
 * Initialize haptics with platform-specific settings
 */
export function initializeHaptics(enabled: boolean = true): void {
  const settings = getPlatformHapticSettings();

  if (settings.isSupported) {
    haptic.setEnabled(enabled && settings.enabledByDefault);

    if (enabled) {
      // Trigger a light tap to confirm haptics are working
      haptic.tap();
    }
  }
}
