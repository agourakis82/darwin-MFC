'use client';

/**
 * DARWIN-MFC EVIDENCE STRENGTH CARD
 * ==================================
 *
 * A detailed card component for displaying GRADE evidence quality
 * with full methodology breakdown, study types, and confidence intervals.
 *
 * @example
 * ```tsx
 * <EvidenceStrengthCard
 *   level="A"
 *   recommendation="Strong recommendation"
 *   studyDesign="meta-analysis"
 *   sampleSize={15420}
 *   citations={['Smith 2023', 'Jones 2024']}
 * />
 * ```
 */

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  CircleDot,
  Circle,
  HelpCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Users,
  FileText,
  BarChart3,
  BookOpen,
  ExternalLink,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { type EvidenceLevel } from './EvidenceStrengthBadge';

// =============================================================================
// TYPES
// =============================================================================

export type StudyDesign =
  | 'meta-analysis'
  | 'systematic-review'
  | 'rct'
  | 'cohort'
  | 'case-control'
  | 'cross-sectional'
  | 'case-series'
  | 'case-report'
  | 'expert-opinion';

export type RecommendationStrength = 'strong-for' | 'weak-for' | 'weak-against' | 'strong-against';

export interface GradeFactors {
  riskOfBias?: 'low' | 'moderate' | 'high' | 'unclear';
  inconsistency?: 'none' | 'serious' | 'very-serious';
  indirectness?: 'none' | 'serious' | 'very-serious';
  imprecision?: 'none' | 'serious' | 'very-serious';
  publicationBias?: 'none' | 'suspected' | 'likely';
}

export interface ConfidenceInterval {
  effect: number;
  lower: number;
  upper: number;
  unit?: string;
}

export interface EvidenceStrengthCardProps {
  /** Evidence level (A, B, C, D, or GPP) */
  level: EvidenceLevel;

  /** Recommendation text */
  recommendation?: string;

  /** Recommendation strength */
  recommendationStrength?: RecommendationStrength;

  /** Primary study design type */
  studyDesign?: StudyDesign;

  /** Total sample size across studies */
  sampleSize?: number;

  /** Number of studies included */
  studyCount?: number;

  /** Citation references */
  citations?: string[];

  /** GRADE methodology factors */
  gradeFactors?: GradeFactors;

  /** Confidence interval for effect estimate */
  confidenceInterval?: ConfidenceInterval;

  /** Additional notes or limitations */
  notes?: string;

  /** Whether card is initially expanded */
  defaultExpanded?: boolean;

  /** Custom class name */
  className?: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const evidenceConfig: Record<
  EvidenceLevel,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    accentColor: string;
    icon: React.ElementType;
  }
> = {
  A: {
    label: 'High Quality',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    accentColor: 'bg-emerald-500',
    icon: CheckCircle2,
  },
  B: {
    label: 'Moderate Quality',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    borderColor: 'border-amber-200 dark:border-amber-800',
    accentColor: 'bg-amber-500',
    icon: CircleDot,
  },
  C: {
    label: 'Low Quality',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/50',
    borderColor: 'border-orange-200 dark:border-orange-800',
    accentColor: 'bg-orange-500',
    icon: Circle,
  },
  D: {
    label: 'Very Low Quality',
    color: 'text-neutral-600 dark:text-neutral-400',
    bgColor: 'bg-neutral-100 dark:bg-neutral-800/50',
    borderColor: 'border-neutral-200 dark:border-neutral-700',
    accentColor: 'bg-neutral-500',
    icon: HelpCircle,
  },
  GPP: {
    label: 'Good Practice Point',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    borderColor: 'border-blue-200 dark:border-blue-800',
    accentColor: 'bg-blue-500',
    icon: Info,
  },
};

