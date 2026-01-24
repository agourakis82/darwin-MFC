/**
 * CLINICAL CASES GENERATOR
 * ========================
 *
 * Generates interactive clinical cases using LLM synthesis.
 *
 * Usage:
 *   npx tsx scripts/generate-clinical-cases.ts [options]
 *
 * Options:
 *   --condition <id>  Generate for specific condition (e.g., --condition diabetes-mellitus-2)
 *   --category <c>    Generate for specific category (e.g., --category cardiovascular)
 *   --count <n>       Number of cases to generate (default: all)
 *   --provider <p>    LLM provider: grok, minimax, groq (default: grok)
 *   --delay <ms>      Delay between cases in ms (default: 10000)
 *   --dry-run         Show what would be generated without running
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
  promptTemplate: 'lib/content-generation/prompts/clinical-case.txt',
  modulesDir: 'lib/content-generation/output/modules',
  outputDir: 'lib/data/casos-clinicos',
  provider: 'grok',
  maxTokens: 8000,
  temperature: 0.4,
  delayBetweenCases: 10000, // 10 seconds
};

// ============================================================================
// CASE DEFINITIONS
// ============================================================================

interface CaseDefinition {
  id: string;
  condition: string;
  conditionId: string;
  category: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
}

const CASES_TO_GENERATE: CaseDefinition[] = [
  // Cardiovascular (9 new)
  { id: 'caso-iam-001', condition: 'Infarto Agudo do Miocárdio', conditionId: 'angina-estavel', category: 'cardiovascular', difficulty: 'avancado' },
  { id: 'caso-ic-001', condition: 'Insuficiência Cardíaca Descompensada', conditionId: 'insuficiencia-cardiaca', category: 'cardiovascular', difficulty: 'intermediario' },
  { id: 'caso-fa-001', condition: 'Fibrilação Atrial', conditionId: 'fibrilacao-atrial', category: 'cardiovascular', difficulty: 'intermediario' },
  { id: 'caso-has-001', condition: 'Crise Hipertensiva', conditionId: 'hipertensao-arterial', category: 'cardiovascular', difficulty: 'intermediario' },
  { id: 'caso-dislip-001', condition: 'Dislipidemia com Alto Risco CV', conditionId: 'dislipidemia', category: 'cardiovascular', difficulty: 'intermediario' },
  { id: 'caso-angina-001', condition: 'Angina Estável', conditionId: 'angina-estavel', category: 'cardiovascular', difficulty: 'iniciante' },
  { id: 'caso-has-002', condition: 'HAS Resistente', conditionId: 'hipertensao-arterial', category: 'cardiovascular', difficulty: 'avancado' },
  { id: 'caso-ic-002', condition: 'IC com Fração de Ejeção Preservada', conditionId: 'insuficiencia-cardiaca', category: 'cardiovascular', difficulty: 'avancado' },
  { id: 'caso-avc-001', condition: 'AVC Isquêmico', conditionId: 'avc', category: 'cardiovascular', difficulty: 'avancado' },

  // Endócrino (9 new)
  { id: 'caso-dm2-001', condition: 'Diabetes Tipo 2 Recém-Diagnosticado', conditionId: 'diabetes-mellitus-2', category: 'endocrino', difficulty: 'iniciante' },
  { id: 'caso-dm2-002', condition: 'DM2 com Complicações', conditionId: 'diabetes-mellitus-2', category: 'endocrino', difficulty: 'avancado' },
  { id: 'caso-dm2-003', condition: 'Hipoglicemia em Diabético', conditionId: 'diabetes-mellitus-2', category: 'endocrino', difficulty: 'intermediario' },
  { id: 'caso-hipo-001', condition: 'Hipotireoidismo', conditionId: 'hipotireoidismo', category: 'endocrino', difficulty: 'iniciante' },
  { id: 'caso-obes-001', condition: 'Obesidade Grau III', conditionId: 'obesidade', category: 'endocrino', difficulty: 'intermediario' },
  { id: 'caso-dm1-001', condition: 'Diabetes Tipo 1', conditionId: 'diabetes-mellitus-1', category: 'endocrino', difficulty: 'intermediario' },
  { id: 'caso-vitd-001', condition: 'Deficiência de Vitamina D', conditionId: 'deficiencia-vitamina-d', category: 'endocrino', difficulty: 'iniciante' },
  { id: 'caso-hiposub-001', condition: 'Hipotireoidismo Subclínico', conditionId: 'hipotireoidismo-subclinico', category: 'endocrino', difficulty: 'intermediario' },
  { id: 'caso-cetoacidose-001', condition: 'Cetoacidose Diabética', conditionId: 'diabetes-mellitus-1', category: 'endocrino', difficulty: 'avancado' },

  // Respiratório (8 new)
  { id: 'caso-asma-001', condition: 'Crise Asmática', conditionId: 'asma', category: 'respiratorio', difficulty: 'intermediario' },
  { id: 'caso-dpoc-001', condition: 'Exacerbação de DPOC', conditionId: 'dpoc', category: 'respiratorio', difficulty: 'intermediario' },
  { id: 'caso-pnm-001', condition: 'Pneumonia Comunitária', conditionId: 'pneumonia-comunitaria', category: 'respiratorio', difficulty: 'iniciante' },
  { id: 'caso-asma-002', condition: 'Asma de Difícil Controle', conditionId: 'asma', category: 'respiratorio', difficulty: 'avancado' },
  { id: 'caso-dpoc-002', condition: 'DPOC Estável', conditionId: 'dpoc', category: 'respiratorio', difficulty: 'iniciante' },
  { id: 'caso-rinite-001', condition: 'Rinite Alérgica', conditionId: 'rinite-alergica', category: 'respiratorio', difficulty: 'iniciante' },
  { id: 'caso-sinusite-001', condition: 'Sinusite Aguda', conditionId: 'sinusite', category: 'respiratorio', difficulty: 'iniciante' },
  { id: 'caso-bronquite-001', condition: 'Bronquite Crônica', conditionId: 'bronquite-cronica', category: 'respiratorio', difficulty: 'intermediario' },

  // Neurológico (7 new)
  { id: 'caso-enxaqueca-001', condition: 'Enxaqueca Crônica', conditionId: 'enxaqueca', category: 'neurologico', difficulty: 'intermediario' },
  { id: 'caso-epilepsia-001', condition: 'Primeira Crise Convulsiva', conditionId: 'epilepsia', category: 'neurologico', difficulty: 'intermediario' },
  { id: 'caso-vertigem-001', condition: 'Vertigem Posicional', conditionId: 'vertigem', category: 'neurologico', difficulty: 'iniciante' },
  { id: 'caso-parkinson-001', condition: 'Doença de Parkinson Inicial', conditionId: 'parkinson', category: 'neurologico', difficulty: 'intermediario' },
  { id: 'caso-demencia-001', condition: 'Demência em Investigação', conditionId: 'demencia', category: 'neurologico', difficulty: 'avancado' },
  { id: 'caso-cefaleia-001', condition: 'Cefaleia Tensional', conditionId: 'cefaleia-tensional', category: 'neurologico', difficulty: 'iniciante' },
  { id: 'caso-neuropatia-001', condition: 'Neuropatia Diabética', conditionId: 'neuropatia-periferica-diabetica', category: 'neurologico', difficulty: 'intermediario' },

  // Gastrointestinal (8 new)
  { id: 'caso-drge-001', condition: 'DRGE Refratária', conditionId: 'drge', category: 'gastro', difficulty: 'intermediario' },
  { id: 'caso-gastrite-001', condition: 'Gastrite por H. pylori', conditionId: 'gastrite', category: 'gastro', difficulty: 'iniciante' },
  { id: 'caso-hepb-001', condition: 'Hepatite B Crônica', conditionId: 'hepatite-b', category: 'gastro', difficulty: 'intermediario' },
  { id: 'caso-hepa-001', condition: 'Hepatite A Aguda', conditionId: 'hepatite-a', category: 'gastro', difficulty: 'iniciante' },
  { id: 'caso-esquis-001', condition: 'Esquistossomose', conditionId: 'esquistossomose', category: 'gastro', difficulty: 'intermediario' },
  { id: 'caso-drge-002', condition: 'DRGE com Complicações', conditionId: 'drge', category: 'gastro', difficulty: 'avancado' },
  { id: 'caso-dispepsia-001', condition: 'Dispepsia Funcional', conditionId: 'gastrite', category: 'gastro', difficulty: 'intermediario' },
  { id: 'caso-esteatose-001', condition: 'Esteatose Hepática', conditionId: 'obesidade', category: 'gastro', difficulty: 'intermediario' },

  // Infeccioso (6 new)
  { id: 'caso-tb-001', condition: 'Tuberculose Pulmonar', conditionId: 'tuberculose-pulmonar', category: 'infeccioso', difficulty: 'intermediario' },
  { id: 'caso-dengue-001', condition: 'Dengue com Sinais de Alarme', conditionId: 'dengue', category: 'infeccioso', difficulty: 'intermediario' },
  { id: 'caso-itu-001', condition: 'ITU de Repetição', conditionId: 'itu', category: 'infeccioso', difficulty: 'iniciante' },
  { id: 'caso-herpes-001', condition: 'Herpes Zoster', conditionId: 'herpes-zoster', category: 'infeccioso', difficulty: 'iniciante' },
  { id: 'caso-mono-001', condition: 'Mononucleose', conditionId: 'mononucleose-infecciosa', category: 'infeccioso', difficulty: 'iniciante' },
  { id: 'caso-celulite-001', condition: 'Celulite', conditionId: 'celulite', category: 'infeccioso', difficulty: 'iniciante' },

  // Psiquiátrico (6 new)
  { id: 'caso-depressao-001', condition: 'Depressão Maior', conditionId: 'depressao', category: 'psiquiatrico', difficulty: 'intermediario' },
  { id: 'caso-ansiedade-001', condition: 'TAG', conditionId: 'transtorno-ansiedade-generalizada', category: 'psiquiatrico', difficulty: 'iniciante' },
  { id: 'caso-panico-001', condition: 'Transtorno de Pânico', conditionId: 'transtorno-panico', category: 'psiquiatrico', difficulty: 'intermediario' },
  { id: 'caso-toc-001', condition: 'TOC', conditionId: 'toc', category: 'psiquiatrico', difficulty: 'intermediario' },
  { id: 'caso-bipolar-001', condition: 'Transtorno Bipolar', conditionId: 'transtorno-bipolar', category: 'psiquiatrico', difficulty: 'avancado' },
  { id: 'caso-depidoso-001', condition: 'Depressão no Idoso', conditionId: 'depressao-idoso', category: 'psiquiatrico', difficulty: 'intermediario' },

  // Pediátrico (7 new)
  { id: 'caso-asmainf-001', condition: 'Asma Infantil', conditionId: 'asma-infantil', category: 'pediatrico', difficulty: 'intermediario' },
  { id: 'caso-otite-001', condition: 'Otite Média Aguda', conditionId: 'otite-media-aguda', category: 'pediatrico', difficulty: 'iniciante' },
  { id: 'caso-dainf-001', condition: 'Dermatite Atópica Pediátrica', conditionId: 'dermatite-atopica-pediatrica', category: 'pediatrico', difficulty: 'iniciante' },
  { id: 'caso-anemiainf-001', condition: 'Anemia Ferropriva Infantil', conditionId: 'anemia-ferropriva-pediatrica', category: 'pediatrico', difficulty: 'iniciante' },
  { id: 'caso-obesinf-001', condition: 'Obesidade Infantil', conditionId: 'obesidade-infantil', category: 'pediatrico', difficulty: 'intermediario' },
  { id: 'caso-varicela-001', condition: 'Varicela', conditionId: 'varicela', category: 'pediatrico', difficulty: 'iniciante' },
  { id: 'caso-escarlatina-001', condition: 'Escarlatina', conditionId: 'escarlatina', category: 'pediatrico', difficulty: 'intermediario' },

  // Geriátrico (6 new)
  { id: 'caso-alzheimer-001', condition: 'Doença de Alzheimer', conditionId: 'alzheimer', category: 'geriatrico', difficulty: 'intermediario' },
  { id: 'caso-osteoporose-001', condition: 'Osteoporose com Fratura', conditionId: 'osteoporose', category: 'geriatrico', difficulty: 'intermediario' },
  { id: 'caso-polifarm-001', condition: 'Polifarmácia', conditionId: 'demencia', category: 'geriatrico', difficulty: 'avancado' },
  { id: 'caso-quedas-001', condition: 'Quedas Recorrentes', conditionId: 'hipotensao-ortostatica', category: 'geriatrico', difficulty: 'intermediario' },
  { id: 'caso-desnutri-001', condition: 'Desnutrição no Idoso', conditionId: 'deficiencia-vitamina-b12', category: 'geriatrico', difficulty: 'intermediario' },
  { id: 'caso-delirium-001', condition: 'Delirium', conditionId: 'demencia', category: 'geriatrico', difficulty: 'avancado' },

  // Gineco/Obstetrícia (5 new)
  { id: 'caso-preeclampsia-001', condition: 'Pré-eclâmpsia', conditionId: 'pre-eclampsia', category: 'gineco_obstetricia', difficulty: 'avancado' },
  { id: 'caso-sop-001', condition: 'SOP', conditionId: 'sindrome-ovarios-policisticos', category: 'gineco_obstetricia', difficulty: 'intermediario' },
  { id: 'caso-endometriose-001', condition: 'Endometriose', conditionId: 'endometriose', category: 'gineco_obstetricia', difficulty: 'intermediario' },
  { id: 'caso-mioma-001', condition: 'Mioma Uterino', conditionId: 'mioma-uterino', category: 'gineco_obstetricia', difficulty: 'intermediario' },
  { id: 'caso-dip-001', condition: 'DIP', conditionId: 'doenca-inflamatoria-pelvica', category: 'gineco_obstetricia', difficulty: 'intermediario' },

  // Urgência (5 new)
  { id: 'caso-anafilaxia-001', condition: 'Anafilaxia', conditionId: 'asma', category: 'urgencia', difficulty: 'avancado' },
  { id: 'caso-sepse-001', condition: 'Sepse', conditionId: 'pneumonia-comunitaria', category: 'urgencia', difficulty: 'avancado' },
  { id: 'caso-hipo-001', condition: 'Hipoglicemia Grave', conditionId: 'diabetes-mellitus-2', category: 'urgencia', difficulty: 'intermediario' },
  { id: 'caso-crisehta-001', condition: 'Emergência Hipertensiva', conditionId: 'hipertensao-arterial', category: 'urgencia', difficulty: 'avancado' },
  { id: 'caso-convulsao-001', condition: 'Estado de Mal Epiléptico', conditionId: 'epilepsia', category: 'urgencia', difficulty: 'avancado' },

  // Crônico (9 new - using various conditions)
  { id: 'caso-multimorbidade-001', condition: 'Multimorbidade', conditionId: 'diabetes-mellitus-2', category: 'cronico', difficulty: 'avancado' },
  { id: 'caso-fibromialgia-001', condition: 'Fibromialgia', conditionId: 'fibromialgia', category: 'cronico', difficulty: 'intermediario' },
  { id: 'caso-ar-001', condition: 'Artrite Reumatoide', conditionId: 'artrite-reumatoide', category: 'cronico', difficulty: 'intermediario' },
  { id: 'caso-gota-001', condition: 'Gota', conditionId: 'gota', category: 'cronico', difficulty: 'iniciante' },
  { id: 'caso-lombalgia-001', condition: 'Lombalgia Crônica', conditionId: 'lombalgia', category: 'cronico', difficulty: 'intermediario' },
  { id: 'caso-osteoartrite-001', condition: 'Osteoartrite', conditionId: 'osteoartrite', category: 'cronico', difficulty: 'iniciante' },
  { id: 'caso-drc-001', condition: 'Doença Renal Crônica', conditionId: 'doenca-renal-cronica', category: 'cronico', difficulty: 'intermediario' },
  { id: 'caso-anemia-001', condition: 'Anemia Ferropriva', conditionId: 'anemia-ferropriva', category: 'cronico', difficulty: 'iniciante' },
  { id: 'caso-psoriase-001', condition: 'Psoríase', conditionId: 'psoriase', category: 'cronico', difficulty: 'intermediario' },
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

async function loadModuleContent(moduleId: string): Promise<string> {
  const modulePath = join(process.cwd(), CONFIG.modulesDir, `${moduleId}.ts`);
  if (!existsSync(modulePath)) {
    console.warn(`  Module not found: ${moduleId}, using placeholder`);
    return `// Module ${moduleId} - placeholder content`;
  }
  return readFile(modulePath, 'utf-8');
}

async function loadPromptTemplate(): Promise<string> {
  const templatePath = join(process.cwd(), CONFIG.promptTemplate);
  return readFile(templatePath, 'utf-8');
}

function preparePrompt(template: string, caseDefn: CaseDefinition, moduleContent: string): string {
  const date = new Date().toISOString().split('T')[0];
  const constName = `caso${toPascalCase(caseDefn.conditionId)}`;

  return template
    .replace(/\{\{CONDITION\}\}/g, caseDefn.condition)
    .replace(/\{\{CONDITION_ID\}\}/g, caseDefn.conditionId)
    .replace(/\{\{CONDITION_PASCAL\}\}/g, toPascalCase(caseDefn.conditionId))
    .replace(/\{\{CATEGORY\}\}/g, caseDefn.category)
    .replace(/\{\{DIFFICULTY\}\}/g, caseDefn.difficulty)
    .replace(/\{\{DATE\}\}/g, date)
    .replace(/\{\{MODULE_CONTENT\}\}/g, moduleContent);
}

async function callLLM(prompt: string, provider: string): Promise<string> {
  const tempFile = `/tmp/case-prompt-${Date.now()}.txt`;
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

async function generateClinicalCase(caseDefn: CaseDefinition, template: string, provider: string): Promise<void> {
  console.log(`\nGenerating: ${caseDefn.condition} (${caseDefn.id})`);

  const moduleContent = await loadModuleContent(caseDefn.conditionId);
  const prompt = preparePrompt(template, caseDefn, moduleContent);
  const result = await callLLM(prompt, provider);

  // Clean up the result
  let cleanResult = result;
  if (cleanResult.startsWith('```typescript')) {
    cleanResult = cleanResult.replace(/^```typescript\n/, '').replace(/\n```$/, '');
  } else if (cleanResult.startsWith('```')) {
    cleanResult = cleanResult.replace(/^```\n/, '').replace(/\n```$/, '');
  }

  // Determine output directory based on category
  const categoryDir = join(process.cwd(), CONFIG.outputDir, caseDefn.category);

  if (!existsSync(categoryDir)) {
    await mkdir(categoryDir, { recursive: true });
  }

  // Save to file
  const outputPath = join(categoryDir, `${caseDefn.id}.ts`);
  await writeFile(outputPath, cleanResult);

  console.log(`  ✅ Saved to: ${outputPath}`);
}

async function generateIndexFile(): Promise<void> {
  const outputDir = join(process.cwd(), CONFIG.outputDir);

  // Find all generated files
  const files = await glob(`${outputDir}/**/*.ts`);
  const caseFiles = files.filter(f => !f.endsWith('index.ts') && f.includes('caso-'));

  const imports: string[] = [];
  const exports: string[] = [];

  for (const file of caseFiles) {
    const relativePath = file.replace(outputDir + '/', '').replace('.ts', '');
    const caseId = relativePath.split('/').pop()!;
    const constName = `caso${toPascalCase(caseId.replace('caso-', ''))}`;

    imports.push(`import { ${constName} } from './${relativePath}';`);
    exports.push(constName);
  }

  const content = `/**
 * CLINICAL CASES INDEX
 * ====================
 * Auto-generated by generate-clinical-cases.ts
 */

