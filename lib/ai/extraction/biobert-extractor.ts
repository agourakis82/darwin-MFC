/**
 * BioBERT-based Named Entity Recognition (NER) Extractor
 * =======================================================
 *
 * Advanced NLP for medical entity extraction from clinical notes
 * Extracts: DISEASE, MEDICATION, SYMPTOM, EXAM, PROCEDURE
 *
 * Features:
 * - Transformer-based NER with confidence scoring
 * - Fallback to regex-based extraction if model unavailable
 * - Softmax confidence scoring from model logits
 * - Sequence labeling with BIO (Begin-Inside-Outside) tagging
 * - Integration with existing nlp-soap.ts
 *
 * Performance:
 * - CPU: ~500-1000ms for single sentence
 * - GPU: ~50-100ms for single sentence
 * - Falls back gracefully if model unavailable
 */

import { loadBioBERTModel, isModelLoaded, preprocessText, type InferenceConfig } from '../models/biobert-loader';
import { BIOBERT_CONFIG, getNERLabelById, type EntityType, type NERLabelConfig } from '../models/onnx-config';
import { analyzeSOAPText, type ExtractedEntity as RegexEntity } from '@/lib/utils/nlp-soap';

// =============================================================================
// TYPES
// =============================================================================

export interface TokenEntity {
  text: string;
  type: EntityType;
  confidence: number;
  startIdx: number;
  endIdx: number;
}

export interface ExtractedEntity {
  text: string;
  type: EntityType;
  confidence: number;
  source: 'biobert' | 'regex' | 'hybrid';
  startChar: number;
  endChar: number;
  tokens?: string[];
  metadata?: {
    bioScore?: number;
    regexMatch?: boolean;
    aggregationScore?: number;
  };
}

export interface NERExtractionResult {
  text: string;
  entities: ExtractedEntity[];
  usesBiobert: boolean;
  fallbackReason?: string;
  executionTime: number;
  tokenCount: number;
}

export interface ExtractionMetrics {
  totalEntities: number;
  byType: Record<EntityType, number>;
  avgConfidence: number;
  processingTime: number;
}

// =============================================================================
// SOFTMAX & CONFIDENCE SCORING
// =============================================================================

/**
 * Apply softmax to logits for probability distribution
 */
function softmax(logits: number[]): number[] {
  const maxLogit = Math.max(...logits);
  const exp = logits.map(l => Math.exp(l - maxLogit));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map(e => e / sum);
}

/**
 * Get confidence score from logits
 */
function getConfidenceFromLogits(logits: number[], classIdx: number): number {
  const probs = softmax(logits);
  return Math.min(Math.max(probs[classIdx], 0), 1);
}

/**
 * Aggregate confidence across token sequence (for multi-token entities)
 */
function aggregateTokenConfidence(confidences: number[]): number {
  if (confidences.length === 0) return 0;
  if (confidences.length === 1) return confidences[0];

  // Weight by position: first token (B-) has more weight
  const weighted = confidences.map((conf, idx) => {
    const weight = idx === 0 ? 1.0 : 0.8;
    return conf * weight;
  });

  return weighted.reduce((a, b) => a + b) / confidences.length;
}

// =============================================================================
// BIO TAG PARSING
// =============================================================================

/**
 * Parse BIO tags and extract entities from token sequences
 */
