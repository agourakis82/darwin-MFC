/**
 * Medical synonyms dictionary
 * Expanded synonyms for semantic search
 * Language: Portuguese (pt) as primary, with expansion planned for other languages
 */

/**
 * Medical term synonyms mapping
 * Format: canonical term -> [synonyms]
 */
export const MEDICAL_SYNONYMS_PT: Record<string, string[]> = {
  // Diseases - Cardiovascular
  'hipertensão arterial': [
    'hipertensão',
    'pressão alta',
    'has',
    'hipertensão sistêmica',
    'hipertensão essencial',
    'hipertensão primária',
    'hipertensão secundária',
    'elevação da pressão arterial',
    'pa elevada',
    'hipertensão arterial sistêmica',
  ],
  'insuficiência cardíaca': [
    'ic',
    'icc',
    'insuficiência cardíaca congestiva',
    'falência cardíaca',
    'insuficiência ventricular',
    'decompensação cardíaca',
    'icd',
    'ic sistólica',
    'ic diastólica',
  ],
  'infarto agudo do miocárdio': [
    'iam',
    'infarto',
    'ataque cardíaco',
    'enfarte',
    'enfarte do miocárdio',
    'infarto do miocárdio',
    'síndrome coronariana aguda',
    'sca',
    'necrose do miocárdio',
  ],
  'diabetes mellitus tipo 2': [
    'dm2',
    'diabetes tipo 2',
    'diabetes mellitus não insulino-dependente',
    'diabetes do adulto',
    'diabetes mellitus tipo ii',
    'diabetes mellitus 2',
    'diabetes tipo ii',
  ],
  'diabetes mellitus tipo 1': [
    'dm1',
    'diabetes tipo 1',
    'diabetes insulino-dependente',
    'diabetes juvenil',
    'diabetes mellitus tipo i',
    'diabetes tipo i',
  ],

  // Diseases - Respiratory
  'asma': [
    'asma brônquica',
    'asma alérgica',
    'asma não alérgica',
    'bronquite asmática',
    'broncoespasmo',
  ],
  'doença pulmonar obstrutiva crônica': [
    'dpoc',
    'doença pulmonar obstrutiva crônica',
    'enfisema',
    'bronquite crônica',
    'doença pulmonar obstrutiva',
    'dpo',
  ],
  'pneumonia': [
    'pneumonia bacteriana',
    'pneumonia viral',
    'pneumonia adquirida na comunidade',
    'pac',
    'infecção pulmonar',
    'consolidação pulmonar',
  ],

  // Diseases - Gastrointestinal
  'doença do refluxo gastroesofágico': [
    'drge',
    'refluxo gastroesofágico',
    'refluxo',
    'azia',
    'pirose',
    'esofagite de refluxo',
    'doença do refluxo',
  ],
  'gastrite': [
    'gastrite aguda',
    'gastrite crônica',
    'gastrite erosiva',
    'inflamação gástrica',
  ],
  'síndrome do intestino irritável': [
    'sii',
    'intestino irritável',
    'colite espástica',
    'colopatia funcional',
    'síndrome do cólon irritável',
  ],

  // Diseases - Neurological
  'cefaleia': [
    'dor de cabeça',
    'cefaléia',
    'cefalgia',
    'enxaqueca',
    'migrânea',
  ],
  'enxaqueca': [
    'migrânea',
    'cefaleia migranosa',
    'cefaleia tipo enxaqueca',
    'migraine',
  ],
  'epilepsia': [
    'crise epiléptica',
    'convulsão',
    'crise convulsiva',
    'distúrbio convulsivo',
    'transtorno epiléptico',
  ],

  // Diseases - Infectious
  'infecção do trato urinário': [
    'itu',
    'infecção urinária',
    'cistite',
    'pielonefrite',
    'infecção urinária baixa',
    'infecção urinária alta',
    'uti',
  ],
  'gripe': [
    'influenza',
    'flu',
    'virose',
    'resfriado',
    'gripe sazonal',
  ],

  // Medications
  'paracetamol': [
    'acetaminofeno',
    'acetaminofem',
    'tylenol',
  ],
  'dipirona': [
    'metamizol',
    'novalgina',
    'analgina',
  ],
  'ibuprofeno': [
    'ibufran',
    'advil',
    'brufen',
  ],
  'omeprazol': [
    'omeprazole',
    'losec',
    'prazol',
  ],
  'metformina': [
    'metformin',
    'metformina cloridrato',
    'glifage',
  ],
  'losartana': [
    'losartan',
    'cozaar',
    'losartana potássica',
  ],
  'amlodipino': [
    'amlodipina',
    'norvasc',
    'amlodipino besilato',
  ],
  'sinvastatina': [
    'simvastatina',
    'zocor',
    'simvastatina',
  ],

  // Symptoms
  'dor': [
    'algia',
    'desconforto',
    'mal-estar',
    'dolor',
  ],
  'febre': [
    'pirexia',
    'hipertermia',
    'temperatura elevada',
    'calafrios',
  ],
  'tosse': [
    'tosse seca',
    'tosse produtiva',
    'tosse com expectoração',
    'tosse persistente',
  ],
  'náusea': [
    'enjoo',
    'enjoamento',
    'náuseas',
    'mal-estar gástrico',
  ],
  'vômito': [
    'vômitos',
    'emese',
    'vomitar',
    'regurgitação',
  ],
  'diarreia': [
    'evacuações líquidas',
    'fezes líquidas',
    'diarréia',
    'enterite',
  ],
  'constipação': [
    'prisão de ventre',
    'obstipação',
    'constipação intestinal',
    'intestino preso',
  ],
  'tontura': [
    'vertigem',
    'labirintite',
    'tonturas',
    'instabilidade',
  ],
  'dispneia': [
    'falta de ar',
    'cansaço',
    'fadiga respiratória',
    'dificuldade para respirar',
    'respiração curta',
  ],

  // Exams
  'hemograma': [
    'hemograma completo',
    'hcmg',
    'cbc',
    'exame de sangue completo',
  ],
  'glicemia': [
    'glicose',
    'glicemia de jejum',
    'glicemia casual',
    'glicose sérica',
  ],
  'hemoglobina glicada': [
    'hba1c',
    'hemoglobina glicosilada',
    'glicohemoglobina',
    'a1c',
  ],
  'colesterol total': [
    'colesterol',
    'ct',
    'colesterol sérico',
    'colesteremia',
  ],
  'creatinina': [
    'creatinina sérica',
    'cr',
    'creatininemia',
  ],
  'eletrocardiograma': [
    'ecg',
    'eletro',
    'eletrocardiografia',
  ],
  'ultrassom': [
    'ultrassonografia',
    'ecografia',
    'us',
    'eco',
  ],
};

