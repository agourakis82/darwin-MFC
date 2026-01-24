# Content Generation Pipeline Architecture
## Automated SOTA Content Generation System

**Date:** January 2025  
**Goal:** Fully automated pipeline to generate, validate, and publish SOTA-quality educational content  
**Approach:** Microservices architecture with modular fetchers, synthesizers, validators, and publishers

---

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONTENT GENERATION PIPELINE                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 1: DATA FETCHERS (Official Sources)                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ PubMed   │  │   WHO    │  │   CDC    │  │ Medical  │       │
│  │ Fetcher  │  │ Fetcher  │  │ Fetcher  │  │ Societies│       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ ANVISA   │  │ MS/Brazil│  │ RxNav    │  │ Ontology │       │
│  │ Fetcher  │  │ Fetcher  │  │ Fetcher  │  │ Fetcher  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 2: DATA AGGREGATOR & NORMALIZER                          │
├─────────────────────────────────────────────────────────────────┤
│  • Merge data from multiple sources                             │
│  • Resolve conflicts (prefer higher GRADE level)                │
│  • Normalize formats (JSON schema)                              │
│  • Deduplicate citations                                        │
│  • Extract key facts and recommendations                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 3: AI CONTENT SYNTHESIZER                                │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  LLM Engine (llm-offload + local Mistral)                │  │
│  │  • Generate module content from aggregated data          │  │
│  │  • Maintain academic tone (Q1-level)                     │  │
│  │  • Insert inline citations [1,2,3]                       │  │
│  │  • Structure content (headings, lists, tables)           │  │
│  │  • Generate flashcards, quizzes, clinical cases          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 4: CONTENT VALIDATOR                                     │
├─────────────────────────────────────────────────────────────────┤
│  ✅ Citation Coverage Check (100% of claims)                    │
│  ✅ GRADE Level Verification                                    │
│  ✅ Official Source Verification (≥3 sources)                   │
│  ✅ Ontology Code Validation (ICD-11, SNOMED, LOINC)           │
│  ✅ Recency Check (<5 years)                                    │
│  ✅ Conflict of Interest Disclosure                             │
│  ✅ Readability Score (Flesch-Kincaid 8-10)                     │
│  ✅ Medical Accuracy Check (cross-reference UpToDate)           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 5: MULTILINGUAL TRANSLATOR                               │
├─────────────────────────────────────────────────────────────────┤
│  • Translate to 9 languages (pt, en, es, fr, ru, ar, zh, el, hi)│
│  • Preserve medical terminology                                 │
│  • Adapt cultural context                                       │
│  • Maintain citation integrity                                  │
│  • Use llm-offload for batch translation                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 6: CONTENT PUBLISHER                                     │
├─────────────────────────────────────────────────────────────────┤
│  • Generate TypeScript files (lib/data/learning-paths/)         │
│  • Update translation files (messages/{locale}/)                │
│  • Create reference entries (lib/data/references.ts)            │
│  • Update knowledge graph                                       │
│  • Trigger build and deployment                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```
lib/
├── content-generation/
│   ├── fetchers/
│   │   ├── pubmed.ts              # PubMed E-utilities API
│   │   ├── who.ts                 # WHO guidelines
│   │   ├── cdc.ts                 # CDC guidelines
│   │   ├── anvisa.ts              # ANVISA (Brazil)
│   │   ├── ms-brazil.ts           # Ministério da Saúde
│   │   ├── medical-societies.ts   # ADA, AHA, SBD, SBC, etc.
│   │   ├── rxnav.ts               # RxNav medication API
│   │   ├── ontologies.ts          # SNOMED, LOINC, ICD-11
│   │   └── index.ts               # Fetcher registry
│   │
│   ├── aggregator/
│   │   ├── merge.ts               # Merge data from sources
│   │   ├── normalize.ts           # Normalize to common schema
│   │   ├── conflict-resolver.ts   # Resolve conflicting data
│   │   └── index.ts
│   │
│   ├── synthesizer/
│   │   ├── llm-engine.ts          # LLM interface (llm-offload)
│   │   ├── module-generator.ts    # Generate module content
│   │   ├── flashcard-generator.ts # Generate flashcards
│   │   ├── quiz-generator.ts      # Generate quiz questions
│   │   ├── case-generator.ts      # Generate clinical cases
│   │   ├── prompts/               # LLM prompts library
│   │   │   ├── module.txt
│   │   │   ├── flashcard.txt
│   │   │   ├── quiz.txt
│   │   │   └── case.txt
│   │   └── index.ts
│   │
│   ├── validator/
│   │   ├── citation-checker.ts    # Verify citation coverage
│   │   ├── grade-checker.ts       # Verify GRADE levels
│   │   ├── source-checker.ts      # Verify official sources
│   │   ├── ontology-checker.ts    # Verify ontology codes
│   │   ├── recency-checker.ts     # Verify publication dates
│   │   ├── readability-checker.ts # Flesch-Kincaid score
│   │   └── index.ts
│   │
│   ├── translator/
│   │   ├── translate.ts           # Translation engine
│   │   ├── terminology.ts         # Medical terminology preservation
│   │   ├── cultural-adapter.ts    # Cultural context adaptation
│   │   └── index.ts
│   │
│   ├── publisher/
│   │   ├── typescript-generator.ts # Generate .ts files
│   │   ├── translation-updater.ts  # Update translation JSONs
│   │   ├── reference-updater.ts    # Update references.ts
│   │   ├── graph-updater.ts        # Update knowledge graph
│   │   └── index.ts
│   │
│   ├── types/
│   │   ├── fetcher.ts             # Fetcher interfaces
│   │   ├── aggregated-data.ts     # Aggregated data schema
│   │   ├── generated-content.ts   # Generated content schema
│   │   ├── validation-result.ts   # Validation result schema
│   │   └── index.ts
│   │
│   ├── config/
│   │   ├── api-keys.ts            # API configuration
│   │   ├── sources.ts             # Source priority/weights
│   │   ├── validation-rules.ts    # Validation thresholds
│   │   └── index.ts
│   │
│   └── pipeline.ts                # Main pipeline orchestrator
│
├── data/
│   └── learning-paths/
│       └── generated/             # Auto-generated paths
│           ├── diabetes-management.ts
│           ├── hypertension.ts
│           └── ...
│
└── scripts/
    ├── generate-learning-path.ts  # CLI to generate single path
    ├── generate-all-paths.ts      # CLI to generate all 20 paths
    └── update-content.ts          # CLI to update existing content
```

