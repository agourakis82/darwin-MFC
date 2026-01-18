# BioBERT Integration Examples

Complete examples of how to integrate BioBERT entity extraction into Darwin-MFC components.

## 1. SOAP Note Analysis Component

```typescript
// app/components/SoapNoteAnalyzer.tsx

'use client';

import { useState } from 'react';
import { extractAndLinkEntities, onLoadingProgress } from '@/lib/ai/extraction';
import type { FullExtractionResult } from '@/lib/ai/extraction';

export function SoapNoteAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<FullExtractionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setProgress(0);
    setError(null);

    // Subscribe to progress updates
    const unsubscribe = onLoadingProgress((prog, status) => {
      setProgress(prog);
      console.log(status);
    });

    try {
      const result = await extractAndLinkEntities(text, {
        useBiobert: true,
        hybridMode: true,
        minConfidence: 0.5,
      });

      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
      unsubscribe();
    }
  };

  return (
    <div className="space-y-6">
      {/* Input section */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Clinical Note
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 p-3 border rounded-lg"
          placeholder="Paste SOAP note here..."
          disabled={loading}
        />
      </div>

      {/* Progress bar */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={loading || !text}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-100 rounded">
              <div className="font-semibold">Total Entities</div>
              <div className="text-2xl text-blue-600">{result.totalEntities}</div>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <div className="font-semibold">Resolved</div>
              <div className="text-2xl text-green-600">{result.resolvedEntities}</div>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <div className="font-semibold">Confidence</div>
              <div className="text-2xl">{(result.averageConfidence * 100).toFixed(0)}%</div>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <div className="font-semibold">Method</div>
              <div>{result.usedBiobert ? 'BioBERT' : 'Regex'}</div>
            </div>
          </div>

          {/* Extracted entities */}
          <div>
            <h3 className="font-semibold mb-3">Extracted Entities</h3>
            <div className="space-y-2">
              {result.linking.linkedEntities.map((entity, idx) => (
                <div key={idx} className="p-3 bg-gray-50 border rounded">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{entity.text}</div>
                      <div className="text-sm text-gray-600">
                        Type: {entity.type}
                      </div>
                      {entity.linkedTo[0] && (
                        <div className="text-sm mt-2">
                          <div className="font-semibold text-gray-700">
                            {entity.linkedTo[0].name}
                          </div>
                          {entity.linkedTo[0].ontologies.icd10?.[0] && (
                            <div className="text-xs text-gray-500">
                              ICD-10: {entity.linkedTo[0].ontologies.icd10[0]}
                            </div>
                          )}
                          {entity.linkedTo[0].ontologies.atcCode && (
                            <div className="text-xs text-gray-500">
                              ATC: {entity.linkedTo[0].ontologies.atcCode}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        {(entity.confidence * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {entity.source}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## 2. Prontuário (Patient Record) Integration

```typescript
// lib/ai/extraction/prontuario-analysis.ts

import { extractAndLinkEntities } from './index';
import type { FullExtractionResult } from './index';

export interface ProntuarioAnalysis {
  subjetivo: FullExtractionResult;
  objetivo: FullExtractionResult;
  avaliacao: FullExtractionResult;
  plano: FullExtractionResult;
  summary: {
    totalDiseases: number;
    totalMedications: number;
    totalSymptoms: number;
    recommendedDiagnosis?: string;
    suggestedMedications: string[];
  };
}

