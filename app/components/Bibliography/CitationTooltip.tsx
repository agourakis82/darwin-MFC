'use client';

import { useState } from 'react';
import { Citation } from '@/lib/types/references';
import { getReference } from '@/lib/data/references';
import { EvidenceBadge } from './EvidenceBadge';
import { getAnyEvidenceLevelLabel } from '@/lib/utils/evidence-level';
import {
  generatePubMedUrl,
  generateDoiUrl,
  formatReferenceVancouver,
} from '@/lib/utils/citation-manager';

interface CitationTooltipProps {
  citations: Citation[];
  format?: 'vancouver' | 'abnt';
  position?: 'top' | 'bottom';
}

export default function CitationTooltip({
  citations,
  format = 'vancouver',
  position = 'top',
}: CitationTooltipProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (citations.length === 0) return null;

  const handleCopyCitation = async (refId: string) => {
    const ref = getReference(refId);
    if (!ref) return;

    const formattedCitation = formatReferenceVancouver(ref);

    try {
      await navigator.clipboard.writeText(formattedCitation);
      setCopiedId(refId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  const positionClasses =
    position === 'top'
      ? 'bottom-full mb-2'
      : 'top-full mt-2';

  const arrowClasses =
    position === 'top'
      ? 'top-full border-t-neutral-200 dark:border-t-neutral-700'
      : 'bottom-full border-b-neutral-200 dark:border-b-neutral-700 rotate-180';

  return (
    <div
      className={`absolute z-50 ${positionClasses} left-1/2 transform -translate-x-1/2 w-[420px] max-w-[90vw]`}
    >
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {citations.length === 1
              ? 'Reference'
              : `${citations.length} References`}
          </span>
        </div>

        {/* Citations list */}
        <div className="max-h-80 overflow-y-auto">
          <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
            {citations.map((citation) => {
              const ref = getReference(citation.refId);
              if (!ref) return null;

              return (
                <div
                  key={citation.refId}
                  className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                >
                  {/* Authors */}
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm mb-1">
                    {formatAuthors(ref.authors)}
                  </div>

                  {/* Title */}
                  <div className="text-neutral-700 dark:text-neutral-300 text-sm mb-2">
                    {ref.title}
                    {ref.journal && (
                      <span className="italic text-neutral-600 dark:text-neutral-400">
                        {' '}
                        {ref.journal}
                      </span>
                    )}
                    {ref.year && (
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {' '}
                        ({ref.year})
                      </span>
                    )}
                    {ref.volume && (
                      <span className="text-neutral-500 dark:text-neutral-400">
                        , {ref.volume}
                        {ref.issue && `(${ref.issue})`}
                      </span>
                    )}
                    {ref.pages && (
                      <span className="text-neutral-500 dark:text-neutral-400">
                        :{ref.pages}
                      </span>
                    )}
                  </div>

                  {/* Abstract preview */}
                  {ref.abstract && (
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 line-clamp-2 italic">
                      {ref.abstract}
                    </div>
                  )}

                  {/* External links: DOI, PMID, PMC */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {ref.doi && (
                      <a
                        href={generateDoiUrl(ref.doi)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DoiIcon />
                        DOI
                      </a>
                    )}
                    {ref.pmid && (
                      <a
                        href={generatePubMedUrl(ref.pmid)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PubMedIcon />
                        PubMed
                      </a>
                    )}
                    {ref.pmc && (
                      <a
                        href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${ref.pmc}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PmcIcon />
                        PMC
                      </a>
                    )}
                    {ref.url && !ref.doi && !ref.pmid && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LinkIcon />
                        Link
                      </a>
                    )}
                  </div>

                  {/* Legal number for regulations */}
                  {ref.legalNumber && (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                      {ref.legalNumber}
                    </div>
                  )}

                  {/* Citation metadata */}
                  {citation.page && (
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                      <span className="font-medium">Page:</span> {citation.page}
                    </div>
                  )}
                  {citation.note && (
                    <div className="text-xs text-neutral-600 dark:text-neutral-300 italic mb-1">
                      {citation.note}
                    </div>
                  )}

                  {/* Evidence level */}
                  {citation.evidenceLevel && (
                    <div className="flex items-center gap-2 mb-2">
                      <EvidenceBadge level={citation.evidenceLevel} size="sm" />
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {getAnyEvidenceLevelLabel(citation.evidenceLevel)}
                      </span>
                    </div>
                  )}

                  {/* Limitations */}
                  {citation.limitations && citation.limitations.length > 0 && (
                    <div className="text-xs text-amber-700 dark:text-amber-400 mb-1">
                      <span className="font-medium">Limitations:</span>{' '}
                      {citation.limitations.join('; ')}
                    </div>
                  )}

                  {/* Conflicts of interest */}
                  {citation.conflictsOfInterest && (
                    <div className="text-xs text-red-700 dark:text-red-400 mb-1">
                      <span className="font-medium">Conflicts:</span>{' '}
                      {citation.conflictsOfInterest}
                    </div>
                  )}

                  {/* Copy button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCitation(citation.refId);
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                  >
                    {copiedId === citation.refId ? (
                      <>
                        <CheckIcon />
                        Copied!
                      </>
                    ) : (
                      <>
                        <CopyIcon />
                        Copy citation
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div
        className={`absolute ${arrowClasses} left-1/2 transform -translate-x-1/2`}
      >
        <div className="border-8 border-transparent border-t-neutral-200 dark:border-t-neutral-700"></div>
        <div className="border-8 border-transparent border-t-white dark:border-t-neutral-800 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[1px]"></div>
      </div>
    </div>
  );
}

function formatAuthors(authors?: string[]): string {
  if (!authors || authors.length === 0) return 'No author';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
  return `${authors[0]} et al.`;
}

// Icons
function DoiIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function PubMedIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

function PmcIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
