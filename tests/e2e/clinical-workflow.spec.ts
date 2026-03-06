import { test, expect, type Page } from '@playwright/test';

async function bypassRegionOnboarding(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('darwin-mfc-region', 'BR');
      localStorage.setItem('darwin-mfc-region-onboarding-completed', 'true');
    } catch {
      // ignore
    }
  });
}

test.describe('Clinical Workflow (Public)', () => {
  test.beforeEach(async ({ page }) => {
    await bypassRegionOnboarding(page);
  });

  test('skip link exists and main content is focusable', async ({ page }, testInfo) => {
    if (testInfo.project.name.toLowerCase().includes('mobile')) {
      test.skip(true, 'Keyboard skip-link UX is validated on desktop only.');
    }
    await page.goto('/pt', { waitUntil: 'domcontentloaded' });

    const skip = page.locator('a[href=\"#main-content\"]');
    await expect(skip).toHaveCount(1);

    // `tabIndex={-1}` gate: required for programmatic focus (skip-to-content).
    await expect(page.locator('#main-content')).toHaveAttribute('tabindex', '-1');

    // Keyboard: first Tab should reveal the skip link.
    await page.keyboard.press('Tab');
    await expect(skip).toBeVisible();
  });

  test('disease detail loads and checklist view renders', async ({ page }) => {
    await page.goto('/pt/doencas/hipertensao-arterial', { waitUntil: 'domcontentloaded' });

    await expect(page.getByTestId('disease-title')).toBeVisible();

    await page.getByTestId('disease-view-checklist').click();
    await expect(page.getByTestId('disease-checklist')).toBeVisible();
    await expect(page.getByTestId('checklist-consulta')).toBeVisible();

    await page.getByTestId('disease-view-quick').click();
    await expect(page.getByTestId('disease-checklist')).toHaveCount(0);
  });

  test('calculator computes and returns a score (CHA2DS2-VASc)', async ({ page }) => {
    await page.goto('/pt/calculadoras/cha2ds2-vasc', { waitUntil: 'domcontentloaded' });

    // Helpers: scope "Yes/No" clicks to the correct input group.
    const group = (labelText: string) =>
      page.locator('div.space-y-1\\.5', { has: page.locator('label', { hasText: labelText }) }).first();

    await group('Congestive Heart Failure').getByText('No', { exact: true }).click();
    await group('Hypertension').getByText('Yes (+1)', { exact: true }).click();
    await page.locator('select#age').selectOption({ label: '65-74 years (+1)' });
    await group('Diabetes Mellitus').getByText('Yes (+1)', { exact: true }).click();
    await group('Stroke/TIA/Thromboembolism').getByText('Yes (+2)', { exact: true }).click();
    await group('Vascular Disease').getByText('No', { exact: true }).click();
    await page.locator('select#sex').selectOption({ label: 'Female (+1)' });

    await expect(page.getByTestId('calculator-calc')).toBeEnabled();
    await page.getByTestId('calculator-calc').click();

    await expect(page.getByTestId('calculator-result')).toBeVisible();
    await expect(page.getByTestId('calculator-score')).toHaveText('6');
  });
});
