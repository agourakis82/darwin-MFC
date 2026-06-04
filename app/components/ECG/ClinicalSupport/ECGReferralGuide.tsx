'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  AlertCircle,
  CheckCircle,
  Activity,
  Building2,
  Stethoscope,
  ClipboardList,
  Search,
  ChevronDown,
  ChevronRight,
  FileText,
  Phone,
  ArrowRight,
  Filter,
  Heart,
  Zap,
  Shield,
  Users,
  Bed,
  Cross,
} from 'lucide-react';
import { suggestReferral } from '@/lib/services/ecg-clinical-support';
import type { ECGFindings, ReferralSuggestion } from '@/lib/services/ecg-clinical-support';
import {
  allReferralCriteria,
  contextSpecificReferrals,
  emergencyReferrals,
  urgentReferrals,
  routineReferrals,
  noReferralNeeded,
  type CategoriaUrgencia,
  type ECGReferralCriteria,
  type ContextSpecificReferral,
} from '@/lib/data/ecg/clinical-support/referral-criteria';
import type { ClinicalContext } from '@/lib/types/ecg';
import { Tabs, TabList, Tab, TabPanel } from '@/app/components/ui/Tabs';

// =============================================================================
// INTERFACES
// =============================================================================

interface ECGReferralGuideProps {
  findings?: ECGFindings;
  context?: ClinicalContext;
  showFullGuide?: boolean;
}

