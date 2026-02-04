'use client';

/**
 * EntityCorrectionModal Component
 * ================================
 *
 * Modal dialog for correcting NER extraction results.
 * Allows users to provide feedback on entity recognition quality.
 *
 * Features:
 * - Correct entity text boundaries
 * - Change entity type classification
 * - Mark entities as correct/incorrect/missing/spurious
 * - Add new entities missed by NER
 * - Keyboard navigation and accessibility
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import type { EntityType } from '@/lib/ai/models/onnx-config';

// =============================================================================
// TYPES
// =============================================================================

export type FeedbackType =
  | 'correct'
  | 'incorrect_text'
  | 'incorrect_type'
  | 'incorrect_both'
  | 'missing'
  | 'spurious';

export interface EntityCorrection {
  /** Original entity (null if adding new) */
  originalEntity: CorrectionEntity | null;
  /** Corrected entity (null if marking as spurious) */
  correctedEntity: CorrectionEntity | null;
  /** Type of feedback */
  feedbackType: FeedbackType;
  /** User's comment/explanation */
  comment?: string;
  /** Timestamp */
  timestamp: Date;
  /** Session ID for grouping */
  sessionId?: string;
}

export interface CorrectionEntity {
  text: string;
  type: EntityType;
  startChar: number;
  endChar: number;
  confidence?: number;
  source?: 'biobert' | 'regex' | 'hybrid' | 'user';
}

