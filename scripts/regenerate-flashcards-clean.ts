#!/usr/bin/env npx tsx

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const MODULES = [
  'acne', 'alcoolismo', 'alzheimer', 'amamentacao', 'amigdalite', 'anemia-aplastica',
  'anemia-falciforme', 'aneurisma', 'ansiedade', 'apneia-sono', 'apendicite', 'artralgia',
  'artrite-reumatoide', 'asma', 'asma-infantil', 'aterosclerose', 'atonia-intestinal',
  'atresia-esofago', 'autism', 'azoospermia', 'bacteriemia', 'balanite', 'bcg',
  'bexiga-hiperativa', 'blefarite', 'boca-seca', 'bronquiolite', 'bronquite', 'brucellose',
  'cachexia', 'candidiase', 'cancer-bexiga', 'cancer-colorretal', 'cancer-esofago',
  'cancer-estomago', 'cancer-laringe', 'cancer-mama', 'cancer-ovario', 'cancer-pancreas',
  'cancer-prostata', 'cancer-pulmonar', 'cancer-pele', 'cancer-tiroidea', 'cancer-utero',
  'candidíase-oral', 'candidíase-vaginal', 'cannula-nasal', 'carbunculo', 'carcinoma-basocelular',
  'carcinoma-espinocelular', 'cardiopatia-congenita', 'caries-dental', 'cariopse', 'catarata',
  'catarro', 'cefaleia', 'celulite', 'ceratocone', 'cerebe-palesia', 'cervicite',
  'cesariana', 'chafing', 'chagas', 'choque', 'cianose', 'cicatrizes', 'ciencia-politica',
  'cifose', 'cigarros', 'cinomose', 'circuncisao', 'cirrose', 'cistectomia', 'cistinose',
  'cistite', 'citomegalovirus', 'citosina', 'clamidia', 'claudicacao', 'clisma',
  'clostridioides-difficile', 'coagulopatia', 'coalescencia', 'coarctacao-aorta',
  'coccidioidomicose', 'cocegas', 'coceira', 'cocidios', 'cocos', 'cocunas',
  'codigo-genetico', 'coeficiente-correlacao', 'coeloma', 'coeopia', 'coepitope',
  'coercitividade', 'coercitivity', 'coercometer', 'coereba', 'coereba-flaveola',
  'coerfecencia', 'coergencia', 'coerina', 'coerita', 'coeritania', 'coeritania-brasilica'
];

const flashcardsDir = '/home/demetrios/darwin-MFC/lib/data/flashcards';

function toCamelCase(str: string): string {
  return str
    .split('-')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

function validateFlashcard(card: any): boolean {
  return (
    card.id &&
    typeof card.id === 'string' &&
    card.frontKey &&
    typeof card.frontKey === 'string' &&
    card.backKey &&
    typeof card.backKey === 'string'
  );
}

async function generateFlashcardsForModule(moduleId: string, category: string): Promise<void> {
  const prompt = `Generate 25 high-quality medical flashcards for the "${moduleId}" module in Portuguese (pt-BR).

Requirements:
- Each flashcard MUST have: id, frontKey, backKey
- Format as valid TypeScript array with Flashcard[] type
- No descriptions, no extra properties
- IDs: fc-${moduleId}-001 through fc-${moduleId}-025
- Focus on key concepts, definitions, treatments, epidemiology
- Keep text concise (under 150 characters per field)

Output ONLY valid TypeScript code starting with the export statement:

export const ${toCamelCase(moduleId)}Flashcards: Flashcard[] = [
  { id: 'fc-${moduleId}-001', frontKey: 'Question?', backKey: 'Answer.' },
  ...
];`;

  try {
    const result = execSync(
      `echo "${prompt.replace(/"/g, '\\"')}" | llm-offload -t expand -p grok --max-tokens 8000`,
      { encoding: 'utf-8', timeout: 30000 }
    );

    // Parse and validate
    const code = result.trim();

    // Ensure proper syntax
    let cleaned = code;
    cleaned = cleaned.replace(/^```typescript\n?/, '');
    cleaned = cleaned.replace(/\n?```$/, '');
    cleaned = cleaned.replace(/import type.*Flashcard.*;\n?/g, '');

    // Validate it can be executed
    const testCode = `import type { Flashcard } from '@/lib/types/learning';\n${cleaned}`;

    const dir = path.join(flashcardsDir, category);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `${moduleId}.ts`);
    fs.writeFileSync(filePath, `import type { Flashcard } from '@/lib/types/learning';\n\n${cleaned}\n`, 'utf-8');

    console.log(`✓ Generated flashcards for ${moduleId}`);
  } catch (err) {
    console.error(`✗ Error generating ${moduleId}:`, err instanceof Error ? err.message : err);
  }
}

async function main() {
  console.log('Regenerating flashcards with validation...\n');

  const categories = ['cardio', 'endo', 'neuro', 'ortho', 'dermato', 'gastro', 'pulmo', 'renais', 'infeccioso', 'psiquiatrico'];

  for (let i = 0; i < MODULES.length; i++) {
    const module = MODULES[i];
    const category = categories[i % categories.length];

    await generateFlashcardsForModule(module, category);

    // Delay between generations
    if ((i + 1) % 5 === 0) {
      console.log(`Completed ${i + 1}/${MODULES.length} modules, waiting 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log('\nFlashcard generation complete!');
}

main().catch(console.error);