interface UrgencyCategoryConfig {
  id: CategoriaUrgencia;
  label: string;
  timeframe: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
  badgeColor: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const URGENCY_CONFIG: Record<CategoriaUrgencia, UrgencyCategoryConfig> = {
  emergencia: {
    id: 'emergencia',
    label: 'Emergencia',
    timeframe: 'Imediato',
    icon: <Zap className="w-5 h-5" />,
    bgColor: 'bg-red-500/10 dark:bg-red-500/20',
    borderColor: 'border-red-500/30 dark:border-red-500/40',
    textColor: 'text-red-700 dark:text-red-300',
    iconColor: 'text-red-500 dark:text-red-400',
    badgeColor: 'bg-red-500 text-white',
  },
  urgente: {
    id: 'urgente',
    label: 'Urgente',
    timeframe: '24-48h',
    icon: <AlertTriangle className="w-5 h-5" />,
    bgColor: 'bg-orange-500/10 dark:bg-orange-500/20',
    borderColor: 'border-orange-500/30 dark:border-orange-500/40',
    textColor: 'text-orange-700 dark:text-orange-300',
    iconColor: 'text-orange-500 dark:text-orange-400',
    badgeColor: 'bg-orange-500 text-white',
  },
  rotina: {
    id: 'rotina',
    label: 'Rotina',
    timeframe: '7-30 dias',
    icon: <Clock className="w-5 h-5" />,
    bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
    borderColor: 'border-blue-500/30 dark:border-blue-500/40',
    textColor: 'text-blue-700 dark:text-blue-300',
    iconColor: 'text-blue-500 dark:text-blue-400',
    badgeColor: 'bg-blue-500 text-white',
  },
  nao_necessario: {
    id: 'nao_necessario',
    label: 'Nao Necessario',
    timeframe: 'N/A',
    icon: <CheckCircle className="w-5 h-5" />,
    bgColor: 'bg-green-500/10 dark:bg-green-500/20',
    borderColor: 'border-green-500/30 dark:border-green-500/40',
    textColor: 'text-green-700 dark:text-green-300',
    iconColor: 'text-green-500 dark:text-green-400',
    badgeColor: 'bg-green-500 text-white',
  },
};

const CONTEXT_TAB_CONFIG = {
  aps: {
    id: 'aps' as const,
    label: 'APS',
    fullLabel: 'Atencao Primaria',
    icon: <Stethoscope className="w-4 h-4" />,
  },
  emergencia: {
    id: 'emergencia' as const,
    label: 'Emergencia',
    fullLabel: 'Departamento de Emergencia',
    icon: <Cross className="w-4 h-4" />,
  },
  uti: {
    id: 'uti' as const,
    label: 'UTI',
    fullLabel: 'Unidade de Terapia Intensiva',
    icon: <Bed className="w-4 h-4" />,
  },
  preoperatorio: {
    id: 'preoperatorio' as const,
    label: 'Pre-op',
    fullLabel: 'Avaliacao Pre-operatoria',
    icon: <Shield className="w-4 h-4" />,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function mapClinicalContextToReferralContext(
  context: ClinicalContext
): 'aps' | 'emergencia' | 'uti' | 'preoperatorio' {
  switch (context) {
    case 'emergency':
      return 'emergencia';
    case 'icu':
    case 'ccu':
      return 'uti';
    case 'preoperative':
      return 'preoperatorio';
    case 'primary_care':
    case 'ward':
    case 'telemedicine':
    default:
      return 'aps';
  }
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Referral Recommendation Card
 * Displays the main referral recommendation based on ECG findings
 */
function ReferralRecommendationCard({
  suggestion,
}: {
  suggestion: ReferralSuggestion;
}) {
  const [expanded, setExpanded] = useState(true);

  const recommendationLevel = suggestion.recommendation;
  const urgencyConfig =
    recommendationLevel === 'emergency'
      ? URGENCY_CONFIG.emergencia
      : recommendationLevel === 'priority'
        ? URGENCY_CONFIG.urgente
        : recommendationLevel === 'routine'
          ? URGENCY_CONFIG.rotina
          : URGENCY_CONFIG.nao_necessario;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border-2 ${urgencyConfig.borderColor} ${urgencyConfig.bgColor} overflow-hidden`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl ${urgencyConfig.bgColor} flex items-center justify-center ${urgencyConfig.iconColor}`}
          >
            {urgencyConfig.icon}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3
                className={`text-lg font-semibold ${urgencyConfig.textColor}`}
              >
                {suggestion.shouldRefer
                  ? `Encaminhamento ${urgencyConfig.label}`
                  : 'Encaminhamento Nao Necessario'}
              </h3>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${urgencyConfig.badgeColor}`}
              >
                {suggestion.timeframe}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Destino: {formatDestination(suggestion.destination)}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-white/10"
          >
            <div className="px-6 py-4 space-y-4">
              {/* Rationale */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Justificativa
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {suggestion.rationale}
                </p>
              </div>

              {/* Required Information */}
              {suggestion.requiredInformation.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4" />
                    Informacoes Necessarias
                  </h4>
                  <ul className="space-y-1">
                    {suggestion.requiredInformation.map((info, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                      >
                        <ChevronRight className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pre-referral Workup */}
              {suggestion.preReferralWorkup.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Exames Pre-encaminhamento
                  </h4>
                  <ul className="space-y-1">
                    {suggestion.preReferralWorkup.map((exam, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                      >
                        <ChevronRight className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                        {exam}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions While Awaiting */}
              {suggestion.actionsWhileAwaiting.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Enquanto Aguarda
                  </h4>
                  <ul className="space-y-1">
                    {suggestion.actionsWhileAwaiting.map((action, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                      >
                        <ChevronRight className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Urgency Category Section
 * Displays all conditions for a given urgency category
 */
function UrgencyCategorySection({
  category,
  criteria,
  defaultExpanded = false,
}: {
  category: CategoriaUrgencia;
  criteria: ECGReferralCriteria[];
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const config = URGENCY_CONFIG[category];

  return (
    <div
      className={`rounded-xl border ${config.borderColor} ${config.bgColor} overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className={config.iconColor}>{config.icon}</div>
          <div className="text-left">
            <h3 className={`font-semibold ${config.textColor}`}>
              {config.label}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {criteria.length} condicoes - {config.timeframe}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.badgeColor}`}
          >
            {criteria.length}
          </span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200/50 dark:border-white/5"
          >
            <div className="p-4 space-y-3">
              {criteria.map((criterion) => (
                <CriterionCard key={criterion.id} criterion={criterion} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Individual Criterion Card
 * Expandable card showing details of a single referral criterion
 */
function CriterionCard({ criterion }: { criterion: ECGReferralCriteria }) {
  const [expanded, setExpanded] = useState(false);
  const config = URGENCY_CONFIG[criterion.categoria];

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-start justify-between text-left"
      >
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            {criterion.achado}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {criterion.descricao}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.badgeColor}`}
          >
            {criterion.tempo}
          </span>
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-white/10"
          >
            <div className="px-4 py-3 space-y-4 bg-gray-50 dark:bg-white/5">
              {/* Justificativa */}
              <div>
                <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">
                  Justificativa
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {criterion.justificativa}
                </p>
              </div>

              {/* Destino */}
              <div>
                <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">
                  Especialidade Destino
                </h5>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDestination(criterion.especialidadeDestino)}
                  </span>
                </div>
              </div>

