'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import {
  CheckCircle2,
  CircleDot,
  Circle,
  HelpCircle,
  Info,
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

/**
 * Evidence strength levels based on GRADE methodology
 * Similar to DynaMed's evidence labeling system
 */
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'GPP';

export interface EvidenceStrengthBadgeProps {
  level: EvidenceLevel;
  showLabel?: boolean;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const evidenceConfig: Record<
  EvidenceLevel,
  {
    label: string;
    labelKey: string;
    description: string;
    descriptionKey: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ElementType;
  }
> = {
  A: {
    label: 'Strong',
    labelKey: 'evidence.levels.A.label',
    description: 'High-quality randomized controlled trials or meta-analyses',
    descriptionKey: 'evidence.levels.A.description',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
  },
  B: {
    label: 'Moderate',
    labelKey: 'evidence.levels.B.label',
    description: 'Lower-quality RCTs or well-designed observational studies',
    descriptionKey: 'evidence.levels.B.description',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    borderColor: 'border-amber-200 dark:border-amber-800',
    icon: CircleDot,
  },
  C: {
    label: 'Weak',
    labelKey: 'evidence.levels.C.label',
    description: 'Observational studies, case series, or expert consensus',
    descriptionKey: 'evidence.levels.C.description',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/50',
    borderColor: 'border-orange-200 dark:border-orange-800',
    icon: Circle,
  },
  D: {
    label: 'Expert',
    labelKey: 'evidence.levels.D.label',
    description: 'Expert opinion or clinical experience without strong evidence',
    descriptionKey: 'evidence.levels.D.description',
    color: 'text-neutral-600 dark:text-neutral-400',
    bgColor: 'bg-neutral-100 dark:bg-neutral-800/50',
    borderColor: 'border-neutral-200 dark:border-neutral-700',
    icon: HelpCircle,
  },
  GPP: {
    label: 'Good Practice',
    labelKey: 'evidence.levels.GPP.label',
    description: 'Good practice point based on clinical experience of the guideline group',
    descriptionKey: 'evidence.levels.GPP.description',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    borderColor: 'border-blue-200 dark:border-blue-800',
    icon: Info,
  },
};

const sizeClasses = {
  sm: {
    badge: 'px-1.5 py-0.5 text-xs gap-1',
    icon: 'w-3 h-3',
    level: 'text-[10px] font-bold',
  },
  md: {
    badge: 'px-2 py-1 text-sm gap-1.5',
    icon: 'w-4 h-4',
    level: 'text-xs font-bold',
  },
  lg: {
    badge: 'px-3 py-1.5 text-base gap-2',
    icon: 'w-5 h-5',
    level: 'text-sm font-bold',
  },
};

export function EvidenceStrengthBadge({
  level,
  showLabel = true,
  showTooltip = true,
  size = 'md',
  className,
}: EvidenceStrengthBadgeProps) {
  const config = evidenceConfig[level];
  const sizes = sizeClasses[size];
  const Icon = config.icon;

  let t: (key: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string) => {
      try {
        return translations(key);
      } catch {
        // Fallback to config defaults
        if (key === config.labelKey) return config.label;
        if (key === config.descriptionKey) return config.description;
        return key;
      }
    };
  } catch {
    t = (key: string) => {
      if (key === config.labelKey) return config.label;
      if (key === config.descriptionKey) return config.description;
      return key;
    };
  }

  const badge = (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        config.bgColor,
        config.borderColor,
        config.color,
        sizes.badge,
        className
      )}
    >
      <Icon className={sizes.icon} aria-hidden="true" />
      <span className={sizes.level}>{level}</span>
      {showLabel && (
        <span className="font-medium">{t(config.labelKey)}</span>
      )}
    </span>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{badge}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs px-3 py-2 text-sm glass-strong rounded-lg shadow-lg animate-fade-in"
            sideOffset={5}
          >
            <div className="space-y-1">
              <div className={cn('font-semibold', config.color)}>
                Level {level}: {t(config.labelKey)}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                {t(config.descriptionKey)}
              </div>
            </div>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/**
 * Compact evidence indicator for inline use
 */
export function EvidenceIndicator({
  level,
  className,
}: {
  level: EvidenceLevel;
  className?: string;
}) {
  const config = evidenceConfig[level];

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span
            className={cn(
              'inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold cursor-help',
              config.bgColor,
              config.color,
              className
            )}
          >
            {level}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 px-2 py-1 text-xs glass-strong rounded-md shadow-lg animate-fade-in"
            sideOffset={5}
          >
            <span className={config.color}>
              {config.label}: {config.description}
            </span>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/**
 * Evidence legend component for displaying all levels
 */
export function EvidenceLegend({ className }: { className?: string }) {
  let t: (key: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string) => {
      try {
        return translations(key);
      } catch {
        return key;
      }
    };
  } catch {
    t = () => 'Evidence Strength Legend';
  }

  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        {t('evidence.legend.title')}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {(Object.keys(evidenceConfig) as EvidenceLevel[]).map((level) => (
          <EvidenceStrengthBadge
            key={level}
            level={level}
            showLabel
            showTooltip={false}
            size="sm"
          />
        ))}
      </div>
    </div>
  );
}

export default EvidenceStrengthBadge;
