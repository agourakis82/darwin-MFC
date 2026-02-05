/**
 * BioBERT Model Loader for ONNX Runtime Web
 * ==========================================
 *
 * Handles lazy loading, caching, and fallback for BioBERT quantized model
 * Uses IndexedDB for local model persistence to reduce bandwidth
 * Provides progress callbacks for UI feedback
 *
 * Features:
 * - Lazy loading on first use
 * - IndexedDB caching with TTL
 * - Automatic fallback to regex NLP if model fails
 * - Device-aware execution provider selection
 * - Graceful degradation for unsupported browsers
 */

// onnxruntime-web is optional - graceful degradation if not installed
type InferenceSession = { run: (feeds: Record<string, unknown>) => Promise<Record<string, unknown>>; release: () => Promise<void>; };
type Tensor = { data: Float32Array; dims: readonly number[]; };
type OrtEnv = { wasm: { wasmPaths?: string } };
type OrtModule = { InferenceSession: { create: (...args: unknown[]) => Promise<InferenceSession> }; Tensor: new (...args: unknown[]) => Tensor; env: OrtEnv };
let ort: OrtModule | null = null;
let ortLoadAttempted = false;

// Async loader that uses dynamic import with webpackIgnore to make it truly optional
async function loadOrt(): Promise<OrtModule | null> {
  if (ortLoadAttempted) return ort;
  ortLoadAttempted = true;
  try {
    // webpackIgnore tells webpack not to bundle this - it's loaded at runtime if available
    // @ts-ignore - onnxruntime-web is optional, module may not be installed
    ort = await import(/* webpackIgnore: true */ 'onnxruntime-web') as unknown as OrtModule;
    return ort;
  } catch {
    // Module not installed - will use Hugging Face API or regex fallback
    return null;
  }
}
import {
  BIOBERT_CONFIG,
  DEFAULT_SESSION_OPTIONS,
  DEFAULT_CACHE_CONFIG,
  DEFAULT_INFERENCE_CONFIG,
  detectDeviceCapabilities,
  type ExecutionProvider,
  type SessionOptions,
  type CacheConfig,
  type ProgressCallback,
  type LoadingProgress,
  type InferenceConfig,
  ONNXConfigError,
  ModelNotFoundError,
  SessionCreationError,
} from './onnx-config';

// =============================================================================
// MODULE STATE
// =============================================================================

let modelSession: InferenceSession | null = null;
let isLoadingModel = false;
let loadingPromise: Promise<InferenceSession | null> | null = null;
let lastLoadError: Error | null = null;
let isModelAvailable = false;

// Callbacks for progress tracking
const progressCallbacks = new Set<ProgressCallback>();

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize ONNX Runtime configuration
 * Must be called once before loading models
 */
export async function initializeONNXRuntime(): Promise<void> {
  try {
    // Try to load ONNX Runtime (optional dependency)
    const ortModule = await loadOrt();
    if (!ortModule) {
      console.warn('[BioBERT] ONNX Runtime not available - will use Hugging Face API or regex fallback');
      return;
    }
    // Configure WASM path for fallback
    ortModule.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';

    // Detect device capabilities
    const capabilities = await detectDeviceCapabilities();
    console.log('[BioBERT] Device capabilities:', {
      webGPU: capabilities.hasWebGPU,
      webGL: capabilities.hasWebGL,
      recommended: capabilities.recommendedProvider,
    });

    // Set execution provider based on device
    const sessionOptions = { ...DEFAULT_SESSION_OPTIONS };
    if (capabilities.hasWebGPU) {
      sessionOptions.executionProviders = ['webgpu', 'webgl', 'wasm'];
    } else if (capabilities.hasWebGL) {
      sessionOptions.executionProviders = ['webgl', 'wasm'];
    } else {
      sessionOptions.executionProviders = ['wasm'];
    }

    console.log('[BioBERT] ONNX Runtime initialized with providers:', sessionOptions.executionProviders);
  } catch (error) {
    console.error('[BioBERT] Failed to initialize ONNX Runtime:', error);
    lastLoadError = error as Error;
  }
}

// =============================================================================
// PROGRESS TRACKING
// =============================================================================

/**
 * Subscribe to model loading progress
 */
export function onLoadingProgress(callback: ProgressCallback): () => void {
  progressCallbacks.add(callback);
  return () => progressCallbacks.delete(callback);
}

/**
 * Emit progress event to all subscribers
 */
function emitProgress(progress: LoadingProgress): void {
  const message = `${progress.stage}: ${progress.status} (${progress.progress}%)`;
  progressCallbacks.forEach(callback => callback(progress.progress, message));
  console.log(`[BioBERT] ${message}`);
}

// =============================================================================
// MODEL CACHING (IndexedDB)
// =============================================================================

