'use client';

/**
 * SOAPSectionParser Component
 * ===========================
 *
 * Interactive SOAP note section parser and editor.
 * Automatically detects S/O/A/P sections from clinical text
 * and allows manual correction of section boundaries.
 *
 * Features:
 * - Auto-parse SOAP sections from free text
 * - Manual section boundary adjustment
 * - Inline editing of section content
 * - Integration with NER extraction
 * - Copy/export functionality
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// =============================================================================
// TYPES
// =============================================================================

export type SOAPSectionType = 'subjective' | 'objective' | 'assessment' | 'plan';

export interface SOAPSection {
  type: SOAPSectionType;
  content: string;
  startIndex: number;
  endIndex: number;
  confidence: number;
  isManuallyEdited?: boolean;
}

export interface ParsedSOAP {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  raw: string;
  sections: SOAPSection[];
}

export interface SOAPSectionParserProps {
  /** Input text to parse (free-form SOAP note) */
  text: string;
  /** Callback when sections are updated */
  onSectionsChange?: (parsed: ParsedSOAP) => void;
  /** Callback when a section is clicked */
  onSectionClick?: (section: SOAPSection) => void;
  /** Enable editing mode */
  editable?: boolean;
  /** Show section labels */
  showLabels?: boolean;
  /** Show confidence indicators */
  showConfidence?: boolean;
  /** Custom class name */
  className?: string;
  /** Compact mode */
  compact?: boolean;
  /** Auto-parse on text change */
  autoParse?: boolean;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

export const SECTION_CONFIG: Record<
  SOAPSectionType,
  {
    label: string;
    labelPt: string;
    labelShort: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: string;
    description: string;
    descriptionPt: string;
  }
> = {
  subjective: {
    label: 'Subjective',
    labelPt: 'Subjetivo',
    labelShort: 'S',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
    borderColor: 'border-blue-300 dark:border-blue-700',
    icon: '💬',
    description: "Patient's symptoms, complaints, and history",
    descriptionPt: 'Sintomas, queixas e histórico do paciente',
  },
  objective: {
    label: 'Objective',
    labelPt: 'Objetivo',
    labelShort: 'O',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
    borderColor: 'border-green-300 dark:border-green-700',
    icon: '🔬',
    description: 'Physical exam findings, vital signs, lab results',
    descriptionPt: 'Exame físico, sinais vitais, resultados de exames',
  },
  assessment: {
    label: 'Assessment',
    labelPt: 'Avaliação',
    labelShort: 'A',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50 dark:bg-amber-900/30',
    borderColor: 'border-amber-300 dark:border-amber-700',
    icon: '📋',
    description: 'Diagnosis and clinical reasoning',
    descriptionPt: 'Diagnóstico e raciocínio clínico',
  },
  plan: {
    label: 'Plan',
    labelPt: 'Plano',
    labelShort: 'P',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 dark:bg-purple-900/30',
    borderColor: 'border-purple-300 dark:border-purple-700',
    icon: '📝',
    description: 'Treatment plan, prescriptions, follow-up',
    descriptionPt: 'Plano de tratamento, prescrições, acompanhamento',
  },
};

// =============================================================================
// PARSING FUNCTIONS
// =============================================================================

/**
 * Section header patterns for automatic parsing
 */
const SECTION_PATTERNS: Record<SOAPSectionType, RegExp[]> = {
  subjective: [
    /^s(?:ubjetivo)?[:\s-]/im,
    /^(?:queixa|qp|hda|história da doença|anamnese)[:\s-]/im,
    /^(?:sintomas|relato do paciente)[:\s-]/im,
    /^subjective[:\s-]/im,
    /^cc[:\s-]/im, // Chief Complaint
  ],
  objective: [
    /^o(?:bjetivo)?[:\s-]/im,
    /^(?:exame físico|ef|sinais vitais|sv)[:\s-]/im,
    /^(?:dados objetivos|achados)[:\s-]/im,
    /^objective[:\s-]/im,
    /^(?:physical exam|pe|vitals)[:\s-]/im,
  ],
  assessment: [
    /^a(?:valiação)?[:\s-]/im,
    /^(?:diagnóstico|dx|hipótese diagnóstica|hd)[:\s-]/im,
    /^(?:impressão clínica|conclusão)[:\s-]/im,
    /^assessment[:\s-]/im,
    /^(?:diagnosis|impression)[:\s-]/im,
  ],
  plan: [
    /^p(?:lano)?[:\s-]/im,
    /^(?:conduta|cd|tratamento|prescrição)[:\s-]/im,
    /^(?:orientações|encaminhamentos)[:\s-]/im,
    /^plan[:\s-]/im,
    /^(?:treatment|rx|management)[:\s-]/im,
  ],
};

