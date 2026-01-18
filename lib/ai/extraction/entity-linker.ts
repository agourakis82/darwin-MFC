/**
 * Entity Linker for Medical Ontologies
 * ===================================
 *
 * Links extracted medical entities to ontological codes:
 * - ICD-10 / ICD-11 (Diseases)
 * - SNOMED-CT (Comprehensive terminology)
 * - ATC (Drug classification)
 * - CIAP-2 (Primary care)
 *
 * Uses existing disease/medication databases for matching
 * Supports fuzzy matching and synonym resolution
 */

import { todasDoencas } from '@/lib/data/doencas/index';
import { todosMedicamentos } from '@/lib/data/medicamentos/index';
import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';
import type { ExtractedEntity } from './biobert-extractor';

// =============================================================================
// TYPES
// =============================================================================

export interface LinkedEntity extends ExtractedEntity {
  linkedTo: LinkedResource[];
}

export interface LinkedResource {
  resourceType: 'disease' | 'medication' | 'symptom';
  id: string;
  name: string;
  confidence: number; // Matching confidence 0-1
  ontologies: OntologyLinks;
}

export interface OntologyLinks {
  icd10?: string[];
  icd11?: string[];
  snomedCT?: string | string[];
  atcCode?: string;
  ciap2?: string[];
  doid?: string;
  umlsCui?: string;
  loinc?: Array<{ code: string; name: string }>;
}

export interface LinkingResult {
  linkedEntities: LinkedEntity[];
  unresolvedCount: number;
  confidence: number; // Average linking confidence
}

// =============================================================================
// STRING SIMILARITY
// =============================================================================

/**
 * Normalize text for matching
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s]/g, ' ') // Remove special chars
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Levenshtein distance for fuzzy matching
 */
