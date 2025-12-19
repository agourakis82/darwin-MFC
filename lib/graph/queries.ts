/**
 * Graph queries
 * Functions to query the knowledge graph
 */

import type { KnowledgeGraph, GraphNode, GraphEdge, GraphQueryResult, GraphPath } from './types';

/**
 * Find all diseases related to a symptom
 */
export function findDiseasesBySymptom(
  graph: KnowledgeGraph,
  symptom: string
): GraphQueryResult {
  const symptomNode = graph.nodes.find(
    (n) => n.type === 'sintoma' && n.data.sintoma?.toLowerCase().includes(symptom.toLowerCase())
  );

  if (!symptomNode) {
    return { nodes: [], edges: [] };
  }

  // Find edges where symptom is source and target is disease
  const relevantEdges = graph.edges.filter(
    (e) => e.source === symptomNode.id && e.type === 'causa'
  );

  const diseaseIds = new Set(relevantEdges.map((e) => e.target));
  const diseaseNodes = graph.nodes.filter((n) => diseaseIds.has(n.id));

  return {
    nodes: [symptomNode, ...diseaseNodes],
    edges: relevantEdges,
  };
}

/**
 * Find paths between two nodes
 */
export function findPaths(
  graph: KnowledgeGraph,
  sourceId: string,
  targetId: string,
  maxDepth: number = 3
): GraphPath[] {
  const paths: GraphPath[] = [];
  
  function dfs(
    currentId: string,
    targetId: string,
    visited: Set<string>,
    currentPath: GraphNode[],
    currentEdges: GraphEdge[],
    depth: number
  ) {
    if (depth > maxDepth) return;
    if (currentId === targetId) {
      paths.push({
        nodes: [...currentPath],
        edges: [...currentEdges],
        length: currentPath.length - 1,
        weight: currentEdges.reduce((sum, e) => sum + (e.weight || 0), 0),
      });
      return;
    }

    // Get all edges from current node
    const outgoingEdges = graph.edges.filter((e) => e.source === currentId);
    
    for (const edge of outgoingEdges) {
      if (!visited.has(edge.target)) {
        const targetNode = graph.nodes.find((n) => n.id === edge.target);
        if (!targetNode) continue;
        
        visited.add(edge.target);
        currentPath.push(targetNode);
        currentEdges.push(edge);
        
        dfs(edge.target, targetId, visited, currentPath, currentEdges, depth + 1);
        
        // Backtrack
        visited.delete(edge.target);
        currentPath.pop();
        currentEdges.pop();
      }
    }
  }

  const sourceNode = graph.nodes.find((n) => n.id === sourceId);
  if (!sourceNode) return [];

  dfs(sourceId, targetId, new Set([sourceId]), [sourceNode], [], 0);
  
  // Sort by weight (descending) and length (ascending)
  return paths.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    return b.weight - a.weight;
  });
}

/**
 * Find clusters of comorbidities (diseases that frequently co-occur)
 */
export function findComorbidityClusters(
  graph: KnowledgeGraph,
  minCoOccurrences: number = 2
): GraphNode[][] {
  // This is a simplified version - in a real implementation, you'd analyze
  // patient data or clinical guidelines to find actual co-occurrence patterns
  
  const clusters: GraphNode[][] = [];
  const diseaseNodes = graph.nodes.filter((n) => n.type === 'doenca');
  
  // For now, group diseases by category or related symptoms
  // This is a placeholder - real implementation would use actual co-occurrence data
  
  return clusters;
}

/**
 * Find all medications that treat a disease
 */
export function findMedicationsForDisease(
  graph: KnowledgeGraph,
  diseaseId: string
): GraphQueryResult {
  const diseaseNodeId = `doenca:${diseaseId}`;
  
  const treatmentEdges = graph.edges.filter(
    (e) => e.target === diseaseNodeId && e.type === 'trata'
  );

  const medicationIds = new Set(treatmentEdges.map((e) => e.source));
  const medicationNodes = graph.nodes.filter((n) => medicationIds.has(n.id));
  const diseaseNode = graph.nodes.find((n) => n.id === diseaseNodeId);

  return {
    nodes: diseaseNode ? [diseaseNode, ...medicationNodes] : medicationNodes,
    edges: treatmentEdges,
  };
}

/**
 * Find all diseases that a medication treats
 */
export function findDiseasesForMedication(
  graph: KnowledgeGraph,
  medicationId: string
): GraphQueryResult {
  const medicationNodeId = `medicamento:${medicationId}`;
  
  const treatmentEdges = graph.edges.filter(
    (e) => e.source === medicationNodeId && e.type === 'trata'
  );

  const diseaseIds = new Set(treatmentEdges.map((e) => e.target));
  const diseaseNodes = graph.nodes.filter((n) => diseaseIds.has(n.id));
  const medicationNode = graph.nodes.find((n) => n.id === medicationNodeId);

  return {
    nodes: medicationNode ? [medicationNode, ...diseaseNodes] : diseaseNodes,
    edges: treatmentEdges,
  };
}

/**
 * Get subgraph containing only specified nodes and their connections
 */
export function getSubgraph(
  graph: KnowledgeGraph,
  nodeIds: string[]
): KnowledgeGraph {
  const nodeIdSet = new Set(nodeIds);
  
  const subgraphNodes = graph.nodes.filter((n) => nodeIdSet.has(n.id));
  
  const subgraphEdges = graph.edges.filter(
    (e) => nodeIdSet.has(e.source) && nodeIdSet.has(e.target)
  );

  return {
    nodes: subgraphNodes,
    edges: subgraphEdges,
  };
}

