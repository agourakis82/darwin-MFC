'use client';

import { ReactNode } from 'react';
import { ChevronDown, BookOpen, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type EvidenceLevel = 'meta_analysis' | 'rct' | 'cohort' | 'case_series' | 'expert_opinion';
export type ConvergenceStatus = 'full' | 'partial' | 'divergence' | 'disputed';

interface Evidence {
  level: EvidenceLevel;
  title: string;
  description: string;
  updated: Date;
}

interface GuidelineRecommendation {
  guideline: 'SUS' | 'USPSTF' | 'NHS' | 'WHO' | 'NP-NCD';
  status: ConvergenceStatus;
  details: string;
}

export interface EvidenceCardProps {
  evidence: Evidence;
  guidelines: GuidelineRecommendation[];
  mainRecommendation: string;
  referencesCount?: number;
  relatedCount?: number;
  isExpanded?: boolean;
  onToggle?: () => void;
  density?: 'comfortable' | 'compact' | 'clinical';
  className?: string;
}

// Darwin Medical Hub Evidence Level Configuration
const evidenceLevelConfig: Record<EvidenceLevel, { label: string; bgColor: string; borderColor: string; description: string }> = {
  meta_analysis: {
    label: 'Meta-analysis',
    bgColor: 'bg-guanine-green',
    borderColor: 'border-l-guanine-green',
    description: 'Strongest evidence',
  },
  rct: {
    label: 'RCT',
    bgColor: 'bg-adenine-teal',
    borderColor: 'border-l-adenine-teal',
    description: 'Strong evidence',
  },
  cohort: {
    label: 'Cohort Study',
    bgColor: 'bg-thymine-gold',
    borderColor: 'border-l-thymine-gold',
    description: 'Moderate evidence',
  },
  case_series: {
    label: 'Case Series',
    bgColor: 'bg-orange-500',
    borderColor: 'border-l-orange-500',
    description: 'Limited evidence',
  },
  expert_opinion: {
    label: 'Expert Opinion',
    bgColor: 'bg-critical-red-500',
    borderColor: 'border-l-critical-red-500',
    description: 'Weakest evidence',
  },
};

// Darwin Medical Hub Convergence Configuration
const convergenceConfig: Record<ConvergenceStatus, { label: string; barColor: string; textColor: string }> = {
  full: {
    label: 'Full Agreement',
    barColor: 'bg-guanine-green',
    textColor: 'text-guanine-green',
  },
  partial: {
    label: 'Partial Agreement',
    barColor: 'bg-thymine-gold',
    textColor: 'text-thymine-gold',
  },
  divergence: {
    label: 'Divergence',
    barColor: 'bg-critical-red-500',
    textColor: 'text-critical-red-500',
  },
  disputed: {
    label: 'Disputed',
    barColor: 'bg-purple-600',
    textColor: 'text-purple-600',
  },
};

export function EvidenceCard({
  evidence,
  guidelines,
  mainRecommendation,
  referencesCount = 0,
  relatedCount = 0,
  isExpanded = false,
  onToggle,
  density = 'comfortable',
  className,
}: EvidenceCardProps) {
  const config = evidenceLevelConfig[evidence.level];
  const paddingClass = {
    comfortable: 'p-6',
    compact: 'p-4',
    clinical: 'p-3',
  }[density];

  const updatedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(evidence.updated);

  return (
    <div
      className={cn(
        'card-darwin transition-all duration-300',
        'border-l-4',
        config.borderColor,
        paddingClass,
        className
      )}
    >
      {/* Header with Evidence Level */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              config.bgColor,
              'text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap'
            )}
          >
            {config.label}
          </div>
          <span className="text-xs text-carbon-500 dark:text-carbon-400 whitespace-nowrap font-mono">
            Updated: {updatedDate}
          </span>
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

      {/* Main Content */}
      <div className={cn(density !== 'compact' && 'mb-4')}>
        <h3 className={cn(
          'font-display font-semibold text-helix-navy dark:text-white',
          density === 'comfortable' && 'text-lg mb-2',
          density === 'compact' && 'text-base mb-1',
          density === 'clinical' && 'text-sm'
        )}>
          {evidence.title}
        </h3>

        {/* Main Recommendation */}
        <div className={cn(
          'p-4 rounded-xl',
          'bg-adenine-teal/10 dark:bg-adenine-teal/20',
          'border border-adenine-teal/30 dark:border-cytosine-cyan/30',
          density === 'compact' && 'p-3',
          density === 'clinical' && 'p-2'
        )}>
          <p className="text-sm font-semibold text-helix-navy dark:text-white flex items-center gap-2">
            <span className="w-5 h-5 bg-adenine-teal rounded-full flex items-center justify-center text-white text-xs">✓</span>
            Key Recommendation
          </p>
          <p className={cn(
            'text-carbon-600 dark:text-carbon-300 mt-2 leading-relaxed font-body',
            density === 'clinical' && 'text-xs'
          )}>
            {mainRecommendation}
          </p>
        </div>
      </div>

      {/* Guideline Convergence - Always Show Summary */}
      <div className={cn(density !== 'clinical' && 'mb-4')}>
        <p className="text-xs font-bold text-carbon-500 dark:text-carbon-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-4 h-4 bg-helix-navy dark:bg-cytosine-cyan rounded flex items-center justify-center text-white text-[10px]">G</span>
          Guideline Convergence
        </p>
        <div className="space-y-2">
          {guidelines.map((g) => {
            const convergence = convergenceConfig[g.status];
            const fillPercentage = {
              full: 100,
              partial: 70,
              divergence: 50,
              disputed: 30,
            }[g.status];

            return (
              <div key={g.guideline} className="flex items-center gap-3">
                <span className="text-sm font-mono font-medium text-helix-navy dark:text-white w-16">
                  {g.guideline}
                </span>
                <div className="flex-1 h-2 bg-carbon-200 dark:bg-carbon-700 rounded-full overflow-hidden">
                  <div
                    className={cn(convergence.barColor, 'h-full rounded-full transition-all')}
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
                <span className={cn('text-xs font-medium w-24 text-right', convergence.textColor)}>
                  {convergence.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Content - Guidelines Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-carbon-200 dark:border-carbon-700 space-y-3">
          <p className="text-xs font-bold text-carbon-500 dark:text-carbon-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-4 bg-guanine-green rounded flex items-center justify-center text-white text-[10px]">D</span>
            Guideline Details
          </p>
          {guidelines.map((g) => (
            <details key={g.guideline} className="group">
              <summary className="text-sm font-semibold text-helix-navy dark:text-white cursor-pointer hover:text-adenine-teal dark:hover:text-cytosine-cyan transition-colors">
                {g.guideline}
              </summary>
              <p className="text-sm text-carbon-600 dark:text-carbon-400 mt-2 ml-4 leading-relaxed font-body">
                {g.details}
              </p>
            </details>
          ))}
        </div>
      )}

      {/* Footer with Actions */}
      <div className={cn(
        'flex items-center gap-3 text-xs text-carbon-500 dark:text-carbon-400 mt-4 pt-3 border-t border-carbon-200 dark:border-carbon-700',
        density === 'clinical' && 'text-[10px]'
      )}>
        {referencesCount > 0 && (
          <button className="flex items-center gap-1.5 hover:text-adenine-teal dark:hover:text-cytosine-cyan transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            References ({referencesCount})
          </button>
        )}
        {relatedCount > 0 && (
          <button className="flex items-center gap-1.5 hover:text-adenine-teal dark:hover:text-cytosine-cyan transition-colors">
            <LinkIcon className="w-3.5 h-3.5" />
            Related ({relatedCount})
          </button>
        )}
      </div>
    </div>
  );
}

export default EvidenceCard;
