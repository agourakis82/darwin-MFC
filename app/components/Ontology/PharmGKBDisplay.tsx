'use client';

/**
 * DARWIN-MFC PHARMGKB DISPLAY
 * ===========================
 *
 * Component to display pharmacogenomics data from PharmGKB.
 * Shows gene-drug interactions, phenotypes, and dosage recommendations.
 *
 * @example
 * ```tsx
 * <PharmGKBDisplay
 *   medicationName="warfarina"
 *   pharmgkbData={medication.pharmgkb}
 * />
 * ```
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dna,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Info,
  ExternalLink,
  Beaker,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getPharmacogenomicsForMedication,
  PHARMACOGENOMICS_GENES,
  type PharmacogenomicsData,
  type Phenotype,
} from '@/lib/ontologies/pharmgkb';

// =============================================================================
// TYPES
// =============================================================================

export interface PharmGKBDisplayProps {
  /** Medication name for automatic lookup */
  medicationName?: string;

  /** Direct PharmGKB data (if available in medication object) */
  pharmgkbData?: Array<{
    gene: string;
    variant?: string;
    phenotype?: Phenotype | string;
    implications?: string[];
    dosageRecommendations?: string[];
    // Additional fields from PharmGKBData
    variants?: Array<{
      allele: string;
      phenotype: string;
      implications: string[];
    }>;
    level?: string;
    summary?: string;
    guidelineUrl?: string;
  }>;

  /** Whether to show in compact mode */
  compact?: boolean;

  /** Custom class name */
  className?: string;
}

// =============================================================================
// HELPERS
// =============================================================================

function getPhenotypeLabel(phenotype: Phenotype): string {
  const labels: Record<Phenotype, string> = {
    poor_metabolizer: 'Poor Metabolizer',
    intermediate_metabolizer: 'Intermediate Metabolizer',
    extensive_metabolizer: 'Normal/Extensive Metabolizer',
    ultra_rapid_metabolizer: 'Ultra-rapid Metabolizer',
    reduced_response: 'Reduced Response',
    met_met_high_pain_sensitivity: 'High Pain Sensitivity (Met/Met)',
    non_expressor: 'Non-Expressor',
    high_risk_sjs_ten: 'High Risk SJS/TEN',
    increased_risk_hypersensitivity: 'Increased Hypersensitivity Risk',
    increased_risk_sjs: 'Increased SJS Risk',
    inhibitor_effect: 'Inhibitor Effect',
    high_risk_scar: 'High Risk SCAR',
    reduced_enzyme_activity: 'Reduced Enzyme Activity',
    reduced_transport: 'Reduced Transport',
  };
  return labels[phenotype];
}

function getPhenotypeColor(phenotype: Phenotype): string {
  switch (phenotype) {
    case 'poor_metabolizer':
      return 'text-red-600 dark:text-red-400 bg-red-500/10';
    case 'intermediate_metabolizer':
      return 'text-amber-600 dark:text-amber-400 bg-amber-500/10';
    case 'extensive_metabolizer':
      return 'text-green-600 dark:text-green-400 bg-green-500/10';
    case 'ultra_rapid_metabolizer':
      return 'text-purple-600 dark:text-purple-400 bg-purple-500/10';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
  }
}

