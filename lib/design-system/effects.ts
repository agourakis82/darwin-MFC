/**
 * DARWIN-MFC EFFECTS SYSTEM
 * =========================
 *
 * A comprehensive visual effects system including:
 * - Shadows (elevation, glow, inset)
 * - Blur effects (backdrop, glass)
 * - Glassmorphism presets
 * - Gradients
 * - Transitions
 */

// =============================================================================
// BOX SHADOWS
// =============================================================================

export const shadow = {
  /** No shadow */
  none: 'none',

  /** Subtle shadow - slight elevation */
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',

  /** Default shadow */
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',

  /** Medium shadow - cards */
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

  /** Large shadow - dropdowns, modals */
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

  /** Extra large shadow - popovers */
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  /** 2XL shadow - floating elements */
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  /** Inner shadow */
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  /** Deep inner shadow */
  innerDeep: 'inset 0 4px 8px 0 rgb(0 0 0 / 0.1)',
} as const;

// =============================================================================
// GLOW SHADOWS (Colored)
// =============================================================================

export const glow = {
  /** Primary blue glow */
  primary: '0 0 20px rgba(0, 113, 227, 0.3)',
  primaryStrong: '0 0 30px rgba(0, 113, 227, 0.5)',
  primarySubtle: '0 0 15px rgba(0, 113, 227, 0.2)',

  /** Success green glow */
  success: '0 0 20px rgba(34, 197, 94, 0.3)',
  successStrong: '0 0 30px rgba(34, 197, 94, 0.5)',

  /** Warning amber glow */
  warning: '0 0 20px rgba(245, 158, 11, 0.3)',
  warningStrong: '0 0 30px rgba(245, 158, 11, 0.5)',

  /** Danger red glow */
  danger: '0 0 20px rgba(239, 68, 68, 0.3)',
  dangerStrong: '0 0 30px rgba(239, 68, 68, 0.5)',

  /** Purple glow (scientific/clinical) */
  purple: '0 0 20px rgba(168, 85, 247, 0.3)',
  purpleStrong: '0 0 30px rgba(168, 85, 247, 0.5)',

  /** White glow (dark mode) */
  white: '0 0 20px rgba(255, 255, 255, 0.2)',
  whiteStrong: '0 0 30px rgba(255, 255, 255, 0.3)',
} as const;

export type GlowType = keyof typeof glow;

// =============================================================================
// BLUR VALUES
// =============================================================================

export const blur = {
  /** No blur */
  none: '0',

  /** Subtle blur */
  sm: '4px',

  /** Default blur */
  DEFAULT: '8px',

  /** Medium blur */
  md: '12px',

  /** Large blur - glass effect */
  lg: '16px',

  /** Extra large blur */
  xl: '24px',

  /** 2XL blur - heavy glass */
  '2xl': '40px',

  /** 3XL blur - maximum */
  '3xl': '64px',
} as const;

// =============================================================================
// GLASSMORPHISM PRESETS
// =============================================================================

