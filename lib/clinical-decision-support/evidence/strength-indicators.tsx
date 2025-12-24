/**
 * EVIDENCE STRENGTH INDICATORS
 * ==============================
 *
 * Visual indicators for evidence quality and recommendation strength
 * GRADE system, USPSTF grades, Oxford levels, and custom badges
 *
 * Features:
 * - GRADE system (High, Moderate, Low, Very Low)
 * - USPSTF recommendation grades (A, B, C, D, I)
 * - Oxford levels of evidence (1-5)
 * - Cochrane quality assessment
 * - Visual badges with tooltips
 * - Evidence pyramids
 *
 * @example
 * ```tsx
 * import { EvidenceBadge, EvidencePyramid, GRADEIndicator } from './strength-indicators';
 *
 * <EvidenceBadge grade="A" system="USPSTF" />
 * <GRADEIndicator level="high" />
 * <EvidencePyramid highlightLevel="meta-analysis" />
 * ```
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  TrendingUp,
  Award,
  HelpCircle,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export type GRADELevel = 'high' | 'moderate' | 'low' | 'very-low';
export type USPSTFGrade = 'A' | 'B' | 'C' | 'D' | 'I';
export type OxfordLevel = '1a' | '1b' | '2a' | '2b' | '3a' | '3b' | '4' | '5';
export type EvidenceSystem = 'GRADE' | 'USPSTF' | 'Oxford';

interface EvidenceBadgeProps {
  grade: string;
  system?: EvidenceSystem;
  showTooltip?: boolean;
  className?: string;
}

interface GRADEIndicatorProps {
  level: GRADELevel;
  recommendation?: string;
  showDetails?: boolean;
  className?: string;
}

// ============================================================================
// GRADE SYSTEM
// ============================================================================

const gradeConfig = {
  high: {
    label: 'High Quality',
    description: 'Further research is very unlikely to change our confidence in the estimate of effect',
    icon: Shield,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-500',
    bars: 4,
  },
  moderate: {
    label: 'Moderate Quality',
    description: 'Further research is likely to have an important impact on our confidence',
    icon: CheckCircle,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-500',
    bars: 3,
  },
  low: {
    label: 'Low Quality',
    description: 'Further research is very likely to have an important impact',
    icon: AlertTriangle,
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    border: 'border-yellow-500',
    bars: 2,
  },
  'very-low': {
    label: 'Very Low Quality',
    description: 'Any estimate of effect is very uncertain',
    icon: AlertCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
    border: 'border-red-500',
    bars: 1,
  },
};

export const GRADEIndicator: React.FC<GRADEIndicatorProps> = ({
  level,
  recommendation,
  showDetails = false,
  className,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = gradeConfig[level];
  const Icon = config.icon;

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2',
          config.bg,
          config.border
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Icon className={cn('w-5 h-5', config.color)} />
        <div>
          <p className={cn('text-sm font-bold', config.color)}>{config.label}</p>
          {recommendation && (
            <p className="text-xs text-neutral-700 dark:text-neutral-300">
              {recommendation}
            </p>
          )}
        </div>

        {/* Quality Bars */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'w-1 rounded-full',
                idx < config.bars
                  ? cn('h-4', config.color.replace('text-', 'bg-'))
                  : 'h-2 bg-neutral-300 dark:bg-neutral-700'
              )}
            />
          ))}
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs shadow-xl"
          >
            <p className="font-semibold mb-1">GRADE: {config.label}</p>
            <p>{config.description}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// USPSTF GRADES
// ============================================================================

const uspstfConfig = {
  A: {
    label: 'Grade A',
    description: 'Strongly recommended - High certainty of substantial net benefit',
    color: 'bg-green-600 text-white',
    icon: Shield,
  },
  B: {
    label: 'Grade B',
    description: 'Recommended - High certainty of moderate net benefit or moderate certainty of moderate to substantial benefit',
    color: 'bg-blue-600 text-white',
    icon: CheckCircle,
  },
  C: {
    label: 'Grade C',
    description: 'Selectively offer - At least moderate certainty that net benefit is small',
    color: 'bg-yellow-600 text-white',
    icon: Info,
  },
  D: {
    label: 'Grade D',
    description: 'Not recommended - Moderate or high certainty of no net benefit or harms outweigh benefits',
    color: 'bg-red-600 text-white',
    icon: AlertCircle,
  },
  I: {
    label: 'Grade I',
    description: 'Insufficient evidence - Evidence is lacking, poor quality, or conflicting',
    color: 'bg-neutral-500 text-white',
    icon: HelpCircle,
  },
};

export const USPSTFBadge: React.FC<{ grade: USPSTFGrade; className?: string }> = ({
  grade,
  className,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = uspstfConfig[grade];
  const Icon = config.icon;

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-sm',
          config.color
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Icon className="w-4 h-4" />
        {config.label}
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs shadow-xl"
          >
            <p className="font-semibold mb-1">USPSTF {config.label}</p>
            <p>{config.description}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// GENERIC EVIDENCE BADGE
// ============================================================================

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  grade,
  system = 'GRADE',
  showTooltip = true,
  className,
}) => {
  if (system === 'USPSTF' && (grade === 'A' || grade === 'B' || grade === 'C' || grade === 'D' || grade === 'I')) {
    return <USPSTFBadge grade={grade as USPSTFGrade} className={className} />;
  }

  if (system === 'GRADE' && (grade === 'high' || grade === 'moderate' || grade === 'low' || grade === 'very-low')) {
    return <GRADEIndicator level={grade as GRADELevel} className={className} />;
  }

  // Generic badge
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold',
        'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100',
        className
      )}
    >
      <Award className="w-3 h-3" />
      {grade}
    </span>
  );
};

