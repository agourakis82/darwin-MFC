/**
 * ICD-11 ONTOLOGY MODULE - DARWIN-MFC
 * ===================================
 *
 * Comprehensive ICD-11 (International Classification of Diseases, 11th Revision)
 * mapping for clinical conditions used in primary care.
 *
 * Features:
 * - ICD-11 codes with full descriptions
 * - Cross-mapping to ICD-10, SNOMED-CT, CIAP-2
 * - Multilingual labels (9 languages)
 * - Category hierarchy
 *
 * Source: WHO ICD-11 MMS (Mortality and Morbidity Statistics)
 * Version: 2024-01
 * API: https://icd.who.int/icdapi
 */

import type { LanguageCode } from './types/ontology';

// =============================================================================
// TYPES
// =============================================================================

/**
 * ICD-11 chapter categories
 */
export type ICD11Chapter =
  | '01' // Certain infectious or parasitic diseases
  | '02' // Neoplasms
  | '03' // Diseases of the blood or blood-forming organs
  | '04' // Diseases of the immune system
  | '05' // Endocrine, nutritional or metabolic diseases
  | '06' // Mental, behavioural or neurodevelopmental disorders
  | '07' // Sleep-wake disorders
  | '08' // Diseases of the nervous system
  | '09' // Diseases of the visual system
  | '10' // Diseases of the ear or mastoid process
  | '11' // Diseases of the circulatory system
  | '12' // Diseases of the respiratory system
  | '13' // Diseases of the digestive system
  | '14' // Diseases of the skin
  | '15' // Diseases of the musculoskeletal system or connective tissue
  | '16' // Diseases of the genitourinary system
  | '17' // Conditions related to sexual health
  | '18' // Pregnancy, childbirth or the puerperium
  | '19' // Certain conditions originating in the perinatal period
  | '20' // Developmental anomalies
  | '21' // Symptoms, signs or clinical findings, NEC
  | '22' // Injury, poisoning or other consequences of external causes
  | '23' // External causes of morbidity or mortality
  | '24' // Factors influencing health status
  | 'V'  // Supplementary section for functioning assessment
  | 'X'  // Extension codes;

/**
 * ICD-11 entity structure
 */
export interface ICD11Entity {
  /** ICD-11 MMS code (e.g., "5A11" for Type 2 diabetes) */
  code: string;

  /** Foundation URI (unique identifier) */
  foundationUri?: string;

  /** Chapter code */
  chapter: ICD11Chapter;

  /** Title in multiple languages */
  title: Partial<Record<LanguageCode, string>>;

  /** Definition/description */
  definition?: Partial<Record<LanguageCode, string>>;

  /** Synonyms/inclusions */
  synonyms?: string[];

  /** Exclusions (codes to not use with this) */
  exclusions?: string[];

  /** Parent code (for hierarchy) */
  parent?: string;

  /** Child codes */
  children?: string[];

  /** Cross-mappings to other ontologies */
  crossMappings: {
    icd10?: string[];
    snomedCT?: string;
    ciap2?: string[];
    doid?: string;
    meshId?: string;
    umlsCui?: string;
  };

  /** Clinical indicators */
  clinical?: {
    /** Commonly associated symptoms */
    symptoms?: string[];
    /** First-line treatments */
    treatments?: string[];
    /** Lab tests typically ordered */
    labTests?: string[];
  };

  /** Postcoordination axes available */
  postcoordination?: {
    severity?: boolean;
    laterality?: boolean;
    temporality?: boolean;
    etiology?: boolean;
  };

  /** Last update timestamp */
  lastUpdated: string;
}

/**
 * ICD-11 search result
 */
export interface ICD11SearchResult {
  entity: ICD11Entity;
  score: number;
  matchedOn: 'code' | 'title' | 'synonym' | 'definition';
}

// =============================================================================
// CHAPTER DEFINITIONS
// =============================================================================

