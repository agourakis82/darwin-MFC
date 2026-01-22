'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store/appStore';
import type { Region } from '@/lib/types/region';
import { AlertCircle, TrendingUp, Users, Building2 } from 'lucide-react';

/**
 * Regional context configuration
 */
const REGIONS: Record<Region, {
  code: Region;
  name: string;
  flag: string;
  regulatoryBody: string;
  publicHealthSystem: string;
  description: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
}> = {
  BR: {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    regulatoryBody: 'ANVISA',
    publicHealthSystem: 'SUS',
    description: 'Brazilian public health system with universal coverage',
    backgroundColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-900 dark:text-green-100',
    accentColor: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
  },
  IN: {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    regulatoryBody: 'CDSCO',
    publicHealthSystem: 'NHM/Jan Aushadhi',
    description: 'Indian public health with generic affordability programs',
    backgroundColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-900 dark:text-orange-100',
    accentColor: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300'
  },
  EU: {
    code: 'EU',
    name: 'EU/UK',
    flag: '🇪🇺',
    regulatoryBody: 'EMA',
    publicHealthSystem: 'NHS & National Systems',
    description: 'European Union and UK health systems with regional variation',
    backgroundColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-900 dark:text-blue-100',
    accentColor: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
  }
};

interface RegionalContextBannerProps {
  /** Show detailed information (default: true) */
  expanded?: boolean;
  /** Show icon indicators (default: true) */
  showIcons?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Regional context banner component
 * Displays which region is currently selected and relevant healthcare system info
 * Used on screening, disease, and medication pages to provide geographic context
 */
export default function RegionalContextBanner({
  expanded = true,
  showIcons = true,
  className = ''
}: RegionalContextBannerProps) {
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const config = REGIONS[selectedRegion];

  if (!expanded) {
    // Compact version - just show flag and region name
    return (
      <div className={`
        inline-flex items-center gap-2 px-3 py-1.5
        rounded-full text-sm font-medium
        ${config.accentColor}
        ${className}
      `}>
        <span className="text-lg">{config.flag}</span>
        <span>{config.name}</span>
      </div>
    );
  }

  // Expanded version - full banner
  return (
    <div className={`
      w-full rounded-lg border-2
      ${config.backgroundColor}
      ${config.borderColor}
      ${className}
    `}>
      <div className="px-4 py-3 sm:px-6">
        {/* Header with flag and region name */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{config.flag}</span>
            <div>
              <h3 className={`text-lg font-bold ${config.textColor}`}>
                {config.name}
              </h3>
              <p className={`text-xs ${config.textColor} opacity-75 mt-0.5`}>
                {config.description}
              </p>
            </div>
          </div>
          <AlertCircle className={`w-5 h-5 ${config.textColor} flex-shrink-0`} />
        </div>

        {/* Information grid */}
        {showIcons && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {/* Regulatory Body */}
            <div className={`flex items-start gap-2 p-2 rounded ${config.accentColor}`}>
              <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-semibold">Regulatory Authority</div>
                <div className="opacity-75">{config.regulatoryBody}</div>
              </div>
            </div>

            {/* Public Health System */}
            <div className={`flex items-start gap-2 p-2 rounded ${config.accentColor}`}>
              <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-semibold">Public Health System</div>
                <div className="opacity-75">{config.publicHealthSystem}</div>
              </div>
            </div>
          </div>
        )}

        {/* Context note */}
        <div className={`mt-3 p-2 rounded text-xs flex items-start gap-2 ${config.accentColor}`}>
          <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Note:</strong> Guidelines and availability shown are specific to {config.name}.
            Switch regions in the header to view {selectedRegion === 'BR' ? 'India or European' : selectedRegion === 'IN' ? 'Brazilian or European' : 'Brazilian or Indian'} data.
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal banner version for sidebars or inline use
 */
export function RegionalContextBannerMinimal() {
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const config = REGIONS[selectedRegion];

  return (
    <div className={`
      flex items-center gap-2 px-3 py-2
      rounded-lg border
      ${config.backgroundColor}
      ${config.borderColor}
    `}>
      <span className="text-xl">{config.flag}</span>
      <div className="text-sm">
        <div className="font-semibold text-darwin-carbon-900 dark:text-white">
          {config.name}
        </div>
        <div className="text-xs text-darwin-carbon-600 dark:text-darwin-carbon-300">
          {config.regulatoryBody}
        </div>
      </div>
    </div>
  );
}

/**
 * Quick status component for header area
 */
export function RegionalContextStatus() {
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const config = REGIONS[selectedRegion];

  return (
    <div className="text-xs flex items-center gap-1">
      <span>{config.flag}</span>
      <span className="font-medium">{config.name}</span>
    </div>
  );
}
