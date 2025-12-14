/**
 * TIPOS PARA CROSS-REFERENCES - DARWIN-MFC
 * =========================================
 * 
 * Tipos para o sistema de referências cruzadas
 */

export type QuickActionTipo = 
  | 'prescricao' 
  | 'orientacao' 
  | 'solicitacao' 
  | 'atestado' 
  | 'diagnostico' 
  | 'exames'
  | 'encaminhamento';

export interface QuickAction {
  id: string;
  tipo: QuickActionTipo;
  titulo: string;
  conteudo: string;
}

export interface MedicamentoReference {
  medicamentoId: string;
  nomeGenerico: string;
  tipoUso: 'primeira_linha' | 'segunda_linha' | 'alternativa' | 'adjuvante';
  posologiaResumida?: string;
  indicacaoEspecifica?: string;
  disponivelSUS: boolean;
}

export interface ProtocoloReference {
  protocoloId: string;
  titulo: string;
  tipoProtocolo: string;
  descricaoBreve?: string;
}

export interface CalculadoraReference {
  calculadoraId: string;
  nome: string;
  descricaoBreve: string;
  prioritaria?: boolean;
}

export interface RastreamentoReference {
  rastreamentoId: string;
  titulo: string;
  populacaoAlvo: string;
}

export interface ContextualSuggestion {
  tipo: 'calculadora' | 'protocolo' | 'rastreamento' | 'medicamento' | 'doenca';
  id: string;
  titulo: string;
  motivo: string;
  prioridade: 'alta' | 'media' | 'baixa';
}

export interface CrossReferenceBundle {
  medicamentos: MedicamentoReference[];
  protocolos: ProtocoloReference[];
  calculadoras: CalculadoraReference[];
  rastreamentos: RastreamentoReference[];
  quickActions: QuickAction[];
  suggestions: ContextualSuggestion[];
}
