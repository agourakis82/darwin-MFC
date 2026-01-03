/**
 * DARWIN-MFC MEDICAL COLOR SYSTEM
 * ================================
 *
 * A comprehensive color palette designed for clinical applications.
 * Follows WCAG 2.2 AA contrast requirements and semantic meaning.
 *
 * Color Philosophy:
 * - Trust colors convey reliability and professionalism
 * - Evidence colors encode information quality (GRADE-based)
 * - Convergence colors show guideline alignment status
 * - Interaction colors indicate drug safety levels
 * - Surface colors enable glassmorphism effects
 */

// =============================================================================
// TRUST COLORS (Core Palette)
// =============================================================================

export const trustColors = {
  /** Clinical Blue - Primary actions, links, focus states */
  primary: '#0071E3',
  primaryLight: '#3B9AED',
  primaryDark: '#0058B3',

  /** Scientific Purple - Secondary actions, academic features */
  secondary: '#5E5CE6',
  secondaryLight: '#8180EA',
  secondaryDark: '#4745C7',

  /** Success Green - Confirmations, positive outcomes */
  tertiary: '#30D158',
  tertiaryLight: '#5DE07C',
  tertiaryDark: '#25A545',
} as const;

// =============================================================================
// EVIDENCE STRENGTH COLORS (GRADE-based)
// =============================================================================

export const evidenceColors = {
  /** Meta-analysis / Systematic Review - Highest quality */
  metaAnalysis: {
    bg: '#10B981',
    bgLight: '#D1FAE5',
    bgDark: '#064E3B',
    text: '#065F46',
    textDark: '#A7F3D0',
  },

  /** Randomized Controlled Trial - High quality */
  rct: {
    bg: '#3B82F6',
    bgLight: '#DBEAFE',
    bgDark: '#1E3A8A',
    text: '#1D4ED8',
    textDark: '#93C5FD',
  },

  /** Cohort Study - Moderate quality */
  cohort: {
    bg: '#F59E0B',
    bgLight: '#FEF3C7',
    bgDark: '#78350F',
    text: '#B45309',
    textDark: '#FCD34D',
  },

  /** Case-Control Study - Low quality */
  caseControl: {
    bg: '#F97316',
    bgLight: '#FFEDD5',
    bgDark: '#7C2D12',
    text: '#C2410C',
    textDark: '#FDBA74',
  },

  /** Expert Opinion - Very low quality */
  expertOpinion: {
    bg: '#EF4444',
    bgLight: '#FEE2E2',
    bgDark: '#7F1D1D',
    text: '#DC2626',
    textDark: '#FCA5A5',
  },
} as const;

// =============================================================================
// GRADE EVIDENCE LEVELS (A/B/C/D)
// =============================================================================

export const gradeColors = {
  A: {
    label: 'High',
    color: '#10B981',
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-500',
    hex: '#10B981',
  },
  B: {
    label: 'Moderate',
    color: '#3B82F6',
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-500',
    hex: '#3B82F6',
  },
  C: {
    label: 'Low',
    color: '#F59E0B',
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-500',
    hex: '#F59E0B',
  },
  D: {
    label: 'Very Low',
    color: '#EF4444',
    bg: 'bg-red-500',
    bgLight: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-500',
    hex: '#EF4444',
  },
} as const;

export type GradeLevel = keyof typeof gradeColors;

// =============================================================================
// CONVERGENCE STATUS COLORS
// =============================================================================

export const convergenceColors = {
  /** Full alignment between guidelines */
  full: {
    bg: '#22C55E',
    bgLight: '#DCFCE7',
    bgDark: '#14532D',
    text: '#166534',
    textDark: '#86EFAC',
    border: '#22C55E',
  },

  /** Partial alignment */
  partial: {
    bg: '#EAB308',
    bgLight: '#FEF9C3',
    bgDark: '#713F12',
    text: '#854D0E',
    textDark: '#FDE047',
    border: '#EAB308',
  },

  /** Disagreement between guidelines */
  divergence: {
    bg: '#EF4444',
    bgLight: '#FEE2E2',
    bgDark: '#7F1D1D',
    text: '#DC2626',
    textDark: '#FCA5A5',
    border: '#EF4444',
  },

  /** Active scientific debate */
  disputed: {
    bg: '#A855F7',
    bgLight: '#F3E8FF',
    bgDark: '#581C87',
    text: '#9333EA',
    textDark: '#D8B4FE',
    border: '#A855F7',
  },
} as const;

export type ConvergenceStatus = keyof typeof convergenceColors;

// =============================================================================
// DRUG INTERACTION SEVERITY COLORS
// =============================================================================

export const interactionColors = {
  /** Absolute contraindication - Do not combine */
  contraindicated: {
    bg: '#DC2626',
    bgLight: '#FEE2E2',
    bgDark: '#7F1D1D',
    text: '#B91C1C',
    textDark: '#FECACA',
    border: '#DC2626',
    pulse: true,
  },

  /** Major interaction - Avoid if possible */
  major: {
    bg: '#EA580C',
    bgLight: '#FFEDD5',
    bgDark: '#7C2D12',
    text: '#C2410C',
    textDark: '#FED7AA',
    border: '#EA580C',
    pulse: false,
  },

  /** Moderate interaction - Monitor closely */
  moderate: {
    bg: '#CA8A04',
    bgLight: '#FEF9C3',
    bgDark: '#713F12',
    text: '#A16207',
    textDark: '#FDE68A',
    border: '#CA8A04',
    pulse: false,
  },

  /** Minor interaction - Usually safe */
  minor: {
    bg: '#16A34A',
    bgLight: '#DCFCE7',
    bgDark: '#14532D',
    text: '#15803D',
    textDark: '#86EFAC',
    border: '#16A34A',
    pulse: false,
  },
} as const;