/**
 * Reverse mapping: synonym -> canonical term
 */
export const SYNONYM_TO_CANONICAL_PT: Record<string, string> = {};

// Build reverse mapping
Object.entries(MEDICAL_SYNONYMS_PT).forEach(([canonical, synonyms]) => {
  SYNONYM_TO_CANONICAL_PT[canonical.toLowerCase()] = canonical;
  synonyms.forEach((synonym) => {
    SYNONYM_TO_CANONICAL_PT[synonym.toLowerCase()] = canonical;
  });
});

/**
 * Normalize text for search
 */
export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .trim();
}

/**
 * Expand query with synonyms
 */
export function expandQueryWithSynonyms(query: string, language: 'pt' = 'pt'): string[] {
  const normalizedQuery = normalizeSearchText(query);
  const expanded: string[] = [query]; // Original query
  
  // Check if query is a synonym
  const canonical = SYNONYM_TO_CANONICAL_PT[normalizedQuery];
  if (canonical) {
    expanded.push(canonical);
    // Also add all synonyms of the canonical term
    const synonyms = MEDICAL_SYNONYMS_PT[canonical] || [];
    expanded.push(...synonyms);
  } else {
    // Check if query contains any synonym as substring
    Object.entries(SYNONYM_TO_CANONICAL_PT).forEach(([synonym, canonical]) => {
      if (normalizedQuery.includes(synonym) || synonym.includes(normalizedQuery)) {
        expanded.push(canonical);
        const synonyms = MEDICAL_SYNONYMS_PT[canonical] || [];
        expanded.push(...synonyms);
      }
    });
  }
  
  // Remove duplicates
  return Array.from(new Set(expanded));
}

/**
 * Find canonical term for a given synonym
 */
export function getCanonicalTerm(term: string, language: 'pt' = 'pt'): string | null {
  const normalized = normalizeSearchText(term);
  return SYNONYM_TO_CANONICAL_PT[normalized] || null;
}

