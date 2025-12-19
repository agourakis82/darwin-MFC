'use client';

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { KnowledgeGraph, GraphNode, GraphEdge } from '@/lib/graph/types';

interface KnowledgeGraphViewerProps {
  graph: KnowledgeGraph;
  height?: string;
  className?: string;
}

/**
 * Visualize knowledge graph using ReactFlow
 */
export function KnowledgeGraphViewer({
  graph,
  height = '600px',
  className = '',
}: KnowledgeGraphViewerProps) {
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
        style: getNodeStyle(node.type),
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
      style: getEdgeStyle(edge.type),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: getEdgeColor(edge.type),
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
          Apenas Doenças
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
          Doenças + Medicamentos
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

/**
 * Get node style based on type
 */
function getNodeStyle(type: string): React.CSSProperties {
  const styles: Record<string, React.CSSProperties> = {
    doenca: {
      background: '#ef4444',
      color: '#fff',
      border: '2px solid #dc2626',
    },
    sintoma: {
      background: '#f59e0b',
      color: '#fff',
      border: '2px solid #d97706',
    },
    exame: {
      background: '#3b82f6',
      color: '#fff',
      border: '2px solid #2563eb',
    },
    medicamento: {
      background: '#8b5cf6',
      color: '#fff',
      border: '2px solid #7c3aed',
    },
    gene: {
      background: '#10b981',
      color: '#fff',
      border: '2px solid #059669',
    },
    protocolo: {
      background: '#ec4899',
      color: '#fff',
      border: '2px solid #db2777',
    },
  };

  return styles[type] || {
    background: '#6b7280',
    color: '#fff',
    border: '2px solid #4b5563',
  };
}

/**
 * Get edge style based on type
 */
function getEdgeStyle(type: string): React.CSSProperties {
  const styles: Record<string, React.CSSProperties> = {
    causa: {
      stroke: '#ef4444',
      strokeWidth: 2,
    },
    trata: {
      stroke: '#8b5cf6',
      strokeWidth: 2,
    },
    diagnostica: {
      stroke: '#3b82f6',
      strokeWidth: 2,
    },
    interage: {
      stroke: '#f59e0b',
      strokeWidth: 3,
      strokeDasharray: '5,5',
    },
    metaboliza: {
      stroke: '#10b981',
      strokeWidth: 2,
    },
  };

  return styles[type] || {
    stroke: '#6b7280',
    strokeWidth: 1,
  };
}

/**
 * Get edge color based on type
 */
function getEdgeColor(type: string): string {
  const colors: Record<string, string> = {
    causa: '#ef4444',
    trata: '#8b5cf6',
    diagnostica: '#3b82f6',
    interage: '#f59e0b',
    metaboliza: '#10b981',
  };

  return colors[type] || '#6b7280';
}

