/**
 * EVENT TIMELINE COMPONENT
 * ========================
 *
 * Displays recent user events in chronological order
 */

'use client';

import { useMemo } from 'react';
import { getEvents, type EventType } from '@/lib/analytics';

interface EventTimelineProps {
  limit?: number;
}

const EVENT_LABELS: Record<EventType, string> = {
  page_view: 'Visualizou página',
  search: 'Buscou',
  medication_view: 'Visualizou medicamento',
  disease_view: 'Visualizou doença',
  calculator_use: 'Usou calculadora',
  protocol_view: 'Visualizou protocolo',
  case_view: 'Visualizou caso clínico',
  export: 'Exportou dados',
  favorite_add: 'Favoritou',
  favorite_remove: 'Removeu favorito',
  note_create: 'Criou nota',
  note_update: 'Atualizou nota',
};

const EVENT_ICONS: Record<EventType, string> = {
  page_view: '👁️',
  search: '🔍',
  medication_view: '💊',
  disease_view: '🦠',
  calculator_use: '🧮',
  protocol_view: '📋',
  case_view: '📁',
  export: '📤',
  favorite_add: '⭐',
  favorite_remove: '✖️',
  note_create: '📝',
  note_update: '✏️',
};

export default function EventTimeline({ limit = 20 }: EventTimelineProps) {
  const events = useMemo(() => {
    return getEvents()
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }, [limit]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;

    // Less than 1 minute
    if (diff < 60 * 1000) {
      return 'Agora';
    }

    // Less than 1 hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes}min atrás`;
    }

    // Less than 24 hours
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours}h atrás`;
    }

    // More than 24 hours
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        🕐 Atividades Recentes
      </h3>

      {events.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Nenhuma atividade registrada
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              {/* Icon */}
              <div className="text-2xl flex-shrink-0">
                {EVENT_ICONS[event.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {EVENT_LABELS[event.type]}
                </div>
                {event.data && Object.keys(event.data).length > 0 && (
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 truncate">
                    {event.data.medicationName ||
                      event.data.diseaseName ||
                      event.data.calculatorName ||
                      event.data.query ||
                      event.data.page ||
                      'Detalhe não disponível'}
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <div className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                {formatTime(event.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
