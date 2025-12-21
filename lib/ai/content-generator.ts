/**
 * AI CONTENT GENERATION PIPELINE - DARWIN-MFC
 * =============================================
 *
 * Automated content generation for diseases and medications
 * with strict citation requirements and human-in-the-loop review.
 *
 * Philosophy: AI should augment, not replace clinical reasoning.
 * Every AI suggestion must be traceable to cited evidence.
 *
 * Part of SOTA Strategic Plan - Phase 3
 */

import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';
import type { Reference } from '@/lib/types/references';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Supported AI providers:
 * - anthropic: Claude (paid, best quality)
 * - openai: GPT-4 (paid)
 * - groq: Free tier available, fast inference
 * - ollama: Free, runs locally on your machine
 * - google: Gemini (free tier available)
 */
export type AIProvider = 'anthropic' | 'openai' | 'groq' | 'ollama' | 'google';

export interface AIContentConfig {
  /** AI provider to use */
  provider?: AIProvider;
  /** API key (not needed for ollama) */
  apiKey?: string;
  /** API base URL (for ollama: http://localhost:11434) */
  baseUrl?: string;
  /** Model to use */
  model?: string;
  /** Temperature for generation (lower = more deterministic) */
  temperature?: number;
  /** Maximum tokens for response */
  maxTokens?: number;
  /** Language for content generation */
  language?: 'pt' | 'en' | 'es' | 'fr';
}

/**
 * Default models for each provider
 */
export const DEFAULT_MODELS: Record<AIProvider, string> = {
  anthropic: 'claude-3-5-sonnet-20241022',
  openai: 'gpt-4-turbo',
  groq: 'llama-3.1-70b-versatile', // Free!
  ollama: 'llama3.1',              // Free, local
  google: 'gemini-1.5-flash',      // Free tier
};

export interface ContentDraft<T> {
  /** Unique draft ID */
  id: string;
  /** Type of content */
  type: 'disease' | 'medication';
  /** Generated content */
  content: Partial<T>;
  /** Extracted citations */
  citations: CitationDraft[];
  /** Confidence score (0-100) */
  confidenceScore: number;
  /** Areas that need human review */
  reviewFlags: ReviewFlag[];
  /** Generation metadata */
  metadata: GenerationMetadata;
  /** Status */
  status: 'draft' | 'pending_review' | 'approved' | 'rejected';
}

export interface CitationDraft {
  /** Reference text */
  text: string;
  /** PubMed ID if found */
  pmid?: string;
  /** DOI if found */
  doi?: string;
  /** Verification status */
  verified: boolean;
  /** Source where citation was found */
  source: 'pubmed' | 'crossref' | 'google_scholar' | 'manual';
}

export interface ReviewFlag {
  /** Field that needs review */
  field: string;
  /** Reason for flag */
  reason: 'low_confidence' | 'missing_citation' | 'conflicting_info' | 'needs_expert' | 'outdated';
  /** Severity */
  severity: 'info' | 'warning' | 'critical';
  /** Suggested action */
  suggestion?: string;
}

export interface GenerationMetadata {
  /** Timestamp */
  generatedAt: string;
  /** Model used */
  model: string;
  /** Prompt version */
  promptVersion: string;
  /** Token usage */
  tokensUsed: {
    prompt: number;
    completion: number;
    total: number;
  };
  /** Generation duration in ms */
  durationMs: number;
}

// =============================================================================
// PROMPT TEMPLATES
// =============================================================================

