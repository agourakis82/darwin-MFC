import { test, expect, type Page } from '@playwright/test';

async function primeCommonClientState(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('darwin-mfc-region', 'BR');
      localStorage.setItem('darwin-mfc-region-onboarding-completed', 'true');
      localStorage.removeItem('darwin-mode-selection');
    } catch {
      // ignore
    }
  });
}

async function primeSettledClinicalState(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('darwin-mfc-region', 'BR');
      localStorage.setItem('darwin-mfc-region-onboarding-completed', 'true');
      localStorage.setItem('darwin-mode-selection', 'aps');
    } catch {
      // ignore
    }
  });
}

async function clearOnboardingClientState(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.removeItem('darwin-mfc-region');
      localStorage.removeItem('darwin-mfc-region-onboarding-completed');
      localStorage.removeItem('darwin-mode-selection');
    } catch {
      // ignore
    }
  });
}

function collectPageErrors(page: Page) {
  const pageErrors: Error[] = [];
  page.on('pageerror', (err) => {
    pageErrors.push(err);
    // eslint-disable-next-line no-console
    console.error('[pageerror]', err?.message);
  });
  return pageErrors;
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const documentWidth = document.documentElement.scrollWidth;
    const viewportWidth = document.documentElement.clientWidth;
    const bodyWidth = document.body.scrollWidth;

    return {
      documentWidth,
      viewportWidth,
      bodyWidth,
      overflowBy: Math.max(documentWidth, bodyWidth) - viewportWidth,
    };
  });

  expect(overflow.overflowBy, JSON.stringify(overflow)).toBeLessThanOrEqual(2);
}

type ClinicalRouteExpectation = {
  route: string;
  bodyPattern: RegExp;
};

const coreClinicalRoutes = [
  '/pt',
  '/pt/doencas',
  '/pt/medicamentos',
  '/pt/calculadoras',
  '/pt/protocolos',
  '/pt/ps/protocolos/pcr',
];

const deepClinicalRoutes: ClinicalRouteExpectation[] = [
  { route: '/pt/doencas/hipertensao-arterial', bodyPattern: /Hipertensão|HAS|arterial/i },
  { route: '/pt/contexto/hipertensao-arterial', bodyPattern: /Hipertensão|Contexto|arterial/i },
  { route: '/pt/medicamentos/losartana', bodyPattern: /Losartana|losartana/i },
  { route: '/pt/calculadoras/qsofa', bodyPattern: /qSOFA|SOFA/i },
  { route: '/pt/protocolos/flowchart/has', bodyPattern: /Hipertensão|HAS|fluxograma/i },
  { route: '/pt/protocolos/flowchart/has/guided', bodyPattern: /Hipertensão|HAS|guiado|fluxograma/i },
  { route: '/pt/ps/drogas/noradrenalina', bodyPattern: /Noradrenalina|norepinefrina/i },
];

const shellContentPattern = /DARWIN|Doenças|Medicamentos|Protocolos|Calculadoras|PCR/i;

test.describe('Clinical entry friction', () => {
  test.describe.configure({ mode: 'serial' });

  test('fresh landing sequences region before mode onboarding', async ({ page }) => {
    await clearOnboardingClientState(page);
    const pageErrors = collectPageErrors(page);

    await page.goto('/pt', { waitUntil: 'domcontentloaded' });

    const regionDialog = page.getByRole('dialog', { name: 'Welcome to Darwin-MFC' });
    await expect(regionDialog).toBeVisible();
    await expect(page.getByText('Escolha o modo inicial')).toHaveCount(0);

    await regionDialog.getByRole('button', { name: /Brazil/ }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByText('Escolha o modo inicial')).toBeVisible();
    await expect(page.getByText('Painel de guerra')).toHaveCount(0);

    expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
  });

  test('first landing can ask for mode without legacy emergency copy', async ({ page }) => {
    await primeCommonClientState(page);
    const pageErrors = collectPageErrors(page);

    await page.goto('/pt', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Escolha o modo inicial')).toBeVisible();
    await expect(page.getByText('Fluxo para situações críticas, protocolos rápidos e doses')).toBeVisible();
    await expect(page.getByText('Painel de guerra')).toHaveCount(0);

    expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
  });

  for (const route of [
    '/pt/doencas',
    '/pt/doencas/hipertensao-arterial',
    '/pt/medicamentos',
    '/pt/calculadoras',
    '/pt/protocolos',
    '/pt/ps/protocolos/pcr',
  ]) {
    test(`clinical deep link opens without initial mode blocker: ${route}`, async ({ page }) => {
      await primeCommonClientState(page);
      const pageErrors = collectPageErrors(page);

      await page.goto(route, { waitUntil: 'domcontentloaded' });

      await expect(page.getByText('Escolha o modo inicial')).toHaveCount(0);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('#main-content')).toBeVisible();

      expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
    });
  }

  for (const viewport of [
    { name: 'desktop', width: 1360, height: 860 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    for (const route of coreClinicalRoutes) {
      test(`settled ${viewport.name} shell has no modal or horizontal overflow: ${route}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await primeSettledClinicalState(page);
        const pageErrors = collectPageErrors(page);

        await page.goto(route, { waitUntil: 'domcontentloaded' });

        await expect(page.locator('[data-nextjs-dialog]')).toHaveCount(0);
        await expect(page.getByRole('dialog', { name: 'Welcome to Darwin-MFC' })).toHaveCount(0);
        await expect(page.getByText('Escolha o modo inicial')).toHaveCount(0);
        await expect(page.locator('body')).toContainText(shellContentPattern);
        await expectNoHorizontalOverflow(page);

        expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
      });
    }

    for (const { route, bodyPattern } of deepClinicalRoutes) {
      test(`settled ${viewport.name} deep clinical route is usable: ${route}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await primeSettledClinicalState(page);
        const pageErrors = collectPageErrors(page);

        await page.goto(route, { waitUntil: 'domcontentloaded' });

        await expect(page.locator('[data-nextjs-dialog]')).toHaveCount(0);
        await expect(page.getByRole('dialog', { name: 'Welcome to Darwin-MFC' })).toHaveCount(0);
        await expect(page.getByText('Escolha o modo inicial')).toHaveCount(0);
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('#main-content')).toBeVisible();
        await expect(page.locator('body')).toContainText(bodyPattern);
        await expectNoHorizontalOverflow(page);

        expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
      });
    }
  }
});
