/**
 * DARWIN-MFC ANIMATION SYSTEM
 * ===========================
 *
 * A comprehensive animation system for Framer Motion.
 * Includes presets for:
 * - Page transitions
 * - Card interactions
 * - List animations
 * - Feedback effects
 * - Loading states
 * - Spring physics configurations
 */

import type { Variants, Transition, TargetAndTransition } from 'framer-motion';

// =============================================================================
// SPRING PHYSICS CONFIGURATIONS
// =============================================================================

export const springs = {
  /** Gentle spring - smooth, subtle motion */
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 14,
    mass: 1,
  },

  /** Default spring - balanced */
  default: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 20,
    mass: 1,
  },

  /** Bouncy spring - playful, noticeable overshoot */
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10,
    mass: 1,
  },

  /** Stiff spring - quick, responsive */
  stiff: {
    type: 'spring' as const,
    stiffness: 700,
    damping: 30,
    mass: 1,
  },

  /** Slow spring - deliberate, elegant */
  slow: {
    type: 'spring' as const,
    stiffness: 50,
    damping: 20,
    mass: 1,
  },

  /** Snappy spring - very quick response */
  snappy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 25,
    mass: 0.5,
  },

  /** Wobbly spring - more playful bounce */
  wobbly: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 12,
    mass: 1,
  },
} as const;

// =============================================================================
// TWEEN TRANSITIONS
// =============================================================================

export const tweens = {
  /** Fast transition */
  fast: {
    type: 'tween' as const,
    duration: 0.15,
    ease: [0.4, 0, 0.2, 1],
  },

  /** Default transition */
  default: {
    type: 'tween' as const,
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },

  /** Slow transition */
  slow: {
    type: 'tween' as const,
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  },

  /** Ease out */
  easeOut: {
    type: 'tween' as const,
    duration: 0.3,
    ease: [0, 0, 0.2, 1],
  },

  /** Ease in */
  easeIn: {
    type: 'tween' as const,
    duration: 0.3,
    ease: [0.4, 0, 1, 1],
  },
} as const;

// =============================================================================
// PAGE TRANSITIONS
// =============================================================================

export const pageTransitions: Record<string, Variants> = {
  /** Fade transition */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  /** Fade up transition */
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },

  /** Fade down transition */
  fadeDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },

  /** Slide from right */
  slideRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },

  /** Slide from left */
  slideLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },

  /** Scale up */
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },

  /** Scale and fade */
  scaleUp: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -20 },
  },
};

// =============================================================================
// MODAL TRANSITIONS
// =============================================================================

export const modalTransitions: Record<string, Variants> = {
  /** Default modal */
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  },

  /** Backdrop */
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  /** Drawer from bottom */
  drawerBottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },

  /** Drawer from right */
  drawerRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },

  /** Command palette */
  commandPalette: {
    initial: { opacity: 0, scale: 0.98, y: -20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: -20 },
  },
};

// =============================================================================
// CARD INTERACTIONS
// =============================================================================

export const cardAnimations = {
  /** Hover lift effect */
  hoverLift: {
    rest: { y: 0, scale: 1, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
    hover: { y: -4, scale: 1.01, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' },
    tap: { scale: 0.98 },
  } as Record<string, TargetAndTransition>,

  /** Hover glow effect */
  hoverGlow: {
    rest: { boxShadow: '0 0 0 rgba(0, 113, 227, 0)' },
    hover: { boxShadow: '0 0 20px rgba(0, 113, 227, 0.3)' },
    tap: { scale: 0.98 },
  } as Record<string, TargetAndTransition>,

  /** Hover scale effect */
  hoverScale: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  } as Record<string, TargetAndTransition>,

  /** Subtle hover */
  hoverSubtle: {
    rest: { opacity: 1 },
    hover: { opacity: 0.8 },
    tap: { opacity: 0.6 },
  } as Record<string, TargetAndTransition>,

  /** Press effect only */
  pressOnly: {
    rest: { scale: 1 },
    tap: { scale: 0.95 },
  } as Record<string, TargetAndTransition>,
};

// =============================================================================
// LIST ANIMATIONS
// =============================================================================

export const listAnimations: Record<string, Variants> = {
  /** Container with stagger */
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  },

  /** List item fade up */
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },

  /** List item slide from left */
  itemSlide: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },

  /** List item scale */
  itemScale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },

  /** Fast stagger container */
  containerFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05,
      },
    },
  },
};

