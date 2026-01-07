/**
 * COMPREHENSIVE MEDICAL SYNONYMS DATABASE
 * ========================================
 *
 * Bilingual medical term mappings for semantic search
 * Portuguese (pt) and English (en) with common abbreviations
 *
 * Includes:
 * - Diseases and conditions
 * - Medications (generic and brand names)
 * - Symptoms and clinical findings
 * - Medical abbreviations (DM, HAS, IAM, etc.)
 * - Laboratory tests
 * - Procedures
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface SynonymEntry {
  /** Canonical/preferred term */
  canonical: string;
  /** All synonyms including abbreviations */
  synonyms: string[];
  /** ISO language code */
  language: 'pt' | 'en' | 'both';
  /** Category for faceted search */
  category: 'disease' | 'medication' | 'symptom' | 'exam' | 'procedure' | 'anatomy';
  /** Related ICD-10/CIAP-2 codes */
  codes?: string[];
}

// =============================================================================
// PORTUGUESE MEDICAL SYNONYMS
// =============================================================================

export const MEDICAL_SYNONYMS_PT: Record<string, SynonymEntry> = {
  // -------------------------------------------------------------------------
  // CARDIOVASCULAR DISEASES
  // -------------------------------------------------------------------------
  'hipertensao-arterial': {
    canonical: 'Hipertensao Arterial Sistemica',
    synonyms: [
      'hipertensao',
      'pressao alta',
      'HAS',
      'hipertensao essencial',
      'hipertensao primaria',
      'hipertensao secundaria',
      'PA elevada',
      'pressao arterial elevada',
      'hipertensao arterial sistemica',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['K86', 'K87', 'I10', 'I11', 'I12', 'I13', 'I15'],
  },

  'insuficiencia-cardiaca': {
    canonical: 'Insuficiencia Cardiaca',
    synonyms: [
      'IC',
      'ICC',
      'insuficiencia cardiaca congestiva',
      'falencia cardiaca',
      'descompensacao cardiaca',
      'ICFEr',
      'ICFEp',
      'IC sistolica',
      'IC diastolica',
      'insuficiencia ventricular',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['K77', 'I50', 'I50.0', 'I50.1', 'I50.9'],
  },

  'infarto-miocardio': {
    canonical: 'Infarto Agudo do Miocardio',
    synonyms: [
      'IAM',
      'infarto',
      'ataque cardiaco',
      'enfarte',
      'sindrome coronariana aguda',
      'SCA',
      'IAMCSST',
      'IAMSSST',
      'necrose miocardica',
      'infarto do coracao',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['K75', 'I21', 'I22', 'I24', 'I25'],
  },

  'fibrilacao-atrial': {
    canonical: 'Fibrilacao Atrial',
    synonyms: [
      'FA',
      'fibrilacao auricular',
      'flutter atrial',
      'arritmia atrial',
      'FA paroxistica',
      'FA persistente',
      'FA permanente',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['K78', 'I48'],
  },

  'doenca-arterial-coronariana': {
    canonical: 'Doenca Arterial Coronariana',
    synonyms: [
      'DAC',
      'coronariopatia',
      'cardiopatia isquemica',
      'aterosclerose coronariana',
      'angina',
      'angina pectoris',
      'angina estavel',
      'angina instavel',
      'DIC',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['K74', 'K76', 'I20', 'I25'],
  },

  'acidente-vascular-cerebral': {
    canonical: 'Acidente Vascular Cerebral',
    synonyms: [
      'AVC',
      'derrame',
      'derrame cerebral',
      'AVE',
      'AVC isquemico',
      'AVC hemorragico',
      'AVCi',
      'AVCh',
      'icto cerebral',
      'stroke',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['K89', 'K90', 'I60', 'I61', 'I62', 'I63', 'I64'],
  },

  // -------------------------------------------------------------------------
  // METABOLIC / ENDOCRINE DISEASES
  // -------------------------------------------------------------------------
  'diabetes-tipo-2': {
    canonical: 'Diabetes Mellitus Tipo 2',
    synonyms: [
      'DM2',
      'diabetes tipo 2',
      'DM tipo 2',
      'diabetes do adulto',
      'diabetes mellitus nao insulino-dependente',
      'DMNID',
      'diabetes tipo II',
      'diabetes nao insulino dependente',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['T90', 'E11'],
  },

  'diabetes-tipo-1': {
    canonical: 'Diabetes Mellitus Tipo 1',
    synonyms: [
      'DM1',
      'diabetes tipo 1',
      'DM tipo 1',
      'diabetes juvenil',
      'diabetes mellitus insulino-dependente',
      'DMID',
      'diabetes tipo I',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['T89', 'E10'],
  },

  'hipotireoidismo': {
    canonical: 'Hipotireoidismo',
    synonyms: [
      'tireoide lenta',
      'tireoide baixa',
      'hipofuncao tireoidiana',
      'mixedema',
      'hipotireoidismo primario',
      'hipotireoidismo secundario',
      'hipotireoidismo de Hashimoto',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['T86', 'E02', 'E03'],
  },

  'hipertireoidismo': {
    canonical: 'Hipertireoidismo',
    synonyms: [
      'tireoide alta',
      'tireoide acelerada',
      'hiperfuncao tireoidiana',
      'tireotoxicose',
      'doenca de Graves',
      'doenca de Basedow',
      'bocio toxico',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['T85', 'E05'],
  },

  'dislipidemia': {
    canonical: 'Dislipidemia',
    synonyms: [
      'colesterol alto',
      'hipercolesterolemia',
      'hipertrigliceridemia',
      'hiperlipidemia',
      'colesterol elevado',
      'triglicerides alto',
      'TG alto',
      'LDL alto',
      'HDL baixo',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['T93', 'E78'],
  },

  'obesidade': {
    canonical: 'Obesidade',
    synonyms: [
      'sobrepeso',
      'excesso de peso',
      'obesidade morbida',
      'obesidade grau I',
      'obesidade grau II',
      'obesidade grau III',
      'IMC elevado',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['T82', 'E66'],
  },

  'sindrome-metabolica': {
    canonical: 'Sindrome Metabolica',
    synonyms: [
      'SM',
      'sindrome X',
      'sindrome de resistencia a insulina',
      'sindrome plurimetabolica',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['T99', 'E88.81'],
  },

  // -------------------------------------------------------------------------
  // RESPIRATORY DISEASES
  // -------------------------------------------------------------------------
  'asma': {
    canonical: 'Asma',
    synonyms: [
      'asma bronquica',
      'asma alergica',
      'asma nao alergica',
      'broncoespasmo',
      'bronquite asmatica',
      'hiper-reatividade bronquica',
      'chiado no peito',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['R96', 'J45', 'J46'],
  },

  'dpoc': {
    canonical: 'Doenca Pulmonar Obstrutiva Cronica',
    synonyms: [
      'DPOC',
      'enfisema',
      'enfisema pulmonar',
      'bronquite cronica',
      'doenca pulmonar obstrutiva',
      'DPO',
      'obstrucao cronica das vias aereas',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['R95', 'J44', 'J43', 'J42'],
  },

  'pneumonia': {
    canonical: 'Pneumonia',
    synonyms: [
      'pneumonia bacteriana',
      'pneumonia viral',
      'PAC',
      'pneumonia adquirida na comunidade',
      'pneumonia hospitalar',
      'infeccao pulmonar',
      'consolidacao pulmonar',
      'broncopneumonia',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['R81', 'J12', 'J13', 'J14', 'J15', 'J18'],
  },

  'tuberculose': {
    canonical: 'Tuberculose',
    synonyms: [
      'TB',
      'TBC',
      'tuberculose pulmonar',
      'TB pulmonar',
      'tuberculose extrapulmonar',
      'TB latente',
      'ILTB',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['A70', 'A15', 'A16', 'A17', 'A18', 'A19'],
  },

  // -------------------------------------------------------------------------
  // GASTROINTESTINAL DISEASES
  // -------------------------------------------------------------------------
  'drge': {
    canonical: 'Doenca do Refluxo Gastroesofagico',
    synonyms: [
      'DRGE',
      'refluxo',
      'refluxo gastrico',
      'refluxo gastroesofagico',
      'azia',
      'pirose',
      'queimacao',
      'esofagite de refluxo',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['D84', 'K21'],
  },

  'gastrite': {
    canonical: 'Gastrite',
    synonyms: [
      'gastrite aguda',
      'gastrite cronica',
      'gastrite erosiva',
      'inflamacao gastrica',
      'dispepsia',
      'ma digestao',
      'dor de estomago',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['D87', 'K29'],
  },

  'ulcera-peptica': {
    canonical: 'Ulcera Peptica',
    synonyms: [
      'ulcera gastrica',
      'ulcera duodenal',
      'ulcera de estomago',
      'UP',
      'UGD',
      'ulcera gastroduodenal',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['D86', 'K25', 'K26', 'K27'],
  },

  'sindrome-intestino-irritavel': {
    canonical: 'Sindrome do Intestino Irritavel',
    synonyms: [
      'SII',
      'intestino irritavel',
      'colite espastica',
      'colopatia funcional',
      'sindrome do colon irritavel',
      'IBS',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['D93', 'K58'],
  },

  'doenca-hepatica-gordurosa': {
    canonical: 'Doenca Hepatica Gordurosa',
    synonyms: [
      'DHGNA',
      'esteatose hepatica',
      'figado gorduroso',
      'gordura no figado',
      'NAFLD',
      'NASH',
      'esteatohepatite',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['D97', 'K76.0'],
  },

  // -------------------------------------------------------------------------
  // INFECTIOUS DISEASES
  // -------------------------------------------------------------------------
  'infeccao-urinaria': {
    canonical: 'Infeccao do Trato Urinario',
    synonyms: [
      'ITU',
      'infeccao urinaria',
      'cistite',
      'pielonefrite',
      'ITU baixa',
      'ITU alta',
      'infeccao de bexiga',
      'UTI',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['U71', 'N30', 'N39.0'],
  },

  'covid-19': {
    canonical: 'COVID-19',
    synonyms: [
      'coronavirus',
      'corona virus',
      'SARS-CoV-2',
      'covid',
      'sindrome respiratoria aguda grave',
      'infeccao por coronavirus',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['A77', 'U07.1', 'U07.2'],
  },

  'dengue': {
    canonical: 'Dengue',
    synonyms: [
      'dengue classica',
      'dengue hemorragica',
      'febre da dengue',
      'dengue grave',
      'FHD',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['A77', 'A90', 'A91'],
  },

  // -------------------------------------------------------------------------
  // MENTAL HEALTH
  // -------------------------------------------------------------------------
  'depressao': {
    canonical: 'Depressao',
    synonyms: [
      'transtorno depressivo',
      'TDM',
      'transtorno depressivo maior',
      'depressao maior',
      'episodio depressivo',
      'transtorno depressivo recorrente',
      'melancolia',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['P76', 'F32', 'F33'],
  },

  'ansiedade': {
    canonical: 'Transtorno de Ansiedade',
    synonyms: [
      'TAG',
      'transtorno de ansiedade generalizada',
      'ansiedade generalizada',
      'transtorno ansioso',
      'nervosismo',
      'angustia',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['P74', 'F41', 'F41.1'],
  },

  'transtorno-panico': {
    canonical: 'Transtorno de Panico',
    synonyms: [
      'sindrome do panico',
      'ataques de panico',
      'crise de panico',
      'TP',
      'transtorno do panico',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['P74', 'F41.0'],
  },

  'transtorno-bipolar': {
    canonical: 'Transtorno Bipolar',
    synonyms: [
      'TB',
      'TAB',
      'transtorno afetivo bipolar',
      'bipolaridade',
      'psicose maniaco-depressiva',
      'transtorno bipolar tipo I',
      'transtorno bipolar tipo II',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['P73', 'F31'],
  },

  'esquizofrenia': {
    canonical: 'Esquizofrenia',
    synonyms: [
      'esquizofrenia paranoide',
      'esquizofrenia hebefrenica',
      'psicose esquizofrenica',
      'transtorno esquizofrenico',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['P72', 'F20'],
  },

  // -------------------------------------------------------------------------
  // NEUROLOGICAL DISEASES
  // -------------------------------------------------------------------------
  'enxaqueca': {
    canonical: 'Enxaqueca',
    synonyms: [
      'migranea',
      'migraine',
      'cefaleia migranosa',
      'cefaleia tipo enxaqueca',
      'enxaqueca com aura',
      'enxaqueca sem aura',
      'enxaqueca cronica',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['N89', 'G43'],
  },

  'cefaleia': {
    canonical: 'Cefaleia',
    synonyms: [
      'dor de cabeca',
      'cefalgia',
      'cefaleia tensional',
      'CTT',
      'cefaleia em salvas',
      'cefaleia cronica',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['N01', 'R51', 'G44'],
  },

  'epilepsia': {
    canonical: 'Epilepsia',
    synonyms: [
      'convulsao',
      'crise convulsiva',
      'crise epileptica',
      'convulsao febril',
      'disturbio convulsivo',
      'transtorno epileptico',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['N88', 'G40'],
  },

  'doenca-parkinson': {
    canonical: 'Doenca de Parkinson',
    synonyms: [
      'Parkinson',
      'DP',
      'parkinsonismo',
      'sindrome parkinsoniana',
      'tremor de Parkinson',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['N87', 'G20'],
  },

  'doenca-alzheimer': {
    canonical: 'Doenca de Alzheimer',
    synonyms: [
      'Alzheimer',
      'DA',
      'demencia de Alzheimer',
      'demencia senil tipo Alzheimer',
      'mal de Alzheimer',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['N87', 'G30'],
  },

  // -------------------------------------------------------------------------
  // MUSCULOSKELETAL DISEASES
  // -------------------------------------------------------------------------
  'osteoartrite': {
    canonical: 'Osteoartrite',
    synonyms: [
      'artrose',
      'osteoartrose',
      'OA',
      'artrite degenerativa',
      'doenca articular degenerativa',
      'desgaste articular',
      'artrose de joelho',
      'artrose de quadril',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['L89', 'L90', 'M15', 'M16', 'M17', 'M19'],
  },

  'artrite-reumatoide': {
    canonical: 'Artrite Reumatoide',
    synonyms: [
      'AR',
      'reumatismo',
      'artrite reumatologica',
      'poliartrite reumatoide',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['L88', 'M05', 'M06'],
  },

  'osteoporose': {
    canonical: 'Osteoporose',
    synonyms: [
      'ossos fracos',
      'ossos porosos',
      'osteopenia',
      'perda ossea',
      'fragilidade ossea',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['L95', 'M80', 'M81'],
  },

  'lombalgia': {
    canonical: 'Lombalgia',
    synonyms: [
      'dor lombar',
      'dor nas costas',
      'lumbago',
      'dor na coluna',
      'dor na lombar',
      'dorsalgia',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['L84', 'M54.5'],
  },

  'fibromialgia': {
    canonical: 'Fibromialgia',
    synonyms: [
      'FM',
      'sindrome fibromialgica',
      'dor cronica generalizada',
      'reumatismo de partes moles',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['L18', 'M79.7'],
  },

  // -------------------------------------------------------------------------
  // RENAL DISEASES
  // -------------------------------------------------------------------------
  'doenca-renal-cronica': {
    canonical: 'Doenca Renal Cronica',
    synonyms: [
      'DRC',
      'insuficiencia renal cronica',
      'IRC',
      'nefropatia cronica',
      'rim cronico',
      'doenca renal terminal',
      'DRT',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['U99', 'N18'],
  },

  'litiase-renal': {
    canonical: 'Litiase Renal',
    synonyms: [
      'pedra nos rins',
      'calculo renal',
      'nefrolitiase',
      'pedra no rim',
      'colica renal',
      'urolitiase',
    ],
    language: 'pt',
    category: 'disease',
    codes: ['U95', 'N20'],
  },

  // -------------------------------------------------------------------------
  // MEDICATIONS - CARDIOVASCULAR
  // -------------------------------------------------------------------------
  'losartana': {
    canonical: 'Losartana',
    synonyms: [
      'losartan',
      'cozaar',
      'losartana potassica',
      'BRA',
      'bloqueador do receptor de angiotensina',
    ],
    language: 'pt',
    category: 'medication',
  },

  'enalapril': {
    canonical: 'Enalapril',
    synonyms: [
      'maleato de enalapril',
      'renitec',
      'IECA',
      'inibidor da ECA',
    ],
    language: 'pt',
    category: 'medication',
  },

  'amlodipino': {
    canonical: 'Amlodipino',
    synonyms: [
      'amlodipina',
      'norvasc',
      'besilato de amlodipino',
      'BCC',
      'bloqueador de canal de calcio',
    ],
    language: 'pt',
    category: 'medication',
  },

  'hidroclorotiazida': {
    canonical: 'Hidroclorotiazida',
    synonyms: [
      'HCTZ',
      'HCT',
      'tiazidico',
      'diuretico tiazidico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'atenolol': {
    canonical: 'Atenolol',
    synonyms: [
      'betabloqueador',
      'BB',
      'beta-bloqueador',
    ],
    language: 'pt',
    category: 'medication',
  },

  'sinvastatina': {
    canonical: 'Sinvastatina',
    synonyms: [
      'simvastatina',
      'zocor',
      'estatina',
      'inibidor da HMG-CoA redutase',
    ],
    language: 'pt',
    category: 'medication',
  },

  'atorvastatina': {
    canonical: 'Atorvastatina',
    synonyms: [
      'lipitor',
      'citalor',
      'estatina',
    ],
    language: 'pt',
    category: 'medication',
  },

  'aas': {
    canonical: 'Acido Acetilsalicilico',
    synonyms: [
      'AAS',
      'aspirina',
      'aspirina infantil',
      'antiagregante plaquetario',
    ],
    language: 'pt',
    category: 'medication',
  },

  'varfarina': {
    canonical: 'Varfarina',
    synonyms: [
      'warfarina',
      'marevan',
      'coumadin',
      'anticoagulante oral',
      'antagonista da vitamina K',
      'AVK',
    ],
    language: 'pt',
    category: 'medication',
  },

  'rivaroxabana': {
    canonical: 'Rivaroxabana',
    synonyms: [
      'xarelto',
      'DOAC',
      'anticoagulante oral direto',
      'inibidor do fator Xa',
    ],
    language: 'pt',
    category: 'medication',
  },

  // -------------------------------------------------------------------------
  // MEDICATIONS - METABOLIC
  // -------------------------------------------------------------------------
  'metformina': {
    canonical: 'Metformina',
    synonyms: [
      'glifage',
      'metformin',
      'biguanida',
      'antidiabetico oral',
      'ADO',
    ],
    language: 'pt',
    category: 'medication',
  },

  'glibenclamida': {
    canonical: 'Glibenclamida',
    synonyms: [
      'daonil',
      'sulfonilureia',
      'antidiabetico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'insulina-nph': {
    canonical: 'Insulina NPH',
    synonyms: [
      'insulina intermediaria',
      'humulin N',
      'novolin N',
      'insulina humana',
    ],
    language: 'pt',
    category: 'medication',
  },

  'insulina-regular': {
    canonical: 'Insulina Regular',
    synonyms: [
      'insulina rapida',
      'humulin R',
      'novolin R',
      'insulina de acao rapida',
    ],
    language: 'pt',
    category: 'medication',
  },

  'levotiroxina': {
    canonical: 'Levotiroxina',
    synonyms: [
      'puran T4',
      'euthyrox',
      'synthroid',
      'T4',
      'hormonio tireoidiano',
    ],
    language: 'pt',
    category: 'medication',
  },

  // -------------------------------------------------------------------------
  // MEDICATIONS - ANALGESICS/ANTI-INFLAMMATORY
  // -------------------------------------------------------------------------
  'paracetamol': {
    canonical: 'Paracetamol',
    synonyms: [
      'acetaminofeno',
      'tylenol',
      'analgesico',
      'antipiretico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'dipirona': {
    canonical: 'Dipirona',
    synonyms: [
      'metamizol',
      'novalgina',
      'analgina',
      'analgesico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'ibuprofeno': {
    canonical: 'Ibuprofeno',
    synonyms: [
      'advil',
      'alivium',
      'AINE',
      'anti-inflamatorio',
      'anti-inflamatorio nao esteroidal',
    ],
    language: 'pt',
    category: 'medication',
  },

  'diclofenaco': {
    canonical: 'Diclofenaco',
    synonyms: [
      'voltaren',
      'cataflan',
      'AINE',
      'anti-inflamatorio',
    ],
    language: 'pt',
    category: 'medication',
  },

  'naproxeno': {
    canonical: 'Naproxeno',
    synonyms: [
      'naprosyn',
      'flanax',
      'AINE',
      'anti-inflamatorio',
    ],
    language: 'pt',
    category: 'medication',
  },

  'prednisona': {
    canonical: 'Prednisona',
    synonyms: [
      'meticorten',
      'corticoide',
      'corticosteroide',
      'glicocorticoide',
    ],
    language: 'pt',
    category: 'medication',
  },

  // -------------------------------------------------------------------------
  // MEDICATIONS - GASTROINTESTINAL
  // -------------------------------------------------------------------------
  'omeprazol': {
    canonical: 'Omeprazol',
    synonyms: [
      'losec',
      'IBP',
      'inibidor da bomba de protons',
      'protetor gastrico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'pantoprazol': {
    canonical: 'Pantoprazol',
    synonyms: [
      'pantozol',
      'IBP',
      'inibidor da bomba de protons',
    ],
    language: 'pt',
    category: 'medication',
  },

  'ranitidina': {
    canonical: 'Ranitidina',
    synonyms: [
      'antak',
      'antagonista H2',
      'bloqueador H2',
    ],
    language: 'pt',
    category: 'medication',
  },

  'metoclopramida': {
    canonical: 'Metoclopramida',
    synonyms: [
      'plasil',
      'antiemetico',
      'procinetico',
    ],
    language: 'pt',
    category: 'medication',
  },

  // -------------------------------------------------------------------------
  // MEDICATIONS - RESPIRATORY
  // -------------------------------------------------------------------------
  'salbutamol': {
    canonical: 'Salbutamol',
    synonyms: [
      'aerolin',
      'albuterol',
      'beta2-agonista',
      'broncodilatador',
      'SABA',
    ],
    language: 'pt',
    category: 'medication',
  },

  'budesonida': {
    canonical: 'Budesonida',
    synonyms: [
      'pulmicort',
      'busonid',
      'corticoide inalatorio',
      'CI',
    ],
    language: 'pt',
    category: 'medication',
  },

  'beclometasona': {
    canonical: 'Beclometasona',
    synonyms: [
      'clenil',
      'corticoide inalatorio',
      'CI',
    ],
    language: 'pt',
    category: 'medication',
  },

  'formoterol': {
    canonical: 'Formoterol',
    synonyms: [
      'foradil',
      'LABA',
      'beta2-agonista de longa acao',
      'broncodilatador',
    ],
    language: 'pt',
    category: 'medication',
  },

  // -------------------------------------------------------------------------
  // MEDICATIONS - PSYCHIATRY
  // -------------------------------------------------------------------------
  'fluoxetina': {
    canonical: 'Fluoxetina',
    synonyms: [
      'prozac',
      'ISRS',
      'antidepressivo',
      'inibidor seletivo de recaptacao de serotonina',
    ],
    language: 'pt',
    category: 'medication',
  },

  'sertralina': {
    canonical: 'Sertralina',
    synonyms: [
      'zoloft',
      'ISRS',
      'antidepressivo',
    ],
    language: 'pt',
    category: 'medication',
  },

  'escitalopram': {
    canonical: 'Escitalopram',
    synonyms: [
      'lexapro',
      'ISRS',
      'antidepressivo',
    ],
    language: 'pt',
    category: 'medication',
  },

  'amitriptilina': {
    canonical: 'Amitriptilina',
    synonyms: [
      'tryptanol',
      'ADT',
      'antidepressivo triciclico',
      'triciclico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'venlafaxina': {
    canonical: 'Venlafaxina',
    synonyms: [
      'efexor',
      'IRSN',
      'ISRSN',
      'antidepressivo dual',
    ],
    language: 'pt',
    category: 'medication',
  },

  'clonazepam': {
    canonical: 'Clonazepam',
    synonyms: [
      'rivotril',
      'benzodiazepinicos',
      'BZD',
      'ansiolitico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'diazepam': {
    canonical: 'Diazepam',
    synonyms: [
      'valium',
      'benzodiazepinicos',
      'BZD',
      'ansiolitico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'haloperidol': {
    canonical: 'Haloperidol',
    synonyms: [
      'haldol',
      'antipsicotico tipico',
      'neuroleptico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'risperidona': {
    canonical: 'Risperidona',
    synonyms: [
      'risperdal',
      'antipsicotico atipico',
      'antipsicotico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'quetiapina': {
    canonical: 'Quetiapina',
    synonyms: [
      'seroquel',
      'antipsicotico atipico',
      'antipsicotico',
    ],
    language: 'pt',
    category: 'medication',
  },

  // -------------------------------------------------------------------------
  // MEDICATIONS - ANTIBIOTICS
  // -------------------------------------------------------------------------
  'amoxicilina': {
    canonical: 'Amoxicilina',
    synonyms: [
      'amoxil',
      'penicilina',
      'antibiotico',
      'betalactamico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'amoxicilina-clavulanato': {
    canonical: 'Amoxicilina + Clavulanato',
    synonyms: [
      'clavulin',
      'amoxiclav',
      'augmentin',
      'antibiotico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'azitromicina': {
    canonical: 'Azitromicina',
    synonyms: [
      'zitromax',
      'macrolidio',
      'macrolideo',
      'antibiotico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'ciprofloxacino': {
    canonical: 'Ciprofloxacino',
    synonyms: [
      'cipro',
      'fluoroquinolona',
      'quinolona',
      'antibiotico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'cefalexina': {
    canonical: 'Cefalexina',
    synonyms: [
      'keflex',
      'cefalosporina',
      'cefalosporina de primeira geracao',
      'antibiotico',
    ],
    language: 'pt',
    category: 'medication',
  },

  'sulfametoxazol-trimetoprim': {
    canonical: 'Sulfametoxazol + Trimetoprim',
    synonyms: [
      'bactrim',
      'SMX-TMP',
      'cotrimoxazol',
      'sulfa',
      'antibiotico',
    ],
    language: 'pt',
    category: 'medication',
  },

  // -------------------------------------------------------------------------
  // SYMPTOMS
  // -------------------------------------------------------------------------
  'dispneia': {
    canonical: 'Dispneia',
    synonyms: [
      'falta de ar',
      'dificuldade para respirar',
      'cansaco',
      'fadiga respiratoria',
      'respiracao curta',
      'falta de folego',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'dor-toracica': {
    canonical: 'Dor Toracica',
    synonyms: [
      'dor no peito',
      'dor precordial',
      'desconforto toracico',
      'aperto no peito',
      'pressao no peito',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'palpitacao': {
    canonical: 'Palpitacao',
    synonyms: [
      'palpitacoes',
      'coracao acelerado',
      'taquicardia',
      'batimento rapido',
      'coracao disparado',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'edema': {
    canonical: 'Edema',
    synonyms: [
      'inchaco',
      'edema de membros inferiores',
      'pernas inchadas',
      'pes inchados',
      'retencao de liquidos',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'febre': {
    canonical: 'Febre',
    synonyms: [
      'pirexia',
      'hipertermia',
      'temperatura elevada',
      'estado febril',
      'calafrios',
      'febril',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'nausea': {
    canonical: 'Nausea',
    synonyms: [
      'enjoo',
      'mal estar',
      'nauseas',
      'enjoamento',
      'ansia de vomito',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'vomito': {
    canonical: 'Vomito',
    synonyms: [
      'vomitos',
      'emese',
      'regurgitacao',
      'vomitar',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'diarreia': {
    canonical: 'Diarreia',
    synonyms: [
      'fezes liquidas',
      'evacuacoes frequentes',
      'intestino solto',
      'diarrea',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'constipacao': {
    canonical: 'Constipacao',
    synonyms: [
      'prisao de ventre',
      'obstipacao',
      'intestino preso',
      'dificuldade para evacuar',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'tontura': {
    canonical: 'Tontura',
    synonyms: [
      'vertigem',
      'tonturas',
      'zonzeira',
      'desequilibrio',
      'sensacao de desmaio',
    ],
    language: 'pt',
    category: 'symptom',
  },

  'sincope': {
    canonical: 'Sincope',
    synonyms: [
      'desmaio',
      'perda de consciencia',
      'lipotimia',
      'desmaiou',
      'apagao',
    ],
    language: 'pt',
    category: 'symptom',
  },

  // -------------------------------------------------------------------------
  // LABORATORY EXAMS
  // -------------------------------------------------------------------------
  'hemograma': {
    canonical: 'Hemograma Completo',
    synonyms: [
      'hemograma',
      'HC',
      'CBC',
      'exame de sangue',
      'contagem de celulas',
    ],
    language: 'pt',
    category: 'exam',
  },

  'glicemia-jejum': {
    canonical: 'Glicemia de Jejum',
    synonyms: [
      'glicose',
      'glicemia',
      'acucar no sangue',
      'glicose serica',
    ],
    language: 'pt',
    category: 'exam',
  },

  'hemoglobina-glicada': {
    canonical: 'Hemoglobina Glicada',
    synonyms: [
      'HbA1c',
      'A1C',
      'hemoglobina glicosilada',
      'glico-hemoglobina',
    ],
    language: 'pt',
    category: 'exam',
  },

  'perfil-lipidico': {
    canonical: 'Perfil Lipidico',
    synonyms: [
      'colesterol total',
      'LDL',
      'HDL',
      'triglicerides',
      'lipidograma',
    ],
    language: 'pt',
    category: 'exam',
  },

  'funcao-renal': {
    canonical: 'Funcao Renal',
    synonyms: [
      'creatinina',
      'ureia',
      'TFG',
      'taxa de filtracao glomerular',
      'clearance de creatinina',
    ],
    language: 'pt',
    category: 'exam',
  },

  'funcao-hepatica': {
    canonical: 'Funcao Hepatica',
    synonyms: [
      'TGO',
      'TGP',
      'AST',
      'ALT',
      'transaminases',
      'hepatograma',
      'enzimas hepaticas',
    ],
    language: 'pt',
    category: 'exam',
  },

  'tsh': {
    canonical: 'TSH',
    synonyms: [
      'hormonio tireoestimulante',
      'tireoide',
      'funcao tireoidiana',
      'T4 livre',
    ],
    language: 'pt',
    category: 'exam',
  },

  'eas': {
    canonical: 'Exame de Urina',
    synonyms: [
      'EAS',
      'urina tipo 1',
      'EQU',
      'sumario de urina',
      'urina rotina',
    ],
    language: 'pt',
    category: 'exam',
  },

  'eletrocardiograma': {
    canonical: 'Eletrocardiograma',
    synonyms: [
      'ECG',
      'EKG',
      'eletro',
      'eletrocardiografia',
    ],
    language: 'pt',
    category: 'exam',
  },

  'ecocardiograma': {
    canonical: 'Ecocardiograma',
    synonyms: [
      'eco',
      'ecocardiografia',
      'ultrassom do coracao',
      'eco TT',
      'eco TE',
    ],
    language: 'pt',
    category: 'exam',
  },

  'radiografia-torax': {
    canonical: 'Radiografia de Torax',
    synonyms: [
      'RX torax',
      'raio X do torax',
      'radiografia toracica',
      'RX de torax',
    ],
    language: 'pt',
    category: 'exam',
  },
};

// =============================================================================
// ENGLISH MEDICAL SYNONYMS
// =============================================================================

export const MEDICAL_SYNONYMS_EN: Record<string, SynonymEntry> = {
  // -------------------------------------------------------------------------
  // CARDIOVASCULAR
  // -------------------------------------------------------------------------
  'hypertension': {
    canonical: 'Hypertension',
    synonyms: [
      'high blood pressure',
      'HTN',
      'elevated blood pressure',
      'essential hypertension',
      'primary hypertension',
      'secondary hypertension',
    ],
    language: 'en',
    category: 'disease',
    codes: ['I10', 'I11', 'I12', 'I13', 'I15'],
  },

  'heart-failure': {
    canonical: 'Heart Failure',
    synonyms: [
      'HF',
      'CHF',
      'congestive heart failure',
      'cardiac failure',
      'HFrEF',
      'HFpEF',
      'systolic heart failure',
      'diastolic heart failure',
    ],
    language: 'en',
    category: 'disease',
    codes: ['I50'],
  },

  'myocardial-infarction': {
    canonical: 'Myocardial Infarction',
    synonyms: [
      'MI',
      'AMI',
      'acute MI',
      'heart attack',
      'STEMI',
      'NSTEMI',
      'acute coronary syndrome',
      'ACS',
    ],
    language: 'en',
    category: 'disease',
    codes: ['I21', 'I22'],
  },

  'atrial-fibrillation': {
    canonical: 'Atrial Fibrillation',
    synonyms: [
      'AFib',
      'AF',
      'A-fib',
      'atrial flutter',
      'paroxysmal AF',
      'persistent AF',
      'permanent AF',
    ],
    language: 'en',
    category: 'disease',
    codes: ['I48'],
  },

  'stroke': {
    canonical: 'Stroke',
    synonyms: [
      'CVA',
      'cerebrovascular accident',
      'ischemic stroke',
      'hemorrhagic stroke',
      'brain attack',
      'TIA',
      'transient ischemic attack',
    ],
    language: 'en',
    category: 'disease',
    codes: ['I60', 'I61', 'I62', 'I63', 'I64'],
  },

  // -------------------------------------------------------------------------
  // METABOLIC
  // -------------------------------------------------------------------------
  'diabetes-type-2': {
    canonical: 'Type 2 Diabetes Mellitus',
    synonyms: [
      'T2DM',
      'DM2',
      'type 2 diabetes',
      'adult-onset diabetes',
      'non-insulin dependent diabetes',
      'NIDDM',
    ],
    language: 'en',
    category: 'disease',
    codes: ['E11'],
  },

  'diabetes-type-1': {
    canonical: 'Type 1 Diabetes Mellitus',
    synonyms: [
      'T1DM',
      'DM1',
      'type 1 diabetes',
      'juvenile diabetes',
      'insulin-dependent diabetes',
      'IDDM',
    ],
    language: 'en',
    category: 'disease',
    codes: ['E10'],
  },

  'hypothyroidism': {
    canonical: 'Hypothyroidism',
    synonyms: [
      'underactive thyroid',
      'low thyroid',
      'thyroid insufficiency',
      'myxedema',
      'Hashimoto thyroiditis',
    ],
    language: 'en',
    category: 'disease',
    codes: ['E02', 'E03'],
  },

  'hyperthyroidism': {
    canonical: 'Hyperthyroidism',
    synonyms: [
      'overactive thyroid',
      'thyrotoxicosis',
      'Graves disease',
      'toxic goiter',
    ],
    language: 'en',
    category: 'disease',
    codes: ['E05'],
  },

  'dyslipidemia': {
    canonical: 'Dyslipidemia',
    synonyms: [
      'high cholesterol',
      'hypercholesterolemia',
      'hypertriglyceridemia',
      'hyperlipidemia',
      'elevated lipids',
    ],
    language: 'en',
    category: 'disease',
    codes: ['E78'],
  },

  // -------------------------------------------------------------------------
  // RESPIRATORY
  // -------------------------------------------------------------------------
  'asthma-en': {
    canonical: 'Asthma',
    synonyms: [
      'bronchial asthma',
      'allergic asthma',
      'bronchospasm',
      'reactive airway disease',
      'RAD',
    ],
    language: 'en',
    category: 'disease',
    codes: ['J45', 'J46'],
  },

  'copd': {
    canonical: 'Chronic Obstructive Pulmonary Disease',
    synonyms: [
      'COPD',
      'emphysema',
      'chronic bronchitis',
      'chronic airway obstruction',
    ],
    language: 'en',
    category: 'disease',
    codes: ['J44', 'J43', 'J42'],
  },

  'pneumonia-en': {
    canonical: 'Pneumonia',
    synonyms: [
      'CAP',
      'community-acquired pneumonia',
      'hospital-acquired pneumonia',
      'HAP',
      'lung infection',
      'bronchopneumonia',
    ],
    language: 'en',
    category: 'disease',
    codes: ['J12', 'J13', 'J14', 'J15', 'J18'],
  },

  // -------------------------------------------------------------------------
  // MENTAL HEALTH
  // -------------------------------------------------------------------------
  'depression-en': {
    canonical: 'Depression',
    synonyms: [
      'MDD',
      'major depressive disorder',
      'major depression',
      'depressive episode',
      'clinical depression',
    ],
    language: 'en',
    category: 'disease',
    codes: ['F32', 'F33'],
  },

  'anxiety-en': {
    canonical: 'Anxiety Disorder',
    synonyms: [
      'GAD',
      'generalized anxiety disorder',
      'anxiety',
      'anxious',
      'nervousness',
    ],
    language: 'en',
    category: 'disease',
    codes: ['F41', 'F41.1'],
  },

  // -------------------------------------------------------------------------
  // MEDICATIONS (ENGLISH)
  // -------------------------------------------------------------------------
  'metformin': {
    canonical: 'Metformin',
    synonyms: [
      'glucophage',
      'biguanide',
      'oral antidiabetic',
      'first-line diabetes medication',
    ],
    language: 'en',
    category: 'medication',
  },

  'lisinopril': {
    canonical: 'Lisinopril',
    synonyms: [
      'prinivil',
      'zestril',
      'ACE inhibitor',
      'ACEI',
    ],
    language: 'en',
    category: 'medication',
  },

  'amlodipine': {
    canonical: 'Amlodipine',
    synonyms: [
      'norvasc',
      'calcium channel blocker',
      'CCB',
      'dihydropyridine',
    ],
    language: 'en',
    category: 'medication',
  },

  'atorvastatin': {
    canonical: 'Atorvastatin',
    synonyms: [
      'lipitor',
      'statin',
      'HMG-CoA reductase inhibitor',
      'cholesterol medication',
    ],
    language: 'en',
    category: 'medication',
  },

  'omeprazole': {
    canonical: 'Omeprazole',
    synonyms: [
      'prilosec',
      'PPI',
      'proton pump inhibitor',
      'acid reducer',
    ],
    language: 'en',
    category: 'medication',
  },

  'sertraline': {
    canonical: 'Sertraline',
    synonyms: [
      'zoloft',
      'SSRI',
      'selective serotonin reuptake inhibitor',
      'antidepressant',
    ],
    language: 'en',
    category: 'medication',
  },

  'albuterol': {
    canonical: 'Albuterol',
    synonyms: [
      'salbutamol',
      'proventil',
      'ventolin',
      'SABA',
      'short-acting beta agonist',
      'rescue inhaler',
    ],
    language: 'en',
    category: 'medication',
  },
};

// =============================================================================
// ABBREVIATIONS MAP (QUICK LOOKUP)
// =============================================================================

export const MEDICAL_ABBREVIATIONS: Record<string, string> = {
  // Portuguese abbreviations
  'HAS': 'Hipertensao Arterial Sistemica',
  'DM': 'Diabetes Mellitus',
  'DM1': 'Diabetes Mellitus Tipo 1',
  'DM2': 'Diabetes Mellitus Tipo 2',
  'IC': 'Insuficiencia Cardiaca',
  'ICC': 'Insuficiencia Cardiaca Congestiva',
  'IAM': 'Infarto Agudo do Miocardio',
  'AVC': 'Acidente Vascular Cerebral',
  'AVE': 'Acidente Vascular Encefalico',
  'FA': 'Fibrilacao Atrial',
  'DAC': 'Doenca Arterial Coronariana',
  'DPOC': 'Doenca Pulmonar Obstrutiva Cronica',
  'ITU': 'Infeccao do Trato Urinario',
  'DRC': 'Doenca Renal Cronica',
  'IRC': 'Insuficiencia Renal Cronica',
  'DRGE': 'Doenca do Refluxo Gastroesofagico',
  'SII': 'Sindrome do Intestino Irritavel',
  'TAG': 'Transtorno de Ansiedade Generalizada',
  'TDM': 'Transtorno Depressivo Maior',
  'TAB': 'Transtorno Afetivo Bipolar',
  'TB': 'Tuberculose',
  'HIV': 'Virus da Imunodeficiencia Humana',
  'AIDS': 'Sindrome da Imunodeficiencia Adquirida',
  'EAS': 'Elementos Anormais e Sedimento',
  'ECG': 'Eletrocardiograma',
  'RX': 'Radiografia',
  'USG': 'Ultrassonografia',
  'TC': 'Tomografia Computadorizada',
  'RM': 'Ressonancia Magnetica',
  'PA': 'Pressao Arterial',
  'FC': 'Frequencia Cardiaca',
  'FR': 'Frequencia Respiratoria',
  'SatO2': 'Saturacao de Oxigenio',
  'IMC': 'Indice de Massa Corporal',
  'TFG': 'Taxa de Filtracao Glomerular',

  // Medication abbreviations
  'AAS': 'Acido Acetilsalicilico',
  'HCTZ': 'Hidroclorotiazida',
  'NPH': 'Neutral Protamine Hagedorn (Insulina)',
  'IBP': 'Inibidor da Bomba de Protons',
  'IECA': 'Inibidor da Enzima Conversora de Angiotensina',
  'BRA': 'Bloqueador do Receptor de Angiotensina',
  'BCC': 'Bloqueador de Canal de Calcio',
  'BB': 'Betabloqueador',
  'ISRS': 'Inibidor Seletivo da Recaptacao de Serotonina',
  'ADT': 'Antidepressivo Triciclico',
  'AINE': 'Anti-Inflamatorio Nao Esteroidal',
  'BZD': 'Benzodiazepinicos',
  'LABA': 'Beta2-Agonista de Longa Acao',
  'SABA': 'Beta2-Agonista de Curta Acao',
  'CI': 'Corticoide Inalatorio',

  // English abbreviations (diseases)
  'HTN': 'Hypertension',
  'HF': 'Heart Failure',
  'CHF': 'Congestive Heart Failure',
  'MI': 'Myocardial Infarction',
  'AMI': 'Acute Myocardial Infarction',
  'CAD': 'Coronary Artery Disease',
  'AFib': 'Atrial Fibrillation',
  'AF': 'Atrial Fibrillation',
  'CVA': 'Cerebrovascular Accident',
  'TIA': 'Transient Ischemic Attack',
  'T2DM': 'Type 2 Diabetes Mellitus',
  'T1DM': 'Type 1 Diabetes Mellitus',
  'COPD': 'Chronic Obstructive Pulmonary Disease',
  'CAP': 'Community-Acquired Pneumonia',
  'HAP': 'Hospital-Acquired Pneumonia',
  'UTI': 'Urinary Tract Infection',
  'CKD': 'Chronic Kidney Disease',
  'GERD': 'Gastroesophageal Reflux Disease',
  'IBS': 'Irritable Bowel Syndrome',
  'GAD': 'Generalized Anxiety Disorder',
  'MDD': 'Major Depressive Disorder',
  'STEMI': 'ST-Elevation Myocardial Infarction',
  'NSTEMI': 'Non-ST-Elevation Myocardial Infarction',
  'ACS': 'Acute Coronary Syndrome',

  // English abbreviations (medications/pharmacology)
  'ACEI': 'ACE Inhibitor',
  'ARB': 'Angiotensin Receptor Blocker',
  'CCB': 'Calcium Channel Blocker',
  'PPI': 'Proton Pump Inhibitor',
  'SSRI': 'Selective Serotonin Reuptake Inhibitor',
  'NSAID': 'Non-Steroidal Anti-Inflammatory Drug',

  // English abbreviations (labs/exams) - avoiding duplicates with PT section
  'GFR': 'Glomerular Filtration Rate',
  'eGFR': 'Estimated Glomerular Filtration Rate',
  'BMI': 'Body Mass Index',
  'BP': 'Blood Pressure',
  'HR': 'Heart Rate',
  'RR': 'Respiratory Rate',
  'SpO2': 'Oxygen Saturation',
  // Note: ECG is already defined in Portuguese section (Eletrocardiograma)
  'EKG': 'Electrocardiogram',
  'CBC': 'Complete Blood Count',
  'BMP': 'Basic Metabolic Panel',
  'CMP': 'Comprehensive Metabolic Panel',
  'LFT': 'Liver Function Test',
  'RFT': 'Renal Function Test',
  // Note: TSH already defined in Portuguese section
  'HbA1c': 'Hemoglobin A1c',
  'A1C': 'Hemoglobin A1c',
  'LDL': 'Low-Density Lipoprotein',
  'HDL': 'High-Density Lipoprotein',
  // Note: TG already defined in Portuguese section (Triglicerides)
  'CT': 'Computed Tomography',
  'MRI': 'Magnetic Resonance Imaging',
  // Note: US already has USG in Portuguese
  'CXR': 'Chest X-Ray',
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Normalize text for comparison (remove accents, lowercase)
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Get all synonyms for a term (searches both PT and EN dictionaries)
 */
export function getAllSynonyms(term: string): string[] {
  const normalized = normalizeText(term);
  const synonyms = new Set<string>();

  // Add the original term
  synonyms.add(term);

  // Check abbreviations first
  const abbrevExpanded = MEDICAL_ABBREVIATIONS[term.toUpperCase()];
  if (abbrevExpanded) {
    synonyms.add(abbrevExpanded);
  }

  // Search Portuguese synonyms
  Object.values(MEDICAL_SYNONYMS_PT).forEach(entry => {
    const allTerms = [entry.canonical, ...entry.synonyms].map(normalizeText);
    if (allTerms.includes(normalized)) {
      synonyms.add(entry.canonical);
      entry.synonyms.forEach(s => synonyms.add(s));
    }
  });

  // Search English synonyms
  Object.values(MEDICAL_SYNONYMS_EN).forEach(entry => {
    const allTerms = [entry.canonical, ...entry.synonyms].map(normalizeText);
    if (allTerms.includes(normalized)) {
      synonyms.add(entry.canonical);
      entry.synonyms.forEach(s => synonyms.add(s));
    }
  });

  return Array.from(synonyms);
}

/**
 * Expand abbreviation to full term
 */
export function expandAbbreviation(abbrev: string): string | null {
  return MEDICAL_ABBREVIATIONS[abbrev.toUpperCase()] || null;
}

/**
 * Get the canonical term for any synonym
 */
export function getCanonicalTerm(term: string): string | null {
  const normalized = normalizeText(term);

  // Check abbreviations
  const abbrevExpanded = MEDICAL_ABBREVIATIONS[term.toUpperCase()];
  if (abbrevExpanded) {
    return abbrevExpanded;
  }

  // Search PT dictionary
  for (const entry of Object.values(MEDICAL_SYNONYMS_PT)) {
    const allTerms = [entry.canonical, ...entry.synonyms].map(normalizeText);
    if (allTerms.includes(normalized)) {
      return entry.canonical;
    }
  }

  // Search EN dictionary
  for (const entry of Object.values(MEDICAL_SYNONYMS_EN)) {
    const allTerms = [entry.canonical, ...entry.synonyms].map(normalizeText);
    if (allTerms.includes(normalized)) {
      return entry.canonical;
    }
  }

  return null;
}

/**
 * Get entry metadata for a term
 */
export function getTermMetadata(term: string): SynonymEntry | null {
  const normalized = normalizeText(term);

  // Search PT dictionary
  for (const entry of Object.values(MEDICAL_SYNONYMS_PT)) {
    const allTerms = [entry.canonical, ...entry.synonyms].map(normalizeText);
    if (allTerms.includes(normalized)) {
      return entry;
    }
  }

  // Search EN dictionary
  for (const entry of Object.values(MEDICAL_SYNONYMS_EN)) {
    const allTerms = [entry.canonical, ...entry.synonyms].map(normalizeText);
    if (allTerms.includes(normalized)) {
      return entry;
    }
  }

  return null;
}

/**
 * Get all terms in a specific category
 */
export function getTermsByCategory(category: SynonymEntry['category']): SynonymEntry[] {
  const results: SynonymEntry[] = [];

  Object.values(MEDICAL_SYNONYMS_PT).forEach(entry => {
    if (entry.category === category) {
      results.push(entry);
    }
  });

  Object.values(MEDICAL_SYNONYMS_EN).forEach(entry => {
    if (entry.category === category) {
      results.push(entry);
    }
  });

  return results;
}

/**
 * Search for terms matching a query
 */
export function searchSynonyms(query: string): SynonymEntry[] {
  const normalized = normalizeText(query);
  const results: SynonymEntry[] = [];

  // Search PT dictionary
  Object.values(MEDICAL_SYNONYMS_PT).forEach(entry => {
    const allTerms = [entry.canonical, ...entry.synonyms].map(normalizeText);
    if (allTerms.some(t => t.includes(normalized) || normalized.includes(t))) {
      results.push(entry);
    }
  });

  // Search EN dictionary
  Object.values(MEDICAL_SYNONYMS_EN).forEach(entry => {
    const allTerms = [entry.canonical, ...entry.synonyms].map(normalizeText);
    if (allTerms.some(t => t.includes(normalized) || normalized.includes(t))) {
      results.push(entry);
    }
  });

  return results;
}
