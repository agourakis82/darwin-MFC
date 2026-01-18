/**
 * Academic Reference Export - Usage Examples
 * Demonstrates practical use cases for the academic integration module
 */

import { Reference } from '@/lib/types/references';
import {
  exportToRIS,
  exportToBibTeX,
  exportToJSONString,
  resolveDOI,
  resolvePMID,
  resolveDOIBatch,
  isValidDOI,
  isValidPMID,
  downloadRISFile,
} from './index';

/**
 * Example 1: Export a single reference to RIS format
 */
export async function example1_ExportSingleReferenceToRIS(reference: Reference): Promise<void> {
  console.log('Example 1: Export single reference to RIS');

  const risContent = exportToRIS([reference]);

  console.log('RIS Content:');
  console.log(risContent);

  // In a browser context, this would trigger a download
  // downloadRISFile([reference], 'my-reference.ris');
}

/**
 * Example 2: Export multiple references to BibTeX format
 */
export async function example2_ExportMultipleToBibTeX(references: Reference[]): Promise<void> {
  console.log('Example 2: Export multiple references to BibTeX');

  const bibTexContent = exportToBibTeX(references);

  console.log('BibTeX Content:');
  console.log(bibTexContent);

  // In practical use:
  // downloadBibTeXFile(references, 'references.bib');
}

/**
 * Example 3: Resolve a DOI to get full citation metadata
 */
export async function example3_ResolveDOIToCitation(): Promise<void> {
  console.log('Example 3: Resolve DOI to citation');

  const doi = '10.1001/jama.2023.9297'; // USPSTF Depression Screening

  // Validate DOI format first
  if (!isValidDOI(doi)) {
    console.error('Invalid DOI format');
    return;
  }

  try {
    const citation = await resolveDOI(doi);

    if (citation) {
      console.log('Resolved Citation:');
      console.log({
        title: citation.title,
        authors: citation.authors,
        journal: citation.journal,
        year: citation.year,
        volume: citation.volume,
        pages: citation.pages,
        doi: citation.doi,
        url: citation.doi_url || citation.url,
      });
    } else {
      console.warn('Could not resolve DOI');
    }
  } catch (error) {
    console.error('Error resolving DOI:', error);
  }
}

/**
 * Example 4: Resolve a PubMed ID to get full citation metadata
 */
export async function example4_ResolvePubMedIdToCitation(): Promise<void> {
  console.log('Example 4: Resolve PubMed ID to citation');

  const pmid = '25176015'; // McMurray et al. PARADIGM-HF study

  // Validate PMID format first
  if (!isValidPMID(pmid)) {
    console.error('Invalid PMID format');
    return;
  }

  try {
    const citation = await resolvePMID(pmid);

    if (citation) {
      console.log('Resolved Citation:');
      console.log({
        title: citation.title,
        authors: citation.authors,
        journal: citation.journal,
        year: citation.year,
        volume: citation.volume,
        pages: citation.pages,
        pmid: citation.pmid,
        url: citation.url,
      });
    } else {
      console.warn('Could not resolve PMID');
    }
  } catch (error) {
    console.error('Error resolving PMID:', error);
  }
}

/**
 * Example 5: Batch resolve multiple DOIs
 */
export async function example5_BatchResolveDOIs(): Promise<void> {
  console.log('Example 5: Batch resolve multiple DOIs');

  const dois = [
    '10.1001/jama.2023.9297', // Depression screening
    '10.36660/abc.20210062', // Heart failure guideline
    '10.1590/1677-5449.202200871', // Diabetic foot
  ];

  console.log(`Resolving ${dois.length} DOIs...`);

  try {
    const citations = await resolveDOIBatch(dois);

    citations.forEach((citation, index) => {
      if (citation) {
        console.log(`[${index + 1}] ${citation.title}`);
        console.log(`    Authors: ${citation.authors?.slice(0, 2).join(', ')}${citation.authors?.length ?? 0 > 2 ? ' et al.' : ''}`);
        console.log(`    Journal: ${citation.journal}, ${citation.year}`);
      } else {
        console.warn(`[${index + 1}] Resolution failed for ${dois[index]}`);
      }
    });
  } catch (error) {
    console.error('Error during batch resolution:', error);
  }
}