export type InteractionSeverity = keyof typeof interactionColors;

// =============================================================================
// SURFACE COLORS (Glassmorphism)
// =============================================================================

export const surfaceColors = {
  // Light mode surfaces
  glass: 'rgba(255, 255, 255, 0.72)',
  glassHover: 'rgba(255, 255, 255, 0.85)',
  elevated: 'rgba(255, 255, 255, 0.9)',
  elevatedHover: 'rgba(255, 255, 255, 0.95)',

  // Dark mode surfaces
  glassDark: 'rgba(28, 28, 30, 0.72)',
  glassHoverDark: 'rgba(28, 28, 30, 0.85)',
  elevatedDark: 'rgba(44, 44, 46, 0.9)',
  elevatedHoverDark: 'rgba(44, 44, 46, 0.95)',

  // Backdrop
  backdrop: 'rgba(0, 0, 0, 0.4)',
  backdropHeavy: 'rgba(0, 0, 0, 0.6)',
} as const;

// =============================================================================
// SEMANTIC COLORS
// =============================================================================

export const semanticColors = {
  // Informational
  info: {
    bg: '#3B82F6',
    bgLight: '#DBEAFE',
    text: '#1D4ED8',
    textDark: '#93C5FD',
    border: '#3B82F6',
  },

  // Success
  success: {
    bg: '#22C55E',
    bgLight: '#DCFCE7',
    text: '#166534',
    textDark: '#86EFAC',
    border: '#22C55E',
  },

  // Warning
  warning: {
    bg: '#F59E0B',
    bgLight: '#FEF3C7',
    text: '#B45309',
    textDark: '#FCD34D',
    border: '#F59E0B',
  },

  // Error
  error: {
    bg: '#EF4444',
    bgLight: '#FEE2E2',
    text: '#DC2626',
    textDark: '#FCA5A5',
    border: '#EF4444',
  },

  // Clinical alert (special medical context)
  clinical: {
    bg: '#8B5CF6',
    bgLight: '#EDE9FE',
    text: '#7C3AED',
    textDark: '#C4B5FD',
    border: '#8B5CF6',
  },
} as const;

export type SemanticType = keyof typeof semanticColors;

// =============================================================================
// TEXT COLORS
// =============================================================================

export const textColors = {
  // Light mode
  primary: '#1d1d1f',
  secondary: '#86868b',
  tertiary: '#aeaeb2',
  disabled: '#c7c7cc',
  inverse: '#f5f5f7',

  // Dark mode
  primaryDark: '#f5f5f7',
  secondaryDark: '#a1a1a6',
  tertiaryDark: '#636366',
  disabledDark: '#48484a',
  inverseDark: '#1d1d1f',
} as const;

// =============================================================================
// BACKGROUND COLORS
// =============================================================================

export const backgroundColors = {
  // Light mode
  primary: '#ffffff',
  secondary: '#f5f5f7',
  tertiary: '#e8e8ed',

  // Dark mode
  primaryDark: '#000000',
  secondaryDark: '#1c1c1e',
  tertiaryDark: '#2c2c2e',
} as const;

// =============================================================================
// COMBINED EXPORT
// =============================================================================

export const medicalColors = {
  trust: trustColors,
  evidence: evidenceColors,
  grade: gradeColors,
  convergence: convergenceColors,
  interaction: interactionColors,
  surface: surfaceColors,
  semantic: semanticColors,
  text: textColors,
  background: backgroundColors,
} as const;

// =============================================================================
// TAILWIND CONFIG HELPER
// =============================================================================

/**
 * Returns colors formatted for Tailwind CSS configuration
 */
export function getTailwindColors() {
  return {
    // Trust colors
    'trust-primary': trustColors.primary,
    'trust-primary-light': trustColors.primaryLight,
    'trust-primary-dark': trustColors.primaryDark,
    'trust-secondary': trustColors.secondary,
    'trust-secondary-light': trustColors.secondaryLight,
    'trust-secondary-dark': trustColors.secondaryDark,
    'trust-tertiary': trustColors.tertiary,
    'trust-tertiary-light': trustColors.tertiaryLight,
    'trust-tertiary-dark': trustColors.tertiaryDark,

    // Evidence colors
    'evidence-meta': evidenceColors.metaAnalysis.bg,
    'evidence-rct': evidenceColors.rct.bg,
    'evidence-cohort': evidenceColors.cohort.bg,
    'evidence-case': evidenceColors.caseControl.bg,
    'evidence-expert': evidenceColors.expertOpinion.bg,

    // Convergence colors
    'convergence-full': convergenceColors.full.bg,
    'convergence-partial': convergenceColors.partial.bg,
    'convergence-divergence': convergenceColors.divergence.bg,
    'convergence-disputed': convergenceColors.disputed.bg,

    // Interaction colors
    'interaction-contraindicated': interactionColors.contraindicated.bg,
    'interaction-major': interactionColors.major.bg,
    'interaction-moderate': interactionColors.moderate.bg,
    'interaction-minor': interactionColors.minor.bg,

    // Surface colors
    'surface-glass': surfaceColors.glass,
    'surface-glass-dark': surfaceColors.glassDark,
    'surface-elevated': surfaceColors.elevated,
    'surface-elevated-dark': surfaceColors.elevatedDark,
  };
}

export default medicalColors;