function levenshteinDistance(a: string, b: string): number {
  const normA = normalizeText(a);
  const normB = normalizeText(b);

  const matrix: number[][] = [];

  for (let i = 0; i <= normB.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= normA.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= normB.length; i++) {
    for (let j = 1; j <= normA.length; j++) {
      if (normB.charAt(i - 1) === normA.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[normB.length][normA.length];
}

/**
 * Calculate similarity score (0-1)
 */
function calculateSimilarity(text1: string, text2: string): number {
  const norm1 = normalizeText(text1);
  const norm2 = normalizeText(text2);

  if (norm1 === norm2) return 1.0;

  const distance = levenshteinDistance(norm1, norm2);
  const maxLen = Math.max(norm1.length, norm2.length);

  return 1 - distance / maxLen;
}

/**
 * Word-level Jaccard similarity
 */
function jaccardSimilarity(text1: string, text2: string): number {
  const words1 = new Set(normalizeText(text1).split(/\s+/));
  const words2 = new Set(normalizeText(text2).split(/\s+/));

  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return union.size === 0 ? 0 : intersection.size / union.size;
}

/**
 * Combined similarity score
 */
function combinedSimilarity(text1: string, text2: string): number {
  const lev = calculateSimilarity(text1, text2);
  const jac = jaccardSimilarity(text1, text2);

  // Weight: 60% Levenshtein (exact match), 40% Jaccard (word overlap)
  return lev * 0.6 + jac * 0.4;
}

// =============================================================================
// DISEASE LINKING
// =============================================================================

/**
 * Find matching disease in database
 */
function findMatchingDisease(text: string, minConfidence = 0.6): Array<{ disease: Partial<Doenca>; confidence: number }> {
  const matches: Array<{ disease: Partial<Doenca>; confidence: number }> = [];

  for (const disease of todasDoencas) {
    const titleSim = combinedSimilarity(text, disease.titulo || '');
    let maxSim = titleSim;

    // Check synonyms
    if (disease.sinonimos) {
      for (const sinonimo of disease.sinonimos) {
        const sim = combinedSimilarity(text, sinonimo);
        maxSim = Math.max(maxSim, sim);
      }
    }

    // Check IDs
    if (disease.id && normalizeText(text).includes(normalizeText(disease.id))) {
      maxSim = Math.max(maxSim, 0.9);
    }

    if (maxSim >= minConfidence) {
      matches.push({ disease, confidence: Math.min(maxSim, 1.0) });
    }
  }

  // Sort by confidence and return top 5
  return matches.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
}

/**
 * Extract ontology links from disease
 */
function extractDiseaseOntologies(disease: Partial<Doenca>): OntologyLinks {
  return {
    icd10: disease.cid10,
    icd11: disease.cid11,
    snomedCT: disease.snomedCT,
    ciap2: disease.ciap2,
    doid: disease.doid,
    umlsCui: disease.umlsCui,
    loinc: disease.loinc,
  };
}

/**
 * Link disease entity to ontologies
 */
export function linkDiseaseEntity(text: string, confidence: number): LinkedResource | null {
  const matches = findMatchingDisease(text);
  if (matches.length === 0) return null;

  const best = matches[0];
  const combinedConfidence = (confidence + best.confidence) / 2;

  return {
    resourceType: 'disease',
    id: best.disease.id ?? 'unknown',
    name: best.disease.titulo ?? 'Unknown Disease',
    confidence: combinedConfidence,
    ontologies: extractDiseaseOntologies(best.disease),
  };
}

// =============================================================================
// MEDICATION LINKING
// =============================================================================

/**
 * Find matching medication in database
 */
function findMatchingMedication(text: string, minConfidence = 0.6): Array<{ medication: Medicamento; confidence: number }> {
  const matches: Array<{ medication: Medicamento; confidence: number }> = [];

  for (const med of todosMedicamentos) {
    const nameSim = combinedSimilarity(text, med.nomeGenerico);
    let maxSim = nameSim;

    // Check commercial names
    if (med.nomesComerciais) {
      for (const name of med.nomesComerciais) {
        const sim = combinedSimilarity(text, name);
        maxSim = Math.max(maxSim, sim);
      }
    }

    if (maxSim >= minConfidence) {
      matches.push({ medication: med, confidence: Math.min(maxSim, 1.0) });
    }
  }

  return matches.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
}

/**
 * Extract ontology links from medication
 */
function extractMedicationOntologies(med: Medicamento): OntologyLinks {
  return {
    atcCode: med.atcCode,
    snomedCT: med.snomedCT,
    loinc: med.loinc ? med.loinc.map(code => ({ code, name: code })) : undefined,
  };
}

/**
 * Link medication entity to ontologies
 */
export function linkMedicationEntity(text: string, confidence: number): LinkedResource | null {
  const matches = findMatchingMedication(text);
  if (matches.length === 0) return null;

  const best = matches[0];
  const combinedConfidence = (confidence + best.confidence) / 2;

  return {
    resourceType: 'medication',
    id: best.medication.id,
    name: best.medication.nomeGenerico,
    confidence: combinedConfidence,
    ontologies: extractMedicationOntologies(best.medication),
  };
}

// =============================================================================
// SYMPTOM LINKING
// =============================================================================

/**
 * Common symptoms database (could be expanded)
 */
const SYMPTOM_DATABASE: Record<string, OntologyLinks> = {
  'febre': {
    snomedCT: '386661006', // Fever
    doid: 'DOID:10923',
  },
  'tosse': {
    snomedCT: '49727002', // Cough
    doid: 'DOID:4740',
  },
  'dor': {
    snomedCT: '22253000', // Pain
  },
  'fadiga': {
    snomedCT: '84260000', // Fatigue
  },
  'náusea': {
    snomedCT: '422587007', // Nausea
  },
  'vômito': {
    snomedCT: '422400008', // Vomiting
  },
};

/**
 * Link symptom entity to ontologies
 */
export function linkSymptomEntity(text: string, confidence: number): LinkedResource | null {
  const normalized = normalizeText(text);

  for (const [symptom, ontologies] of Object.entries(SYMPTOM_DATABASE)) {
    if (normalizeText(symptom) === normalized) {
      return {
        resourceType: 'symptom',
        id: symptom,
        name: symptom,
        confidence,
        ontologies,
      };
    }
  }

  return null;
}

// =============================================================================
// BATCH ENTITY LINKING
// =============================================================================

/**
 * Link all extracted entities to ontologies
 */
export function linkEntities(entities: ExtractedEntity[]): LinkingResult {
  const linkedEntities: LinkedEntity[] = [];
  let resolvedCount = 0;

  for (const entity of entities) {
    const linkedTo: LinkedResource[] = [];

    // Try to link based on entity type
    let link: LinkedResource | null = null;

    if (entity.type === 'DISEASE') {
      link = linkDiseaseEntity(entity.text, entity.confidence);
    } else if (entity.type === 'MEDICATION') {
      link = linkMedicationEntity(entity.text, entity.confidence);
    } else if (entity.type === 'SYMPTOM') {
      link = linkSymptomEntity(entity.text, entity.confidence);
    }

    // Also try to find alternate matches (cross-linking)
    const altDisease = entity.type !== 'DISEASE' ? linkDiseaseEntity(entity.text, entity.confidence) : null;
    const altMed = entity.type !== 'MEDICATION' ? linkMedicationEntity(entity.text, entity.confidence) : null;

    if (link) linkedTo.push(link);
    if (altDisease && altDisease.confidence > 0.6) linkedTo.push(altDisease);
    if (altMed && altMed.confidence > 0.6) linkedTo.push(altMed);

    linkedEntities.push({
      ...entity,
      linkedTo,
    });

    if (linkedTo.length > 0) {
      resolvedCount++;
    }
  }

  // Calculate average confidence
  const confidences = linkedEntities
    .filter(e => e.linkedTo.length > 0)
    .map(e => Math.max(...e.linkedTo.map(l => l.confidence)));

  const avgConfidence = confidences.length > 0 ? confidences.reduce((a, b) => a + b, 0) / confidences.length : 0;

  return {
    linkedEntities,
    unresolvedCount: entities.length - resolvedCount,
    confidence: avgConfidence,
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get primary ontology code for entity
 */
export function getPrimaryOntologyCode(
  linked: LinkedResource,
  preferredOntology: 'icd10' | 'snomedCT' | 'atcCode' | 'ciap2' = 'icd10'
): string | undefined {
  const ontologies = linked.ontologies;

  if (preferredOntology === 'icd10') {
    return ontologies.icd10?.[0];
  } else if (preferredOntology === 'snomedCT') {
    return typeof ontologies.snomedCT === 'string' ? ontologies.snomedCT : ontologies.snomedCT?.[0];
  } else if (preferredOntology === 'atcCode') {
    return ontologies.atcCode;
  } else if (preferredOntology === 'ciap2') {
    return ontologies.ciap2?.[0];
  }

  return undefined;
}

/**
 * Format linked entity for display
 */
export function formatLinkedEntity(entity: LinkedEntity): string {
  const text = entity.text;

  if (entity.linkedTo.length === 0) {
    return `${text} (${entity.type})`;
  }

  const primary = entity.linkedTo[0];
  const codes = [];

  if (primary.ontologies.icd10?.[0]) codes.push(`ICD-10: ${primary.ontologies.icd10[0]}`);
  if (primary.ontologies.atcCode) codes.push(`ATC: ${primary.ontologies.atcCode}`);
  if (primary.ontologies.snomedCT) {
    const code = typeof primary.ontologies.snomedCT === 'string' ? primary.ontologies.snomedCT : primary.ontologies.snomedCT[0];
    codes.push(`SNOMED-CT: ${code}`);
  }

  const codeStr = codes.length > 0 ? ` [${codes.join('; ')}]` : '';

  return `${primary.name}${codeStr}`;
}

/**
 * Export linked entities as structured data
 */
export function exportLinkedEntities(linkedEntities: LinkedEntity[]): Array<{
  text: string;
  type: string;
  linkedName?: string;
  icd10?: string;
  atcCode?: string;
  snomedCT?: string;
  ciap2?: string;
  confidence: number;
}> {
  return linkedEntities.map(entity => ({
    text: entity.text,
    type: entity.type,
    linkedName: entity.linkedTo[0]?.name,
    icd10: entity.linkedTo[0]?.ontologies.icd10?.[0],
    atcCode: entity.linkedTo[0]?.ontologies.atcCode,
    snomedCT: typeof entity.linkedTo[0]?.ontologies.snomedCT === 'string' ? entity.linkedTo[0].ontologies.snomedCT : entity.linkedTo[0]?.ontologies.snomedCT?.[0],
    ciap2: entity.linkedTo[0]?.ontologies.ciap2?.[0],
    confidence: entity.linkedTo[0]?.confidence ?? entity.confidence,
  }));
}

// Types are already exported at declaration
