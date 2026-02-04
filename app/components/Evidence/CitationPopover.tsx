'use client';

import React, { useState } from 'react';
import { ExternalLink, BookOpen, FileText, Calendar, Users, AlertCircle } from 'lucide-react';
import type { Reference, Citation } from '@/lib/types/references';
import type { GradeCertainty, StudyType } from '@/lib/types/evidence';
import { GRADE_CERTAINTY_CONFIG } from '@/lib/types/evidence';
import { EvidenceBadge } from './EvidenceBadge';

export interface CitationPopoverProps {
  /** The citation data */
  citation: Citation;
  /** The full reference data */
  reference?: Reference;
  /** Citation number for display */
  citationNumber: number;
  /** Show popover on hover */
  showOnHover?: boolean;
  /** Always show expanded view */
  expanded?: boolean;
}

const STUDY_TYPE_LABELS: Record<StudyType, { label: string; color: string }> = {
  RCT: { label: 'Ensaio Clínico Randomizado', color: 'text-green-400' },
  SystematicReview: { label: 'Revisão Sistemática', color: 'text-green-400' },
  MetaAnalysis: { label: 'Meta-análise', color: 'text-green-400' },
  Cohort: { label: 'Estudo de Coorte', color: 'text-yellow-400' },
  CaseControl: { label: 'Caso-Controle', color: 'text-yellow-400' },
  CaseSeries: { label: 'Série de Casos', color: 'text-orange-400' },
  CaseReport: { label: 'Relato de Caso', color: 'text-orange-400' },
  ExpertOpinion: { label: 'Opinião de Especialista', color: 'text-red-400' },
  Guideline: { label: 'Diretriz Clínica', color: 'text-blue-400' },
  Consensus: { label: 'Consenso', color: 'text-blue-400' },
  Observational: { label: 'Estudo Observacional', color: 'text-yellow-400' },
  CrossSectional: { label: 'Transversal', color: 'text-yellow-400' },
};

