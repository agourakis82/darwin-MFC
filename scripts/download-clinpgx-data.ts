/**
 * ClinPGx Data Download Script using Playwright
 * Downloads ClinPGx data files from the website
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface DownloadFile {
  name: string;
  description: string;
  selector: string;
}

const DOWNLOADS: DownloadFile[] = [
  {
    name: 'summaryAnnotations.zip',
    description: 'Summary Annotations',
    selector: 'a[href*="summaryAnnotations.zip"]',
  },
  {
    name: 'variantAnnotations.zip',
    description: 'Variant Annotations',
    selector: 'a[href*="variantAnnotations.zip"]',
  },
  {
    name: 'relationships.zip',
    description: 'Variant, Gene and Drug Relationships',
    selector: 'a[href*="relationships.zip"]',
  },
  {
    name: 'guidelineAnnotations.json.zip',
    description: 'Clinical Guideline Annotations',
    selector: 'a[href*="guidelineAnnotations.json.zip"]',
  },
  {
    name: 'drugLabels.zip',
    description: 'Drug Label Annotations',
    selector: 'a[href*="drugLabels.zip"]',
  },
  {
    name: 'pathways.json.zip',
    description: 'Pathways (JSON)',
    selector: 'a[href*="pathways.json.zip"]',
  },
  {
    name: 'clinicalVariants.zip',
    description: 'Clinical Variant Data',
    selector: 'a[href*="clinicalVariants.zip"]',
  },
  {
    name: 'genes.zip',
    description: 'Genes',
    selector: 'a[href*="genes.zip"]',
  },
  {
    name: 'variants.zip',
    description: 'Variants',
    selector: 'a[href*="variants.zip"]',
  },
  {
    name: 'drugs.zip',
    description: 'Drugs',
    selector: 'a[href*="drugs.zip"]',
  },
  {
    name: 'chemicals.zip',
    description: 'Chemicals',
    selector: 'a[href*="chemicals.zip"]',
  },
  {
    name: 'phenotypes.zip',
    description: 'Phenotypes',
    selector: 'a[href*="phenotypes.zip"]',
  },
];

async function downloadClinPGxData() {
  console.log('============================================');
  console.log('  ClinPGx Data Download');
  console.log('  Darwin-MFC');
  console.log('============================================');
  console.log('');

  // Create data directory
  const dataDir = path.join(process.cwd(), 'data', 'clinpgx');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  console.log(`✓ Data directory created: ${dataDir}`);
  console.log('');

  // Launch browser
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to downloads page
    console.log('Navigating to ClinPGx downloads page...');
    await page.goto('https://www.pharmgkb.org/data', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait for page to load
    await page.waitForTimeout(5000);

    console.log('Downloading files...');
    console.log('');

    // Download each file
    for (const file of DOWNLOADS) {
      console.log(`Downloading: ${file.description}`);

      try {
        // Find the download link
        const link = await page.$(file.selector);
        if (!link) {
          console.log(`✗ File not found: ${file.name}`);
          continue;
        }

        // Get the URL
        const url = await link.getAttribute('href');
        if (!url) {
          console.log(`✗ URL not found for: ${file.name}`);
          continue;
        }

        // Download the file
        const response = await page.context().request.get(url);
        const filePath = path.join(dataDir, file.name);

        fs.writeFileSync(filePath, await response.body());
        console.log(`✓ Downloaded: ${file.name}`);
      } catch (error) {
        console.log(`✗ Failed to download: ${file.name}`);
        console.log(`  Error: ${error instanceof Error ? error.message : String(error)}`);
      }

      console.log('');
    }

    console.log('');
    console.log('============================================');
    console.log('  Download Complete!');
    console.log('============================================');
    console.log('');
    console.log(`Data location: ${dataDir}`);
    console.log('');
    console.log('Files downloaded:');
    const files = fs.readdirSync(dataDir);
    files.forEach(file => {
      const stats = fs.statSync(path.join(dataDir, file));
      const size = (stats.size / 1024).toFixed(2);
      console.log(`  ${file} (${size} KB)`);
    });
    console.log('');
    console.log('Next steps:');
    console.log('1. Import data into Neo4j:');
    console.log('   npm run sota:import:clinpgx');
    console.log('');
    console.log('2. Import data into Elasticsearch:');
    console.log('   npm run sota:index:clinpgx');
    console.log('');
    console.log('Note: Before using ClinPGx data in production,');
    console.log('please contact feedback@clinpgx.org to ensure');
    console.log('correct interpretation of data.');
    console.log('');

  } catch (error) {
    console.error('Error during download:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

downloadClinPGxData().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
