/**
 * Unified NER Service
 * ====================
 *
 * Provides a unified interface for Named Entity Recognition with
 * switchable extraction modes: Regex, BioBERT, or Hybrid.
 *
 * Features:
 * - Mode switching at runtime
 * - Consistent entity format across modes
 * - Progress tracking for model loading
 * - Graceful fallback handling
 * - Performance metrics
 */

import {
  extractMedicalEntities,
  type ExtractedEntity,
  type NERExtractionResult,
} from '@/lib/ai/extraction/biobert-extractor';
import {
  isModelLoaded,
  isModelLoading,
  loadBioBERTModel,
  onLoadingProgress,
  type ProgressCallback,
} from '@/lib/ai/models/biobert-loader';
import type { EntityType } from '@/lib/ai/models/onnx-config';

// =============================================================================
// TYPES
// =============================================================================

export type ExtractionMode = 'regex' | 'biobert' | 'hybrid';

export interface UnifiedNEROptions {
  mode: ExtractionMode;
  minConfidence?: number;
  entityTypes?: EntityType[];
  timeout?: number;
}

export interface UnifiedNERResult {
  text: string;
  entities: ExtractedEntity[];
  mode: ExtractionMode;
  actualMode: ExtractionMode; // The mode actually used (may differ if fallback)
  executionTime: number;
  tokenCount: number;
  modelStatus: {
    biobertLoaded: boolean;
    biobertLoading: boolean;
    usedFallback: boolean;
    fallbackReason?: string;
  };
  metrics: {
    totalEntities: number;
    byType: Record<string, number>;
    avgConfidence: number;
    sourceDistribution: Record<string, number>;
  };
}

export interface ModelStatus {
  loaded: boolean;
  loading: boolean;
  available: boolean;
  error?: string;
}

// =============================================================================
// SERVICE STATE
// =============================================================================

let currentMode: ExtractionMode = 'regex';
let initializationPromise: Promise<void> | null = null;

// =============================================================================
// MODEL MANAGEMENT
// =============================================================================

/**
 * Get current BioBERT model status
 */
export function getBioBERTStatus(): ModelStatus {
  return {
    loaded: isModelLoaded(),
    loading: isModelLoading(),
    available: isModelLoaded(),
    error: undefined,
  };
}

/**
 * Initialize BioBERT model (lazy loading)
 */
export async function initializeBioBERT(
  onProgress?: ProgressCallback
): Promise<boolean> {
  if (initializationPromise) {
    await initializationPromise;
    return isModelLoaded();
  }

  if (isModelLoaded()) {
    return true;
  }

  // Subscribe to progress if callback provided
  let unsubscribe: (() => void) | undefined;
  if (onProgress) {
    unsubscribe = onLoadingProgress(onProgress);
  }

  initializationPromise = (async () => {
    try {
      await loadBioBERTModel();
    } finally {
      if (unsubscribe) {
        unsubscribe();
      }
      initializationPromise = null;
    }
  })();

  await initializationPromise;
  return isModelLoaded();
}

// =============================================================================
// MODE MANAGEMENT
// =============================================================================

/**
 * Get current extraction mode
 */
export function getCurrentMode(): ExtractionMode {
  return currentMode;
}

/**
 * Set extraction mode
 */
export function setExtractionMode(mode: ExtractionMode): void {
  currentMode = mode;
}

/**
 * Check if a mode is available
 */
export function isModeAvailable(mode: ExtractionMode): boolean {
  switch (mode) {
    case 'regex':
      return true; // Always available
    case 'biobert':
      return isModelLoaded();
    case 'hybrid':
      return true; // Falls back to regex if BioBERT unavailable
    default:
      return false;
  }
}

// =============================================================================
// EXTRACTION
// =============================================================================

/**
 * Extract entities using the unified service
 */
