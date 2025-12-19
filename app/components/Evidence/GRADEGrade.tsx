'use client';

import React from 'react';
import { calculateGRADEQuality, getInitialQuality, getQualityLabel, getStrengthLabel, getQualityDescription, getStrengthDescription } from '@/lib/utils/grade';
import type { GRADEDomains, EvidenceQuality, RecommendationStrength } from '@/lib/utils/grade';
import type { StudyType } from '@/lib/types/evidence';

interface GRADEGradeProps {
  studyType: StudyType;
  domains: GRADEDomains;
  recommendation?: string; // Optional recommendation text
  className?: string;
}

/**
 * Component to display GRADE assessment
 */
export function GRADEGrade({
  studyType,
  domains,
  recommendation,
  className = '',
}: GRADEGradeProps) {
  const initialQuality = getInitialQuality(studyType);
  const gradeResult = calculateGRADEQuality(initialQuality, domains);

  const qualityColors: Record<EvidenceQuality, string> = {
    high: 'bg-green-600 text-white',
    moderate: 'bg-blue-600 text-white',
    low: 'bg-yellow-600 text-white',
    very_low: 'bg-red-600 text-white',
  };

  const strengthColors: Record<RecommendationStrength, string> = {
    strong: 'bg-green-600 text-white',
    weak: 'bg-yellow-600 text-white',
    conditional: 'bg-orange-600 text-white',
  };

  return (
    <div className={`bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Avaliação GRADE
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Sistema de classificação da qualidade de evidências e força das recomendações
        </p>
      </div>

      {/* Quality and Strength Badges */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
            Qualidade da Evidência
          </label>
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-md font-medium ${qualityColors[gradeResult.quality]}`}>
            <span>{getQualityLabel(gradeResult.quality)}</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            {getQualityDescription(gradeResult.quality)}
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
            Força da Recomendação
          </label>
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-md font-medium ${strengthColors[gradeResult.strength]}`}>
            <span>{getStrengthLabel(gradeResult.strength)}</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            {getStrengthDescription(gradeResult.strength)}
          </p>
        </div>
      </div>

      {/* GRADE Domains */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          Domínios de Qualidade
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <DomainBadge
            label="Risco de Viés"
            value={domains.riskOfBias}
            domain="riskOfBias"
          />
          <DomainBadge
            label="Inconsistência"
            value={domains.inconsistency}
            domain="inconsistency"
          />
          <DomainBadge
            label="Indireção"
            value={domains.indirectness}
            domain="indirectness"
          />
          <DomainBadge
            label="Imprecisão"
            value={domains.imprecision}
            domain="imprecision"
          />
          <DomainBadge
            label="Viés de Publicação"
            value={domains.publicationBias}
            domain="publicationBias"
          />
        </div>
      </div>

      {/* Rationale */}
      {gradeResult.rationale.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Justificativa
          </h4>
          <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
            {gradeResult.rationale.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-neutral-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendation */}
      {recommendation && (
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Recomendação
          </h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {recommendation}
          </p>
        </div>
      )}
    </div>
  );
}

interface DomainBadgeProps {
  label: string;
  value: number;
  domain: keyof GRADEDomains;
}

function DomainBadge({ label, value, domain }: DomainBadgeProps) {
  const getValueLabel = (val: number): string => {
    if (val > 0) return `+${val}`;
    if (val < 0) return `${val}`;
    return '0';
  };

  const getColor = (val: number): string => {
    if (val > 0) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (val < 0) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200';
  };

  return (
    <div className="text-center">
      <div className={`px-2 py-1 rounded-md text-xs font-medium mb-1 ${getColor(value)}`}>
        {getValueLabel(value)}
      </div>
      <div className="text-xs text-neutral-600 dark:text-neutral-400">
        {label}
      </div>
    </div>
  );
}