export async function analyzeProntuario(soapData: {
  subjetivo?: string;
  objetivo?: string;
  avaliacao?: string;
  plano?: string;
}): Promise<ProntuarioAnalysis> {
  // Analyze each SOAP section
  const [subjetivo, objetivo, avaliacao, plano] = await Promise.all([
    extractAndLinkEntities(soapData.subjetivo || '', { minConfidence: 0.5 }),
    extractAndLinkEntities(soapData.objetivo || '', { minConfidence: 0.5 }),
    extractAndLinkEntities(soapData.avaliacao || '', { minConfidence: 0.5 }),
    extractAndLinkEntities(soapData.plano || '', { minConfidence: 0.5 }),
  ]);

  // Compile results
  const allLinked = [
    ...subjetivo.linking.linkedEntities,
    ...objetivo.linking.linkedEntities,
    ...avaliacao.linking.linkedEntities,
    ...plano.linking.linkedEntities,
  ];

  // Count by type
  const diseases = allLinked.filter(e => e.type === 'DISEASE' && e.linkedTo.length > 0);
  const medications = allLinked.filter(e => e.type === 'MEDICATION' && e.linkedTo.length > 0);
  const symptoms = allLinked.filter(e => e.type === 'SYMPTOM' && e.linkedTo.length > 0);

  return {
    subjetivo,
    objetivo,
    avaliacao,
    plano,
    summary: {
      totalDiseases: diseases.length,
      totalMedications: medications.length,
      totalSymptoms: symptoms.length,
      recommendedDiagnosis: diseases[0]?.linkedTo[0]?.name,
      suggestedMedications: medications.map(m => m.linkedTo[0]?.name || m.text),
    },
  };
}
```

## 3. Real-time Search Enhancement

```typescript
// app/components/Search/EnhancedSearch.tsx

'use client';

import { useState, useCallback } from 'react';
import { extractMedicalEntities } from '@/lib/ai/extraction';
import type { ExtractedEntity } from '@/lib/ai/extraction';