export async function extractEntities(
  text: string,
  options: Partial<UnifiedNEROptions> = {}
): Promise<UnifiedNERResult> {
  const {
    mode = currentMode,
    minConfidence = 0.5,
    entityTypes = ['DISEASE', 'MEDICATION', 'SYMPTOM', 'EXAM', 'PROCEDURE'],
    timeout = 30000,
  } = options;

  const startTime = performance.now();
  let usedFallback = false;
  let fallbackReason: string | undefined;
  let actualMode = mode;

  // Determine extraction options based on mode
  let useBiobert = false;
  let useRegex = false;
  let hybridMode = false;

  switch (mode) {
    case 'regex':
      useRegex = true;
      break;
    case 'biobert':
      useBiobert = true;
      // If BioBERT not loaded, fall back to regex
      if (!isModelLoaded()) {
        useBiobert = false;
        useRegex = true;
        usedFallback = true;
        actualMode = 'regex';
        fallbackReason = 'BioBERT model not loaded';
      }
      break;
    case 'hybrid':
      useBiobert = isModelLoaded();
      useRegex = true;
      hybridMode = true;
      if (!isModelLoaded()) {
        actualMode = 'regex';
        fallbackReason = 'BioBERT unavailable, using regex only';
      }
      break;
  }

  // Perform extraction
  const result = await extractMedicalEntities(text, {
    useBiobert,
    useRegex,
    hybridMode,
    minConfidence,
    entityTypes,
  });

  const endTime = performance.now();

  // Calculate metrics
  const byType: Record<string, number> = {};
  const sourceDistribution: Record<string, number> = {};

  for (const entity of result.entities) {
    byType[entity.type] = (byType[entity.type] || 0) + 1;
    sourceDistribution[entity.source] = (sourceDistribution[entity.source] || 0) + 1;
  }

  const avgConfidence =
    result.entities.length > 0
      ? result.entities.reduce((sum: number, e: ExtractedEntity) => sum + e.confidence, 0) / result.entities.length
      : 0;

  return {
    text: result.text,
    entities: result.entities,
    mode,
    actualMode,
    executionTime: endTime - startTime,
    tokenCount: result.tokenCount,
    modelStatus: {
      biobertLoaded: isModelLoaded(),
      biobertLoading: isModelLoading(),
      usedFallback,
      fallbackReason: fallbackReason || result.fallbackReason,
    },
    metrics: {
      totalEntities: result.entities.length,
      byType,
      avgConfidence,
      sourceDistribution,
    },
  };
}

/**
 * Extract entities from multiple texts
 */
export async function extractEntitiesBatch(
  texts: string[],
  options: Partial<UnifiedNEROptions> = {}
): Promise<UnifiedNERResult[]> {
  const results: UnifiedNERResult[] = [];
  for (const text of texts) {
    results.push(await extractEntities(text, options));
  }
  return results;
}

// =============================================================================
// COMPARISON UTILITIES
// =============================================================================

/**
 * Run extraction with all modes for comparison
 */
export async function compareExtractionModes(
  text: string,
  options: Omit<Partial<UnifiedNEROptions>, 'mode'> = {}
): Promise<{
  regex: UnifiedNERResult;
  biobert: UnifiedNERResult | null;
  hybrid: UnifiedNERResult;
}> {
  const [regexResult, hybridResult] = await Promise.all([
    extractEntities(text, { ...options, mode: 'regex' }),
    extractEntities(text, { ...options, mode: 'hybrid' }),
  ]);

  let biobertResult: UnifiedNERResult | null = null;
  if (isModelLoaded()) {
    biobertResult = await extractEntities(text, { ...options, mode: 'biobert' });
  }

  return {
    regex: regexResult,
    biobert: biobertResult,
    hybrid: hybridResult,
  };
}

// =============================================================================
// REACT HOOK SUPPORT
// =============================================================================

/**
 * Create a stateful extraction function for React
 * Returns a function that can be used with useState/useEffect
 */
export function createExtractionFn(
  defaultOptions: Partial<UnifiedNEROptions> = {}
): (text: string, overrideOptions?: Partial<UnifiedNEROptions>) => Promise<UnifiedNERResult> {
  return (text: string, overrideOptions?: Partial<UnifiedNEROptions>) =>
    extractEntities(text, { ...defaultOptions, ...overrideOptions });
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { ExtractedEntity, NERExtractionResult };
