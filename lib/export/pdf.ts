/**
 * Export PDF
 * Geração de documentos PDF para impressão e arquivamento
 * 
 * Nota: Requer biblioteca jsPDF (client-side)
 */

import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';

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

