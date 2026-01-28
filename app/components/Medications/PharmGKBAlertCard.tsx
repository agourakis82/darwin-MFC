'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp, FileText, Dna } from 'lucide-react';
import type { PharmGKBAlert } from '@/lib/types/pharmgkb';

// =============================================================================
// SEVERITY CONFIGURATION
// =============================================================================

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    color: 'border-red-500 dark:border-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
    text: 'text-red-900 dark:text-red-200',
    iconColor: 'text-red-600 dark:text-red-400',
    label: 'Crítico'
  },
  warning: {
    icon: AlertCircle,
    color: 'border-yellow-500 dark:border-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    text: 'text-yellow-900 dark:text-yellow-200',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    label: 'Atenção'
  },
  info: {
    icon: Info,
    color: 'border-blue-500 dark:border-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-900 dark:text-blue-200',
    iconColor: 'text-blue-600 dark:text-blue-400',
    label: 'Informação'
  },
};

// =============================================================================
// PHARMGKB ALERT CARD COMPONENT
// =============================================================================

interface PharmGKBAlertCardProps {
  alert: PharmGKBAlert;
}

export function PharmGKBAlertCard({ alert }: PharmGKBAlertCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        w-full rounded-lg border-l-4 bg-white dark:bg-zinc-900
        shadow-sm overflow-hidden transition-all
        ${config.color}
      `}
      role="alert"
      aria-labelledby={`alert-title-${alert.id}`}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`mt-1 p-1.5 rounded-full ${config.bg}`}>
              <Icon className={`w-5 h-5 ${config.iconColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                  {config.label}
                </span>
                <h3
                  id={`alert-title-${alert.id}`}
                  className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5"
                >
                  <Dna className="w-4 h-4 text-purple-500" />
                  {alert.gene}
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">Medicamento: </span>
                {alert.medication}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Ocultar detalhes' : 'Ver detalhes'}
            aria-expanded={isExpanded}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <div className="mt-3 pl-10">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {alert.title}
          </p>
        </div>
      </div>

      {/* Collapsible Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
          >
            <div className="p-4 space-y-4 text-sm">
              {/* Message */}
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4" />
                  Descrição
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 pl-6">
                  {alert.message}
                </p>
              </div>

              {/* Recommendation */}
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Recomendação
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {alert.recommendation}
                </p>
              </div>

              {/* Action Required Badge */}
              {alert.actionRequired && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded text-xs font-semibold uppercase">
                    Ação Necessária
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PharmGKBAlertCard;
