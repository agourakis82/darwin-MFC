/**
 * LEARNING PATHS GENERATOR
 * ========================
 *
 * Generates new learning paths using LLM synthesis.
 *
 * Usage:
 *   npx tsx scripts/generate-learning-paths.ts [options]
 *
 * Options:
 *   --path <id>      Generate specific path (e.g., --path chronic-disease-management)
 *   --all            Generate all 18 paths
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
  promptTemplate: 'lib/content-generation/prompts/learning-path.txt',
  outputDir: 'lib/data/learning-paths',
  modulesDir: 'lib/content-generation/output/modules',
  provider: 'grok',
  maxTokens: 8000,
  temperature: 0.4,
  delayBetweenPaths: 10000, // 10 seconds
};

// ============================================================================
// LEARNING PATH DEFINITIONS
// ============================================================================

interface PathDefinition {
  id: string;
  topic: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  hours: number;
  icon: string;
  color: string;
  relatedModules: string[];
}

const LEARNING_PATHS: PathDefinition[] = [
  {
    id: 'chronic-disease-management',
    topic: 'Manejo de Doenças Crônicas',
    category: 'chronic_diseases',
    difficulty: 'intermediate',
    hours: 25,
    icon: 'HeartPulse',
    color: 'bg-amber-500',
    relatedModules: ['diabetes-mellitus-2', 'hipertensao-arterial', 'dislipidemia', 'doenca-renal-cronica', 'insuficiencia-cardiaca'],
  },
  {
    id: 'emergency-primary-care',
    topic: 'Urgências na Atenção Primária',
    category: 'emergency',
    difficulty: 'intermediate',
    hours: 15,
    icon: 'AlertTriangle',
    color: 'bg-red-500',
    relatedModules: ['pneumonia-comunitaria', 'angina-estavel', 'avc', 'pre-eclampsia', 'dengue'],
  },
  {
    id: 'pediatric-essentials',
    topic: 'Fundamentos de Pediatria na APS',
    category: 'pediatrics',
    difficulty: 'beginner',
    hours: 20,
    icon: 'Baby',
    color: 'bg-pink-500',
    relatedModules: ['asma-infantil', 'dermatite-atopica-pediatrica', 'anemia-ferropriva-pediatrica', 'otite-media-aguda', 'obesidade-infantil'],
  },
  {
    id: 'geriatric-care',
    topic: 'Cuidado do Idoso na APS',
    category: 'geriatrics',
    difficulty: 'intermediate',
    hours: 20,
    icon: 'User',
    color: 'bg-gray-500',
    relatedModules: ['demencia', 'alzheimer', 'depressao-idoso', 'osteoporose', 'hipotensao-ortostatica'],
  },
  {
    id: 'mental-health-aps',
    topic: 'Saúde Mental na Atenção Primária',
    category: 'mental_health',
    difficulty: 'intermediate',
    hours: 18,
    icon: 'Brain',
    color: 'bg-purple-500',
    relatedModules: ['depressao', 'ansiedade', 'transtorno-ansiedade-generalizada', 'transtorno-panico', 'toc'],
  },
  {
    id: 'prenatal-care',
    topic: 'Pré-Natal na Atenção Primária',
    category: 'maternal_health',
    difficulty: 'intermediate',
    hours: 22,
    icon: 'Heart',
    color: 'bg-rose-500',
    relatedModules: ['pre-eclampsia', 'diabetes-mellitus-2', 'hipertensao-arterial', 'anemia-ferropriva', 'itu'],
  },
  {
    id: 'clinical-reasoning',
    topic: 'Raciocínio Clínico na APS',
    category: 'clinical_skills',
    difficulty: 'advanced',
    hours: 15,
    icon: 'Target',
    color: 'bg-indigo-500',
    relatedModules: ['diabetes-mellitus-2', 'hipertensao-arterial', 'lombalgia', 'enxaqueca', 'vertigem'],
  },
  {
    id: 'cardiovascular-aps',
    topic: 'Cardiologia na Atenção Primária',
    category: 'chronic_diseases',
    difficulty: 'intermediate',
    hours: 20,
    icon: 'Heart',
    color: 'bg-red-600',
    relatedModules: ['hipertensao-arterial', 'insuficiencia-cardiaca', 'fibrilacao-atrial', 'angina-estavel', 'dislipidemia'],
  },
  {
    id: 'respiratory-diseases',
    topic: 'Doenças Respiratórias na APS',
    category: 'primary_care',
    difficulty: 'intermediate',
    hours: 18,
    icon: 'Wind',
    color: 'bg-cyan-500',
    relatedModules: ['asma', 'dpoc', 'pneumonia', 'bronquite-cronica', 'rinite-alergica'],
  },
  {
    id: 'endocrine-disorders',
    topic: 'Endocrinologia na APS',
    category: 'chronic_diseases',
    difficulty: 'intermediate',
    hours: 20,
    icon: 'Pill',
    color: 'bg-amber-600',
    relatedModules: ['diabetes-mellitus-2', 'diabetes-mellitus-1', 'hipotireoidismo', 'obesidade', 'deficiencia-vitamina-d'],
  },
  {
    id: 'infectious-diseases',
    topic: 'Doenças Infecciosas na APS',
    category: 'primary_care',
    difficulty: 'intermediate',
    hours: 18,
    icon: 'Bug',
    color: 'bg-green-600',
    relatedModules: ['tuberculose-pulmonar', 'dengue', 'hepatite-b', 'itu', 'pneumonia-comunitaria'],
  },
  {
    id: 'dermatology-aps',
    topic: 'Dermatologia na APS',
    category: 'primary_care',
    difficulty: 'beginner',
    hours: 12,
    icon: 'Scan',
    color: 'bg-orange-500',
    relatedModules: ['dermatite-atopica', 'psoriase', 'acne', 'escabiose', 'herpes-zoster'],
  },
  {
    id: 'musculoskeletal-aps',
    topic: 'Ortopedia na Atenção Primária',
    category: 'primary_care',
    difficulty: 'intermediate',
    hours: 15,
    icon: 'Bone',
    color: 'bg-stone-500',
    relatedModules: ['lombalgia', 'osteoartrite', 'artrite-reumatoide', 'fibromialgia', 'gota'],
  },
  {
    id: 'neurology-aps',
    topic: 'Neurologia na Atenção Primária',
    category: 'primary_care',
    difficulty: 'intermediate',
    hours: 18,
    icon: 'Zap',
    color: 'bg-violet-500',
    relatedModules: ['enxaqueca', 'cefaleia-tensional', 'epilepsia', 'vertigem', 'neuropatia-periferica'],
  },
  {
    id: 'gastroenterology-aps',
    topic: 'Gastroenterologia na APS',
    category: 'primary_care',
    difficulty: 'intermediate',
    hours: 15,
    icon: 'Utensils',
    color: 'bg-yellow-600',
    relatedModules: ['gastrite', 'drge', 'hepatite-b', 'hepatite-a', 'esquistossomose'],
  },
  {
    id: 'preventive-medicine',
    topic: 'Medicina Preventiva na APS',
    category: 'primary_care',
    difficulty: 'beginner',
    hours: 15,
    icon: 'Shield',
    color: 'bg-emerald-500',
    relatedModules: ['diabetes-mellitus-2', 'hipertensao-arterial', 'obesidade', 'dislipidemia', 'osteoporose'],
  },
  {
    id: 'evidence-based-medicine',
    topic: 'Medicina Baseada em Evidências',
    category: 'clinical_skills',
    difficulty: 'advanced',
    hours: 12,
    icon: 'BookOpen',
    color: 'bg-blue-600',
    relatedModules: ['diabetes-mellitus-2', 'hipertensao-arterial', 'asma', 'depressao', 'dislipidemia'],
  },
  {
    id: 'palliative-care-aps',
    topic: 'Cuidados Paliativos na APS',
    category: 'geriatrics',
    difficulty: 'advanced',
    hours: 15,
    icon: 'Heart',
    color: 'bg-purple-600',
    relatedModules: ['demencia', 'insuficiencia-cardiaca', 'dpoc', 'doenca-renal-cronica', 'depressao'],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

async function getAvailableModules(): Promise<string[]> {
  const modulesPath = join(process.cwd(), CONFIG.modulesDir);
  const files = await glob(`${modulesPath}/*.ts`);
  return files.map(f => f.split('/').pop()!.replace('.ts', ''));
}

async function loadPromptTemplate(): Promise<string> {
  const templatePath = join(process.cwd(), CONFIG.promptTemplate);
  return readFile(templatePath, 'utf-8');
}

function preparePrompt(template: string, path: PathDefinition, availableModules: string[]): string {
  const date = new Date().toISOString().split('T')[0];
  const constName = `${toCamelCase(path.id)}Path`;

  const modulesText = availableModules.map(m => `- ${m}`).join('\n');

  return template
    .replace(/\{\{TOPIC\}\}/g, path.topic)
    .replace(/\{\{PATH_ID\}\}/g, path.id)
    .replace(/\{\{PATH_CONST\}\}/g, constName)
    .replace(/\{\{CATEGORY\}\}/g, path.category)
    .replace(/\{\{DIFFICULTY\}\}/g, path.difficulty)
    .replace(/\{\{HOURS\}\}/g, path.hours.toString())
    .replace(/\{\{ICON\}\}/g, path.icon)
    .replace(/\{\{COLOR\}\}/g, path.color)
    .replace(/\{\{DATE\}\}/g, date)
    .replace(/\{\{AVAILABLE_MODULES\}\}/g, modulesText);
}

async function callLLM(prompt: string, provider: string): Promise<string> {
  const tempFile = `/tmp/learning-path-prompt-${Date.now()}.txt`;
  await writeFile(tempFile, prompt);

  const command = `cat "${tempFile}" | llm-offload --provider ${provider} --max-tokens ${CONFIG.maxTokens} --temperature ${CONFIG.temperature} --no-stream`;

  console.log(`  Calling LLM with ${provider}...`);

  const { stdout, stderr } = await execAsync(command, {
    maxBuffer: 10 * 1024 * 1024,
    timeout: 300000, // 5 minutes
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

async function generateLearningPath(path: PathDefinition, template: string, availableModules: string[], provider: string): Promise<void> {
  console.log(`\nGenerating: ${path.topic} (${path.id})`);

  const prompt = preparePrompt(template, path, availableModules);
  const result = await callLLM(prompt, provider);

  // Clean up the result (remove markdown fences if present)
  let cleanResult = result;
  if (cleanResult.startsWith('```typescript')) {
    cleanResult = cleanResult.replace(/^```typescript\n/, '').replace(/\n```$/, '');
  } else if (cleanResult.startsWith('```')) {
    cleanResult = cleanResult.replace(/^```\n/, '').replace(/\n```$/, '');
  }

  // Save to file
  const outputPath = join(process.cwd(), CONFIG.outputDir, `${path.id}.ts`);
  await writeFile(outputPath, cleanResult);

  console.log(`  ✅ Saved to: ${outputPath}`);
}

async function updateIndexFile(paths: string[]): Promise<void> {
  const indexPath = join(process.cwd(), CONFIG.outputDir, 'index.ts');

  const imports = paths.map(p => {
    const constName = `${toCamelCase(p)}Path`;
    return `import { ${constName} } from './${p}';`;
  });

  const exports = paths.map(p => {
    const constName = `${toCamelCase(p)}Path`;
    return constName;
  });

  const content = `/**
 * LEARNING PATHS INDEX
 * ====================
 * Auto-generated by generate-learning-paths.ts
 */

