/**
 * RISK TIMELINE
 * =============
 *
 * Visualização temporal de predições de risco de doenças
 * Linha do tempo de 10-20 anos com ondas de probabilidade
 *
 * Criado com o skill: genius-creative-uiux
 *
 * Features:
 * - Timeline interativo com scrub temporal
 * - Ondas de probabilidade animadas
 * - Intervenções preventivas ao longo do tempo
 * - Cenários com/sem intervenção
 * - Marcos de monitoramento
 *
 * @example
 * ```tsx
 * import { RiskTimeline } from '@/lib/design-system/components/predictive-medicine/RiskTimeline';
 *
 * <RiskTimeline
 *   predictions={predictions}
 *   interventions={interventions}
 *   onTimeSelect={handleTimeSelect}
 * />
 * ```
 */

'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import { Card, CardHeader, CardTitle, CardContent } from '@/lib/design-system/primitives/card';
import {
  PulseWrapper,
  GlowWrapper,
  HeartbeatWrapper
} from '@/lib/design-system/animations/feedback';
import { SlideTransition, FadeTransition } from '@/lib/design-system/animations/transitions';

// ============================================================================
// TYPES
// ============================================================================

interface DiseasePrediction {
  id: string;
  disease: string;
  icd10Code: string;
  baselineRisk: number; // Current risk without intervention
  riskWithIntervention: number; // Risk with optimal intervention
  timePoints: Array<{
    year: number;
    riskWithoutIntervention: number;
    riskWithIntervention: number;
  }>;
  peakRiskYear: number;
  confidence: number;
  severity: 'critical' | 'serious' | 'moderate' | 'low';
}

interface PreventiveIntervention {
  id: string;
  name: string;
  targetDisease: string;
  startYear: number;
  endYear: number | 'ongoing';
  category: 'lifestyle' | 'medication' | 'monitoring' | 'procedure';
  impact: number; // Risk reduction 0-1
  description: string;
}

interface MonitoringMilestone {
  year: number;
  type: 'screening' | 'checkup' | 'test' | 'review';
  description: string;
  diseases: string[];
}

interface RiskTimelineProps {
  predictions: DiseasePrediction[];
  interventions: PreventiveIntervention[];
  milestones: MonitoringMilestone[];
  timeHorizon?: 5 | 10 | 15 | 20;
  onTimeSelect?: (year: number) => void;
  onPredictionSelect?: (prediction: DiseasePrediction) => void;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const severityColors = {
  critical: {
    gradient: 'from-red-500 to-red-600',
    bg: 'bg-red-50 dark:bg-red-950/30',
    text: 'text-red-600 dark:text-red-400',
    wave: '#EF4444',
    label: 'Crítico'
  },
  serious: {
    gradient: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    text: 'text-orange-600 dark:text-orange-400',
    wave: '#F97316',
    label: 'Sério'
  },
  moderate: {
    gradient: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-600 dark:text-amber-400',
    wave: '#F59E0B',
    label: 'Moderado'
  },
  low: {
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    wave: '#10B981',
    label: 'Baixo'
  }
};

const categoryIcons = {
  lifestyle: '🏃',
  medication: '💊',
  monitoring: '📊',
  procedure: '🏥'
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Risk Wave - Onda de probabilidade SVG animada
 */
const RiskWave: React.FC<{
  prediction: DiseasePrediction;
  timeHorizon: number;
  showWithIntervention: boolean;
  width: number;
  height: number;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ prediction, timeHorizon, showWithIntervention, width, height, isSelected, onSelect }) => {
  const shouldReduceMotion = useReducedMotion();
  const config = severityColors[prediction.severity];

  // Generate path for the wave
  const generatePath = (withIntervention: boolean) => {
    const points = prediction.timePoints
      .filter(tp => tp.year <= timeHorizon)
      .map(tp => ({
        x: (tp.year / timeHorizon) * width,
        y: height - (withIntervention ? tp.riskWithIntervention : tp.riskWithoutIntervention) * height
      }));

    if (points.length < 2) return '';

    // Create smooth curve through points
    let path = `M ${points[0].x} ${height}`;
    path += ` L ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;

      path += ` Q ${current.x} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
    }

    const last = points[points.length - 1];
    path += ` L ${last.x} ${last.y}`;
    path += ` L ${last.x} ${height}`;
    path += ' Z';

    return path;
  };

