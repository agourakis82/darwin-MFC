/**
 * TRANSLATE MODULES TO MULTIPLE LANGUAGES
 * ========================================
 * 
 * Translates extracted strings from Portuguese to 8 target languages.
 * Uses llm-offload with fallback providers.
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Target languages (excluding pt which is source)
const TARGET_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese' },
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

interface TranslatedModule {
  moduleId: string;
  moduleName: string;
  locale: string;
  translations: Record<string, string>;
}

/**
 * Create translation prompt for a module
 */
function createTranslationPrompt(module: ModuleTranslations, targetLang: string, targetLangName: string): string {
  const fieldsText = module.fields.map(f => 
    `${f.key}:\n${f.value}\n(Context: ${f.context})`
  ).join('\n\n---\n\n');

  return `You are a professional medical translator. Translate the following medical screening module from Portuguese to ${targetLangName}.

IMPORTANT INSTRUCTIONS:
1. Maintain medical accuracy and terminology
2. Preserve all medical abbreviations (e.g., SUS, WHO, ADA, etc.)
3. Keep the same formal, academic tone
4. Do NOT translate organization names (e.g., "Ministério da Saúde" → keep as is or use official English name)
5. Preserve numerical data exactly as is
6. Return ONLY a JSON object with translations, no explanations

Module: ${module.moduleName}
Target Language: ${targetLangName} (${targetLang})

Fields to translate:

${fieldsText}

Return format (JSON only):
{
  "titulo": "translated title",
  "descricao": "translated description",
  "sus.indicacao": "translated SUS indication",
  "sus.populacaoAlvo": "translated target population",
  "sus.periodicidade": "translated frequency",
  "sociedadesMedicas.indicacao": "translated societies indication",
  "epidemiologia.prevalencia": "translated prevalence",
  "epidemiologia.incidencia": "translated incidence",
  "epidemiologia.mortalidade": "translated mortality"
}`;
}

/**
 * Call LLM for translation
 */
async function translateWithLLM(prompt: string, provider: string = 'local'): Promise<string> {
  const tempFile = `/tmp/translate-prompt-${Date.now()}.txt`;
  await writeFile(tempFile, prompt);

  const command = `cat "${tempFile}" | llm-offload --provider ${provider} --max-tokens 2000 --temperature 0.1 --no-stream`;

  try {
    const { stdout } = await execAsync(command, {
      maxBuffer: 5 * 1024 * 1024,
      timeout: 60000,
      shell: '/bin/bash',
    });

    // Cleanup
    await execAsync(`rm -f "${tempFile}"`);

    return stdout.trim();
  } catch (error) {
    // Cleanup on error
    await execAsync(`rm -f "${tempFile}"`).catch(() => {});
    throw error;
  }
}

/**
 * Parse LLM response to extract JSON
 */
function parseTranslationResponse(response: string): Record<string, string> {
  // Try to extract JSON from response
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error}`);
  }
}

/**
 * Translate a single module to a target language
 */
async function translateModule(
  module: ModuleTranslations,
  targetLang: string,
  targetLangName: string,
  provider: string
): Promise<TranslatedModule> {
  console.log(`  🌍 Translating to ${targetLangName}...`);

  const prompt = createTranslationPrompt(module, targetLang, targetLangName);
  const response = await translateWithLLM(prompt, provider);
  const translations = parseTranslationResponse(response);

  return {
    moduleId: module.moduleId,
    moduleName: module.moduleName,
    locale: targetLang,
    translations,
  };
}

/**
 * Main translation workflow
 */
async function translateAllModules() {
  console.log('🌍 MULTILINGUAL TRANSLATION WORKFLOW');
  console.log('='.repeat(80));

  // Load extracted strings
  const extractedPath = 'lib/content-generation/output/translations/extracted-strings.json';
  const extractedData = await readFile(extractedPath, 'utf-8');
  const modules: ModuleTranslations[] = JSON.parse(extractedData);

  console.log(`\nLoaded ${modules.length} modules`);
  console.log(`Target languages: ${TARGET_LANGUAGES.length}\n`);

  // For now, translate just the first module as a test
  const testModule = modules[0];
  console.log(`\n📝 Testing with module: ${testModule.moduleName}\n`);

  const provider = 'local'; // Use local model to avoid API issues

  const results: TranslatedModule[] = [];

  for (const lang of TARGET_LANGUAGES) {
    try {
      const translated = await translateModule(testModule, lang.code, lang.name, provider);
      results.push(translated);
      console.log(`     ✅ ${lang.name} complete`);
    } catch (error) {
      console.error(`     ❌ ${lang.name} failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Save results
  await mkdir('lib/content-generation/output/translations', { recursive: true });
  await writeFile(
    'lib/content-generation/output/translations/test-translations.json',
    JSON.stringify(results, null, 2)
  );

  console.log(`\n💾 Saved to: lib/content-generation/output/translations/test-translations.json`);
  console.log(`\n✅ Test translation complete!\n`);
}

// Run
translateAllModules().catch(console.error);

