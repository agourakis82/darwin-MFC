# BioBERT-based Entity Extraction Infrastructure

## Overview

This module implements a production-grade Named Entity Recognition (NER) system for Darwin-MFC using BioBERT, a domain-specific BERT model fine-tuned on biomedical literature. It extracts medical entities from clinical notes with high accuracy and automatically links them to standardized medical ontologies.

**Key Features:**
- Transformer-based NER with confidence scoring
- Client-side inference only (suitable for static sites)
- Graceful fallback to regex-based extraction
- Automatic entity linking to ICD-10, SNOMED-CT, ATC, CIAP-2
- IndexedDB model caching for faster subsequent loads
- Device-aware optimization (WebGPU → WebGL → WASM)
- Hybrid mode combining BioBERT + regex for better coverage

## Architecture

### Directory Structure

```
lib/ai/
├── models/
│   ├── onnx-config.ts          # Configuration, types, device detection
│   └── biobert-loader.ts       # Model loading, caching, inference
├── extraction/
│   ├── biobert-extractor.ts    # NER implementation with BIO tagging
│   ├── entity-linker.ts        # Ontology linking (ICD-10, SNOMED-CT, ATC)
│   ├── index.ts                # Main exports
│   └── BIOBERT_README.md       # This file
└── ...
```

### Module Responsibilities

1. **onnx-config.ts** - Configuration and device detection
   - Define model parameters (vocabulary size, layers, etc.)
   - NER label configuration (entity types, BIO tags)
   - Device capability detection (WebGPU, WebGL, WASM)
   - Session and inference options

2. **biobert-loader.ts** - Model lifecycle management
   - Lazy loading on first use
   - IndexedDB caching with TTL
   - Download progress tracking
   - Graceful fallback to null if model unavailable

3. **biobert-extractor.ts** - Entity recognition
   - BIO tagging sequence labeling
   - Softmax confidence scoring
   - Character-position mapping
   - Regex fallback when model unavailable
   - Hybrid mode for improved coverage

4. **entity-linker.ts** - Ontology integration
   - Fuzzy matching against disease/medication databases
   - ICD-10 / ICD-11 linking
   - SNOMED-CT mapping
   - ATC drug classification
   - CIAP-2 codes

5. **index.ts** - Public API
   - Clean unified interface
   - Type exports
   - Convenience functions

## Entity Types

The system extracts five medical entity types:

| Type | Label | Example |
|------|-------|---------|
| **DISEASE** | B-DISEASE / I-DISEASE | "diabetes mellitus", "hypertension" |
| **MEDICATION** | B-MEDICATION / I-MEDICATION | "metformin", "lisinopril" |
| **SYMPTOM** | B-SYMPTOM / I-SYMPTOM | "fever", "chest pain" |
| **EXAM** | B-EXAM / I-EXAM | "blood pressure", "hemoglobin" |
| **PROCEDURE** | B-PROCEDURE / I-PROCEDURE | "coronary angiography", "biopsy" |

BIO tagging follows IOB2 format:
- **B-** (Begin): First token of entity
- **I-** (Inside): Continuation of entity
- **O**: Outside any entity

## Usage

### Basic Extraction

```typescript
import { extractMedicalEntities } from '@/lib/ai/extraction';

const text = "Patient presents with fever and cough. Started on amoxicillin. Blood pressure elevated.";

const result = await extractMedicalEntities(text);

console.log(result.entities);
// Output:
// [
//   { text: "fever", type: "SYMPTOM", confidence: 0.92, source: "biobert" },
//   { text: "cough", type: "SYMPTOM", confidence: 0.88, source: "biobert" },
//   { text: "amoxicillin", type: "MEDICATION", confidence: 0.95, source: "biobert" },
//   { text: "Blood pressure", type: "EXAM", confidence: 0.87, source: "biobert" }
// ]

console.log(result.usesBiobert); // true
console.log(result.executionTime); // ~250ms (GPU) or ~2000ms (WASM)
```

### Entity Linking to Ontologies

```typescript
import { extractAndLinkEntities } from '@/lib/ai/extraction';

const result = await extractAndLinkEntities(text);

console.log(result.linking.linkedEntities);
// Output:
// [
//   {
//     text: "fever",
//     type: "SYMPTOM",
//     linkedTo: [{
//       resourceType: "symptom",
//       name: "fever",
//       ontologies: {
//         snomedCT: "386661006",
//         doid: "DOID:10923"
//       }
//     }],
//     confidence: 0.88
//   },
//   ...
// ]
```

### Batch Processing

