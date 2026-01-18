/**
 * BioBERT Entity Extraction Infrastructure
 * ========================================
 *
 * Unified exports for all NER and entity linking utilities
 * Provides a clean API for medical entity extraction from clinical text
 */

// =============================================================================
// BIOBERT EXTRACTOR EXPORTS
// =============================================================================

export {
  extractMedicalEntities,
  extractEntitiesBatch,
  extractEntitiesBioBERT,
  type TokenEntity,
  type ExtractedEntity,
  type NERExtractionResult,
  type ExtractionMetrics,
} from './biobert-extractor';

// =============================================================================
// ENTITY LINKER EXPORTS
// =============================================================================

export {
  linkEntities,
  linkDiseaseEntity,
  linkMedicationEntity,
  linkSymptomEntity,
  getPrimaryOntologyCode,
  formatLinkedEntity,
  exportLinkedEntities,
  type LinkedEntity,
  type LinkedResource,
  type OntologyLinks,
  type LinkingResult,
} from './entity-linker';

// =============================================================================
// MODEL MANAGEMENT EXPORTS
// =============================================================================

export {
  loadBioBERTModel,
  isModelLoaded,
  isModelLoading,
  getModelSession,
  getLastLoadError,
  unloadModel,
  onLoadingProgress,
  initializeONNXRuntime,
  type SessionOptions,
  type CacheConfig,
  type InferenceConfig,
  type ProgressCallback,
  type LoadingProgress,
} from '../models/biobert-loader';

// =============================================================================
// CONFIGURATION EXPORTS
// =============================================================================

export {
  BIOBERT_CONFIG,
  EXECUTION_PROVIDERS,
  NER_LABELS,
  DEFAULT_SESSION_OPTIONS,
  DEFAULT_CACHE_CONFIG,
  DEFAULT_INFERENCE_CONFIG,
  getNERLabelById,
  getNERLabelByName,
  detectDeviceCapabilities,
  type ExecutionProvider,
  type ExecutionProviderConfig,
  type ModelConfig,
  type NERLabelConfig,
  type EntityType,
  type SessionOptions as ONNXSessionOptions,
  type CacheConfig as ONNXCacheConfig,
  type InferenceConfig as ONNXInferenceConfig,
  type DeviceCapabilities,
  ONNXConfigError,
  ModelNotFoundError,
  DeviceNotSupportedError,
  SessionCreationError,
} from '../models/onnx-config';

// =============================================================================
// CONVENIENCE TYPES
// =============================================================================

import type { ExtractedEntity, NERExtractionResult } from './biobert-extractor';
import type { LinkedEntity, LinkingResult } from './entity-linker';

/**
 * Complete extraction pipeline result
 */
export interface FullExtractionResult {
  // Raw extraction
  extraction: NERExtractionResult;

  // Linked to ontologies
  linking: LinkingResult;

  // Overall metrics
  totalEntities: number;
  resolvedEntities: number;
  unresolvedEntities: number;
  averageConfidence: number;
  usedBiobert: boolean;
  processingTimeMs: number;
}

/**
 * Complete extraction pipeline with linking
 */
export async function extractAndLinkEntities(
  text: string,
  options: {
    useBiobert?: boolean;
    useRegex?: boolean;
    hybridMode?: boolean;
    minConfidence?: number;
  } = {}
): Promise<FullExtractionResult> {
  const startTime = performance.now();

  // Extract entities
  const extraction = await extractMedicalEntities(text, options);

  // Link to ontologies
  const linking = linkEntities(extraction.entities);

  const endTime = performance.now();

  return {
    extraction,
    linking,
    totalEntities: extraction.entities.length,
    resolvedEntities: linking.linkedEntities.filter(e => e.linkedTo.length > 0).length,
    unresolvedEntities: linking.unresolvedCount,
    averageConfidence: extraction.entities.length > 0
      ? extraction.entities.reduce((sum: number, e: ExtractedEntity) => sum + e.confidence, 0) / extraction.entities.length
      : 0,
    usedBiobert: extraction.usesBiobert,
    processingTimeMs: endTime - startTime,
  };
}

/**
 * Process multiple texts with entity extraction and linking
 */
export async function extractAndLinkEntitiesBatch(
  texts: string[],
  options: Parameters<typeof extractAndLinkEntities>[1] = {}
): Promise<FullExtractionResult[]> {
  return Promise.all(texts.map(text => extractAndLinkEntities(text, options)));
}

// Re-imports for internal use in convenience functions
import { extractMedicalEntities } from './biobert-extractor';
import { linkEntities } from './entity-linker';
