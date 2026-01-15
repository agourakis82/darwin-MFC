'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dna,
  Pill,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Book,
  Beaker,
  Users,
  Search,
} from 'lucide-react';
import {
  getAllGenes,
  getExtendedGeneBySymbol,
  getDosingRecommendationsForGene,
  type DosingRecommendation,
} from '@/lib/ontology/pharmgkb-extended';
import type { PharmGKBGene, AffectedDrug, PhenotypeDefinition, MetabolizerPhenotype } from '@/lib/ontology/pharmgkb';

// =============================================================================
// TYPES
// =============================================================================

interface PGxPanelProps {
  /** Gene symbol to display (e.g., "CYP2D6") */
  geneSymbol?: string;
  /** Show gene selector */
  showSelector?: boolean;
  /** Callback when gene is selected */
  onGeneSelect?: (gene: PharmGKBGene) => void;
  /** Compact mode */
  compact?: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const PHENOTYPE_COLORS: Record<MetabolizerPhenotype, { bg: string; text: string; border: string }> = {
  'Ultrarapid Metabolizer': {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-300 dark:border-red-700',
  },
  'Rapid Metabolizer': {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
    border: 'border-orange-300 dark:border-orange-700',
  },
  'Normal Metabolizer': {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-300 dark:border-green-700',
  },
  'Intermediate Metabolizer': {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-300 dark:border-amber-700',
  },
  'Poor Metabolizer': {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-400',
    border: 'border-purple-300 dark:border-purple-700',
  },
  'Indeterminate': {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-400',
    border: 'border-gray-300 dark:border-gray-600',
  },
};

const WARNING_COLORS = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: Info,
    iconColor: 'text-blue-500',
  },
  caution: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    icon: AlertCircle,
    iconColor: 'text-amber-500',
  },
  warning: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800',
    icon: AlertTriangle,
    iconColor: 'text-orange-500',
  },
  contraindicated: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    icon: XCircle,
    iconColor: 'text-red-500',
  },
};

