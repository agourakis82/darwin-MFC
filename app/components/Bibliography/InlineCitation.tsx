'use client';

import { useState, useCallback, useMemo, createContext, useContext } from 'react';
import { Citation } from '@/lib/types/references';
import { getReference } from '@/lib/data/references';
import CitationTooltip from './CitationTooltip';
import { EvidenceBadge } from './EvidenceBadge';
import type { EvidenceLevel } from '@/lib/types/evidence';
import {
  formatCitationNumbers,
  createCitationNumberMap,
  formatReferenceVancouver,
} from '@/lib/utils/citation-manager';

// ============================================
// CITATION CONTEXT
// ============================================

interface CitationContextValue {
  citationMap: Map<string, number>;
  registerCitation: (refId: string) => number;
}

const CitationContext = createContext<CitationContextValue | null>(null);

/**
 * Provider component that manages citation numbering across a page
 * Wrap your page content with this to enable sequential citation numbers
 */
export function CitationProvider({ children }: { children: React.ReactNode }) {
  const [citations, setCitations] = useState<string[]>([]);
  const citationMap = useMemo(() => createCitationNumberMap(citations), [citations]);

  const registerCitation = useCallback((refId: string) => {
    setCitations((prev) => {
      if (!prev.includes(refId)) {
        return [...prev, refId];
      }
      return prev;
    });
    return citationMap.get(refId) || citations.length + 1;
  }, [citationMap, citations.length]);

  return (
    <CitationContext.Provider value={{ citationMap, registerCitation }}>
      {children}
    </CitationContext.Provider>
  );
}

// ============================================
// INLINE CITATION COMPONENT
// ============================================

interface InlineCitationProps {
  citation: Citation | Citation[];
  format?: 'vancouver' | 'abnt';
  showEvidenceLevel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tooltipPosition?: 'top' | 'bottom';
}

export default function InlineCitation({
  citation,
  format = 'vancouver',
  showEvidenceLevel = true,
  size = 'md',
  tooltipPosition = 'top',
}: InlineCitationProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);

  const citationContext = useContext(CitationContext);

  const citations = Array.isArray(citation) ? citation : [citation];
  const refIds = citations.map((c) => c.refId);

  // Get citation numbers
  const numbers = useMemo(() => {
    if (citationContext) {
      return refIds.map((id) => citationContext.citationMap.get(id) || 0).filter((n) => n > 0);
    }
    // Fallback: use stable numbering based on order
    return refIds.map((_, index) => index + 1);
  }, [citationContext, refIds]);

  // Format display text
  const displayText = useMemo(() => {
    if (format === 'vancouver') {
      return numbers.length > 0 ? formatCitationNumbers(numbers) : formatVancouverFallback(refIds);
    }
    return formatABNT(citations);
  }, [format, numbers, refIds, citations]);

  // Get evidence level from first citation if available
  const evidenceLevel: EvidenceLevel | undefined = citations[0]?.evidenceLevel;

  // Handle copy citation
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const refs = refIds.map((id) => getReference(id)).filter(Boolean);
    if (refs.length === 0) return;

    const formattedText = refs
      .map((ref, index) => formatReferenceVancouver(ref!, index + 1))
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <span
      className="relative inline-flex items-center gap-1"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        className={`
          text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300
          font-medium cursor-pointer transition-colors
          hover:underline decoration-dotted underline-offset-2
          ${sizeClasses[size]}
        `}
        onClick={(e) => {
          e.preventDefault();
          // Dispatch custom event for scrolling to reference
          const event = new CustomEvent('showReference', { detail: { refIds } });
          window.dispatchEvent(event);
        }}
        onContextMenu={handleCopy}
        aria-label={`Reference ${displayText}`}
        title="Click to view, right-click to copy"
      >
        {displayText}
      </button>

      {showEvidenceLevel && evidenceLevel && (
        <EvidenceBadge level={evidenceLevel} size="sm" />
      )}

      {showTooltip && (
        <CitationTooltip
          citations={citations}
          format={format}
          position={tooltipPosition}
        />
      )}

      {/* Copy feedback */}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-xs rounded whitespace-nowrap">
          Copied!
        </span>
      )}
    </span>
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatVancouverFallback(refIds: string[]): string {
  if (refIds.length === 0) return '';
  if (refIds.length === 1) return `[${getRefNumber(refIds[0])}]`;

  const numbers = refIds.map(getRefNumber).sort((a, b) => a - b);

  if (areConsecutive(numbers) && numbers.length >= 3) {
    return `[${numbers[0]}-${numbers[numbers.length - 1]}]`;
  }

  return `[${numbers.join(',')}]`;
}

function formatABNT(citations: Citation[]): string {
  if (citations.length === 0) return '';

  const ref = getReference(citations[0].refId);
  if (!ref) return '';

  const author = ref.authors?.[0]?.split(' ').pop()?.toUpperCase() || 'SEM AUTOR';
  return `(${author}, ${ref.year})`;
}

function getRefNumber(refId: string): number {
  // Generate a stable number from refId
  return Math.abs(hashCode(refId) % 100) + 1;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

function areConsecutive(numbers: number[]): boolean {
  if (numbers.length < 2) return false;
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] !== numbers[i - 1] + 1) return false;
  }
  return true;
}

// ============================================
// QUICK CITATION COMPONENT
// ============================================

/**
 * Simplified citation component for quick inline references
 * Usage: <QuickCitation refId="pmid-12345678" />
 */
interface QuickCitationProps {
  refId: string;
  page?: string;
  note?: string;
}

export function QuickCitation({ refId, page, note }: QuickCitationProps) {
  return (
    <InlineCitation
      citation={{ refId, page, note }}
      showEvidenceLevel={false}
      size="sm"
    />
  );
}

// ============================================
// MULTIPLE CITATIONS COMPONENT
// ============================================

/**
 * Component for citing multiple references at once
 * Usage: <MultiCitation refIds={['ref1', 'ref2', 'ref3']} />
 */
interface MultiCitationProps {
  refIds: string[];
  showEvidenceLevel?: boolean;
}

export function MultiCitation({ refIds, showEvidenceLevel = false }: MultiCitationProps) {
  const citations: Citation[] = refIds.map((refId) => ({ refId }));
  return (
    <InlineCitation
      citation={citations}
      showEvidenceLevel={showEvidenceLevel}
    />
  );
}
