import { test, expect } from '@playwright/test';

const workflows = [
  { slug: 'pcr', title: 'PCR - ACLS Adulto', extraText: 'PCR role board' },
  { slug: 'sepse', title: 'Sepse - Bundle da Primeira Hora', extraText: null },
  { slug: 'iot', title: 'IOT / RSI', extraText: null },
] as const;

const PCR_ENVELOPE = `{
  "adapter_version": "ps.integration.v1",
  "source": "darwin-ps",
  "exported_at": "2026-03-08T00:00:00.000Z",
  "schema_name": "handoff_pcr",
  "schema_version": "ps.v1",
  "payload": {
    "schema_version": "ps.v1",
    "schema_name": "handoff_pcr",
    "workflow": "pcr",
    "severity": "critical",
    "protocol": "PCR - ACLS Adulto",
    "current_step": "Checar ritmo",
    "reviewed": "adrenalina",
    "confirmed": "adrenalina 1 mg",
    "completed": "RCP 2 min",
    "pending": "novo choque; checar via aérea",
    "timeline": "10:00 • Confirmado • adrenalina 1 mg",
    "next_focus": "compressao_ritmo_drogas",
    "team_roles": "Líder: Dr. Teste",
    "post_rosc": "no"
  },
  "fields": [
    { "label": "workflow", "value": "pcr" }
  ]
}`;

const SEPSE_ENVELOPE = `{
  "adapter_version": "ps.integration.v1",
  "source": "darwin-ps",
  "exported_at": "2026-03-08T00:00:00.000Z",
  "schema_name": "handoff_sepse_choque",
  "schema_version": "ps.v1",
  "payload": {
    "schema_version": "ps.v1",
    "schema_name": "handoff_sepse_choque",
    "workflow": "sepse",
    "severity": "critical",
    "protocol": "Sepse - Bundle da Primeira Hora",
    "current_step": "Reavaliar perfusão",
    "reviewed": "noradrenalina",
    "confirmed": "norad 0.1 mcg/kg/min",
    "completed": "antibiótico iniciado",
    "pending": "titular vasoativo",
    "timeline": "10:00 • Confirmado • norad",
    "next_focus": "titulacao_e_perfusao",
    "antibiotic_status": "completed",
    "vasopressor_status": "running"
  },
  "fields": [
    { "label": "workflow", "value": "sepse" }
  ]
}`;

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

test.describe('PS Runner Smoke', () => {
  test('dashboard loads', async ({ page }) => {
    await primePSClientState(page);

    const pageErrors: Error[] = [];
    page.on('pageerror', (err) => {
      pageErrors.push(err);
      // eslint-disable-next-line no-console
      console.error('[pageerror]', err?.message);
    });

    await page.goto('/pt/ps', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Pronto-socorro operacional')).toBeVisible();

    expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
  });

  for (const workflow of workflows) {
    test(`${workflow.slug} runner loads and key safety surfaces render`, async ({ page }) => {
      await primePSClientState(page);

      const pageErrors: Error[] = [];
      page.on('pageerror', (err) => {
        pageErrors.push(err);
        // eslint-disable-next-line no-console
        console.error('[pageerror]', err?.message);
      });

      await page.goto(`/pt/ps/protocolos/${workflow.slug}`, { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('heading', { name: workflow.title })).toBeVisible();
      await expect(page.getByText('Checkpoint de segurança').first()).toBeVisible();
      await expect(page.getByText('Timeline de segurança')).toBeVisible();
      await expect(page.getByText('Fluxo do protocolo')).toBeVisible();

      if (workflow.extraText) {
        await expect(page.getByText(workflow.extraText)).toBeVisible();
      }

      await page.getByRole('button', { name: /Abrir handoff/i }).click();
      await expect(page.getByText('Campos estruturados')).toBeVisible();
      await expect(page.getByRole('button', { name: /Copiar handoff/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Copiar estruturado/i })).toBeVisible();

      expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
    });
  }

  test('pcr drug sheet and handoff actions render', async ({ page }) => {
    await primePSClientState(page);

    const pageErrors: Error[] = [];
    page.on('pageerror', (err) => {
      pageErrors.push(err);
      // eslint-disable-next-line no-console
      console.error('[pageerror]', err?.message);
    });

    await page.goto('/pt/ps/protocolos/pcr', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('ps-related-drug-adrenalina')).toBeVisible();

    await page.getByRole('button', { name: /Abrir handoff/i }).click();
    await expect(page.getByTestId('ps-handoff-panel')).toBeVisible();
    await expect(page.getByRole('button', { name: /Copiar handoff/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Copiar estruturado/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Copiar nota clínica/i })).toBeVisible();

    await page.getByRole('button', { name: /Abrir debrief/i }).click();
    await expect(page.getByTestId('ps-debrief-panel')).toBeVisible();
    await expect(page.getByTestId('ps-debrief-confirmed-count')).toBeVisible();
    await expect(page.getByTestId('ps-debrief-reviewed-count')).toBeVisible();
    await expect(page.getByTestId('ps-debrief-completed-count')).toBeVisible();

    await page.getByTestId('ps-role-board-leader').click();
    await expect(page.getByTestId('ps-role-assignment-sheet')).toBeVisible();
    await page.getByTestId('ps-role-assignment-input').fill('Dr. Teste');
    await page.getByTestId('ps-role-assignment-save').click();
    await expect(page.getByTestId('ps-role-board-leader').getByText('Dr. Teste')).toBeVisible();

    expect(pageErrors, pageErrors[0]?.stack || pageErrors[0]?.message).toHaveLength(0);
  });

  test('handoff import flow is covered in main PS smoke', async ({ page }) => {
    await primePSClientState(page);
    await page.goto('/pt/ps/protocolos/pcr', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: /Abrir handoff/i }).click();
    await page.getByTestId('ps-handoff-import-toggle').click();
    await page.getByTestId('ps-handoff-import-input').fill(PCR_ENVELOPE);

    await expect(page.getByTestId('ps-handoff-import-preview')).toBeVisible();
    await page.getByTestId('ps-handoff-import-submit').click();
    await expect(page.getByTestId('ps-handoff-import-confirmation')).toBeVisible();
    await page.getByTestId('ps-handoff-import-submit').click();
    await expect(page.getByTestId('ps-handoff-panel').getByText('1 evento(s)')).toBeVisible();

    await page.getByTestId('ps-handoff-import-toggle').click();
    await page.getByTestId('ps-handoff-import-input').fill(SEPSE_ENVELOPE);
    await page.getByTestId('ps-handoff-import-submit').click();
    await expect(page.getByTestId('ps-handoff-import-confirmation')).toBeVisible();
    await page.getByTestId('ps-handoff-import-submit').click();
    await expect(page.getByTestId('ps-handoff-import-error')).toHaveText('Handoff incompatível com o workflow atual.');
  });
});
