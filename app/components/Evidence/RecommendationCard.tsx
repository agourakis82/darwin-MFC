'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Users, Pill, Scale, FileText, Calendar } from 'lucide-react';
import type { GradeRecommendation, GradeCertainty } from '@/lib/types/evidence';
import { GRADE_CERTAINTY_CONFIG, GRADE_STRENGTH_CONFIG } from '@/lib/types/evidence';
import { EvidenceBadge, EvidenceStrengthBadge } from './EvidenceBadge';

export interface RecommendationCardProps {
  /** The GRADE recommendation */
  recommendation: GradeRecommendation;
  /** Show expanded details by default */
  defaultExpanded?: boolean;
  /** Callback when "View Evidence" is clicked */
  onViewEvidence?: () => void;
  /** Compact mode */
  compact?: boolean;
}

function AssessmentBreakdown({ certainty, assessment }: { certainty: GradeCertainty; assessment?: GradeRecommendation['assessment'] }) {
  if (!assessment) {
    return null;
  }

  const getDowngradeColor = (value?: string) => {
    if (!value || value === 'none') return 'text-green-400';
    if (value === 'serious' || value === 'likely') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-neutral-700/30 rounded-lg p-3 space-y-3">
      <h4 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
        <Scale size={14} />
        Avaliação GRADE
      </h4>

      {/* Starting point */}
      <div className="text-xs">
        <span className="text-neutral-400">Ponto de partida: </span>
        <span className="text-neutral-200">
          {assessment.startingCertainty === 'high' ? 'Alta (ECRs)' : 'Baixa (Estudos observacionais)'}
        </span>
      </div>

      {/* Downgrade factors */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-neutral-400">Fatores de rebaixamento:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className={getDowngradeColor(assessment.downgrade.riskOfBias)}>●</span>
            <span className="text-neutral-300">Risco de viés:</span>
            <span className="text-neutral-400">{assessment.downgrade.riskOfBias || 'Nenhum'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={getDowngradeColor(assessment.downgrade.inconsistency)}>●</span>
            <span className="text-neutral-300">Inconsistência:</span>
            <span className="text-neutral-400">{assessment.downgrade.inconsistency || 'Nenhuma'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={getDowngradeColor(assessment.downgrade.indirectness)}>●</span>
            <span className="text-neutral-300">Indiretividade:</span>
            <span className="text-neutral-400">{assessment.downgrade.indirectness || 'Nenhuma'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={getDowngradeColor(assessment.downgrade.imprecision)}>●</span>
            <span className="text-neutral-300">Imprecisão:</span>
            <span className="text-neutral-400">{assessment.downgrade.imprecision || 'Nenhuma'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={getDowngradeColor(assessment.downgrade.publicationBias)}>●</span>
            <span className="text-neutral-300">Viés publicação:</span>
            <span className="text-neutral-400">{assessment.downgrade.publicationBias || 'Nenhum'}</span>
          </div>
        </div>
      </div>

      {/* Upgrade factors (if applicable) */}
      {assessment.upgrade && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-neutral-400">Fatores de elevação:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {assessment.upgrade.largeEffect && (
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-neutral-300">Efeito grande</span>
              </div>
            )}
            {assessment.upgrade.doseResponse && (
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-neutral-300">Dose-resposta</span>
              </div>
            )}
            {assessment.upgrade.confoundersReduceEffect && (
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-neutral-300">Confundidores reduzem efeito</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Final certainty */}
      <div className="pt-2 border-t border-neutral-600 flex items-center justify-between">
        <span className="text-xs text-neutral-400">Certeza final:</span>
        <EvidenceBadge certainty={certainty} showSymbols size="sm" />
      </div>

      {/* Rationale */}
      {assessment.rationale && (
        <p className="text-xs text-neutral-400 italic">{assessment.rationale}</p>
      )}
    </div>
  );
}

export function RecommendationCard({
  recommendation,
  defaultExpanded = false,
  onViewEvidence,
  compact = false,
}: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const strengthConfig = GRADE_STRENGTH_CONFIG[recommendation.strength];
  const certaintyConfig = GRADE_CERTAINTY_CONFIG[recommendation.certainty];

  // Determine border color based on strength
  const borderColor = recommendation.strength.includes('for')
    ? recommendation.strength === 'strong_for'
      ? 'border-l-green-500'
      : 'border-l-yellow-500'
    : recommendation.strength === 'strong_against'
    ? 'border-l-red-500'
    : 'border-l-orange-500';

  return (
    <div
      className={`
        bg-neutral-800/50 border border-neutral-700 rounded-lg
        border-l-4 ${borderColor}
        transition-all duration-200
      `}
    >
      {/* Header */}
      <div className={`p-4 ${compact ? 'pb-3' : ''}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <EvidenceStrengthBadge
            certainty={recommendation.certainty}
            strength={recommendation.strength}
            size={compact ? 'sm' : 'md'}
          />
          {recommendation.lastReviewed && (
            <span className="text-xs text-neutral-500 flex items-center gap-1">
              <Calendar size={12} />
              {recommendation.lastReviewed}
            </span>
          )}
        </div>

        {/* Recommendation text */}
        <p className={`text-neutral-200 ${compact ? 'text-sm' : 'text-base'}`}>
          {recommendation.recommendation}
        </p>

        {/* PICO summary */}
        {!compact && (recommendation.population || recommendation.intervention) && (
          <div className="flex flex-wrap gap-3 mt-3 text-xs">
            {recommendation.population && (
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Users size={12} className="text-blue-400" />
                <span>{recommendation.population}</span>
              </div>
            )}
            {recommendation.intervention && (
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Pill size={12} className="text-purple-400" />
                <span>{recommendation.intervention}</span>
              </div>
            )}
          </div>
        )}

        {/* Remarks */}
        {recommendation.remarks && (
          <p className="text-sm text-neutral-400 mt-2 italic">
            {recommendation.remarks}
          </p>
        )}
      </div>

      {/* Expandable details */}
      {!compact && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              w-full px-4 py-2 flex items-center justify-center gap-2
              text-sm text-neutral-400 hover:text-neutral-300
              border-t border-neutral-700
              transition-colors
            "
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} />
                Ocultar detalhes
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Ver detalhes GRADE
              </>
            )}
          </button>

          {isExpanded && (
            <div className="px-4 pb-4 space-y-4">
              {/* Assessment breakdown */}
              <AssessmentBreakdown
                certainty={recommendation.certainty}
                assessment={recommendation.assessment}
              />

              {/* Outcomes */}
              {recommendation.outcomes && recommendation.outcomes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-neutral-200 mb-2">Desfechos considerados:</h4>
                  <ul className="space-y-1">
                    {recommendation.outcomes.map((outcome, idx) => (
                      <li key={idx} className="text-sm text-neutral-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* References */}
              {recommendation.references && recommendation.references.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-neutral-200 mb-2 flex items-center gap-2">
                    <FileText size={14} />
                    Referências
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.references.map((ref, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-neutral-700 rounded text-neutral-300"
                      >
                        [{ref}]
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* View evidence button */}
              {onViewEvidence && (
                <button
                  onClick={onViewEvidence}
                  className="
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    bg-blue-600 hover:bg-blue-700
                    text-white text-sm font-medium
                    transition-colors
                  "
                >
                  <ExternalLink size={14} />
                  Ver corpo de evidência completo
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * List of recommendations with grouping by strength
 */
export function RecommendationList({
  recommendations,
  groupByStrength = false,
}: {
  recommendations: GradeRecommendation[];
  groupByStrength?: boolean;
}) {
  if (!groupByStrength) {
    return (
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    );
  }

  const grouped = {
    strong_for: recommendations.filter((r) => r.strength === 'strong_for'),
    weak_for: recommendations.filter((r) => r.strength === 'weak_for'),
    weak_against: recommendations.filter((r) => r.strength === 'weak_against'),
    strong_against: recommendations.filter((r) => r.strength === 'strong_against'),
  };

  return (
    <div className="space-y-6">
      {grouped.strong_for.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            ↑↑ Recomendações Fortes a Favor
          </h3>
          <div className="space-y-3">
            {grouped.strong_for.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} compact />
            ))}
          </div>
        </div>
      )}

      {grouped.weak_for.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
            ↑? Recomendações Condicionais a Favor
          </h3>
          <div className="space-y-3">
            {grouped.weak_for.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} compact />
            ))}
          </div>
        </div>
      )}

      {grouped.weak_against.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
            ↓? Recomendações Condicionais Contra
          </h3>
          <div className="space-y-3">
            {grouped.weak_against.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} compact />
            ))}
          </div>
        </div>
      )}

      {grouped.strong_against.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
            ↓↓ Recomendações Fortes Contra
          </h3>
          <div className="space-y-3">
            {grouped.strong_against.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
