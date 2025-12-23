/**
 * Darwin Design System (DDS) - Design Tokens
 * Centralized design tokens for consistent styling across the application
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const colors = {
  // Brand Colors
  brand: {
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a',
    },
    indigo: {
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
    },
    purple: {
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
    },
    emerald: {
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },
    red: {
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    amber: {
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
  },

  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Semantic Colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Apple-inspired Colors
  apple: {
    light: {
      text: '#1d1d1f',
      secondaryText: '#86868b',
      tertiaryText: '#6e6e73',
      background: '#ffffff',
      secondaryBackground: '#f5f5f7',
      separator: '#d2d2d7',
      blue: '#007aff',
      green: '#34c759',
      red: '#ff3b30',
      orange: '#ff9500',
      purple: '#af52de',
    },
    dark: {
      text: '#f5f5f7',
      secondaryText: '#86868b',
      tertiaryText: '#6e6e73',
      background: '#000000',
      secondaryBackground: '#1c1c1e',
      separator: '#38383a',
      blue: '#0a84ff',
      green: '#30d158',
      red: '#ff453a',
      orange: '#ff9f0a',
      purple: '#bf5af2',
    },
  },
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const typography = {
  fontFamily: {
    sans: "'Inter', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif",
    mono: "'SF Mono', 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace",
  },

  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '-0.011em',
    wide: '0.025em',
  },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

export const spacing = {
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Premium glassmorphism shadows
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  glassStrong: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',

  // Colored shadows
  blue: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
  purple: '0 4px 14px 0 rgba(139, 92, 246, 0.39)',
  emerald: '0 4px 14px 0 rgba(16, 185, 129, 0.39)',
} as const;

// =============================================================================
// TRANSITION TOKENS
// =============================================================================

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  timing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  max: 9999,
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// =============================================================================
// COMPONENT-SPECIFIC TOKENS
// =============================================================================

export const components = {
  button: {
    sizes: {
      sm: { height: '2rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
      md: { height: '2.5rem', padding: '0.5rem 1rem', fontSize: '1rem' },
      lg: { height: '3rem', padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
    },
  },
  input: {
    sizes: {
      sm: { height: '2rem', padding: '0.5rem', fontSize: '0.875rem' },
      md: { height: '2.5rem', padding: '0.75rem', fontSize: '1rem' },
      lg: { height: '3rem', padding: '1rem', fontSize: '1.125rem' },
    },
  },
  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
    },
  },
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get CSS variable for a color
 */
export function getCssVar(path: string): string {
  return `var(--${path.replace(/\./g, '-')})`;
}

/**
 * Create rgba color with opacity
 */
export function rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  components,
} as const;

export default designTokens;
