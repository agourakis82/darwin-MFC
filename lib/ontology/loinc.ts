/**
 * DARWIN-MFC LOINC DATA MODULE
 * ============================
 *
 * Comprehensive LOINC (Logical Observation Identifiers Names and Codes) data
 * for common laboratory tests used in Primary Health Care (APS/UBS) settings.
 *
 * Includes:
 * - Complete Blood Count (Hemograma)
 * - Basic Metabolic Panel
 * - Lipid Panel
 * - Thyroid Function
 * - Urinalysis (EAS)
 * - Coagulation Studies
 * - Inflammatory Markers
 * - Diabetes Markers
 * - Liver Function
 * - Renal Function
 *
 * Reference: https://loinc.org
 * LOINC License: https://loinc.org/license/
 */

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Reference range for a laboratory test
 */
export interface ReferenceRange {
  /** Minimum value (undefined if no lower limit) */
  min?: number;
  /** Maximum value (undefined if no upper limit) */
  max?: number;
  /** Unit of measurement */
  unit: string;
  /** Optional notes about the range */
  notes?: string;
}

/**
 * Age/sex-specific reference ranges
 */
export interface ReferenceRanges {
  /** Adult male reference range */
  adultMale?: ReferenceRange;
  /** Adult female reference range */
  adultFemale?: ReferenceRange;
  /** General adult range (when no sex difference) */
  adult?: ReferenceRange;
  /** Pediatric reference range */
  pediatric?: ReferenceRange;
  /** Newborn reference range */
  newborn?: ReferenceRange;
  /** Elderly reference range */
  elderly?: ReferenceRange;
  /** Pregnancy reference range */
  pregnancy?: ReferenceRange;
}

/**
 * Complete LOINC test definition
 */
export interface LOINCTest {
  /** LOINC code (e.g., "2345-7") */
  code: string;
  /** Component - what is measured (e.g., "Glucose") */
  component: string;
  /** Property type (e.g., "MCnc" for mass concentration) */
  property: string;
  /** Specimen type (e.g., "Ser/Plas" for serum/plasma) */
  system: string;
  /** Scale type (e.g., "Qn" for quantitative) */
  scale: string;
  /** Method if applicable */
  method?: string;
  /** Short common name */
  shortName: string;
  /** Long common name */
  longName: string;
  /** Patient-friendly name (Portuguese) */
  consumerNamePt: string;
  /** Patient-friendly name (English) */
  consumerNameEn: string;
  /** Common units of measure */
  units: string[];
  /** UCUM unit */
  ucumUnit: string;
  /** Reference ranges by population */
  referenceRanges?: ReferenceRanges;
  /** Clinical category */
  category: LOINCCategory;
  /** Related panel codes */
  panels?: string[];
  /** Clinical notes */
  clinicalNotes?: string;
}

/**
 * LOINC test categories
 */
export type LOINCCategory =
  | 'hematology'
  | 'chemistry'
  | 'lipids'
  | 'thyroid'
  | 'urinalysis'
  | 'coagulation'
  | 'inflammatory'
  | 'diabetes'
  | 'liver'
  | 'renal'
  | 'electrolytes'
  | 'cardiac'
  | 'vitamins'
  | 'iron'
  | 'vitals';

// =============================================================================
// LOINC TEST DATABASE - 60+ TESTS
// =============================================================================

