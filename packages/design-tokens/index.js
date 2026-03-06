// Darwin-MFC shared design tokens (web + mobile).
// Kept as plain JS to avoid requiring a build step for workspaces consumers.
'use strict';

const colors = {
  // SOTA palette already used by the web app (app/globals.css)
  paperWhite: '#FBFBF9',
  clinicalGray: '#F4F4F2',
  phosphate: '#F8FAFC',
  helixNavy: '#0D2137',

  adenineTeal: '#0E7490',
  guanineGreen: '#059669',
  cytosineCyan: '#06B6D4',
  thymineGold: '#B45309',

  carbon: {
    50: '#FBFBF9',
    100: '#F4F4F2',
    200: '#E5E5E2',
    300: '#D1D1CD',
    400: '#A1A19D',
    500: '#71716D',
    600: '#52524E',
    700: '#3F3F3C',
    800: '#272725',
    900: '#1A1A18',
    950: '#0F0F0E',
  },

  // Brand scales (DDS primitives rely on these via Tailwind utilities)
  brand: {
    primary: {
      50: '#ECFEFF',
      100: '#CFFAFE',
      200: '#A5F3FC',
      300: '#67E8F9',
      400: '#22D3EE',
      500: '#0E7490',
      600: '#0B5F75',
      700: '#094A5B',
      800: '#073542',
      900: '#052028',
      950: '#031a20',
    },
    secondary: {
      50: '#ECFEFF',
      100: '#CFFAFE',
      200: '#A5F3FC',
      300: '#67E8F9',
      400: '#22D3EE',
      500: '#06B6D4',
      600: '#0891B2',
      700: '#0E7490',
      800: '#155E75',
      900: '#164E63',
      950: '#0b2f41',
    },
  },

  // Legacy "critical-red" scale used across the app
  criticalRed: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Clinical semantic (base/dark/foreground)
  clinical: {
    critical: { base: '#DC2626', dark: '#B91C1C', foreground: '#FFFFFF' },
    warning: { base: '#B45309', dark: '#92400E', foreground: '#FFFFFF' },
    safe: { base: '#059669', dark: '#047857', foreground: '#FFFFFF' },
    info: { base: '#0E7490', dark: '#155E75', foreground: '#FFFFFF' },
  },
};

const motion = {
  // Apple-ish easing and durations
  easeApple: [0.4, 0.0, 0.2, 1.0],
  durationFastMs: 150,
  durationNormalMs: 300,
};

const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
};

const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const shadows = {
  elevation1: '0 1px 2px rgba(0, 0, 0, 0.05)',
  elevation2: '0 4px 12px rgba(0, 0, 0, 0.05)',
  deep: '0 12px 32px -8px rgba(0, 0, 0, 0.10)',
};

