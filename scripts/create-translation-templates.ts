/**
 * CREATE TRANSLATION TEMPLATES
 * =============================
 * 
 * Creates CSV/JSON templates for manual or external translation.
 * Can be imported into Google Sheets, Crowdin, or other translation tools.
 */

import { readFile, writeFile, mkdir } from 'fs/promises';

const TARGET_LANGUAGES = ['en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

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

/**
 * Create CSV template for translation
 */
function createCSVTemplate(modules: ModuleTranslations[]): string {
  const headers = ['Module ID', 'Module Name', 'Field Key', 'Context', 'Portuguese (Source)', ...TARGET_LANGUAGES.map(l => l.toUpperCase())];
  const rows = [headers.join(',')];

  for (const module of modules) {
    for (const field of module.fields) {
      const row = [
        module.moduleId,
        `"${module.moduleName}"`,
        field.key,
        `"${field.context}"`,
        `"${field.value.replace(/"/g, '""')}"`, // Escape quotes
        ...TARGET_LANGUAGES.map(() => '""'), // Empty columns for translations
      ];
      rows.push(row.join(','));
    }
  }

  return rows.join('\n');
}

/**
 * Create JSON template for translation
 */
function createJSONTemplate(modules: ModuleTranslations[]) {
  const template: Record<string, any> = {};

  for (const lang of ['pt', ...TARGET_LANGUAGES]) {
    template[lang] = {};

    for (const module of modules) {
      template[lang][module.moduleId] = {};

      for (const field of module.fields) {
        // For Portuguese, use the source value
        // For others, use empty string as placeholder
        template[lang][module.moduleId][field.key] = lang === 'pt' ? field.value : '';
      }
    }
  }

  return template;
}

/**
 * Create next-intl compatible structure
 */
function createNextIntlTemplate(modules: ModuleTranslations[]) {
  const template: Record<string, any> = {};

  for (const lang of ['pt', ...TARGET_LANGUAGES]) {
    template[lang] = {
      protocols: {},
    };

    for (const module of modules) {
      const moduleData: Record<string, any> = {};

      for (const field of module.fields) {
        // Parse nested keys (e.g., "sus.indicacao" -> { sus: { indicacao: "..." } })
        const keys = field.key.split('.');
        let current = moduleData;

        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = lang === 'pt' ? field.value : `[TO TRANSLATE: ${field.context}]`;
      }

      template[lang].protocols[module.moduleId] = moduleData;
    }
  }

  return template;
}

/**
 * Create markdown documentation for translators
 */
function createTranslationGuide(modules: ModuleTranslations[]): string {
  return `# Translation Guide for Darwin-MFC Medical Modules

## Overview

This guide contains ${modules.length} medical screening modules that need translation from Portuguese to 8 languages:
- English (en)
- Spanish (es)
- French (fr)
- Russian (ru)
- Arabic (ar)
- Chinese (zh)
- Greek (el)
- Hindi (hi)

## Translation Guidelines

### Medical Accuracy
- Maintain medical terminology accuracy
- Use standard medical abbreviations for each language
- Consult medical dictionaries when needed

### Organization Names
- Keep official organization names in original language or use official translated names
- Examples:
  - "Ministério da Saúde" → "Ministry of Health" (EN) / "Ministerio de Salud" (ES)
  - "SUS" → Keep as "SUS" with explanation in parentheses
  - "WHO" → Keep as "WHO" or use local equivalent (OMS in Spanish/French)

### Numerical Data
- Preserve all numbers exactly as in source
- Adapt percentage/decimal formats to target locale if needed

### Tone
- Maintain formal, academic tone
- Use third person
- Be precise and concise

## Field Types

Each module contains 9 fields:

1. **titulo** - Module title
2. **descricao** - Module description (2-3 sentences)
3. **sus.indicacao** - SUS screening indication
4. **sus.populacaoAlvo** - Target population for SUS
5. **sus.periodicidade** - Screening frequency for SUS
6. **sociedadesMedicas.indicacao** - Medical societies' recommendations
7. **epidemiologia.prevalencia** - Prevalence data
8. **epidemiologia.incidencia** - Incidence data
9. **epidemiologia.mortalidade** - Mortality data

## Modules to Translate

${modules.map((m, i) => `${i + 1}. **${m.moduleId}** - ${m.moduleName}`).join('\n')}

## Translation Workflow

### Option 1: CSV Template
1. Open \`translation-template.csv\` in Google Sheets or Excel
2. Fill in the empty language columns
3. Export as CSV when complete

### Option 2: JSON Template
1. Open \`translation-template.json\`
2. Fill in empty strings for each language
3. Validate JSON syntax before saving

### Option 3: next-intl Format
1. Open \`next-intl-template.json\`
2. Replace \`[TO TRANSLATE: ...]\` placeholders with translations
3. This format can be directly integrated into Darwin-MFC

## Quality Checklist

- [ ] All medical terms are accurate
- [ ] Organization names are properly handled
- [ ] Numbers and statistics are preserved
- [ ] Tone is formal and academic
- [ ] No machine translation artifacts
- [ ] Citations references [1,2,3] are preserved (if any remain)
- [ ] Special characters are properly encoded (especially for ar, zh, el, hi, ru)

## Contact

For questions about medical terminology or context, please refer to the original Portuguese modules in:
\`lib/content-generation/output/modules/\`
`;
}

/**
 * Main function
 */
async function createTemplates() {
  console.log('📝 CREATING TRANSLATION TEMPLATES');
  console.log('='.repeat(80));

  // Load extracted strings
  const extractedPath = 'lib/content-generation/output/translations/extracted-strings.json';
  const extractedData = await readFile(extractedPath, 'utf-8');
  const modules: ModuleTranslations[] = JSON.parse(extractedData);

  console.log(`\nLoaded ${modules.length} modules`);
  console.log(`Total fields: ${modules.reduce((sum, m) => sum + m.fields.length, 0)}`);
  console.log(`Target languages: ${TARGET_LANGUAGES.length}\n`);

  // Create output directory
  await mkdir('lib/content-generation/output/translations', { recursive: true });

  // Create CSV template
  console.log('📄 Creating CSV template...');
  const csv = createCSVTemplate(modules);
  await writeFile('lib/content-generation/output/translations/translation-template.csv', csv);
  console.log('   ✅ translation-template.csv');

  // Create JSON template
  console.log('📄 Creating JSON template...');
  const json = createJSONTemplate(modules);
  await writeFile('lib/content-generation/output/translations/translation-template.json', JSON.stringify(json, null, 2));
  console.log('   ✅ translation-template.json');

  // Create next-intl template
  console.log('📄 Creating next-intl template...');
  const nextIntl = createNextIntlTemplate(modules);
  await writeFile('lib/content-generation/output/translations/next-intl-template.json', JSON.stringify(nextIntl, null, 2));
  console.log('   ✅ next-intl-template.json');

  // Create translation guide
  console.log('📄 Creating translation guide...');
  const guide = createTranslationGuide(modules);
  await writeFile('lib/content-generation/output/translations/TRANSLATION_GUIDE.md', guide);
  console.log('   ✅ TRANSLATION_GUIDE.md');

  console.log('\n📊 Summary:');
  console.log(`   Modules: ${modules.length}`);
  console.log(`   Fields per module: 9`);
  console.log(`   Total translation units: ${modules.length * 9}`);
  console.log(`   Languages: ${TARGET_LANGUAGES.length}`);
  console.log(`   Total translations needed: ${modules.length * 9 * TARGET_LANGUAGES.length}`);

  console.log('\n✅ Templates created successfully!\n');
  console.log('📁 Output directory: lib/content-generation/output/translations/\n');
}

// Run
createTemplates().catch(console.error);

