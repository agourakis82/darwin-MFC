/**
 * KNOWLEDGE GRAPH SERVICE - DARWIN-MFC
 * =====================================
 *
 * Local graph database service with Neo4j-compatible Cypher export.
 * Provides CRUD operations, querying, and pathfinding capabilities.
 *
 * This is a local/in-memory implementation designed for:
 * 1. Static site generation (SSG) compatibility
 * 2. Future migration to Neo4j graph database
 * 3. Educational and prototyping purposes
 */

import type {
  KGNode,
  KGNodeType,
  KGEdge,
  KGEdgeType,
  KnowledgeGraph,
  QueryResult,
  GraphPath,
  Subgraph,
  SearchFilters,
  GraphStats,
  CypherExport,
  CypherStatement,
  CypherExportConfig,
  DiseaseNode,
  SymptomNode,
  MedicationNode,
  ExaminationNode,
  CreateNodeInput,
  CreateEdgeInput,
  InteractionSeverity,
} from './types';

// =============================================================================
// GRAPH SERVICE CLASS
// =============================================================================

/**
 * Knowledge Graph Service
 * Provides methods for managing and querying the medical knowledge graph
 */
export class KnowledgeGraphService {
  private graph: KnowledgeGraph;

  constructor() {
    this.graph = this.createEmptyGraph();
  }

  /**
   * Create an empty graph structure
   */
  private createEmptyGraph(): KnowledgeGraph {
    return {
      nodes: new Map(),
      edges: new Map(),
      adjacencyList: new Map(),
      reverseAdjacencyList: new Map(),
      metadata: {
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        nodeCount: 0,
        edgeCount: 0,
        sources: ['Darwin-MFC'],
      },
    };
  }

  // ===========================================================================
  // NODE OPERATIONS
  // ===========================================================================

  /**
   * Generate a unique node ID
   */
  private generateNodeId(type: KGNodeType, label: string): string {
    const normalizedLabel = this.normalizeString(label);
    return `${type.toLowerCase()}:${normalizedLabel}`;
  }

  /**
   * Normalize string for ID generation
   */
  private normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Add a node to the graph
   */
  addNode<T extends KGNode>(input: CreateNodeInput<T>): T {
    const id = input.id || this.generateNodeId(input.type, input.label);
    const node = { ...input, id } as T;

    if (this.graph.nodes.has(id)) {
      // Update existing node
      const existing = this.graph.nodes.get(id)!;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.graph.nodes.set(id, { ...existing, ...node } as any);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.graph.nodes.set(id, node as any);
      this.graph.adjacencyList.set(id, new Set());
      this.graph.reverseAdjacencyList.set(id, new Set());
      this.graph.metadata.nodeCount++;
    }

    this.graph.metadata.updatedAt = new Date().toISOString();
    return this.graph.nodes.get(id) as T;
  }

  /**
   * Get a node by ID
   */
  getNode(id: string): KGNode | undefined {
    return this.graph.nodes.get(id);
  }

  /**
   * Get all nodes of a specific type
   */
  getNodesByType(type: KGNodeType): KGNode[] {
    return Array.from(this.graph.nodes.values()).filter(
      (node) => node.type === type
    );
  }

  /**
   * Remove a node and all its edges
   */
  removeNode(id: string): boolean {
    if (!this.graph.nodes.has(id)) {
      return false;
    }

    // Remove all edges connected to this node
    const outgoingEdges = this.graph.adjacencyList.get(id) || new Set();
    const incomingEdges = this.graph.reverseAdjacencyList.get(id) || new Set();

    Array.from(outgoingEdges).concat(Array.from(incomingEdges)).forEach((edgeId) => {
      this.removeEdge(edgeId);
    });

    // Remove the node
    this.graph.nodes.delete(id);
    this.graph.adjacencyList.delete(id);
    this.graph.reverseAdjacencyList.delete(id);
    this.graph.metadata.nodeCount--;
    this.graph.metadata.updatedAt = new Date().toISOString();

    return true;
  }

  // ===========================================================================
  // EDGE OPERATIONS
  // ===========================================================================

