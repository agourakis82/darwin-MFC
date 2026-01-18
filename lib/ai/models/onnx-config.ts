/**
 * ONNX Runtime Web Configuration for BioBERT
 * ==========================================
 *
 * Configuration for client-side inference using ONNX Runtime Web
 * Supports WebGPU (fastest), WebGL, and WASM (fallback)
 * Device selection is automatic based on browser capabilities
 *
 * Model: BioBERT-base for Named Entity Recognition (NER)
 * Quantized to ONNX format for smaller bundle size (~50MB)
 */

// Type stub for optional onnxruntime-web dependency
type InferenceSession = { run: (feeds: Record<string, unknown>) => Promise<Record<string, unknown>> };

// =============================================================================
// EXECUTION PROVIDERS (Device backends)
// =============================================================================

export type ExecutionProvider = 'webgpu' | 'webgl' | 'wasm';

export interface ExecutionProviderConfig {
  name: ExecutionProvider;
  priority: number; // Higher = preferred first
  fallbackOrder: ExecutionProvider[];
  enabled: boolean;
}

export const EXECUTION_PROVIDERS: Record<ExecutionProvider, ExecutionProviderConfig> = {
  webgpu: {
    name: 'webgpu',
    priority: 3,
    fallbackOrder: ['webgl', 'wasm'],
    enabled: true,
  },
  webgl: {
    name: 'webgl',
    priority: 2,
    fallbackOrder: ['wasm'],
    enabled: true,
  },
  wasm: {
    name: 'wasm',
    priority: 1,
    fallbackOrder: [],
    enabled: true, // Always enabled as ultimate fallback
  },
};

// =============================================================================
// MODEL CONFIGURATION
// =============================================================================

export interface ModelConfig {
  // Model identifier and version
  modelId: string;
  modelVersion: string;
  modelName: string;

  // Model sources
  modelPath: string; // Path to ONNX model file (.onnx)
  configPath?: string; // Optional config.json from Hugging Face

  // Model parameters
  maxSequenceLength: number;
  vocabularySize: number;
  hiddenSize: number;
  numLayers: number;
  numHeads: number;

  // Task configuration
  taskType: 'ner'; // Named Entity Recognition
  numLabels: number; // Number of NER labels

  // Performance tuning
  batchSize: number;
  quantized: boolean;
  precision: 'int8' | 'uint8' | 'float32' | 'float16';
}

export const BIOBERT_CONFIG: ModelConfig = {
  modelId: 'biobert-base-cased-v1.2',
  modelVersion: '1.2.0',
  modelName: 'BioBERT-base (cased)',

  modelPath: 'https://cdn.jsdelivr.net/npm/biobert-onnx@1.0.0/biobert-base-cased-v1.2.onnx',
  configPath: 'https://huggingface.co/dmis-lab/biobert-base-cased-v1.2/raw/main/config.json',

  maxSequenceLength: 512,
  vocabularySize: 28996,
  hiddenSize: 768,
  numLayers: 12,
  numHeads: 12,

  taskType: 'ner',
  numLabels: 13, // O, B-DISEASE, I-DISEASE, B-MEDICATION, I-MEDICATION, etc.

  batchSize: 1,
  quantized: true,
  precision: 'uint8',
};

// =============================================================================
// NER LABEL CONFIGURATION
// =============================================================================

export interface NERLabelConfig {
  id: number;
  label: string;
  entityType: EntityType;
  color: string;
  description: string;
}

export type EntityType = 'DISEASE' | 'MEDICATION' | 'SYMPTOM' | 'EXAM' | 'PROCEDURE' | 'O';

export const NER_LABELS: NERLabelConfig[] = [
  { id: 0, label: 'O', entityType: 'O', color: 'gray', description: 'Outside any entity' },
  { id: 1, label: 'B-DISEASE', entityType: 'DISEASE', color: 'red', description: 'Beginning of disease entity' },
  { id: 2, label: 'I-DISEASE', entityType: 'DISEASE', color: 'red', description: 'Inside disease entity' },
  { id: 3, label: 'B-MEDICATION', entityType: 'MEDICATION', color: 'blue', description: 'Beginning of medication entity' },
  { id: 4, label: 'I-MEDICATION', entityType: 'MEDICATION', color: 'blue', description: 'Inside medication entity' },
  { id: 5, label: 'B-SYMPTOM', entityType: 'SYMPTOM', color: 'yellow', description: 'Beginning of symptom entity' },
  { id: 6, label: 'I-SYMPTOM', entityType: 'SYMPTOM', color: 'yellow', description: 'Inside symptom entity' },
  { id: 7, label: 'B-EXAM', entityType: 'EXAM', color: 'purple', description: 'Beginning of exam entity' },
  { id: 8, label: 'I-EXAM', entityType: 'EXAM', color: 'purple', description: 'Inside exam entity' },
  { id: 9, label: 'B-PROCEDURE', entityType: 'PROCEDURE', color: 'green', description: 'Beginning of procedure entity' },
  { id: 10, label: 'I-PROCEDURE', entityType: 'PROCEDURE', color: 'green', description: 'Inside procedure entity' },
  { id: 11, label: 'B-LAB', entityType: 'EXAM', color: 'cyan', description: 'Beginning of lab value' },
  { id: 12, label: 'I-LAB', entityType: 'EXAM', color: 'cyan', description: 'Inside lab value' },
];

