/**
 * DATA AGGREGATOR
 * ===============
 * 
 * Merges data from multiple fetchers with priority-based conflict resolution.
 */

import type { FetchResult, LiteratureData, GuidelineData, OntologyData } from '../types';

/**
 * Aggregated data from all fetchers
 */
export interface AggregatedData {
  topic: string;
  
  // Literature (PubMed)
  articles: Array<{
    pmid: string;
    doi?: string;
    title: string;
    abstract: string;
    authors: string[];
    journal: string;
    publicationDate: Date;
    meshTerms: string[];
    studyType?: string;
    source: string;
    priority: number;
  }>;
  
  // Guidelines (Medical Societies + Brazil)
  guidelines: Array<{
    organization: string;
    title: string;
    url: string;
    publicationDate: Date;
    summary: string;
    source: string;
    priority: number;
  }>;
  
  // Ontology codes
  ontologyCodes: {
    icd11: string[];
    snomedCT: string[];
    loinc: string[];
    atc: string[];
    ciap2: string[];
  };
  
  // Metadata
  metadata: {
    totalSources: number;
    fetchedAt: Date;
    sources: Array<{
      name: string;
      type: string;
      priority: number;
      resultCount: number;
    }>;
  };
}

/**
 * Aggregator class
 */
export class DataAggregator {
  /**
   * Merge results from multiple fetchers
   */
  aggregate(results: FetchResult[]): AggregatedData {
    const articles: AggregatedData['articles'] = [];
    const guidelines: AggregatedData['guidelines'] = [];
    const ontologyCodes: AggregatedData['ontologyCodes'] = {
      icd11: [],
      snomedCT: [],
      loinc: [],
      atc: [],
      ciap2: [],
    };
    
    // Sort by priority (higher first)
    const sortedResults = [...results].sort((a, b) => {
      const priorityA = this.getSourcePriority(a.source);
      const priorityB = this.getSourcePriority(b.source);
      return priorityB - priorityA;
    });
    
    // Process each result
    for (const result of sortedResults) {
      const priority = this.getSourcePriority(result.source);
      
      if (result.sourceType === 'literature') {
        const data = result.data as LiteratureData;
        for (const article of data.articles) {
          articles.push({
            ...article,
            source: result.source,
            priority,
          });
        }
      } else if (result.sourceType === 'medical_society' || result.sourceType === 'health_authority') {
        const data = result.data as GuidelineData;
        for (const guideline of data.guidelines) {
          guidelines.push({
            ...guideline,
            source: result.source,
            priority,
          });
        }
      } else if (result.sourceType === 'ontology') {
        const data = result.data as OntologyData;

        // Handle both 'codes' and 'entries' (for compatibility)
        const codes = (data as any).codes || (data as any).entries || [];

        // Merge ontology codes (deduplicate)
        ontologyCodes.icd11.push(...codes.filter((c: any) => c.system === 'ICD-11').map((c: any) => c.code));
        ontologyCodes.snomedCT.push(...codes.filter((c: any) => c.system === 'SNOMED-CT').map((c: any) => c.code));
        ontologyCodes.loinc.push(...codes.filter((c: any) => c.system === 'LOINC').map((c: any) => c.code));
        ontologyCodes.atc.push(...codes.filter((c: any) => c.system === 'ATC').map((c: any) => c.code));
        ontologyCodes.ciap2.push(...codes.filter((c: any) => c.system === 'CIAP-2').map((c: any) => c.code));
      }
    }
    
    // Deduplicate ontology codes
    ontologyCodes.icd11 = [...new Set(ontologyCodes.icd11)];
    ontologyCodes.snomedCT = [...new Set(ontologyCodes.snomedCT)];
    ontologyCodes.loinc = [...new Set(ontologyCodes.loinc)];
    ontologyCodes.atc = [...new Set(ontologyCodes.atc)];
    ontologyCodes.ciap2 = [...new Set(ontologyCodes.ciap2)];
    
    // Deduplicate articles by PMID
    const uniqueArticles = this.deduplicateArticles(articles);
    
    // Deduplicate guidelines by URL
    const uniqueGuidelines = this.deduplicateGuidelines(guidelines);
    
    return {
      topic: '', // Will be set by caller
      articles: uniqueArticles,
      guidelines: uniqueGuidelines,
      ontologyCodes,
      metadata: {
        totalSources: results.length,
        fetchedAt: new Date(),
        sources: results.map(r => ({
          name: r.source,
          type: r.sourceType,
          priority: this.getSourcePriority(r.source),
          resultCount: r.metadata.resultCount,
        })),
      },
    };
  }
  
  /**
   * Get priority for a source
   */
  private getSourcePriority(source: string): number {
    // Health authorities have highest priority
    if (source.includes('WHO') || source.includes('Brazil')) return 10;
    
    // Medical societies and PubMed
    if (source.includes('Medical Societies') || source.includes('PubMed')) return 9;
    
    // Ontology
    if (source.includes('Ontology')) return 7;
    
    return 5; // Default
  }
  
  /**
   * Deduplicate articles by PMID
   */
  private deduplicateArticles(articles: AggregatedData['articles']): AggregatedData['articles'] {
    const seen = new Set<string>();
    return articles.filter(article => {
      if (seen.has(article.pmid)) return false;
      seen.add(article.pmid);
      return true;
    });
  }
  
  /**
   * Deduplicate guidelines by URL
   */
  private deduplicateGuidelines(guidelines: AggregatedData['guidelines']): AggregatedData['guidelines'] {
    const seen = new Set<string>();
    return guidelines.filter(guideline => {
      if (seen.has(guideline.url)) return false;
      seen.add(guideline.url);
      return true;
    });
  }
}

