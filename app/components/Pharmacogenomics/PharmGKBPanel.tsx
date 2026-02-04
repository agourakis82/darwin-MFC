'use client';

import React, { useState } from 'react';
import { Dna, ExternalLink, AlertTriangle, Info, TrendingUp, TrendingDown } from 'lucide-react';
import type { PharmGKBData, PharmGKBVariant, MetabolizerPhenotype } from '@/lib/types/medicamento';
import { PharmGKBBadge } from './PharmGKBBadge';

export interface PharmGKBPanelProps {
  /** PharmGKB data for the medication */
  pharmgkbData: PharmGKBData[];
  /** Medication name for context */
  medicationName?: string;
  /** Compact view (collapse by default) */
  compact?: boolean;
}

const PHENOTYPE_CONFIG: Record<
  MetabolizerPhenotype,
  { label: string; icon: typeof TrendingUp; color: string; description: string }
> = {
  normal_metabolizer: {
    label: 'Metabolizador Normal',
    icon: TrendingUp,
    color: 'text-green-400',
    description: 'Atividade enzimática normal (genótipo selvagem)',
  },
  intermediate_metabolizer: {
    label: 'Metabolizador Intermediário',
    icon: TrendingDown,
    color: 'text-yellow-400',
    description: 'Atividade enzimática reduzida (heterozigoto)',
  },
  poor_metabolizer: {
    label: 'Metabolizador Lento',
    icon: TrendingDown,
    color: 'text-orange-400',
    description: 'Atividade enzimática mínima/ausente (homozigoto variante)',
  },
  ultra_rapid_metabolizer: {
    label: 'Metabolizador Ultrarrápido',
    icon: TrendingUp,
    color: 'text-blue-400',
    description: 'Atividade enzimática aumentada (duplicação gênica)',
  },
  increased_function: {
    label: 'Função Aumentada',
    icon: TrendingUp,
    color: 'text-blue-300',
    description: 'Atividade enzimática levemente aumentada',
  },
  decreased_function: {
    label: 'Função Diminuída',
    icon: TrendingDown,
    color: 'text-yellow-300',
    description: 'Atividade enzimática levemente diminuída',
  },
};

