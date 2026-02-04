'use client';

/**
 * EntityHighlighter Component
 * ===========================
 *
 * Interactive inline entity visualization for NER results.
 * Highlights medical entities (diseases, medications, symptoms, exams)
 * with color-coded backgrounds and confidence indicators.
 *
 * Features:
 * - Inline highlighting with entity type colors
 * - Confidence-based opacity
 * - Click handlers for entity selection
 * - Correction callback for user feedback
 * - Multiple highlight modes (inline, underline, badge)
 */

import React, { useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import type { ExtractedEntity } from '@/lib/ai/extraction/biobert-extractor';
import type { LinkedEntity } from '@/lib/ai/extraction/entity-linker';
import type { EntityType } from '@/lib/ai/models/onnx-config';

// =============================================================================
// TYPES
// =============================================================================

export interface EntityHighlighterProps {
  /** The original text to highlight */
  text: string;
  /** Extracted entities with positions */
  entities: (ExtractedEntity | LinkedEntity)[];
  /** Callback when an entity is clicked */
  onEntityClick?: (entity: ExtractedEntity | LinkedEntity, index: number) => void;
  /** Callback when user wants to correct an entity */
  onEntityCorrect?: (entity: ExtractedEntity | LinkedEntity, correction: Partial<ExtractedEntity>) => void;
  /** Highlight mode: inline background, underline, or badge */
  highlightMode?: 'inline' | 'underline' | 'badge';
  /** Show confidence indicator */
  showConfidence?: boolean;
  /** Minimum confidence to display (0-1) */
  minConfidence?: number;
  /** Enable hover tooltips */
  showTooltips?: boolean;
  /** Custom class name */
  className?: string;
  /** Font size */
  fontSize?: 'sm' | 'md' | 'lg';
  /** Whether text is editable (for manual corrections) */
  editable?: boolean;
}

export interface HighlightedSegment {
  text: string;
  isEntity: boolean;
  entity?: ExtractedEntity | LinkedEntity;
  index?: number;
}

// =============================================================================
// ENTITY TYPE CONFIGURATION
// =============================================================================

export const ENTITY_TYPE_CONFIG: Record<
  EntityType,
  {
    label: string;
    labelPt: string;
    color: string;
    bgColor: string;
    bgColorLight: string;
    borderColor: string;
    icon: string;
  }
> = {
  DISEASE: {
    label: 'Disease',
    labelPt: 'Doença',
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-100 dark:bg-red-900/40',
    bgColorLight: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-300 dark:border-red-700',
    icon: '🔴',
  },
  MEDICATION: {
    label: 'Medication',
    labelPt: 'Medicamento',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-100 dark:bg-blue-900/40',
    bgColorLight: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
    icon: '💊',
  },
  SYMPTOM: {
    label: 'Symptom',
    labelPt: 'Sintoma',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-100 dark:bg-amber-900/40',
    bgColorLight: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-300 dark:border-amber-700',
    icon: '⚠️',
  },
  EXAM: {
    label: 'Exam',
    labelPt: 'Exame',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-100 dark:bg-green-900/40',
    bgColorLight: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-300 dark:border-green-700',
    icon: '🔬',
  },
  PROCEDURE: {
    label: 'Procedure',
    labelPt: 'Procedimento',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-100 dark:bg-purple-900/40',
    bgColorLight: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-300 dark:border-purple-700',
    icon: '🏥',
  },
  O: {
    label: 'Outside',
    labelPt: 'Fora',
    color: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-100 dark:bg-gray-900/40',
    bgColorLight: 'bg-gray-50 dark:bg-gray-900/20',
    borderColor: 'border-gray-300 dark:border-gray-700',
    icon: '○',
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Sort entities by start position and handle overlaps
 */
function sortAndFilterEntities(
  entities: (ExtractedEntity | LinkedEntity)[],
  minConfidence: number
): (ExtractedEntity | LinkedEntity)[] {
  // Filter by confidence
  const filtered = entities.filter((e) => e.confidence >= minConfidence);

  // Sort by start position
  const sorted = [...filtered].sort((a, b) => a.startChar - b.startChar);

  // Remove overlapping entities (keep higher confidence)
  const nonOverlapping: (ExtractedEntity | LinkedEntity)[] = [];
  for (const entity of sorted) {
    const overlaps = nonOverlapping.some(
      (e) =>
        (entity.startChar >= e.startChar && entity.startChar < e.endChar) ||
        (entity.endChar > e.startChar && entity.endChar <= e.endChar) ||
        (entity.startChar <= e.startChar && entity.endChar >= e.endChar)
    );

    if (!overlaps) {
      nonOverlapping.push(entity);
    } else {
      // Find overlapping entity and keep higher confidence
      const overlapIdx = nonOverlapping.findIndex(
        (e) =>
          (entity.startChar >= e.startChar && entity.startChar < e.endChar) ||
          (entity.endChar > e.startChar && entity.endChar <= e.endChar)
      );
      if (overlapIdx >= 0 && entity.confidence > nonOverlapping[overlapIdx].confidence) {
        nonOverlapping[overlapIdx] = entity;
      }
    }
  }

  return nonOverlapping;
}

/**
 * Split text into segments with entity information
 */
function createSegments(
  text: string,
  entities: (ExtractedEntity | LinkedEntity)[]
): HighlightedSegment[] {
  const segments: HighlightedSegment[] = [];
  let currentPos = 0;

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];

    // Add text before entity
    if (entity.startChar > currentPos) {
      segments.push({
        text: text.substring(currentPos, entity.startChar),
        isEntity: false,
      });
    }

    // Add entity segment
    segments.push({
      text: text.substring(entity.startChar, entity.endChar),
      isEntity: true,
      entity,
      index: i,
    });

    currentPos = entity.endChar;
  }

  // Add remaining text
  if (currentPos < text.length) {
    segments.push({
      text: text.substring(currentPos),
      isEntity: false,
    });
  }

  return segments;
}

/**
 * Get confidence level label
 */
function getConfidenceLevel(confidence: number): {
  label: string;
  color: string;
} {
  if (confidence >= 0.9) return { label: 'Very High', color: 'text-green-600' };
  if (confidence >= 0.7) return { label: 'High', color: 'text-green-500' };
  if (confidence >= 0.5) return { label: 'Medium', color: 'text-yellow-500' };
  if (confidence >= 0.3) return { label: 'Low', color: 'text-orange-500' };
  return { label: 'Very Low', color: 'text-red-500' };
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface EntityTooltipProps {
  entity: ExtractedEntity | LinkedEntity;
  children: React.ReactNode;
}

function EntityTooltip({ entity, children }: EntityTooltipProps) {
  const config = ENTITY_TYPE_CONFIG[entity.type];
  const confidenceInfo = getConfidenceLevel(entity.confidence);
  const isLinked = 'linkedTo' in entity && entity.linkedTo?.length > 0;

  return (
    <span className="group relative inline">
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="block whitespace-nowrap rounded-lg bg-slate-800 dark:bg-slate-700 px-3 py-2 text-xs text-white shadow-lg">
          <span className="flex flex-col gap-1">
            <span className="font-semibold">
              {config.icon} {config.labelPt}
            </span>
            <span className="flex items-center gap-1">
              <span className={confidenceInfo.color}>●</span>
              <span>Confiança: {(entity.confidence * 100).toFixed(0)}%</span>
            </span>
            <span className="text-slate-300">
              Fonte: {entity.source === 'biobert' ? 'BioBERT' : entity.source === 'regex' ? 'Regex' : 'Híbrido'}
            </span>
            {isLinked && (
              <span className="text-green-300">
                ✓ Vinculado a ontologias
              </span>
            )}
          </span>
        </span>
      </span>
    </span>
  );
}

interface EntityHighlightProps {
  segment: HighlightedSegment;
  mode: 'inline' | 'underline' | 'badge';
  showConfidence: boolean;
  showTooltips: boolean;
  onClick?: () => void;
}

function EntityHighlight({
  segment,
  mode,
  showConfidence,
  showTooltips,
  onClick,
}: EntityHighlightProps) {
  const entity = segment.entity!;
  const config = ENTITY_TYPE_CONFIG[entity.type];
  const opacity = Math.max(0.3, entity.confidence);

  const baseClasses = 'cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-offset-1';

  const getModeClasses = () => {
    switch (mode) {
      case 'inline':
        return `${config.bgColor} ${config.color} px-1 py-0.5 rounded`;
      case 'underline':
        return `${config.color} border-b-2 ${config.borderColor}`;
      case 'badge':
        return `${config.bgColor} ${config.color} px-1.5 py-0.5 rounded-full text-xs font-medium`;
      default:
        return '';
    }
  };

  const highlightElement = (
    <span
      className={`${baseClasses} ${getModeClasses()}`}
      style={{ opacity: showConfidence ? opacity : 1 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      aria-label={`${config.labelPt}: ${segment.text}`}
    >
      {mode === 'badge' && <span className="mr-1">{config.icon}</span>}
      {segment.text}
      {showConfidence && mode === 'inline' && (
        <span className="ml-1 text-xs opacity-70">
          ({(entity.confidence * 100).toFixed(0)}%)
        </span>
      )}
    </span>
  );

  if (showTooltips) {
    return <EntityTooltip entity={entity}>{highlightElement}</EntityTooltip>;
  }

  return highlightElement;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function EntityHighlighter({
  text,
  entities,
  onEntityClick,
  onEntityCorrect,
  highlightMode = 'inline',
  showConfidence = true,
  minConfidence = 0.3,
  showTooltips = true,
  className = '',
  fontSize = 'md',
  editable = false,
}: EntityHighlighterProps) {
  const t = useTranslations('common');

  // Process entities
  const processedEntities = useMemo(
    () => sortAndFilterEntities(entities, minConfidence),
    [entities, minConfidence]
  );

  // Create text segments
  const segments = useMemo(
    () => createSegments(text, processedEntities),
    [text, processedEntities]
  );

  // Handle entity click
  const handleEntityClick = useCallback(
    (entity: ExtractedEntity | LinkedEntity, index: number) => {
      onEntityClick?.(entity, index);
    },
    [onEntityClick]
  );

  // Font size classes
  const fontSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // No entities - just render text
  if (processedEntities.length === 0) {
    return (
      <div className={`whitespace-pre-wrap ${fontSizeClasses[fontSize]} ${className}`}>
        {text}
      </div>
    );
  }

  return (
    <div
      className={`whitespace-pre-wrap leading-relaxed ${fontSizeClasses[fontSize]} ${className}`}
      role="region"
      aria-label="Highlighted clinical text with entities"
    >
      {segments.map((segment, idx) =>
        segment.isEntity && segment.entity ? (
          <EntityHighlight
            key={`entity-${idx}-${segment.entity.startChar}`}
            segment={segment}
            mode={highlightMode}
            showConfidence={showConfidence}
            showTooltips={showTooltips}
            onClick={() =>
              handleEntityClick(segment.entity!, segment.index!)
            }
          />
        ) : (
          <span key={`text-${idx}`}>{segment.text}</span>
        )
      )}
    </div>
  );
}

// =============================================================================
// LEGEND COMPONENT
// =============================================================================

export interface EntityLegendProps {
  entityTypes?: EntityType[];
  compact?: boolean;
  className?: string;
}

export function EntityLegend({
  entityTypes = ['DISEASE', 'MEDICATION', 'SYMPTOM', 'EXAM', 'PROCEDURE'],
  compact = false,
  className = '',
}: EntityLegendProps) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${compact ? 'text-xs' : 'text-sm'} ${className}`}
      role="region"
      aria-label="Entity type legend"
    >
      {entityTypes.map((type) => {
        const config = ENTITY_TYPE_CONFIG[type];
        return (
          <span
            key={type}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded ${config.bgColorLight} ${config.color}`}
          >
            <span>{config.icon}</span>
            <span>{config.labelPt}</span>
          </span>
        );
      })}
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default EntityHighlighter;
export type { EntityType };
