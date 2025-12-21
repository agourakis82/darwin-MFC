#!/usr/bin/env npx tsx
/**
 * TRANSLATION PIPELINE - DARWIN-MFC
 * ==================================
 *
 * Automated translation for medical content with terminology verification.
 * Supports all 9+ languages with medical terminology accuracy.
 *
 * Usage:
 *   npx tsx scripts/translate-content.ts --source pt --target en --file messages/pt/common.json
 *   npx tsx scripts/translate-content.ts --source pt --target all --dir messages
 *   npx tsx scripts/translate-content.ts --verify --lang es
 *
 * Part of Sprint 5: Automation-First Development
 */

import * as fs from 'fs/promises';
import * as path from 'path';

// =============================================================================
// CONFIGURATION
// =============================================================================

const SUPPORTED_LOCALES = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'] as const;
type Locale = typeof SUPPORTED_LOCALES[number];

const LOCALE_NAMES: Record<Locale, string> = {
  pt: 'Portuguese (Brazil)',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  ru: 'Russian',
  ar: 'Arabic',
  zh: 'Chinese (Simplified)',
  el: 'Greek',
  hi: 'Hindi',
};

// Medical terminology that should be preserved or specially translated
const MEDICAL_TERMS: Record<string, Record<Locale, string>> = {
  'SUS': {
    pt: 'SUS',
    en: 'SUS (Brazilian Public Health System)',
    es: 'SUS (Sistema Único de Salud de Brasil)',
    fr: 'SUS (Système Unique de Santé du Brésil)',
    ru: 'SUS (Единая система здравоохранения Бразилии)',
    ar: 'SUS (النظام الصحي العام البرازيلي)',
    zh: 'SUS（巴西统一卫生系统）',
    el: 'SUS (Ενιαίο Σύστημα Υγείας Βραζιλίας)',
    hi: 'SUS (ब्राजील की एकीकृत स्वास्थ्य प्रणाली)',
  },
  'USPSTF': {
    pt: 'USPSTF',
    en: 'USPSTF',
    es: 'USPSTF',
    fr: 'USPSTF',
    ru: 'USPSTF',
    ar: 'USPSTF',
    zh: 'USPSTF',
    el: 'USPSTF',
    hi: 'USPSTF',
  },
  // Add more medical terms as needed
};

// =============================================================================
// AI PROVIDER INTERFACE
// =============================================================================

type AIProvider = 'anthropic' | 'openai' | 'groq' | 'ollama' | 'google';

interface TranslationConfig {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
  temperature?: number;
}

const DEFAULT_MODELS: Record<AIProvider, string> = {
  anthropic: 'claude-3-5-sonnet-20241022',
  openai: 'gpt-4-turbo',
  groq: 'llama-3.1-70b-versatile',
  ollama: 'llama3.1',
  google: 'gemini-1.5-flash',
};

function getConfig(): TranslationConfig {
  // Auto-detect provider from environment
  if (process.env.ANTHROPIC_API_KEY) {
    return { provider: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY };
  }
  if (process.env.OPENAI_API_KEY) {
    return { provider: 'openai', apiKey: process.env.OPENAI_API_KEY };
  }
  if (process.env.GROQ_API_KEY) {
    return { provider: 'groq', apiKey: process.env.GROQ_API_KEY };
  }
  if (process.env.GOOGLE_API_KEY) {
    return { provider: 'google', apiKey: process.env.GOOGLE_API_KEY };
  }
  // Default to ollama (free, local)
  return { provider: 'ollama' };
}

// =============================================================================
// TRANSLATION ENGINE
// =============================================================================