function VariantCard({ variant }: { variant: PharmGKBVariant }) {
  const phenotypeConfig = PHENOTYPE_CONFIG[variant.phenotype];
  const Icon = phenotypeConfig.icon;

  return (
    <div className="bg-neutral-700/30 border border-neutral-600 rounded-lg p-4">
      {/* Allele and Phenotype */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-mono font-semibold text-neutral-200">
            {variant.allele}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Icon size={14} className={phenotypeConfig.color} />
            <p className={`text-sm ${phenotypeConfig.color}`}>
              {phenotypeConfig.label}
            </p>
          </div>
        </div>
      </div>

      {/* Population Frequencies */}
      <div className="mb-3">
        <p className="text-xs font-medium text-neutral-400 mb-2">Frequência populacional:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-neutral-400">Europeus:</span>
            <span className="ml-1 text-neutral-200">{(variant.frequency.european * 100).toFixed(1)}%</span>
          </div>
          <div>
            <span className="text-neutral-400">Africanos:</span>
            <span className="ml-1 text-neutral-200">{(variant.frequency.african * 100).toFixed(1)}%</span>
          </div>
          <div>
            <span className="text-neutral-400">Asiáticos:</span>
            <span className="ml-1 text-neutral-200">{(variant.frequency.asian * 100).toFixed(1)}%</span>
          </div>
          <div>
            <span className="text-neutral-400">Hispânicos:</span>
            <span className="ml-1 text-neutral-200">{(variant.frequency.hispanic * 100).toFixed(1)}%</span>
          </div>
          {variant.frequency.southAsian && (
            <div className="col-span-2">
              <span className="text-neutral-400">Sul-Asiáticos:</span>
              <span className="ml-1 text-neutral-200">{(variant.frequency.southAsian * 100).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Clinical Implications */}
      {variant.implications.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-neutral-400 mb-2">Implicações clínicas:</p>
          <ul className="space-y-1">
            {variant.implications.map((implication, idx) => (
              <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                <Info size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span>{implication}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dosage Recommendation */}
      <div
        className={`
          p-3 rounded border
          ${
            variant.dosageRecommendation.strength === 'strong'
              ? 'bg-orange-500/10 border-orange-500/30'
              : variant.dosageRecommendation.strength === 'moderate'
              ? 'bg-yellow-500/10 border-yellow-500/30'
              : 'bg-blue-500/10 border-blue-500/30'
          }
        `}
      >
        <div className="flex items-start gap-2 mb-2">
          <AlertTriangle
            size={14}
            className={
              variant.dosageRecommendation.strength === 'strong'
                ? 'text-orange-400'
                : variant.dosageRecommendation.strength === 'moderate'
                ? 'text-yellow-400'
                : 'text-blue-400'
            }
          />
          <p className="text-xs font-semibold text-neutral-200">
            Recomendação ({variant.dosageRecommendation.strength === 'strong' ? 'Forte' : variant.dosageRecommendation.strength === 'moderate' ? 'Moderada' : 'Opcional'})
          </p>
        </div>
        <p className="text-sm text-neutral-300 mb-2">
          {variant.dosageRecommendation.recommendation}
        </p>
        <p className="text-xs text-neutral-400">
          <strong>Justificativa:</strong> {variant.dosageRecommendation.reasoning}
        </p>
        {variant.dosageRecommendation.classification && (
          <p className="text-xs text-neutral-400 mt-1">
            <strong>Classificação:</strong> {variant.dosageRecommendation.classification}
          </p>
        )}
      </div>

      {/* Alternatives */}
      {variant.alternatives && variant.alternatives.length > 0 && (
        <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded">
          <p className="text-xs font-medium text-blue-300 mb-1">Medicamentos alternativos:</p>
          <div className="flex flex-wrap gap-1">
            {variant.alternatives.map((altId, idx) => (
              <span key={idx} className="text-xs text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded">
                {altId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GeneSection({ data }: { data: PharmGKBData }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4">
      {/* Gene Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Dna size={20} className="text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-neutral-200 font-mono">{data.gene}</h3>
            {data.summary && (
              <p className="text-sm text-neutral-400 mt-0.5">{data.summary}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PharmGKBBadge level={data.level} showLabel />
          {data.guidelineUrl && (
            <a
              href={data.guidelineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              aria-label="Ver guideline CPIC/DPWG"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left text-sm text-neutral-400 hover:text-neutral-300 transition-colors mb-3"
      >
        {isExpanded ? '▼' : '▶'} {data.variants.length} variantes genéticas
      </button>

      {/* Variants */}
      {isExpanded && (
        <div className="space-y-3">
          {data.variants.map((variant, idx) => (
            <VariantCard key={idx} variant={variant} />
          ))}
        </div>
      )}
    </div>
  );
}

export function PharmGKBPanel({ pharmgkbData, medicationName, compact = false }: PharmGKBPanelProps) {
  if (pharmgkbData.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-700">
        <Dna size={24} className="text-blue-400" />
        <div>
          <h2 className="text-xl font-semibold text-neutral-200">
            Farmacogenômica{medicationName ? ` - ${medicationName}` : ''}
          </h2>
          <p className="text-sm text-neutral-400">
            Implicações genéticas na metabolização e resposta terapêutica
          </p>
        </div>
      </div>

      {/* Gene Sections */}
      <div className="space-y-4">
        {pharmgkbData.map((data, idx) => (
          <GeneSection key={idx} data={data} />
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-xs text-neutral-500 italic p-3 bg-neutral-800/30 rounded border border-neutral-700">
        ℹ️ As recomendações farmacogenéticas são baseadas em guidelines CPIC (Clinical Pharmacogenetics Implementation Consortium)
        e DPWG (Dutch Pharmacogenetics Working Group). Sempre considere o contexto clínico completo do paciente.
      </div>
    </div>
  );
}
