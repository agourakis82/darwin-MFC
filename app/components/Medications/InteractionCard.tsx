'use client';

/**
 * DARWIN-MFC DRUG INTERACTION CARD
 * ==================================
 *
 * A detailed card component for displaying drug-drug interactions
 * with mechanism, clinical effects, and management recommendations.
 *
 * @example
 * ```tsx
 * <InteractionCard
 *   drug1={{ name: "Warfarin", class: "Anticoagulant" }}
 *   drug2={{ name: "Aspirin", class: "Antiplatelet" }}
 *   severity="major"
 *   mechanism="Synergistic anticoagulant effect"
 *   clinicalEffect="Increased risk of bleeding"
 *   management="Monitor INR closely, consider dose adjustment"
 * />
 * ```
 */

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ban,
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  Pill,
  ArrowLeftRight,
  Stethoscope,
  Shield,
  FileText,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { type InteractionSeverity } from './InteractionBadge';

// =============================================================================
// TYPES
// =============================================================================

export interface DrugInfo {
  /** Drug name */
  name: string;

  /** Drug class or category */
  class?: string;

  /** ATC code */
  atcCode?: string;

  /** Generic name (if name is brand) */
  genericName?: string;
}

export type InteractionType =
  | 'pharmacokinetic'
  | 'pharmacodynamic'
  | 'additive'
  | 'synergistic'
  | 'antagonistic'
  | 'unknown';

export type InteractionOnset = 'immediate' | 'rapid' | 'delayed' | 'variable' | 'unknown';

export interface InteractionCardProps {
  /** First drug in the interaction */
  drug1: DrugInfo;

  /** Second drug in the interaction */
  drug2: DrugInfo;

  /** Interaction severity */
  severity: InteractionSeverity;

  /** Type of interaction */
  interactionType?: InteractionType;

  /** Mechanism of interaction */
  mechanism?: string;

  /** Clinical effect/outcome */
  clinicalEffect?: string;

  /** Management recommendations */
  management?: string;

  /** Onset timing */
  onset?: InteractionOnset;

  /** Evidence level (A, B, C, D) */
  evidenceLevel?: 'A' | 'B' | 'C' | 'D';

  /** Source references */
  references?: string[];

  /** Whether card is initially expanded */
  defaultExpanded?: boolean;

  /** Show compact version */
  compact?: boolean;

  /** Custom class name */
  className?: string;

  /** Callback when card is clicked */
  onClick?: () => void;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const severityConfig: Record<
  InteractionSeverity,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    accentColor: string;
    icon: LucideIcon;
  }
> = {
  contraindicated: {
    label: 'Contraindicated',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-800',
    accentColor: 'bg-red-500',
    icon: Ban,
  },
  major: {
    label: 'Major',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
    accentColor: 'bg-orange-500',
    icon: AlertTriangle,
  },
  moderate: {
    label: 'Moderate',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
    accentColor: 'bg-amber-500',
    icon: AlertCircle,
  },
  minor: {
    label: 'Minor',
    color: 'text-lime-700 dark:text-lime-400',
    bgColor: 'bg-lime-50 dark:bg-lime-950/30',
    borderColor: 'border-lime-200 dark:border-lime-800',
    accentColor: 'bg-lime-500',
    icon: Info,
  },
  none: {
    label: 'No Interaction',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    accentColor: 'bg-emerald-500',
    icon: Check,
  },
  unknown: {
    label: 'Unknown',
    color: 'text-neutral-600 dark:text-neutral-400',
    bgColor: 'bg-neutral-100 dark:bg-neutral-800/30',
    borderColor: 'border-neutral-200 dark:border-neutral-700',
    accentColor: 'bg-neutral-500',
    icon: Info,
  },
};

const interactionTypeLabels: Record<InteractionType, string> = {
  pharmacokinetic: 'Pharmacokinetic',
  pharmacodynamic: 'Pharmacodynamic',
  additive: 'Additive Effect',
  synergistic: 'Synergistic',
  antagonistic: 'Antagonistic',
  unknown: 'Unknown',
};

const onsetLabels: Record<InteractionOnset, { label: string; description: string }> = {
  immediate: { label: 'Immediate', description: 'Effects occur within minutes' },
  rapid: { label: 'Rapid', description: 'Effects occur within hours' },
  delayed: { label: 'Delayed', description: 'Effects may take days to weeks' },
  variable: { label: 'Variable', description: 'Onset timing varies by individual' },
  unknown: { label: 'Unknown', description: 'Onset timing not well established' },
};

