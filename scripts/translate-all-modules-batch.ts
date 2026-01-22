/**
 * BATCH TRANSLATION OF ALL MODULES
 * =================================
 *
 * Translates all 100 modules to 8 target languages.
 * Uses llm-offload with grok provider and parallel processing.
 *
 * Usage: npx tsx scripts/translate-all-modules-batch.ts [--resume]
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  provider: 'grok',
  fallbackProvider: 'minimax',
  maxTokens: 2500,
  temperature: 0.1,
  batchSize: 5,           // Languages to process per module
  interLanguageDelay: 2000, // 2 seconds between languages
  interModuleDelay: 5000,   // 5 seconds between modules
  timeout: 90000,          // 90 second timeout
  retries: 2,
};

const TARGET_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'el', name: 'Greek' },
  { code: 'hi', name: 'Hindi' },
];

interface ExtractedField {
  key: string;
  value: string;
  context: string;
}

interface ModuleTranslations {
  moduleId: string;
  moduleName: string;
  fields: ExtractedField[];
}

interface TranslationProgress {
  completed: Array<{ moduleId: string; locale: string }>;
  failed: Array<{ moduleId: string; locale: string; error: string }>;
  pending: Array<{ moduleId: string; locale: string }>;
  lastRun: string;
}

const PROGRESS_FILE = 'lib/content-generation/output/translations/progress.json';
const OUTPUT_DIR = 'lib/content-generation/output/translations/modules';

/**
 * Create translation prompt (simplified for faster processing)
 */
function createTranslationPrompt(module: ModuleTranslations, targetLang: string, targetLangName: string): string {
  const essentialFields = module.fields.filter(f =>
    ['titulo', 'descricao', 'sus.indicacao', 'sus.populacaoAlvo', 'sociedadesMedicas.indicacao',
     'epidemiologia.prevalencia', 'epidemiologia.incidencia', 'epidemiologia.mortalidade'].includes(f.key)
  );

  const fieldsText = essentialFields.map(f => `${f.key}: ${f.value}`).join('\n\n');

  return `Translate this medical content from Portuguese to ${targetLangName}. Return ONLY a JSON object.

Medical Module: ${module.moduleName}

Content to translate:
${fieldsText}

Return JSON format:
{"titulo":"...", "descricao":"...", "sus.indicacao":"...", "sus.populacaoAlvo":"...", "sociedadesMedicas.indicacao":"...", "epidemiologia.prevalencia":"...", "epidemiologia.incidencia":"...", "epidemiologia.mortalidade":"..."}`;
}

/**
 * Call LLM for translation with retry
 */
