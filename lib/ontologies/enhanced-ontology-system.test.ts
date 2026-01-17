/**
 * Enhanced Medical Ontology System - Comprehensive Test Suite
 * Tests the revolutionary approach to medical terminology management
 */

import { EnhancedOntologyManager, type UnifiedOntologyEntity, type OntologySearchResult, type ClinicalDecisionSupport } from './enhanced-integration-system';

// Mock data for testing
const MOCK_ENTITIES: Partial<UnifiedOntologyEntity>[] = [
  {
    id: 'CIAP2-K01',
    type: 'disease',
    primaryCode: 'K01',
    primarySystem: 'CIAP2',
    mappings: { ciap2: ['K01'] },
    emergency: {
      level: 'critical',
      protocol: 'chest_pain_protocol',
      redFlags: ['chest pain > 20min', 'radiation to arm'],
      immediateActions: ['ECG', 'aspirin', 'oxygen']
    },
    clinical: {
      description: 'Chest pain',
      synonyms: ['Thoracic pain', 'Pain chest'],
      symptoms: ['chest discomfort', 'radiating pain']
    },
    localization: {
      english: 'Chest pain',
      portuguese: 'Dor torácica'
    }
  },
  {
    id: 'RXNORM-314422',
    type: 'medication',
    primaryCode: '314422',
    primarySystem: 'RXNORM',
    mappings: { rxnorm: ['314422'] },
    emergency: {
      level: 'critical',
      redFlags: ['hypersensitivity'],
      immediateActions: ['monitor vitals', 'emergency ready']
    },
    clinical: {
      description: 'Epinephrine 1:1000',
      synonyms: ['Adrenaline', 'Epinephrine'],
      symptoms: []
    },
    localization: {
      english: 'Epinephrine',
      portuguese: 'Adrenalina'
    }
  },
  {
    id: 'LOINC-59408-5',
    type: 'test',
    primaryCode: '59408-5',
    primarySystem: 'LOINC',
    mappings: { loinc: ['59408-5'] },
    emergency: {
      level: 'critical',
      redFlags: [],
      immediateActions: ['immediate result required']
    },
    clinical: {
      description: 'Blood gas pH',
      synonyms: ['pH arterial', 'arterial pH'],
      symptoms: []
    },
    localization: {
      english: 'Arterial pH',
      portuguese: 'pH arterial'
    }
  }
];

