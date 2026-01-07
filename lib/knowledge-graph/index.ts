/**
 * KNOWLEDGE GRAPH MODULE - DARWIN-MFC
 * ====================================
 *
 * Neo4j-compatible knowledge graph system for medical ontologies.
 *
 * This module provides:
 * - Type definitions for nodes and edges
 * - Graph service for CRUD and query operations
 * - Cypher export for Neo4j migration
 * - Sample data for prototyping
 *
 * Usage:
 * ```typescript
 * import { KnowledgeGraphService, createPopulatedKnowledgeGraph } from '@/lib/knowledge-graph';
 *
 * // Create empty graph
 * const graph = new KnowledgeGraphService();
 *
 * // Or create pre-populated graph
 * const populatedGraph = createPopulatedKnowledgeGraph();
 *
 * // Query the graph
 * const related = populatedGraph.findRelated('disease:diabetes-mellitus-type-2');
 * const path = populatedGraph.findPath('disease:diabetes', 'disease:heart-failure');
 *
 * // Export to Cypher for Neo4j
 * const cypher = populatedGraph.exportToCypher();
 * console.log(cypher.script);
 * ```
 */

// Export types
export type {
  // Node types
  KGNode,
  KGNodeType,
  KGNodeBase,
  DiseaseNode,
  SymptomNode,
  MedicationNode,
  ExaminationNode,
  PathwayNode,
  GeneNode,
  OrganNode,
  BodySystemNode,
  RiskFactorNode,
  ComplicationNode,
  // Edge types
  KGEdge,
  KGEdgeType,
  KGEdgeBase,
  SymptomEdge,
  TreatmentEdge,
  InteractionEdge,
  ContraindicationEdge,
  DiagnosticEdge,
  ProgressionEdge,
  ComorbidityEdge,
  PharmacogenomicsEdge,
  GenericEdge,
  // Graph structures
  KnowledgeGraph,
  QueryResult,
  GraphPath,
  Subgraph,
  // Query and config types
  SearchFilters,
  GraphStats,
  CypherExport,
  CypherStatement,
  CypherExportConfig,
  // Helper types
  CreateNodeInput,
  CreateEdgeInput,
  InteractionSeverity,
  EvidenceLevel,
} from './types';

// Export service
export {
  KnowledgeGraphService,
  knowledgeGraphService,
  createDiseaseNodeFromDoenca,
  createMedicationNodeFromMedicamento,
} from './graph-service';

// Export sample data utilities
export {
  populateSampleData,
  createPopulatedKnowledgeGraph,
  sampleDiseases,
  sampleSymptoms,
  sampleMedications,
  sampleExaminations,
  samplePathways,
} from './sample-data';
