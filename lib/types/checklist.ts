/**
 * TIPOS PARA CHECKLIST DE CONSULTA - DARWIN-MFC
 * ==============================================
 * 
 * Sistema de checklist para consultas por doença
 */

import { Citation } from './references';

// =============================================================================
// ITEM DE CHECKLIST
// =============================================================================

export interface ChecklistItem {
  id: string;
  titulo: string;
  descricao?: string;
  categoria: ChecklistCategoria;
  obrigatorio: boolean;
  ordem: number;
  subitens?: ChecklistItem[];
}

export type ChecklistCategoria = 
  | 'anamnese'
  | 'exame_fisico'
  | 'exames_complementares'
  | 'diagnostico'
  | 'tratamento'
  | 'orientacoes'
  | 'encaminhamento'
  | 'prevencao';

// =============================================================================
// CHECKLIST COMPLETO
// =============================================================================

export interface ChecklistConsulta {
  id: string;
  doencaId: string;
  titulo: string;
  descricao?: string;
  itens: ChecklistItem[];
  versao: string;
  lastUpdate: string;
  citations: Citation[];
}

// =============================================================================
// PROGRESSO DO CHECKLIST
// =============================================================================

export interface ChecklistProgress {
  checklistId: string;
  consultaId?: string; // ID único da consulta específica
  itensCompletados: Set<string> | string[]; // IDs dos itens marcados (Set ou Array)
  observacoes?: Record<string, string>; // Observações por item
  dataPreenchimento: Date;
  preenchidoPor?: string;
}

// =============================================================================
// RESPOSTA DO ITEM
// =============================================================================

export interface ChecklistResposta {
  itemId: string;
  completado: boolean;
  observacao?: string;
  timestamp: Date;
}