  const basePath = generatePath(false);
  const interventionPath = generatePath(true);

  return (
    <g className="cursor-pointer" onClick={onSelect}>
      {/* Base risk wave (without intervention) */}
      <motion.path
        d={basePath}
        fill={`${config.wave}20`}
        stroke={config.wave}
        strokeWidth={isSelected ? 3 : 1.5}
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: showWithIntervention ? 0.3 : 0.8,
          pathLength: 1
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.5, ease: 'easeOut' }}
      />

      {/* Intervention risk wave */}
      {showWithIntervention && (
        <motion.path
          d={interventionPath}
          fill={`${config.wave}40`}
          stroke={config.wave}
          strokeWidth={isSelected ? 3 : 2}
          strokeDasharray="8 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      )}

      {/* Peak risk indicator */}
      {prediction.peakRiskYear <= timeHorizon && (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <circle
            cx={(prediction.peakRiskYear / timeHorizon) * width}
            cy={height - prediction.timePoints.find(t => t.year === prediction.peakRiskYear)?.riskWithoutIntervention! * height}
            r={6}
            fill={config.wave}
            stroke="#fff"
            strokeWidth={2}
          />

          {!shouldReduceMotion && (
            <motion.circle
              cx={(prediction.peakRiskYear / timeHorizon) * width}
              cy={height - prediction.timePoints.find(t => t.year === prediction.peakRiskYear)?.riskWithoutIntervention! * height}
              r={6}
              fill="none"
              stroke={config.wave}
              strokeWidth={2}
              animate={{
                r: [6, 15, 6],
                opacity: [1, 0, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.g>
      )}
    </g>
  );
};

/**
 * Timeline Scrubber - Controle de tempo interativo
 */
const TimelineScrubber: React.FC<{
  currentYear: number;
  maxYear: number;
  onChange: (year: number) => void;
}> = ({ currentYear, maxYear, onChange }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const updatePosition = (clientX: number) => {
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        onChange(Math.round(percentage * maxYear));
      }
    };

    updatePosition(e.clientX);

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="relative py-4">
      {/* Track */}
      <div
        ref={trackRef}
        className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* Progress */}
        <motion.div
          className="h-full bg-gradient-to-r from-brand-primary-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentYear / maxYear) * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Thumb */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-neutral-800 border-4 border-brand-primary-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing"
        style={{ left: `calc(${(currentYear / maxYear) * 100}% - 12px)` }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      />

      {/* Year labels */}
      <div className="flex justify-between mt-2 text-xs text-neutral-500">
        <span>Hoje</span>
        <span>{Math.round(maxYear / 4)} anos</span>
        <span>{Math.round(maxYear / 2)} anos</span>
        <span>{Math.round(maxYear * 3 / 4)} anos</span>
        <span>{maxYear} anos</span>
      </div>
    </div>
  );
};

/**
 * Intervention Marker - Marcador de intervenção na timeline
 */
const InterventionMarker: React.FC<{
  intervention: PreventiveIntervention;
  timeHorizon: number;
  width: number;
}> = ({ intervention, timeHorizon, width }) => {
  const shouldReduceMotion = useReducedMotion();
  const startX = (intervention.startYear / timeHorizon) * width;
  const endX = intervention.endYear === 'ongoing'
    ? width
    : (intervention.endYear / timeHorizon) * width;

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <g
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="cursor-pointer"
    >
      {/* Intervention bar */}
      <motion.rect
        x={startX}
        y={-8}
        width={endX - startX}
        height={6}
        rx={3}
        fill="#3B82F6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Start marker */}
      <circle
        cx={startX}
        cy={-5}
        r={4}
        fill="#3B82F6"
        stroke="#fff"
        strokeWidth={2}
      />

      {/* Icon */}
      <text
        x={startX}
        y={-18}
        textAnchor="middle"
        className="text-sm"
      >
        {categoryIcons[intervention.category]}
      </text>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.foreignObject
            x={startX - 100}
            y={-80}
            width={200}
            height={60}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="bg-white dark:bg-neutral-800 shadow-xl rounded-lg p-2 text-xs">
              <p className="font-semibold">{intervention.name}</p>
              <p className="text-neutral-500 mt-1">
                Redução de risco: {Math.round(intervention.impact * 100)}%
              </p>
            </div>
          </motion.foreignObject>
        )}
      </AnimatePresence>
    </g>
  );
};

