/**
 * CLINICAL ALERTS & WARNINGS SYSTEM
 * ===================================
 *
 * Real-time clinical alerts for safety, drug interactions, and best practices
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import { AlertTriangle, AlertCircle, Info, X, Bell } from 'lucide-react';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface ClinicalAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  action?: string;
  dismissible?: boolean;
}

const alertStyles = {
  critical: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-500',
    icon: AlertTriangle,
    color: 'text-red-600 dark:text-red-400',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-500',
    icon: AlertCircle,
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-500',
    icon: Info,
    color: 'text-blue-600 dark:text-blue-400',
  },
};

export const AlertBanner: React.FC<{
  alert: ClinicalAlert;
  onDismiss?: (id: string) => void;
}> = ({ alert, onDismiss }) => {
  const styles = alertStyles[alert.severity];
  const Icon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn('p-4 rounded-lg border-2', styles.bg, styles.border)}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', styles.color)} />
        <div className="flex-1">
          <p className="font-semibold text-sm">{alert.title}</p>
          <p className="text-sm mt-1">{alert.message}</p>
          {alert.action && (
            <p className="text-xs font-medium mt-2">{alert.action}</p>
          )}
        </div>
        {alert.dismissible && onDismiss && (
          <button
            onClick={() => onDismiss(alert.id)}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const AlertsContainer: React.FC<{
  alerts: ClinicalAlert[];
  onDismiss?: (id: string) => void;
}> = ({ alerts, onDismiss }) => {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {alerts.map((alert) => (
          <AlertBanner key={alert.id} alert={alert} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};
