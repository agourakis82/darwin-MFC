'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import {
  CheckCircle2,
  CircleDot,
  Circle,
  HelpCircle,
  Info,
  CircleAlert,
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import type {
  GradeEvidenceLevel,
  GradeQualityOfEvidence,
  GradeAssessmentSimple,
} from '@/lib/types/evidence';

/**
 * Evidence strength levels based on GRADE methodology
 * Similar to DynaMed's evidence labeling system
 *
 * @deprecated Use GradeEvidenceLevel from @/lib/types/evidence instead
 */
export type EvidenceLevel = GradeEvidenceLevel;

export interface EvidenceStrengthBadgeProps {
  level: EvidenceLevel;
  showLabel?: boolean;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Evidence configuration mapping GRADE levels to visual properties
 * Aligned with GRADE methodology:
 * - A (High): Very confident true effect is close to estimate
 * - B (Moderate): Moderately confident, may be substantially different
 * - C (Low): Limited confidence, true effect may differ substantially
 * - D (Very Low): Very little confidence
 * - GPP: Good Practice Point (clinical experience)
 */
const evidenceConfig: Record<
  EvidenceLevel,
  {
    label: string;
    labelPt: string;
    labelKey: string;
    description: string;
    descriptionPt: string;
    descriptionKey: string;
    quality: GradeQualityOfEvidence | 'gpp';
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ElementType;
  }
> = {
  A: {
    label: 'High Quality',
    labelPt: 'Alta Qualidade',
    labelKey: 'evidence.levels.A.label',
    description: 'High-quality RCTs or meta-analyses. Very confident true effect is close to estimate.',
    descriptionPt: 'ECRs ou meta-analises de alta qualidade. Alta confianca de que o efeito verdadeiro esta proximo do estimado.',
    descriptionKey: 'evidence.levels.A.description',
    quality: 'high',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
  },
  B: {
    label: 'Moderate Quality',
    labelPt: 'Qualidade Moderada',
    labelKey: 'evidence.levels.B.label',
    description: 'Downgraded RCTs or upgraded observational studies. Moderately confident.',
    descriptionPt: 'ECRs rebaixados ou estudos observacionais elevados. Confianca moderada.',
    descriptionKey: 'evidence.levels.B.description',
    quality: 'moderate',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    borderColor: 'border-amber-200 dark:border-amber-800',
    icon: CircleDot,
  },
  C: {
    label: 'Low Quality',
    labelPt: 'Baixa Qualidade',
    labelKey: 'evidence.levels.C.label',
    description: 'Observational studies. Limited confidence - true effect may be substantially different.',
    descriptionPt: 'Estudos observacionais. Confianca limitada - efeito verdadeiro pode ser substancialmente diferente.',
    descriptionKey: 'evidence.levels.C.description',
    quality: 'low',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/50',
    borderColor: 'border-orange-200 dark:border-orange-800',
    icon: Circle,
  },
  D: {
    label: 'Very Low Quality',
    labelPt: 'Qualidade Muito Baixa',
    labelKey: 'evidence.levels.D.label',
    description: 'Case reports, expert opinion. Very little confidence in effect estimate.',
    descriptionPt: 'Relatos de caso, opiniao de especialista. Muito pouca confianca no efeito estimado.',
    descriptionKey: 'evidence.levels.D.description',
    quality: 'very_low',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/50',
    borderColor: 'border-red-200 dark:border-red-800',
    icon: CircleAlert,
  },
  GPP: {
    label: 'Good Practice Point',
    labelPt: 'Ponto de Boa Pratica',
    labelKey: 'evidence.levels.GPP.label',
    description: 'Good practice point based on clinical experience of the guideline group.',
    descriptionPt: 'Ponto de boa pratica baseado na experiencia clinica do grupo de diretrizes.',
    descriptionKey: 'evidence.levels.GPP.description',
    quality: 'gpp',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    borderColor: 'border-blue-200 dark:border-blue-800',
    icon: Info,
  },
};

const sizeClasses = {
  sm: {
    badge: 'px-1.5 py-0.5 text-xs gap-1',
    icon: 'w-3 h-3',
    level: 'text-[10px] font-bold',
  },
  md: {
    badge: 'px-2 py-1 text-sm gap-1.5',
    icon: 'w-4 h-4',
    level: 'text-xs font-bold',
  },
  lg: {
    badge: 'px-3 py-1.5 text-base gap-2',
    icon: 'w-5 h-5',
    level: 'text-sm font-bold',
  },
};

export function EvidenceStrengthBadge({
  level,
  showLabel = true,
  showTooltip = true,
  size = 'md',
  className,
}: EvidenceStrengthBadgeProps) {
  const config = evidenceConfig[level];
  const sizes = sizeClasses[size];
  const Icon = config.icon;

  let t: (key: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string) => {
      try {
        return translations(key);
      } catch {
        // Fallback to config defaults
        if (key === config.labelKey) return config.label;
        if (key === config.descriptionKey) return config.description;
        return key;
      }
    };
  } catch {
    t = (key: string) => {
      if (key === config.labelKey) return config.label;
      if (key === config.descriptionKey) return config.description;
      return key;
    };
  }

