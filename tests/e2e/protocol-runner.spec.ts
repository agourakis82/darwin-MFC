import { test, expect } from '@playwright/test';

test.describe('Protocol Runner', () => {
  test('guided runner works (choose/back/reset) and map is secondary (lazy)', async ({ page }) => {
    // Avoid Region onboarding modal interfering with interactions.
    await page.addInitScript(() => {
      try {
        localStorage.setItem('darwin-mfc-region', 'BR');
        localStorage.setItem('darwin-mfc-region-onboarding-completed', 'true');
      } catch {
        // ignore
      }
    });

    await page.goto('/pt/protocolos');

    // Use a stable protocol ID to keep the test deterministic.
    const hasProtocolCard = page
      .locator('a.card-darwin[href*="/protocolos/flowchart/has/guided"]')
      .first();
    await expect(hasProtocolCard).toBeVisible();
    await hasProtocolCard.click();

    await expect(page.getByTestId('protocol-runner')).toBeVisible();

    // Perf gate: the runner must not mount the graph engine by default.
    await expect(page.locator('.react-flow')).toHaveCount(0);

    // Secondary surface: open the Map (lazy-loads graph engine) and close via Escape.
    await page.getByTestId('runner-open-map').click();
    await expect(page.getByTestId('runner-map-dialog')).toBeVisible();
    await expect(page.locator('.react-flow')).toHaveCount(1);

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('runner-map-dialog')).not.toBeVisible();
    await expect(page.locator('.react-flow')).toHaveCount(0);

    // Choose an option.
    const continueButton = page.getByTestId('runner-continue');
    if (await continueButton.isVisible()) {
      await continueButton.click();
    } else {
      await page.getByTestId('runner-option-0').click();
    }

    // Progressive disclosure: clinical payload lives behind Learn/Details overlay.
    await expect(page.getByTestId('runner-exams')).toHaveCount(0);
    await page.getByTestId('runner-open-learn').click();
    await expect(page.getByTestId('runner-learn-dialog')).toBeVisible();

    // Clinical payload should be rendered (HAS: "Medir PA" has "Exames").
    await page.getByTestId('runner-exams').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('runner-exams')).toBeVisible();
    await expect(page.getByTestId('runner-exams')).toContainText('PA em consultório');

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('runner-learn-dialog')).not.toBeVisible();

    // Move into a decision node (HAS always has a deterministic decision right after two "Continuar").
    for (let i = 0; i < 2; i += 1) {
      const c = page.getByTestId('runner-continue');
      if (await c.isVisible()) {
        await c.click();
        continue;
      }
      // If we reach a step with options before two continuations,
      // break to continue with that step for deterministic behavior.
      break;
    }

    const decisionLabelButton = page.getByTestId('runner-option-0');
    await expect(decisionLabelButton).toBeVisible({ timeout: 3000 });

    await decisionLabelButton.click();

    // Track is a second surface and must expose the edge label in history.
    const trackDialog = page.getByTestId('runner-track-dialog');
    await page.getByTestId('runner-open-track').click();
    await page.keyboard.press('Escape');
    await expect(trackDialog).not.toBeVisible();
    await page.getByTestId('runner-open-track').click();
    await expect(trackDialog).toBeVisible();
    await expect(trackDialog.getByText('↳')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(trackDialog).not.toBeVisible();

    // Red flags should be quick-openable too.
    const redFlagButton = page.locator('button', { hasText: 'Sinais de alerta' });
    if (await redFlagButton.isVisible()) {
      await redFlagButton.click();
      await expect(page.getByTestId('runner-redflags-dialog')).toBeVisible();
      await expect(page.getByTestId('runner-redflags-dialog')).toContainText('PA ≥180/120 mmHg');
      await page.keyboard.press('Escape');
      await expect(page.getByTestId('runner-redflags-dialog')).not.toBeVisible();
    }

    // Back step becomes available after moving forward.
    await expect(page.getByTestId('runner-back-step')).toBeEnabled();

    // Go back to previous step.
    await page.getByTestId('runner-back-step').click();

    // Reset should return to start (confirm dialog).
    if (await continueButton.isVisible()) {
      await continueButton.click();
    } else {
      await page.getByTestId('runner-option-0').click();
    }

    page.once('dialog', (dialog) => dialog.accept());
    await page.getByTestId('runner-reset').click();
    await expect(page.getByTestId('runner-back-step')).toBeDisabled();

    // Track is accessible as a secondary surface.
    await page.getByTestId('runner-open-track').click();
    await expect(page.getByTestId('runner-track-dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('runner-track-dialog')).not.toBeVisible();
  });
});
