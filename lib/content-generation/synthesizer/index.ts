/**
 * AI SYNTHESIZER
 * ==============
 *
 * Generates medical modules from aggregated data using llm-offload.
 * Supports multiple LLM providers with automatic fallback.
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFile, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import type { AggregatedData } from '../aggregator';

const execAsync = promisify(exec);

/**
 * Available LLM providers for offloading
 * - grok: Grok 4 Fast Reasoning (X.AI) - fast, reliable
 * - minimax: MiniMax API - good quality, reliable
 * - groq: Groq (Llama 3) - very fast inference
 * - openrouter: OpenRouter API - access to many models
 * - local: Local Ollama/LM Studio - free, private
 */
export type LLMProvider = 'grok' | 'minimax' | 'groq' | 'openrouter' | 'local';

/**
 * Provider fallback order (used when primary fails)
 */
const PROVIDER_FALLBACK_ORDER: LLMProvider[] = ['grok', 'minimax', 'groq', 'openrouter', 'local'];

/**
 * Synthesizer configuration
 */
export interface SynthesizerConfig {
  provider: LLMProvider;
  fallbackProviders?: LLMProvider[];
  maxTokens: number;
  temperature: number;
  enableFallback?: boolean;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: SynthesizerConfig = {
  provider: 'grok', // Primary: Grok 4 Fast Reasoning
  fallbackProviders: ['minimax'], // Fallback: MiniMax
  maxTokens: 4000,
  temperature: 0.3, // Low temperature for factual content
  enableFallback: true,
};

/**
 * AI Synthesizer
 */
export class AISynthesizer {
  private config: SynthesizerConfig;

  constructor(config: Partial<SynthesizerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Generate module from aggregated data
   */
  async generateModule(data: AggregatedData): Promise<string> {
    console.log(`\n🤖 Generating module for: ${data.topic}\n`);

    // Load prompt template
    const templatePath = join(process.cwd(), 'lib/content-generation/prompts/module-generation.txt');
    const template = await readFile(templatePath, 'utf-8');

    // Prepare input data
    const prompt = this.preparePrompt(template, data);

    // Call llm-offload
    const result = await this.callLLM(prompt);

    return result;
  }

  /**
   * Prepare prompt with data
   */
  private preparePrompt(template: string, data: AggregatedData): string {
    // Format articles
    const articlesText = data.articles.slice(0, 10).map((article, index) => {
      return `[${index + 1}] ${article.title}
  Authors: ${article.authors.slice(0, 3).join(', ')}${article.authors.length > 3 ? ' et al.' : ''}
  Journal: ${article.journal}, ${article.publicationDate.getFullYear()}
  PMID: ${article.pmid}${article.doi ? `, DOI: ${article.doi}` : ''}
  Study Type: ${article.studyType || 'N/A'}
  Abstract: ${article.abstract.substring(0, 300)}...`;
    }).join('\n\n');

    // Format medical societies guidelines
    const societiesText = data.guidelines
      .filter(g => g.source.includes('Medical Societies'))
      .map((guideline, index) => {
        return `[${index + 1}] ${guideline.title}
  Organization: ${guideline.organization}
  Year: ${guideline.publicationDate.getFullYear()}
  URL: ${guideline.url}`;
      }).join('\n\n');

    // Format Brazil guidelines
    const brazilText = data.guidelines
      .filter(g => g.source.includes('Brazil'))
      .map((guideline, index) => {
        return `[${index + 1}] ${guideline.title}
  Organization: ${guideline.organization}
  Year: ${guideline.publicationDate.getFullYear()}
  URL: ${guideline.url}`;
      }).join('\n\n');

    // Format ontology codes
    const ontologyText = `
ICD-11: ${data.ontologyCodes.icd11.slice(0, 5).join(', ')}
SNOMED-CT: ${data.ontologyCodes.snomedCT.slice(0, 5).join(', ')}
LOINC: ${data.ontologyCodes.loinc.slice(0, 5).join(', ')}
CIAP-2: ${data.ontologyCodes.ciap2.slice(0, 5).join(', ')}
ATC: ${data.ontologyCodes.atc.slice(0, 5).join(', ')}`;

    // Replace placeholders
    let prompt = template
      .replace('{{TOPIC}}', data.topic)
      .replace('{{TOPIC_ID}}', data.topic.toLowerCase().replace(/\s+/g, '-'))
      .replace('{{ARTICLES}}', articlesText)
      .replace('{{MEDICAL_SOCIETIES_GUIDELINES}}', societiesText)
      .replace('{{BRAZIL_GUIDELINES}}', brazilText)
      .replace('{{ONTOLOGY_CODES}}', ontologyText);

    return prompt;
  }

  /**
   * Call llm-offload CLI with fallback support
   */
  private async callLLM(prompt: string): Promise<string> {
    // Build provider chain: primary + fallbacks
    const providers: LLMProvider[] = [this.config.provider];
    if (this.config.enableFallback && this.config.fallbackProviders) {
      providers.push(...this.config.fallbackProviders.filter(p => p !== this.config.provider));
    }

    // Write prompt to temp file to avoid stdin issues
    const tempFile = `/tmp/llm-prompt-${Date.now()}.txt`;
    await writeFile(tempFile, prompt);

    let lastError: Error | null = null;

    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i];
      const isRetry = i > 0;

      if (isRetry) {
        console.log(`🔄 Fallback ${i}/${providers.length - 1}: Trying ${provider}...`);
      }

      try {
        const result = await this.callProvider(tempFile, provider, prompt.length);

        // Cleanup temp file on success
        try {
          await unlink(tempFile);
        } catch (e) {
          // Ignore cleanup errors
        }

        return result;
      } catch (error: any) {
        lastError = error;
        console.error(`❌ ${provider} failed: ${error.message}`);

        // If this was the last provider, don't continue
        if (i === providers.length - 1) {
          break;
        }

        // Brief delay before trying next provider
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    // Cleanup temp file on final failure
    try {
      await unlink(tempFile);
    } catch (e) {
      // Ignore cleanup errors
    }

    throw lastError || new Error('All LLM providers failed');
  }

  /**
   * Call a specific provider
   */
  private async callProvider(tempFile: string, provider: LLMProvider, promptLength: number): Promise<string> {
    const command = `cat "${tempFile}" | llm-offload --provider ${provider} --max-tokens ${this.config.maxTokens} --temperature ${this.config.temperature} --no-stream`;

    console.log(`🔧 Calling LLM with ${provider} (${promptLength} chars)...`);

    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      timeout: 180000, // 3 minute timeout
      shell: '/bin/bash',
    });

    if (stderr && !stderr.includes('✅')) {
      console.warn('⚠️  LLM stderr:', stderr);
    }

    console.log(`✅ ${provider} response received (${stdout.length} chars)`);
    return stdout.trim();
  }
}

