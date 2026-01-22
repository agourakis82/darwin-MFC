/**
 * Brazil Regional Medication Overlay Migration Template
 *
 * This template shows the structure for migrating Brazil-specific fields
 * from the base Medicamento type to regional overlays.
 *
 * MCP Offload Strategy:
 * 1. Use local Mistral to extract Brazil fields from medicamentosConsolidados
 * 2. Transform into RegionalMedicationOverlay format
 * 3. Create comprehensive Brazil overlay with 690 medications
 */

import { RegionalMedicationOverlay } from '@/lib/types/region';

// EXAMPLE: How Brazil medication overlay should look after migration
export const brazilMedicationOverlayExample: RegionalMedicationOverlay = {
  medicationId: 'amoxicilina-500mg', // Links to base medication
  region: 'BR',

  // Regional-specific names
  localGenericName: 'Amoxicilina',
  commercialNames: ['Amoxil', 'Flemoxon', 'Amplicilin'],

  // Regulatory status in Brazil
  approvalStatus: 'approved',
  registrationNumber: 'ANVISA-5000.0001234',

  // Public health system availability
  availableInPublicSystem: true,
  publicSystemName: 'SUS - Sistema Única de Saúde',

  // Regional presentations/formulations available
  presentations: [
    {
      forma: 'capsula',
      concentracao: '500 mg',
      quantidade: '12',
      disponivelSistemaPublico: true,
      precoReferencia: {
        min: 0.70,
        max: 0.85,
        currency: 'BRL'
      }
    },
    {
      forma: 'suspensao_oral',
      concentracao: '250 mg/5mL',
      quantidade: '60 mL',
      disponivelSistemaPublico: true,
      precoReferencia: {
        min: 1.50,
        max: 2.50,
        currency: 'BRL'
      }
    }
  ],

  // Local therapeutic class (for Brazil-specific classification)
  localTherapeuticClass: 'Antibacterial penicillin - RENAME',

  // Prescribing restrictions in Brazil
  prescribingRestrictions: [
    'Penicillin allergy contraindicated',
    'Monitor renal function'
  ],

  // Last update
  lastUpdate: '2024-01-15'
};

/**
 * Migration Process:
 *
 * STEP 1: Extract from current medicamentosConsolidados
 * Current structure has Brazil-specific fields hardcoded:
 * - medicamento.rename: boolean
 * - medicamento.anvisaRegistro?: string
 * - medicamento.dcbCode?: string
 * - medicamento.apresentacoes[].disponivelSUS?: boolean
 *
 * STEP 2: MCP Offload transformation (using local Mistral - FREE)
 * Input: 690 medications with Brazil-specific fields
 * Output: 690 RegionalMedicationOverlay objects
 *
 * STEP 3: Create comprehensive Brazil overlay file
 * File: lib/data/regions/brazil/medications.ts
 * Content: Array of 690 RegionalMedicationOverlay objects
 *
 * STEP 4: Update base Medicamento type
 * Remove Brazil-specific fields:
 * - rename
 * - anvisaRegistro
 * - dcbCode
 * - Add regionalAvailability?: {[key: Region]: RegionalAvailabilityInfo}
 *
 * STEP 5: Create helper functions
 * - getRegionalMedicationData(medicationId: string, region: Region)
 * - checkRegionalAvailability(medication: Medicamento, region: Region): boolean
 * - getRegionalPresentation(medication: Medicamento, region: Region)
 *
 * STEP 6: Update UI components
 * - MedicamentoDetailClient: Filter by region, show regional overlay
 * - MedicamentosClient: Display regional availability badges
 * - MedicamentoComparador: Region-specific price comparison
 */

// Placeholder for comprehensive Brazil overlay
// Will be populated by MCP offload task
export const brazilMedicationOverlays: RegionalMedicationOverlay[] = [
  // 690 medication entries generated from MCP offload
  brazilMedicationOverlayExample,
  // ... 689 more medications
];

export default brazilMedicationOverlays;
