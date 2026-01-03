/**
 * DARWIN-MFC TYPOGRAPHY SYSTEM
 * ============================
 *
 * A comprehensive typography system designed for medical applications
 * with full support for:
 * - Latin scripts (en, es, fr, pt)
 * - Cyrillic scripts (ru)
 * - Arabic scripts (ar) - RTL
 * - CJK scripts (zh) - Chinese
 * - Greek scripts (el)
 * - Indic scripts (hi) - Hindi/Devanagari
 *
 * Uses fluid typography with clamp() for responsive scaling.
 */

// =============================================================================
// FONT FAMILIES
// =============================================================================

export const fontFamily = {
  /** Primary sans-serif stack - optimized for all scripts */
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Noto Sans"',
    '"Noto Sans Arabic"',
    '"Noto Sans SC"',
    '"Noto Sans Devanagari"',
    'sans-serif',
  ].join(', '),

  /** Monospace stack for code */
  mono: [
    '"SF Mono"',
    '"Fira Code"',
    '"JetBrains Mono"',
    '"Noto Sans Mono"',
    'Consolas',
    'monospace',
  ].join(', '),

  /** Display font for headings */
  display: [
    '"SF Pro Display"',
    'Inter',
    '-apple-system',
    'sans-serif',
  ].join(', '),

  /** Arabic-specific font stack */
  arabic: [
    '"Noto Sans Arabic"',
    '"Noto Naskh Arabic"',
    '"Amiri"',
    'Tahoma',
    'sans-serif',
  ].join(', '),

  /** Chinese-specific font stack (Simplified) */
  chinese: [
    '"Noto Sans SC"',
    '"PingFang SC"',
    '"Microsoft YaHei"',
    '"Heiti SC"',
    'sans-serif',
  ].join(', '),

  /** Hindi/Devanagari font stack */
  hindi: [
    '"Noto Sans Devanagari"',
    '"Mangal"',
    '"Kokila"',
    'sans-serif',
  ].join(', '),

  /** Greek font stack */
  greek: [
    '"Noto Sans"',
    '-apple-system',
    'sans-serif',
  ].join(', '),

  /** Russian/Cyrillic font stack */
  cyrillic: [
    '"Noto Sans"',
    '-apple-system',
    'sans-serif',
  ].join(', '),
} as const;

// =============================================================================
// FONT SIZES (Fluid Scale with clamp)
// =============================================================================

export const fontSize = {
  /** 12px - 14px */
  xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',

  /** 14px - 16px */
  sm: 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',

  /** 16px - 18px (base) */
  base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',

  /** 18px - 20px */
  lg: 'clamp(1.125rem, 1rem + 0.65vw, 1.25rem)',

  /** 20px - 24px */
  xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',

  /** 24px - 32px */
  '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',

  /** 30px - 40px */
  '3xl': 'clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)',

  /** 36px - 48px */
  '4xl': 'clamp(2.25rem, 1.8rem + 2vw, 3rem)',

  /** 48px - 64px */
  '5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',
} as const;

// Static font sizes for non-fluid contexts
export const fontSizeStatic = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
} as const;

// =============================================================================
// LINE HEIGHTS
// =============================================================================

export const lineHeight = {
  /** Tight - for headings */
  tight: '1.25',

  /** Snug - for subheadings */
  snug: '1.375',

  /** Normal - for body text (Latin) */
  normal: '1.5',

  /** Relaxed - for body text (CJK, Arabic) */
  relaxed: '1.625',

  /** Loose - for CJK optimal readability */
  loose: '1.8',

  /** Extra loose - for dense content */
  extraLoose: '2',
} as const;

// =============================================================================
// FONT WEIGHTS
// =============================================================================

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

// =============================================================================
// LETTER SPACING
// =============================================================================

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',

  /** CJK-specific - slightly wider for readability */
  cjk: '0.02em',
} as const;

// =============================================================================
// SCRIPT-SPECIFIC CONFIGURATIONS
// =============================================================================

