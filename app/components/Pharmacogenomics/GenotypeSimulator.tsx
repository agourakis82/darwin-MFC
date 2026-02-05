'use client';

import React, { useState, useMemo } from 'react';
import { Dna, AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import type { Medicamento, PharmGKBData } from '@/lib/types/medicamento';
import { PharmGKBBadge } from './PharmGKBBadge';

export interface GenotypeSimulatorProps {
  /** All medications with PharmGKB data */
  medications: Medicamento[];
  /** Callback when genotype changes */
  onGenotypeChange?: (genotypes: Record<string, string>) => void;
}

// Common genes with their common alleles
const COMMON_GENES = {
  CYP2D6: ['*1/*1', '*1/*2', '*1/*4', '*2/*2', '*4/*4', '*1/*2xN', '*2xN/*2xN'],
  CYP2C19: ['*1/*1', '*1/*2', '*1/*17', '*2/*2', '*2/*17', '*17/*17'],
  CYP2C9: ['*1/*1', '*1/*2', '*1/*3', '*2/*2', '*2/*3', '*3/*3'],
  TPMT: ['*1/*1', '*1/*3A', '*3A/*3A', '*1/*3C', '*3C/*3C'],
  DPYD: ['WT/WT', '*2A/WT', '*2A/*2A', 'c.1679T>G/WT'],
  VKORC1: ['GG', 'GA', 'AA'],
  SLCO1B1: ['*1A/*1A', '*1A/*5', '*5/*5', '*1A/*15', '*15/*15'],
};

interface MedicationImpact {
  medication: Medicamento;
  gene: string;
  allele: string;
  phenotype: string;
  recommendation: string;
  severity: 'safe' | 'caution' | 'warning' | 'avoid';
}

function getSeverityFromRecommendation(recommendation: string, strength: string): MedicationImpact['severity'] {
  const recLower = recommendation.toLowerCase();

  if (recLower.includes('evitar') || recLower.includes('avoid') || recLower.includes('contraindicado')) {
    return 'avoid';
  }
  if (recLower.includes('alto risco') || recLower.includes('toxicidade') || strength === 'strong') {
    return 'warning';
  }
  if (recLower.includes('considerar') || recLower.includes('ajustar') || strength === 'moderate') {
    return 'caution';
  }
  return 'safe';
}

const SEVERITY_CONFIG = {
  safe: { icon: CheckCircle2, color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30', label: 'Seguro' },
  caution: { icon: Info, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30', label: 'Atenção' },
  warning: { icon: AlertTriangle, color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30', label: 'Cuidado' },
  avoid: { icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30', label: 'Evitar' },
};

export function GenotypeSimulator({ medications, onGenotypeChange }: GenotypeSimulatorProps) {
  const [genotypes, setGenotypes] = useState<Record<string, string>>({});

  // Calculate medication impacts based on selected genotypes
  const medicationImpacts = useMemo(() => {
    const impacts: MedicationImpact[] = [];

    medications.forEach((med) => {
      if (!med.pharmgkb || med.pharmgkb.length === 0) return;

      med.pharmgkb.forEach((pharmgkbData: PharmGKBData) => {
        const selectedAllele = genotypes[pharmgkbData.gene];
        if (!selectedAllele) return;

        const variant = pharmgkbData.variants?.find((v) => v.allele === selectedAllele);
        if (!variant) return;

        impacts.push({
          medication: med,
          gene: pharmgkbData.gene,
          allele: selectedAllele,
          phenotype: variant.phenotype,
          recommendation: variant.dosageRecommendation.recommendation,
          severity: getSeverityFromRecommendation(
            variant.dosageRecommendation.recommendation,
            variant.dosageRecommendation.strength
          ),
        });
      });
    });

    return impacts;
  }, [medications, genotypes]);

  // Group impacts by severity
  const impactsBySeverity = useMemo(() => {
    return {
      avoid: medicationImpacts.filter((i) => i.severity === 'avoid'),
      warning: medicationImpacts.filter((i) => i.severity === 'warning'),
      caution: medicationImpacts.filter((i) => i.severity === 'caution'),
      safe: medicationImpacts.filter((i) => i.severity === 'safe'),
    };
  }, [medicationImpacts]);

  const handleGenotypeChange = (gene: string, allele: string) => {
    const newGenotypes = { ...genotypes, [gene]: allele };
    setGenotypes(newGenotypes);
    onGenotypeChange?.(newGenotypes);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-700">
        <Dna size={24} className="text-blue-400" />
        <div>
          <h2 className="text-xl font-semibold text-neutral-200">Simulador de Genótipo</h2>
          <p className="text-sm text-neutral-400">
            Insira seu genótipo para ver o impacto em todos os medicamentos
          </p>
        </div>
      </div>

      {/* Genotype Selection */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-neutral-300 mb-3">Selecionar Genótipo:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(COMMON_GENES).map(([gene, alleles]) => (
            <div key={gene}>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5 font-mono">
                {gene}
              </label>
              <select
                value={genotypes[gene] || ''}
                onChange={(e) => handleGenotypeChange(gene, e.target.value)}
                className="
                  w-full px-3 py-2 rounded-lg
                  bg-neutral-700 border border-neutral-600
                  text-neutral-200 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-colors
                "
              >
                <option value="">Selecione...</option>
                {alleles.map((allele) => (
                  <option key={allele} value={allele}>
                    {allele}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      {Object.keys(genotypes).length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['avoid', 'warning', 'caution', 'safe'] as const).map((severity) => {
              const config = SEVERITY_CONFIG[severity];
              const Icon = config.icon;
              const count = impactsBySeverity[severity].length;

              return (
                <div
                  key={severity}
                  className={`p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={16} className={config.color} />
                    <span className={`text-xs font-medium ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-neutral-200">{count}</p>
                  <p className="text-xs text-neutral-400">
                    {count === 1 ? 'medicamento' : 'medicamentos'}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Medication Impacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-200">Medicamentos Afetados:</h3>

            {/* Avoid */}
            {impactsBySeverity.avoid.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <XCircle size={16} />
                  Medicamentos a Evitar ({impactsBySeverity.avoid.length})
                </h4>
                <div className="space-y-2">
                  {impactsBySeverity.avoid.map((impact, idx) => (
                    <MedicationImpactCard key={idx} impact={impact} />
                  ))}
                </div>
              </div>
            )}

            {/* Warning */}
            {impactsBySeverity.warning.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Alto Cuidado Necessário ({impactsBySeverity.warning.length})
                </h4>
                <div className="space-y-2">
                  {impactsBySeverity.warning.map((impact, idx) => (
                    <MedicationImpactCard key={idx} impact={impact} />
                  ))}
                </div>
              </div>
            )}

            {/* Caution */}
            {impactsBySeverity.caution.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Info size={16} />
                  Ajuste Pode Ser Necessário ({impactsBySeverity.caution.length})
                </h4>
                <div className="space-y-2">
                  {impactsBySeverity.caution.map((impact, idx) => (
                    <MedicationImpactCard key={idx} impact={impact} />
                  ))}
                </div>
              </div>
            )}

            {/* Safe */}
            {impactsBySeverity.safe.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Uso Seguro ({impactsBySeverity.safe.length})
                </h4>
                <div className="space-y-2">
                  {impactsBySeverity.safe.map((impact, idx) => (
                    <MedicationImpactCard key={idx} impact={impact} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Empty State */}
      {Object.keys(genotypes).length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          <Dna size={48} className="mx-auto mb-3 opacity-50" />
          <p>Selecione pelo menos um genótipo para ver o impacto nos medicamentos</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="text-xs text-neutral-500 italic p-3 bg-neutral-800/30 rounded border border-neutral-700">
        ⚠️ <strong>Aviso:</strong> Este simulador é apenas para fins educacionais. Decisões terapêuticas devem ser baseadas
        em testes farmacogenéticos reais e avaliação clínica completa.
      </div>
    </div>
  );
}

function MedicationImpactCard({ impact }: { impact: MedicationImpact }) {
  const config = SEVERITY_CONFIG[impact.severity];
  const Icon = config.icon;

  return (
    <div className={`p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-start gap-3">
        <Icon size={18} className={`${config.color} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-semibold text-neutral-200">{impact.medication.nomeGenerico}</p>
            <PharmGKBBadge level={impact.medication.pharmgkb?.[0]?.level ?? '1A'} gene={impact.gene} size="sm" />
          </div>
          <p className="text-xs text-neutral-400 mb-1.5">
            <span className="font-mono">{impact.allele}</span> → {impact.phenotype.replace(/_/g, ' ')}
          </p>
          <p className="text-sm text-neutral-300">{impact.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
