'use client';

import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import {
  ReactFlow,
  Background,
  MiniMap,
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
import { Shield, AlertTriangle, Pill, Stethoscope, Activity, FileText, ChevronRight, ChevronLeft, CheckCircle, RotateCcw, ArrowRight, Search, Crosshair, Minus, Plus, Maximize2, Eye, EyeOff, ChevronsUpDown } from 'lucide-react';

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
    bg: 'bg-brand-primary-50 dark:bg-brand-primary-900/20',
    border: 'border-brand-primary-500',
    icon: Activity,
    iconBg: 'bg-brand-primary-600 text-white',
    label: 'INÍCIO',
  },
  end: {
    bg: 'bg-carbon-100 dark:bg-carbon-900',
    border: 'border-carbon-400',
    icon: CheckCircle,
    iconBg: 'bg-carbon-500 text-white',
    label: 'FIM',
  },
  decision: {
    bg: 'bg-thymine-gold/10 dark:bg-thymine-gold/15',
    border: 'border-thymine-gold',
    icon: Shield,
    iconBg: 'bg-thymine-gold text-white',
    label: 'DECISÃO',
  },
  action: {
    bg: 'bg-brand-secondary-50 dark:bg-brand-secondary-900/15',
    border: 'border-brand-secondary-500',
    icon: Activity,
    iconBg: 'bg-brand-secondary-500 text-white',
    label: 'AÇÃO',
  },
  assessment: {
    bg: 'bg-paper-white dark:bg-carbon-900',
    border: 'border-carbon-300 dark:border-carbon-700',
    icon: Stethoscope,
    iconBg: 'bg-helix-navy text-white',
    label: 'AVALIAÇÃO',
  },
  treatment: {
    bg: 'bg-guanine-green/10 dark:bg-guanine-green/15',
    border: 'border-guanine-green',
    icon: Pill,
    iconBg: 'bg-guanine-green text-white',
    label: 'TRATAMENTO',
  },
  referral: {
    bg: 'bg-helix-navy/5 dark:bg-helix-navy/10',
    border: 'border-helix-navy/25 dark:border-carbon-700',
    icon: FileText,
    iconBg: 'bg-helix-navy text-white',
    label: 'ENCAMINHAMENTO',
  },
  alert: {
    bg: 'bg-critical-red-100 dark:bg-critical-red-900/25',
    border: 'border-critical-red-600',
    icon: AlertTriangle,
    iconBg: 'bg-critical-red-600 text-white',
    label: 'ALERTA',
  },
  info: {
    bg: 'bg-paper-white dark:bg-carbon-900',
    border: 'border-carbon-300 dark:border-carbon-700',
    icon: FileText,
    iconBg: 'bg-carbon-400 text-white',
    label: 'INFO',
  },
};

// Extended node data with interactive state
interface ExtendedNodeData extends CustomNodeData {
  isActive?: boolean;
  isCompleted?: boolean;
  isNext?: boolean;
  isDisabled?: boolean;
  viewerOnly?: boolean;
}

