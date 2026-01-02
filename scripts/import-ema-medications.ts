#!/usr/bin/env npx tsx
/**
 * EMA (European Medicines Agency) Medication Data Importer
 * =========================================================
 *
 * Imports medication data from EMA JSON downloads and generates
 * TypeScript data files for the EU regional overlay system.
 *
 * Data Source: https://www.ema.europa.eu/en/medicines/download-medicine-data
 * Update Frequency: Twice daily (06:00 and 18:00 CET)
 *
 * Usage:
 *   npx tsx scripts/import-ema-medications.ts [--dry-run]
 *
 * Options:
 *   --dry-run    Preview changes without writing files
 *
 * Output:
 *   lib/data/regions/eu/medications.ts - Regional medication overlays
 */

import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// CONFIGURATION
// =============================================================================

const EMA_MEDICINES_URL =
  'https://www.ema.europa.eu/en/documents/report/medicines-output-medicines_json-report_en.json';

const OUTPUT_DIR = path.join(process.cwd(), 'lib/data/regions/eu');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'medications.ts');

// =============================================================================
// TYPES
// =============================================================================

/**
 * Raw EMA medicine data structure from JSON download
 * Note: therapeutic_area_mesh can be array or single string depending on the record
 */
interface EMAMedicine {
  category: string;
  name_of_medicine: string;
  ema_product_number: string;
  medicine_status: string;
  opinion_status?: string;
  active_substance: string;
  therapeutic_area_mesh?: string[] | string;
  atc_code_human?: string;
  therapeutic_indication?: string;
  marketing_authorisation_holder?: string;
  european_commission_decision_date?: string;
  first_published?: string;
  last_updated?: string;
  url?: string;
}

/**
 * Mapped regional overlay structure for Darwin-MFC
 */
interface RegionalMedicationOverlay {
  medicationId: string;
  region: 'EU';
  localGenericName: string;
  commercialNames: string[];
  approvalStatus: 'approved' | 'restricted' | 'not_available';
  availableInPublicSystem: boolean;
  publicSystemName?: string;
  presentations: Array<{
    forma: string;
    concentracao: string;
    quantidade?: string;
    disponivelSistemaPublico: boolean;
  }>;
  registrationNumber?: string;
  prescribingRestrictions?: string[];
  localTherapeuticClass?: string;
  lastUpdate?: string;
  // EMA-specific fields
  emaProductNumber?: string;
  therapeuticAreaMesh?: string[];
  therapeuticIndication?: string;
  marketingAuthorisationHolder?: string;
  europeanCommissionDecisionDate?: string;
  tags?: string[];
}

/**
 * ATC code to therapeutic class mapping
 */
type ClasseTerapeutica =
  | 'gastrointestinal'
  | 'anticoagulante'
  | 'anti_hipertensivo'
  | 'hormonio'
  | 'antibiotico'
  | 'imunossupressor'
  | 'anti_inflamatorio'
  | 'analgesico'
  | 'antiparasitario'
  | 'broncodilatador'
  | 'antidiabetico'
  | 'antifungico'
  | 'antiviral'
  | 'outros';

// =============================================================================
// ATC CODE MAPPING
// =============================================================================

/**
 * Maps ATC first-level codes to therapeutic classes
 * Based on WHO ATC classification system
 */
const ATC_TO_CLASSE: Record<string, ClasseTerapeutica> = {
  A: 'gastrointestinal', // Alimentary tract and metabolism
  B: 'anticoagulante', // Blood and blood forming organs
  C: 'anti_hipertensivo', // Cardiovascular system
  D: 'outros', // Dermatologicals
  G: 'hormonio', // Genito-urinary system and sex hormones
  H: 'hormonio', // Systemic hormonal preparations
  J: 'antibiotico', // Antiinfectives for systemic use
  L: 'imunossupressor', // Antineoplastic and immunomodulating agents
  M: 'anti_inflamatorio', // Musculo-skeletal system
  N: 'analgesico', // Nervous system
  P: 'antiparasitario', // Antiparasitic products
  R: 'broncodilatador', // Respiratory system
  S: 'outros', // Sensory organs
  V: 'outros', // Various
};

/**
 * More specific ATC level 2 mappings
 */