function getPhenotypeIcon(phenotype: Phenotype) {
  switch (phenotype) {
    case 'poor_metabolizer':
      return <AlertTriangle className="w-4 h-4" />;
    case 'intermediate_metabolizer':
      return <Info className="w-4 h-4" />;
    case 'extensive_metabolizer':
      return <CheckCircle className="w-4 h-4" />;
    case 'ultra_rapid_metabolizer':
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface GeneCardProps {
  gene: string;
  variants: PharmacogenomicsData[];
  isExpanded: boolean;
  onToggle: () => void;
}

function GeneCard({ gene, variants, isExpanded, onToggle }: GeneCardProps) {
  const geneInfo = PHARMACOGENOMICS_GENES[gene];

  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3',
          'bg-gradient-to-r from-purple-500/10 to-indigo-500/10',
          'hover:from-purple-500/15 hover:to-indigo-500/15',
          'transition-colors duration-200'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Dna className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
              {gene}
            </div>
            <div className="text-sm text-[#86868b]">
              {geneInfo?.description || 'Pharmacogenomics gene'}
            </div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-[#86868b]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#86868b]" />
        )}
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4 bg-white dark:bg-[#1c1c1e]">
              {/* Variant table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10">
                      <th className="text-left py-2 px-3 font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                        Phenotype
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                        Variant
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                        Clinical Implications
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((variant, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 dark:border-white/5 last:border-0"
                      >
                        <td className="py-3 px-3">
                          {variant.phenotype && (
                            <span
                              className={cn(
                                'inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium',
                                getPhenotypeColor(variant.phenotype)
                              )}
                            >
                              {getPhenotypeIcon(variant.phenotype)}
                              {getPhenotypeLabel(variant.phenotype)}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-mono text-xs text-[#86868b]">
                          {variant.variant || '-'}
                        </td>
                        <td className="py-3 px-3">
                          <ul className="space-y-1">
                            {variant.implications.map((impl, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-[#1d1d1f] dark:text-[#f5f5f7]"
                              >
                                <span className="text-purple-500 mt-1">-</span>
                                {impl}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dosage recommendations section */}
              {variants.some((v) => v.dosageRecommendations.length > 0) && (
                <div className="mt-4 p-4 bg-amber-500/10 rounded-xl">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
                    <Beaker className="w-4 h-4" />
                    Dosage Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {variants
                      .filter((v) => v.dosageRecommendations.length > 0)
                      .flatMap((v) =>
                        v.dosageRecommendations.map((rec, i) => (
                          <li
                            key={`${v.phenotype}-${i}`}
                            className="flex items-start gap-2 text-sm text-[#1d1d1f] dark:text-[#f5f5f7]"
                          >
                            <span className="text-amber-500">*</span>
                            <span>
                              <strong className="text-amber-700 dark:text-amber-300">
                                {v.phenotype && getPhenotypeLabel(v.phenotype)}:
                              </strong>{' '}
                              {rec}
                            </span>
                          </li>
                        ))
                      )}
                  </ul>
                </div>
              )}

              {/* PharmGKB link */}
              <div className="flex justify-end pt-2">
                <a
                  href={`https://www.pharmgkb.org/gene/${gene}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  View on PharmGKB
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function PharmGKBDisplay({
  medicationName,
  pharmgkbData,
  compact = false,
  className,
}: PharmGKBDisplayProps) {
  const [expandedGenes, setExpandedGenes] = useState<Set<string>>(new Set());

  // Get pharmacogenomics data
  let pgxData: PharmacogenomicsData[] = [];

  if (pharmgkbData && pharmgkbData.length > 0) {
    // Use provided data
    pgxData = pharmgkbData.map((d) => ({
      gene: d.gene,
      variant: d.variant,
      phenotype: d.phenotype as Phenotype | undefined,
      implications: d.implications || [],
      dosageRecommendations: d.dosageRecommendations || [],
    }));
  } else if (medicationName) {
    // Lookup from database
    pgxData = getPharmacogenomicsForMedication(medicationName);
  }

  // Group by gene
  const geneGroups = pgxData.reduce(
    (acc, data) => {
      if (!acc[data.gene]) {
        acc[data.gene] = [];
      }
      acc[data.gene].push(data);
      return acc;
    },
    {} as Record<string, PharmacogenomicsData[]>
  );

  const genes = Object.keys(geneGroups);

  // No pharmacogenomics data available
  if (genes.length === 0) {
    return null;
  }

  const toggleGene = (gene: string) => {
    setExpandedGenes((prev) => {
      const next = new Set(prev);
      if (next.has(gene)) {
        next.delete(gene);
      } else {
        next.add(gene);
      }
      return next;
    });
  };

  // Expand first gene by default
  if (expandedGenes.size === 0 && genes.length > 0) {
    setExpandedGenes(new Set([genes[0]]));
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
          <Dna className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
            Pharmacogenomics (PharmGKB)
          </h3>
          <p className="text-sm text-[#86868b]">
            {genes.length} gene{genes.length > 1 ? 's' : ''} with drug
            interactions
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
          <div>
            <p className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
              <strong>Pharmacogenomics testing</strong> may help personalize
              dosing for this medication. Results depend on patient's genetic
              profile.
            </p>
            <p className="text-xs text-[#86868b] mt-1">
              Data source:{' '}
              <a
                href="https://www.pharmgkb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                PharmGKB
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Gene cards */}
      <div className="space-y-3">
        {genes.map((gene) => (
          <GeneCard
            key={gene}
            gene={gene}
            variants={geneGroups[gene]}
            isExpanded={expandedGenes.has(gene)}
            onToggle={() => toggleGene(gene)}
          />
        ))}
      </div>
    </div>
  );
}

export default PharmGKBDisplay;
