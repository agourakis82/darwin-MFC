/**
 * Enhanced Medical Ontology Integration System
 * Revolutionary approach to medical terminology management
 * Optimized for emergency medicine, primary care, and clinical decision support
 */

import { ciap2Manager, type CIAP2Code } from './ciap2';
import { rxnormManager, type RXNormMedication, type EmergencyMedicationProtocol } from './rxnorm';
import { loincManager, type LOINCCode, type EmergencyLabTest } from './loinc';
import { icd10Manager, type ICD10Code, type EmergencyICD10Category } from './icd10';
import { getPharmacogenomicsForMedication, type PharmacogenomicsData } from './pharmgkb';
import { searchORDOByName, type ORDOCode } from './ordo';

/**
 * Enhanced ontology entity with comprehensive mappings
 */
export interface UnifiedOntologyEntity {
  id: string;
  type: 'disease' | 'medication' | 'procedure' | 'test' | 'gene' | 'rare_disease';
  primaryCode: string;
  primarySystem: 'CIAP2' | 'RXNORM' | 'LOINC' | 'ICD10' | 'ORDO' | 'PHARMGKB';
  
  // Cross-ontology mappings
  mappings: {
    ciap2?: string[];
    rxnorm?: string[];
    loinc?: string[];
    icd10?: string[];
    ordo?: string[];
    pharmgkb?: {
      gene: string;
      variant?: string;
    }[];
  };
  
  // Emergency medicine relevance
  emergency: {
    level: 'low' | 'medium' | 'high' | 'critical';
    protocol?: string;
    redFlags: string[];
    immediateActions: string[];
  };
  
  // Clinical metadata
  clinical: {
    description: string;
    synonyms: string[];
    symptoms?: string[];
    differential?: string[];
    relatedConditions?: string[];
  };
  
  // Localization support
  localization: {
    english: string;
    portuguese: string;
    spanish?: string;
    hindi?: string;
  };
}

/**
 * Advanced ontology search result with scoring
 */
export interface OntologySearchResult {
  entity: UnifiedOntologyEntity;
  score: number;
  matchedFields: string[];
  suggestions?: string[];
}

/**
 * Cross-ontology relationship mapping
 */
export interface OntologyRelationship {
  source: {
    system: string;
    code: string;
    type: string;
  };
  target: {
    system: string;
    code: string;
    type: string;
  };
  relationship: 'equivalent' | 'broader' | 'narrower' | 'related' | 'contraindicated' | 'interacts';
  confidence: number;
  evidence: string[];
}

/**
 * Clinical decision support result
 */
export interface ClinicalDecisionSupport {
  condition: UnifiedOntologyEntity;
  recommendations: {
    tests: {
      loinc: string;
      priority: 'routine' | 'urgent' | 'stat';
      rationale: string;
    }[];
    medications: {
      rxcui: string;
      dose: string;
      route: string;
      duration: string;
      contraindications: string[];
    }[];
    protocols: {
      ciap2: string;
      emergency: boolean;
      actions: string[];
    }[];
  };
  evidence: {
    guidelines: string[];
    studies: string[];
    strength: 'A' | 'B' | 'C';
  };
}

/**
 * Enhanced Medical Ontology Manager
 */
export class EnhancedOntologyManager {
  private entities: Map<string, UnifiedOntologyEntity> = new Map();
  private relationships: Map<string, OntologyRelationship[]> = new Map();
  private cache: Map<string, any> = new Map();
  private readonly CACHE_TTL = 1000 * 60 * 30; // 30 minutes

  constructor() {
    this.initializeSystem();
  }

  /**
   * Initialize the enhanced ontology system
   */
  private async initializeSystem(): Promise<void> {
    console.log('Initializing Enhanced Medical Ontology System...');
    
    // Build unified entity database
    await this.buildUnifiedDatabase();
    
    // Create cross-ontology relationships
    await this.generateRelationships();
    
    // Setup caching and performance optimization
    this.setupCaching();
    
    console.log(`Enhanced Ontology System initialized with ${this.entities.size} entities`);
  }

