/**
 * DESIGN SYSTEM - TYPOGRAPHY TOKENS
 * ==================================
 *
 * Fluid typography system with responsive scaling
 * Uses clamp() for smooth size transitions across viewports
 */

export const typography = {
  // Font Families
  fonts: {
    sans: 'var(--font-inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    mono: 'var(--font-mono, "SF Mono", Monaco, "Cascadia Code", "Courier New", monospace)',
    medical: 'var(--font-inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)', // Can be customized for medical terminology
  },

  // Fluid Font Sizes - Responsive across viewports
  // Using clamp(min, preferred, max) for smooth scaling
  sizes: {
    xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',      // 12px -> 14px
    sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',         // 14px -> 16px
    base: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',       // 16px -> 18px
    lg: 'clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)',     // 18px -> 20px
    xl: 'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',         // 20px -> 24px
    '2xl': 'clamp(1.5rem, 1.35rem + 0.75vw, 2rem)',        // 24px -> 32px
    '3xl': 'clamp(1.875rem, 1.65rem + 1.125vw, 2.5rem)',   // 30px -> 40px
    '4xl': 'clamp(2.25rem, 1.95rem + 1.5vw, 3rem)',        // 36px -> 48px
    '5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',            // 48px -> 64px
  },

  // Line Heights - Optimized for readability
  lineHeights: {
    none: 1,
    tight: 1.15,      // Headings
    snug: 1.375,      // Subheadings
    normal: 1.5,      // Body text
    relaxed: 1.75,    // Long-form content
    loose: 2,         // Spacious layouts
  },

  // Font Weights
  weights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Text Styles - Pre-composed combinations
  styles: {
    h1: {
      fontSize: 'clamp(2.25rem, 1.95rem + 1.5vw, 3rem)',
      lineHeight: 1.15,
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: 'clamp(1.875rem, 1.65rem + 1.125vw, 2.5rem)',
      lineHeight: 1.15,
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 1.35rem + 0.75vw, 2rem)',
      lineHeight: 1.15,
      fontWeight: '600',
      letterSpacing: '-0.015em',
    },
    h4: {
      fontSize: 'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',
      lineHeight: 1.375,
      fontWeight: '600',
      letterSpacing: '0em',
    },
    h5: {
      fontSize: 'clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)',
      lineHeight: 1.375,
      fontWeight: '600',
      letterSpacing: '0em',
    },
    h6: {
      fontSize: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
      lineHeight: 1.375,
      fontWeight: '600',
      letterSpacing: '0em',
    },
    body: {
      fontSize: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
      lineHeight: 1.5,
      fontWeight: '400',
      letterSpacing: '0em',
    },
    bodySmall: {
      fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
      lineHeight: 1.5,
      fontWeight: '400',
      letterSpacing: '0em',
    },
    caption: {
      fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
      lineHeight: 1.375,
      fontWeight: '400',
      letterSpacing: '0.015em',
    },
    button: {
      fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
      lineHeight: 1,
      fontWeight: '500',
      letterSpacing: '0.025em',
    },
    label: {
      fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
      lineHeight: 1.375,
      fontWeight: '500',
      letterSpacing: '0em',
    },
    code: {
      fontSize: 'clamp(0.875rem, 0.85rem + 0.125vw, 0.9375rem)',
      lineHeight: 1.5,
      fontWeight: '400',
      letterSpacing: '0em',
      fontFamily: 'var(--font-mono)',
    },
  },

  // OpenType Features for Inter font
  // Enable advanced typography features
  features: {
    // Contextual alternates
    calt: 'calt',
    // Kerning
    kern: 'kern',
    // Ligatures
    liga: 'liga',
    // Tabular figures (for numbers in tables)
    tnum: 'tnum',
    // Slashed zero
    zero: 'zero',
  },
} as const;

export type TypographyToken = typeof typography;
