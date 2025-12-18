/**
 * Export/Import JSON
 * Formato padrão para intercâmbio de dados
 */

import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';

export interface JSONExportOptions {
  pretty?: boolean; // Formatação com indentação
  includeMetadata?: boolean; // Incluir metadados (versão, data, etc.)
}

export interface JSONExportMetadata {
  version: string;
  exportDate: string;
  source: string;
  format: 'json';
}

/**
 * Exporta doenças para JSON
 */
export function exportDiseasesToJSON(
  diseases: Partial<Doenca>[],
  options: JSONExportOptions = {}
): string {
  const data: {
    metadata?: JSONExportMetadata;
    diseases: Partial<Doenca>[];
  } = {
    diseases,
  };

  if (options.includeMetadata) {
    data.metadata = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      source: 'Darwin-MFC',
      format: 'json',
    };
  }

  return options.pretty
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data);
}

/**
 * Exporta medicamentos para JSON
 */
export function exportMedicationsToJSON(
  medications: Medicamento[],
  options: JSONExportOptions = {}
): string {
  const data: {
    metadata?: JSONExportMetadata;
    medications: Medicamento[];
  } = {
    medications,
  };

  if (options.includeMetadata) {
    data.metadata = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      source: 'Darwin-MFC',
      format: 'json',
    };
  }

  return options.pretty
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data);
}

/**
 * Exporta dados completos (doenças + medicamentos) para JSON
 */
export function exportFullDataToJSON(
  diseases: Partial<Doenca>[],
  medications: Medicamento[],
  options: JSONExportOptions = {}
): string {
  const data: {
    metadata?: JSONExportMetadata;
    diseases: Partial<Doenca>[];
    medications: Medicamento[];
  } = {
    diseases,
    medications,
  };

  if (options.includeMetadata) {
    data.metadata = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      source: 'Darwin-MFC',
      format: 'json',
    };
  }

  return options.pretty
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data);
}

/**
 * Importa doenças de JSON
 */
export function importDiseasesFromJSON(jsonString: string): Partial<Doenca>[] {
  try {
    const data = JSON.parse(jsonString);
    
    if (Array.isArray(data)) {
      return data;
    }
    
    if (data.diseases && Array.isArray(data.diseases)) {
      return data.diseases;
    }
    
    throw new Error('Formato JSON inválido: esperado array de doenças ou objeto com propriedade "diseases"');
  } catch (error) {
    throw new Error(`Erro ao importar JSON: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
}

/**
 * Importa medicamentos de JSON
 */
export function importMedicationsFromJSON(jsonString: string): Medicamento[] {
  try {
    const data = JSON.parse(jsonString);
    
    if (Array.isArray(data)) {
      return data;
    }
    
    if (data.medications && Array.isArray(data.medications)) {
      return data.medications;
    }
    
    throw new Error('Formato JSON inválido: esperado array de medicamentos ou objeto com propriedade "medications"');
  } catch (error) {
    throw new Error(`Erro ao importar JSON: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
}

/**
 * Valida estrutura JSON de doença
 */
export function validateDiseaseJSON(data: unknown): data is Partial<Doenca> {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return typeof obj.id === 'string' || typeof obj.titulo === 'string';
}

/**
 * Valida estrutura JSON de medicamento
 */
export function validateMedicationJSON(data: unknown): data is Medicamento {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return typeof obj.id === 'string' && typeof obj.nomeGenerico === 'string';
}

