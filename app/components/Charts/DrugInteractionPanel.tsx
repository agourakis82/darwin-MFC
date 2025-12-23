'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  AlertTriangle,
  AlertCircle,
  Info,
  ArrowRight,
  FileText,
  Pill,
  Shield,
  Activity
} from 'lucide-react';
import type { MedicationEdge, MedicationNode } from '@/lib/utils/medication-network';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface DrugInteractionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: MedicationNode | null;
  interactions: MedicationEdge[];
  nodes: MedicationNode[];
}

// =============================================================================
// SEVERITY CONFIG
// =============================================================================

const SEVERITY_CONFIG = {
  grave: {
    label: 'Grave',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    icon: AlertTriangle,
    description: 'Interação potencialmente fatal ou que requer intervenção médica imediata',
  },
  moderada: {
    label: 'Moderada',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    icon: AlertCircle,
    description: 'Interação que pode requerer ajuste de dose ou monitoramento',
  },
  leve: {
    label: 'Leve',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    icon: Info,
    description: 'Interação de menor significado clínico, monitorar se sintomas',
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function DrugInteractionPanel({
  isOpen,
  onClose,
  selectedNode,
  interactions,
  nodes,
}: DrugInteractionPanelProps) {
  // Group interactions by severity
  const groupedInteractions = React.useMemo(() => {
    const grave: MedicationEdge[] = [];
    const moderada: MedicationEdge[] = [];
    const leve: MedicationEdge[] = [];

    interactions.forEach((edge) => {
      switch (edge.strength) {
        case 'grave':
          grave.push(edge);
          break;
        case 'moderada':
          moderada.push(edge);
          break;
        case 'leve':
          leve.push(edge);
          break;
      }
    });

    return { grave, moderada, leve };
  }, [interactions]);

  const getNodeName = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    return node?.name || id;
  };

  const getOtherDrug = (edge: MedicationEdge) => {
    if (!selectedNode) return '';
    return edge.source === selectedNode.id
      ? getNodeName(edge.target)
      : getNodeName(edge.source);
  };

  return (
    <AnimatePresence>
      {isOpen && selectedNode && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white dark:bg-[#1c1c1e] shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007aff]/10 to-[#5856d6]/10 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-[#007aff]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {selectedNode.name}
                  </h2>
                  {selectedNode.classe && (
                    <p className="text-sm text-[#86868b]">{selectedNode.classe}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary */}
            <div className="p-4 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {groupedInteractions.grave.length}
                  </div>
                  <div className="text-xs text-[#86868b]">Graves</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {groupedInteractions.moderada.length}
                  </div>
                  <div className="text-xs text-[#86868b]">Moderadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {groupedInteractions.leve.length}
                  </div>
                  <div className="text-xs text-[#86868b]">Leves</div>
                </div>
              </div>
            </div>

            {/* Interactions List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Grave Interactions */}
              {groupedInteractions.grave.length > 0 && (
                <InteractionSection
                  severity="grave"
                  interactions={groupedInteractions.grave}
                  getOtherDrug={getOtherDrug}
                />
              )}

              {/* Moderate Interactions */}
              {groupedInteractions.moderada.length > 0 && (
                <InteractionSection
                  severity="moderada"
                  interactions={groupedInteractions.moderada}
                  getOtherDrug={getOtherDrug}
                />
              )}

              {/* Mild Interactions */}
              {groupedInteractions.leve.length > 0 && (
                <InteractionSection
                  severity="leve"
                  interactions={groupedInteractions.leve}
                  getOtherDrug={getOtherDrug}
                />
              )}

              {interactions.length === 0 && (
                <div className="text-center py-8 text-[#86868b]">
                  <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma interação registrada para este medicamento</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// INTERACTION SECTION
// =============================================================================

interface InteractionSectionProps {
  severity: 'grave' | 'moderada' | 'leve';
  interactions: MedicationEdge[];
  getOtherDrug: (edge: MedicationEdge) => string;
}

function InteractionSection({ severity, interactions, getOtherDrug }: InteractionSectionProps) {
  const config = SEVERITY_CONFIG[severity];
  const Icon = config.icon;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className={cn('w-5 h-5', config.color)} />
        <h3 className={cn('font-semibold', config.color)}>
          Interações {config.label}s ({interactions.length})
        </h3>
      </div>

      <div className="space-y-2">
        {interactions.map((edge, index) => (
          <InteractionCard
            key={`${edge.source}-${edge.target}-${index}`}
            edge={edge}
            otherDrug={getOtherDrug(edge)}
            config={config}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// INTERACTION CARD
// =============================================================================

interface InteractionCardProps {
  edge: MedicationEdge;
  otherDrug: string;
  config: typeof SEVERITY_CONFIG.grave;
}

function InteractionCard({ edge, otherDrug, config }: InteractionCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      className={cn(
        'rounded-xl border overflow-hidden',
        config.bg,
        config.border
      )}
      layout
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <ArrowRight className={cn('w-4 h-4', config.color)} />
          <span className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
            {otherDrug}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className={cn('w-4 h-4', config.color)}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#86868b] mb-1">
                  <Activity className="w-3 h-3" />
                  Efeito
                </div>
                <p className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {edge.interaction.efeito}
                </p>
              </div>

              {edge.interaction.mecanismo && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#86868b] mb-1">
                    <FileText className="w-3 h-3" />
                    Mecanismo
                  </div>
                  <p className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {edge.interaction.mecanismo}
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#86868b] mb-1">
                  <Shield className="w-3 h-3" />
                  Conduta
                </div>
                <p className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {edge.interaction.conduta}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