/**
 * Example 6: Export to JSON format with metadata
 */
export async function example6_ExportToJSONWithMetadata(references: Reference[]): Promise<void> {
  console.log('Example 6: Export to JSON with metadata');

  const jsonContent = exportToJSONString(references, true);
  const jsonData = JSON.parse(jsonContent);

  console.log('Export Metadata:');
  console.log(jsonData.metadata);

  console.log('\nReferences:');
  jsonData.references.forEach((ref: any, index: number) => {
    console.log(`${index + 1}. ${ref.title}`);
    console.log(`   Type: ${ref.type}, Year: ${ref.year}`);
  });
}

/**
 * Example 7: Export clinical screening references for a bibliography
 */
export async function example7_ExportClinicalScreeningBibliography(
  screeningReferences: Reference[]
): Promise<void> {
  console.log('Example 7: Export clinical screening bibliography');

  // Separate by reference type
  const byType = screeningReferences.reduce(
    (acc, ref) => {
      if (!acc[ref.type]) acc[ref.type] = [];
      acc[ref.type].push(ref);
      return acc;
    },
    {} as Record<string, Reference[]>
  );

  // Generate RIS format for Zotero/Mendeley import
  const risContent = exportToRIS(screeningReferences);

  console.log('Bibliography Summary:');
  console.log(`Total references: ${screeningReferences.length}`);
  console.log('\nBy type:');

  Object.entries(byType).forEach(([type, refs]) => {
    console.log(`  ${type}: ${refs.length}`);
  });

  console.log('\nRIS export ready for import into citation manager');
  console.log(`First 500 characters:\n${risContent.substring(0, 500)}`);
}

/**
 * Example 8: Workflow - Update reference with resolved metadata
 */
export async function example8_UpdateReferenceWithResolvedMetadata(
  reference: Reference & { doi?: string; pmid?: string }
): Promise<Reference | null> {
  console.log('Example 8: Update reference with resolved metadata');

  try {
    // Try to resolve using DOI first
    if (reference.doi && isValidDOI(reference.doi)) {
      console.log('Resolving via DOI...');
      const resolved = await resolveDOI(reference.doi);

      if (resolved) {
        console.log('Successfully resolved reference:');
        console.log({
          title: resolved.title,
          authors: resolved.authors,
          journal: resolved.journal,
          year: resolved.year,
          pages: resolved.pages,
        });

        // Merge resolved data with existing reference
        return {
          ...reference,
          title: resolved.title || reference.title,
          authors: resolved.authors || reference.authors,
          journal: resolved.journal || reference.journal,
          year: resolved.year || reference.year,
          pages: resolved.pages || reference.pages,
        };
      }
    }

    // Fallback to PMID if DOI resolution failed
    if (reference.pmid && isValidPMID(reference.pmid)) {
      console.log('Resolving via PMID...');
      const resolved = await resolvePMID(reference.pmid);

      if (resolved) {
        console.log('Successfully resolved reference:');
        console.log({
          title: resolved.title,
          authors: resolved.authors,
          journal: resolved.journal,
          year: resolved.year,
        });

        return {
          ...reference,
          title: resolved.title || reference.title,
          authors: resolved.authors || reference.authors,
          journal: resolved.journal || reference.journal,
          year: resolved.year || reference.year,
        };
      }
    }

    console.warn('Could not resolve reference metadata');
    return null;
  } catch (error) {
    console.error('Error updating reference:', error);
    return null;
  }
}

/**
 * Example 9: Format export for different academic systems
 */
