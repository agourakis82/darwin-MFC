/**
 * MULTI-OMIC HUB
 * ==============
 *
 * Hub central integrando genômica, microbioma e lifestyle
 * Visualização holística com diagrama de Venn animado
 *
 * Criado com o skill: genius-creative-uiux
 *
 * Features:
 * - Diagrama de Venn interativo mostrando interseções
 * - Contribuição de cada camada ômica
 * - Network de interações gene-microbioma-lifestyle
 * - Insights integrados e recomendações
 * - Morph transitions entre estados
 *
 * @example
 * ```tsx
 * import { MultiOmicHub } from '@/lib/design-system/components/predictive-medicine/MultiOmicHub';
 *
 * <MultiOmicHub
 *   genomicScore={0.7}
 *   microbiomeScore={0.6}
 *   lifestyleScore={0.5}
 *   interactions={interactions}
 * />
 * ```
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import { Card, CardHeader, CardTitle, CardContent } from '@/lib/design-system/primitives/card';
import {
  PulseWrapper,
  GlowWrapper,
  HeartbeatWrapper
} from '@/lib/design-system/animations/feedback';
import { FadeTransition, ScaleTransition } from '@/lib/design-system/animations/transitions';

// ============================================================================
// TYPES
// ============================================================================

interface OmicLayer {
  name: string;
  score: number; // 0-1 (risk contribution)
  factors: Array<{
    name: string;
    impact: number; // 0-1
    direction: 'positive' | 'negative';
    description: string;
  }>;
}

interface OmicInteraction {
  id: string;
  type: 'gene-microbiome' | 'gene-lifestyle' | 'microbiome-lifestyle' | 'triple';
  name: string;
  description: string;
  strength: number; // 0-1
  effect: 'synergistic' | 'antagonistic' | 'neutral';
  sources: string[];
}

interface IntegratedInsight {
  id: string;
  title: string;
  category: 'risk' | 'opportunity' | 'action';
  priority: 'high' | 'medium' | 'low';
  description: string;
  contributingFactors: string[];
  recommendation: string;
}

interface MultiOmicHubProps {
  genomic: OmicLayer;
  microbiome: OmicLayer;
  lifestyle: OmicLayer;
  interactions: OmicInteraction[];
  insights: IntegratedInsight[];
  overallRiskScore: number;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const layerConfig = {
  genomic: {
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-600 dark:text-blue-400',
    icon: '🧬',
    label: 'Genômica'
  },
  microbiome: {
    color: '#10B981',
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: '🦠',
    label: 'Microbioma'
  },
  lifestyle: {
    color: '#F59E0B',
    gradient: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-600 dark:text-amber-400',
    icon: '🏃',
    label: 'Lifestyle'
  }
};

const interactionColors = {
  'gene-microbiome': '#8B5CF6',
  'gene-lifestyle': '#EC4899',
  'microbiome-lifestyle': '#06B6D4',
  'triple': '#F97316'
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Venn Diagram - Diagrama de Venn interativo
 */
