/**
 * CLIENT-SIDE AI INFERENCE - DARWIN-MFC
 * ======================================
 *
 * Free, privacy-first AI that runs entirely in the user's browser.
 * No API calls, no costs, no data collection.
 *
 * Uses WebLLM (https://webllm.mlc.ai/) for local LLM inference.
 *
 * Designed for:
 * - Users in LMICs with limited resources
 * - Privacy-conscious healthcare settings
 * - Offline-capable clinical decision support
 *
 * Part of SOTA Strategic Plan - Phase 3: Health Equity AI
 */

// =============================================================================
// TYPES
// =============================================================================

export interface ClientAIConfig {
  /** Model to use (smaller = faster, less accurate) */
  model: ClientAIModel;
  /** Max tokens for response */
  maxTokens?: number;
  /** Temperature (0-1, lower = more deterministic) */
  temperature?: number;
  /** Callback for progress updates during model loading */
  onProgress?: (progress: ModelLoadProgress) => void;
}

export type ClientAIModel =
  | 'TinyLlama-1.1B'      // Smallest, fastest, works on most devices
  | 'Phi-2'               // Small but capable, good for Q&A
  | 'Mistral-7B-Instruct' // Best quality, requires good device
  | 'Llama-3-8B';         // High quality, requires powerful device

export interface ModelLoadProgress {
  stage: 'downloading' | 'loading' | 'ready' | 'error';
  progress: number; // 0-100
  message: string;
}

export interface InferenceResult {
  text: string;
  tokensUsed: number;
  inferenceTimeMs: number;
  model: ClientAIModel;
}

export interface SymptomCheckResult {
  possibleConditions: Array<{
    condition: string;
    probability: 'high' | 'moderate' | 'low';
    urgency: 'emergency' | 'urgent' | 'routine' | 'self-care';
    reasoning: string;
  }>;
  redFlags: string[];
  nextSteps: string[];
  disclaimer: string;
}

// =============================================================================
// CLIENT AI ENGINE
// =============================================================================

/**
 * Client-side AI engine using WebLLM
 *
 * Features:
 * - Runs entirely in browser (no API calls)
 * - Free forever (no usage costs)
 * - Privacy-first (no data leaves device)
 * - Offline-capable (after model download)
 */
export class ClientAI {
  private engine: unknown = null;
  private config: ClientAIConfig;
  private isLoading = false;
  private isReady = false;

  constructor(config: Partial<ClientAIConfig> = {}) {
    this.config = {
      model: config.model || 'TinyLlama-1.1B',
      maxTokens: config.maxTokens || 512,
      temperature: config.temperature ?? 0.3,
      onProgress: config.onProgress,
    };
  }

  /**
   * Check if WebLLM is supported in this browser
   */
  static isSupported(): boolean {
    if (typeof window === 'undefined') return false;

    // Check for WebGPU support (required for WebLLM)
    const hasWebGPU = 'gpu' in navigator;

    // Fallback: Check for WebGL2 (some models work with this)
    const canvas = document.createElement('canvas');
    const hasWebGL2 = !!canvas.getContext('webgl2');

    return hasWebGPU || hasWebGL2;
  }

  /**
   * Get recommended model based on device capabilities
   */
  static getRecommendedModel(): ClientAIModel {
    if (typeof window === 'undefined') return 'TinyLlama-1.1B';

    // Check device memory (if available)
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;

    if (memory && memory >= 8) {
      return 'Mistral-7B-Instruct';
    } else if (memory && memory >= 4) {
      return 'Phi-2';
    }

    return 'TinyLlama-1.1B';
  }

  /**
   * Initialize the AI engine (downloads model if needed)
   */
  async initialize(): Promise<boolean> {
    if (this.isReady) return true;
    if (this.isLoading) return false;

    if (!ClientAI.isSupported()) {
      this.config.onProgress?.({
        stage: 'error',
        progress: 0,
        message: 'WebGPU not supported in this browser',
      });
      return false;
    }

    this.isLoading = true;

    try {
      this.config.onProgress?.({
        stage: 'downloading',
        progress: 0,
        message: `Downloading ${this.config.model}...`,
      });

      // Dynamic import to avoid SSR issues and allow optional installation
      // Using Function constructor to bypass TypeScript module resolution
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let webllm: any;
      try {
        // Use indirect import to avoid TypeScript static analysis
        const importModule = new Function('moduleName', 'return import(moduleName)');
        webllm = await importModule('@mlc-ai/web-llm');
      } catch {
        throw new Error(
          'WebLLM not installed. This is an optional feature.\n' +
          'To enable client-side AI, install it with:\n' +
          '  npm install @mlc-ai/web-llm\n\n' +
          'Note: This is optional. Darwin-MFC works fully without it.'
        );
      }

      const modelId = this.getModelId(this.config.model);

      this.engine = await webllm.CreateMLCEngine(modelId, {
        initProgressCallback: (report: { progress: number; text: string }) => {
          this.config.onProgress?.({
            stage: report.progress < 1 ? 'downloading' : 'loading',
            progress: Math.round(report.progress * 100),
            message: report.text,
          });
        },
      });

      this.isReady = true;
      this.isLoading = false;

      this.config.onProgress?.({
        stage: 'ready',
        progress: 100,
        message: 'AI ready',
      });

      return true;
    } catch (error) {
      this.isLoading = false;

      const message = error instanceof Error ? error.message : String(error);
      this.config.onProgress?.({
        stage: 'error',
        progress: 0,
        message: message,
      });

      return false;
    }
  }

