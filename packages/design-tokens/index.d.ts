export type DarwinColorScale = Record<number, string>;

export interface DarwinTokens {
  colors: {
    paperWhite: string;
    clinicalGray: string;
    phosphate: string;
    helixNavy: string;
    adenineTeal: string;
    guanineGreen: string;
    cytosineCyan: string;
    thymineGold: string;
    carbon: DarwinColorScale;

    brand: {
      primary: DarwinColorScale;
      secondary: DarwinColorScale;
    };

    /** Legacy "critical-red" scale used across the app */
    criticalRed: DarwinColorScale;

    /** Clinical semantic tokens (base/dark/foreground) */
    clinical: {
      critical: { base: string; dark: string; foreground: string };
      warning: { base: string; dark: string; foreground: string };
      safe: { base: string; dark: string; foreground: string };
      info: { base: string; dark: string; foreground: string };
    };
  };
  motion: {
    easeApple: [number, number, number, number];
    durationFastMs: number;
    durationNormalMs: number;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    pill: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  shadows: {
    elevation1: string;
    elevation2: string;
    deep: string;
  };
  getCssVars: () => Record<string, string>;
  getRNTheme: () => {
    colors: Record<string, string>;
    roundness: number;
  };
}

export const colors: DarwinTokens['colors'];
export const motion: DarwinTokens['motion'];
export const radii: DarwinTokens['radii'];
export const spacing: DarwinTokens['spacing'];
export const shadows: DarwinTokens['shadows'];
export function getCssVars(): Record<string, string>;
export function getRNTheme(): { colors: Record<string, string>; roundness: number };