/**
 * Parse SOAP sections from free-form clinical text
 */
export function parseSOAPText(text: string): ParsedSOAP {
  const sections: SOAPSection[] = [];
  const lines = text.split('\n');

  let currentSection: SOAPSectionType | null = null;
  let currentContent: string[] = [];
  let currentStartIndex = 0;
  let runningIndex = 0;

  const flushSection = () => {
    if (currentSection && currentContent.length > 0) {
      const content = currentContent.join('\n').trim();
      sections.push({
        type: currentSection,
        content,
        startIndex: currentStartIndex,
        endIndex: runningIndex,
        confidence: 0.9, // High confidence for pattern-matched sections
      });
    }
    currentContent = [];
  };

  for (const line of lines) {
    const lineStart = runningIndex;
    runningIndex += line.length + 1; // +1 for newline

    // Check if this line starts a new section
    let foundSection: SOAPSectionType | null = null;
    for (const [sectionType, patterns] of Object.entries(SECTION_PATTERNS) as [SOAPSectionType, RegExp[]][]) {
      for (const pattern of patterns) {
        if (pattern.test(line)) {
          foundSection = sectionType;
          break;
        }
      }
      if (foundSection) break;
    }

    if (foundSection) {
      flushSection();
      currentSection = foundSection;
      currentStartIndex = lineStart;
      // Remove the section header from content
      const headerMatch = line.match(/^[^:\-]+[:\-]\s*/);
      const contentAfterHeader = headerMatch ? line.slice(headerMatch[0].length) : '';
      if (contentAfterHeader.trim()) {
        currentContent.push(contentAfterHeader);
      }
    } else if (currentSection) {
      currentContent.push(line);
    } else {
      // No section detected yet - try to infer from content
      const inferredSection = inferSectionFromContent(line);
      if (inferredSection) {
        currentSection = inferredSection;
        currentStartIndex = lineStart;
        currentContent.push(line);
      }
    }
  }

  // Flush last section
  flushSection();

  // If no sections found, try heuristic parsing
  if (sections.length === 0) {
    return parseSOAPHeuristic(text);
  }

  // Build result
  const result: ParsedSOAP = {
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    raw: text,
    sections,
  };

  for (const section of sections) {
    result[section.type] = section.content;
  }

  return result;
}

/**
 * Infer section type from content keywords
 */
function inferSectionFromContent(line: string): SOAPSectionType | null {
  const normalizedLine = line.toLowerCase();

  // Subjective indicators
  if (/(?:paciente relata|queixa-se|refere|há \d+ dias|sintomas|dor|febre|tosse)/.test(normalizedLine)) {
    return 'subjective';
  }

  // Objective indicators
  if (/(?:pa:|fc:|fr:|t:|sat:|glasgow|ao exame|à ausculta|regular|normotenso|eupneico|mmhg|bpm)/.test(normalizedLine)) {
    return 'objective';
  }

  // Assessment indicators
  if (/(?:hipótese|diagnóstico|cid|j\d{2}|provável|suspeita de|compatível com)/.test(normalizedLine)) {
    return 'assessment';
  }

  // Plan indicators
  if (/(?:prescrevo|solicito|oriento|retorno|encaminho|mg(?:\/|\s)|comprimido|gotas|ml)/.test(normalizedLine)) {
    return 'plan';
  }

  return null;
}

