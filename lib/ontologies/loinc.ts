/**
 * LOINC (Laboratory Observations Identifiers Names and Codes)
 * Integration for laboratory test standardization
 */

export interface LOINCCode {
  code: string; // Ex: "24323-8"
  component: string; // Substance/analyte being measured
  property: string; // Type of measurement (mass, concentration, etc.)
  timeAspect: string; // Point in time, 24hr, etc.
  system: string; // Type of specimen/system
  scale: string; // Type of scale (quantitative, ordinal, nominal)
  method?: string; // Method of measurement (if applicable)
  longCommonName?: string; // Full descriptive name
  shortName?: string; // Short name
  relatedNames?: string[]; // Synonyms/related names
}

/**
 * LOINC codes for common laboratory tests in primary care
 */
export const LOINC_CODES: Record<string, LOINCCode> = {
  // Hematology
  'complete-blood-count': {
    code: '58410-2',
    component: 'Complete blood count',
    property: 'Number',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    longCommonName: 'Complete blood count (CBC)',
    shortName: 'CBC',
    relatedNames: ['Hemograma completo', 'Hemograma'],
  },
  'hemoglobin': {
    code: '718-7',
    component: 'Hemoglobin',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    longCommonName: 'Hemoglobin [Mass/volume] in Blood',
    shortName: 'HGB',
    relatedNames: ['Hemoglobina', 'Hb'],
  },
  'hematocrit': {
    code: '4544-3',
    component: 'Hematocrit',
    property: 'MFr',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    longCommonName: 'Hematocrit [Volume Fraction] of Blood',
    shortName: 'HCT',
    relatedNames: ['Hematócrito', 'Ht'],
  },
  'white-blood-cell-count': {
    code: '6690-2',
    component: 'Leukocytes',
    property: 'Number',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    longCommonName: 'Leukocytes [#/volume] in Blood',
    shortName: 'WBC',
    relatedNames: ['Leucócitos', 'Contagem de leucócitos'],
  },
  'platelet-count': {
    code: '777-3',
    component: 'Platelets',
    property: 'Number',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    longCommonName: 'Platelets [#/volume] in Blood',
    shortName: 'PLT',
    relatedNames: ['Plaquetas', 'Contagem de plaquetas'],
  },

  // Biochemistry - Metabolic
  'glucose': {
    code: '2339-0',
    component: 'Glucose',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    longCommonName: 'Glucose [Mass/volume] in Blood',
    shortName: 'GLU',
    relatedNames: ['Glicemia', 'Glicose'],
  },
  'glucose-fasting': {
    code: '1558-6',
    component: 'Glucose',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'Fasting',
    longCommonName: 'Glucose [Mass/volume] in Serum or Plasma --fasting',
    shortName: 'GLU-F',
    relatedNames: ['Glicemia de jejum', 'Glicose em jejum'],
  },
  'hba1c': {
    code: '4548-4',
    component: 'Hemoglobin A1c',
    property: 'MFr',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    longCommonName: 'Hemoglobin A1c/Hemoglobin.total in Blood',
    shortName: 'HbA1c',
    relatedNames: ['Hemoglobina glicada', 'HbA1c', 'Glicohemoglobina'],
  },
  'total-cholesterol': {
    code: '2093-3',
    component: 'Cholesterol',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Cholesterol [Mass/volume] in Serum or Plasma',
    shortName: 'CHOL',
    relatedNames: ['Colesterol total', 'CT'],
  },
  'ldl-cholesterol': {
    code: '2089-1',
    component: 'Cholesterol.in LDL',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Cholesterol [Mass/volume] in LDL',
    shortName: 'LDL',
    relatedNames: ['LDL-colesterol', 'LDL-C'],
  },
  'hdl-cholesterol': {
    code: '2085-9',
    component: 'Cholesterol.in HDL',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Cholesterol [Mass/volume] in HDL',
    shortName: 'HDL',
    relatedNames: ['HDL-colesterol', 'HDL-C'],
  },
  'triglycerides': {
    code: '2571-8',
    component: 'Triglyceride',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Triglyceride [Mass/volume] in Serum or Plasma',
    shortName: 'TRIG',
    relatedNames: ['Triglicerídeos', 'TG'],
  },

  // Liver function
  'alt': {
    code: '1742-6',
    component: 'Alanine aminotransferase',
    property: 'CCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Alanine aminotransferase [Enzymatic activity/volume] in Serum or Plasma',
    shortName: 'ALT',
    relatedNames: ['ALT', 'TGP', 'Transaminase glutâmico-pirúvica'],
  },
  'ast': {
    code: '1920-8',
    component: 'Aspartate aminotransferase',
    property: 'CCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Aspartate aminotransferase [Enzymatic activity/volume] in Serum or Plasma',
    shortName: 'AST',
    relatedNames: ['AST', 'TGO', 'Transaminase glutâmico-oxalacética'],
  },
  'total-bilirubin': {
    code: '1975-2',
    component: 'Bilirubin.total',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Bilirubin.total [Mass/volume] in Serum or Plasma',
    shortName: 'TBIL',
    relatedNames: ['Bilirrubina total', 'BT'],
  },
  'ggt': {
    code: '2324-2',
    component: 'Gamma glutamyltransferase',
    property: 'CCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Gamma glutamyltransferase [Enzymatic activity/volume] in Serum or Plasma',
    shortName: 'GGT',
    relatedNames: ['GGT', 'Gama-glutamil transferase'],
  },

  // Kidney function
  'creatinine': {
    code: '2160-0',
    component: 'Creatinine',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Creatinine [Mass/volume] in Serum or Plasma',
    shortName: 'CREAT',
    relatedNames: ['Creatinina', 'Cr'],
  },
  'urea': {
    code: '3094-0',
    component: 'Urea nitrogen',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Urea nitrogen [Mass/volume] in Serum or Plasma',
    shortName: 'BUN',
    relatedNames: ['Uréia', 'BUN', 'Nitrogênio ureico'],
  },
  'egfr': {
    code: '33914-3',
    component: 'eGFR',
    property: 'VRate',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'CKD-EPI',
    longCommonName: 'Glomerular filtration rate/1.73 sq M predicted by Creatinine-based formula (CKD-EPI)',
    shortName: 'eGFR',
    relatedNames: ['Taxa de filtração glomerular estimada', 'TFGe'],
  },

  // Thyroid function
  'tsh': {
    code: '3016-3',
    component: 'Thyrotropin',
    property: 'CCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Thyrotropin [Units/volume] in Serum or Plasma',
    shortName: 'TSH',
    relatedNames: ['TSH', 'Tireotropina', 'Hormônio estimulante da tireoide'],
  },
  'free-t4': {
    code: '3018-9',
    component: 'Thyroxine free',
    property: 'CCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Thyroxine (T4) free [Mass/volume] in Serum or Plasma',
    shortName: 'FT4',
    relatedNames: ['T4 livre', 'Tiroxina livre'],
  },

  // Vitamins
  'vitamin-b12': {
    code: '2132-9',
    component: 'Cobalamin',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Cobalamin (Vitamin B12) [Mass/volume] in Serum or Plasma',
    shortName: 'B12',
    relatedNames: ['Vitamina B12', 'Cianocobalamina', 'B12'],
  },
  'folate': {
    code: '2284-8',
    component: 'Folate',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Folate [Mass/volume] in Serum or Plasma',
    shortName: 'FOL',
    relatedNames: ['Ácido fólico', 'Folato'],
  },
  'vitamin-d': {
    code: '14635-7',
    component: '25-Hydroxyvitamin D2+D3',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: '25-Hydroxyvitamin D2+D3 [Mass/volume] in Serum or Plasma',
    shortName: '25-OH-VitD',
    relatedNames: ['Vitamina D', '25-hidroxivitamina D', 'Calcidiol'],
  },

  // Infectious diseases
  'c-reactive-protein': {
    code: '1988-5',
    component: 'C reactive protein',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'C reactive protein [Mass/volume] in Serum or Plasma',
    shortName: 'CRP',
    relatedNames: ['Proteína C reativa', 'PCR'],
  },
  'procalcitonin': {
    code: '33959-8',
    component: 'Procalcitonin',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Procalcitonin [Mass/volume] in Serum or Plasma',
    shortName: 'PCT',
    relatedNames: ['Procalcitonina', 'PCT'],
  },

  // Urinalysis
  'urinalysis': {
    code: '24356-8',
    component: 'Urinalysis',
    property: 'Find',
    timeAspect: 'Pt',
    system: 'Urine',
    scale: 'Nom',
    longCommonName: 'Urinalysis complete',
    shortName: 'UA',
    relatedNames: ['Urinálise', 'EAS', 'Exame de urina'],
  },
  'urine-culture': {
    code: '630-4',
    component: 'Bacteria',
    property: 'PrThr',
    timeAspect: 'Pt',
    system: 'Urine',
    scale: 'Ord',
    method: 'Culture',
    longCommonName: 'Bacteria [Presence] in Urine by Culture',
    shortName: 'UCx',
    relatedNames: ['Urocultura', 'Cultura de urina'],
  },
};