function parseBIOTags(tokens: string[], labelIds: number[], confidences: number[]): TokenEntity[] {
  const entities: TokenEntity[] = [];
  let currentEntity: {
    text: string[];
    type?: EntityType;
    confidence: number[];
    startIdx: number;
  } | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const labelConfig = getNERLabelById(labelIds[i]);
    if (!labelConfig) continue;

    const { label, entityType } = labelConfig;
    const isBeginning = label.startsWith('B-');
    const isInside = label.startsWith('I-');
    const confidence = confidences[i];

    if (entityType === 'O' || (!isBeginning && !isInside)) {
      // Outside any entity - flush current entity if any
      if (currentEntity && currentEntity.type && currentEntity.type !== 'O') {
        entities.push({
          text: currentEntity.text.join(' '),
          type: currentEntity.type,
          confidence: aggregateTokenConfidence(currentEntity.confidence),
          startIdx: currentEntity.startIdx,
          endIdx: i - 1,
        });
      }
      currentEntity = null;
    } else if (isBeginning) {
      // Beginning of new entity - flush previous if exists
      if (currentEntity && currentEntity.type && currentEntity.type !== 'O') {
        entities.push({
          text: currentEntity.text.join(' '),
          type: currentEntity.type,
          confidence: aggregateTokenConfidence(currentEntity.confidence),
          startIdx: currentEntity.startIdx,
          endIdx: i - 1,
        });
      }
      // Start new entity
      currentEntity = {
        text: [tokens[i]],
        type: entityType,
        confidence: [confidence],
        startIdx: i,
      };
    } else if (isInside && currentEntity && currentEntity.type === entityType) {
      // Inside same entity - append token
      currentEntity.text.push(tokens[i]);
      currentEntity.confidence.push(confidence);
    } else if (isInside) {
      // Inside tag but no current entity or different type - start new
      if (currentEntity && currentEntity.type && currentEntity.type !== 'O') {
        entities.push({
          text: currentEntity.text.join(' '),
          type: currentEntity.type,
          confidence: aggregateTokenConfidence(currentEntity.confidence),
          startIdx: currentEntity.startIdx,
          endIdx: i - 1,
        });
      }
      currentEntity = {
        text: [tokens[i]],
        type: entityType,
        confidence: [confidence],
        startIdx: i,
      };
    }
  }

  // Flush final entity
  if (currentEntity && currentEntity.type && currentEntity.type !== 'O') {
    entities.push({
      text: currentEntity.text.join(' '),
      type: currentEntity.type,
      confidence: aggregateTokenConfidence(currentEntity.confidence),
      startIdx: currentEntity.startIdx,
      endIdx: tokens.length - 1,
    });
  }

  return entities;
}

// =============================================================================
// CHARACTER-LEVEL POSITION MAPPING
// =============================================================================

/**
 * Map token indices to character positions in original text
 */
function mapTokensToCharPositions(text: string, tokens: string[]): Array<{ start: number; end: number }> {
  const positions: Array<{ start: number; end: number }> = [];
  let currentPos = 0;

  for (const token of tokens) {
    // Skip special tokens
    if (token.startsWith('[') && token.endsWith(']')) {
      positions.push({ start: -1, end: -1 });
      continue;
    }

    // Find token in text (with basic handling for punctuation)
    const cleanToken = token.replace(/[^\w]/g, '');
    const idx = text.toLowerCase().indexOf(cleanToken.toLowerCase(), currentPos);

    if (idx >= 0) {
      positions.push({ start: idx, end: idx + token.length });
      currentPos = idx + token.length;
    } else {
      // Fallback: estimate position
      positions.push({ start: currentPos, end: currentPos + token.length });
    }
  }

  return positions;
}

// =============================================================================
// BIOBERT INFERENCE
// =============================================================================

/**
 * Run BioBERT inference on text
 */
