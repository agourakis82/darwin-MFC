/**
 * INTEGRATE GENERATED MODULES INTO DARWIN-MFC
 * ============================================
 * 
 * Transforms 32 generated modules from content-generation format
 * to Darwin-MFC Rastreamento format and adds to lib/data/rastreamentos.ts
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface GeneratedModule {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  recomendacoes: {
    sus: {
      indicacao: string;
      populacaoAlvo: string;
      periodicidade: string;
      metodos: string[];
      evidencia: string;
      referencias: number[];
    };
    sociedadesMedicas: {
      indicacao: string;
      populacaoAlvo: string;
      periodicidade: string;
      metodos: string[];
      evidencia: string;
      referencias: number[];
    };
    convergencia: string;
  };
  epidemiologia: {
    prevalencia?: string;
    incidencia?: string;
    mortalidade?: string;
    referencias: number[];
  };
  ontologia: {
    cid11: string[];
    snomedCT: string[];
    loinc: string[];
    ciap2: string[];
    atc: string[];
  };
  referencias: Array<{ id: number; citation: string }>;
}

// Map generated categories to Darwin-MFC categories
const CATEGORY_MAP: Record<string, string> = {
  'doenças crônicas não transmissíveis': 'adultos',
  'saúde mental': 'saude_mental',
  'doenças respiratórias': 'adultos',
  'doenças cardiovasculares': 'adultos',
  'doenças neurológicas': 'adultos',
  'doenças dermatológicas': 'outros',
  'doenças musculoesqueléticas': 'adultos',
  'doenças infecciosas': 'infecciosas',
};

function mapCategory(generatedCategory: string): string {
  return CATEGORY_MAP[generatedCategory] || 'outros';
}

function createRefId(moduleId: string, refIndex: number): string {
  return `${moduleId}-ref-${refIndex}`;
}

function transformModule(module: GeneratedModule): string {
  const category = mapCategory(module.categoria);
  
  // Transform references to Citation format
  const refIds = module.referencias.map((ref, idx) => 
    `'${createRefId(module.id, ref.id)}'`
  ).join(', ');

  // Build the Rastreamento object
  const rastreamento = `
  '${module.id}': {
    id: '${module.id}',
    title: '${module.titulo}',
    category: '${category}',
    description: \`${module.descricao.replace(/\[[\d,\s]+\]/g, '')}\`,
    recommendations: {
      sus: {
        population: \`${module.recomendacoes.sus.populacaoAlvo}\`,
        method: \`${module.recomendacoes.sus.metodos.join('; ')}\`,
        periodicity: \`${module.recomendacoes.sus.periodicidade}\`,
        justification: \`${module.recomendacoes.sus.indicacao}\`,
        citations: [${module.recomendacoes.sus.referencias.map(r => `{ refId: '${createRefId(module.id, r)}' }`).join(', ')}]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: \`${module.recomendacoes.sociedadesMedicas.populacaoAlvo}\`,
        method: \`${module.recomendacoes.sociedadesMedicas.metodos.join('; ')}\`,
        periodicity: \`${module.recomendacoes.sociedadesMedicas.periodicidade}\`,
        recommendation: \`${module.recomendacoes.sociedadesMedicas.indicacao}\`,
        citations: [${module.recomendacoes.sociedadesMedicas.referencias.map(r => `{ refId: '${createRefId(module.id, r)}' }`).join(', ')}]
      },
      convergence: {
        status: '${module.recomendacoes.convergencia}',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: '${createRefId(module.id, 1)}' }]
      }
    },
    epidemiology: {
      ${module.epidemiologia.prevalencia ? `prevalence: \`${module.epidemiologia.prevalencia}\`,` : ''}
      ${module.epidemiologia.incidencia ? `incidence: \`${module.epidemiologia.incidencia}\`,` : ''}
      ${module.epidemiologia.mortalidade ? `mortality: \`${module.epidemiologia.mortalidade}\`,` : ''}
      citations: [${module.epidemiologia.referencias.map(r => `{ refId: '${createRefId(module.id, r)}' }`).join(', ')}]
    },
    lastUpdate: '2026-01'
  },`;

  return rastreamento;
}

async function integrateModules() {
  console.log('🔄 INTEGRATING 32 MODULES INTO DARWIN-MFC');
  console.log('='.repeat(80));

  const modulesDir = 'lib/content-generation/output/modules';
  const files = await readdir(modulesDir);
  const moduleFiles = files.filter(f => f.endsWith('.ts'));

  console.log(`\nFound ${moduleFiles.length} modules to integrate...\n`);

  const transformedModules: string[] = [];
  const allReferences: string[] = [];

  for (const file of moduleFiles) {
    const filePath = join(modulesDir, file);
    const content = await readFile(filePath, 'utf-8');
    
    // Parse the module (eval in safe context)
    const moduleData = eval(`(${content})`);
    
    console.log(`✅ ${moduleData.id.padEnd(30)} → ${mapCategory(moduleData.categoria)}`);
    
    // Transform to Darwin-MFC format
    const transformed = transformModule(moduleData);
    transformedModules.push(transformed);

    // Collect references
    for (const ref of moduleData.referencias) {
      const refId = createRefId(moduleData.id, ref.id);
      allReferences.push(`  '${refId}': { citation: \`${ref.citation}\` },`);
    }
  }

  console.log(`\n✅ Transformed ${transformedModules.length} modules`);
  console.log(`✅ Collected ${allReferences.length} references`);

  // Save transformed modules
  const outputPath = 'lib/content-generation/output/darwin-mfc-modules.ts';
  const output = `// AUTO-GENERATED: 32 modules for Darwin-MFC integration
// Generated: ${new Date().toISOString()}

export const newRastreamentos = {
${transformedModules.join('\n')}
};

export const newReferences = {
${allReferences.join('\n')}
};
`;

  await writeFile(outputPath, output);
  console.log(`\n💾 Saved to: ${outputPath}`);
  console.log('\n✅ Integration preparation complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Review darwin-mfc-modules.ts');
  console.log('   2. Manually merge into lib/data/rastreamentos.ts');
  console.log('   3. Add references to lib/data/references.ts');
  console.log('   4. Test with npm run dev');
}

integrateModules().catch(console.error);