export const LOINC_TESTS: LOINCTest[] = [
  // ===========================================================================
  // HEMATOLOGY - Complete Blood Count (Hemograma)
  // ===========================================================================
  {
    code: '718-7',
    component: 'Hemoglobin',
    property: 'MCnc',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'Hgb Bld-mCnc',
    longName: 'Hemoglobin [Mass/volume] in Blood',
    consumerNamePt: 'Hemoglobina',
    consumerNameEn: 'Hemoglobin',
    units: ['g/dL', 'g/L'],
    ucumUnit: 'g/dL',
    category: 'hematology',
    panels: ['57021-8', '58410-2'],
    referenceRanges: {
      adultMale: { min: 13.5, max: 17.5, unit: 'g/dL' },
      adultFemale: { min: 12.0, max: 16.0, unit: 'g/dL' },
      pediatric: { min: 11.0, max: 14.0, unit: 'g/dL', notes: '6-12 years' },
      newborn: { min: 14.0, max: 24.0, unit: 'g/dL' },
      pregnancy: { min: 11.0, max: 14.0, unit: 'g/dL' },
    },
  },
  {
    code: '4544-3',
    component: 'Hematocrit',
    property: 'NFr',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'Hct VFr Bld Auto',
    longName: 'Hematocrit [Volume Fraction] of Blood by Automated count',
    consumerNamePt: 'Hematócrito',
    consumerNameEn: 'Hematocrit',
    units: ['%', 'L/L'],
    ucumUnit: '%',
    category: 'hematology',
    panels: ['57021-8', '58410-2'],
    referenceRanges: {
      adultMale: { min: 40, max: 54, unit: '%' },
      adultFemale: { min: 36, max: 48, unit: '%' },
      pediatric: { min: 35, max: 45, unit: '%' },
      newborn: { min: 45, max: 65, unit: '%' },
    },
  },
  {
    code: '6690-2',
    component: 'Leukocytes',
    property: 'NCnc',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'WBC # Bld Auto',
    longName: 'Leukocytes [#/volume] in Blood by Automated count',
    consumerNamePt: 'Leucócitos (Glóbulos Brancos)',
    consumerNameEn: 'White Blood Cell Count',
    units: ['10*3/uL', '10*9/L'],
    ucumUnit: '10*3/uL',
    category: 'hematology',
    panels: ['57021-8', '58410-2'],
    referenceRanges: {
      adult: { min: 4.5, max: 11.0, unit: '10*3/uL' },
      pediatric: { min: 5.0, max: 13.0, unit: '10*3/uL' },
      newborn: { min: 9.0, max: 30.0, unit: '10*3/uL' },
    },
  },
  {
    code: '777-3',
    component: 'Platelets',
    property: 'NCnc',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'Platelet # Bld Auto',
    longName: 'Platelets [#/volume] in Blood by Automated count',
    consumerNamePt: 'Plaquetas',
    consumerNameEn: 'Platelet Count',
    units: ['10*3/uL', '10*9/L'],
    ucumUnit: '10*3/uL',
    category: 'hematology',
    panels: ['57021-8', '58410-2'],
    referenceRanges: {
      adult: { min: 150, max: 400, unit: '10*3/uL' },
      pediatric: { min: 150, max: 450, unit: '10*3/uL' },
      newborn: { min: 150, max: 450, unit: '10*3/uL' },
    },
  },
  {
    code: '789-8',
    component: 'Erythrocytes',
    property: 'NCnc',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'RBC # Bld Auto',
    longName: 'Erythrocytes [#/volume] in Blood by Automated count',
    consumerNamePt: 'Hemácias (Glóbulos Vermelhos)',
    consumerNameEn: 'Red Blood Cell Count',
    units: ['10*6/uL', '10*12/L'],
    ucumUnit: '10*6/uL',
    category: 'hematology',
    panels: ['57021-8', '58410-2'],
    referenceRanges: {
      adultMale: { min: 4.5, max: 5.5, unit: '10*6/uL' },
      adultFemale: { min: 4.0, max: 5.0, unit: '10*6/uL' },
      pediatric: { min: 4.0, max: 5.2, unit: '10*6/uL' },
    },
  },
  {
    code: '787-2',
    component: 'MCV',
    property: 'Vol',
    system: 'RBC',
    scale: 'Qn',
    shortName: 'MCV RBC Auto',
    longName: 'Erythrocyte mean corpuscular volume [Entitic volume] by Automated count',
    consumerNamePt: 'Volume Corpuscular Médio (VCM)',
    consumerNameEn: 'Mean Corpuscular Volume',
    units: ['fL'],
    ucumUnit: 'fL',
    category: 'hematology',
    panels: ['57021-8'],
    referenceRanges: {
      adult: { min: 80, max: 100, unit: 'fL' },
      pediatric: { min: 70, max: 86, unit: 'fL', notes: '1-6 years' },
    },
  },
  {
    code: '785-6',
    component: 'MCH',
    property: 'Mass',
    system: 'RBC',
    scale: 'Qn',
    shortName: 'MCH RBC Auto',
    longName: 'Erythrocyte mean corpuscular hemoglobin [Entitic mass] by Automated count',
    consumerNamePt: 'Hemoglobina Corpuscular Média (HCM)',
    consumerNameEn: 'Mean Corpuscular Hemoglobin',
    units: ['pg'],
    ucumUnit: 'pg',
    category: 'hematology',
    panels: ['57021-8'],
    referenceRanges: {
      adult: { min: 27, max: 33, unit: 'pg' },
    },
  },
  {
    code: '786-4',
    component: 'MCHC',
    property: 'MCnc',
    system: 'RBC',
    scale: 'Qn',
    shortName: 'MCHC RBC Auto',
    longName: 'Erythrocyte mean corpuscular hemoglobin concentration [Mass/volume] by Automated count',
    consumerNamePt: 'Concentração de Hemoglobina Corpuscular Média (CHCM)',
    consumerNameEn: 'Mean Corpuscular Hemoglobin Concentration',
    units: ['g/dL'],
    ucumUnit: 'g/dL',
    category: 'hematology',
    panels: ['57021-8'],
    referenceRanges: {
      adult: { min: 32, max: 36, unit: 'g/dL' },
    },
  },
  {
    code: '788-0',
    component: 'RDW',
    property: 'NFr',
    system: 'RBC',
    scale: 'Qn',
    shortName: 'RDW RBC Auto',
    longName: 'Erythrocyte distribution width [Ratio] by Automated count',
    consumerNamePt: 'Índice de Anisocitose (RDW)',
    consumerNameEn: 'Red Cell Distribution Width',
    units: ['%'],
    ucumUnit: '%',
    category: 'hematology',
    panels: ['57021-8'],
    referenceRanges: {
      adult: { min: 11.5, max: 14.5, unit: '%' },
    },
  },
  {
    code: '770-8',
    component: 'Neutrophils/100 leukocytes',
    property: 'NFr',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'Neutrophils % Bld',
    longName: 'Neutrophils/100 leukocytes in Blood by Automated count',
    consumerNamePt: 'Neutrófilos (%)',
    consumerNameEn: 'Neutrophils Percentage',
    units: ['%'],
    ucumUnit: '%',
    category: 'hematology',
    panels: ['57021-8'],
    referenceRanges: {
      adult: { min: 40, max: 70, unit: '%' },
    },
  },
  {
    code: '736-9',
    component: 'Lymphocytes/100 leukocytes',
    property: 'NFr',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'Lymphocytes % Bld',
    longName: 'Lymphocytes/100 leukocytes in Blood by Automated count',
    consumerNamePt: 'Linfócitos (%)',
    consumerNameEn: 'Lymphocytes Percentage',
    units: ['%'],
    ucumUnit: '%',
    category: 'hematology',
    panels: ['57021-8'],
    referenceRanges: {
      adult: { min: 20, max: 40, unit: '%' },
    },
  },
  {
    code: '5905-5',
    component: 'Monocytes/100 leukocytes',
    property: 'NFr',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'Monocytes % Bld',
    longName: 'Monocytes/100 leukocytes in Blood by Automated count',
    consumerNamePt: 'Monócitos (%)',
    consumerNameEn: 'Monocytes Percentage',
    units: ['%'],
    ucumUnit: '%',
    category: 'hematology',
    panels: ['57021-8'],
    referenceRanges: {
      adult: { min: 2, max: 10, unit: '%' },
    },
  },
  {
    code: '713-8',
    component: 'Eosinophils/100 leukocytes',
    property: 'NFr',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'Eosinophils % Bld',
    longName: 'Eosinophils/100 leukocytes in Blood by Automated count',
    consumerNamePt: 'Eosinófilos (%)',
    consumerNameEn: 'Eosinophils Percentage',
    units: ['%'],
    ucumUnit: '%',
    category: 'hematology',
    panels: ['57021-8'],
    referenceRanges: {
      adult: { min: 1, max: 6, unit: '%' },
    },
  },
  {
    code: '706-2',
    component: 'Basophils/100 leukocytes',
    property: 'NFr',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'Basophils % Bld',
    longName: 'Basophils/100 leukocytes in Blood by Automated count',
    consumerNamePt: 'Basófilos (%)',
    consumerNameEn: 'Basophils Percentage',
    units: ['%'],
    ucumUnit: '%',
    category: 'hematology',
    panels: ['57021-8'],
    referenceRanges: {
      adult: { min: 0, max: 2, unit: '%' },
    },
  },

  // ===========================================================================
  // DIABETES & GLUCOSE METABOLISM
  // ===========================================================================
  {
    code: '1558-6',
    component: 'Glucose^fasting',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Glucose p fast SerPl-mCnc',
    longName: 'Fasting glucose [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Glicemia de Jejum',
    consumerNameEn: 'Fasting Blood Glucose',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'diabetes',
    panels: ['24320-4'],
    clinicalNotes: 'Requires 8-12 hours fasting. Key test for diabetes screening.',
    referenceRanges: {
      adult: { min: 70, max: 99, unit: 'mg/dL', notes: 'Impaired fasting glucose: 100-125 mg/dL; Diabetes: >=126 mg/dL' },
      pediatric: { min: 60, max: 100, unit: 'mg/dL' },
    },
  },
  {
    code: '2345-7',
    component: 'Glucose',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Glucose SerPl-mCnc',
    longName: 'Glucose [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Glicose (Random)',
    consumerNameEn: 'Blood Glucose (Random)',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'diabetes',
    panels: ['24320-4'],
    referenceRanges: {
      adult: { min: 70, max: 140, unit: 'mg/dL', notes: 'Random glucose; Diabetes if >=200 mg/dL with symptoms' },
    },
  },
  {
    code: '4548-4',
    component: 'Hemoglobin A1c/Hemoglobin.total',
    property: 'NFr',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'Hgb A1c MFr Bld',
    longName: 'Hemoglobin A1c/Hemoglobin.total in Blood',
    consumerNamePt: 'Hemoglobina Glicada (HbA1c)',
    consumerNameEn: 'Glycated Hemoglobin (HbA1c)',
    units: ['%', 'mmol/mol'],
    ucumUnit: '%',
    category: 'diabetes',
    clinicalNotes: 'Reflects average blood glucose over 2-3 months. Primary monitoring test for diabetes.',
    referenceRanges: {
      adult: { max: 5.6, unit: '%', notes: 'Prediabetes: 5.7-6.4%; Diabetes: >=6.5%' },
    },
  },
  {
    code: '1521-4',
    component: 'Glucose^2H post 75 g glucose PO',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Glucose 2h p 75g Gluc SerPl-mCnc',
    longName: 'Glucose [Mass/volume] in Serum or Plasma --2 hours post 75 g glucose PO',
    consumerNamePt: 'Teste de Tolerância à Glicose (TOTG) - 2h',
    consumerNameEn: 'Oral Glucose Tolerance Test (OGTT) - 2h',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'diabetes',
    clinicalNotes: 'Standard OGTT 2-hour value. Used for gestational diabetes diagnosis.',
    referenceRanges: {
      adult: { max: 139, unit: 'mg/dL', notes: 'Impaired glucose tolerance: 140-199 mg/dL; Diabetes: >=200 mg/dL' },
      pregnancy: { max: 153, unit: 'mg/dL', notes: 'Gestational diabetes if >=153 mg/dL (IADPSG criteria)' },
    },
  },

  // ===========================================================================
  // LIPID PANEL
  // ===========================================================================
  {
    code: '2093-3',
    component: 'Cholesterol',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Cholest SerPl-mCnc',
    longName: 'Cholesterol [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Colesterol Total',
    consumerNameEn: 'Total Cholesterol',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'lipids',
    panels: ['24331-1'],
    referenceRanges: {
      adult: { max: 200, unit: 'mg/dL', notes: 'Desirable <200; Borderline high 200-239; High >=240' },
    },
  },
  {
    code: '2085-9',
    component: 'Cholesterol in HDL',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'HDL Chol SerPl-mCnc',
    longName: 'Cholesterol in HDL [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Colesterol HDL (Bom Colesterol)',
    consumerNameEn: 'HDL Cholesterol (Good Cholesterol)',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'lipids',
    panels: ['24331-1'],
    referenceRanges: {
      adultMale: { min: 40, unit: 'mg/dL', notes: 'Low <40; >=60 is protective' },
      adultFemale: { min: 50, unit: 'mg/dL', notes: 'Low <50; >=60 is protective' },
    },
  },
  {
    code: '13457-7',
    component: 'Cholesterol in LDL',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'Calculated',
    shortName: 'LDL Chol Calc SerPl-mCnc',
    longName: 'Cholesterol in LDL [Mass/volume] in Serum or Plasma by calculation',
    consumerNamePt: 'Colesterol LDL (Mau Colesterol)',
    consumerNameEn: 'LDL Cholesterol (Bad Cholesterol)',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'lipids',
    panels: ['24331-1'],
    clinicalNotes: 'Calculated using Friedewald equation. Invalid if TG >400 mg/dL.',
    referenceRanges: {
      adult: { max: 100, unit: 'mg/dL', notes: 'Optimal <100; Near optimal 100-129; Borderline high 130-159; High 160-189; Very high >=190' },
    },
  },
  {
    code: '2571-8',
    component: 'Triglyceride',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Trigl SerPl-mCnc',
    longName: 'Triglyceride [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Triglicerídeos',
    consumerNameEn: 'Triglycerides',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'lipids',
    panels: ['24331-1'],
    clinicalNotes: 'Fasting preferred but not required. High levels associated with cardiovascular risk.',
    referenceRanges: {
      adult: { max: 150, unit: 'mg/dL', notes: 'Normal <150; Borderline high 150-199; High 200-499; Very high >=500' },
    },
  },
  {
    code: '13458-5',
    component: 'Cholesterol in VLDL',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'Calculated',
    shortName: 'VLDL Chol Calc SerPl-mCnc',
    longName: 'Cholesterol in VLDL [Mass/volume] in Serum or Plasma by calculation',
    consumerNamePt: 'Colesterol VLDL',
    consumerNameEn: 'VLDL Cholesterol',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'lipids',
    referenceRanges: {
      adult: { min: 2, max: 30, unit: 'mg/dL' },
    },
  },

  // ===========================================================================
  // RENAL FUNCTION
  // ===========================================================================
  {
    code: '2160-0',
    component: 'Creatinine',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Creat SerPl-mCnc',
    longName: 'Creatinine [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Creatinina',
    consumerNameEn: 'Creatinine',
    units: ['mg/dL', 'umol/L'],
    ucumUnit: 'mg/dL',
    category: 'renal',
    panels: ['24320-4', '24323-8'],
    referenceRanges: {
      adultMale: { min: 0.7, max: 1.3, unit: 'mg/dL' },
      adultFemale: { min: 0.6, max: 1.1, unit: 'mg/dL' },
      pediatric: { min: 0.3, max: 0.7, unit: 'mg/dL' },
    },
  },
  {
    code: '3094-0',
    component: 'Urea nitrogen',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'BUN SerPl-mCnc',
    longName: 'Urea nitrogen [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Ureia (BUN)',
    consumerNameEn: 'Blood Urea Nitrogen (BUN)',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'renal',
    panels: ['24320-4', '24323-8'],
    referenceRanges: {
      adult: { min: 7, max: 20, unit: 'mg/dL' },
      pediatric: { min: 5, max: 18, unit: 'mg/dL' },
      elderly: { min: 8, max: 23, unit: 'mg/dL' },
    },
  },
  {
    code: '62238-1',
    component: 'Glomerular filtration rate/1.73 sq M.predicted',
    property: 'ArVRat',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'CKD-EPI',
    shortName: 'GFR CKD-EPI SerPlBld-ArVRat',
    longName: 'Glomerular filtration rate/1.73 sq M.predicted [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (CKD-EPI)',
    consumerNamePt: 'Taxa de Filtração Glomerular (TFG/eGFR)',
    consumerNameEn: 'Estimated GFR (eGFR)',
    units: ['mL/min/1.73m2'],
    ucumUnit: 'mL/min/{1.73_m2}',
    category: 'renal',
    clinicalNotes: 'CKD-EPI equation. CKD Stage 1: >=90; Stage 2: 60-89; Stage 3a: 45-59; Stage 3b: 30-44; Stage 4: 15-29; Stage 5: <15',
    referenceRanges: {
      adult: { min: 90, unit: 'mL/min/1.73m2', notes: 'Normal >=90 mL/min/1.73m2' },
    },
  },
  {
    code: '3084-1',
    component: 'Uric acid',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Uric acid SerPl-mCnc',
    longName: 'Urate [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Ácido Úrico',
    consumerNameEn: 'Uric Acid',
    units: ['mg/dL', 'umol/L'],
    ucumUnit: 'mg/dL',
    category: 'renal',
    referenceRanges: {
      adultMale: { min: 3.5, max: 7.2, unit: 'mg/dL' },
      adultFemale: { min: 2.5, max: 6.0, unit: 'mg/dL' },
    },
  },

  // ===========================================================================
  // ELECTROLYTES
  // ===========================================================================
  {
    code: '2951-2',
    component: 'Sodium',
    property: 'SCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Sodium SerPl-sCnc',
    longName: 'Sodium [Moles/volume] in Serum or Plasma',
    consumerNamePt: 'Sódio',
    consumerNameEn: 'Sodium',
    units: ['mmol/L', 'mEq/L'],
    ucumUnit: 'mmol/L',
    category: 'electrolytes',
    panels: ['24320-4', '24323-8'],
    referenceRanges: {
      adult: { min: 136, max: 145, unit: 'mmol/L' },
      pediatric: { min: 136, max: 145, unit: 'mmol/L' },
    },
  },
  {
    code: '2823-3',
    component: 'Potassium',
    property: 'SCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Potassium SerPl-sCnc',
    longName: 'Potassium [Moles/volume] in Serum or Plasma',
    consumerNamePt: 'Potássio',
    consumerNameEn: 'Potassium',
    units: ['mmol/L', 'mEq/L'],
    ucumUnit: 'mmol/L',
    category: 'electrolytes',
    panels: ['24320-4', '24323-8'],
    clinicalNotes: 'Critical values: <2.5 or >6.5 mmol/L',
    referenceRanges: {
      adult: { min: 3.5, max: 5.0, unit: 'mmol/L' },
      pediatric: { min: 3.4, max: 4.7, unit: 'mmol/L' },
    },
  },
  {
    code: '2075-0',
    component: 'Chloride',
    property: 'SCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Chloride SerPl-sCnc',
    longName: 'Chloride [Moles/volume] in Serum or Plasma',
    consumerNamePt: 'Cloreto',
    consumerNameEn: 'Chloride',
    units: ['mmol/L', 'mEq/L'],
    ucumUnit: 'mmol/L',
    category: 'electrolytes',
    panels: ['24320-4', '24323-8'],
    referenceRanges: {
      adult: { min: 98, max: 106, unit: 'mmol/L' },
    },
  },
  {
    code: '17861-6',
    component: 'Calcium',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Calcium SerPl-mCnc',
    longName: 'Calcium [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Cálcio Total',
    consumerNameEn: 'Calcium (Total)',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'electrolytes',
    referenceRanges: {
      adult: { min: 8.5, max: 10.5, unit: 'mg/dL' },
      pediatric: { min: 8.8, max: 10.8, unit: 'mg/dL' },
    },
  },
  {
    code: '2601-3',
    component: 'Magnesium',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Magnesium SerPl-mCnc',
    longName: 'Magnesium [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Magnésio',
    consumerNameEn: 'Magnesium',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'electrolytes',
    referenceRanges: {
      adult: { min: 1.7, max: 2.2, unit: 'mg/dL' },
    },
  },
  {
    code: '2777-1',
    component: 'Phosphate',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Phosphorus SerPl-mCnc',
    longName: 'Phosphate [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Fósforo',
    consumerNameEn: 'Phosphorus',
    units: ['mg/dL', 'mmol/L'],
    ucumUnit: 'mg/dL',
    category: 'electrolytes',
    referenceRanges: {
      adult: { min: 2.5, max: 4.5, unit: 'mg/dL' },
      pediatric: { min: 4.0, max: 7.0, unit: 'mg/dL' },
    },
  },

  // ===========================================================================
  // LIVER FUNCTION
  // ===========================================================================
  {
    code: '1920-8',
    component: 'Aspartate aminotransferase',
    property: 'CCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'AST SerPl-cCnc',
    longName: 'Aspartate aminotransferase [Enzymatic activity/volume] in Serum or Plasma',
    consumerNamePt: 'TGO (AST)',
    consumerNameEn: 'AST (SGOT)',
    units: ['U/L'],
    ucumUnit: 'U/L',
    category: 'liver',
    panels: ['24325-3'],
    referenceRanges: {
      adult: { min: 10, max: 40, unit: 'U/L' },
    },
  },
  {
    code: '1742-6',
    component: 'Alanine aminotransferase',
    property: 'CCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'ALT SerPl-cCnc',
    longName: 'Alanine aminotransferase [Enzymatic activity/volume] in Serum or Plasma',
    consumerNamePt: 'TGP (ALT)',
    consumerNameEn: 'ALT (SGPT)',
    units: ['U/L'],
    ucumUnit: 'U/L',
    category: 'liver',
    panels: ['24325-3'],
    referenceRanges: {
      adultMale: { min: 7, max: 56, unit: 'U/L' },
      adultFemale: { min: 7, max: 45, unit: 'U/L' },
    },
  },
  {
    code: '6768-6',
    component: 'Alkaline phosphatase',
    property: 'CCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'ALP SerPl-cCnc',
    longName: 'Alkaline phosphatase [Enzymatic activity/volume] in Serum or Plasma',
    consumerNamePt: 'Fosfatase Alcalina',
    consumerNameEn: 'Alkaline Phosphatase (ALP)',
    units: ['U/L'],
    ucumUnit: 'U/L',
    category: 'liver',
    panels: ['24325-3'],
    referenceRanges: {
      adult: { min: 44, max: 147, unit: 'U/L' },
      pediatric: { min: 100, max: 320, unit: 'U/L', notes: 'Higher in growing children' },
    },
  },
  {
    code: '2324-2',
    component: 'Gamma glutamyl transferase',
    property: 'CCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'GGT SerPl-cCnc',
    longName: 'Gamma glutamyl transferase [Enzymatic activity/volume] in Serum or Plasma',
    consumerNamePt: 'Gama-GT (GGT)',
    consumerNameEn: 'GGT (Gamma-GT)',
    units: ['U/L'],
    ucumUnit: 'U/L',
    category: 'liver',
    clinicalNotes: 'Elevated in biliary disease, alcohol use, and some medications.',
    referenceRanges: {
      adultMale: { min: 8, max: 61, unit: 'U/L' },
      adultFemale: { min: 5, max: 36, unit: 'U/L' },
    },
  },
  {
    code: '1975-2',
    component: 'Bilirubin.total',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Bilirub SerPl-mCnc',
    longName: 'Bilirubin.total [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Bilirrubina Total',
    consumerNameEn: 'Total Bilirubin',
    units: ['mg/dL', 'umol/L'],
    ucumUnit: 'mg/dL',
    category: 'liver',
    panels: ['24325-3'],
    referenceRanges: {
      adult: { min: 0.1, max: 1.2, unit: 'mg/dL' },
      newborn: { max: 12, unit: 'mg/dL', notes: 'Physiologic jaundice common' },
    },
  },
  {
    code: '1968-7',
    component: 'Bilirubin.direct',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Bilirub Direct SerPl-mCnc',
    longName: 'Bilirubin.direct [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Bilirrubina Direta (Conjugada)',
    consumerNameEn: 'Direct Bilirubin (Conjugated)',
    units: ['mg/dL', 'umol/L'],
    ucumUnit: 'mg/dL',
    category: 'liver',
    referenceRanges: {
      adult: { min: 0, max: 0.3, unit: 'mg/dL' },
    },
  },
  {
    code: '1751-7',
    component: 'Albumin',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Albumin SerPl-mCnc',
    longName: 'Albumin [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Albumina',
    consumerNameEn: 'Albumin',
    units: ['g/dL', 'g/L'],
    ucumUnit: 'g/dL',
    category: 'liver',
    panels: ['24325-3'],
    referenceRanges: {
      adult: { min: 3.5, max: 5.0, unit: 'g/dL' },
    },
  },
  {
    code: '2885-2',
    component: 'Protein',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Protein SerPl-mCnc',
    longName: 'Protein [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Proteínas Totais',
    consumerNameEn: 'Total Protein',
    units: ['g/dL', 'g/L'],
    ucumUnit: 'g/dL',
    category: 'liver',
    referenceRanges: {
      adult: { min: 6.0, max: 8.3, unit: 'g/dL' },
    },
  },

  // ===========================================================================
  // THYROID FUNCTION
  // ===========================================================================
  {
    code: '3016-3',
    component: 'Thyrotropin',
    property: 'ACnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'TSH SerPl-aCnc',
    longName: 'Thyrotropin [Units/volume] in Serum or Plasma',
    consumerNamePt: 'TSH (Hormônio Tireoestimulante)',
    consumerNameEn: 'TSH (Thyroid Stimulating Hormone)',
    units: ['mIU/L', 'uIU/mL'],
    ucumUnit: 'm[IU]/L',
    category: 'thyroid',
    panels: ['24348-5'],
    clinicalNotes: 'Primary screening test for thyroid disorders.',
    referenceRanges: {
      adult: { min: 0.4, max: 4.0, unit: 'mIU/L' },
      pregnancy: { min: 0.1, max: 2.5, unit: 'mIU/L', notes: 'First trimester; adjust by trimester' },
    },
  },
  {
    code: '3024-7',
    component: 'Thyroxine (T4) free',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'T4 Free SerPl-mCnc',
    longName: 'Thyroxine (T4) free [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'T4 Livre',
    consumerNameEn: 'Free T4',
    units: ['ng/dL', 'pmol/L'],
    ucumUnit: 'ng/dL',
    category: 'thyroid',
    panels: ['24348-5'],
    referenceRanges: {
      adult: { min: 0.8, max: 1.8, unit: 'ng/dL' },
    },
  },
  {
    code: '3051-0',
    component: 'Triiodothyronine (T3) free',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'T3 Free SerPl-mCnc',
    longName: 'Triiodothyronine (T3) free [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'T3 Livre',
    consumerNameEn: 'Free T3',
    units: ['pg/mL', 'pmol/L'],
    ucumUnit: 'pg/mL',
    category: 'thyroid',
    referenceRanges: {
      adult: { min: 2.3, max: 4.2, unit: 'pg/mL' },
    },
  },

  // ===========================================================================
  // URINALYSIS (EAS)
  // ===========================================================================
  {
    code: '5778-6',
    component: 'Color of Urine',
    property: 'Type',
    system: 'Urine',
    scale: 'Nom',
    shortName: 'Color Ur',
    longName: 'Color of Urine',
    consumerNamePt: 'Cor da Urina',
    consumerNameEn: 'Urine Color',
    units: [],
    ucumUnit: '',
    category: 'urinalysis',
    panels: ['24356-8'],
    clinicalNotes: 'Normal: Yellow to amber',
  },
  {
    code: '5767-9',
    component: 'Appearance of Urine',
    property: 'Type',
    system: 'Urine',
    scale: 'Nom',
    shortName: 'Appearance Ur',
    longName: 'Appearance of Urine',
    consumerNamePt: 'Aspecto da Urina',
    consumerNameEn: 'Urine Appearance',
    units: [],
    ucumUnit: '',
    category: 'urinalysis',
    panels: ['24356-8'],
    clinicalNotes: 'Normal: Clear',
  },
  {
    code: '5811-5',
    component: 'Specific gravity of Urine',
    property: 'Ratio',
    system: 'Urine',
    scale: 'Qn',
    shortName: 'Sp Gr Ur',
    longName: 'Specific gravity of Urine by Test strip',
    consumerNamePt: 'Densidade Urinária',
    consumerNameEn: 'Urine Specific Gravity',
    units: [],
    ucumUnit: '',
    category: 'urinalysis',
    panels: ['24356-8'],
    referenceRanges: {
      adult: { min: 1.005, max: 1.030, unit: '', notes: 'Reflects hydration status' },
    },
  },
  {
    code: '5803-2',
    component: 'pH of Urine',
    property: 'SCnc',
    system: 'Urine',
    scale: 'Qn',
    shortName: 'pH Ur',
    longName: 'pH of Urine by Test strip',
    consumerNamePt: 'pH Urinário',
    consumerNameEn: 'Urine pH',
    units: ['pH'],
    ucumUnit: '[pH]',
    category: 'urinalysis',
    panels: ['24356-8'],
    referenceRanges: {
      adult: { min: 4.5, max: 8.0, unit: 'pH', notes: 'Usually 5.5-6.5' },
    },
  },
  {
    code: '5804-0',
    component: 'Protein in Urine',
    property: 'ACnc',
    system: 'Urine',
    scale: 'Ord',
    shortName: 'Protein Ur Strip',
    longName: 'Protein [Presence] in Urine by Test strip',
    consumerNamePt: 'Proteína na Urina (Proteinúria)',
    consumerNameEn: 'Urine Protein',
    units: [],
    ucumUnit: '',
    category: 'urinalysis',
    panels: ['24356-8'],
    clinicalNotes: 'Normal: Negative or trace',
  },
  {
    code: '5792-7',
    component: 'Glucose in Urine',
    property: 'ACnc',
    system: 'Urine',
    scale: 'Ord',
    shortName: 'Glucose Ur Strip',
    longName: 'Glucose [Presence] in Urine by Test strip',
    consumerNamePt: 'Glicose na Urina (Glicosúria)',
    consumerNameEn: 'Urine Glucose',
    units: [],
    ucumUnit: '',
    category: 'urinalysis',
    panels: ['24356-8'],
    clinicalNotes: 'Normal: Negative. Positive suggests diabetes or renal glycosuria.',
  },
  {
    code: '5794-3',
    component: 'Hemoglobin in Urine',
    property: 'ACnc',
    system: 'Urine',
    scale: 'Ord',
    shortName: 'Blood Ur Strip',
    longName: 'Hemoglobin [Presence] in Urine by Test strip',
    consumerNamePt: 'Sangue na Urina (Hematúria)',
    consumerNameEn: 'Urine Blood',
    units: [],
    ucumUnit: '',
    category: 'urinalysis',
    panels: ['24356-8'],
    clinicalNotes: 'Normal: Negative. Positive indicates hematuria.',
  },
  {
    code: '5802-4',
    component: 'Nitrite in Urine',
    property: 'ACnc',
    system: 'Urine',
    scale: 'Ord',
    shortName: 'Nitrite Ur Strip',
    longName: 'Nitrite [Presence] in Urine by Test strip',
    consumerNamePt: 'Nitrito na Urina',
    consumerNameEn: 'Urine Nitrite',
    units: [],
    ucumUnit: '',
    category: 'urinalysis',
    panels: ['24356-8'],
    clinicalNotes: 'Normal: Negative. Positive suggests bacterial UTI.',
  },
  {
    code: '5799-2',
    component: 'Leukocyte esterase in Urine',
    property: 'ACnc',
    system: 'Urine',
    scale: 'Ord',
    shortName: 'Leuk Esterase Ur Strip',
    longName: 'Leukocyte esterase [Presence] in Urine by Test strip',
    consumerNamePt: 'Leucócitos (Esterase Leucocitária)',
    consumerNameEn: 'Urine Leukocyte Esterase',
    units: [],
    ucumUnit: '',
    category: 'urinalysis',
    panels: ['24356-8'],
    clinicalNotes: 'Normal: Negative. Positive indicates pyuria.',
  },

  // ===========================================================================
  // COAGULATION
  // ===========================================================================
  {
    code: '5902-2',
    component: 'Prothrombin time',
    property: 'Time',
    system: 'PPP',
    scale: 'Qn',
    shortName: 'PT PPP',
    longName: 'Prothrombin time (PT) in Platelet poor plasma by Coagulation assay',
    consumerNamePt: 'Tempo de Protrombina (TP)',
    consumerNameEn: 'Prothrombin Time (PT)',
    units: ['s'],
    ucumUnit: 's',
    category: 'coagulation',
    referenceRanges: {
      adult: { min: 10, max: 14, unit: 's', notes: 'Varies by reagent' },
    },
  },
  {
    code: '6301-6',
    component: 'INR',
    property: 'NFr',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'INR Bld Coag',
    longName: 'INR in Blood by Coagulation assay',
    consumerNamePt: 'RNI (Razão Normalizada Internacional)',
    consumerNameEn: 'INR (International Normalized Ratio)',
    units: ['{INR}'],
    ucumUnit: '{INR}',
    category: 'coagulation',
    clinicalNotes: 'Therapeutic range for warfarin: typically 2.0-3.0',
    referenceRanges: {
      adult: { min: 0.8, max: 1.2, unit: '{INR}', notes: 'Normal without anticoagulation' },
    },
  },
  {
    code: '3173-2',
    component: 'aPTT',
    property: 'Time',
    system: 'PPP',
    scale: 'Qn',
    shortName: 'aPTT PPP',
    longName: 'Activated partial thromboplastin time (aPTT) in Platelet poor plasma by Coagulation assay',
    consumerNamePt: 'Tempo de Tromboplastina Parcial Ativada (TTPa)',
    consumerNameEn: 'aPTT (Activated Partial Thromboplastin Time)',
    units: ['s'],
    ucumUnit: 's',
    category: 'coagulation',
    referenceRanges: {
      adult: { min: 25, max: 35, unit: 's', notes: 'Varies by reagent' },
    },
  },

  // ===========================================================================
  // INFLAMMATORY MARKERS
  // ===========================================================================
  {
    code: '1988-5',
    component: 'C reactive protein',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'CRP SerPl-mCnc',
    longName: 'C reactive protein [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Proteína C Reativa (PCR)',
    consumerNameEn: 'C-Reactive Protein (CRP)',
    units: ['mg/L', 'mg/dL'],
    ucumUnit: 'mg/L',
    category: 'inflammatory',
    referenceRanges: {
      adult: { max: 10, unit: 'mg/L', notes: 'Normal <10 mg/L; >100 suggests severe infection' },
    },
  },
  {
    code: '30522-7',
    component: 'C reactive protein',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'High sensitivity',
    shortName: 'CRP HS SerPl-mCnc',
    longName: 'C reactive protein [Mass/volume] in Serum or Plasma by High sensitivity method',
    consumerNamePt: 'PCR Ultrassensível (hs-CRP)',
    consumerNameEn: 'High-Sensitivity CRP (hs-CRP)',
    units: ['mg/L'],
    ucumUnit: 'mg/L',
    category: 'inflammatory',
    clinicalNotes: 'Used for cardiovascular risk assessment. Low risk <1; Moderate 1-3; High >3 mg/L',
    referenceRanges: {
      adult: { max: 3, unit: 'mg/L', notes: 'CV risk: Low <1, Moderate 1-3, High >3' },
    },
  },
  {
    code: '4537-7',
    component: 'Erythrocyte sedimentation rate',
    property: 'Vel',
    system: 'Bld',
    scale: 'Qn',
    shortName: 'ESR Bld',
    longName: 'Erythrocyte sedimentation rate by Westergren method',
    consumerNamePt: 'Velocidade de Hemossedimentação (VHS)',
    consumerNameEn: 'Erythrocyte Sedimentation Rate (ESR)',
    units: ['mm/h'],
    ucumUnit: 'mm/h',
    category: 'inflammatory',
    referenceRanges: {
      adultMale: { max: 15, unit: 'mm/h', notes: 'Increases with age' },
      adultFemale: { max: 20, unit: 'mm/h', notes: 'Increases with age' },
    },
  },

  // ===========================================================================
  // CARDIAC MARKERS
  // ===========================================================================
  {
    code: '67151-1',
    component: 'Troponin T.cardiac',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'High sensitivity',
    shortName: 'cTnT HS SerPl-mCnc',
    longName: 'Troponin T.cardiac [Mass/volume] in Serum or Plasma by High sensitivity method',
    consumerNamePt: 'Troponina T Ultrassensível',
    consumerNameEn: 'High-Sensitivity Troponin T',
    units: ['ng/L', 'pg/mL'],
    ucumUnit: 'ng/L',
    category: 'cardiac',
    clinicalNotes: 'Key biomarker for acute myocardial infarction.',
    referenceRanges: {
      adult: { max: 14, unit: 'ng/L', notes: '99th percentile cutoff; varies by assay' },
    },
  },
  {
    code: '33762-6',
    component: 'Natriuretic peptide.B prohormone N-Terminal',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'NT-proBNP SerPl-mCnc',
    longName: 'Natriuretic peptide.B prohormone N-Terminal [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'NT-proBNP (Peptídeo Natriurético)',
    consumerNameEn: 'NT-proBNP',
    units: ['pg/mL', 'ng/L'],
    ucumUnit: 'pg/mL',
    category: 'cardiac',
    clinicalNotes: 'Marker of heart failure. Increases with age.',
    referenceRanges: {
      adult: { max: 125, unit: 'pg/mL', notes: '<50 years; higher cutoffs for older patients' },
      elderly: { max: 450, unit: 'pg/mL', notes: '>75 years' },
    },
  },

  // ===========================================================================
  // VITAMINS & NUTRITIONAL
  // ===========================================================================
  {
    code: '1989-3',
    component: '25-Hydroxyvitamin D3',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: '25-OH Vit D3 SerPl-mCnc',
    longName: '25-Hydroxyvitamin D3 [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Vitamina D (25-OH)',
    consumerNameEn: 'Vitamin D (25-OH)',
    units: ['ng/mL', 'nmol/L'],
    ucumUnit: 'ng/mL',
    category: 'vitamins',
    referenceRanges: {
      adult: { min: 30, max: 100, unit: 'ng/mL', notes: 'Deficiency <20; Insufficiency 20-29; Optimal 30-100' },
    },
  },
  {
    code: '2132-9',
    component: 'Cobalamin (Vitamin B12)',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Vit B12 SerPl-mCnc',
    longName: 'Cobalamin (Vitamin B12) [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Vitamina B12',
    consumerNameEn: 'Vitamin B12',
    units: ['pg/mL', 'pmol/L'],
    ucumUnit: 'pg/mL',
    category: 'vitamins',
    referenceRanges: {
      adult: { min: 200, max: 900, unit: 'pg/mL', notes: 'Deficiency <200; consider methylmalonic acid if borderline' },
    },
  },
  {
    code: '2284-8',
    component: 'Folate',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Folate SerPl-mCnc',
    longName: 'Folate [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Ácido Fólico (Folato)',
    consumerNameEn: 'Folate (Folic Acid)',
    units: ['ng/mL', 'nmol/L'],
    ucumUnit: 'ng/mL',
    category: 'vitamins',
    referenceRanges: {
      adult: { min: 3, max: 17, unit: 'ng/mL' },
    },
  },

  // ===========================================================================
  // IRON STUDIES
  // ===========================================================================
  {
    code: '2498-4',
    component: 'Iron',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Iron SerPl-mCnc',
    longName: 'Iron [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Ferro Sérico',
    consumerNameEn: 'Serum Iron',
    units: ['ug/dL', 'umol/L'],
    ucumUnit: 'ug/dL',
    category: 'iron',
    referenceRanges: {
      adultMale: { min: 60, max: 170, unit: 'ug/dL' },
      adultFemale: { min: 40, max: 150, unit: 'ug/dL' },
    },
  },
  {
    code: '2276-4',
    component: 'Ferritin',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Ferritin SerPl-mCnc',
    longName: 'Ferritin [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Ferritina',
    consumerNameEn: 'Ferritin',
    units: ['ng/mL', 'ug/L'],
    ucumUnit: 'ng/mL',
    category: 'iron',
    clinicalNotes: 'Main marker of iron stores. Also acute phase reactant.',
    referenceRanges: {
      adultMale: { min: 30, max: 400, unit: 'ng/mL' },
      adultFemale: { min: 15, max: 150, unit: 'ng/mL' },
    },
  },
  {
    code: '2500-7',
    component: 'Iron binding capacity',
    property: 'MCnc',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'TIBC SerPl-mCnc',
    longName: 'Iron binding capacity [Mass/volume] in Serum or Plasma',
    consumerNamePt: 'Capacidade Total de Ligação do Ferro (TIBC)',
    consumerNameEn: 'Total Iron Binding Capacity (TIBC)',
    units: ['ug/dL', 'umol/L'],
    ucumUnit: 'ug/dL',
    category: 'iron',
    referenceRanges: {
      adult: { min: 250, max: 370, unit: 'ug/dL' },
    },
  },
  {
    code: '2502-3',
    component: 'Transferrin saturation',
    property: 'NFr',
    system: 'Ser/Plas',
    scale: 'Qn',
    shortName: 'Transferrin Sat SerPl',
    longName: 'Iron saturation [Mass Fraction] in Serum or Plasma',
    consumerNamePt: 'Saturação de Transferrina',
    consumerNameEn: 'Transferrin Saturation',
    units: ['%'],
    ucumUnit: '%',
    category: 'iron',
    referenceRanges: {
      adult: { min: 20, max: 50, unit: '%', notes: 'Low (<20%) suggests iron deficiency' },
    },
  },
];