function getCssVars() {
  return {
    '--color-paper-white': colors.paperWhite,
    '--color-clinical-gray': colors.clinicalGray,
    '--color-phosphate': colors.phosphate,
    '--color-helix-navy': colors.helixNavy,

    '--color-adenine-teal': colors.adenineTeal,
    '--color-guanine-green': colors.guanineGreen,
    '--color-cytosine-cyan': colors.cytosineCyan,
    '--color-thymine-gold': colors.thymineGold,

    '--color-brand-primary-50': colors.brand.primary[50],
    '--color-brand-primary-100': colors.brand.primary[100],
    '--color-brand-primary-200': colors.brand.primary[200],
    '--color-brand-primary-300': colors.brand.primary[300],
    '--color-brand-primary-400': colors.brand.primary[400],
    '--color-brand-primary-500': colors.brand.primary[500],
    '--color-brand-primary-600': colors.brand.primary[600],
    '--color-brand-primary-700': colors.brand.primary[700],
    '--color-brand-primary-800': colors.brand.primary[800],
    '--color-brand-primary-900': colors.brand.primary[900],
    '--color-brand-primary-950': colors.brand.primary[950],

    '--color-brand-secondary-50': colors.brand.secondary[50],
    '--color-brand-secondary-100': colors.brand.secondary[100],
    '--color-brand-secondary-200': colors.brand.secondary[200],
    '--color-brand-secondary-300': colors.brand.secondary[300],
    '--color-brand-secondary-400': colors.brand.secondary[400],
    '--color-brand-secondary-500': colors.brand.secondary[500],
    '--color-brand-secondary-600': colors.brand.secondary[600],
    '--color-brand-secondary-700': colors.brand.secondary[700],
    '--color-brand-secondary-800': colors.brand.secondary[800],
    '--color-brand-secondary-900': colors.brand.secondary[900],
    '--color-brand-secondary-950': colors.brand.secondary[950],

    '--color-bg-page': colors.phosphate,
    '--color-bg-card': '#FFFFFF',
    '--color-bg-surface': '#FFFFFF',
    '--color-text-primary': colors.carbon[900],
    '--color-text-secondary': colors.carbon[600],
    '--color-border': colors.carbon[200],

    '--color-critical-red': colors.criticalRed[600],
    '--color-critical-red-50': colors.criticalRed[50],
    '--color-critical-red-100': colors.criticalRed[100],
    '--color-critical-red-200': colors.criticalRed[200],
    '--color-critical-red-300': colors.criticalRed[300],
    '--color-critical-red-400': colors.criticalRed[400],
    '--color-critical-red-500': colors.criticalRed[500],
    '--color-critical-red-600': colors.criticalRed[600],
    '--color-critical-red-700': colors.criticalRed[700],
    '--color-critical-red-800': colors.criticalRed[800],
    '--color-critical-red-900': colors.criticalRed[900],

    '--color-clinical-critical-base': colors.clinical.critical.base,
    '--color-clinical-critical-dark': colors.clinical.critical.dark,
    '--color-clinical-critical-foreground': colors.clinical.critical.foreground,

    '--color-clinical-warning-base': colors.clinical.warning.base,
    '--color-clinical-warning-dark': colors.clinical.warning.dark,
    '--color-clinical-warning-foreground': colors.clinical.warning.foreground,

    '--color-clinical-safe-base': colors.clinical.safe.base,
    '--color-clinical-safe-dark': colors.clinical.safe.dark,
    '--color-clinical-safe-foreground': colors.clinical.safe.foreground,

    '--color-clinical-info-base': colors.clinical.info.base,
    '--color-clinical-info-dark': colors.clinical.info.dark,
    '--color-clinical-info-foreground': colors.clinical.info.foreground,

    '--color-carbon-50': colors.carbon[50],
    '--color-carbon-100': colors.carbon[100],
    '--color-carbon-200': colors.carbon[200],
    '--color-carbon-300': colors.carbon[300],
    '--color-carbon-400': colors.carbon[400],
    '--color-carbon-500': colors.carbon[500],
    '--color-carbon-600': colors.carbon[600],
    '--color-carbon-700': colors.carbon[700],
    '--color-carbon-800': colors.carbon[800],
    '--color-carbon-900': colors.carbon[900],
    '--color-carbon-950': colors.carbon[950],

    '--shadow-elevation-1': shadows.elevation1,
    '--shadow-elevation-2': shadows.elevation2,
    '--shadow-deep': shadows.deep,
  };
}

function getRNTheme() {
  // Basic React Native Paper-compatible theme values.
  return {
    colors: {
      primary: colors.brand.primary[500],
      secondary: colors.brand.secondary[500],
      background: colors.phosphate,
      surface: '#FFFFFF',
      text: colors.carbon[900],
      onSurface: colors.carbon[900],
      outline: colors.carbon[200],
      error: colors.clinical.critical.base,
    },
    roundness: radii.md,
  };
}

module.exports = {
  colors,
  motion,
  radii,
  spacing,
  shadows,
  getCssVars,
  getRNTheme,
};
