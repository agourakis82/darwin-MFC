'use client';

/**
 * KNOWLEDGE GRAPH VIEWER - DARWIN-MFC
 * ====================================
 *
 * Interactive visualization component for medical knowledge graphs.
 * Uses React Flow for node/edge rendering with pan/zoom capabilities.
 *
 * Supports both the legacy graph format (lib/graph/) and the new
 * Neo4j-compatible knowledge graph format (lib/knowledge-graph/).
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  ConnectionLineType,
  MarkerType,
  NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Legacy graph types
import type { KnowledgeGraph, GraphNode, GraphEdge } from '@/lib/graph/types';

// New knowledge graph types
import type {
  KGNode,
  KGEdge,
  KGNodeType,
  Subgraph,
} from '@/lib/knowledge-graph/types';

// =============================================================================
// LEGACY VIEWER (for lib/graph compatibility)
// =============================================================================

interface LegacyKnowledgeGraphViewerProps {
  graph: KnowledgeGraph;
  height?: string;
  className?: string;
}

/**
 * Legacy visualizer for the old graph format (lib/graph)
 */
export function LegacyKnowledgeGraphViewer({
  graph,
  height = '600px',
  className = '',
}: LegacyKnowledgeGraphViewerProps) {
  // Convert graph nodes to ReactFlow nodes with positions
  const initialNodes = useMemo(() => {
    return graph.nodes.map((node, index) => {
      // Simple layout: arrange nodes in a grid/circle
      const angle = (index / graph.nodes.length) * 2 * Math.PI;
      const radius = 200;
      const x = Math.cos(angle) * radius + 400;
      const y = Math.sin(angle) * radius + 300;

      return {
        id: node.id,
        type: 'default',
        position: { x, y },
        data: {
          label: node.label,
          type: node.type,
        },
        style: getLegacyNodeStyle(node.type),
      } as Node;
    });
  }, [graph.nodes]);

  // Convert graph edges to ReactFlow edges
  const initialEdges = useMemo(() => {
    return graph.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'default',
      label: edge.label || edge.type,
      style: getLegacyEdgeStyle(edge.type),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: getLegacyEdgeColor(edge.type),
      },
    })) as Edge[];
  }, [graph.edges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Filter nodes and edges based on type
  const filterByType = useCallback((nodeTypes: string[]) => {
    const filteredNodeIds = new Set(
      graph.nodes.filter((n) => nodeTypes.includes(n.type)).map((n) => n.id)
    );

    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        hidden: !filteredNodeIds.has(node.id),
      }))
    );

    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        hidden:
          !filteredNodeIds.has(edge.source) || !filteredNodeIds.has(edge.target),
      }))
    );
  }, [graph.nodes, setNodes, setEdges]);

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => {
            setNodes((nds) => nds.map((n) => ({ ...n, hidden: false })));
            setEdges((eds) => eds.map((e) => ({ ...e, hidden: false })));
          }}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Mostrar Todos
        </button>
        <button
          onClick={() => filterByType(['doenca'])}
          className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Apenas Doencas
        </button>
        <button
          onClick={() => filterByType(['medicamento'])}
          className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Apenas Medicamentos
        </button>
        <button
          onClick={() => filterByType(['doenca', 'medicamento'])}
          className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Doencas + Medicamentos
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

// Legacy style helpers
function getLegacyNodeStyle(type: string): React.CSSProperties {
  const styles: Record<string, React.CSSProperties> = {
    doenca: { background: '#ef4444', color: '#fff', border: '2px solid #dc2626' },
    sintoma: { background: '#f59e0b', color: '#fff', border: '2px solid #d97706' },
    exame: { background: '#3b82f6', color: '#fff', border: '2px solid #2563eb' },
    medicamento: { background: '#8b5cf6', color: '#fff', border: '2px solid #7c3aed' },
    gene: { background: '#10b981', color: '#fff', border: '2px solid #059669' },
    protocolo: { background: '#ec4899', color: '#fff', border: '2px solid #db2777' },
  };
  return styles[type] || { background: '#6b7280', color: '#fff', border: '2px solid #4b5563' };
}

function getLegacyEdgeStyle(type: string): React.CSSProperties {
  const styles: Record<string, React.CSSProperties> = {
    causa: { stroke: '#ef4444', strokeWidth: 2 },
    trata: { stroke: '#8b5cf6', strokeWidth: 2 },
    diagnostica: { stroke: '#3b82f6', strokeWidth: 2 },
    interage: { stroke: '#f59e0b', strokeWidth: 3, strokeDasharray: '5,5' },
    metaboliza: { stroke: '#10b981', strokeWidth: 2 },
  };
  return styles[type] || { stroke: '#6b7280', strokeWidth: 1 };
}