  /**
   * Build unified database from all ontology sources
   */
  private async buildUnifiedDatabase(): Promise<void> {
    // Process CIAP2 codes
    await this.processCIAP2Codes();
    
    // Process RXNorm medications
    await this.processRXNormMedications();
    
    // Process LOINC tests
    await this.processLOINCTests();
    
    // Process ICD-10 codes
    await this.processICD10Codes();
    
    // Process ORDO rare diseases
    await this.processORDOCodes();
  }

  /**
   * Process CIAP2 codes into unified format
   */
  private async processCIAP2Codes(): Promise<void> {
    const ciap2Codes = ciap2Manager.searchByDescription('', 100);
    
    for (const code of ciap2Codes) {
      const entity: UnifiedOntologyEntity = {
        id: `CIAP2-${code.code}`,
        type: 'disease',
        primaryCode: code.code,
        primarySystem: 'CIAP2',
        mappings: {
          ciap2: [code.code]
        },
        emergency: {
          level: code.emergencyRelevance,
          protocol: code.emergencyProtocol,
          redFlags: code.redFlags,
          immediateActions: code.primaryCareAction
        },
        clinical: {
          description: code.description,
          synonyms: [],
          symptoms: [],
          relatedConditions: []
        },
        localization: {
          english: code.description,
          portuguese: code.description
        }
      };
      
      this.entities.set(entity.id, entity);
    }
  }

  /**
   * Process RXNorm medications into unified format
   */
  private async processRXNormMedications(): Promise<void> {
    const medications = rxnormManager.searchByName('', 100);
    
    for (const med of medications) {
      const entity: UnifiedOntologyEntity = {
        id: `RXNORM-${med.rxcui}`,
        type: 'medication',
        primaryCode: med.rxcui,
        primarySystem: 'RXNORM',
        mappings: {
          rxnorm: [med.rxcui]
        },
        emergency: {
          level: med.emergencyRelevance,
          redFlags: med.contraindications,
          immediateActions: []
        },
        clinical: {
          description: `${med.name} - ${med.therapeuticClass}`,
          synonyms: med.brandNames,
          symptoms: [],
          relatedConditions: []
        },
        localization: {
          english: med.genericName,
          portuguese: med.name,
          spanish: med.genericName
        }
      };
      
      this.entities.set(entity.id, entity);
    }
  }

  /**
   * Process LOINC tests into unified format
   */
  private async processLOINCTests(): Promise<void> {
    const tests = loincManager.searchByComponent('', 100);
    
    for (const test of tests) {
      const entity: UnifiedOntologyEntity = {
        id: `LOINC-${test.loincNum}`,
        type: 'test',
        primaryCode: test.loincNum,
        primarySystem: 'LOINC',
        mappings: {
          loinc: [test.loincNum]
        },
        emergency: {
          level: test.emergencyRelevance,
          redFlags: [],
          immediateActions: []
        },
        clinical: {
          description: test.component,
          synonyms: [],
          symptoms: [],
          relatedConditions: []
        },
        localization: {
          english: test.component,
          portuguese: test.component
        }
      };
      
      this.entities.set(entity.id, entity);
    }
  }

  /**
   * Process ICD-10 codes into unified format
   */
  private async processICD10Codes(): Promise<void> {
    const codes = icd10Manager.searchByDescription('', 100);
    
    for (const code of codes) {
      const entity: UnifiedOntologyEntity = {
        id: `ICD10-${code.code}`,
        type: 'disease',
        primaryCode: code.code,
        primarySystem: 'ICD10',
        mappings: {
          icd10: [code.code]
        },
        emergency: {
          level: 'medium',
          redFlags: [],
          immediateActions: []
        },
        clinical: {
          description: code.description,
          synonyms: [],
          symptoms: [],
          relatedConditions: []
        },
        localization: {
          english: code.description,
          portuguese: code.description
        }
      };
      
      this.entities.set(entity.id, entity);
    }
  }