export const DISEASE_GENERATION_PROMPT = `You are a medical content specialist creating disease entries for Darwin-MFC, a clinical decision support platform for primary care physicians.

Generate a comprehensive disease entry in JSON format following this exact structure.
CRITICAL: Every clinical statement MUST have a citation. Use [1], [2], etc. notation.

Disease to generate: {{diseaseName}}
Language: {{language}}
Target audience: Primary care physicians in {{country}}

Required JSON structure:
{
  "id": "{{diseaseId}}",
  "titulo": "Disease Name",
  "sinonimos": ["synonym1", "synonym2"],
  "categoria": "category",
  "ciap2": ["code1"],
  "cid10": ["code1", "code2"],
  "cid11": ["code1"],
  "doid": "DOID:xxxxx",
  "snomedCT": "xxxxxxxx",
  "meshId": "Dxxxxxx",
  "umlsCui": "Cxxxxxxx",
  "definicao": "Clear definition with citation [1]",
  "epidemiologia": {
    "prevalencia": "X% globally [1]",
    "incidencia": "X per 100,000/year [2]",
    "gruposRisco": ["group1", "group2"],
    "fatoresRisco": ["factor1 [3]", "factor2 [4]"]
  },
  "fisiopatologia": "Brief pathophysiology explanation [5]",
  "quadroClinico": {
    "sintomasPrincipais": ["symptom1 [6]", "symptom2"],
    "sinaisClinicosEssenciais": ["sign1", "sign2"],
    "redFlags": ["red flag requiring immediate attention [7]"]
  },
  "diagnostico": {
    "criterios": "Diagnostic criteria per guideline [8]",
    "exameFisico": ["findings"],
    "examesComplementares": ["test1", "test2"],
    "diagnosticoDiferencial": ["condition1", "condition2"]
  },
  "tratamento": {
    "naoFarmacologico": ["lifestyle measure [9]"],
    "farmacologico": {
      "primeiraLinha": ["drug1 dose [10]"],
      "segundaLinha": ["drug2 dose"],
      "situacoesEspeciais": ["pregnancy considerations [11]"]
    },
    "encaminhamento": ["specialist referral criteria"]
  },
  "acompanhamento": {
    "periodicidade": "Follow-up interval [12]",
    "examesControle": ["monitoring tests"]
  },
  "citacoesInline": {
    "1": "Author et al. Title. Journal. Year;Vol:Pages. PMID: xxxxx",
    "2": "..."
  }
}

Guidelines:
1. Use Brazilian Portuguese medical terminology if language is 'pt'
2. Prioritize evidence from: Cochrane, UpToDate, Brazilian guidelines (MS, SBC, SBMFC), NICE, USPSTF
3. Include RENAME medications when applicable for Brazil
4. Every clinical recommendation must cite a source
5. Red flags should be actionable and specific
6. Dosages should be appropriate for primary care

Return ONLY valid JSON, no additional text.`;

export const MEDICATION_GENERATION_PROMPT = `You are a clinical pharmacologist creating medication entries for Darwin-MFC, a clinical decision support platform.

Generate a comprehensive medication entry in JSON format following the Medicamento type structure.
CRITICAL: Include pharmacokinetic data, interactions, and contraindications with citations.

Medication to generate: {{medicationName}}
Language: {{language}}
Target: Primary care in {{country}}

Required structure includes:
- Complete pharmacology (mechanism, PK/PD)
- All presentations with SUS availability
- Posology for all indications (adult, pediatric, elderly, renal adjustment)
- Drug interactions with severity (leve/moderada/grave/contraindicada)
- Pregnancy (FDA category) and lactation safety
- Adverse effects (common and severe)
- PharmGKB pharmacogenomics if relevant

Return ONLY valid JSON matching the Medicamento TypeScript interface.`;

// =============================================================================
// CONTENT GENERATOR CLASS
// =============================================================================

export class ContentGenerator {
  private config: Required<AIContentConfig>;

  constructor(config: AIContentConfig = {}) {
    const provider = config.provider || this.detectProvider(config);

    this.config = {
      provider,
      apiKey: config.apiKey || this.getEnvKey(provider),
      baseUrl: config.baseUrl || this.getDefaultBaseUrl(provider),
      model: config.model || DEFAULT_MODELS[provider],
      temperature: config.temperature ?? 0.3,
      maxTokens: config.maxTokens || 4096,
      language: config.language || 'pt',
    };
  }

  /**
   * Detect provider from environment or config
   */
  private detectProvider(config: AIContentConfig): AIProvider {
    if (config.apiKey) {
      // Try to detect from key format
      if (config.apiKey.startsWith('sk-ant-')) return 'anthropic';
      if (config.apiKey.startsWith('sk-')) return 'openai';
      if (config.apiKey.startsWith('gsk_')) return 'groq';
    }

    // Check environment variables
    if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
    if (process.env.OPENAI_API_KEY) return 'openai';
    if (process.env.GROQ_API_KEY) return 'groq';
    if (process.env.GOOGLE_API_KEY) return 'google';

    // Default to ollama (free, local)
    return 'ollama';
  }

  /**
   * Get API key from environment for provider
   */
  private getEnvKey(provider: AIProvider): string {
    const envKeys: Record<AIProvider, string> = {
      anthropic: process.env.ANTHROPIC_API_KEY || '',
      openai: process.env.OPENAI_API_KEY || '',
      groq: process.env.GROQ_API_KEY || '',
      ollama: '', // No key needed
      google: process.env.GOOGLE_API_KEY || '',
    };
    return envKeys[provider];
  }