export const ICD11_CHAPTERS: Record<ICD11Chapter, {
  name: Partial<Record<LanguageCode, string>>;
  codeRange: string;
}> = {
  '01': {
    name: {
      pt: 'Certas doenças infecciosas ou parasitárias',
      en: 'Certain infectious or parasitic diseases',
      es: 'Ciertas enfermedades infecciosas o parasitarias',
    },
    codeRange: '1A00-1H0Z',
  },
  '02': {
    name: {
      pt: 'Neoplasias',
      en: 'Neoplasms',
      es: 'Neoplasias',
    },
    codeRange: '2A00-2F9Z',
  },
  '03': {
    name: {
      pt: 'Doenças do sangue ou órgãos hematopoiéticos',
      en: 'Diseases of the blood or blood-forming organs',
      es: 'Enfermedades de la sangre o de los órganos hematopoyéticos',
    },
    codeRange: '3A00-3C0Z',
  },
  '04': {
    name: {
      pt: 'Doenças do sistema imunológico',
      en: 'Diseases of the immune system',
      es: 'Enfermedades del sistema inmunitario',
    },
    codeRange: '4A00-4B4Z',
  },
  '05': {
    name: {
      pt: 'Doenças endócrinas, nutricionais ou metabólicas',
      en: 'Endocrine, nutritional or metabolic diseases',
      es: 'Enfermedades endocrinas, nutricionales o metabólicas',
    },
    codeRange: '5A00-5D4Z',
  },
  '06': {
    name: {
      pt: 'Transtornos mentais, comportamentais ou do neurodesenvolvimento',
      en: 'Mental, behavioural or neurodevelopmental disorders',
      es: 'Trastornos mentales, del comportamiento o del neurodesarrollo',
    },
    codeRange: '6A00-6E8Z',
  },
  '07': {
    name: {
      pt: 'Distúrbios do sono-vigília',
      en: 'Sleep-wake disorders',
      es: 'Trastornos del sueño-vigilia',
    },
    codeRange: '7A00-7B2Z',
  },
  '08': {
    name: {
      pt: 'Doenças do sistema nervoso',
      en: 'Diseases of the nervous system',
      es: 'Enfermedades del sistema nervioso',
    },
    codeRange: '8A00-8E7Z',
  },
  '09': {
    name: {
      pt: 'Doenças do sistema visual',
      en: 'Diseases of the visual system',
      es: 'Enfermedades del sistema visual',
    },
    codeRange: '9A00-9E1Z',
  },
  '10': {
    name: {
      pt: 'Doenças do ouvido ou processo mastoide',
      en: 'Diseases of the ear or mastoid process',
      es: 'Enfermedades del oído o de la apófisis mastoides',
    },
    codeRange: 'AA00-AC0Z',
  },
  '11': {
    name: {
      pt: 'Doenças do sistema circulatório',
      en: 'Diseases of the circulatory system',
      es: 'Enfermedades del sistema circulatorio',
    },
    codeRange: 'BA00-BE2Z',
  },
  '12': {
    name: {
      pt: 'Doenças do sistema respiratório',
      en: 'Diseases of the respiratory system',
      es: 'Enfermedades del sistema respiratorio',
    },
    codeRange: 'CA00-CB7Z',
  },
  '13': {
    name: {
      pt: 'Doenças do sistema digestivo',
      en: 'Diseases of the digestive system',
      es: 'Enfermedades del sistema digestivo',
    },
    codeRange: 'DA00-DE2Z',
  },
  '14': {
    name: {
      pt: 'Doenças da pele',
      en: 'Diseases of the skin',
      es: 'Enfermedades de la piel',
    },
    codeRange: 'EA00-EM0Z',
  },
  '15': {
    name: {
      pt: 'Doenças do sistema musculoesquelético ou tecido conjuntivo',
      en: 'Diseases of the musculoskeletal system or connective tissue',
      es: 'Enfermedades del sistema musculoesquelético o del tejido conectivo',
    },
    codeRange: 'FA00-FC0Z',
  },
  '16': {
    name: {
      pt: 'Doenças do sistema geniturinário',
      en: 'Diseases of the genitourinary system',
      es: 'Enfermedades del sistema genitourinario',
    },
    codeRange: 'GA00-GC8Z',
  },
  '17': {
    name: {
      pt: 'Condições relacionadas à saúde sexual',
      en: 'Conditions related to sexual health',
      es: 'Condiciones relacionadas con la salud sexual',
    },
    codeRange: 'HA00-HA8Z',
  },
  '18': {
    name: {
      pt: 'Gravidez, parto ou puerpério',
      en: 'Pregnancy, childbirth or the puerperium',
      es: 'Embarazo, parto o puerperio',
    },
    codeRange: 'JA00-JB6Z',
  },
  '19': {
    name: {
      pt: 'Certas condições originadas no período perinatal',
      en: 'Certain conditions originating in the perinatal period',
      es: 'Ciertas afecciones originadas en el período perinatal',
    },
    codeRange: 'KA00-KD5Z',
  },
  '20': {
    name: {
      pt: 'Anomalias do desenvolvimento',
      en: 'Developmental anomalies',
      es: 'Anomalías del desarrollo',
    },
    codeRange: 'LA00-LD9Z',
  },
  '21': {
    name: {
      pt: 'Sintomas, sinais ou achados clínicos, NEC',
      en: 'Symptoms, signs or clinical findings, NEC',
      es: 'Síntomas, signos o hallazgos clínicos, NEC',
    },
    codeRange: 'MA00-MH2Z',
  },
  '22': {
    name: {
      pt: 'Lesões, intoxicações ou outras consequências de causas externas',
      en: 'Injury, poisoning or other consequences of external causes',
      es: 'Lesiones, intoxicaciones u otras consecuencias de causas externas',
    },
    codeRange: 'NA00-NF2Z',
  },
  '23': {
    name: {
      pt: 'Causas externas de morbidade ou mortalidade',
      en: 'External causes of morbidity or mortality',
      es: 'Causas externas de morbilidad o mortalidad',
    },
    codeRange: 'PA00-PL2Z',
  },
  '24': {
    name: {
      pt: 'Fatores que influenciam o estado de saúde',
      en: 'Factors influencing health status',
      es: 'Factores que influyen en el estado de salud',
    },
    codeRange: 'QA00-QF4Z',
  },
  'V': {
    name: {
      pt: 'Seção suplementar para avaliação funcional',
      en: 'Supplementary section for functioning assessment',
      es: 'Sección suplementaria para evaluación del funcionamiento',
    },
    codeRange: 'VA00-VB6Z',
  },
  'X': {
    name: {
      pt: 'Códigos de extensão',
      en: 'Extension codes',
      es: 'Códigos de extensión',
    },
    codeRange: 'XA00-XY9Z',
  },
};

// =============================================================================
// ICD-11 ENTITIES DATABASE
// =============================================================================

