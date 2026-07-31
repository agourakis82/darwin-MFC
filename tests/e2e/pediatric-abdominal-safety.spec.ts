import { expect, test, type Page } from '@playwright/test';

async function primeApsState(page: Page) {
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

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    bodyWidth: document.body.scrollWidth,
  }));
  expect(
    Math.max(overflow.documentWidth, overflow.bodyWidth) - overflow.viewportWidth,
    JSON.stringify(overflow),
  ).toBeLessThanOrEqual(2);
}

async function setPatientAge(page: Page, value: string, unit: 'dias' | 'meses' | 'anos') {
  await page.getByRole('spinbutton', { name: 'Idade do paciente' }).fill(value);
  await page.getByRole('combobox', { name: 'Unidade', exact: true }).selectOption(unit);
}

async function setPrimarySymptom(page: Page, symptom: string) {
  await page.getByRole('combobox', { name: 'Sintoma principal' }).fill(symptom);
}

async function addSecondarySymptom(page: Page, symptom: string) {
  await page.getByRole('combobox', { name: /Sintoma associado/ }).fill(symptom);
  await page.getByRole('button', { name: 'Adicionar sintoma associado' }).click();
}

function triStateGroup(page: Page, name: string) {
  return page.getByRole('group', { name, exact: true });
}

async function answerYes(page: Page, name: string) {
  const group = triStateGroup(page, name);
  await expect(group).toHaveCount(1);
  await group.getByRole('button', { name: 'Sim', exact: true }).click();
}

test.describe('Pediatric abdominal safety continuity', () => {
  test.beforeEach(async ({ page }) => {
    await primeApsState(page);
  });

  test('shares vomiting and diarrhea signs once while preserving urgent answers', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page);
    await page.goto('/pt/prontuario', { waitUntil: 'domcontentloaded' });
    await setPatientAge(page, '6', 'meses');
    await setPrimarySymptom(page, 'Dor abdominal');

    await expect(page.getByRole('heading', { name: 'Dor abdominal e vômitos pediátricos' })).toBeVisible();
    await page.getByRole('combobox', { name: 'Padrão da dor' }).selectOption('intermittent-colicky');
    await page.getByText('Padrões por idade e causas extra-abdominais', { exact: true }).click();
    await answerYes(page, 'Palidez ou letargia episódica');
    await answerYes(page, 'Vomita tudo');
    await answerYes(page, 'Vômito verde / bilioso');

    await expect(page.getByText(/excluir invaginação intestinal/i)).toBeVisible();
    await expect(page.getByText(/vômito verde\/bilioso, possível obstrução/i)).toBeVisible();

    await addSecondarySymptom(page, 'Diarreia');

    await expect(page.getByRole('heading', { name: 'Diarreia e hidratação pediátrica' })).toBeVisible();
    await expect(triStateGroup(page, 'Vomita tudo')).toHaveCount(1);
    await expect(triStateGroup(page, 'Sangue visível nas fezes')).toHaveCount(1);
    await expect(triStateGroup(page, 'Vômito verde / bilioso')).toHaveCount(1);
    await expect(triStateGroup(page, 'Distensão abdominal')).toHaveCount(1);
    await expect(triStateGroup(page, 'Vomita tudo').getByRole('button', { name: 'Sim', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(triStateGroup(page, 'Vômito verde / bilioso').getByRole('button', { name: 'Sim', exact: true })).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('button', { name: 'Remover Diarreia' }).click();

    await expect(page.getByRole('heading', { name: 'Diarreia e hidratação pediátrica' })).toHaveCount(0);
    await expect(triStateGroup(page, 'Vomita tudo')).toHaveCount(1);
    await expect(triStateGroup(page, 'Vomita tudo').getByRole('button', { name: 'Sim', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expectNoHorizontalOverflow(page);
    expect(runtimeErrors).toEqual([]);
  });

  test('keeps appendicitis language non-diagnostic and Sounio authorization closed', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page);
    await page.goto('/pt/prontuario', { waitUntil: 'domcontentloaded' });
    await setPatientAge(page, '4', 'anos');
    await setPrimarySymptom(page, 'Dor abdominal');
    await addSecondarySymptom(page, 'Febre');

    await page.getByRole('combobox', { name: 'Padrão da dor' }).selectOption('constant-progressive');
    await page.getByRole('combobox', { name: 'Localização' }).selectOption('right-lower-quadrant');
    await answerYes(page, 'Migrou para quadrante inferior direito');
    await answerYes(page, 'Piora ao mover / não anda ou pula');

    await expect(page.getByText(/Padrão compatível que exige excluir apendicite hoje/i)).toBeVisible();
    await expect(page.getByText(/isto não confirma o diagnóstico/i)).toBeVisible();
    await expect(page.getByText(/Não calcula escore, não solicita imagem/i)).toBeVisible();

    await page.getByRole('button', { name: 'Analisar' }).click();
    await expect(page.getByText('Sounio · integridade verificada · autorização clínica bloqueada')).toBeVisible();
    await expect(page.getByText(/probabilidade calibrada/i)).toHaveCount(0);

    await setPatientAge(page, '18', 'anos');
    await expect(page.getByRole('heading', { name: 'Dor abdominal e vômitos pediátricos' })).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
    expect(runtimeErrors).toEqual([]);
  });
});
