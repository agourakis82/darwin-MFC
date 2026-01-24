/**
 * CONVERT GENERATED MODULES TO DARWIN-MFC REFERENCES
 * ===================================================
 * 
 * Extracts citations from generated modules and converts them
 * to Darwin-MFC Reference format for lib/data/references.ts
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface GeneratedReference {
  id: number;
  citation: string;
}

interface DarwinReference {
  id: string;
  type: 'artigo' | 'diretriz' | 'portaria' | 'livro' | 'site';
  title: string;
  authors?: string[];
  year: number;
  journal?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  url?: string;
  publisher?: string;
  note?: string;
}

function parseCitation(moduleId: string, refId: number, citation: string): DarwinReference {
  // Extract PMID
  const pmidMatch = citation.match(/PMID:\s*(\d+)/);
  const pmid = pmidMatch ? pmidMatch[1] : undefined;

  // Extract DOI
  const doiMatch = citation.match(/DOI:\s*([\d.\/\-a-zA-Z]+)/);
  const doi = doiMatch ? doiMatch[1] : undefined;

  // Extract URL
  const urlMatch = citation.match(/URL:\s*(https?:\/\/[^\s]+)/);
  const url = urlMatch ? urlMatch[1] : undefined;

  // Extract year
  const yearMatch = citation.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? parseInt(yearMatch[0]) : 2024;

  // Extract journal (text before year, after authors)
  const journalMatch = citation.match(/\.\s+([A-Z][^.]+?)\.\s+(19|20)\d{2}/);
  const journal = journalMatch ? journalMatch[1].trim() : undefined;

  // Extract volume and pages
  const volPagesMatch = citation.match(/(\d{4});(\d+)\((\d+)\):(\d+-\d+)/);
  const volume = volPagesMatch ? volPagesMatch[2] : undefined;
  const pages = volPagesMatch ? volPagesMatch[4] : undefined;

  // Extract title (first sentence before journal)
  const titleMatch = citation.match(/^([^.]+\.)/);
  const title = titleMatch ? titleMatch[1].replace(/\.$/, '').trim() : citation.substring(0, 100);

  // Determine type
  let type: 'artigo' | 'diretriz' | 'portaria' | 'livro' | 'site' = 'artigo';
  if (citation.includes('Ministério da Saúde') || citation.includes('PCDT')) {
    type = citation.includes('Portaria') ? 'portaria' : 'diretriz';
  } else if (citation.includes('Guidelines') || citation.includes('Diretrizes')) {
    type = 'diretriz';
  } else if (url && !journal) {
    type = 'site';
  } else if (journal) {
    type = 'artigo';
  }

  // Extract authors (first part before title)
  const authorsMatch = citation.match(/^([^.]+?)\s+et al\./);
  const authors = authorsMatch ? [authorsMatch[1].trim() + ' et al'] : undefined;

  return {
    id: `${moduleId}-ref-${refId}`,
    type,
    title,
    authors,
    year,
    journal,
    volume,
    pages,
    doi,
    pmid,
    url,
    note: `Auto-imported from ${moduleId} module`
  };
}

async function convertModulesToReferences() {
  console.log('🔄 CONVERTING MODULES TO DARWIN-MFC REFERENCES');
  console.log('='.repeat(80));

  const modulesDir = 'lib/content-generation/output/modules';
  const files = await readdir(modulesDir);
  const moduleFiles = files.filter(f => f.endsWith('.ts'));

  console.log(`\nProcessing ${moduleFiles.length} modules...\n`);

  const allReferences: DarwinReference[] = [];

  for (const file of moduleFiles) {
    const filePath = join(modulesDir, file);
    const content = await readFile(filePath, 'utf-8');
    
    // Parse module
    const moduleData = eval(`(${content})`);
    const moduleId = moduleData.id;

    console.log(`📄 ${moduleId.padEnd(30)} → ${moduleData.referencias.length} references`);

    // Convert each reference
    for (const ref of moduleData.referencias) {
      const darwinRef = parseCitation(moduleId, ref.id, ref.citation);
      allReferences.push(darwinRef);
    }
  }

  console.log(`\n✅ Converted ${allReferences.length} references`);

  // Generate TypeScript code
  const referencesCode = allReferences.map(ref => {
    const fields: string[] = [
      `    id: '${ref.id}'`,
      `    type: '${ref.type}'`,
      `    title: \`${ref.title.replace(/`/g, "'")}\``,
    ];

    if (ref.authors) fields.push(`    authors: ${JSON.stringify(ref.authors)}`);
    fields.push(`    year: ${ref.year}`);
    if (ref.journal) fields.push(`    journal: '${ref.journal.replace(/'/g, "\\'")}'`);
    if (ref.volume) fields.push(`    volume: '${ref.volume}'`);
    if (ref.pages) fields.push(`    pages: '${ref.pages}'`);
    if (ref.doi) fields.push(`    doi: '${ref.doi}'`);
    if (ref.pmid) fields.push(`    pmid: '${ref.pmid}'`);
    if (ref.url) fields.push(`    url: '${ref.url}'`);
    if (ref.note) fields.push(`    note: '${ref.note}'`);

    return `  '${ref.id}': {\n${fields.join(',\n')}\n  }`;
  }).join(',\n\n');

  const output = `// AUTO-GENERATED REFERENCES FROM 32 MODULES
// Generated: ${new Date().toISOString()}
// Total: ${allReferences.length} references

// Add these to lib/data/references.ts

export const newReferences = {
${referencesCode}
};
`;

  const outputPath = 'lib/content-generation/output/darwin-references.ts';
  await writeFile(outputPath, output);

  console.log(`\n💾 Saved to: ${outputPath}`);
  console.log('\n📝 Next step: Manually merge into lib/data/references.ts');
  console.log('   (Add entries from newReferences to the references object)');
  console.log('\n✅ Conversion complete!');
}

convertModulesToReferences().catch(console.error);

