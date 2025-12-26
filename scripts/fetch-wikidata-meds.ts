/**
 * Fetch Medication Translations from Wikidata using our ATC codes
 * ================================================================
 */

import * as fs from 'fs';
import * as path from 'path';

const WIKIDATA_SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';
const LANGUAGES = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

// Common ATC codes from our medication database (extracted manually)
const ATC_CODES = [
  // Anti-hypertensives
  'C09CA01', // losartan
  'C09AA02', // enalapril
  'C08CA01', // amlodipine
  'C03AA03', // hydrochlorothiazide
  'C07AB02', // metoprolol
  'C07AB03', // atenolol
  'C09AA05', // ramipril
  'C09CA04', // irbesartan
  'C09CA06', // candesartan
  'C09CA03', // valsartan
  'C08CA05', // nifedipine
  'C02AC01', // clonidine
  // Antidiabetics
  'A10BA02', // metformin
  'A10BB01', // glibenclamide
  'A10BB09', // gliclazide
  'A10BH01', // sitagliptin
  'A10BK01', // dapagliflozin
  'A10BK03', // empagliflozin
  'A10AE04', // insulin glargine
  // Statins
  'C10AA01', // simvastatin
  'C10AA05', // atorvastatin
  'C10AA07', // rosuvastatin
  // Antidepressants
  'N06AB06', // sertraline
  'N06AB04', // citalopram
  'N06AB05', // paroxetine
  'N06AB10', // escitalopram
  'N06AX16', // venlafaxine
  'N06AX21', // duloxetine
  'N06AA04', // clomipramine
  'N06AA09', // amitriptyline
  // Anxiolytics/Hypnotics
  'N05BA01', // diazepam
  'N05BA06', // lorazepam
  'N05BA12', // alprazolam
  'N05CD08', // midazolam
  'N05CF01', // zopiclone
  'N05CF02', // zolpidem
  // Antipsychotics
  'N05AH03', // olanzapine
  'N05AH04', // quetiapine
  'N05AX08', // risperidone
  'N05AX12', // aripiprazole
  'N05AA01', // chlorpromazine
  'N05AD01', // haloperidol
  // Anticonvulsants
  'N03AB02', // phenytoin
  'N03AF01', // carbamazepine
  'N03AX09', // lamotrigine
  'N03AX14', // levetiracetam
  'N03AG01', // valproic acid
  // Antibiotics
  'J01CA04', // amoxicillin
  'J01CR02', // amoxicillin/clavulanate
  'J01FA10', // azithromycin
  'J01MA02', // ciprofloxacin
  'J01MA12', // levofloxacin
  'J01DC02', // cefuroxime
  'J01DD04', // ceftriaxone
  'J01XD01', // metronidazole
  'J01EE01', // sulfamethoxazole/trimethoprim
  'J01AA02', // doxycycline
  // Analgesics/Anti-inflammatories
  'N02BE01', // paracetamol
  'M01AE01', // ibuprofen
  'M01AE02', // naproxen
  'M01AB05', // diclofenac
  'N02AX02', // tramadol
  'N02AA01', // morphine
  'N02AA05', // oxycodone
  // Corticosteroids
  'H02AB06', // prednisolone
  'H02AB07', // prednisone
  'H02AB09', // hydrocortisone
  'H02AB02', // dexamethasone
  // Respiratory
  'R03AC02', // salbutamol
  'R03BA01', // beclomethasone
  'R03BA02', // budesonide
  'R03BB04', // tiotropium
  'R03AK06', // salmeterol/fluticasone
  // GI
  'A02BC01', // omeprazole
  'A02BC02', // pantoprazole
  'A02BC05', // esomeprazole
  'A03FA01', // metoclopramide
  'A04AA01', // ondansetron
  // Thyroid
  'H03AA01', // levothyroxine
  'H03BB01', // carbimazole
  // Anticoagulants
  'B01AA03', // warfarin
  'B01AF01', // rivaroxaban
  'B01AF02', // apixaban
  'B01AC06', // aspirin
  'B01AC04', // clopidogrel
  // Others
  'G04CA02', // tamsulosin
  'M04AA01', // allopurinol
  'M05BA04', // alendronic acid
  'V03AB15', // naloxone
];

interface WikidataResult {
  item: { value: string };
  atc: { value: string };
  [key: string]: { value: string } | undefined;
}

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

async function fetchMedicationsByAtc(atcCodes: string[]): Promise<Record<string, Record<string, string>>> {
  const results: Record<string, Record<string, string>> = {};
  const batchSize = 25;

  console.log(`Fetching translations for ${atcCodes.length} ATC codes...`);

  for (let i = 0; i < atcCodes.length; i += batchSize) {
    const batch = atcCodes.slice(i, i + batchSize);
    console.log(`  Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(atcCodes.length / batchSize)}...`);

    const atcValues = batch.map(code => `"${code}"`).join(' ');

    const query = `
      SELECT ?item ?atc ${LANGUAGES.map(l => `?label_${l}`).join(' ')}
      WHERE {
        VALUES ?atc { ${atcValues} }
        ?item wdt:P267 ?atc .
        ${LANGUAGES.map(l => `
        OPTIONAL { ?item rdfs:label ?label_${l} . FILTER(LANG(?label_${l}) = "${l}") }
        `).join('')}
      }
    `;

    try {
      const data = await querySparql(query);

      for (const row of data) {
        const atc = row.atc?.value;
        if (!atc) continue;

        const translations: Record<string, string> = {};
        for (const lang of LANGUAGES) {
          const labelKey = `label_${lang}`;
          if (row[labelKey]?.value) {
            translations[lang] = row[labelKey].value;
          }
        }

        if (Object.keys(translations).length > 0) {
          results[atc] = translations;
        }
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`  Error in batch: ${error}`);
    }
  }

  return results;
}

async function main() {
  console.log('='.repeat(60));
  console.log('Wikidata Medication Translations Fetcher');
  console.log('='.repeat(60));

  // Fetch translations
  const newTranslations = await fetchMedicationsByAtc(ATC_CODES);
  console.log(`\nFetched ${Object.keys(newTranslations).length} medications from Wikidata`);

  // Load existing translations
  const existingPath = path.join(process.cwd(), 'lib/data/translations/medications-atc.json');
  let existing: Record<string, Record<string, string>> = {};
  if (fs.existsSync(existingPath)) {
    existing = JSON.parse(fs.readFileSync(existingPath, 'utf-8'));
  }

  // Merge translations (new ones take precedence)
  const merged = { ...existing, ...newTranslations };
  console.log(`Total medications: ${Object.keys(merged).length}`);

  // Save merged translations
  fs.writeFileSync(existingPath, JSON.stringify(merged, null, 2));
  console.log(`Saved to ${existingPath}`);

  // Update per-locale files
  const translationsDir = path.join(process.cwd(), 'lib/data/translations');
  for (const lang of LANGUAGES) {
    const localePath = path.join(translationsDir, `${lang}.json`);
    const localeData = JSON.parse(fs.readFileSync(localePath, 'utf-8'));

    for (const [atc, trans] of Object.entries(merged)) {
      if (trans[lang]) {
        localeData.medications[atc] = trans[lang];
      }
    }

    fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2));
    console.log(`Updated ${lang}.json (${Object.keys(localeData.medications).length} medications)`);
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);
