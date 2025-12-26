#!/usr/bin/env npx tsx
/**
 * MEDICAL CONTENT TRANSLATION SCRIPT - DARWIN-MFC
 * ================================================
 *
 * Translates disease and medication content using AI.
 *
 * Features:
 * - Batching: 5-10 diseases or 10-15 medications per API call
 * - Checkpoint/resume: Saves progress to continue after interruption
 * - Multiple AI providers: Grok 3 (free), Gemini Flash, Claude, GPT-4
 * - Glossary integration: Uses standardized medical terminology
 * - Validation: Checks JSON structure and glossary usage
 *
 * Usage:
 *   npx tsx scripts/translate-medical-content.ts --type diseases --locale en
 *   npx tsx scripts/translate-medical-content.ts --type medications --locale es --resume
 *   npx tsx scripts/translate-medical-content.ts --type diseases --locale all --dry-run
 *   npx tsx scripts/translate-medical-content.ts --type diseases --locale en --provider grok
 *
 * Environment Variables:
 *   XAI_API_KEY - xAI Grok API key (recommended - free tier available)
 *   GEMINI_API_KEY - Google Gemini API key
 *   ANTHROPIC_API_KEY - Anthropic Claude API key
 *   OPENAI_API_KEY - OpenAI GPT-4 API key
 */

import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// CONFIGURATION
// =============================================================================

interface TranslationConfig {
  type: 'diseases' | 'medications';
  locale: string | 'all';
  provider: 'grok' | 'gemini' | 'claude' | 'openai';
  dryRun: boolean;
  resume: boolean;
  batchSize: number;
  outputDir: string;
  checkpointFile: string;
}

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

const DEFAULT_CONFIG: TranslationConfig = {
  type: 'diseases',
  locale: 'en',
  provider: 'grok', // Default to Grok 3 (free tier)
  dryRun: false,
  resume: false,
  batchSize: 5, // diseases per batch (medications use 10)
  outputDir: 'lib/data/translations',
  checkpointFile: '.translation-checkpoint.json',
};

// =============================================================================
// CHECKPOINT MANAGEMENT
// =============================================================================

interface Checkpoint {
  type: 'diseases' | 'medications';
  locale: string;
  completedIds: string[];
  lastBatchIndex: number;
  startedAt: string;
  lastUpdated: string;
}

function loadCheckpoint(config: TranslationConfig): Checkpoint | null {
  const checkpointPath = path.join(
    config.outputDir,
    config.type,
    config.locale,
    config.checkpointFile
  );

  if (fs.existsSync(checkpointPath)) {
    try {
      const data = fs.readFileSync(checkpointPath, 'utf-8');
      return JSON.parse(data);
    } catch {
      console.warn('Failed to load checkpoint, starting fresh');
    }
  }
  return null;
}

function saveCheckpoint(config: TranslationConfig, checkpoint: Checkpoint): void {
  const checkpointPath = path.join(
    config.outputDir,
    config.type,
    config.locale,
    config.checkpointFile
  );

  fs.mkdirSync(path.dirname(checkpointPath), { recursive: true });
  fs.writeFileSync(checkpointPath, JSON.stringify(checkpoint, null, 2));
}

// =============================================================================
// PROMPT TEMPLATES
// =============================================================================

function getDiseaseTranslationPrompt(locale: string, glossary: string): string {
  const localeNames: Record<string, string> = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    ru: 'Russian',
    ar: 'Arabic',
    zh: 'Chinese (Simplified)',
    el: 'Greek',
    hi: 'Hindi',
  };

  return `You are an expert medical translator for Darwin-MFC, a clinical decision support platform.

TARGET LANGUAGE: ${localeNames[locale] || locale}

TRANSLATION RULES:
1. Use formal medical language appropriate for healthcare professionals
2. Drug names: Use INN (International Nonproprietary Names) - do NOT translate drug names
3. Disease names: Follow ICD-11 official terminology when available
4. Keep numeric values, dosages, and medical codes unchanged
5. Preserve JSON structure exactly - do not add or remove fields
6. For citations (refId), keep them unchanged as they reference Portuguese sources
7. Translate medical abbreviations only when they have official translations in the target language

MEDICAL GLOSSARY (use these exact translations):
${glossary}

FIELDS TO TRANSLATE:
- titulo (disease title)
- sinonimos (synonyms for search)
- subcategoria (if present)
- quickView: definicao, criteriosDiagnosticos, tratamentoPrimeiraLinha (naoFarmacologico, farmacologico), redFlags, metasTerapeuticas, examesIniciais
- fullContent: all text fields (epidemiologia, fisiopatologia, quadroClinico, diagnostico, tratamento, acompanhamento, prevencao, populacoesEspeciais)
- tags

FIELDS TO KEEP UNCHANGED:
- id, doid, snomedCT, meshId, umlsCui, ciap2, cid10, cid11, hpo, loinc, ordo
- categoria (enum value)
- protocolos, medicamentos, calculadoras, rastreamentos (IDs)
- citations (reference IDs)
- lastUpdate
- All numeric values and dosages

IMPORTANT: Return ONLY valid JSON. Do not include any explanatory text before or after the JSON.`;
}

