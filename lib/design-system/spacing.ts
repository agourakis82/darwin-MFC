/**
 * DARWIN-MFC SPACING SYSTEM
 * =========================
 *
 * A comprehensive spacing and layout system based on a 4px grid.
 * Provides consistent spacing throughout the application.
 *
 * Base unit: 4px (0.25rem)
 */

// =============================================================================
// SPACING SCALE (4px base grid)
// =============================================================================

export const spacing = {
  /** 0px */
  0: '0',

  /** 1px - hairline */
  px: '1px',

  /** 2px - micro spacing */
  0.5: '0.125rem',

  /** 4px - tight spacing */
  1: '0.25rem',

  /** 6px */
  1.5: '0.375rem',

  /** 8px - compact spacing */
  2: '0.5rem',

  /** 10px */
  2.5: '0.625rem',

  /** 12px - default gap */
  3: '0.75rem',

  /** 14px */
  3.5: '0.875rem',

  /** 16px - standard spacing */
  4: '1rem',

  /** 20px */
  5: '1.25rem',

  /** 24px - comfortable spacing */
  6: '1.5rem',

  /** 28px */
  7: '1.75rem',

  /** 32px - section spacing */
  8: '2rem',

  /** 36px */
  9: '2.25rem',

  /** 40px */
  10: '2.5rem',

  /** 44px - touch target minimum */
  11: '2.75rem',

  /** 48px - large spacing */
  12: '3rem',

  /** 56px */
  14: '3.5rem',

  /** 64px - major section */
  16: '4rem',

  /** 80px */
  20: '5rem',

  /** 96px */
  24: '6rem',

  /** 112px */
  28: '7rem',

  /** 128px */
  32: '8rem',

  /** 144px */
  36: '9rem',

  /** 160px */
  40: '10rem',

  /** 176px */
  44: '11rem',

  /** 192px */
  48: '12rem',

  /** 208px */
  52: '13rem',

  /** 224px */
  56: '14rem',

  /** 240px */
  60: '15rem',

  /** 256px */
  64: '16rem',

  /** 288px */
  72: '18rem',

  /** 320px */
  80: '20rem',

  /** 384px */
  96: '24rem',
} as const;

export type SpacingKey = keyof typeof spacing;

// =============================================================================
// CONTENT WIDTHS
// =============================================================================

export const contentWidth = {
  /** Optimal reading width (~65 characters) */
  prose: '65ch',

  /** Extra small container */
  xs: '20rem',     // 320px

  /** Small container */
  sm: '24rem',     // 384px

  /** Medium container */
  md: '28rem',     // 448px

  /** Large container */
  lg: '32rem',     // 512px

  /** Extra large container */
  xl: '36rem',     // 576px

  /** 2XL container */
  '2xl': '42rem',  // 672px

  /** 3XL container */
  '3xl': '48rem',  // 768px

  /** 4XL container */
  '4xl': '56rem',  // 896px

  /** 5XL container */
  '5xl': '64rem',  // 1024px

  /** 6XL container */
  '6xl': '72rem',  // 1152px

  /** 7XL container */
  '7xl': '80rem',  // 1280px

  /** Main content area */
  content: '75rem', // 1200px

  /** Wide content area */
  wide: '87.5rem', // 1400px

  /** Full width */
  full: '100%',

  /** Screen width */
  screen: '100vw',
} as const;

// =============================================================================
// BREAKPOINTS (Mobile-first)
// =============================================================================

