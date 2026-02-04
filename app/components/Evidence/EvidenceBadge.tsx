'use client';

import React from 'react';
import { BookOpen, Shield, AlertTriangle, HelpCircle } from 'lucide-react';
import type { GradeCertainty, GradeRecommendationStrength, GradeEvidenceLevel } from '@/lib/types/evidence';
import { GRADE_CERTAINTY_CONFIG, GRADE_STRENGTH_CONFIG, mapDynamedToGrade } from '@/lib/types/evidence';

export interface EvidenceBadgeProps {
  /** GRADE certainty level */
  certainty?: GradeCertainty;
  /** DynaMed-style level (will be converted to GRADE) */
  level?: GradeEvidenceLevel;
  /** Recommendation strength */
  strength?: GradeRecommendationStrength;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show label text */
  showLabel?: boolean;
  /** Show GRADE symbols (⊕⊕⊕⊕) */
  showSymbols?: boolean;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Custom tooltip content */
  tooltip?: string;
}

const SIZE_CONFIG = {
  sm: { icon: 12, text: 'text-xs', padding: 'px-2 py-0.5', gap: 'gap-1' },
  md: { icon: 14, text: 'text-sm', padding: 'px-2.5 py-1', gap: 'gap-1.5' },
  lg: { icon: 16, text: 'text-base', padding: 'px-3 py-1.5', gap: 'gap-2' },
};

const CERTAINTY_ICONS = {
  high: Shield,
  moderate: BookOpen,
  low: AlertTriangle,
  very_low: HelpCircle,
};

export function EvidenceBadge({
  certainty,
  level,
  strength,
  size = 'md',
  showLabel = true,
  showSymbols = false,
  showTooltip = true,
  tooltip,
}: EvidenceBadgeProps) {
  // Convert DynaMed level to GRADE certainty if needed
  const gradeCertainty = certainty ?? (level ? mapDynamedToGrade(level) : undefined);

  if (!gradeCertainty && !strength) {
    return null;
  }

  const sizeConfig = SIZE_CONFIG[size];

  // Render certainty badge
  if (gradeCertainty) {
    const config = GRADE_CERTAINTY_CONFIG[gradeCertainty];
    const Icon = CERTAINTY_ICONS[gradeCertainty];
    const tooltipContent = tooltip || config.description;

    return (
      <div
        className={`
          inline-flex items-center ${sizeConfig.gap} rounded-full border
          ${config.bgColor} ${config.borderColor} ${sizeConfig.padding}
          transition-colors duration-200
          group relative
        `}
        role="status"
        aria-label={`Evidência: ${config.labelPt}`}
      >
        <Icon
          size={sizeConfig.icon}
          className={config.color}
          aria-hidden="true"
        />

        {showSymbols && (
          <span className={`font-mono ${config.color} ${sizeConfig.text}`} aria-hidden="true">
            {config.symbol}
          </span>
        )}

        {showLabel && (
          <span className={`font-medium ${config.color} ${sizeConfig.text}`}>
            {config.labelPt}
          </span>
        )}

        {showTooltip && (
          <div
            className="
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2
              hidden group-hover:block
              w-72 p-2 rounded-lg
              bg-neutral-900 border border-neutral-700
              text-xs text-neutral-300
              pointer-events-none z-50
              shadow-lg
            "
            role="tooltip"
          >
            <p className="font-semibold text-neutral-200 mb-1">
              Certeza da Evidência: {config.labelPt}
            </p>
            <p>{tooltipContent}</p>
            <div
              className="
                absolute top-full left-1/2 -translate-x-1/2
                border-4 border-transparent border-t-neutral-900
              "
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    );
  }

  // Render strength badge
  if (strength) {
    const config = GRADE_STRENGTH_CONFIG[strength];

    return (
      <div
        className={`
          inline-flex items-center ${sizeConfig.gap} rounded-full border
          bg-neutral-800/50 border-neutral-700 ${sizeConfig.padding}
          transition-colors duration-200
          group relative
        `}
        role="status"
        aria-label={config.labelPt}
      >
        <span className={`font-mono font-bold ${config.color} ${sizeConfig.text}`} aria-hidden="true">
          {config.icon}
        </span>

        {showLabel && (
          <span className={`font-medium ${config.color} ${sizeConfig.text}`}>
            {strength.includes('for') ? 'Recomendado' : 'Não recomendado'}
          </span>
        )}

        {showTooltip && (
          <div
            className="
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2
              hidden group-hover:block
              w-72 p-2 rounded-lg
              bg-neutral-900 border border-neutral-700
              text-xs text-neutral-300
              pointer-events-none z-50
              shadow-lg
            "
            role="tooltip"
          >
            <p className="font-semibold text-neutral-200 mb-1">{config.labelPt}</p>
            <p>{config.description}</p>
            <div
              className="
                absolute top-full left-1/2 -translate-x-1/2
                border-4 border-transparent border-t-neutral-900
              "
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    );
  }

  return null;
}

/**
 * Combined Evidence + Strength badge
 */
export function EvidenceStrengthBadge({
  certainty,
  strength,
  size = 'md',
}: {
  certainty: GradeCertainty;
  strength: GradeRecommendationStrength;
  size?: 'sm' | 'md' | 'lg';
}) {
  const certaintyConfig = GRADE_CERTAINTY_CONFIG[certainty];
  const strengthConfig = GRADE_STRENGTH_CONFIG[strength];
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <div className={`inline-flex items-center ${sizeConfig.gap}`}>
      {/* Strength */}
      <span
        className={`font-mono font-bold ${strengthConfig.color} ${sizeConfig.text}`}
        title={strengthConfig.labelPt}
      >
        {strengthConfig.icon}
      </span>

      {/* Divider */}
      <span className="text-neutral-600">|</span>

      {/* Certainty symbols */}
      <span
        className={`font-mono ${certaintyConfig.color} ${sizeConfig.text}`}
        title={`Certeza: ${certaintyConfig.labelPt}`}
      >
        {certaintyConfig.symbol}
      </span>
    </div>
  );
}