function formatAuthors(authors?: string[]): string {
  if (!authors || authors.length === 0) return '';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} e ${authors[1]}`;
  return `${authors[0]} et al.`;
}

function formatVancouver(reference: Reference): string {
  const parts: string[] = [];

  // Authors or organization
  if (reference.authors && reference.authors.length > 0) {
    parts.push(formatAuthors(reference.authors));
  } else if (reference.organization && reference.organization.length > 0) {
    parts.push(reference.organization.join(', '));
  }

  // Title
  parts.push(reference.title);

  // Journal/Publisher
  if (reference.journal) {
    parts.push(reference.journal);
  } else if (reference.publisher) {
    parts.push(reference.publisher);
  }

  // Year
  parts.push(reference.year.toString());

  // Volume/Pages
  if (reference.volume) {
    let volPages = reference.volume;
    if (reference.pages) {
      volPages += `:${reference.pages}`;
    }
    parts.push(volPages);
  }

  return parts.join('. ');
}

export function CitationPopover({
  citation,
  reference,
  citationNumber,
  showOnHover = true,
  expanded = false,
}: CitationPopoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showPopover = expanded || (showOnHover && isHovered);

  // Map evidence level from DynaMed style (A/B/C/D) to GRADE certainty
  const gradeCertainty: GradeCertainty | undefined = citation.evidenceLevel
    ? citation.evidenceLevel === 'A'
      ? 'high'
      : citation.evidenceLevel === 'B'
      ? 'moderate'
      : citation.evidenceLevel === 'C'
      ? 'low'
      : citation.evidenceLevel === 'D' || citation.evidenceLevel === 'GPP'
      ? 'very_low'
      : undefined
    : undefined;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Citation number */}
      <sup
        className="
          text-blue-400 hover:text-blue-300 cursor-pointer
          font-medium transition-colors
        "
        role="button"
        aria-label={`Referência ${citationNumber}`}
        aria-expanded={showPopover}
      >
        [{citationNumber}]
      </sup>

      {/* Popover */}
      {showPopover && (
        <div
          className="
            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
            w-80 p-3 rounded-lg
            bg-neutral-900 border border-neutral-700
            shadow-xl z-50
            text-left
          "
          role="tooltip"
        >
          {/* Arrow */}
          <div
            className="
              absolute top-full left-1/2 -translate-x-1/2
              border-8 border-transparent border-t-neutral-900
            "
            aria-hidden="true"
          />

          {/* Header with evidence badge */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-xs text-neutral-500">Ref. [{citationNumber}]</span>
            <div className="flex items-center gap-1.5">
              {citation.studyType && (
                <span
                  className={`text-xs ${STUDY_TYPE_LABELS[citation.studyType]?.color || 'text-neutral-400'}`}
                >
                  {STUDY_TYPE_LABELS[citation.studyType]?.label || citation.studyType}
                </span>
              )}
              {gradeCertainty && (
                <EvidenceBadge certainty={gradeCertainty} size="sm" showLabel={false} showSymbols />
              )}
            </div>
          </div>

          {/* Reference details */}
          {reference ? (
            <div className="space-y-2">
              {/* Title */}
              <p className="text-sm font-medium text-neutral-200 leading-tight">
                {reference.title}
              </p>

              {/* Authors/Organization */}
              {(reference.authors || reference.organization) && (
                <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <Users size={12} className="flex-shrink-0" />
                  {reference.authors
                    ? formatAuthors(reference.authors)
                    : reference.organization?.join(', ')}
                </p>
              )}

              {/* Journal/Year */}
              <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                <BookOpen size={12} className="flex-shrink-0" />
                {reference.journal && `${reference.journal}, `}
                {reference.year}
                {reference.volume && `;${reference.volume}`}
                {reference.pages && `:${reference.pages}`}
              </p>

              {/* DOI/PMID links */}
              <div className="flex flex-wrap gap-2 pt-1">
                {reference.doi && (
                  <a
                    href={`https://doi.org/${reference.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-1 text-xs
                      text-blue-400 hover:text-blue-300
                      transition-colors
                    "
                  >
                    <ExternalLink size={10} />
                    DOI
                  </a>
                )}
                {reference.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-1 text-xs
                      text-blue-400 hover:text-blue-300
                      transition-colors
                    "
                  >
                    <ExternalLink size={10} />
                    PubMed
                  </a>
                )}
                {reference.url && !reference.doi && !reference.pmid && (
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-1 text-xs
                      text-blue-400 hover:text-blue-300
                      transition-colors
                    "
                  >
                    <ExternalLink size={10} />
                    Link
                  </a>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-neutral-400">
              Referência: {citation.refId}
            </p>
          )}

          {/* Quality score */}
          {citation.qualityScore !== undefined && (
            <div className="mt-2 pt-2 border-t border-neutral-700">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Score de qualidade:</span>
                <span
                  className={`font-medium ${
                    citation.qualityScore >= 7
                      ? 'text-green-400'
                      : citation.qualityScore >= 4
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}
                >
                  {citation.qualityScore}/10
                </span>
              </div>
            </div>
          )}

          {/* Limitations */}
          {citation.limitations && citation.limitations.length > 0 && (
            <div className="mt-2 pt-2 border-t border-neutral-700">
              <p className="text-xs font-medium text-orange-400 flex items-center gap-1 mb-1">
                <AlertCircle size={12} />
                Limitações:
              </p>
              <ul className="text-xs text-neutral-400 space-y-0.5 ml-4">
                {citation.limitations.map((limitation, idx) => (
                  <li key={idx}>• {limitation}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Conflicts of interest */}
          {citation.conflictsOfInterest && (
            <div className="mt-2 pt-2 border-t border-neutral-700">
              <p className="text-xs text-red-400">
                ⚠️ {citation.conflictsOfInterest}
              </p>
            </div>
          )}

          {/* Page reference */}
          {citation.page && (
            <p className="mt-2 text-xs text-neutral-500">
              <FileText size={10} className="inline mr-1" />
              Página: {citation.page}
            </p>
          )}

          {/* Note */}
          {citation.note && (
            <p className="mt-2 text-xs text-neutral-400 italic">
              {citation.note}
            </p>
          )}
        </div>
      )}
    </span>
  );
}

/**
 * Inline citation group (e.g., [1,2,3])
 */
export function InlineCitationGroup({
  citations,
  references,
}: {
  citations: Citation[];
  references: Map<string, Reference>;
}) {
  return (
    <span className="inline-flex items-baseline">
      <sup className="text-blue-400 font-medium">[</sup>
      {citations.map((citation, idx) => {
        const ref = references.get(citation.refId);
        return (
          <React.Fragment key={citation.refId}>
            <CitationPopover
              citation={citation}
              reference={ref}
              citationNumber={idx + 1}
            />
            {idx < citations.length - 1 && (
              <sup className="text-blue-400">,</sup>
            )}
          </React.Fragment>
        );
      })}
      <sup className="text-blue-400 font-medium">]</sup>
    </span>
  );
}