export function EnhancedSearch() {
  const [query, setQuery] = useState('');
  const [extractedEntities, setExtractedEntities] = useState<ExtractedEntity[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = useCallback(
    async (text: string) => {
      setQuery(text);

      if (text.length < 3) {
        setExtractedEntities([]);
        return;
      }

      setIsAnalyzing(true);
      try {
        const result = await extractMedicalEntities(text, {
          useBiobert: true,
          minConfidence: 0.4, // Lower threshold for search suggestions
        });

        setExtractedEntities(result.entities);
      } finally {
        setIsAnalyzing(false);
      }
    },
    []
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search diagnoses, medications, symptoms..."
        className="w-full px-4 py-2 border rounded-lg"
      />

      {/* Entity suggestions */}
      {extractedEntities.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
          <div className="p-3 space-y-2">
            {extractedEntities.map((entity, idx) => (
              <div
                key={idx}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
              >
                <div className="font-medium">{entity.text}</div>
                <div className="text-gray-500 text-xs">{entity.type}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

## 4. Drug Interaction Check

```typescript
// lib/ai/extraction/interaction-checker.ts

import { extractAndLinkEntities } from './index';
import { getInteracoesGraves } from '@/lib/utils/nlp-soap';
import { todosMedicamentos } from '@/lib/data/medicamentos/index';

export interface DrugInteractionCheck {
  medications: Array<{
    name: string;
    id?: string;
  }>;
  interactions: Array<{
    drug1: string;
    drug2: string;
    severity: 'leve' | 'moderada' | 'grave' | 'contraindicada';
    effect: string;
  }>;
}

export async function checkDrugInteractions(medicalNote: string): Promise<DrugInteractionCheck> {
  // Extract medications from note
  const result = await extractAndLinkEntities(medicalNote, {
    entityTypes: ['MEDICATION'],
    minConfidence: 0.6,
  });

  const medications = result.linking.linkedEntities
    .filter(e => e.type === 'MEDICATION' && e.linkedTo.length > 0)
    .map(e => ({
      name: e.linkedTo[0]!.name,
      id: e.linkedTo[0]!.id,
    }));

  // Get interaction data
  const interactions: DrugInteractionCheck['interactions'] = [];

  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = todosMedicamentos.find(m => m.id === medications[i].id);
      const med2 = todosMedicamentos.find(m => m.id === medications[j].id);

      if (med1 && med2) {
        const inter1 = med1.interacoes.find(
          int => int.medicamento.toLowerCase() === med2.nomeGenerico.toLowerCase()
        );
        const inter2 = med2.interacoes.find(
          int => int.medicamento.toLowerCase() === med1.nomeGenerico.toLowerCase()
        );

        const interaction = inter1 || inter2;
        if (interaction) {
          interactions.push({
            drug1: med1.nomeGenerico,
            drug2: med2.nomeGenerico,
            severity: interaction.gravidade,
            effect: interaction.efeito,
          });
        }
      }
    }
  }

  return { medications, interactions };
}
```

## 5. Pre-loading for Performance

```typescript
// lib/ai/extraction/preloader.ts

import { loadBioBERTModel, isModelLoaded, onLoadingProgress } from './index';

export async function preloadBiobert(options?: {
  onProgress?: (progress: number, status: string) => void;
  timeout?: number;
}): Promise<boolean> {
  if (isModelLoaded()) {
    console.log('[BioBERT] Model already loaded');
    return true;
  }

  const { onProgress, timeout = 120000 } = options || {};

  return new Promise((resolve) => {
    let timeoutId: NodeJS.Timeout | null = null;

    // Subscribe to progress
    const unsubscribe = onLoadingProgress((progress, status) => {
      onProgress?.(progress, status);
    });

    // Set timeout
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        unsubscribe();
        console.warn('[BioBERT] Preload timeout, will load on demand');
        resolve(false);
      }, timeout);
    }

    // Start loading
    loadBioBERTModel()
      .then((session) => {
        clearTimeout(timeoutId as NodeJS.Timeout);
        unsubscribe();
        resolve(!!session);
      })
      .catch((error) => {
        clearTimeout(timeoutId as NodeJS.Timeout);
        unsubscribe();
        console.error('[BioBERT] Preload error:', error);
        resolve(false);
      });
  });
}

// Usage in app initialization
// app/layout.tsx
import { preloadBiobert } from '@/lib/ai/extraction/preloader';

export default function RootLayout({ children }) {
  useEffect(() => {
    // Preload model after page is interactive (idle time)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        preloadBiobert({
          onProgress: (progress) => console.log(`Model loading: ${progress}%`),
        });
      });
    }
  }, []);

  return <html>{children}</html>;
}
```

## 6. Testing and Validation

```typescript
// lib/ai/extraction/__tests__/biobert.test.ts

import { describe, it, expect } from 'vitest';
import { extractMedicalEntities, extractAndLinkEntities } from '../index';

describe('BioBERT Entity Extraction', () => {
  it('should extract diseases from clinical text', async () => {
    const text = 'Patient has type 2 diabetes and hypertension';
    const result = await extractMedicalEntities(text, {
      useBiobert: false, // Use regex for testing without model
      minConfidence: 0.5,
    });

    expect(result.entities).toBeDefined();
    expect(result.entities.length).toBeGreaterThan(0);
    expect(
      result.entities.some(e => e.type === 'DISEASE')
    ).toBe(true);
  });

  it('should extract medications', async () => {
    const text = 'Started on metformin 500mg daily';
    const result = await extractMedicalEntities(text, {
      useBiobert: false,
      minConfidence: 0.5,
    });

    expect(
      result.entities.some(e => e.type === 'MEDICATION')
    ).toBe(true);
  });

  it('should link entities to ontologies', async () => {
    const text = 'Diabetes mellitus type 2 treated with metformin';
    const result = await extractAndLinkEntities(text);

    const linked = result.linking.linkedEntities.filter(
      e => e.linkedTo.length > 0
    );
    expect(linked.length).toBeGreaterThan(0);

    linked.forEach(entity => {
      expect(entity.linkedTo[0].ontologies).toBeDefined();
    });
  });

  it('should gracefully fall back to regex', async () => {
    const text = 'Patient has fever and cough';
    const result = await extractMedicalEntities(text, {
      useBiobert: false,
      useRegex: true,
    });

    expect(result.entities.length).toBeGreaterThan(0);
    expect(result.usesBiobert).toBe(false);
  });
});
```

## Installation Requirements

To use BioBERT extraction, add to `package.json`:

```json
{
  "dependencies": {
    "onnxruntime-web": "^1.18.0"
  }
}
```

Then install:

```bash
npm install onnxruntime-web
```

## Performance Tips

1. **Preload on idle**: Load model when page is interactive
2. **Batch processing**: Process multiple notes together
3. **Cache results**: Store extraction results in localStorage
4. **Use hybrid mode**: Combine BioBERT + regex for better coverage
5. **Adjust thresholds**: Use higher minConfidence for critical extractions

## Troubleshooting

See `BIOBERT_README.md` for detailed troubleshooting guide.
