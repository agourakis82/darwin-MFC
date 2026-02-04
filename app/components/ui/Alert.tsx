import React, { useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title: string;
  description?: string;
  onDismiss?: () => void;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

const variantConfig = {
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: Info,
    textColor: 'text-blue-400',
    accentColor: 'text-blue-300',
  },
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    icon: CheckCircle,
    textColor: 'text-green-400',
    accentColor: 'text-green-300',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    icon: AlertTriangle,
    textColor: 'text-yellow-400',
    accentColor: 'text-yellow-300',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: AlertCircle,
    textColor: 'text-red-400',
    accentColor: 'text-red-300',
  },
};

export function Alert({
  variant = 'info',
  title,
  description,
  onDismiss,
  dismissible = true,
  action,
  icon: customIcon,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const config = variantConfig[variant];
  const Icon = customIcon ? null : config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-lg p-4 flex gap-4 items-start`}
      role="alert"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${config.textColor} mt-0.5`}>
        {customIcon || (Icon && <Icon size={20} />)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold ${config.textColor}`}>{title}</h3>
        {description && (
          <p className="text-sm text-neutral-400 mt-1">{description}</p>
        )}

        {/* Action button */}
        {action && (
          <button
            onClick={action.onClick}
            className={`mt-3 text-sm font-medium ${config.accentColor} hover:underline`}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className={`flex-shrink-0 ${config.textColor} hover:opacity-70 transition-opacity`}
          aria-label="Dismiss alert"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
