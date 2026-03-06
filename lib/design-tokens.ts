/**
 * Darwin Design System (DDS) - Design Tokens
 * Academic Premium & Clinical Authority Standard
 *
 * Source of truth:
 * - @darwin-mfc/design-tokens (shared web + mobile)
 *
 * This file is kept as a compatibility layer to avoid import churn.
 */

import {
  colors as tokenColors,
  radii as tokenRadii,
  spacing as tokenSpacing,
  motion,
  shadows,
  getCssVars,
  getRNTheme,
} from '@darwin-mfc/design-tokens';

export const colors = {
  // Darwin Medical Hub palette (semantic)
  darwin: {
    helixNavy: tokenColors.helixNavy,
    adenineTeal: tokenColors.adenineTeal,
    guanineGreen: tokenColors.guanineGreen,
    cytosineCyan: tokenColors.cytosineCyan,
    thymineGold: tokenColors.thymineGold,

    paperWhite: tokenColors.paperWhite,
    clinicalGray: tokenColors.clinicalGray,
    phosphate: tokenColors.phosphate,

    carbon: tokenColors.carbon,

    border: 'rgba(26, 26, 24, 0.10)', // hairline default (web overrides via CSS vars)

    critical: {
      red: tokenColors.clinical.critical.dark,
      orange: tokenColors.clinical.warning.dark,
    },
  },

  // Apple-inspired logical colors (minimal, for JS-only logic)
  apple: {
    light: {
      text: tokenColors.carbon[900],
      secondaryText: tokenColors.carbon[500],
      background: tokenColors.paperWhite,
      separator: 'rgba(0,0,0,0.10)',
    },
    dark: {
      text: tokenColors.carbon[100],
      background: tokenColors.carbon[950],
      separator: 'rgba(255,255,255,0.10)',
    },
  },
} as const;

export const typography = {
  fontFamily: {
    // System UI by default (performance + Apple-native feel)
    ui: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif",
    display: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif",

    // Long-form academic reading
    body: "'Source Serif 4', ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",

    // Data/code
    code: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },

  fontSize: {
    xs: '0.75rem',
    sm: '0.8125rem', // Refined small
    base: '0.9375rem', // Professional body size
    lg: '1.0625rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.5rem',
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
} as const;

export const spacing = {
  hairline: '0.5px',
  thin: '1px',
  xs: `${tokenSpacing.xs}px`,
  sm: `${tokenSpacing.sm}px`,
  md: `${tokenSpacing.md}px`,
  lg: `${tokenSpacing.lg}px`,
  xl: `${tokenSpacing.xl}px`,
  xxl: `${tokenSpacing.xxl}px`,
} as const;

export const borderRadius = {
  none: '0',
  sm: `${tokenRadii.sm}px`,
  md: `${tokenRadii.md}px`,
  lg: `${tokenRadii.lg}px`,
  xl: `${tokenRadii.xl}px`,
  full: '9999px',
} as const;

export const designTokens = {
  colors,
  typography,
  borderRadius,
} as const;

export default designTokens;

// Re-export core shared tokens for consumers that want the canonical objects.
export {
  tokenColors,
  tokenRadii as radii,
  tokenSpacing as tokenSpacing,
  motion,
  shadows,
  getCssVars,
  getRNTheme,
};
