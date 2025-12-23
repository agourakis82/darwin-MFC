/**
 * Drug Interaction Export Utilities
 * Exports interaction data in PDF, CSV, and JSON formats
 */

import type { MedicationNetwork, MedicationEdge, MedicationNode } from './medication-network';

// =============================================================================
// TYPES
// =============================================================================

export interface InteractionReport {
  generatedAt: string;
  totalMedications: number;
  totalInteractions: number;
  severitySummary: {
    grave: number;
    moderada: number;
    leve: number;
  };
  medications: Array<{
    id: string;
    name: string;
    class?: string;
    interactionCount: number;
  }>;
  interactions: Array<{
    drug1: string;
    drug2: string;
    severity: string;
    effect: string;
    mechanism?: string;
    conduct: string;
  }>;
}

// =============================================================================
// GENERATE REPORT DATA
// =============================================================================

export function generateInteractionReport(network: MedicationNetwork): InteractionReport {
  const severitySummary = {
    grave: 0,
    moderada: 0,
    leve: 0,
  };

  network.edges.forEach((edge) => {
    severitySummary[edge.strength]++;
  });

  // Count interactions per node
  const interactionCounts = new Map<string, number>();
  network.edges.forEach((edge) => {
    interactionCounts.set(edge.source, (interactionCounts.get(edge.source) || 0) + 1);
    interactionCounts.set(edge.target, (interactionCounts.get(edge.target) || 0) + 1);
  });

  const medications = network.nodes.map((node) => ({
    id: node.id,
    name: node.name,
    class: node.classe,
    interactionCount: interactionCounts.get(node.id) || 0,
  }));

  const interactions = network.edges.map((edge) => {
    const sourceName = network.nodes.find((n) => n.id === edge.source)?.name || edge.source;
    const targetName = network.nodes.find((n) => n.id === edge.target)?.name || edge.target;

    return {
      drug1: sourceName,
      drug2: targetName,
      severity: edge.strength === 'grave' ? 'Grave' : edge.strength === 'moderada' ? 'Moderada' : 'Leve',
      effect: edge.interaction.efeito,
      mechanism: edge.interaction.mecanismo,
      conduct: edge.interaction.conduta,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    totalMedications: network.nodes.length,
    totalInteractions: network.edges.length,
    severitySummary,
    medications,
    interactions,
  };
}

// =============================================================================
// EXPORT TO JSON
// =============================================================================

export function exportToJSON(network: MedicationNetwork, filename?: string): void {
  const report = generateInteractionReport(network);
  const json = JSON.stringify(report, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  downloadBlob(blob, filename || `interaction-report-${formatDate()}.json`);
}

// =============================================================================
// EXPORT TO CSV
// =============================================================================

export function exportToCSV(network: MedicationNetwork, filename?: string): void {
  const report = generateInteractionReport(network);

  // CSV Header
  const headers = ['Medicamento 1', 'Medicamento 2', 'Gravidade', 'Efeito', 'Mecanismo', 'Conduta'];
  const rows = report.interactions.map((i) => [
    escapeCsvField(i.drug1),
    escapeCsvField(i.drug2),
    escapeCsvField(i.severity),
    escapeCsvField(i.effect),
    escapeCsvField(i.mechanism || ''),
    escapeCsvField(i.conduct),
  ]);

  const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const bom = '\uFEFF'; // UTF-8 BOM for Excel compatibility
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });
  downloadBlob(blob, filename || `interaction-report-${formatDate()}.csv`);
}

// =============================================================================
// EXPORT TO PDF (HTML-based printable using safe DOM methods)
// =============================================================================

export function exportToPDF(network: MedicationNetwork): void {
  const report = generateInteractionReport(network);

  // Open a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.error('Failed to open print window. Please allow popups.');
    return;
  }

  const doc = printWindow.document;

  // Build the document using safe DOM methods
  const html = doc.documentElement;
  html.lang = 'pt-BR';

  // Create head
  const head = doc.head;

  const meta = doc.createElement('meta');
  meta.setAttribute('charset', 'UTF-8');
  head.appendChild(meta);

  const title = doc.createElement('title');
  title.textContent = 'Relatório de Interações Medicamentosas - Darwin-MFC';
  head.appendChild(title);

  const style = doc.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1d1d1f; line-height: 1.5; }
    .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e5e5e5; }
    .header h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
    .header p { color: #86868b; font-size: 14px; }
    .summary { display: flex; justify-content: center; gap: 40px; margin-bottom: 40px; }
    .summary-item { text-align: center; }
    .summary-value { font-size: 32px; font-weight: 700; }
    .summary-label { font-size: 12px; color: #86868b; text-transform: uppercase; letter-spacing: 0.5px; }
    .severe { color: #EF4444; }
    .moderate { color: #F59E0B; }
    .mild { color: #3B82F6; }
    .section { margin-bottom: 30px; }
    .section h2 { font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e5e5; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e5e5; }
    th { background: #f5f5f7; font-weight: 600; }
    tr:hover { background: #fafafa; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
    .badge-grave { background: #FEE2E2; color: #991B1B; }
    .badge-moderada { background: #FEF3C7; color: #92400E; }
    .badge-leve { background: #DBEAFE; color: #1E40AF; }
    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #86868b; }
    @media print { body { padding: 20px; } .header { margin-bottom: 20px; } .summary { gap: 20px; } }
  `;
  head.appendChild(style);

  // Create body content
  const body = doc.body;

  // Header section
  const headerDiv = doc.createElement('div');
  headerDiv.className = 'header';

  const h1 = doc.createElement('h1');
  h1.textContent = 'Relatório de Interações Medicamentosas';
  headerDiv.appendChild(h1);

  const dateP = doc.createElement('p');
  dateP.textContent = `Gerado em ${new Date().toLocaleDateString('pt-BR', { dateStyle: 'full' })} às ${new Date().toLocaleTimeString('pt-BR')}`;
  headerDiv.appendChild(dateP);

  const sourceP = doc.createElement('p');
  sourceP.style.marginTop = '8px';
  sourceP.textContent = 'Darwin-MFC • Medicina de Família e Comunidade';
  headerDiv.appendChild(sourceP);

  body.appendChild(headerDiv);

  // Summary section
  const summaryDiv = doc.createElement('div');
  summaryDiv.className = 'summary';

  const summaryItems = [
    { value: report.totalMedications, label: 'Medicamentos', className: '' },
    { value: report.totalInteractions, label: 'Interações', className: '' },
    { value: report.severitySummary.grave, label: 'Graves', className: 'severe' },
    { value: report.severitySummary.moderada, label: 'Moderadas', className: 'moderate' },
    { value: report.severitySummary.leve, label: 'Leves', className: 'mild' },
  ];

  summaryItems.forEach((item) => {
    const itemDiv = doc.createElement('div');
    itemDiv.className = 'summary-item';

    const valueDiv = doc.createElement('div');
    valueDiv.className = `summary-value ${item.className}`;
    valueDiv.textContent = String(item.value);
    itemDiv.appendChild(valueDiv);

    const labelDiv = doc.createElement('div');
    labelDiv.className = 'summary-label';
    labelDiv.textContent = item.label;
    itemDiv.appendChild(labelDiv);

    summaryDiv.appendChild(itemDiv);
  });

  body.appendChild(summaryDiv);

  // Interactions table section
  const sectionDiv = doc.createElement('div');
  sectionDiv.className = 'section';

  const sectionH2 = doc.createElement('h2');
  sectionH2.textContent = 'Lista de Interações';
  sectionDiv.appendChild(sectionH2);

  const table = doc.createElement('table');
  const thead = doc.createElement('thead');
  const headerRow = doc.createElement('tr');

  ['Medicamento 1', 'Medicamento 2', 'Gravidade', 'Efeito', 'Conduta'].forEach((text) => {
    const th = doc.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = doc.createElement('tbody');

  // Sort interactions by severity
  const sortedInteractions = [...report.interactions].sort((a, b) => {
    const order: Record<string, number> = { Grave: 0, Moderada: 1, Leve: 2 };
    return (order[a.severity] ?? 3) - (order[b.severity] ?? 3);
  });

  sortedInteractions.forEach((interaction) => {
    const tr = doc.createElement('tr');

    const td1 = doc.createElement('td');
    td1.textContent = interaction.drug1;
    tr.appendChild(td1);

    const td2 = doc.createElement('td');
    td2.textContent = interaction.drug2;
    tr.appendChild(td2);

    const td3 = doc.createElement('td');
    const badge = doc.createElement('span');
    badge.className = `badge badge-${interaction.severity.toLowerCase()}`;
    badge.textContent = interaction.severity;
    td3.appendChild(badge);
    tr.appendChild(td3);

    const td4 = doc.createElement('td');
    td4.textContent = interaction.effect;
    tr.appendChild(td4);

    const td5 = doc.createElement('td');
    td5.textContent = interaction.conduct;
    tr.appendChild(td5);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  sectionDiv.appendChild(table);
  body.appendChild(sectionDiv);

  // Footer section
  const footerDiv = doc.createElement('div');
  footerDiv.className = 'footer';

  const footerP1 = doc.createElement('p');
  footerP1.textContent = 'Este relatório foi gerado automaticamente pela plataforma Darwin-MFC.';
  footerDiv.appendChild(footerP1);

  const footerP2 = doc.createElement('p');
  footerP2.textContent = 'As informações devem ser utilizadas como apoio à decisão clínica, não substituindo o julgamento médico.';
  footerDiv.appendChild(footerP2);

  body.appendChild(footerDiv);

  // Focus and print
  printWindow.focus();
  setTimeout(() => printWindow.print(), 250);
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function formatDate(): string {
  return new Date().toISOString().split('T')[0];
}

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