  const badge = (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        config.bgColor,
        config.borderColor,
        config.color,
        sizes.badge,
        className
      )}
    >
      <Icon className={sizes.icon} aria-hidden="true" />
      <span className={sizes.level}>{level}</span>
      {showLabel && (
        <span className="font-medium">{t(config.labelKey)}</span>
      )}
    </span>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{badge}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs px-3 py-2 text-sm glass-strong rounded-lg shadow-lg animate-fade-in"
            sideOffset={5}
          >
            <div className="space-y-1">
              <div className={cn('font-semibold', config.color)}>
                Level {level}: {t(config.labelKey)}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                {t(config.descriptionKey)}
              </div>
            </div>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/**
 * Compact evidence indicator for inline use
 */
export function EvidenceIndicator({
  level,
  className,
}: {
  level: EvidenceLevel;
  className?: string;
}) {
  const config = evidenceConfig[level];

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span
            className={cn(
              'inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold cursor-help',
              config.bgColor,
              config.color,
              className
            )}
          >
            {level}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 px-2 py-1 text-xs glass-strong rounded-md shadow-lg animate-fade-in"
            sideOffset={5}
          >
            <span className={config.color}>
              {config.label}: {config.description}
            </span>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/**
 * Evidence legend component for displaying all levels
 */
export function EvidenceLegend({ className }: { className?: string }) {
  let t: (key: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string) => {
      try {
        return translations(key);
      } catch {
        return key;
      }
    };
  } catch {
    t = () => 'Evidence Strength Legend';
  }

  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        {t('evidence.legend.title')}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {(Object.keys(evidenceConfig) as EvidenceLevel[]).map((level) => (
          <EvidenceStrengthBadge
            key={level}
            level={level}
            showLabel
            showTooltip={false}
            size="sm"
          />
        ))}
      </div>
    </div>
  );
}

export default EvidenceStrengthBadge;

// =============================================================================
// UTILITY FUNCTIONS FOR GRADE
// =============================================================================

/**
 * Get the GRADE quality level from a letter grade
 */
export function getGradeQuality(level: EvidenceLevel): GradeQualityOfEvidence | 'gpp' {
  return evidenceConfig[level].quality;
}

/**
 * Get full configuration for a GRADE level
 */
export function getGradeConfig(level: EvidenceLevel) {
  return evidenceConfig[level];
}

/**
 * Convert a GradeAssessmentSimple to props for EvidenceStrengthBadge
 */
export function gradeAssessmentToBadgeProps(assessment: GradeAssessmentSimple): EvidenceStrengthBadgeProps {
  return {
    level: assessment.grade,
    showLabel: true,
    showTooltip: true,
    size: 'md',
  };
}

// Re-export types for convenience
export type { GradeEvidenceLevel, GradeQualityOfEvidence, GradeAssessmentSimple };