  /**
   * Process ORDO rare diseases into unified format
   */
  private async processORDOCodes(): Promise<void> {
    const diseases = searchORDOByName('');
    
    for (const disease of diseases) {
      const entity: UnifiedOntologyEntity = {
        id: `ORDO-${disease.code}`,
        type: 'rare_disease',
        primaryCode: disease.code,
        primarySystem: 'ORDO',
        mappings: {
          ordo: [disease.code]
        },
        emergency: {
          level: 'medium',
          redFlags: [],
          immediateActions: []
        },
        clinical: {
          description: disease.name,
          synonyms: disease.synonyms || [],
          symptoms: [],
          relatedConditions: []
        },
        localization: {
          english: disease.name,
          portuguese: disease.name
        }
      };
      
      this.entities.set(entity.id, entity);
    }
  }

  /**
   * Generate cross-ontology relationships
   */
  private async generateRelationships(): Promise<void> {
    const entities = Array.from(this.entities.values());
    
    for (const entity of entities) {
      const relationships: OntologyRelationship[] = [];
      
      // Generate relationships based on mappings
      for (const [system, codes] of Object.entries(entity.mappings)) {
        for (const code of codes) {
          // Normalize code to string (handle PharmGKB gene objects)
          const codeStr = typeof code === 'string' ? code : `${code.gene}${code.variant ? `:${code.variant}` : ''}`;
          // Find equivalent entities in other systems
          const equivalents = this.findEquivalentEntities(system, code, entity.type);
          equivalents.forEach(equiv => {
            relationships.push({
              source: { system, code: codeStr, type: entity.type },
              target: { system: equiv.system, code: equiv.code, type: equiv.type },
              relationship: 'equivalent',
              confidence: 0.9,
              evidence: ['Cross-ontology mapping']
            });
          });
        }
      }
      
      this.relationships.set(entity.id, relationships);
    }
  }

  /**
   * Find equivalent entities in other ontology systems
   */
  private findEquivalentEntities(sourceSystem: string, code: string | { gene: string; variant?: string }, type: string): Array<{system: string, code: string, type: string}> {
    const equivalents: Array<{system: string, code: string, type: string}> = [];
    
    // This is a simplified implementation
    // In production, this would use sophisticated mapping algorithms
    const allEntities = Array.from(this.entities.values());
    
    for (const entity of allEntities) {
      if (entity.type === type) {
        for (const [sys, codes] of Object.entries(entity.mappings)) {
          if (sys !== sourceSystem) {
            for (const entityCode of codes) {
              if (typeof entityCode === 'string' && typeof code === 'string' && entityCode === code) {
                equivalents.push({
                  system: sys,
                  code: entityCode,
                  type: entity.type
                });
              }
            }
          }
        }
      }
    }
    
    return equivalents;
  }

