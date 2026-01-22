'use client';

import { ReactNode } from 'react';
import { ChevronDown, AlertTriangle, FileText, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InteractionSeverity = 'contraindicated' | 'major' | 'moderate' | 'minor';

interface DrugDosing {
  initial: string;
  maintenance: string;
  maximum: string;
  special?: string;
}

interface DrugInteraction {
  severity: InteractionSeverity;
  drug: string;
  mechanism: string;
  recommendation: string;
}

export interface DrugCardProps {
  name: string;
  className: string;
  indication: string;
  dosing: DrugDosing;
  interactions: DrugInteraction[];
  contraindications?: string[];
  warnings?: string[];
  density?: 'comfortable' | 'compact' | 'clinical';
  isExpanded?: boolean;
  onToggle?: () => void;
  onQuickPrescribe?: () => void;
  containerClassName?: string;
}

// Darwin Medical Hub Severity Configuration
const severityConfig: Record<InteractionSeverity, { label: string; bgColor: string; borderColor: string; icon: string }> = {
  contraindicated: {
    label: 'Contraindicated',
    bgColor: 'bg-critical-red-500/10 dark:bg-critical-red-500/20',
    borderColor: 'border-critical-red-500',
    icon: '⛔',
  },
  major: {
    label: 'Major Interaction',
    bgColor: 'bg-orange-500/10 dark:bg-orange-500/20',
    borderColor: 'border-orange-500',
    icon: '🔶',
  },
  moderate: {
    label: 'Moderate Interaction',
    bgColor: 'bg-thymine-gold/10 dark:bg-thymine-gold/20',
    borderColor: 'border-thymine-gold',
    icon: '⚠️',
  },
  minor: {
    label: 'Minor Interaction',
    bgColor: 'bg-guanine-green/10 dark:bg-guanine-green/20',
    borderColor: 'border-guanine-green',
    icon: '✓',
  },
};

export function DrugCard({
  name,
  className: drugClass,
  indication,
  dosing,
  interactions,
  contraindications = [],
  warnings = [],
  density = 'comfortable',
  isExpanded = false,
  onToggle,
  onQuickPrescribe,
  containerClassName,
}: DrugCardProps) {
  const paddingClass = {
    comfortable: 'p-6',
    compact: 'p-4',
    clinical: 'p-3',
  }[density];

  const majorInteractions = interactions.filter((i) => i.severity === 'contraindicated' || i.severity === 'major');
  const otherInteractions = interactions.filter((i) => i.severity !== 'contraindicated' && i.severity !== 'major');

  return (
    <div className={cn('card-darwin transition-all duration-300', paddingClass, containerClassName)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-guanine-green to-adenine-teal rounded-lg flex items-center justify-center">
              <Pill className="w-4 h-4 text-white" />
            </div>
            <h3 className={cn(
              'font-display font-bold text-helix-navy dark:text-white',
              density === 'comfortable' && 'text-xl',
              density === 'compact' && 'text-lg',
              density === 'clinical' && 'text-base'
            )}>
              {name}
            </h3>
          </div>
          <p className={cn(
            'text-carbon-500 dark:text-carbon-400 font-body',
            density === 'comfortable' && 'text-sm',
            density === 'compact' && 'text-xs',
            density === 'clinical' && 'text-xs'
          )}>
            {drugClass} | {indication}
          </p>
        </div>
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1.5 hover:bg-adenine-teal/10 dark:hover:bg-cytosine-cyan/10 rounded-lg transition-colors flex-shrink-0"
            aria-expanded={isExpanded}
          >
            <ChevronDown
              className={cn(
                'w-5 h-5 text-carbon-500 dark:text-carbon-400 transition-transform',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
        )}
      </div>

      {/* Quick Dosing */}
      {!isExpanded && (
        <div className={cn(
          'bg-adenine-teal/10 dark:bg-adenine-teal/20 rounded-xl p-4 mb-4',
          'border border-adenine-teal/30 dark:border-cytosine-cyan/30'
        )}>
          <p className="text-xs font-semibold text-helix-navy dark:text-white mb-2 flex items-center gap-2">
            <span className="w-4 h-4 bg-cytosine-cyan rounded flex items-center justify-center text-white text-[10px]">⚡</span>
            Quick Dosing
          </p>
          <p className="text-sm font-mono text-carbon-700 dark:text-carbon-300">
            {dosing.initial} → {dosing.maintenance} <span className="text-carbon-500">(max: {dosing.maximum})</span>
          </p>
        </div>
      )}

      {/* Full Dosing - Expanded */}
      {isExpanded && (
        <div className={cn(
          'bg-adenine-teal/10 dark:bg-adenine-teal/20 rounded-xl p-4 mb-4',
          'border border-adenine-teal/30 dark:border-cytosine-cyan/30 space-y-3'
        )}>
          <p className="text-xs font-bold text-helix-navy dark:text-white uppercase tracking-wide flex items-center gap-2">
            <span className="w-4 h-4 bg-adenine-teal rounded flex items-center justify-center text-white text-[10px]">D</span>
            Dosing Protocol
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-carbon-500 dark:text-carbon-400">Initial</span>
              <p className="font-mono font-semibold text-helix-navy dark:text-white">{dosing.initial}</p>
            </div>
            <div>
              <span className="text-xs text-carbon-500 dark:text-carbon-400">Maintenance</span>
              <p className="font-mono font-semibold text-helix-navy dark:text-white">{dosing.maintenance}</p>
            </div>
            <div>
              <span className="text-xs text-carbon-500 dark:text-carbon-400">Maximum</span>
              <p className="font-mono font-semibold text-helix-navy dark:text-white">{dosing.maximum}</p>
            </div>
            {dosing.special && (
              <div className="col-span-2">
                <span className="text-xs text-carbon-500 dark:text-carbon-400">Special Considerations</span>
                <p className="text-xs text-carbon-600 dark:text-carbon-300 font-body">{dosing.special}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Major Interactions - Always Show Summary */}
      {majorInteractions.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-helix-navy dark:text-white uppercase tracking-wide mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-critical-red-500" />
            Major Interactions ({majorInteractions.length})
          </p>
          <div className="space-y-2">
            {majorInteractions.slice(0, density === 'clinical' ? 1 : 2).map((interaction) => {
              const config = severityConfig[interaction.severity];
              return (
                <div
                  key={interaction.drug}
                  className={cn(
                    config.bgColor,
                    'border-l-4',
                    config.borderColor,
                    'rounded-r-xl p-3'
                  )}
                >
                  <p className="font-semibold text-helix-navy dark:text-white text-sm">
                    {config.icon} {interaction.drug}
                  </p>
                  <p className="text-xs text-carbon-600 dark:text-carbon-400 mt-1 font-body">
                    {interaction.mechanism}
                  </p>
                  <p className="text-xs text-adenine-teal dark:text-cytosine-cyan mt-1 font-medium">
                    → {interaction.recommendation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Interactions - Expanded */}
      {isExpanded && otherInteractions.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-helix-navy dark:text-white uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-4 h-4 bg-thymine-gold rounded flex items-center justify-center text-white text-[10px]">i</span>
            Other Interactions ({otherInteractions.length})
          </p>
          <div className="space-y-2">
            {otherInteractions.map((interaction) => {
              const config = severityConfig[interaction.severity];
              return (
                <div
                  key={interaction.drug}
                  className={cn(
                    config.bgColor,
                    'border-l-4',
                    config.borderColor,
                    'rounded-r-xl p-2'
                  )}
                >
                  <p className="font-semibold text-helix-navy dark:text-white text-xs">
                    {config.icon} {interaction.drug}
                  </p>
                  <p className="text-xs text-carbon-600 dark:text-carbon-400 mt-1 font-body">
                    {interaction.mechanism}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Warnings & Contraindications - Expanded */}
      {isExpanded && (contraindications.length > 0 || warnings.length > 0) && (
        <div className="mb-4 space-y-4">
          {contraindications.length > 0 && (
            <div>
              <p className="text-xs font-bold text-critical-red-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                <span className="w-4 h-4 bg-critical-red-500 rounded flex items-center justify-center text-white text-[10px]">⛔</span>
                Contraindications
              </p>
              <ul className="space-y-1 ml-6">
                {contraindications.map((contra, idx) => (
                  <li key={idx} className="text-xs text-carbon-600 dark:text-carbon-300 list-disc font-body">
                    {contra}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {warnings.length > 0 && (
            <div>
              <p className="text-xs font-bold text-thymine-gold uppercase tracking-wide mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Warnings
              </p>
              <ul className="space-y-1 ml-6">
                {warnings.map((warning, idx) => (
                  <li key={idx} className="text-xs text-carbon-600 dark:text-carbon-300 list-disc font-body">
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-carbon-200 dark:border-carbon-700">
        {onQuickPrescribe && (
          <button
            onClick={onQuickPrescribe}
            className="btn-darwin-primary flex-1 flex items-center justify-center gap-2 py-2.5"
          >
            <Pill className="w-4 h-4" />
            <span>Quick Prescribe</span>
          </button>
        )}
        <button className="px-4 py-2.5 text-xs text-carbon-600 dark:text-carbon-400 hover:bg-adenine-teal/10 dark:hover:bg-cytosine-cyan/10 rounded-lg transition-colors flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Full Monograph
        </button>
      </div>
    </div>
  );
}

export default DrugCard;
