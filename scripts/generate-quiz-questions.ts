/**
 * QUIZ QUESTIONS GENERATOR
 * ========================
 *
 * Generates quiz questions from medical modules using LLM synthesis.
 *
 * Usage:
 *   npx tsx scripts/generate-quiz-questions.ts [options]
 *
 * Options:
 *   --module <id>    Generate for specific module (e.g., --module diabetes-mellitus-2)
 *   --all-modules    Generate for all modules
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
  promptTemplate: 'lib/content-generation/prompts/quiz.txt',
  modulesDir: 'lib/content-generation/output/modules',
  outputDir: 'lib/data/quiz-questions',
  provider: 'grok',
  maxTokens: 6000,
  temperature: 0.3,
  delayBetweenModules: 5000, // 5 seconds
  questionsPerModule: 10,
};

// Category mappings
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
  const constName = `${toPascalCase(moduleId)}Questions`;

  return template
    .replace(/\{\{MODULE_ID\}\}/g, moduleId)
    .replace(/\{\{CATEGORY\}\}/g, category)
    .replace(/\{\{MODULE_CONTENT\}\}/g, moduleContent)
    .replace(/\{\{CONST_NAME\}\}/g, constName);
}

async function callLLM(prompt: string, provider: string): Promise<string> {
  const tempFile = `/tmp/quiz-prompt-${Date.now()}.txt`;
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

async function generateQuizQuestions(moduleId: string, template: string, provider: string): Promise<number> {
  console.log(`\nGenerating quiz questions for: ${moduleId}`);

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
  const categoryDir = join(process.cwd(), CONFIG.outputDir, 'by-module');

  if (!existsSync(categoryDir)) {
    await mkdir(categoryDir, { recursive: true });
  }

  // Save to file
  const outputPath = join(categoryDir, `${moduleId}.ts`);
  await writeFile(outputPath, cleanResult);

  // Count questions (rough estimate)
  const questionCount = (cleanResult.match(/id:\s*'quiz-/g) || []).length;

  console.log(`  ✅ Saved ${questionCount} questions to: ${outputPath}`);
  return questionCount;
}

async function generateIndexFile(): Promise<void> {
  const outputDir = join(process.cwd(), CONFIG.outputDir);
  const byModuleDir = join(outputDir, 'by-module');

  if (!existsSync(byModuleDir)) {
    return;
  }

  // Find all generated files
  const files = await glob(`${byModuleDir}/*.ts`);

  const imports: string[] = [];
  const exports: string[] = [];

  for (const file of files) {
    const moduleId = file.split('/').pop()!.replace('.ts', '');
    const constName = `${toPascalCase(moduleId)}Questions`;

    imports.push(`import { ${constName} } from './by-module/${moduleId}';`);
    exports.push(constName);
  }

  const content = `/**
 * QUIZ QUESTIONS INDEX
 * ====================
 * Auto-generated by generate-quiz-questions.ts
 */

${imports.join('\n')}

export const allQuestions = [
  ${exports.map(e => `...${e}`).join(',\n  ')},
];

export const questionsByModule = {
  ${exports.map(e => {
    const moduleId = e.replace('Questions', '').toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `'${moduleId}': ${e}`;
  }).join(',\n  ')},
};

export {
  ${exports.join(',\n  ')},
};

export const totalQuestions = allQuestions.length;

// Statistics
export const questionStats = {
  total: allQuestions.length,
  byDifficulty: {
    beginner: allQuestions.filter(q => q.difficulty === 'beginner').length,
    intermediate: allQuestions.filter(q => q.difficulty === 'intermediate').length,
    advanced: allQuestions.filter(q => q.difficulty === 'advanced').length,
  },
  byType: {
    single: allQuestions.filter(q => q.type === 'single').length,
    multiple: allQuestions.filter(q => q.type === 'multiple').length,
    true_false: allQuestions.filter(q => q.type === 'true_false').length,
    matching: allQuestions.filter(q => q.type === 'matching').length,
  },
};
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
  console.log('QUIZ QUESTIONS GENERATOR');
  console.log('='.repeat(60));
  console.log(`Provider: ${provider}`);
  console.log(`Questions per module: ${CONFIG.questionsPerModule}`);
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
    console.log('\nSample modules:');
    availableModules.slice(0, 10).forEach(m => console.log(`  - ${m}`));
    console.log(`  ... and ${availableModules.length - 10} more`);
    return;
  }

  console.log(`\nModules to process: ${modulesToProcess.length}`);
  if (dryRun) {
    console.log('\nDry run - no files will be generated.');
    return;
  }

  // Generate questions
  let totalQuestions = 0;
  let successCount = 0;

  for (let i = 0; i < modulesToProcess.length; i++) {
    const module = modulesToProcess[i];

    try {
      const questionCount = await generateQuizQuestions(module, template, provider);
      totalQuestions += questionCount;
      successCount++;

      // Delay between modules
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
  console.log(`Generated ${totalQuestions} questions across ${successCount}/${modulesToProcess.length} modules`);
  console.log('='.repeat(60));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