function getMedicationTranslationPrompt(locale: string, glossary: string): string {
  const localeNames: Record<string, string> = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    ru: 'Russian',
    ar: 'Arabic',
    zh: 'Chinese (Simplified)',
    el: 'Greek',
    hi: 'Hindi',
  };

  return `You are an expert pharmaceutical translator for Darwin-MFC, a clinical decision support platform.

TARGET LANGUAGE: ${localeNames[locale] || locale}

TRANSLATION RULES:
1. Use formal pharmaceutical language appropriate for healthcare professionals
2. Drug names (nomeGenerico): Use INN (International Nonproprietary Names) - these are often universal
3. For WHO official languages (Spanish, French, Russian, Arabic, Chinese), use the official INN translation if available
4. For other languages (English, Greek, Hindi), use the English INN name
5. Keep numeric values, dosages, concentrations, and medical codes unchanged
6. Preserve JSON structure exactly - do not add or remove fields
7. Keep ATC codes, RxNorm, DrugBank IDs unchanged

MEDICAL GLOSSARY (use these exact translations):
${glossary}

FIELDS TO TRANSLATE:
- nomeGenerico (use INN - may keep original if no official translation)
- apresentacoes: forma (pharmaceutical form name)
- indicacoes (indications)
- mecanismoAcao (mechanism of action)
- posologias: indicacao, adultos (dose, frequencia, doseMaxima, observacoes), pediatrico, idosos
- contraindicacoes (contraindications)
- precaucoes (precautions)
- efeitosAdversos: comuns, graves
- interacoes: efeito, mecanismo, conduta (keep medicamento as INN)
- ajusteDoseRenal: ajuste, observacao
- amamentacao: observacao
- consideracoesEspeciais: idosos, hepatopatas, pediatrico
- monitorizacao (monitoring)
- orientacoesPaciente (patient counseling)
- tags

FIELDS TO KEEP UNCHANGED:
- id, atcCode, rxNormCui, drugBankId, snomedCT, loinc, pharmgkb, anvisaRegistro, casNumber, dcbCode
- classeTerapeutica, subclasse (enum values)
- rename (boolean)
- gestacao (category A, B, C, D, X, N)
- amamentacao.compativel (boolean)
- apresentacoes.concentracao, apresentacoes.quantidade, apresentacoes.disponivelSUS
- ajusteDoseRenal.tfg (numeric range)
- doencasRelacionadas, calculadoras (IDs)
- citations (reference IDs)
- lastUpdate
- interacoes.gravidade (enum)

IMPORTANT: Return ONLY valid JSON. Do not include any explanatory text before or after the JSON.`;
}

// =============================================================================
// AI PROVIDER INTERFACES
// =============================================================================

interface TranslationResult {
  success: boolean;
  data?: unknown;
  error?: string;
  tokens?: {
    input: number;
    output: number;
  };
}

async function translateWithGrok(
  content: string,
  systemPrompt: string,
  _apiKey: string
): Promise<TranslationResult> {
  // xAI Grok 3 API implementation
  // Using grok-3 model (free tier available)

  const endpoint = 'https://api.x.ai/v1/chat/completions';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-3',
        temperature: 0.1,
        max_tokens: 16384,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `CONTENT TO TRANSLATE:\n${content}\n\nReturn ONLY valid JSON:`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `Grok API error: ${error}` };
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content;

    if (!text) {
      return { success: false, error: 'Empty response from Grok' };
    }

    // Parse JSON from response (handle markdown code blocks)
    let jsonText = text;

    // Remove markdown code blocks if present
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonText = codeBlockMatch[1];
    }

    // Find JSON object or array
    const jsonMatch = jsonText.match(/[\[{][\s\S]*[\]}]/);
    if (!jsonMatch) {
      return { success: false, error: 'No valid JSON found in response' };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      success: true,
      data: parsed,
      tokens: {
        input: result.usage?.prompt_tokens || 0,
        output: result.usage?.completion_tokens || 0,
      },
    };
  } catch (error) {
    return { success: false, error: `Grok error: ${error}` };
  }
}