  /**
   * Get default base URL for provider
   */
  private getDefaultBaseUrl(provider: AIProvider): string {
    const baseUrls: Record<AIProvider, string> = {
      anthropic: 'https://api.anthropic.com',
      openai: 'https://api.openai.com',
      groq: 'https://api.groq.com/openai',
      ollama: 'http://localhost:11434',
      google: 'https://generativelanguage.googleapis.com',
    };
    return baseUrls[provider];
  }

  /**
   * Generate a disease entry draft
   */
  async generateDisease(
    diseaseName: string,
    options: {
      diseaseId?: string;
      country?: string;
      existingData?: Partial<Doenca>;
    } = {}
  ): Promise<ContentDraft<Doenca>> {
    const startTime = Date.now();
    const diseaseId = options.diseaseId || this.generateId(diseaseName);
    const country = options.country || 'Brazil';

    const prompt = DISEASE_GENERATION_PROMPT
      .replace('{{diseaseName}}', diseaseName)
      .replace('{{diseaseId}}', diseaseId)
      .replace('{{language}}', this.config.language)
      .replace('{{country}}', country);

    try {
      const response = await this.callAPI(prompt);
      const content = this.parseJSONResponse<Partial<Doenca>>(response.text);
      const citations = this.extractCitations(content);
      const reviewFlags = this.analyzeForReview(content, citations);
      const confidenceScore = this.calculateConfidence(content, citations, reviewFlags);

      return {
        id: `draft-${diseaseId}-${Date.now()}`,
        type: 'disease',
        content,
        citations,
        confidenceScore,
        reviewFlags,
        metadata: {
          generatedAt: new Date().toISOString(),
          model: this.config.model,
          promptVersion: '1.0.0',
          tokensUsed: response.usage,
          durationMs: Date.now() - startTime,
        },
        status: 'draft',
      };
    } catch (error) {
      throw new Error(`Failed to generate disease content: ${error}`);
    }
  }

  /**
   * Generate a medication entry draft
   */
  async generateMedication(
    medicationName: string,
    options: {
      medicationId?: string;
      country?: string;
      existingData?: Partial<Medicamento>;
    } = {}
  ): Promise<ContentDraft<Medicamento>> {
    const startTime = Date.now();
    const medicationId = options.medicationId || this.generateId(medicationName);
    const country = options.country || 'Brazil';

    const prompt = MEDICATION_GENERATION_PROMPT
      .replace('{{medicationName}}', medicationName)
      .replace('{{language}}', this.config.language)
      .replace('{{country}}', country);

    try {
      const response = await this.callAPI(prompt);
      const content = this.parseJSONResponse<Partial<Medicamento>>(response.text);
      const citations = this.extractCitations(content);
      const reviewFlags = this.analyzeForReview(content, citations);
      const confidenceScore = this.calculateConfidence(content, citations, reviewFlags);

      return {
        id: `draft-${medicationId}-${Date.now()}`,
        type: 'medication',
        content,
        citations,
        confidenceScore,
        reviewFlags,
        metadata: {
          generatedAt: new Date().toISOString(),
          model: this.config.model,
          promptVersion: '1.0.0',
          tokensUsed: response.usage,
          durationMs: Date.now() - startTime,
        },
        status: 'draft',
      };
    } catch (error) {
      throw new Error(`Failed to generate medication content: ${error}`);
    }
  }

  /**
   * Call the AI API (Claude or OpenAI)
   */
  private async callAPI(prompt: string): Promise<{
    text: string;
    usage: { prompt: number; completion: number; total: number };
  }> {
    switch (this.config.provider) {
      case 'anthropic':
        return this.callAnthropic(prompt);
      case 'openai':
      case 'groq':
        return this.callOpenAICompatible(prompt);
      case 'ollama':
        return this.callOllama(prompt);
      case 'google':
        return this.callGoogle(prompt);
      default:
        throw new Error(`Unknown provider: ${this.config.provider}`);
    }
  }

