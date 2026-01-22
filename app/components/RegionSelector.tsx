'use client';

import React, { useEffect } from 'react';
import { useAppStore } from '@/lib/store/appStore';
import type { Region } from '@/lib/types/region';
import { Globe } from 'lucide-react';

/**
 * Region configuration for display
 */
const REGIONS: Record<Region, { code: Region; name: string; flag: string; description: string }> = {
  BR: {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    description: 'SUS - Brazilian Public Health System'
  },
  IN: {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    description: 'NHM - Indian National Health Mission'
  },
  EU: {
    code: 'EU',
    name: 'EU/UK',
    flag: '🇪🇺',
    description: 'NHS/EMA - European Health Systems'
  }
};

interface RegionSelectorProps {
  className?: string;
  showLabel?: boolean;
  isCompact?: boolean;
}

/**
 * Region selector component for multi-country support
 * Allows users to select between BR (Brazil), IN (India), and EU
 * Persists selection to localStorage via Zustand
 */
export default function RegionSelector({
  className = '',
  showLabel = false,
  isCompact = true
}: RegionSelectorProps) {
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const setRegion = useAppStore((state) => state.setRegion);

  // Ensure component only renders on client
  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const regionList: Region[] = ['BR', 'IN', 'EU'];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showLabel && (
        <div className="flex items-center gap-1 mr-2 text-xs font-semibold text-darwin-carbon-600 dark:text-darwin-carbon-400">
          <Globe className="w-3.5 h-3.5" />
          <span>Region:</span>
        </div>
      )}

      <div className={`
        flex items-center gap-1
        rounded-lg border border-darwin-border
        bg-darwin-paperWhite dark:bg-darwin-carbon-800
        p-1
        transition-all
      `}>
        {regionList.map((region) => {
          const config = REGIONS[region];
          const isSelected = selectedRegion === region;

          return (
            <button
              key={region}
              onClick={() => setRegion(region)}
              className={`
                flex items-center gap-1
                px-2.5 py-1.5 rounded-md
                text-sm font-medium
                transition-all duration-200
                whitespace-nowrap
                ${isSelected
                  ? 'bg-darwin-helixNavy text-white shadow-sm'
                  : 'text-darwin-carbon-600 dark:text-darwin-carbon-300 hover:bg-darwin-carbon-100 dark:hover:bg-darwin-carbon-700'
                }
              `}
              title={config.description}
              aria-label={`Switch to ${config.name} (${config.description})`}
              aria-pressed={isSelected}
            >
              <span className="text-base leading-none">{config.flag}</span>
              {!isCompact && (
                <span className="hidden sm:inline">{config.code}</span>
              )}
              {isSelected && (
                <span className="text-xs ml-0.5">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Informational text below buttons */}
      {selectedRegion && (
        <div className="hidden lg:block text-xs text-darwin-carbon-500 dark:text-darwin-carbon-400 ml-2">
          {REGIONS[selectedRegion].description}
        </div>
      )}
    </div>
  );
}

/**
 * Simpler inline variant for Header (minimal space)
 */
export function RegionSelectorCompact() {
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const setRegion = useAppStore((state) => state.setRegion);

  // Ensure component only renders on client
  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const regionList: Region[] = ['BR', 'IN', 'EU'];

  return (
    <div className="flex items-center gap-0.5">
      {regionList.map((region) => {
        const config = REGIONS[region];
        const isSelected = selectedRegion === region;

        return (
          <button
            key={region}
            onClick={() => setRegion(region)}
            className={`
              p-1.5 rounded-md text-sm
              transition-all duration-200
              ${isSelected
                ? 'bg-darwin-helixNavy text-white'
                : 'text-darwin-carbon-600 dark:text-darwin-carbon-300 hover:bg-darwin-carbon-100 dark:hover:bg-darwin-carbon-700'
              }
            `}
            title={config.description}
            aria-label={`Switch to ${config.name}`}
            aria-pressed={isSelected}
          >
            {config.flag}
          </button>
        );
      })}
    </div>
  );
}
