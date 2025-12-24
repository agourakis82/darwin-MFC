#!/usr/bin/env node
/**
 * Generate PWA icons from SVG source
 * Converts icon.svg to required PNG sizes
 */

import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '..', 'public');
const ICONS_DIR = join(PUBLIC_DIR, 'icons');
const SVG_PATH = join(ICONS_DIR, 'icon.svg');

// Icon sizes to generate
const SIZES = [
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
];

async function generateIcons() {
  console.log('🎨 Generating PWA icons from SVG...\n');

  try {
    // Read the SVG file
    const svgBuffer = await readFile(SVG_PATH);
    console.log(`✅ Read SVG file: ${SVG_PATH}`);

    // Generate each size
    for (const { size, name } of SIZES) {
      const outputPath = join(ICONS_DIR, name);

      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    console.log('\n🎉 All PWA icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
