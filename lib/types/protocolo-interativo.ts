/**
 * TIPOS PARA PROTOCOLOS INTERATIVOS - DARWIN-MFC
 * ===============================================
 * 
 * Sistema de fluxogramas clicáveis para decisão clínica
 * Compatível com React Flow para renderização
 */

import { CIAP2Chapter } from './ciap2';
import { QuickAction } from './cross-references';

// =============================================================================
// TIPOS DE NÓS DO FLUXOGRAMA
// =============================================================================

export type NodeType = 
  | 'start'      // Início do fluxo
  | 'decision'   // Ponto de decisão (pergunta Sim/Não)
  | 'action'     // Ação a ser tomada
  | 'end'        // Fim do fluxo (conclusão)
  | 'info'       // Informação adicional
  | 'warning'    // Alerta/Red Flag
  | 'calculate'  // Indica uso de calculadora
  | 'prescribe'  // Indica prescrição
  | 'refer';     // Indica encaminhamento

// =============================================================================
// ESTILOS DE ARESTAS
// =============================================================================

export type EdgeStyle = 
  | 'default'   // Estilo padrão
  | 'positive'  // Caminho positivo (verde)
  | 'negative'  // Caminho negativo (vermelho)
  | 'warning'   // Atenção (amarelo)
  | 'info';     // Informativo (azul)

export type EdgeCondition = 
  | 'sim'
  | 'nao'
  | 'se_necessario'
  | 'alternativa'
  | 'proximo'
  | 'custom';

// =============================================================================
// NÓ DO FLUXOGRAMA
// =============================================================================

export interface FlowchartNode {
  id: string;
  type: NodeType;
  
  // Conteúdo
  label: string;
  sublabel?: string;
  details?: string;
  
  // Ações
  quickAction?: QuickAction;
  linkedCalculator?: string;
  linkedMedicamento?: string;
  linkedProtocolo?: string;
  
  // Posição (para React Flow)
  position: {
    x: number;
    y: number;
  };
  
  // Estilos
  customStyle?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
  };
}

// =============================================================================
// ARESTA DO FLUXOGRAMA
// =============================================================================

export interface FlowchartEdge {
  id: string;
  source: string;
  target: string;
  
  // Label
  label?: string;
  condition?: EdgeCondition;
  
  // Estilos
  style?: EdgeStyle;
  animated?: boolean;
  
  // Metadados
  priority?: number; // Para ordenar caminhos
}

// =============================================================================
// PROTOCOLO INTERATIVO COMPLETO
// =============================================================================

export interface ProtocoloInterativo {
  // Identificação
  id: string;
  titulo: string;
  subtitulo?: string;
  descricao: string;
  
  // Classificação
  categoria: ProtocoloCategoria;
  subcategoria?: string;
  ciap2Chapters: CIAP2Chapter[];
  
  // Fluxograma
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
  entryNodeId: string;
  
  // Viewport inicial
  defaultViewport?: {
    x: number;
    y: number;
    zoom: number;
  };
  
  // Cross-references
  doencasRelacionadas: string[];
  medicamentosRelacionados: string[];
  calculadorasRelacionadas: string[];
  rastreamentosRelacionados?: string[];
  
  // Quick Actions coletadas do protocolo
  quickActionsDisponiveis: QuickAction[];
  
  // Metadados
  fonte: string;
  referencia?: string;
  lastUpdate: string;
  complexity: 'simples' | 'moderado' | 'complexo';
  tempoEstimado?: string;
  
  // Tags para busca
  tags: string[];
}

export type ProtocoloCategoria = 
  | 'diagnostico'
  | 'tratamento'
  | 'acompanhamento'
  | 'encaminhamento'
  | 'preventivo'
  | 'emergencia'
  | 'triagem';

// =============================================================================
// ESTADO DE NAVEGAÇÃO DO FLUXOGRAMA
// =============================================================================

export interface FlowchartNavigationState {
  protocoloId: string;
  currentNodeId: string;
  visitedNodes: string[];
  pathTaken: FlowchartEdge[];
  startTime: Date;
  decisions: Record<string, string>; // nodeId -> decisão tomada
}

// =============================================================================
// RESULTADO DE NAVEGAÇÃO
// =============================================================================

