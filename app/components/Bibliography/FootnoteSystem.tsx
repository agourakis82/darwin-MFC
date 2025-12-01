'use client';

import { Citation } from '@/lib/types/references';
import { getReference } from '@/lib/data/references';

interface Footnote {
  id: string;
  number: number;
  citations: Citation[];
  contextNote?: string;
}

interface FootnoteSystemProps {
  footnotes: Footnote[];
}

export default function FootnoteSystem({ footnotes }: FootnoteSystemProps) {
  if (footnotes.length === 0) return null;
  
  return (
    <div className="mt-12 pt-8 border-t-2 border-neutral-300 dark:border-neutral-700">
      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Notas de Rodapé
      </h3>
      
      <div className="space-y-3">
        {footnotes.map((footnote) => (
          <div 
            key={footnote.id}
            id={`footnote-${footnote.number}`}
            className="text-sm text-neutral-700 dark:text-neutral-300"
          >
            <sup className="font-bold text-blue-600 dark:text-blue-400 mr-1">
              {footnote.number}
            </sup>
            
            {footnote.contextNote && (
              <span className="italic">{footnote.contextNote} </span>
            )}
            
            <span>
              {footnote.citations.map((citation, index) => {
                const ref = getReference(citation.refId);
                if (!ref) return null;
                
                return (
                  <span key={citation.refId}>
                    {index > 0 && '; '}
                    {ref.authors?.[0]?.split(' ').pop() || 'Sem autor'}, {ref.year}
                    {citation.page && `, p. ${citation.page}`}
                  </span>
                );
              })}
            </span>
            
            <a 
              href={`#footnote-ref-${footnote.number}`}
              className="ml-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
              aria-label="Voltar ao texto"
            >
              ↑
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para inserir referência a nota de rodapé no texto
interface FootnoteRefProps {
  number: number;
}

export function FootnoteRef({ number }: FootnoteRefProps) {
  return (
    <sup 
      id={`footnote-ref-${number}`}
      className="ml-0.5"
    >
      <a 
        href={`#footnote-${number}`}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium no-underline hover:underline"
        aria-label={`Ir para nota de rodapé ${number}`}
      >
        {number}
      </a>
    </sup>
  );
}