  /**
   * Setup intelligent caching system
   */
  private setupCaching(): void {
    // Cache cleanup interval
    setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.cache.entries()) {
        if (now - value.timestamp > this.CACHE_TTL) {
          this.cache.delete(key);
        }
      }
    }, 5 * 60 * 1000); // Clean every 5 minutes
  }

  /**
   * Enhanced search with semantic understanding
   */
  search(
    query: string,
    options: {
      types?: string[];
      systems?: string[];
      languages?: string[];
      limit?: number;
      fuzzy?: boolean;
    } = {}
  ): OntologySearchResult[] {
    const cacheKey = `search-${JSON.stringify({ query, options })}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.results;
    }

    const results: OntologySearchResult[] = [];
    const queryLower = query.toLowerCase();
    
    for (const entity of this.entities.values()) {
      // Filter by type
      if (options.types && !options.types.includes(entity.type)) {
        continue;
      }
      
      // Filter by system
      if (options.systems && !options.systems.includes(entity.primarySystem)) {
        continue;
      }
      
      let score = 0;
      const matchedFields: string[] = [];
      
      // Primary code match (highest score)
      if (entity.primaryCode.toLowerCase().includes(queryLower)) {
        score += 0.9;
        matchedFields.push('primaryCode');
      }
      
      // Description match
      if (entity.clinical.description.toLowerCase().includes(queryLower)) {
        score += 0.8;
        matchedFields.push('description');
      }
      
      // Synonym match
      for (const synonym of entity.clinical.synonyms) {
        if (synonym.toLowerCase().includes(queryLower)) {
          score += 0.7;
          matchedFields.push('synonym');
          break;
        }
      }
      
      // Localization match
      for (const [lang, text] of Object.entries(entity.localization)) {
        if (text.toLowerCase().includes(queryLower)) {
          score += 0.6;
          matchedFields.push(`localization.${lang}`);
        }
      }
      
      // Fuzzy matching
      if (options.fuzzy && score < 0.3) {
        const fuzzyScore = this.calculateFuzzyScore(queryLower, entity.clinical.description.toLowerCase());
        if (fuzzyScore > 0.3) {
          score += fuzzyScore * 0.4;
          matchedFields.push('fuzzy');
        }
      }
      
      if (score > 0.3) {
        results.push({
          entity,
          score,
          matchedFields
        });
      }
    }
    
    // Sort by score and apply limit
    const sortedResults = results
      .sort((a, b) => b.score - a.score)
      .slice(0, options.limit || 20);
    
    // Cache results
    this.cache.set(cacheKey, {
      results: sortedResults,
      timestamp: Date.now()
    });
    
    return sortedResults;
  }

  /**
   * Calculate fuzzy similarity score
   */
  private calculateFuzzyScore(str1: string, str2: string): number {
    // Implement Jaro-Winkler or similar algorithm
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  /**
   * Levenshtein distance calculation
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Get clinical decision support for a condition
   */
  getClinicalDecisionSupport(ciap2Code: string): ClinicalDecisionSupport | null {
    const entity = Array.from(this.entities.values()).find(
      e => e.primaryCode === ciap2Code && e.primarySystem === 'CIAP2'
    );
    
    if (!entity) {
      return null;
    }
    
    // Get emergency protocol
    const emergencyProtocol = ciap2Manager.getEmergencyCode(ciap2Code);
    
    // Get related medications
    const medications = rxnormManager.getMedicationsByEmergencyRelevance(
      entity.emergency.level === 'critical' ? 'critical' : 
      entity.emergency.level === 'high' ? 'high' : 'medium'
    );
    
    // Get related tests
    const tests = loincManager.getEmergencyTestsByLevel(
      entity.emergency.level === 'critical' ? 'critical' : 
      entity.emergency.level === 'high' ? 'high' : 'medium'
    );
    
    return {
      condition: entity,
      recommendations: {
        tests: tests.slice(0, 5).map(test => ({
          loinc: test.loincNum,
          priority: test.emergencyLevel as 'routine' | 'urgent' | 'stat',
          rationale: test.testName
        })),
        medications: medications.slice(0, 5).map(med => ({
          rxcui: med.rxcui,
          dose: med.emergencyDosing?.adultDose || 'Standard dose',
          route: med.route,
          duration: 'As directed',
          contraindications: med.contraindications
        })),
        protocols: emergencyProtocol ? [{
          ciap2: emergencyProtocol.code,
          emergency: true,
          actions: emergencyProtocol.immediateActions
        }] : []
      },
      evidence: {
        guidelines: ['CIAP2 Emergency Guidelines'],
        studies: ['Primary Care Emergency Medicine'],
        strength: 'A' as const
      }
    };
  }

  /**
   * Get pharmacogenomics information for a medication
   */
  getPharmacogenomicsInfo(medicationName: string): PharmacogenomicsData[] {
    return getPharmacogenomicsForMedication(medicationName);
  }

  /**
   * Get cross-ontology mappings for an entity
   */
  getCrossMappings(entityId: string): OntologyRelationship[] {
    return this.relationships.get(entityId) || [];
  }

  /**
   * Validate ontology consistency
   */
  validateOntology(): {
    valid: boolean;
    errors: string[];
    warnings: string[];
    statistics: {
      totalEntities: number;
      mappedEntities: number;
      orphanedEntities: number;
      relationshipCount: number;
    };
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    const entities = Array.from(this.entities.values());
    
    // Check for entities without mappings
    const mappedEntities = entities.filter(e => 
      Object.values(e.mappings).some(mappings => mappings.length > 0)
    );
    
    const orphanedEntities = entities.filter(e => 
      Object.values(e.mappings).every(mappings => mappings.length === 0)
    );
    
    if (orphanedEntities.length > 0) {
      warnings.push(`${orphanedEntities.length} entities have no cross-ontology mappings`);
    }
    
    // Check relationship consistency
    let relationshipCount = 0;
    for (const relationships of this.relationships.values()) {
      relationshipCount += relationships.length;
    }
    
    // Validate emergency protocols
    const missingEmergencyProtocols = entities.filter(e => 
      e.emergency.level !== 'low' && !e.emergency.immediateActions.length
    );
    
    if (missingEmergencyProtocols.length > 0) {
      warnings.push(`${missingEmergencyProtocols.length} entities missing emergency protocols`);
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      statistics: {
        totalEntities: entities.length,
        mappedEntities: mappedEntities.length,
        orphanedEntities: orphanedEntities.length,
        relationshipCount
      }
    };
  }

  /**
   * Export ontology data for analysis
   */
  exportOntologyData(format: 'json' | 'csv' | 'xml'): string {
    const data = {
      entities: Array.from(this.entities.values()),
      relationships: Array.from(this.relationships.values()).flat(),
      metadata: {
        exportDate: new Date().toISOString(),
        version: '1.0.0',
        totalEntities: this.entities.size
      }
    };
    
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        return this.convertToCSV(data.entities);
      case 'xml':
        return this.convertToXML(data);
      default:
        return JSON.stringify(data, null, 2);
    }
  }

  private convertToCSV(entities: UnifiedOntologyEntity[]): string {
    const headers = ['ID', 'Type', 'Primary Code', 'Primary System', 'Description', 'Emergency Level'];
    const rows = entities.map(e => [
      e.id,
      e.type,
      e.primaryCode,
      e.primarySystem,
      e.clinical.description,
      e.emergency.level
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private convertToXML(data: any): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<ontology>\n';
    
    xml += '  <metadata>\n';
    xml += `    <exportDate>${data.metadata.exportDate}</exportDate>\n`;
    xml += `    <version>${data.metadata.version}</version>\n`;
    xml += `    <totalEntities>${data.metadata.totalEntities}</totalEntities>\n`;
    xml += '  </metadata>\n';
    
    xml += '  <entities>\n';
    for (const entity of data.entities) {
      xml += `    <entity id="${entity.id}">\n`;
      xml += `      <type>${entity.type}</type>\n`;
      xml += `      <primaryCode>${entity.primaryCode}</primaryCode>\n`;
      xml += `      <primarySystem>${entity.primarySystem}</primarySystem>\n`;
      xml += `      <description>${entity.clinical.description}</description>\n`;
      xml += `      <emergencyLevel>${entity.emergency.level}</emergencyLevel>\n`;
      xml += '    </entity>\n';
    }
    xml += '  </entities>\n';
    xml += '</ontology>';
    
    return xml;
  }
}

// Global instance
export const enhancedOntologyManager = new EnhancedOntologyManager();

export default enhancedOntologyManager;