  /**
   * Generate a unique edge ID
   */
  private generateEdgeId(source: string, target: string, type: KGEdgeType): string {
    return `edge:${source}:${target}:${type.toLowerCase()}`;
  }

  /**
   * Add an edge to the graph
   */
  addEdge<T extends KGEdge>(input: CreateEdgeInput<T>): T {
    // Validate that both nodes exist
    if (!this.graph.nodes.has(input.source)) {
      throw new Error(`Source node not found: ${input.source}`);
    }
    if (!this.graph.nodes.has(input.target)) {
      throw new Error(`Target node not found: ${input.target}`);
    }

    const id = input.id || this.generateEdgeId(input.source, input.target, input.type);
    const edge = { ...input, id } as T;

    if (this.graph.edges.has(id)) {
      // Update existing edge
      const existing = this.graph.edges.get(id)!;
      this.graph.edges.set(id, { ...existing, ...edge });
    } else {
      this.graph.edges.set(id, edge);

      // Update adjacency lists
      this.graph.adjacencyList.get(input.source)?.add(id);
      this.graph.reverseAdjacencyList.get(input.target)?.add(id);

      this.graph.metadata.edgeCount++;
    }

    this.graph.metadata.updatedAt = new Date().toISOString();
    return this.graph.edges.get(id) as T;
  }

  /**
   * Get an edge by ID
   */
  getEdge(id: string): KGEdge | undefined {
    return this.graph.edges.get(id);
  }

  /**
   * Get all edges of a specific type
   */
  getEdgesByType(type: KGEdgeType): KGEdge[] {
    return Array.from(this.graph.edges.values()).filter(
      (edge) => edge.type === type
    );
  }

  /**
   * Get all edges between two nodes
   */
  getEdgesBetween(sourceId: string, targetId: string): KGEdge[] {
    return Array.from(this.graph.edges.values()).filter(
      (edge) => edge.source === sourceId && edge.target === targetId
    );
  }

  /**
   * Remove an edge
   */
  removeEdge(id: string): boolean {
    const edge = this.graph.edges.get(id);
    if (!edge) {
      return false;
    }

    // Update adjacency lists
    this.graph.adjacencyList.get(edge.source)?.delete(id);
    this.graph.reverseAdjacencyList.get(edge.target)?.delete(id);

    // Remove the edge
    this.graph.edges.delete(id);
    this.graph.metadata.edgeCount--;
    this.graph.metadata.updatedAt = new Date().toISOString();

    return true;
  }

  // ===========================================================================
  // QUERY OPERATIONS
  // ===========================================================================

  /**
   * Find nodes related to a given node
   */
  findRelated(
    nodeId: string,
    options?: {
      edgeTypes?: KGEdgeType[];
      direction?: 'outgoing' | 'incoming' | 'both';
      depth?: number;
    }
  ): QueryResult {
    const { edgeTypes, direction = 'both', depth = 1 } = options || {};
    const startTime = performance.now();

    const resultNodes = new Map<string, KGNode>();
    const resultEdges = new Map<string, KGEdge>();
    const visited = new Set<string>();

    const queue: { nodeId: string; currentDepth: number }[] = [
      { nodeId, currentDepth: 0 },
    ];

    while (queue.length > 0) {
      const { nodeId: currentId, currentDepth } = queue.shift()!;

      if (visited.has(currentId) || currentDepth >= depth) {
        continue;
      }
      visited.add(currentId);

      const node = this.graph.nodes.get(currentId);
      if (node) {
        resultNodes.set(currentId, node);
      }

      // Get outgoing edges
      if (direction === 'outgoing' || direction === 'both') {
        const outEdges = this.graph.adjacencyList.get(currentId) || new Set();
        outEdges.forEach((edgeId) => {
          const edge = this.graph.edges.get(edgeId);
          if (edge && (!edgeTypes || edgeTypes.includes(edge.type))) {
            resultEdges.set(edgeId, edge);
            if (!visited.has(edge.target)) {
              queue.push({ nodeId: edge.target, currentDepth: currentDepth + 1 });
            }
          }
        });
      }

      // Get incoming edges
      if (direction === 'incoming' || direction === 'both') {
        const inEdges = this.graph.reverseAdjacencyList.get(currentId) || new Set();
        inEdges.forEach((edgeId) => {
          const edge = this.graph.edges.get(edgeId);
          if (edge && (!edgeTypes || edgeTypes.includes(edge.type))) {
            resultEdges.set(edgeId, edge);
            if (!visited.has(edge.source)) {
              queue.push({ nodeId: edge.source, currentDepth: currentDepth + 1 });
            }
          }
        });
      }
    }

    return {
      nodes: Array.from(resultNodes.values()),
      edges: Array.from(resultEdges.values()),
      metadata: {
        queryTime: performance.now() - startTime,
        resultCount: resultNodes.size + resultEdges.size,
      },
    };
  }