// =============================================================================
// LOOKUP & UTILITY FUNCTIONS
// =============================================================================

/**
 * Find a LOINC test by code
 */
export function getTestByCode(code: string): LOINCTest | undefined {
  return LOINC_TESTS.find((test) => test.code === code);
}

/**
 * Find tests by category
 */
export function getTestsByCategory(category: LOINCCategory): LOINCTest[] {
  return LOINC_TESTS.filter((test) => test.category === category);
}

/**
 * Search tests by component name
 */
export function searchTestsByComponent(query: string): LOINCTest[] {
  const normalizedQuery = query.toLowerCase();
  return LOINC_TESTS.filter(
    (test) =>
      test.component.toLowerCase().includes(normalizedQuery) ||
      test.shortName.toLowerCase().includes(normalizedQuery) ||
      test.consumerNamePt.toLowerCase().includes(normalizedQuery) ||
      test.consumerNameEn.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Get all tests in a panel
 */
export function getTestsInPanel(panelCode: string): LOINCTest[] {
  return LOINC_TESTS.filter(
    (test) => test.panels && test.panels.includes(panelCode)
  );
}

/**
 * Validate LOINC code format
 */
export function isValidLoincCode(code: string): boolean {
  return /^\d{1,7}-\d$/.test(code);
}

/**
 * Get reference range for specific population
 */
export function getReferenceRange(
  test: LOINCTest,
  population: keyof ReferenceRanges
): ReferenceRange | undefined {
  if (!test.referenceRanges) return undefined;
  return test.referenceRanges[population];
}

// =============================================================================
// PANEL DEFINITIONS
// =============================================================================

export const LOINC_PANELS = {
  /** Complete Blood Count with Differential */
  CBC_WITH_DIFF: '57021-8',
  /** Complete Blood Count without Differential */
  CBC_WITHOUT_DIFF: '58410-2',
  /** Basic Metabolic Panel */
  BMP: '24320-4',
  /** Comprehensive Metabolic Panel */
  CMP: '24323-8',
  /** Lipid Panel */
  LIPID_PANEL: '24331-1',
  /** Hepatic Function Panel */
  HEPATIC_PANEL: '24325-3',
  /** Thyroid Panel */
  THYROID_PANEL: '24348-5',
  /** Complete Urinalysis */
  URINALYSIS: '24356-8',
} as const;

// =============================================================================
// CATEGORY DISPLAY NAMES
// =============================================================================

export const CATEGORY_NAMES: Record<LOINCCategory, { pt: string; en: string }> = {
  hematology: { pt: 'Hematologia (Hemograma)', en: 'Hematology (CBC)' },
  chemistry: { pt: 'Bioquímica', en: 'Chemistry' },
  lipids: { pt: 'Perfil Lipídico', en: 'Lipid Panel' },
  thyroid: { pt: 'Função Tireoidiana', en: 'Thyroid Function' },
  urinalysis: { pt: 'Exame de Urina (EAS)', en: 'Urinalysis' },
  coagulation: { pt: 'Coagulação', en: 'Coagulation' },
  inflammatory: { pt: 'Marcadores Inflamatórios', en: 'Inflammatory Markers' },
  diabetes: { pt: 'Diabetes/Glicemia', en: 'Diabetes/Glucose' },
  liver: { pt: 'Função Hepática', en: 'Liver Function' },
  renal: { pt: 'Função Renal', en: 'Renal Function' },
  electrolytes: { pt: 'Eletrólitos', en: 'Electrolytes' },
  cardiac: { pt: 'Marcadores Cardíacos', en: 'Cardiac Markers' },
  vitamins: { pt: 'Vitaminas', en: 'Vitamins' },
  iron: { pt: 'Metabolismo do Ferro', en: 'Iron Studies' },
  vitals: { pt: 'Sinais Vitais', en: 'Vital Signs' },
};

export default {
  LOINC_TESTS,
  LOINC_PANELS,
  CATEGORY_NAMES,
  getTestByCode,
  getTestsByCategory,
  searchTestsByComponent,
  getTestsInPanel,
  isValidLoincCode,
  getReferenceRange,
};
