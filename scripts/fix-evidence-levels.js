#!/usr/bin/env node

/**
 * Script to fix evidence levels and study types in disease data files
 * 
 * Converts:
 * - evidenceLevel: 'high' → 'A'
 * - evidenceLevel: 'moderate' → 'B'
 * - evidenceLevel: 'low' → 'C'
 * - evidenceLevel: 'weak' → 'C'
 * - evidenceLevel: 'expert' → 'D'
 * - studyType: 'rct' → 'RCT'
 * - studyType: 'guideline' → 'Guideline'
 * - studyType: 'systematic_review' → 'SystematicReview'
 * - studyType: 'meta_analysis' → 'MetaAnalysis'
 * - studyType: 'cohort' → 'Cohort'
 * - studyType: 'case_control' → 'CaseControl'
 * - studyType: 'observational' → 'Observational'
 */

const fs = require('fs');
const path = require('path');

// Evidence level mappings
const evidenceLevelMap = {
  'high': 'A',
  'moderate': 'B',
  'low': 'C',
  'weak': 'C',
  'expert': 'D',
  'very_low': 'D',
};

// Study type mappings
const studyTypeMap = {
  'rct': 'RCT',
  'guideline': 'Guideline',
  'systematic_review': 'SystematicReview',
  'meta_analysis': 'MetaAnalysis',
  'cohort': 'Cohort',
  'case_control': 'CaseControl',
  'observational': 'Observational',
  'case_series': 'CaseSeries',
  'expert_opinion': 'ExpertOpinion',
};

function fixFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changeCount = 0;

  // Fix evidence levels
  Object.entries(evidenceLevelMap).forEach(([oldValue, newValue]) => {
    const regex = new RegExp(`evidenceLevel:\\s*['"]${oldValue}['"]`, 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, `evidenceLevel: '${newValue}'`);
      changeCount += matches.length;
      console.log(`  - Replaced ${matches.length} occurrences of evidenceLevel: '${oldValue}' → '${newValue}'`);
    }
  });

  // Fix study types
  Object.entries(studyTypeMap).forEach(([oldValue, newValue]) => {
    const regex = new RegExp(`studyType:\\s*['"]${oldValue}['"]`, 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, `studyType: '${newValue}'`);
      changeCount += matches.length;
      console.log(`  - Replaced ${matches.length} occurrences of studyType: '${oldValue}' → '${newValue}'`);
    }
  });

  if (changeCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Fixed ${changeCount} issues in ${path.basename(filePath)}\n`);
    return changeCount;
  } else {
    console.log(`  ℹ️  No changes needed in ${path.basename(filePath)}\n`);
    return 0;
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let totalChanges = 0;

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      totalChanges += processDirectory(filePath);
    } else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
      totalChanges += fixFile(filePath);
    }
  });

  return totalChanges;
}

// Main execution
const doencasDir = path.join(__dirname, '..', 'lib', 'data', 'doencas');

console.log('🔧 Starting evidence level migration...\n');
console.log(`Target directory: ${doencasDir}\n`);

if (!fs.existsSync(doencasDir)) {
  console.error(`❌ Error: Directory not found: ${doencasDir}`);
  process.exit(1);
}

const totalChanges = processDirectory(doencasDir);

console.log('═'.repeat(60));
console.log(`✅ Migration complete! Total changes: ${totalChanges}`);
console.log('═'.repeat(60));

