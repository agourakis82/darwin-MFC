/**
 * Fetch Multilingual Translations from Wikidata
 * ==============================================
 *
 * Uses SPARQL queries to get disease and medication names in multiple languages
 * from Wikidata, using ICD-10, SNOMED-CT, and other standard identifiers.
 *
 * Supported languages: pt, en, es, fr, ru, ar, zh, el, hi
 */

import * as fs from 'fs';
import * as path from 'path';

const WIKIDATA_SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';

// Language codes matching Darwin MFC locales
const LANGUAGES = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

interface WikidataResult {
  item: { value: string };
  itemLabel?: { value: string };
  icd10?: { value: string };
  snomedct?: { value: string };
  mesh?: { value: string };
  [key: string]: { value: string } | undefined;
}

interface TranslationEntry {
  id: string;
  translations: Record<string, string>;
  icd10?: string;
  snomedct?: string;
  mesh?: string;
}

/**
 * Execute SPARQL query against Wikidata
 */
async function querySparql(query: string): Promise<WikidataResult[]> {
  const url = `${WIKIDATA_SPARQL_ENDPOINT}?query=${encodeURIComponent(query)}&format=json`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/sparql-results+json',
      'User-Agent': 'Darwin-MFC/1.0 (https://mfc.agourakis.med.br; medical-education)',
    },
  });

  if (!response.ok) {
    throw new Error(`SPARQL query failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.bindings;
}

/**
 * Build SPARQL query for diseases with ICD-10 codes
 */
function buildDiseaseQuery(icd10Codes: string[]): string {
  const icd10Values = icd10Codes.map(code => `"${code}"`).join(' ');
  const langFilter = LANGUAGES.map(l => `"${l}"`).join(', ');

  return `
    SELECT ?item ?icd10 ?snomedct ?mesh ${LANGUAGES.map(l => `?label_${l}`).join(' ')}
    WHERE {
      VALUES ?icd10 { ${icd10Values} }

      ?item wdt:P494 ?icd10 .

      OPTIONAL { ?item wdt:P5806 ?snomedct . }
      OPTIONAL { ?item wdt:P486 ?mesh . }

      ${LANGUAGES.map(l => `
      OPTIONAL { ?item rdfs:label ?label_${l} . FILTER(LANG(?label_${l}) = "${l}") }
      `).join('')}
    }
    LIMIT 500
  `;
}

/**
 * Build SPARQL query for medications by name or ATC code
 */
function buildMedicationQuery(atcCodes: string[]): string {
  const atcValues = atcCodes.map(code => `"${code}"`).join(' ');

  return `
    SELECT ?item ?atc ${LANGUAGES.map(l => `?label_${l}`).join(' ')}
    WHERE {
      VALUES ?atc { ${atcValues} }

      ?item wdt:P267 ?atc .

      ${LANGUAGES.map(l => `
      OPTIONAL { ?item rdfs:label ?label_${l} . FILTER(LANG(?label_${l}) = "${l}") }
      `).join('')}
    }
    LIMIT 500
  `;
}

/**
 * Query Wikidata for diseases by ICD-10 codes in batches
 */
async function fetchDiseaseTranslations(icd10Codes: string[]): Promise<TranslationEntry[]> {
  const results: TranslationEntry[] = [];
  const batchSize = 50;

  console.log(`Fetching translations for ${icd10Codes.length} ICD-10 codes...`);

  for (let i = 0; i < icd10Codes.length; i += batchSize) {
    const batch = icd10Codes.slice(i, i + batchSize);
    console.log(`  Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(icd10Codes.length / batchSize)}...`);

    try {
      const query = buildDiseaseQuery(batch);
      const data = await querySparql(query);

      for (const row of data) {
        const translations: Record<string, string> = {};

        for (const lang of LANGUAGES) {
          const labelKey = `label_${lang}`;
          if (row[labelKey]?.value) {
            translations[lang] = row[labelKey].value;
          }
        }

        if (Object.keys(translations).length > 0) {
          results.push({
            id: row.icd10?.value || '',
            translations,
            icd10: row.icd10?.value,
            snomedct: row.snomedct?.value,
            mesh: row.mesh?.value,
          });
        }
      }

      // Rate limiting - be nice to Wikidata
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`  Error in batch: ${error}`);
    }
  }

  return results;
}

/**
 * Query Wikidata for common diseases (general query)
 */
async function fetchCommonDiseases(): Promise<TranslationEntry[]> {
  console.log('Fetching common diseases from Wikidata...');

  const query = `
    SELECT ?item ?icd10 ?snomedct ${LANGUAGES.map(l => `?label_${l}`).join(' ')}
    WHERE {
      ?item wdt:P31 wd:Q12136 .  # instance of disease
      ?item wdt:P494 ?icd10 .    # has ICD-10 code

      OPTIONAL { ?item wdt:P5806 ?snomedct . }

      ${LANGUAGES.map(l => `
      OPTIONAL { ?item rdfs:label ?label_${l} . FILTER(LANG(?label_${l}) = "${l}") }
      `).join('')}
    }
    LIMIT 1000
  `;

  const results: TranslationEntry[] = [];

  try {
    const data = await querySparql(query);
    console.log(`  Found ${data.length} diseases`);

    for (const row of data) {
      const translations: Record<string, string> = {};

      for (const lang of LANGUAGES) {
        const labelKey = `label_${lang}`;
        if (row[labelKey]?.value) {
          translations[lang] = row[labelKey].value;
        }
      }

      if (Object.keys(translations).length > 0 && row.icd10?.value) {
        results.push({
          id: row.icd10.value,
          translations,
          icd10: row.icd10.value,
          snomedct: row.snomedct?.value,
        });
      }
    }
  } catch (error) {
    console.error(`Error fetching common diseases: ${error}`);
  }

  return results;
}

/**
 * Query Wikidata for common medications
 */
async function fetchCommonMedications(): Promise<TranslationEntry[]> {
  console.log('Fetching common medications from Wikidata...');

  const query = `
    SELECT ?item ?atc ?rxcui ${LANGUAGES.map(l => `?label_${l}`).join(' ')}
    WHERE {
      ?item wdt:P31 wd:Q12140 .  # instance of medication
      ?item wdt:P267 ?atc .      # has ATC code

      OPTIONAL { ?item wdt:P3345 ?rxcui . }

      ${LANGUAGES.map(l => `
      OPTIONAL { ?item rdfs:label ?label_${l} . FILTER(LANG(?label_${l}) = "${l}") }
      `).join('')}
    }
    LIMIT 1000
  `;

  const results: TranslationEntry[] = [];

  try {
    const data = await querySparql(query);
    console.log(`  Found ${data.length} medications`);

    for (const row of data) {
      const translations: Record<string, string> = {};

      for (const lang of LANGUAGES) {
        const labelKey = `label_${lang}`;
        if (row[labelKey]?.value) {
          translations[lang] = row[labelKey].value;
        }
      }

      if (Object.keys(translations).length > 0 && row.atc?.value) {
        results.push({
          id: row.atc.value,
          translations,
        });
      }
    }
  } catch (error) {
    console.error(`Error fetching common medications: ${error}`);
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Wikidata Multilingual Medical Terms Fetcher');
  console.log('='.repeat(60));
  console.log(`Languages: ${LANGUAGES.join(', ')}`);
  console.log('');

  // Fetch diseases
  const diseases = await fetchCommonDiseases();
  console.log(`\nTotal diseases with translations: ${diseases.length}`);

  // Fetch medications
  const medications = await fetchCommonMedications();
  console.log(`\nTotal medications with translations: ${medications.length}`);

  // Save results
  const outputDir = path.join(__dirname, '..', 'lib', 'data', 'translations');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save disease translations
  const diseaseMap: Record<string, Record<string, string>> = {};
  for (const d of diseases) {
    if (d.icd10) {
      diseaseMap[d.icd10] = d.translations;
    }
  }
  fs.writeFileSync(
    path.join(outputDir, 'diseases-icd10.json'),
    JSON.stringify(diseaseMap, null, 2)
  );
  console.log(`\nSaved disease translations to ${outputDir}/diseases-icd10.json`);

  // Save medication translations
  const medMap: Record<string, Record<string, string>> = {};
  for (const m of medications) {
    medMap[m.id] = m.translations;
  }
  fs.writeFileSync(
    path.join(outputDir, 'medications-atc.json'),
    JSON.stringify(medMap, null, 2)
  );
  console.log(`Saved medication translations to ${outputDir}/medications-atc.json`);

  // Generate per-locale files for easier loading
  for (const lang of LANGUAGES) {
    const localeData = {
      diseases: {} as Record<string, string>,
      medications: {} as Record<string, string>,
    };

    for (const [icd10, trans] of Object.entries(diseaseMap)) {
      if (trans[lang]) {
        localeData.diseases[icd10] = trans[lang];
      }
    }

    for (const [atc, trans] of Object.entries(medMap)) {
      if (trans[lang]) {
        localeData.medications[atc] = trans[lang];
      }
    }

    fs.writeFileSync(
      path.join(outputDir, `${lang}.json`),
      JSON.stringify(localeData, null, 2)
    );
    console.log(`Saved ${lang}.json (${Object.keys(localeData.diseases).length} diseases, ${Object.keys(localeData.medications).length} medications)`);
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);
