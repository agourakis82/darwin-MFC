'use client';

/**
 * PHARMACOGENOMICS PAGE - DARWIN-MFC
 * ====================================
 *
 * Comprehensive pharmacogenomics reference displaying genes from PharmGKB.
 * Features:
 * - 16+ clinically relevant pharmacogenes
 * - Dosing recommendations by phenotype
 * - Gene-drug interaction search
 * - CPIC guideline information
 */

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import {
  Search,
  ArrowLeft,
  Dna,
  Pill,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Shield,
  Activity,
  BookOpen,
  ExternalLink,
  Check,
  X,
} from 'lucide-react';
import {
  ALL_PHARMGKB_GENES,
  DOSING_RECOMMENDATIONS,
  getPharmGKBStats,
  getDosingRecommendationsForGene,
  getExtendedGeneBySymbol,
  type DosingRecommendation,
} from '@/lib/ontology/pharmgkb-extended';
import type { PharmGKBGene } from '@/lib/ontology/pharmgkb';
import type { LanguageCode } from '@/lib/ontology/types/ontology';

// Warning level colors
const WARNING_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  info: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  caution: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700' },
  warning: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-300 dark:border-orange-700' },
  contraindicated: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-300 dark:border-red-700' },
};

// Evidence level badge
function EvidenceBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    A: 'bg-green-500',
    B: 'bg-blue-500',
    C: 'bg-amber-500',
    D: 'bg-gray-500',
  };

  return (
    <span
      className={`px-2 py-0.5 ${colors[level] || colors.D} text-white text-xs font-bold rounded-full`}
      title={`Evidence Level ${level}`}
    >
      {level}
    </span>
  );
}

