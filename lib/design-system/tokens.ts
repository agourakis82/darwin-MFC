/**
 * Darwin-MFC Design System Tokens
 * ================================
 *
 * Centralized design tokens for consistent visual language across the app.
 * Based on clinical/medical app best practices (UpToDate, AMBOSS patterns).
 *
 * These tokens complement the Tailwind CSS theme defined in globals.css.
 */

// =============================================================================
// SEMANTIC COLORS
// =============================================================================

/**
 * Clinical semantic color palette
 * Uses existing SOTA palette colors for consistency
 */
export type ColorScale = {
  DEFAULT: string;
  light: string;
  dark: string;
  text: string;
};

export const semanticColors = {
  // Primary action color - medical teal from SOTA palette
  primary: {
    DEFAULT: '#0E7490', // adenine-teal
    light: '#E0F2FE',   // sky-100
    dark: '#0C5D72',
    text: '#0E7490',
  },

  // Success/convergence - green from SOTA palette
  success: {
    DEFAULT: '#059669', // guanine-green
    light: '#D1FAE5',   // emerald-100
    dark: '#047857',
    text: '#059669',
  },

  // Warning/partial - gold from SOTA palette
  warning: {
    DEFAULT: '#B45309', // thymine-gold
    light: '#FEF3C7',   // amber-100
    dark: '#92400E',
    text: '#B45309',
  },

  // Danger/divergence - clinical red
  danger: {
    DEFAULT: '#DC2626', // red-600
    light: '#FEE2E2',   // red-100
    dark: '#B91C1C',
    text: '#DC2626',
  },

  // Info/em_disputa - cyan from SOTA palette
  info: {
    DEFAULT: '#06B6D4', // cytosine-cyan
    light: '#CFFAFE',   // cyan-100
    dark: '#0891B2',
    text: '#06B6D4',
  },

  // Neutral - carbon scale from SOTA palette
  neutral: {
    50: '#FBFBF9',   // paper-white
    100: '#F4F4F2',  // clinical-gray
    200: '#E5E5E2',  // carbon-200
    300: '#D1D1CD',  // carbon-300
    400: '#A1A19D',  // carbon-400
    500: '#71716D',  // carbon-500
    600: '#52524E',  // carbon-600
    700: '#3F3F3C',  // carbon-700
    800: '#272725',  // carbon-800
    900: '#1A1A18',  // carbon-900
    950: '#0F0F0E',  // carbon-950
  },
} as const;

// =============================================================================
// CONVERGENCE STATUS SYSTEM
// =============================================================================

export type ConvergenciaStatus = 'convergencia' | 'parcial' | 'divergencia' | 'em_disputa';

/**
 * Status configuration for convergence indicators
 * Maps convergence status to colors and icons
 */
export const convergenceConfig = {
  convergencia: {
    color: semanticColors.success,
    iconName: 'check' as const,
    label: { pt: 'Convergência', en: 'Convergence' },
  },
  parcial: {
    color: semanticColors.warning,
    iconName: 'alert-triangle' as const,
    label: { pt: 'Parcial', en: 'Partial' },
  },
  divergencia: {
    color: semanticColors.danger,
    iconName: 'x' as const,
    label: { pt: 'Divergência', en: 'Divergence' },
  },
  em_disputa: {
    color: semanticColors.info,
    iconName: 'help-circle' as const,
    label: { pt: 'Em disputa', en: 'Disputed' },
  },
} as const satisfies Record<ConvergenciaStatus, {
  color: ColorScale;
  iconName: 'check' | 'alert-triangle' | 'x' | 'help-circle';
  label: { pt: string; en: string; };
}>;

// =============================================================================
// EVIDENCE LEVELS
// =============================================================================

export type EvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'GPP' | 'I' | 'II' | 'III';

export const evidenceLevelConfig = {
  A: {
    color: semanticColors.success,
    label: 'A',
    description: { pt: 'Evidência forte', en: 'Strong evidence' },
  },
  B: {
    color: semanticColors.primary,
    label: 'B',
    description: { pt: 'Evidência moderada', en: 'Moderate evidence' },
  },
  C: {
    color: semanticColors.warning,
    label: 'C',
    description: { pt: 'Evidência fraca', en: 'Weak evidence' },
  },
  D: {
    color: { DEFAULT: '#71716D', light: '#E5E5E2', dark: '#3F3F3C', text: '#71716D' },
    label: 'D',
    description: { pt: 'Opinião de especialista', en: 'Expert opinion' },
  },
  GPP: {
    color: semanticColors.info,
    label: 'GPP',
    description: { pt: 'Boa prática clínica', en: 'Good practice point' },
  },
  I: {
    color: semanticColors.success,
    label: 'I',
    description: { pt: 'Nível I - Meta-análise/RCT', en: 'Level I - Meta-analysis/RCT' },
  },
  II: {
    color: semanticColors.primary,
    label: 'II',
    description: { pt: 'Nível II - Coorte/Caso-controle', en: 'Level II - Cohort/Case-control' },
  },
  III: {
    color: semanticColors.warning,
    label: 'III',
    description: { pt: 'Nível III - Série de casos', en: 'Level III - Case series' },
  },
} as const;