${imports.join('\n')}

export const allCases = [
  ${exports.join(',\n  ')},
];

export const casesByCategory = {
  cardiovascular: allCases.filter(c => c.categoria === 'cardiovascular'),
  endocrino: allCases.filter(c => c.categoria === 'endocrino'),
  respiratorio: allCases.filter(c => c.categoria === 'respiratorio'),
  neurologico: allCases.filter(c => c.categoria === 'neurologico'),
  gastro: allCases.filter(c => c.categoria === 'gastro'),
  infeccioso: allCases.filter(c => c.categoria === 'infeccioso'),
  psiquiatrico: allCases.filter(c => c.categoria === 'psiquiatrico'),
  pediatrico: allCases.filter(c => c.categoria === 'pediatrico'),
  geriatrico: allCases.filter(c => c.categoria === 'geriatrico'),
  gineco_obstetricia: allCases.filter(c => c.categoria === 'gineco_obstetricia'),
  urgencia: allCases.filter(c => c.categoria === 'urgencia'),
  cronico: allCases.filter(c => c.categoria === 'cronico'),
};

export const casesByDifficulty = {
  iniciante: allCases.filter(c => c.dificuldade === 'iniciante'),
  intermediario: allCases.filter(c => c.dificuldade === 'intermediario'),
  avancado: allCases.filter(c => c.dificuldade === 'avancado'),
};