```typescript
import { extractAndLinkEntitiesBatch } from '@/lib/ai/extraction';

const notes = [
  "Patient has hypertension treated with lisinopril",
  "Type 2 diabetes, on metformin 500mg BID"
];

const results = await extractAndLinkEntitiesBatch(notes, {
  useBiobert: true,
  hybridMode: true,
  minConfidence: 0.5
});

// Process results
results.forEach((result, idx) => {
  console.log(`Note ${idx}: Found ${result.totalEntities} entities, resolved ${result.resolvedEntities}`);
});
```

### Configuration Options

```typescript
interface ExtractionOptions {
  // Use BioBERT model (requires loading)
  useBiobert?: boolean;

  // Use regex-based fallback
  useRegex?: boolean;

  // Combine both methods for better coverage
  hybridMode?: boolean;

  // Minimum confidence threshold (0-1)
  minConfidence?: number;

  // Entity types to extract
  entityTypes?: EntityType[];
}

// Example with custom options
const result = await extractMedicalEntities(text, {
  useBiobert: true,
  hybridMode: true,
  minConfidence: 0.6,
  entityTypes: ['DISEASE', 'MEDICATION']
});
```

### Model Loading and Progress

```typescript
import { loadBioBERTModel, onLoadingProgress } from '@/lib/ai/extraction';

// Subscribe to loading progress
const unsubscribe = onLoadingProgress((progress, status) => {
  console.log(`Loading: ${progress}% - ${status}`);
  // Update UI with progress bar
});

// Load model (async)
const session = await loadBioBERTModel();

if (session) {
  console.log('BioBERT model loaded successfully');
} else {
  console.log('BioBERT not available, using regex fallback');
}

// Clean up subscription
unsubscribe();
```

### Error Handling

```typescript
import { extractMedicalEntities, getLastLoadError } from '@/lib/ai/extraction';

const result = await extractMedicalEntities(text, {
  useBiobert: true,
  useRegex: true // Ensure fallback is available
});

if (!result.usesBiobert) {
  console.log('BioBERT unavailable:', result.fallbackReason);
}

// Check what happened during model loading
const error = getLastLoadError();
if (error) {
  console.error('Model loading error:', error.message);
}

// Extraction always returns results (via regex if needed)
console.log(`Extracted ${result.entities.length} entities using ${result.usesBiobert ? 'BioBERT' : 'regex'}`);
```

## Performance Characteristics

### Inference Speed

| Device | Engine | Single Sentence | Full Note (~500 words) |
|--------|--------|-----------------|----------------------|
| GPU | WebGPU | 50-100ms | 100-200ms |
| GPU | WebGL | 150-300ms | 300-500ms |
| CPU | WASM | 500-1000ms | 2-5 seconds |

### Model Size

- **Quantized (ONNX)**: ~50MB
- **First load**: ~100MB network + 50MB memory
- **Cached load**: ~5MB network + 50MB memory

### Bundle Impact

- **ONNX Runtime Web**: ~1.2MB gzipped
- **BioBERT Model**: Loaded on-demand
- **Total**: ~2MB (after first load uses cache)

## Graceful Degradation

The system is designed to work even when BioBERT is unavailable:

```
┌─────────────────────────────────────┐
│   Try to load BioBERT model         │
└─────────────────────────────────────┘
          ↓ Success
    Use BioBERT NER
          ↓ Failure / Unavailable
    Fall back to Regex NLP
          ↓
    Return results with source indicator
```

Configuration for complete fallback chain:

```typescript
// Force regex if model fails
const result = await extractMedicalEntities(text, {
  useBiobert: true,  // Try BioBERT
  useRegex: true,    // But have fallback ready
  hybridMode: false  // Don't combine both
});

// Or disable BioBERT entirely for fast extraction
const result = await extractMedicalEntities(text, {
  useBiobert: false,
  useRegex: true
});
```

## Ontology Linking

Extracted entities are automatically linked to medical codes:

### Disease Linking

Diseases are matched to:
- **ICD-10** (primary classification)
- **ICD-11** (newer WHO standard)
- **SNOMED-CT** (comprehensive terminology)
- **CIAP-2** (primary care classification)
- **DOID** (Disease Ontology)
- **UMLS CUI** (unified concept identifier)
- **LOINC** (for related lab tests)

### Medication Linking

Medications are matched to:
- **ATC code** (anatomical-therapeutic-chemical)
- **SNOMED-CT** (clinical terminology)
- **RxNorm CUI** (medication standardization)
- **Drug Bank ID** (drug information database)

### Matching Algorithm

Uses a combination of similarity metrics:

1. **Levenshtein distance** (60% weight)
   - Measures edit distance between strings
   - Handles typos and variations

2. **Jaccard similarity** (40% weight)
   - Word-level overlap
   - Good for multi-word terms

