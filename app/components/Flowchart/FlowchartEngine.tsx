'use client';

import React, { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Node,
  Edge,
  NodeProps,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CustomNodeData, ProtocolNode, ProtocolEdge, NodeType } from '@/lib/types/protocolo';

// Cores por tipo de nó
const nodeColors: Record<NodeType, { bg: string; border: string; text: string }> = {
  start: { bg: '#10b981', border: '#059669', text: '#ffffff' },
  end: { bg: '#6366f1', border: '#4f46e5', text: '#ffffff' },
  decision: { bg: '#f59e0b', border: '#d97706', text: '#ffffff' },
  action: { bg: '#3b82f6', border: '#2563eb', text: '#ffffff' },
  assessment: { bg: '#8b5cf6', border: '#7c3aed', text: '#ffffff' },
  treatment: { bg: '#06b6d4', border: '#0891b2', text: '#ffffff' },
  referral: { bg: '#ec4899', border: '#db2777', text: '#ffffff' },
  alert: { bg: '#ef4444', border: '#dc2626', text: '#ffffff' },
  info: { bg: '#64748b', border: '#475569', text: '#ffffff' },
};

// Ícones por tipo
const nodeIcons: Record<NodeType, string> = {
  start: '▶️',
  end: '🏁',
  decision: '❓',
  action: '⚡',
  assessment: '🔍',
  treatment: '💊',
  referral: '🏥',
  alert: '⚠️',
  info: 'ℹ️',
};

// Componente de nó customizado
const CustomNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as CustomNodeData;
  const colors = nodeColors[nodeData.nodeType];
  const icon = nodeIcons[nodeData.nodeType];
  const isDecision = nodeData.nodeType === 'decision';

  return (
    <div
      className={`
        relative px-4 py-3 rounded-lg shadow-lg border-2 transition-all duration-200
        ${selected ? 'ring-4 ring-blue-400 ring-opacity-50 scale-105' : ''}
        ${isDecision ? 'rotate-45' : ''}
      `}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        minWidth: isDecision ? '120px' : '160px',
        maxWidth: isDecision ? '120px' : '240px',
      }}
    >
      {/* Handles de entrada */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-300 border-2 border-gray-500"
        style={{ transform: isDecision ? 'rotate(-45deg)' : 'none' }}
      />
      
      {/* Conteúdo */}
      <div className={isDecision ? '-rotate-45' : ''}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{icon}</span>
          <span
            className="font-semibold text-sm leading-tight"
            style={{ color: colors.text }}
          >
            {nodeData.label}
          </span>
        </div>
        
        {nodeData.description && !isDecision && (
          <p
            className="text-xs opacity-90 mt-1"
            style={{ color: colors.text }}
          >
            {nodeData.description}
          </p>
        )}
      </div>

      {/* Handles de saída */}
      {isDecision ? (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id="yes"
            className="w-3 h-3 bg-green-400 border-2 border-green-600"
            style={{ transform: 'rotate(-45deg)' }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="no"
            className="w-3 h-3 bg-red-400 border-2 border-red-600"
            style={{ transform: 'rotate(-45deg)' }}
          />
        </>
      ) : (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-gray-300 border-2 border-gray-500"
        />
      )}
    </div>
  );
};

// Tipos de nós registrados
const nodeTypes = {
  custom: CustomNode,
};

interface FlowchartEngineProps {
  nodes: ProtocolNode[];
  edges: ProtocolEdge[];
  onNodeClick?: (node: ProtocolNode) => void;
  className?: string;
  showMiniMap?: boolean;
  showControls?: boolean;
  interactive?: boolean;
}

export default function FlowchartEngine({
  nodes: initialNodes,
  edges: initialEdges,
  onNodeClick,
  className = '',
  showMiniMap = true,
  showControls = true,
  interactive = true,
}: FlowchartEngineProps) {
  const [selectedNode, setSelectedNode] = useState<ProtocolNode | null>(null);

  // Preparar nós com tipo customizado
  const preparedNodes = useMemo(() => {
    return initialNodes.map((node) => ({
      ...node,
      type: 'custom',
    }));
  }, [initialNodes]);

  // Preparar edges com estilos
  const preparedEdges = useMemo(() => {
    return initialEdges.map((edge) => ({
      ...edge,
      style: { stroke: '#94a3b8', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
      labelStyle: { fill: '#64748b', fontWeight: 600, fontSize: 12 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
      labelBgPadding: [4, 2] as [number, number],
      labelBgBorderRadius: 4,
    }));
  }, [initialEdges]);

  const [nodes, , onNodesChange] = useNodesState(preparedNodes);
  const [edges, , onEdgesChange] = useEdgesState(preparedEdges);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const protocolNode = node as ProtocolNode;
      setSelectedNode(protocolNode);
      onNodeClick?.(protocolNode);
    },
    [onNodeClick]
  );

  return (
    <div className={`w-full h-full ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={interactive ? onNodesChange : undefined}
        onEdgesChange={interactive ? onEdgesChange : undefined}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        nodesDraggable={interactive}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnScroll={true}
        zoomOnScroll={true}
        className="bg-slate-50 dark:bg-slate-900 rounded-lg"
      >
        <Background color="#94a3b8" gap={20} size={1} />
        {showControls && (
          <Controls
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
            showZoom={true}
            showFitView={true}
            showInteractive={false}
          />
        )}
        {showMiniMap && (
          <MiniMap
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
            nodeColor={(node) => {
              const data = node.data as CustomNodeData;
              return nodeColors[data.nodeType]?.bg || '#64748b';
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        )}
      </ReactFlow>

      {/* Painel de detalhes do nó selecionado */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{nodeIcons[selectedNode.data.nodeType]}</span>
              <h3 className="font-bold text-slate-900 dark:text-white">
                {selectedNode.data.label}
              </h3>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              ✕
            </button>
          </div>

          {selectedNode.data.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              {selectedNode.data.description}
            </p>
          )}

          {selectedNode.data.details && selectedNode.data.details.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                Detalhes
              </h4>
              <ul className="text-sm space-y-1">
                {selectedNode.data.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <span className="text-blue-500">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedNode.data.medications && selectedNode.data.medications.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                💊 Medicamentos
              </h4>
              <div className="flex flex-wrap gap-1">
                {selectedNode.data.medications.map((med, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 text-xs rounded-full"
                  >
                    {med}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedNode.data.exams && selectedNode.data.exams.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                🔬 Exames
              </h4>
              <div className="flex flex-wrap gap-1">
                {selectedNode.data.exams.map((exam, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedNode.data.ciap2 && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <span className="font-medium">CIAP-2:</span>
              <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                {selectedNode.data.ciap2}
              </span>
              {selectedNode.data.cid10 && (
                <>
                  <span className="font-medium ml-2">CID-10:</span>
                  <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                    {selectedNode.data.cid10}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

