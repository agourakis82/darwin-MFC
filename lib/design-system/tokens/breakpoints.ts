/**
 * DESIGN SYSTEM - BREAKPOINT TOKENS
 * ==================================
 *
 * Responsive breakpoints for mobile-first design
 * Aligned with Tailwind CSS defaults for consistency
 */

export const breakpoints = {
  // Pixel values
  values: {
    xs: 475,      // Small phones
    sm: 640,      // Phones
    md: 768,      // Tablets
    lg: 1024,     // Laptops
    xl: 1280,     // Desktops
    '2xl': 1536,  // Large desktops
  },

  // Media query strings
  queries: {
    xs: '(min-width: 475px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },

  // Max-width queries (for mobile-first approach)
  maxQueries: {
    xs: '(max-width: 474px)',
    sm: '(max-width: 639px)',
    md: '(max-width: 767px)',
    lg: '(max-width: 1023px)',
    xl: '(max-width: 1279px)',
    '2xl': '(max-width: 1535px)',
  },

  // Range queries (between two breakpoints)
  rangeQueries: {
    'xs-only': '(min-width: 475px) and (max-width: 639px)',
    'sm-only': '(min-width: 640px) and (max-width: 767px)',
    'md-only': '(min-width: 768px) and (max-width: 1023px)',
    'lg-only': '(min-width: 1024px) and (max-width: 1279px)',
    'xl-only': '(min-width: 1280px) and (max-width: 1535px)',
  },

  // Device-specific queries
  device: {
    mobile: '(max-width: 767px)',                    // Phones and small tablets
    tablet: '(min-width: 768px) and (max-width: 1023px)',  // Tablets
    desktop: '(min-width: 1024px)',                  // Laptops and desktops

    // Orientation
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',

    // Touch capability
    touch: '(hover: none) and (pointer: coarse)',    // Touch devices
    mouse: '(hover: hover) and (pointer: fine)',     // Mouse/trackpad devices

    // High-DPI screens
    retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  },

  // Container max-widths (for constrained layouts)
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  },

  // Safe area considerations (for mobile devices with notches)
  safeArea: {
    // Detect if safe-area-inset is supported
    supported: 'env(safe-area-inset-bottom, 0px)',
  },
} as const;

export type BreakpointToken = typeof breakpoints;

// Helper function to check if a value matches a media query
export function matchesBreakpoint(breakpoint: keyof typeof breakpoints.queries): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(breakpoints.queries[breakpoint]).matches;
}

// Helper function to get current breakpoint
export function getCurrentBreakpoint(): keyof typeof breakpoints.values | 'base' {
  if (typeof window === 'undefined') return 'base';

  const width = window.innerWidth;

  if (width >= breakpoints.values['2xl']) return '2xl';
  if (width >= breakpoints.values.xl) return 'xl';
  if (width >= breakpoints.values.lg) return 'lg';
  if (width >= breakpoints.values.md) return 'md';
  if (width >= breakpoints.values.sm) return 'sm';
  if (width >= breakpoints.values.xs) return 'xs';

  return 'base';
}
