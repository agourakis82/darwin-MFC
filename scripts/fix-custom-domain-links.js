#!/usr/bin/env node

/**
 * Post-build script to fix links in HTML files for custom domain deployment
 * Removes /darwin-MFC basePath from all resource links (CSS, JS, images, etc.)
 * 
 * This script runs after Next.js build and before deployment
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const OUT_DIR = path.join(__dirname, '..', 'out');

function fixHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix CSS links
  content = content.replace(
    /href="\/darwin-MFC\/_next\/static\/css\/([^"]+)"/g,
    (match, filename) => {
      modified = true;
      return `href="/_next/static/css/${filename}"`;
    }
  );

  // Fix JS script sources
  content = content.replace(
    /src="\/darwin-MFC\/_next\/static\/chunks\/([^"]+)"/g,
    (match, filename) => {
      modified = true;
      return `src="/_next/static/chunks/${filename}"`;
    }
  );

  // Fix preload links
  content = content.replace(
    /href="\/darwin-MFC\/_next\/static\/([^"]+)"/g,
    (match, filename) => {
      modified = true;
      return `href="/_next/static/${filename}"`;
    }
  );

  // Fix manifest and other root-level links
  content = content.replace(
    /href="\/darwin-MFC\/([^"]+)"/g,
    (match, filename) => {
      // Don't fix internal navigation links, only resource links
      if (filename.startsWith('_next/') || filename === 'manifest.json' || filename.startsWith('logos/')) {
        modified = true;
        return `href="/${filename}"`;
      }
      return match;
    }
  );

  // Fix src attributes for images and other resources
  content = content.replace(
    /src="\/darwin-MFC\/([^"]+)"/g,
    (match, filename) => {
      if (filename.startsWith('_next/') || filename.startsWith('logos/')) {
        modified = true;
        return `src="/${filename}"`;
      }
      return match;
    }
  );

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${path.relative(OUT_DIR, filePath)}`);
    return true;
  }
  return false;
}

async function main() {
  console.log('🔧 Fixing HTML files for custom domain deployment...\n');

  if (!fs.existsSync(OUT_DIR)) {
    console.error(`❌ Build directory not found: ${OUT_DIR}`);
    console.error('   Run "npm run build" first');
    process.exit(1);
  }

  // Find all HTML files
  const htmlFiles = await glob('**/*.html', {
    cwd: OUT_DIR,
    absolute: true,
  });

  if (htmlFiles.length === 0) {
    console.error('❌ No HTML files found in build directory');
    process.exit(1);
  }

  let fixedCount = 0;
  for (const file of htmlFiles) {
    if (fixHtmlFile(file)) {
      fixedCount++;
    }
  }

  console.log(`\n✅ Fixed ${fixedCount} of ${htmlFiles.length} HTML files`);
  console.log('   All resource links now point to root (/) instead of /darwin-MFC/');
}

main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