function getLegacyEdgeColor(type: string): string {
  const colors: Record<string, string> = {
    causa: '#ef4444',
    trata: '#8b5cf6',
    diagnostica: '#3b82f6',
    interage: '#f59e0b',
    metaboliza: '#10b981',
  };
  return colors[type] || '#6b7280';
}

// =============================================================================
// NEW KNOWLEDGE GRAPH VIEWER (for lib/knowledge-graph)
// =============================================================================

/**
 * Node type colors for the new knowledge graph
 */
const NODE_COLORS: Record<KGNodeType, { background: string; border: string; text: string }> = {
  Disease: { background: '#fee2e2', border: '#ef4444', text: '#991b1b' },
  Symptom: { background: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  Medication: { background: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  Examination: { background: '#d1fae5', border: '#10b981', text: '#065f46' },
  Pathway: { background: '#ede9fe', border: '#8b5cf6', text: '#5b21b6' },
  Gene: { background: '#fce7f3', border: '#ec4899', text: '#9d174d' },
  Protocol: { background: '#e0e7ff', border: '#6366f1', text: '#3730a3' },
  Organ: { background: '#f3e8ff', border: '#a855f7', text: '#6b21a8' },
  BodySystem: { background: '#ccfbf1', border: '#14b8a6', text: '#0f766e' },
  RiskFactor: { background: '#ffedd5', border: '#f97316', text: '#9a3412' },
  Complication: { background: '#fecaca', border: '#dc2626', text: '#7f1d1d' },
};

const NODE_ICONS: Record<KGNodeType, string> = {
  Disease: 'D',
  Symptom: 'S',
  Medication: 'Rx',
  Examination: 'E',
  Pathway: 'P',
  Gene: 'G',
  Protocol: 'Pr',
  Organ: 'O',
  BodySystem: 'B',
  RiskFactor: 'R',
  Complication: 'C',
};

const EDGE_STYLES: Record<string, { stroke: string; strokeWidth: number; animated?: boolean }> = {
  TREATS: { stroke: '#3b82f6', strokeWidth: 2 },
  FIRST_LINE_FOR: { stroke: '#22c55e', strokeWidth: 3 },
  SECOND_LINE_FOR: { stroke: '#84cc16', strokeWidth: 2 },
  CAUSES: { stroke: '#ef4444', strokeWidth: 2, animated: true },
  MANIFESTS_AS: { stroke: '#f59e0b', strokeWidth: 2 },
  DIAGNOSED_BY: { stroke: '#10b981', strokeWidth: 2 },
  INTERACTS_WITH: { stroke: '#dc2626', strokeWidth: 2, animated: true },
  CONTRAINDICATED_IN: { stroke: '#7f1d1d', strokeWidth: 3, animated: true },
  PROGRESSES_TO: { stroke: '#8b5cf6', strokeWidth: 2, animated: true },
  COMORBID_WITH: { stroke: '#6366f1', strokeWidth: 1 },
  INVOLVES_PATHWAY: { stroke: '#a855f7', strokeWidth: 1 },
  TARGETS_PATHWAY: { stroke: '#ec4899', strokeWidth: 2 },
  DEFAULT: { stroke: '#64748b', strokeWidth: 1 },
};

/**
 * Calculate node positions in concentric circles by type
 */
function calculateLayout(
  nodes: KGNode[],
  centerNodeId?: string
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  const centerX = 400;
  const centerY = 300;

  // Group nodes by type
  const nodesByType = new Map<KGNodeType, KGNode[]>();
  nodes.forEach((node) => {
    const existing = nodesByType.get(node.type) || [];
    existing.push(node);
    nodesByType.set(node.type, existing);
  });

  // Position center node
  if (centerNodeId) {
    positions.set(centerNodeId, { x: centerX, y: centerY });
  }

  // Position other nodes in circles by type
  const typeOrder: KGNodeType[] = [
    'Disease', 'Symptom', 'Medication', 'Examination', 'Pathway',
    'Gene', 'RiskFactor', 'Complication', 'Organ', 'BodySystem', 'Protocol',
  ];

  let radiusMultiplier = 0;
  typeOrder.forEach((type) => {
    const nodesOfType = nodesByType.get(type) || [];
    if (nodesOfType.length === 0) return;

    radiusMultiplier++;
    const radius = 150 * radiusMultiplier;
    const angleStep = (2 * Math.PI) / Math.max(nodesOfType.length, 1);

    nodesOfType.forEach((node, i) => {
      if (positions.has(node.id)) return;
      const angle = i * angleStep - Math.PI / 2;
      positions.set(node.id, {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    });
  });

  return positions;
}

interface KnowledgeGraphViewerProps {
  /** Nodes to display */
  nodes: KGNode[];
  /** Edges to display */
  edges: KGEdge[];
  /** Callback when a node is clicked */
  onNodeClick?: (node: KGNode) => void;
  /** Callback when an edge is clicked */
  onEdgeClick?: (edge: KGEdge) => void;
  /** Node to center/highlight */
  centerNodeId?: string;
  /** Graph title */
  title?: string;
  /** Show minimap */
  showMinimap?: boolean;
  /** Show controls */
  showControls?: boolean;
  /** Height of the viewer */
  height?: string;
  /** Class name for the container */
  className?: string;
}

/**
 * Interactive Knowledge Graph Viewer for the new Neo4j-compatible format
 */
export function KnowledgeGraphViewer({
  nodes: inputNodes,
  edges: inputEdges,
  onNodeClick,
  onEdgeClick,
  centerNodeId,
  title,
  showMinimap = true,
  showControls = true,
  height = '600px',
  className = '',
}: KnowledgeGraphViewerProps) {
  const [selectedNode, setSelectedNode] = useState<KGNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<KGEdge | null>(null);
  const [filterTypes, setFilterTypes] = useState<KGNodeType[]>([]);

  // Convert KG nodes to React Flow nodes
  const initialNodes = useMemo(() => {
    const positions = calculateLayout(inputNodes, centerNodeId);

    return inputNodes.map((node): Node => {
      const colors = NODE_COLORS[node.type];
      const isCenter = node.id === centerNodeId;
      const pos = positions.get(node.id) || { x: 100, y: 100 };

      return {
        id: node.id,
        type: 'default',
        position: pos,
        hidden: filterTypes.length > 0 && !filterTypes.includes(node.type),
        data: {
          label: (
            <div className="text-center">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-1 text-[10px] font-bold"
                style={{ backgroundColor: colors.border, color: 'white' }}
              >
                {NODE_ICONS[node.type]}
              </div>
              <div className="text-[10px] font-medium max-w-[100px] truncate" title={node.label}>
                {node.label}
              </div>
            </div>
          ),
        },
        style: {
          background: colors.background,
          border: `2px solid ${colors.border}`,
          borderRadius: '8px',
          padding: '6px',
          fontSize: '10px',
          width: 120,
          boxShadow: isCenter ? `0 0 15px ${colors.border}` : undefined,
        },
      };
    });
  }, [inputNodes, centerNodeId, filterTypes]);

  // Convert KG edges to React Flow edges
  const initialEdges = useMemo(() => {
    const hiddenNodeIds = new Set(
      inputNodes
        .filter((n) => filterTypes.length > 0 && !filterTypes.includes(n.type))
        .map((n) => n.id)
    );

    return inputEdges.map((edge): Edge => {
      const style = EDGE_STYLES[edge.type] || EDGE_STYLES.DEFAULT;
      const isHidden = hiddenNodeIds.has(edge.source) || hiddenNodeIds.has(edge.target);

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        animated: style.animated || false,
        hidden: isHidden,
        style: {
          stroke: style.stroke,
          strokeWidth: style.strokeWidth,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: style.stroke,
        },
        label: edge.type.replace(/_/g, ' '),
        labelStyle: { fontSize: '8px', fill: style.stroke },
        labelBgStyle: { fill: 'white', fillOpacity: 0.8 },
      };
    });
  }, [inputEdges, inputNodes, filterTypes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update when inputs change
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Handle node click
  const handleNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const kgNode = inputNodes.find((n) => n.id === node.id);
      if (kgNode) {
        setSelectedNode(kgNode);
        setSelectedEdge(null);
        onNodeClick?.(kgNode);
      }
    },
    [inputNodes, onNodeClick]
  );

  // Handle edge click
  const handleEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      const kgEdge = inputEdges.find((e) => e.id === edge.id);
      if (kgEdge) {
        setSelectedEdge(kgEdge);
        setSelectedNode(null);
        onEdgeClick?.(kgEdge);
      }
    },
    [inputEdges, onEdgeClick]
  );

  // Toggle filter
  const toggleFilter = (type: KGNodeType) => {
    setFilterTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Get unique node types
  const uniqueTypes = useMemo(
    () => Array.from(new Set(inputNodes.map((n) => n.type))),
    [inputNodes]
  );

  return (
    <div
      className={`w-full bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
      style={{ height }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        {showControls && <Controls />}
        <Background />
        {showMinimap && (
          <MiniMap
            nodeColor={(node) => {
              const kgNode = inputNodes.find((n) => n.id === node.id);
              return kgNode ? NODE_COLORS[kgNode.type].border : '#64748b';
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        )}

        {/* Title Panel */}
        {title && (
          <Panel position="top-left" className="bg-white dark:bg-gray-800 p-2 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-xs text-gray-500">
              {inputNodes.length} nodes, {inputEdges.length} edges
            </p>
          </Panel>
        )}

        {/* Filter Panel */}
        <Panel position="top-center" className="bg-white dark:bg-gray-800 p-2 rounded shadow">
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setFilterTypes([])}
              className={`px-2 py-1 text-xs rounded ${
                filterTypes.length === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All
            </button>
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${
                  filterTypes.includes(type)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: NODE_COLORS[type].border }}
                />
                {type}
              </button>
            ))}
          </div>
        </Panel>

        {/* Legend Panel */}
        <Panel position="top-right" className="bg-white dark:bg-gray-800 p-2 rounded shadow max-h-[200px] overflow-y-auto">
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Legend</h4>
          <div className="space-y-0.5">
            {uniqueTypes.map((type) => {
              const count = inputNodes.filter((n) => n.type === type).length;
              return (
                <div key={type} className="flex items-center gap-1 text-[10px]">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: NODE_COLORS[type].border }}
                  />
                  <span className="text-gray-600 dark:text-gray-400">
                    {type} ({count})
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>

        {/* Selected Info Panel */}
        {(selectedNode || selectedEdge) && (
          <Panel position="bottom-right" className="bg-white dark:bg-gray-800 p-2 rounded shadow max-w-[250px]">
            {selectedNode && (
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: NODE_COLORS[selectedNode.type].border }}
                  />
                  <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                    {selectedNode.type}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1">
                  {selectedNode.label}
                </h4>
                {selectedNode.synonyms && selectedNode.synonyms.length > 0 && (
                  <p className="text-[10px] text-gray-500">
                    Also: {selectedNode.synonyms.slice(0, 2).join(', ')}
                  </p>
                )}
                {'ontologies' in selectedNode && (
                  <div className="text-[10px] text-gray-500 mt-1">
                    {(selectedNode as any).ontologies?.doid && (
                      <p>DOID: {(selectedNode as any).ontologies.doid}</p>
                    )}
                    {(selectedNode as any).ontologies?.icd10 && (
                      <p>ICD-10: {(selectedNode as any).ontologies.icd10.slice(0, 2).join(', ')}</p>
                    )}
                    {(selectedNode as any).ontologies?.atcCode && (
                      <p>ATC: {(selectedNode as any).ontologies.atcCode}</p>
                    )}
                  </div>
                )}
              </div>
            )}
            {selectedEdge && (
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1">
                  {selectedEdge.type.replace(/_/g, ' ')}
                </h4>
                <p className="text-[10px] text-gray-500">
                  Weight: {selectedEdge.weight?.toFixed(2) || 'N/A'}
                </p>
              </div>
            )}
            <button
              onClick={() => { setSelectedNode(null); setSelectedEdge(null); }}
              className="mt-1 text-[10px] text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}

// =============================================================================
// SUBGRAPH VIEWER
// =============================================================================

interface SubgraphViewerProps {
  subgraph: Subgraph;
  title?: string;
  onNodeClick?: (node: KGNode) => void;
  height?: string;
  className?: string;
}

/**
 * Specialized viewer for displaying subgraphs centered on a specific node
 */
export function SubgraphViewer({
  subgraph,
  title,
  onNodeClick,
  height,
  className,
}: SubgraphViewerProps) {
  return (
    <KnowledgeGraphViewer
      nodes={subgraph.nodes}
      edges={subgraph.edges}
      centerNodeId={subgraph.centerNode?.id}
      title={title || (subgraph.centerNode ? `Connections: ${subgraph.centerNode.label}` : 'Subgraph')}
      onNodeClick={onNodeClick}
      height={height}
      className={className}
    />
  );
}

// Default export for backwards compatibility
export default LegacyKnowledgeGraphViewer;