// Clinical-Grade Custom Node Component
// Minimum 16px text, high contrast, large touch targets
const CustomNode = ({ data }: NodeProps) => {
  const nodeData = data as ExtendedNodeData;
  const style = nodeStyles[nodeData.nodeType] || nodeStyles.info;
  const Icon = style.icon;
  const isViewerOnly = Boolean(nodeData.viewerOnly);

  const isDecision = nodeData.nodeType === 'decision';
  const isAlert = nodeData.nodeType === 'alert';
  const isActive = nodeData.isActive;
  const isCompleted = nodeData.isCompleted;
  const isNext = nodeData.isNext;
  const isDisabled = nodeData.isDisabled;

  const opacityClass = isDisabled
    ? isCompleted
      ? 'opacity-35'
      : 'opacity-[0.18]'
    : isCompleted
      ? 'opacity-60'
      : 'opacity-100';

  return (
    <div
      className={cn(
        // Read-only viewer: nodes never drag; dragging anywhere pans the viewport (map-like).
        "relative rounded-2xl border-2 transition-all duration-300 darwin-nodrag",
        // Base styling
        style.bg,
        style.border,
        opacityClass,
        // Guided mode: disabled nodes should not feel interactive (and shouldn't intercept gestures).
        isDisabled && "pointer-events-none",
        // Active state - strong highlight
        isActive && "ring-4 ring-brand-primary-500 shadow-2xl scale-105 z-50 border-brand-primary-500",
        // Next option (guided mode): obvious click target
        isNext && !isActive && "ring-2 ring-brand-primary-400 shadow-xl border-brand-primary-400",
        // Completed state
        isCompleted && "border-guanine-green",
        // Alert animation
        isAlert && isActive && "animate-pulse",
        // Cursor semantics
        (isNext || isActive) ? "cursor-pointer" : "cursor-default",
      )}
      style={{
        minWidth: '280px',
        maxWidth: '340px',
        padding: '20px',
      }}
    >
      {!isViewerOnly && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-4 !h-4 !bg-carbon-400 !border-2 !border-white !opacity-0 !pointer-events-none"
        />
      )}

      {/* Completed checkmark */}
      {isCompleted && (
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-guanine-green flex items-center justify-center shadow-lg">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -top-3 -left-3 px-3 py-1 rounded-full bg-brand-primary-600 text-white text-xs font-bold shadow-lg">
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
          isAlert ? "text-critical-red-700 dark:text-critical-red-300" : "text-carbon-500 dark:text-carbon-400"
        )}>
          {style.label}
        </span>
      </div>

      {/* Main label - Large, readable */}
      <h3 className={cn(
        "text-lg font-bold leading-snug mb-2",
        isActive ? "text-brand-primary-700 dark:text-brand-primary-200" : "text-carbon-900 dark:text-white"
      )}>
        {nodeData.label}
      </h3>

      {/* Description - Minimum 16px */}
      {nodeData.description && (
        <p className="text-base text-carbon-700 dark:text-carbon-300 leading-relaxed">
          {nodeData.description}
        </p>
      )}

      {/* Alert action */}
      {isAlert && (
        <div className="mt-3 py-2 px-3 bg-critical-red-600 rounded-lg text-center">
          <span className="text-sm font-bold text-white">AÇÃO IMEDIATA</span>
        </div>
      )}

      {!isViewerOnly && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-4 !h-4 !bg-carbon-400 !border-2 !border-white !opacity-0 !pointer-events-none"
        />
      )}
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
  viewerOnly?: boolean; // Secondary-surface map: no node selection/details UI
}