const studyDesignLabels: Record<StudyDesign, { label: string; icon: React.ElementType }> = {
  'meta-analysis': { label: 'Meta-Analysis', icon: BarChart3 },
  'systematic-review': { label: 'Systematic Review', icon: BookOpen },
  rct: { label: 'Randomized Controlled Trial', icon: FileText },
  cohort: { label: 'Cohort Study', icon: Users },
  'case-control': { label: 'Case-Control Study', icon: FileText },
  'cross-sectional': { label: 'Cross-Sectional Study', icon: FileText },
  'case-series': { label: 'Case Series', icon: FileText },
  'case-report': { label: 'Case Report', icon: FileText },
  'expert-opinion': { label: 'Expert Opinion', icon: HelpCircle },
};

const recommendationStrengthConfig: Record<
  RecommendationStrength,
  { label: string; color: string; icon: React.ElementType }
> = {
  'strong-for': {
    label: 'Strong Recommendation For',
    color: 'text-emerald-600 dark:text-emerald-400',
    icon: TrendingUp,
  },
  'weak-for': {
    label: 'Conditional Recommendation For',
    color: 'text-lime-600 dark:text-lime-400',
    icon: TrendingUp,
  },
  'weak-against': {
    label: 'Conditional Recommendation Against',
    color: 'text-orange-600 dark:text-orange-400',
    icon: TrendingDown,
  },
  'strong-against': {
    label: 'Strong Recommendation Against',
    color: 'text-red-600 dark:text-red-400',
    icon: TrendingDown,
  },
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function GradeFactorRow({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: 'good' | 'concern' | 'serious';
}) {
  const statusColors = {
    good: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30',
    concern: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30',
    serious: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
  };

  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-neutral-600 dark:text-neutral-400">{label}</span>
      <span
        className={cn(
          'px-2 py-0.5 rounded-full text-xs font-medium',
          statusColors[status]
        )}
      >
        {value}
      </span>
    </div>
  );
}

