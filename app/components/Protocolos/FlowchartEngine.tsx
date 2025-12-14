'use client';

/**
 * FLOWCHART ENGINE - DARWIN-MFC
 * =============================
 * 
 * Motor de fluxogramas interativos para protocolos clínicos
 * Baseado em React Flow (@xyflow/react)
 */

import { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  NodeTypes,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { 
  ProtocoloInterativo, 
  FlowchartNode, 
  FlowchartEdge,
  FlowchartNavigationState,
  FlowchartResult,
  getNodeById,
  getOutgoingEdges,
  collectQuickActions,
  calculatePathSummary,
} from '@/lib/types/protocolo-interativo';
import { QuickAction } from '@/lib/types/cross-references';
import { 
  Play, 
  CircleHelp, 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  Pill, 
  ArrowRight,
  RotateCcw,
  Copy,
  Check,
  Info
} from 'lucide-react';

// =============================================================================
// CUSTOM NODES
// =============================================================================

interface CustomNodeProps {
  data: {
    label: string;
    sublabel?: string;
    details?: string;
    type: FlowchartNode['type'];
    isActive: boolean;
    isVisited: boolean;
    onClick?: () => void;
  };
}

function StartNode({ data }: CustomNodeProps) {
  return (
    <div 
      className={`px-6 py-4 rounded-full shadow-lg cursor-pointer transition-all
        ${data.isActive ? 'ring-4 ring-green-400 scale-105' : ''}
        ${data.isVisited ? 'bg-green-600' : 'bg-green-500'}
        hover:bg-green-600 hover:scale-102`}
      onClick={data.onClick}
    >
      <div className="flex items-center gap-2 text-white font-semibold">
        <Play className="w-5 h-5" />
        <span>{data.label}</span>
      </div>
    </div>
  );
}

function DecisionNode({ data }: CustomNodeProps) {
  return (
    <div 
      className={`p-4 rounded-xl shadow-lg cursor-pointer transition-all max-w-xs
        ${data.isActive ? 'ring-4 ring-blue-400 scale-105' : ''}
        ${data.isVisited ? 'bg-blue-700' : 'bg-blue-600'}
        hover:bg-blue-700`}
      onClick={data.onClick}
    >
      <div className="flex items-center gap-2 text-white">
        <CircleHelp className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">{data.label}</div>
          {data.sublabel && <div className="text-sm opacity-80">{data.sublabel}</div>}
        </div>
      </div>
      {data.details && (
        <div className="mt-2 text-xs text-blue-100 bg-blue-800/50 rounded p-2">
          {data.details}
        </div>
      )}
    </div>
  );
}

function ActionNode({ data }: CustomNodeProps) {
  return (
    <div 
      className={`p-4 rounded-lg shadow-md cursor-pointer transition-all max-w-sm border-2
        ${data.isActive ? 'ring-4 ring-slate-400 scale-105' : ''}
        ${data.isVisited ? 'bg-slate-100 dark:bg-slate-700 border-slate-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600'}
        hover:bg-slate-50 dark:hover:bg-slate-700`}
      onClick={data.onClick}
    >
      <div className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium">{data.label}</div>
          {data.sublabel && <div className="text-sm text-slate-500 dark:text-slate-400">{data.sublabel}</div>}
        </div>
      </div>
      {data.details && (
        <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 rounded p-2">
          {data.details}
        </div>
      )}
    </div>
  );
}

function WarningNode({ data }: CustomNodeProps) {
  return (
    <div 
      className={`p-4 rounded-lg shadow-lg cursor-pointer transition-all max-w-sm
        ${data.isActive ? 'ring-4 ring-amber-400 scale-105' : ''}
        ${data.isVisited ? 'bg-amber-200 dark:bg-amber-900' : 'bg-amber-100 dark:bg-amber-950'}
        border-2 border-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900`}
      onClick={data.onClick}
    >
      <div className="flex items-start gap-2 text-amber-800 dark:text-amber-200">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold">{data.label}</div>
          {data.sublabel && <div className="text-sm">{data.sublabel}</div>}
        </div>
      </div>
      {data.details && (
        <div className="mt-2 text-xs bg-amber-200/50 dark:bg-amber-800/50 rounded p-2">
          {data.details}
        </div>
      )}
    </div>
  );
}

function EndNode({ data }: CustomNodeProps) {
  return (
    <div 
      className={`px-6 py-4 rounded-full shadow-lg cursor-pointer transition-all
        ${data.isActive ? 'ring-4 ring-slate-400 scale-105' : ''}
        ${data.isVisited ? 'bg-slate-700' : 'bg-slate-600'}
        hover:bg-slate-700`}
      onClick={data.onClick}
    >
      <div className="flex items-center gap-2 text-white font-semibold">
        <CheckCircle2 className="w-5 h-5" />
        <span>{data.label}</span>
      </div>
    </div>
  );
}

function CalculateNode({ data }: CustomNodeProps) {
  return (
    <div 
      className={`p-4 rounded-lg shadow-md cursor-pointer transition-all max-w-xs
        ${data.isActive ? 'ring-4 ring-purple-400 scale-105' : ''}
        ${data.isVisited ? 'bg-purple-200 dark:bg-purple-900' : 'bg-purple-100 dark:bg-purple-950'}
        border-2 border-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900`}
      onClick={data.onClick}
    >
      <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
        <Calculator className="w-5 h-5" />
        <div>
          <div className="font-semibold">{data.label}</div>
          {data.sublabel && <div className="text-sm opacity-80">{data.sublabel}</div>}
        </div>
      </div>
    </div>
  );
}

function PrescribeNode({ data }: CustomNodeProps) {
  return (
    <div 
      className={`p-4 rounded-lg shadow-md cursor-pointer transition-all max-w-sm
        ${data.isActive ? 'ring-4 ring-emerald-400 scale-105' : ''}
        ${data.isVisited ? 'bg-emerald-200 dark:bg-emerald-900' : 'bg-emerald-100 dark:bg-emerald-950'}
        border-2 border-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900`}
      onClick={data.onClick}
    >
      <div className="flex items-start gap-2 text-emerald-800 dark:text-emerald-200">
        <Pill className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold">{data.label}</div>
          {data.sublabel && <div className="text-sm opacity-80">{data.sublabel}</div>}
        </div>
      </div>
      {data.details && (
        <div className="mt-2 text-xs bg-emerald-200/50 dark:bg-emerald-800/50 rounded p-2 font-mono">
          {data.details}
        </div>
      )}
    </div>
  );
}

function ReferNode({ data }: CustomNodeProps) {
  return (
    <div 
      className={`p-4 rounded-lg shadow-md cursor-pointer transition-all max-w-xs
        ${data.isActive ? 'ring-4 ring-red-400 scale-105' : ''}
        ${data.isVisited ? 'bg-red-200 dark:bg-red-900' : 'bg-red-100 dark:bg-red-950'}
        border-2 border-red-400 hover:bg-red-200 dark:hover:bg-red-900`}
      onClick={data.onClick}
    >
      <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
        <ArrowRight className="w-5 h-5" />
        <div>
          <div className="font-semibold">{data.label}</div>
          {data.sublabel && <div className="text-sm opacity-80">{data.sublabel}</div>}
        </div>
      </div>
    </div>
  );
}

function InfoNode({ data }: CustomNodeProps) {
  return (
    <div 
      className={`p-4 rounded-lg shadow-md cursor-pointer transition-all max-w-sm
        ${data.isActive ? 'ring-4 ring-sky-400 scale-105' : ''}
        ${data.isVisited ? 'bg-sky-200 dark:bg-sky-900' : 'bg-sky-100 dark:bg-sky-950'}
        border-2 border-sky-300 hover:bg-sky-200 dark:hover:bg-sky-900`}
      onClick={data.onClick}
    >
      <div className="flex items-start gap-2 text-sky-800 dark:text-sky-200">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium">{data.label}</div>
          {data.details && <div className="text-sm mt-1 opacity-80">{data.details}</div>}
        </div>
      </div>
    </div>
  );
}

const nodeTypes: NodeTypes = {
  start: StartNode,
  decision: DecisionNode,
  action: ActionNode,
  warning: WarningNode,
  end: EndNode,
  calculate: CalculateNode,
  prescribe: PrescribeNode,
  refer: ReferNode,
  info: InfoNode,
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

interface FlowchartEngineProps {
  protocolo: ProtocoloInterativo;
  onComplete?: (result: FlowchartResult) => void;
  showMinimap?: boolean;
  showControls?: boolean;
}

export default function FlowchartEngine({ 
  protocolo, 
  onComplete,
  showMinimap = true,
  showControls = true,
}: FlowchartEngineProps) {
  // Navigation state
  const [currentNodeId, setCurrentNodeId] = useState<string>(protocolo.entryNodeId);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([protocolo.entryNodeId]);
  const [pathTaken, setPathTaken] = useState<FlowchartEdge[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  // Convert protocol nodes to React Flow nodes
  const initialNodes: Node[] = useMemo(() => {
    return protocolo.nodes.map(node => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: {
        label: node.label,
        sublabel: node.sublabel,
        details: node.details,
        type: node.type,
        isActive: node.id === currentNodeId,
        isVisited: visitedNodes.includes(node.id),
      },
    }));
  }, [protocolo.nodes, currentNodeId, visitedNodes]);

  // Convert protocol edges to React Flow edges
  const initialEdges: Edge[] = useMemo(() => {
    return protocolo.edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: edge.animated || pathTaken.some(e => e.id === edge.id),
      style: {
        stroke: pathTaken.some(e => e.id === edge.id) ? '#22c55e' : '#94a3b8',
        strokeWidth: pathTaken.some(e => e.id === edge.id) ? 3 : 2,
      },
      labelStyle: {
        fill: '#64748b',
        fontWeight: 600,
      },
      labelBgStyle: {
        fill: '#f8fafc',
        fillOpacity: 0.9,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: pathTaken.some(e => e.id === edge.id) ? '#22c55e' : '#94a3b8',
      },
    }));
  }, [protocolo.edges, pathTaken]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when state changes
  useMemo(() => {
    setNodes(prev => prev.map(node => ({
      ...node,
      data: {
        ...node.data,
        isActive: node.id === currentNodeId,
        isVisited: visitedNodes.includes(node.id),
      },
    })));
  }, [currentNodeId, visitedNodes, setNodes]);

  // Update edges when path changes
  useMemo(() => {
    setEdges(prev => prev.map(edge => ({
      ...edge,
      animated: pathTaken.some(e => e.id === edge.id),
      style: {
        stroke: pathTaken.some(e => e.id === edge.id) ? '#22c55e' : '#94a3b8',
        strokeWidth: pathTaken.some(e => e.id === edge.id) ? 3 : 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: pathTaken.some(e => e.id === edge.id) ? '#22c55e' : '#94a3b8',
      },
    })));
  }, [pathTaken, setEdges]);

  // Handle node click
  const handleNodeClick = useCallback((nodeId: string) => {
    const outgoingEdges = getOutgoingEdges(protocolo, nodeId);
    
    // If terminal node, complete the flow
    if (outgoingEdges.length === 0) {
      setIsComplete(true);
      if (onComplete) {
        const result: FlowchartResult = {
          protocoloId: protocolo.id,
          protocoloTitulo: protocolo.titulo,
          conclusionNodeId: nodeId,
          conclusionLabel: getNodeById(protocolo, nodeId)?.label || '',
          pathSummary: calculatePathSummary(protocolo, visitedNodes),
          quickActionsCollected: collectQuickActions(protocolo, visitedNodes),
          totalTime: 0,
        };
        onComplete(result);
      }
    }
  }, [protocolo, visitedNodes, onComplete]);

  // Navigate to next node
  const navigateTo = useCallback((edgeId: string) => {
    const edge = protocolo.edges.find(e => e.id === edgeId);
    if (!edge) return;

    setVisitedNodes(prev => [...prev, edge.target]);
    setPathTaken(prev => [...prev, edge]);
    setCurrentNodeId(edge.target);
    handleNodeClick(edge.target);
  }, [protocolo.edges, handleNodeClick]);

  // Reset flow
  const resetFlow = useCallback(() => {
    setCurrentNodeId(protocolo.entryNodeId);
    setVisitedNodes([protocolo.entryNodeId]);
    setPathTaken([]);
    setIsComplete(false);
  }, [protocolo.entryNodeId]);

  // Get current options
  const currentOptions = useMemo(() => {
    return getOutgoingEdges(protocolo, currentNodeId);
  }, [protocolo, currentNodeId]);

  // Generate export text
  const exportText = useMemo(() => {
    const pathSummary = calculatePathSummary(protocolo, visitedNodes);
    const quickActions = collectQuickActions(protocolo, visitedNodes);
    
    let text = `📋 ${protocolo.titulo}\n`;
    text += `${'='.repeat(40)}\n\n`;
    text += `Caminho percorrido:\n`;
    pathSummary.forEach((step, i) => {
      text += `${i + 1}. ${step}\n`;
    });
    
    if (quickActions.length > 0) {
      text += `\nAções sugeridas:\n`;
      quickActions.forEach(action => {
        text += `- ${action.titulo}: ${action.conteudo}\n`;
      });
    }
    
    return text;
  }, [protocolo, visitedNodes]);

  // Copy to clipboard
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [exportText]);

  return (
    <div className="h-[600px] w-full flex flex-col bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{protocolo.titulo}</h3>
          {protocolo.subtitulo && (
            <p className="text-sm text-slate-500 dark:text-slate-400">{protocolo.subtitulo}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFlow}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Flow */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          defaultViewport={protocolo.defaultViewport || { x: 0, y: 0, zoom: 1 }}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnScroll
          zoomOnScroll
        >
          {showControls && <Controls />}
          {showMinimap && (
            <MiniMap 
              nodeColor={(node) => {
                if (node.id === currentNodeId) return '#22c55e';
                if (visitedNodes.includes(node.id)) return '#60a5fa';
                return '#94a3b8';
              }}
              className="bg-white dark:bg-slate-800"
            />
          )}
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </div>

      {/* Navigation Options */}
      {currentOptions.length > 0 && !isComplete && (
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            Selecione uma opção:
          </p>
          <div className="flex flex-wrap gap-2">
            {currentOptions.map(edge => (
              <button
                key={edge.id}
                onClick={() => navigateTo(edge.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all
                  ${edge.condition === 'sim' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800' : ''}
                  ${edge.condition === 'nao' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800' : ''}
                  ${!edge.condition || edge.condition === 'proximo' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800' : ''}
                `}
              >
                {edge.label || (edge.condition === 'sim' ? 'Sim' : edge.condition === 'nao' ? 'Não' : 'Continuar')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Completion */}
      {isComplete && (
        <div className="p-4 bg-green-50 dark:bg-green-950 border-t border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Protocolo concluído!</span>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            Clique em &quot;Copiar&quot; para exportar o resultado para o prontuário.
          </p>
        </div>
      )}
    </div>
  );
}

