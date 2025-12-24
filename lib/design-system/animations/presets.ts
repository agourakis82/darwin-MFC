/**
 * ANIMATION PRESETS
 * ==================
 *
 * Pre-configured animation variants for Framer Motion
 * Consistent, professional animations across the app
 *
 * Features:
 * - Entrance animations (fade, slide, scale, etc.)
 * - Exit animations
 * - Gesture animations (hover, tap, drag)
 * - Spring physics presets
 * - Easing curves
 * - Stagger configurations
 */

import { Variants, Transition, Spring } from 'framer-motion';

// ============================================================================
// EASING CURVES
// ============================================================================

export const easings = {
  // Apple-style ease
  apple: [0.4, 0, 0.2, 1] as const,

  // Smooth ease in/out
  smooth: [0.45, 0, 0.55, 1] as const,

  // Sharp ease in
  easeIn: [0.4, 0, 1, 1] as const,

  // Sharp ease out
  easeOut: [0, 0, 0.2, 1] as const,

  // Bounce effect
  bounce: [0.68, -0.55, 0.265, 1.55] as const,

  // Anticipation (pulls back before moving forward)
  anticipate: [0.68, -0.2, 0.265, 1.2] as const,
};

// ============================================================================
// SPRING PHYSICS
// ============================================================================

export const springs = {
  // Gentle spring
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 14,
    mass: 0.5,
  } as Spring,

  // Bouncy spring
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
    mass: 0.8,
  } as Spring,

  // Stiff spring (minimal bounce)
  stiff: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  } as Spring,

  // Slow spring
  slow: {
    type: 'spring',
    stiffness: 80,
    damping: 20,
  } as Spring,

  // Wobbly spring
  wobbly: {
    type: 'spring',
    stiffness: 180,
    damping: 12,
  } as Spring,
};

// ============================================================================
// DURATION PRESETS
// ============================================================================

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  moderate: 0.5,
  slow: 0.8,
  verySlow: 1.2,
};

// ============================================================================
// ENTRANCE ANIMATIONS
// ============================================================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const scaleInBounce: Variants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springs.bouncy,
  },
  exit: { opacity: 0, scale: 0.8 },
};

export const slideInUp: Variants = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
};

export const slideInDown: Variants = {
  initial: { y: '-100%' },
  animate: { y: 0 },
  exit: { y: '-100%' },
};

export const slideInLeft: Variants = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
};

export const slideInRight: Variants = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
};

export const rotateIn: Variants = {
  initial: { opacity: 0, rotate: -180, scale: 0.5 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 180, scale: 0.5 },
};

export const flipIn: Variants = {
  initial: { opacity: 0, rotateX: 90 },
  animate: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: -90 },
};

export const zoomIn: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

// ============================================================================
// GESTURE ANIMATIONS
// ============================================================================

export const hoverLift: Variants = {
  initial: { y: 0 },
  hover: { y: -4, transition: { duration: durations.fast, ease: easings.apple } },
};

export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: durations.fast, ease: easings.apple } },
};

export const hoverGlow: Variants = {
  initial: { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
  hover: {
    boxShadow: '0 0 20px 0 rgba(59, 130, 246, 0.5)',
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

export const tapScale: Variants = {
  initial: { scale: 1 },
  tap: { scale: 0.95, transition: { duration: durations.instant } },
};

export const tapShrink: Variants = {
  initial: { scale: 1 },
  tap: { scale: 0.9, transition: springs.stiff },
};

export const tapBounce: Variants = {
  initial: { scale: 1 },
  tap: { scale: 1.1, transition: springs.bouncy },
};

// ============================================================================
// LOADING ANIMATIONS
// ============================================================================

export const pulse: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.smooth,
    },
  },
};

export const spin: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const bounce: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: easings.bounce,
    },
  },
};

export const shimmer: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const breathe: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.smooth,
    },
  },
};

// ============================================================================
// ATTENTION SEEKERS
// ============================================================================

export const shake: Variants = {
  initial: { x: 0 },
  animate: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: easings.apple,
    },
  },
};

export const wobble: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [-5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: easings.apple,
    },
  },
};

export const jello: Variants = {
  initial: { skewX: 0, skewY: 0 },
  animate: {
    skewX: [-12.5, 6.25, -3.125, 1.5625, 0],
    skewY: [-12.5, 6.25, -3.125, 1.5625, 0],
    transition: {
      duration: 0.8,
      ease: easings.apple,
    },
  },
};

export const heartbeat: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.3, 1, 1.3, 1],
    transition: {
      duration: 1.3,
      times: [0, 0.14, 0.28, 0.42, 0.7],
      ease: easings.smooth,
    },
  },
};

export const swing: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, 15, -10, 5, 0],
    transition: {
      duration: 1,
      ease: easings.smooth,
    },
  },
};

// ============================================================================
// STAGGER CONFIGURATIONS
// ============================================================================

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerChildrenFast = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerChildrenSlow = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// ============================================================================
// CONTAINER VARIANTS
// ============================================================================

export const container: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

export const listContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

export const gridContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.apple,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: durations.fast,
      ease: easings.apple,
    },
  },
};

export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: durations.normal },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast },
  },
};

export const pageSlide: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: durations.moderate,
      ease: easings.apple,
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: durations.moderate,
      ease: easings.apple,
    },
  },
};

export const pageScale: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.moderate,
      ease: easings.apple,
    },
  },
  exit: {
    scale: 1.2,
    opacity: 0,
    transition: {
      duration: durations.moderate,
      ease: easings.apple,
    },
  },
};

// ============================================================================
// NOTIFICATION ANIMATIONS
// ============================================================================

export const notificationSlideIn: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 40,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.apple,
    },
  },
};

export const notificationDropIn: Variants = {
  initial: { y: '-100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: springs.bouncy,
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.apple,
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a custom transition with duration and easing
 */
export function createTransition(
  duration: number = durations.normal,
  ease: typeof easings[keyof typeof easings] = easings.apple
): Transition {
  return {
    duration,
    ease,
  };
}

/**
 * Create a stagger configuration
 */
export function createStagger(
  staggerChildren: number = 0.1,
  delayChildren: number = 0.1
) {
  return {
    transition: {
      staggerChildren,
      delayChildren,
    },
  };
}

/**
 * Combine multiple variants
 */
export function combineVariants(...variants: Variants[]): Variants {
  return variants.reduce((acc, variant) => ({ ...acc, ...variant }), {});
}

/**
 * Create a delayed variant
 */
export function withDelay(variant: Variants, delay: number): Variants {
  const result: Variants = {};

  Object.entries(variant).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      result[key] = {
        ...value,
        transition: {
          ...(value.transition || {}),
          delay,
        },
      };
    } else {
      result[key] = value;
    }
  });

  return result;
}