/**
 * Get LOINC code by key
 */
export function getLOINCCode(key: string): LOINCCode | undefined {
  return LOINC_CODES[key];
}

/**
 * Search LOINC codes by name or related name
 */
export function searchLOINCByName(query: string): LOINCCode[] {
  const normalizedQuery = query.toLowerCase().trim();
  const results: LOINCCode[] = [];

  for (const code of Object.values(LOINC_CODES)) {
    const matches =
      code.longCommonName?.toLowerCase().includes(normalizedQuery) ||
      code.shortName?.toLowerCase().includes(normalizedQuery) ||
      code.relatedNames?.some(name => name.toLowerCase().includes(normalizedQuery));

    if (matches) {
      results.push(code);
    }
  }

  return results;
}

/**
 * Get LOINC code by exact code
 */
export function getLOINCByCode(code: string): LOINCCode | undefined {
  return Object.values(LOINC_CODES).find(c => c.code === code);
}

/**
 * Map common exam names to LOINC codes
 */
export const EXAM_TO_LOINC_MAP: Record<string, string> = {
  // Portuguese names
  'hemograma': 'complete-blood-count',
  'hemograma completo': 'complete-blood-count',
  'hemoglobina': 'hemoglobin',
  'hematócrito': 'hematocrit',
  'leucócitos': 'white-blood-cell-count',
  'plaquetas': 'platelet-count',
  'glicemia': 'glucose',
  'glicose': 'glucose',
  'glicemia de jejum': 'glucose-fasting',
  'hemoglobina glicada': 'hba1c',
  'hba1c': 'hba1c',
  'colesterol total': 'total-cholesterol',
  'ldl': 'ldl-cholesterol',
  'ldl-colesterol': 'ldl-cholesterol',
  'hdl': 'hdl-cholesterol',
  'hdl-colesterol': 'hdl-cholesterol',
  'triglicerídeos': 'triglycerides',
  'tgp': 'alt',
  'alt': 'alt',
  'tgo': 'ast',
  'ast': 'ast',
  'bilirrubina total': 'total-bilirubin',
  'ggt': 'ggt',
  'creatinina': 'creatinine',
  'uréia': 'urea',
  'ureia': 'urea',
  'egfr': 'egfr',
  'tfge': 'egfr',
  'tsh': 'tsh',
  't4 livre': 'free-t4',
  'vitamina b12': 'vitamin-b12',
  'b12': 'vitamin-b12',
  'ácido fólico': 'folate',
  'folato': 'folate',
  'vitamina d': 'vitamin-d',
  'pcr': 'c-reactive-protein',
  'proteína c reativa': 'c-reactive-protein',
  'procalcitonina': 'procalcitonin',
  'pct': 'procalcitonin',
  'urinálise': 'urinalysis',
  'eas': 'urinalysis',
  'urocultura': 'urine-culture',
};

/**
 * Map exam name to LOINC code key
 */
export function mapExamNameToLOINC(examName: string): string | undefined {
  const normalized = examName.toLowerCase().trim();
  return EXAM_TO_LOINC_MAP[normalized];
}

