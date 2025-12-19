/**
 * Types for medical knowledge graph
 */

/**
 * Node types in the knowledge graph
 */
export type NodeType =
  | 'doenca'
  | 'sintoma'
  | 'exame'
  | 'medicamento'
  | 'via_metabolica'
  | 'gene'
  | 'protocolo'
  | 'calculadora';

/**
 * Edge types (relationships)
 */
export type EdgeType =
  | 'causa' // Disease causes symptom
  | 'trata' // Medication treats disease
  | 'diagnostica' // Exam diagnoses disease
  | 'interage' // Medication interacts with medication
  | 'metaboliza' // Gene metabolizes medication
  | 'usa' // Protocol uses medication/exam
  | 'calcula' // Calculator calculates something for disease
  | 'co_ocorre' // Diseases co-occur
  | 'contraindicado' // Medication contraindicated for disease
  | 'associado'; // Generic association

/**
 * Graph node
 */
export interface GraphNode {
  id: string;
  type: NodeType;
  label: string;
  data: {
    // Disease data
    doencaId?: string;
    cid10?: string[];
    ciap2?: string[];
    
    // Symptom data
    sintoma?: string;
    
    // Exam data
    exame?: string;
    loinc?: string;
    
    // Medication data
    medicamentoId?: string;
    atcCode?: string;
    
    // Gene data
    gene?: string;
    
    // Protocol data
    protocoloId?: string;
    
    // Generic metadata
    metadata?: Record<string, any>;
  };
}

/**
 * Graph edge (relationship)
 */
export interface GraphEdge {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  type: EdgeType;
  weight?: number; // Strength of relationship (0-1)
  label?: string;
  data?: {
    // For medication interactions
    gravidade?: 'leve' | 'moderada' | 'grave' | 'contraindicada';
    mecanismo?: string;
    
    // For co-occurrence
    frequencia?: number; // How often they co-occur
    
    // Generic metadata
    metadata?: Record<string, any>;
  };
}

/**
 * Knowledge graph structure
 */
export interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/**
 * Graph query result
 */
export interface GraphQueryResult {
  nodes: GraphNode[];
  edges: GraphEdge[];
  paths?: GraphPath[]; // If query was for paths
}

/**
 * Path between nodes
 */
export interface GraphPath {
  nodes: GraphNode[];
  edges: GraphEdge[];
  length: number;
  weight: number; // Total path weight
}