const EVIDENCE_COLORS = {
  A: 'bg-green-500 text-white',
  B: 'bg-blue-500 text-white',
  C: 'bg-amber-500 text-white',
  D: 'bg-gray-500 text-white',
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function PhenotypeCard({ phenotype }: { phenotype: PhenotypeDefinition }) {
  const colors = PHENOTYPE_COLORS[phenotype.name] || PHENOTYPE_COLORS['Indeterminate'];

  return (
    <div
      className={`
        p-4 rounded-xl border-2 ${colors.border} ${colors.bg}
        transition-all duration-200
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`
            inline-flex items-center justify-center w-8 h-8 rounded-lg
            font-bold text-sm ${colors.bg} ${colors.text}
            border ${colors.border}
          `}
        >
          {phenotype.abbreviation}
        </span>
        <h4 className={`font-semibold ${colors.text}`}>{phenotype.name}</h4>
      </div>
      <p className="text-sm text-[#86868b] mb-2">{phenotype.description}</p>
      <p className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
        {phenotype.clinicalImplication}
      </p>
      {phenotype.activityScoreRange && (
        <div className="mt-2 text-xs text-[#86868b]">
          Activity Score: {phenotype.activityScoreRange.min}
          {phenotype.activityScoreRange.max !== undefined
            ? ` - ${phenotype.activityScoreRange.max}`
            : '+'}
        </div>
      )}
    </div>
  );
}

function DrugCard({
  drug,
  dosingRec,
}: {
  drug: AffectedDrug;
  dosingRec?: DosingRecommendation;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const evidenceColor = EVIDENCE_COLORS[drug.evidenceLevel] || EVIDENCE_COLORS.D;

  return (
    <motion.div
      layout
      className={`
        bg-white dark:bg-[#1c1c1e]
        border border-gray-200 dark:border-white/10
        rounded-xl overflow-hidden
        transition-all duration-200
      `}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
            <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
              {drug.drugName}
            </h4>
            <p className="text-xs text-[#86868b]">{drug.drugClass}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`
              px-2 py-1 rounded-md text-xs font-bold ${evidenceColor}
            `}
          >
            {drug.evidenceLevel}
          </span>
          <span
            className={`
              px-2 py-1 rounded-md text-xs font-medium
              bg-gray-100 dark:bg-gray-800 text-[#86868b]
            `}
          >
            {drug.interactionType}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-white/10"
          >
            <div className="p-4 space-y-4">
              {/* Recommendation */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-2">
                  Recomendacao
                </h5>
                <p className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {drug.recommendation}
                </p>
              </div>

              {/* Clinical Notes */}
              {drug.clinicalNotes && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      {drug.clinicalNotes}
                    </p>
                  </div>
                </div>
              )}

              {/* Dosing Recommendations */}
              {dosingRec && (
                <div
                  className={`
                    p-4 rounded-lg border ${WARNING_COLORS[dosingRec.warningLevel].border}
                    ${WARNING_COLORS[dosingRec.warningLevel].bg}
                  `}
                >
                  <div className="flex items-start gap-3">
                    {(() => {
                      const Icon = WARNING_COLORS[dosingRec.warningLevel].icon;
                      return (
                        <Icon
                          className={`w-5 h-5 ${WARNING_COLORS[dosingRec.warningLevel].iconColor} flex-shrink-0 mt-0.5`}
                        />
                      );
                    })()}
                    <div className="flex-1">
                      <h6 className="font-semibold text-sm mb-2">
                        Ajuste de Dose: {dosingRec.phenotype}
                      </h6>
                      <div className="grid gap-2 text-sm">
                        <div>
                          <span className="text-[#86868b]">Dose padrao:</span>{' '}
                          <span className="font-medium">{dosingRec.standardDose}</span>
                        </div>
                        <div>
                          <span className="text-[#86868b]">Dose ajustada:</span>{' '}
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            {dosingRec.adjustedDose}
                          </span>
                        </div>
                        {dosingRec.alternativeDrug && (
                          <div>
                            <span className="text-[#86868b]">Alternativa:</span>{' '}
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {dosingRec.alternativeDrug}
                            </span>
                          </div>
                        )}
                      </div>
                      {dosingRec.clinicalPearl.pt && (
                        <p className="mt-3 text-sm italic text-[#86868b]">
                          {dosingRec.clinicalPearl.pt}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Source & References */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs text-[#86868b]">
                  Fonte: {drug.source}
                </span>
                {drug.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${drug.pmid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    <Book className="w-3 h-3" />
                    PMID: {drug.pmid}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function PGxPanel({
  geneSymbol,
  showSelector = true,
  onGeneSelect,
  compact = false,
}: PGxPanelProps) {
  const [selectedGeneSymbol, setSelectedGeneSymbol] = useState(geneSymbol || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPhenotypes, setShowPhenotypes] = useState(true);

  // Get all genes for selector
  const allGenes = useMemo(() => getAllGenes(), []);

  // Filter genes for search
  const filteredGenes = useMemo(() => {
    if (!searchQuery) return allGenes;
    const query = searchQuery.toLowerCase();
    return allGenes.filter(
      (gene) =>
        gene.gene.toLowerCase().includes(query) ||
        gene.fullName.toLowerCase().includes(query)
    );
  }, [allGenes, searchQuery]);

  // Get selected gene data
  const selectedGene = useMemo(() => {
    if (!selectedGeneSymbol) return null;
    return getExtendedGeneBySymbol(selectedGeneSymbol);
  }, [selectedGeneSymbol]);

  // Get dosing recommendations for the gene
  const dosingRecs = useMemo(() => {
    if (!selectedGeneSymbol) return [];
    return getDosingRecommendationsForGene(selectedGeneSymbol);
  }, [selectedGeneSymbol]);

  const handleGeneSelect = (gene: PharmGKBGene) => {
    setSelectedGeneSymbol(gene.gene);
    onGeneSelect?.(gene);
  };

  return (
    <div className={`w-full ${compact ? 'max-w-lg' : 'max-w-4xl'} mx-auto`}>
      {/* Gene Selector */}
      {showSelector && (
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar gene (ex: CYP2D6, SLCO1B1)..."
              className={`
                w-full pl-12 pr-4 py-3
                bg-white dark:bg-[#1c1c1e]
                border border-gray-200 dark:border-white/10
                rounded-xl
                text-[#1d1d1f] dark:text-[#f5f5f7]
                placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
                transition-all duration-200
              `}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filteredGenes.slice(0, compact ? 6 : 12).map((gene) => (
              <button
                key={gene.gene}
                onClick={() => handleGeneSelect(gene)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    selectedGeneSymbol === gene.gene
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-purple-100 dark:hover:bg-purple-900/30'
                  }
                `}
              >
                {gene.gene}
                {gene.hasCpicGuideline && (
                  <span className="ml-1 text-[10px] opacity-70">CPIC</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gene Details */}
      {selectedGene && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header Card */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Dna className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {selectedGene.gene}
                </h2>
                <p className="text-sm text-[#86868b] mb-2">{selectedGene.fullName}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedGene.chromosome && (
                    <span className="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-[#86868b]">
                      {selectedGene.chromosome}
                    </span>
                  )}
                  {selectedGene.hasCpicGuideline && (
                    <span className="px-2 py-1 rounded-md text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      CPIC Guideline
                    </span>
                  )}
                  {selectedGene.rsid && (
                    <span className="px-2 py-1 rounded-md text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-mono">
                      {selectedGene.rsid}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
              {selectedGene.description}
            </p>

            {selectedGene.susRelevance && (
              <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1">
                      Relevancia SUS
                    </h4>
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      {selectedGene.susRelevance}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Phenotypes Section */}
          {selectedGene.phenotypes && selectedGene.phenotypes.length > 0 && (
            <div>
              <button
                onClick={() => setShowPhenotypes(!showPhenotypes)}
                className="flex items-center gap-2 w-full text-left mb-4"
              >
                <motion.div
                  animate={{ rotate: showPhenotypes ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Fenotipos ({selectedGene.phenotypes.length})
                </h3>
              </button>

              <AnimatePresence>
                {showPhenotypes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                  >
                    {selectedGene.phenotypes.map((phenotype, idx) => (
                      <PhenotypeCard key={idx} phenotype={phenotype} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Affected Drugs Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
              Medicamentos Afetados ({selectedGene.affectedDrugs.length})
            </h3>
            <div className="space-y-3">
              {selectedGene.affectedDrugs.map((drug, idx) => {
                // Find matching dosing recommendation
                const matchingRec = dosingRecs.find(
                  (rec) => rec.drugName.toLowerCase() === drug.drugName.toLowerCase()
                );
                return (
                  <DrugCard key={idx} drug={drug} dosingRec={matchingRec} />
                );
              })}
            </div>
          </div>

          {/* Testing Recommendation */}
          {selectedGene.testingRecommendation && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <Beaker className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                    Recomendacao de Teste
                  </h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    {selectedGene.testingRecommendation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Empty State */}
      {!selectedGene && showSelector && (
        <div className="text-center py-12">
          <Dna className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
            Selecione um Gene
          </h3>
          <p className="text-[#86868b]">
            Escolha um gene farmacogenomico para ver informacoes detalhadas
          </p>
        </div>
      )}
    </div>
  );
}

export default PGxPanel;
