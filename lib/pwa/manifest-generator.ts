/**
 * PWA MANIFEST GENERATOR
 * =======================
 *
 * Generate and manage PWA manifest for Darwin-MFC
 * App-like experience with installation support
 *
 * Features:
 * - Dynamic manifest generation
 * - Multiple icon sizes
 * - Theme colors
 * - Display modes
 * - Shortcuts
 * - Screenshots
 *
 * @example
 * ```tsx
 * import { generateManifest } from './manifest-generator';
 *
 * const manifest = generateManifest({
 *   name: 'Darwin-MFC',
 *   short_name: 'Darwin',
 * });
 * ```
 */

export interface PWAManifestConfig {
  name: string;
  short_name: string;
  description: string;
  start_url?: string;
  scope?: string;
  display?: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation?: 'any' | 'portrait' | 'landscape';
  theme_color?: string;
  background_color?: string;
  categories?: string[];
  screenshots?: Screenshot[];
  shortcuts?: Shortcut[];
}

export interface Screenshot {
  src: string;
  sizes: string;
  type: string;
  form_factor?: 'narrow' | 'wide';
  label?: string;
}

export interface Shortcut {
  name: string;
  short_name?: string;
  description?: string;
  url: string;
  icons?: Icon[];
}

export interface Icon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable' | 'monochrome';
}

/**
 * Default Darwin-MFC PWA manifest
 */
export const DARWIN_MFC_MANIFEST: PWAManifestConfig = {
  name: 'Darwin-MFC - Medical Reference Platform',
  short_name: 'Darwin-MFC',
  description: 'Academic Q1-standard interactive web application for comparative analysis of population-based screening programs and clinical protocols',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'any',
  theme_color: '#3B82F6',
  background_color: '#FFFFFF',
  categories: ['medical', 'health', 'education', 'reference'],

  shortcuts: [
    {
      name: 'Clinical Calculators',
      short_name: 'Calculators',
      description: 'Access clinical calculators',
      url: '/calculadoras',
      icons: [
        {
          src: '/icons/calculator-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
      ],
    },
    {
      name: 'Drug Interactions',
      short_name: 'Interactions',
      description: 'Check drug interactions',
      url: '/medicamentos/interacoes',
      icons: [
        {
          src: '/icons/drug-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
      ],
    },
    {
      name: 'Screening Protocols',
      short_name: 'Protocols',
      description: 'View screening protocols',
      url: '/rastreamento-sus',
      icons: [
        {
          src: '/icons/protocol-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
      ],
    },
    {
      name: 'Clinical Cases',
      short_name: 'Cases',
      description: 'Study clinical cases',
      url: '/casos-clinicos',
      icons: [
        {
          src: '/icons/case-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
      ],
    },
  ],
};

/**
 * Generate standard icon sizes for PWA
 */
export function generateIconSizes(baseIconPath: string = '/icons/icon'): Icon[] {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

  return sizes.map((size) => ({
    src: `${baseIconPath}-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
    purpose: 'any',
  }));
}

/**
 * Generate maskable icons for adaptive icon support
 */
export function generateMaskableIcons(baseIconPath: string = '/icons/icon-maskable'): Icon[] {
  const sizes = [192, 512];

  return sizes.map((size) => ({
    src: `${baseIconPath}-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
    purpose: 'maskable',
  }));
}

/**
 * Generate complete PWA manifest
 */
export function generateManifest(
  config: Partial<PWAManifestConfig> = {}
): Record<string, any> {
  const manifest = {
    ...DARWIN_MFC_MANIFEST,
    ...config,
  };

  // Generate icons
  const icons = [
    ...generateIconSizes(),
    ...generateMaskableIcons(),
  ];

  return {
    name: manifest.name,
    short_name: manifest.short_name,
    description: manifest.description,
    start_url: manifest.start_url,
    scope: manifest.scope,
    display: manifest.display,
    orientation: manifest.orientation,
    theme_color: manifest.theme_color,
    background_color: manifest.background_color,
    categories: manifest.categories,
    icons,
    shortcuts: manifest.shortcuts,
    screenshots: manifest.screenshots,
    lang: 'pt-BR',
    dir: 'ltr',
    prefer_related_applications: false,
  };
}

/**
 * Generate manifest.json file content
 */
export function generateManifestJSON(config?: Partial<PWAManifestConfig>): string {
  const manifest = generateManifest(config);
  return JSON.stringify(manifest, null, 2);
}

/**
 * Check if PWA is installable
 */
export function isPWAInstallable(): boolean {
  if (typeof window === 'undefined') return false;

  // Check if app is already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false;
  }

  // Check if beforeinstallprompt event is supported
  return 'BeforeInstallPromptEvent' in window;
}

/**
 * Check if running as installed PWA
 */
export function isInstalledPWA(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // @ts-ignore
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://')
  );
}

/**
 * Get PWA display mode
 */
export function getPWADisplayMode(): 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser' {
  if (typeof window === 'undefined') return 'browser';

  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone';
  }
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return 'fullscreen';
  }
  if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return 'minimal-ui';
  }
  return 'browser';
}
