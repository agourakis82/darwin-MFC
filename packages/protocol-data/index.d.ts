export type NodeType =
  | 'start'
  | 'end'
  | 'decision'
  | 'action'
  | 'assessment'
  | 'treatment'
  | 'referral'
  | 'alert'
  | 'info';

export interface CustomNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  nodeType: NodeType;
  details?: string[];
  medications?: string[];
  exams?: string[];
  criteria?: string[];
  referTo?: string;
  alertLevel?: 'low' | 'medium' | 'high' | 'critical';
  ciap2?: string;
  cid10?: string;
  calculadoras?: string[];
}

export interface ProtocolNode {
  id: string;
  type?: string;
  position?: { x: number; y: number };
  data: CustomNodeData;
}

export interface ProtocolEdge {
  id?: string;
  source: string;
  target: string;
  label?: string;
  sourceHandle?: string;
  targetHandle?: string;
  [key: string]: unknown;
}

export type CategoriaProtocolo =
  | 'urgencia'
  | 'cronico'
  | 'preventivo'
  | 'materno_infantil'
  | 'saude_mental'
  | 'infectologia'
  | 'infeccioso'
  | 'cardiovascular'
  | 'endocrino'
  | 'respiratorio'
  | 'gastro'
  | 'neurologico'
  | 'musculoesqueletico'
  | 'dermatologia';

export type NivelComplexidade = 'basico' | 'intermediario' | 'avancado';

export interface Protocolo {
  id: string;
  titulo: string;
  subtitulo?: string;
  categoria: CategoriaProtocolo;
  complexidade: NivelComplexidade;
  versao: string;
  ultimaAtualizacao: string;
  fonte: string;
  ciap2?: string[];
  cid10?: string[];
  descricao: string;
  objetivos: string[];
  populacaoAlvo: string;
  nodes: ProtocolNode[];
  edges: ProtocolEdge[];
  criteriosInclusao?: string[];
  criteriosExclusao?: string[];
  sinaisAlerta?: string[];
  encaminhamento?: {
    quando: string[];
    paraCQuem: string;
  };
  referencias?: string[];
  doencasRelacionadas?: string[];
  medicamentosRelacionados?: string[];
  calculadorasRelacionadas?: string[];
  tags: string[];
}

export const todosProtocolosFlowchart: Protocolo[];

export function getProtocoloById(id: string): Protocolo | undefined;
export function getProtocolosByCategoria(categoria: string): Protocolo[];
export function getProtocolosStats(): {
  total: number;
  porCategoria: Record<string, number>;
  porComplexidade: Record<string, number>;
};

export const protocoloHAS: Protocolo;
export const protocoloDM2: Protocolo;
export const protocoloDorToracica: Protocolo;
export const protocoloITU: Protocolo;
export const protocoloAsma: Protocolo;
export const protocoloLombalgia: Protocolo;
export const protocoloDepressao: Protocolo;
export const protocoloCefaleia: Protocolo;
export const protocoloIVAS: Protocolo;
export const protocoloDislipidemia: Protocolo;
export const protocoloPreNatal: Protocolo;
export const protocoloPuericultura: Protocolo;
export const protocoloDPOC: Protocolo;

