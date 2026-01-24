/**
 * FLASHCARDS GENERATOR
 * ====================
 *
 * Generates flashcards from medical modules using LLM synthesis.
 *
 * Usage:
 *   npx tsx scripts/generate-flashcards.ts [options]
 *
 * Options:
 *   --module <id>    Generate for specific module (e.g., --module diabetes-mellitus-2)
 *   --all-modules    Generate for all 100 modules
 *   --provider <p>   LLM provider: grok, minimax, groq (default: grok)
 *   --dry-run        Show what would be generated without running
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { glob } from 'glob';

const execAsync = promisify(exec);

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  promptTemplate: 'lib/content-generation/prompts/flashcard.txt',
  modulesDir: 'lib/content-generation/output/modules',
  outputDir: 'lib/data/flashcards',
  provider: 'grok',
  maxTokens: 6000,
  temperature: 0.3,
  delayBetweenModules: 5000, // 5 seconds
  cardsPerModule: 25,
};

// Category mappings for organizing output
const CATEGORY_MAP: Record<string, string> = {
  'diabetes': 'endocrino',
  'hipotireoidismo': 'endocrino',
  'obesidade': 'endocrino',
  'hipertensao': 'cardiovascular',
  'insuficiencia-cardiaca': 'cardiovascular',
  'fibrilacao-atrial': 'cardiovascular',
  'angina': 'cardiovascular',
  'dislipidemia': 'cardiovascular',
  'asma': 'respiratorio',
  'dpoc': 'respiratorio',
  'pneumonia': 'respiratorio',
  'bronquite': 'respiratorio',
  'depressao': 'mental-health',
  'ansiedade': 'mental-health',
  'transtorno': 'mental-health',
  'esquizofrenia': 'mental-health',
  'alzheimer': 'neurologico',
  'demencia': 'neurologico',
  'parkinson': 'neurologico',
  'epilepsia': 'neurologico',
  'enxaqueca': 'neurologico',
  'dermatite': 'dermatologico',
  'psoriase': 'dermatologico',
  'acne': 'dermatologico',
  'tuberculose': 'infeccioso',
  'hepatite': 'infeccioso',
  'dengue': 'infeccioso',
  'itu': 'infeccioso',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function getCategory(moduleId: string): string {
  for (const [key, category] of Object.entries(CATEGORY_MAP)) {
    if (moduleId.includes(key)) {
      return category;
    }
  }
  return 'geral';
}

async function getAvailableModules(): Promise<string[]> {
  const modulesPath = join(process.cwd(), CONFIG.modulesDir);
  const files = await glob(`${modulesPath}/*.ts`);
  return files.map(f => f.split('/').pop()!.replace('.ts', ''));
}

async function loadModuleContent(moduleId: string): Promise<string> {
  const modulePath = join(process.cwd(), CONFIG.modulesDir, `${moduleId}.ts`);
  if (!existsSync(modulePath)) {
    throw new Error(`Module not found: ${modulePath}`);
  }
  return readFile(modulePath, 'utf-8');
}

async function loadPromptTemplate(): Promise<string> {
  const templatePath = join(process.cwd(), CONFIG.promptTemplate);
  return readFile(templatePath, 'utf-8');
}

function preparePrompt(template: string, moduleId: string, moduleContent: string): string {
  const category = getCategory(moduleId);
  const constName = `${toPascalCase(moduleId)}Flashcards`;

  return template
    .replace(/\{\{MODULE_ID\}\}/g, moduleId)
    .replace(/\{\{CATEGORY\}\}/g, category)
    .replace(/\{\{MODULE_CONTENT\}\}/g, moduleContent)
    .replace(/\{\{CONST_NAME\}\}/g, constName);
}

async function callLLM(prompt: string, provider: string): Promise<string> {
  const tempFile = `/tmp/flashcard-prompt-${Date.now()}.txt`;
  await writeFile(tempFile, prompt);

  const command = `cat "${tempFile}" | llm-offload --provider ${provider} --max-tokens ${CONFIG.maxTokens} --temperature ${CONFIG.temperature} --no-stream`;

  console.log(`  Calling LLM with ${provider}...`);

  const { stdout, stderr } = await execAsync(command, {
    maxBuffer: 10 * 1024 * 1024,
    timeout: 180000, // 3 minutes
    shell: '/bin/bash',
  });

  if (stderr && !stderr.includes('✅')) {
    console.warn('  LLM stderr:', stderr);
  }

  // Cleanup temp file
  try {
    await execAsync(`rm "${tempFile}"`);
  } catch {
    // Ignore cleanup errors
  }

  return stdout.trim();
}

async function generateFlashcards(moduleId: string, template: string, provider: string): Promise<number> {
  console.log(`\nGenerating flashcards for: ${moduleId}`);

  const moduleContent = await loadModuleContent(moduleId);
  const prompt = preparePrompt(template, moduleId, moduleContent);
  const result = await callLLM(prompt, provider);

  // Clean up the result
  let cleanResult = result;
  if (cleanResult.startsWith('```typescript')) {
    cleanResult = cleanResult.replace(/^```typescript\n/, '').replace(/\n```$/, '');
  } else if (cleanResult.startsWith('```')) {
    cleanResult = cleanResult.replace(/^```\n/, '').replace(/\n```$/, '');
  }

  // Determine output directory based on category
  const category = getCategory(moduleId);
  const categoryDir = join(process.cwd(), CONFIG.outputDir, category);

  if (!existsSync(categoryDir)) {
    await mkdir(categoryDir, { recursive: true });
  }

  // Save to file
  const outputPath = join(categoryDir, `${moduleId}.ts`);
  await writeFile(outputPath, cleanResult);

  // Count cards (rough estimate from array elements)
  const cardCount = (cleanResult.match(/id:\s*'fc-/g) || []).length;

  console.log(`  ✅ Saved ${cardCount} cards to: ${outputPath}`);
  return cardCount;
}

async function generateIndexFile(): Promise<void> {
  const outputDir = join(process.cwd(), CONFIG.outputDir);

  // Find all generated files
  const files = await glob(`${outputDir}/**/*.ts`);
  const flashcardFiles = files.filter(f => !f.endsWith('index.ts'));

  const imports: string[] = [];
  const exports: string[] = [];

  for (const file of flashcardFiles) {
    const relativePath = file.replace(outputDir + '/', '').replace('.ts', '');
    const moduleId = relativePath.split('/').pop()!;
    const constName = `${toPascalCase(moduleId)}Flashcards`;

    imports.push(`import { ${constName} } from './${relativePath}';`);
    exports.push(constName);
  }

  const content = `/**
 * FLASHCARDS INDEX
 * ================
 * Auto-generated by generate-flashcards.ts
 */

