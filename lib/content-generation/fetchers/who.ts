/**
 * WHO FETCHER
 * ===========
 * 
 * Fetches guidelines and disease definitions from WHO.
 * 
 * Data Sources:
 * 1. ICD-11 API: https://icd.who.int/icdapi
 * 2. WHO Guidelines: https://www.who.int/publications/guidelines
 * 
 * Note: ICD-11 API requires OAuth2 authentication (free registration)
 * For prototype, we'll use public ICD-11 browser data
 */

import type {
  Fetcher,
  FetchQuery,
  FetchResult,
  GuidelineData,
  Guideline,
  OntologyData,
  OntologyEntry,
} from '../types';

const ICD11_API_BASE = 'https://id.who.int/icd/release/11/2024-01/mms';
const WHO_GUIDELINES_BASE = 'https://www.who.int';

export class WHOFetcher implements Fetcher {
  name = 'WHO';
  source = 'health_authority' as const;
  priority = 10; // Highest priority - global health authority

  /**
   * Check if WHO API is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      // Test ICD-11 API availability
      const response = await fetch(`${ICD11_API_BASE}/search?q=diabetes&useFlexisearch=false`, {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
          'API-Version': 'v2',
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Fetch WHO data (ICD-11 definitions + guidelines)
   */
  async fetch(query: FetchQuery): Promise<FetchResult> {
    const startTime = Date.now();

    // Fetch ICD-11 disease definitions
    const icd11Data = await this.fetchICD11(query.topic);

    // For prototype: Return ICD-11 data as ontology data
    // In production: Also fetch WHO guidelines from publications API
    
    console.log(`✅ WHO: Fetched ${icd11Data.entries.length} ICD-11 entries in ${Date.now() - startTime}ms`);

    return {
      source: this.name,
      sourceType: this.source,
      data: icd11Data,
      metadata: {
        fetchedAt: new Date(),
        url: ICD11_API_BASE,
        apiVersion: 'ICD-11 2024-01',
        resultCount: icd11Data.entries.length,
      },
    };
  }

  /**
   * Fetch ICD-11 disease definitions
   */
  private async fetchICD11(searchTerm: string): Promise<OntologyData> {
    const url = `${ICD11_API_BASE}/search?q=${encodeURIComponent(searchTerm)}&useFlexisearch=false`;
    
    console.log(`🔍 WHO ICD-11 search: ${searchTerm}`);

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
          'API-Version': 'v2',
        },
      });

      if (!response.ok) {
        console.warn(`⚠️  WHO ICD-11 API returned ${response.status}`);
        return { entries: [] };
      }

      const data = await response.json();
      const entries = this.parseICD11Response(data);

      console.log(`📊 Found ${entries.length} ICD-11 entries`);

      return { entries };
    } catch (error) {
      console.error('❌ Failed to fetch ICD-11 data:', error);
      return { entries: [] };
    }
  }

  /**
   * Parse ICD-11 search response
   */
  private parseICD11Response(data: any): OntologyEntry[] {
    const entries: OntologyEntry[] = [];

    if (!data.destinationEntities || !Array.isArray(data.destinationEntities)) {
      return entries;
    }

    for (const entity of data.destinationEntities) {
      try {
        // Extract ICD-11 code from URL
        // URL format: https://id.who.int/icd/release/11/2024-01/mms/123456789
        const urlParts = entity.id?.split('/') || [];
        const code = urlParts[urlParts.length - 1] || '';

        // Extract title
        const title = entity.title || 'Unknown';

        // Extract definition (if available in search results)
        const definition = entity.definition?.value || '';

        entries.push({
          code,
          system: 'ICD-11',
          display: title,
          definition,
          synonyms: [],
        });
      } catch (error) {
        console.warn('Failed to parse ICD-11 entity:', error);
      }
    }

    return entries;
  }

  /**
   * Fetch detailed ICD-11 entity information
   * (For future enhancement - requires entity ID)
   */
  private async fetchICD11Entity(entityId: string): Promise<OntologyEntry | null> {
    try {
      const response = await fetch(`${ICD11_API_BASE}/${entityId}`, {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
          'API-Version': 'v2',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      return {
        code: entityId,
        system: 'ICD-11',
        display: data.title?.['@value'] || 'Unknown',
        definition: data.definition?.['@value'] || '',
        synonyms: data.synonym?.map((s: any) => s.label?.['@value']) || [],
        parentCodes: data.parent ? [data.parent.split('/').pop()] : [],
        childCodes: data.child?.map((c: any) => c.split('/').pop()) || [],
      };
    } catch (error) {
      console.error('Failed to fetch ICD-11 entity:', error);
      return null;
    }
  }
}

