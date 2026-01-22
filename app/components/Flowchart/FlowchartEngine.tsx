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
import { cn } from '@/lib/utils';
import { Shield, AlertTriangle, Pill, Stethoscope, Activity, FileText, ChevronRight, CheckCircle } from 'lucide-react';

// SOTA Clinical Node Configuration - Academic Authority
const nodeStyles: Record<NodeType, { borderColor: string; icon: any; colorClass: string }> = {
  start: { borderColor: 'border-helix-navy', icon: Activity, colorClass: 'text-helix-navy' },
  end: { borderColor: 'border-carbon-400', icon: CheckCircle, colorClass: 'text-carbon-500' },
  decision: { borderColor: 'border-thymine-gold', icon: Shield, colorClass: 'text-thymine-gold' },
  action: { borderColor: 'border-adenine-teal', icon: ZapIcon, colorClass: 'text-adenine-teal' },
  assessment: { borderColor: 'border-adenine-teal', icon: Stethoscope, colorClass: 'text-adenine-teal' },
  treatment: { borderColor: 'border-guanine-green', icon: Pill, colorClass: 'text-guanine-green' },
  referral: { borderColor: 'border-purple-600', icon: FileText, colorClass: 'text-purple-600' },
  alert: { borderColor: 'border-critical-red', icon: AlertTriangle, colorClass: 'text-critical-red' },
  info: { borderColor: 'border-carbon-300', icon: FileText, colorClass: 'text-carbon-400' },
};

function ZapIcon(props: any) {
  return <Activity {...props} />; // Placeholder
}

// Academic Custom Node Component
const CustomNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as CustomNodeData;
  const style = nodeStyles[nodeData.nodeType];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "relative p-4 rounded-lg bg-white dark:bg-carbon-900 border transition-all duration-300",
        "shadow-elevation-1",
        style.borderColor,
        selected ? "ring-2 ring-adenine-teal/30 scale-105 shadow-deep z-50" : "border-opacity-30"
      )}
      style={{ 
        minWidth: '220px',
        maxWidth: '280px',
        borderWidth: '1px'
      }}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-carbon-300 border-none" />
      
      <div className="flex items-start gap-3">
        <div className={cn("w-8 h-8 rounded bg-clinical-gray dark:bg-carbon-800 flex items-center justify-center shrink-0", style.colorClass)}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-widest text-carbon-400 mb-1">
            {nodeData.nodeType}
          </div>
          <h3 className="font-display font-bold text-sm text-helix-navy dark:text-white leading-tight mb-1">
            {nodeData.label}
          </h3>
          {nodeData.description && (
            <p className="text-xs font-body text-carbon-600 dark:text-carbon-400 line-clamp-2 leading-relaxed">
              {nodeData.description}
            </p>
          )}
        </div>
      </div>

      {nodeData.nodeType === 'decision' && (
        <div className="mt-3 flex gap-1">
          <div className="h-1 flex-1 bg-guanine-green/20 rounded-full" />
          <div className="h-1 flex-1 bg-critical-red/20 rounded-full" />
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-carbon-300 border-none" />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

interface FlowchartEngineProps {
  nodes: ProtocolNode[];
  edges: ProtocolEdge[];
  onNodeClick?: (node: ProtocolNode) => void;
  className?: string;
}

export default function FlowchartEngine({
  nodes: initialNodes,
  edges: initialEdges,
  onNodeClick,
  className = '',
}: FlowchartEngineProps) {
  const [selectedNode, setSelectedNode] = useState<ProtocolNode | null>(null);

  const preparedNodes = useMemo(() => initialNodes.map(n => ({ ...n, type: 'custom' })), [initialNodes]);
  const preparedEdges = useMemo(() => initialEdges.map(e => ({
    ...e,
    style: { stroke: '#D1D1CD', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#D1D1CD' },
    labelStyle: { fill: '#71716D', fontWeight: 700, fontSize: 10, fontFamily: 'JetBrains Mono' },
    labelBgStyle: { fill: '#FBFBF9', fillOpacity: 1 },
    labelBgPadding: [4, 2] as [number, number],
  })), [initialEdges]);

  const [nodes, , onNodesChange] = useNodesState(preparedNodes);
  const [edges, , onEdgesChange] = useEdgesState(preparedEdges);

  return (
    <div className={cn("w-full h-full bg-paper-white dark:bg-carbon-950", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {
          setSelectedNode(node as ProtocolNode);
          onNodeClick?.(node as ProtocolNode);
        }}
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

      {/* Selected Node HUD - Tactical Detail */}
      {selectedNode && (
        <div className="absolute top-6 right-6 w-96 bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg shadow-deep z-50 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
               <div>
                 <span className="text-[10px] font-bold text-adenine-teal uppercase tracking-widest block mb-1">Current Node Selection</span>
                 <h3 className="text-xl font-display font-bold text-helix-navy dark:text-white">{selectedNode.data.label}</h3>
               </div>
               <button onClick={() => setSelectedNode(null)} className="text-carbon-300 hover:text-carbon-600 transition-colors">✕</button>
            </div>
            
            <p className="text-sm font-body text-carbon-600 dark:text-carbon-400 leading-relaxed mb-6">
              {selectedNode.data.description || 'No specialized description provided for this logic node.'}
            </p>

            {selectedNode.data.details && (
              <div className="space-y-3 mb-6">
                <span className="text-[10px] font-bold text-carbon-400 uppercase tracking-widest block">Clinical Guidance</span>
                {selectedNode.data.details.map((d, i) => (
                  <div key={i} className="flex gap-3 text-xs text-carbon-700 dark:text-carbon-300">
                    <div className="w-1 h-1 rounded-full bg-adenine-teal mt-1.5 shrink-0" />
                    <p className="leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            )}

            {selectedNode.data.medications && selectedNode.data.medications.length > 0 && (
              <div className="p-4 bg-clinical-gray dark:bg-carbon-800 rounded border border-carbon-200 dark:border-carbon-700">
                <span className="text-[10px] font-bold text-guanine-green uppercase tracking-widest block mb-2">Pharmacological Trail</span>
                <div className="flex flex-wrap gap-1.5">
                   {selectedNode.data.medications.map(m => (
                     <span key={m} className="px-2 py-1 bg-white dark:bg-carbon-900 border border-carbon-200 rounded text-[10px] font-mono font-bold text-helix-navy">
                       {m}
                     </span>
                   ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-clinical-gray dark:bg-carbon-800 px-6 py-3 border-t border-carbon-200 dark:border-carbon-700 flex justify-between items-center rounded-b-lg">
             <span className="text-[10px] font-mono text-carbon-400">CIAP: {selectedNode.data.ciap2 || 'N/A'}</span>
             <button className="text-[10px] font-bold text-adenine-teal uppercase tracking-widest flex items-center gap-1">
               VIEW FULL MONOGRAPH <ChevronRight className="w-3 h-3" />
             </button>
          </div>
        </div>
      )}
    </div>
  );
}