export interface FlowchartResult {
  protocoloId: string;
  protocoloTitulo: string;
  conclusionNodeId: string;
  conclusionLabel: string;
  pathSummary: string[];
  quickActionsCollected: QuickAction[];
  totalTime: number; // em segundos
  exportText?: string;
}

// =============================================================================
// CONFIGURAÇÕES DO COMPONENTE
// =============================================================================

export interface FlowchartConfig {
  // Visual
  nodeSpacing: number;
  edgeCurvature: number;
  showMinimap: boolean;
  showControls: boolean;
  
  // Comportamento
  allowBacktrack: boolean;
  showPathHighlight: boolean;
  autoAdvance: boolean;
  
  // Export
  enableExport: boolean;
  exportFormats: ('text' | 'pdf' | 'image')[];
}

export const DEFAULT_FLOWCHART_CONFIG: FlowchartConfig = {
  nodeSpacing: 150,
  edgeCurvature: 0.5,
  showMinimap: true,
  showControls: true,
  allowBacktrack: true,
  showPathHighlight: true,
  autoAdvance: false,
  enableExport: true,
  exportFormats: ['text'],
};

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

export function getNodeById(protocol: ProtocoloInterativo, nodeId: string): FlowchartNode | undefined {
  return protocol.nodes.find(n => n.id === nodeId);
}

export function getOutgoingEdges(protocol: ProtocoloInterativo, nodeId: string): FlowchartEdge[] {
  return protocol.edges.filter(e => e.source === nodeId);
}

export function getIncomingEdges(protocol: ProtocoloInterativo, nodeId: string): FlowchartEdge[] {
  return protocol.edges.filter(e => e.target === nodeId);
}

export function isTerminalNode(protocol: ProtocoloInterativo, nodeId: string): boolean {
  const node = getNodeById(protocol, nodeId);
  return node?.type === 'end' || getOutgoingEdges(protocol, nodeId).length === 0;
}

export function calculatePathSummary(
  protocol: ProtocoloInterativo, 
  visitedNodes: string[]
): string[] {
  return visitedNodes.map(nodeId => {
    const node = getNodeById(protocol, nodeId);
    return node?.label || nodeId;
  });
}

export function collectQuickActions(
  protocol: ProtocoloInterativo,
  visitedNodes: string[]
): QuickAction[] {
  const actions: QuickAction[] = [];
  
  visitedNodes.forEach(nodeId => {
    const node = getNodeById(protocol, nodeId);
    if (node?.quickAction) {
      actions.push(node.quickAction);
    }
  });
  
  return actions;
}

// =============================================================================
// TEMPLATES DE NÓS
// =============================================================================

export const NODE_TEMPLATES: Record<NodeType, Partial<FlowchartNode>> = {
  start: {
    type: 'start',
    customStyle: {
      backgroundColor: '#22c55e',
      borderColor: '#16a34a',
      textColor: '#ffffff',
    },
  },
  decision: {
    type: 'decision',
    customStyle: {
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      textColor: '#ffffff',
    },
  },
  action: {
    type: 'action',
    customStyle: {
      backgroundColor: '#f8fafc',
      borderColor: '#cbd5e1',
      textColor: '#1e293b',
    },
  },
  end: {
    type: 'end',
    customStyle: {
      backgroundColor: '#64748b',
      borderColor: '#475569',
      textColor: '#ffffff',
    },
  },
  info: {
    type: 'info',
    customStyle: {
      backgroundColor: '#e0f2fe',
      borderColor: '#0ea5e9',
      textColor: '#0369a1',
    },
  },
  warning: {
    type: 'warning',
    customStyle: {
      backgroundColor: '#fef3c7',
      borderColor: '#f59e0b',
      textColor: '#92400e',
    },
  },
  calculate: {
    type: 'calculate',
    customStyle: {
      backgroundColor: '#ddd6fe',
      borderColor: '#8b5cf6',
      textColor: '#5b21b6',
    },
  },
  prescribe: {
    type: 'prescribe',
    customStyle: {
      backgroundColor: '#d1fae5',
      borderColor: '#10b981',
      textColor: '#065f46',
    },
  },
  refer: {
    type: 'refer',
    customStyle: {
      backgroundColor: '#fee2e2',
      borderColor: '#ef4444',
      textColor: '#991b1b',
    },
  },
};