${imports.join('\n')}

export const allFlashcards = [
  ${exports.map(e => `...${e}`).join(',\n  ')},
];

export const flashcardsByModule = {
  ${exports.map(e => `'${e.replace('Flashcards', '').toLowerCase()}': ${e}`).join(',\n  ')},
};

export {
  ${exports.join(',\n  ')},
};

export const totalFlashcards = allFlashcards.length;
`;

  await writeFile(join(outputDir, 'index.ts'), content);
  console.log(`\n✅ Updated index file`);
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const moduleId = args.find((a, i) => args[i - 1] === '--module');
  const generateAll = args.includes('--all-modules');
  const dryRun = args.includes('--dry-run');
  const providerArg = args.find((a, i) => args[i - 1] === '--provider');
  const provider = providerArg || CONFIG.provider;

  console.log('='.repeat(60));
  console.log('FLASHCARDS GENERATOR');
  console.log('='.repeat(60));
  console.log(`Provider: ${provider}`);
  console.log(`Cards per module: ${CONFIG.cardsPerModule}`);
  console.log(`Dry run: ${dryRun}`);

  // Ensure output directory exists
  const outputDir = join(process.cwd(), CONFIG.outputDir);
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Load template
  const template = await loadPromptTemplate();

  // Get available modules
  const availableModules = await getAvailableModules();
  console.log(`\nAvailable modules: ${availableModules.length}`);

  // Determine which modules to process
  let modulesToProcess: string[] = [];

  if (moduleId) {
    if (!availableModules.includes(moduleId)) {
      console.error(`Unknown module: ${moduleId}`);
      console.log('Run with --all-modules to see available modules');
      process.exit(1);
    }
    modulesToProcess = [moduleId];
  } else if (generateAll) {
    modulesToProcess = availableModules;
  } else {
    console.log('\nUsage:');
    console.log('  --module <id>    Generate for specific module');
    console.log('  --all-modules    Generate for all modules');
    console.log('  --provider <p>   LLM provider (grok, minimax, groq)');
    console.log('  --dry-run        Show what would be generated');
    console.log('\nAvailable modules:');
    availableModules.forEach(m => console.log(`  - ${m}`));
    return;
  }

  console.log(`\nModules to process: ${modulesToProcess.length}`);
  if (dryRun) {
    modulesToProcess.forEach(m => console.log(`  - ${m}`));
    console.log('\nDry run - no files will be generated.');
    return;
  }

  // Generate flashcards
  let totalCards = 0;
  let successCount = 0;

  for (let i = 0; i < modulesToProcess.length; i++) {
    const module = modulesToProcess[i];

    try {
      const cardCount = await generateFlashcards(module, template, provider);
      totalCards += cardCount;
      successCount++;

      // Delay between modules (except for last one)
      if (i < modulesToProcess.length - 1) {
        console.log(`  Waiting ${CONFIG.delayBetweenModules / 1000}s before next module...`);
        await new Promise(r => setTimeout(r, CONFIG.delayBetweenModules));
      }
    } catch (error: any) {
      console.error(`  ❌ Failed for ${module}: ${error.message}`);
    }
  }

  // Generate index file
  await generateIndexFile();

  console.log('\n' + '='.repeat(60));
  console.log(`Generated ${totalCards} flashcards across ${successCount}/${modulesToProcess.length} modules`);
  console.log('='.repeat(60));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