/**
 * Check if model is cached and valid
 */
async function getCachedModel(config: CacheConfig): Promise<ArrayBuffer | null> {
  if (!config.enabled || typeof indexedDB === 'undefined') {
    return null;
  }

  try {
    return await new Promise((resolve, reject) => {
      const request = indexedDB.open(config.dbName, config.versionNum);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(config.storeName, 'readonly');
        const store = transaction.objectStore(config.storeName);
        const getRequest = store.get('biobert-model');

        getRequest.onerror = () => reject(getRequest.error);
        getRequest.onsuccess = () => {
          const data = getRequest.result;
          if (!data) {
            resolve(null);
            return;
          }

          // Check if cached model has expired
          const ageMs = Date.now() - (data.timestamp || 0);
          const ttlMs = config.ttlDays * 24 * 60 * 60 * 1000;

          if (ageMs > ttlMs) {
            console.log('[BioBERT] Cached model expired, will re-download');
            resolve(null);
          } else {
            console.log('[BioBERT] Using cached model');
            resolve(data.buffer);
          }
        };
      };
    });
  } catch (error) {
    console.debug('[BioBERT] Error accessing cache:', error);
    return null;
  }
}

/**
 * Cache model to IndexedDB
 */
async function cacheModel(buffer: ArrayBuffer, config: CacheConfig): Promise<void> {
  if (!config.enabled || typeof indexedDB === 'undefined') {
    return;
  }

  try {
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(config.dbName, config.versionNum);

      request.onerror = () => reject(request.error);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(config.storeName)) {
          db.createObjectStore(config.storeName);
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(config.storeName, 'readwrite');
        const store = transaction.objectStore(config.storeName);
        const putRequest = store.put(
          { buffer, timestamp: Date.now(), modelVersion: BIOBERT_CONFIG.modelVersion },
          'biobert-model'
        );

        putRequest.onerror = () => reject(putRequest.error);
        putRequest.onsuccess = () => {
          console.log('[BioBERT] Model cached to IndexedDB');
          resolve();
        };
      };
    });
  } catch (error) {
    console.debug('[BioBERT] Error caching model:', error);
    // Non-critical error, continue anyway
  }
}

// =============================================================================
// MODEL LOADING
// =============================================================================

/**
 * Download model from remote source
 */
async function downloadModel(url: string, onProgress?: ProgressCallback): Promise<ArrayBuffer> {
  emitProgress({ stage: 'downloading', progress: 0, status: 'Fetching model...' });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        emitProgress({
          stage: 'downloading',
          progress: Math.round(percentComplete),
          status: `Downloaded ${(event.loaded / 1024 / 1024).toFixed(2)}MB of ${(event.total / 1024 / 1024).toFixed(2)}MB`,
          downloadedBytes: event.loaded,
          totalBytes: event.total,
        });
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        emitProgress({ stage: 'parsing', progress: 100, status: 'Model downloaded, parsing...' });
        resolve(xhr.response);
      } else {
        reject(new Error(`HTTP ${xhr.status}: Failed to download model`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error downloading model'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Model download aborted'));
    });

    xhr.responseType = 'arraybuffer';
    xhr.open('GET', url);
    xhr.send();
  });
}

/**
 * Create and cache ONNX Runtime session
 */
