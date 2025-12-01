'use client';

import { useState, useEffect } from 'react';
import { references } from '@/lib/data/references';

interface ValidationIssue {
  type: 'missing_citation' | 'invalid_reference' | 'incomplete_metadata';
  severity: 'error' | 'warning';
  message: string;
  location?: string;
  refId?: string;
}

interface ReferenceValidatorProps {
  contentId: string; // ID do conteúdo sendo validado
  usedRefIds: string[]; // IDs de referências utilizadas no conteúdo
  showWarnings?: boolean;
}

export default function ReferenceValidator({ 
  contentId, 
  usedRefIds,
  showWarnings = true 
}: ReferenceValidatorProps) {
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    validateReferences();
  }, [usedRefIds]);

  const validateReferences = () => {
    setIsValidating(true);
    const foundIssues: ValidationIssue[] = [];

    // Validar se todas as referências usadas existem
    usedRefIds.forEach(refId => {
      const ref = references[refId];
      
      if (!ref) {
        foundIssues.push({
          type: 'invalid_reference',
          severity: 'error',
          message: `Referência não encontrada: ${refId}`,
          refId
        });
      } else {
        // Validar metadados completos (padrão Q1)
        if (!ref.authors || ref.authors.length === 0) {
          foundIssues.push({
            type: 'incomplete_metadata',
            severity: 'warning',
            message: `Referência sem autores: ${ref.title}`,
            refId
          });
        }
        
        if (!ref.year) {
          foundIssues.push({
            type: 'incomplete_metadata',
            severity: 'error',
            message: `Referência sem ano: ${ref.title}`,
            refId
          });
        }
        
        if (ref.type === 'artigo' && !ref.journal) {
          foundIssues.push({
            type: 'incomplete_metadata',
            severity: 'warning',
            message: `Artigo sem nome do periódico: ${ref.title}`,
            refId
          });
        }
        
        if (ref.type === 'artigo' && !ref.doi && !ref.url) {
          foundIssues.push({
            type: 'incomplete_metadata',
            severity: 'warning',
            message: `Artigo sem DOI ou URL: ${ref.title}`,
            refId
          });
        }
        
        if ((ref.type === 'portaria' || ref.type === 'lei') && !ref.legalNumber) {
          foundIssues.push({
            type: 'incomplete_metadata',
            severity: 'error',
            message: `Documento legal sem número oficial: ${ref.title}`,
            refId
          });
        }
      }
    });

    setIssues(foundIssues);
    setIsValidating(false);
  };

  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');

  if (issues.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>Todas as referências validadas (Padrão Q1)</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {errors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-bold text-red-900 dark:text-red-100">
              {errors.length} {errors.length === 1 ? 'Erro' : 'Erros'} Crítico{errors.length === 1 ? '' : 's'}
            </h4>
          </div>
          <ul className="space-y-1 text-sm text-red-800 dark:text-red-200">
            {errors.map((issue, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>{issue.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showWarnings && warnings.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h4 className="font-bold text-amber-900 dark:text-amber-100">
              {warnings.length} {warnings.length === 1 ? 'Aviso' : 'Avisos'} de Qualidade
            </h4>
          </div>
          <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-200">
            {warnings.map((issue, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>{issue.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-xs text-neutral-500 dark:text-neutral-400">
        <strong>Padrão Q1:</strong> Todas as afirmações devem ter referências completas com metadados validados.
      </div>
    </div>
  );
}