// ============================================================================
// EVIDENCE PYRAMID
// ============================================================================

type PyramidLevel =
  | 'meta-analysis'
  | 'rct'
  | 'cohort'
  | 'case-control'
  | 'case-series'
  | 'expert-opinion';

const pyramidLevels: { level: PyramidLevel; label: string; description: string }[] = [
  {
    level: 'meta-analysis',
    label: 'Meta-Analysis & Systematic Reviews',
    description: 'Highest quality evidence - synthesis of multiple RCTs',
  },
  {
    level: 'rct',
    label: 'Randomized Controlled Trials',
    description: 'Gold standard for interventional studies',
  },
  {
    level: 'cohort',
    label: 'Cohort Studies',
    description: 'Observational studies following groups over time',
  },
  {
    level: 'case-control',
    label: 'Case-Control Studies',
    description: 'Retrospective comparison of cases and controls',
  },
  {
    level: 'case-series',
    label: 'Case Series & Reports',
    description: 'Descriptive studies of individual cases',
  },
  {
    level: 'expert-opinion',
    label: 'Expert Opinion',
    description: 'Clinical experience and expert consensus',
  },
];

interface EvidencePyramidProps {
  highlightLevel?: PyramidLevel;
  className?: string;
}

export const EvidencePyramid: React.FC<EvidencePyramidProps> = ({
  highlightLevel,
  className,
}) => {
  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <h3 className="text-center text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        Evidence Pyramid
      </h3>

      <div className="space-y-1">
        {pyramidLevels.map((item, index) => {
          const isHighlighted = item.level === highlightLevel;
          const width = 100 - index * 12; // Decreasing width for pyramid shape

          return (
            <motion.div
              key={item.level}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-center"
            >
              <div
                className={cn(
                  'relative px-4 py-3 rounded transition-all',
                  'border-2',
                  isHighlighted
                    ? 'bg-brand-primary-100 dark:bg-brand-primary-900/30 border-brand-primary-500 shadow-lg scale-105'
                    : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                )}
                style={{ width: `${width}%` }}
              >
                <p
                  className={cn(
                    'text-xs font-semibold text-center',
                    isHighlighted
                      ? 'text-brand-primary-900 dark:text-brand-primary-100'
                      : 'text-neutral-700 dark:text-neutral-300'
                  )}
                >
                  {item.label}
                </p>
                <p
                  className={cn(
                    'text-[10px] text-center mt-1',
                    isHighlighted
                      ? 'text-brand-primary-700 dark:text-brand-primary-300'
                      : 'text-neutral-500'
                  )}
                >
                  {item.description}
                </p>

                {isHighlighted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-brand-primary-600 text-white flex items-center justify-center"
                  >
                    <TrendingUp className="w-3 h-3" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-neutral-500">
          Higher levels represent stronger evidence quality
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// EVIDENCE SUMMARY CARD
// ============================================================================

interface EvidenceSummaryProps {
  grade?: string;
  system?: EvidenceSystem;
  studyType?: PyramidLevel;
  sampleSize?: number;
  quality?: string;
  limitations?: string[];
  className?: string;
}

export const EvidenceSummary: React.FC<EvidenceSummaryProps> = ({
  grade,
  system = 'GRADE',
  studyType,
  sampleSize,
  quality,
  limitations = [],
  className,
}) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-5 h-5 text-brand-primary-600 dark:text-brand-primary-400" />
        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
          Evidence Summary
        </h4>
      </div>

      <div className="space-y-3">
        {grade && (
          <div>
            <p className="text-xs text-neutral-500 uppercase mb-1">Evidence Grade:</p>
            <EvidenceBadge grade={grade} system={system} />
          </div>
        )}

        {studyType && (
          <div>
            <p className="text-xs text-neutral-500 uppercase mb-1">Study Type:</p>
            <p className="text-sm font-medium">
              {pyramidLevels.find((l) => l.level === studyType)?.label}
            </p>
          </div>
        )}

        {sampleSize !== undefined && (
          <div>
            <p className="text-xs text-neutral-500 uppercase mb-1">Sample Size:</p>
            <p className="text-sm font-medium">{sampleSize.toLocaleString()} participants</p>
          </div>
        )}

        {quality && (
          <div>
            <p className="text-xs text-neutral-500 uppercase mb-1">Quality Assessment:</p>
            <p className="text-sm">{quality}</p>
          </div>
        )}

        {limitations.length > 0 && (
          <div>
            <p className="text-xs text-neutral-500 uppercase mb-1">Limitations:</p>
            <ul className="text-sm space-y-1">
              {limitations.map((limitation, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400">•</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
