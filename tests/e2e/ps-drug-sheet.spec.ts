import { test, expect } from '@playwright/test';

async function primePSClientState(page: Parameters<typeof test>[0]['page']) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('darwin-mfc-region', 'BR');
      localStorage.setItem('darwin-mfc-region-onboarding-completed', 'true');
      localStorage.setItem('darwin-mode-selection', 'ps');
    } catch {
      // ignore
    }
  });
}

test.describe('PS Drug Sheet', () => {
  test('adrenalina sheet opens from controlled PCR deep link and remains runtime-safe', async ({ page }) => {
    await primePSClientState(page);

    const pageErrors: Error[] = [];
    page.on('pageerror', (err) => {
      pageErrors.push(err);
      // eslint-disable-next-line no-console
      console.error('[pageerror]', err?.message);
    });

    await page.goto('/pt/ps/protocolos/pcr?openDrug=adrenalina', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('ps-drug-sheet')).toBeVisible();
    await expect(page.getByTestId('ps-drug-sheet-review')).toBeVisible();
    await expect(page.getByTestId('ps-drug-sheet-confirm')).toBeVisible();
    await page.getByTestId('ps-drug-sheet-close').click();
    await expect(page.getByTestId('ps-drug-sheet')).toHaveCount(0);

    expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
  });
});
