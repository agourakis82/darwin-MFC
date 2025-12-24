/**
 * DESIGN SYSTEM - ANIMATION TOKENS
 * =================================
 *
 * Animation system with purposeful motion design
 * Optimized for performance and accessibility
 */

export const animations = {
  // Duration tokens
  durations: {
    instant: '100ms',      // Instant feedback (button press)
    fast: '200ms',         // Fast transitions (hover states)
    normal: '300ms',       // Normal transitions (modals, slides)
    slow: '500ms',         // Slow, deliberate animations (page transitions)
    slower: '700ms',       // Very slow (dramatic effects)
  },

  // Easing curves
  easings: {
    // Standard easings
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Apple-inspired (current Darwin-MFC default)
    apple: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Spring-like bounce
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    springGentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    // Smooth acceleration/deceleration
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',

    // Sharp entry, smooth exit
    sharpEntry: 'cubic-bezier(0.4, 0, 0.6, 1)',

    // Smooth entry, sharp exit
    sharpExit: 'cubic-bezier(0.4, 0, 1, 1)',
  },

  // Micro-interactions - Pre-composed animations for common patterns
  microInteractions: {
    // Button interactions
    buttonPress: {
      scale: 0.95,
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    buttonHover: {
      scale: 1.02,
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Card interactions
    cardHover: {
      y: -4,
      scale: 1.01,
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    cardPress: {
      scale: 0.98,
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Toggle/Favorite interactions
    favoriteToggle: {
      scale: [1, 1.3, 1],
      rotate: [0, 10, -10, 0],
      duration: '400ms',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    checkboxToggle: {
      scale: [1, 1.2, 1],
      duration: '250ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Alert animations
    alertShake: {
      x: [0, -10, 10, -10, 10, 0],
      duration: '600ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    alertPulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      duration: '1000ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Input interactions
    inputFocus: {
      scale: 1.01,
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Loading states
    shimmer: {
      duration: '1500ms',
      easing: 'ease-in-out',
      iteration: 'infinite',
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.5, 1],
      duration: '2000ms',
      easing: 'ease-in-out',
      iteration: 'infinite',
    },
    spin: {
      rotate: 360,
      duration: '1000ms',
      easing: 'linear',
      iteration: 'infinite',
    },

    // Page transitions
    pageEnter: {
      opacity: [0, 1],
      y: [20, 0],
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    pageExit: {
      opacity: [1, 0],
      y: [0, -20],
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Modal/Dialog animations
    modalBackdrop: {
      opacity: [0, 1],
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    modalContent: {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Toast notifications
    toastEnter: {
      opacity: [0, 1],
      y: [50, 0],
      scale: [0.3, 1],
      duration: '300ms',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    toastExit: {
      opacity: [1, 0],
      x: [0, 300],
      scale: [1, 0.8],
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Swipe gestures
    swipeDelete: {
      x: [-100, 0],
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    swipeFavorite: {
      x: [100, 0],
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Stagger animations (for lists)
  stagger: {
    list: {
      staggerChildren: 0.05,    // 50ms between each child
      delayChildren: 0.1,       // 100ms initial delay
    },
    grid: {
      staggerChildren: 0.03,    // 30ms between each child
      delayChildren: 0.05,      // 50ms initial delay
    },
  },

  // Framer Motion variants for common patterns
  variants: {
    // Fade in/out
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },

    // Slide in from bottom
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },

    // Scale in/out
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },

    // Blur effect
    blur: {
      initial: { opacity: 0, filter: 'blur(4px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(4px)' },
    },
  },

  // Performance optimizations
  // Properties that can be GPU-accelerated
  gpuAccelerated: ['opacity', 'transform', 'filter'],

  // Properties to avoid animating (cause reflow/repaint)
  avoid: ['width', 'height', 'padding', 'margin', 'border-width'],
} as const;

export type AnimationToken = typeof animations;
