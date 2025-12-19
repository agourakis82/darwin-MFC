/**
 * ORDO (Orphanet Rare Disease Ontology)
 * Integration for rare disease identification
 */

export interface ORDOCode {
  code: string; // Ex: "ORPHA:123456"
  name: string; // Disease name
  synonyms?: string[]; // Alternative names
  prevalence?: {
    type: 'prevalence' | 'incidence';
    value: string; // e.g., "1-9 / 100 000"
    category: 'Very rare' | 'Rare' | 'Unknown';
  };
  inheritance?: string[]; // e.g., ["Autosomal dominant", "X-linked recessive"]
  ageOfOnset?: string[]; // e.g., ["Adult", "Neonatal"]
}

/**
 * ORDO codes for rare diseases in the system
 */
export const ORDO_CODES: Record<string, ORDOCode> = {
  // Neurological rare diseases
  'huntington': {
    code: 'ORPHA:399',
    name: 'Huntington disease',
    synonyms: ['Doença de Huntington', 'Coreia de Huntington'],
    prevalence: {
      type: 'prevalence',
      value: '1-9 / 100 000',
      category: 'Rare',
    },
    inheritance: ['Autosomal dominant'],
    ageOfOnset: ['Adult'],
  },
  'als': {
    code: 'ORPHA:803',
    name: 'Amyotrophic lateral sclerosis',
    synonyms: ['ELA', 'Esclerose Lateral Amiotrófica', 'Doença de Lou Gehrig'],
    prevalence: {
      type: 'prevalence',
      value: '1-9 / 100 000',
      category: 'Rare',
    },
    inheritance: ['Autosomal dominant', 'Autosomal recessive', 'X-linked dominant'],
    ageOfOnset: ['Adult'],
  },
  'nmo': {
    code: 'ORPHA:71211',
    name: 'Neuromyelitis optica spectrum disorder',
    synonyms: ['NMO', 'Devic disease', 'Neuromielite Óptica'],
    prevalence: {
      type: 'prevalence',
      value: '1-9 / 1 000 000',
      category: 'Very rare',
    },
    inheritance: ['Multigenic/multifactorial'],
    ageOfOnset: ['Adult', 'Childhood'],
  },
  'myasthenia-gravis': {
    code: 'ORPHA:589',
    name: 'Myasthenia gravis',
    synonyms: ['Miastenia Gravis'],
    prevalence: {
      type: 'prevalence',
      value: '1-5 / 10 000',
      category: 'Rare',
    },
    inheritance: ['Multigenic/multifactorial'],
    ageOfOnset: ['Adult', 'Elderly'],
  },
  'hemiplegic-migraine': {
    code: 'ORPHA:569',
    name: 'Familial hemiplegic migraine',
    synonyms: ['Enxaqueca Hemiplégica Familiar', 'FHM'],
    prevalence: {
      type: 'prevalence',
      value: '1-9 / 100 000',
      category: 'Rare',
    },
    inheritance: ['Autosomal dominant'],
    ageOfOnset: ['Childhood', 'Adolescent', 'Adult'],
  },

  // Metabolic rare diseases
  'huntington-like': {
    code: 'ORPHA:157941',
    name: 'Huntington disease-like syndrome',
    synonyms: ['Doença similar à Huntington'],
    prevalence: {
      type: 'prevalence',
      value: '<1 / 1 000 000',
      category: 'Very rare',
    },
    inheritance: ['Autosomal dominant', 'Autosomal recessive'],
    ageOfOnset: ['Adult'],
  },

  // Rare mental health disorders
  'narcolepsy': {
    code: 'ORPHA:2073',
    name: 'Narcolepsy',
    synonyms: ['Narcolepsia'],
    prevalence: {
      type: 'prevalence',
      value: '1-9 / 100 000',
      category: 'Rare',
    },
    inheritance: ['Multigenic/multifactorial'],
    ageOfOnset: ['Childhood', 'Adolescent', 'Adult'],
  },
  'dissociative-identity-disorder': {
    code: 'ORPHA:95345',
    name: 'Dissociative identity disorder',
    synonyms: ['Transtorno de Identidade Dissociativo', 'DID', 'Multiple Personality Disorder'],
    prevalence: {
      type: 'prevalence',
      value: 'Unknown',
      category: 'Unknown',
    },
    inheritance: [],
    ageOfOnset: ['Childhood', 'Adolescent'],
  },

  // Rare autoimmune/inflammatory
  'sjogren-syndrome': {
    code: 'ORPHA:289390',
    name: 'Primary Sjögren syndrome',
    synonyms: ['Síndrome de Sjögren Primária'],
    prevalence: {
      type: 'prevalence',
      value: '1-9 / 100 000',
      category: 'Rare',
    },
    inheritance: ['Multigenic/multifactorial'],
    ageOfOnset: ['Adult', 'Elderly'],
  },
};

/**
 * Get ORDO code by key
 */
export function getORDOCode(key: string): ORDOCode | undefined {
  return ORDO_CODES[key];
}

/**
 * Search ORDO codes by name or synonym
 */
export function searchORDOByName(query: string): ORDOCode[] {
  const normalizedQuery = query.toLowerCase().trim();
  const results: ORDOCode[] = [];

  for (const code of Object.values(ORDO_CODES)) {
    const matches =
      code.name.toLowerCase().includes(normalizedQuery) ||
      code.synonyms?.some(syn => syn.toLowerCase().includes(normalizedQuery));

    if (matches) {
      results.push(code);
    }
  }

  return results;
}

/**
 * Get ORDO code by exact code
 */
export function getORDOByCode(code: string): ORDOCode | undefined {
  return Object.values(ORDO_CODES).find(c => c.code === code);
}

/**
 * Map disease names to ORDO code keys
 */
export const DISEASE_TO_ORDO_MAP: Record<string, string> = {
  // Portuguese names
  'doença de huntington': 'huntington',
  'huntington': 'huntington',
  'coreia de huntington': 'huntington',
  'ela': 'als',
  'esclerose lateral amiotrófica': 'als',
  'lou gehrig': 'als',
  'nmo': 'nmo',
  'neuromielite óptica': 'nmo',
  'devic': 'nmo',
  'miastenia gravis': 'myasthenia-gravis',
  'enxaqueca hemiplégica': 'hemiplegic-migraine',
  'narcolepsia': 'narcolepsy',
  'transtorno de identidade dissociativo': 'dissociative-identity-disorder',
  'did': 'dissociative-identity-disorder',
  'síndrome de sjögren': 'sjogren-syndrome',
};

/**
 * Map disease name to ORDO code key
 */
export function mapDiseaseNameToORDO(diseaseName: string): string | undefined {
  const normalized = diseaseName.toLowerCase().trim();
  return DISEASE_TO_ORDO_MAP[normalized];
}