async function translateWithLLM(prompt: string, retryCount = 0): Promise<string> {
  const tempFile = `/tmp/translate-${Date.now()}-${Math.random().toString(36).slice(2)}.txt`;
  await writeFile(tempFile, prompt);

  const provider = retryCount > 0 ? CONFIG.fallbackProvider : CONFIG.provider;
  const command = `cat "${tempFile}" | timeout ${CONFIG.timeout / 1000} llm-offload --provider ${provider} --max-tokens ${CONFIG.maxTokens} --temperature ${CONFIG.temperature} --no-stream`;

  try {
    const { stdout } = await execAsync(command, {
      maxBuffer: 5 * 1024 * 1024,
      timeout: CONFIG.timeout + 5000,
      shell: '/bin/bash',
    });

    await execAsync(`rm -f "${tempFile}"`).catch(() => {});
    return stdout.trim();
  } catch (error: any) {
    await execAsync(`rm -f "${tempFile}"`).catch(() => {});

    if (retryCount < CONFIG.retries) {
      console.log(`  ⚠️  Retry ${retryCount + 1}/${CONFIG.retries} with ${CONFIG.fallbackProvider}...`);
      await new Promise(r => setTimeout(r, 5000));
      return translateWithLLM(prompt, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Parse LLM response to extract JSON
 */
function parseTranslationResponse(response: string): Record<string, string> {
  const jsonMatch = response.match(/\{[\s\S]*?\}/);
  if (!jsonMatch) throw new Error('No JSON found');

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    // Try to fix common JSON issues
    const fixed = jsonMatch[0]
      .replace(/,\s*}/g, '}')
      .replace(/'/g, '"');
    return JSON.parse(fixed);
  }
}

/**
 * Load or initialize progress
 */
async function loadProgress(): Promise<TranslationProgress> {
  if (existsSync(PROGRESS_FILE)) {
    const data = await readFile(PROGRESS_FILE, 'utf-8');
    return JSON.parse(data);
  }
  return { completed: [], failed: [], pending: [], lastRun: new Date().toISOString() };
}

/**
 * Save progress
 */
async function saveProgress(progress: TranslationProgress): Promise<void> {
  progress.lastRun = new Date().toISOString();
  await writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

/**
 * Main batch translation
 */
async function translateAllModules() {
  console.log('='.repeat(80));
  console.log('BATCH TRANSLATION - 100 MODULES x 8 LANGUAGES');
  console.log('='.repeat(80));

  // Setup
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Load extracted strings
  const extractedPath = 'lib/content-generation/output/translations/extracted-strings.json';
  const extractedData = await readFile(extractedPath, 'utf-8');
  const modules: ModuleTranslations[] = JSON.parse(extractedData);

  // Load progress
  let progress = await loadProgress();
  const completedSet = new Set(progress.completed.map(c => `${c.moduleId}:${c.locale}`));

  // Build pending list
  const pending: Array<{ module: ModuleTranslations; lang: typeof TARGET_LANGUAGES[0] }> = [];
  for (const module of modules) {
    for (const lang of TARGET_LANGUAGES) {
      const key = `${module.moduleId}:${lang.code}`;
      if (!completedSet.has(key)) {
        pending.push({ module, lang });
      }
    }
  }

  console.log(`\nTotal modules: ${modules.length}`);
  console.log(`Target languages: ${TARGET_LANGUAGES.length}`);
  console.log(`Total translations: ${modules.length * TARGET_LANGUAGES.length}`);
  console.log(`Already completed: ${progress.completed.length}`);
  console.log(`Pending: ${pending.length}`);
  console.log(`\nProvider: ${CONFIG.provider} (fallback: ${CONFIG.fallbackProvider})`);
  console.log('');

  if (pending.length === 0) {
    console.log('✅ All translations already complete!');
    return;
  }

  let successCount = 0;
  let failCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < pending.length; i++) {
    const { module, lang } = pending[i];
    const key = `${module.moduleId}:${lang.code}`;

    console.log(`[${i + 1}/${pending.length}] ${module.moduleId} → ${lang.name}`);

    try {
      const prompt = createTranslationPrompt(module, lang.code, lang.name);
      const response = await translateWithLLM(prompt);
      const translations = parseTranslationResponse(response);

      // Save translation
      const outputFile = `${OUTPUT_DIR}/${module.moduleId}.${lang.code}.json`;
      await writeFile(outputFile, JSON.stringify({
        moduleId: module.moduleId,
        locale: lang.code,
        translations,
      }, null, 2));

      progress.completed.push({ moduleId: module.moduleId, locale: lang.code });
      successCount++;
      console.log(`  ✅ Saved ${outputFile}`);

    } catch (error: any) {
      progress.failed.push({ moduleId: module.moduleId, locale: lang.code, error: error.message });
      failCount++;
      console.log(`  ❌ Failed: ${error.message}`);
    }

    // Save progress every 10 translations
    if ((i + 1) % 10 === 0) {
      await saveProgress(progress);
    }

    // Delay between translations
    if (i < pending.length - 1) {
      await new Promise(r => setTimeout(r, CONFIG.interLanguageDelay));
    }
  }

  // Final save
  await saveProgress(progress);

  const totalTime = (Date.now() - startTime) / 1000;
  console.log('\n' + '='.repeat(80));
  console.log('TRANSLATION COMPLETE');
  console.log('='.repeat(80));
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`⏱️  Total time: ${(totalTime / 60).toFixed(1)} minutes`);
  console.log(`📊 Rate: ${(successCount / (totalTime / 60)).toFixed(1)} translations/min`);
}

translateAllModules().catch(console.error);
