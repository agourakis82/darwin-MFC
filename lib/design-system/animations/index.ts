/**
 * ANIMATIONS MODULE - EXPORTS
 * =============================
 *
 * Complete animation system for Darwin-MFC
 * Micro-interactions, transitions, feedback, and more
 *
 * @example
 * ```tsx
 * import {
 *   // Presets
 *   fadeInUp, scaleIn, easings, springs, durations,
 *
 *   // Gestures
 *   useSwipeGesture, useDragGesture, usePinchGesture,
 *
 *   // Feedback
 *   RippleButton, ShakeWrapper, PulseWrapper,
 *
 *   // Loading
 *   Spinner, SkeletonCard, ProgressBar,
 *
 *   // Scroll
 *   ScrollReveal, ParallaxBox, ScrollProgress,
 *
 *   // Transitions
 *   FadeTransition, SlideTransition, ModalTransition,
 *
 *   // Numbers
 *   AnimatedCounter, Odometer, CountdownTimer,
 *
 *   // Page Transitions
 *   PageTransition, PageTransitionTemplate,
 *
 *   // Config
 *   useReducedMotion, useShouldAnimate,
 *
 *   // Haptics
 *   haptic, useHaptic,
 * } from '@/lib/design-system/animations';
 * ```
 */

// ============================================================================
// PRESETS & UTILITIES
// ============================================================================

export * from './presets';

// ============================================================================
// GESTURES
// ============================================================================

export * from './gestures';

// ============================================================================
// INTERACTIVE FEEDBACK
// ============================================================================

export * from './feedback';

// ============================================================================
// LOADING & SKELETONS
// ============================================================================

export * from './loading';

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

export * from './scroll';

// ============================================================================
// TRANSITIONS
// ============================================================================

export * from './transitions';

// ============================================================================
// HAPTIC FEEDBACK
// ============================================================================

export * from './haptics';

// ============================================================================
// NUMBER ANIMATIONS
// ============================================================================

export * from './numbers';

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export * from './page-transitions';

// ============================================================================
// CONFIGURATION
// ============================================================================

export * from './config';
