/**
 * CROSS-MAPPING ONTOLOGY MODULE - DARWIN-MFC
 * ==========================================
 *
 * Unified cross-mapping service between medical ontologies.
 * Provides bidirectional mapping between:
 * - ICD-10 ↔ ICD-11
 * - ICD-10/11 ↔ SNOMED-CT
 * - ICD-10/11 ↔ CIAP-2
 * - All ↔ DOID, MeSH, UMLS
 * - Medications: ATC ↔ RxNorm
 * - Labs: LOINC
 * - Genes: PharmGKB
 *
 * Enables interoperability and unified semantic search.
 */

import type { LanguageCode, OntologySystem } from './types/ontology';
import { ICD11_ENTITIES, type ICD11Entity } from './icd11';
import { LOINC_TESTS, type LOINCTest } from './loinc';
import { PHARMGKB_GENES, type PharmGKBGene } from './pharmgkb';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Entity type in the unified ontology system
 */
export type UnifiedEntityType =
  | 'disease'
  | 'medication'
  | 'lab-test'
  | 'procedure'
  | 'gene'
  | 'phenotype'
  | 'symptom';

/**
 * All supported ontology codes for cross-mapping
 */
export interface OntologyCodes {
  // Classification systems
  icd10?: string[];
  icd11?: string[];
  snomedCT?: string;
  ciap2?: string[];

  // Reference ontologies
  doid?: string;       // Disease Ontology
  meshId?: string;     // MeSH
  umlsCui?: string;    // UMLS CUI
  ordo?: string;       // Orphanet (rare diseases)
  hpo?: string[];      // Human Phenotype Ontology

  // Medication systems
  atc?: string;        // ATC code
  rxnorm?: string;     // RxNorm
  drugbank?: string;   // DrugBank

  // Lab systems
  loinc?: string;      // LOINC code

  // Genomics
  pharmgkb?: string;   // PharmGKB gene/variant
  hgnc?: string;       // HGNC gene symbol
  ncbiGene?: string;   // NCBI Gene ID
}

/**
 * Unified entity with all cross-mappings
 */
export interface UnifiedEntity {
  /** Unique internal ID */
  id: string;

  /** Entity type */
  type: UnifiedEntityType;

  /** Primary display name by language */
  name: Partial<Record<LanguageCode, string>>;

  /** All synonyms across languages */
  synonyms?: string[];

  /** Definition/description */
  definition?: Partial<Record<LanguageCode, string>>;

  /** All ontology codes */
  codes: OntologyCodes;

  /** Related entities */
  relations?: Array<{
    type: 'treats' | 'causes' | 'associated-with' | 'diagnosed-by' | 'part-of';
    targetId: string;
    targetName?: string;
  }>;

  /** Source system (where this entity was primarily defined) */
  source: OntologySystem;

  /** Confidence of mappings (0-1) */
  mappingConfidence?: number;
}

/**
 * Cross-mapping result
 */
export interface CrossMappingResult {
  sourceSystem: OntologySystem;
  sourceCode: string;
  targetSystem: OntologySystem;
  targetCode: string;
  targetDisplay: string;
  confidence: 'exact' | 'broad' | 'narrow' | 'related';
  score: number;
}

/**
 * Options for cross-mapping queries
 */
export interface CrossMappingOptions {
  /** Source ontology system */
  sourceSystem?: OntologySystem;

  /** Target ontology systems (if not specified, returns all) */
  targetSystems?: OntologySystem[];

  /** Include related concepts (not just exact mappings) */
  includeRelated?: boolean;

  /** Minimum confidence score (0-1) */
  minConfidence?: number;
}

// =============================================================================
// UNIFIED ENTITY DATABASE
// =============================================================================

/**
 * Build unified entities from all data sources
 */
