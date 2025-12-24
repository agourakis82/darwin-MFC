/**
 * DESIGN SYSTEM - COLOR TOKENS
 * =============================
 *
 * Semantic color system for Darwin-MFC with clinical context support
 * Based on HSL color space for better manipulation and theming
 */

export const colors = {
  // Clinical Semantic Colors - Context-aware for medical use
  clinical: {
    critical: {
      base: 'hsl(0 84% 60%)',        // Red - Critical alerts, urgent actions
      light: 'hsl(0 84% 70%)',
      dark: 'hsl(0 84% 50%)',
      foreground: 'hsl(0 0% 100%)',  // White text on critical
    },
    warning: {
      base: 'hsl(38 92% 50%)',       // Amber - Warnings, cautions
      light: 'hsl(38 92% 60%)',
      dark: 'hsl(38 92% 40%)',
      foreground: 'hsl(0 0% 0%)',    // Black text on warning
    },
    safe: {
      base: 'hsl(142 71% 45%)',      // Green - Safe ranges, success
      light: 'hsl(142 71% 55%)',
      dark: 'hsl(142 71% 35%)',
      foreground: 'hsl(0 0% 100%)',  // White text on safe
    },
    info: {
      base: 'hsl(217 91% 60%)',      // Blue - Informational
      light: 'hsl(217 91% 70%)',
      dark: 'hsl(217 91% 50%)',
      foreground: 'hsl(0 0% 100%)',  // White text on info
    },
    medication: {
      base: 'hsl(271 81% 56%)',      // Purple - Medications
      light: 'hsl(271 81% 66%)',
      dark: 'hsl(271 81% 46%)',
      foreground: 'hsl(0 0% 100%)',  // White text on medication
    },
  },

  // Brand Colors - Darwin-MFC identity
  brand: {
    primary: {
      50: 'hsl(217 91% 97%)',
      100: 'hsl(217 91% 94%)',
      200: 'hsl(217 91% 87%)',
      300: 'hsl(217 91% 77%)',
      400: 'hsl(217 91% 65%)',
      500: 'hsl(217 91% 60%)',        // Main brand color
      600: 'hsl(217 91% 54%)',
      700: 'hsl(217 91% 48%)',
      800: 'hsl(217 91% 42%)',
      900: 'hsl(217 91% 32%)',
    },
    secondary: {
      50: 'hsl(271 81% 97%)',
      100: 'hsl(271 81% 94%)',
      200: 'hsl(271 81% 87%)',
      300: 'hsl(271 81% 76%)',
      400: 'hsl(271 81% 66%)',
      500: 'hsl(271 81% 56%)',        // Secondary brand color
      600: 'hsl(271 81% 46%)',
      700: 'hsl(271 81% 40%)',
      800: 'hsl(271 81% 34%)',
      900: 'hsl(271 81% 28%)',
    },
  },

  // Neutral Grays - For text, borders, backgrounds
  neutral: {
    50: 'hsl(0 0% 98%)',
    100: 'hsl(0 0% 96%)',
    200: 'hsl(0 0% 90%)',
    300: 'hsl(0 0% 83%)',
    400: 'hsl(0 0% 64%)',
    500: 'hsl(0 0% 45%)',
    600: 'hsl(0 0% 32%)',
    700: 'hsl(0 0% 25%)',
    800: 'hsl(0 0% 15%)',
    900: 'hsl(0 0% 9%)',
    950: 'hsl(0 0% 4%)',
  },

  // Convergence Status Colors (for SUS vs Societies comparison)
  convergence: {
    full: 'hsl(142 71% 45%)',        // Green - Full convergence
    partial: 'hsl(38 92% 50%)',      // Amber - Partial convergence
    divergent: 'hsl(0 84% 60%)',     // Red - Divergence
    disputed: 'hsl(271 81% 56%)',    // Purple - Disputed/Under debate
  },

  // Evidence Strength Colors (for academic citations)
  evidence: {
    strong: 'hsl(142 71% 45%)',      // Green - Strong evidence (Level 1)
    moderate: 'hsl(217 91% 60%)',    // Blue - Moderate evidence (Level 2)
    weak: 'hsl(38 92% 50%)',         // Amber - Weak evidence (Level 3)
    expert: 'hsl(271 81% 56%)',      // Purple - Expert opinion (Level 4)
  },

  // UI State Colors
  state: {
    success: 'hsl(142 71% 45%)',
    error: 'hsl(0 84% 60%)',
    warning: 'hsl(38 92% 50%)',
    info: 'hsl(217 91% 60%)',
  },

  // Glassmorphism - For card backgrounds with blur
  glass: {
    light: 'hsla(0 0% 100% / 0.7)',
    medium: 'hsla(0 0% 100% / 0.5)',
    strong: 'hsla(0 0% 100% / 0.9)',
    dark: 'hsla(0 0% 0% / 0.5)',
  },
} as const;

export type ColorToken = typeof colors;