/**
 * Heuristic parsing when no explicit headers found
 */
function parseSOAPHeuristic(text: string): ParsedSOAP {
  const lines = text.split('\n').filter(l => l.trim());
  const sections: SOAPSection[] = [];

  let currentSection: SOAPSectionType = 'subjective';
  let currentContent: string[] = [];
  let currentStartIndex = 0;
  let runningIndex = 0;

  const flushSection = (endIndex: number) => {
    if (currentContent.length > 0) {
      sections.push({
        type: currentSection,
        content: currentContent.join('\n').trim(),
        startIndex: currentStartIndex,
        endIndex,
        confidence: 0.6, // Lower confidence for heuristic parsing
      });
      currentContent = [];
    }
  };

  for (const line of lines) {
    const lineStart = runningIndex;
    runningIndex += line.length + 1;

    const inferredSection = inferSectionFromContent(line);

    if (inferredSection && inferredSection !== currentSection) {
      flushSection(lineStart);
      currentSection = inferredSection;
      currentStartIndex = lineStart;
    }

    currentContent.push(line);
  }

  flushSection(runningIndex);

  const result: ParsedSOAP = {
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    raw: text,
    sections,
  };

  for (const section of sections) {
    result[section.type] = section.content;
  }

  return result;
}

/**
 * Combine sections back into formatted SOAP text
 */
