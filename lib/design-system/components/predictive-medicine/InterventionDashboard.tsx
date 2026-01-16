/**
 * INTERVENTION DASHBOARD
 * ======================
 *
 * Dashboard revolucionário para medicina preventiva preditiva
 * Visualização de intervenções personalizadas com micro-interações avançadas
 *
 * Criado com o skill: genius-creative-uiux
 *
 * Features:
 * - Risk stratification com visualização animada
 * - Intervention cards com progresso e feedback
 * - Priority actions timeline com staggered animations
 * - Multi-omic integration overview
 * - Accessibility compliant (prefers-reduced-motion)
 *
 * @example
 * ```tsx
 * import { InterventionDashboard } from '@/lib/design-system/components/predictive-medicine/InterventionDashboard';
 *
 * <InterventionDashboard
 *   interventions={interventions}
 *   riskStratification={riskStratification}
 *   priorityActions={priorityActions}
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
  SuccessCheckmark,
  HeartbeatWrapper
} from '@/lib/design-system/animations/feedback';
import {
  FadeTransition,
  SlideTransition,
  ScaleTransition,
  CollapseTransition
} from '@/lib/design-system/animations/transitions';

// ============================================================================
// TYPES
// ============================================================================

interface Intervention {
  category: 'nutrition' | 'exercise' | 'sleep' | 'stress' | 'medication' | 'supplement' | 'monitoring';
  specificAction: string;
  dosage?: string;
  frequency: string;
  duration: string;
  priority: 'high' | 'medium' | 'low';
  evidence: number; // 0-1
  costEffectiveness: number; // 0-1
  barriers: string[];
  facilitators: string[];
}

interface PersonalizedIntervention {
  id: string;
  patientId: string;
  targetDisease: string;
  type: 'preventive' | 'early-detection' | 'risk-reduction';
  interventions: Intervention[];
  timeline: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
  };
  expectedOutcomes: {
    riskReduction: number;
    qualityOfLifeImprovement: number;
    longevityGain: number;
    costSaving: number;
  };
  adherenceSupport: {
    strategies: string[];
    tracking: string[];
    reminders: string[];
    incentives: string[];
  };
}

interface RiskStratification {
  high: number;
  moderate: number;
  low: number;
  priority: string[];
}

interface PriorityAction {
  category: string;
  action: string;
  expectedImpact: number;
  timeline: string;
}

interface InterventionDashboardProps {
  interventions: PersonalizedIntervention[];
  riskStratification: RiskStratification;
  priorityActions: PriorityAction[];
  patientName?: string;
  className?: string;
}

// ============================================================================
// DESIGN TOKENS - Medicina Preventiva
// ============================================================================

const tokens = {
  colors: {
    risk: {
      high: {
        bg: 'bg-red-50 dark:bg-red-950/30',
        border: 'border-red-500',
        text: 'text-red-700 dark:text-red-300',
        glow: 'rgba(239, 68, 68, 0.5)',
      },
      moderate: {
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        border: 'border-amber-500',
        text: 'text-amber-700 dark:text-amber-300',
        glow: 'rgba(245, 158, 11, 0.5)',
      },
      low: {
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        border: 'border-emerald-500',
        text: 'text-emerald-700 dark:text-emerald-300',
        glow: 'rgba(16, 185, 129, 0.5)',
      },
    },
    category: {
      nutrition: { icon: '🥗', color: 'bg-green-500', label: 'Nutrição' },
      exercise: { icon: '🏃', color: 'bg-blue-500', label: 'Exercício' },
      sleep: { icon: '😴', color: 'bg-indigo-500', label: 'Sono' },
      stress: { icon: '🧘', color: 'bg-purple-500', label: 'Estresse' },
      medication: { icon: '💊', color: 'bg-rose-500', label: 'Medicação' },
      supplement: { icon: '🧬', color: 'bg-cyan-500', label: 'Suplemento' },
      monitoring: { icon: '📊', color: 'bg-orange-500', label: 'Monitoramento' },
    },
  },
  animation: {
    stagger: 0.1,
    duration: {
      fast: 0.15,
      normal: 0.3,
      slow: 0.5,
    },
    spring: {
      stiffness: 300,
      damping: 25,
    },
  },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Risk Gauge - Visualização circular animada do risco
 */