function buildUnifiedEntities(): UnifiedEntity[] {
  const entities: UnifiedEntity[] = [];

  // Add ICD-11 entities as diseases
  ICD11_ENTITIES.forEach((icd11: ICD11Entity) => {
    entities.push({
      id: `disease-${icd11.code}`,
      type: 'disease',
      name: icd11.title,
      synonyms: icd11.synonyms,
      definition: icd11.definition,
      codes: {
        icd11: [icd11.code],
        icd10: icd11.crossMappings.icd10,
        snomedCT: icd11.crossMappings.snomedCT,
        ciap2: icd11.crossMappings.ciap2,
        doid: icd11.crossMappings.doid,
        meshId: icd11.crossMappings.meshId,
        umlsCui: icd11.crossMappings.umlsCui,
      },
      source: 'icd11',
      mappingConfidence: 0.95,
    });
  });

  // Add LOINC entities as lab tests
  LOINC_TESTS.forEach((test: LOINCTest) => {
    entities.push({
      id: `lab-${test.code}`,
      type: 'lab-test',
      name: {
        pt: test.consumerNamePt || test.shortName,
        en: test.consumerNameEn || test.longName,
      },
      codes: {
        loinc: test.code,
      },
      source: 'loinc',
      mappingConfidence: 1.0,
    });
  });

  // Add PharmGKB genes
  PHARMGKB_GENES.forEach((gene: PharmGKBGene) => {
    entities.push({
      id: `gene-${gene.gene}`,
      type: 'gene',
      name: {
        en: gene.gene,
        pt: gene.gene,
      },
      definition: {
        en: gene.description,
        pt: gene.description,
      },
      codes: {
        pharmgkb: gene.pharmgkbId,
        hgnc: gene.hgncId,
      },
      relations: gene.affectedDrugs.map(drug => ({
        type: 'associated-with' as const,
        targetId: `medication-${drug.drugName.toLowerCase().replace(/\s+/g, '-')}`,
        targetName: drug.drugName,
      })),
      source: 'pharmgkb',
      mappingConfidence: 1.0,
    });
  });

  return entities;
}

// Lazy-loaded unified entities
let _unifiedEntities: UnifiedEntity[] | null = null;

/**
 * Get all unified entities (lazy-loaded)
 */
export function getUnifiedEntities(): UnifiedEntity[] {
  if (!_unifiedEntities) {
    _unifiedEntities = buildUnifiedEntities();
  }
  return _unifiedEntities;
}

// =============================================================================
// CROSS-MAPPING FUNCTIONS
// =============================================================================

/**
 * Get cross-mappings for a code in any ontology system
 */
