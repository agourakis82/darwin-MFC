'use client';

import React from 'react';
import { Info, Dna, ShieldCheck } from 'lucide-react';
import { PharmGKBAlertCard } from './PharmGKBAlertCard';
import {
  type PharmGKBAlert,
  type PatientGenotype,
  getAlertsForPatientMedications,
} from '@/lib/types/pharmgkb';

// =============================================================================
// PHARMGKB PANEL COMPONENT
// =============================================================================

interface PharmGKBPanelProps {
  genotypes: PatientGenotype[];
  medications: string[];
}

export function PharmGKBPanel({ genotypes, medications }: PharmGKBPanelProps) {
  const alerts = getAlertsForPatientMedications(genotypes, medications);

  // Group alerts by severity
  const criticalAlerts = alerts.filter(a => a.severity === 'critical');
  const warningAlerts = alerts.filter(a => a.severity === 'warning');
  const infoAlerts = alerts.filter(a => a.severity === 'info');

  if (alerts.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Sem alertas farmacogenéticos
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
          Nenhuma interação gene-medicamento significativa encontrada com base nos genótipos e medicamentos informados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <Dna className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Alertas Farmacogenéticos
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {alerts.length} {alerts.length === 1 ? 'alerta encontrado' : 'alertas encontrados'}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="flex gap-4 text-sm">
        {criticalAlerts.length > 0 && (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full font-medium">
            {criticalAlerts.length} crítico{criticalAlerts.length > 1 ? 's' : ''}
          </span>
        )}
        {warningAlerts.length > 0 && (
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full font-medium">
            {warningAlerts.length} atenção
          </span>
        )}
        {infoAlerts.length > 0 && (
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full font-medium">
            {infoAlerts.length} informativo{infoAlerts.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase text-red-600 dark:text-red-400 tracking-wide">
            Alertas Críticos
          </h3>
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <PharmGKBAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* Warning Alerts */}
      {warningAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase text-yellow-600 dark:text-yellow-400 tracking-wide">
            Alertas de Atenção
          </h3>
          <div className="space-y-3">
            {warningAlerts.map((alert) => (
              <PharmGKBAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* Info Alerts */}
      {infoAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase text-blue-600 dark:text-blue-400 tracking-wide">
            Alertas Informativos
          </h3>
          <div className="space-y-3">
            {infoAlerts.map((alert) => (
              <PharmGKBAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs text-zinc-600 dark:text-zinc-400">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          Estas recomendações são baseadas em guidelines CPIC/DPWG e devem ser
          interpretadas no contexto clínico do paciente. Consulte um especialista
          em farmacogenética para casos complexos.
        </p>
      </div>
    </div>
  );
}

export default PharmGKBPanel;