---

## 🔧 Core Components

### **1. Fetcher Interface**

```typescript
// lib/content-generation/types/fetcher.ts
export interface Fetcher {
  name: string;
  source: 'health_authority' | 'medical_society' | 'literature' | 'ontology';
  priority: number; // 1-10, higher = more authoritative
  
  fetch(query: FetchQuery): Promise<FetchResult>;
  isAvailable(): Promise<boolean>;
}

export interface FetchQuery {
  topic: string;
  diseaseCode?: string; // ICD-11, SNOMED-CT
  medicationCode?: string; // ATC, RxNorm
  filters?: {
    publicationDateFrom?: Date;
    publicationDateTo?: Date;
    studyTypes?: ('rct' | 'meta_analysis' | 'systematic_review' | 'cohort')[];
    gradeLevel?: ('Ia' | 'Ib' | 'IIa' | 'IIb' | 'III' | 'IV')[];
  };
}

export interface FetchResult {
  source: string;
  data: GuidelineData | LiteratureData | OntologyData;
  metadata: {
    fetchedAt: Date;
    url?: string;
    apiVersion?: string;
  };
}
```

### **2. Aggregated Data Schema**

```typescript
// lib/content-generation/types/aggregated-data.ts
export interface AggregatedData {
  topic: string;

  // Official guidelines
  guidelines: {
    who?: GuidelineData;
    cdc?: GuidelineData;
    msBrazil?: GuidelineData;
    medicalSocieties: GuidelineData[];
  };

  // SOTA literature
  literature: {
    systematicReviews: LiteratureData[];
    metaAnalyses: LiteratureData[];
    rcts: LiteratureData[];
  };

  // Ontology data
  ontologies: {
    icd11?: OntologyData;
    snomedCt?: OntologyData;
    loinc?: OntologyData[];
    atc?: OntologyData;
  };

  // Aggregated facts
  keyFacts: Fact[];
  recommendations: Recommendation[];
  controversies: Controversy[];

  // Metadata
  metadata: {
    aggregatedAt: Date;
    sourceCount: number;
    highestGradeLevel: string;
  };
}
```

