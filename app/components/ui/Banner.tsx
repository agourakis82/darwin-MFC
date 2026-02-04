import React, { useState, useEffect } from 'react';
import { X, Info, AlertTriangle } from 'lucide-react';

export type BannerVariant = 'info' | 'warning';

export interface BannerProps {
  variant?: BannerVariant;
  title: string;
  description?: string;
  dismissible?: boolean;
  sticky?: boolean;
  storageKey?: string;
  onDismiss?: () => void;
}

const variantConfig = {
  info: {
    bg: 'bg-blue-900/50',
    border: 'border-blue-700/50',
    icon: Info,
    iconColor: 'text-blue-400',
  },
  warning: {
    bg: 'bg-yellow-900/50',
    border: 'border-yellow-700/50',
    icon: AlertTriangle,
    iconColor: 'text-yellow-400',
  },
};

export function Banner({
  variant = 'info',
  title,
  description,
  dismissible = true,
  sticky = true,
  storageKey,
  onDismiss,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Check if banner was previously dismissed
  useEffect(() => {
    if (storageKey && dismissible) {
      const isDismissed = localStorage.getItem(`banner-dismissed-${storageKey}`);
      if (isDismissed) {
        setIsVisible(false);
      }
    }
  }, [storageKey, dismissible]);

  const config = variantConfig[variant];
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    if (storageKey && dismissible) {
      localStorage.setItem(`banner-dismissed-${storageKey}`, 'true');
    }
    onDismiss?.();
  };

  if (!isVisible) return null;

  const bannerClass = sticky
    ? 'fixed top-0 left-0 right-0 z-40'
    : 'relative';

  return (
    <div
      className={`${bannerClass} ${config.bg} border-b ${config.border}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
          <Icon size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-neutral-100">{title}</h2>
          {description && (
            <p className="text-sm text-neutral-300 mt-1">{description}</p>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity`}
            aria-label="Dismiss banner"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