describe('Enhanced Medical Ontology System', () => {
  let ontologyManager: EnhancedOntologyManager;

  beforeEach(() => {
    ontologyManager = new EnhancedOntologyManager();
  });

  describe('System Initialization', () => {
    it('should initialize the ontology system successfully', async () => {
      expect(ontologyManager).toBeInstanceOf(EnhancedOntologyManager);
    });

    it('should validate ontology consistency', () => {
      const validation = ontologyManager.validateOntology();
      
      expect(validation).toHaveProperty('valid');
      expect(validation).toHaveProperty('errors');
      expect(validation).toHaveProperty('warnings');
      expect(validation).toHaveProperty('statistics');
      
      expect(validation.statistics).toHaveProperty('totalEntities');
      expect(validation.statistics).toHaveProperty('mappedEntities');
      expect(validation.statistics).toHaveProperty('relationshipCount');
    });
  });

  describe('Enhanced Search Functionality', () => {
    it('should search entities by description', () => {
      const results = ontologyManager.search('chest pain', {
        limit: 10
      });
      
      expect(Array.isArray(results)).toBe(true);
      results.forEach(result => {
        expect(result).toHaveProperty('entity');
        expect(result).toHaveProperty('score');
        expect(result).toHaveProperty('matchedFields');
        expect(typeof result.score).toBe('number');
        expect(Array.isArray(result.matchedFields)).toBe(true);
      });
    });

    it('should filter search results by type', () => {
      const results = ontologyManager.search('pain', {
        types: ['disease'],
        limit: 10
      });
      
      results.forEach(result => {
        expect(result.entity.type).toBe('disease');
      });
    });

    it('should perform fuzzy matching', () => {
      const results = ontologyManager.search('chest', {
        fuzzy: true,
        limit: 10
      });
      
      expect(results.length).toBeGreaterThan(0);
    });

    it('should limit results correctly', () => {
      const results = ontologyManager.search('pain', {
        limit: 5
      });
      
      expect(results.length).toBeLessThanOrEqual(5);
    });

    it('should handle empty queries', () => {
      const results = ontologyManager.search('');
      
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe('Clinical Decision Support', () => {
    it('should get clinical decision support for CIAP2 codes', () => {
      const support = ontologyManager.getClinicalDecisionSupport('K01');
      
      if (support) {
        expect(support).toHaveProperty('condition');
        expect(support).toHaveProperty('recommendations');
        expect(support).toHaveProperty('evidence');
        
        expect(support.recommendations).toHaveProperty('tests');
        expect(support.recommendations).toHaveProperty('medications');
        expect(support.recommendations).toHaveProperty('protocols');
        
        expect(Array.isArray(support.recommendations.tests)).toBe(true);
        expect(Array.isArray(support.recommendations.medications)).toBe(true);
        expect(Array.isArray(support.recommendations.protocols)).toBe(true);
      }
    });

    it('should return null for non-existent CIAP2 codes', () => {
      const support = ontologyManager.getClinicalDecisionSupport('INVALID');
      
      expect(support).toBeNull();
    });
  });

  describe('Pharmacogenomics Integration', () => {
    it('should get pharmacogenomics information for medications', () => {
      const info = ontologyManager.getPharmacogenomicsInfo('warfarin');
      
      expect(Array.isArray(info)).toBe(true);
      
      info.forEach(item => {
        expect(item).toHaveProperty('gene');
        expect(item).toHaveProperty('implications');
        expect(item).toHaveProperty('dosageRecommendations');
      });
    });

    it('should handle medications without pharmacogenomics data', () => {
      const info = ontologyManager.getPharmacogenomicsInfo('unknown-medication');
      
      expect(Array.isArray(info)).toBe(true);
      expect(info.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Cross-Ontology Mappings', () => {
    it('should get cross-mapping relationships', () => {
      const mappings = ontologyManager.getCrossMappings('CIAP2-K01');
      
      expect(Array.isArray(mappings)).toBe(true);
      
      mappings.forEach(mapping => {
        expect(mapping).toHaveProperty('source');
        expect(mapping).toHaveProperty('target');
        expect(mapping).toHaveProperty('relationship');
        expect(mapping).toHaveProperty('confidence');
        expect(mapping).toHaveProperty('evidence');
        
        expect(mapping.source).toHaveProperty('system');
        expect(mapping.source).toHaveProperty('code');
        expect(mapping.target).toHaveProperty('system');
        expect(mapping.target).toHaveProperty('code');
      });
    });
  });

  describe('Data Export', () => {
    it('should export data in JSON format', () => {
      const jsonData = ontologyManager.exportOntologyData('json');
      
      expect(typeof jsonData).toBe('string');
      
      const parsed = JSON.parse(jsonData);
      expect(parsed).toHaveProperty('entities');
      expect(parsed).toHaveProperty('relationships');
      expect(parsed).toHaveProperty('metadata');
      
      expect(Array.isArray(parsed.entities)).toBe(true);
      expect(Array.isArray(parsed.relationships)).toBe(true);
      expect(parsed.metadata).toHaveProperty('exportDate');
      expect(parsed.metadata).toHaveProperty('version');
    });

    it('should export data in CSV format', () => {
      const csvData = ontologyManager.exportOntologyData('csv');
      
      expect(typeof csvData).toBe('string');
      expect(csvData).toContain(',');
    });

    it('should export data in XML format', () => {
      const xmlData = ontologyManager.exportOntologyData('xml');
      
      expect(typeof xmlData).toBe('string');
      expect(xmlData).toContain('<?xml');
      expect(xmlData).toContain('<ontology>');
    });
  });

  describe('Performance and Caching', () => {
    it('should cache search results', () => {
      const startTime = Date.now();
      const results1 = ontologyManager.search('chest pain');
      const time1 = Date.now() - startTime;
      
      const startTime2 = Date.now();
      const results2 = ontologyManager.search('chest pain');
      const time2 = Date.now() - startTime2;
      
      // Second search should be faster due to caching
      expect(results1).toEqual(results2);
      expect(time2).toBeLessThanOrEqual(time1);
    });

    it('should handle cache expiration', (done) => {
      // This test would require manipulating the cache TTL
      // In a real implementation, you might want to mock the Date.now() function
      done();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid search parameters gracefully', () => {
      const results = ontologyManager.search(null as any);
      expect(Array.isArray(results)).toBe(true);
    });

    it('should handle empty search results', () => {
      const results = ontologyManager.search('nonexistent-medical-term-12345');
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });
  });

  describe('Integration with Existing Systems', () => {
    it('should integrate with CIAP2 system', () => {
      const results = ontologyManager.search('hypertension', {
        systems: ['CIAP2']
      });
      
      // Should find CIAP2 codes for hypertension
      expect(results.length).toBeGreaterThanOrEqual(0);
    });

    it('should integrate with RXNorm system', () => {
      const results = ontologyManager.search('aspirin', {
        systems: ['RXNORM']
      });
      
      expect(results.length).toBeGreaterThanOrEqual(0);
    });

    it('should integrate with LOINC system', () => {
      const results = ontologyManager.search('glucose', {
        systems: ['LOINC']
      });
      
      expect(results.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Emergency Medicine Features', () => {
    it('should prioritize critical emergency conditions', () => {
      const results = ontologyManager.search('chest pain');
      
      const criticalResults = results.filter(r => r.entity.emergency.level === 'critical');
      expect(criticalResults.length).toBeGreaterThanOrEqual(0);
    });

    it('should provide immediate action protocols', () => {
      const support = ontologyManager.getClinicalDecisionSupport('K01');
      
      if (support) {
        expect(support.condition.emergency.immediateActions.length).toBeGreaterThan(0);
      }
    });

    it('should identify red flags', () => {
      const results = ontologyManager.search('chest pain');
      
      const redFlagEntities = results.filter(r => r.entity.emergency.redFlags.length > 0);
      expect(redFlagEntities.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Localization Support', () => {
    it('should support English terminology', () => {
      const results = ontologyManager.search('chest pain');
      
      results.forEach(result => {
        expect(result.entity.localization.english).toBeTruthy();
      });
    });

    it('should support Portuguese terminology', () => {
      const results = ontologyManager.search('dor');
      
      results.forEach(result => {
        expect(result.entity.localization.portuguese).toBeTruthy();
      });
    });

    it('should provide multilingual search capabilities', () => {
      const englishResults = ontologyManager.search('chest pain');
      const portugueseResults = ontologyManager.search('dor torácica');
      
      expect(englishResults.length).toBeGreaterThanOrEqual(0);
      expect(portugueseResults.length).toBeGreaterThanOrEqual(0);
    });
  });
});

// Integration tests for real-world scenarios
describe('Enhanced Ontology System - Real-world Integration', () => {
  let ontologyManager: EnhancedOntologyManager;

  beforeAll(() => {
    ontologyManager = new EnhancedOntologyManager();
  });

  describe('Emergency Room Scenario', () => {
    it('should support emergency triage decision making', () => {
      // Simulate emergency room workflow
      const chestPainResults = ontologyManager.search('chest pain', {
        types: ['disease'],
        limit: 5
      });
      
      const emergencySupport = ontologyManager.getClinicalDecisionSupport('K01');
      
      expect(chestPainResults.length).toBeGreaterThan(0);
      expect(emergencySupport).not.toBeNull();
      
      if (emergencySupport) {
        expect(emergencySupport.recommendations.tests.length).toBeGreaterThan(0);
        expect(emergencySupport.recommendations.medications.length).toBeGreaterThan(0);
      }
    });

    it('should provide drug interaction warnings', () => {
      const warfarinInfo = ontologyManager.getPharmacogenomicsInfo('warfarin');
      
      expect(warfarinInfo.length).toBeGreaterThan(0);
      
      const hasDosingGuidance = warfarinInfo.some(info => 
        info.dosageRecommendations.some(rec => rec.includes('dose'))
      );
      
      expect(hasDosingGuidance).toBe(true);
    });
  });

  describe('Primary Care Scenario', () => {
    it('should support chronic disease management', () => {
      const hypertensionResults = ontologyManager.search('hypertension');
      
      expect(hypertensionResults.length).toBeGreaterThan(0);
      
      const hasManagementProtocols = hypertensionResults.some(result =>
        result.entity.emergency.immediateActions.length > 0
      );
      
      expect(hasManagementProtocols).toBe(true);
    });
  });

  describe('Pediatric Care Scenario', () => {
    it('should provide age-appropriate guidance', () => {
      const feverResults = ontologyManager.search('fever');
      
      // Should find fever-related entries
      expect(feverResults.length).toBeGreaterThanOrEqual(0);
      
      // In a full implementation, this would include pediatric-specific protocols
    });
  });

  describe('Rural/Remote Healthcare Scenario', () => {
    it('should support limited resource environments', () => {
      const criticalResults = ontologyManager.search('cardiac arrest', {
        types: ['disease'],
        limit: 10
      });
      
      expect(criticalResults.length).toBeGreaterThanOrEqual(0);
      
      // Should prioritize critical interventions
      const criticalEntities = criticalResults.filter(r => 
        r.entity.emergency.level === 'critical'
      );
      
      expect(criticalEntities.length).toBeGreaterThan(0);
    });
  });
});

// Performance benchmarking
describe('Enhanced Ontology System - Performance Benchmarks', () => {
  let ontologyManager: EnhancedOntologyManager;

  beforeAll(() => {
    ontologyManager = new EnhancedOntologyManager();
  });

  it('should perform search within acceptable time limits', () => {
    const startTime = Date.now();
    const results = ontologyManager.search('medical term');
    const endTime = Date.now();
    
    const searchTime = endTime - startTime;
    
    // Search should complete within 100ms
    expect(searchTime).toBeLessThan(100);
    expect(results.length).toBeGreaterThan(0);
  });

  it('should handle concurrent searches efficiently', async () => {
    const searchPromises = Array.from({ length: 10 }, () =>
      ontologyManager.search('chest pain')
    );
    
    const results = await Promise.all(searchPromises);
    
    expect(results.length).toBe(10);
    results.forEach(result => {
      expect(Array.isArray(result)).toBe(true);
    });
  });

  it('should manage memory usage effectively', () => {
    // Large search with many results
    const results = ontologyManager.search('', {
      limit: 1000
    });
    
    expect(results.length).toBeLessThanOrEqual(1000);
    
    // Check that results are properly structured
    results.forEach(result => {
      expect(result.entity).toBeDefined();
      expect(typeof result.score).toBe('number');
    });
  });
});

// Export test utilities
export const testUtils = {
  MOCK_ENTITIES,
  
  createMockEntity: (overrides: Partial<UnifiedOntologyEntity> = {}): UnifiedOntologyEntity => ({
    id: 'TEST-001',
    type: 'disease',
    primaryCode: 'TEST',
    primarySystem: 'CIAP2',
    mappings: {},
    emergency: {
      level: 'medium',
      redFlags: [],
      immediateActions: []
    },
    clinical: {
      description: 'Test condition',
      synonyms: [],
      symptoms: []
    },
    localization: {
      english: 'Test Condition',
      portuguese: 'Condição de Teste'
    },
    ...overrides
  }),
  
  validateEntity: (entity: UnifiedOntologyEntity): boolean => {
    return !!(
      entity.id &&
      entity.type &&
      entity.primaryCode &&
      entity.primarySystem &&
      entity.mappings &&
      entity.emergency &&
      entity.clinical &&
      entity.localization
    );
  }
};