/**
 * Milestone Marker - Marcador de milestone de monitoramento
 */
const MilestoneMarker: React.FC<{
  milestone: MonitoringMilestone;
  timeHorizon: number;
  width: number;
  height: number;
}> = ({ milestone, timeHorizon, width, height }) => {
  const shouldReduceMotion = useReducedMotion();
  const x = (milestone.year / timeHorizon) * width;

  const typeConfig = {
    screening: { color: '#8B5CF6', icon: '🔍' },
    checkup: { color: '#10B981', icon: '✅' },
    test: { color: '#F59E0B', icon: '🧪' },
    review: { color: '#3B82F6', icon: '📋' }
  };

  const config = typeConfig[milestone.type];

  return (
    <g>
      {/* Vertical line */}
      <motion.line
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={config.color}
        strokeWidth={1}
        strokeDasharray="4 4"
        strokeOpacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      />

      {/* Marker */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <circle
          cx={x}
          cy={height + 15}
          r={12}
          fill={config.color}
          stroke="#fff"
          strokeWidth={2}
        />
        <text
          x={x}
          y={height + 20}
          textAnchor="middle"
          className="text-xs"
        >
          {config.icon}
        </text>
      </motion.g>
    </g>
  );
};

/**
 * Prediction Card - Card de detalhes da predição
 */
const PredictionCard: React.FC<{
  prediction: DiseasePrediction;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}> = ({ prediction, isSelected, onSelect, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const config = severityColors[prediction.severity];

  const riskReduction = prediction.baselineRisk - prediction.riskWithIntervention;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
    >
      <Card
        variant={isSelected ? 'elevated' : 'default'}
        padding="md"
        interactive
        className={cn(
          'transition-all',
          isSelected && 'ring-2 ring-brand-primary-500'
        )}
        onClick={onSelect}
      >
        <div className="flex items-start gap-3">
          <div className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center',
            'bg-gradient-to-br',
            config.gradient
          )}>
            <span className="text-white text-xl font-bold">
              {Math.round(prediction.baselineRisk * 100)}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {prediction.disease}
              </h4>
              <span className={cn('text-xs font-medium px-2 py-1 rounded-full', config.bg, config.text)}>
                {config.label}
              </span>
            </div>

            <p className="text-xs text-neutral-500 mt-1">
              ICD-10: {prediction.icd10Code} • Pico: Ano {prediction.peakRiskYear}
            </p>

            {/* Risk comparison */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">Sem intervenção</span>
                <span className="font-medium text-red-600">
                  {Math.round(prediction.baselineRisk * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-red-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.baselineRisk * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">Com intervenção</span>
                <span className="font-medium text-emerald-600">
                  {Math.round(prediction.riskWithIntervention * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.riskWithIntervention * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                />
              </div>
            </div>

            {/* Reduction indicator */}
            <div className="mt-2 flex items-center gap-2">
              <motion.div
                className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#10B981">
                  <path d="M7 14l5-5 5 5H7z" />
                </svg>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  -{Math.round(riskReduction * 100)}% com intervenção
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const RiskTimeline: React.FC<RiskTimelineProps> = ({
  predictions,
  interventions,
  milestones,
  timeHorizon = 20,
  onTimeSelect,
  onPredictionSelect,
  className
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedYear, setSelectedYear] = useState(timeHorizon);
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [showInterventions, setShowInterventions] = useState(true);

  // SVG dimensions
  const width = 800;
  const height = 300;
  const padding = { top: 40, right: 20, bottom: 60, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const handleYearChange = (year: number) => {
    // Snap to nearest valid year option
    const validYears: (5 | 10 | 15 | 20)[] = [5, 10, 15, 20];
    const snapped = validYears.reduce((prev, curr) =>
      Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
    );
    setSelectedYear(snapped);
    onTimeSelect?.(snapped);
  };

  const handlePredictionSelect = (prediction: DiseasePrediction) => {
    setSelectedPrediction(prev => prev === prediction.id ? null : prediction.id);
    onPredictionSelect?.(prediction);
  };

  // Calculate summary stats
  const stats = useMemo(() => {
    const avgRisk = predictions.reduce((acc, p) => acc + p.baselineRisk, 0) / predictions.length;
    const avgRiskWithIntervention = predictions.reduce((acc, p) => acc + p.riskWithIntervention, 0) / predictions.length;
    const criticalCount = predictions.filter(p => p.severity === 'critical').length;

    return {
      avgRisk,
      avgRiskWithIntervention,
      riskReduction: avgRisk - avgRiskWithIntervention,
      criticalCount
    };
  }, [predictions]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <Card variant="glass" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <HeartbeatWrapper continuous>
              <span className="text-3xl">⏳</span>
            </HeartbeatWrapper>
            Risk Timeline - Próximos {timeHorizon} Anos
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <motion.div
              className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {predictions.length}
              </p>
              <p className="text-sm text-neutral-500">Predições</p>
            </motion.div>

            <motion.div
              className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <PulseWrapper intensity="subtle" speed="slow" continuous={stats.criticalCount > 0}>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {stats.criticalCount}
                </p>
              </PulseWrapper>
              <p className="text-sm text-red-600/70">Riscos Críticos</p>
            </motion.div>

            <motion.div
              className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {Math.round(stats.avgRisk * 100)}%
              </p>
              <p className="text-sm text-amber-600/70">Risco Médio Basal</p>
            </motion.div>

            <motion.div
              className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                -{Math.round(stats.riskReduction * 100)}%
              </p>
              <p className="text-sm text-emerald-600/70">Redução Possível</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Visualization */}
      <Card variant="default" padding="lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            Projeção de Riscos
          </CardTitle>

          <div className="flex items-center gap-4">
            {/* Toggle intervention view */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showInterventions}
                onChange={(e) => setShowInterventions(e.target.checked)}
                className="sr-only"
              />
              <div className={cn(
                'w-10 h-6 rounded-full transition-colors',
                showInterventions ? 'bg-brand-primary-500' : 'bg-neutral-300 dark:bg-neutral-600'
              )}>
                <motion.div
                  className="w-4 h-4 bg-white rounded-full mt-1"
                  animate={{ x: showInterventions ? 22 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Mostrar com intervenções
              </span>
            </label>
          </div>
        </CardHeader>

        <CardContent>
          {/* SVG Chart */}
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full min-w-[600px]"
              style={{ height: 350 }}
            >
              <defs>
                {/* Grid pattern */}
                <pattern id="grid" width="50" height="30" patternUnits="userSpaceOnUse">
                  <path
                    d="M 50 0 L 0 0 0 30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-neutral-200 dark:text-neutral-700"
                  />
                </pattern>
              </defs>

              {/* Background grid */}
              <rect
                x={padding.left}
                y={padding.top}
                width={chartWidth}
                height={chartHeight}
                fill="url(#grid)"
              />

              {/* Y-axis */}
              <g transform={`translate(${padding.left}, ${padding.top})`}>
                {[0, 25, 50, 75, 100].map((tick) => (
                  <g key={tick} transform={`translate(0, ${chartHeight - (tick / 100) * chartHeight})`}>
                    <line
                      x1={-8}
                      x2={0}
                      stroke="currentColor"
                      className="text-neutral-400"
                    />
                    <text
                      x={-12}
                      y={4}
                      textAnchor="end"
                      className="text-xs fill-neutral-500"
                    >
                      {tick}%
                    </text>
                  </g>
                ))}
                <text
                  x={-35}
                  y={chartHeight / 2}
                  textAnchor="middle"
                  transform={`rotate(-90, -35, ${chartHeight / 2})`}
                  className="text-xs fill-neutral-500"
                >
                  Probabilidade de Risco
                </text>
              </g>

              {/* X-axis */}
              <g transform={`translate(${padding.left}, ${padding.top + chartHeight})`}>
                {Array.from({ length: timeHorizon + 1 }, (_, i) => i).filter(i => i % 5 === 0).map((year) => (
                  <g key={year} transform={`translate(${(year / timeHorizon) * chartWidth}, 0)`}>
                    <line
                      y1={0}
                      y2={8}
                      stroke="currentColor"
                      className="text-neutral-400"
                    />
                    <text
                      y={25}
                      textAnchor="middle"
                      className="text-xs fill-neutral-500"
                    >
                      {year === 0 ? 'Hoje' : `${year}a`}
                    </text>
                  </g>
                ))}
              </g>

              {/* Interventions */}
              {showInterventions && (
                <g transform={`translate(${padding.left}, ${padding.top})`}>
                  {interventions.map((intervention) => (
                    <InterventionMarker
                      key={intervention.id}
                      intervention={intervention}
                      timeHorizon={timeHorizon}
                      width={chartWidth}
                    />
                  ))}
                </g>
              )}

              {/* Risk waves */}
              <g transform={`translate(${padding.left}, ${padding.top})`}>
                {predictions.map((prediction) => (
                  <RiskWave
                    key={prediction.id}
                    prediction={prediction}
                    timeHorizon={timeHorizon}
                    showWithIntervention={showInterventions}
                    width={chartWidth}
                    height={chartHeight}
                    isSelected={selectedPrediction === prediction.id}
                    onSelect={() => handlePredictionSelect(prediction)}
                  />
                ))}
              </g>

              {/* Milestones */}
              <g transform={`translate(${padding.left}, ${padding.top})`}>
                {milestones.map((milestone, index) => (
                  <MilestoneMarker
                    key={index}
                    milestone={milestone}
                    timeHorizon={timeHorizon}
                    width={chartWidth}
                    height={chartHeight}
                  />
                ))}
              </g>

              {/* Current year indicator */}
              <motion.line
                x1={padding.left + (selectedYear / timeHorizon) * chartWidth}
                y1={padding.top}
                x2={padding.left + (selectedYear / timeHorizon) * chartWidth}
                y2={padding.top + chartHeight}
                stroke="#3B82F6"
                strokeWidth={2}
                strokeDasharray="4 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </svg>
          </div>

          {/* Timeline scrubber */}
          <div className="mt-6 px-[50px]">
            <TimelineScrubber
              currentYear={selectedYear}
              maxYear={timeHorizon}
              onChange={handleYearChange}
            />
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-red-500 rounded" />
              <span className="text-neutral-600 dark:text-neutral-400">Sem intervenção</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-red-500 rounded" style={{ borderStyle: 'dashed' }} />
              <span className="text-neutral-600 dark:text-neutral-400">Com intervenção</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-neutral-600 dark:text-neutral-400">Intervenção</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center text-[8px]">🔍</div>
              <span className="text-neutral-600 dark:text-neutral-400">Milestone</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {predictions.map((prediction, index) => (
          <PredictionCard
            key={prediction.id}
            prediction={prediction}
            isSelected={selectedPrediction === prediction.id}
            onSelect={() => handlePredictionSelect(prediction)}
            index={index}
          />
        ))}
      </div>

      {/* Selected Year Summary */}
      <AnimatePresence>
        {selectedYear < timeHorizon && (
          <SlideTransition show={true} direction="up">
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  Projeção para Ano {selectedYear}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {predictions.map((prediction) => {
                    const timePoint = prediction.timePoints.find(t => t.year === selectedYear);
                    if (!timePoint) return null;

                    const config = severityColors[prediction.severity];

                    return (
                      <div
                        key={prediction.id}
                        className={cn('p-4 rounded-lg', config.bg)}
                      >
                        <h4 className="font-semibold">{prediction.disease}</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Sem intervenção:</span>
                            <span className="font-medium text-red-600">
                              {Math.round(timePoint.riskWithoutIntervention * 100)}%
                            </span>
                          </div>
                          {showInterventions && (
                            <div className="flex justify-between">
                              <span className="text-neutral-500">Com intervenção:</span>
                              <span className="font-medium text-emerald-600">
                                {Math.round(timePoint.riskWithIntervention * 100)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </SlideTransition>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RiskTimeline;