export function formatSOAPText(parsed: ParsedSOAP, includeHeaders = true): string {
  const parts: string[] = [];

  if (parsed.subjective) {
    parts.push(includeHeaders ? `S: ${parsed.subjective}` : parsed.subjective);
  }
  if (parsed.objective) {
    parts.push(includeHeaders ? `O: ${parsed.objective}` : parsed.objective);
  }
  if (parsed.assessment) {
    parts.push(includeHeaders ? `A: ${parsed.assessment}` : parsed.assessment);
  }
  if (parsed.plan) {
    parts.push(includeHeaders ? `P: ${parsed.plan}` : parsed.plan);
  }

  return parts.join('\n\n');
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface SectionHeaderProps {
  type: SOAPSectionType;
  confidence: number;
  showConfidence: boolean;
  isEditing: boolean;
  onEditToggle?: () => void;
}

function SectionHeader({
  type,
  confidence,
  showConfidence,
  isEditing,
  onEditToggle,
}: SectionHeaderProps) {
  const config = SECTION_CONFIG[type];

  return (
    <div className={`flex items-center justify-between px-3 py-2 ${config.bgColor} rounded-t-lg`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{config.icon}</span>
        <span className={`font-semibold ${config.color}`}>
          {config.labelPt}
        </span>
        {showConfidence && (
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            confidence >= 0.8
              ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
              : confidence >= 0.5
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
          }`}>
            {Math.round(confidence * 100)}%
          </span>
        )}
      </div>
      {onEditToggle && (
        <button
          onClick={onEditToggle}
          className={`p-1 rounded hover:bg-white/50 dark:hover:bg-black/20 transition-colors ${
            isEditing ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
          aria-label={isEditing ? 'Save changes' : 'Edit section'}
        >
          {isEditing ? '✓' : '✏️'}
        </button>
      )}
    </div>
  );
}

interface SectionContentProps {
  content: string;
  isEditing: boolean;
  onChange?: (content: string) => void;
  onClick?: () => void;
}

function SectionContent({
  content,
  isEditing,
  onChange,
  onClick,
}: SectionContentProps) {
  if (isEditing && onChange) {
    return (
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[100px] p-3 text-sm bg-white dark:bg-slate-800 border-0 rounded-b-lg focus:ring-2 focus:ring-blue-500 resize-y"
        placeholder="Digite o conteúdo da seção..."
      />
    );
  }

  return (
    <div
      className={`p-3 text-sm whitespace-pre-wrap bg-white dark:bg-slate-800 rounded-b-lg ${
        onClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50' : ''
      }`}
      onClick={onClick}
    >
      {content || (
        <span className="text-slate-400 italic">Seção vazia</span>
      )}
    </div>
  );
}

interface EmptySectionProps {
  type: SOAPSectionType;
  onAdd?: () => void;
}

function EmptySection({ type, onAdd }: EmptySectionProps) {
  const config = SECTION_CONFIG[type];

  return (
    <div
      className={`border-2 border-dashed ${config.borderColor} rounded-lg p-4 text-center ${
        onAdd ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800' : ''
      }`}
      onClick={onAdd}
    >
      <span className="text-2xl opacity-50">{config.icon}</span>
      <p className={`text-sm mt-1 ${config.color} opacity-70`}>
        {config.labelPt}
      </p>
      {onAdd && (
        <p className="text-xs text-slate-400 mt-1">
          Clique para adicionar
        </p>
      )}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function SOAPSectionParser({
  text,
  onSectionsChange,
  onSectionClick,
  editable = false,
  showLabels = true,
  showConfidence = false,
  className = '',
  compact = false,
  autoParse = true,
}: SOAPSectionParserProps) {
  const t = useTranslations('common');

  // Parse text into sections
  const [parsed, setParsed] = useState<ParsedSOAP>(() => parseSOAPText(text));
  const [editingSection, setEditingSection] = useState<SOAPSectionType | null>(null);

  // Re-parse when text changes (if autoParse enabled)
  useEffect(() => {
    if (autoParse) {
      const newParsed = parseSOAPText(text);
      setParsed(newParsed);
    }
  }, [text, autoParse]);

  // Handle section content change
  const handleSectionChange = useCallback(
    (type: SOAPSectionType, content: string) => {
      setParsed((prev) => {
        const updated = { ...prev, [type]: content };

        // Update sections array
        const sectionIndex = updated.sections.findIndex((s) => s.type === type);
        if (sectionIndex >= 0) {
          updated.sections = [...updated.sections];
          updated.sections[sectionIndex] = {
            ...updated.sections[sectionIndex],
            content,
            isManuallyEdited: true,
          };
        } else {
          // Add new section
          updated.sections = [
            ...updated.sections,
            {
              type,
              content,
              startIndex: 0,
              endIndex: content.length,
              confidence: 1.0,
              isManuallyEdited: true,
            },
          ];
        }

        onSectionsChange?.(updated);
        return updated;
      });
    },
    [onSectionsChange]
  );

  // Handle edit toggle
  const handleEditToggle = useCallback(
    (type: SOAPSectionType) => {
      if (editingSection === type) {
        setEditingSection(null);
      } else {
        setEditingSection(type);
      }
    },
    [editingSection]
  );

  // Get section by type
  const getSection = useCallback(
    (type: SOAPSectionType): SOAPSection | undefined => {
      return parsed.sections.find((s) => s.type === type);
    },
    [parsed.sections]
  );

  // Render a single section
  const renderSection = useCallback(
    (type: SOAPSectionType) => {
      const section = getSection(type);
      const content = parsed[type];
      const config = SECTION_CONFIG[type];
      const isEditing = editingSection === type;

      if (!content && !editable) {
        return null;
      }

      if (!content && editable) {
        return (
          <EmptySection
            key={type}
            type={type}
            onAdd={() => handleEditToggle(type)}
          />
        );
      }

      return (
        <div
          key={type}
          className={`rounded-lg border ${config.borderColor} overflow-hidden shadow-sm`}
        >
          {showLabels && (
            <SectionHeader
              type={type}
              confidence={section?.confidence ?? 0.5}
              showConfidence={showConfidence}
              isEditing={isEditing}
              onEditToggle={editable ? () => handleEditToggle(type) : undefined}
            />
          )}
          <SectionContent
            content={content}
            isEditing={isEditing}
            onChange={editable ? (c) => handleSectionChange(type, c) : undefined}
            onClick={onSectionClick && section ? () => onSectionClick(section) : undefined}
          />
        </div>
      );
    },
    [
      parsed,
      getSection,
      editingSection,
      editable,
      showLabels,
      showConfidence,
      handleEditToggle,
      handleSectionChange,
      onSectionClick,
    ]
  );

  const sectionOrder: SOAPSectionType[] = ['subjective', 'objective', 'assessment', 'plan'];

  return (
    <div
      className={`${compact ? 'space-y-2' : 'space-y-4'} ${className}`}
      role="region"
      aria-label="SOAP note sections"
    >
      {sectionOrder.map(renderSection)}
    </div>
  );
}

// =============================================================================
// SOAP EDITOR COMPONENT (Full editor with toolbar)
// =============================================================================

export interface SOAPEditorProps {
  initialText?: string;
  initialParsed?: ParsedSOAP;
  onChange?: (parsed: ParsedSOAP) => void;
  onSave?: (parsed: ParsedSOAP) => void;
  className?: string;
  showToolbar?: boolean;
}

export function SOAPEditor({
  initialText = '',
  initialParsed,
  onChange,
  onSave,
  className = '',
  showToolbar = true,
}: SOAPEditorProps) {
  const [parsed, setParsed] = useState<ParsedSOAP>(
    initialParsed || parseSOAPText(initialText)
  );
  const [viewMode, setViewMode] = useState<'sections' | 'raw'>('sections');

  const handleSectionsChange = useCallback(
    (newParsed: ParsedSOAP) => {
      setParsed(newParsed);
      onChange?.(newParsed);
    },
    [onChange]
  );

  const handleRawChange = useCallback(
    (rawText: string) => {
      const newParsed = parseSOAPText(rawText);
      setParsed(newParsed);
      onChange?.(newParsed);
    },
    [onChange]
  );

  const handleCopy = useCallback(() => {
    const formatted = formatSOAPText(parsed);
    navigator.clipboard.writeText(formatted);
  }, [parsed]);

  const handleClear = useCallback(() => {
    const empty: ParsedSOAP = {
      subjective: '',
      objective: '',
      assessment: '',
      plan: '',
      raw: '',
      sections: [],
    };
    setParsed(empty);
    onChange?.(empty);
  }, [onChange]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {showToolbar && (
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('sections')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                viewMode === 'sections'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              📋 Seções
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                viewMode === 'raw'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              📝 Texto Livre
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              📋 Copiar
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              🗑️ Limpar
            </button>
            {onSave && (
              <button
                onClick={() => onSave(parsed)}
                className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                💾 Salvar
              </button>
            )}
          </div>
        </div>
      )}

      {viewMode === 'sections' ? (
        <SOAPSectionParser
          text={parsed.raw}
          onSectionsChange={handleSectionsChange}
          editable={true}
          showLabels={true}
          showConfidence={true}
          autoParse={false}
        />
      ) : (
        <textarea
          value={parsed.raw}
          onChange={(e) => handleRawChange(e.target.value)}
          className="w-full min-h-[400px] p-4 text-sm font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 resize-y"
          placeholder="Digite ou cole a nota SOAP aqui...

S: Queixas do paciente...

O: Exame físico, sinais vitais...

A: Diagnóstico/Avaliação...

P: Plano de tratamento..."
        />
      )}
    </div>
  );
}

// =============================================================================
// SOAP PREVIEW COMPONENT (Read-only compact view)
// =============================================================================

export interface SOAPPreviewProps {
  parsed: ParsedSOAP;
  maxLength?: number;
  className?: string;
}

export function SOAPPreview({
  parsed,
  maxLength = 100,
  className = '',
}: SOAPPreviewProps) {
  const truncate = (text: string) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const sectionOrder: SOAPSectionType[] = ['subjective', 'objective', 'assessment', 'plan'];

  return (
    <div className={`grid grid-cols-2 gap-2 text-xs ${className}`}>
      {sectionOrder.map((type) => {
        const content = parsed[type];
        const config = SECTION_CONFIG[type];

        if (!content) return null;

        return (
          <div
            key={type}
            className={`p-2 rounded ${config.bgColor} ${config.color}`}
          >
            <span className="font-semibold">{config.labelShort}: </span>
            <span className="opacity-80">{truncate(content)}</span>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default SOAPSectionParser;