export async function example9_ExportForDifferentSystems(
  references: Reference[]
): Promise<void> {
  console.log('Example 9: Export for different academic systems');

  const systems = [
    { name: 'Zotero', format: 'ris' },
    { name: 'Mendeley', format: 'ris' },
    { name: 'LaTeX/Overleaf', format: 'bibtex' },
    { name: 'EndNote', format: 'endnote' },
    { name: 'Custom API', format: 'json' },
  ];

  console.log('Available export options:');
  systems.forEach(({ name, format }) => {
    console.log(`  ${name}: ${format.toUpperCase()} format`);
  });

  // Example: Export for LaTeX
  console.log('\nExporting for LaTeX/Overleaf...');
  const bibTexContent = exportToBibTeX(references);
  console.log(`Generated ${references.length} BibTeX entries`);
  console.log(`First entry:\n${bibTexContent.split('\n').slice(0, 8).join('\n')}`);
}

/**
 * Example 10: Validation and error handling
 */
export async function example10_ValidationAndErrorHandling(): Promise<void> {
  console.log('Example 10: Validation and error handling');

  // Test invalid DOI
  console.log('Testing invalid DOI...');
  if (!isValidDOI('invalid-doi')) {
    console.log('✓ Invalid DOI correctly identified');
  }

  // Test valid DOI format but non-existent DOI
  console.log('\nTesting non-existent DOI...');
  const result = await resolveDOI('10.9999/fake-doi-9999');
  if (!result) {
    console.log('✓ Non-existent DOI handled gracefully');
  }

  // Test invalid PMID
  console.log('\nTesting invalid PMID...');
  if (!isValidPMID('not-a-number')) {
    console.log('✓ Invalid PMID correctly identified');
  }

  // Test valid PMID format but non-existent PMID
  console.log('\nTesting non-existent PMID...');
  const pmidResult = await resolvePMID('999999999');
  if (!pmidResult) {
    console.log('✓ Non-existent PMID handled gracefully');
  }
}

/**
 * Example 11: Generate standardized export filenames
 */
export function example11_GenerateStandardizedExportFilenames(): void {
  console.log('Example 11: Generate standardized export filenames');

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toISOString().split('T')[1].substring(0, 5).replace(':', '');

  const formats = ['ris', 'bib', 'xml', 'json'];
  const extensions: Record<string, string> = {
    ris: 'ris',
    bib: 'bib',
    xml: 'xml',
    json: 'json',
  };

  console.log('Generated filenames:');
  formats.forEach((format) => {
    const filename = `darwin-referencias-${dateStr}-${timeStr}.${extensions[format]}`;
    console.log(`  ${format.toUpperCase()}: ${filename}`);
  });
}

/**
 * Run all examples (for demonstration purposes)
 */
export async function runAllExamples(testReferences: Reference[]): Promise<void> {
  console.log('=== Academic Reference Export Examples ===\n');

  try {
    console.log('1. Single reference export:');
    if (testReferences.length > 0) {
      await example1_ExportSingleReferenceToRIS(testReferences[0]);
    }

    console.log('\n2. Multiple references export:');
    await example2_ExportMultipleToBibTeX(testReferences.slice(0, 3));

    console.log('\n3. DOI resolution:');
    await example3_ResolveDOIToCitation();

    console.log('\n4. PubMed resolution:');
    await example4_ResolvePubMedIdToCitation();

    console.log('\n6. JSON export with metadata:');
    await example6_ExportToJSONWithMetadata(testReferences.slice(0, 2));

    console.log('\n9. Export for different systems:');
    await example9_ExportForDifferentSystems(testReferences.slice(0, 2));

    console.log('\n10. Validation and error handling:');
    await example10_ValidationAndErrorHandling();

    console.log('\n11. Standardized export filenames:');
    example11_GenerateStandardizedExportFilenames();

    console.log('\n=== Examples completed ===');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}