3. **Synonym matching**
   - Checks disease synonyms
   - Checks medication commercial names

Final confidence = (entity_confidence + match_confidence) / 2

## Development

### Adding New Entity Types

1. Update `NER_LABELS` in `onnx-config.ts`:

```typescript
export const NER_LABELS: NERLabelConfig[] = [
  // ... existing labels
  { id: 13, label: 'B-DIAGNOSIS', entityType: 'DIAGNOSIS', color: 'blue', description: 'Diagnosis' },
  { id: 14, label: 'I-DIAGNOSIS', entityType: 'DIAGNOSIS', color: 'blue', description: 'Inside diagnosis' },
];
```

2. Update `EntityType` union:

```typescript
export type EntityType = 'DISEASE' | 'MEDICATION' | 'SYMPTOM' | 'EXAM' | 'PROCEDURE' | 'DIAGNOSIS';
```

3. Add extraction logic in `biobert-extractor.ts` if needed

### Improving Regex Fallback

The regex fallback uses patterns in `lib/utils/nlp-soap.ts`. To improve fallback accuracy:

```typescript
// Add new patterns in nlp-soap.ts PATTERNS object
const PATTERNS = {
  diagnoses: /\b(diabetes|hypertension|asthma|...)\b/gi,
  // ... more patterns
};
```

### Testing

```typescript
import { extractMedicalEntities } from '@/lib/ai/extraction';

const testCases = [
  "Patient with Type 2 diabetes on metformin",
  "Acute myocardial infarction treated with aspirin",
  "Pneumonia diagnosed, prescribed azithromycin"
];

for (const text of testCases) {
  const result = await extractMedicalEntities(text);
  console.log(`Text: ${text}`);
  console.log(`Entities: ${result.entities.map(e => `${e.text}(${e.type})`).join(', ')}`);
  console.log(`Confidence: ${result.entities[0]?.confidence ?? 'N/A'}`);
  console.log(`---`);
}
```

## Browser Compatibility

| Browser | Support | Engine |
|---------|---------|--------|
| Chrome 120+ | ✅ Full | WebGPU or WebGL |
| Firefox 121+ | ✅ Full | WebGL |
| Safari 17.4+ | ✅ Full | WebGL (WebGPU coming) |
| Edge 120+ | ✅ Full | WebGPU or WebGL |
| Mobile Safari | ⚠️ Limited | WebGL only |
| Chrome Mobile | ✅ Good | WebGL |

## Troubleshooting

### Model Not Loading

```typescript
const error = getLastLoadError();
console.error('Error:', error?.message);

// Check device capabilities
import { detectDeviceCapabilities } from '@/lib/ai/extraction';
const caps = await detectDeviceCapabilities();
console.log('GPU:', caps.hasWebGPU, 'GL:', caps.hasWebGL);

// Try forcing WASM
loadBioBERTModel();
```

### Slow Performance

1. **Check device capabilities**: GPU support available?
2. **Use hybrid mode**: Combine BioBERT with regex
3. **Increase minConfidence**: Filter out low-confidence entities
4. **Process in batches**: Better memory management

### Memory Issues

1. **Unload model when not needed**: `await unloadModel()`
2. **Reduce batch size**: Process fewer texts in parallel
3. **Use regex only**: Disable BioBERT if memory-constrained

## Future Improvements

1. **Multi-lingual support**
   - Portuguese, Spanish, French versions of BioBERT
   - Language detection and automatic switching

2. **Domain adaptation**
   - Fine-tuning on Darwin-MFC clinical notes
   - Improved entity boundaries and confidence

3. **Relation extraction**
   - Extract relationships (e.g., "patient takes X for Y")
   - Clinical event temporal reasoning

4. **Coreference resolution**
   - Link pronouns to entities ("he" → patient)
   - Track entity mentions across document

5. **Validation and correction**
   - User feedback loop for improving extraction
   - Confidence thresholds and alerts

## References

- **BioBERT**: https://github.com/dmis-lab/biobert
- **ONNX Runtime Web**: https://onnxruntime.ai/
- **NER BIO Tagging**: https://en.wikipedia.org/wiki/Inside%E2%80%93outside%E2%80%93beginning_(tagging)
- **Medical Ontologies**:
  - ICD-10: https://www.who.int/standards/classifications/classification-of-diseases
  - SNOMED-CT: https://www.snomed.org/
  - ATC: https://www.whocc.no/atc/
  - CIAP-2: https://www.globalfamilydoctor.com/

## Support

For issues or questions:
1. Check `getLastLoadError()` for error details
2. Verify browser compatibility
3. Ensure sufficient memory (500MB+)
4. Check network connectivity for first load
5. Use regex-only mode as fallback
