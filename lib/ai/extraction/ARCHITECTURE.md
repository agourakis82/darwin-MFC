# BioBERT Entity Extraction Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Darwin-MFC Application                       │
├─────────────────────────────────────────────────────────────────┤
│  Prontuário │ SOAP Notes │ Search │ Drug Interactions │ Etc.    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────┐
        │   extraction/index.ts            │
        │   (Public API Layer)             │
        └──────────┬───────────────────────┘
                   │
        ┌──────────┴──────────────────┐
        │                             │
        ▼                             ▼
   ┌──────────────┐         ┌─────────────────┐
   │ biobert-     │         │  entity-linker  │
   │ extractor.ts │         │  .ts            │
   │              │         │                 │
   │ • BIO tagging│         │ • ICD-10        │
   │ • Softmax    │         │ • SNOMED-CT     │
   │ • Confidence │         │ • ATC           │
   │ • Fallback   │         │ • CIAP-2        │
   └──────┬───────┘         └────────┬────────┘
          │                          │
          └──────────────┬───────────┘
                         │
              ┌──────────▼──────────┐
              │ biobert-loader.ts   │
              │ (Model Management)  │
              │                     │
              │ • ONNX session      │
              │ • IndexedDB cache   │
              │ • Download progress │
              │ • Lazy loading      │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │ onnx-config.ts      │
              │ (Configuration)     │
              │                     │
              │ • NER labels        │
              │ • Model params      │
              │ • Device detection  │
              │ • Session options   │
              └─────────────────────┘
```

## Data Flow

### 1. Text Input → Entity Extraction

```
Input Text
    │
    ▼
┌─────────────────────────┐
│ Tokenization            │
│ • BERT wordpiece tokens │
│ • Special tokens [CLS]  │
│ • Padding to max length │
└──────────┬──────────────┘
           │
           ▼
┌──────────────────────────────┐
│ BioBERT Inference (GPU/WASM) │
│ • Forward pass through model │
│ • Output: logits tensor      │
│ • Shape: [seq_len, labels]   │
└──────────┬───────────────────┘
           │
           ▼
┌────────────────────────────┐
│ Label Prediction           │
│ • Softmax over logits      │
│ • Confidence scoring       │
│ • Label ID → label string  │
└──────────┬─────────────────┘
           │
           ▼
┌────────────────────────────┐
│ BIO Sequence Parsing       │
│ • Convert B-/I- tags      │
│ • Merge multi-token ents  │
│ • Map to char positions   │
└──────────┬─────────────────┘
           │
           ▼
Extracted Entities
(text, type, confidence, position)
```

### 2. Entity Linking to Ontologies

```
Extracted Entities
    │
    ├─► DISEASE
    │   └─► Disease Database Lookup
    │       ├─► Levenshtein distance
    │       ├─► Jaccard similarity
    │       └─► Synonym matching
    │           │
    │           ▼
    │       ┌─────────────────┐
    │       │ Best Match      │
    │       ├─ ICD-10 codes  │
    │       ├─ SNOMED-CT     │
    │       ├─ CIAP-2        │
    │       └─ DOID          │
    │
    ├─► MEDICATION
    │   └─► Medication Database Lookup
    │       ├─ Generic names
    │       ├─ Commercial names
    │       └─ Similarity matching
    │           │
    │           ▼
    │       ┌─────────────────┐
    │       │ Best Match      │
    │       ├─ ATC code      │
    │       ├─ SNOMED-CT     │
    │       └─ RxNorm CUI    │
    │
    └─► SYMPTOM
        └─ Symptom Database Lookup
            │
            ▼
            Ontology Links
            (SNOMED-CT, DOID)
```

## Module Responsibilities

### onnx-config.ts

**Purpose**: Configuration and type definitions

**Exports**:
- `BIOBERT_CONFIG`: Model parameters (layers, hidden size, vocab)
- `NER_LABELS`: Entity type definitions and BIO tags
- `ExecutionProviders`: GPU backend selection
- `SessionOptions`: ONNX Runtime configuration
- `detectDeviceCapabilities()`: Browser capability detection

**Key Types**:
```typescript
interface ModelConfig {
  maxSequenceLength: 512
  vocabularySize: 28996
  hiddenSize: 768
  numLayers: 12
  numLabels: 13 // O, B-DISEASE, I-DISEASE, ...
}