export const breakpoints = {
  /** Small phones */
  xs: '375px',

  /** Large phones */
  sm: '640px',

  /** Tablets */
  md: '768px',

  /** Small laptops */
  lg: '1024px',

  /** Desktops */
  xl: '1280px',

  /** Large desktops */
  '2xl': '1536px',

  /** Ultra-wide displays */
  '3xl': '1920px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

export const zIndex = {
  /** Behind everything */
  behind: '-1',

  /** Base layer */
  base: '0',

  /** Slightly elevated */
  raised: '10',

  /** Dropdown menus */
  dropdown: '20',

  /** Sticky elements */
  sticky: '30',

  /** Fixed elements (header, footer) */
  fixed: '40',

  /** Overlays, backdrops */
  overlay: '50',

  /** Modals, dialogs */
  modal: '60',

  /** Popovers, tooltips */
  popover: '70',

  /** Toast notifications */
  toast: '80',

  /** Command palette */
  commandPalette: '90',

  /** Maximum - AI assistant, critical alerts */
  max: '100',
} as const;

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const borderRadius = {
  /** No rounding */
  none: '0',

  /** Slight rounding */
  sm: '0.125rem',   // 2px

  /** Default rounding */
  DEFAULT: '0.25rem', // 4px

  /** Medium rounding */
  md: '0.375rem',   // 6px

  /** Large rounding */
  lg: '0.5rem',     // 8px

  /** Extra large */
  xl: '0.75rem',    // 12px

  /** 2XL */
  '2xl': '1rem',    // 16px

  /** 3XL - card default */
  '3xl': '1.5rem',  // 24px

  /** 4XL */
  '4xl': '2rem',    // 32px

  /** Full rounding (pill shape) */
  full: '9999px',
} as const;

// =============================================================================
// ASPECT RATIOS
// =============================================================================

export const aspectRatio = {
  /** Auto */
  auto: 'auto',

  /** Square */
  square: '1 / 1',

  /** Video */
  video: '16 / 9',

  /** Photo landscape */
  photo: '4 / 3',

  /** Photo portrait */
  portrait: '3 / 4',

  /** Ultrawide */
  ultrawide: '21 / 9',

  /** Vertical video */
  vertical: '9 / 16',
} as const;

// =============================================================================
// CONTAINER PADDING (Responsive)
// =============================================================================

export const containerPadding = {
  /** Mobile */
  mobile: spacing[4],      // 16px

  /** Tablet */
  tablet: spacing[6],      // 24px

  /** Desktop */
  desktop: spacing[8],     // 32px

  /** Wide */
  wide: spacing[12],       // 48px
} as const;

// =============================================================================
// LAYOUT CONFIGURATIONS
// =============================================================================

export const layout = {
  /** Header height */
  headerHeight: '4rem',        // 64px

  /** Sidebar width (collapsed) */
  sidebarCollapsed: '4rem',    // 64px

  /** Sidebar width (expanded) */
  sidebarExpanded: '16rem',    // 256px

  /** Footer height */
  footerHeight: '4rem',        // 64px

  /** Command palette width */
  commandPaletteWidth: '40rem', // 640px

  /** Modal max width */
  modalMaxWidth: '32rem',      // 512px

  /** Toast width */
  toastWidth: '22rem',         // 352px

  /** AI assistant width */
  aiAssistantWidth: '24rem',   // 384px

  /** Touch target minimum */
  touchTarget: '2.75rem',      // 44px (WCAG 2.2)
} as const;

// =============================================================================
// GAP PRESETS
// =============================================================================

export const gap = {
  /** Tight layout */
  tight: spacing[2],      // 8px

  /** Default layout */
  default: spacing[4],    // 16px

  /** Comfortable layout */
  comfortable: spacing[6], // 24px

  /** Spacious layout */
  spacious: spacing[8],   // 32px

  /** Section separation */
  section: spacing[12],   // 48px
} as const;

// =============================================================================
// TAILWIND CONFIG HELPER
// =============================================================================

/**
 * Returns spacing values formatted for Tailwind CSS configuration
 */
export function getTailwindSpacing() {
  return {
    spacing,
    maxWidth: contentWidth,
    screens: breakpoints,
    zIndex,
    borderRadius,
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get spacing value by key
 */
export function getSpacing(key: SpacingKey): string {
  return spacing[key];
}

/**
 * Calculate spacing based on multiplier
 * @param multiplier - Number of 4px units
 */
export function calcSpacing(multiplier: number): string {
  return `${multiplier * 0.25}rem`;
}

/**
 * Check if screen is at or above breakpoint
 */
export function isBreakpoint(width: number, breakpoint: Breakpoint): boolean {
  const breakpointValue = parseInt(breakpoints[breakpoint], 10);
  return width >= breakpointValue;
}

// =============================================================================
// COMBINED EXPORT
// =============================================================================

export const spacingSystem = {
  spacing,
  contentWidth,
  breakpoints,
  zIndex,
  borderRadius,
  aspectRatio,
  containerPadding,
  layout,
  gap,
} as const;

export default spacingSystem;