  /**
   * Find shortest path between two nodes (BFS)
   */
  findPath(
    sourceId: string,
    targetId: string,
    options?: {
      edgeTypes?: KGEdgeType[];
      maxDepth?: number;
      bidirectional?: boolean;
    }
  ): GraphPath | null {
    const { edgeTypes, maxDepth = 10, bidirectional = true } = options || {};

    if (!this.graph.nodes.has(sourceId) || !this.graph.nodes.has(targetId)) {
      return null;
    }

    // BFS for shortest path
    const visited = new Set<string>();
    const parent = new Map<string, { nodeId: string; edgeId: string }>();
    const queue: string[] = [sourceId];
    visited.add(sourceId);

    let found = false;
    let depth = 0;

    while (queue.length > 0 && depth < maxDepth && !found) {
      const levelSize = queue.length;
      depth++;

      for (let i = 0; i < levelSize && !found; i++) {
        const currentId = queue.shift()!;

        // Get neighbors
        const edges = this.getOutgoingEdges(currentId, edgeTypes, bidirectional);

        for (const edge of edges) {
          const neighborId = edge.source === currentId ? edge.target : edge.source;

          if (!visited.has(neighborId)) {
            visited.add(neighborId);
            parent.set(neighborId, { nodeId: currentId, edgeId: edge.id });
            queue.push(neighborId);

            if (neighborId === targetId) {
              found = true;
              break;
            }
          }
        }
      }
    }

    if (!found) {
      return null;
    }

    // Reconstruct path
    const pathNodes: KGNode[] = [];
    const pathEdges: KGEdge[] = [];
    let currentId = targetId;

    while (currentId !== sourceId) {
      const node = this.graph.nodes.get(currentId);
      if (node) {
        pathNodes.unshift(node);
      }

      const parentInfo = parent.get(currentId);
      if (parentInfo) {
        const edge = this.graph.edges.get(parentInfo.edgeId);
        if (edge) {
          pathEdges.unshift(edge);
        }
        currentId = parentInfo.nodeId;
      }
    }

    const sourceNode = this.graph.nodes.get(sourceId);
    if (sourceNode) {
      pathNodes.unshift(sourceNode);
    }

    return {
      nodes: pathNodes,
      edges: pathEdges,
      length: pathEdges.length,
      totalWeight: pathEdges.reduce((sum, e) => sum + (e.weight || 1), 0),
    };
  }

  /**
   * Find all paths between two nodes (DFS with pruning)
   */
  findAllPaths(
    sourceId: string,
    targetId: string,
    options?: {
      edgeTypes?: KGEdgeType[];
      maxDepth?: number;
      maxPaths?: number;
    }
  ): GraphPath[] {
    const { edgeTypes, maxDepth = 5, maxPaths = 10 } = options || {};
    const paths: GraphPath[] = [];

    const dfs = (
      currentId: string,
      visited: Set<string>,
      pathNodes: KGNode[],
      pathEdges: KGEdge[],
      depth: number
    ) => {
      if (paths.length >= maxPaths || depth > maxDepth) {
        return;
      }

      if (currentId === targetId) {
        paths.push({
          nodes: [...pathNodes],
          edges: [...pathEdges],
          length: pathEdges.length,
          totalWeight: pathEdges.reduce((sum, e) => sum + (e.weight || 1), 0),
        });
        return;
      }

      const edges = this.getOutgoingEdges(currentId, edgeTypes, true);

      for (const edge of edges) {
        const neighborId = edge.source === currentId ? edge.target : edge.source;

        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          const neighborNode = this.graph.nodes.get(neighborId);
          if (neighborNode) {
            pathNodes.push(neighborNode);
            pathEdges.push(edge);
            dfs(neighborId, visited, pathNodes, pathEdges, depth + 1);
            pathNodes.pop();
            pathEdges.pop();
          }
          visited.delete(neighborId);
        }
      }
    };

