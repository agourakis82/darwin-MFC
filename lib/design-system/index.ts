/**
 * DARWIN-MFC DESIGN SYSTEM
 * =========================
 *
 * Central export for the complete design system
 * Import from here to access all tokens, primitives, components, and utilities
 *
 * @example
 * ```tsx
 * import { Button, Card, tokens, cn } from '@/lib/design-system';
 * import { medicalColors, typography, spacing } from '@/lib/design-system';
 * ```
 */

// =============================================================================
// SOTA+ 2026 DESIGN TOKENS
// =============================================================================

// Colors - Medical trust palette, evidence strength, convergence, interactions
export {
  medicalColors,
  trustColors,
  evidenceColors,
  gradeColors,
  convergenceColors,
  interactionColors,
  surfaceColors,
  semanticColors,
  textColors,
  backgroundColors,
  getTailwindColors,
  type GradeLevel,
  type ConvergenceStatus,
  type InteractionSeverity,
  type SemanticType,
} from './colors';

// Typography - CJK/RTL/Latin support, fluid scaling
export {
  typography,
  fontFamily,
  fontSize,
  fontSizeStatic,
  lineHeight,
  fontWeight,
  letterSpacing,
  scriptConfig,
  localeScriptMap,
  textStyles,
  getScriptConfig,
  isRTL,
  isCJK,
  getTailwindTypography,
} from './typography';

// Spacing - 4px grid, z-index, breakpoints, layout tokens
export {
  spacingSystem,
  spacing,
  contentWidth,
  breakpoints,
  zIndex,
  borderRadius,
  aspectRatio,
  containerPadding,
  layout,
  gap,
  getSpacing,
  calcSpacing,
  isBreakpoint,
  getTailwindSpacing,
  type SpacingKey,
  type Breakpoint,
} from './spacing';

// Effects - Glassmorphism, shadows, gradients, transitions
export {
  effects,
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
  getTailwindEffects,
  type GlowType,
  type GlassType,
} from './effects';

// Animations - Framer Motion presets, springs, transitions
export {
  animations,
  springs,
  tweens,
  pageTransitions,
  modalTransitions,
  cardAnimations,
  listAnimations,
  feedbackAnimations,
  loadingAnimations,
  revealAnimations,
  transitionPresets,
  getReducedMotionVariants,
  createStaggerContainer,
  createItemVariant,
} from './animations';

// =============================================================================
// LEGACY EXPORTS (for backward compatibility)
// =============================================================================

// Design Tokens (legacy)
export * from './tokens';

// Primitives (Shadcn/ui components)
export * from './primitives';

// Utilities
export * from './utils';

// Hooks
export * from './hooks';

// Components
export * from './components';

// Personalization (AI-powered)
export * from './personalization';

// Patterns (to be added)
// export * from './patterns';

// =============================================================================
// COMBINED DESIGN SYSTEM OBJECT
// =============================================================================

import { medicalColors } from './colors';
import { typography } from './typography';
import { spacingSystem } from './spacing';
import { effects } from './effects';
import { animations } from './animations';

export const designSystem = {
  colors: medicalColors,
  typography,
  spacing: spacingSystem,
  effects,
  animations,
} as const;
