import { Citation } from './references';

export interface Insight {
  id: string;
  type: 'segunda_ordem' | 'terceira_ordem';
  title: string;
  description: string;
  implication: string; // Implicação prática/sistêmica
  citations: Citation[];
}

export interface Controversy {
  id: string;
  topic: string;
  positionA: {
    entity: string;
    argument: string;
    citations: Citation[];
  };
  positionB: {
    entity: string;
    argument: string;
    citations: Citation[];
  };
  synthesis: string; // Síntese ou status atual (quem venceu/empate)
}

export interface CriticalAnalysis {
  rastreamentoId: string; // Link com o rastreamento descritivo
  context: string; // Contexto histórico/político (ex: "Ano da Ruptura Epistemológica")
  paradigmShift: boolean; // Se houve mudança de paradigma em 2025
  insights: Insight[];
  controversies: Controversy[];
  challenges: {
    operational: string; // Desafio logístico/operacional
    financial: string; // Desafio financeiro
    equity: string; // Desafio de equidade
    citations: Citation[];
  }[];
  conclusion: string;
}

