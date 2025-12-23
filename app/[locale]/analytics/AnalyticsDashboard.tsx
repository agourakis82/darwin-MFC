/**
 * ANALYTICS DASHBOARD PAGE
 * ========================
 *
 * Comprehensive analytics dashboard showing usage patterns
 */

'use client';

import { useState, useEffect } from 'react';
import StatsCard from '@/app/components/Analytics/StatsCard';
import ActivityChart from '@/app/components/Analytics/ActivityChart';
import TopItemsList from '@/app/components/Analytics/TopItemsList';
import EventTimeline from '@/app/components/Analytics/EventTimeline';
import ExportButton, { type ExportFormat } from '@/app/components/Export/ExportButton';
import { getAnalyticsStats, clearAnalytics, exportAnalytics, getEvents } from '@/lib/analytics';
import { exportAnalyticsToCSV, downloadCSV } from '@/lib/export/csv';
import { exportAnalyticsToPDF } from '@/lib/export/pdf';
import { downloadFile } from '@/lib/export';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<ReturnType<typeof getAnalyticsStats> | null>(null);
  const [view, setView] = useState<'overview' | 'details'>('overview');

  useEffect(() => {
    const loadStats = () => {
      const analyticsStats = getAnalyticsStats();
      setStats(analyticsStats);
    };

    loadStats();

    // Refresh stats every 10 seconds
    const interval = setInterval(loadStats, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleClearAnalytics = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados de analytics? Esta ação não pode ser desfeita.')) {
      clearAnalytics();
      setStats(getAnalyticsStats());
    }
  };

  const handleExportFormat = async (format: ExportFormat) => {
    const events = getEvents();
    const timestamp = new Date().toISOString().split('T')[0];

    if (format === 'csv') {
      const csvContent = exportAnalyticsToCSV(events);
      downloadCSV(csvContent, `darwin-mfc-analytics-${timestamp}.csv`);
    } else if (format === 'pdf') {
      const blob = await exportAnalyticsToPDF(events, {
        title: 'Relatório de Analytics - Darwin-MFC',
        author: 'Darwin-MFC',
      });
      downloadFile(blob, `darwin-mfc-analytics-${timestamp}.pdf`, 'application/pdf');
    } else if (format === 'json') {
      const data = exportAnalytics();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      downloadFile(blob, `darwin-mfc-analytics-${timestamp}.json`, 'application/json');
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);

    if (minutes === 0) {
      return `${seconds}s`;
    }

    return `${minutes}min ${seconds}s`;
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                📊 Analytics Dashboard
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Insights sobre uso da plataforma Darwin-MFC
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setView(view === 'overview' ? 'details' : 'overview')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {view === 'overview' ? 'Ver Detalhes' : 'Ver Resumo'}
              </button>
              <ExportButton
                onExport={handleExportFormat}
                formats={['csv', 'pdf', 'json']}
                label="Exportar"
                icon="📤"
                className="bg-green-600 hover:bg-green-700"
              />
              <button
                onClick={handleClearAnalytics}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                🗑️ Limpar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'overview' ? (
          <>
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total de Eventos"
                value={stats.totalEvents.toLocaleString()}
                icon="📈"
              />
              <StatsCard
                title="Sessões"
                value={stats.totalSessions.toLocaleString()}
                icon="👥"
              />
              <StatsCard
                title="Duração Média"
                value={formatDuration(stats.averageSessionDuration)}
                icon="⏱️"
                subtitle="por sessão"
              />
              <StatsCard
                title="Eventos/Sessão"
                value={stats.averageEventsPerSession.toFixed(1)}
                icon="🎯"
              />
            </div>

            {/* Period Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <StatsCard
                title="Eventos Hoje"
                value={stats.todayEvents.toLocaleString()}
                icon="📅"
              />
              <StatsCard
                title="Eventos esta Semana"
                value={stats.weekEvents.toLocaleString()}
                icon="📆"
              />
            </div>

            {/* Activity Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ActivityChart type="hour" />
              <ActivityChart type="day" />
            </div>

            {/* Top Items */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <TopItemsList type="medications" limit={5} />
              <TopItemsList type="diseases" limit={5} />
              <TopItemsList type="calculators" limit={5} />
            </div>

            {/* Recent Activity */}
            <EventTimeline limit={20} />
          </>
        ) : (
          <>
            {/* Detailed View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Events by Type */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  📊 Eventos por Tipo
                </h3>
                <div className="space-y-3">
                  {Object.entries(stats.eventsByType).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* More detailed stats can go here */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  ℹ️ Informações do Sistema
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Limite de eventos:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">1.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Armazenamento:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">LocalStorage</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Privacidade:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      100% Local
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Top Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <TopItemsList type="medications" limit={15} />
              <TopItemsList type="diseases" limit={15} />
              <TopItemsList type="calculators" limit={15} />
            </div>

            {/* Full Activity Timeline */}
            <EventTimeline limit={50} />
          </>
        )}
      </main>
    </div>
  );
}
