'use client';

import { Citation } from '@/lib/types/references';
import { getReference } from '@/lib/data/references';
import { EvidenceBadge } from './EvidenceBadge';
import { getEvidenceLevelLabel } from '@/lib/utils/evidence-level';

interface CitationTooltipProps {
  citations: Citation[];
  format?: 'vancouver' | 'abnt';
}

export default function CitationTooltip({ citations, format = 'vancouver' }: CitationTooltipProps) {
  if (citations.length === 0) return null;
  
  return (
    <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 max-w-sm">
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-xl p-4">
        <div className="space-y-3">
          {citations.map((citation, index) => {
            const ref = getReference(citation.refId);
            if (!ref) return null;
            
            return (
              <div key={citation.refId} className="text-sm">
                <div className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  {formatAuthors(ref.authors)}
                </div>
                <div className="text-neutral-700 dark:text-neutral-300">
                  {ref.title}. 
                  {ref.journal && <span className="italic"> {ref.journal}</span>}
                  {ref.year && ` (${ref.year})`}
                  {ref.volume && `, ${ref.volume}`}
                  {ref.pages && `:${ref.pages}`}.
                </div>
                {ref.doi && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    DOI: {ref.doi}
                  </div>
                )}
                {ref.legalNumber && (
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    {ref.legalNumber}
                  </div>
                )}
                {citation.page && (
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Página: {citation.page}
                  </div>
                )}
                {citation.note && (
                  <div className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 italic">
                    {citation.note}
                  </div>
                )}
                {citation.evidenceLevel && (
                  <div className="mt-2 flex items-center gap-2">
                    <EvidenceBadge level={citation.evidenceLevel} size="sm" />
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {getEvidenceLevelLabel(citation.evidenceLevel)}
                    </span>
                  </div>
                )}
                {citation.limitations && citation.limitations.length > 0 && (
                  <div className="mt-2 text-xs text-amber-700 dark:text-amber-400">
                    <strong>Limitações:</strong> {citation.limitations.join('; ')}
                  </div>
                )}
                {citation.conflictsOfInterest && (
                  <div className="mt-1 text-xs text-red-700 dark:text-red-400">
                    <strong>Conflitos:</strong> {citation.conflictsOfInterest}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Triângulo apontando para baixo */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
          <div className="border-8 border-transparent border-t-neutral-200 dark:border-t-neutral-700"></div>
          <div className="border-8 border-transparent border-t-white dark:border-t-neutral-800 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"></div>
        </div>
      </div>
    </div>
  );
}

function formatAuthors(authors?: string[]): string {
  if (!authors || authors.length === 0) return 'Sem autor';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} e ${authors[1]}`;
  return `${authors[0]} et al.`;
}

