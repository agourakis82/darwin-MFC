'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  CheckCircle2,
  CircleDot,
  Circle,
  CircleAlert,
  Info,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  ShieldX,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type {
  GradeEvidenceLevel,
  GradeQualityOfEvidence,
  GradeRecommendationStrength,
  GradeAssessment,
  GradeAssessmentSimple,
  GradeDowngradingFactors,
  GradeRiskOfBias,
  GradeInconsistency,
  GradeIndirectness,
  GradeImprecision,
  GradePublicationBias,
  GRADE_QUALITY_LABELS,
  GRADE_QUALITY_DESCRIPTIONS,
  GRADE_STRENGTH_LABELS,
  GRADE_DOMAIN_LABELS,
  GRADE_RATING_LABELS,
} from '@/lib/types/evidence';

// =============================================================================
// CONFIGURATION
// =============================================================================

interface GradeConfig {
  level: GradeEvidenceLevel;
  quality: GradeQualityOfEvidence | 'gpp';
  label: string;
  labelPt: string;
  description: string;
  descriptionPt: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ElementType;
  strengthIcon: React.ElementType;
}

const gradeConfigs: Record<GradeEvidenceLevel, GradeConfig> = {
  A: {
    level: 'A',
    quality: 'high',
    label: 'High Quality',
    labelPt: 'Alta Qualidade',
    description: 'Very confident that the true effect lies close to the estimate',
    descriptionPt: 'Alta confianca de que o efeito verdadeiro esta proximo do estimado',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
    strengthIcon: ShieldCheck,
  },
  B: {
    level: 'B',
    quality: 'moderate',
    label: 'Moderate Quality',
    labelPt: 'Qualidade Moderada',
    description: 'Moderately confident - true effect likely close but may differ',
    descriptionPt: 'Confianca moderada - efeito verdadeiro provavelmente proximo, mas pode diferir',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    borderColor: 'border-amber-200 dark:border-amber-800',
    icon: CircleDot,
    strengthIcon: ShieldAlert,
  },
  C: {
    level: 'C',
    quality: 'low',
    label: 'Low Quality',
    labelPt: 'Baixa Qualidade',
    description: 'Limited confidence - true effect may be substantially different',
    descriptionPt: 'Confianca limitada - efeito verdadeiro pode ser substancialmente diferente',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/50',
    borderColor: 'border-orange-200 dark:border-orange-800',
    icon: Circle,
    strengthIcon: ShieldQuestion,
  },
  D: {
    level: 'D',
    quality: 'very_low',
    label: 'Very Low Quality',
    labelPt: 'Qualidade Muito Baixa',
    description: 'Very little confidence - true effect likely substantially different',
    descriptionPt: 'Muito pouca confianca - efeito verdadeiro provavelmente muito diferente',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/50',
    borderColor: 'border-red-200 dark:border-red-800',
    icon: CircleAlert,
    strengthIcon: ShieldX,
  },
  GPP: {
    level: 'GPP',
    quality: 'gpp',
    label: 'Good Practice Point',
    labelPt: 'Ponto de Boa Pratica',
    description: 'Based on clinical experience of the guideline group',
    descriptionPt: 'Baseado na experiencia clinica do grupo de diretrizes',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    borderColor: 'border-blue-200 dark:border-blue-800',
    icon: Info,
    strengthIcon: Info,
  },
};