const RiskGauge: React.FC<{
  value: number;
  label: string;
  color: keyof typeof tokens.colors.risk;
  size?: 'sm' | 'md' | 'lg';
}> = ({ value, label, color, size = 'md' }) => {
  const shouldReduceMotion = useReducedMotion();
  const colorConfig = tokens.colors.risk[color];

  const sizeConfig = {
    sm: { dimension: 80, stroke: 6, fontSize: 'text-lg' },
    md: { dimension: 120, stroke: 8, fontSize: 'text-2xl' },
    lg: { dimension: 160, stroke: 10, fontSize: 'text-3xl' },
  };

  const { dimension, stroke, fontSize } = sizeConfig[size];
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center">
      <svg
        width={dimension}
        height={dimension}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-neutral-200 dark:text-neutral-700"
        />

        {/* Progress circle */}
        <motion.circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          className={colorConfig.text}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{
            strokeDasharray: shouldReduceMotion
              ? `${progress} ${circumference - progress}`
              : `${progress} ${circumference - progress}`
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.5,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      </svg>

      {/* Center value */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: 0.3 }}
      >
        <span className={cn(fontSize, 'font-bold', colorConfig.text)}>
          {value}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          {label}
        </span>
      </motion.div>
    </div>
  );
};

/**
 * Risk Stratification Overview - Visão geral com 3 gauges
 */
