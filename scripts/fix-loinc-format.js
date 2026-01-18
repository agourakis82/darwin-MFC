#!/usr/bin/env node

/**
 * Script to fix LOINC format in disease data files
 * 
 * Converts:
 * loinc: [
 *   '2093-3',   // Total cholesterol
 *   '2085-9',   // HDL
 * ]
 * 
 * To:
 * loinc: [
 *   { code: '2093-3', name: 'Total cholesterol' },
 *   { code: '2085-9', name: 'HDL' },
 * ]
 */

const fs = require('fs');
const path = require('path');

function fixLoincInFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changeCount = 0;

  // Match LOINC arrays with string entries and comments
  // Pattern: '12345-6',   // Comment
  const loincPattern = /loinc: \[\s*((?:\s*'[\d-]+',\s*\/\/[^\n]+\n)+)\s*\]/g;
  
  content = content.replace(loincPattern, (match, entries) => {
    // Extract individual entries
    const entryPattern = /\s*'([\d-]+)',\s*\/\/\s*([^\n]+)/g;
    const newEntries = [];
    let entryMatch;
    
    while ((entryMatch = entryPattern.exec(entries)) !== null) {
      const code = entryMatch[1];
      const name = entryMatch[2].trim();
      newEntries.push(`      { code: '${code}', name: '${name}' },`);
      changeCount++;
    }
    
    if (newEntries.length > 0) {
      return `loinc: [\n${newEntries.join('\n')}\n    ]`;
    }
    
    return match;
  });

  if (changeCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Fixed ${changeCount} LOINC entries in ${path.basename(filePath)}\n`);
    return changeCount;
  } else {
    console.log(`  ℹ️  No LOINC changes needed in ${path.basename(filePath)}\n`);
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
      totalChanges += fixLoincInFile(filePath);
    }
  });

  return totalChanges;
}

// Main execution
const doencasDir = path.join(__dirname, '..', 'lib', 'data', 'doencas');

console.log('🔧 Starting LOINC format migration...\n');
console.log(`Target directory: ${doencasDir}\n`);

if (!fs.existsSync(doencasDir)) {
  console.error(`❌ Error: Directory not found: ${doencasDir}`);
  process.exit(1);
}

const totalChanges = processDirectory(doencasDir);

console.log('═'.repeat(60));
console.log(`✅ Migration complete! Total LOINC entries fixed: ${totalChanges}`);
console.log('═'.repeat(60));

