/**
 * Extract translatable strings from diseases
 * Two-pass: QuickView first (lighter), then full content
 * Preserves medical codes and critical fields like redFlags
 */

import fs from 'fs/promises';
import path from 'path';

interface ExtractionResult {
  id: string;
  translatable: Record<string, string>;
  protected: Record<string, any>;
  metadata: {
    totalFields: number;
    translatableFields: number;
    citationsFound: number;
    quickViewExtracted: boolean;
    fullContentExtracted: boolean;
  };
}

// Fields that should NOT be translated (medical codes, references, etc)
const PROTECTED_FIELDS = [
  'id',
  'cid10',
  'cid11',
  'snomedCT',
  'loincCodes',
  'icd10',
  'ciap2',
  'citations',
  'references',
];

// Fields that are safety-critical and need careful translation
const CRITICAL_FIELDS = ['redFlags', 'contraIndicacoes', 'efectosAdversos'];

/**
 * Extract citations from text (preserves [1,2,3] markers)
 */
function extractCitations(text: string | undefined): string[] {
  if (!text) return [];
  const matches = text.match(/\[\d+(,\s*\d+)*\]/g) || [];
  return matches;
}

/**
 * Flatten nested object with dot notation
 */
function flattenObject(obj: any, prefix = ''): Record<string, any> {
  const flattened: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string' || typeof value === 'number') {
        flattened[newKey] = value.toString();
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'string') {
            flattened[`${newKey}[${index}]`] = item;
          } else if (typeof item === 'object') {
            const nested = flattenObject(item, `${newKey}[${index}]`);
            Object.assign(flattened, nested);
          }
        });
      } else if (typeof value === 'object') {
        const nested = flattenObject(value, newKey);
        Object.assign(flattened, nested);
      }
    }
  }

  return flattened;
}

/**
 * Extract translatable and protected fields from disease
 * Two-pass approach: QuickView first, then full content
 */
export function extractDiseaseStrings(disease: any): ExtractionResult {
  const id = disease.id || 'unknown';

  // PASS 1: Extract QuickView (lightweight content)
  const quickView = disease.quickView || {};
  const quickViewFlattened = flattenObject(quickView);
  let translatableFromQuick: Record<string, string> = {};
  let protectedFromQuick: Record<string, any> = {};
  let citationsFromQuick = 0;

  for (const [key, value] of Object.entries(quickViewFlattened)) {
    const fullKey = `quickView.${key}`;
    const isProtected = PROTECTED_FIELDS.some(pf => key === pf || key.startsWith(`${pf}.`));

    if (isProtected) {
      protectedFromQuick[fullKey] = value;
    } else if (typeof value === 'string') {
      translatableFromQuick[fullKey] = value;
      citationsFromQuick += extractCitations(value).length;
    }
  }

  // PASS 2: Extract full content (excluding quickView to avoid duplication)
  const fullContent = { ...disease };
  delete (fullContent as any).quickView;

  const fullFlattened = flattenObject(fullContent);
  let translatableFromFull: Record<string, string> = {};
  let protectedFromFull: Record<string, any> = {};
  let citationsFromFull = 0;

  for (const [key, value] of Object.entries(fullFlattened)) {
    const isProtected = PROTECTED_FIELDS.some(pf => key === pf || key.startsWith(`${pf}.`));

    if (isProtected) {
      protectedFromFull[key] = value;
    } else if (typeof value === 'string') {
      translatableFromFull[key] = value;
      citationsFromFull += extractCitations(value).length;
    }
  }

  // Merge results (full content takes precedence for overlaps)
  const translatable = { ...translatableFromQuick, ...translatableFromFull };
  const protected_ = { ...protectedFromQuick, ...protectedFromFull };

  return {
    id,
    translatable,
    protected: protected_,
    metadata: {
      totalFields: Object.keys(quickViewFlattened).length + Object.keys(fullFlattened).length,
      translatableFields: Object.keys(translatable).length,
      citationsFound: citationsFromQuick + citationsFromFull,
      quickViewExtracted: Object.keys(translatableFromQuick).length > 0,
      fullContentExtracted: Object.keys(translatableFromFull).length > 0,
    },
  };
}

/**
 * Extract all diseases from lib/data/doencas/
 */
export async function extractAllDiseases(): Promise<ExtractionResult[]> {
  const doencasDir = path.join(process.cwd(), 'lib/data/doencas');
  const files = await fs.readdir(doencasDir);
  const results: ExtractionResult[] = [];

  for (const file of files) {
    if (file.endsWith('.ts') && !file.includes('index')) {
      try {
        const module = await import(path.join(doencasDir, file));
        const diseases = module.default || module;

        if (Array.isArray(diseases)) {
          for (const disease of diseases) {
            results.push(extractDiseaseStrings(disease));
          }
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  }

  return results;
}

/**
 * Save extraction results to JSON
 */
export async function saveExtractionResults(
  results: ExtractionResult[],
  outputPath: string
): Promise<void> {
  const output = {
    timestamp: new Date().toISOString(),
    totalDiseases: results.length,
    totalTranslatableFields: results.reduce((sum, r) => sum + r.metadata.translatableFields, 0),
    diseases: results,
  };

  await fs.writeFile(outputPath, JSON.stringify(output, null, 2));
  console.log(`✓ Saved ${results.length} diseases to ${outputPath}`);
}

// CLI execution
if (require.main === module) {
  (async () => {
    console.log('🔍 Extracting disease strings (two-pass)...');
    const results = await extractAllDiseases();
    console.log(`✓ Extracted ${results.length} diseases`);

    const outputPath = path.join(process.cwd(), 'lib/content-generation/extraction/diseases.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await saveExtractionResults(results, outputPath);
  })().catch(console.error);
}

export type { ExtractionResult };