async function createSession(modelBuffer: ArrayBuffer, sessionOptions: SessionOptions): Promise<InferenceSession> {
  emitProgress({ stage: 'compiling', progress: 50, status: 'Creating ONNX session...' });

  try {
    // Convert ArrayBuffer to Uint8Array
    const modelData = new Uint8Array(modelBuffer);

    // Ensure ONNX Runtime is loaded
    const ortModule = await loadOrt();
    if (!ortModule) {
      throw new SessionCreationError('ONNX Runtime not available');
    }
    const convertedOptions = {
      executionProviders: sessionOptions.executionProviders as string[],
      graphOptimizationLevel: sessionOptions.graphOptimizationLevel,
      enableMemPattern: sessionOptions.enableMemPattern,
      enableCpuMemArena: sessionOptions.enableCpuMemArena,
    };

    const session = await ortModule.InferenceSession.create(modelData, convertedOptions as any);

    emitProgress({ stage: 'optimizing', progress: 90, status: 'Session created, optimizing...' });

    return session;
  } catch (error) {
    throw new SessionCreationError(
      `Failed to create ONNX session: ${error instanceof Error ? error.message : String(error)}`,
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Load BioBERT model (lazy loading)
 * Returns null if model loading fails and provides graceful fallback
 */
export async function loadBioBERTModel(
  forceFresh = false,
  inferenceConfig = DEFAULT_INFERENCE_CONFIG
): Promise<InferenceSession | null> {
  // Return existing session if already loaded
  if (modelSession !== null && !forceFresh) {
    return modelSession;
  }

  // Return pending promise if already loading
  if (loadingPromise !== null && !forceFresh) {
    return loadingPromise;
  }

  // Create new loading promise
  loadingPromise = (async () => {
    try {
      isLoadingModel = true;
      emitProgress({ stage: 'initializing', progress: 10, status: 'Initializing ONNX Runtime...' });

      // Initialize ONNX Runtime if not already done
      await initializeONNXRuntime();

      const cacheConfig = DEFAULT_CACHE_CONFIG;
      let modelBuffer: ArrayBuffer | null = null;

      // Try to get cached model first
      if (!forceFresh) {
        emitProgress({ stage: 'downloading', progress: 20, status: 'Checking cache...' });
        modelBuffer = await getCachedModel(cacheConfig);
      }

      // Download if not in cache
      if (!modelBuffer) {
        modelBuffer = await downloadModel(BIOBERT_CONFIG.modelPath);

        // Cache for future use
        await cacheModel(modelBuffer, cacheConfig);
      }

      // Create ONNX session
      const session = await createSession(modelBuffer, DEFAULT_SESSION_OPTIONS);

      emitProgress({ stage: 'loaded', progress: 100, status: 'BioBERT model loaded successfully' });

      modelSession = session;
      isModelAvailable = true;
      lastLoadError = null;

      return session;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('[BioBERT] Model loading failed:', errorMessage);

      lastLoadError = error as Error;
      isModelAvailable = false;

      emitProgress({
        stage: 'error',
        progress: 0,
        status: `Failed to load BioBERT: ${errorMessage}. Will use regex fallback.`,
      });

      // Return null for graceful fallback to regex NLP
      return null;
    } finally {
      isLoadingModel = false;
      loadingPromise = null;
    }
  })();

  return loadingPromise;
}

// =============================================================================
// MODEL STATE QUERIES
// =============================================================================

/**
 * Check if model is currently loaded
 */
export function isModelLoaded(): boolean {
  return modelSession !== null && isModelAvailable;
}

/**
 * Check if model is currently being loaded
 */
export function isModelLoading(): boolean {
  return isLoadingModel;
}

/**
 * Get the current model session (only if loaded)
 */
export function getModelSession(): InferenceSession | null {
  return modelSession;
}

/**
 * Get the last loading error (if any)
 */
export function getLastLoadError(): Error | null {
  return lastLoadError;
}

/**
 * Unload model to free memory
 */
export async function unloadModel(): Promise<void> {
  if (modelSession) {
    try {
      await modelSession.release();
      modelSession = null;
      isModelAvailable = false;
      console.log('[BioBERT] Model unloaded');
    } catch (error) {
      console.error('[BioBERT] Error unloading model:', error);
    }
  }
}

// =============================================================================
// INFERENCE HELPERS
// =============================================================================

/**
 * Tokenize text using BERT tokenizer (simplified)
 * In production, use huggingface/transformers.js for full tokenization
 */
export function tokenizeText(text: string, maxLength: number = BIOBERT_CONFIG.maxSequenceLength): string[] {
  // Basic whitespace tokenization for demo
  // Production should use proper BERT tokenizer
  const tokens = text.toLowerCase().split(/\s+/);

  // Add special tokens
  return ['[CLS]', ...tokens.slice(0, maxLength - 2), '[SEP]'];
}

/**
 * Convert tokens to input tensor
 */
export function tokensToTensor(tokens: string[], vocabSize: number = BIOBERT_CONFIG.vocabularySize): Tensor {
  // Create mock token IDs (in production, use actual vocabulary mapping)
  const tokenIds = tokens.map((token, idx) => {
    if (token === '[CLS]') return 101;
    if (token === '[SEP]') return 102;
    if (token === '[PAD]') return 0;
    return (token.charCodeAt(0) % vocabSize) + 999;
  });

  // Pad to maxSequenceLength
  const padded = new Array(BIOBERT_CONFIG.maxSequenceLength).fill(0);
  tokenIds.forEach((id, idx) => (padded[idx] = id));

  // Return tensor-like object (ort.Tensor if available, plain object otherwise)
  const tensorData = BigInt64Array.from(padded.map(id => BigInt(id)));
  if (ort) {
    return new ort.Tensor('int64', tensorData, [1, padded.length]);
  }
  return { data: tensorData, dims: [1, padded.length] } as unknown as Tensor;
}

/**
 * Preprocess text for model input
 */
export function preprocessText(text: string): {
  tokens: string[];
  inputTensor: Tensor;
} {
  const tokens = tokenizeText(text);
  const inputTensor = tokensToTensor(tokens);

  return { tokens, inputTensor };
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { SessionOptions, CacheConfig, InferenceConfig, ProgressCallback, LoadingProgress };
