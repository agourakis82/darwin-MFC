'use client';

import React from 'react';
import { Dna } from 'lucide-react';
import type { PharmGKBEvidenceLevel } from '@/lib/types/medicamento';

export interface PharmGKBBadgeProps {
  /** PharmGKB evidence level */
  level: PharmGKBEvidenceLevel;
  /** Gene symbol (e.g., "CYP2D6") */
  gene?: string;
  /** Optional tooltip content */
  tooltip?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show label text */
  showLabel?: boolean;
}

const EVIDENCE_CONFIG: Record<
  PharmGKBEvidenceLevel,
  { color: string; bgColor: string; borderColor: string; label: string; description: string }
> = {
  '1A': {
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    label: 'Alta evidência',
    description: 'Evidência de alta qualidade com recomendação forte (CPIC/DPWG)',
  },
  '1B': {
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    label: 'Alta evidência',
    description: 'Evidência de alta qualidade com recomendação moderada (CPIC/DPWG)',
  },
  '2A': {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    label: 'Evidência moderada',
    description: 'Evidência de qualidade moderada com recomendação forte (CPIC/DPWG)',
  },
  '2B': {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    label: 'Evidência moderada',
    description: 'Evidência de qualidade moderada com recomendação moderada (CPIC/DPWG)',
  },
  '3': {
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    label: 'Baixa evidência',
    description: 'Evidência de baixa qualidade',
  },
  '4': {
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    label: 'Preliminar',
    description: 'Evidência preliminar ou insuficiente',
  },
};

const SIZE_CONFIG = {
  sm: { icon: 12, text: 'text-xs', padding: 'px-2 py-0.5' },
  md: { icon: 14, text: 'text-sm', padding: 'px-2.5 py-1' },
  lg: { icon: 16, text: 'text-base', padding: 'px-3 py-1.5' },
};

export function PharmGKBBadge({
  level,
  gene,
  tooltip,
  size = 'md',
  showLabel = false,
}: PharmGKBBadgeProps) {
  const config = EVIDENCE_CONFIG[level];
  const sizeConfig = SIZE_CONFIG[size];

  const tooltipContent =
    tooltip ||
    `${gene ? `${gene} - ` : ''}${config.description}`;

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 rounded-full border
        ${config.bgColor} ${config.borderColor} ${sizeConfig.padding}
        transition-colors duration-200
        group relative
      `}
      role="status"
      aria-label={`PharmGKB ${config.label}`}
    >
      <Dna
        size={sizeConfig.icon}
        className={config.color}
        aria-hidden="true"
      />

      {gene && (
        <span className={`font-mono font-semibold ${config.color} ${sizeConfig.text}`}>
          {gene}
        </span>
      )}

      {showLabel && (
        <span className={`${config.color} ${sizeConfig.text}`}>
          {level}
        </span>
      )}

      {/* Tooltip */}
      <div
        className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          hidden group-hover:block
          w-64 p-2 rounded-lg
          bg-neutral-900 border border-neutral-700
          text-xs text-neutral-300
          pointer-events-none z-50
          shadow-lg
        "
        role="tooltip"
      >
        {tooltipContent}
        <div
          className="
            absolute top-full left-1/2 -translate-x-1/2
            border-4 border-transparent border-t-neutral-900
          "
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