// Gene card component
function GeneCard({
  gene,
  expanded,
  onToggle,
  locale,
}: {
  gene: PharmGKBGene;
  expanded: boolean;
  onToggle: () => void;
  locale: LanguageCode;
}) {
  const dosingRecs = getDosingRecommendationsForGene(gene.gene);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Dna className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{gene.gene}</h3>
            {gene.hasCpicGuideline && (
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full">
                CPIC
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{gene.fullName}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {gene.affectedDrugs.length} {locale === 'pt' ? 'medicamentos' : 'drugs'}
          </span>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          {/* Description */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50">
            <p className="text-sm text-gray-600 dark:text-gray-300">{gene.description}</p>
          </div>

          {/* Gene Info */}
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                {locale === 'pt' ? 'Cromossomo' : 'Chromosome'}
              </span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{gene.chromosome || 'N/A'}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">PharmGKB ID</span>
              <p className="text-sm font-mono text-gray-900 dark:text-white">{gene.pharmgkbId}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">HGNC</span>
              <p className="text-sm font-mono text-gray-900 dark:text-white">{gene.hgncId || 'N/A'}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">rsID</span>
              <p className="text-sm font-mono text-gray-900 dark:text-white">{gene.rsid || 'Multiple'}</p>
            </div>
          </div>

          {/* SUS Relevance */}
          {gene.susRelevance && (
            <div className="px-4 pb-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase">
                      {locale === 'pt' ? 'Relevancia SUS' : 'SUS Relevance'}
                    </span>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">{gene.susRelevance}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phenotypes */}
          {gene.phenotypes && gene.phenotypes.length > 0 && (
            <div className="px-4 pb-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Fenotipos' : 'Phenotypes'}
              </h4>
              <div className="space-y-2">
                {gene.phenotypes.map((pheno) => (
                  <div
                    key={pheno.name}
                    className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">{pheno.name}</span>
                      {pheno.abbreviation && (
                        <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded">
                          {pheno.abbreviation}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{pheno.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{pheno.clinicalImplication}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Affected Drugs */}
          <div className="px-4 pb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Medicamentos Afetados' : 'Affected Drugs'}
            </h4>
            <div className="space-y-2">
              {gene.affectedDrugs.map((drug, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{drug.drugName}</span>
                        <EvidenceBadge level={drug.evidenceLevel} />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{drug.drugClass}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        drug.interactionType === 'Toxicity/ADR'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : drug.interactionType === 'Dosing'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {drug.interactionType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{drug.recommendation}</p>
                  {drug.clinicalNotes && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">{drug.clinicalNotes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dosing Recommendations */}
          {dosingRecs.length > 0 && (
            <div className="px-4 pb-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Recomendacoes de Dose' : 'Dosing Recommendations'}
              </h4>
              <div className="space-y-2">
                {dosingRecs.map((rec, idx) => {
                  const colors = WARNING_COLORS[rec.warningLevel] || WARNING_COLORS.info;
                  return (
                    <div key={idx} className={`p-3 ${colors.bg} rounded-lg border ${colors.border}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className={`w-4 h-4 ${colors.text}`} />
                        <span className={`font-semibold ${colors.text}`}>{rec.drugName}</span>
                        <span className={`text-xs ${colors.text}`}>({rec.phenotype})</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className={`text-xs font-semibold ${colors.text} uppercase`}>
                            {locale === 'pt' ? 'Dose Padrao' : 'Standard Dose'}
                          </span>
                          <p className={colors.text}>{rec.standardDose}</p>
                        </div>
                        <div>
                          <span className={`text-xs font-semibold ${colors.text} uppercase`}>
                            {locale === 'pt' ? 'Dose Ajustada' : 'Adjusted Dose'}
                          </span>
                          <p className={`${colors.text} font-medium`}>{rec.adjustedDose}</p>
                        </div>
                      </div>
                      {rec.clinicalPearl && (
                        <p className={`text-xs ${colors.text} mt-2 italic`}>
                          {rec.clinicalPearl[locale] || rec.clinicalPearl.en}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Testing Recommendation */}
          {gene.testingRecommendation && (
            <div className="px-4 pb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase">
                      {locale === 'pt' ? 'Recomendacao de Teste' : 'Testing Recommendation'}
                    </span>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-0.5">{gene.testingRecommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PharmacogenomicsPage() {
  const t = useTranslations('common');
  const locale = useLocale() as LanguageCode;

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGene, setExpandedGene] = useState<string | null>(null);
  const [filterCPIC, setFilterCPIC] = useState(false);

  // Get stats
  const stats = useMemo(() => getPharmGKBStats(), []);

  // Filter genes
  const filteredGenes = useMemo(() => {
    let genes = ALL_PHARMGKB_GENES;

    // CPIC filter
    if (filterCPIC) {
      genes = genes.filter((g) => g.hasCpicGuideline);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      genes = genes.filter(
        (g) =>
          g.gene.toLowerCase().includes(query) ||
          g.fullName.toLowerCase().includes(query) ||
          g.description.toLowerCase().includes(query) ||
          g.affectedDrugs.some(
            (d) =>
              d.drugName.toLowerCase().includes(query) || d.drugClass.toLowerCase().includes(query)
          )
      );
    }

    return genes;
  }, [searchQuery, filterCPIC]);

  // Toggle gene expansion
  const toggleGene = (geneSymbol: string) => {
    setExpandedGene(expandedGene === geneSymbol ? null : geneSymbol);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('back') || 'Back'}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Dna className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {locale === 'pt' ? 'Farmacogenomica' : 'Pharmacogenomics'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {locale === 'pt'
                    ? 'Base de conhecimento PharmGKB - Interacoes gene-medicamento'
                    : 'PharmGKB Knowledge Base - Gene-drug interactions'}
                </p>
              </div>
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.totalGenes}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Genes' : 'Genes'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalDrugs}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Medicamentos' : 'Drugs'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.highEvidencePairs}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Evidencia Nivel A' : 'Level A Evidence'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.genesWithCPIC}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Guidelines CPIC' : 'CPIC Guidelines'}
                </div>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-purple-700 dark:text-purple-300">
                <p className="font-medium mb-1">
                  {locale === 'pt'
                    ? 'Sobre Farmacogenomica'
                    : 'About Pharmacogenomics'}
                </p>
                <p>
                  {locale === 'pt'
                    ? 'A farmacogenomica estuda como variacoes geneticas afetam a resposta aos medicamentos. Busque por gene (ex: CYP2D6, CYP2C19) ou medicamento (ex: clopidogrel, codeina) para ver recomendacoes de dosagem personalizadas.'
                    : 'Pharmacogenomics studies how genetic variations affect drug response. Search by gene (e.g., CYP2D6, CYP2C19) or drug (e.g., clopidogrel, codeine) to see personalized dosing recommendations.'}
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === 'pt'
                      ? 'Buscar por gene (CYP2D6) ou medicamento (codeina)...'
                      : 'Search by gene (CYP2D6) or drug (codeine)...'
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setFilterCPIC(!filterCPIC)}
                className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  filterCPIC
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                }`}
              >
                <Check className={`w-4 h-4 ${filterCPIC ? 'opacity-100' : 'opacity-0'}`} />
                {locale === 'pt' ? 'Apenas CPIC' : 'CPIC Only'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredGenes.length}{' '}
              {locale === 'pt'
                ? `gene${filteredGenes.length !== 1 ? 's' : ''} encontrado${filteredGenes.length !== 1 ? 's' : ''}`
                : `gene${filteredGenes.length !== 1 ? 's' : ''} found`}
            </div>

            {filteredGenes.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
                <Dna className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  {locale === 'pt'
                    ? 'Nenhum gene encontrado. Tente um termo diferente.'
                    : 'No genes found. Try a different term.'}
                </p>
              </div>
            ) : (
              filteredGenes.map((gene) => (
                <GeneCard
                  key={gene.gene}
                  gene={gene}
                  expanded={expandedGene === gene.gene}
                  onToggle={() => toggleGene(gene.gene)}
                  locale={locale}
                />
              ))
            )}
          </div>

          {/* Dosing Recommendations Summary */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {locale === 'pt' ? 'Pares Gene-Medicamento de Alto Risco' : 'High-Risk Gene-Drug Pairs'}
              </h2>
              <p className="text-red-100 text-sm">
                {locale === 'pt'
                  ? 'Combinacoes que requerem atencao especial ou sao contraindicadas'
                  : 'Combinations requiring special attention or contraindicated'}
              </p>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-4">
                {DOSING_RECOMMENDATIONS.filter((r) => r.warningLevel === 'contraindicated').map(
                  (rec, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <span className="font-bold text-red-700 dark:text-red-300">
                          {rec.geneSymbol} + {rec.drugName}
                        </span>
                      </div>
                      <p className="text-sm text-red-600 dark:text-red-400 mb-1">
                        <strong>{locale === 'pt' ? 'Fenotipo:' : 'Phenotype:'}</strong> {rec.phenotype}
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400">{rec.adjustedDose}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* References */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-2 font-medium">
              {locale === 'pt' ? 'Referencias:' : 'References:'}
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                PharmGKB:{' '}
                <a
                  href="https://www.pharmgkb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  www.pharmgkb.org
                </a>
              </li>
              <li>
                CPIC Guidelines:{' '}
                <a
                  href="https://cpicpgx.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  cpicpgx.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