// Inner component that uses ReactFlow hooks
function FlowchartEngineInner({
  nodes: initialNodes,
  edges: initialEdges,
  onNodeClick,
  className = '',
  interactive = false,
  viewerOnly = false,
}: FlowchartEngineProps) {
  const hudRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<ProtocolNode | null>(null);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [stepHistory, setStepHistory] = useState<string[]>([]);

  const [followActiveStep, setFollowActiveStep] = useState(true);
  const [stepperOpen, setStepperOpen] = useState(true);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [isProgrammaticMove, setIsProgrammaticMove] = useState(false);

  const { fitView, setCenter, zoomIn, zoomOut, getZoom } = useReactFlow();

  // When in guided mode, keep the experience locked-in (no free search teleporting).
  useEffect(() => {
    if (!interactive) return;
    setSearch('');
    setSearchOpen(false);
    setSelectedNode(null);
    setShowMiniMap(false);
  }, [interactive]);

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
    if (activeStepId && interactive && followActiveStep) {
      const activeNodeData = initialNodes.find(n => n.id === activeStepId);
      if (activeNodeData?.position) {
        // Small delay to allow React to process the state update
        setTimeout(() => {
          const currentZoom = getZoom();
          setIsProgrammaticMove(true);
          setCenter(
            activeNodeData.position.x + 150, // Center on node (half width)
            activeNodeData.position.y + 75,  // Center on node (half height)
            { zoom: Math.min(Math.max(currentZoom, 0.55), 1.1), duration: 450 }
          );
          setTimeout(() => setIsProgrammaticMove(false), 500);
        }, 100);
      }
    }
  }, [activeStepId, interactive, followActiveStep, initialNodes, setCenter, getZoom]);

  // First render: fit view nicely (without requiring the user to find the content)
  useEffect(() => {
    const t = setTimeout(() => {
      setIsProgrammaticMove(true);
      fitView({ padding: 0.18, duration: 550 });
      setTimeout(() => setIsProgrammaticMove(false), 650);
    }, 50);
    return () => clearTimeout(t);
  }, [fitView]);

  // Get next possible nodes from current
  const getNextNodes = useCallback((nodeId: string) => {
    const outgoingEdges = initialEdges.filter(e => e.source === nodeId);
    return outgoingEdges.map(edge => ({
      edge,
      node: initialNodes.find(n => n.id === edge.target),
    })).filter(item => item.node);
  }, [initialEdges, initialNodes]);

  const nextNodeIds = useMemo(() => {
    if (!interactive) return new Set<string>();
    if (!activeStepId) return new Set<string>();
    return new Set(getNextNodes(activeStepId).map((n) => n.node!.id));
  }, [interactive, activeStepId, getNextNodes]);

  const pathNodeIds = useMemo(() => {
    const ids = [...stepHistory];
    if (activeStepId) ids.push(activeStepId);
    return ids;
  }, [stepHistory, activeStepId]);

  const takenEdgeKeys = useMemo(() => {
    const keys = new Set<string>();
    for (let i = 0; i < pathNodeIds.length - 1; i++) {
      keys.add(`${pathNodeIds[i]}->${pathNodeIds[i + 1]}`);
    }
    return keys;
  }, [pathNodeIds]);

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

  const jumpToStep = useCallback((nodeId: string) => {
    const idx = stepHistory.indexOf(nodeId);
    if (idx === -1) return;
    const newHistory = stepHistory.slice(0, idx);
    setStepHistory(newHistory);
    setCompletedSteps(new Set(newHistory));
    setActiveStepId(nodeId);
  }, [stepHistory]);

  // Handle node click for navigation
  const handleNodeClick = useCallback((node: ProtocolNode) => {
    if (interactive) {
      const isAllowed = node.id === activeStepId || nextNodeIds.has(node.id);
      if (!isAllowed) return;
    }

    // If interactive and clicking on a connected node, navigate to it
    if (interactive && activeStepId) {
      const nextNodes = getNextNodes(activeStepId);
      const isNextNode = nextNodes.some(n => n.node?.id === node.id);
      if (isNextNode) {
        goToStep(node.id);
        return; // guided: don't open floating details while progressing
      }
    }

    // Explore mode: allow selecting nodes for detail panel.
    if (!interactive && viewerOnly) return;
    setSelectedNode(node);
    onNodeClick?.(node);
  }, [interactive, viewerOnly, activeStepId, nextNodeIds, getNextNodes, goToStep, onNodeClick]);

  const searchableNodes = useMemo(() => {
    return initialNodes
      .map((n) => ({
        id: n.id,
        label: String(n.data.label || '').trim(),
        type: n.data.nodeType,
        position: n.position,
        node: n,
      }))
      .filter((n) => n.label.length > 0);
  }, [initialNodes]);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return searchableNodes
      .filter((n) => n.label.toLowerCase().includes(q))
      .slice(0, 8);
  }, [search, searchableNodes]);

  const focusNode = useCallback((nodeId: string) => {
    const n = initialNodes.find((x) => x.id === nodeId);
    if (!n?.position) return;
    if (!viewerOnly) setSelectedNode(n);
    setSearchOpen(false);
    setSearch('');
    setIsProgrammaticMove(true);
    setCenter(n.position.x + 150, n.position.y + 75, { zoom: Math.min(Math.max(getZoom(), 0.65), 1.25), duration: 450 });
    setTimeout(() => setIsProgrammaticMove(false), 520);
  }, [viewerOnly, initialNodes, setCenter, getZoom]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Cmd/Ctrl+K: focus search (native-feeling command palette gesture).
      if (!interactive && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 0);
        return;
      }
      // Escape: close search + close node details.
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSelectedNode(null);
      }
    }

    function onPointerDown(e: MouseEvent) {
      const el = hudRef.current;
      if (!el) return;
      if (!searchOpen) return;
      const target = e.target as Node | null;
      if (target && el.contains(target as any)) return;
      setSearchOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onPointerDown);
    };
  }, [searchOpen]);

  const preparedNodes = useMemo(() => initialNodes.map(n => ({
    ...n,
    type: 'custom',
    data: {
      ...n.data,
      isActive: interactive && n.id === activeStepId,
      isCompleted: completedSteps.has(n.id),
      isNext: interactive && activeStepId ? nextNodeIds.has(n.id) : false,
      isDisabled: interactive ? !(n.id === activeStepId || nextNodeIds.has(n.id)) : false,
      viewerOnly,
    },
  })), [initialNodes, interactive, activeStepId, completedSteps, nextNodeIds, viewerOnly]);

  const preparedEdges = useMemo(() => initialEdges.map(e => ({
    ...e,
    label: (() => {
      if (!interactive) return e.label;
      const isActiveOption = e.source === activeStepId && nextNodeIds.has(e.target);
      const isTaken = takenEdgeKeys.has(`${e.source}->${e.target}`);
      return (isActiveOption || isTaken) ? e.label : undefined;
    })(),
    style: (() => {
      if (!interactive) {
        const isCompleted = completedSteps.has(e.source);
        return {
          stroke: isCompleted ? '#10B981' : '#D1D5DB',
          strokeWidth: isCompleted ? 3 : 2,
        };
      }

      const key = `${e.source}->${e.target}`;
      const isTaken = takenEdgeKeys.has(key);
      const isActiveOption = e.source === activeStepId && nextNodeIds.has(e.target);

      if (isTaken) return { stroke: '#10B981', strokeWidth: 3.5 };
      if (isActiveOption) return { stroke: '#14B8A6', strokeWidth: 3.25 };
      return { stroke: '#E5E7EB', strokeWidth: 1.5 };
    })(),
    animated: interactive
      ? (e.source === activeStepId && nextNodeIds.has(e.target))
      : e.source === activeStepId,
    markerEnd: (() => {
      if (!interactive) {
        const isCompleted = completedSteps.has(e.source);
        return { type: MarkerType.ArrowClosed, color: isCompleted ? '#10B981' : '#D1D5DB' };
      }
      const key = `${e.source}->${e.target}`;
      const isTaken = takenEdgeKeys.has(key);
      const isActiveOption = e.source === activeStepId && nextNodeIds.has(e.target);
      if (isTaken) return { type: MarkerType.ArrowClosed, color: '#10B981' };
      if (isActiveOption) return { type: MarkerType.ArrowClosed, color: '#14B8A6' };
      return { type: MarkerType.ArrowClosed, color: '#E5E7EB' };
    })(),
    labelStyle: { fill: '#6B7280', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
    labelBgPadding: [6, 4] as [number, number],
  })), [initialEdges, interactive, activeStepId, completedSteps, nextNodeIds, takenEdgeKeys]);

  const nodes = useMemo(() => preparedNodes, [preparedNodes]);
  const edges = useMemo(() => preparedEdges, [preparedEdges]);

  // Get next options for the active node
  const nextOptions = useMemo(() =>
    activeStepId ? getNextNodes(activeStepId) : [],
    [activeStepId, getNextNodes]
  );

  return (
    <div className={cn("relative w-full h-full bg-paper-white dark:bg-carbon-950", viewerOnly && "darwin-flowchart-map", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={(_, node) => handleNodeClick(node as ProtocolNode)}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        selectionOnDrag={false}
        noDragClassName="darwin-nodrag"
        nodesFocusable={false}
        edgesFocusable={false}
        panOnDrag={!interactive}
        minZoom={0.25}
        maxZoom={2.25}
        // Apple-native gestures:
        // - Explore: scroll pans; zoom only on pinch or Meta/Ctrl+scroll (via zoomActivationKeyCode default).
        // - Guided: lock viewport from pan; keep pinch zoom only.
        panOnScroll={!interactive}
        zoomOnScroll={false}
        zoomActivationKeyCode={interactive ? null : undefined}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        preventScrolling={true}
        onMoveStart={(event) => {
          if (!interactive) return;
          if (isProgrammaticMove) return;
          // In guided mode we keep follow as an explicit toggle (we don't auto-disable on incidental gestures).
        }}
      >
        <Background color="#E5E5E2" gap={30} size={1} />
        {showMiniMap && (
          <MiniMap
            className="bg-white/85 dark:bg-carbon-900/70 backdrop-blur border border-carbon-200 dark:border-carbon-800 rounded-xl shadow-elevation-2"
            nodeColor="#0D2137"
            maskColor="rgba(251, 251, 249, 0.55)"
          />
        )}
      </ReactFlow>

      {/* Apple-native navigation HUD */}
      <div ref={hudRef} className="absolute top-4 left-4 z-50 w-[360px] max-w-[calc(100%-2rem)]">
        <div className="rounded-2xl border border-carbon-200/70 dark:border-carbon-800/70 bg-paper-white/85 dark:bg-carbon-950/55 backdrop-blur-xl shadow-elevation-2 overflow-hidden">
          {!interactive ? (
            <div className="flex items-center gap-2 px-3 py-2">
              <Search className="w-4 h-4 text-carbon-500" />
              <input
                ref={searchInputRef}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Buscar etapa (ex: hipertensao, antibiotic...)"
                className="flex-1 bg-transparent text-sm text-carbon-900 dark:text-carbon-100 placeholder:text-carbon-500 outline-none"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="inline-flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-primary-100 dark:bg-brand-primary-900/30 text-brand-primary-700 dark:text-brand-primary-300">
                  Guiado
                </span>
                <span className="text-xs text-carbon-500 dark:text-carbon-400 truncate">
                  Foco na decisão clínica
                </span>
              </div>
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => setFollowActiveStep((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold border transition-colors",
                  followActiveStep
                    ? "bg-brand-primary-600 text-white border-brand-primary-600"
                    : "bg-transparent text-carbon-700 dark:text-carbon-200 border-carbon-200 dark:border-carbon-800 hover:bg-carbon-50 dark:hover:bg-carbon-900/40"
                )}
                title={followActiveStep ? "Seguindo etapa atual" : "Modo livre (nao segue)"}
              >
                {followActiveStep ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                Seguir
              </button>
            </div>
          )}

          {!interactive && searchOpen && searchResults.length > 0 && (
            <div className="border-t border-carbon-200/60 dark:border-carbon-800/60">
              {searchResults.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => focusNode(r.id)}
                  className="w-full text-left px-3 py-2 hover:bg-carbon-50 dark:hover:bg-carbon-900/40 transition-colors"
                >
                  <div className="text-sm font-semibold text-carbon-900 dark:text-carbon-100 line-clamp-1">
                    {r.label}
                  </div>
                  <div className="text-xs text-carbon-500">
                    {nodeStyles[r.type]?.label ?? r.type}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-carbon-200/60 dark:border-carbon-800/60 px-2 py-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => zoomOut({ duration: 160 })}
              className="p-2 rounded-xl border border-carbon-200 dark:border-carbon-800 hover:bg-carbon-50 dark:hover:bg-carbon-900/40 transition-colors"
              title="Zoom out"
            >
              <Minus className="w-4 h-4 text-carbon-700 dark:text-carbon-200" />
            </button>
            <button
              type="button"
              onClick={() => zoomIn({ duration: 160 })}
              className="p-2 rounded-xl border border-carbon-200 dark:border-carbon-800 hover:bg-carbon-50 dark:hover:bg-carbon-900/40 transition-colors"
              title="Zoom in"
            >
              <Plus className="w-4 h-4 text-carbon-700 dark:text-carbon-200" />
            </button>
            <button
              type="button"
              onClick={() => fitView({ padding: 0.18, duration: 380 })}
              className="p-2 rounded-xl border border-carbon-200 dark:border-carbon-800 hover:bg-carbon-50 dark:hover:bg-carbon-900/40 transition-colors"
              title="Enquadrar fluxograma"
            >
              <Maximize2 className="w-4 h-4 text-carbon-700 dark:text-carbon-200" />
            </button>
            {interactive && activeStepId && (
              <button
                type="button"
                onClick={() => {
                  const n = initialNodes.find((x) => x.id === activeStepId);
                  if (!n?.position) return;
                  setFollowActiveStep(true);
                  setIsProgrammaticMove(true);
                  setCenter(n.position.x + 150, n.position.y + 75, { duration: 380 });
                  setTimeout(() => setIsProgrammaticMove(false), 450);
                }}
                className="p-2 rounded-xl border border-carbon-200 dark:border-carbon-800 hover:bg-carbon-50 dark:hover:bg-carbon-900/40 transition-colors"
                title="Centralizar etapa atual"
              >
                <Crosshair className="w-4 h-4 text-carbon-700 dark:text-carbon-200" />
              </button>
            )}
            <div className="flex-1" />
            {!interactive && (
              <button
                type="button"
                onClick={() => setShowMiniMap((v) => !v)}
                className="p-2 rounded-xl border border-carbon-200 dark:border-carbon-800 hover:bg-carbon-50 dark:hover:bg-carbon-900/40 transition-colors"
                title={showMiniMap ? "Ocultar minimapa" : "Mostrar minimapa"}
              >
                <ChevronsUpDown className="w-4 h-4 text-carbon-700 dark:text-carbon-200" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-2 text-[11px] text-carbon-500 dark:text-carbon-400">
          {interactive
            ? "Guiado: pinch para zoom (sem arrastar). Use os botoes para zoom/enquadrar."
            : "Explorar: scroll para mover. Pinch para zoom. Mouse: segure Cmd/Ctrl e role para zoom."}
        </div>
      </div>

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

          <button
            type="button"
            onClick={() => setStepperOpen((v) => !v)}
            className="w-full px-6 py-2 flex items-center justify-between text-sm font-semibold text-neutral-700 dark:text-neutral-200"
            title={stepperOpen ? "Recolher painel" : "Expandir painel"}
          >
            <span className="inline-flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300">
                {nodeStyles[activeNode.data.nodeType]?.label || 'ETAPA'}
              </span>
              <span className="truncate">{activeNode.data.label}</span>
            </span>
            <ChevronsUpDown className="w-4 h-4 text-neutral-500" />
          </button>

          {stepperOpen && (
          <div className="px-6 pb-5">
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

            {/* Path chips (decision track) */}
            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
              {stepHistory.map((id) => {
                const n = initialNodes.find((x) => x.id === id);
                if (!n) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => jumpToStep(id)}
                    className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/40 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors"
                    title="Voltar para esta etapa"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      ✓
                    </span>
                    <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1 max-w-[220px]">
                      {String(n.data.label || '')}
                    </span>
                  </button>
                );
              })}
              <span className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  Agora
                </span>
                <span className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1 max-w-[220px]">
                  {String(activeNode.data.label || '')}
                </span>
              </span>
            </div>

            {/* Clinical context (always anchored here in guided mode) */}
            {(activeNode.data.description || (activeNode.data.details && activeNode.data.details.length > 0) || (activeNode.data.medications && activeNode.data.medications.length > 0)) && (
              <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-900/40 rounded-xl border border-neutral-200 dark:border-neutral-800">
                {activeNode.data.description && activeNode.data.nodeType !== 'decision' && activeNode.data.nodeType !== 'alert' && (
                  <p className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    {activeNode.data.description}
                  </p>
                )}

                {activeNode.data.details && activeNode.data.details.length > 0 && (
                  <ul
                    className={cn(
                      "mt-3 space-y-2",
                      (!activeNode.data.description || activeNode.data.nodeType === 'decision' || activeNode.data.nodeType === 'alert') && "mt-0"
                    )}
                  >
                    {activeNode.data.details.map((d, i) => (
                      <li key={i} className="flex gap-3 text-base text-neutral-800 dark:text-neutral-200">
                        <span className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeNode.data.medications && activeNode.data.medications.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeNode.data.medications.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1.5 bg-white dark:bg-neutral-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-sm font-semibold text-emerald-800 dark:text-emerald-200"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

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
          )}
        </div>
      )}

      {/* Selected Node Detail Panel - Clinical Grade */}
      {!interactive && selectedNode && (
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
