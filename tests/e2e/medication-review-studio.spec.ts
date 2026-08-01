import { expect, test, type Page } from '@playwright/test';

async function primeApsState(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('darwin-mfc-region', 'BR');
    localStorage.setItem('darwin-mfc-region-onboarding-completed', 'true');
    localStorage.setItem('darwin-mode-selection', 'aps');
  });
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  expect(Math.max(dimensions.documentWidth, dimensions.bodyWidth) - dimensions.viewportWidth, JSON.stringify(dimensions)).toBeLessThanOrEqual(2);
}

test.describe('Darwin Rx Evidence Review Studio', () => {
  test.beforeEach(async ({ page }) => primeApsState(page));

  test('renders the hash-bound review queue without clinical activation', async ({ page, request }) => {
    await page.goto('/pt/rx/revisao/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Darwin Rx Review Studio' })).toBeVisible();
    await expect(page.getByText('REFUSE · sem ativação clínica')).toBeVisible();
    await expect(page.getByText('177', { exact: true })).toBeVisible();
    await expect(page.getByText('295', { exact: true })).toBeVisible();
    await expect(page.getByTestId('review-task-list')).toBeVisible();
    await page.getByLabel('Risco').selectOption('critical');
    await expect(page.getByText('7 tarefas')).toBeVisible();
    await page.getByTestId('review-task-list').getByRole('button').first().click();
    await expect(page.getByTestId('review-evidence-panel')).toBeVisible();
    await expect(page.getByTestId('review-evidence-panel').getByText(/conflito explícito de gravidade/i)).toBeVisible();
    if ((page.viewportSize()?.width ?? 1280) < 1024) {
      await page.getByRole('button', { name: 'Decisão' }).click();
    }
    await expect(page.getByTestId('review-decision-panel')).toBeVisible();
    await expect(page.getByText(/modo de auditoria local/i)).toBeVisible();
    await expectNoHorizontalOverflow(page);

    for (const path of [
      '/medication-safety/medication-review-seed.json',
      '/medication-safety/medication-review.receipt.json',
    ]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }
  });

  test('opens the dose candidate and public application workflows', async ({ page }) => {
    await page.goto('/pt/rx/revisao/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Regras de dose' }).click();
    await expect(page.getByText('5 candidatos sem matemática pré-preenchida')).toBeVisible();
    await expect(page.getByText('productionAuthorized=false').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Enviar candidato/i })).toBeDisabled();
    await page.getByRole('button', { name: 'Candidatura' }).click();
    await expect(page.getByRole('heading', { name: /Contribuir é aberto/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Entrar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enviar candidatura' })).toBeDisabled();
    await expectNoHorizontalOverflow(page);
  });

  test('keeps the route available in all supported locales', async ({ request }) => {
    for (const locale of ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi']) {
      const response = await request.get(`/${locale}/rx/revisao/`);
      expect(response.status(), locale).toBe(200);
    }
  });
});