export const ICD11_ENTITIES: ICD11Entity[] = [
  // ==========================================================================
  // CHAPTER 05: ENDOCRINE, NUTRITIONAL OR METABOLIC DISEASES
  // ==========================================================================
  {
    code: '5A10',
    chapter: '05',
    title: {
      pt: 'Diabetes mellitus tipo 1',
      en: 'Type 1 diabetes mellitus',
      es: 'Diabetes mellitus tipo 1',
      fr: 'Diabète sucré de type 1',
      ru: 'Сахарный диабет 1 типа',
      ar: 'داء السكري من النوع 1',
      zh: '1型糖尿病',
      el: 'Σακχαρώδης διαβήτης τύπου 1',
      hi: 'टाइप 1 मधुमेह',
    },
    definition: {
      pt: 'Diabetes mellitus caracterizado por destruição autoimune das células beta pancreáticas, resultando em deficiência absoluta de insulina.',
      en: 'Diabetes mellitus characterised by autoimmune destruction of pancreatic beta cells, resulting in absolute insulin deficiency.',
    },
    synonyms: ['DM1', 'IDDM', 'Diabetes juvenil', 'Diabetes insulino-dependente'],
    crossMappings: {
      icd10: ['E10'],
      snomedCT: '46635009',
      ciap2: ['T89'],
      doid: 'DOID:9744',
      meshId: 'D003922',
      umlsCui: 'C0011854',
    },
    clinical: {
      symptoms: ['poliúria', 'polidipsia', 'polifagia', 'perda de peso'],
      treatments: ['insulina basal', 'insulina bolus', 'contagem de carboidratos'],
      labTests: ['HbA1c', 'glicemia de jejum', 'peptídeo C', 'anti-GAD', 'anti-IA2'],
    },
    postcoordination: {
      severity: true,
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: '5A11',
    chapter: '05',
    title: {
      pt: 'Diabetes mellitus tipo 2',
      en: 'Type 2 diabetes mellitus',
      es: 'Diabetes mellitus tipo 2',
      fr: 'Diabète sucré de type 2',
      ru: 'Сахарный диабет 2 типа',
      ar: 'داء السكري من النوع 2',
      zh: '2型糖尿病',
      el: 'Σακχαρώδης διαβήτης τύπου 2',
      hi: 'टाइप 2 मधुमेह',
    },
    definition: {
      pt: 'Diabetes mellitus caracterizado por resistência à insulina e/ou deficiência relativa de insulina, geralmente associado a obesidade.',
      en: 'Diabetes mellitus characterised by insulin resistance and/or relative insulin deficiency, often associated with obesity.',
    },
    synonyms: ['DM2', 'NIDDM', 'Diabetes do adulto', 'Diabetes não insulino-dependente'],
    crossMappings: {
      icd10: ['E11'],
      snomedCT: '44054006',
      ciap2: ['T90'],
      doid: 'DOID:9352',
      meshId: 'D003924',
      umlsCui: 'C0011860',
    },
    clinical: {
      symptoms: ['assintomático inicial', 'poliúria', 'polidipsia', 'fadiga'],
      treatments: ['metformina', 'SGLT2i', 'GLP-1 RA', 'insulina'],
      labTests: ['HbA1c', 'glicemia de jejum', 'TOTG', 'perfil lipídico', 'creatinina'],
    },
    postcoordination: {
      severity: true,
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: '5A13',
    chapter: '05',
    title: {
      pt: 'Diabetes mellitus gestacional',
      en: 'Gestational diabetes mellitus',
      es: 'Diabetes mellitus gestacional',
      fr: 'Diabète gestationnel',
      ru: 'Гестационный сахарный диабет',
      ar: 'سكري الحمل',
      zh: '妊娠期糖尿病',
      el: 'Διαβήτης κύησης',
      hi: 'गर्भावधि मधुमेह',
    },
    definition: {
      pt: 'Diabetes diagnosticado durante a gravidez que não atende critérios de diabetes prévio.',
      en: 'Diabetes diagnosed during pregnancy that does not meet criteria for pre-existing diabetes.',
    },
    synonyms: ['DMG', 'Diabetes na gravidez'],
    crossMappings: {
      icd10: ['O24.4'],
      snomedCT: '11687002',
      ciap2: ['W84'],
      doid: 'DOID:11714',
      meshId: 'D016640',
      umlsCui: 'C0085207',
    },
    clinical: {
      symptoms: ['assintomático', 'macrossomia fetal'],
      treatments: ['dieta', 'metformina', 'insulina'],
      labTests: ['TOTG 75g', 'glicemia de jejum', 'HbA1c'],
    },
    postcoordination: {
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: '5B80',
    chapter: '05',
    title: {
      pt: 'Obesidade',
      en: 'Obesity',
      es: 'Obesidad',
      fr: 'Obésité',
      ru: 'Ожирение',
      ar: 'السمنة',
      zh: '肥胖症',
      el: 'Παχυσαρκία',
      hi: 'मोटापा',
    },
    definition: {
      pt: 'Acúmulo anormal ou excessivo de gordura corporal que apresenta risco à saúde.',
      en: 'Abnormal or excessive body fat accumulation that presents a risk to health.',
    },
    synonyms: ['Obesidade comum', 'Excesso de peso severo'],
    crossMappings: {
      icd10: ['E66'],
      snomedCT: '414916001',
      ciap2: ['T82'],
      doid: 'DOID:9970',
      meshId: 'D009765',
      umlsCui: 'C0028754',
    },
    clinical: {
      symptoms: ['IMC ≥30', 'circunferência abdominal elevada'],
      treatments: ['mudança de estilo de vida', 'GLP-1 RA', 'cirurgia bariátrica'],
      labTests: ['perfil lipídico', 'glicemia', 'HbA1c', 'função hepática'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: '5A00',
    chapter: '05',
    title: {
      pt: 'Hipotireoidismo',
      en: 'Hypothyroidism',
      es: 'Hipotiroidismo',
      fr: 'Hypothyroïdie',
      ru: 'Гипотиреоз',
      ar: 'قصور الغدة الدرقية',
      zh: '甲状腺功能减退症',
      el: 'Υποθυρεοειδισμός',
      hi: 'हाइपोथायरायडिज्म',
    },
    definition: {
      pt: 'Deficiência de hormônios tireoidianos, resultando em diminuição do metabolismo.',
      en: 'Deficiency of thyroid hormones, resulting in decreased metabolism.',
    },
    synonyms: ['Mixedema', 'Tireoidite de Hashimoto'],
    crossMappings: {
      icd10: ['E03'],
      snomedCT: '40930008',
      ciap2: ['T86'],
      doid: 'DOID:1459',
      meshId: 'D007037',
      umlsCui: 'C0020676',
    },
    clinical: {
      symptoms: ['fadiga', 'ganho de peso', 'intolerância ao frio', 'constipação'],
      treatments: ['levotiroxina'],
      labTests: ['TSH', 'T4 livre', 'anti-TPO', 'anti-tireoglobulina'],
    },
    postcoordination: {
      etiology: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: '5A01',
    chapter: '05',
    title: {
      pt: 'Hipertireoidismo',
      en: 'Hyperthyroidism',
      es: 'Hipertiroidismo',
      fr: 'Hyperthyroïdie',
      ru: 'Гипертиреоз',
      ar: 'فرط نشاط الغدة الدرقية',
      zh: '甲状腺功能亢进症',
      el: 'Υπερθυρεοειδισμός',
      hi: 'हाइपरथायरायडिज्म',
    },
    definition: {
      pt: 'Excesso de hormônios tireoidianos, resultando em aumento do metabolismo.',
      en: 'Excess of thyroid hormones, resulting in increased metabolism.',
    },
    synonyms: ['Tireotoxicose', 'Doença de Graves', 'Bócio tóxico'],
    crossMappings: {
      icd10: ['E05'],
      snomedCT: '34486009',
      ciap2: ['T85'],
      doid: 'DOID:7998',
      meshId: 'D006980',
      umlsCui: 'C0020550',
    },
    clinical: {
      symptoms: ['taquicardia', 'perda de peso', 'tremor', 'intolerância ao calor'],
      treatments: ['metimazol', 'propiltiouracil', 'iodo radioativo', 'tireoidectomia'],
      labTests: ['TSH', 'T4 livre', 'T3', 'TRAb', 'anti-TPO'],
    },
    postcoordination: {
      etiology: true,
    },
    lastUpdated: '2024-01-01',
  },

  // ==========================================================================
  // CHAPTER 11: DISEASES OF THE CIRCULATORY SYSTEM
  // ==========================================================================
  {
    code: 'BA00',
    chapter: '11',
    title: {
      pt: 'Hipertensão essencial (primária)',
      en: 'Essential (primary) hypertension',
      es: 'Hipertensión esencial (primaria)',
      fr: 'Hypertension essentielle (primaire)',
      ru: 'Эссенциальная (первичная) гипертензия',
      ar: 'ارتفاع ضغط الدم الأساسي',
      zh: '原发性高血压',
      el: 'Ιδιοπαθής (πρωτοπαθής) υπέρταση',
      hi: 'आवश्यक (प्राथमिक) उच्च रक्तचाप',
    },
    definition: {
      pt: 'Pressão arterial persistentemente elevada sem causa identificável.',
      en: 'Persistently elevated blood pressure without identifiable cause.',
    },
    synonyms: ['HAS', 'Hipertensão arterial sistêmica', 'Pressão alta'],
    crossMappings: {
      icd10: ['I10'],
      snomedCT: '59621000',
      ciap2: ['K86', 'K87'],
      doid: 'DOID:10825',
      meshId: 'D006973',
      umlsCui: 'C0085580',
    },
    clinical: {
      symptoms: ['assintomático', 'cefaleia', 'epistaxe'],
      treatments: ['IECA', 'BRA', 'tiazídico', 'BCC', 'betabloqueador'],
      labTests: ['creatinina', 'potássio', 'glicemia', 'perfil lipídico', 'EAS', 'ECG'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'BA01',
    chapter: '11',
    title: {
      pt: 'Hipertensão secundária',
      en: 'Secondary hypertension',
      es: 'Hipertensión secundaria',
      fr: 'Hypertension secondaire',
      ru: 'Вторичная гипертензия',
      ar: 'ارتفاع ضغط الدم الثانوي',
      zh: '继发性高血压',
      el: 'Δευτεροπαθής υπέρταση',
      hi: 'द्वितीयक उच्च रक्तचाप',
    },
    definition: {
      pt: 'Hipertensão com causa identificável, como doença renal ou endócrina.',
      en: 'Hypertension with identifiable cause, such as renal or endocrine disease.',
    },
    synonyms: ['Hipertensão renovascular', 'Hiperaldosteronismo'],
    crossMappings: {
      icd10: ['I15'],
      snomedCT: '123799005',
      ciap2: ['K86'],
      doid: 'DOID:10825',
      meshId: 'D006973',
      umlsCui: 'C0020545',
    },
    clinical: {
      symptoms: ['HAS resistente', 'hipocalemia', 'sopro abdominal'],
      treatments: ['tratar causa base', 'anti-hipertensivos'],
      labTests: ['aldosterona', 'renina', 'metanefrinas', 'cortisol', 'angioTC renal'],
    },
    postcoordination: {
      etiology: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'BA80',
    chapter: '11',
    title: {
      pt: 'Insuficiência cardíaca',
      en: 'Heart failure',
      es: 'Insuficiencia cardíaca',
      fr: 'Insuffisance cardiaque',
      ru: 'Сердечная недостаточность',
      ar: 'فشل القلب',
      zh: '心力衰竭',
      el: 'Καρδιακή ανεπάρκεια',
      hi: 'हृदय विफलता',
    },
    definition: {
      pt: 'Síndrome clínica onde o coração é incapaz de fornecer débito cardíaco adequado às demandas metabólicas.',
      en: 'Clinical syndrome where the heart is unable to provide adequate cardiac output for metabolic demands.',
    },
    synonyms: ['IC', 'ICC', 'Insuficiência cardíaca congestiva'],
    crossMappings: {
      icd10: ['I50'],
      snomedCT: '84114007',
      ciap2: ['K77'],
      doid: 'DOID:6000',
      meshId: 'D006333',
      umlsCui: 'C0018801',
    },
    clinical: {
      symptoms: ['dispneia', 'edema', 'ortopneia', 'dispneia paroxística noturna'],
      treatments: ['IECA/BRA', 'betabloqueador', 'espironolactona', 'SGLT2i', 'diurético'],
      labTests: ['BNP', 'NT-proBNP', 'ecocardiograma', 'RX tórax', 'ECG'],
    },
    postcoordination: {
      severity: true,
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'BA41',
    chapter: '11',
    title: {
      pt: 'Fibrilação atrial',
      en: 'Atrial fibrillation',
      es: 'Fibrilación auricular',
      fr: 'Fibrillation auriculaire',
      ru: 'Фибрилляция предсердий',
      ar: 'الرجفان الأذيني',
      zh: '心房颤动',
      el: 'Κολπική μαρμαρυγή',
      hi: 'आलिंद फिब्रिलेशन',
    },
    definition: {
      pt: 'Arritmia supraventricular caracterizada por ativação atrial desorganizada e irregular.',
      en: 'Supraventricular arrhythmia characterised by disorganised and irregular atrial activation.',
    },
    synonyms: ['FA', 'Fibrilação auricular'],
    crossMappings: {
      icd10: ['I48'],
      snomedCT: '49436004',
      ciap2: ['K78'],
      doid: 'DOID:0060224',
      meshId: 'D001281',
      umlsCui: 'C0004238',
    },
    clinical: {
      symptoms: ['palpitações', 'dispneia', 'fadiga', 'assintomático'],
      treatments: ['anticoagulação', 'controle de frequência', 'cardioversão', 'ablação'],
      labTests: ['ECG', 'Holter', 'ecocardiograma', 'função tireoidiana'],
    },
    postcoordination: {
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'BA81',
    chapter: '11',
    title: {
      pt: 'Doença arterial coronariana',
      en: 'Coronary artery disease',
      es: 'Enfermedad arterial coronaria',
      fr: 'Maladie coronarienne',
      ru: 'Ишемическая болезнь сердца',
      ar: 'مرض الشريان التاجي',
      zh: '冠状动脉疾病',
      el: 'Στεφανιαία νόσος',
      hi: 'कोरोनरी धमनी रोग',
    },
    definition: {
      pt: 'Doença causada por aterosclerose das artérias coronárias, resultando em isquemia miocárdica.',
      en: 'Disease caused by atherosclerosis of coronary arteries, resulting in myocardial ischaemia.',
    },
    synonyms: ['DAC', 'Doença isquêmica do coração', 'Angina'],
    crossMappings: {
      icd10: ['I25'],
      snomedCT: '53741008',
      ciap2: ['K74', 'K76'],
      doid: 'DOID:3393',
      meshId: 'D003324',
      umlsCui: 'C0010068',
    },
    clinical: {
      symptoms: ['dor torácica', 'dispneia', 'fadiga'],
      treatments: ['AAS', 'estatina', 'betabloqueador', 'nitrato', 'ICP', 'CRVM'],
      labTests: ['ECG', 'teste ergométrico', 'cintilografia', 'coronariografia', 'troponina'],
    },
    postcoordination: {
      severity: true,
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'BA82',
    chapter: '11',
    title: {
      pt: 'Infarto agudo do miocárdio',
      en: 'Acute myocardial infarction',
      es: 'Infarto agudo de miocardio',
      fr: 'Infarctus aigu du myocarde',
      ru: 'Острый инфаркт миокарда',
      ar: 'احتشاء عضلة القلب الحاد',
      zh: '急性心肌梗死',
      el: 'Οξύ έμφραγμα μυοκαρδίου',
      hi: 'तीव्र रोधगलन',
    },
    definition: {
      pt: 'Necrose miocárdica aguda devido a isquemia prolongada.',
      en: 'Acute myocardial necrosis due to prolonged ischaemia.',
    },
    synonyms: ['IAM', 'Infarto', 'Ataque cardíaco'],
    crossMappings: {
      icd10: ['I21'],
      snomedCT: '22298006',
      ciap2: ['K75'],
      doid: 'DOID:9408',
      meshId: 'D009203',
      umlsCui: 'C0027051',
    },
    clinical: {
      symptoms: ['dor torácica', 'dispneia', 'sudorese', 'náusea'],
      treatments: ['ICP primária', 'trombólise', 'AAS', 'heparina', 'P2Y12i'],
      labTests: ['troponina', 'ECG seriado', 'ecocardiograma', 'coronariografia'],
    },
    postcoordination: {
      laterality: true,
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'BA90',
    chapter: '11',
    title: {
      pt: 'Acidente vascular cerebral isquêmico',
      en: 'Ischaemic stroke',
      es: 'Accidente cerebrovascular isquémico',
      fr: 'Accident vasculaire cérébral ischémique',
      ru: 'Ишемический инсульт',
      ar: 'السكتة الدماغية الإقفارية',
      zh: '缺血性卒中',
      el: 'Ισχαιμικό εγκεφαλικό επεισόδιο',
      hi: 'इस्केमिक स्ट्रोक',
    },
    definition: {
      pt: 'Déficit neurológico focal agudo causado por isquemia cerebral.',
      en: 'Acute focal neurological deficit caused by cerebral ischaemia.',
    },
    synonyms: ['AVC isquêmico', 'AVCI', 'Derrame cerebral'],
    crossMappings: {
      icd10: ['I63'],
      snomedCT: '422504002',
      ciap2: ['K90'],
      doid: 'DOID:9455',
      meshId: 'D002544',
      umlsCui: 'C0007785',
    },
    clinical: {
      symptoms: ['hemiparesia', 'afasia', 'disartria', 'hemianopsia'],
      treatments: ['trombólise', 'trombectomia', 'AAS', 'anticoagulação (se FA)'],
      labTests: ['TC crânio', 'RNM crânio', 'angiografia', 'ECG', 'ecocardiograma'],
    },
    postcoordination: {
      laterality: true,
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },

  // ==========================================================================
  // CHAPTER 06: MENTAL, BEHAVIOURAL OR NEURODEVELOPMENTAL DISORDERS
  // ==========================================================================
  {
    code: '6A70',
    chapter: '06',
    title: {
      pt: 'Episódio depressivo',
      en: 'Depressive episode',
      es: 'Episodio depresivo',
      fr: 'Épisode dépressif',
      ru: 'Депрессивный эпизод',
      ar: 'نوبة اكتئاب',
      zh: '抑郁发作',
      el: 'Καταθλιπτικό επεισόδιο',
      hi: 'अवसादग्रस्तता प्रकरण',
    },
    definition: {
      pt: 'Período de humor deprimido ou perda de interesse, acompanhado de outros sintomas cognitivos, comportamentais ou neurovegetativos.',
      en: 'Period of depressed mood or loss of interest, accompanied by other cognitive, behavioural, or neurovegetative symptoms.',
    },
    synonyms: ['Depressão', 'Transtorno depressivo maior'],
    crossMappings: {
      icd10: ['F32'],
      snomedCT: '35489007',
      ciap2: ['P76'],
      doid: 'DOID:1596',
      meshId: 'D003866',
      umlsCui: 'C0011570',
    },
    clinical: {
      symptoms: ['humor deprimido', 'anedonia', 'fadiga', 'insônia', 'ideação suicida'],
      treatments: ['ISRS', 'IRSN', 'psicoterapia', 'ECT'],
      labTests: ['TSH', 'hemograma', 'função hepática'],
    },
    postcoordination: {
      severity: true,
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: '6A80',
    chapter: '06',
    title: {
      pt: 'Transtorno de ansiedade generalizada',
      en: 'Generalised anxiety disorder',
      es: 'Trastorno de ansiedad generalizada',
      fr: 'Trouble anxieux généralisé',
      ru: 'Генерализованное тревожное расстройство',
      ar: 'اضطراب القلق المعمم',
      zh: '广泛性焦虑障碍',
      el: 'Γενικευμένη αγχώδης διαταραχή',
      hi: 'सामान्यीकृत चिंता विकार',
    },
    definition: {
      pt: 'Ansiedade persistente e excessiva sobre múltiplas áreas da vida, difícil de controlar.',
      en: 'Persistent and excessive anxiety about multiple areas of life, difficult to control.',
    },
    synonyms: ['TAG', 'Ansiedade crônica'],
    crossMappings: {
      icd10: ['F41.1'],
      snomedCT: '21897009',
      ciap2: ['P74'],
      doid: 'DOID:14320',
      meshId: 'D001008',
      umlsCui: 'C0003467',
    },
    clinical: {
      symptoms: ['preocupação excessiva', 'tensão muscular', 'irritabilidade', 'insônia'],
      treatments: ['ISRS', 'IRSN', 'buspirona', 'psicoterapia TCC'],
      labTests: ['TSH', 'hemograma'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: '6B40',
    chapter: '06',
    title: {
      pt: 'Transtorno de déficit de atenção e hiperatividade',
      en: 'Attention deficit hyperactivity disorder',
      es: 'Trastorno por déficit de atención e hiperactividad',
      fr: 'Trouble du déficit de l\'attention avec hyperactivité',
      ru: 'Синдром дефицита внимания с гиперактивностью',
      ar: 'اضطراب نقص الانتباه وفرط النشاط',
      zh: '注意缺陷多动障碍',
      el: 'Διαταραχή ελλειμματικής προσοχής-υπερκινητικότητας',
      hi: 'ध्यान घाटे की सक्रियता विकार',
    },
    definition: {
      pt: 'Transtorno do neurodesenvolvimento caracterizado por padrão persistente de desatenção e/ou hiperatividade-impulsividade.',
      en: 'Neurodevelopmental disorder characterised by persistent pattern of inattention and/or hyperactivity-impulsivity.',
    },
    synonyms: ['TDAH', 'DDA', 'Hiperatividade'],
    crossMappings: {
      icd10: ['F90'],
      snomedCT: '406506008',
      ciap2: ['P81'],
      doid: 'DOID:1094',
      meshId: 'D001289',
      umlsCui: 'C1263846',
    },
    clinical: {
      symptoms: ['desatenção', 'hiperatividade', 'impulsividade'],
      treatments: ['metilfenidato', 'lisdexanfetamina', 'atomoxetina', 'psicoeducação'],
      labTests: ['avaliação neuropsicológica'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },

  // ==========================================================================
  // CHAPTER 12: DISEASES OF THE RESPIRATORY SYSTEM
  // ==========================================================================
  {
    code: 'CA20',
    chapter: '12',
    title: {
      pt: 'Asma',
      en: 'Asthma',
      es: 'Asma',
      fr: 'Asthme',
      ru: 'Астма',
      ar: 'الربو',
      zh: '哮喘',
      el: 'Άσθμα',
      hi: 'दमा',
    },
    definition: {
      pt: 'Doença inflamatória crônica das vias aéreas com hiper-responsividade brônquica e obstrução reversível.',
      en: 'Chronic inflammatory airway disease with bronchial hyperresponsiveness and reversible obstruction.',
    },
    synonyms: ['Asma brônquica', 'Broncoespasmo'],
    crossMappings: {
      icd10: ['J45'],
      snomedCT: '195967001',
      ciap2: ['R96'],
      doid: 'DOID:2841',
      meshId: 'D001249',
      umlsCui: 'C0004096',
    },
    clinical: {
      symptoms: ['dispneia', 'sibilância', 'tosse', 'opressão torácica'],
      treatments: ['CI', 'LABA', 'SABA', 'antileucotrienos', 'biológicos'],
      labTests: ['espirometria', 'pico de fluxo', 'teste de broncoprovocação'],
    },
    postcoordination: {
      severity: true,
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'CA22',
    chapter: '12',
    title: {
      pt: 'Doença pulmonar obstrutiva crônica',
      en: 'Chronic obstructive pulmonary disease',
      es: 'Enfermedad pulmonar obstructiva crónica',
      fr: 'Bronchopneumopathie chronique obstructive',
      ru: 'Хроническая обструктивная болезнь легких',
      ar: 'مرض الانسداد الرئوي المزمن',
      zh: '慢性阻塞性肺疾病',
      el: 'Χρόνια αποφρακτική πνευμονοπάθεια',
      hi: 'क्रॉनिक ऑब्सट्रक्टिव पल्मोनरी डिजीज',
    },
    definition: {
      pt: 'Doença respiratória prevenível e tratável com limitação persistente do fluxo aéreo, geralmente progressiva.',
      en: 'Preventable and treatable respiratory disease with persistent airflow limitation, usually progressive.',
    },
    synonyms: ['DPOC', 'Enfisema', 'Bronquite crônica'],
    crossMappings: {
      icd10: ['J44'],
      snomedCT: '13645005',
      ciap2: ['R95'],
      doid: 'DOID:3083',
      meshId: 'D029424',
      umlsCui: 'C0024117',
    },
    clinical: {
      symptoms: ['dispneia progressiva', 'tosse crônica', 'expectoração'],
      treatments: ['LAMA', 'LABA', 'CI', 'oxigênio', 'reabilitação pulmonar'],
      labTests: ['espirometria', 'RX tórax', 'gasometria', 'TC tórax'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'CA40',
    chapter: '12',
    title: {
      pt: 'Pneumonia',
      en: 'Pneumonia',
      es: 'Neumonía',
      fr: 'Pneumonie',
      ru: 'Пневмония',
      ar: 'الالتهاب الرئوي',
      zh: '肺炎',
      el: 'Πνευμονία',
      hi: 'निमोनिया',
    },
    definition: {
      pt: 'Infecção do parênquima pulmonar causando inflamação e consolidação.',
      en: 'Infection of lung parenchyma causing inflammation and consolidation.',
    },
    synonyms: ['Pneumonia adquirida na comunidade', 'PAC'],
    crossMappings: {
      icd10: ['J18'],
      snomedCT: '233604007',
      ciap2: ['R81'],
      doid: 'DOID:552',
      meshId: 'D011014',
      umlsCui: 'C0032285',
    },
    clinical: {
      symptoms: ['febre', 'tosse', 'dispneia', 'dor torácica pleurítica'],
      treatments: ['amoxicilina', 'azitromicina', 'levofloxacino'],
      labTests: ['RX tórax', 'hemograma', 'PCR', 'cultura de escarro'],
    },
    postcoordination: {
      etiology: true,
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },

  // ==========================================================================
  // CHAPTER 01: INFECTIOUS DISEASES
  // ==========================================================================
  {
    code: '1A62',
    chapter: '01',
    title: {
      pt: 'Tuberculose pulmonar',
      en: 'Pulmonary tuberculosis',
      es: 'Tuberculosis pulmonar',
      fr: 'Tuberculose pulmonaire',
      ru: 'Туберкулез легких',
      ar: 'السل الرئوي',
      zh: '肺结核',
      el: 'Πνευμονική φυματίωση',
      hi: 'फुफ्फुसीय तपेदिक',
    },
    definition: {
      pt: 'Infecção pulmonar por Mycobacterium tuberculosis.',
      en: 'Pulmonary infection by Mycobacterium tuberculosis.',
    },
    synonyms: ['TB pulmonar', 'TBC', 'Tísica'],
    crossMappings: {
      icd10: ['A15'],
      snomedCT: '154283005',
      ciap2: ['A70'],
      doid: 'DOID:2957',
      meshId: 'D014397',
      umlsCui: 'C0041327',
    },
    clinical: {
      symptoms: ['tosse crônica', 'hemoptise', 'febre', 'sudorese noturna', 'perda de peso'],
      treatments: ['RIPE', 'rifampicina', 'isoniazida', 'pirazinamida', 'etambutol'],
      labTests: ['baciloscopia', 'TRM-TB', 'cultura', 'RX tórax', 'PPD'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: '1F2A',
    chapter: '01',
    title: {
      pt: 'Dengue',
      en: 'Dengue',
      es: 'Dengue',
      fr: 'Dengue',
      ru: 'Денге',
      ar: 'حمى الضنك',
      zh: '登革热',
      el: 'Δάγκειος πυρετός',
      hi: 'डेंगू',
    },
    definition: {
      pt: 'Doença febril aguda causada pelo vírus da dengue, transmitida pelo Aedes aegypti.',
      en: 'Acute febrile illness caused by dengue virus, transmitted by Aedes aegypti.',
    },
    synonyms: ['Febre quebra-ossos', 'Dengue clássica', 'Dengue grave'],
    crossMappings: {
      icd10: ['A90', 'A91'],
      snomedCT: '38362002',
      ciap2: ['A77'],
      doid: 'DOID:11205',
      meshId: 'D003715',
      umlsCui: 'C0011311',
    },
    clinical: {
      symptoms: ['febre alta', 'mialgia', 'cefaleia', 'dor retroorbital', 'rash'],
      treatments: ['hidratação', 'sintomáticos', 'evitar AINEs'],
      labTests: ['hemograma', 'plaquetas', 'NS1', 'sorologia IgM/IgG'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },

  // ==========================================================================
  // CHAPTER 16: DISEASES OF THE GENITOURINARY SYSTEM
  // ==========================================================================
  {
    code: 'GB61',
    chapter: '16',
    title: {
      pt: 'Doença renal crônica',
      en: 'Chronic kidney disease',
      es: 'Enfermedad renal crónica',
      fr: 'Maladie rénale chronique',
      ru: 'Хроническая болезнь почек',
      ar: 'مرض الكلى المزمن',
      zh: '慢性肾脏病',
      el: 'Χρόνια νεφρική νόσος',
      hi: 'क्रोनिक किडनी रोग',
    },
    definition: {
      pt: 'Alteração estrutural ou funcional dos rins por >3 meses, com implicações para a saúde.',
      en: 'Structural or functional kidney abnormality for >3 months, with health implications.',
    },
    synonyms: ['DRC', 'Insuficiência renal crônica', 'Nefropatia crônica'],
    crossMappings: {
      icd10: ['N18'],
      snomedCT: '709044004',
      ciap2: ['U99'],
      doid: 'DOID:784',
      meshId: 'D051436',
      umlsCui: 'C1561643',
    },
    clinical: {
      symptoms: ['assintomático (inicial)', 'fadiga', 'edema', 'náusea'],
      treatments: ['IECA/BRA', 'SGLT2i', 'controle de PA e glicemia', 'diálise'],
      labTests: ['creatinina', 'TFG', 'albuminúria', 'EAS', 'potássio', 'fósforo'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'GC00',
    chapter: '16',
    title: {
      pt: 'Infecção do trato urinário',
      en: 'Urinary tract infection',
      es: 'Infección del tracto urinario',
      fr: 'Infection des voies urinaires',
      ru: 'Инфекция мочевыводящих путей',
      ar: 'عدوى المسالك البولية',
      zh: '尿路感染',
      el: 'Λοίμωξη ουροποιητικού συστήματος',
      hi: 'मूत्र पथ संक्रमण',
    },
    definition: {
      pt: 'Infecção bacteriana do trato urinário, incluindo cistite e pielonefrite.',
      en: 'Bacterial infection of urinary tract, including cystitis and pyelonephritis.',
    },
    synonyms: ['ITU', 'Cistite', 'Pielonefrite'],
    crossMappings: {
      icd10: ['N39.0'],
      snomedCT: '68566005',
      ciap2: ['U71'],
      doid: 'DOID:13148',
      meshId: 'D014552',
      umlsCui: 'C0042029',
    },
    clinical: {
      symptoms: ['disúria', 'polaciúria', 'urgência', 'dor suprapúbica', 'febre (pielonefrite)'],
      treatments: ['nitrofurantoína', 'fosfomicina', 'SMX-TMP', 'ciprofloxacino'],
      labTests: ['EAS', 'urocultura', 'creatinina'],
    },
    postcoordination: {
      severity: true,
      temporality: true,
    },
    lastUpdated: '2024-01-01',
  },

  // ==========================================================================
  // CHAPTER 13: DISEASES OF THE DIGESTIVE SYSTEM
  // ==========================================================================
  {
    code: 'DA60',
    chapter: '13',
    title: {
      pt: 'Doença do refluxo gastroesofágico',
      en: 'Gastro-oesophageal reflux disease',
      es: 'Enfermedad por reflujo gastroesofágico',
      fr: 'Reflux gastro-oesophagien',
      ru: 'Гастроэзофагеальная рефлюксная болезнь',
      ar: 'مرض الارتجاع المعدي المريئي',
      zh: '胃食管反流病',
      el: 'Γαστροοισοφαγική παλινδρόμηση',
      hi: 'गैस्ट्रोइसोफेजियल रिफ्लक्स रोग',
    },
    definition: {
      pt: 'Condição onde o refluxo do conteúdo gástrico causa sintomas ou complicações.',
      en: 'Condition where reflux of gastric contents causes symptoms or complications.',
    },
    synonyms: ['DRGE', 'Refluxo', 'Azia crônica'],
    crossMappings: {
      icd10: ['K21'],
      snomedCT: '235595009',
      ciap2: ['D84'],
      doid: 'DOID:8534',
      meshId: 'D005764',
      umlsCui: 'C0017168',
    },
    clinical: {
      symptoms: ['pirose', 'regurgitação', 'disfagia', 'tosse crônica'],
      treatments: ['IBP', 'medidas comportamentais', 'antiácidos'],
      labTests: ['EDA', 'pHmetria', 'manometria'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'DB30',
    chapter: '13',
    title: {
      pt: 'Cirrose hepática',
      en: 'Cirrhosis of liver',
      es: 'Cirrosis hepática',
      fr: 'Cirrhose du foie',
      ru: 'Цирроз печени',
      ar: 'تليف الكبد',
      zh: '肝硬化',
      el: 'Κίρρωση ήπατος',
      hi: 'जिगर का सिरोसिस',
    },
    definition: {
      pt: 'Estágio final de doença hepática crônica com fibrose difusa e formação de nódulos.',
      en: 'End stage of chronic liver disease with diffuse fibrosis and nodule formation.',
    },
    synonyms: ['Hepatopatia crônica avançada', 'Doença hepática crônica'],
    crossMappings: {
      icd10: ['K74'],
      snomedCT: '19943007',
      ciap2: ['D97'],
      doid: 'DOID:5082',
      meshId: 'D008103',
      umlsCui: 'C0023890',
    },
    clinical: {
      symptoms: ['icterícia', 'ascite', 'encefalopatia', 'varizes esofágicas'],
      treatments: ['tratar etiologia', 'betabloqueador', 'espironolactona', 'transplante'],
      labTests: ['TGO', 'TGP', 'albumina', 'INR', 'bilirrubinas', 'elastografia'],
    },
    postcoordination: {
      severity: true,
      etiology: true,
    },
    lastUpdated: '2024-01-01',
  },

  // ==========================================================================
  // CHAPTER 15: DISEASES OF THE MUSCULOSKELETAL SYSTEM
  // ==========================================================================
  {
    code: 'FA00',
    chapter: '15',
    title: {
      pt: 'Artrite reumatoide',
      en: 'Rheumatoid arthritis',
      es: 'Artritis reumatoide',
      fr: 'Polyarthrite rhumatoïde',
      ru: 'Ревматоидный артрит',
      ar: 'التهاب المفاصل الروماتويدي',
      zh: '类风湿关节炎',
      el: 'Ρευματοειδής αρθρίτιδα',
      hi: 'रूमेटाइड गठिया',
    },
    definition: {
      pt: 'Doença autoimune sistêmica caracterizada por poliartrite simétrica crônica.',
      en: 'Systemic autoimmune disease characterised by chronic symmetric polyarthritis.',
    },
    synonyms: ['AR', 'Poliartrite reumatoide'],
    crossMappings: {
      icd10: ['M05', 'M06'],
      snomedCT: '69896004',
      ciap2: ['L88'],
      doid: 'DOID:7148',
      meshId: 'D001172',
      umlsCui: 'C0003873',
    },
    clinical: {
      symptoms: ['artralgia', 'rigidez matinal', 'sinovite', 'deformidades'],
      treatments: ['metotrexato', 'sulfassalazina', 'biológicos', 'corticoide'],
      labTests: ['FR', 'anti-CCP', 'VHS', 'PCR', 'RX mãos e pés'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'FA24',
    chapter: '15',
    title: {
      pt: 'Osteoartrite',
      en: 'Osteoarthritis',
      es: 'Osteoartritis',
      fr: 'Arthrose',
      ru: 'Остеоартрит',
      ar: 'الفصال العظمي',
      zh: '骨关节炎',
      el: 'Οστεοαρθρίτιδα',
      hi: 'पुराने ऑस्टियोआर्थराइटिस',
    },
    definition: {
      pt: 'Doença articular degenerativa com perda de cartilagem e remodelação óssea.',
      en: 'Degenerative joint disease with cartilage loss and bone remodelling.',
    },
    synonyms: ['OA', 'Artrose', 'Doença articular degenerativa'],
    crossMappings: {
      icd10: ['M15', 'M16', 'M17', 'M18', 'M19'],
      snomedCT: '396275006',
      ciap2: ['L89', 'L90', 'L91'],
      doid: 'DOID:8398',
      meshId: 'D010003',
      umlsCui: 'C0029408',
    },
    clinical: {
      symptoms: ['dor articular', 'rigidez', 'crepitação', 'limitação funcional'],
      treatments: ['analgésicos', 'AINEs', 'fisioterapia', 'artroplastia'],
      labTests: ['RX articular', 'RNM (se necessário)'],
    },
    postcoordination: {
      laterality: true,
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
  {
    code: 'FA90',
    chapter: '15',
    title: {
      pt: 'Osteoporose',
      en: 'Osteoporosis',
      es: 'Osteoporosis',
      fr: 'Ostéoporose',
      ru: 'Остеопороз',
      ar: 'هشاشة العظام',
      zh: '骨质疏松症',
      el: 'Οστεοπόρωση',
      hi: 'ऑस्टियोपोरोसिस',
    },
    definition: {
      pt: 'Doença óssea sistêmica com diminuição da densidade mineral óssea e deterioração da microarquitetura.',
      en: 'Systemic bone disease with decreased bone mineral density and microarchitecture deterioration.',
    },
    synonyms: ['Osteopenia avançada', 'Fragilidade óssea'],
    crossMappings: {
      icd10: ['M80', 'M81'],
      snomedCT: '64859006',
      ciap2: ['L95'],
      doid: 'DOID:11476',
      meshId: 'D010024',
      umlsCui: 'C0029456',
    },
    clinical: {
      symptoms: ['assintomático', 'fraturas de fragilidade', 'perda de altura'],
      treatments: ['bifosfonatos', 'denosumabe', 'cálcio', 'vitamina D'],
      labTests: ['densitometria óssea', 'cálcio', 'vitamina D', 'PTH'],
    },
    postcoordination: {
      severity: true,
    },
    lastUpdated: '2024-01-01',
  },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get ICD-11 entity by code
 */
export function getICD11ByCode(code: string): ICD11Entity | undefined {
  return ICD11_ENTITIES.find(e => e.code.toLowerCase() === code.toLowerCase());
}

/**
 * Get ICD-11 entities by ICD-10 code (cross-mapping)
 */
export function getICD11ByICD10(icd10Code: string): ICD11Entity[] {
  return ICD11_ENTITIES.filter(e =>
    e.crossMappings.icd10?.some(c => c.toLowerCase() === icd10Code.toLowerCase())
  );
}

/**
 * Get ICD-11 entities by SNOMED-CT code
 */
export function getICD11BySNOMED(snomedCode: string): ICD11Entity | undefined {
  return ICD11_ENTITIES.find(e => e.crossMappings.snomedCT === snomedCode);
}

/**
 * Get ICD-11 entities by CIAP-2 code
 */
export function getICD11ByCIAP2(ciap2Code: string): ICD11Entity[] {
  return ICD11_ENTITIES.filter(e =>
    e.crossMappings.ciap2?.some(c => c.toLowerCase() === ciap2Code.toLowerCase())
  );
}

/**
 * Get ICD-11 entities by chapter
 */
export function getICD11ByChapter(chapter: ICD11Chapter): ICD11Entity[] {
  return ICD11_ENTITIES.filter(e => e.chapter === chapter);
}

/**
 * Search ICD-11 entities by text (title, synonyms, definition)
 */
export function searchICD11(
  query: string,
  options: {
    language?: LanguageCode;
    chapter?: ICD11Chapter;
    limit?: number;
  } = {}
): ICD11SearchResult[] {
  const { language = 'pt', chapter, limit = 20 } = options;
  const normalizedQuery = query.toLowerCase().trim();

  let results: ICD11SearchResult[] = [];

  for (const entity of ICD11_ENTITIES) {
    // Filter by chapter if specified
    if (chapter && entity.chapter !== chapter) continue;

    let score = 0;
    let matchedOn: ICD11SearchResult['matchedOn'] = 'title';

    // Check code (exact match = highest score)
    if (entity.code.toLowerCase() === normalizedQuery) {
      score = 100;
      matchedOn = 'code';
    }
    // Check code (partial match)
    else if (entity.code.toLowerCase().includes(normalizedQuery)) {
      score = 80;
      matchedOn = 'code';
    }
    // Check title in specified language
    else if (entity.title[language]?.toLowerCase().includes(normalizedQuery)) {
      score = 70;
      matchedOn = 'title';
    }
    // Check title in any language
    else if (Object.values(entity.title).some(t => t?.toLowerCase().includes(normalizedQuery))) {
      score = 60;
      matchedOn = 'title';
    }
    // Check synonyms
    else if (entity.synonyms?.some(s => s.toLowerCase().includes(normalizedQuery))) {
      score = 50;
      matchedOn = 'synonym';
    }
    // Check definition
    else if (entity.definition?.[language]?.toLowerCase().includes(normalizedQuery)) {
      score = 30;
      matchedOn = 'definition';
    }

    if (score > 0) {
      results.push({ entity, score, matchedOn });
    }
  }

  // Sort by score descending and limit
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Get chapter name by code
 */
export function getChapterName(chapter: ICD11Chapter, language: LanguageCode = 'pt'): string {
  return ICD11_CHAPTERS[chapter]?.name[language] || ICD11_CHAPTERS[chapter]?.name.en || '';
}

/**
 * Validate if a code is a valid ICD-11 code
 */
export function isValidICD11Code(code: string): boolean {
  return ICD11_ENTITIES.some(e => e.code.toLowerCase() === code.toLowerCase());
}

/**
 * Get cross-mappings for an ICD-11 code
 */
export function getCrossMappings(code: string): ICD11Entity['crossMappings'] | undefined {
  const entity = getICD11ByCode(code);
  return entity?.crossMappings;
}

/**
 * Get all ICD-11 entities with a specific DOID
 */
export function getICD11ByDOID(doid: string): ICD11Entity | undefined {
  return ICD11_ENTITIES.find(e => e.crossMappings.doid === doid);
}

/**
 * Get ICD-11 statistics
 */
export function getICD11Stats() {
  const byChapter: Record<string, number> = {};

  ICD11_ENTITIES.forEach(e => {
    byChapter[e.chapter] = (byChapter[e.chapter] || 0) + 1;
  });

  const withSNOMED = ICD11_ENTITIES.filter(e => e.crossMappings.snomedCT).length;
  const withICD10 = ICD11_ENTITIES.filter(e => e.crossMappings.icd10?.length).length;
  const withCIAP2 = ICD11_ENTITIES.filter(e => e.crossMappings.ciap2?.length).length;
  const withDOID = ICD11_ENTITIES.filter(e => e.crossMappings.doid).length;

  return {
    total: ICD11_ENTITIES.length,
    byChapter,
    crossMappings: {
      snomed: { count: withSNOMED, percent: Math.round((withSNOMED / ICD11_ENTITIES.length) * 100) },
      icd10: { count: withICD10, percent: Math.round((withICD10 / ICD11_ENTITIES.length) * 100) },
      ciap2: { count: withCIAP2, percent: Math.round((withCIAP2 / ICD11_ENTITIES.length) * 100) },
      doid: { count: withDOID, percent: Math.round((withDOID / ICD11_ENTITIES.length) * 100) },
    },
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  ICD11_CHAPTERS,
  ICD11_ENTITIES,
  getICD11ByCode,
  getICD11ByICD10,
  getICD11BySNOMED,
  getICD11ByCIAP2,
  getICD11ByChapter,
  searchICD11,
  getChapterName,
  isValidICD11Code,
  getCrossMappings,
  getICD11ByDOID,
  getICD11Stats,
};
