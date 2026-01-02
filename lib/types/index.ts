// Exportações centralizadas de todos os tipos
export * from './references';
export * from './rastreamentos';
export * from './analysis';
export * from './timeline';
export * from './doenca';
export * from './medicamento';
export * from './evidence';
export * from './gamification';
export * from './ai';
export * from './region';
// Protocolo React Flow (novo sistema)
export type {
  Protocolo,
  ProtocolNode,
  ProtocolEdge,
  CategoriaProtocolo,
  NivelComplexidade,
  CustomNodeData,
  ReactFlowConfig,
  FlowchartState,
} from './protocolo';
// NodeType renomeado para evitar conflito
export type { NodeType as ReactFlowNodeType } from './protocolo';
export * from './ciap2';
// Re-exportar cross-references
export { 
  type MedicamentoReference,
  type ProtocoloReference,
  type CalculadoraReference,
  type RastreamentoReference,
  type QuickAction,
  type QuickActionTipo,
  type ContextualSuggestion,
  type CrossReferenceBundle,
} from './cross-references';
// Exportar protocolo-interativo completo
export * from './protocolo-interativo';

// Tipos auxiliares
export type ContentMode = 'descriptive' | 'critical_analysis';
export type Theme = 'light' | 'dark';

// Re-export ViewMode from evidence.ts
export type { ViewMode } from './evidence';

// Estado global da aplicação
export interface AppState {
  theme: Theme;
  contentMode: ContentMode;
  viewMode: import('./evidence').ViewMode; // full | high_yield | print_friendly
  favorites: string[]; // IDs dos rastreamentos favoritos
  favoritosDoencas: string[]; // IDs das doenças favoritas
  favoritosMedicamentos: string[]; // IDs dos medicamentos favoritos
  favoritosProtocolos: string[]; // IDs dos protocolos favoritos
  notes: Record<string, string>; // { itemId: nota }
}

