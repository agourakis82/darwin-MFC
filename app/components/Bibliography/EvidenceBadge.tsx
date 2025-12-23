'use client';

import React from 'react';
import { getAnyEvidenceLevelLabel, getAnyEvidenceLevelColor, getAnyEvidenceLevelBadge } from '@/lib/utils/evidence-level';
import type { EvidenceLevel } from '@/lib/types/evidence';

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Badge component to display evidence level
 * Supports both Oxford (Ia, Ib, etc.) and GRADE (A, B, C, D, GPP) levels
 */
export function EvidenceBadge({
  level,
  showLabel = false,
  size = 'md',
  className = '',
}: EvidenceBadgeProps) {
  const colorClass = getAnyEvidenceLevelColor(level);
  const badgeText = getAnyEvidenceLevelBadge(level);
  const label = getAnyEvidenceLevelLabel(level);

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-md font-medium text-white
        ${colorClass}
        ${sizeClasses[size]}
        ${className}
      `}
      title={label}
      aria-label={`Nível de evidência: ${label}`}
    >
      <span className="font-bold">{badgeText}</span>
      {showLabel && <span className="hidden sm:inline">{label.split(' - ')[1]}</span>}
    </span>
  );
}

/**
 * Tooltip component showing evidence level details on hover
 */
interface EvidenceTooltipProps {
  level: EvidenceLevel;
  children: React.ReactNode;
}

export function EvidenceTooltip({ level, children }: EvidenceTooltipProps) {
  const label = getAnyEvidenceLevelLabel(level);
  
  return (
    <div className="group relative inline-block">
      {children}
      <div className="
        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
        hidden group-hover:block
        z-50
        w-64 p-3
        bg-gray-900 text-white text-sm rounded-lg shadow-lg
        pointer-events-none
      ">
        <div className="font-semibold mb-1">{label}</div>
        <div className="text-xs text-gray-300">
          Clique para mais informações sobre o nível de evidência
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}