export const scriptConfig = {
  /** Latin languages: pt, en, es, fr */
  latin: {
    fontFamily: fontFamily.sans,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    direction: 'ltr' as const,
    textAlign: 'left' as const,
  },

  /** Arabic (RTL) */
  arabic: {
    fontFamily: fontFamily.arabic,
    lineHeight: lineHeight.loose,
    letterSpacing: letterSpacing.normal,
    direction: 'rtl' as const,
    textAlign: 'right' as const,
  },

  /** Chinese (Simplified) */
  chinese: {
    fontFamily: fontFamily.chinese,
    lineHeight: lineHeight.loose,
    letterSpacing: letterSpacing.cjk,
    direction: 'ltr' as const,
    textAlign: 'left' as const,
  },

  /** Hindi/Devanagari */
  hindi: {
    fontFamily: fontFamily.hindi,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
    direction: 'ltr' as const,
    textAlign: 'left' as const,
  },

  /** Greek */
  greek: {
    fontFamily: fontFamily.greek,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    direction: 'ltr' as const,
    textAlign: 'left' as const,
  },

  /** Russian/Cyrillic */
  cyrillic: {
    fontFamily: fontFamily.cyrillic,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    direction: 'ltr' as const,
    textAlign: 'left' as const,
  },
} as const;

// =============================================================================
// LOCALE TO SCRIPT MAPPING
// =============================================================================

export const localeScriptMap: Record<string, keyof typeof scriptConfig> = {
  pt: 'latin',
  en: 'latin',
  es: 'latin',
  fr: 'latin',
  ar: 'arabic',
  zh: 'chinese',
  hi: 'hindi',
  el: 'greek',
  ru: 'cyrillic',
} as const;

/**
 * Get script configuration for a locale
 */
export function getScriptConfig(locale: string) {
  const script = localeScriptMap[locale] || 'latin';
  return scriptConfig[script];
}

/**
 * Check if locale uses RTL
 */
export function isRTL(locale: string): boolean {
  return locale === 'ar';
}

/**
 * Check if locale uses CJK scripts
 */
export function isCJK(locale: string): boolean {
  return ['zh', 'ja', 'ko'].includes(locale);
}

// =============================================================================
// TEXT STYLES (Predefined combinations)
// =============================================================================

export const textStyles = {
  // Headings
  h1: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Body text
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodyLarge: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  // UI elements
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  overline: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },

  // Code
  code: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
} as const;

// =============================================================================
// TAILWIND CONFIG HELPER
// =============================================================================

/**
 * Returns typography settings formatted for Tailwind CSS configuration
 */
export function getTailwindTypography() {
  return {
    fontFamily: {
      sans: fontFamily.sans.split(', '),
      mono: fontFamily.mono.split(', '),
      display: fontFamily.display.split(', '),
      arabic: fontFamily.arabic.split(', '),
      chinese: fontFamily.chinese.split(', '),
      hindi: fontFamily.hindi.split(', '),
    },
    fontSize: {
      xs: [fontSizeStatic.xs, { lineHeight: lineHeight.normal }],
      sm: [fontSizeStatic.sm, { lineHeight: lineHeight.normal }],
      base: [fontSizeStatic.base, { lineHeight: lineHeight.relaxed }],
      lg: [fontSizeStatic.lg, { lineHeight: lineHeight.relaxed }],
      xl: [fontSizeStatic.xl, { lineHeight: lineHeight.snug }],
      '2xl': [fontSizeStatic['2xl'], { lineHeight: lineHeight.snug }],
      '3xl': [fontSizeStatic['3xl'], { lineHeight: lineHeight.tight }],
      '4xl': [fontSizeStatic['4xl'], { lineHeight: lineHeight.tight }],
      '5xl': [fontSizeStatic['5xl'], { lineHeight: lineHeight.tight }],
    },
    lineHeight,
    letterSpacing,
    fontWeight,
  };
}

// =============================================================================
// COMBINED EXPORT
// =============================================================================

export const typography = {
  fontFamily,
  fontSize,
  fontSizeStatic,
  lineHeight,
  fontWeight,
  letterSpacing,
  scriptConfig,
  localeScriptMap,
  textStyles,
} as const;

export default typography;