### **3. Generated Content Schema**

```typescript
// lib/content-generation/types/generated-content.ts
export interface GeneratedModule {
  id: string;
  titleKey: string;
  descriptionKey: string;
  type: 'content' | 'video' | 'quiz' | 'case_study' | 'flashcards';
  order: number;
  estimatedMinutes: number;

  content: {
    markdown: string; // Main content with inline citations
    citations: Citation[]; // Vancouver-style references
    gradeLevel: string; // Overall GRADE level
  };

  metadata: {
    generatedAt: Date;
    sources: string[]; // Source names
    ontologyCodes: {
      icd11?: string[];
      snomedCt?: string[];
      loinc?: string[];
    };
    validationScore: number; // 0-100
  };
}

export interface GeneratedFlashcard {
  id: string;
  front: string;
  back: string;
  explanation: string;
  citation: Citation;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
  mnemonic?: string;
}

export interface GeneratedQuiz {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'case_based';
  question: string;
  options?: string[]; // For MCQ
  correctAnswer: string | number;
  explanation: string;
  citations: Citation[];
  gradeLevel: string;
  difficulty: 'easy' | 'medium' | 'hard';
  bloomsLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate';
}

export interface GeneratedClinicalCase {
  id: string;
  title: string;
  patientPresentation: string;
  clinicalFindings: string[];
  labResults?: LabResult[];
  differentialDiagnosis: Diagnosis[];
  correctDiagnosis: string;
  management: string;
  followUp: string;
  learningPoints: string[];
  citations: Citation[];
}
```

### **4. Validation Result Schema**

```typescript
// lib/content-generation/types/validation-result.ts
export interface ValidationResult {
  isValid: boolean;
  score: number; // 0-100

  checks: {
    citationCoverage: CheckResult;
    gradeLevel: CheckResult;
    officialSources: CheckResult;
    ontologyCodes: CheckResult;
    recency: CheckResult;
    conflictDisclosure: CheckResult;
    readability: CheckResult;
    medicalAccuracy: CheckResult;
  };

  errors: ValidationError[];
  warnings: ValidationWarning[];

  metadata: {
    validatedAt: Date;
    validatorVersion: string;
  };
}

export interface CheckResult {
  passed: boolean;
  score: number;
  details: string;
  suggestions?: string[];
}
```

---

## 🔄 Pipeline Workflow

### **Main Pipeline Orchestrator**

```typescript
// lib/content-generation/pipeline.ts
export class ContentGenerationPipeline {
  private fetchers: Fetcher[];
  private aggregator: DataAggregator;
  private synthesizer: ContentSynthesizer;
  private validator: ContentValidator;
  private translator: ContentTranslator;
  private publisher: ContentPublisher;

  async generateLearningPath(config: LearningPathConfig): Promise<GeneratedLearningPath> {
    console.log(`🚀 Starting pipeline for: ${config.title}`);

    // LAYER 1: Fetch data from all sources
    console.log('📥 Layer 1: Fetching data from official sources...');
    const fetchedData = await this.fetchAllSources(config.topic);

    // LAYER 2: Aggregate and normalize
    console.log('🔄 Layer 2: Aggregating and normalizing data...');
    const aggregatedData = await this.aggregator.aggregate(fetchedData);

    // LAYER 3: Synthesize content
    console.log('🤖 Layer 3: Synthesizing content with AI...');
    const modules = await this.synthesizer.generateModules(aggregatedData, config);
    const flashcards = await this.synthesizer.generateFlashcards(aggregatedData, config);
    const quizzes = await this.synthesizer.generateQuizzes(aggregatedData, config);
    const cases = await this.synthesizer.generateCases(aggregatedData, config);

    // LAYER 4: Validate
    console.log('✅ Layer 4: Validating content quality...');
    const validation = await this.validator.validate({
      modules,
      flashcards,
      quizzes,
      cases,
    });

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    // LAYER 5: Translate
    console.log('🌍 Layer 5: Translating to 9 languages...');
    const translated = await this.translator.translate({
      modules,
      flashcards,
      quizzes,
      cases,
    });

    // LAYER 6: Publish
    console.log('📤 Layer 6: Publishing content...');
    const published = await this.publisher.publish(translated);

    console.log('✅ Pipeline complete!');
    return published;
  }

  private async fetchAllSources(topic: string): Promise<FetchedData[]> {
    const queries = this.buildQueries(topic);
    const results = await Promise.all(
      this.fetchers.map(fetcher => fetcher.fetch(queries))
    );
    return results.filter(r => r !== null);
  }
}
```