const TRANSLATION_PROMPT = `You are a medical translator for Darwin-MFC, a clinical decision support platform.

TASK: Translate the following JSON content from {{sourceLanguage}} to {{targetLanguage}}.

CRITICAL RULES:
1. Preserve ALL JSON structure exactly - only translate string values
2. Keep all keys in their original form (do not translate keys)
3. Preserve placeholders like {name}, {count}, {{variable}} exactly as-is
4. Medical terminology must be accurate for healthcare professionals
5. Use formal medical language appropriate for clinical settings
6. Keep abbreviations like "SUS", "USPSTF", "WHO", "NHS" as-is (add translation in parentheses if first occurrence)
7. Drug names should use INN (International Nonproprietary Names)
8. Disease names should match ICD-10/11 terminology in target language
9. Keep HTML entities and special characters intact

SOURCE CONTENT ({{sourceLanguage}}):
\`\`\`json
{{content}}
\`\`\`

Return ONLY the translated JSON, no additional text or explanations.
The JSON must be valid and parseable.`;

interface TranslationResult {
  success: boolean;
  translated?: Record<string, unknown>;
  error?: string;
  tokensUsed?: number;
}

async function callAI(prompt: string, config: TranslationConfig): Promise<string> {
  const model = config.model || DEFAULT_MODELS[config.provider];

  switch (config.provider) {
    case 'anthropic':
      return callAnthropic(prompt, config.apiKey!, model);
    case 'openai':
    case 'groq':
      return callOpenAICompatible(prompt, config.apiKey!, model, config.provider);
    case 'ollama':
      return callOllama(prompt, model);
    case 'google':
      return callGoogle(prompt, config.apiKey!, model);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

async function callAnthropic(prompt: string, apiKey: string, model: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 8192,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0]?.text || '';
}

async function callOpenAICompatible(
  prompt: string,
  apiKey: string,
  model: string,
  provider: 'openai' | 'groq'
): Promise<string> {
  const baseUrl = provider === 'groq'
    ? 'https://api.groq.com/openai/v1'
    : 'https://api.openai.com/v1';

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 8192,
      temperature: 0.2,
      messages: [
        { role: 'system', content: 'You are a medical translator. Return only valid JSON.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`${provider} API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

async function callOllama(prompt: string, model: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: { temperature: 0.2, num_predict: 8192 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || '';
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'Cannot connect to Ollama. Run: ollama serve\n' +
        'Or set ANTHROPIC_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY'
      );
    }
    throw error;
  }
}

async function callGoogle(prompt: string, apiKey: string, model: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 8192 },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Google API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function parseJSONResponse(text: string): Record<string, unknown> {
  // Extract JSON from potential markdown code blocks
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) ||
                    text.match(/```\n?([\s\S]*?)\n?```/) ||
                    [null, text];

  const jsonStr = (jsonMatch[1] || text).trim();

  try {
    return JSON.parse(jsonStr);
  } catch {
    throw new Error(`Invalid JSON response: ${jsonStr.substring(0, 200)}...`);
  }
}

async function translateContent(
  content: Record<string, unknown>,
  sourceLocale: Locale,
  targetLocale: Locale,
  config: TranslationConfig
): Promise<TranslationResult> {
  const prompt = TRANSLATION_PROMPT
    .replace('{{sourceLanguage}}', LOCALE_NAMES[sourceLocale])
    .replace('{{targetLanguage}}', LOCALE_NAMES[targetLocale])
    .replace('{{content}}', JSON.stringify(content, null, 2));

  try {
    const response = await callAI(prompt, config);
    const translated = parseJSONResponse(response);

    return { success: true, translated };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// =============================================================================
// FILE OPERATIONS
// =============================================================================

async function readJSONFile(filepath: string): Promise<Record<string, unknown>> {
  const content = await fs.readFile(filepath, 'utf-8');
  return JSON.parse(content);
}

async function writeJSONFile(filepath: string, content: Record<string, unknown>): Promise<void> {
  await fs.mkdir(path.dirname(filepath), { recursive: true });
  await fs.writeFile(filepath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
}

async function getMessageFiles(messagesDir: string, locale: Locale): Promise<string[]> {
  const localeDir = path.join(messagesDir, locale);
  try {
    const files = await fs.readdir(localeDir);
    return files.filter(f => f.endsWith('.json')).map(f => path.join(localeDir, f));
  } catch {
    return [];
  }
}

// =============================================================================
// VERIFICATION
// =============================================================================

interface VerificationResult {
  file: string;
  missingKeys: string[];
  extraKeys: string[];
  emptyValues: string[];
  placeholderMismatches: string[];
}

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else if (typeof value === 'string') {
      result[newKey] = value;
    }
  }

  return result;
}

function extractPlaceholders(text: string): string[] {
  const matches = text.match(/\{[^}]+\}/g) || [];
  return matches.sort();
}

async function verifyTranslations(
  sourceLocale: Locale,
  targetLocale: Locale,
  messagesDir: string
): Promise<VerificationResult[]> {
  const results: VerificationResult[] = [];
  const sourceFiles = await getMessageFiles(messagesDir, sourceLocale);

  for (const sourceFile of sourceFiles) {
    const filename = path.basename(sourceFile);
    const targetFile = path.join(messagesDir, targetLocale, filename);

    try {
      const sourceContent = await readJSONFile(sourceFile);
      const targetContent = await readJSONFile(targetFile);

      const sourceFlat = flattenObject(sourceContent);
      const targetFlat = flattenObject(targetContent);

      const sourceKeys = new Set(Object.keys(sourceFlat));
      const targetKeys = new Set(Object.keys(targetFlat));

      const missingKeys = [...sourceKeys].filter(k => !targetKeys.has(k));
      const extraKeys = [...targetKeys].filter(k => !sourceKeys.has(k));
      const emptyValues = Object.entries(targetFlat)
        .filter(([, v]) => !v || v.trim() === '')
        .map(([k]) => k);

      const placeholderMismatches: string[] = [];
      for (const key of [...sourceKeys].filter(k => targetKeys.has(k))) {
        const sourcePlaceholders = extractPlaceholders(sourceFlat[key]);
        const targetPlaceholders = extractPlaceholders(targetFlat[key]);

        if (JSON.stringify(sourcePlaceholders) !== JSON.stringify(targetPlaceholders)) {
          placeholderMismatches.push(
            `${key}: expected ${JSON.stringify(sourcePlaceholders)}, got ${JSON.stringify(targetPlaceholders)}`
          );
        }
      }

      if (missingKeys.length || extraKeys.length || emptyValues.length || placeholderMismatches.length) {
        results.push({
          file: targetFile,
          missingKeys,
          extraKeys,
          emptyValues,
          placeholderMismatches,
        });
      }
    } catch (error) {
      results.push({
        file: targetFile,
        missingKeys: ['FILE_NOT_FOUND_OR_INVALID'],
        extraKeys: [],
        emptyValues: [],
        placeholderMismatches: [],
      });
    }
  }

  return results;
}

// =============================================================================
// CLI
// =============================================================================

function printUsage() {
  console.log(`
Darwin-MFC Translation Pipeline

Usage:
  npx tsx scripts/translate-content.ts [options]

Options:
  --source <locale>    Source locale (default: pt)
  --target <locale>    Target locale (or 'all')
  --file <path>        Translate single file
  --dir <path>         Translate all files in directory (default: messages)
  --verify             Verify translations against source
  --lang <locale>      Language to verify (with --verify)
  --help               Show this help

Examples:
  # Translate common.json from Portuguese to English
  npx tsx scripts/translate-content.ts --source pt --target en --file messages/pt/common.json

  # Translate all Portuguese files to all other languages
  npx tsx scripts/translate-content.ts --source pt --target all

  # Verify Spanish translations
  npx tsx scripts/translate-content.ts --verify --lang es

  # Verify all translations
  npx tsx scripts/translate-content.ts --verify

Supported locales: ${SUPPORTED_LOCALES.join(', ')}

Environment variables:
  ANTHROPIC_API_KEY    Use Claude for translation
  OPENAI_API_KEY       Use GPT-4 for translation
  GROQ_API_KEY         Use Groq (free tier) for translation
  GOOGLE_API_KEY       Use Gemini for translation
  (none)               Falls back to local Ollama
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const getArg = (flag: string): string | undefined => {
    const idx = args.indexOf(flag);
    return idx !== -1 ? args[idx + 1] : undefined;
  };

  const isVerify = args.includes('--verify');
  const sourceLocale = (getArg('--source') || 'pt') as Locale;
  const targetArg = getArg('--target');
  const filePath = getArg('--file');
  const dirPath = getArg('--dir') || 'messages';

  if (!SUPPORTED_LOCALES.includes(sourceLocale)) {
    console.error(`Invalid source locale: ${sourceLocale}`);
    process.exit(1);
  }

  // Verification mode
  if (isVerify) {
    const langArg = getArg('--lang');
    const localesToVerify = langArg
      ? [langArg as Locale]
      : SUPPORTED_LOCALES.filter(l => l !== sourceLocale);

    console.log(`\nVerifying translations against ${LOCALE_NAMES[sourceLocale]}...\n`);

    let totalIssues = 0;

    for (const locale of localesToVerify) {
      if (!SUPPORTED_LOCALES.includes(locale)) {
        console.error(`Invalid locale: ${locale}`);
        continue;
      }

      console.log(`\n=== ${LOCALE_NAMES[locale]} (${locale}) ===`);
      const results = await verifyTranslations(sourceLocale, locale, dirPath);

      if (results.length === 0) {
        console.log('  ✓ All translations verified');
      } else {
        for (const result of results) {
          console.log(`\n  ${path.basename(result.file)}:`);

          if (result.missingKeys.length) {
            console.log(`    ✗ Missing keys (${result.missingKeys.length}):`);
            result.missingKeys.slice(0, 5).forEach(k => console.log(`      - ${k}`));
            if (result.missingKeys.length > 5) {
              console.log(`      ... and ${result.missingKeys.length - 5} more`);
            }
            totalIssues += result.missingKeys.length;
          }

          if (result.emptyValues.length) {
            console.log(`    ✗ Empty values (${result.emptyValues.length}):`);
            result.emptyValues.slice(0, 5).forEach(k => console.log(`      - ${k}`));
            totalIssues += result.emptyValues.length;
          }

          if (result.placeholderMismatches.length) {
            console.log(`    ✗ Placeholder mismatches (${result.placeholderMismatches.length}):`);
            result.placeholderMismatches.slice(0, 3).forEach(m => console.log(`      - ${m}`));
            totalIssues += result.placeholderMismatches.length;
          }
        }
      }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`Total issues found: ${totalIssues}`);
    process.exit(totalIssues > 0 ? 1 : 0);
  }

  // Translation mode
  if (!targetArg) {
    console.error('--target is required for translation');
    printUsage();
    process.exit(1);
  }

  const config = getConfig();
  console.log(`\nUsing provider: ${config.provider}`);
  console.log(`Source: ${LOCALE_NAMES[sourceLocale]}`);

  const targetLocales = targetArg === 'all'
    ? SUPPORTED_LOCALES.filter(l => l !== sourceLocale)
    : [targetArg as Locale];

  for (const targetLocale of targetLocales) {
    if (!SUPPORTED_LOCALES.includes(targetLocale)) {
      console.error(`Invalid target locale: ${targetLocale}`);
      continue;
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`Translating to: ${LOCALE_NAMES[targetLocale]}`);

    const files = filePath
      ? [filePath]
      : await getMessageFiles(dirPath, sourceLocale);

    for (const sourceFile of files) {
      const filename = path.basename(sourceFile);
      const targetFile = path.join(dirPath, targetLocale, filename);

      console.log(`  ${filename}...`);

      try {
        const content = await readJSONFile(sourceFile);
        const result = await translateContent(content, sourceLocale, targetLocale, config);

        if (result.success && result.translated) {
          await writeJSONFile(targetFile, result.translated);
          console.log(`    ✓ Saved to ${targetFile}`);
        } else {
          console.log(`    ✗ Failed: ${result.error}`);
        }
      } catch (error) {
        console.log(`    ✗ Error: ${error instanceof Error ? error.message : error}`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\nTranslation complete!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
