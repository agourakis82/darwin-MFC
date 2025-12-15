/**
 * TIPOS DE PROTOCOLOS - DARWIN-MFC
 * =================================
 * Definições de tipos para protocolos clínicos com fluxogramas interativos
 */

import { Node, Edge } from '@xyflow/react';

// Tipos de nós do fluxograma
export type NodeType = 
  | 'start'           // Início do protocolo
  | 'end'             // Fim/Conclusão
  | 'decision'        // Decisão (sim/não)
  | 'action'          // Ação clínica
  | 'assessment'      // Avaliação
  | 'treatment'       // Tratamento
  | 'referral'        // Encaminhamento
  | 'alert'           // Alerta/Atenção
  | 'info';           // Informação

// Dados customizados para os nós
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

// Nó tipado para React Flow
export type ProtocolNode = Node<CustomNodeData>;

// Edge tipada para React Flow
export type ProtocolEdge = Edge<{ label?: string; condition?: string }>;

// Categoria de protocolo
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
  | 'dermatologia'
  | 'musculoesqueletico';

// Nível de complexidade
export type NivelComplexidade = 'basico' | 'intermediario' | 'avancado';

// Protocolo completo
export interface Protocolo {
  id: string;
  titulo: string;
  subtitulo?: string;
  categoria: CategoriaProtocolo;
  complexidade: NivelComplexidade;
  
  // Metadados
  versao: string;
  ultimaAtualizacao: string;
  fonte: string;
  
  // Códigos
  ciap2?: string[];
  cid10?: string[];
  
  // Descrição
  descricao: string;
  objetivos: string[];
  populacaoAlvo: string;
  
  // Fluxograma
  nodes: ProtocolNode[];
  edges: ProtocolEdge[];
  
  // Conteúdo adicional
  criteriosInclusao?: string[];
  criteriosExclusao?: string[];
  sinaisAlerta?: string[];
  encaminhamento?: {
    quando: string[];
    paraCQuem: string;
  };
  
  // Referências
  referencias?: string[];
  
  // Cross-references
  doencasRelacionadas?: string[];
  medicamentosRelacionados?: string[];
  calculadorasRelacionadas?: string[];
  
  // Tags para busca
  tags: string[];
}

// Configurações de visualização React Flow
export interface ReactFlowConfig {
  fitView: boolean;
  zoomOnScroll: boolean;
  panOnScroll: boolean;
  nodesDraggable: boolean;
  nodesConnectable: boolean;
  elementsSelectable: boolean;
  snapToGrid: boolean;
  snapGrid: [number, number];
}

// Estado do fluxograma
export interface FlowchartState {
  selectedNode: ProtocolNode | null;
  highlightedPath: string[];
  completedNodes: string[];
  currentStep: string | null;
}