// =============================================================================
// CATEGORY ICONS (Lucide icon names, NOT emojis)
// =============================================================================

export type MedicalCategory =
  | 'cardiovascular'
  | 'respiratory'
  | 'neurological'
  | 'gastrointestinal'
  | 'endocrine'
  | 'infectious'
  | 'mental_health'
  | 'musculoskeletal'
  | 'dermatological'
  | 'pediatric'
  | 'geriatric'
  | 'oncology'
  | 'nephrology'
  | 'hematology'
  | 'immunology'
  | 'other';

/**
 * Category configuration using Lucide icon names
 * No emojis - professional icons only
 */
// Neutral color scale as ColorScale for use in configs
const neutralColorScale: ColorScale = {
  DEFAULT: '#71716D',
  light: '#E5E5E2',
  dark: '#3F3F3C',
  text: '#71716D'
};

export const categoryConfig = {
  cardiovascular: {
    iconName: 'heart',
    color: semanticColors.danger,
    label: { pt: 'Cardiovascular', en: 'Cardiovascular' },
  },
  respiratory: {
    iconName: 'wind',
    color: semanticColors.info,
    label: { pt: 'Respiratório', en: 'Respiratory' },
  },
  neurological: {
    iconName: 'brain',
    color: semanticColors.primary,
    label: { pt: 'Neurológico', en: 'Neurological' },
  },
  gastrointestinal: {
    iconName: 'utensils',
    color: semanticColors.warning,
    label: { pt: 'Gastrointestinal', en: 'Gastrointestinal' },
  },
  endocrine: {
    iconName: 'activity',
    color: semanticColors.primary,
    label: { pt: 'Endócrino', en: 'Endocrine' },
  },
  infectious: {
    iconName: 'bug',
    color: semanticColors.danger,
    label: { pt: 'Infeccioso', en: 'Infectious' },
  },
  mental_health: {
    iconName: 'smile',
    color: semanticColors.info,
    label: { pt: 'Saúde Mental', en: 'Mental Health' },
  },
  musculoskeletal: {
    iconName: 'bone',
    color: neutralColorScale,
    label: { pt: 'Musculoesquelético', en: 'Musculoskeletal' },
  },
  dermatological: {
    iconName: 'scan',
    color: semanticColors.warning,
    label: { pt: 'Dermatológico', en: 'Dermatological' },
  },
  pediatric: {
    iconName: 'baby',
    color: semanticColors.primary,
    label: { pt: 'Pediátrico', en: 'Pediatric' },
  },
  geriatric: {
    iconName: 'user',
    color: neutralColorScale,
    label: { pt: 'Geriátrico', en: 'Geriatric' },
  },
  oncology: {
    iconName: 'ribbon',
    color: semanticColors.danger,
    label: { pt: 'Oncológico', en: 'Oncology' },
  },
  nephrology: {
    iconName: 'droplet',
    color: semanticColors.primary,
    label: { pt: 'Nefrológico', en: 'Nephrology' },
  },
  hematology: {
    iconName: 'droplets',
    color: semanticColors.danger,
    label: { pt: 'Hematológico', en: 'Hematology' },
  },
  immunology: {
    iconName: 'shield',
    color: semanticColors.success,
    label: { pt: 'Imunológico', en: 'Immunology' },
  },
  other: {
    iconName: 'file-text',
    color: neutralColorScale,
    label: { pt: 'Outro', en: 'Other' },
  },
};

// =============================================================================
// TYPOGRAPHY SCALE
// =============================================================================

export const typography = {
  display: {
    family: 'var(--font-display)',
    weights: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  body: {
    family: 'var(--font-body)',
    weights: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  ui: {
    family: 'var(--font-ui)',
    weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  mono: {
    family: 'var(--font-mono)',
    weights: { normal: 400, medium: 500, semibold: 600 },
  },
};

// =============================================================================
// SPACING SCALE
// =============================================================================

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  elevation1: 'var(--shadow-elevation-1)',
  elevation2: 'var(--shadow-elevation-2)',
  deep: 'var(--shadow-deep)',
};

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const radii = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  full: '9999px',
};

// =============================================================================
// ANIMATION
// =============================================================================

export const animation = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};