  /**
   * Call Anthropic Claude API
   */
  private async callAnthropic(prompt: string): Promise<{
    text: string;
    usage: { prompt: number; completion: number; total: number };
  }> {
    if (!this.config.apiKey) {
      throw new Error('API key required. Set ANTHROPIC_API_KEY environment variable.');
    }

    const response = await fetch(`${this.config.baseUrl}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API failed: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return {
      text: data.content[0]?.text || '',
      usage: {
        prompt: data.usage?.input_tokens || 0,
        completion: data.usage?.output_tokens || 0,
        total: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
      },
    };
  }

  /**
   * Call OpenAI-compatible APIs (OpenAI, Groq)
   * Groq offers FREE tier with Llama models!
   */
  private async callOpenAICompatible(prompt: string): Promise<{
    text: string;
    usage: { prompt: number; completion: number; total: number };
  }> {
    if (!this.config.apiKey) {
      const envVar = this.config.provider === 'groq' ? 'GROQ_API_KEY' : 'OPENAI_API_KEY';
      throw new Error(`API key required. Set ${envVar} environment variable.`);
    }

    const baseUrl = this.config.provider === 'groq'
      ? 'https://api.groq.com/openai/v1'
      : 'https://api.openai.com/v1';

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        messages: [
          {
            role: 'system',
            content: 'You are a medical content specialist for Darwin-MFC clinical decision support.',
          },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`${this.config.provider} API failed: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return {
      text: data.choices[0]?.message?.content || '',
      usage: {
        prompt: data.usage?.prompt_tokens || 0,
        completion: data.usage?.completion_tokens || 0,
        total: data.usage?.total_tokens || 0,
      },
    };
  }

  /**
   * Call Ollama API (FREE, runs locally)
   * No API key needed - just run `ollama serve` locally
   */
  private async callOllama(prompt: string): Promise<{
    text: string;
    usage: { prompt: number; completion: number; total: number };
  }> {
    const baseUrl = this.config.baseUrl || 'http://localhost:11434';

    try {
      const response = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.config.model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: this.config.temperature,
            num_predict: this.config.maxTokens,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Ollama API failed: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return {
        text: data.response || '',
        usage: {
          prompt: data.prompt_eval_count || 0,
          completion: data.eval_count || 0,
          total: (data.prompt_eval_count || 0) + (data.eval_count || 0),
        },
      };
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          'Cannot connect to Ollama. Make sure Ollama is running:\n' +
          '  1. Install Ollama: https://ollama.ai\n' +
          '  2. Run: ollama serve\n' +
          '  3. Pull a model: ollama pull llama3.1'
        );
      }
      throw error;
    }
  }

  /**
   * Call Google Gemini API (FREE tier available)
   */
  private async callGoogle(prompt: string): Promise<{
    text: string;
    usage: { prompt: number; completion: number; total: number };
  }> {
    if (!this.config.apiKey) {
      throw new Error('API key required. Set GOOGLE_API_KEY environment variable.');
    }

    const response = await fetch(
      `${this.config.baseUrl}/v1beta/models/${this.config.model}:generateContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: this.config.temperature,
            maxOutputTokens: this.config.maxTokens,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Google API failed: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return {
      text,
      usage: {
        prompt: data.usageMetadata?.promptTokenCount || 0,
        completion: data.usageMetadata?.candidatesTokenCount || 0,
        total: data.usageMetadata?.totalTokenCount || 0,
      },
    };
  }

  /**
   * Parse JSON response from AI
   */
  private parseJSONResponse<T>(text: string): T {
    // Extract JSON from response (may have markdown code blocks)
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) ||
                      text.match(/```\n?([\s\S]*?)\n?```/) ||
                      [null, text];

    const jsonStr = jsonMatch[1] || text;

    try {
      return JSON.parse(jsonStr.trim());
    } catch {
      throw new Error(`Failed to parse JSON response: ${jsonStr.substring(0, 200)}...`);
    }
  }

  /**
   * Extract citations from generated content
   */
  private extractCitations(content: Record<string, unknown>): CitationDraft[] {
    const citations: CitationDraft[] = [];
    const citationMap = (content as { citacoesInline?: Record<string, string> }).citacoesInline || {};

    for (const [key, text] of Object.entries(citationMap)) {
      const pmidMatch = text.match(/PMID:\s*(\d+)/i);
      const doiMatch = text.match(/doi:\s*(10\.\d+\/[^\s]+)/i);

      citations.push({
        text,
        pmid: pmidMatch?.[1],
        doi: doiMatch?.[1],
        verified: false,
        source: 'manual',
      });
    }

    return citations;
  }

  /**
   * Analyze content for review flags
   */
  private analyzeForReview(
    content: Record<string, unknown>,
    citations: CitationDraft[]
  ): ReviewFlag[] {
    const flags: ReviewFlag[] = [];

    // Check for missing required fields
    const requiredFields = ['titulo', 'definicao', 'cid10', 'tratamento'];
    for (const field of requiredFields) {
      if (!content[field]) {
        flags.push({
          field,
          reason: 'low_confidence',
          severity: 'critical',
          suggestion: `Field '${field}' is missing and required`,
        });
      }
    }

    // Check for unverified citations
    const unverifiedCount = citations.filter(c => !c.verified).length;
    if (unverifiedCount > 0) {
      flags.push({
        field: 'citations',
        reason: 'missing_citation',
        severity: 'warning',
        suggestion: `${unverifiedCount} citations need verification against PubMed/DOI`,
      });
    }

    // Check for red flags section
    const quadroClinico = content.quadroClinico as { redFlags?: string[] } | undefined;
    if (!quadroClinico?.redFlags || quadroClinico.redFlags.length === 0) {
      flags.push({
        field: 'quadroClinico.redFlags',
        reason: 'needs_expert',
        severity: 'warning',
        suggestion: 'Red flags section should be reviewed by specialist',
      });
    }

    return flags;
  }

  /**
   * Calculate confidence score based on content quality
   */
  private calculateConfidence(
    content: Record<string, unknown>,
    citations: CitationDraft[],
    flags: ReviewFlag[]
  ): number {
    let score = 100;

    // Deduct for missing fields
    const criticalFlags = flags.filter(f => f.severity === 'critical').length;
    const warningFlags = flags.filter(f => f.severity === 'warning').length;

    score -= criticalFlags * 20;
    score -= warningFlags * 5;

    // Deduct for unverified citations
    const verifiedRatio = citations.length > 0
      ? citations.filter(c => c.verified).length / citations.length
      : 0;
    score -= Math.round((1 - verifiedRatio) * 15);

    // Bonus for complete ontology mapping
    if (content.doid && content.snomedCT && content.meshId) {
      score += 5;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate ID from name
   */
  private generateId(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

// =============================================================================
// BATCH GENERATION
// =============================================================================

export interface BatchGenerationResult {
  successful: ContentDraft<Doenca | Medicamento>[];
  failed: Array<{ name: string; error: string }>;
  stats: {
    total: number;
    successful: number;
    failed: number;
    averageConfidence: number;
    totalTokens: number;
    totalDurationMs: number;
  };
}

/**
 * Generate multiple content entries in batch
 */
export async function generateBatch(
  items: Array<{ name: string; type: 'disease' | 'medication' }>,
  config: AIContentConfig = {},
  options: {
    delayMs?: number;
    onProgress?: (current: number, total: number, item: string) => void;
  } = {}
): Promise<BatchGenerationResult> {
  const generator = new ContentGenerator(config);
  const delayMs = options.delayMs ?? 1000;

  const successful: ContentDraft<Doenca | Medicamento>[] = [];
  const failed: Array<{ name: string; error: string }> = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    options.onProgress?.(i + 1, items.length, item.name);

    try {
      const draft = item.type === 'disease'
        ? await generator.generateDisease(item.name)
        : await generator.generateMedication(item.name);

      successful.push(draft);
    } catch (error) {
      failed.push({
        name: item.name,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    // Rate limiting delay
    if (i < items.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  const stats = {
    total: items.length,
    successful: successful.length,
    failed: failed.length,
    averageConfidence: successful.length > 0
      ? Math.round(successful.reduce((sum, d) => sum + d.confidenceScore, 0) / successful.length)
      : 0,
    totalTokens: successful.reduce((sum, d) => sum + d.metadata.tokensUsed.total, 0),
    totalDurationMs: successful.reduce((sum, d) => sum + d.metadata.durationMs, 0),
  };

  return { successful, failed, stats };
}

// =============================================================================
// EXPORT UTILITIES
// =============================================================================

/**
 * Export draft to TypeScript code
 */
export function exportDraftToTS(draft: ContentDraft<Doenca | Medicamento>): string {
  const varName = draft.type === 'disease' ? 'doenca' : 'medicamento';
  const typeName = draft.type === 'disease' ? 'Doenca' : 'Medicamento';

  const contentJson = JSON.stringify(draft.content, null, 2);

  return `/**
 * Generated by Darwin-MFC AI Content Pipeline
 * Date: ${draft.metadata.generatedAt}
 * Model: ${draft.metadata.model}
 * Confidence: ${draft.confidenceScore}%
 * Status: ${draft.status}
 *
 * REVIEW FLAGS:
${draft.reviewFlags.map(f => ` * - [${f.severity.toUpperCase()}] ${f.field}: ${f.reason}`).join('\n')}
 */

import type { ${typeName} } from '@/lib/types/${draft.type === 'disease' ? 'doenca' : 'medicamento'}';

export const ${varName}: ${typeName} = ${contentJson};
`;
}

/**
 * Save draft to file
 */
export async function saveDraft(
  draft: ContentDraft<Doenca | Medicamento>,
  outputDir: string
): Promise<string> {
  const fs = await import('fs/promises');
  const path = await import('path');

  const filename = `${draft.content.id || draft.id}.ts`;
  const filepath = path.join(outputDir, filename);
  const content = exportDraftToTS(draft);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(filepath, content, 'utf-8');

  return filepath;
}
