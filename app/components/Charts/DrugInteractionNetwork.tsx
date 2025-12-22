'use client';

import React, { useState, useMemo } from 'react';
import type { Node as FlowNode, Edge as FlowEdge } from '@xyflow/react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { buildMedicationNetwork, findInteractionsForMedications, calculateNetworkStatistics } from '@/lib/utils/medication-network';
import { todosMedicamentos } from '@/lib/data/medicamentos/index';
import type { Medicamento } from '@/lib/types/medicamento';
import { AlertTriangle, Info, Minus } from 'lucide-react';

interface DrugInteractionNetworkProps {
  selectedMedications?: string[]; // IDs dos medicamentos selecionados
  showAll?: boolean; // Se true, mostra toda a rede
  height?: number;
  onNodeClick?: (medicationId: string) => void;
}

const SEVERITY_COLORS = {
  grave: '#EF4444', // red-500
  moderada: '#F59E0B', // amber-500
  leve: '#3B82F6', // blue-500
};

const SEVERITY_LABELS = {
  grave: 'Grave',
  moderada: 'Moderada',
  leve: 'Leve',
};

export default function DrugInteractionNetwork({
  selectedMedications = [],
  showAll = false,
  height = 600,
  onNodeClick,
}: DrugInteractionNetworkProps) {
  const [filterSeverity, setFilterSeverity] = useState<'grave' | 'moderada' | 'leve' | 'all'>('all');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const networkData = useMemo(() => {
    if (showAll) {
      return buildMedicationNetwork(
        todosMedicamentos,
        filterSeverity !== 'all' ? filterSeverity : undefined
      );
    } else if (selectedMedications.length > 0) {
      const selected = todosMedicamentos.filter(m => selectedMedications.includes(m.id));
      const network = buildMedicationNetwork(selected, filterSeverity !== 'all' ? filterSeverity : undefined);
      // Também inclui medicamentos que interagem com os selecionados
      const interactions = findInteractionsForMedications(selectedMedications, todosMedicamentos);
      const additionalIds = new Set(selectedMedications);
      interactions.forEach(inter => {
        additionalIds.add(inter.source);
        additionalIds.add(inter.target);
      });
      const allRelevant = todosMedicamentos.filter(m => additionalIds.has(m.id));
      return buildMedicationNetwork(allRelevant, filterSeverity !== 'all' ? filterSeverity : undefined);
    }
    return { nodes: [], edges: [] };
  }, [selectedMedications, showAll, filterSeverity]);

  const stats = useMemo(() => calculateNetworkStatistics(networkData), [networkData]);

  // Converte para formato React Flow
  const nodes: FlowNode[] = networkData.nodes.map((node, index) => {
    const nodeEdges = networkData.edges.filter(
      e => e.source === node.id || e.target === node.id
    );
    const hasGrave = nodeEdges.some(e => e.strength === 'grave');
    const hasModerate = nodeEdges.some(e => e.strength === 'moderada');

    return {
      id: node.id,
      type: 'default',
      position: {
        x: (index % 10) * 150,
        y: Math.floor(index / 10) * 150,
      },
      data: {
        label: (
          <div className="text-center">
            <div className="font-semibold text-sm">{node.name}</div>
            {node.classe && (
              <div className="text-xs text-neutral-500 dark:text-neutral-400">{node.classe}</div>
            )}
          </div>
        ),
      },
      style: {
        background: hasGrave ? SEVERITY_COLORS.grave : hasModerate ? SEVERITY_COLORS.moderada : SEVERITY_COLORS.leve,
        color: '#fff',
        border: selectedNode === node.id ? '3px solid #000' : '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        minWidth: '120px',
      },
    };
  });

  const edges: FlowEdge[] = networkData.edges.map((edge, index) => ({
    id: `edge-${index}`,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    animated: edge.strength === 'grave',
    style: {
      stroke: SEVERITY_COLORS[edge.strength],
      strokeWidth: edge.strength === 'grave' ? 3 : edge.strength === 'moderada' ? 2 : 1,
    },
    label: edge.strength === 'grave' ? '⚠' : edge.strength === 'moderada' ? '⚠' : '',
    data: {
      interaction: edge.interaction,
    },
  }));

  const onNodesChange = (changes: any) => {
    // Handle node changes (dragging, etc.)
  };

  const onEdgesChange = (changes: any) => {
    // Handle edge changes
  };

  const onNodeClickHandler = (event: React.MouseEvent, node: FlowNode) => {
    setSelectedNode(node.id);
    if (onNodeClick) {
      onNodeClick(node.id);
    }
  };

  if (networkData.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-500 dark:text-neutral-400">
        <p>Nenhuma interação encontrada</p>
      </div>
    );
  }

  const selectedInteraction = networkData.edges.find(
    e => e.source === selectedNode || e.target === selectedNode
  );

  return (
    <div className="space-y-4">
      {/* Controles e Estatísticas */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Filtro de Severidade:
            </label>
            <select
              value={filterSeverity}
              onChange={e => setFilterSeverity(e.target.value as any)}
              className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
            >
              <option value="all">Todas</option>
              <option value="grave">Grave</option>
              <option value="moderada">Moderada</option>
              <option value="leve">Leve</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-neutral-600 dark:text-neutral-400">
              Grave: {stats.nodesBySeverity.grave}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-neutral-600 dark:text-neutral-400">
              Moderada: {stats.nodesBySeverity.moderada}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-neutral-600 dark:text-neutral-400">
              Leve: {stats.nodesBySeverity.leve}
            </span>
          </div>
        </div>
      </div>

      {/* Rede */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800" style={{ height }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClickHandler}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {/* Detalhes da Interação Selecionada */}
      {selectedInteraction && selectedNode && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                Interação {SEVERITY_LABELS[selectedInteraction.strength]}
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-300 mb-1">
                <strong>Efeito:</strong> {selectedInteraction.interaction.efeito}
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-300 mb-1">
                <strong>Mecanismo:</strong> {selectedInteraction.interaction.mecanismo}
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Conduta:</strong> {selectedInteraction.interaction.conduta}
              </p>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

