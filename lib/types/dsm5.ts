/**
 * DSM-5 Ontology Types
 * Diagnostic and Statistical Manual of Mental Disorders, 5th Edition
 */

/**
 * Códigos DSM-5 por categoria
 */
export const DSM5_CATEGORIES = {
  NEURODEVELOPMENTAL: 'Neurodevelopmental Disorders',
  SCHIZOPHRENIA_SPECTRUM: 'Schizophrenia Spectrum and Other Psychotic Disorders',
  MOOD: 'Bipolar and Related Disorders',
  DEPRESSIVE: 'Depressive Disorders',
  ANXIETY: 'Anxiety Disorders',
  OBSESSIVE_COMPULSIVE: 'Obsessive-Compulsive and Related Disorders',
  TRAUMA_STRESS: 'Trauma- and Stressor-Related Disorders',
  DISSOCIATIVE: 'Dissociative Disorders',
  SOMATIC: 'Somatic Symptom and Related Disorders',
  FEEDING_EATING: 'Feeding and Eating Disorders',
  ELIMINATION: 'Elimination Disorders',
  SLEEP_WAKE: 'Sleep-Wake Disorders',
  SEXUAL: 'Sexual Dysfunctions',
  GENDER_DYSPHORIA: 'Gender Dysphoria',
  DISRUPTIVE_IMPULSE: 'Disruptive, Impulse-Control, and Conduct Disorders',
  SUBSTANCE: 'Substance-Related and Addictive Disorders',
  NEUROCOGNITIVE: 'Neurocognitive Disorders',
  PERSONALITY: 'Personality Disorders',
  PARAPHILIC: 'Paraphilic Disorders',
  OTHER: 'Other Mental Disorders',
} as const;

export type DSM5Category = typeof DSM5_CATEGORIES[keyof typeof DSM5_CATEGORIES];

/**
 * Código DSM-5
 */
export interface DSM5Code {
  code: string; // Ex: "296.33", "F32.1"
  text: string; // Descrição completa
  specifiers?: string[]; // Especificadores (severity, episode type, etc.)
}

/**
 * Critério diagnóstico DSM-5
 */
export interface DSM5Criterion {
  letter?: string; // A, B, C, etc.
  text: string; // Texto do critério
  required?: boolean; // Se é obrigatório
  subCriteria?: DSM5Criterion[]; // Subcritérios
}

/**
 * Critérios diagnósticos completos DSM-5
 */
export interface DSM5DiagnosticCriteria {
  code: string;
  name: string;
  category: DSM5Category;
  criteria: DSM5Criterion[];
  specifiers?: {
    severity?: string[];
    course?: string[];
    episode?: string[];
    remission?: string[];
  };
  notes?: string;
  exclusions?: string[]; // Códigos que devem ser excluídos
}

/**
 * Mapeamento CID-10 para DSM-5
 */
export interface ICD10ToDSM5Mapping {
  icd10Code: string;
  icd10Text: string;
  dsm5Code: string;
  dsm5Text: string;
  matchType: 'exact' | 'approximate' | 'related';
}

/**
 * Especificadores DSM-5 comuns
 */
export const DSM5_SPECIFIERS = {
  SEVERITY: {
    MILD: 'Mild',
    MODERATE: 'Moderate',
    SEVERE: 'Severe',
  },
  COURSE: {
    SINGLE_EPISODE: 'Single Episode',
    RECURRENT: 'Recurrent',
    CHRONIC: 'Chronic',
    IN_PARTIAL_REMISSION: 'In Partial Remission',
    IN_FULL_REMISSION: 'In Full Remission',
  },
  EPISODE: {
    MANIC: 'Manic',
    HYPOMANIC: 'Hypomanic',
    DEPRESSIVE: 'Depressive',
    MIXED: 'Mixed',
  },
} as const;