const evidenceLevelColors: Record<string, string> = {
  A: 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30',
  B: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
  C: 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30',
  D: 'text-neutral-600 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-800',
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function DrugPill({ drug, className }: { drug: DrugInfo; className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg',
        'bg-white dark:bg-neutral-800',
        'border border-neutral-200 dark:border-neutral-700',
        className
      )}
    >
      <Pill className="w-4 h-4 text-blue-500 flex-shrink-0" />
      <div className="min-w-0">
        <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
          {drug.name}
        </div>
        {drug.class && (
          <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            {drug.class}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailSection({
  icon: Icon,
  title,
  content,
  className,
}: {
  icon: LucideIcon;
  title: string;
  content: string;
  className?: string;
}) {
  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        <Icon className="w-3.5 h-3.5" />
        {title}
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">{content}</p>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function InteractionCard({
  drug1,
  drug2,
  severity,
  interactionType,
  mechanism,
  clinicalEffect,
  management,
  onset,
  evidenceLevel,
  references,
  defaultExpanded = false,
  compact = false,
  className,
  onClick,
}: InteractionCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const config = severityConfig[severity];
  const Icon = config.icon;

  const hasDetails = mechanism || clinicalEffect || management || (references && references.length > 0);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (hasDetails) {
      setIsExpanded(!isExpanded);
    }
  };

  if (compact) {
    return (
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg border',
          config.borderColor,
          config.bgColor,
          onClick && 'cursor-pointer hover:shadow-md transition-shadow',
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
      >
        <Icon className={cn('w-5 h-5 flex-shrink-0', config.color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
              {drug1.name}
            </span>
            <ArrowLeftRight className="w-3 h-3 text-neutral-400 flex-shrink-0" />
            <span className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
              {drug2.name}
            </span>
          </div>
          {clinicalEffect && (
            <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
              {clinicalEffect}
            </div>
          )}
        </div>
        <span
          className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0',
            config.bgColor,
            config.color
          )}
        >
          {config.label}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl border overflow-hidden',
        config.borderColor,
        'bg-white dark:bg-neutral-900/50',
        'shadow-sm hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      {/* Severity accent bar */}
      <div className={cn('h-1.5', config.accentColor)} />

      {/* Header */}
      <div className="p-4">
        {/* Drugs */}
        <div className="flex items-center gap-3 mb-4">
          <DrugPill drug={drug1} className="flex-1" />
          <div
            className={cn(
              'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
              config.bgColor
            )}
          >
            <ArrowLeftRight className={cn('w-5 h-5', config.color)} />
          </div>
          <DrugPill drug={drug2} className="flex-1" />
        </div>

        {/* Severity and meta info */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium',
                config.bgColor,
                config.color
              )}
            >
              <Icon className="w-4 h-4" />
              {config.label}
            </span>

            {interactionType && interactionType !== 'unknown' && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {interactionTypeLabels[interactionType]}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onset && onset !== 'unknown' && (
              <Tooltip.Provider delayDuration={200}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span className="px-2 py-0.5 rounded text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-help">
                      {onsetLabels[onset].label}
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="z-50 px-2 py-1 text-xs bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700"
                      sideOffset={5}
                    >
                      {onsetLabels[onset].description}
                      <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            )}

            {evidenceLevel && (
              <span
                className={cn(
                  'px-2 py-0.5 rounded text-xs font-bold',
                  evidenceLevelColors[evidenceLevel]
                )}
              >
                Level {evidenceLevel}
              </span>
            )}
          </div>
        </div>

        {/* Quick clinical effect */}
        {clinicalEffect && !isExpanded && (
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {clinicalEffect}
          </p>
        )}
      </div>

      {/* Expandable details */}
      {hasDetails && (
        <>
          <button
            type="button"
            onClick={handleClick}
            className={cn(
              'w-full flex items-center justify-between px-4 py-2',
              'border-t border-neutral-200 dark:border-neutral-700/50',
              'text-xs font-medium text-neutral-600 dark:text-neutral-400',
              'hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors'
            )}
          >
            <span>{isExpanded ? 'Hide Details' : 'Show Details'}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
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
                <div className="p-4 pt-2 space-y-4 border-t border-neutral-200 dark:border-neutral-700/50">
                  {mechanism && (
                    <DetailSection
                      icon={Stethoscope}
                      title="Mechanism"
                      content={mechanism}
                    />
                  )}

                  {clinicalEffect && (
                    <DetailSection
                      icon={AlertCircle}
                      title="Clinical Effect"
                      content={clinicalEffect}
                    />
                  )}

                  {management && (
                    <DetailSection
                      icon={Shield}
                      title="Management"
                      content={management}
                    />
                  )}

                  {references && references.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        <FileText className="w-3.5 h-3.5" />
                        References
                      </div>
                      <ul className="space-y-1">
                        {references.map((ref, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400"
                          >
                            <span className="text-neutral-400">[{index + 1}]</span>
                            <span>{ref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

/**
 * Summary card for multiple interactions
 */
export function InteractionSummaryCard({
  drug: drugName,
  interactions,
  className,
}: {
  drug: string;
  interactions: Array<{
    otherDrug: string;
    severity: InteractionSeverity;
  }>;
  className?: string;
}) {
  const severityCounts = interactions.reduce(
    (acc, { severity }) => {
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    },
    {} as Record<InteractionSeverity, number>
  );

  const orderedSeverities: InteractionSeverity[] = [
    'contraindicated',
    'major',
    'moderate',
    'minor',
  ];

  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'bg-white dark:bg-neutral-900/50',
        className
      )}
    >
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            {drugName}
          </h3>
          <span className="px-2 py-0.5 rounded-full text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
            {interactions.length} interactions
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {orderedSeverities.map((severity) => {
            const count = severityCounts[severity];
            if (!count) return null;
            const config = severityConfig[severity];
            return (
              <span
                key={severity}
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                  config.bgColor,
                  config.color
                )}
              >
                {count}x {config.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InteractionCard;
