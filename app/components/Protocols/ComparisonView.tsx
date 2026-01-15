'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Building2,
  Globe,
  FileText,
  Info,
  ExternalLink,
  Users,
  Calendar,
  Beaker,
} from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export type ConvergenceStatus = 'convergencia' | 'parcial' | 'divergencia' | 'em_disputa';

export interface ProtocolSource {
  /** Source identifier (e.g., "SUS", "USPSTF", "NHS") */
  id: string;
  /** Full name */
  name: string;
  /** Country/region */
  country: string;
  /** ISO country code for flag */
  countryCode?: string;
  /** Organization type */
  type: 'government' | 'society' | 'who' | 'other';
  /** Color theme */
  color: string;
  /** Background color */
  bgColor: string;
  /** Border color */
  borderColor: string;
}

export interface ProtocolRecommendation {
  /** Source identifier */
  sourceId: string;
  /** Target population */
  population: string;
  /** Screening method */
  method: string;
  /** Interval/periodicity */
  periodicity: string;
  /** Age range (if applicable) */
  ageRange?: string;
  /** Evidence grade */
  evidenceGrade?: string;
  /** Last updated */
  lastUpdated?: string;
  /** Additional notes */
  notes?: string;
  /** External link to guideline */
  url?: string;
}

export interface ComparisonViewProps {
  /** Title of the comparison */
  title: string;
  /** Description */
  description?: string;
  /** Protocol sources to compare */
  sources: ProtocolSource[];
  /** Recommendations from each source */
  recommendations: ProtocolRecommendation[];
  /** Convergence status */
  convergenceStatus?: ConvergenceStatus;
  /** Convergence description */
  convergenceDescription?: string;
  /** Show detailed view by default */
  defaultExpanded?: boolean;
  /** Compact mode */
  compact?: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_SOURCES: ProtocolSource[] = [
  {
    id: 'SUS',
    name: 'Sistema Unico de Saude',
    country: 'Brasil',
    countryCode: 'BR',
    type: 'government',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/40',
    borderColor: 'border-blue-300 dark:border-blue-700',
  },
  {
    id: 'USPSTF',
    name: 'US Preventive Services Task Force',
    country: 'EUA',
    countryCode: 'US',
    type: 'government',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/40',
    borderColor: 'border-red-300 dark:border-red-700',
  },
  {
    id: 'NHS',
    name: 'National Health Service',
    country: 'Reino Unido',
    countryCode: 'GB',
    type: 'government',
    color: 'text-cyan-700 dark:text-cyan-400',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/40',
    borderColor: 'border-cyan-300 dark:border-cyan-700',
  },
  {
    id: 'WHO',
    name: 'World Health Organization',
    country: 'Internacional',
    countryCode: 'UN',
    type: 'who',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
    borderColor: 'border-emerald-300 dark:border-emerald-700',
  },
];

const CONVERGENCE_CONFIG: Record<
  ConvergenceStatus,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    borderColor: string;
    description: string;
  }
