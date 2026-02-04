import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Download, Filter } from 'lucide-react';
import type { LabResult, LOINCCode } from '@/lib/types/loinc';

export interface LabResultsTableProps {
  results: LabResult[];
  loincCodes: Map<string, LOINCCode>;
  onExport?: (format: 'csv' | 'pdf') => void;
  onViewDetails?: (result: LabResult) => void;
}

type SortField = 'date' | 'test' | 'value' | 'status';
type SortDirection = 'asc' | 'desc';

export function LabResultsTable({
  results,
  loincCodes,
  onExport,
  onViewDetails,
}: LabResultsTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedResults = useMemo(() => {
    let filtered = results;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r =>
        r.interpretation?.status === statusFilter
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'date':
          comparison = a.date.getTime() - b.date.getTime();
          break;
        case 'test': {
          const aName = loincCodes.get(a.loincCode)?.namePt || a.loincCode;
          const bName = loincCodes.get(b.loincCode)?.namePt || b.loincCode;
          comparison = aName.localeCompare(bName);
          break;
        }
        case 'value':
          comparison = a.value - b.value;
          break;
        case 'status': {
          const aStatus = a.interpretation?.status || 'normal';
          const bStatus = b.interpretation?.status || 'normal';
          comparison = aStatus.localeCompare(bStatus);
          break;
        }
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [results, sortField, sortDirection, statusFilter, loincCodes]);

  const statusCounts = useMemo(() => {
    const counts = {
      critical: 0,
      abnormal: 0,
      normal: 0,
    };

    results.forEach(r => {
      if (!r.interpretation) return;
      if (r.interpretation.status === 'critical_low' || r.interpretation.status === 'critical_high') {
        counts.critical++;
      } else if (r.interpretation.status === 'low' || r.interpretation.status === 'high') {
        counts.abnormal++;
      } else {
        counts.normal++;
      }
    });

    return counts;
  }, [results]);

  const StatusIcon = ({ status }: { status?: string }) => {
    if (!status) return <Minus size={14} className="text-neutral-500" />;

    if (status === 'high' || status === 'critical_high') {
      return <TrendingUp size={14} className={status === 'critical_high' ? 'text-red-400' : 'text-orange-400'} />;
    }
    if (status === 'low' || status === 'critical_low') {
      return <TrendingDown size={14} className={status === 'critical_low' ? 'text-red-400' : 'text-yellow-400'} />;
    }
    return <Minus size={14} className="text-green-400" />;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-200">Resultados Laboratoriais</h2>
          <p className="text-sm text-neutral-400 mt-1">
            {results.length} exames
            {statusCounts.critical > 0 && (
              <span className="ml-2 text-red-400">• {statusCounts.critical} críticos</span>
            )}
            {statusCounts.abnormal > 0 && (
              <span className="ml-2 text-orange-400">• {statusCounts.abnormal} anormais</span>
            )}
          </p>
        </div>

        {onExport && (
          <div className="flex gap-2">
            <button
              onClick={() => onExport('csv')}
              className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 rounded text-sm text-neutral-200 transition-colors flex items-center gap-2"
            >
              <Download size={14} />
              CSV
            </button>
            <button
              onClick={() => onExport('pdf')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white transition-colors flex items-center gap-2"
            >
              <Download size={14} />
              PDF
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter size={16} className="text-neutral-400" />
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Todos' },
            { value: 'critical_low', label: 'Crítico baixo' },
            { value: 'critical_high', label: 'Crítico alto' },
            { value: 'low', label: 'Baixo' },
            { value: 'high', label: 'Alto' },
            { value: 'normal', label: 'Normal' },
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                statusFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-neutral-700 rounded-lg overflow-hidden">
          <thead className="bg-neutral-800">
            <tr>
              <th
                onClick={() => handleSort('date')}
                className="px-4 py-3 text-left text-xs font-medium text-neutral-400 cursor-pointer hover:bg-neutral-700 transition-colors"
              >
                Data {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('test')}
                className="px-4 py-3 text-left text-xs font-medium text-neutral-400 cursor-pointer hover:bg-neutral-700 transition-colors"
              >
                Exame {sortField === 'test' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('value')}
                className="px-4 py-3 text-right text-xs font-medium text-neutral-400 cursor-pointer hover:bg-neutral-700 transition-colors"
              >
                Valor {sortField === 'value' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400">
                Referência
              </th>
              <th
                onClick={() => handleSort('status')}
                className="px-4 py-3 text-center text-xs font-medium text-neutral-400 cursor-pointer hover:bg-neutral-700 transition-colors"
              >
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-neutral-400">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {filteredAndSortedResults.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-neutral-500">
                  Nenhum resultado encontrado
                </td>
              </tr>
            ) : (
              filteredAndSortedResults.map((result) => {
                const loincCode = loincCodes.get(result.loincCode);
                const interpretation = result.interpretation;

                return (
                  <tr
                    key={result.id}
                    className={`hover:bg-neutral-800/50 transition-colors ${
                      interpretation?.status === 'critical_low' || interpretation?.status === 'critical_high'
                        ? 'bg-red-500/5'
                        : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-sm text-neutral-300">
                      {result.date.toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-neutral-200">
                          {loincCode?.namePt || loincCode?.shortName || result.loincCode}
                        </p>
                        <p className="text-xs text-neutral-500">LOINC: {result.loincCode}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-sm font-semibold text-neutral-200">
                        {result.value} {result.unit}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-400">
                      {interpretation ? (
                        <span>
                          {interpretation.appliedRange.low} - {interpretation.appliedRange.high}{' '}
                          {interpretation.appliedRange.unit}
                        </span>
                      ) : (
                        <span className="text-neutral-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <StatusIcon status={interpretation?.status} />
                        {interpretation && (
                          <span
                            className={`text-xs font-medium ${
                              interpretation.color === 'red'
                                ? 'text-red-400'
                                : interpretation.color === 'orange'
                                  ? 'text-orange-400'
                                  : interpretation.color === 'yellow'
                                    ? 'text-yellow-400'
                                    : 'text-green-400'
                            }`}
                          >
                            {interpretation.statusLabel}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {onViewDetails && (
                        <button
                          onClick={() => onViewDetails(result)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Ver
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
