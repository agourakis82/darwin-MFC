/**
 * DESIGN SYSTEM - SPACING TOKENS
 * ===============================
 *
 * Consistent spacing scale based on 4px base unit
 * Follows 8-point grid system for better alignment
 */

export const spacing = {
  // Base spacing units (4px increments)
  px: '1px',
  0: '0px',
  0.5: '0.125rem',    // 2px
  1: '0.25rem',       // 4px  - Base unit
  1.5: '0.375rem',    // 6px
  2: '0.5rem',        // 8px  - Half grid
  2.5: '0.625rem',    // 10px
  3: '0.75rem',       // 12px
  3.5: '0.875rem',    // 14px
  4: '1rem',          // 16px - Full grid
  5: '1.25rem',       // 20px
  6: '1.5rem',        // 24px
  7: '1.75rem',       // 28px
  8: '2rem',          // 32px
  9: '2.25rem',       // 36px
  10: '2.5rem',       // 40px
  11: '2.75rem',      // 44px - Touch target minimum
  12: '3rem',         // 48px
  14: '3.5rem',       // 56px
  16: '4rem',         // 64px
  20: '5rem',         // 80px
  24: '6rem',         // 96px
  28: '7rem',         // 112px
  32: '8rem',         // 128px
  36: '9rem',         // 144px
  40: '10rem',        // 160px
  44: '11rem',        // 176px
  48: '12rem',        // 192px
  52: '13rem',        // 208px
  56: '14rem',        // 224px
  60: '15rem',        // 240px
  64: '16rem',        // 256px
  72: '18rem',        // 288px
  80: '20rem',        // 320px
  96: '24rem',        // 384px

  // Semantic spacing - Context-aware
  semantic: {
    // Component spacing
    component: {
      xs: '0.25rem',    // 4px  - Tight spacing within components
      sm: '0.5rem',     // 8px  - Small spacing
      md: '1rem',       // 16px - Default spacing
      lg: '1.5rem',     // 24px - Large spacing
      xl: '2rem',       // 32px - Extra large spacing
    },

    // Layout spacing
    layout: {
      xs: '1rem',       // 16px - Minimal section spacing
      sm: '1.5rem',     // 24px - Small section spacing
      md: '2rem',       // 32px - Default section spacing
      lg: '3rem',       // 48px - Large section spacing
      xl: '4rem',       // 64px - Extra large section spacing
      '2xl': '6rem',    // 96px - Page section spacing
    },

    // Container padding
    container: {
      mobile: '1rem',     // 16px - Mobile padding
      tablet: '1.5rem',   // 24px - Tablet padding
      desktop: '2rem',    // 32px - Desktop padding
      wide: '3rem',       // 48px - Wide screen padding
    },

    // Touch targets (for mobile)
    touch: {
      minimum: '2.75rem',  // 44px - iOS/Android minimum touch target
      comfortable: '3rem',  // 48px - Comfortable touch target
      spacious: '3.5rem',   // 56px - Spacious touch target
    },
  },

  // Safe area insets (for mobile devices with notches)
  safeArea: {
    top: 'env(safe-area-inset-top, 0px)',
    right: 'env(safe-area-inset-right, 0px)',
    bottom: 'env(safe-area-inset-bottom, 0px)',
    left: 'env(safe-area-inset-left, 0px)',
  },
} as const;

export type SpacingToken = typeof spacing;
