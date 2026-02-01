'use client';

import React, { useCallback, useState, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
  Node,
  Edge,
  NodeProps,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CustomNodeData, ProtocolNode, ProtocolEdge, NodeType } from '@/lib/types/protocolo';
import { cn } from '@/lib/utils';
import { Shield, AlertTriangle, Pill, Stethoscope, Activity, FileText, ChevronRight, ChevronLeft, CheckCircle, RotateCcw, Play, ArrowRight } from 'lucide-react';

// Clinical-Grade Node Configuration
// Larger, high-contrast nodes for emergency use
const nodeStyles: Record<NodeType, {
  bg: string;
  border: string;
  icon: any;
  iconBg: string;
  label: string;
}> = {
  start: {
    bg: 'bg-teal-50 dark:bg-teal-950',
    border: 'border-teal-500',
    icon: Activity,
    iconBg: 'bg-teal-500 text-white',
    label: 'INÍCIO',
  },
  end: {
    bg: 'bg-neutral-100 dark:bg-neutral-800',
    border: 'border-neutral-400',
    icon: CheckCircle,
    iconBg: 'bg-neutral-500 text-white',
    label: 'FIM',
  },
  decision: {
    bg: 'bg-amber-50 dark:bg-amber-950',
    border: 'border-amber-500',
    icon: Shield,
    iconBg: 'bg-amber-500 text-white',
    label: 'DECISÃO',
  },
  action: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    border: 'border-blue-500',
    icon: Activity,
    iconBg: 'bg-blue-500 text-white',
    label: 'AÇÃO',
  },
  assessment: {
    bg: 'bg-purple-50 dark:bg-purple-950',
    border: 'border-purple-500',
    icon: Stethoscope,
    iconBg: 'bg-purple-500 text-white',
    label: 'AVALIAÇÃO',
  },
  treatment: {
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    border: 'border-emerald-500',
    icon: Pill,
    iconBg: 'bg-emerald-500 text-white',
    label: 'TRATAMENTO',
  },
  referral: {
    bg: 'bg-indigo-50 dark:bg-indigo-950',
    border: 'border-indigo-500',
    icon: FileText,
    iconBg: 'bg-indigo-500 text-white',
    label: 'ENCAMINHAMENTO',
  },
  alert: {
    bg: 'bg-red-100 dark:bg-red-950',
    border: 'border-red-600',
    icon: AlertTriangle,
    iconBg: 'bg-red-600 text-white',
    label: 'ALERTA',
  },
  info: {
    bg: 'bg-neutral-50 dark:bg-neutral-900',
    border: 'border-neutral-300',
    icon: FileText,
    iconBg: 'bg-neutral-400 text-white',
    label: 'INFO',
  },
};

// Extended node data with interactive state
interface ExtendedNodeData extends CustomNodeData {
  isActive?: boolean;
  isCompleted?: boolean;
}