export interface EntityCorrectionModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Entity being corrected (null for adding new) */
  entity?: CorrectionEntity | null;
  /** Full text context for reference */
  contextText: string;
  /** Callback when correction is submitted */
  onSubmit: (correction: EntityCorrection) => void;
  /** Available entity types */
  entityTypes?: EntityType[];
  /** Session ID for tracking */
  sessionId?: string;
  /** Enable text selection for boundary correction */
  enableTextSelection?: boolean;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const ENTITY_TYPE_OPTIONS: Record<EntityType, { label: string; labelPt: string; icon: string; color: string }> = {
  DISEASE: {
    label: 'Disease',
    labelPt: 'Doença',
    icon: '🔴',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  },
  MEDICATION: {
    label: 'Medication',
    labelPt: 'Medicamento',
    icon: '💊',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  },
  SYMPTOM: {
    label: 'Symptom',
    labelPt: 'Sintoma',
    icon: '⚠️',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  },
  EXAM: {
    label: 'Exam',
    labelPt: 'Exame',
    icon: '🔬',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
  PROCEDURE: {
    label: 'Procedure',
    labelPt: 'Procedimento',
    icon: '🏥',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  },
  O: {
    label: 'Outside',
    labelPt: 'Fora',
    icon: '○',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300',
  },
};

const FEEDBACK_OPTIONS: Record<FeedbackType, { label: string; labelPt: string; icon: string; description: string }> = {
  correct: {
    label: 'Correct',
    labelPt: 'Correto',
    icon: '✓',
    description: 'The entity was correctly identified',
  },
  incorrect_text: {
    label: 'Wrong boundaries',
    labelPt: 'Limites incorretos',
    icon: '↔',
    description: 'The entity type is correct but text boundaries are wrong',
  },
  incorrect_type: {
    label: 'Wrong type',
    labelPt: 'Tipo incorreto',
    icon: '🏷️',
    description: 'The text is correct but entity type is wrong',
  },
  incorrect_both: {
    label: 'Both wrong',
    labelPt: 'Ambos incorretos',
    icon: '✗',
    description: 'Both text boundaries and entity type are wrong',
  },
  missing: {
    label: 'Missing entity',
    labelPt: 'Entidade faltando',
    icon: '➕',
    description: 'An entity that should have been detected was missed',
  },
  spurious: {
    label: 'Not an entity',
    labelPt: 'Não é entidade',
    icon: '🚫',
    description: 'This should not have been identified as an entity',
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get surrounding context for an entity
 */
function getContextWindow(
  text: string,
  startChar: number,
  endChar: number,
  windowSize = 50
): { before: string; entity: string; after: string } {
  const before = text.slice(Math.max(0, startChar - windowSize), startChar);
  const entity = text.slice(startChar, endChar);
  const after = text.slice(endChar, Math.min(text.length, endChar + windowSize));

  return { before, entity, after };
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface FeedbackTypeSelectorProps {
  value: FeedbackType;
  onChange: (type: FeedbackType) => void;
  isNewEntity: boolean;
}

function FeedbackTypeSelector({ value, onChange, isNewEntity }: FeedbackTypeSelectorProps) {
  // Filter options based on whether we're adding new or correcting existing
  const availableOptions = isNewEntity
    ? ['missing'] as FeedbackType[]
    : ['correct', 'incorrect_text', 'incorrect_type', 'incorrect_both', 'spurious'] as FeedbackType[];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Tipo de Feedback
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {availableOptions.map((type) => {
          const option = FEEDBACK_OPTIONS[type];
          const isSelected = value === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`flex items-start gap-2 p-3 rounded-lg border-2 text-left transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span className="text-xl">{option.icon}</span>
              <div>
                <span className={`font-medium ${isSelected ? 'text-blue-700 dark:text-blue-300' : ''}`}>
                  {option.labelPt}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface EntityTypeSelectorProps {
  value: EntityType;
  onChange: (type: EntityType) => void;
  availableTypes: EntityType[];
}

function EntityTypeSelector({ value, onChange, availableTypes }: EntityTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Tipo de Entidade
      </label>
      <div className="flex flex-wrap gap-2">
        {availableTypes.map((type) => {
          const option = ENTITY_TYPE_OPTIONS[type];
          const isSelected = value === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                isSelected
                  ? option.color + ' ring-2 ring-offset-2 ring-blue-500'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{option.icon}</span>
              <span>{option.labelPt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TextBoundaryEditorProps {
  contextText: string;
  startChar: number;
  endChar: number;
  onBoundaryChange: (start: number, end: number) => void;
}

function TextBoundaryEditor({
  contextText,
  startChar,
  endChar,
  onBoundaryChange,
}: TextBoundaryEditorProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseUp = useCallback(() => {
    if (!textRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const preSelectionRange = document.createRange();
    preSelectionRange.selectNodeContents(textRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);

    const start = preSelectionRange.toString().length;
    const end = start + range.toString().length;

    if (start !== end) {
      onBoundaryChange(start, end);
    }

    setIsDragging(false);
  }, [onBoundaryChange]);

  const { before, entity, after } = getContextWindow(contextText, startChar, endChar, 100);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Selecione o Texto Correto
      </label>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Arraste para selecionar os limites corretos da entidade
      </p>
      <div
        ref={textRef}
        className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm leading-relaxed select-text cursor-text"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={handleMouseUp}
      >
        <span className="text-slate-400">...{before}</span>
        <mark className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
          {entity}
        </mark>
        <span className="text-slate-400">{after}...</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span>
          Início: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">{startChar}</code>
        </span>
        <span>
          Fim: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">{endChar}</code>
        </span>
        <span>
          Texto: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">&quot;{contextText.slice(startChar, endChar)}&quot;</code>
        </span>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function EntityCorrectionModal({
  isOpen,
  onClose,
  entity,
  contextText,
  onSubmit,
  entityTypes = ['DISEASE', 'MEDICATION', 'SYMPTOM', 'EXAM', 'PROCEDURE'],
  sessionId,
  enableTextSelection = true,
}: EntityCorrectionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isNewEntity = !entity;

  // Form state
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(
    isNewEntity ? 'missing' : 'correct'
  );
  const [entityType, setEntityType] = useState<EntityType>(
    entity?.type || 'DISEASE'
  );
  const [startChar, setStartChar] = useState(entity?.startChar || 0);
  const [endChar, setEndChar] = useState(entity?.endChar || 0);
  const [comment, setComment] = useState('');

  // Reset form when entity changes
  useEffect(() => {
    if (entity) {
      setFeedbackType('correct');
      setEntityType(entity.type);
      setStartChar(entity.startChar);
      setEndChar(entity.endChar);
    } else {
      setFeedbackType('missing');
      setEntityType('DISEASE');
      setStartChar(0);
      setEndChar(0);
    }
    setComment('');
  }, [entity]);

  // Handle boundary change
  const handleBoundaryChange = useCallback((start: number, end: number) => {
    setStartChar(start);
    setEndChar(end);
  }, []);

  // Handle submit
  const handleSubmit = useCallback(() => {
    const correction: EntityCorrection = {
      originalEntity: entity || null,
      correctedEntity:
        feedbackType === 'spurious'
          ? null
          : {
              text: contextText.slice(startChar, endChar),
              type: entityType,
              startChar,
              endChar,
              source: 'user',
            },
      feedbackType,
      comment: comment.trim() || undefined,
      timestamp: new Date(),
      sessionId,
    };

    onSubmit(correction);
    onClose();
  }, [
    entity,
    feedbackType,
    entityType,
    startChar,
    endChar,
    comment,
    contextText,
    sessionId,
    onSubmit,
    onClose,
  ]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const firstFocusable = modalRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const needsBoundaryEdit =
    feedbackType === 'incorrect_text' ||
    feedbackType === 'incorrect_both' ||
    feedbackType === 'missing';

  const needsTypeEdit =
    feedbackType === 'incorrect_type' ||
    feedbackType === 'incorrect_both' ||
    feedbackType === 'missing';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xl transition-all"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h3
              id="modal-title"
              className="text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              {isNewEntity ? 'Adicionar Entidade' : 'Corrigir Entidade'}
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Original entity display */}
            {entity && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Entidade Original
                </p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-sm ${ENTITY_TYPE_OPTIONS[entity.type].color}`}>
                    {ENTITY_TYPE_OPTIONS[entity.type].icon} {ENTITY_TYPE_OPTIONS[entity.type].labelPt}
                  </span>
                  <code className="text-sm bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                    &quot;{entity.text}&quot;
                  </code>
                </div>
              </div>
            )}

            {/* Feedback type selector */}
            <FeedbackTypeSelector
              value={feedbackType}
              onChange={setFeedbackType}
              isNewEntity={isNewEntity}
            />

            {/* Text boundary editor */}
            {needsBoundaryEdit && enableTextSelection && (
              <TextBoundaryEditor
                contextText={contextText}
                startChar={startChar}
                endChar={endChar}
                onBoundaryChange={handleBoundaryChange}
              />
            )}

            {/* Entity type selector */}
            {needsTypeEdit && (
              <EntityTypeSelector
                value={entityType}
                onChange={setEntityType}
                availableTypes={entityTypes}
              />
            )}

            {/* Comment */}
            <div className="space-y-2">
              <label
                htmlFor="correction-comment"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Comentário (opcional)
              </label>
              <textarea
                id="correction-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Explique a correção..."
                rows={2}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {feedbackType === 'correct' ? 'Confirmar' : 'Enviar Correção'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// QUICK FEEDBACK BUTTONS (Inline alternative to modal)
// =============================================================================

export interface QuickFeedbackButtonsProps {
  onFeedback: (type: FeedbackType) => void;
  compact?: boolean;
  className?: string;
}

export function QuickFeedbackButtons({
  onFeedback,
  compact = false,
  className = '',
}: QuickFeedbackButtonsProps) {
  const quickOptions: FeedbackType[] = ['correct', 'incorrect_type', 'spurious'];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {quickOptions.map((type) => {
        const option = FEEDBACK_OPTIONS[type];
        return (
          <button
            key={type}
            onClick={() => onFeedback(type)}
            className={`${
              compact ? 'p-1' : 'px-2 py-1'
            } rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`}
            title={option.labelPt}
            aria-label={option.labelPt}
          >
            <span className={compact ? 'text-sm' : ''}>{option.icon}</span>
            {!compact && (
              <span className="ml-1 text-xs">{option.labelPt}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// =============================================================================
// CORRECTION SUMMARY (Display submitted corrections)
// =============================================================================

export interface CorrectionSummaryProps {
  corrections: EntityCorrection[];
  onRemove?: (index: number) => void;
  className?: string;
}

export function CorrectionSummary({
  corrections,
  onRemove,
  className = '',
}: CorrectionSummaryProps) {
  if (corrections.length === 0) {
    return (
      <div className={`text-center py-4 text-slate-400 ${className}`}>
        Nenhuma correção registrada
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Correções ({corrections.length})
      </h4>
      <ul className="space-y-1">
        {corrections.map((correction, index) => {
          const feedbackConfig = FEEDBACK_OPTIONS[correction.feedbackType];

          return (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm"
            >
              <div className="flex items-center gap-2">
                <span>{feedbackConfig.icon}</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {correction.originalEntity?.text || correction.correctedEntity?.text || 'N/A'}
                </span>
                <span className="text-xs text-slate-400">
                  → {feedbackConfig.labelPt}
                </span>
              </div>
              {onRemove && (
                <button
                  onClick={() => onRemove(index)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  aria-label="Remover correção"
                >
                  ×
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default EntityCorrectionModal;
