/**
 * Darwin Design System (DDS) - Design Tokens
 * Academic Premium & Clinical Authority Standard
 */

export const colors = {
  // =============================================
  // DARWIN MEDICAL HUB - SOTA Clinical Palette
  // =============================================
  darwin: {
    // Primary Authority - Helix Navy
    helixNavy: '#0D2137',
    
    // DNA Semantic Accents (Used sparingly for status/indication)
    adenineTeal: '#0E7490',    
    guanineGreen: '#059669',   
    cytosineCyan: '#06B6D4',       
    thymineGold: '#B45309',    
    
    // Backgrounds - The "Digital Journal" feel
    paperWhite: '#FBFBF9',     // Primary content background
    clinicalGray: '#F4F4F2',   // Secondary UI background
    phosphate: '#F8FAFC',      
    
    // Carbon Scale (Neutral System)
    carbon: {
      50: '#FBFBF9',
      100: '#F4F4F2',
      200: '#E5E5E2',
      300: '#D1D1CD',
      400: '#A1A19D',
      500: '#71716D',
      600: '#52524E',
      700: '#3F3F3C',
      800: '#272725',
      900: '#1A1A18',
      950: '#0F0F0E',
    },
    
    // Clinical Borders
    border: 'rgba(26, 26, 24, 0.1)', // Hairline border
    
    // Semantic Colors
    critical: {
      red: '#B91C1C',
      orange: '#C2410C',
    },
  },

  // Apple-inspired Colors (Maintained for UI logic)
  apple: {
    light: {
      text: '#1A1A18',
      secondaryText: '#71716D',
      background: '#FBFBF9',
      separator: 'rgba(0,0,0,0.1)',
    },
    dark: {
      text: '#F4F4F2',
      background: '#0F0F0E',
      separator: 'rgba(255,255,255,0.1)',
    }
  }
} as const;

export const typography = {
  fontFamily: {
    // T - Trust (The Voice of Authority)
    body: "'Source Serif 4', 'Georgia', serif",
    
    // A - Authority (The Structure)
    display: "'Instrument Sans', sans-serif",
    
    // G - Guidance (The UI)
    ui: "'Inter', sans-serif",
    
    // C - Code (The Data)
    code: "'JetBrains Mono', monospace",
  },

  fontSize: {
    xs: '0.75rem',
    sm: '0.8125rem', // Refined small
    base: '0.9375rem', // Professional body size
    lg: '1.0625rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.5rem',
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
} as const;

export const spacing = {
  hairline: '0.5px',
  thin: '1px',
  // Standard scales...
} as const;

export const borderRadius = {
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
} as const;

export const designTokens = {
  colors,
  typography,
  borderRadius,
} as const;

export default designTokens;