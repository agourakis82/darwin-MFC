'use client';

import { useState } from 'react';
import { Citation } from '@/lib/types/references';
import { getReference } from '@/lib/data/references';
import CitationTooltip from './CitationTooltip';

interface InlineCitationProps {
  citation: Citation | Citation[];
  format?: 'vancouver' | 'abnt';
}

export default function InlineCitation({ citation, format = 'vancouver' }: InlineCitationProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const citations = Array.isArray(citation) ? citation : [citation];
  const refIds = citations.map(c => c.refId);
  
  // Para Vancouver: [1], [2,3], [1-3]
  // Para ABNT: (AUTOR, ANO)
  const displayText = format === 'vancouver' 
    ? formatVancouver(refIds)
    : formatABNT(citations);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium cursor-pointer transition-colors"
        onClick={() => {
          // Scroll para a seção de bibliografia ou abrir modal
          const event = new CustomEvent('showReference', { detail: { refIds } });
          window.dispatchEvent(event);
        }}
        aria-label={`Referência ${displayText}`}
      >
        {displayText}
      </button>
      
      {showTooltip && (
        <CitationTooltip citations={citations} format={format} />
      )}
    </span>
  );
}

function formatVancouver(refIds: string[]): string {
  if (refIds.length === 0) return '';
  if (refIds.length === 1) return `[${getRefNumber(refIds[0])}]`;
  
  // Se forem consecutivos, mostrar como range: [1-3]
  // Senão, mostrar como lista: [1,3,5]
  const numbers = refIds.map(getRefNumber).sort((a, b) => a - b);
  
  if (areConsecutive(numbers)) {
    return `[${numbers[0]}-${numbers[numbers.length - 1]}]`;
  }
  
  return `[${numbers.join(',')}]`;
}

function formatABNT(citations: Citation[]): string {
  // Formato: (AUTOR, ANO) ou (AUTOR1; AUTOR2, ANO)
  if (citations.length === 0) return '';
  
  const ref = getReference(citations[0].refId);
  if (!ref) return '';
  
  const author = ref.authors?.[0]?.split(' ').pop()?.toUpperCase() || 'SEM AUTOR';
  return `(${author}, ${ref.year})`;
}

function getRefNumber(refId: string): number {
  // Em uma implementação real, isso viria de um mapa global de referências
  // Para simplificar, vamos usar um hash simples
  return Math.abs(hashCode(refId) % 100) + 1;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
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