async function runBioBERTInference(text: string, config: InferenceConfig): Promise<{
  tokens: string[];
  logits: number[][];
} | null> {
  try {
    // Check if model is loaded
    if (!isModelLoaded()) {
      return null;
    }

    const startTime = performance.now();

    // Preprocess text
    const { tokens, inputTensor } = preprocessText(text);

    // Get model session
    const session = (await loadBioBERTModel()) as any;
    if (!session) {
      return null;
    }

    // Run inference with timeout
    const inferencePromise = session.run({
      input_ids: inputTensor,
      attention_mask: { data: new BigInt64Array(tokens.length).fill(BigInt(1)), dims: [1, tokens.length] },
      token_type_ids: { data: new BigInt64Array(tokens.length).fill(BigInt(0)), dims: [1, tokens.length] },
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Inference timeout')), config.timeout)
    );

    const results = await Promise.race([inferencePromise, timeoutPromise]);

    const endTime = performance.now();
    console.log(`[BioBERT] Inference completed in ${(endTime - startTime).toFixed(2)}ms`);

    // Extract logits from output
    // Assuming model outputs 'logits' tensor of shape [batch_size, sequence_length, num_labels]
    const logits = (results as any).logits?.data;
    if (!logits || !(logits instanceof Float32Array || logits instanceof Array)) {
      return null;
    }

    // Reshape logits: (sequence_length, num_labels)
    const logitsArray: number[][] = [];
    for (let i = 0; i < tokens.length; i++) {
      const tokenLogits = Array.from(logits).slice(i * BIOBERT_CONFIG.numLabels, (i + 1) * BIOBERT_CONFIG.numLabels);
      logitsArray.push(tokenLogits);
    }

    return { tokens, logits: logitsArray };
  } catch (error) {
    console.error('[BioBERT] Inference error:', error);
    return null;
  }
}

/**
 * Extract entities using BioBERT model
 */
export async function extractEntitiesBioBERT(
  text: string,
  minConfidence = 0.5,
  config = { timeout: 30000 } as InferenceConfig
): Promise<ExtractedEntity[] | null> {
  try {
    const result = await runBioBERTInference(text, { ...config, minConfidence });
    if (!result) {
      return null;
    }

    const { tokens, logits } = result;

    // Get label predictions and confidences
    const labelIds: number[] = [];
    const confidences: number[] = [];

    for (const tokenLogits of logits) {
      const maxIdx = tokenLogits.indexOf(Math.max(...tokenLogits));
      labelIds.push(maxIdx);
      const confidence = getConfidenceFromLogits(tokenLogits, maxIdx);
      confidences.push(confidence);
    }

    // Parse BIO tags to get entities
    const tokenEntities = parseBIOTags(tokens, labelIds, confidences);

    // Filter by confidence threshold
    const filtered = tokenEntities.filter(e => e.confidence >= minConfidence);

    // Map to character positions
    const positions = mapTokensToCharPositions(text, tokens);

    // Convert to ExtractedEntity format
    const entities: ExtractedEntity[] = filtered.map((entity, idx) => {
      const startPos = positions[entity.startIdx];
      const endPos = positions[entity.endIdx];

      return {
        text: entity.text,
        type: entity.type,
        confidence: entity.confidence,
        source: 'biobert',
        startChar: startPos.start >= 0 ? startPos.start : 0,
        endChar: endPos.end >= 0 ? endPos.end : text.length,
        tokens: tokens.slice(entity.startIdx, entity.endIdx + 1),
        metadata: {
          bioScore: entity.confidence,
          aggregationScore: entity.confidence,
        },
      };
    });

    return entities;
  } catch (error) {
    console.error('[BioBERT] Entity extraction error:', error);
    return null;
  }
}

// =============================================================================
// REGEX FALLBACK
// =============================================================================

/**
 * Convert regex extraction results to BioBERT format
 */
function convertRegexToEntities(regexAnalysis: any, text: string): ExtractedEntity[] {
  const entities: ExtractedEntity[] = [];

  if (regexAnalysis.entities) {
    for (const entity of regexAnalysis.entities) {
      // Find character position in text
      const startChar = text.indexOf(entity.text);
      const endChar = startChar >= 0 ? startChar + entity.text.length : 0;

      entities.push({
        text: entity.text,
        type: entity.type as EntityType,
        confidence: entity.confidence,
        source: 'regex',
        startChar,
        endChar,
        metadata: {
          regexMatch: true,
        },
      });
    }
  }

  return entities;
}

// =============================================================================
// HYBRID EXTRACTION
// =============================================================================

/**
 * Combine BioBERT and regex results for improved coverage and confidence
 */
function mergeExtractedEntities(biobertEntities: ExtractedEntity[], regexEntities: ExtractedEntity[]): ExtractedEntity[] {
  const merged = new Map<string, ExtractedEntity>();

  // Add BioBERT entities (higher priority)
  for (const entity of biobertEntities) {
    const key = `${entity.text.toLowerCase()}_${entity.type}`;
    merged.set(key, { ...entity, source: 'biobert' });
  }

  // Add regex entities if not already in BioBERT results
  for (const entity of regexEntities) {
    const key = `${entity.text.toLowerCase()}_${entity.type}`;

    if (merged.has(key)) {
      // Entity found in both - aggregate confidence
      const existing = merged.get(key)!;
      const aggregated = (existing.confidence + entity.confidence) / 2;

      merged.set(key, {
        ...existing,
        confidence: aggregated,
        source: 'hybrid',
        metadata: {
          ...(existing.metadata || {}),
          ...(entity.metadata || {}),
          aggregationScore: aggregated,
        },
      });
    } else if (entity.confidence >= 0.5) {
      // Add regex entity if confidence is reasonable
      merged.set(key, entity);
    }
  }

  return Array.from(merged.values()).sort((a, b) => b.confidence - a.confidence);
}

// =============================================================================
// MAIN EXTRACTION FUNCTION
// =============================================================================

/**
 * Extract medical entities from text using BioBERT with regex fallback
 *
 * @param text Clinical text to analyze
 * @param options Configuration options
 * @returns Extraction results with entities and metadata
 */
export async function extractMedicalEntities(
  text: string,
  options: {
    useBiobert?: boolean;
    useRegex?: boolean;
    hybridMode?: boolean;
    minConfidence?: number;
    entityTypes?: EntityType[];
  } = {}
): Promise<NERExtractionResult> {
  const {
    useBiobert = true,
    useRegex = true,
    hybridMode = true,
    minConfidence = 0.5,
    entityTypes = ['DISEASE', 'MEDICATION', 'SYMPTOM', 'EXAM', 'PROCEDURE'],
  } = options;

  const startTime = performance.now();

  try {
    // Preprocess text
    const cleaned = text.trim();
    if (cleaned.length === 0) {
      return {
        text: cleaned,
        entities: [],
        usesBiobert: false,
        executionTime: 0,
        tokenCount: 0,
      };
    }

    let biobertEntities: ExtractedEntity[] = [];
    let regexEntities: ExtractedEntity[] = [];
    let usesBiobert = false;
    let fallbackReason: string | undefined;

    // Try BioBERT extraction
    if (useBiobert) {
      const biobertResult = await extractEntitiesBioBERT(cleaned, minConfidence, {
        minConfidence,
        maxTokens: 512,
        batchSize: 1,
        timeout: 30000,
      });

      if (biobertResult && biobertResult.length > 0) {
        biobertEntities = biobertResult.filter(e => entityTypes.includes(e.type));
        usesBiobert = true;
      } else if (!useRegex) {
        fallbackReason = 'BioBERT model not available and regex fallback disabled';
      }
    }

    // Use regex extraction if needed
    if (useRegex && (!usesBiobert || hybridMode)) {
      const regexAnalysis = analyzeSOAPText(cleaned, {
        extractDiseases: entityTypes.includes('DISEASE'),
        extractMedications: entityTypes.includes('MEDICATION'),
        extractCodes: false, // Don't include ICD codes
        suggestDiagnoses: false,
        minConfidence,
      });

      regexEntities = convertRegexToEntities(regexAnalysis, cleaned);
    }

    // Merge results
    let finalEntities: ExtractedEntity[] = [];

    if (hybridMode && biobertEntities.length > 0 && regexEntities.length > 0) {
      finalEntities = mergeExtractedEntities(biobertEntities, regexEntities);
    } else if (biobertEntities.length > 0) {
      finalEntities = biobertEntities;
    } else {
      finalEntities = regexEntities;
      if (finalEntities.length > 0) {
        usesBiobert = false;
        fallbackReason = 'BioBERT model unavailable, using regex extraction';
      }
    }

    // Calculate metrics
    const endTime = performance.now();
    const byType = entityTypes.reduce((acc, type) => {
      acc[type] = finalEntities.filter(e => e.type === type).length;
      return acc;
    }, {} as Record<EntityType, number>);

    const avgConfidence = finalEntities.length > 0 ? finalEntities.reduce((sum, e) => sum + e.confidence, 0) / finalEntities.length : 0;

    return {
      text: cleaned,
      entities: finalEntities,
      usesBiobert,
      fallbackReason,
      executionTime: endTime - startTime,
      tokenCount: cleaned.split(/\s+/).length,
    };
  } catch (error) {
    console.error('[BioBERT] Extraction error:', error);

    // Final fallback to regex
    const regexAnalysis = analyzeSOAPText(text, {
      extractDiseases: true,
      extractMedications: true,
      extractCodes: false,
      suggestDiagnoses: false,
      minConfidence,
    });

    const regexEntities = convertRegexToEntities(regexAnalysis, text);
    const endTime = performance.now();

    return {
      text: text.trim(),
      entities: regexEntities,
      usesBiobert: false,
      fallbackReason: `BioBERT error: ${error instanceof Error ? error.message : String(error)}`,
      executionTime: endTime - startTime,
      tokenCount: text.split(/\s+/).length,
    };
  }
}

// =============================================================================
// BATCH PROCESSING
// =============================================================================

/**
 * Extract entities from multiple texts
 */
export async function extractEntitiesBatch(
  texts: string[],
  options: Parameters<typeof extractMedicalEntities>[1] = {}
): Promise<NERExtractionResult[]> {
  const results: NERExtractionResult[] = [];

  for (const text of texts) {
    const result = await extractMedicalEntities(text, options);
    results.push(result);
  }

  return results;
}

// Types are already exported at declaration
