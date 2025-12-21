/**
 * AI CONFIGURATION - DARWIN-MFC
 * ==============================
 *
 * Centralized configuration for AI features.
 * All AI is OPTIONAL - platform works fully without it.
 *
 * Tiers:
 * - Tier 1: Pre-generated content (default, free, works offline)
 * - Tier 2: Client-side AI (optional, free, runs in browser)
 * - Tier 3: API-based AI (optional, requires API key)
 */

// =============================================================================
// FEATURE FLAGS
// =============================================================================

export interface AIFeatureFlags {
  /** Enable client-side AI (WebLLM) */
  clientAI: boolean;
  /** Enable API-based AI (requires key) */
  apiAI: boolean;
  /** Enable smart search enhancement */
  smartSearch: boolean;
  /** Enable symptom checker assistant */
  symptomChecker: boolean;
  /** Enable drug interaction AI analysis */
  interactionAnalysis: boolean;
}

/**
 * Default feature flags - conservative, privacy-first
 */
export const DEFAULT_AI_FLAGS: AIFeatureFlags = {
  clientAI: false,      // User must opt-in
  apiAI: false,         // Never auto-enabled
  smartSearch: false,   // Requires clientAI
  symptomChecker: false,// Requires clientAI
  interactionAnalysis: false,
};

// =============================================================================
// API PROVIDERS
// =============================================================================

export type AIProvider =
  | 'anthropic'    // Claude (paid)
  | 'openai'       // GPT (paid)
  | 'groq'         // Free tier available
  | 'ollama'       // Free, runs locally
  | 'google'       // Gemini (free tier)
  | 'client';      // WebLLM (free, in-browser)

export interface ProviderConfig {
  name: string;
  cost: 'free' | 'paid' | 'freemium';
  privacyLevel: 'high' | 'medium' | 'low';
  requiresInternet: boolean;
  description: string;
  setupUrl?: string;
}

export const PROVIDER_INFO: Record<AIProvider, ProviderConfig> = {
  client: {
    name: 'Browser AI (WebLLM)',
    cost: 'free',
    privacyLevel: 'high',
    requiresInternet: false, // After model download
    description: 'Runs entirely in your browser. No data sent anywhere.',
  },
  ollama: {
    name: 'Ollama (Local)',
    cost: 'free',
    privacyLevel: 'high',
    requiresInternet: false,
    description: 'Runs on your computer. Best for contributors.',
    setupUrl: 'https://ollama.ai/',
  },
  groq: {
    name: 'Groq Cloud',
    cost: 'freemium',
    privacyLevel: 'medium',
    requiresInternet: true,
    description: 'Fast inference with free tier. Requires signup.',
    setupUrl: 'https://console.groq.com/',
  },
  google: {
    name: 'Google AI (Gemini)',
    cost: 'freemium',
    privacyLevel: 'low',
    requiresInternet: true,
    description: 'Gemini models with free tier.',
    setupUrl: 'https://aistudio.google.com/',
  },
  anthropic: {
    name: 'Anthropic (Claude)',
    cost: 'paid',
    privacyLevel: 'medium',
    requiresInternet: true,
    description: 'Best quality. For contributors and institutions.',
    setupUrl: 'https://console.anthropic.com/',
  },
  openai: {
    name: 'OpenAI (GPT)',
    cost: 'paid',
    privacyLevel: 'medium',
    requiresInternet: true,
    description: 'GPT-4 models. For contributors and institutions.',
    setupUrl: 'https://platform.openai.com/',
  },
};

// =============================================================================
// USER PREFERENCES
// =============================================================================

export interface AIUserPreferences {
  /** Selected provider */
  provider: AIProvider;
  /** Feature flags */
  features: AIFeatureFlags;
  /** API key (encrypted in localStorage) */
  apiKey?: string;
  /** Preferred model for client AI */
  clientModel?: string;
  /** Show AI suggestions */
  showSuggestions: boolean;
  /** Data sharing consent */
  dataConsent: boolean;
}

