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

  // Fix manifest and other root-level resource links
  content = content.replace(
    /href="\/darwin-MFC\/(manifest\.json|logos\/[^"]+)"/g,
    (match, filename) => {
      modified = true;
      return `href="/${filename}"`;
    }
  );

  // Fix src attributes for images and other resources
  content = content.replace(
    /src="\/darwin-MFC\/(_next\/[^"]+|logos\/[^"]+)"/g,
    (match, filename) => {
      modified = true;
      return `src="/${filename}"`;
    }
  );

  // Fix navigation links (href in <a> tags) - must be last to catch remaining href
  // Remove /darwin-MFC from all remaining href attributes
  content = content.replace(
    /href="\/darwin-MFC\/([^"]*)"/g,
    (match, path) => {
      modified = true;
      // Keep trailing slash if it was there, but remove basePath
      return `href="/${path}"`;
    }
  );

  // Also fix action attributes in forms
  content = content.replace(
    /action="\/darwin-MFC\/([^"]*)"/g,
    (match, path) => {
      modified = true;
      return `action="/${path}"`;
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