// Clinical-Grade Custom Node Component
// Minimum 16px text, high contrast, large touch targets
const CustomNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as ExtendedNodeData;
  const style = nodeStyles[nodeData.nodeType] || nodeStyles.info;
  const Icon = style.icon;

  // Decision nodes get diamond shape effect
  const isDecision = nodeData.nodeType === 'decision';
  const isAlert = nodeData.nodeType === 'alert';
  const isActive = nodeData.isActive;
  const isCompleted = nodeData.isCompleted;

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 transition-all duration-300",
        // Base styling
        style.bg,
        style.border,
        // Active state - strong highlight
        isActive && "ring-4 ring-teal-500 shadow-2xl scale-105 z-50 border-teal-500",
        // Completed state
        isCompleted && "opacity-60 border-emerald-400",
        // Selected state
        selected && !isActive && "ring-2 ring-neutral-300",
        // Alert animation
        isAlert && isActive && "animate-pulse",
      )}
      style={{
        minWidth: '280px',
        maxWidth: '340px',
        padding: '20px',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-4 !h-4 !bg-neutral-400 !border-2 !border-white"
      />

      {/* Completed checkmark */}
      {isCompleted && (
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -top-3 -left-3 px-3 py-1 rounded-full bg-teal-500 text-white text-xs font-bold shadow-lg">
          ETAPA ATUAL
        </div>
      )}

      {/* Header with icon and type */}
      <div className="flex items-center gap-3 mb-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
          style.iconBg,
          isActive && "ring-2 ring-white shadow-lg"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={cn(
          "text-sm font-bold uppercase tracking-wider",
          isAlert ? "text-red-700 dark:text-red-300" : "text-neutral-500 dark:text-neutral-400"
        )}>
          {style.label}
        </span>
      </div>

      {/* Main label - Large, readable */}
      <h3 className={cn(
        "text-lg font-bold leading-snug mb-2",
        isActive ? "text-teal-900 dark:text-teal-100" : "text-neutral-900 dark:text-white"
      )}>
        {nodeData.label}
      </h3>

      {/* Description - Minimum 16px */}
      {nodeData.description && (
        <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {nodeData.description}
        </p>
      )}

      {/* Decision indicator */}
      {isDecision && (
        <div className="mt-4 flex gap-2">
          <div className="flex-1 py-2 px-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-center border-2 border-transparent hover:border-emerald-400 cursor-pointer transition-colors">
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">SIM</span>
          </div>
          <div className="flex-1 py-2 px-3 bg-red-100 dark:bg-red-900/50 rounded-lg text-center border-2 border-transparent hover:border-red-400 cursor-pointer transition-colors">
            <span className="text-sm font-bold text-red-700 dark:text-red-300">NÃO</span>
          </div>
        </div>
      )}

      {/* Alert action */}
      {isAlert && (
        <div className="mt-3 py-2 px-3 bg-red-600 rounded-lg text-center">
          <span className="text-sm font-bold text-white">AÇÃO IMEDIATA</span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-4 !h-4 !bg-neutral-400 !border-2 !border-white"
      />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

interface FlowchartEngineProps {
  nodes: ProtocolNode[];
  edges: ProtocolEdge[];
  onNodeClick?: (node: ProtocolNode) => void;
  className?: string;
  interactive?: boolean; // Enable step-by-step mode
}

// Inner component that uses ReactFlow hooks
function FlowchartEngineInner({
  nodes: initialNodes,
  edges: initialEdges,
  onNodeClick,
  className = '',
  interactive = true,
}: FlowchartEngineProps) {
  const [selectedNode, setSelectedNode] = useState<ProtocolNode | null>(null);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [stepHistory, setStepHistory] = useState<string[]>([]);

  const { fitView, setCenter } = useReactFlow();

  // Find start node
  const startNode = useMemo(() =>
    initialNodes.find(n => n.data.nodeType === 'start') || initialNodes[0],
    [initialNodes]
  );

  // Initialize to start node
  useEffect(() => {
    if (interactive && startNode && !activeStepId) {
      setActiveStepId(startNode.id);
    }
  }, [interactive, startNode, activeStepId]);

  // Center view on active node when it changes
  useEffect(() => {
    if (activeStepId && interactive) {
      const activeNodeData = initialNodes.find(n => n.id === activeStepId);
      if (activeNodeData?.position) {
        // Small delay to allow React to process the state update
        setTimeout(() => {
          setCenter(
            activeNodeData.position.x + 150, // Center on node (half width)
            activeNodeData.position.y + 75,  // Center on node (half height)
            { zoom: 0.85, duration: 500 }
          );
        }, 100);
      }
    }
  }, [activeStepId, interactive, initialNodes, setCenter]);

  // Get next possible nodes from current
  const getNextNodes = useCallback((nodeId: string) => {
    const outgoingEdges = initialEdges.filter(e => e.source === nodeId);
    return outgoingEdges.map(edge => ({
      edge,
      node: initialNodes.find(n => n.id === edge.target),
    })).filter(item => item.node);
  }, [initialEdges, initialNodes]);

  // Get current active node
  const activeNode = useMemo(() =>
    initialNodes.find(n => n.id === activeStepId),
    [initialNodes, activeStepId]
  );

  // Navigate to next step
  const goToStep = useCallback((nodeId: string) => {
    if (activeStepId) {
      setCompletedSteps(prev => new Set([...prev, activeStepId]));
      setStepHistory(prev => [...prev, activeStepId]);
    }
    setActiveStepId(nodeId);
  }, [activeStepId]);

  // Go back to previous step
  const goBack = useCallback(() => {
    if (stepHistory.length > 0) {
      const prevStep = stepHistory[stepHistory.length - 1];
      setStepHistory(prev => prev.slice(0, -1));
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        newSet.delete(activeStepId || '');
        return newSet;
      });
      setActiveStepId(prevStep);
    }
  }, [stepHistory, activeStepId]);

  // Reset to beginning
  const reset = useCallback(() => {
    setActiveStepId(startNode?.id || null);
    setCompletedSteps(new Set());
    setStepHistory([]);
    // Fit view after reset
    setTimeout(() => fitView({ padding: 0.2, duration: 500 }), 100);
  }, [startNode, fitView]);

  // Handle node click for navigation
  const handleNodeClick = useCallback((node: ProtocolNode) => {
    setSelectedNode(node);
    onNodeClick?.(node);

    // If interactive and clicking on a connected node, navigate to it
    if (interactive && activeStepId) {
      const nextNodes = getNextNodes(activeStepId);
      const isNextNode = nextNodes.some(n => n.node?.id === node.id);
      if (isNextNode) {
        goToStep(node.id);
      }
    }
  }, [interactive, activeStepId, getNextNodes, goToStep, onNodeClick]);

  const preparedNodes = useMemo(() => initialNodes.map(n => ({
    ...n,
    type: 'custom',
    data: {
      ...n.data,
      isActive: interactive && n.id === activeStepId,
      isCompleted: completedSteps.has(n.id),
    },
  })), [initialNodes, interactive, activeStepId, completedSteps]);

  const preparedEdges = useMemo(() => initialEdges.map(e => ({
    ...e,
    style: {
      stroke: completedSteps.has(e.source) ? '#10B981' : '#D1D5DB',
      strokeWidth: completedSteps.has(e.source) ? 3 : 2,
    },
    animated: e.source === activeStepId,
    markerEnd: { type: MarkerType.ArrowClosed, color: completedSteps.has(e.source) ? '#10B981' : '#D1D5DB' },
    labelStyle: { fill: '#6B7280', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
    labelBgPadding: [6, 4] as [number, number],
  })), [initialEdges, activeStepId, completedSteps]);

  const [nodes, , onNodesChange] = useNodesState(preparedNodes);
  const [edges, , onEdgesChange] = useEdgesState(preparedEdges);

  // Get next options for the active node
  const nextOptions = useMemo(() =>
    activeStepId ? getNextNodes(activeStepId) : [],
    [activeStepId, getNextNodes]
  );

  return (
    <div className={cn("w-full h-full bg-paper-white dark:bg-carbon-950", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => handleNodeClick(node as ProtocolNode)}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={true}
        nodesConnectable={false}
        panOnScroll={true}
        zoomOnScroll={true}
      >
        <Background color="#E5E5E2" gap={30} size={1} />
        <Controls className="bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded shadow-elevation-1" />
        <MiniMap 
          className="bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded shadow-elevation-1"
          nodeColor="#0D2137"
          maskColor="rgba(251, 251, 249, 0.6)"
        />
      </ReactFlow>

      {/* Interactive Step Navigation Panel */}
      {interactive && activeNode && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-t-2 border-teal-500 shadow-2xl z-40">
          {/* Progress Bar */}
          <div className="h-1 bg-neutral-200 dark:bg-neutral-700">
            <div
              className="h-full bg-teal-500 transition-all duration-500"
              style={{
                width: `${((completedSteps.size + 1) / initialNodes.length) * 100}%`
              }}
            />
          </div>

          <div className="px-6 py-5">
            <div className="flex items-center justify-between gap-6">
              {/* Left: Back Button & History */}
              <div className="flex items-center gap-3">
                <button
                  onClick={goBack}
                  disabled={stepHistory.length === 0}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all",
                    stepHistory.length > 0
                      ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                      : "bg-neutral-50 dark:bg-neutral-900 text-neutral-300 dark:text-neutral-600 cursor-not-allowed"
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Voltar</span>
                </button>

                {stepHistory.length > 0 && (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {stepHistory.length} etapa{stepHistory.length !== 1 ? 's' : ''} anterior{stepHistory.length !== 1 ? 'es' : ''}
                  </span>
                )}
              </div>

              {/* Center: Current Step Info */}
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300">
                    {nodeStyles[activeNode.data.nodeType]?.label || 'ETAPA'}
                  </span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Etapa {completedSteps.size + 1} de {initialNodes.length}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white truncate max-w-md mx-auto">
                  {activeNode.data.label}
                </h3>
              </div>

              {/* Right: Next Options */}
              <div className="flex items-center gap-3">
                {/* Reset button */}
                <button
                  onClick={reset}
                  className="p-2.5 rounded-xl text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Reiniciar protocolo"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                {/* Next options */}
                {nextOptions.length === 0 ? (
                  // End node - show completion
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-xl font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Protocolo Concluído</span>
                  </div>
                ) : nextOptions.length === 1 ? (
                  // Single next option
                  <button
                    onClick={() => goToStep(nextOptions[0].node!.id)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                  >
                    <span>Próximo</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  // Multiple options (decision node)
                  <div className="flex items-center gap-2">
                    {nextOptions.map(({ edge, node }) => {
                      const label = edge.label || node?.data.label || 'Opção';
                      const isYes = typeof label === 'string' && (label.toLowerCase().includes('sim') || label.toLowerCase() === 'yes' || label === 'S');
                      const isNo = typeof label === 'string' && (label.toLowerCase().includes('não') || label.toLowerCase() === 'no' || label === 'N');

                      return (
                        <button
                          key={node!.id}
                          onClick={() => goToStep(node!.id)}
                          className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl",
                            isYes
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : isNo
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                          )}
                        >
                          <span>{typeof label === 'string' ? label : 'Opção'}</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Decision Context - Shows when on a decision node */}
            {activeNode.data.nodeType === 'decision' && activeNode.data.description && (
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider mb-1">
                      Pergunta Clínica
                    </h4>
                    <p className="text-base text-amber-900 dark:text-amber-100">
                      {activeNode.data.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Alert Context - Shows when on an alert node */}
            {activeNode.data.nodeType === 'alert' && (
              <div className="mt-4 p-4 bg-red-600 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-white shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                      Atenção Imediata Necessária
                    </h4>
                    <p className="text-base text-white/90">
                      {activeNode.data.description || 'Esta etapa requer ação imediata. Verifique os detalhes clínicos.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected Node Detail Panel - Clinical Grade */}
      {selectedNode && (
        <div className="absolute top-6 right-6 w-[400px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-2">
                  Etapa Selecionada
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
                  {selectedNode.data.label}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              {selectedNode.data.description || 'Sem descrição detalhada para esta etapa.'}
            </p>

            {/* Clinical Guidance */}
            {selectedNode.data.details && selectedNode.data.details.length > 0 && (
              <div className="mb-6 bg-teal-50 dark:bg-teal-950/40 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
                <h4 className="text-sm font-bold text-teal-800 dark:text-teal-200 uppercase tracking-wider mb-3">
                  Orientação Clínica
                </h4>
                <ul className="space-y-2">
                  {selectedNode.data.details.map((d, i) => (
                    <li key={i} className="flex gap-3 text-base text-neutral-800 dark:text-neutral-200">
                      <span className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Medications */}
            {selectedNode.data.medications && selectedNode.data.medications.length > 0 && (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Pill className="w-4 h-4" /> Medicamentos
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.data.medications.map(m => (
                    <span
                      key={m}
                      className="px-3 py-1.5 bg-white dark:bg-neutral-800 border border-emerald-200 dark:border-emerald-700 rounded-lg text-sm font-semibold text-emerald-800 dark:text-emerald-200"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-neutral-100 dark:bg-neutral-800 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center rounded-b-2xl">
            <span className="text-sm text-neutral-500">
              CIAP: {selectedNode.data.ciap2 || 'N/A'}
            </span>
            <button className="text-sm font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 hover:underline">
              Ver monografia completa <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrapper component with ReactFlowProvider
export default function FlowchartEngine(props: FlowchartEngineProps) {
  return (
    <ReactFlowProvider>
      <FlowchartEngineInner {...props} />
    </ReactFlowProvider>
  );
}