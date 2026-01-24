/**
 * Visual Regression Tests
 * State of the Art Implementation with Percy/Playwright
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Homepage', () => {
  test('Homepage desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page).toHaveScreenshot('homepage-desktop.png');
  });

  test('Homepage tablet view', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page).toHaveScreenshot('homepage-tablet.png');
  });

  test('Homepage mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });
});

test.describe('Visual Regression - Disease Detail', () => {
  test('Disease detail desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/doencas/hipertensao');
    
    await expect(page).toHaveScreenshot('disease-detail-desktop.png');
  });

  test('Disease detail tablet view', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/doencas/hipertensao');
    
    await expect(page).toHaveScreenshot('disease-detail-tablet.png');
  });

  test('Disease detail mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/doencas/hipertensao');
    
    await expect(page).toHaveScreenshot('disease-detail-mobile.png');
  });
});

test.describe('Visual Regression - Calculator', () => {
  test('CHA2DS2-VASc calculator', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/calculadoras/cha2ds2-vasc');
    
    await expect(page).toHaveScreenshot('calculator-cha2ds2-vasc.png');
  });

  test('HAS-BLED calculator', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/calculadoras/has-bled');
    
    await expect(page).toHaveScreenshot('calculator-has-bled.png');
  });
});

test.describe('Visual Regression - Search', () => {
  test('Search results view', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.fill('input[placeholder="Buscar doenças, medicamentos..."]', 'diabetes');
    await page.keyboard.press('Enter');
    
    await expect(page).toHaveScreenshot('search-results.png');
  });
});

test.describe('Visual Regression - Dark Mode', () => {
  test('Homepage dark mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Toggle dark mode
    await page.click('[aria-label="Alternar tema escuro"]');
    
    await expect(page).toHaveScreenshot('homepage-dark-mode.png');
  });

  test('Disease detail dark mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/doencas/hipertensao');
    
    // Toggle dark mode
    await page.click('[aria-label="Alternar tema escuro"]');
    
    await expect(page).toHaveScreenshot('disease-detail-dark-mode.png');
  });
});

test.describe('Visual Regression - Density Modes', () => {
  test('Compact density mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/doencas/hipertensao');
    
    // Toggle compact mode
    await page.click('[aria-label="Alternar densidade compacta"]');
    
    await expect(page).toHaveScreenshot('disease-detail-compact.png');
  });

  test('Comfortable density mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/doencas/hipertensao');
    
    // Toggle comfortable mode
    await page.click('[aria-label="Alternar densidade confortável"]');
    
    await expect(page).toHaveScreenshot('disease-detail-comfortable.png');
  });
});

test.describe('Visual Regression - RTL Languages', () => {
  test('Arabic homepage', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/ar');
    
    await expect(page).toHaveScreenshot('homepage-arabic.png');
  });

  test('Arabic disease detail', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/ar/doencas/hipertensao');
    
    await expect(page).toHaveScreenshot('disease-detail-arabic.png');
  });
});

test.describe('Visual Regression - Print Styles', () => {
  test('Disease detail print view', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/doencas/hipertensao');
    
    // Simulate print media
    await page.emulateMedia({ media: 'print' });
    
    await expect(page).toHaveScreenshot('disease-detail-print.png');
  });
});
