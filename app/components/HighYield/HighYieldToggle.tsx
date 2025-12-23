'use client';

import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store/appStore';
import { useTranslations } from 'next-intl';
import { Zap, BookOpen, Printer } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import type { ViewMode } from '@/lib/types';

interface HighYieldToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'button' | 'segmented';
}

const viewModeConfig: Record<
  ViewMode,
  {
    icon: React.ElementType;
    labelKey: string;
    descriptionKey: string;
    activeColor: string;
    activeBg: string;
  }
> = {
  full: {
    icon: BookOpen,
    labelKey: 'highYield.full',
    descriptionKey: 'highYield.fullDescription',
    activeColor: 'text-blue-600 dark:text-blue-400',
    activeBg: 'bg-blue-50 dark:bg-blue-950/50',
  },
  high_yield: {
    icon: Zap,
    labelKey: 'highYield.highYield',
    descriptionKey: 'highYield.highYieldDescription',
    activeColor: 'text-amber-600 dark:text-amber-400',
    activeBg: 'bg-amber-50 dark:bg-amber-950/50',
  },
  print_friendly: {
    icon: Printer,
    labelKey: 'highYield.printFriendly',
    descriptionKey: 'highYield.printFriendlyDescription',
    activeColor: 'text-neutral-600 dark:text-neutral-400',
    activeBg: 'bg-neutral-100 dark:bg-neutral-800',
  },
};

/**
 * Toggle button for High-Yield mode (AMBOSS-style)
 * Allows switching between full content and high-yield summary view
 */
export function HighYieldToggle({
  className,
  showLabel = true,
  variant = 'button',
}: HighYieldToggleProps) {
  const viewMode = useAppStore((state) => state.viewMode);
  const toggleHighYieldMode = useAppStore((state) => state.toggleHighYieldMode);
  const setViewMode = useAppStore((state) => state.setViewMode);

  let t: (key: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string) => {
      try {
        return translations(key);
      } catch {
        // Fallback to English defaults
        const fallbacks: Record<string, string> = {
          'highYield.full': 'Full',
          'highYield.highYield': 'High-Yield',
          'highYield.printFriendly': 'Print',
          'highYield.fullDescription': 'Show all content',
          'highYield.highYieldDescription': 'Show only key points, red flags, and critical values',
          'highYield.printFriendlyDescription': 'Optimized for printing',
          'highYield.toggle': 'Toggle High-Yield Mode',
        };
        return fallbacks[key] || key;
      }
    };
  } catch {
    t = (key: string) => {
      const fallbacks: Record<string, string> = {
        'highYield.full': 'Full',
        'highYield.highYield': 'High-Yield',
        'highYield.printFriendly': 'Print',
        'highYield.fullDescription': 'Show all content',
        'highYield.highYieldDescription': 'Show only key points, red flags, and critical values',
        'highYield.printFriendlyDescription': 'Optimized for printing',
        'highYield.toggle': 'Toggle High-Yield Mode',
      };
      return fallbacks[key] || key;
    };
  }

  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 p-1 rounded-lg glass-strong',
          className
        )}
        role="radiogroup"
        aria-label={t('highYield.toggle')}
      >
        {(['full', 'high_yield'] as ViewMode[]).map((mode) => {
          const config = viewModeConfig[mode];
          const Icon = config.icon;
          const isActive = viewMode === mode;

          return (
            <Tooltip.Provider key={mode} delayDuration={200}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => setViewMode(mode)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
                      isActive
                        ? cn(config.activeColor, config.activeBg, 'shadow-sm')
                        : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                    )}
                    role="radio"
                    aria-checked={isActive}
                  >
                    <Icon className="w-4 h-4" />
                    {showLabel && <span>{t(config.labelKey)}</span>}
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="z-50 px-3 py-2 text-sm glass-strong rounded-lg shadow-lg animate-fade-in max-w-xs"
                    sideOffset={5}
                  >
                    <div className="font-medium">{t(config.labelKey)}</div>
                    <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">
                      {t(config.descriptionKey)}
                    </div>
                    <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          );
        })}
      </div>
    );
  }

  // Simple toggle button variant
  const isHighYield = viewMode === 'high_yield';
  const config = viewModeConfig[isHighYield ? 'high_yield' : 'full'];
  const Icon = config.icon;

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={toggleHighYieldMode}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
              isHighYield
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 shadow-sm'
                : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700',
              className
            )}
            aria-pressed={isHighYield}
            aria-label={t('highYield.toggle')}
          >
            <Icon className="w-4 h-4" />
            {showLabel && (
              <span>{t(isHighYield ? 'highYield.highYield' : 'highYield.full')}</span>
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 px-3 py-2 text-sm glass-strong rounded-lg shadow-lg animate-fade-in max-w-xs"
            sideOffset={5}
          >
            <div className="font-medium">
              {t(isHighYield ? 'highYield.highYield' : 'highYield.full')}
            </div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">
              {t(isHighYield ? 'highYield.highYieldDescription' : 'highYield.fullDescription')}
            </div>
            <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">
              Click to switch to {isHighYield ? 'full view' : 'high-yield mode'}
            </div>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default HighYieldToggle;