const VennDiagram: React.FC<{
  genomicScore: number;
  microbiomeScore: number;
  lifestyleScore: number;
  selectedLayer: string | null;
  onLayerSelect: (layer: string | null) => void;
}> = ({ genomicScore, microbiomeScore, lifestyleScore, selectedLayer, onLayerSelect }) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const size = 400;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 100;
  const offset = 50;

  // Circle positions
  const circles = {
    genomic: { cx: centerX - offset * 0.5, cy: centerY - offset * 0.7, color: layerConfig.genomic.color },
    microbiome: { cx: centerX + offset * 0.5, cy: centerY - offset * 0.7, color: layerConfig.microbiome.color },
    lifestyle: { cx: centerX, cy: centerY + offset * 0.6, color: layerConfig.lifestyle.color }
  };

  const scores = { genomic: genomicScore, microbiome: microbiomeScore, lifestyle: lifestyleScore };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md mx-auto">
      <defs>
        {/* Gradients */}
        {Object.entries(circles).map(([key, { color }]) => (
          <radialGradient key={key} id={`venn-gradient-${key}`}>
            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0.3} />
          </radialGradient>
        ))}

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius * 1.8}
        fill="none"
        stroke="url(#venn-gradient-genomic)"
        strokeWidth={1}
        strokeOpacity={0.2}
      />

      {/* Circles */}
      {Object.entries(circles).map(([key, { cx, cy, color }]) => {
        const isSelected = selectedLayer === key;
        const isHovered = hoveredLayer === key;
        const score = scores[key as keyof typeof scores];

        return (
          <g key={key}>
            {/* Circle */}
            <motion.circle
              cx={cx}
              cy={cy}
              r={radius}
              fill={`url(#venn-gradient-${key})`}
              stroke={color}
              strokeWidth={isSelected || isHovered ? 4 : 2}
              style={{ mixBlendMode: 'multiply' }}
              className="cursor-pointer"
              onClick={() => onLayerSelect(selectedLayer === key ? null : key)}
              onMouseEnter={() => setHoveredLayer(key)}
              onMouseLeave={() => setHoveredLayer(null)}
              animate={{
                scale: isSelected ? 1.05 : isHovered ? 1.02 : 1,
                filter: isSelected ? 'url(#glow)' : 'none'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            {/* Score circle */}
            <motion.circle
              cx={cx}
              cy={cy}
              r={radius * score}
              fill={color}
              fillOpacity={0.4}
              initial={{ r: 0 }}
              animate={{ r: radius * score }}
              transition={{ duration: shouldReduceMotion ? 0 : 1, ease: 'easeOut' }}
            />

            {/* Label */}
            <text
              x={cx}
              y={cy - 10}
              textAnchor="middle"
              className="text-2xl"
              style={{ pointerEvents: 'none' }}
            >
              {layerConfig[key as keyof typeof layerConfig].icon}
            </text>
            <text
              x={cx}
              y={cy + 15}
              textAnchor="middle"
              className="text-sm font-semibold fill-neutral-700 dark:fill-neutral-300"
              style={{ pointerEvents: 'none' }}
            >
              {Math.round(score * 100)}%
            </text>
            <text
              x={cx}
              y={cy + 30}
              textAnchor="middle"
              className="text-xs fill-neutral-500"
              style={{ pointerEvents: 'none' }}
            >
              {layerConfig[key as keyof typeof layerConfig].label}
            </text>
          </g>
        );
      })}

      {/* Intersection labels */}
      <text
        x={centerX}
        y={centerY - 20}
        textAnchor="middle"
        className="text-xs fill-neutral-600 font-medium"
      >
        Integração
      </text>
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        className="text-lg font-bold fill-purple-600"
      >
        {Math.round(((genomicScore + microbiomeScore + lifestyleScore) / 3) * 100)}%
      </text>

      {/* Pulse animation at center */}
      {!shouldReduceMotion && (
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={15}
          fill="none"
          stroke="#8B5CF6"
          strokeWidth={2}
          animate={{
            r: [15, 30, 15],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </svg>
  );
};

/**
 * Layer Detail Panel - Detalhes de uma camada ômica
 */
const LayerDetailPanel: React.FC<{
  layer: OmicLayer;
  config: typeof layerConfig.genomic;
}> = ({ layer, config }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn('rounded-xl p-4', config.bg)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
          'bg-gradient-to-br',
          config.gradient
        )}>
          {config.icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{config.label}</h3>
          <p className={cn('text-sm', config.text)}>
            Contribuição: {Math.round(layer.score * 100)}%
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {layer.factors.map((factor, index) => (
          <motion.div
            key={factor.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-lg p-3"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{factor.name}</span>
              <span className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full',
                factor.direction === 'positive'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              )}>
                {factor.direction === 'positive' ? '↑ Risco' : '↓ Proteção'}
              </span>
            </div>

            <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  factor.direction === 'positive' ? 'bg-red-500' : 'bg-emerald-500'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${factor.impact * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            </div>

            <p className="text-xs text-neutral-500 mt-1">{factor.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Interaction Network - Rede de interações
 */
const InteractionNetwork: React.FC<{
  interactions: OmicInteraction[];
  selectedInteraction: string | null;
  onSelect: (id: string | null) => void;
}> = ({ interactions, selectedInteraction, onSelect }) => {
  const shouldReduceMotion = useReducedMotion();

  const size = 300;
  const centerX = size / 2;
  const centerY = size / 2;

  // Position nodes in a triangle
  const nodes = [
    { id: 'genomic', x: centerX, y: 50, ...layerConfig.genomic },
    { id: 'microbiome', x: 50, y: size - 70, ...layerConfig.microbiome },
    { id: 'lifestyle', x: size - 50, y: size - 70, ...layerConfig.lifestyle }
  ];

  const getNodePair = (type: OmicInteraction['type']) => {
    switch (type) {
      case 'gene-microbiome': return ['genomic', 'microbiome'];
      case 'gene-lifestyle': return ['genomic', 'lifestyle'];
      case 'microbiome-lifestyle': return ['microbiome', 'lifestyle'];
      case 'triple': return ['genomic', 'microbiome', 'lifestyle'];
    }
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-xs mx-auto">
      {/* Connection lines */}
      {interactions.map((interaction) => {
        const nodeIds = getNodePair(interaction.type);
        const color = interactionColors[interaction.type];
        const isSelected = selectedInteraction === interaction.id;

        if (interaction.type === 'triple') {
          // Draw triangle for triple interaction
          const path = nodes.map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x} ${n.y}`).join(' ') + ' Z';

          return (
            <motion.path
              key={interaction.id}
              d={path}
              fill={`${color}20`}
              stroke={color}
              strokeWidth={isSelected ? 3 : 1.5}
              className="cursor-pointer"
              onClick={() => onSelect(isSelected ? null : interaction.id)}
              animate={!shouldReduceMotion && isSelected ? {
                strokeDasharray: ['0 1000', '1000 0'],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          );
        }

        const [fromId, toId] = nodeIds;
        const from = nodes.find(n => n.id === fromId)!;
        const to = nodes.find(n => n.id === toId)!;

        return (
          <motion.line
            key={interaction.id}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={color}
            strokeWidth={interaction.strength * 5 + 1}
            strokeOpacity={isSelected ? 1 : 0.5}
            strokeLinecap="round"
            className="cursor-pointer"
            onClick={() => onSelect(isSelected ? null : interaction.id)}
            animate={!shouldReduceMotion ? {
              strokeDasharray: isSelected ? ['0 10', '10 0'] : 'none',
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={30}
            fill={node.color}
            stroke="#fff"
            strokeWidth={3}
            whileHover={{ scale: 1.1 }}
          />
          <text
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            className="text-lg"
            style={{ pointerEvents: 'none' }}
          >
            {node.icon}
          </text>
        </g>
      ))}

      {/* Center hub */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={20}
        fill="#8B5CF6"
        stroke="#fff"
        strokeWidth={2}
        animate={!shouldReduceMotion ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text
        x={centerX}
        y={centerY + 5}
        textAnchor="middle"
        className="text-sm"
        style={{ pointerEvents: 'none' }}
      >
        🔗
      </text>
    </svg>
  );
};

/**
 * Insight Card - Card de insight integrado
 */
const InsightCard: React.FC<{
  insight: IntegratedInsight;
  index: number;
}> = ({ insight, index }) => {
  const shouldReduceMotion = useReducedMotion();

  const categoryConfig = {
    risk: { icon: '⚠️', bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-300 dark:border-red-800' },
    opportunity: { icon: '💡', bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-300 dark:border-emerald-800' },
    action: { icon: '🎯', bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-300 dark:border-blue-800' }
  };

  const priorityConfig = {
    high: 'ring-2 ring-red-500',
    medium: 'ring-1 ring-amber-400',
    low: ''
  };

  const config = categoryConfig[insight.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className={cn(
        'rounded-xl border p-4',
        config.bg,
        config.border,
        priorityConfig[insight.priority]
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{insight.title}</h4>
            {insight.priority === 'high' && (
              <PulseWrapper intensity="subtle" speed="slow">
                <span className="text-xs font-medium px-2 py-0.5 bg-red-500 text-white rounded-full">
                  Alta Prioridade
                </span>
              </PulseWrapper>
            )}
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {insight.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1">
            {insight.contributingFactors.map((factor, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-white dark:bg-neutral-800 rounded text-xs"
              >
                {factor}
              </span>
            ))}
          </div>

          <div className="mt-3 p-2 bg-white dark:bg-neutral-800 rounded-lg">
            <p className="text-xs font-medium text-neutral-500 mb-1">Recomendação:</p>
            <p className="text-sm">{insight.recommendation}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Overall Risk Gauge - Gauge geral de risco
 */
const OverallRiskGauge: React.FC<{
  score: number;
}> = ({ score }) => {
  const shouldReduceMotion = useReducedMotion();

  const getRiskLevel = (s: number) => {
    if (s < 0.3) return { label: 'Baixo', color: '#10B981' };
    if (s < 0.6) return { label: 'Moderado', color: '#F59E0B' };
    if (s < 0.8) return { label: 'Elevado', color: '#F97316' };
    return { label: 'Alto', color: '#EF4444' };
  };

  const risk = getRiskLevel(score);

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        {/* Background arc */}
        <circle
          cx={50}
          cy={50}
          r={40}
          fill="none"
          stroke="currentColor"
          strokeWidth={8}
          strokeLinecap="round"
          className="text-neutral-200 dark:text-neutral-700"
          strokeDasharray="188.5 62.8" // 3/4 circle
        />

        {/* Progress arc */}
        <motion.circle
          cx={50}
          cy={50}
          r={40}
          fill="none"
          stroke={risk.color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={`${score * 188.5} 251.3`}
          initial={{ strokeDasharray: '0 251.3' }}
          animate={{ strokeDasharray: `${score * 188.5} 251.3` }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.5, ease: 'easeOut' }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-bold"
          style={{ color: risk.color }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          {Math.round(score * 100)}
        </motion.span>
        <span className="text-sm text-neutral-500">Risco Integrado</span>
        <span
          className="text-xs font-medium mt-1 px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${risk.color}20`, color: risk.color }}
        >
          {risk.label}
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const MultiOmicHub: React.FC<MultiOmicHubProps> = ({
  genomic,
  microbiome,
  lifestyle,
  interactions,
  insights,
  overallRiskScore,
  className
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [selectedInteraction, setSelectedInteraction] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'venn' | 'network'>('venn');

  const layers = { genomic, microbiome, lifestyle };

  const selectedLayerData = selectedLayer ? layers[selectedLayer as keyof typeof layers] : null;
  const selectedInteractionData = selectedInteraction
    ? interactions.find(i => i.id === selectedInteraction)
    : null;

  // Stats
  const stats = useMemo(() => ({
    totalFactors: genomic.factors.length + microbiome.factors.length + lifestyle.factors.length,
    riskFactors: [genomic, microbiome, lifestyle].flatMap(l =>
      l.factors.filter(f => f.direction === 'positive')
    ).length,
    protectiveFactors: [genomic, microbiome, lifestyle].flatMap(l =>
      l.factors.filter(f => f.direction === 'negative')
    ).length,
    strongInteractions: interactions.filter(i => i.strength > 0.7).length
  }), [genomic, microbiome, lifestyle, interactions]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <Card variant="glass" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <GlowWrapper color="rgba(139, 92, 246, 0.5)" intensity="normal">
              <span className="text-3xl">🔮</span>
            </GlowWrapper>
            Multi-Omic Integration Hub
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <motion.div
              className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-center col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <OverallRiskGauge score={overallRiskScore} />
            </motion.div>

            <motion.div
              className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {stats.totalFactors}
              </p>
              <p className="text-sm text-neutral-500">Fatores Analisados</p>
            </motion.div>

            <motion.div
              className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.riskFactors}
              </p>
              <p className="text-sm text-red-600/70">Fatores de Risco</p>
            </motion.div>

            <motion.div
              className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {stats.protectiveFactors}
              </p>
              <p className="text-sm text-emerald-600/70">Fatores Protetores</p>
            </motion.div>

            <motion.div
              className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {interactions.length}
              </p>
              <p className="text-sm text-purple-600/70">Interações</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Main Visualization */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Venn/Network Diagram */}
        <Card variant="default" padding="lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">🔬</span>
              Integração Multi-ômica
            </CardTitle>

            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('venn')}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  viewMode === 'venn'
                    ? 'bg-white dark:bg-neutral-700 shadow'
                    : 'text-neutral-500 hover:text-neutral-700'
                )}
              >
                Venn
              </button>
              <button
                onClick={() => setViewMode('network')}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  viewMode === 'network'
                    ? 'bg-white dark:bg-neutral-700 shadow'
                    : 'text-neutral-500 hover:text-neutral-700'
                )}
              >
                Rede
              </button>
            </div>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {viewMode === 'venn' ? (
                <motion.div
                  key="venn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <VennDiagram
                    genomicScore={genomic.score}
                    microbiomeScore={microbiome.score}
                    lifestyleScore={lifestyle.score}
                    selectedLayer={selectedLayer}
                    onLayerSelect={setSelectedLayer}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="network"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <InteractionNetwork
                    interactions={interactions}
                    selectedInteraction={selectedInteraction}
                    onSelect={setSelectedInteraction}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-xs text-center text-neutral-500 mt-4">
              Clique em uma camada para ver detalhes
            </p>
          </CardContent>
        </Card>

        {/* Detail Panel */}
        <Card variant="default" padding="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              {selectedLayerData
                ? `Detalhes: ${layerConfig[selectedLayer as keyof typeof layerConfig].label}`
                : selectedInteractionData
                  ? 'Detalhes da Interação'
                  : 'Selecione uma camada'}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {selectedLayerData ? (
                <LayerDetailPanel
                  key={selectedLayer}
                  layer={selectedLayerData}
                  config={layerConfig[selectedLayer as keyof typeof layerConfig]}
                />
              ) : selectedInteractionData ? (
                <motion.div
                  key={selectedInteraction}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30"
                >
                  <h3 className="font-semibold text-lg">{selectedInteractionData.name}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                    {selectedInteractionData.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-3">
                      <p className="text-xs text-neutral-500">Força</p>
                      <p className="text-lg font-bold">
                        {Math.round(selectedInteractionData.strength * 100)}%
                      </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-3">
                      <p className="text-xs text-neutral-500">Efeito</p>
                      <p className={cn(
                        'text-lg font-bold capitalize',
                        selectedInteractionData.effect === 'synergistic' ? 'text-red-600' :
                        selectedInteractionData.effect === 'antagonistic' ? 'text-emerald-600' :
                        'text-neutral-600'
                      )}>
                        {selectedInteractionData.effect === 'synergistic' ? 'Sinérgico' :
                         selectedInteractionData.effect === 'antagonistic' ? 'Antagônico' :
                         'Neutro'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-neutral-500 mb-2">Fontes:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedInteractionData.sources.map((source, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white dark:bg-neutral-800 rounded text-xs"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <span className="text-6xl">👆</span>
                  <p className="mt-4 text-neutral-500">
                    Selecione uma camada no diagrama para ver os detalhes dos fatores
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Integrated Insights */}
      <Card variant="default" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartbeatWrapper continuous>
              <span className="text-xl">💡</span>
            </HeartbeatWrapper>
            Insights Integrados
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contribution Bars */}
      <Card variant="glass" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            Contribuição por Camada
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {Object.entries(layers).map(([key, layer], index) => {
              const config = layerConfig[key as keyof typeof layerConfig];

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{config.icon}</span>
                      <span className="font-medium">{config.label}</span>
                    </div>
                    <span className={cn('font-bold', config.text)}>
                      {Math.round(layer.score * 100)}%
                    </span>
                  </div>

                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div
                      className={cn('h-full rounded-full bg-gradient-to-r', config.gradient)}
                      initial={{ width: 0 }}
                      animate={{ width: `${layer.score * 100}%` }}
                      transition={{ duration: shouldReduceMotion ? 0 : 1, delay: index * 0.1 }}
                    />
                  </div>

                  <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span>{layer.factors.filter(f => f.direction === 'negative').length} protetores</span>
                    <span>{layer.factors.filter(f => f.direction === 'positive').length} de risco</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiOmicHub;
