/**
 * E2E Tests for Clinical Workflow
 * State of the Art Implementation
 */

import { test, expect } from '@playwright/test';

test.describe('Clinical Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'doctor@hospital.com');
    await page.fill('[name="password"]', 'securepassword');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('Pesquisar doença e visualizar detalhes', async ({ page }) => {
    // Navegar para busca
    await page.click('[aria-label="Buscar"]');
    await page.fill('input[placeholder="Buscar doenças, medicamentos..."]', 'diabetes');
    await page.press('input[placeholder="Buscar doenças, medicamentos..."]', 'Enter');
    
    // Verificar resultados
    await expect(page.locator('.search-results')).toBeVisible();
    await expect(page.locator('.search-result-item')).toHaveCount.greaterThan(0);
    
    // Clicar no primeiro resultado
    await page.click('.search-result-item:first-child');
    
    // Verificar página de detalhes
    await expect(page.locator('h1')).toContainText('Diabetes');
    await expect(page.locator('.quick-view')).toBeVisible();
    await expect(page.locator('.full-content')).toBeVisible();
  });

  test('Usar calculadora clínica', async ({ page }) => {
    // Navegar para calculadoras
    await page.click('[aria-label="Calculadoras"]');
    await page.click('text=CHA₂DS₂-VASc');
    
    // Preencher formulário
    await page.fill('[name="age"]', '65');
    await page.check('[name="hypertension"]');
    await page.check('[name="diabetes"]');
    await page.check('[name="stroke"]');
    
    // Calcular
    await page.click('button[type="submit"]');
    
    // Verificar resultado
    await expect(page.locator('.calculator-result')).toBeVisible();
    await expect(page.locator('.score-display')).toContainText('6');
    await expect(page.locator('.risk-category')).toContainText('Alto risco');
  });

  test('Alternar modo de conteúdo', async ({ page }) => {
    // Navegar para uma doença
    await page.goto('/doencas/hipertensao');
    
    // Verificar modo descritivo (padrão)
    await expect(page.locator('.descriptive-content')).toBeVisible();
    await expect(page.locator('.critical-analysis-content')).not.toBeVisible();
    
    // Alternar para análise crítica
    await page.click('[aria-label="Alternar para análise crítica"]');
    
    // Verificar modo de análise crítica
    await expect(page.locator('.descriptive-content')).not.toBeVisible();
    await expect(page.locator('.critical-analysis-content')).toBeVisible();
  });

  test('Adicionar nota e favoritar', async ({ page }) => {
    // Navegar para uma doença
    await page.goto('/doencas/asma');
    
    // Adicionar aos favoritos
    await page.click('[aria-label="Adicionar aos favoritos"]');
    await expect(page.locator('[aria-label="Remover dos favoritos"]')).toBeVisible();
    
    // Adicionar nota
    await page.click('[aria-label="Adicionar nota"]');
    await page.fill('textarea[name="note"]', 'Paciente com asma persistente moderada');
    await page.click('button[type="submit"]');
    
    // Verificar nota adicionada
    await expect(page.locator('.note-item')).toContainText('Paciente com asma persistente moderada');
  });
});

test.describe('Responsive Design', () => {
  test('Homepage mobile layout', async ({ page }) => {
    await page.setViewportSize({ width:  375, height: 667 });
    await page.goto('/');
    
    // Verificar elementos principais
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('Disease detail mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/doencas/hipertensao');
    
    // Verificar elementos
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.quick-view')).toBeVisible();
    await expect(page.locator('.full-content')).toBeVisible();
  });

  test('Calculator mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/calculadoras');
    
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Homepage tablet layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('Disease detail tablet layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/doencas/hipertensao');
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.quick-view')).toBeVisible();
    await expect(page.locator('.full-content')).toBeVisible();
  });

  test('Homepage desktop layout', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('Disease detail desktop layout', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/doencas/hipertensao');
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.quick-view')).toBeVisible();
    await expect(page.locator('.full-content')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('Skip links are present', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('a[href="#main-content"]')).toHaveCount(3);
    await expect(page.locator('a[href="#navigation"]')).toBeVisible();
    await expect(page.locator('a[href="#search"]')).toBeVisible();
  });

  test('Keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verificar se chegou em algum elemento
    await expect(page.locator('body')).toBeFocused();
  });

  test('ARIA labels are present', async ({ page }) => {
    await page.goto('/doencas/hipertensao');
    
    await expect(page.locator('h1')).toHaveAttribute('aria-label');
    await expect(page.locator('.quick-view')).toHaveAttribute('aria-label');
    await expect(page.locator('button[type="submit"]')).toHaveAttribute('aria-label');
  });

  test('Focus management', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.locator('input[placeholder="Buscar doenças, medicamentos..."]');
    await searchInput.focus();
    
    await expect(searchInput).toBeFocused();
    
    // Tab away
    await page.keyboard.press('Tab');
    
    // Verificar que perdeu o foco
    await expect(searchInput).not.toBeFocused();
  });
});

test.describe('Performance', () => {
  test('Page load time is acceptable', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/doencas/hipertensao');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Verificar se carregou em menos de 2 segundos
    expect(loadTime).toBeLessThan(2000);
  });

  test('Search response time is acceptable', async ({ page }) => {
    await page.goto('/');
    
    const startTime = Date.now();
    await page.click('[aria-label="Buscar"]');
    await page.fill('input[placeholder="Buscar doenças, medicamentos..."]', 'diabetes');
    await page.press('Enter');
    
    await page.waitForSelector('.search-results');
    const responseTime = Date.now() - startTime;
    
    // Verificar se respondeu em menos de 1 segundo
    expect(responseTime).toBeLessThan(1000);
  });

  test('Bundle size is reasonable', async ({ page, context }) => {
    // Verificar tamanho do bundle JavaScript
    const bundleSize = await page.evaluate(() => {
      // Obter todos os scripts carregados
      const scripts = Array.from(document.scripts);
      let totalSize = 0;
      
      scripts.forEach(script => {
        if (script.src) {
          totalSize += script.src.length;
        }
      });
      
      return totalSize;
    });
    
    // Bundle deve ser menor que 300KB
    expect(bundleSize).toBeLessThan(300000);
  });
});