export function getCrossMappings(
  code: string,
  options: CrossMappingOptions = {}
): CrossMappingResult[] {
  const { sourceSystem, targetSystems, includeRelated = false, minConfidence = 0 } = options;
  const results: CrossMappingResult[] = [];
  const entities = getUnifiedEntities();

  // Find entities matching the code
  const matchingEntities = entities.filter(entity => {
    // Check if code matches any of the entity's codes
    const codes = entity.codes;
    const allCodes: Array<{ system: OntologySystem; code: string }> = [];

    if (codes.icd10) codes.icd10.forEach(c => allCodes.push({ system: 'icd10', code: c }));
    if (codes.icd11) codes.icd11.forEach(c => allCodes.push({ system: 'icd11', code: c }));
    if (codes.snomedCT) allCodes.push({ system: 'snomed-ct', code: codes.snomedCT });
    if (codes.ciap2) codes.ciap2.forEach(c => allCodes.push({ system: 'ciap2', code: c }));
    if (codes.doid) allCodes.push({ system: 'doid', code: codes.doid });
    if (codes.meshId) allCodes.push({ system: 'mesh', code: codes.meshId });
    if (codes.umlsCui) allCodes.push({ system: 'umls', code: codes.umlsCui });
    if (codes.loinc) allCodes.push({ system: 'loinc', code: codes.loinc });
    if (codes.atc) allCodes.push({ system: 'atc', code: codes.atc });
    if (codes.rxnorm) allCodes.push({ system: 'rxnorm', code: codes.rxnorm });
    if (codes.pharmgkb) allCodes.push({ system: 'pharmgkb', code: codes.pharmgkb });

    return allCodes.some(ac => {
      const matchesCode = ac.code.toLowerCase() === code.toLowerCase();
      const matchesSystem = !sourceSystem || ac.system === sourceSystem;
      return matchesCode && matchesSystem;
    });
  });

  // Generate cross-mappings for each matching entity
  matchingEntities.forEach(entity => {
    const addMapping = (
      srcSystem: OntologySystem,
      srcCode: string,
      tgtSystem: OntologySystem,
      tgtCode: string,
      tgtDisplay: string,
      confidence: CrossMappingResult['confidence'],
      score: number
    ) => {
      // Filter by target systems if specified
      if (targetSystems && !targetSystems.includes(tgtSystem)) return;

      // Filter by minimum confidence
      if (score < minConfidence) return;

      // Don't include self-mapping
      if (srcSystem === tgtSystem && srcCode === tgtCode) return;

      results.push({
        sourceSystem: srcSystem,
        sourceCode: srcCode,
        targetSystem: tgtSystem,
        targetCode: tgtCode,
        targetDisplay: tgtDisplay,
        confidence,
        score,
      });
    };

    const codes = entity.codes;
    const name = entity.name.pt || entity.name.en || '';

    // ICD-10 mappings
    if (codes.icd10) {
      codes.icd10.forEach(icd10 => {
        if (codes.icd11) {
          codes.icd11.forEach(icd11 => {
            addMapping('icd10', icd10, 'icd11', icd11, name, 'exact', 0.95);
          });
        }
        if (codes.snomedCT) {
          addMapping('icd10', icd10, 'snomed-ct', codes.snomedCT, name, 'exact', 0.9);
        }
        if (codes.ciap2) {
          codes.ciap2.forEach(ciap2 => {
            addMapping('icd10', icd10, 'ciap2', ciap2, name, 'broad', 0.8);
          });
        }
      });
    }

    // ICD-11 mappings
    if (codes.icd11) {
      codes.icd11.forEach(icd11 => {
        if (codes.icd10) {
          codes.icd10.forEach(icd10 => {
            addMapping('icd11', icd11, 'icd10', icd10, name, 'exact', 0.95);
          });
        }
        if (codes.snomedCT) {
          addMapping('icd11', icd11, 'snomed-ct', codes.snomedCT, name, 'exact', 0.9);
        }
        if (codes.doid) {
          addMapping('icd11', icd11, 'doid', codes.doid, name, 'exact', 0.85);
        }
        if (codes.meshId) {
          addMapping('icd11', icd11, 'mesh', codes.meshId, name, 'exact', 0.85);
        }
        if (codes.umlsCui) {
          addMapping('icd11', icd11, 'umls', codes.umlsCui, name, 'exact', 0.95);
        }
      });
    }

    // SNOMED-CT mappings
    if (codes.snomedCT) {
      if (codes.icd10) {
        codes.icd10.forEach(icd10 => {
          addMapping('snomed-ct', codes.snomedCT!, 'icd10', icd10, name, 'exact', 0.9);
        });
      }
      if (codes.icd11) {
        codes.icd11.forEach(icd11 => {
          addMapping('snomed-ct', codes.snomedCT!, 'icd11', icd11, name, 'exact', 0.9);
        });
      }
    }

    // LOINC mappings
    if (codes.loinc && codes.snomedCT) {
      addMapping('loinc', codes.loinc, 'snomed-ct', codes.snomedCT, name, 'exact', 0.95);
    }
  });

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Get ICD-10 to ICD-11 mapping
 */
export function mapICD10toICD11(icd10Code: string): CrossMappingResult[] {
  return getCrossMappings(icd10Code, {
    sourceSystem: 'icd10',
    targetSystems: ['icd11'],
  });
}

/**
 * Get ICD-11 to ICD-10 mapping
 */
export function mapICD11toICD10(icd11Code: string): CrossMappingResult[] {
  return getCrossMappings(icd11Code, {
    sourceSystem: 'icd11',
    targetSystems: ['icd10'],
  });
}

/**
 * Get SNOMED-CT to ICD mappings
 */
export function mapSNOMEDtoICD(snomedCode: string): CrossMappingResult[] {
  return getCrossMappings(snomedCode, {
    sourceSystem: 'snomed-ct',
    targetSystems: ['icd10', 'icd11'],
  });
}

/**
 * Get CIAP-2 to ICD mappings
 */
export function mapCIAP2toICD(ciap2Code: string): CrossMappingResult[] {
  return getCrossMappings(ciap2Code, {
    sourceSystem: 'ciap2',
    targetSystems: ['icd10', 'icd11'],
  });
}

/**
 * Find entity by any ontology code
 */
export function findEntityByCode(
  code: string,
  system?: OntologySystem
): UnifiedEntity | undefined {
  const entities = getUnifiedEntities();

  return entities.find(entity => {
    const codes = entity.codes;

    if (system) {
      // Search specific system
      switch (system) {
        case 'icd10': return codes.icd10?.some(c => c.toLowerCase() === code.toLowerCase());
        case 'icd11': return codes.icd11?.some(c => c.toLowerCase() === code.toLowerCase());
        case 'snomed-ct': return codes.snomedCT?.toLowerCase() === code.toLowerCase();
        case 'ciap2': return codes.ciap2?.some(c => c.toLowerCase() === code.toLowerCase());
        case 'doid': return codes.doid?.toLowerCase() === code.toLowerCase();
        case 'mesh': return codes.meshId?.toLowerCase() === code.toLowerCase();
        case 'umls': return codes.umlsCui?.toLowerCase() === code.toLowerCase();
        case 'loinc': return codes.loinc?.toLowerCase() === code.toLowerCase();
        case 'atc': return codes.atc?.toLowerCase() === code.toLowerCase();
        case 'rxnorm': return codes.rxnorm?.toLowerCase() === code.toLowerCase();
        case 'pharmgkb': return codes.pharmgkb?.toLowerCase() === code.toLowerCase();
        default: return false;
      }
    } else {
      // Search all systems
      const normalizedCode = code.toLowerCase();
      return (
        codes.icd10?.some(c => c.toLowerCase() === normalizedCode) ||
        codes.icd11?.some(c => c.toLowerCase() === normalizedCode) ||
        codes.snomedCT?.toLowerCase() === normalizedCode ||
        codes.ciap2?.some(c => c.toLowerCase() === normalizedCode) ||
        codes.doid?.toLowerCase() === normalizedCode ||
        codes.meshId?.toLowerCase() === normalizedCode ||
        codes.umlsCui?.toLowerCase() === normalizedCode ||
        codes.loinc?.toLowerCase() === normalizedCode ||
        codes.atc?.toLowerCase() === normalizedCode ||
        codes.rxnorm?.toLowerCase() === normalizedCode ||
        codes.pharmgkb?.toLowerCase() === normalizedCode
      );
    }
  });
}

/**
 * Get all codes for an entity
 */
export function getAllCodesForEntity(entityId: string): OntologyCodes | undefined {
  const entities = getUnifiedEntities();
  const entity = entities.find(e => e.id === entityId);
  return entity?.codes;
}

/**
 * Check if two codes refer to the same entity
 */
export function areCodesEquivalent(
  code1: string,
  system1: OntologySystem,
  code2: string,
  system2: OntologySystem
): boolean {
  const entity1 = findEntityByCode(code1, system1);
  const entity2 = findEntityByCode(code2, system2);

  if (!entity1 || !entity2) return false;
  return entity1.id === entity2.id;
}

// =============================================================================
// STATISTICS
// =============================================================================

/**
 * Get cross-mapping statistics
 */
export function getCrossMappingStats() {
  const entities = getUnifiedEntities();

  const byType: Record<UnifiedEntityType, number> = {
    disease: 0,
    medication: 0,
    'lab-test': 0,
    procedure: 0,
    gene: 0,
    phenotype: 0,
    symptom: 0,
  };

  const bySource: Record<string, number> = {};

  const coverage = {
    withICD10: 0,
    withICD11: 0,
    withSNOMED: 0,
    withCIAP2: 0,
    withDOID: 0,
    withMeSH: 0,
    withUMLS: 0,
    withLOINC: 0,
    fullyMapped: 0, // Has at least 3 major systems
  };

  entities.forEach(entity => {
    byType[entity.type]++;
    bySource[entity.source] = (bySource[entity.source] || 0) + 1;

    const codes = entity.codes;
    let mappingCount = 0;

    if (codes.icd10?.length) { coverage.withICD10++; mappingCount++; }
    if (codes.icd11?.length) { coverage.withICD11++; mappingCount++; }
    if (codes.snomedCT) { coverage.withSNOMED++; mappingCount++; }
    if (codes.ciap2?.length) { coverage.withCIAP2++; mappingCount++; }
    if (codes.doid) { coverage.withDOID++; mappingCount++; }
    if (codes.meshId) { coverage.withMeSH++; mappingCount++; }
    if (codes.umlsCui) { coverage.withUMLS++; mappingCount++; }
    if (codes.loinc) { coverage.withLOINC++; mappingCount++; }

    if (mappingCount >= 3) coverage.fullyMapped++;
  });

  const total = entities.length;

  return {
    total,
    byType,
    bySource,
    coverage: {
      icd10: { count: coverage.withICD10, percent: Math.round((coverage.withICD10 / total) * 100) },
      icd11: { count: coverage.withICD11, percent: Math.round((coverage.withICD11 / total) * 100) },
      snomed: { count: coverage.withSNOMED, percent: Math.round((coverage.withSNOMED / total) * 100) },
      ciap2: { count: coverage.withCIAP2, percent: Math.round((coverage.withCIAP2 / total) * 100) },
      doid: { count: coverage.withDOID, percent: Math.round((coverage.withDOID / total) * 100) },
      mesh: { count: coverage.withMeSH, percent: Math.round((coverage.withMeSH / total) * 100) },
      umls: { count: coverage.withUMLS, percent: Math.round((coverage.withUMLS / total) * 100) },
      loinc: { count: coverage.withLOINC, percent: Math.round((coverage.withLOINC / total) * 100) },
      fullyMapped: { count: coverage.fullyMapped, percent: Math.round((coverage.fullyMapped / total) * 100) },
    },
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  getUnifiedEntities,
  getCrossMappings,
  mapICD10toICD11,
  mapICD11toICD10,
  mapSNOMEDtoICD,
  mapCIAP2toICD,
  findEntityByCode,
  getAllCodesForEntity,
  areCodesEquivalent,
  getCrossMappingStats,
};
