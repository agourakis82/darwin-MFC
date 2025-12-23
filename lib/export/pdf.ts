/**
 * Export PDF
 * Geração de documentos PDF para impressão e arquivamento
 *
 * Nota: Requer biblioteca jsPDF (client-side)
 */

import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';
import type { Note } from '@/lib/notes/storage';
import type { AnalyticsEvent } from '@/lib/analytics/tracker';

export interface PDFExportOptions {
  title?: string;
  author?: string;
  subject?: string;
  orientation?: 'portrait' | 'landscape';
  format?: 'a4' | 'letter';
  fontSize?: number;
  margin?: number;
}

/**
 * Exporta doença para PDF
 * Nota: Esta função deve ser chamada no cliente (usa jsPDF)
 */
export async function exportDiseaseToPDF(
  disease: Partial<Doenca>,
  options: PDFExportOptions = {}
): Promise<Blob> {
  // Dynamic import para jsPDF (apenas no cliente)
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF({
    orientation: options.orientation || 'portrait',
    unit: 'mm',
    format: options.format || 'a4',
  });
  
  const margin = options.margin || 20;
  const fontSize = options.fontSize || 12;
  let yPos = margin;
  
  // Metadados do documento
  if (options.title) doc.setProperties({ title: options.title });
  if (options.author) doc.setProperties({ author: options.author });
  if (options.subject) doc.setProperties({ subject: options.subject });
  
  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(disease.titulo || disease.id || 'Doença', margin, yPos);
  yPos += 10;
  
  // Categoria
  if (disease.categoria) {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal');
    doc.text(`Categoria: ${disease.categoria}`, margin, yPos);
    yPos += 7;
  }
  
  // Códigos
  if (disease.cid10 && disease.cid10.length > 0) {
    doc.text(`CID-10: ${disease.cid10.join(', ')}`, margin, yPos);
    yPos += 7;
  }
  
  if (disease.ciap2 && disease.ciap2.length > 0) {
    doc.text(`CIAP-2: ${disease.ciap2.join(', ')}`, margin, yPos);
    yPos += 7;
  }
  
  // Definição
  if (disease.quickView?.definicao) {
    yPos += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Definição:', margin, yPos);
    yPos += 7;
    
    doc.setFont('helvetica', 'normal');
    const definicaoLines = doc.splitTextToSize(disease.quickView.definicao, 170);
    doc.text(definicaoLines, margin, yPos);
    yPos += definicaoLines.length * 7;
  }
  
  // Critérios diagnósticos
  if (disease.quickView?.criteriosDiagnosticos && disease.quickView.criteriosDiagnosticos.length > 0) {
    yPos += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Critérios Diagnósticos:', margin, yPos);
    yPos += 7;
    
    doc.setFont('helvetica', 'normal');
    disease.quickView.criteriosDiagnosticos.forEach(criterio => {
      doc.text(`• ${criterio}`, margin + 5, yPos);
      yPos += 7;
      
      // Nova página se necessário
      if (yPos > 270) {
        doc.addPage();
        yPos = margin;
      }
    });
  }
  
  // Red Flags
  if (disease.quickView?.redFlags && disease.quickView.redFlags.length > 0) {
    yPos += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(fontSize - 1);
    doc.setTextColor(200, 0, 0); // Vermelho
    doc.text('Sinais de Alarme (Red Flags):', margin, yPos);
    yPos += 7;
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); // Preto
    disease.quickView.redFlags.forEach(flag => {
      doc.text(`⚠ ${flag}`, margin + 5, yPos);
      yPos += 7;
      
      if (yPos > 270) {
        doc.addPage();
        yPos = margin;
      }
    });
  }
  
  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount} - Darwin-MFC - ${new Date().toLocaleDateString('pt-BR')}`,
      margin,
      285
    );
  }
  
  return doc.output('blob');
}

/**
 * Exporta lista de doenças para PDF
 */
export async function exportDiseasesToPDF(
  diseases: Partial<Doenca>[],
  options: PDFExportOptions = {}
): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF({
    orientation: options.orientation || 'portrait',
    unit: 'mm',
    format: options.format || 'a4',
  });
  
  const margin = options.margin || 20;
  const fontSize = options.fontSize || 12;
  let yPos = margin;
  
  // Título
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(options.title || 'Lista de Doenças', margin, yPos);
  yPos += 10;
  
  // Lista
  doc.setFontSize(fontSize);
  doc.setFont('helvetica', 'normal');
  
  diseases.forEach((disease, index) => {
    // Nova página se necessário
    if (yPos > 270) {
      doc.addPage();
      yPos = margin;
    }
    
    // Número e título
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${disease.titulo || disease.id || 'Doença'}`, margin, yPos);
    yPos += 7;
    
    // Categoria e códigos
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize - 2);
    if (disease.categoria) {
      doc.text(`Categoria: ${disease.categoria}`, margin + 5, yPos);
      yPos += 5;
    }
    
    if (disease.cid10 && disease.cid10.length > 0) {
      doc.text(`CID-10: ${disease.cid10[0]}`, margin + 5, yPos);
      yPos += 5;
    }
    
    yPos += 3; // Espaço entre itens
    doc.setFontSize(fontSize);
  });
  
  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount} - Darwin-MFC - ${new Date().toLocaleDateString('pt-BR')}`,
      margin,
      285
    );
  }
  
  return doc.output('blob');
}

/**
 * Exporta medicamento para PDF
 */
export async function exportMedicationToPDF(
  medication: Medicamento,
  options: PDFExportOptions = {}
): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF({
    orientation: options.orientation || 'portrait',
    unit: 'mm',
    format: options.format || 'a4',
  });
  
  const margin = options.margin || 20;
  const fontSize = options.fontSize || 12;
  let yPos = margin;
  
  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(medication.nomeGenerico || medication.id || 'Medicamento', margin, yPos);
  yPos += 10;
  
  // Nomes comerciais
  if (medication.nomesComerciais && medication.nomesComerciais.length > 0) {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nomes comerciais: ${medication.nomesComerciais.join(', ')}`, margin, yPos);
    yPos += 7;
  }
  
  // Classe terapêutica
  if (medication.classeTerapeutica) {
    doc.text(`Classe: ${medication.classeTerapeutica}`, margin, yPos);
    yPos += 7;
  }
  
  // Códigos
  if (medication.atcCode) {
    doc.text(`ATC: ${medication.atcCode}`, margin, yPos);
    yPos += 7;
  }
  
  if (medication.rxNormCui) {
    doc.text(`RxNorm: ${medication.rxNormCui}`, margin, yPos);
    yPos += 7;
  }
  
  // Apresentações
  if (medication.apresentacoes && medication.apresentacoes.length > 0) {
    yPos += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Apresentações:', margin, yPos);
    yPos += 7;
    
    doc.setFont('helvetica', 'normal');
    medication.apresentacoes.forEach(ap => {
      doc.text(
        `• ${ap.forma} - ${ap.concentracao} ${ap.disponivelSUS ? '(SUS)' : ''}`,
        margin + 5,
        yPos
      );
      yPos += 7;
    });
  }
  
  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount} - Darwin-MFC - ${new Date().toLocaleDateString('pt-BR')}`,
      margin,
      285
    );
  }
  
  return doc.output('blob');
}

/**
 * Exporta notas para PDF
 */
export async function exportNotesToPDF(
  notes: Note[],
  options: PDFExportOptions = {}
): Promise<Blob> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: options.orientation || 'portrait',
    unit: 'mm',
    format: options.format || 'a4',
  });

  const margin = options.margin || 20;
  const fontSize = options.fontSize || 12;
  let yPos = margin;

  // Título
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(options.title || 'Minhas Notas', margin, yPos);
  yPos += 15;

  // Metadados
  const totalNotes = notes.length;
  const activeNotes = notes.filter(n => !n.isArchived).length;
  const pinnedNotes = notes.filter(n => n.isPinned).length;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total: ${totalNotes} notas • ${activeNotes} ativas • ${pinnedNotes} fixadas`, margin, yPos);
  yPos += 10;

  // Notas
  notes.forEach((note, index) => {
    // Nova página se necessário
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }

    // Título da nota
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const noteTitle = `${index + 1}. ${note.title}`;
    doc.text(noteTitle, margin, yPos);
    yPos += 7;

    // Metadados da nota
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(128, 128, 128);
    const metadata = `Tipo: ${note.type} • Tags: ${note.tags.join(', ') || 'Nenhuma'} • ${new Date(note.updatedAt).toLocaleDateString('pt-BR')}`;
    doc.text(metadata, margin, yPos);
    yPos += 6;

    // Conteúdo
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(fontSize - 1);
    const contentLines = doc.splitTextToSize(note.content || 'Nota vazia', 170);
    doc.text(contentLines, margin, yPos);
    yPos += contentLines.length * 5 + 5;

    // Linked content
    if (note.linkedTo) {
      doc.setTextColor(0, 0, 200);
      doc.text(`📎 Vinculado a: ${note.linkedTo.name}`, margin, yPos);
      yPos += 6;
      doc.setTextColor(0, 0, 0);
    }

    yPos += 5; // Espaço entre notas
  });

  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount} - Darwin-MFC - ${new Date().toLocaleDateString('pt-BR')}`,
      margin,
      285
    );
  }

  return doc.output('blob');
}

/**
 * Exporta relatório de analytics para PDF
 */
export async function exportAnalyticsToPDF(
  events: AnalyticsEvent[],
  options: PDFExportOptions = {}
): Promise<Blob> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: options.orientation || 'portrait',
    unit: 'mm',
    format: options.format || 'a4',
  });

  const margin = options.margin || 20;
  const fontSize = options.fontSize || 12;
  let yPos = margin;

  // Título
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(options.title || 'Relatório de Análise', margin, yPos);
  yPos += 15;

  // Estatísticas gerais
  doc.setFontSize(14);
  doc.text('Resumo', margin, yPos);
  yPos += 10;

  doc.setFontSize(fontSize);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total de eventos: ${events.length}`, margin, yPos);
  yPos += 7;

  // Contagem por tipo
  const eventsByType = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  doc.text('Eventos por tipo:', margin, yPos);
  yPos += 7;

  Object.entries(eventsByType)
    .sort(([, a], [, b]) => b - a)
    .forEach(([type, count]) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = margin;
      }
      doc.text(`  • ${type}: ${count}`, margin + 5, yPos);
      yPos += 6;
    });

  yPos += 10;

  // Lista de eventos recentes (últimos 50)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Eventos Recentes', margin, yPos);
  yPos += 10;

  const recentEvents = events.slice(-50).reverse();
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  recentEvents.forEach((event, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = margin;
    }

    const timestamp = new Date(event.timestamp).toLocaleString('pt-BR');
    doc.text(`${index + 1}. [${timestamp}] ${event.type}`, margin, yPos);
    yPos += 5;
  });

  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount} - Darwin-MFC - ${new Date().toLocaleDateString('pt-BR')}`,
      margin,
      285
    );
  }

  return doc.output('blob');
}