${imports.join('\n')}

export const learningPaths = [
  ${exports.join(',\n  ')},
];

export {
  ${exports.join(',\n  ')},
};
`;

  await writeFile(indexPath, content);
  console.log(`\n✅ Updated index file: ${indexPath}`);
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const pathId = args.find((a, i) => args[i - 1] === '--path');
  const generateAll = args.includes('--all');
  const dryRun = args.includes('--dry-run');
  const providerArg = args.find((a, i) => args[i - 1] === '--provider');
  const provider = providerArg || CONFIG.provider;

  console.log('='.repeat(60));
  console.log('LEARNING PATHS GENERATOR');
  console.log('='.repeat(60));
  console.log(`Provider: ${provider}`);
  console.log(`Dry run: ${dryRun}`);

  // Ensure output directory exists
  const outputDir = join(process.cwd(), CONFIG.outputDir);
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Load template and available modules
  const template = await loadPromptTemplate();
  const availableModules = await getAvailableModules();
  console.log(`\nAvailable modules: ${availableModules.length}`);

  // Determine which paths to generate
  let pathsToGenerate: PathDefinition[] = [];

  if (pathId) {
    const path = LEARNING_PATHS.find(p => p.id === pathId);
    if (!path) {
      console.error(`Unknown path: ${pathId}`);
      console.log('Available paths:', LEARNING_PATHS.map(p => p.id).join(', '));
      process.exit(1);
    }
    pathsToGenerate = [path];
  } else if (generateAll) {
    pathsToGenerate = LEARNING_PATHS;
  } else {
    console.log('\nUsage:');
    console.log('  --path <id>    Generate specific path');
    console.log('  --all          Generate all 18 paths');
    console.log('  --provider <p> LLM provider (grok, minimax, groq)');
    console.log('  --dry-run      Show what would be generated');
    console.log('\nAvailable paths:');
    LEARNING_PATHS.forEach(p => {
      console.log(`  ${p.id}: ${p.topic} (${p.difficulty}, ${p.hours}h)`);
    });
    return;
  }

  console.log(`\nPaths to generate: ${pathsToGenerate.length}`);
  pathsToGenerate.forEach(p => console.log(`  - ${p.id}: ${p.topic}`));

  if (dryRun) {
    console.log('\nDry run - no files will be generated.');
    return;
  }

  // Generate paths
  const generatedPaths: string[] = [];

  for (let i = 0; i < pathsToGenerate.length; i++) {
    const path = pathsToGenerate[i];

    try {
      await generateLearningPath(path, template, availableModules, provider);
      generatedPaths.push(path.id);

      // Delay between paths (except for last one)
      if (i < pathsToGenerate.length - 1) {
        console.log(`  Waiting ${CONFIG.delayBetweenPaths / 1000}s before next path...`);
        await new Promise(r => setTimeout(r, CONFIG.delayBetweenPaths));
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to generate ${path.id}: ${error.message}`);
    }
  }

  // Update index file with all paths (existing + new)
  const existingPaths = ['aps-essentials', 'medication-safety'];
  const allPaths = [...existingPaths, ...generatedPaths];
  await updateIndexFile(allPaths);

  console.log('\n' + '='.repeat(60));
  console.log(`Generated ${generatedPaths.length}/${pathsToGenerate.length} paths`);
  console.log('='.repeat(60));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
