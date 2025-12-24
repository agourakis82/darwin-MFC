/**
 * DESIGN SYSTEM - SHADOW TOKENS
 * ==============================
 *
 * Elevation system using layered shadows
 * Creates depth hierarchy for UI elements
 */

export const shadows = {
  // Elevation levels (0-5)
  elevation: {
    // No shadow - Flat on surface
    0: 'none',

    // Subtle lift - Slight elevation (cards)
    1: '0 1px 2px 0 rgb(0 0 0 / 0.05)',

    // Small shadow - Moderate elevation (buttons, inputs)
    2: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',

    // Medium shadow - Noticeable elevation (dropdowns, popovers)
    3: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

    // Large shadow - High elevation (modals, dialogs)
    4: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

    // Extra large shadow - Maximum elevation (overlays)
    5: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

    // Dramatic shadow - Special cases
    6: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Inner shadows
  inner: {
    sm: 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
    lg: 'inset 0 4px 8px 0 rgb(0 0 0 / 0.08)',
  },

  // Colored shadows (for brand emphasis)
  colored: {
    // Primary brand color
    primary: {
      sm: '0 4px 14px 0 rgb(59 130 246 / 0.25)',
      md: '0 8px 20px 0 rgb(59 130 246 / 0.3)',
      lg: '0 12px 28px 0 rgb(59 130 246 / 0.35)',
    },
    // Clinical critical (red)
    critical: {
      sm: '0 4px 14px 0 rgb(239 68 68 / 0.25)',
      md: '0 8px 20px 0 rgb(239 68 68 / 0.3)',
      lg: '0 12px 28px 0 rgb(239 68 68 / 0.35)',
    },
    // Clinical warning (amber)
    warning: {
      sm: '0 4px 14px 0 rgb(245 158 11 / 0.25)',
      md: '0 8px 20px 0 rgb(245 158 11 / 0.3)',
      lg: '0 12px 28px 0 rgb(245 158 11 / 0.35)',
    },
    // Clinical safe (green)
    safe: {
      sm: '0 4px 14px 0 rgb(34 197 94 / 0.25)',
      md: '0 8px 20px 0 rgb(34 197 94 / 0.3)',
      lg: '0 12px 28px 0 rgb(34 197 94 / 0.35)',
    },
  },

  // Glassmorphism shadows (for glass cards)
  glass: {
    sm: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
  },

  // Focus rings (for accessibility)
  focus: {
    default: '0 0 0 3px rgb(59 130 246 / 0.5)',
    primary: '0 0 0 3px rgb(59 130 246 / 0.5)',
    critical: '0 0 0 3px rgb(239 68 68 / 0.5)',
    safe: '0 0 0 3px rgb(34 197 94 / 0.5)',
  },

  // Outline shadows (alternative to borders)
  outline: {
    sm: '0 0 0 1px rgb(0 0 0 / 0.05)',
    md: '0 0 0 2px rgb(0 0 0 / 0.05)',
    lg: '0 0 0 3px rgb(0 0 0 / 0.05)',
  },

  // Dark mode variants
  dark: {
    elevation: {
      0: 'none',
      1: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      2: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
      3: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
      4: '0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.6)',
      5: '0 20px 25px -5px rgb(0 0 0 / 0.7), 0 8px 10px -6px rgb(0 0 0 / 0.7)',
      6: '0 25px 50px -12px rgb(0 0 0 / 0.8)',
    },
    glass: {
      sm: '0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
      md: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.2)',
      lg: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
    },
  },
} as const;

export type ShadowToken = typeof shadows;