> = {
  convergencia: {
    label: 'Convergencia Total',
    icon: CheckCircle,
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    borderColor: 'border-emerald-300 dark:border-emerald-700',
    description: 'Todas as fontes concordam nas recomendacoes principais',
  },
  parcial: {
    label: 'Convergencia Parcial',
    icon: HelpCircle,
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    borderColor: 'border-amber-300 dark:border-amber-700',
    description: 'Concordancia em alguns aspectos, divergencias em outros',
  },
  divergencia: {
    label: 'Divergencia',
    icon: XCircle,
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    borderColor: 'border-red-300 dark:border-red-700',
    description: 'As fontes apresentam recomendacoes conflitantes',
  },
  em_disputa: {
    label: 'Em Disputa',
    icon: AlertTriangle,
    color: 'text-purple-700 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    borderColor: 'border-purple-300 dark:border-purple-700',
    description: 'Debate ativo na comunidade cientifica',
  },
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function SourceHeader({ source }: { source: ProtocolSource }) {
  const TypeIcon = source.type === 'who' ? Globe : source.type === 'society' ? Building2 : FileText;

  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`
          w-12 h-12 rounded-xl
          ${source.bgColor}
          flex items-center justify-center
          border ${source.borderColor}
        `}
      >
        <TypeIcon className={`w-6 h-6 ${source.color}`} />
      </div>
      <div>
        <h4 className={`font-bold ${source.color}`}>{source.id}</h4>
        <p className="text-xs text-[#86868b]">{source.country}</p>
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  source,
  isHighlighted,
}: {
  recommendation: ProtocolRecommendation;
  source: ProtocolSource;
  isHighlighted?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={`
        rounded-xl border-2 overflow-hidden
        ${source.borderColor}
        ${isHighlighted ? source.bgColor : 'bg-white dark:bg-[#1c1c1e]'}
        transition-all duration-200
      `}
    >
      {/* Header */}
      <div className="p-4">
        <SourceHeader source={source} />

        {/* Main Info Grid */}
        <div className="grid gap-3">
          <DataRow
            icon={Users}
            label="Populacao-alvo"
            value={recommendation.population}
            highlight
          />
          <DataRow
            icon={Beaker}
            label="Metodo"
            value={recommendation.method}
          />
          <DataRow
            icon={Calendar}
            label="Periodicidade"
            value={recommendation.periodicity}
          />
          {recommendation.ageRange && (
            <DataRow
              icon={Users}
              label="Faixa Etaria"
              value={recommendation.ageRange}
            />
          )}
        </div>

        {/* Evidence & Metadata */}
        <div className="flex flex-wrap gap-2 mt-4">
          {recommendation.evidenceGrade && (
            <span
              className={`
                px-2 py-1 rounded-md text-xs font-bold
                ${source.bgColor} ${source.color}
                border ${source.borderColor}
              `}
            >
              Evidencia: {recommendation.evidenceGrade}
            </span>
          )}
          {recommendation.lastUpdated && (
            <span className="px-2 py-1 rounded-md text-xs text-[#86868b] bg-gray-100 dark:bg-gray-800">
              Atualizado: {recommendation.lastUpdated}
            </span>
          )}
        </div>
      </div>

      {/* Expandable Notes */}
      {recommendation.notes && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              w-full px-4 py-2 flex items-center justify-between
              border-t ${source.borderColor}
              hover:bg-gray-50 dark:hover:bg-white/5
              transition-colors
            `}
          >
            <span className="text-xs font-medium text-[#86868b]">
              Notas adicionais
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`px-4 py-3 ${source.bgColor} border-t ${source.borderColor}`}
              >
                <p className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {recommendation.notes}
                </p>
                {recommendation.url && (
                  <a
                    href={recommendation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center gap-1 mt-2 text-xs ${source.color}
                      hover:underline
                    `}
                  >
                    Ver guideline completo
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

function DataRow({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`
        flex items-start gap-2
        ${highlight ? 'p-2 rounded-lg bg-gray-50 dark:bg-white/5' : ''}
      `}
    >
      <Icon className="w-4 h-4 text-[#86868b] mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <dt className="text-xs font-medium text-[#86868b]">{label}</dt>
        <dd className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">{value}</dd>
      </div>
    </div>
  );
}

function ConvergenceBadge({
  status,
  description,
}: {
  status: ConvergenceStatus;
  description?: string;
}) {
  const config = CONVERGENCE_CONFIG[status];
  const Icon = config.icon;

  return (
    <div
      className={`
        p-4 rounded-xl border-2
        ${config.borderColor} ${config.bgColor}
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            w-10 h-10 rounded-xl ${config.bgColor}
            flex items-center justify-center
            border ${config.borderColor}
          `}
        >
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div className="flex-1">
          <h4 className={`font-bold ${config.color}`}>{config.label}</h4>
          <p className="text-sm text-[#86868b] mt-1">
            {description || config.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// COMPARISON MATRIX
// =============================================================================

interface MatrixCell {
  sourceId: string;
  field: string;
  value: string;
}

function ComparisonMatrix({
  sources,
  recommendations,
}: {
  sources: ProtocolSource[];
  recommendations: ProtocolRecommendation[];
}) {
  const fields = ['population', 'method', 'periodicity', 'ageRange', 'evidenceGrade'];
  const fieldLabels: Record<string, string> = {
    population: 'Populacao',
    method: 'Metodo',
    periodicity: 'Periodicidade',
    ageRange: 'Faixa Etaria',
    evidenceGrade: 'Evidencia',
  };

  // Build matrix data
  const matrix: Record<string, Record<string, string>> = {};
  fields.forEach((field) => {
    matrix[field] = {};
    recommendations.forEach((rec) => {
      const value = rec[field as keyof ProtocolRecommendation];
      if (value && typeof value === 'string') {
        matrix[field][rec.sourceId] = value;
      }
    });
  });

  // Check if values are similar
  const checkSimilarity = (field: string): 'same' | 'similar' | 'different' => {
    const values = Object.values(matrix[field]).filter(Boolean);
    if (values.length <= 1) return 'same';

    const normalized = values.map((v) => v.toLowerCase().trim());
    const unique = [...new Set(normalized)];

    if (unique.length === 1) return 'same';
    if (unique.length <= values.length / 2) return 'similar';
    return 'different';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-[#86868b] border-b border-gray-200 dark:border-gray-700">
              Aspecto
            </th>
            {sources.map((source) => (
              <th
                key={source.id}
                className={`
                  text-left p-3 text-xs font-bold uppercase tracking-wider
                  ${source.color}
                  border-b ${source.borderColor}
                  ${source.bgColor}
                `}
              >
                {source.id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => {
            const similarity = checkSimilarity(field);
            const hasValues = Object.keys(matrix[field]).length > 0;
            if (!hasValues) return null;

            return (
              <tr key={field} className="hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-3 text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    {fieldLabels[field]}
                    {similarity === 'same' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {similarity === 'similar' && (
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                    )}
                    {similarity === 'different' && (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </td>
                {sources.map((source) => (
                  <td
                    key={source.id}
                    className={`
                      p-3 text-sm text-[#1d1d1f] dark:text-[#f5f5f7]
                      border-b border-gray-100 dark:border-gray-800
                    `}
                  >
                    {matrix[field][source.id] || (
                      <span className="text-[#86868b] italic">N/D</span>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ComparisonView({
  title,
  description,
  sources,
  recommendations,
  convergenceStatus = 'parcial',
  convergenceDescription,
  defaultExpanded = false,
  compact = false,
}: ComparisonViewProps) {
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Map sources by ID for quick lookup
  const sourceMap = useMemo(() => {
    const map = new Map<string, ProtocolSource>();
    [...DEFAULT_SOURCES, ...sources].forEach((s) => map.set(s.id, s));
    return map;
  }, [sources]);

  // Get source for each recommendation
  const getSource = (sourceId: string): ProtocolSource => {
    return (
      sourceMap.get(sourceId) || {
        id: sourceId,
        name: sourceId,
        country: 'Desconhecido',
        type: 'other',
        color: 'text-gray-700 dark:text-gray-400',
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        borderColor: 'border-gray-300 dark:border-gray-600',
      }
    );
  };

  return (
    <div className={`w-full ${compact ? 'max-w-2xl' : 'max-w-6xl'} mx-auto`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
              {title}
            </h2>
            {description && (
              <p className="text-[#86868b] mt-1">{description}</p>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-gray-700 text-[#1d1d1f] dark:text-white shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }
              `}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  viewMode === 'matrix'
                    ? 'bg-white dark:bg-gray-700 text-[#1d1d1f] dark:text-white shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }
              `}
            >
              Tabela
            </button>
          </div>
        </div>

        {/* Convergence Badge */}
        <ConvergenceBadge
          status={convergenceStatus}
          description={convergenceDescription}
        />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'cards' ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`
              grid gap-6
              ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}
            `}
          >
            {recommendations.map((rec, idx) => (
              <RecommendationCard
                key={rec.sourceId}
                recommendation={rec}
                source={getSource(rec.sourceId)}
                isHighlighted={idx === 0}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="matrix"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
          >
            <ComparisonMatrix
              sources={recommendations.map((r) => getSource(r.sourceId))}
              recommendations={recommendations}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      {!compact && (
        <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-3">
            Legenda de Convergencia
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(CONVERGENCE_CONFIG).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <span className="text-xs text-[#86868b]">{config.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ComparisonView;