export const glass = {
  /** Light mode glass card */
  light: {
    background: 'rgba(255, 255, 255, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: shadow.lg,
  },

  /** Light mode glass card (hover) */
  lightHover: {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(24px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: shadow.xl,
  },

  /** Dark mode glass card */
  dark: {
    background: 'rgba(28, 28, 30, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: shadow.lg,
  },

  /** Dark mode glass card (hover) */
  darkHover: {
    background: 'rgba(28, 28, 30, 0.85)',
    backdropFilter: 'blur(24px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: shadow.xl,
  },

  /** Frosted glass (heavier blur) */
  frosted: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(40px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: shadow.md,
  },

  /** Frosted glass dark */
  frostedDark: {
    background: 'rgba(28, 28, 30, 0.5)',
    backdropFilter: 'blur(40px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: shadow.md,
  },

  /** Subtle glass (minimal) */
  subtle: {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: shadow.sm,
  },

  /** Subtle glass dark */
  subtleDark: {
    background: 'rgba(28, 28, 30, 0.4)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: shadow.sm,
  },
} as const;

export type GlassType = keyof typeof glass;

// =============================================================================
// TAILWIND CLASS HELPERS
// =============================================================================

export const glassClasses = {
  /** Light mode glass */
  light: 'backdrop-blur-xl bg-white/72 border border-white/20 shadow-lg',

  /** Light mode glass hover */
  lightHover: 'backdrop-blur-2xl bg-white/85 border border-white/30 shadow-xl',

  /** Dark mode glass */
  dark: 'backdrop-blur-xl bg-[#1c1c1e]/72 border border-white/10 shadow-lg',

  /** Dark mode glass hover */
  darkHover: 'backdrop-blur-2xl bg-[#1c1c1e]/85 border border-white/15 shadow-xl',

  /** Responsive glass (auto dark/light) */
  responsive: 'backdrop-blur-xl bg-white/72 dark:bg-[#1c1c1e]/72 border border-white/20 dark:border-white/10 shadow-lg',

  /** Responsive glass hover */
  responsiveHover: 'backdrop-blur-2xl bg-white/85 dark:bg-[#1c1c1e]/85 border border-white/30 dark:border-white/15 shadow-xl',
} as const;

// =============================================================================
// GRADIENTS
// =============================================================================

export const gradient = {
  /** Primary gradient */
  primary: 'linear-gradient(135deg, #0071E3 0%, #5E5CE6 100%)',

  /** Success gradient */
  success: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)',

  /** Warning gradient */
  warning: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',

  /** Danger gradient */
  danger: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',

  /** Purple/scientific gradient */
  purple: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',

  /** Mesh gradient (decorative) */
  mesh: `
    radial-gradient(at 40% 20%, rgba(0, 113, 227, 0.1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(94, 92, 230, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(48, 209, 88, 0.1) 0px, transparent 50%),
    radial-gradient(at 80% 50%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(0, 113, 227, 0.1) 0px, transparent 50%),
    radial-gradient(at 80% 100%, rgba(94, 92, 230, 0.1) 0px, transparent 50%)
  `,

  /** Subtle background gradient */
  subtle: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(245,245,247,0.5) 100%)',

  /** Subtle background gradient dark */
  subtleDark: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(28,28,30,0.5) 100%)',
} as const;

// =============================================================================
// OPACITY VALUES
// =============================================================================

export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  15: '0.15',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  85: '0.85',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;

// =============================================================================
// FOCUS RING (Accessibility)
// =============================================================================

export const focusRing = {
  /** Default focus ring */
  default: {
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.5)',
  },

  /** Focus ring with offset */
  offset: {
    outline: 'none',
    boxShadow: '0 0 0 2px #ffffff, 0 0 0 4px rgba(0, 113, 227, 0.5)',
  },

  /** Dark mode focus ring */
  dark: {
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(94, 156, 237, 0.5)',
  },

  /** Error state focus ring */
  error: {
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.5)',
  },
} as const;

// =============================================================================
// TRANSITIONS
// =============================================================================

export const transition = {
  /** No transition */
  none: 'none',

  /** All properties */
  all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Default (common properties) */
  DEFAULT: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter 150ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Colors only */
  colors: 'color, background-color, border-color, text-decoration-color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Opacity */
  opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Shadow */
  shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Transform */
  transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Fast (interactions) */
  fast: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Slow (page transitions) */
  slow: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Spring-like */
  spring: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// =============================================================================
// TIMING FUNCTIONS
// =============================================================================

export const easing = {
  /** Linear */
  linear: 'linear',

  /** Ease in */
  in: 'cubic-bezier(0.4, 0, 1, 1)',

  /** Ease out */
  out: 'cubic-bezier(0, 0, 0.2, 1)',

  /** Ease in-out */
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  /** Spring-like overshoot */
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',

  /** Bounce */
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// =============================================================================
// DURATION
// =============================================================================

export const duration = {
  0: '0ms',
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const;

// =============================================================================
// TAILWIND CONFIG HELPER
// =============================================================================

/**
 * Returns effects settings formatted for Tailwind CSS configuration
 */
export function getTailwindEffects() {
  return {
    boxShadow: {
      ...shadow,
      'glow-primary': glow.primary,
      'glow-success': glow.success,
      'glow-warning': glow.warning,
      'glow-danger': glow.danger,
      'glow-purple': glow.purple,
    },
    blur,
    opacity,
    transitionTimingFunction: easing,
    transitionDuration: duration,
  };
}

// =============================================================================
// COMBINED EXPORT
// =============================================================================

export const effects = {
  shadow,
  glow,
  blur,
  glass,
  glassClasses,
  gradient,
  opacity,
  focusRing,
  transition,
  easing,
  duration,
} as const;

export default effects;