export {
  ${exports.join(',\n  ')},
};

export const totalCases = allCases.length;
`;

  await writeFile(join(outputDir, 'index.ts'), content);
  console.log(`\n✅ Updated index file`);
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const conditionArg = args.find((a, i) => args[i - 1] === '--condition');
  const categoryArg = args.find((a, i) => args[i - 1] === '--category');
  const countArg = args.find((a, i) => args[i - 1] === '--count');
  const delayArg = args.find((a, i) => args[i - 1] === '--delay');
  const dryRun = args.includes('--dry-run');
  const providerArg = args.find((a, i) => args[i - 1] === '--provider');

  const provider = providerArg || CONFIG.provider;
  const delay = delayArg ? parseInt(delayArg) : CONFIG.delayBetweenCases;
  const count = countArg ? parseInt(countArg) : undefined;

  console.log('='.repeat(60));
  console.log('CLINICAL CASES GENERATOR');
  console.log('='.repeat(60));
  console.log(`Provider: ${provider}`);
  console.log(`Delay between cases: ${delay}ms`);
  console.log(`Dry run: ${dryRun}`);

  // Ensure output directory exists
  const outputDir = join(process.cwd(), CONFIG.outputDir);
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Load template
  const template = await loadPromptTemplate();

  // Determine which cases to generate
  let casesToGenerate: CaseDefinition[] = [];

  if (conditionArg) {
    casesToGenerate = CASES_TO_GENERATE.filter(c => c.conditionId === conditionArg);
  } else if (categoryArg) {
    casesToGenerate = CASES_TO_GENERATE.filter(c => c.category === categoryArg);
  } else {
    casesToGenerate = CASES_TO_GENERATE;
  }

  if (count && count < casesToGenerate.length) {
    casesToGenerate = casesToGenerate.slice(0, count);
  }

  console.log(`\nCases to generate: ${casesToGenerate.length}`);

  if (casesToGenerate.length === 0) {
    console.log('\nNo cases match criteria. Available options:');
    console.log('  --condition <id>  Condition ID (e.g., diabetes-mellitus-2)');
    console.log('  --category <c>    Category (e.g., cardiovascular, endocrino)');
    console.log('  --count <n>       Number of cases');
    console.log('\nAvailable categories:');
    const categories = [...new Set(CASES_TO_GENERATE.map(c => c.category))];
    categories.forEach(cat => {
      const count = CASES_TO_GENERATE.filter(c => c.category === cat).length;
      console.log(`  ${cat}: ${count} cases`);
    });
    return;
  }

  if (dryRun) {
    casesToGenerate.forEach(c => console.log(`  - ${c.id}: ${c.condition} (${c.difficulty})`));
    console.log('\nDry run - no files will be generated.');
    return;
  }

  // Generate cases
  let successCount = 0;

  for (let i = 0; i < casesToGenerate.length; i++) {
    const caseDefn = casesToGenerate[i];

    try {
      await generateClinicalCase(caseDefn, template, provider);
      successCount++;

      // Delay between cases
      if (i < casesToGenerate.length - 1) {
        console.log(`  Waiting ${delay / 1000}s before next case...`);
        await new Promise(r => setTimeout(r, delay));
      }
    } catch (error: any) {
      console.error(`  ❌ Failed for ${caseDefn.id}: ${error.message}`);
    }
  }

  // Generate index file
  await generateIndexFile();

  console.log('\n' + '='.repeat(60));
  console.log(`Generated ${successCount}/${casesToGenerate.length} clinical cases`);
  console.log('='.repeat(60));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