const sizeClasses = {
  xs: {
    badge: 'px-1 py-0.5 text-[10px] gap-0.5',
    icon: 'w-2.5 h-2.5',
    level: 'text-[9px] font-bold',
  },
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

// =============================================================================
// MAIN COMPONENT: GradeEvidenceBadge
// =============================================================================

export interface GradeEvidenceBadgeProps {
  /** GRADE letter level (A, B, C, D, GPP) */
  level: GradeEvidenceLevel;
  /** Show the quality label text */
  showLabel?: boolean;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Locale for labels (defaults to pt) */
  locale?: 'en' | 'pt';
}

export function GradeEvidenceBadge({
  level,
  showLabel = true,
  showTooltip = true,
  size = 'md',
  className,
  locale = 'pt',
}: GradeEvidenceBadgeProps) {
  const config = gradeConfigs[level];
  const sizes = sizeClasses[size];
  const Icon = config.icon;

  const label = locale === 'pt' ? config.labelPt : config.label;
  const description = locale === 'pt' ? config.descriptionPt : config.description;

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
      {showLabel && <span className="font-medium">{label}</span>}
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
                GRADE {level}: {label}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                {description}
              </div>
            </div>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

// =============================================================================
// DETAILED COMPONENT: GradeEvidenceCard
// =============================================================================

export interface GradeEvidenceCardProps {
  /** Full GRADE assessment data */
  assessment: GradeAssessment | GradeAssessmentSimple;
  /** Show expanded domain details */
  showDomains?: boolean;
  /** Show recommendation strength */
  showStrength?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Locale for labels */
  locale?: 'en' | 'pt';
}

export function GradeEvidenceCard({
  assessment,
  showDomains = true,
  showStrength = true,
  className,
  locale = 'pt',
}: GradeEvidenceCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const isFullAssessment = 'downgradingFactors' in assessment;
  const grade = isFullAssessment ? assessment.letterGrade : assessment.grade;
  const quality = isFullAssessment ? assessment.finalQuality : assessment.quality;
  const config = gradeConfigs[grade];

  const strengthConfig: Record<GradeRecommendationStrength, { label: string; labelPt: string; color: string }> = {
    strong_for: { label: 'Strong For', labelPt: 'Forte a Favor', color: 'text-green-600 dark:text-green-400' },
    weak_for: { label: 'Conditional For', labelPt: 'Condicional a Favor', color: 'text-yellow-600 dark:text-yellow-400' },
    weak_against: { label: 'Conditional Against', labelPt: 'Condicional Contra', color: 'text-orange-600 dark:text-orange-400' },
    strong_against: { label: 'Strong Against', labelPt: 'Forte Contra', color: 'text-red-600 dark:text-red-400' },
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        config.borderColor,
        'bg-white dark:bg-neutral-900',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <GradeEvidenceBadge level={grade} size="lg" showTooltip={false} locale={locale} />
          {showStrength && 'strength' in assessment && assessment.strength && (
            <span
              className={cn(
                'text-sm font-medium',
                strengthConfig[assessment.strength].color
              )}
            >
              {locale === 'pt'
                ? strengthConfig[assessment.strength].labelPt
                : strengthConfig[assessment.strength].label}
            </span>
          )}
          {showStrength && isFullAssessment && assessment.recommendationStrength && (
            <span
              className={cn(
                'text-sm font-medium',
                strengthConfig[assessment.recommendationStrength].color
              )}
            >
              {locale === 'pt'
                ? strengthConfig[assessment.recommendationStrength].labelPt
                : strengthConfig[assessment.recommendationStrength].label}
            </span>
          )}
        </div>
        {isFullAssessment && showDomains && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label={expanded ? 'Collapse details' : 'Expand details'}
          >
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-neutral-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-neutral-500" />
            )}
          </button>
        )}
      </div>

      {/* Summary */}
      {'rationale' in assessment && assessment.rationale && (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {assessment.rationale}
        </p>
      )}
      {isFullAssessment && assessment.summaryOfFindings && (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {assessment.summaryOfFindings}
        </p>
      )}

      {/* Limitations */}
      {'limitations' in assessment && assessment.limitations && assessment.limitations.length > 0 && (
        <div className="mt-3">
          <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
            {locale === 'pt' ? 'Limitacoes' : 'Limitations'}
          </h4>
          <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
            {assessment.limitations.map((limitation, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-neutral-400">-</span>
                <span>{limitation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Expanded domain details */}
      {isFullAssessment && expanded && showDomains && (
        <GradeDomainsDetail
          factors={assessment.downgradingFactors}
          upgradingFactors={assessment.upgradingFactors}
          locale={locale}
        />
      )}

      {/* Study info for full assessment */}
      {isFullAssessment && (
        <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex flex-wrap gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            {assessment.numberOfStudies} {locale === 'pt' ? 'estudos' : 'studies'}
          </span>
          {assessment.totalSampleSize && (
            <span>
              n={assessment.totalSampleSize.toLocaleString()}
            </span>
          )}
          <span>
            {assessment.studyDesigns.join(', ')}
          </span>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// DOMAIN DETAILS COMPONENT
// =============================================================================

interface GradeDomainsDetailProps {
  factors: GradeDowngradingFactors;
  upgradingFactors?: GradeAssessment['upgradingFactors'];
  locale?: 'en' | 'pt';
}

function GradeDomainsDetail({
  factors,
  upgradingFactors,
  locale = 'pt',
}: GradeDomainsDetailProps) {
  const domainLabels = {
    riskOfBias: locale === 'pt' ? 'Risco de Vies' : 'Risk of Bias',
    inconsistency: locale === 'pt' ? 'Inconsistencia' : 'Inconsistency',
    indirectness: locale === 'pt' ? 'Indirecao' : 'Indirectness',
    imprecision: locale === 'pt' ? 'Imprecisao' : 'Imprecision',
    publicationBias: locale === 'pt' ? 'Vies de Publicacao' : 'Publication Bias',
  };

  const ratingLabels = {
    not_serious: locale === 'pt' ? 'Nao Serio' : 'Not Serious',
    serious: locale === 'pt' ? 'Serio' : 'Serious',
    very_serious: locale === 'pt' ? 'Muito Serio' : 'Very Serious',
    undetected: locale === 'pt' ? 'Nao Detectado' : 'Undetected',
    strongly_suspected: locale === 'pt' ? 'Fortemente Suspeito' : 'Strongly Suspected',
  };

  const getRatingColor = (rating: string): string => {
    switch (rating) {
      case 'not_serious':
      case 'undetected':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'serious':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'very_serious':
      case 'strongly_suspected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300';
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
      <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">
        {locale === 'pt' ? 'Dominios GRADE' : 'GRADE Domains'}
      </h4>

      {/* Downgrading factors */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <DomainBadge
          label={domainLabels.riskOfBias}
          rating={factors.riskOfBias.rating}
          ratingLabel={ratingLabels[factors.riskOfBias.rating]}
          color={getRatingColor(factors.riskOfBias.rating)}
          rationale={factors.riskOfBias.rationale}
        />
        <DomainBadge
          label={domainLabels.inconsistency}
          rating={factors.inconsistency.rating}
          ratingLabel={ratingLabels[factors.inconsistency.rating]}
          color={getRatingColor(factors.inconsistency.rating)}
          rationale={factors.inconsistency.rationale}
        />
        <DomainBadge
          label={domainLabels.indirectness}
          rating={factors.indirectness.rating}
          ratingLabel={ratingLabels[factors.indirectness.rating]}
          color={getRatingColor(factors.indirectness.rating)}
          rationale={factors.indirectness.rationale}
        />
        <DomainBadge
          label={domainLabels.imprecision}
          rating={factors.imprecision.rating}
          ratingLabel={ratingLabels[factors.imprecision.rating]}
          color={getRatingColor(factors.imprecision.rating)}
          rationale={factors.imprecision.rationale}
        />
        <DomainBadge
          label={domainLabels.publicationBias}
          rating={factors.publicationBias.rating}
          ratingLabel={ratingLabels[factors.publicationBias.rating]}
          color={getRatingColor(factors.publicationBias.rating)}
          rationale={factors.publicationBias.rationale}
        />
      </div>

      {/* Upgrading factors */}
      {upgradingFactors && (
        <div className="mt-4">
          <h5 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
            {locale === 'pt' ? 'Fatores de Elevacao' : 'Upgrading Factors'}
          </h5>
          <div className="flex flex-wrap gap-2">
            {upgradingFactors.largeMagnitudeOfEffect?.present && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                {locale === 'pt' ? 'Efeito Grande' : 'Large Effect'}
                {upgradingFactors.largeMagnitudeOfEffect.relativeRisk && (
                  <span className="ml-1 opacity-75">
                    (RR {upgradingFactors.largeMagnitudeOfEffect.relativeRisk})
                  </span>
                )}
              </span>
            )}
            {upgradingFactors.doseResponseGradient?.present && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                {locale === 'pt' ? 'Gradiente Dose-Resposta' : 'Dose-Response'}
              </span>
            )}
            {upgradingFactors.plausibleConfoundingWouldReduceEffect?.present && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                {locale === 'pt' ? 'Confundidores Reduziram Efeito' : 'Confounders Would Reduce Effect'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// DOMAIN BADGE SUB-COMPONENT
// =============================================================================

interface DomainBadgeProps {
  label: string;
  rating: string;
  ratingLabel: string;
  color: string;
  rationale?: string;
}

function DomainBadge({ label, rating, ratingLabel, color, rationale }: DomainBadgeProps) {
  const badge = (
    <div className="text-center">
      <div className={cn('px-2 py-1 rounded-md text-xs font-medium mb-1', color)}>
        {ratingLabel}
      </div>
      <div className="text-[10px] text-neutral-600 dark:text-neutral-400 leading-tight">
        {label}
      </div>
    </div>
  );

  if (!rationale) {
    return badge;
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="cursor-help">{badge}</div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs px-3 py-2 text-xs glass-strong rounded-lg shadow-lg"
            sideOffset={5}
          >
            {rationale}
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

// =============================================================================
// COMPACT INDICATOR FOR INLINE USE
// =============================================================================

export interface GradeIndicatorProps {
  level: GradeEvidenceLevel;
  className?: string;
}

export function GradeIndicator({ level, className }: GradeIndicatorProps) {
  const config = gradeConfigs[level];

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
            {level === 'GPP' ? 'G' : level}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 px-2 py-1 text-xs glass-strong rounded-md shadow-lg"
            sideOffset={5}
          >
            <span className={config.color}>
              GRADE {level}: {config.labelPt}
            </span>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

// =============================================================================
// LEGEND COMPONENT
// =============================================================================

export function GradeEvidenceLegend({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        GRADE - Qualidade da Evidencia
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        {(['A', 'B', 'C', 'D', 'GPP'] as GradeEvidenceLevel[]).map((level) => (
          <GradeEvidenceBadge
            key={level}
            level={level}
            showLabel
            showTooltip={false}
            size="sm"
          />
        ))}
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Sistema GRADE (Grading of Recommendations, Assessment, Development and Evaluations)
        para avaliacao sistematica da qualidade da evidencia.
      </p>
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default GradeEvidenceBadge;
