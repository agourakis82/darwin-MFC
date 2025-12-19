/**
 * Export/Import CSV
 * Formato tabular para análise em planilhas
 */

import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';

export interface CSVExportOptions {
  delimiter?: string; // Delimitador (padrão: ',')
  includeHeaders?: boolean; // Incluir cabeçalhos
  encoding?: 'utf-8' | 'latin1'; // Codificação
}

/**
 * Escapa valores CSV (trata vírgulas, aspas, quebras de linha)
 */
function escapeCSVValue(value: string | number | undefined | null): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  
  // Se contém vírgula, aspas ou quebra de linha, precisa ser envolvido em aspas
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`; // Escapa aspas duplicando
  }
  
  return str;
}

/**
 * Exporta doenças para CSV
 */
export function exportDiseasesToCSV(
  diseases: Partial<Doenca>[],
  options: CSVExportOptions = {}
): string {
  const delimiter = options.delimiter || ',';
  const includeHeaders = options.includeHeaders !== false;
  
  const rows: string[] = [];
  
  // Cabeçalhos
  if (includeHeaders) {
    const headers = [
      'ID',
      'Título',
      'Categoria',
      'CID-10',
      'CIAP-2',
      'SNOMED-CT',
      'DOID',
      'UMLS CUI',
      'Definição',
      'Critérios Diagnósticos',
      'Red Flags',
      'Exames Iniciais',
    ];
    rows.push(headers.map(escapeCSVValue).join(delimiter));
  }
  
  // Dados
  diseases.forEach(disease => {
    const row = [
      disease.id || '',
      disease.titulo || '',
      disease.categoria || '',
      (disease.cid10 || []).join('; '),
      (disease.ciap2 || []).join('; '),
      Array.isArray(disease.snomedCT) ? disease.snomedCT.join('; ') : (disease.snomedCT || ''),
      disease.doid || '',
      disease.umlsCui || '',
      disease.quickView?.definicao || '',
      (disease.quickView?.criteriosDiagnosticos || []).join('; '),
      (disease.quickView?.redFlags || []).join('; '),
      (disease.quickView?.examesIniciais || []).join('; '),
    ];
    rows.push(row.map(escapeCSVValue).join(delimiter));
  });
  
  return rows.join('\n');
}

/**
 * Exporta medicamentos para CSV
 */
export function exportMedicationsToCSV(
  medications: Medicamento[],
  options: CSVExportOptions = {}
): string {
  const delimiter = options.delimiter || ',';
  const includeHeaders = options.includeHeaders !== false;
  
  const rows: string[] = [];
  
  // Cabeçalhos
  if (includeHeaders) {
    const headers = [
      'ID',
      'Nome Genérico',
      'Nomes Comerciais',
      'Classe Terapêutica',
      'Subclasse',
      'ATC Code',
      'RxNorm CUI',
      'DrugBank ID',
      'SNOMED-CT',
      'Forma Farmacêutica',
      'Via Administração',
      'Disponível SUS',
    ];
    rows.push(headers.map(escapeCSVValue).join(delimiter));
  }
  
  // Dados
  medications.forEach(med => {
    const formas = med.apresentacoes?.map(ap => ap.forma).join('; ') || '';
    const disponivelSUS = med.apresentacoes?.some(ap => ap.disponivelSUS) ? 'Sim' : 'Não';
    
    const row = [
      med.id || '',
      med.nomeGenerico || '',
      (med.nomesComerciais || []).join('; '),
      med.classeTerapeutica || '',
      med.subclasse || '',
      med.atcCode || '',
      med.rxNormCui || '',
      med.drugBankId || '',
      Array.isArray(med.snomedCT) ? med.snomedCT.join('; ') : (med.snomedCT || ''),
      formas,
      disponivelSUS,
    ];
    rows.push(row.map(escapeCSVValue).join(delimiter));
  });
  
  return rows.join('\n');
}

/**
 * Importa doenças de CSV
 */
export function importDiseasesFromCSV(
  csvString: string,
  options: CSVExportOptions = {}
): Partial<Doenca>[] {
  const delimiter = options.delimiter || ',';
  const lines = csvString.split(/\r?\n/).filter(line => line.trim());
  
  if (lines.length === 0) return [];
  
  // Detecta se tem cabeçalhos
  const hasHeaders = options.includeHeaders !== false;
  const startIndex = hasHeaders ? 1 : 0;
  
  const diseases: Partial<Doenca>[] = [];
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Parse CSV simples (não trata aspas aninhadas complexas)
    const values = parseCSVLine(line, delimiter);
    
    if (values.length < 2) continue; // Mínimo: ID e Título
    
    const disease: Partial<Doenca> = {
      id: values[0] || undefined,
      titulo: values[1] || undefined,
      categoria: values[2] as any || undefined,
      cid10: values[3] ? values[3].split(';').map(s => s.trim()).filter(Boolean) : undefined,
      ciap2: values[4] ? values[4].split(';').map(s => s.trim()).filter(Boolean) : undefined,
      snomedCT: values[5] || undefined,
      doid: values[6] || undefined,
      umlsCui: values[7] || undefined,
    };
    
    if (values[8] || values[9] || values[10] || values[11]) {
      disease.quickView = {
        definicao: values[8] || '',
        criteriosDiagnosticos: values[9] ? values[9].split(';').map(s => s.trim()).filter(Boolean) : [],
        tratamentoPrimeiraLinha: {
          naoFarmacologico: [],
          farmacologico: [],
        },
        redFlags: values[10] ? values[10].split(';').map(s => s.trim()).filter(Boolean) : [],
        examesIniciais: values[11] ? values[11].split(';').map(s => s.trim()).filter(Boolean) : [],
      };
    }
    
    diseases.push(disease);
  }
  
  return diseases;
}

/**
 * Parse simples de linha CSV (trata aspas básicas)
 */
function parseCSVLine(line: string, delimiter: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Aspas escapadas
        current += '"';
        i++; // Pula próxima aspa
      } else {
        // Toggle quotes
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current); // Último valor
  return values;
}

/**
 * Importa medicamentos de CSV
 */
export function importMedicationsFromCSV(
  csvString: string,
  options: CSVExportOptions = {}
): Partial<Medicamento>[] {
  const delimiter = options.delimiter || ',';
  const lines = csvString.split(/\r?\n/).filter(line => line.trim());
  
  if (lines.length === 0) return [];
  
  const hasHeaders = options.includeHeaders !== false;
  const startIndex = hasHeaders ? 1 : 0;
  
  const medications: Partial<Medicamento>[] = [];
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const values = parseCSVLine(line, delimiter);
    
    if (values.length < 2) continue; // Mínimo: ID e Nome Genérico
    
    const medication: Partial<Medicamento> = {
      id: values[0] || undefined,
      nomeGenerico: values[1] || undefined,
      nomesComerciais: values[2] ? values[2].split(';').map(s => s.trim()).filter(Boolean) : undefined,
      classeTerapeutica: values[3] as any || undefined,
      subclasse: values[4] as any || undefined,
      atcCode: values[5] || undefined,
      rxNormCui: values[6] || undefined,
      drugBankId: values[7] || undefined,
      snomedCT: values[8] || undefined,
    };
    
    // Forma farmacêutica e via
    if (values[9] || values[10]) {
      medication.apresentacoes = [
        {
          forma: (values[9] || 'comprimido') as any,
          concentracao: '',
          disponivelSUS: values[11]?.toLowerCase() === 'sim',
        },
      ];
    }
    
    medications.push(medication);
  }
  
  return medications;
}