export function getNERLabelById(id: number): NERLabelConfig | undefined {
  return NER_LABELS.find(label => label.id === id);
}

export function getNERLabelByName(name: string): NERLabelConfig | undefined {
  return NER_LABELS.find(label => label.label === name);
}

// =============================================================================
// SESSION OPTIONS
// =============================================================================

export interface SessionOptions {
  executionProviders: ExecutionProvider[];
  graphOptimizationLevel: 'disabled' | 'basic' | 'extended' | 'all';
  enableMemPattern: boolean;
  enableCpuMemArena: boolean;
  enableProfiling: boolean;
  enableProfiling_intra: boolean;
  enableProfiling_inter: boolean;
  logVerbosityLevel: number; // 0=verbose, 1=info, 2=warning, 3=error, 4=fatal
}

export const DEFAULT_SESSION_OPTIONS: SessionOptions = {
  executionProviders: [
    EXECUTION_PROVIDERS.webgpu.name,
    EXECUTION_PROVIDERS.webgl.name,
    EXECUTION_PROVIDERS.wasm.name,
  ],
  graphOptimizationLevel: 'extended',
  enableMemPattern: true,
  enableCpuMemArena: true,
  enableProfiling: false,
  enableProfiling_intra: false,
  enableProfiling_inter: false,
  logVerbosityLevel: 2, // warnings only by default
};

// =============================================================================
// RUNTIME DETECTION
// =============================================================================

export interface DeviceCapabilities {
  hasWebGPU: boolean;
  hasWebGL: boolean;
  hasWASM: boolean;
  recommendedProvider: ExecutionProvider;
}

/**
 * Detect device capabilities for model execution
 */
export async function detectDeviceCapabilities(): Promise<DeviceCapabilities> {
  const capabilities: DeviceCapabilities = {
    hasWebGPU: false,
    hasWebGL: false,
    hasWASM: true, // Always available in modern browsers
    recommendedProvider: 'wasm',
  };

  try {
    // Check WebGPU support
    if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
      try {
        const gpu = (navigator as any).gpu;
        if (gpu && typeof gpu.requestAdapter === 'function') {
          const adapter = await gpu.requestAdapter();
          capabilities.hasWebGPU = !!adapter;
          if (capabilities.hasWebGPU) {
            capabilities.recommendedProvider = 'webgpu';
          }
        }
      } catch (e) {
        console.debug('WebGPU not available:', e);
      }
    }

    // Check WebGL support (simpler than WebGPU)
    if (!capabilities.hasWebGPU && typeof document !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        const gl =
          canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl');
        capabilities.hasWebGL = !!gl;
        if (capabilities.hasWebGL && !capabilities.hasWebGPU) {
          capabilities.recommendedProvider = 'webgl';
        }
      } catch (e) {
        console.debug('WebGL not available:', e);
      }
    }
  } catch (e) {
    console.debug('Error detecting device capabilities:', e);
  }

  return capabilities;
}

// =============================================================================
// CACHING CONFIGURATION (IndexedDB)
// =============================================================================

export interface CacheConfig {
  enabled: boolean;
  dbName: string;
  storeName: string;
  versionNum: number;
  ttlDays: number; // Time-to-live for cached models
}

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  enabled: true,
  dbName: 'darwin-mfc-biobert',
  storeName: 'models',
  versionNum: 1,
  ttlDays: 30,
};

// =============================================================================
// PROGRESS TRACKING
// =============================================================================

export interface ProgressCallback {
  (progress: number, status: string): void;
}

export interface LoadingProgress {
  stage: 'initializing' | 'downloading' | 'parsing' | 'compiling' | 'optimizing' | 'loaded' | 'error';
  progress: number; // 0-100
  status: string;
  downloadedBytes?: number;
  totalBytes?: number;
}

// =============================================================================
// ERROR HANDLING
// =============================================================================

export class ONNXConfigError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ONNXConfigError';
  }
}

export class ModelNotFoundError extends ONNXConfigError {
  constructor(modelPath: string) {
    super(`Model not found at path: ${modelPath}`, 'MODEL_NOT_FOUND', { modelPath });
  }
}

export class DeviceNotSupportedError extends ONNXConfigError {
  constructor(provider: ExecutionProvider) {
    super(`Execution provider not supported: ${provider}`, 'DEVICE_NOT_SUPPORTED', { provider });
  }
}

export class SessionCreationError extends ONNXConfigError {
  constructor(message: string, originalError?: Error) {
    super(message, 'SESSION_CREATION_ERROR', { originalError });
  }
}

// =============================================================================
// INFERENCE CONFIGURATION
// =============================================================================

export interface InferenceConfig {
  maxTokens: number;
  minConfidence: number; // Threshold for entity confidence (0-1)
  batchSize: number;
  timeout: number; // milliseconds
}

export const DEFAULT_INFERENCE_CONFIG: InferenceConfig = {
  maxTokens: 512,
  minConfidence: 0.5,
  batchSize: 1,
  timeout: 30000, // 30 seconds
};
