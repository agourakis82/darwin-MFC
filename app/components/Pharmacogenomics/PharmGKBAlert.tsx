'use client';

import React from 'react';
import { Dna, AlertTriangle, X, ExternalLink } from 'lucide-react';
import type { PharmGKBData } from '@/lib/types/medicamento';
import { PharmGKBBadge } from './PharmGKBBadge';

export interface PharmGKBAlertProps {
  /** Medication name */
  medicationName: string;
  /** PharmGKB data array */
  pharmgkbData: PharmGKBData[];
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Callback when "View Details" is clicked */
  onViewDetails?: () => void;
  /** Callback when "Mark as Reviewed" is clicked */
  onMarkAsReviewed?: () => void;
  /** Show as modal instead of inline alert */
  modal?: boolean;
}

export function PharmGKBAlert({
  medicationName,
  pharmgkbData,
  onDismiss,
  onViewDetails,
  onMarkAsReviewed,
  modal = false,
}: PharmGKBAlertProps) {
  if (pharmgkbData.length === 0) {
    return null;
  }

  const highestEvidenceLevel = pharmgkbData.reduce((highest, data) => {
    const levelOrder = { '1A': 0, '1B': 1, '2A': 2, '2B': 3, '3': 4, '4': 5 };
    return levelOrder[data.level] < levelOrder[highest] ? data.level : highest;
  }, pharmgkbData[0].level);

  const isHighEvidence = highestEvidenceLevel === '1A' || highestEvidenceLevel === '1B';

  const content = (
    <div
      className={`
        ${modal ? 'bg-neutral-800 border border-neutral-700' : 'bg-yellow-500/10 border border-yellow-500/30'}
        rounded-lg p-4
        ${modal ? 'w-full max-w-2xl' : ''}
      `}
      role="alert"
      aria-live="assertive"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`
            p-2 rounded-lg
            ${isHighEvidence ? 'bg-orange-500/20' : 'bg-yellow-500/20'}
          `}
        >
          <Dna
            size={20}
            className={isHighEvidence ? 'text-orange-400' : 'text-yellow-400'}
            aria-hidden="true"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-neutral-200">
              Alerta Farmacogenético
            </h3>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-neutral-400 hover:text-neutral-300 transition-colors"
                aria-label="Fechar alerta"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <p className="text-sm text-neutral-300 mt-1">
            <strong>{medicationName}</strong> tem implicações farmacogenéticas importantes
          </p>
        </div>
      </div>

      {/* Affected Genes */}
      <div className="bg-neutral-700/30 rounded-lg p-3 mb-3">
        <p className="text-xs font-medium text-neutral-400 mb-2">Genes afetados:</p>
        <div className="flex flex-wrap gap-2">
          {pharmgkbData.map((data, idx) => (
            <PharmGKBBadge key={idx} level={data.level} gene={data.gene} size="sm" />
          ))}
        </div>
      </div>

      {/* Key Information */}
      <div className="space-y-2 mb-4">
        {pharmgkbData.map((data, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <AlertTriangle size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-neutral-300">
              <strong className="font-mono">{data.gene}:</strong> {data.summary || 'Variantes genéticas podem afetar a resposta ao medicamento'}
            </p>
          </div>
        ))}
      </div>

      {/* Warning */}
      {isHighEvidence && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3 mb-4">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-orange-300 mb-1">
                Evidência de Alta Qualidade (Nível {highestEvidenceLevel})
              </p>
              <p className="text-xs text-neutral-300">
                As guidelines CPIC/DPWG recomendam fortemente considerar o genótipo do paciente antes de prescrever este medicamento.
                Variantes genéticas podem resultar em:
              </p>
              <ul className="text-xs text-neutral-300 mt-1 ml-4 list-disc space-y-0.5">
                <li>Resposta terapêutica inadequada (falta de eficácia)</li>
                <li>Risco aumentado de toxicidade</li>
                <li>Necessidade de ajuste de dose ou medicamento alternativo</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="
              flex items-center gap-2 px-4 py-2 rounded-lg
              bg-blue-600 hover:bg-blue-700
              text-white text-sm font-medium
              transition-colors
            "
          >
            <ExternalLink size={14} />
            Ver Recomendações Detalhadas
          </button>
        )}
        {onMarkAsReviewed && (
          <button
            onClick={onMarkAsReviewed}
            className="
              px-4 py-2 rounded-lg
              bg-neutral-700 hover:bg-neutral-600
              text-neutral-200 text-sm font-medium
              transition-colors
            "
          >
            Marcar como Revisado
          </button>
        )}
        <a
          href="https://cpicpgx.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 px-4 py-2 rounded-lg
            bg-neutral-700 hover:bg-neutral-600
            text-neutral-200 text-sm
            transition-colors
          "
        >
          <ExternalLink size={14} />
          CPIC Guidelines
        </a>
      </div>
    </div>
  );

  if (modal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onDismiss}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {content}
        </div>
      </div>
    );
  }

  return content;
}