    const sourceNode = this.graph.nodes.get(sourceId);
    if (sourceNode) {
      const visited = new Set<string>([sourceId]);
      dfs(sourceId, visited, [sourceNode], [], 0);
    }

    // Sort by length then by weight
    return paths.sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length;
      return a.totalWeight - b.totalWeight;
    });
  }

  /**
   * Get outgoing edges (optionally including reverse direction)
   */
  private getOutgoingEdges(
    nodeId: string,
    edgeTypes?: KGEdgeType[],
    bidirectional?: boolean
  ): KGEdge[] {
    const edges: KGEdge[] = [];

    // Outgoing edges
    const outEdges = this.graph.adjacencyList.get(nodeId) || new Set();
    outEdges.forEach((edgeId) => {
      const edge = this.graph.edges.get(edgeId);
      if (edge && (!edgeTypes || edgeTypes.includes(edge.type))) {
        edges.push(edge);
      }
    });

    // Incoming edges (if bidirectional)
    if (bidirectional) {
      const inEdges = this.graph.reverseAdjacencyList.get(nodeId) || new Set();
      inEdges.forEach((edgeId) => {
        const edge = this.graph.edges.get(edgeId);
        if (edge && (!edgeTypes || edgeTypes.includes(edge.type))) {
          edges.push(edge);
        }
      });
    }

    return edges;
  }

  /**
   * Find diseases by symptoms (differential diagnosis support)
   */
  findBySymptoms(
    symptoms: string[],
    options?: {
      minMatch?: number;
      sortBy?: 'frequency' | 'specificity';
    }
  ): QueryResult {
    const { minMatch = 1, sortBy = 'frequency' } = options || {};
    const startTime = performance.now();

    const diseaseScores = new Map<string, { node: DiseaseNode; score: number; matchedSymptoms: string[] }>();

    // Normalize input symptoms
    const normalizedSymptoms = symptoms.map((s) => this.normalizeString(s));

    // Find all symptom nodes that match
    const symptomNodes = this.getNodesByType('Symptom') as SymptomNode[];
    const matchedSymptomNodes: SymptomNode[] = [];

    for (const symptomNode of symptomNodes) {
      const normalizedLabel = this.normalizeString(symptomNode.label);
      const normalizedSynonyms = (symptomNode.synonyms || []).map((s) =>
        this.normalizeString(s)
      );

      for (const inputSymptom of normalizedSymptoms) {
        if (
          normalizedLabel.includes(inputSymptom) ||
          inputSymptom.includes(normalizedLabel) ||
          normalizedSynonyms.some(
            (syn) => syn.includes(inputSymptom) || inputSymptom.includes(syn)
          )
        ) {
          matchedSymptomNodes.push(symptomNode);
          break;
        }
      }
    }

    // Find diseases connected to matched symptoms
    for (const symptomNode of matchedSymptomNodes) {
      const incomingEdges = this.graph.reverseAdjacencyList.get(symptomNode.id) || new Set();

      incomingEdges.forEach((edgeId) => {
        const edge = this.graph.edges.get(edgeId);
        if (edge && (edge.type === 'CAUSES' || edge.type === 'MANIFESTS_AS')) {
          const diseaseNode = this.graph.nodes.get(edge.source) as DiseaseNode;
          if (diseaseNode && diseaseNode.type === 'Disease') {
            const existing = diseaseScores.get(diseaseNode.id);
            if (existing) {
              existing.score += edge.weight || 1;
              existing.matchedSymptoms.push(symptomNode.label);
            } else {
              diseaseScores.set(diseaseNode.id, {
                node: diseaseNode,
                score: edge.weight || 1,
                matchedSymptoms: [symptomNode.label],
              });
            }
          }
        }
      });
    }

    // Filter by minimum matches and sort
    const results = Array.from(diseaseScores.values())
      .filter((r) => r.matchedSymptoms.length >= minMatch)
      .sort((a, b) => {
        if (sortBy === 'frequency') {
          return b.matchedSymptoms.length - a.matchedSymptoms.length;
        }
        return b.score - a.score;
      });

    return {
      nodes: results.map((r) => r.node),
      edges: [],
      metadata: {
        queryTime: performance.now() - startTime,
        resultCount: results.length,
      },
    };
  }

  /**
   * Search nodes by text
   */
  search(filters: SearchFilters): QueryResult {
    const startTime = performance.now();
    let nodes = Array.from(this.graph.nodes.values());

    // Filter by node types
    if (filters.nodeTypes && filters.nodeTypes.length > 0) {
      nodes = nodes.filter((n) => filters.nodeTypes!.includes(n.type));
    }

    // Filter by text search
    if (filters.textSearch) {
      const searchTerm = this.normalizeString(filters.textSearch);
      nodes = nodes.filter((n) => {
        const normalizedLabel = this.normalizeString(n.label);
        const normalizedSynonyms = (n.synonyms || []).map((s) =>
          this.normalizeString(s)
        );
        return (
          normalizedLabel.includes(searchTerm) ||
          normalizedSynonyms.some((syn) => syn.includes(searchTerm))
        );
      });
    }

    // Filter by ontology codes
    if (filters.ontologyCodes && filters.ontologyCodes.length > 0) {
      nodes = nodes.filter((n) => {
        if (!('ontologies' in n)) return false;
        const ontologies = (n as DiseaseNode | MedicationNode).ontologies;

        return filters.ontologyCodes!.some((filter) => {
          switch (filter.type) {
            case 'doid':
              return 'doid' in ontologies && ontologies.doid === filter.code;
            case 'icd10':
              return 'icd10' in ontologies && ontologies.icd10?.includes(filter.code);
            case 'snomedCT':
              return 'snomedCT' in ontologies && ontologies.snomedCT === filter.code;
            case 'atc':
              return 'atcCode' in ontologies && ontologies.atcCode === filter.code;
            case 'loinc':
              return 'loinc' in ontologies && ontologies.loinc === filter.code;
            case 'ciap2':
              return 'ciap2' in ontologies && ontologies.ciap2?.includes(filter.code);
            default:
              return false;
          }
        });
      });
    }

    // Apply pagination
    const offset = filters.offset || 0;
    const limit = filters.limit || nodes.length;
    nodes = nodes.slice(offset, offset + limit);

    return {
      nodes,
      edges: [],
      metadata: {
        queryTime: performance.now() - startTime,
        resultCount: nodes.length,
      },
    };
  }

  /**
   * Get subgraph centered on a node
   */
  getSubgraph(centerId: string, depth: number = 1): Subgraph {
    const result = this.findRelated(centerId, { depth, direction: 'both' });
    const centerNode = this.graph.nodes.get(centerId);

    return {
      nodes: result.nodes,
      edges: result.edges,
      centerNode,
      depth,
    };
  }

  // ===========================================================================
  // STATISTICS
  // ===========================================================================

  /**
   * Get graph statistics
   */
  getStats(): GraphStats {
    const nodesByType: Record<KGNodeType, number> = {} as Record<KGNodeType, number>;
    const edgesByType: Record<KGEdgeType, number> = {} as Record<KGEdgeType, number>;

    this.graph.nodes.forEach((node) => {
      nodesByType[node.type] = (nodesByType[node.type] || 0) + 1;
    });

    this.graph.edges.forEach((edge) => {
      edgesByType[edge.type] = (edgesByType[edge.type] || 0) + 1;
    });

    const totalNodes = this.graph.nodes.size;
    const totalEdges = this.graph.edges.size;

    // Calculate average degree
    let totalDegree = 0;
    this.graph.adjacencyList.forEach((edges) => {
      totalDegree += edges.size;
    });
    const avgDegree = totalNodes > 0 ? totalDegree / totalNodes : 0;

    // Calculate density (for directed graph)
    const maxEdges = totalNodes * (totalNodes - 1);
    const density = maxEdges > 0 ? totalEdges / maxEdges : 0;

    // Count connected components (simplified - just count isolated nodes)
    let isolatedNodes = 0;
    this.graph.nodes.forEach((_, id) => {
      const outEdges = this.graph.adjacencyList.get(id)?.size || 0;
      const inEdges = this.graph.reverseAdjacencyList.get(id)?.size || 0;
      if (outEdges === 0 && inEdges === 0) {
        isolatedNodes++;
      }
    });

    return {
      totalNodes,
      totalEdges,
      nodesByType,
      edgesByType,
      avgDegree,
      density,
      connectedComponents: isolatedNodes > 0 ? isolatedNodes + 1 : 1,
    };
  }

  // ===========================================================================
  // SERIALIZATION
  // ===========================================================================

  /**
   * Export graph to JSON
   */
  toJSON(): object {
    return {
      nodes: Array.from(this.graph.nodes.values()),
      edges: Array.from(this.graph.edges.values()),
      metadata: this.graph.metadata,
    };
  }

  /**
   * Import graph from JSON
   */
  fromJSON(data: { nodes: KGNode[]; edges: KGEdge[]; metadata?: KnowledgeGraph['metadata'] }): void {
    this.graph = this.createEmptyGraph();

    // Add nodes first
    data.nodes.forEach((node) => {
      this.addNode(node);
    });

    // Then add edges
    data.edges.forEach((edge) => {
      try {
        this.addEdge(edge);
      } catch {
        // Skip edges with missing nodes
        console.warn(`Skipping edge ${edge.id}: missing node`);
      }
    });

    if (data.metadata) {
      this.graph.metadata = { ...this.graph.metadata, ...data.metadata };
    }
  }

  // ===========================================================================
  // CYPHER EXPORT (Neo4j compatibility)
  // ===========================================================================

  /**
   * Export the entire graph to Cypher statements for Neo4j
   */
  exportToCypher(config?: CypherExportConfig): CypherExport {
    const {
      includeIndexes = true,
      includeConstraints = true,
      batchSize = 100,
    } = config || {};

    const schema: CypherStatement[] = [];
    const nodes: CypherStatement[] = [];
    const edges: CypherStatement[] = [];

    // Generate schema statements
    if (includeConstraints) {
      schema.push(...this.generateConstraints());
    }
    if (includeIndexes) {
      schema.push(...this.generateIndexes());
    }

    // Generate node creation statements
    const nodeTypes = new Set(
      Array.from(this.graph.nodes.values()).map((n) => n.type)
    );

    nodeTypes.forEach((type) => {
      const nodesOfType = Array.from(this.graph.nodes.values()).filter(
        (n) => n.type === type
      );

      // Batch nodes
      for (let i = 0; i < nodesOfType.length; i += batchSize) {
        const batch = nodesOfType.slice(i, i + batchSize);
        nodes.push(this.generateNodeBatch(batch, type));
      }
    });

    // Generate edge creation statements
    const edgeArray = Array.from(this.graph.edges.values());
    for (let i = 0; i < edgeArray.length; i += batchSize) {
      const batch = edgeArray.slice(i, i + batchSize);
      edges.push(this.generateEdgeBatch(batch));
    }

    // Generate full script
    const script = [
      '// DARWIN-MFC Knowledge Graph - Neo4j Import Script',
      `// Generated: ${new Date().toISOString()}`,
      `// Nodes: ${this.graph.nodes.size}, Edges: ${this.graph.edges.size}`,
      '',
      '// ========================================',
      '// SCHEMA (Constraints and Indexes)',
      '// ========================================',
      ...schema.map((s) => s.query),
      '',
      '// ========================================',
      '// NODES',
      '// ========================================',
      ...nodes.map((s) => s.query),
      '',
      '// ========================================',
      '// RELATIONSHIPS',
      '// ========================================',
      ...edges.map((s) => s.query),
    ].join('\n');

    return { schema, nodes, edges, script };
  }

  /**
   * Generate constraint statements
   */
  private generateConstraints(): CypherStatement[] {
    const nodeTypes: KGNodeType[] = [
      'Disease',
      'Symptom',
      'Medication',
      'Examination',
      'Pathway',
      'Gene',
    ];

    return nodeTypes.map((type) => ({
      query: `CREATE CONSTRAINT IF NOT EXISTS FOR (n:${type}) REQUIRE n.id IS UNIQUE;`,
    }));
  }

  /**
   * Generate index statements
   */
  private generateIndexes(): CypherStatement[] {
    return [
      { query: 'CREATE INDEX IF NOT EXISTS FOR (n:Disease) ON (n.label);' },
      { query: 'CREATE INDEX IF NOT EXISTS FOR (n:Disease) ON (n.doid);' },
      { query: 'CREATE INDEX IF NOT EXISTS FOR (n:Medication) ON (n.label);' },
      { query: 'CREATE INDEX IF NOT EXISTS FOR (n:Medication) ON (n.atcCode);' },
      { query: 'CREATE INDEX IF NOT EXISTS FOR (n:Symptom) ON (n.label);' },
      { query: 'CREATE INDEX IF NOT EXISTS FOR (n:Examination) ON (n.loinc);' },
      { query: 'CREATE INDEX IF NOT EXISTS FOR (n:Gene) ON (n.hgncSymbol);' },
    ];
  }

  /**
   * Generate Cypher for a batch of nodes
   */
  private generateNodeBatch(nodes: KGNode[], type: KGNodeType): CypherStatement {
    const nodeStatements = nodes.map((node) => {
      const props = this.nodeToProperties(node);
      return `CREATE (n:${type} ${this.objectToCypher(props)})`;
    });

    return {
      query: nodeStatements.join('\n') + ';',
    };
  }

  /**
   * Convert node to property object for Cypher
   */
  private nodeToProperties(node: KGNode): Record<string, unknown> {
    const props: Record<string, unknown> = {
      id: node.id,
      label: node.label,
    };

    if (node.synonyms) {
      props.synonyms = node.synonyms;
    }

    // Add ontology properties based on node type
    if ('ontologies' in node) {
      const ontologies = node.ontologies;
      if ('doid' in ontologies && ontologies.doid) props.doid = ontologies.doid;
      if ('icd10' in ontologies && ontologies.icd10) props.icd10 = ontologies.icd10;
      if ('snomedCT' in ontologies && ontologies.snomedCT) props.snomedCT = ontologies.snomedCT;
      if ('atcCode' in ontologies && ontologies.atcCode) props.atcCode = ontologies.atcCode;
      if ('loinc' in ontologies && ontologies.loinc) props.loinc = ontologies.loinc;
    }

    // Add specific properties
    if (node.type === 'Disease') {
      const diseaseNode = node as DiseaseNode;
      if (diseaseNode.category) props.category = diseaseNode.category;
      if (diseaseNode.chronic !== undefined) props.chronic = diseaseNode.chronic;
    }

    if (node.type === 'Medication') {
      const medNode = node as MedicationNode;
      if (medNode.genericName) props.genericName = medNode.genericName;
      if (medNode.therapeuticClass) props.therapeuticClass = medNode.therapeuticClass;
      if (medNode.pregnancyCategory) props.pregnancyCategory = medNode.pregnancyCategory;
    }

    return props;
  }

  /**
   * Generate Cypher for a batch of edges
   */
  private generateEdgeBatch(edges: KGEdge[]): CypherStatement {
    const edgeStatements = edges.map((edge) => {
      const props = this.edgeToProperties(edge);
      const propsStr = Object.keys(props).length > 0 ? ` ${this.objectToCypher(props)}` : '';
      return `MATCH (a {id: '${edge.source}'}), (b {id: '${edge.target}'}) CREATE (a)-[:${edge.type}${propsStr}]->(b)`;
    });

    return {
      query: edgeStatements.join('\n') + ';',
    };
  }

  /**
   * Convert edge to property object for Cypher
   */
  private edgeToProperties(edge: KGEdge): Record<string, unknown> {
    const props: Record<string, unknown> = {};

    if (edge.weight !== undefined) props.weight = edge.weight;
    if (edge.evidenceLevel) props.evidenceLevel = edge.evidenceLevel;
    if (edge.citation) props.citation = edge.citation;

    // Add type-specific properties
    if ('properties' in edge && edge.properties) {
      Object.entries(edge.properties).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          props[key] = value;
        }
      });
    }

    return props;
  }

  /**
   * Convert JS object to Cypher property string
   */
  private objectToCypher(obj: Record<string, unknown>): string {
    const props = Object.entries(obj)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}: '${value.replace(/'/g, "\\'")}'`;
        }
        if (Array.isArray(value)) {
          const arrayStr = value
            .map((v) => (typeof v === 'string' ? `'${v.replace(/'/g, "\\'")}'` : v))
            .join(', ');
          return `${key}: [${arrayStr}]`;
        }
        return `${key}: ${value}`;
      });

    return `{${props.join(', ')}}`;
  }

  // ===========================================================================
  // UTILITY METHODS
  // ===========================================================================

  /**
   * Clear the entire graph
   */
  clear(): void {
    this.graph = this.createEmptyGraph();
  }

  /**
   * Get graph metadata
   */
  getMetadata(): KnowledgeGraph['metadata'] {
    return { ...this.graph.metadata };
  }

  /**
   * Get all nodes
   */
  getAllNodes(): KGNode[] {
    return Array.from(this.graph.nodes.values());
  }

  /**
   * Get all edges
   */
  getAllEdges(): KGEdge[] {
    return Array.from(this.graph.edges.values());
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

/**
 * Default knowledge graph service instance
 */
export const knowledgeGraphService = new KnowledgeGraphService();

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Create a disease node from Darwin-MFC Doenca data
 */
export function createDiseaseNodeFromDoenca(doenca: {
  id: string;
  titulo: string;
  sinonimos?: string[];
  doid?: string;
  cid10: string[];
  cid11?: string[];
  snomedCT?: string;
  meshId?: string;
  umlsCui?: string;
  ciap2?: string[];
  ordo?: string[];
  hpo?: string[];
  categoria: string;
}): CreateNodeInput<DiseaseNode> {
  return {
    type: 'Disease',
    label: doenca.titulo,
    synonyms: doenca.sinonimos,
    ontologies: {
      doid: doenca.doid,
      icd10: doenca.cid10,
      icd11: doenca.cid11,
      snomedCT: doenca.snomedCT,
      meshId: doenca.meshId,
      umlsCui: doenca.umlsCui,
      ciap2: doenca.ciap2,
      ordo: doenca.ordo,
      hpo: doenca.hpo,
    },
    category: doenca.categoria,
  };
}

/**
 * Create a medication node from Darwin-MFC Medicamento data
 */
export function createMedicationNodeFromMedicamento(medicamento: {
  id: string;
  nomeGenerico: string;
  nomesComerciais?: string[];
  atcCode?: string;
  rxNormCui?: string;
  snomedCT?: string;
  drugBankId?: string;
  classeTerapeutica: string;
  mecanismoAcao?: string;
  rename?: boolean;
  gestacao?: string;
  pharmgkb?: { gene: string; variant?: string; phenotype?: string; implications?: string[] }[];
}): CreateNodeInput<MedicationNode> {
  return {
    type: 'Medication',
    label: medicamento.nomeGenerico,
    genericName: medicamento.nomeGenerico,
    brandNames: medicamento.nomesComerciais,
    ontologies: {
      atcCode: medicamento.atcCode,
      rxNormCui: medicamento.rxNormCui,
      snomedCT: medicamento.snomedCT,
      drugBankId: medicamento.drugBankId,
    },
    therapeuticClass: medicamento.classeTerapeutica,
    mechanismOfAction: medicamento.mecanismoAcao,
    rename: medicamento.rename,
    pregnancyCategory: medicamento.gestacao as 'A' | 'B' | 'C' | 'D' | 'X' | 'N' | undefined,
    pharmacogenomics: medicamento.pharmgkb?.map((p) => ({
      gene: p.gene,
      variant: p.variant,
      phenotype: p.phenotype,
      implications: p.implications?.join('; '),
    })),
  };
}
