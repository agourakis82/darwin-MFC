import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, AlertCircle } from 'lucide-react';
import type { LabResult, LOINCCode } from '@/lib/types/loinc';

export interface LabResultCardProps {
  result: LabResult;
  loincCode?: LOINCCode;
  onViewDetails?: () => void;
  onViewTrend?: () => void;
  compact?: boolean;
}

export function LabResultCard({
  result,
  loincCode,
  onViewDetails,
  onViewTrend,
  compact = false,
}: LabResultCardProps) {
  const interpretation = result.interpretation;

  // Status color mapping
  const statusColors = {
    critical_low: 'border-red-500 bg-red-500/10',
    critical_high: 'border-red-500 bg-red-500/10',
    low: 'border-yellow-500 bg-yellow-500/10',
    high: 'border-orange-500 bg-orange-500/10',
    normal: 'border-green-500 bg-green-500/10',
  };

  const statusIconColors = {
    critical_low: 'text-red-400',
    critical_high: 'text-red-400',
    low: 'text-yellow-400',
    high: 'text-orange-400',
    normal: 'text-green-400',
  };

  const statusBg = interpretation ? statusColors[interpretation.status] : 'border-neutral-700 bg-neutral-800';
  const statusIconColor = interpretation ? statusIconColors[interpretation.status] : 'text-neutral-400';

  // Trend icon
  const TrendIcon = interpretation
    ? interpretation.status === 'high' || interpretation.status === 'critical_high'
      ? TrendingUp
      : interpretation.status === 'low' || interpretation.status === 'critical_low'
        ? TrendingDown
        : Minus
    : Minus;

  if (compact) {
    return (
      <div className={`border rounded-lg p-3 ${statusBg}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs text-neutral-400">
              {loincCode?.namePt || loincCode?.shortName || result.loincCode}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-semibold text-neutral-200">
                {result.value}
              </span>
              <span className="text-sm text-neutral-400">{result.unit}</span>
            </div>
          </div>

          {interpretation && (
            <div className={`flex items-center gap-1 ${statusIconColor}`}>
              <TrendIcon size={16} />
              <span className="text-xs font-medium">{interpretation.statusLabel}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-4 ${statusBg} transition-all hover:shadow-md`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-neutral-200">
            {loincCode?.namePt || loincCode?.shortName || result.loincCode}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            LOINC: {result.loincCode}
            {loincCode?.class && ` • ${loincCode.class}`}
          </p>
        </div>

        {interpretation && (interpretation.status === 'critical_low' || interpretation.status === 'critical_high') && (
          <AlertCircle className="text-red-400" size={20} />
        )}
      </div>

      {/* Value and status */}
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-100">
              {result.value}
            </span>
            <span className="text-lg text-neutral-400">{result.unit}</span>
          </div>

          {interpretation && (
            <div className={`flex items-center gap-2 mt-2 ${statusIconColor}`}>
              <TrendIcon size={18} />
              <span className="text-sm font-medium">{interpretation.statusLabel}</span>
            </div>
          )}
        </div>

        {/* Reference range gauge */}
        {interpretation && (
          <div className="text-right">
            <p className="text-xs text-neutral-500 mb-1">Faixa de referência</p>
            <p className="text-sm text-neutral-300">
              {interpretation.appliedRange.low} - {interpretation.appliedRange.high} {interpretation.appliedRange.unit}
            </p>
            {interpretation.appliedRange.sex && interpretation.appliedRange.sex !== 'both' && (
              <p className="text-xs text-neutral-500 mt-0.5">
                ({interpretation.appliedRange.sex === 'M' ? 'Masculino' : 'Feminino'})
              </p>
            )}
          </div>
        )}
      </div>

      {/* Visual gauge */}
      {interpretation && (
        <div className="mb-3">
          <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                interpretation.color === 'red' ? 'bg-red-500' :
                interpretation.color === 'orange' ? 'bg-orange-500' :
                interpretation.color === 'yellow' ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{
                width: `${Math.min(
                  100,
                  Math.max(
                    0,
                    ((result.value - interpretation.appliedRange.low) /
                      (interpretation.appliedRange.high - interpretation.appliedRange.low)) *
                      100
                  )
                )}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Clinical interpretation */}
      {interpretation?.interpretation && (
        <div className="bg-neutral-700/50 rounded p-3 mb-3">
          <p className="text-sm text-neutral-300">{interpretation.interpretation}</p>
        </div>
      )}

      {/* Recommendations */}
      {interpretation?.recommendations && interpretation.recommendations.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 mb-3">
          <div className="flex gap-2">
            <AlertTriangle className="text-yellow-400 flex-shrink-0" size={16} />
            <div className="flex-1">
              <p className="text-xs font-semibold text-yellow-300 mb-1">Recomendações</p>
              <ul className="text-xs text-neutral-300 space-y-1">
                {interpretation.recommendations.map((rec, idx) => (
                  <li key={idx}>• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Date and notes */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>{result.date.toLocaleDateString('pt-BR')}</span>
        <div className="flex gap-3">
          {onViewTrend && (
            <button
              onClick={onViewTrend}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Ver tendência
            </button>
          )}
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Ver detalhes
            </button>
          )}
        </div>
      </div>

      {result.notes && (
        <div className="mt-3 pt-3 border-t border-neutral-700">
          <p className="text-xs text-neutral-400">
            <span className="font-medium">Observações:</span> {result.notes}
          </p>
        </div>
      )}
    </div>
  );
}