// =============================================================================
// FEEDBACK ANIMATIONS
// =============================================================================

export const feedbackAnimations = {
  /** Success checkmark */
  success: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: { duration: 0.4 },
    },
  },

  /** Error shake */
  error: {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  },

  /** Pulse attention */
  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.3, repeat: 2 },
    },
  },

  /** Ring pulse (for notifications) */
  ringPulse: {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 1.2, 1.4],
      opacity: [1, 0.5, 0],
      transition: { duration: 1, repeat: Infinity },
    },
  },

  /** Bounce */
  bounce: {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 0.5 },
    },
  },
};

// =============================================================================
// LOADING ANIMATIONS
// =============================================================================

export const loadingAnimations = {
  /** Spinner rotation */
  spinner: {
    animate: {
      rotate: 360,
      transition: { duration: 1, repeat: Infinity, ease: 'linear' },
    },
  },

  /** Dots loading */
  dotsContainer: {
    animate: {
      transition: { staggerChildren: 0.15 },
    },
  },

  dot: {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: { duration: 0.5, repeat: Infinity },
    },
  },

  /** Skeleton shimmer */
  skeleton: {
    initial: { backgroundPosition: '-200% 0' },
    animate: {
      backgroundPosition: '200% 0',
      transition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
    },
  },

  /** Progress bar */
  progress: {
    initial: { scaleX: 0, originX: 0 },
    animate: { scaleX: 1 },
  },
};

// =============================================================================
// CONTENT REVEAL ANIMATIONS
// =============================================================================

export const revealAnimations: Record<string, Variants> = {
  /** Fade in from below */
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  },

  /** Fade in from above */
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  },

  /** Slide in from left */
  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  },

  /** Slide in from right */
  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  },

  /** Scale up */
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  },

  /** Blur in */
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    },
  },
};

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

export const transitionPresets: Record<string, Transition> = {
  /** Fast interaction */
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },

  /** Default transition */
  default: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },

  /** Slow, deliberate */
  slow: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },

  /** Spring default */
  spring: springs.default,

  /** Spring bouncy */
  springBouncy: springs.bouncy,

  /** Spring stiff */
  springStiff: springs.stiff,
};

// =============================================================================
// REDUCED MOTION VARIANTS
// =============================================================================

/**
 * Get a reduced motion version of any animation
 * Respects user's prefers-reduced-motion setting
 */
export function getReducedMotionVariants(variants: Variants): Variants {
  const reducedVariants: Variants = {};

  for (const [key, value] of Object.entries(variants)) {
    if (typeof value === 'object' && value !== null) {
      reducedVariants[key] = {
        opacity: (value as { opacity?: number }).opacity ?? 1,
        transition: { duration: 0 },
      };
    }
  }

  return reducedVariants;
}

// =============================================================================
// UTILITY: Create stagger container
// =============================================================================

export function createStaggerContainer(
  staggerDelay = 0.05,
  delayChildren = 0.1
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDelay / 2,
        staggerDirection: -1,
      },
    },
  };
}

// =============================================================================
// UTILITY: Create item variant
// =============================================================================

export function createItemVariant(
  type: 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'scale' = 'fadeUp'
): Variants {
  const transforms = {
    fadeUp: { hidden: { y: 20 }, visible: { y: 0 } },
    fadeDown: { hidden: { y: -20 }, visible: { y: 0 } },
    slideLeft: { hidden: { x: -20 }, visible: { x: 0 } },
    slideRight: { hidden: { x: 20 }, visible: { x: 0 } },
    scale: { hidden: { scale: 0.9 }, visible: { scale: 1 } },
  };

  return {
    hidden: { opacity: 0, ...transforms[type].hidden },
    visible: {
      opacity: 1,
      ...transforms[type].visible,
      transition: springs.default,
    },
    exit: { opacity: 0, ...transforms[type].hidden },
  };
}

// =============================================================================
// COMBINED EXPORT
// =============================================================================

export const animations = {
  springs,
  tweens,
  page: pageTransitions,
  modal: modalTransitions,
  card: cardAnimations,
  list: listAnimations,
  feedback: feedbackAnimations,
  loading: loadingAnimations,
  reveal: revealAnimations,
  transitions: transitionPresets,
} as const;

export default animations;