type EntityType = 'DISEASE' | 'MEDICATION' | 'SYMPTOM' | 'EXAM' | 'PROCEDURE' | 'O'

interface NERLabelConfig {
  id: number
  label: string ('B-DISEASE', 'I-DISEASE', etc.)
  entityType: EntityType
  color: string
  description: string
}
```

### biobert-loader.ts

**Purpose**: Model lifecycle management

**Key Functions**:
- `initializeONNXRuntime()`: Set up ONNX environment
- `loadBioBERTModel()`: Lazy load model with caching
- `onLoadingProgress()`: Subscribe to loading updates
- `preprocessText()`: Tokenize and create input tensors
- `parseBIOTags()`: Convert token labels to entities

**Key Internals**:
- IndexedDB cache with TTL
- Device-aware execution provider selection
- XMLHttpRequest download with progress
- Session creation with error handling

**State Management**:
```typescript
let modelSession: InferenceSession | null = null
let isLoadingModel: boolean = false
let loadingPromise: Promise<InferenceSession | null> | null = null
let lastLoadError: Error | null = null
```

### biobert-extractor.ts

**Purpose**: Named Entity Recognition using BioBERT

**Key Functions**:
- `extractMedicalEntities()`: Main extraction function
- `extractEntitiesBioBERT()`: Run BioBERT inference
- `extractEntitiesBatch()`: Process multiple texts
- `softmax()`: Probability distribution
- `parseBIOTags()`: BIO sequence decoding

**Fallback Strategy**:
```
Try BioBERT
  ├─ Success? Return BioBERT results
  ├─ Model unavailable? Use regex
  └─ Hybrid mode? Merge both results
```

**Confidence Scoring**:
```
For multi-token entities:
  confidence = avg(token_confidences)
  Weight: first token (B-) = 1.0, others (I-) = 0.8

Final entity confidence:
  if hybrid mode:
    (biobert_confidence + regex_confidence) / 2
  else:
    best_method_confidence
```

### entity-linker.ts

**Purpose**: Link extracted entities to medical ontologies

**Key Functions**:
- `linkEntities()`: Main linking function
- `linkDiseaseEntity()`: Match diseases to database
- `linkMedicationEntity()`: Match medications to database
- `linkSymptomEntity()`: Match symptoms to ontologies
- `getPrimaryOntologyCode()`: Extract primary code
- `formatLinkedEntity()`: Format for display

**Matching Algorithm**:
```
1. Text Normalization
   - Lowercase
   - Remove accents
   - Remove special characters

2. Similarity Scoring (combination):
   a) Levenshtein Distance (60% weight)
      - Edit distance between strings
      - 0 = identical, 1 = completely different

   b) Jaccard Similarity (40% weight)
      - Word-level overlap
      - Good for multi-word terms

3. Final Confidence
   confidence = min(
     combined_similarity * 0.6 +
     jaccard_similarity * 0.4,
     1.0
   )

4. Selection
   - Choose match with highest confidence
   - Return top 5 matches
```

### index.ts

**Purpose**: Public API and convenience functions

**Key Exports**:
- All types from sub-modules
- `extractAndLinkEntities()`: End-to-end pipeline
- `extractAndLinkEntitiesBatch()`: Batch processing

**Type Hierarchy**:
```typescript
ExtractedEntity
├─ text: string
├─ type: EntityType
├─ confidence: number
├─ source: 'biobert' | 'regex' | 'hybrid'
└─ metadata: { bioScore, regexMatch, aggregationScore }

LinkedEntity extends ExtractedEntity
├─ linkedTo: LinkedResource[]
└─ LinkedResource
   ├─ resourceType: 'disease' | 'medication' | 'symptom'
   ├─ id: string
   ├─ name: string
   ├─ confidence: number
   └─ ontologies: {
      icd10?: string[]
      snomedCT?: string
      atcCode?: string
      ciap2?: string[]
      doid?: string
      ...
    }
```

## Performance Characteristics

### Inference Latency

```
Text Length   WebGPU    WebGL     WASM
───────────────────────────────────────
1 sent (~50w)  50-100ms  150-300ms  500-1000ms
1 para (~200w) 100-150ms 300-500ms  1-2 sec
Full note (~500w) 150-250ms 500-800ms  2-5 sec
```

### Memory Usage

| Component | Size |
|-----------|------|
| ONNX Runtime | 10MB |
| BioBERT Model | 50MB |
| Input tokens | 1-2MB |
| Session state | 30-50MB |
| **Total** | **~100MB** |

### Caching Benefits

```
First load:  ~100MB network, ~100MB memory
Cached load: ~5MB network (validation), ~100MB memory
Total: ~1 hour of usage = ~500MB memory (with 5 models)
```

## Error Handling

### Graceful Degradation

```
Level 1: BioBERT Available
├─ Use transformer-based NER
├─ Highest accuracy
└─ 50-1000ms per text

