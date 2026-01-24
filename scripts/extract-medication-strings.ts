/**
 * Extract translatable strings from medications
 * Preserves medical codes (atcCode, snomedCT, etc) and citation markers
 * Output: Flat JSON structure suitable for translation
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
  };
}

// Fields that should NOT be translated
const PROTECTED_FIELDS = [
  'id',
  'atcCode',
  'snomedCT',
  'rxNormCui',
  'anvisaRegistro',
  'cid10',
  'cid11',
  'citations',
];

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
 * Example: { a: { b: { c: 'value' } } } → { 'a.b.c': 'value' }
 */
function flattenObject(obj: any, prefix = ''): Record<string, any> {
  const flattened: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value === null || value === undefined) {
        continue;
      }

      if (typeof value === 'string' || typeof value === 'number') {
        flattened[newKey] = value.toString();
      } else if (Array.isArray(value)) {
        // Handle arrays: medicacao.indicacoes[0], medicacao.indicacoes[1]
        value.forEach((item, index) => {
          if (typeof item === 'string') {
            flattened[`${newKey}[${index}]`] = item;
          } else if (typeof item === 'object') {
            const nested = flattenObject(item, `${newKey}[${index}]`);
            Object.assign(flattened, nested);
          }
        });
      } else if (typeof value === 'object') {
        // Recurse into nested objects
        const nested = flattenObject(value, newKey);
        Object.assign(flattened, nested);
      }
    }
  }

  return flattened;
}

/**
 * Extract translatable and protected fields from medication
 */
export function extractMedicationStrings(medication: any): ExtractionResult {
  const id = medication.id || 'unknown';
  const flattened = flattenObject(medication);

  // Separate translatable from protected
  const translatable: Record<string, string> = {};
  const protected_: Record<string, any> = {};
  let totalCitations = 0;

  for (const [key, value] of Object.entries(flattened)) {
    // Check if field is protected
    const isProtected = PROTECTED_FIELDS.some(pf => key === pf || key.startsWith(`${pf}.`));

    if (isProtected) {
      protected_[key] = value;
    } else if (typeof value === 'string') {
      translatable[key] = value;
      // Count citations
      const citations = extractCitations(value);
      totalCitations += citations.length;
    }
  }

  return {
    id,
    translatable,
    protected: protected_,
    metadata: {
      totalFields: Object.keys(flattened).length,
      translatableFields: Object.keys(translatable).length,
      citationsFound: totalCitations,
    },
  };
}

/**
 * Extract all medications from lib/data/medicamentos/
 */
export async function extractAllMedications(): Promise<ExtractionResult[]> {
  const medicamentosDir = path.join(process.cwd(), 'lib/data/medicamentos');
  const files = await fs.readdir(medicamentosDir);
  const results: ExtractionResult[] = [];

  for (const file of files) {
    if (file.endsWith('.ts') && !file.includes('index')) {
      try {
        // Dynamic import
        const module = await import(path.join(medicamentosDir, file));
        const medications = module.default || module;

        if (Array.isArray(medications)) {
          for (const med of medications) {
            results.push(extractMedicationStrings(med));
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
    totalMedications: results.length,
    totalTranslatableFields: results.reduce((sum, r) => sum + r.metadata.translatableFields, 0),
    medications: results,
  };

  await fs.writeFile(outputPath, JSON.stringify(output, null, 2));
  console.log(`✓ Saved ${results.length} medications to ${outputPath}`);
}

// CLI execution
if (require.main === module) {
  (async () => {
    console.log('🔍 Extracting medication strings...');
    const results = await extractAllMedications();
    console.log(`✓ Extracted ${results.length} medications`);

    const outputPath = path.join(process.cwd(), 'lib/content-generation/extraction/medications.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await saveExtractionResults(results, outputPath);
  })().catch(console.error);
}

export type { ExtractionResult };