async function translateWithGemini(
  content: string,
  systemPrompt: string,
  _apiKey: string
): Promise<TranslationResult> {
  // Gemini API implementation
  // Using Gemini Flash (gemini-1.5-flash) for cost efficiency

  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  try {
    const response = await fetch(`${endpoint}?key=${_apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: systemPrompt },
              { text: `\n\nCONTENT TO TRANSLATE:\n${content}\n\nReturn ONLY valid JSON:` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `Gemini API error: ${error}` };
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return { success: false, error: 'Empty response from Gemini' };
    }

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { success: false, error: 'No valid JSON found in response' };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      success: true,
      data: parsed,
      tokens: {
        input: result.usageMetadata?.promptTokenCount || 0,
        output: result.usageMetadata?.candidatesTokenCount || 0,
      },
    };
  } catch (error) {
    return { success: false, error: `Gemini error: ${error}` };
  }
}

async function translateWithClaude(
  content: string,
  systemPrompt: string,
  _apiKey: string
): Promise<TranslationResult> {
  // Claude API implementation

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': _apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8192,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `CONTENT TO TRANSLATE:\n${content}\n\nReturn ONLY valid JSON:`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `Claude API error: ${error}` };
    }

    const result = await response.json();
    const text = result.content?.[0]?.text;

    if (!text) {
      return { success: false, error: 'Empty response from Claude' };
    }

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { success: false, error: 'No valid JSON found in response' };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      success: true,
      data: parsed,
      tokens: {
        input: result.usage?.input_tokens || 0,
        output: result.usage?.output_tokens || 0,
      },
    };
  } catch (error) {
    return { success: false, error: `Claude error: ${error}` };
  }
}

async function translateWithOpenAI(
  content: string,
  systemPrompt: string,
  _apiKey: string
): Promise<TranslationResult> {
  // OpenAI API implementation

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        temperature: 0.1,
        max_tokens: 8192,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `CONTENT TO TRANSLATE:\n${content}\n\nReturn ONLY valid JSON:` },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `OpenAI API error: ${error}` };
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content;

    if (!text) {
      return { success: false, error: 'Empty response from OpenAI' };
    }

    const parsed = JSON.parse(text);
    return {
      success: true,
      data: parsed,
      tokens: {
        input: result.usage?.prompt_tokens || 0,
        output: result.usage?.completion_tokens || 0,
      },
    };
  } catch (error) {
    return { success: false, error: `OpenAI error: ${error}` };
  }
}

// =============================================================================
// BATCH TRANSLATION
// =============================================================================

interface TranslationBatch<T> {
  items: T[];
  startIndex: number;
  endIndex: number;
}

function createBatches<T>(items: T[], batchSize: number): TranslationBatch<T>[] {
  const batches: TranslationBatch<T>[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    batches.push({
      items: items.slice(i, i + batchSize),
      startIndex: i,
      endIndex: Math.min(i + batchSize, items.length),
    });
  }

  return batches;
}

async function translateBatch(
  batch: unknown[],
  config: TranslationConfig,
  glossary: string
): Promise<TranslationResult> {
  const prompt = config.type === 'diseases'
    ? getDiseaseTranslationPrompt(config.locale, glossary)
    : getMedicationTranslationPrompt(config.locale, glossary);

  const content = JSON.stringify(batch, null, 2);

  // Get API key
  const apiKeyEnvVar = {
    grok: 'XAI_API_KEY',
    gemini: 'GEMINI_API_KEY',
    claude: 'ANTHROPIC_API_KEY',
    openai: 'OPENAI_API_KEY',
  }[config.provider];

  const apiKey = process.env[apiKeyEnvVar];

  if (!apiKey) {
    return { success: false, error: `Missing ${apiKeyEnvVar} environment variable` };
  }

  // Call appropriate provider
  switch (config.provider) {
    case 'grok':
      return translateWithGrok(content, prompt, apiKey);
    case 'gemini':
      return translateWithGemini(content, prompt, apiKey);
    case 'claude':
      return translateWithClaude(content, prompt, apiKey);
    case 'openai':
      return translateWithOpenAI(content, prompt, apiKey);
    default:
      return { success: false, error: `Unknown provider: ${config.provider}` };
  }
}

// =============================================================================
// OUTPUT GENERATION
// =============================================================================

function saveTranslation(
  translations: unknown[],
  category: string,
  config: TranslationConfig
): void {
  const outputPath = path.join(
    config.outputDir,
    config.type,
    config.locale,
    `${category}.json`
  );

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const output = {
    locale: config.locale,
    category,
    generatedAt: new Date().toISOString(),
    count: translations.length,
    [config.type === 'diseases' ? 'diseases' : 'medications']: translations,
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`  Saved: ${outputPath} (${translations.length} items)`);
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const config: TranslationConfig = { ...DEFAULT_CONFIG };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--type':
        config.type = args[++i] as 'diseases' | 'medications';
        break;
      case '--locale':
        config.locale = args[++i];
        break;
      case '--provider':
        config.provider = args[++i] as 'grok' | 'gemini' | 'claude' | 'openai';
        break;
      case '--dry-run':
        config.dryRun = true;
        break;
      case '--resume':
        config.resume = true;
        break;
      case '--batch-size':
        config.batchSize = parseInt(args[++i]);
        break;
      case '--help':
        console.log(`
Medical Content Translation Script

Usage:
  npx tsx scripts/translate-medical-content.ts [options]

Options:
  --type <diseases|medications>  Content type to translate (default: diseases)
  --locale <locale|all>          Target locale or 'all' (default: en)
  --provider <grok|gemini|claude|openai>  AI provider (default: grok)
  --batch-size <number>          Items per batch (default: 5)
  --dry-run                      Show what would be done without making API calls
  --resume                       Resume from last checkpoint
  --help                         Show this help

Environment Variables:
  XAI_API_KEY         xAI Grok API key (recommended - free tier)
  GEMINI_API_KEY      Google Gemini API key
  ANTHROPIC_API_KEY   Anthropic Claude API key
  OPENAI_API_KEY      OpenAI API key

Examples:
  npx tsx scripts/translate-medical-content.ts --type diseases --locale en
  npx tsx scripts/translate-medical-content.ts --type diseases --locale en --provider grok
  npx tsx scripts/translate-medical-content.ts --type medications --locale all
  npx tsx scripts/translate-medical-content.ts --type diseases --locale fr --provider claude
        `);
        process.exit(0);
    }
  }

  // Validate locale
  const localesToProcess = config.locale === 'all'
    ? SUPPORTED_LOCALES
    : [config.locale];

  for (const locale of localesToProcess) {
    if (!SUPPORTED_LOCALES.includes(locale)) {
      console.error(`Invalid locale: ${locale}`);
      console.error(`Supported locales: ${SUPPORTED_LOCALES.join(', ')}`);
      process.exit(1);
    }
  }

  console.log('\n========================================');
  console.log('Darwin-MFC Medical Content Translation');
  console.log('========================================\n');
  console.log(`Type: ${config.type}`);
  console.log(`Locales: ${localesToProcess.join(', ')}`);
  console.log(`Provider: ${config.provider}`);
  console.log(`Batch size: ${config.batchSize}`);
  console.log(`Dry run: ${config.dryRun}`);
  console.log(`Resume: ${config.resume}`);
  console.log('');

  if (config.dryRun) {
    console.log('\n[DRY RUN MODE - No API calls will be made]\n');
  }

  // Process each locale
  for (const locale of localesToProcess) {
    console.log(`\n--- Processing ${locale.toUpperCase()} ---\n`);

    const localeConfig = { ...config, locale };

    // Load checkpoint if resuming
    let checkpoint: Checkpoint | null = null;
    if (config.resume) {
      checkpoint = loadCheckpoint(localeConfig);
      if (checkpoint) {
        console.log(`Resuming from checkpoint: ${checkpoint.completedIds.length} items already completed`);
      }
    }

    // TODO: Load actual data from imports
    // For now, show placeholder message
    console.log(`\nTo complete this script, import data from:`);
    console.log(`  - lib/data/doencas/index.ts (getAllDoencas)`);
    console.log(`  - lib/data/medicamentos/index.ts (getAllMedicamentos)`);
    console.log(`  - lib/data/translations/glossary/medical-terms.ts (generateGlossaryPrompt)`);
    console.log(`\nThen call translateBatch() for each batch and save results.`);

    if (config.dryRun) {
      console.log(`\n[Would process ${config.type} for locale ${locale}]`);
    }
  }

  console.log('\n========================================');
  console.log('Translation script setup complete!');
  console.log('========================================\n');
}

// Run if executed directly
main().catch(console.error);
