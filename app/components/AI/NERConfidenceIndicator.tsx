'use client';

/**
 * NERConfidenceIndicator Component
 * ================================
 *
 * Visual confidence indicator for NER extraction results.
 * Shows confidence level with color-coded badges and progress bars.
 *
 * Features:
 * - Multiple display modes (badge, bar, ring)
 * - Source indicator (BioBERT, Regex, Hybrid)
 * - Animated confidence bars
 * - Accessible with ARIA labels
 */

import React from 'react';
import { useTranslations } from 'next-intl';

// =============================================================================
// TYPES
// =============================================================================

export type ConfidenceSource = 'biobert' | 'regex' | 'hybrid';

export interface NERConfidenceIndicatorProps {
  /** Confidence score from 0 to 1 */
  confidence: number;
  /** Source of the extraction */
  source?: ConfidenceSource;
  /** Display mode */
  mode?: 'badge' | 'bar' | 'ring' | 'minimal';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show the percentage text */
  showPercentage?: boolean;
  /** Show the source badge */
  showSource?: boolean;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Custom class name */
  className?: string;
  /** Animate the indicator */
  animated?: boolean;
}

export interface ConfidenceLevel {
  label: string;
  labelPt: string;
  color: string;
  bgColor: string;
  borderColor: string;
  ringColor: string;
  threshold: number;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

export const CONFIDENCE_LEVELS: ConfidenceLevel[] = [
  {
    label: 'Very High',
    labelPt: 'Muito Alta',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-100 dark:bg-green-900/40',
    borderColor: 'border-green-500',
    ringColor: 'stroke-green-500',
    threshold: 0.9,
  },
  {
    label: 'High',
    labelPt: 'Alta',
    color: 'text-emerald-700 dark:text-emerald-300',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
    borderColor: 'border-emerald-500',
    ringColor: 'stroke-emerald-500',
    threshold: 0.7,
  },
  {
    label: 'Medium',
    labelPt: 'Média',
    color: 'text-yellow-700 dark:text-yellow-300',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/40',
    borderColor: 'border-yellow-500',
    ringColor: 'stroke-yellow-500',
    threshold: 0.5,
  },
  {
    label: 'Low',
    labelPt: 'Baixa',
    color: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-100 dark:bg-orange-900/40',
    borderColor: 'border-orange-500',
    ringColor: 'stroke-orange-500',
    threshold: 0.3,
  },
  {
    label: 'Very Low',
    labelPt: 'Muito Baixa',
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-100 dark:bg-red-900/40',
    borderColor: 'border-red-500',
    ringColor: 'stroke-red-500',
    threshold: 0,
  },
];

export const SOURCE_CONFIG: Record<
  ConfidenceSource,
  {
    label: string;
    labelPt: string;
    color: string;
    bgColor: string;
    icon: string;
  }
> = {
  biobert: {
    label: 'BioBERT',
    labelPt: 'BioBERT',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-100 dark:bg-purple-900/40',
    icon: '🧠',
  },
  regex: {
    label: 'Regex',
    labelPt: 'Regex',
    color: 'text-slate-700 dark:text-slate-300',
    bgColor: 'bg-slate-100 dark:bg-slate-700/40',
    icon: '🔍',
  },
  hybrid: {
    label: 'Hybrid',
    labelPt: 'Híbrido',
    color: 'text-indigo-700 dark:text-indigo-300',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
    icon: '⚡',
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the confidence level configuration based on score
 */
export function getConfidenceLevel(confidence: number): ConfidenceLevel {
  for (const level of CONFIDENCE_LEVELS) {
    if (confidence >= level.threshold) {
      return level;
    }
  }
  return CONFIDENCE_LEVELS[CONFIDENCE_LEVELS.length - 1];
}

/**
 * Format confidence as percentage string
 */
function formatConfidence(confidence: number): string {
  return `${Math.round(confidence * 100)}%`;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface BadgeModeProps {
  confidence: number;
  level: ConfidenceLevel;
  source?: ConfidenceSource;
  size: 'sm' | 'md' | 'lg';
  showPercentage: boolean;
  showSource: boolean;
}

function BadgeMode({
  confidence,
  level,
  source,
  size,
  showPercentage,
  showSource,
}: BadgeModeProps) {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full ${level.bgColor} ${level.color} ${sizeClasses[size]}`}
    >
      <span className="font-medium">{level.labelPt}</span>
      {showPercentage && (
        <span className="opacity-80">{formatConfidence(confidence)}</span>
      )}
      {showSource && source && (
        <span
          className={`ml-1 rounded-full px-1.5 ${SOURCE_CONFIG[source].bgColor} ${SOURCE_CONFIG[source].color}`}
        >
          {SOURCE_CONFIG[source].icon}
        </span>
      )}
    </span>
  );
}

interface BarModeProps {
  confidence: number;
  level: ConfidenceLevel;
  size: 'sm' | 'md' | 'lg';
  showPercentage: boolean;
  animated: boolean;
}

function BarMode({
  confidence,
  level,
  size,
  showPercentage,
  animated,
}: BarModeProps) {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <div
        className={`flex-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ${heightClasses[size]}`}
      >
        <div
          className={`h-full rounded-full ${level.bgColor.replace('/40', '')} ${
            animated ? 'transition-all duration-500 ease-out' : ''
          }`}
          style={{ width: `${confidence * 100}%` }}
        />
      </div>
      {showPercentage && (
        <span className={`text-sm ${level.color} font-medium min-w-[3rem] text-right`}>
          {formatConfidence(confidence)}
        </span>
      )}
    </div>
  );
}

interface RingModeProps {
  confidence: number;
  level: ConfidenceLevel;
  size: 'sm' | 'md' | 'lg';
  showPercentage: boolean;
  animated: boolean;
}

function RingMode({
  confidence,
  level,
  size,
  showPercentage,
  animated,
}: RingModeProps) {
  const sizeConfig = {
    sm: { dimension: 32, strokeWidth: 3, fontSize: 'text-[8px]' },
    md: { dimension: 48, strokeWidth: 4, fontSize: 'text-xs' },
    lg: { dimension: 64, strokeWidth: 5, fontSize: 'text-sm' },
  };

  const config = sizeConfig[size];
  const radius = (config.dimension - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - confidence);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={config.dimension}
        height={config.dimension}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={radius}
          fill="none"
          strokeWidth={config.strokeWidth}
          className="stroke-slate-200 dark:stroke-slate-700"
        />
        {/* Progress ring */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={radius}
          fill="none"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          className={`${level.ringColor} ${
            animated ? 'transition-all duration-500 ease-out' : ''
          }`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {showPercentage && (
        <span
          className={`absolute inset-0 flex items-center justify-center ${config.fontSize} ${level.color} font-medium`}
        >
          {Math.round(confidence * 100)}
        </span>
      )}
    </div>
  );
}

interface MinimalModeProps {
  confidence: number;
  level: ConfidenceLevel;
  showPercentage: boolean;
}

function MinimalMode({ confidence, level, showPercentage }: MinimalModeProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${level.color}`}>
      <span className="text-lg">●</span>
      {showPercentage && (
        <span className="text-sm font-medium">{formatConfidence(confidence)}</span>
      )}
    </span>
  );
}

// =============================================================================
// TOOLTIP WRAPPER
// =============================================================================

interface TooltipWrapperProps {
  confidence: number;
  level: ConfidenceLevel;
  source?: ConfidenceSource;
  showTooltip: boolean;
  children: React.ReactNode;
}

function TooltipWrapper({
  confidence,
  level,
  source,
  showTooltip,
  children,
}: TooltipWrapperProps) {
  if (!showTooltip) {
    return <>{children}</>;
  }

  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute left-1/2 bottom-full z-50 mb-1 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="block whitespace-nowrap rounded-lg bg-slate-800 dark:bg-slate-700 px-3 py-2 text-xs text-white shadow-lg">
          <span className="flex flex-col gap-1">
            <span className="font-semibold">
              Confiança: {level.labelPt}
            </span>
            <span>
              Score: {formatConfidence(confidence)}
            </span>
            {source && (
              <span className="flex items-center gap-1">
                <span>{SOURCE_CONFIG[source].icon}</span>
                <span>Fonte: {SOURCE_CONFIG[source].labelPt}</span>
              </span>
            )}
          </span>
        </span>
      </span>
    </span>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function NERConfidenceIndicator({
  confidence,
  source,
  mode = 'badge',
  size = 'md',
  showPercentage = true,
  showSource = true,
  showTooltip = true,
  className = '',
  animated = true,
}: NERConfidenceIndicatorProps) {
  // Clamp confidence to 0-1
  const clampedConfidence = Math.max(0, Math.min(1, confidence));
  const level = getConfidenceLevel(clampedConfidence);

  const renderIndicator = () => {
    switch (mode) {
      case 'badge':
        return (
          <BadgeMode
            confidence={clampedConfidence}
            level={level}
            source={source}
            size={size}
            showPercentage={showPercentage}
            showSource={showSource}
          />
        );
      case 'bar':
        return (
          <BarMode
            confidence={clampedConfidence}
            level={level}
            size={size}
            showPercentage={showPercentage}
            animated={animated}
          />
        );
      case 'ring':
        return (
          <RingMode
            confidence={clampedConfidence}
            level={level}
            size={size}
            showPercentage={showPercentage}
            animated={animated}
          />
        );
      case 'minimal':
        return (
          <MinimalMode
            confidence={clampedConfidence}
            level={level}
            showPercentage={showPercentage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TooltipWrapper
      confidence={clampedConfidence}
      level={level}
      source={source}
      showTooltip={showTooltip}
    >
      <span
        className={`inline-flex ${className}`}
        role="status"
        aria-label={`Confidence: ${formatConfidence(clampedConfidence)}, Level: ${level.label}`}
      >
        {renderIndicator()}
      </span>
    </TooltipWrapper>
  );
}

// =============================================================================
// SOURCE BADGE COMPONENT
// =============================================================================

export interface SourceBadgeProps {
  source: ConfidenceSource;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function SourceBadge({
  source,
  size = 'md',
  showLabel = true,
  className = '',
}: SourceBadgeProps) {
  const config = SOURCE_CONFIG[source];

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${config.bgColor} ${config.color} ${sizeClasses[size]} ${className}`}
    >
      <span>{config.icon}</span>
      {showLabel && <span>{config.labelPt}</span>}
    </span>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default NERConfidenceIndicator;
