'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Link } from '@/i18n/routing';
import {
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Info,
  Pill,
  Baby,
  X,
} from 'lucide-react';
import { medicamentosGestacao } from '@/lib/data/medicamentos/medicamentos-gestacao';
import { Medicamento, ClassificacaoGestacao, CLASSIFICACAO_GESTACAO } from '@/lib/types/medicamento';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

type SortField = 'name' | 'class' | 'fda' | 'indication';
type SortDirection = 'asc' | 'desc';
type FDACategory = 'A' | 'B' | 'C' | 'D' | 'X' | 'all';

interface PregnancyMedicationsTableProps {
  /** Initial FDA category filter */
  initialCategory?: FDACategory;
  /** Initial indication filter */
  initialIndication?: string;
  /** Compact mode for embedding */
  compact?: boolean;
  /** Maximum number of items to show (for preview mode) */
  maxItems?: number;
  /** Show filters */
  showFilters?: boolean;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const FDA_CATEGORIES: { value: FDACategory; label: string; color: string; bgColor: string; description: string }[] = [
  {
    value: 'A',
    label: 'A',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700',
    description: 'Seguro - estudos controlados sem risco'
  },
  {
    value: 'B',
    label: 'B',
    color: 'text-lime-700 dark:text-lime-300',
    bgColor: 'bg-lime-100 dark:bg-lime-900/50 border-lime-300 dark:border-lime-700',
    description: 'Provavelmente seguro - sem risco em animais'
  },
  {
    value: 'C',
    label: 'C',
    color: 'text-yellow-700 dark:text-yellow-300',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/50 border-yellow-300 dark:border-yellow-700',
    description: 'Usar com cautela - risco nao descartado'
  },
  {
    value: 'D',
    label: 'D',
    color: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-100 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700',
    description: 'Risco fetal - usar apenas se necessario'
  },
  {
    value: 'X',
    label: 'X',
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-100 dark:bg-red-900/50 border-red-300 dark:border-red-700',
    description: 'Contraindicado - risco supera beneficio'
  },
];

// Extract unique indications from medications
const INDICATIONS = [
  { value: 'all', label: 'Todas as indicacoes' },
  { value: 'dmg', label: 'Diabetes Gestacional (DMG)' },
  { value: 'hipertensao', label: 'Hipertensao' },
  { value: 'tireoide', label: 'Tireoide' },
  { value: 'trombofilia', label: 'Trombofilia/TEV' },
  { value: 'infeccao', label: 'Infeccoes/IST' },
  { value: 'suplemento', label: 'Suplementos' },
  { value: 'contraindicado', label: 'Contraindicados' },
];

// =============================================================================
// FDA CATEGORY BADGE COMPONENT
// =============================================================================

function FDACategoryBadge({
  category,
  size = 'md',
  showLabel = false
}: {
  category: ClassificacaoGestacao;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}) {
  const config = FDA_CATEGORIES.find(c => c.value === category) || FDA_CATEGORIES[4];

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'rounded-full font-bold flex items-center justify-center border-2',
          sizeClasses[size],
          config.bgColor,
          config.color
        )}
        title={config.description}
      >
        {category}
      </div>
      {showLabel && (
        <span className={cn('text-xs', config.color)}>
          {config.description}
        </span>
      )}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function PregnancyMedicationsTable({
  initialCategory = 'all',
  initialIndication = 'all',
  compact = false,
  maxItems,
  showFilters = true,
  className,
}: PregnancyMedicationsTableProps) {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FDACategory>(initialCategory);
  const [selectedIndication, setSelectedIndication] = useState(initialIndication);
  const [sortField, setSortField] = useState<SortField>('fda');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [expandedMed, setExpandedMed] = useState<string | null>(null);

  // Get indication from medication
  const getIndicationCategory = useCallback((med: Medicamento): string => {
    const indicacoes = med.indicacoes.join(' ').toLowerCase();
    const tags = med.tags?.join(' ').toLowerCase() || '';
    const combined = indicacoes + ' ' + tags;

    if (combined.includes('contraindicado') || med.gestacao === 'X') return 'contraindicado';
    if (combined.includes('dmg') || combined.includes('diabetes')) return 'dmg';
    if (combined.includes('hipertensi') || combined.includes('pre-eclamp') || combined.includes('eclamp')) return 'hipertensao';
    if (combined.includes('tireoide') || combined.includes('hipotireo') || combined.includes('hipertireo')) return 'tireoide';
    if (combined.includes('trombofilia') || combined.includes('tev') || combined.includes('anticoag')) return 'trombofilia';
    if (combined.includes('sifilis') || combined.includes('hiv') || combined.includes('ist') || combined.includes('infec')) return 'infeccao';
    if (combined.includes('suplemento') || combined.includes('vitamina') || combined.includes('ferro') || combined.includes('folico')) return 'suplemento';

    return 'all';
  }, []);

  // Filter and sort medications
  const filteredMedications = useMemo(() => {
    let result = [...medicamentosGestacao];

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(med =>
        med.nomeGenerico.toLowerCase().includes(search) ||
        med.nomesComerciais?.some(n => n.toLowerCase().includes(search)) ||
        med.classeTerapeutica.toLowerCase().includes(search) ||
        med.indicacoes.some(i => i.toLowerCase().includes(search)) ||
        med.tags?.some(t => t.toLowerCase().includes(search))
      );
    }

    // Filter by FDA category
    if (selectedCategory !== 'all') {
      result = result.filter(med => med.gestacao === selectedCategory);
    }

    // Filter by indication
    if (selectedIndication !== 'all') {
      result = result.filter(med => getIndicationCategory(med) === selectedIndication);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.nomeGenerico.localeCompare(b.nomeGenerico);
          break;
        case 'class':
          comparison = a.classeTerapeutica.localeCompare(b.classeTerapeutica);
          break;
        case 'fda':
          const fdaOrder = { A: 1, B: 2, C: 3, D: 4, X: 5, N: 6 };
          comparison = fdaOrder[a.gestacao] - fdaOrder[b.gestacao];
          break;
        case 'indication':
          comparison = a.indicacoes[0]?.localeCompare(b.indicacoes[0] || '') || 0;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    // Limit items if maxItems is set
    if (maxItems) {
      result = result.slice(0, maxItems);
    }

    return result;
  }, [searchTerm, selectedCategory, selectedIndication, sortField, sortDirection, maxItems, getIndicationCategory]);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get safety icon
  const getSafetyIcon = (category: ClassificacaoGestacao) => {
    switch (category) {
      case 'A':
      case 'B':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'C':
        return <Info className="w-4 h-4 text-yellow-500" />;
      case 'D':
      case 'X':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  // Summary stats
  const stats = useMemo(() => {
    const byCategory = medicamentosGestacao.reduce((acc, med) => {
      acc[med.gestacao] = (acc[med.gestacao] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: medicamentosGestacao.length,
      safe: (byCategory['A'] || 0) + (byCategory['B'] || 0),
      caution: byCategory['C'] || 0,
      risk: (byCategory['D'] || 0) + (byCategory['X'] || 0),
      byCategory,
    };
  }, []);

  // Sort icon component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc'
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className={cn('bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden', className)}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
            <Baby className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              Medicamentos na Gestacao
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {stats.total} medicamentos | Classificacao FDA
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        {!compact && (
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-900/30 rounded-full text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-700 dark:text-green-300">{stats.safe} seguros (A/B)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 dark:bg-yellow-900/30 rounded-full text-xs">
              <Info className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-yellow-700 dark:text-yellow-300">{stats.caution} cautela (C)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-900/30 rounded-full text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span className="text-red-700 dark:text-red-300">{stats.risk} risco (D/X)</span>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        {showFilters && (
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar medicamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {(selectedCategory !== 'all' || selectedIndication !== 'all') && (
                <span className="px-1.5 py-0.5 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 text-xs rounded-full">
                  {(selectedCategory !== 'all' ? 1 : 0) + (selectedIndication !== 'all' ? 1 : 0)}
                </span>
              )}
              {showFiltersPanel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Filters Panel */}
            {showFiltersPanel && (
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg space-y-3">
                {/* FDA Category Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Categoria FDA
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                        selectedCategory === 'all'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
                      )}
                    >
                      Todas
                    </button>
                    {FDA_CATEGORIES.map(cat => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value as FDACategory)}
                        className={cn(
                          'w-8 h-8 rounded-full font-bold text-sm transition-all border-2',
                          selectedCategory === cat.value
                            ? cn(cat.bgColor, cat.color, 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900')
                            : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                        )}
                        title={cat.description}
                      >
                        {cat.value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Indication Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Indicacao
                  </label>
                  <select
                    value={selectedIndication}
                    onChange={(e) => setSelectedIndication(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {INDICATIONS.map(ind => (
                      <option key={ind.value} value={ind.value}>
                        {ind.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {(selectedCategory !== 'all' || selectedIndication !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedIndication('all');
                    }}
                    className="text-xs text-pink-600 dark:text-pink-400 hover:underline"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-900 dark:hover:text-white"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Medicamento
                  <SortIcon field="name" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-900 dark:hover:text-white hidden sm:table-cell"
                onClick={() => handleSort('class')}
              >
                <div className="flex items-center gap-1">
                  Classe
                  <SortIcon field="class" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-900 dark:hover:text-white"
                onClick={() => handleSort('fda')}
              >
                <div className="flex items-center justify-center gap-1">
                  FDA
                  <SortIcon field="fda" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">
                Indicacao Principal
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                Observacoes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filteredMedications.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  <Pill className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p>Nenhum medicamento encontrado</p>
                  <p className="text-sm">Tente ajustar os filtros</p>
                </td>
              </tr>
            ) : (
              filteredMedications.map((med) => (
                <React.Fragment key={med.id}>
                  <tr
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                    onClick={() => setExpandedMed(expandedMed === med.id ? null : med.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getSafetyIcon(med.gestacao)}
                        <div>
                          <Link
                            href={`/medicamentos/${med.id}`}
                            className="font-medium text-slate-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {med.nomeGenerico}
                          </Link>
                          {med.nomesComerciais && med.nomesComerciais.length > 0 && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {med.nomesComerciais.slice(0, 2).join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                        {med.classeTerapeutica.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <FDACategoryBadge category={med.gestacao} size="md" />
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {med.indicacoes[0]}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {med.precaucoes && med.precaucoes.length > 0 ? (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {med.precaucoes[0]}
                        </p>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                  </tr>
                  {/* Expanded Row */}
                  {expandedMed === med.id && (
                    <tr className="bg-slate-50 dark:bg-slate-900/50">
                      <td colSpan={5} className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Indications */}
                          <div>
                            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                              Indicacoes
                            </h4>
                            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                              {med.indicacoes.map((ind, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-pink-500 mt-1">•</span>
                                  {ind}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Precautions */}
                          {med.precaucoes && med.precaucoes.length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                Precaucoes
                              </h4>
                              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                {med.precaucoes.slice(0, 3).map((prec, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <AlertTriangle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    {prec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* FDA Info */}
                          <div>
                            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                              Classificacao FDA
                            </h4>
                            <FDACategoryBadge category={med.gestacao} size="lg" showLabel />

                            {/* Breastfeeding */}
                            <div className="mt-3">
                              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                Amamentacao
                              </h4>
                              <div className="flex items-center gap-2">
                                {med.amamentacao.compativel ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                  <X className="w-4 h-4 text-red-500" />
                                )}
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                  {med.amamentacao.observacao}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Link to full page */}
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                          <Link
                            href={`/medicamentos/${med.id}`}
                            className="inline-flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400 hover:underline"
                          >
                            <Pill className="w-4 h-4" />
                            Ver detalhes completos
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mostrando {filteredMedications.length} de {medicamentosGestacao.length} medicamentos
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Baseado no Manual de Gestacao de Alto Risco MS 2022, SBD 2024, FEBRASGO 2024
          </p>
        </div>
      </div>
    </div>
  );
}
