/**
 * EXTRACT TRANSLATABLE STRINGS FROM MODULES
 * ==========================================
 * 
 * Extracts translatable strings from generated modules for i18n.
 * Creates translation templates for 9 languages.
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Darwin-MFC supported languages
const LANGUAGES = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

interface TranslatableField {
  key: string;
  value: string;
  context: string;
}

interface ModuleTranslations {
  moduleId: string;
  moduleName: string;
  fields: TranslatableField[];
}

/**
 * Extract translatable strings from a module file
 */
async function extractFromModule(filePath: string): Promise<ModuleTranslations | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    
    // Extract module ID from filename
    const moduleId = filePath.split('/').pop()?.replace('.ts', '') || '';
    
    // Parse the module content (simple regex-based extraction)
    const fields: TranslatableField[] = [];
    
    // Extract titulo
    const tituloMatch = content.match(/titulo:\s*['"](.+?)['"]/);
    if (tituloMatch) {
      fields.push({
        key: 'titulo',
        value: tituloMatch[1],
        context: 'Module title'
      });
    }
    
    // Extract descricao
    const descricaoMatch = content.match(/descricao:\s*['"](.+?)['"]/s);
    if (descricaoMatch) {
      fields.push({
        key: 'descricao',
        value: descricaoMatch[1].replace(/\[[\d,\s]+\]/g, ''), // Remove citations
        context: 'Module description'
      });
    }
    
    // Extract SUS indicacao
    const susIndicacaoMatch = content.match(/sus:\s*\{[^}]*indicacao:\s*['"](.+?)['"]/s);
    if (susIndicacaoMatch) {
      fields.push({
        key: 'sus.indicacao',
        value: susIndicacaoMatch[1].replace(/\[[\d,\s]+\]/g, ''),
        context: 'SUS screening indication'
      });
    }
    
    // Extract SUS populacaoAlvo
    const susPopulacaoMatch = content.match(/sus:\s*\{[^}]*populacaoAlvo:\s*['"](.+?)['"]/s);
    if (susPopulacaoMatch) {
      fields.push({
        key: 'sus.populacaoAlvo',
        value: susPopulacaoMatch[1].replace(/\[[\d,\s]+\]/g, ''),
        context: 'SUS target population'
      });
    }
    
    // Extract SUS periodicidade
    const susPeriodicidadeMatch = content.match(/sus:\s*\{[^}]*periodicidade:\s*['"](.+?)['"]/s);
    if (susPeriodicidadeMatch) {
      fields.push({
        key: 'sus.periodicidade',
        value: susPeriodicidadeMatch[1].replace(/\[[\d,\s]+\]/g, ''),
        context: 'SUS screening frequency'
      });
    }
    
    // Extract Medical Societies indicacao
    const socIndicacaoMatch = content.match(/sociedadesMedicas:\s*\{[^}]*indicacao:\s*['"](.+?)['"]/s);
    if (socIndicacaoMatch) {
      fields.push({
        key: 'sociedadesMedicas.indicacao',
        value: socIndicacaoMatch[1].replace(/\[[\d,\s]+\]/g, ''),
        context: 'Medical societies screening indication'
      });
    }
    
    // Extract epidemiology fields
    const prevalenciaMatch = content.match(/prevalencia:\s*['"](.+?)['"]/s);
    if (prevalenciaMatch) {
      fields.push({
        key: 'epidemiologia.prevalencia',
        value: prevalenciaMatch[1].replace(/\[[\d,\s]+\]/g, ''),
        context: 'Prevalence data'
      });
    }
    
    const incidenciaMatch = content.match(/incidencia:\s*['"](.+?)['"]/s);
    if (incidenciaMatch) {
      fields.push({
        key: 'epidemiologia.incidencia',
        value: incidenciaMatch[1].replace(/\[[\d,\s]+\]/g, ''),
        context: 'Incidence data'
      });
    }
    
    const mortalidadeMatch = content.match(/mortalidade:\s*['"](.+?)['"]/s);
    if (mortalidadeMatch) {
      fields.push({
        key: 'epidemiologia.mortalidade',
        value: mortalidadeMatch[1].replace(/\[[\d,\s]+\]/g, ''),
        context: 'Mortality data'
      });
    }
    
    return {
      moduleId,
      moduleName: tituloMatch?.[1] || moduleId,
      fields
    };
  } catch (error) {
    console.error(`Error extracting from ${filePath}:`, error);
    return null;
  }
}

/**
 * Main extraction function
 */
async function extractAllTranslations() {
  console.log('🌍 EXTRACTING TRANSLATABLE STRINGS');
  console.log('='.repeat(80));
  
  const modulesDir = 'lib/content-generation/output/modules';
  const files = await readdir(modulesDir);
  const moduleFiles = files.filter(f => f.endsWith('.ts'));
  
  console.log(`\nFound ${moduleFiles.length} modules\n`);
  
  const allTranslations: ModuleTranslations[] = [];
  
  for (const file of moduleFiles) {
    const filePath = join(modulesDir, file);
    const translations = await extractFromModule(filePath);
    
    if (translations) {
      allTranslations.push(translations);
      console.log(`✅ ${translations.moduleId}: ${translations.fields.length} fields extracted`);
    }
  }
  
  // Create output directory
  await mkdir('lib/content-generation/output/translations', { recursive: true });
  
  // Save extraction results
  await writeFile(
    'lib/content-generation/output/translations/extracted-strings.json',
    JSON.stringify(allTranslations, null, 2)
  );
  
  console.log(`\n💾 Saved to: lib/content-generation/output/translations/extracted-strings.json`);
  console.log(`\n📊 Summary:`);
  console.log(`   Modules: ${allTranslations.length}`);
  console.log(`   Total fields: ${allTranslations.reduce((sum, m) => sum + m.fields.length, 0)}`);
  console.log(`   Languages to translate: ${LANGUAGES.length}`);
  
  console.log('\n✅ Extraction complete!\n');
}

// Run
extractAllTranslations().catch(console.error);

