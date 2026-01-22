/**
 * ONTOLOGY FETCHER
 * =================
 * 
 * Fetches ontology codes and definitions from existing Darwin-MFC data.
 * 
 * Sources:
 * - ICD-11 (from WHO fetcher)
 * - SNOMED-CT (from existing disease data)
 * - LOINC (from existing disease data)
 * - ATC (from existing medication data)
 * 
 * For prototype: Uses existing Darwin-MFC ontology data
 * For production: Can integrate with external ontology APIs
 */

import type {
  Fetcher,
  FetchQuery,
  FetchResult,
  OntologyData,
  OntologyEntry,
} from '../types';

// Import existing Darwin-MFC data
import { doencasConsolidadas } from '@/lib/data/doencas/index';
import { medicamentosConsolidados } from '@/lib/data/medicamentos/index';

export class OntologyFetcher implements Fetcher {
  name = 'Ontology';
  source = 'ontology' as const;
  priority = 7; // Medium-high priority

  /**
   * Check if fetcher is available
   */
  async isAvailable(): Promise<boolean> {
    // Always available (uses local data)
    return true;
  }

  /**
   * Fetch ontology codes related to topic
   */
  async fetch(query: FetchQuery): Promise<FetchResult> {
    const startTime = Date.now();

    const entries: OntologyEntry[] = [];

    // Search diseases for matching ontology codes
    const matchingDiseases = this.searchDiseases(query.topic);
    
    for (const disease of matchingDiseases) {
      // Add ICD-11 codes
      if (disease.cid11) {
        entries.push({
          code: disease.cid11,
          system: 'ICD-11',
          display: disease.nome || '',
          definition: disease.descricao || '',
          synonyms: disease.sinonimos || [],
        });
      }

      // Add SNOMED-CT codes
      if (disease.snomedCT) {
        entries.push({
          code: disease.snomedCT,
          system: 'SNOMED-CT',
          display: disease.nome || '',
          definition: disease.descricao || '',
        });
      }

      // Add LOINC codes
      if (disease.loinc && disease.loinc.length > 0) {
        for (const loincCode of disease.loinc) {
          entries.push({
            code: loincCode,
            system: 'LOINC',
            display: `Laboratory test for ${disease.nome}`,
            definition: `LOINC code for ${disease.nome} diagnostic testing`,
          });
        }
      }
    }

    // Search medications for ATC codes
    const matchingMedications = this.searchMedications(query.topic);

    for (const medication of matchingMedications) {
      if (medication.atcCode) {
        entries.push({
          code: medication.atcCode,
          system: 'ATC',
          display: medication.nome || '',
          definition: medication.descricao || '',
          synonyms: medication.sinonimos || [],
        });
      }
    }

    console.log(`✅ Ontology: Found ${entries.length} codes in ${Date.now() - startTime}ms`);

    return {
      source: this.name,
      sourceType: this.source,
      data: { entries },
      metadata: {
        fetchedAt: new Date(),
        resultCount: entries.length,
      },
    };
  }

  /**
   * Search diseases by topic
   */
  private searchDiseases(topic: string): any[] {
    const normalizedTopic = topic.toLowerCase();

    return doencasConsolidadas.filter(disease => {
      const nome = disease.nome?.toLowerCase() || '';
      const descricao = disease.descricao?.toLowerCase() || '';
      const sinonimos = (disease.sinonimos || []).map(s => s?.toLowerCase() || '');

      return (
        nome.includes(normalizedTopic) ||
        descricao.includes(normalizedTopic) ||
        sinonimos.some(s => s.includes(normalizedTopic)) ||
        normalizedTopic.includes(nome)
      );
    }).slice(0, 10); // Limit to top 10 matches
  }

  /**
   * Search medications by topic
   */
  private searchMedications(topic: string): any[] {
    const normalizedTopic = topic.toLowerCase();

    return medicamentosConsolidados.filter(medication => {
      const nome = medication.nome?.toLowerCase() || '';
      const descricao = medication.descricao?.toLowerCase() || '';
      const sinonimos = (medication.sinonimos || []).map(s => s?.toLowerCase() || '');

      return (
        nome.includes(normalizedTopic) ||
        descricao.includes(normalizedTopic) ||
        sinonimos.some(s => s.includes(normalizedTopic))
      );
    }).slice(0, 10); // Limit to top 10 matches
  }

  /**
   * Get ontology codes for specific disease code
   */
  async getByDiseaseCode(code: string): Promise<OntologyEntry[]> {
    const entries: OntologyEntry[] = [];

    const disease = doencasConsolidadas.find(d =>
      d.cid10 === code ||
      d.cid11 === code ||
      d.snomedCT === code ||
      d.ciap2 === code
    );

    if (disease && disease.nome) {
      if (disease.cid11) {
        entries.push({
          code: disease.cid11,
          system: 'ICD-11',
          display: disease.nome,
          definition: disease.descricao || '',
        });
      }

      if (disease.snomedCT) {
        entries.push({
          code: disease.snomedCT,
          system: 'SNOMED-CT',
          display: disease.nome,
          definition: disease.descricao || '',
        });
      }
    }

    return entries;
  }
}