              {/* O que fazer enquanto aguarda */}
              <div>
                <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                  O Que Fazer Enquanto Aguarda
                </h5>
                <ul className="space-y-1.5">
                  {criterion.oqueFazerEnquantoAguarda.map((action, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                    >
                      <ArrowRight className="w-3 h-3 mt-1.5 text-gray-400 flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exames complementares */}
              {criterion.examesComplementares &&
                criterion.examesComplementares.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                      Exames Complementares
                    </h5>
                    <ul className="space-y-1.5">
                      {criterion.examesComplementares.map((exam, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                        >
                          <ArrowRight className="w-3 h-3 mt-1.5 text-gray-400 flex-shrink-0" />
                          {exam}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Criterios adicionais */}
              {criterion.criteriosAdicionais &&
                criterion.criteriosAdicionais.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                      Criterios Adicionais
                    </h5>
                    <ul className="space-y-1.5">
                      {criterion.criteriosAdicionais.map((crit, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                        >
                          <AlertCircle className="w-3 h-3 mt-1.5 text-amber-500 flex-shrink-0" />
                          {crit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {criterion.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Context-Specific Guidance Panel
 * Shows guidance for a specific clinical context
 */
function ContextGuidancePanel({
  guidance,
}: {
  guidance: ContextSpecificReferral;
}) {
  const tabConfig = CONTEXT_TAB_CONFIG[guidance.contexto];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#007aff]/10 dark:bg-[#5ac8fa]/20 flex items-center justify-center text-[#007aff] dark:text-[#5ac8fa]">
          {tabConfig.icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {guidance.titulo}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {guidance.descricao}
          </p>
        </div>
      </div>

      {/* Criterios */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-200 dark:border-white/10 p-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-[#007aff] dark:text-[#5ac8fa]" />
          Criterios de Encaminhamento
        </h4>
        <ul className="space-y-2">
          {guidance.criterios.map((criterio, index) => (
            <li
              key={index}
              className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-[#007aff]/10 dark:bg-[#5ac8fa]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-[#007aff] dark:text-[#5ac8fa]">
                  {index + 1}
                </span>
              </div>
              {criterio}
            </li>
          ))}
        </ul>
      </div>

      {/* Acoes */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-200 dark:border-white/10 p-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-500 dark:text-green-400" />
          Acoes Recomendadas
        </h4>
        <ul className="space-y-2">
          {guidance.acoes.map((acao, index) => (
            <li
              key={index}
              className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
              {acao}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/**
 * Quick Reference Table
 * Searchable/filterable table of all referral criteria
 */
function QuickReferenceTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState<
    CategoriaUrgencia | 'all'
  >('all');

  const filteredCriteria = useMemo(() => {
    return allReferralCriteria.filter((criterion) => {
      const matchesSearch =
        searchTerm === '' ||
        criterion.achado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        criterion.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesUrgency =
        selectedUrgency === 'all' || criterion.categoria === selectedUrgency;

      return matchesSearch && matchesUrgency;
    });
  }, [searchTerm, selectedUrgency]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar condicao ou tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007aff]/50"
          />
        </div>

        {/* Urgency Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedUrgency}
            onChange={(e) =>
              setSelectedUrgency(e.target.value as CategoriaUrgencia | 'all')
            }
            className="pl-10 pr-8 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#007aff]/50 appearance-none cursor-pointer"
          >
            <option value="all">Todas as Urgencias</option>
            <option value="emergencia">Emergencia</option>
            <option value="urgente">Urgente</option>
            <option value="rotina">Rotina</option>
            <option value="nao_necessario">Nao Necessario</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {filteredCriteria.length} resultados encontrados
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Condicao
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Urgencia
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Tempo
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Destino
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            {filteredCriteria.map((criterion) => {
              const config = URGENCY_CONFIG[criterion.categoria];
              return (
                <tr
                  key={criterion.id}
                  className="bg-white dark:bg-[#1c1c1e] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {criterion.achado}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {criterion.descricao}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${config.badgeColor}`}
                    >
                      {config.icon}
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {criterion.tempo}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDestination(criterion.especialidadeDestino)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredCriteria.length === 0 && (
          <div className="px-4 py-8 text-center">
            <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nenhum criterio encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Action Checklist Component
 * Pre-referral checklist with completion tracking
 */
function ActionChecklist({
  suggestion,
}: {
  suggestion: ReferralSuggestion | null;
}) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((item: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  }, []);

  const preReferralActions = suggestion?.preReferralWorkup || [
    'ECG de 12 derivacoes completo',
    'Revisar medicacoes em uso',
    'Verificar historia cardiovascular',
    'Avaliar comorbidades',
    'Documentar sintomas atuais',
  ];

  const informationToGather = suggestion?.requiredInformation || [
    'Resumo clinico do paciente',
    'Medicacoes em uso',
    'Comorbidades relevantes',
    'ECG com hora marcada',
    'Exames laboratoriais recentes',
  ];

  const documentationRequirements = [
    'Preencher guia de encaminhamento',
    'Anexar ECG ao prontuario',
    'Registrar justificativa clinica',
    'Orientar paciente sobre sinais de alerta',
    'Agendar retorno se nao atendido',
  ];

  const allItems = [
    ...preReferralActions,
    ...informationToGather,
    ...documentationRequirements,
  ];
  const completionPercentage = Math.round(
    (checkedItems.size / allItems.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-200 dark:border-white/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            Progresso do Checklist
          </h4>
          <span className="text-sm font-medium text-[#007aff] dark:text-[#5ac8fa]">
            {completionPercentage}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#007aff] dark:bg-[#5ac8fa]"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {checkedItems.size} de {allItems.length} itens completados
        </p>
      </div>

      {/* Pre-referral Actions */}
      <ChecklistSection
        title="Acoes Pre-encaminhamento"
        icon={<Activity className="w-4 h-4" />}
        items={preReferralActions}
        checkedItems={checkedItems}
        onToggle={toggleItem}
      />

      {/* Information to Gather */}
      <ChecklistSection
        title="Informacoes a Coletar"
        icon={<ClipboardList className="w-4 h-4" />}
        items={informationToGather}
        checkedItems={checkedItems}
        onToggle={toggleItem}
      />

      {/* Documentation */}
      <ChecklistSection
        title="Documentacao"
        icon={<FileText className="w-4 h-4" />}
        items={documentationRequirements}
        checkedItems={checkedItems}
        onToggle={toggleItem}
      />
    </div>
  );
}

/**
 * Checklist Section Sub-component
 */
function ChecklistSection({
  title,
  icon,
  items,
  checkedItems,
  onToggle,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  checkedItems: Set<string>;
  onToggle: (item: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-200 dark:border-white/10 p-4">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
        <span className="text-[#007aff] dark:text-[#5ac8fa]">{icon}</span>
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => {
          const isChecked = checkedItems.has(item);
          return (
            <li key={index}>
              <button
                onClick={() => onToggle(item)}
                className={`w-full flex items-start gap-3 p-2 rounded-lg transition-colors ${
                  isChecked
                    ? 'bg-green-500/10 dark:bg-green-500/20'
                    : 'hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {isChecked && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span
                  className={`text-sm text-left ${
                    isChecked
                      ? 'text-green-700 dark:text-green-300 line-through'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// =============================================================================
// HELPER FUNCTION
// =============================================================================

function formatDestination(
  destination: string
): string {
  const destinationMap: Record<string, string> = {
    cardiologia: 'Cardiologia',
    eletrofisiologia: 'Eletrofisiologia',
    hemodinamica: 'Hemodinamica',
    uti_cardiologica: 'UTI Cardiologica',
    emergencia: 'Emergencia',
    cirurgia_cardiaca: 'Cirurgia Cardiaca',
  };
  return destinationMap[destination] || destination;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ECGReferralGuide({
  findings,
  context = 'primary_care',
  showFullGuide = true,
}: ECGReferralGuideProps) {
  const t = useTranslations('common');
  const [activeTab, setActiveTab] = useState<string>('recommendation');
  const [activeContextTab, setActiveContextTab] = useState<string>(
    mapClinicalContextToReferralContext(context)
  );

  // Generate referral suggestion based on findings
  const referralSuggestion = useMemo<ReferralSuggestion | null>(() => {
    if (!findings) return null;
    return suggestReferral(findings, context);
  }, [findings, context]);

  // Get context-specific guidance
  const contextGuidance = useMemo(() => {
    return contextSpecificReferrals.find(
      (g) => g.contexto === activeContextTab
    );
  }, [activeContextTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#007aff] to-[#5856d6] flex items-center justify-center">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Guia de Encaminhamento ECG
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Suporte a decisao para encaminhamento cardiologico
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} variant="pills">
        <TabList className="flex-wrap">
          <Tab value="recommendation" icon={<Heart className="w-4 h-4" />}>
            Recomendacao
          </Tab>
          <Tab value="categories" icon={<Activity className="w-4 h-4" />}>
            Categorias
          </Tab>
          <Tab value="context" icon={<Users className="w-4 h-4" />}>
            Por Contexto
          </Tab>
          <Tab value="reference" icon={<Search className="w-4 h-4" />}>
            Consulta Rapida
          </Tab>
          <Tab value="checklist" icon={<ClipboardList className="w-4 h-4" />}>
            Checklist
          </Tab>
        </TabList>

        {/* Recommendation Tab */}
        <TabPanel value="recommendation">
          <div className="space-y-6">
            {referralSuggestion ? (
              <ReferralRecommendationCard suggestion={referralSuggestion} />
            ) : (
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-8 text-center">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Insira os Achados do ECG
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Para obter uma recomendacao de encaminhamento personalizada,
                  forneca os achados do ECG atraves do componente de analise.
                </p>
              </div>
            )}

            {/* Summary of All Categories */}
            {showFullGuide && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(URGENCY_CONFIG).map(([key, config]) => {
                  const count =
                    key === 'emergencia'
                      ? emergencyReferrals.length
                      : key === 'urgente'
                        ? urgentReferrals.length
                        : key === 'rotina'
                          ? routineReferrals.length
                          : noReferralNeeded.length;

                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveTab('categories');
                      }}
                      className={`p-4 rounded-xl border ${config.borderColor} ${config.bgColor} hover:shadow-md transition-all text-left`}
                    >
                      <div className={`${config.iconColor} mb-2`}>
                        {config.icon}
                      </div>
                      <p
                        className={`font-semibold text-sm ${config.textColor}`}
                      >
                        {config.label}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {count} condicoes
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </TabPanel>

        {/* Categories Tab */}
        <TabPanel value="categories">
          <div className="space-y-4">
            <UrgencyCategorySection
              category="emergencia"
              criteria={emergencyReferrals}
              defaultExpanded={true}
            />
            <UrgencyCategorySection
              category="urgente"
              criteria={urgentReferrals}
            />
            <UrgencyCategorySection
              category="rotina"
              criteria={routineReferrals}
            />
            <UrgencyCategorySection
              category="nao_necessario"
              criteria={noReferralNeeded}
            />
          </div>
        </TabPanel>

        {/* Context-Specific Tab */}
        <TabPanel value="context">
          <div className="space-y-4">
            {/* Context Sub-tabs */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(CONTEXT_TAB_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setActiveContextTab(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeContextTab === key
                      ? 'bg-[#007aff] text-white dark:bg-[#5ac8fa]'
                      : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {config.icon}
                  {config.label}
                </button>
              ))}
            </div>

            {/* Context Guidance */}
            <AnimatePresence mode="wait">
              {contextGuidance && (
                <ContextGuidancePanel
                  key={contextGuidance.contexto}
                  guidance={contextGuidance}
                />
              )}
            </AnimatePresence>
          </div>
        </TabPanel>

        {/* Quick Reference Tab */}
        <TabPanel value="reference">
          <QuickReferenceTable />
        </TabPanel>

        {/* Checklist Tab */}
        <TabPanel value="checklist">
          <ActionChecklist suggestion={referralSuggestion} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default ECGReferralGuide;
