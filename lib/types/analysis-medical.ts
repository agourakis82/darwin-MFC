/**
 * TIPOS DE ANÁLISE CRÍTICA PARA DOENÇAS E MEDICAMENTOS
 * =====================================================
 * 
 * Sistema de análise crítica sistêmica para conteúdo médico,
 * similar ao sistema de rastreamentos, mas adaptado para
 * doenças e medicamentos.
 */

import { Citation } from './references';

/**
 * Insight médico - análise de 1ª, 2ª ou 3ª ordem
 */
export interface MedicalInsight {
  id: string;
  title: string;
  content: string;
  type: 'first_order' | 'second_order' | 'third_order';
  citations: Citation[];
  practicalExample?: string;  // Exemplo prático da UBS
  keyTakeaway?: string;        // Mensagem-chave didática
  evidenceLevel?: 'A' | 'B' | 'C' | 'D';  // Nível de evidência
}

/**
 * Controvérsia médica - divergências entre diretrizes/guidelines
 */
export interface MedicalControversy {
  id: string;
  title: string;
  description: string;
  stakeholders: string[];  // Ex: ['MS', 'SBMFC', 'SBC', 'CONITEC']
  citations: Citation[];
  realWorldScenario?: string;  // Cenário real da UBS
  currentConsensus?: string;    // Consenso atual (se houver)
}

/**
 * Desafio operacional na APS
 */
export interface OperationalChallenge {
  id: string;
  title: string;
  description: string;
  category: 'operational' | 'financial' | 'equity' | 'training' | 'infrastructure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  citations?: Citation[];
  potentialSolutions?: string[];  // Soluções potenciais
}

/**
 * Análise crítica para doença
 */
export interface DiseaseCriticalAnalysis {
  diseaseId: string;  // ID da doença
  context: string;    // Contexto histórico/epidemiológico
  paradigmShift: boolean;  // Se houve mudança de paradigma recente
  insights: MedicalInsight[];
  controversies: MedicalControversy[];
  operationalChallenges: OperationalChallenge[];
  systemicImplications: string;  // Implicações sistêmicas
  didacticIntro?: string;  // Introdução didática
  lastUpdate: string;  // Data da última atualização
}

/**
 * Análise crítica para medicamento
 */
export interface MedicationCriticalAnalysis {
  medicationId: string;  // ID do medicamento
  context: string;       // Contexto histórico/farmacológico
  paradigmShift: boolean;  // Se houve mudança de paradigma recente
  insights: MedicalInsight[];
  controversies: MedicalControversy[];
  operationalChallenges: OperationalChallenge[];
  systemicImplications: string;  // Implicações sistêmicas
  didacticIntro?: string;  // Introdução didática
  lastUpdate: string;  // Data da última atualização
}

