'use client';

import React from 'react';
import { AlertTriangle, X, Info, Zap, Ban, ChevronDown, ChevronUp } from 'lucide-react';
import {
  analyzeCurrentSOAPInteractions,
  analyzeInteractionsWithHistory,
  getInteractionSeverityStyle,
  type InteractionAlert,
} from '@/lib/utils/drug-interactions';
import type { SOAPData } from '@/app/components/Export/SOAPExport';

interface DrugInteractionAlertsProps {
  soapData: Partial<SOAPData>;
  includeHistory?: boolean;
  maxAlerts?: number;
  collapsible?: boolean;
}

export default function DrugInteractionAlerts({
  soapData,
  includeHistory = true,
  maxAlerts = 10,
  collapsible = true,
}: DrugInteractionAlertsProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [alerts, setAlerts] = React.useState<InteractionAlert[]>([]);

  React.useEffect(() => {
    const detectedAlerts = includeHistory
      ? analyzeInteractionsWithHistory(soapData)
      : analyzeCurrentSOAPInteractions(soapData);
    
    setAlerts(detectedAlerts.slice(0, maxAlerts));
  }, [soapData, includeHistory, maxAlerts]);

  if (alerts.length === 0) {
    return null;
  }

  const highPriorityAlerts = alerts.filter(a => a.prioridade === 'alta');
  const mediumPriorityAlerts = alerts.filter(a => a.prioridade === 'media');
  const lowPriorityAlerts = alerts.filter(a => a.prioridade === 'baixa');

  return (
    <div className="space-y-3">
      {/* Header */}
      <button
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
          highPriorityAlerts.length > 0
            ? 'bg-red-50 dark:bg-red-950/20 border-red-500 dark:border-red-700'
            : mediumPriorityAlerts.length > 0
            ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-500 dark:border-orange-700'
            : 'bg-amber-50 dark:bg-amber-950/20 border-amber-500 dark:border-amber-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle
            className={`w-6 h-6 ${
              highPriorityAlerts.length > 0
                ? 'text-red-600 dark:text-red-400'
                : mediumPriorityAlerts.length > 0
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-amber-600 dark:text-amber-400'
            }`}
          />
          <div className="text-left">
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
              Alertas de Interações Medicamentosas
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {alerts.length} interação{alerts.length !== 1 ? 'ões' : ''} detectada{alerts.length !== 1 ? 's' : ''}
              {highPriorityAlerts.length > 0 && (
                <span className="ml-2 font-semibold text-red-600 dark:text-red-400">
                  ({highPriorityAlerts.length} {highPriorityAlerts.length === 1 ? 'alta prioridade' : 'altas prioridades'})
                </span>
              )}
            </p>
          </div>
        </div>
        {collapsible && (
          isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {/* Lista de Alertas */}
      {isExpanded && (
        <div className="space-y-3">
          {/* Alta Prioridade */}
          {highPriorityAlerts.map(alert => (
            <InteractionAlertCard key={alert.id} alert={alert} />
          ))}

          {/* Média Prioridade */}
          {mediumPriorityAlerts.map(alert => (
            <InteractionAlertCard key={alert.id} alert={alert} />
          ))}

          {/* Baixa Prioridade */}
          {lowPriorityAlerts.map(alert => (
            <InteractionAlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}

function InteractionAlertCard({ alert }: { alert: InteractionAlert }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const style = getInteractionSeverityStyle(alert.interaction.gravidade);

  const getPriorityIcon = () => {
    switch (alert.interaction.gravidade) {
      case 'contraindicada':
        return <Ban className="w-5 h-5" />;
      case 'grave':
        return <AlertTriangle className="w-5 h-5" />;
      case 'moderada':
        return <Zap className="w-5 h-5" />;
      case 'leve':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getGravidadeLabel = (gravidade: string) => {
    switch (gravidade) {
      case 'contraindicada':
        return 'Contraindicação';
      case 'grave':
        return 'Interação Grave';
      case 'moderada':
        return 'Interação Moderada';
      case 'leve':
        return 'Interação Leve';
      default:
        return 'Interação Desconhecida';
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 ${style.borderColor} ${style.bgColor} transition-all`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start justify-between gap-3 text-left"
      >
        <div className="flex items-start gap-3 flex-1">
          <div className={`${style.color} mt-0.5`}>{getPriorityIcon()}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-bold text-sm ${style.color}`}>
                {getGravidadeLabel(alert.interaction.gravidade)}
              </span>
              {alert.prioridade === 'alta' && (
                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs font-semibold rounded">
                  ALTA PRIORIDADE
                </span>
              )}
            </div>
            <p className={`font-semibold ${style.color} mb-1`}>
              {alert.interaction.medicamento1.nome} + {alert.interaction.medicamento2.nome}
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2">
              {alert.interaction.descricao}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-neutral-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-neutral-500" />
          )}
        </div>
      </button>

      {/* Detalhes Expandidos */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-3">
          {alert.interaction.mecanismo && (
            <div>
              <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase mb-1">
                Mecanismo
              </p>
              <p className="text-sm text-neutral-800 dark:text-neutral-200">
                {alert.interaction.mecanismo}
              </p>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase mb-1">
              Conduta Recomendada
            </p>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              {alert.interaction.conduta}
            </p>
          </div>

          {alert.contexto !== 'prescricao_atual' && (
            <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                ⚠️ Esta interação envolve medicamentos do histórico de consultas anteriores.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Versão compacta inline para exibir em outras partes da UI
 */
export function DrugInteractionAlertsInline({
  soapData,
  maxAlerts = 3,
}: {
  soapData: Partial<SOAPData>;
  maxAlerts?: number;
}) {
  const alerts = React.useMemo(
    () => analyzeCurrentSOAPInteractions(soapData).slice(0, maxAlerts),
    [soapData, maxAlerts]
  );

  if (alerts.length === 0) return null;

  const highPriorityCount = alerts.filter(a => a.prioridade === 'alta').length;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {alerts.slice(0, maxAlerts).map(alert => {
        const style = getInteractionSeverityStyle(alert.interaction.gravidade);
        return (
          <div
            key={alert.id}
            className={`px-3 py-1.5 rounded-lg border ${style.borderColor} ${style.bgColor} ${style.color} text-xs font-medium flex items-center gap-1.5`}
          >
            <AlertTriangle className="w-3 h-3" />
            {alert.interaction.medicamento1.nome} + {alert.interaction.medicamento2.nome}
            {alert.interaction.gravidade === 'grave' || alert.interaction.gravidade === 'contraindicada' ? (
              <span className="ml-1">⚠️</span>
            ) : null}
          </div>
        );
      })}
      {highPriorityCount > 0 && (
        <div className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs font-semibold">
          {highPriorityCount} {highPriorityCount === 1 ? 'alerta crítico' : 'alertas críticos'}
        </div>
      )}
    </div>
  );
}