function ConfidenceIntervalDisplay({ ci }: { ci: ConfidenceInterval }) {
  const isPositive = ci.effect > 0;
  const isSignificant = (ci.lower > 0 && ci.upper > 0) || (ci.lower < 0 && ci.upper < 0);

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800/50">
      <div className="flex-shrink-0">
        {isPositive ? (
          <TrendingUp className={cn('w-5 h-5', isSignificant ? 'text-emerald-500' : 'text-neutral-500')} />
        ) : ci.effect < 0 ? (
          <TrendingDown className={cn('w-5 h-5', isSignificant ? 'text-red-500' : 'text-neutral-500')} />
        ) : (
          <Minus className="w-5 h-5 text-neutral-500" />
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Effect: {ci.effect.toFixed(2)} {ci.unit || ''}
        </div>
        <div className="text-xs text-neutral-600 dark:text-neutral-400">
          95% CI: [{ci.lower.toFixed(2)}, {ci.upper.toFixed(2)}]
        </div>
      </div>
      {!isSignificant && (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <AlertTriangle className="w-4 h-4 text-amber-500 cursor-help" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="z-50 px-3 py-2 text-sm bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700"
                sideOffset={5}
              >
                Confidence interval crosses null - effect may not be statistically significant
                <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function EvidenceStrengthCard({
  level,
  recommendation,
  recommendationStrength,
  studyDesign,
  sampleSize,
  studyCount,
  citations,
  gradeFactors,
  confidenceInterval,
  notes,
  defaultExpanded = false,
  className,
}: EvidenceStrengthCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const config = evidenceConfig[level];
  const Icon = config.icon;

  // Safe translation hook with fallback
  let t: (key: string, fallback?: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string, fallback?: string) => {
      try {
        return translations(key);
      } catch {
        return fallback || key;
      }
    };
  } catch {
    t = (_key: string, fallback?: string) => fallback || '';
  }

  const hasDetails = gradeFactors || confidenceInterval || notes || (citations && citations.length > 0);

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
      {/* Accent bar */}
      <div className={cn('h-1', config.accentColor)} />

      {/* Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Level badge */}
          <div
            className={cn(
              'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center',
              config.bgColor
            )}
          >
            <span className={cn('text-xl font-bold', config.color)}>{level}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Icon className={cn('w-4 h-4', config.color)} />
              <span className={cn('text-sm font-semibold', config.color)}>
                {config.label}
              </span>
            </div>

            {recommendation && (
              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2">
                {recommendation}
              </p>
            )}

            {recommendationStrength && (
              <div className="mt-2 flex items-center gap-1.5">
                {(() => {
                  const strengthConfig = recommendationStrengthConfig[recommendationStrength];
                  const StrengthIcon = strengthConfig.icon;
                  return (
                    <>
                      <StrengthIcon className={cn('w-4 h-4', strengthConfig.color)} />
                      <span className={cn('text-xs font-medium', strengthConfig.color)}>
                        {strengthConfig.label}
                      </span>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-neutral-600 dark:text-neutral-400">
          {studyDesign && (
            <div className="flex items-center gap-1">
              {(() => {
                const designConfig = studyDesignLabels[studyDesign];
                const DesignIcon = designConfig.icon;
                return (
                  <>
                    <DesignIcon className="w-3.5 h-3.5" />
                    <span>{designConfig.label}</span>
                  </>
                );
              })()}
            </div>
          )}
          {studyCount && (
            <div className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              <span>{studyCount} studies</span>
            </div>
          )}
          {sampleSize && (
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>n={sampleSize.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Expandable details */}
      {hasDetails && (
        <>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
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
                  {/* GRADE Factors */}
                  {gradeFactors && (
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                        GRADE Quality Factors
                      </h4>
                      <div className="space-y-0.5">
                        {gradeFactors.riskOfBias && (
                          <GradeFactorRow
                            label="Risk of Bias"
                            value={gradeFactors.riskOfBias.replace('-', ' ')}
                            status={
                              gradeFactors.riskOfBias === 'low'
                                ? 'good'
                                : gradeFactors.riskOfBias === 'high'
                                ? 'serious'
                                : 'concern'
                            }
                          />
                        )}
                        {gradeFactors.inconsistency && (
                          <GradeFactorRow
                            label="Inconsistency"
                            value={gradeFactors.inconsistency.replace('-', ' ')}
                            status={
                              gradeFactors.inconsistency === 'none'
                                ? 'good'
                                : gradeFactors.inconsistency === 'very-serious'
                                ? 'serious'
                                : 'concern'
                            }
                          />
                        )}
                        {gradeFactors.indirectness && (
                          <GradeFactorRow
                            label="Indirectness"
                            value={gradeFactors.indirectness.replace('-', ' ')}
                            status={
                              gradeFactors.indirectness === 'none'
                                ? 'good'
                                : gradeFactors.indirectness === 'very-serious'
                                ? 'serious'
                                : 'concern'
                            }
                          />
                        )}
                        {gradeFactors.imprecision && (
                          <GradeFactorRow
                            label="Imprecision"
                            value={gradeFactors.imprecision.replace('-', ' ')}
                            status={
                              gradeFactors.imprecision === 'none'
                                ? 'good'
                                : gradeFactors.imprecision === 'very-serious'
                                ? 'serious'
                                : 'concern'
                            }
                          />
                        )}
                        {gradeFactors.publicationBias && (
                          <GradeFactorRow
                            label="Publication Bias"
                            value={gradeFactors.publicationBias}
                            status={
                              gradeFactors.publicationBias === 'none'
                                ? 'good'
                                : gradeFactors.publicationBias === 'likely'
                                ? 'serious'
                                : 'concern'
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Confidence Interval */}
                  {confidenceInterval && (
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                        Effect Estimate
                      </h4>
                      <ConfidenceIntervalDisplay ci={confidenceInterval} />
                    </div>
                  )}

                  {/* Notes */}
                  {notes && (
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        Notes
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{notes}</p>
                    </div>
                  )}

                  {/* Citations */}
                  {citations && citations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                        References
                      </h4>
                      <ul className="space-y-1">
                        {citations.map((citation, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400"
                          >
                            <span className="text-neutral-400">[{index + 1}]</span>
                            <span>{citation}</span>
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

export default EvidenceStrengthCard;
