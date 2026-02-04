'use client';

/**
 * useNERExtraction Hook
 * =====================
 *
 * React hook for Named Entity Recognition with mode switching.
 * Provides state management, loading states, and automatic updates.
 *
 * Usage:
 * ```tsx
 * const { entities, extract, mode, setMode, isLoading, modelStatus } = useNERExtraction();
 *
 * // Extract entities
 * await extract(text);
 *
 * // Switch mode
 * setMode('hybrid');
 * ```
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  extractEntities,
  getCurrentMode,
  setExtractionMode,
  getBioBERTStatus,
  initializeBioBERT,
  type ExtractionMode,
  type UnifiedNERResult,
  type UnifiedNEROptions,
  type ModelStatus,
} from '@/lib/ai/services/unified-ner-service';
import type { ExtractedEntity } from '@/lib/ai/extraction/biobert-extractor';

// =============================================================================
// TYPES
// =============================================================================

export interface UseNERExtractionOptions {
  /**
   * Initial extraction mode
   * @default 'regex'
   */
  initialMode?: ExtractionMode;

  /**
   * Auto-initialize BioBERT model on mount
   * @default false
   */
  autoInitBiobert?: boolean;

  /**
   * Minimum confidence threshold
   * @default 0.5
   */
  minConfidence?: number;

  /**
   * Debounce delay for auto-extract (ms)
   * @default 300
   */
  debounceMs?: number;
}

export interface UseNERExtractionReturn {
  // Extraction results
  result: UnifiedNERResult | null;
  entities: ExtractedEntity[];
  isLoading: boolean;
  error: Error | null;

  // Mode management
  mode: ExtractionMode;
  setMode: (mode: ExtractionMode) => void;
  isModeAvailable: (mode: ExtractionMode) => boolean;

  // Model status
  modelStatus: ModelStatus;
  initializeBiobert: () => Promise<boolean>;
  modelLoadingProgress: number;

  // Extraction functions
  extract: (text: string, options?: Partial<UnifiedNEROptions>) => Promise<UnifiedNERResult>;
  extractDebounced: (text: string, options?: Partial<UnifiedNEROptions>) => void;
  clearResults: () => void;

  // Metrics
  metrics: {
    totalEntities: number;
    avgConfidence: number;
    executionTime: number;
    byType: Record<string, number>;
  } | null;
}

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

export function useNERExtraction(
  options: UseNERExtractionOptions = {}
): UseNERExtractionReturn {
  const {
    initialMode = 'regex',
    autoInitBiobert = false,
    minConfidence = 0.5,
    debounceMs = 300,
  } = options;

  // State
  const [result, setResult] = useState<UnifiedNERResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [mode, setModeState] = useState<ExtractionMode>(initialMode);
  const [modelStatus, setModelStatus] = useState<ModelStatus>(getBioBERTStatus);
  const [modelLoadingProgress, setModelLoadingProgress] = useState(0);

  // Refs
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const extractionIdRef = useRef(0);

  // Initialize mode on mount
  useEffect(() => {
    setExtractionMode(initialMode);
  }, [initialMode]);

  // Auto-initialize BioBERT if requested
  useEffect(() => {
    if (autoInitBiobert) {
      initializeBioBERT((progress: number, _status: string) => {
        setModelLoadingProgress(progress / 100); // Convert 0-100 to 0-1
      }).then(() => {
        setModelStatus(getBioBERTStatus());
      });
    }
  }, [autoInitBiobert]);

  // Update model status periodically when loading
  useEffect(() => {
    if (!modelStatus.loading) return;

    const interval = setInterval(() => {
      const status = getBioBERTStatus();
      setModelStatus(status);
      if (!status.loading) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [modelStatus.loading]);

  // Set mode
  const setMode = useCallback((newMode: ExtractionMode) => {
    setModeState(newMode);
    setExtractionMode(newMode);
  }, []);

  // Check mode availability
  const checkModeAvailable = useCallback((checkMode: ExtractionMode): boolean => {
    switch (checkMode) {
      case 'regex':
        return true;
      case 'biobert':
        return modelStatus.loaded;
      case 'hybrid':
        return true;
      default:
        return false;
    }
  }, [modelStatus.loaded]);

  // Initialize BioBERT
  const initBiobert = useCallback(async (): Promise<boolean> => {
    setModelLoadingProgress(0);
    const success = await initializeBioBERT((progress: number, _status: string) => {
      setModelLoadingProgress(progress / 100); // Convert 0-100 to 0-1
    });
    setModelStatus(getBioBERTStatus());
    return success;
  }, []);

  // Extract entities
  const extract = useCallback(
    async (
      text: string,
      extractOptions?: Partial<UnifiedNEROptions>
    ): Promise<UnifiedNERResult> => {
      const currentExtractionId = ++extractionIdRef.current;

      setIsLoading(true);
      setError(null);

      try {
        const extractionResult = await extractEntities(text, {
          mode,
          minConfidence,
          ...extractOptions,
        });

        // Only update state if this is still the current extraction
        if (currentExtractionId === extractionIdRef.current) {
          setResult(extractionResult);
          setModelStatus(getBioBERTStatus());
        }

        return extractionResult;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        if (currentExtractionId === extractionIdRef.current) {
          setError(error);
        }
        throw error;
      } finally {
        if (currentExtractionId === extractionIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [mode, minConfidence]
  );

  // Debounced extraction
  const extractDebounced = useCallback(
    (text: string, extractOptions?: Partial<UnifiedNEROptions>) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        extract(text, extractOptions).catch(() => {
          // Error is already handled in extract
        });
      }, debounceMs);
    },
    [extract, debounceMs]
  );

  // Clear results
  const clearResults = useCallback(() => {
    setResult(null);
    setError(null);
    extractionIdRef.current++;
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Compute metrics
  const metrics = result
    ? {
        totalEntities: result.metrics.totalEntities,
        avgConfidence: result.metrics.avgConfidence,
        executionTime: result.executionTime,
        byType: result.metrics.byType,
      }
    : null;

  return {
    // Results
    result,
    entities: result?.entities ?? [],
    isLoading,
    error,

    // Mode
    mode,
    setMode,
    isModeAvailable: checkModeAvailable,

    // Model
    modelStatus,
    initializeBiobert: initBiobert,
    modelLoadingProgress,

    // Functions
    extract,
    extractDebounced,
    clearResults,

    // Metrics
    metrics,
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { ExtractionMode, UnifiedNERResult, UnifiedNEROptions, ModelStatus };
