import { test, expect } from '@playwright/test';

test.describe('Runtime Safety', () => {
  test('key public pages load without runtime exceptions', async ({ page }) => {
    // Avoid Region onboarding modal interfering with rendering/interactions.
    await page.addInitScript(() => {
      try {
        localStorage.setItem('darwin-mfc-region', 'BR');
        localStorage.setItem('darwin-mfc-region-onboarding-completed', 'true');
      } catch {
        // ignore
      }
    });

    const pageErrors: Error[] = [];
    page.on('pageerror', (err) => {
      pageErrors.push(err);
      // Keep output concise but useful in CI logs.
      // eslint-disable-next-line no-console
      console.error('[pageerror]', err?.message);
    });

    await page.goto('/pt/doencas/hipertensao-arterial', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('dialog', { name: /Runtime/i })).toHaveCount(0);
    await expect(page.locator('h1')).toBeVisible();

    await page.goto('/pt/calculadoras', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('dialog', { name: /Runtime/i })).toHaveCount(0);
    await expect(page.locator('main')).toBeVisible();

    // Fail with the first page error (if any).
    expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
  });
});
