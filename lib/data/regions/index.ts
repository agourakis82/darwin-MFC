/**
 * REGION REGISTRY - DARWIN-MFC
 * ============================
 *
 * Central registry for all supported regions with their configurations.
 * Provides helper functions for region-related operations.
 *
 * Supported Regions:
 * - BR (Brazil): SUS public health system, ANVISA regulation
 * - IN (India): NP-NCD guidelines, CDSCO regulation, Jan Aushadhi program
 * - EU (European Union): EMA regulation, varies by member state
 */

import type { Region, RegionConfig } from '@/lib/types/region';

// =============================================================================
// REGION CONFIGURATIONS
// =============================================================================

/**
 * Complete registry of all supported regions
 */
export const REGIONS: Record<Region, RegionConfig> = {
  BR: {
    code: 'BR',
    name: 'Brazil',
    flag: '\u{1F1E7}\u{1F1F7}', // Brazilian flag emoji (alternative: use unicode directly)
    regulatoryBody: 'ANVISA',
    publicHealthSystem: 'SUS (Sistema Unico de Saude)',
    defaultLocale: 'pt',
    currency: 'BRL',
    genericPrescribingDefault: true,
  },
  IN: {
    code: 'IN',
    name: 'India',
    flag: '\u{1F1EE}\u{1F1F3}', // Indian flag emoji
    regulatoryBody: 'CDSCO',
    publicHealthSystem: 'Jan Aushadhi / Ayushman Bharat',
    defaultLocale: 'hi',
    currency: 'INR',
    genericPrescribingDefault: true,
  },
  EU: {
    code: 'EU',
    name: 'European Union',
    flag: '\u{1F1EA}\u{1F1FA}', // EU flag emoji
    regulatoryBody: 'EMA',
    publicHealthSystem: undefined, // Varies by member state
    defaultLocale: 'en',
    currency: 'EUR',
    genericPrescribingDefault: false,
  },
};

// =============================================================================
// REGION ARRAYS & LISTS
// =============================================================================

/**
 * Array of all region codes
 */
export const REGION_CODES: Region[] = Object.keys(REGIONS) as Region[];

/**
 * Default region for new users
 */
export const DEFAULT_REGION: Region = 'BR';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get configuration for a specific region
 *
 * @param region - Region code
 * @returns Region configuration
 * @throws Error if region is not found
 */
export function getRegionConfig(region: Region): RegionConfig {
  const config = REGIONS[region];
  if (!config) {
    throw new Error(`Unknown region: ${region}`);
  }
  return config;
}

/**
 * Get region configuration safely (returns undefined if not found)
 *
 * @param region - Region code
 * @returns Region configuration or undefined
 */
export function getRegionConfigSafe(region: string): RegionConfig | undefined {
  return REGIONS[region as Region];
}

/**
 * Check if a string is a valid region code
 *
 * @param code - String to check
 * @returns True if valid region code
 */
export function isValidRegion(code: string): code is Region {
  return code in REGIONS;
}

/**
 * Get region by locale (find region that uses a locale as default)
 *
 * @param locale - Locale code (e.g., 'pt', 'hi', 'en')
 * @returns Region code or undefined
 */
export function getRegionByLocale(locale: string): Region | undefined {
  const entry = Object.entries(REGIONS).find(
    ([, config]) => config.defaultLocale === locale
  );
  return entry ? (entry[0] as Region) : undefined;
}

/**
 * Get all regions with public health systems
 *
 * @returns Array of regions with public health systems
 */
export function getRegionsWithPublicHealth(): Region[] {
  return REGION_CODES.filter(
    (code) => REGIONS[code].publicHealthSystem !== undefined
  );
}

/**
 * Get region display name with flag
 *
 * @param region - Region code
 * @returns Formatted string like "Brazil"
 */
export function getRegionDisplayName(region: Region): string {
  const config = REGIONS[region];
  return config ? `${config.flag} ${config.name}` : region;
}

/**
 * Get short region display (flag + code)
 *
 * @param region - Region code
 * @returns Formatted string like "BR"
 */
export function getRegionShortDisplay(region: Region): string {
  const config = REGIONS[region];
  return config ? `${config.flag} ${config.code}` : region;
}

// =============================================================================
// REGION METADATA FOR UI
// =============================================================================

/**
 * Extended region info for UI display
 */
export interface RegionUIInfo extends RegionConfig {
  /** Description for tooltips/help text */
  description: string;
  /** Healthcare system details */
  healthcareDetails: string;
}

/**
 * Get extended UI information for a region
 */
export function getRegionUIInfo(region: Region): RegionUIInfo {
  const config = REGIONS[region];

  const descriptions: Record<Region, { description: string; healthcareDetails: string }> = {
    BR: {
      description: 'Brazilian healthcare context with SUS guidelines and RENAME medications',
      healthcareDetails:
        'Universal public healthcare through SUS. Medications available via RENAME (essential medicines list) and Farmacia Popular program.',
    },
    IN: {
      description: 'Indian healthcare context with NP-NCD guidelines and Jan Aushadhi medications',
      healthcareDetails:
        'Public healthcare through Ayushman Bharat. Affordable generics via Jan Aushadhi Kendras and PMBJP stores.',
    },
    EU: {
      description: 'European healthcare context with EMA-approved medications',
      healthcareDetails:
        'Healthcare varies by member state. Centralized drug approval through EMA. Generic prescribing policies vary.',
    },
  };

  return {
    ...config,
    ...descriptions[region],
  };
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Type guard for Region
 */
export function assertRegion(value: unknown): asserts value is Region {
  if (typeof value !== 'string' || !isValidRegion(value)) {
    throw new Error(`Invalid region: ${value}`);
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { Region, RegionConfig };