const RiskStratificationOverview: React.FC<{
  stratification: RiskStratification;
}> = ({ stratification }) => {
  const shouldReduceMotion = useReducedMotion();
  const total = stratification.high + stratification.moderate + stratification.low;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    },
  };

  return (
    <Card variant="glass" padding="lg" className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartbeatWrapper continuous>
            <span className="text-2xl">🎯</span>
          </HeartbeatWrapper>
          Estratificação de Risco
        </CardTitle>
      </CardHeader>

      <CardContent>
        <motion.div
          className="grid grid-cols-3 gap-6 mt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <GlowWrapper
              color={tokens.colors.risk.high.glow}
              intensity={stratification.high > 0 ? 'normal' : 'subtle'}
            >
              <RiskGauge
                value={total > 0 ? Math.round((stratification.high / total) * 100) : 0}
                label="Alto Risco"
                color="high"
              />
            </GlowWrapper>
            <span className="mt-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {stratification.high} doenças
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <RiskGauge
              value={total > 0 ? Math.round((stratification.moderate / total) * 100) : 0}
              label="Moderado"
              color="moderate"
            />
            <span className="mt-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {stratification.moderate} doenças
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <RiskGauge
              value={total > 0 ? Math.round((stratification.low / total) * 100) : 0}
              label="Baixo"
              color="low"
            />
            <span className="mt-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {stratification.low} doenças
            </span>
          </motion.div>
        </motion.div>

        {/* Priority diseases */}
        {stratification.priority.length > 0 && (
          <motion.div
            className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
              Prioridades de Atenção:
            </p>
            <div className="flex flex-wrap gap-2">
              {stratification.priority.map((disease, index) => (
                <motion.span
                  key={disease}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    tokens.colors.risk.high.bg,
                    tokens.colors.risk.high.text
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  {disease}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Intervention Card - Card individual de intervenção com micro-interações
 */
const InterventionCard: React.FC<{
  intervention: PersonalizedIntervention;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ intervention, index, isExpanded, onToggle }) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const toggleActionComplete = (actionId: string) => {
    setCompletedActions(prev => {
      const next = new Set(prev);
      if (next.has(actionId)) {
        next.delete(actionId);
      } else {
        next.add(actionId);
      }
      return next;
    });
  };

  const typeConfig = {
    preventive: { icon: '🛡️', label: 'Preventivo', color: 'text-emerald-600' },
    'early-detection': { icon: '🔍', label: 'Detecção Precoce', color: 'text-blue-600' },
    'risk-reduction': { icon: '📉', label: 'Redução de Risco', color: 'text-amber-600' },
  };

  const config = typeConfig[intervention.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: shouldReduceMotion ? 0 : index * tokens.animation.stagger,
        duration: tokens.animation.duration.normal,
      }}
    >
      <Card
        variant="elevated"
        padding="none"
        interactive
        className="overflow-hidden"
        onClick={onToggle}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.span
                className="text-3xl"
                animate={isExpanded ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {config.icon}
              </motion.span>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {intervention.targetDisease}
                </h3>
                <span className={cn('text-sm font-medium', config.color)}>
                  {config.label}
                </span>
              </div>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-neutral-400"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-neutral-500 mb-1">
              <span>Progresso das Intervenções</span>
              <span>
                {completedActions.size}/{intervention.interventions.length}
              </span>
            </div>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(completedActions.size / intervention.interventions.length) * 100}%`
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <CollapseTransition show={isExpanded}>
          <div className="p-4 border-t border-neutral-100 dark:border-neutral-800">
            {/* Interventions list */}
            <div className="space-y-3">
              {intervention.interventions.map((action, actionIndex) => {
                const actionId = `${intervention.id}-${actionIndex}`;
                const isComplete = completedActions.has(actionId);
                const categoryConfig = tokens.colors.category[action.category];

                return (
                  <motion.div
                    key={actionId}
                    className={cn(
                      'relative p-3 rounded-lg border transition-all cursor-pointer',
                      isComplete
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700'
                        : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                    )}
                    onMouseEnter={() => setHoveredAction(actionIndex)}
                    onMouseLeave={() => setHoveredAction(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleActionComplete(actionId);
                    }}
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.01 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.99 }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Category icon */}
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg',
                        categoryConfig.color
                      )}>
                        {categoryConfig.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                            {categoryConfig.label}
                          </span>
                          {action.priority === 'high' && (
                            <PulseWrapper intensity="subtle" speed="slow">
                              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium">
                                Alta Prioridade
                              </span>
                            </PulseWrapper>
                          )}
                        </div>

                        <p className={cn(
                          'mt-1 font-medium',
                          isComplete ? 'line-through text-neutral-400' : 'text-neutral-900 dark:text-neutral-100'
                        )}>
                          {action.specificAction}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            {action.frequency}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                            </svg>
                            {action.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            Evidência: {Math.round(action.evidence * 100)}%
                          </span>
                        </div>
                      </div>

                      {/* Completion indicator */}
                      <div className="flex-shrink-0">
                        <AnimatePresence mode="wait">
                          {isComplete ? (
                            <SuccessCheckmark show size={24} color="#10B981" />
                          ) : (
                            <motion.div
                              className="w-6 h-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600"
                              whileHover={{ borderColor: '#10B981' }}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Hover details */}
                    <AnimatePresence>
                      {hoveredAction === actionIndex && !isComplete && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-700"
                        >
                          {action.barriers.length > 0 && (
                            <div className="mb-2">
                              <span className="text-xs font-medium text-red-600 dark:text-red-400">
                                Barreiras:
                              </span>
                              <span className="text-xs text-neutral-500 ml-1">
                                {action.barriers.join(', ')}
                              </span>
                            </div>
                          )}
                          {action.facilitators.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                Facilitadores:
                              </span>
                              <span className="text-xs text-neutral-500 ml-1">
                                {action.facilitators.join(', ')}
                              </span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Expected outcomes */}
            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                Resultados Esperados
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <OutcomeCard
                  icon="📉"
                  label="Redução de Risco"
                  value={`${Math.round(intervention.expectedOutcomes.riskReduction * 100)}%`}
                  color="emerald"
                />
                <OutcomeCard
                  icon="✨"
                  label="Qualidade de Vida"
                  value={`+${Math.round(intervention.expectedOutcomes.qualityOfLifeImprovement * 100)}%`}
                  color="blue"
                />
                <OutcomeCard
                  icon="⏳"
                  label="Longevidade"
                  value={`+${intervention.expectedOutcomes.longevityGain.toFixed(1)} anos`}
                  color="purple"
                />
                <OutcomeCard
                  icon="💰"
                  label="Economia"
                  value={`$${intervention.expectedOutcomes.costSaving.toLocaleString()}`}
                  color="amber"
                />
              </div>
            </div>
          </div>
        </CollapseTransition>
      </Card>
    </motion.div>
  );
};

/**
 * Outcome Card - Mini card para métricas de resultado
 */
const OutcomeCard: React.FC<{
  icon: string;
  label: string;
  value: string;
  color: 'emerald' | 'blue' | 'purple' | 'amber';
}> = ({ icon, label, value, color }) => {
  const colorClasses = {
    emerald: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
    blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
    purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300',
    amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300',
  };

  return (
    <div className={cn(
      'p-3 rounded-lg',
      colorClasses[color]
    )}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <div>
          <p className="text-xs opacity-70">{label}</p>
          <p className="font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Priority Actions Timeline - Timeline animado de ações prioritárias
 */
const PriorityActionsTimeline: React.FC<{
  actions: PriorityAction[];
}> = ({ actions }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const
      }
    },
  };

  return (
    <Card variant="default" padding="lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          Ações Prioritárias
        </CardTitle>
      </CardHeader>

      <CardContent>
        <motion.div
          className="relative mt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary-500 via-purple-500 to-emerald-500" />

          {/* Timeline items */}
          <div className="space-y-4">
            {actions.map((action, index) => {
              const categoryConfig = tokens.colors.category[action.category as keyof typeof tokens.colors.category] || {
                icon: '📋',
                color: 'bg-neutral-500',
                label: action.category,
              };

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex items-start gap-4 pl-10"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={cn(
                      'absolute left-2 w-5 h-5 rounded-full flex items-center justify-center text-xs',
                      categoryConfig.color
                    )}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <span className="text-white text-[10px]">{index + 1}</span>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{categoryConfig.icon}</span>
                      <span className="text-xs font-medium text-neutral-500 uppercase">
                        {categoryConfig.label}
                      </span>
                    </div>

                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      {action.action}
                    </p>

                    <div className="mt-2 flex items-center gap-4 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                        </svg>
                        Impacto: {Math.round(action.expectedImpact * 100)}%
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        {action.timeline}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const InterventionDashboard: React.FC<InterventionDashboardProps> = ({
  interventions,
  riskStratification,
  priorityActions,
  patientName,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(prev => prev === id ? null : id);
  };

  // Stats calculations
  const totalInterventions = useMemo(() =>
    interventions.reduce((acc, i) => acc + i.interventions.length, 0),
    [interventions]
  );

  const highPriorityCount = useMemo(() =>
    interventions.reduce((acc, i) =>
      acc + i.interventions.filter(a => a.priority === 'high').length, 0
    ),
    [interventions]
  );

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Plano de Intervenções
              {patientName && (
                <span className="text-brand-primary-600 ml-2">
                  {patientName}
                </span>
              )}
            </h1>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
              Medicina preventiva personalizada baseada em análise multi-ômica
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-primary-600">
                {totalInterventions}
              </p>
              <p className="text-xs text-neutral-500">Intervenções</p>
            </div>
            <div className="text-center">
              <PulseWrapper intensity="subtle" speed="slow" continuous={highPriorityCount > 0}>
                <p className="text-3xl font-bold text-red-600">
                  {highPriorityCount}
                </p>
              </PulseWrapper>
              <p className="text-xs text-neutral-500">Alta Prioridade</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Risk overview & Priority actions */}
        <div className="space-y-6">
          <RiskStratificationOverview stratification={riskStratification} />
          <PriorityActionsTimeline actions={priorityActions} />
        </div>

        {/* Right column - Intervention cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
            <span className="text-xl">💉</span>
            Intervenções por Doença
          </h2>

          {interventions.map((intervention, index) => (
            <InterventionCard
              key={intervention.id}
              intervention={intervention}
              index={index}
              isExpanded={expandedCard === intervention.id}
              onToggle={() => toggleCard(intervention.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterventionDashboard;
