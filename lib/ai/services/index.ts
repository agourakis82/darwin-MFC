/**
 * AI Services Index
 * ==================
 *
 * Unified exports for AI service modules
 */

export {
  // Main extraction function
  extractEntities,
  extractEntitiesBatch,
  compareExtractionModes,
  createExtractionFn,

  // Mode management
  getCurrentMode,
  setExtractionMode,
  isModeAvailable,

  // BioBERT management
  getBioBERTStatus,
  initializeBioBERT,

  // Types
  type ExtractionMode,
  type UnifiedNEROptions,
  type UnifiedNERResult,
  type ModelStatus,
  type ExtractedEntity,
  type NERExtractionResult,
} from './unified-ner-service';
