import { expect, test, type Page } from '@playwright/test';

async function primeApsState(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('darwin-mfc-region', 'BR');
    localStorage.setItem('darwin-mfc-region-onboarding-completed', 'true');
    localStorage.setItem('darwin-mode-selection', 'aps');
  });
}

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  expect(Math.max(dimensions.documentWidth, dimensions.bodyWidth) - dimensions.viewportWidth, JSON.stringify(dimensions)).toBeLessThanOrEqual(2);
}

test.describe('Darwin Rx medication safety', () => {
  test.beforeEach(async ({ page }) => primeApsState(page));

  test('keeps all medications searchable and replaces letter pregnancy categories with evidence state', async ({ page, request }) => {
    const runtimeErrors = collectRuntimeErrors(page);
    await page.goto('/pt/medicamentos', { waitUntil: 'domcontentloaded' });

    await expect(page.getByLabel('Conteúdo principal').getByText(/637 conceitos canônicos \/ 717 registros reconciliados/i).first()).toBeVisible();
    await expect(page.getByText(/catálogo completo e pesquisável/i)).toBeVisible();
    const search = page.locator('input[type="text"]').first();
    await search.fill('amoxicilina');
    await expect(page.getByRole('link', { name: /amoxicilina/i }).first()).toBeVisible();
    await expect(page.getByText(/Referência|Dados incompletos/).first()).toBeVisible();
    await expect(page.getByText(/Categoria [ABCDX]/)).toHaveCount(0);

    await page.getByRole('link', { name: /amoxicilina/i }).first().click();
    await expect(page.getByRole('heading', { name: /amoxicilina/i, level: 1 })).toBeVisible();
    await expect(page.getByText('Cálculo de dose').first()).toBeVisible();
    await expect(page.getByText('Bloqueado').first()).toBeVisible();
    await expect(page.getByText(/categorias históricas A\/B\/C\/D\/X não são usadas/i)).toBeVisible();
    await expect(page.getByText(/Lactação: Compatível com amamentação/i)).toBeVisible();
    await expect(page.getByText(/Lactação: \{/i)).toHaveCount(0);
    await expect(page.getByText(/Texto legado para consulta e auditoria/i)).toBeVisible();
    await expect(page.getByText(/Identidade DCB confirmada|Identidade candidata para revisão/i)).toBeVisible();
    await expect(page.getByText(/registros? legados? preservados?/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Bulário Anvisa/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^RENAME/i })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    for (const path of [
      '/medication-safety/medication-safety.receipt.json',
      '/medication-safety/medication-knowledge-bundle.json',
      '/medication-safety/medication-identity-bundle.json',
      '/medication-safety/medication-identity.receipt.json',
      '/medication-safety/medication-search-index.json',
      '/medication-safety/medication-safety-kernel.wasm',
      '/medication-safety/trusted-signing-keys.v1.json',
    ]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }
    expect(runtimeErrors).toEqual([]);
  });

  test('keeps historical aliases in every locale and canonicalizes the hydrated URL', async ({ page, request }) => {
    const locales = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];
    for (const locale of locales) {
      const response = await request.get(`/${locale}/medicamentos/amoxicilina-suspensao/`);
      expect(response.status(), locale).toBe(200);
    }

    await page.goto('/pt/medicamentos/amoxicilina-suspensao/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: /amoxicilina/i, level: 1 })).toBeVisible();
    await expect(page).toHaveURL(/\/pt\/medicamentos\/med-amoxicilina\/$/);
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonicalHref).toContain('/pt/medicamentos/med-amoxicilina/');
    await expectNoHorizontalOverflow(page);
  });

  test('filters treatment references without calculating or auto-adding a dose', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page);
    await page.goto('/pt/prontuario', { waitUntil: 'domcontentloaded' });
    await page.getByRole('spinbutton', { name: 'Idade do paciente' }).fill('4');
    await page.getByRole('combobox', { name: 'Unidade', exact: true }).selectOption('anos');
    await page.getByRole('spinbutton', { name: 'Peso' }).fill('18');
    await page.getByRole('combobox', { name: 'Sintoma principal' }).fill('Tosse');
    await page.getByRole('button', { name: 'Analisar' }).click();
    await page.getByRole('button', { name: 'Usar hipótese' }).first().click();

    await expect(page.getByRole('heading', { name: /Opções para/i })).toBeVisible();
    await expect(page.getByText(/O Darwin Rx não interpreta, calcula nem libera esta dose/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apenas referência' }).first()).toBeDisabled();
    await expect(page.getByRole('button', { name: /Adicionar ao plano/i })).toHaveCount(0);

    await page.locator('input[placeholder="Medicamento"]').fill('Amoxicilina');
    await page.locator('input[placeholder="Posologia"]').fill('Registro manual do profissional');
    await page.locator('input[placeholder="Posologia"]').locator('..').getByRole('button').click();
    await expect(page.getByText('Não verificada pelo Darwin Rx', { exact: true })).toBeVisible();
    await expect(page.getByText(/Ausência de alerta não confirma segurança/i)).toBeVisible();
    await expect(page.getByText('Sounio · integridade verificada · autorização clínica bloqueada')).toBeVisible();
    await expect(page.getByTitle(/calibration-invalid/i)).toBeVisible();
    await expectNoHorizontalOverflow(page);
    expect(runtimeErrors).toEqual([]);
  });
});