### **Usage Example**

```typescript
// scripts/generate-learning-path.ts
import { ContentGenerationPipeline } from '@/lib/content-generation/pipeline';

const pipeline = new ContentGenerationPipeline({
  fetchers: [
    new PubMedFetcher(),
    new WHOFetcher(),
    new CDCFetcher(),
    new ANVISAFetcher(),
    new MedicalSocietiesFetcher(),
    new OntologyFetcher(),
  ],
});

const config = {
  id: 'diabetes-management',
  title: 'Diabetes Management in Primary Care',
  topic: 'diabetes mellitus type 2',
  modules: [
    { title: 'Introduction to Diabetes', type: 'content' },
    { title: 'Diagnosis and Screening', type: 'content' },
    { title: 'Pharmacological Management', type: 'content' },
    { title: 'Lifestyle Interventions', type: 'content' },
    { title: 'Complications and Prevention', type: 'content' },
    { title: 'Patient Education', type: 'content' },
    { title: 'Case Studies', type: 'case_study' },
    { title: 'Knowledge Check', type: 'quiz' },
    { title: 'Flashcard Review', type: 'flashcards' },
  ],
  flashcardCount: 50,
  quizCount: 50,
  caseCount: 5,
};

const result = await pipeline.generateLearningPath(config);
console.log(`✅ Generated: ${result.path}`);
```

---

## 🎯 Implementation Phases

### **Phase 1: Core Infrastructure (Week 1)**
- [ ] Set up directory structure
- [ ] Define TypeScript interfaces
- [ ] Create base classes (Fetcher, Aggregator, etc.)
- [ ] Set up configuration system

### **Phase 2: Fetchers (Week 2)**
- [ ] Implement PubMed fetcher (priority 1)
- [ ] Implement WHO fetcher
- [ ] Implement medical societies fetcher
- [ ] Implement ontology fetcher
- [ ] Test all fetchers independently

### **Phase 3: Aggregator & Synthesizer (Week 3)**
- [ ] Implement data aggregator
- [ ] Implement conflict resolver
- [ ] Implement LLM engine wrapper (llm-offload)
- [ ] Create prompt templates
- [ ] Test synthesis with sample data

### **Phase 4: Validator & Translator (Week 4)**
- [ ] Implement all validation checks
- [ ] Implement translation engine
- [ ] Test validation rules
- [ ] Test translation quality

### **Phase 5: Publisher & Integration (Week 5)**
- [ ] Implement TypeScript file generator
- [ ] Implement translation file updater
- [ ] Implement reference updater
- [ ] Test end-to-end pipeline

### **Phase 6: Pilot Generation (Week 6)**
- [ ] Generate Diabetes Management path
- [ ] Manual quality review
- [ ] Iterate and refine
- [ ] Document lessons learned

### **Phase 7: Scale (Weeks 7-12)**
- [ ] Generate remaining 19 learning paths
- [ ] Continuous quality monitoring
- [ ] Performance optimization
- [ ] Documentation

---

## 📊 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Generation Speed** | <2 hours per path | Pipeline execution time |
| **Validation Pass Rate** | >95% | Automated validation |
| **Citation Coverage** | 100% | Citation checker |
| **Source Diversity** | ≥3 official sources | Source counter |
| **Translation Quality** | >90% accuracy | Manual spot-check |
| **Content Freshness** | <5 years | Publication date check |

---

## 🚀 Next Steps

Now that we have the complete architecture, we can:

**A)** Start implementing **Phase 1: Core Infrastructure** (set up directories, interfaces)

**B)** Start implementing **Phase 2: PubMed Fetcher** (quickest win, free API)

**C)** Create a **simplified prototype** to test the concept end-to-end

**D)** Review and refine the architecture before implementation

**What would you like to do?** Reply with **A**, **B**, **C**, or **D**! 🚀


