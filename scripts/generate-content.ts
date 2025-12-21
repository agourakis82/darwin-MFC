#!/usr/bin/env npx tsx
/**
 * AI CONTENT GENERATION CLI - DARWIN-MFC
 * =======================================
 *
 * CLI tool for AI-assisted content generation with citation verification.
 *
 * Usage:
 *   npx tsx scripts/generate-content.ts disease "Diabetes Mellitus Type 2"
 *   npx tsx scripts/generate-content.ts medication "Metformin"
 *   npx tsx scripts/generate-content.ts batch diseases.json
 *   npx tsx scripts/generate-content.ts verify drafts/
 *
 * Environment:
 *   ANTHROPIC_API_KEY - Required for content generation
 *
 * Part of SOTA Strategic Plan - Phase 3
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  ContentGenerator,
  saveDraft,
  exportDraftToTS,
  type ContentDraft,
} from '../lib/ai/content-generator';
import {
  verifyCitation,
  verifyCitationsBatch,
  searchPubMed,
  searchGuidelines,
  formatVancouver,
  type CitationVerification,
} from '../lib/ai/citation-extractor';

// =============================================================================
// CLI CONFIGURATION
// =============================================================================

const DRAFTS_DIR = path.join(process.cwd(), 'drafts');
const VERIFIED_DIR = path.join(process.cwd(), 'drafts', 'verified');

interface CLIOptions {
  command: 'disease' | 'medication' | 'batch' | 'verify' | 'search' | 'help';
  target?: string;
  options?: Record<string, string>;
}

// =============================================================================
// COMMAND HANDLERS
// =============================================================================

async function handleDisease(name: string): Promise<void> {
  console.log(`\n🔬 Generating disease entry: ${name}\n`);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is required');
    console.log('\nSet it with: export ANTHROPIC_API_KEY=your-key-here');
    process.exit(1);
  }

  const generator = new ContentGenerator({ apiKey, language: 'pt' });

  try {
    console.log('📡 Calling Claude API...');
    const draft = await generator.generateDisease(name, {
      country: 'Brazil',
    });

    if (!draft) {
      console.error('❌ Failed to generate content');
      process.exit(1);
    }

    console.log(`✅ Draft generated with confidence: ${draft.confidenceScore}%`);
    console.log(`📚 Citations: ${draft.citations.length}`);
    console.log(`⚠️  Review flags: ${draft.reviewFlags.length}`);

    // Display review flags
    if (draft.reviewFlags.length > 0) {
      console.log('\n⚠️  Issues requiring attention:');
      draft.reviewFlags.forEach((flag, i) => {
        console.log(`   ${i + 1}. [${flag.severity}] ${flag.field}: ${flag.reason}`);
      });
    }

    // Verify citations
    console.log('\n🔍 Verifying citations against PubMed...');
    const verificationResults = await verifyCitationsBatch(
      draft.citations.map(c => c.text),
      {
        delayMs: 500,
        onProgress: (current, total) => {
          process.stdout.write(`   Verifying ${current}/${total}...\r`);
        },
      }
    );

    const verified = verificationResults.filter(r => r.verified).length;
    console.log(`\n   ✅ Verified: ${verified}/${verificationResults.length}`);

    // Save draft
    const filename = await saveDraft(draft, DRAFTS_DIR);
    console.log(`\n💾 Draft saved to: ${filename}`);

    // Generate TypeScript preview
    console.log('\n📝 TypeScript preview:\n');
    const tsCode = exportDraftToTS(draft);
    console.log(tsCode.slice(0, 1000) + '...\n');

    // Summary
    console.log('═'.repeat(60));
    console.log('📊 GENERATION SUMMARY');
    console.log('═'.repeat(60));
    console.log(`   Disease: ${name}`);
    console.log(`   Confidence: ${draft.confidenceScore}%`);
    console.log(`   Citations: ${verified}/${draft.citations.length} verified`);
    console.log(`   Review Required: ${draft.reviewFlags.length > 0 ? 'YES' : 'NO'}`);
    console.log(`   Draft File: ${filename}`);
    console.log('═'.repeat(60));

  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

async function handleMedication(name: string): Promise<void> {
  console.log(`\n💊 Generating medication entry: ${name}\n`);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is required');
    console.log('\nSet it with: export ANTHROPIC_API_KEY=your-key-here');
    process.exit(1);
  }

  const generator = new ContentGenerator({ apiKey, language: 'pt' });

  try {
    console.log('📡 Calling Claude API...');
    const draft = await generator.generateMedication(name, {
      country: 'Brazil',
    });

    if (!draft) {
      console.error('❌ Failed to generate content');
      process.exit(1);
    }

    console.log(`✅ Draft generated with confidence: ${draft.confidenceScore}%`);
    console.log(`📚 Citations: ${draft.citations.length}`);
    console.log(`⚠️  Review flags: ${draft.reviewFlags.length}`);

    // Display review flags
    if (draft.reviewFlags.length > 0) {
      console.log('\n⚠️  Issues requiring attention:');
      draft.reviewFlags.forEach((flag, i) => {
        console.log(`   ${i + 1}. [${flag.severity}] ${flag.field}: ${flag.reason}`);
      });
    }

    // Verify citations
    console.log('\n🔍 Verifying citations against PubMed...');
    const verificationResults = await verifyCitationsBatch(
      draft.citations.map(c => c.text),
      {
        delayMs: 500,
        onProgress: (current, total) => {
          process.stdout.write(`   Verifying ${current}/${total}...\r`);
        },
      }
    );

    const verified = verificationResults.filter(r => r.verified).length;
    console.log(`\n   ✅ Verified: ${verified}/${verificationResults.length}`);

    // Save draft
    const filename = await saveDraft(draft, DRAFTS_DIR);
    console.log(`\n💾 Draft saved to: ${filename}`);

    // Summary
    console.log('═'.repeat(60));
    console.log('📊 GENERATION SUMMARY');
    console.log('═'.repeat(60));
    console.log(`   Medication: ${name}`);
    console.log(`   Confidence: ${draft.confidenceScore}%`);
    console.log(`   Citations: ${verified}/${draft.citations.length} verified`);
    console.log(`   Review Required: ${draft.reviewFlags.length > 0 ? 'YES' : 'NO'}`);
    console.log(`   Draft File: ${filename}`);
    console.log('═'.repeat(60));

  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

async function handleBatch(inputFile: string): Promise<void> {
  console.log(`\n📦 Batch generation from: ${inputFile}\n`);

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(inputFile, 'utf-8');
    const batch = JSON.parse(content);

    if (!batch.items || !Array.isArray(batch.items)) {
      console.error('❌ Invalid batch file format. Expected { items: [...] }');
      process.exit(1);
    }

    console.log(`📋 Found ${batch.items.length} items to generate\n`);

    const generator = new ContentGenerator({ apiKey, language: 'pt' });
    const results = {
      total: batch.items.length,
      successful: 0,
      failed: 0,
      files: [] as string[],
    };

    for (let i = 0; i < batch.items.length; i++) {
      const item = batch.items[i];
      console.log(`\n[${i + 1}/${batch.items.length}] Processing: ${item.name}`);

      try {
        let draft;
        if (item.type === 'disease') {
          draft = await generator.generateDisease(item.name, {
            country: item.country || 'Brazil',
          });
        } else if (item.type === 'medication') {
          draft = await generator.generateMedication(item.name, {
            country: item.country || 'Brazil',
          });
        } else {
          console.log(`   ⚠️  Unknown type: ${item.type}, skipping`);
          results.failed++;
          continue;
        }

        if (draft) {
          const filename = await saveDraft(draft, DRAFTS_DIR);
          results.files.push(filename);
          results.successful++;
          console.log(`   ✅ Saved: ${path.basename(filename)}`);
        } else {
          results.failed++;
          console.log(`   ❌ Failed to generate`);
        }

        // Rate limiting
        if (i < batch.items.length - 1) {
          await delay(2000); // 2 second delay between API calls
        }
      } catch (error) {
        results.failed++;
        console.log(`   ❌ Error: ${error}`);
      }
    }

    // Summary
    console.log('\n' + '═'.repeat(60));
    console.log('📊 BATCH GENERATION SUMMARY');
    console.log('═'.repeat(60));
    console.log(`   Total: ${results.total}`);
    console.log(`   Successful: ${results.successful}`);
    console.log(`   Failed: ${results.failed}`);
    console.log(`   Output Directory: ${DRAFTS_DIR}`);
    console.log('═'.repeat(60));

  } catch (error) {
    console.error('❌ Batch processing failed:', error);
    process.exit(1);
  }
}

async function handleVerify(directory: string): Promise<void> {
  console.log(`\n🔍 Verifying drafts in: ${directory}\n`);

  if (!fs.existsSync(directory)) {
    console.error(`❌ Directory not found: ${directory}`);
    process.exit(1);
  }

  const files = fs.readdirSync(directory).filter(f => f.endsWith('.json'));
  console.log(`📋 Found ${files.length} draft files\n`);

  let verified = 0;
  let unverified = 0;

  for (const file of files) {
    const filepath = path.join(directory, file);
    console.log(`\nProcessing: ${file}`);

    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const draft = JSON.parse(content) as ContentDraft<unknown>;

      if (!draft.citations || draft.citations.length === 0) {
        console.log('   ⚠️  No citations to verify');
        continue;
      }

      console.log(`   📚 Verifying ${draft.citations.length} citations...`);

      const results = await verifyCitationsBatch(
        draft.citations.map(c => c.text),
        {
          delayMs: 500,
          onProgress: (current, total) => {
            process.stdout.write(`   Progress: ${current}/${total}\r`);
          },
        }
      );

      const verifiedCount = results.filter(r => r.verified).length;
      console.log(`\n   ✅ Verified: ${verifiedCount}/${results.length}`);

      if (verifiedCount === results.length) {
        verified++;
        // Move to verified directory
        if (!fs.existsSync(VERIFIED_DIR)) {
          fs.mkdirSync(VERIFIED_DIR, { recursive: true });
        }
        const newPath = path.join(VERIFIED_DIR, file);
        fs.renameSync(filepath, newPath);
        console.log(`   📁 Moved to: ${VERIFIED_DIR}`);
      } else {
        unverified++;
        console.log('   ⚠️  Some citations could not be verified');

        // Show unverified citations
        results.forEach((r, i) => {
          if (!r.verified) {
            console.log(`      - ${draft.citations[i].text.slice(0, 50)}...`);
          }
        });
      }

    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
      unverified++;
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 VERIFICATION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`   Total Files: ${files.length}`);
  console.log(`   Fully Verified: ${verified}`);
  console.log(`   Needs Review: ${unverified}`);
  console.log('═'.repeat(60));
}

async function handleSearch(query: string): Promise<void> {
  console.log(`\n🔎 Searching PubMed for: ${query}\n`);

  try {
    // Search general articles
    console.log('📚 General articles:');
    const results = await searchPubMed(query, { maxResults: 5 });
    console.log(`   Found ${results.totalResults} total, showing first ${results.articles.length}:\n`);

    results.articles.forEach((article, i) => {
      console.log(`   ${i + 1}. ${article.title.slice(0, 80)}...`);
      console.log(`      PMID: ${article.pmid} | Year: ${article.year} | ${article.journal}`);
      console.log(`      ${formatVancouver(article).slice(0, 120)}...\n`);
    });

    // Search guidelines
    console.log('\n📋 Clinical Guidelines:');
    const guidelines = await searchGuidelines(query, { maxResults: 3 });
    console.log(`   Found ${guidelines.totalResults} guidelines:\n`);

    guidelines.articles.forEach((article, i) => {
      console.log(`   ${i + 1}. ${article.title.slice(0, 80)}...`);
      console.log(`      PMID: ${article.pmid} | Year: ${article.year}`);
    });

  } catch (error) {
    console.error('❌ Search failed:', error);
    process.exit(1);
  }
}

function showHelp(): void {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║          DARWIN-MFC AI CONTENT GENERATION CLI                    ║
╚══════════════════════════════════════════════════════════════════╝

USAGE:
  npx tsx scripts/generate-content.ts <command> <target>

COMMANDS:
  disease <name>       Generate a disease entry
                       Example: disease "Diabetes Mellitus Type 2"

  medication <name>    Generate a medication entry
                       Example: medication "Metformin"

  batch <file.json>    Generate multiple entries from a JSON file
                       Example: batch diseases-to-generate.json

                       File format:
                       {
                         "items": [
                           { "type": "disease", "name": "Hypertension" },
                           { "type": "medication", "name": "Losartan" }
                         ]
                       }

  verify <directory>   Verify citations in draft files
                       Example: verify drafts/

  search <query>       Search PubMed for references
                       Example: search "metformin diabetes guidelines"

  help                 Show this help message

ENVIRONMENT:
  ANTHROPIC_API_KEY    Required for content generation
                       Get yours at: https://console.anthropic.com

OUTPUT:
  Drafts are saved to: ./drafts/
  Verified drafts moved to: ./drafts/verified/

WORKFLOW:
  1. Generate content:  generate-content.ts disease "Disease Name"
  2. Review draft:      Check ./drafts/*.json
  3. Verify citations:  generate-content.ts verify drafts/
  4. Human review:      Check review flags and edit as needed
  5. Export to TS:      Copy from draft or use exportDraftToTS()

NOTES:
  - All generated content requires human review before use
  - Citations are verified against PubMed automatically
  - Review flags indicate areas needing attention
  - Confidence score reflects AI certainty level

Part of Darwin-MFC SOTA Strategic Plan - Phase 3
`);
}

// =============================================================================
// UTILITIES
// =============================================================================

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseArgs(args: string[]): CLIOptions {
  const command = args[0] as CLIOptions['command'] || 'help';
  const target = args[1];

  return { command, target };
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  // Ensure drafts directory exists
  if (!fs.existsSync(DRAFTS_DIR)) {
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  }

  switch (options.command) {
    case 'disease':
      if (!options.target) {
        console.error('❌ Disease name is required');
        console.log('Usage: generate-content.ts disease "Disease Name"');
        process.exit(1);
      }
      await handleDisease(options.target);
      break;

    case 'medication':
      if (!options.target) {
        console.error('❌ Medication name is required');
        console.log('Usage: generate-content.ts medication "Medication Name"');
        process.exit(1);
      }
      await handleMedication(options.target);
      break;

    case 'batch':
      if (!options.target) {
        console.error('❌ Batch file is required');
        console.log('Usage: generate-content.ts batch items.json');
        process.exit(1);
      }
      await handleBatch(options.target);
      break;

    case 'verify':
      await handleVerify(options.target || DRAFTS_DIR);
      break;

    case 'search':
      if (!options.target) {
        console.error('❌ Search query is required');
        console.log('Usage: generate-content.ts search "query"');
        process.exit(1);
      }
      await handleSearch(options.target);
      break;

    case 'help':
    default:
      showHelp();
      break;
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
