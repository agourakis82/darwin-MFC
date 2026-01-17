/**
 * DESIGN SYSTEM - TOKEN EXPORTS
 * ==============================
 *
 * Central export for all design tokens
 * Import from here to access the complete design system
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './animations';
export * from './breakpoints';
export * from './shadows';
export * from './z-index';

// Re-export as a single tokens object for convenience
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { animations } from './animations';
import { breakpoints } from './breakpoints';
import { shadows } from './shadows';
import { zIndex } from './z-index';

export const tokens = {
  colors,
  typography,
  spacing,
  animations,
  breakpoints,
  shadows,
  zIndex,
} as const;

export type Tokens = typeof tokens;