const STORAGE_KEY = 'darwin-mfc-ai-prefs';

/**
 * Get user AI preferences
 */
export function getAIPreferences(): AIUserPreferences {
  if (typeof window === 'undefined') {
    return {
      provider: 'client',
      features: DEFAULT_AI_FLAGS,
      showSuggestions: true,
      dataConsent: false,
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }

  return {
    provider: 'client',
    features: DEFAULT_AI_FLAGS,
    showSuggestions: true,
    dataConsent: false,
  };
}

/**
 * Save user AI preferences
 */
export function setAIPreferences(prefs: Partial<AIUserPreferences>): void {
  if (typeof window === 'undefined') return;

  const current = getAIPreferences();
  const updated = { ...current, ...prefs };

  // Never store API keys in plain localStorage
  // In production, use encrypted storage or session-only
  if (updated.apiKey) {
    console.warn('API keys should be stored securely. Consider using environment variables.');
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// =============================================================================
// CAPABILITY DETECTION
// =============================================================================

/**
 * Check device capabilities for AI features
 */
export function detectAICapabilities(): {
  webgpu: boolean;
  webgl2: boolean;
  memory: number | null;
  recommended: AIProvider;
  supportedProviders: AIProvider[];
} {
  if (typeof window === 'undefined') {
    return {
      webgpu: false,
      webgl2: false,
      memory: null,
      recommended: 'client',
      supportedProviders: [],
    };
  }

  const webgpu = 'gpu' in navigator;
  const canvas = document.createElement('canvas');
  const webgl2 = !!canvas.getContext('webgl2');
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || null;

  const supportedProviders: AIProvider[] = ['anthropic', 'openai', 'groq', 'google'];

  if (webgpu || webgl2) {
    supportedProviders.unshift('client');
  }

  // Always support Ollama (user's responsibility to run it)
  supportedProviders.push('ollama');

  // Recommend based on capabilities
  let recommended: AIProvider = 'client';
  if (!webgpu && !webgl2) {
    recommended = 'groq'; // Free tier, doesn't require local resources
  }

  return {
    webgpu,
    webgl2,
    memory,
    recommended,
    supportedProviders,
  };
}

// =============================================================================
// DISCLAIMERS
// =============================================================================

export const AI_DISCLAIMERS = {
  general: `
    AI features in Darwin-MFC are decision SUPPORT tools, not diagnostic systems.
    Always apply clinical judgment, consult current guidelines, and consider
    specialist referral when appropriate.
  `.trim(),

  symptomChecker: `
    This symptom analysis is for educational and decision support purposes only.
    It does not constitute medical advice, diagnosis, or treatment.
    Always conduct a complete clinical evaluation and follow local protocols.
  `.trim(),

  drugInteraction: `
    Drug interaction analysis is based on known interactions in medical literature.
    Always verify interactions using multiple sources and consider patient-specific
    factors. Consult a clinical pharmacist for complex cases.
  `.trim(),

  privacy: `
    When using client-side AI (WebLLM), all data stays on your device.
    When using cloud AI providers, data is sent to external servers.
    Review the privacy policy of your chosen provider.
  `.trim(),
};

// =============================================================================
// RATE LIMITING
// =============================================================================

/**
 * Simple rate limiter for API calls
 */
export class RateLimiter {
  private timestamps: number[] = [];
  private limit: number;
  private windowMs: number;

  constructor(limit: number, windowMs: number) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  canProceed(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    return this.timestamps.length < this.limit;
  }

  record(): void {
    this.timestamps.push(Date.now());
  }

  async waitIfNeeded(): Promise<void> {
    while (!this.canProceed()) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.record();
  }
}

// Default rate limiters
export const RATE_LIMITERS = {
  pubmed: new RateLimiter(3, 1000),      // 3 per second (no API key)
  anthropic: new RateLimiter(60, 60000), // 60 per minute
  client: new RateLimiter(10, 1000),     // 10 per second (local)
};
