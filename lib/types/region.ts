/**
 * REGIONAL TYPES - DARWIN-MFC
 * ===========================
 *
 * Type definitions for multi-regional support.
 * Enables region-specific medication data, approval statuses,
 * and public health system availability.
 *
 * Supported Regions:
 * - BR (Brazil): SUS, ANVISA
 * - IN (India): NP-NCD, CDSCO
 * - EU (European Union): EMA
 */

import type { FormaFarmaceutica } from './medicamento';

// =============================================================================
// REGION CODES
// =============================================================================

/**
 * Supported region codes
 * Following ISO 3166-1 alpha-2 for countries, 'EU' for European Union
 */
export type Region = 'BR' | 'IN' | 'EU';

// =============================================================================
// REGION CONFIGURATION
// =============================================================================

/**
 * Configuration for each supported region
 */
export interface RegionConfig {
  /** ISO region code */
  code: Region;

  /** Full name of the region (in English) */
  name: string;

  /** Emoji flag for display */
  flag: string;

  /** Primary regulatory body for drug approval */
  regulatoryBody: string;

  /** Public health system name (if applicable) */
  publicHealthSystem?: string;

  /** Default locale for this region */
  defaultLocale: string;

  /** Currency code (ISO 4217) */
  currency?: string;

  /** Whether this region uses generic prescribing by default */
  genericPrescribingDefault?: boolean;
}

// =============================================================================
// MEDICATION PRESENTATIONS
// =============================================================================

/**
 * Regional medication presentation (dosage form)
 */
export interface Presentation {
  /** Pharmaceutical form */
  forma: FormaFarmaceutica;

  /** Concentration/strength (e.g., "500mg", "10mg/ml") */
  concentracao: string;

  /** Package size/quantity */
  quantidade?: string;

  /** Available in public health system */
  disponivelSistemaPublico: boolean;

  /** Price range in local currency (optional) */
  precoReferencia?: {
    min: number;
    max: number;
    currency: string;
  };
}

// =============================================================================
// REGIONAL MEDICATION OVERLAY
// =============================================================================

/**
 * Region-specific medication information overlay
 * Extends base medication data with regional specifics
 */
export interface RegionalMedicationOverlay {
  /** Reference to base medication ID */
  medicationId: string;

  /** Region this overlay applies to */
  region: Region;

  /** Local generic name (DCB for Brazil, INN variant for others) */
  localGenericName: string;

  /** Commercial brand names available in this region */
  commercialNames: string[];

  /** Regulatory approval status */
  approvalStatus: 'approved' | 'restricted' | 'not_available';

  /** Available through public health system */
  availableInPublicSystem: boolean;

  /** Name of public system program (e.g., "Farmácia Popular", "Jan Aushadhi") */
  publicSystemName?: string;

  /** Regional presentations/formulations available */
  presentations: Presentation[];

  /** Regulatory registration number */
  registrationNumber?: string;

  /** Special prescribing restrictions in this region */
  prescribingRestrictions?: string[];

  /** Regional therapeutic class code (if different from base) */
  localTherapeuticClass?: string;

  /** Last update date for this regional data */
  lastUpdate?: string;
}

// =============================================================================
// REGIONAL DISEASE DATA
// =============================================================================

/**
 * Region-specific disease/condition information
 */
export interface RegionalDiseaseOverlay {
  /** Reference to base disease ID */
  diseaseId: string;

  /** Region this overlay applies to */
  region: Region;

  /** Regional prevalence data */
  prevalence?: {
    value: string;
    source: string;
    year: number;
  };

  /** Regional treatment guidelines reference */
  guidelineReference?: {
    name: string;
    organization: string;
    url?: string;
    year: number;
  };

  /** Regional screening recommendations */
  screeningRecommendations?: string;

  /** Regional ICD code variant (if different) */
  localICDCode?: string;
}

// =============================================================================
// HELPER TYPES
// =============================================================================

/**
 * Map of region codes to their overlays
 */
export type RegionalOverlayMap<T> = Partial<Record<Region, T>>;

/**
 * Medication with all regional overlays attached
 */
export interface MedicationWithRegionalData {
  baseId: string;
  overlays: RegionalOverlayMap<RegionalMedicationOverlay>;
}

/**
 * Region selection state
 */
export interface RegionState {
  currentRegion: Region;
  availableRegions: Region[];
}
