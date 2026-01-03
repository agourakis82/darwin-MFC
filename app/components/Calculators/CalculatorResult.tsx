'use client';

/**
 * DARWIN-MFC CALCULATOR RESULT
 * ============================
 *
 * Display component for calculator results and interpretations.
 */

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  FileText,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { useState } from 'react';
import type {
  ScoreInterpretation,
  RiskLevel,
  InterpretationRange,
  CalculatorCitation,
} from '@/lib/calculators/types';
import { riskLevelConfig } from '@/lib/calculators/types';

// =============================================================================
// TYPES
// =============================================================================

export interface CalculatorResultProps {
  score: number;
  interpretation: ScoreInterpretation;
  calculatorName: string;
  ranges?: InterpretationRange[];
  citations?: CalculatorCitation[];
  showRanges?: boolean;
  showCitations?: boolean;
  className?: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getRiskIcon(risk: RiskLevel) {
  switch (risk) {
    case 'very-low':
    case 'low':
      return CheckCircle2;
    case 'low-moderate':
    case 'moderate':
      return Info;
    case 'moderate-high':
    case 'high':
      return AlertTriangle;
    case 'very-high':
    case 'critical':
      return AlertCircle;
    default:
      return Info;
  }
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function ScoreDisplay({
  score,
  scoreDisplay,
  category,
  risk,
}: {
  score: number;
  scoreDisplay?: string;
  category: string;
  risk: RiskLevel;
}) {
  const config = riskLevelConfig[risk];
  const Icon = getRiskIcon(risk);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 text-center',
        config.bgColor,
        'border-2',
        config.borderColor
      )}
    >
      <div className="relative z-10">
        <div className={cn('text-5xl font-bold', config.color)}>
          {scoreDisplay || score}
        </div>
        <div className={cn('mt-2 flex items-center justify-center gap-2', config.color)}>
          <Icon className="w-5 h-5" />
          <span className="text-lg font-semibold">{category}</span>
        </div>
      </div>

      {/* Background decoration */}
      <div
        className={cn(
          'absolute inset-0 opacity-10',
          'bg-gradient-to-br from-transparent via-current to-transparent'
        )}
      />
    </motion.div>
  );
}

function InterpretationDetails({
  interpretation,
}: {
  interpretation: ScoreInterpretation;
}) {
  const config = riskLevelConfig[interpretation.risk];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="space-y-4"
    >
      {/* Recommendation */}
      <div
        className={cn(
          'p-4 rounded-xl',
          'bg-white dark:bg-neutral-800',
          'border border-neutral-200 dark:border-neutral-700'
        )}
      >
        <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
          Recommendation
        </h4>
        <p className="text-neutral-900 dark:text-neutral-100">
          {interpretation.recommendation}
        </p>
      </div>

      {/* Action */}
      {interpretation.action && (
        <div
          className={cn(
            'p-4 rounded-xl',
            config.bgColor,
            'border',
            config.borderColor
          )}
        >
          <h4 className={cn('text-sm font-semibold mb-2', config.color)}>
            Immediate Action
          </h4>
          <p className={config.color}>{interpretation.action}</p>
        </div>
      )}

      {/* Mortality/Morbidity */}
      {(interpretation.mortality || interpretation.morbidity) && (
        <div className="grid grid-cols-2 gap-3">
          {interpretation.mortality && (
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Mortality Risk
              </div>
              <div className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {interpretation.mortality}
              </div>
            </div>
          )}
          {interpretation.morbidity && (
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Morbidity Risk
              </div>
              <div className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {interpretation.morbidity}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {interpretation.notes && interpretation.notes.length > 0 && (
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
          <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
            Clinical Notes
          </h4>
          <ul className="space-y-1">
            {interpretation.notes.map((note, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
              >
                <span className="text-neutral-400 mt-1">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function RangesDisplay({ ranges, currentScore }: { ranges: InterpretationRange[]; currentScore: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-2"
    >
      <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
        Score Ranges
      </h4>
      <div className="space-y-1.5">
        {ranges.map((range, index) => {
          const config = riskLevelConfig[range.interpretation.risk];
          const isActive = currentScore >= range.min && currentScore <= range.max;

          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-colors',
                isActive
                  ? cn(config.bgColor, config.borderColor, 'border-2')
                  : 'bg-neutral-50 dark:bg-neutral-800/50'
              )}
            >
              <div
                className={cn(
                  'flex-shrink-0 w-16 text-center font-mono text-sm font-medium',
                  isActive ? config.color : 'text-neutral-500'
                )}
              >
                {range.min === range.max ? range.min : `${range.min}-${range.max}`}
              </div>
              <div className="flex-1">
                <div
                  className={cn(
                    'font-medium text-sm',
                    isActive ? config.color : 'text-neutral-600 dark:text-neutral-400'
                  )}
                >
                  {range.interpretation.category}
                </div>
                {isActive && (
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {range.interpretation.recommendation}
                  </div>
                )}
              </div>
              {isActive && (
                <div className={cn('flex-shrink-0', config.color)}>
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function CitationsDisplay({ citations }: { citations: CalculatorCitation[] }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-3"
    >
      <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
        <FileText className="w-4 h-4" />
        References
      </h4>
      <div className="space-y-3">
        {citations.map((citation, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 text-sm"
          >
            <div className="text-neutral-900 dark:text-neutral-100">
              {citation.authors} ({citation.year}). {citation.title}.{' '}
              <em className="text-neutral-600 dark:text-neutral-400">
                {citation.journal}
              </em>
              {citation.volume && `, ${citation.volume}`}.
            </div>
            {(citation.doi || citation.pmid) && (
              <div className="mt-2 flex gap-3 text-xs">
                {citation.doi && (
                  <a
                    href={`https://doi.org/${citation.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#0071E3] hover:underline"
                  >
                    DOI <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {citation.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#0071E3] hover:underline"
                  >
                    PubMed <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function CalculatorResult({
  score,
  interpretation,
  calculatorName,
  ranges,
  citations,
  showRanges = true,
  showCitations = true,
  className,
}: CalculatorResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `${calculatorName}: ${interpretation.scoreDisplay || score} - ${interpretation.category}\n${interpretation.recommendation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with copy button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Result
        </h3>
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm',
            'bg-neutral-100 dark:bg-neutral-800',
            'text-neutral-600 dark:text-neutral-400',
            'hover:bg-neutral-200 dark:hover:bg-neutral-700',
            'transition-colors'
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Score display */}
      <ScoreDisplay
        score={score}
        scoreDisplay={interpretation.scoreDisplay}
        category={interpretation.category}
        risk={interpretation.risk}
      />

      {/* Interpretation details */}
      <InterpretationDetails interpretation={interpretation} />

      {/* Ranges */}
      {showRanges && ranges && ranges.length > 0 && (
        <RangesDisplay ranges={ranges} currentScore={score} />
      )}

      {/* Citations */}
      {showCitations && citations && citations.length > 0 && (
        <CitationsDisplay citations={citations} />
      )}
    </div>
  );
}

export default CalculatorResult;
