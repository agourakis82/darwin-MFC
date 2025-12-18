/**
 * API Client Central
 * Exporta todas as funções de API organizadas por recurso
 */

// Types
export * from './types';

// Diseases API
export * from './diseases';

// Medications API
export * from './medications';

// Re-export types para conveniência
export type { Doenca } from '@/lib/types/doenca';
export type { Medicamento, Interacao } from '@/lib/types/medicamento';

/**
 * Configuração da API
 */
export const API_CONFIG = {
  version: '1.0.0',
  baseURL: '/api',
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