const ATC_L2_TO_CLASSE: Record<string, ClasseTerapeutica> = {
  A02: 'gastrointestinal', // Drugs for acid related disorders
  A10: 'antidiabetico', // Drugs used in diabetes
  B01: 'anticoagulante', // Antithrombotic agents
  J01: 'antibiotico', // Antibacterials for systemic use
  J02: 'antifungico', // Antimycotics for systemic use
  J04: 'antibiotico', // Antimycobacterials
  J05: 'antiviral', // Antivirals for systemic use
  L04: 'imunossupressor', // Immunosuppressants
  M01: 'anti_inflamatorio', // Anti-inflammatory and antirheumatic products
  N02: 'analgesico', // Analgesics
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Derives therapeutic class from ATC code
 */
function deriveClasseFromATC(atcCode: string | undefined): ClasseTerapeutica {
  if (!atcCode) return 'outros';

  // Try level 2 first (more specific)
  const l2 = atcCode.substring(0, 3);
  if (ATC_L2_TO_CLASSE[l2]) {
    return ATC_L2_TO_CLASSE[l2];
  }

  // Fall back to level 1
  const l1 = atcCode.charAt(0);
  return ATC_TO_CLASSE[l1] || 'outros';
}

/**
 * Generates a URL-safe ID from EMA product number
 */
function generateMedicationId(emaProductNumber: string): string {
  return `ema-${emaProductNumber.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase()}`;
}

/**
 * Maps EMA medicine status to approval status
 */
function mapApprovalStatus(status: string): 'approved' | 'restricted' | 'not_available' {
  const statusLower = status.toLowerCase();
  if (statusLower === 'authorised') return 'approved';
  if (statusLower === 'withdrawn' || statusLower === 'refused') return 'not_available';
  if (statusLower === 'suspended') return 'restricted';
  return 'approved'; // Default for other statuses like 'pending'
}

/**
 * Normalizes therapeutic areas to always be an array
 */
function normalizeTherapeuticAreas(therapeuticAreas: string[] | string | undefined): string[] {
  if (!therapeuticAreas) return [];
  return Array.isArray(therapeuticAreas) ? therapeuticAreas : [therapeuticAreas];
}

/**
 * Extracts tags from therapeutic areas
 */
function extractTags(therapeuticAreas: string[] | string | undefined): string[] {
  if (!therapeuticAreas) return [];

  // Handle both array and string formats
  const areas = normalizeTherapeuticAreas(therapeuticAreas);

  return areas
    .map((area) => area.toLowerCase().replace(/[,;]/g, '').trim())
    .filter((tag) => tag.length > 0 && tag.length < 50);
}

/**
 * Normalizes active substance name (lowercase, trimmed)
 */
function normalizeSubstanceName(substance: string): string {
  return substance.toLowerCase().trim();
}

/**
 * Formats date to ISO string (YYYY-MM-DD)
 */
function formatDate(dateStr: string | undefined): string | undefined {
  if (!dateStr) return undefined;
  try {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  } catch {
    return dateStr;
  }
}

// =============================================================================
// MAIN TRANSFORMATION
// =============================================================================

/**
 * Transforms EMA medicine data to Darwin-MFC RegionalMedicationOverlay
 */
function transformEMAToOverlay(emaMedicine: EMAMedicine): RegionalMedicationOverlay {
  const id = generateMedicationId(emaMedicine.ema_product_number);

  return {
    medicationId: id,
    region: 'EU',
    localGenericName: normalizeSubstanceName(emaMedicine.active_substance),
    commercialNames: [emaMedicine.name_of_medicine],
    approvalStatus: mapApprovalStatus(emaMedicine.medicine_status),
    availableInPublicSystem: false, // Varies by member state
    presentations: [], // Requires additional data source
    registrationNumber: emaMedicine.ema_product_number,
    localTherapeuticClass: deriveClasseFromATC(emaMedicine.atc_code_human),
    lastUpdate: formatDate(emaMedicine.last_updated),
    // EMA-specific fields
    emaProductNumber: emaMedicine.ema_product_number,
    therapeuticAreaMesh: normalizeTherapeuticAreas(emaMedicine.therapeutic_area_mesh),
    therapeuticIndication: emaMedicine.therapeutic_indication,
    marketingAuthorisationHolder: emaMedicine.marketing_authorisation_holder,
    europeanCommissionDecisionDate: formatDate(emaMedicine.european_commission_decision_date),
    tags: extractTags(emaMedicine.therapeutic_area_mesh),
  };
}

// =============================================================================
// DATA FETCHING
// =============================================================================

/**
 * Fetches EMA medicines data from the official JSON endpoint
 */
async function fetchEMAMedicines(): Promise<EMAMedicine[]> {
  console.log('Fetching EMA medicines data...');
  console.log(`  URL: ${EMA_MEDICINES_URL}`);

  const response = await fetch(EMA_MEDICINES_URL, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Darwin-MFC/1.0 (https://mfc.agourakis.med.br; medical-education)',
    },
  });

  if (!response.ok) {
    throw new Error(`EMA API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as EMAMedicine[];
  console.log(`  Received ${data.length} total records`);

  return data;
}

// =============================================================================
// FILE GENERATION
// =============================================================================

/**
 * Generates TypeScript file content for the overlays
 */
function generateTypeScriptContent(overlays: RegionalMedicationOverlay[]): string {
  const header = `/**
 * EU REGIONAL MEDICATION OVERLAYS - DARWIN-MFC
 * =============================================
 *
 * Auto-generated from EMA (European Medicines Agency) data
 * Source: ${EMA_MEDICINES_URL}
 * Generated: ${new Date().toISOString()}
 *
 * Total medications: ${overlays.length}
 *
 * DO NOT EDIT MANUALLY - Regenerate using:
 *   npx tsx scripts/import-ema-medications.ts
 */

import type { RegionalMedicationOverlay } from '@/lib/types/region';

// =============================================================================
// EMA-SPECIFIC EXTENDED TYPE
// =============================================================================

/**
 * Extended overlay type with EMA-specific fields
 */
export interface EMARegionalMedicationOverlay extends RegionalMedicationOverlay {
  /** EMA product number (e.g., EMEA/H/C/000744) */
  emaProductNumber?: string;
  /** MeSH therapeutic areas */
  therapeuticAreaMesh?: string[];
  /** Full therapeutic indication text */
  therapeuticIndication?: string;
  /** Marketing authorization holder company */
  marketingAuthorisationHolder?: string;
  /** European Commission decision date */
  europeanCommissionDecisionDate?: string;
  /** Search tags derived from therapeutic areas */
  tags?: string[];
}

`;

  const exportStatement = `export const euMedicationOverlays: EMARegionalMedicationOverlay[] = `;

  // Format the overlays array with proper indentation
  const overlaysJson = JSON.stringify(overlays, null, 2)
    .replace(/"medicationId"/g, 'medicationId')
    .replace(/"region"/g, 'region')
    .replace(/"localGenericName"/g, 'localGenericName')
    .replace(/"commercialNames"/g, 'commercialNames')
    .replace(/"approvalStatus"/g, 'approvalStatus')
    .replace(/"availableInPublicSystem"/g, 'availableInPublicSystem')
    .replace(/"presentations"/g, 'presentations')
    .replace(/"registrationNumber"/g, 'registrationNumber')
    .replace(/"localTherapeuticClass"/g, 'localTherapeuticClass')
    .replace(/"lastUpdate"/g, 'lastUpdate')
    .replace(/"emaProductNumber"/g, 'emaProductNumber')
    .replace(/"therapeuticAreaMesh"/g, 'therapeuticAreaMesh')
    .replace(/"therapeuticIndication"/g, 'therapeuticIndication')
    .replace(/"marketingAuthorisationHolder"/g, 'marketingAuthorisationHolder')
    .replace(/"europeanCommissionDecisionDate"/g, 'europeanCommissionDecisionDate')
    .replace(/"tags"/g, 'tags');

  const helperFunctions = `

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get overlay by medication ID
 */
export function getEUOverlayById(medicationId: string): EMARegionalMedicationOverlay | undefined {
  return euMedicationOverlays.find((o) => o.medicationId === medicationId);
}

/**
 * Get overlays by ATC code (partial match)
 */
export function getEUOverlaysByAtc(atcCode: string): EMARegionalMedicationOverlay[] {
  // Note: ATC codes are not directly stored, but we can search by therapeutic class
  // For full ATC search, we'd need to maintain a separate mapping
  return euMedicationOverlays.filter((o) =>
    o.tags?.some((tag) => tag.toLowerCase().includes(atcCode.toLowerCase()))
  );
}

/**
 * Get overlays by therapeutic class
 */
export function getEUOverlaysByClass(therapeuticClass: string): EMARegionalMedicationOverlay[] {
  return euMedicationOverlays.filter((o) => o.localTherapeuticClass === therapeuticClass);
}

/**
 * Get overlays by approval status
 */
export function getEUOverlaysByStatus(
  status: 'approved' | 'restricted' | 'not_available'
): EMARegionalMedicationOverlay[] {
  return euMedicationOverlays.filter((o) => o.approvalStatus === status);
}

/**
 * Search overlays by generic name or commercial name
 */
export function searchEUOverlays(query: string): EMARegionalMedicationOverlay[] {
  const normalizedQuery = query.toLowerCase().trim();
  return euMedicationOverlays.filter(
    (o) =>
      o.localGenericName.toLowerCase().includes(normalizedQuery) ||
      o.commercialNames.some((name) => name.toLowerCase().includes(normalizedQuery))
  );
}

/**
 * Get overlay statistics
 */
export function getEUOverlayStats(): {
  total: number;
  approved: number;
  restricted: number;
  notAvailable: number;
  byClass: Record<string, number>;
} {
  const stats = {
    total: euMedicationOverlays.length,
    approved: 0,
    restricted: 0,
    notAvailable: 0,
    byClass: {} as Record<string, number>,
  };

  for (const overlay of euMedicationOverlays) {
    // Count by status
    if (overlay.approvalStatus === 'approved') stats.approved++;
    else if (overlay.approvalStatus === 'restricted') stats.restricted++;
    else if (overlay.approvalStatus === 'not_available') stats.notAvailable++;

    // Count by class
    const cls = overlay.localTherapeuticClass || 'outros';
    stats.byClass[cls] = (stats.byClass[cls] || 0) + 1;
  }

  return stats;
}
`;

  return header + exportStatement + overlaysJson + ';\n' + helperFunctions;
}

// =============================================================================
// MAIN SCRIPT
// =============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');

  console.log('='.repeat(70));
  console.log('EMA Medication Data Importer - Darwin-MFC');
  console.log('='.repeat(70));

  if (isDryRun) {
    console.log('\n[DRY RUN MODE] No files will be written\n');
  }

  try {
    // Step 1: Fetch EMA data
    const emaMedicines = await fetchEMAMedicines();

    // Step 2: Filter for human medicines only
    const humanMedicines = emaMedicines.filter((med) => med.category === 'Human');
    console.log(`\nFiltered to ${humanMedicines.length} human medicines`);

    // Step 3: Filter for authorised medicines (active approvals)
    const authorisedMedicines = humanMedicines.filter(
      (med) => med.medicine_status?.toLowerCase() === 'authorised'
    );
    console.log(`Filtered to ${authorisedMedicines.length} authorised medicines`);

    // Step 4: Filter out records with empty active substances
    const validMedicines = authorisedMedicines.filter(
      (med) => med.active_substance && med.active_substance.trim().length > 0
    );
    console.log(`Filtered to ${validMedicines.length} medicines with valid active substances`);

    // Step 5: Transform to overlays
    console.log('\nTransforming to regional overlays...');
    const overlays = validMedicines.map(transformEMAToOverlay);

    // Step 6: Deduplicate by active substance (keep latest)
    const deduplicatedMap = new Map<string, RegionalMedicationOverlay>();
    for (const overlay of overlays) {
      const key = overlay.localGenericName;
      const existing = deduplicatedMap.get(key);

      if (!existing) {
        deduplicatedMap.set(key, overlay);
      } else {
        // Keep the one with more recent update or more commercial names
        const existingDate = existing.lastUpdate || '';
        const newDate = overlay.lastUpdate || '';
        if (newDate > existingDate) {
          // Merge commercial names
          const mergedNames = [
            ...new Set([...existing.commercialNames, ...overlay.commercialNames]),
          ];
          deduplicatedMap.set(key, {
            ...overlay,
            commercialNames: mergedNames,
          });
        } else {
          // Add new commercial names to existing
          const mergedNames = [
            ...new Set([...existing.commercialNames, ...overlay.commercialNames]),
          ];
          deduplicatedMap.set(key, {
            ...existing,
            commercialNames: mergedNames,
          });
        }
      }
    }

    const deduplicatedOverlays = Array.from(deduplicatedMap.values());
    console.log(`Deduplicated to ${deduplicatedOverlays.length} unique active substances`);

    // Step 7: Sort alphabetically by generic name
    deduplicatedOverlays.sort((a, b) => a.localGenericName.localeCompare(b.localGenericName));

    // Step 8: Generate statistics
    const stats = {
      total: deduplicatedOverlays.length,
      byClass: {} as Record<string, number>,
    };
    for (const overlay of deduplicatedOverlays) {
      const cls = overlay.localTherapeuticClass || 'outros';
      stats.byClass[cls] = (stats.byClass[cls] || 0) + 1;
    }

    console.log('\nStatistics:');
    console.log(`  Total unique substances: ${stats.total}`);
    console.log('  By therapeutic class:');
    Object.entries(stats.byClass)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cls, count]) => {
        console.log(`    ${cls}: ${count}`);
      });

    // Step 9: Generate TypeScript content
    const tsContent = generateTypeScriptContent(deduplicatedOverlays);

    // Step 10: Write file (or preview in dry run)
    if (isDryRun) {
      console.log('\n[DRY RUN] Would write to:', OUTPUT_FILE);
      console.log('[DRY RUN] File size:', (tsContent.length / 1024).toFixed(2), 'KB');
      console.log('\n[DRY RUN] Preview (first 2000 chars):');
      console.log('-'.repeat(50));
      console.log(tsContent.substring(0, 2000));
      console.log('...');
      console.log('-'.repeat(50));
    } else {
      // Ensure output directory exists
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`\nCreated directory: ${OUTPUT_DIR}`);
      }

      // Write the file
      fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');
      console.log(`\nWritten to: ${OUTPUT_FILE}`);
      console.log(`File size: ${(tsContent.length / 1024).toFixed(2)} KB`);
    }

    console.log('\n' + '='.repeat(70));
    console.log('Import completed successfully!');
    console.log('='.repeat(70));
  } catch (error) {
    console.error('\nError during import:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the script
main();