Level 2: BioBERT Failed
├─ Fallback to regex NLP
├─ Good for common entities
└─ <100ms per text

Level 3: Regex Failed
└─ Return empty results with explanation
```

### Error Types

```typescript
ONNXConfigError
├─ ModelNotFoundError: Model not at expected path
├─ DeviceNotSupportedError: GPU/execution provider not available
└─ SessionCreationError: ONNX session creation failed

Logged with:
├─ Error message
├─ Error code
└─ Original error details
```

## Extensibility

### Adding New Entity Types

1. **Update NER_LABELS** in onnx-config.ts:
```typescript
{ id: 13, label: 'B-DIAGNOSIS', entityType: 'DIAGNOSIS', color: 'blue' }
{ id: 14, label: 'I-DIAGNOSIS', entityType: 'DIAGNOSIS', color: 'blue' }
```

2. **Update EntityType** union:
```typescript
export type EntityType = 'DISEASE' | 'MEDICATION' | ... | 'DIAGNOSIS'
```

3. **Add linking function** in entity-linker.ts:
```typescript
export function linkDiagnosisEntity(text: string, confidence: number): LinkedResource | null {
  // ... matching logic
}
```

### Supporting New Languages

```
1. Train BioBERT on medical texts in target language
2. Export to ONNX format
3. Update BIOBERT_CONFIG.modelPath
4. Add language-specific tokenizer
5. Test with samples in target language
```

### Integrating Custom Ontologies

```typescript
const CUSTOM_ONTOLOGIES: Record<string, OntologyLinks> = {
  'entity-name': {
    customCode: 'XYZ-123',
    customDb: { ... }
  }
};

// In entity-linker.ts:
export function linkCustomEntity(text: string): LinkedResource | null {
  const normalized = normalizeText(text);
  for (const [key, ontology] of Object.entries(CUSTOM_ONTOLOGIES)) {
    if (normalizeText(key) === normalized) {
      return { resourceType: 'custom', ... }
    }
  }
  return null;
}
```

## Testing Strategy

### Unit Tests

```typescript
// Test similarity functions
calculateSimilarity('diabetes', 'diabetes mellitus') → 0.85

// Test BIO parsing
parseBIOTags(['patient', 'has', 'diabetes'], [0, 0, 1]) → [Disease entity]

// Test softmax
softmax([1.0, 2.0, 3.0]) → [0.09, 0.24, 0.67]
```

### Integration Tests

```typescript
// Test end-to-end extraction
input: "Patient with type 2 diabetes"
output: { entities: [Disease], usesBiobert: true, confidence: 0.92 }

// Test fallback
model unavailable
input: same text
output: { entities: [Disease], usesBiobert: false, confidence: 0.7 }
```

### Performance Tests

```typescript
// Measure inference time
extractMedicalEntities(longText) → timing < 5 seconds

// Measure memory
Model loaded + 10 texts analyzed → memory < 200MB
```

## Deployment Checklist

- [ ] Add onnxruntime-web to package.json
- [ ] Update @types/onnxruntime-web
- [ ] Test in target browsers (Chrome, Firefox, Safari)
- [ ] Verify model URL is accessible
- [ ] Check CORS headers on model server
- [ ] Test offline mode (IndexedDB fallback)
- [ ] Monitor model download bandwidth
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Create user-facing loading UI
- [ ] Document keyboard shortcuts for power users
- [ ] Set up A/B testing for BioBERT vs regex

## Future Roadmap

### Phase 1: Current (MVP)
- BioBERT-base NER
- ICD-10, SNOMED-CT linking
- Regex fallback

### Phase 2: Enhancement
- Fine-tuning on Darwin-MFC data
- Multi-lingual support
- Relation extraction (entity pairs)
- Coreference resolution

### Phase 3: Advanced
- Custom domain models
- Real-time feedback loop
- User validation dashboard
- Confidence calibration

### Phase 4: Integration
- Electronic health record integration
- HL7/FHIR export
- Interoperability certifications
- Clinical validation studies