  /**
   * Map user-friendly model names to WebLLM model IDs
   */
  private getModelId(model: ClientAIModel): string {
    const modelMap: Record<ClientAIModel, string> = {
      'TinyLlama-1.1B': 'TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC',
      'Phi-2': 'Phi-2-q4f16_1-MLC',
      'Mistral-7B-Instruct': 'Mistral-7B-Instruct-v0.3-q4f16_1-MLC',
      'Llama-3-8B': 'Llama-3-8B-Instruct-q4f16_1-MLC',
    };
    return modelMap[model];
  }

  /**
   * Generate text response
   */
  async generate(prompt: string): Promise<InferenceResult | null> {
    if (!this.isReady || !this.engine) {
      console.warn('ClientAI not initialized. Call initialize() first.');
      return null;
    }

    const startTime = Date.now();

    try {
      const engine = this.engine as {
        chat: {
          completions: {
            create: (params: {
              messages: Array<{ role: string; content: string }>;
              max_tokens: number;
              temperature: number;
            }) => Promise<{
              choices: Array<{ message: { content: string } }>;
              usage: { total_tokens: number };
            }>;
          };
        };
      };

      const response = await engine.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a medical assistant for Darwin-MFC, a clinical decision support platform.
You help primary care physicians with evidence-based information.
Always recommend consulting current guidelines and specialist referral when appropriate.
Never diagnose - only provide differential diagnosis considerations.
Be concise and clinically focused.`,
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: this.config.maxTokens!,
        temperature: this.config.temperature!,
      });

      return {
        text: response.choices[0]?.message?.content || '',
        tokensUsed: response.usage?.total_tokens || 0,
        inferenceTimeMs: Date.now() - startTime,
        model: this.config.model,
      };
    } catch (error) {
      console.error('Inference error:', error);
      return null;
    }
  }

  /**
   * Smart search enhancement
   */
  async enhanceSearch(query: string, context: string[]): Promise<string[]> {
    const prompt = `Given the search query "${query}" in a medical context, suggest 3-5 related search terms.
Context terms: ${context.join(', ')}
Return only the terms, one per line.`;

    const result = await this.generate(prompt);
    if (!result) return [];

    return result.text
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .slice(0, 5);
  }

  /**
   * Symptom check assistant (with strong disclaimers)
   */
  async checkSymptoms(
    symptoms: string[],
    patientInfo: {
      age?: number;
      sex?: 'M' | 'F';
      knownConditions?: string[];
    }
  ): Promise<SymptomCheckResult> {
    const prompt = `As a clinical decision support tool, analyze these symptoms for a primary care setting:

Symptoms: ${symptoms.join(', ')}
${patientInfo.age ? `Age: ${patientInfo.age}` : ''}
${patientInfo.sex ? `Sex: ${patientInfo.sex}` : ''}
${patientInfo.knownConditions?.length ? `Known conditions: ${patientInfo.knownConditions.join(', ')}` : ''}

Provide:
1. Top 3 differential diagnoses with probability (high/moderate/low) and urgency level
2. Any red flags requiring immediate attention
3. Recommended next steps for the physician

Format as JSON.`;

    const result = await this.generate(prompt);

    // Default response with disclaimer
    const defaultResult: SymptomCheckResult = {
      possibleConditions: [],
      redFlags: [],
      nextSteps: ['Complete clinical examination', 'Review patient history'],
      disclaimer:
        'This is a clinical decision support tool, not a diagnostic system. ' +
        'Always apply clinical judgment and follow local protocols.',
    };

    if (!result) return defaultResult;

    try {
      // Try to parse AI response as JSON
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          ...defaultResult,
          ...parsed,
          disclaimer: defaultResult.disclaimer,
        };
      }
    } catch {
      // If parsing fails, return default with raw text
      defaultResult.nextSteps.push('AI analysis available but requires interpretation');
    }

    return defaultResult;
  }

  /**
   * Cleanup resources
   */
  async dispose(): Promise<void> {
    if (this.engine) {
      const engine = this.engine as { unload?: () => Promise<void> };
      await engine.unload?.();
      this.engine = null;
      this.isReady = false;
    }
  }
}

// =============================================================================
// FEATURE FLAGS
// =============================================================================

/**
 * Check if client AI features should be enabled
 */
export function isClientAIEnabled(): boolean {
  // Only enable in browser
  if (typeof window === 'undefined') return false;

  // Check user preference
  const preference = localStorage.getItem('darwin-mfc-client-ai');
  if (preference === 'disabled') return false;

  // Check device capability
  return ClientAI.isSupported();
}

/**
 * Enable/disable client AI
 */
export function setClientAIEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('darwin-mfc-client-ai', enabled ? 'enabled' : 'disabled');
}

// =============================================================================
// MODEL SIZE INFO
// =============================================================================

export const MODEL_INFO: Record<
  ClientAIModel,
  {
    size: string;
    downloadSize: string;
    minRAM: string;
    quality: 'basic' | 'good' | 'excellent';
    speed: 'fast' | 'medium' | 'slow';
  }
> = {
  'TinyLlama-1.1B': {
    size: '1.1B parameters',
    downloadSize: '~600MB',
    minRAM: '2GB',
    quality: 'basic',
    speed: 'fast',
  },
  'Phi-2': {
    size: '2.7B parameters',
    downloadSize: '~1.5GB',
    minRAM: '4GB',
    quality: 'good',
    speed: 'medium',
  },
  'Mistral-7B-Instruct': {
    size: '7B parameters',
    downloadSize: '~4GB',
    minRAM: '8GB',
    quality: 'excellent',
    speed: 'medium',
  },
  'Llama-3-8B': {
    size: '8B parameters',
    downloadSize: '~4.5GB',
    minRAM: '8GB',
    quality: 'excellent',
    speed: 'slow',
  },
};
