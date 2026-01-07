'use client';

import { useState, useMemo } from 'react';
import { Reference } from '@/lib/types/references';
import { references } from '@/lib/data/references';
import {
  generatePubMedUrl,
  generateDoiUrl,
  formatReferenceVancouver,
  formatReferenceBibTeX,
} from '@/lib/utils/citation-manager';

interface ReferenceListProps {
  filterByIds?: string[];
  format?: 'vancouver' | 'abnt';
}

export default function ReferenceList({
  filterByIds,
  format = 'vancouver',
}: ReferenceListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRefs = useMemo(() => {
    let refs = Object.values(references);

    // Filter by specific IDs if provided
    if (filterByIds && filterByIds.length > 0) {
      refs = refs.filter((ref) => filterByIds.includes(ref.id));
    }

    // Filter by type
    if (filterType !== 'all') {
      refs = refs.filter((ref) => ref.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      refs = refs.filter(
        (ref) =>
          ref.title.toLowerCase().includes(term) ||
          ref.authors?.some((author) => author.toLowerCase().includes(term)) ||
          ref.year.toString().includes(term) ||
          ref.doi?.toLowerCase().includes(term) ||
          ref.pmid?.includes(term)
      );
    }

    // Sort by year (newest first) then alphabetically
    return refs.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return a.title.localeCompare(b.title);
    });
  }, [filterByIds, filterType, searchTerm]);

  const handleCopy = async (ref: Reference, formatType: 'vancouver' | 'bibtex') => {
    const text =
      formatType === 'vancouver'
        ? formatReferenceVancouver(ref)
        : formatReferenceBibTeX(ref);

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(ref.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search references (title, author, year, DOI, PMID)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All types</option>
          <option value="artigo">Articles</option>
          <option value="portaria">Regulations</option>
          <option value="lei">Laws</option>
          <option value="diretriz">Guidelines</option>
          <option value="nota_tecnica">Technical Notes</option>
          <option value="livro">Books</option>
          <option value="site">Websites</option>
          <option value="relatorio">Reports</option>
        </select>
      </div>

      {/* Count */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {filteredRefs.length}{' '}
        {filteredRefs.length === 1 ? 'reference found' : 'references found'}
      </div>

      {/* Reference List */}
      <div className="space-y-4">
        {filteredRefs.map((ref, index) => (
          <div
            key={ref.id}
            id={`ref-${ref.id}`}
            className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors rounded-r"
          >
            {format === 'vancouver' ? (
              <VancouverFormat ref={ref} number={index + 1} />
            ) : (
              <ABNTFormat ref={ref} />
            )}

            {/* External links */}
            <div className="flex flex-wrap gap-2 mt-2">
              {ref.doi && (
                <a
                  href={generateDoiUrl(ref.doi)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <LinkIcon />
                  DOI
                </a>
              )}
              {ref.pmid && (
                <a
                  href={generatePubMedUrl(ref.pmid)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
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
                >
                  <PmcIcon />
                  PMC
                </a>
              )}
              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  <ExternalLinkIcon />
                  Link
                </a>
              )}

              {/* Copy buttons */}
              <button
                onClick={() => handleCopy(ref, 'vancouver')}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
              >
                {copiedId === ref.id ? <CheckIcon /> : <CopyIcon />}
                {copiedId === ref.id ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={() => handleCopy(ref, 'bibtex')}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
              >
                BibTeX
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRefs.length === 0 && (
        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
          No references found.
        </div>
      )}
    </div>
  );
}

function VancouverFormat({ ref, number }: { ref: Reference; number: number }) {
  return (
    <div className="text-sm">
      <span className="font-bold text-neutral-900 dark:text-neutral-100">
        {number}.{' '}
      </span>
      <span className="text-neutral-800 dark:text-neutral-200">
        {ref.authors && ref.authors.length > 0 && (
          <>{formatAuthorsVancouver(ref.authors)}. </>
        )}
        {ref.title}.
        {ref.journal && <span className="italic"> {ref.journal}</span>}
        {ref.year && `. ${ref.year}`}
        {ref.volume && `;${ref.volume}`}
        {ref.issue && `(${ref.issue})`}
        {ref.pages && `:${ref.pages}`}.
        {ref.doi && (
          <span className="text-blue-600 dark:text-blue-400">
            {' '}
            doi: {ref.doi}
          </span>
        )}
        {ref.pmid && (
          <span className="text-emerald-600 dark:text-emerald-400">
            {' '}
            PMID: {ref.pmid}
          </span>
        )}
        {ref.legalNumber && (
          <div className="mt-1 text-emerald-600 dark:text-emerald-400 font-medium">
            {ref.legalNumber}
          </div>
        )}
      </span>
      <TypeBadge type={ref.type} />
    </div>
  );
}

function ABNTFormat({ ref }: { ref: Reference }) {
  return (
    <div className="text-sm text-neutral-800 dark:text-neutral-200">
      {ref.authors && ref.authors.length > 0 && (
        <>{formatAuthorsABNT(ref.authors)}. </>
      )}
      <strong>{ref.title}</strong>.
      {ref.journal && <span className="italic"> {ref.journal}</span>}
      {ref.volume && `, v. ${ref.volume}`}
      {ref.issue && `, n. ${ref.issue}`}
      {ref.pages && `, p. ${ref.pages}`}
      {ref.year && `, ${ref.year}`}.
      {ref.doi && ` DOI: ${ref.doi}.`}
      {ref.pmid && ` PMID: ${ref.pmid}.`}
      <TypeBadge type={ref.type} />
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  const colors = {
    artigo:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    portaria:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    lei: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    diretriz:
      'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    nota_tecnica:
      'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    livro:
      'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    site: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200',
    relatorio:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  };

  const labels = {
    artigo: 'Article',
    portaria: 'Regulation',
    lei: 'Law',
    diretriz: 'Guideline',
    nota_tecnica: 'Technical Note',
    livro: 'Book',
    site: 'Website',
    relatorio: 'Report',
  };

  return (
    <span
      className={`inline-block ml-2 px-2 py-0.5 text-xs rounded-full ${
        colors[type as keyof typeof colors] || colors.site
      }`}
    >
      {labels[type as keyof typeof labels] || type}
    </span>
  );
}

function formatAuthorsVancouver(authors: string[]): string {
  if (authors.length === 1) return authors[0];
  if (authors.length <= 6) return authors.join(', ');
  return `${authors.slice(0, 6).join(', ')}, et al`;
}

function formatAuthorsABNT(authors: string[]): string {
  const formatted = authors.map((author) => {
    const parts = author.split(' ');
    if (parts.length === 1) return author.toUpperCase();
    const lastName = parts.pop()!.toUpperCase();
    const firstNames = parts.join(' ');
    return `${lastName}, ${firstNames}`;
  });

  if (formatted.length === 1) return formatted[0];
  if (formatted.length <= 3) return formatted.join('; ');
  return `${formatted[0]} et al`;
}

// Icons
function LinkIcon() {
  return (
    <svg
      className="w-3 h-3"
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
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

function PmcIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="w-3 h-3"
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
      className="w-3 h-3"
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
      className="w-3 h-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
