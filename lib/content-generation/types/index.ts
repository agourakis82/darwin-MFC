/**
 * CONTENT GENERATION TYPES
 * =========================
 * 
 * Type definitions for the content generation pipeline.
 */

// =============================================================================
// FETCHER TYPES
// =============================================================================

export type SourceType = 'health_authority' | 'medical_society' | 'literature' | 'ontology';
export type StudyType = 'rct' | 'meta_analysis' | 'systematic_review' | 'cohort' | 'case_control' | 'case_series';
export type GradeLevel = 'Ia' | 'Ib' | 'IIa' | 'IIb' | 'III' | 'IV';

export interface FetchQuery {
  topic: string;
  diseaseCode?: string; // ICD-11, SNOMED-CT
  medicationCode?: string; // ATC, RxNorm
  filters?: {
    publicationDateFrom?: Date;
    publicationDateTo?: Date;
    studyTypes?: StudyType[];
    gradeLevels?: GradeLevel[];
    maxResults?: number;
  };
}

export interface FetchResult {
  source: string;
  sourceType: SourceType;
  data: LiteratureData | GuidelineData | OntologyData;
  metadata: {
    fetchedAt: Date;
    url?: string;
    apiVersion?: string;
    resultCount: number;
  };
}

export interface Fetcher {
  name: string;
  source: SourceType;
  priority: number; // 1-10, higher = more authoritative
  
  fetch(query: FetchQuery): Promise<FetchResult>;
  isAvailable(): Promise<boolean>;
}

// =============================================================================
// LITERATURE DATA (PubMed, Cochrane)
// =============================================================================

export interface LiteratureData {
  articles: Article[];
}

export interface Article {
  pmid?: string;
  doi?: string;
  title: string;
  abstract: string;
  authors: Author[];
  journal: string;
  publicationDate: Date;
  studyType?: StudyType;
  gradeLevel?: GradeLevel;
  keywords?: string[];
  meshTerms?: string[];
  citationCount?: number;
  url?: string;
}

export interface Author {
  lastName: string;
  firstName: string;
  initials?: string;
  affiliation?: string;
}

// =============================================================================
// GUIDELINE DATA (WHO, CDC, Medical Societies)
// =============================================================================

export interface GuidelineData {
  guidelines: Guideline[];
}

export interface Guideline {
  id: string;
  title: string;
  organization: string;
  publicationDate: Date;
  version?: string;
  url: string;
  summary: string;
  recommendations: Recommendation[];
  evidenceLevel?: GradeLevel;
}

export interface Recommendation {
  text: string;
  strength: 'strong' | 'weak' | 'conditional';
  evidenceLevel: GradeLevel;
  citation?: string;
}

// =============================================================================
// ONTOLOGY DATA (ICD-11, SNOMED-CT, LOINC)
// =============================================================================

export interface OntologyData {
  entries: OntologyEntry[];
}

export interface OntologyEntry {
  code: string;
  system: 'ICD-11' | 'SNOMED-CT' | 'LOINC' | 'ATC' | 'RxNorm';
  display: string;
  definition?: string;
  synonyms?: string[];
  parentCodes?: string[];
  childCodes?: string[];
  relatedCodes?: string[];
}

// =============================================================================
// AGGREGATED DATA
// =============================================================================

export interface AggregatedData {
  topic: string;
  
  guidelines: {
    who?: GuidelineData;
    cdc?: GuidelineData;
    msBrazil?: GuidelineData;
    medicalSocieties: GuidelineData[];
  };
  
  literature: {
    systematicReviews: Article[];
    metaAnalyses: Article[];
    rcts: Article[];
    other: Article[];
  };
  
  ontologies: {
    icd11?: OntologyEntry[];
    snomedCt?: OntologyEntry[];
    loinc?: OntologyEntry[];
    atc?: OntologyEntry[];
  };
  
  metadata: {
    aggregatedAt: Date;
    sourceCount: number;
    articleCount: number;
    highestGradeLevel?: GradeLevel;
  };
}

// =============================================================================
// GENERATED CONTENT
// =============================================================================

export interface GeneratedModule {
  id: string;
  title: string;
  content: string; // Markdown with inline citations
  estimatedMinutes: number;
  citations: Citation[];
  metadata: {
    generatedAt: Date;
    sources: string[];
    validationScore?: number;
  };
}

export interface Citation {
  id: string;
  authors: string;
  title: string;
  journal?: string;
  year: number;
  doi?: string;
  pmid?: string;
  url?: string;
  vancouverStyle: string;
}

