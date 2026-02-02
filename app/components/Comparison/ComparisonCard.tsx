'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store/appStore';
import type { Region } from '@/lib/types/region';
import { Recommendations } from '@/lib/types/rastreamentos';
import InlineCitation from '../Bibliography/InlineCitation';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, Building2, Hospital, Globe, Flag, Users, Menu } from 'lucide-react';
import { semanticColors, convergenceConfig as tokenConvergenceConfig } from '@/lib/design-system/tokens';

interface ComparisonCardProps {
  title: string;
  recommendations: Recommendations;
}

// Type for available guideline systems
type GuidelineKey = 'sus' | 'societies' | 'india' | 'uk' | 'who';

/**
 * Map selected region to primary guideline key
 * BR → sus (SUS - Sistema Único de Saúde)
 * IN → india (NP-NCD)
 * EU → uk (NHS/EMA)
 */
function getRegionGuidelineKey(region: Region): GuidelineKey {
  switch (region) {
    case 'BR':
      return 'sus';
    case 'IN':
      return 'india';
    case 'EU':
      return 'uk';
    default:
      return 'sus';
  }
}

interface GuidelineConfig {
  key: GuidelineKey;
  label: string;
  shortLabel: string;
  icon: typeof Hospital;
  bgColor: string; // gradient start color
  shadowColor: string; // shadow color
  badge: string;
  borderColor: string; // for focus/selection
  country?: string; // flag emoji or identifier
}

// Configuration for each guideline system
const guidelineConfigs: Record<GuidelineKey, GuidelineConfig> = {
  sus: {
    key: 'sus',
    label: 'Sistema Único de Saúde',
    shortLabel: 'SUS',
    icon: Hospital,
    bgColor: 'from-blue-600 to-blue-700',
    shadowColor: 'shadow-blue-600/30',
    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700',
    borderColor: 'border-blue-500',
    country: '🇧🇷'
  },
  societies: {
    key: 'societies',
    label: 'Sociedades Médicas',
    shortLabel: 'Sociedades',
    icon: Building2,
    bgColor: 'from-emerald-600 to-teal-700',
    shadowColor: 'shadow-emerald-600/30',
    badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700',
    borderColor: 'border-emerald-500',
    country: '🇧🇷'
  },
  india: {
    key: 'india',
    label: 'Diretriz Índia (NP-NCD)',
    shortLabel: 'Índia',
    icon: Users,
    bgColor: 'from-orange-600 to-amber-700',
    shadowColor: 'shadow-orange-600/30',
    badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700',
    borderColor: 'border-orange-500',
    country: '🇮🇳'
  },
  uk: {
    key: 'uk',
    label: 'Diretrizes Reino Unido (NHS)',
    shortLabel: 'Reino Unido',
    icon: Flag,
    bgColor: 'from-red-600 to-rose-700',
    shadowColor: 'shadow-red-600/30',
    badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700',
    borderColor: 'border-red-500',
    country: '🇬🇧'
  },
  who: {
    key: 'who',
    label: 'Organização Mundial de Saúde (WHO)',
    shortLabel: 'WHO',
    icon: Globe,
    bgColor: 'from-cyan-600 to-blue-700',
    shadowColor: 'shadow-cyan-600/30',
    badge: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-700',
    borderColor: 'border-cyan-500',
    country: '🌍'
  }
};

export default function ComparisonCard({ title, recommendations }: ComparisonCardProps) {
  const { sus, societies, india, uk, who, convergence } = recommendations;
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const [isMounted, setIsMounted] = useState(false);

  // Determine initial mobile tab from selected region
  const regionGuidelineKey = getRegionGuidelineKey(selectedRegion);

  // Determine available guidelines (always include SUS and Societies)
  const availableGuidelines: GuidelineKey[] = ['sus', 'societies'];
  if (india) availableGuidelines.push('india');
  if (uk) availableGuidelines.push('uk');
  if (who) availableGuidelines.push('who');

  const hasMultipleGuidelines = availableGuidelines.length > 2;
  const [selectedMobileTab, setSelectedMobileTab] = useState<GuidelineKey>(regionGuidelineKey);

  // Hydration safety: ensure component is mounted before rendering interactive content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update mobile tab when region changes (if available)
  useEffect(() => {
    if (!isMounted) return;
    const newTabKey = getRegionGuidelineKey(selectedRegion);
    if (availableGuidelines.includes(newTabKey)) {
      setSelectedMobileTab(newTabKey);
    } else {
      setSelectedMobileTab('sus');
    }
  }, [selectedRegion, isMounted, availableGuidelines]);

  // Determine layout: for 3+ guidelines, use tabs on mobile, grid on desktop
  const isCompactView = availableGuidelines.length >= 3;

  // Status configuration using design tokens for consistency
  const getStatusConfig = (status: string) => {
    const icons = {
      convergencia: CheckCircle2,
      parcial: HelpCircle,
      divergencia: XCircle,
      em_disputa: AlertTriangle,
    };

    const labels = {
      convergencia: 'Convergência Total',
      parcial: 'Convergência Parcial',
      divergencia: 'Divergência',
      em_disputa: 'Em Disputa',
    };

    // Use design tokens for colors
    const colorMappings = {
      convergencia: {
        color: 'success',
        gradient: 'from-emerald-500/10 to-teal-500/10',
        border: 'border-emerald-200 dark:border-emerald-800',
        badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700'
      },
      parcial: {
        color: 'warning',
        gradient: 'from-amber-500/10 to-orange-500/10',
        border: 'border-amber-200 dark:border-amber-800',
        badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
      },
      divergencia: {
        color: 'danger',
        gradient: 'from-red-500/10 to-rose-500/10',
        border: 'border-red-200 dark:border-red-800',
        badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
      },
      em_disputa: {
        color: 'info',
        gradient: 'from-cyan-500/10 to-blue-500/10',
        border: 'border-cyan-200 dark:border-cyan-800',
        badge: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-700'
      },
    };

    const key = status as keyof typeof colorMappings;
    const mapping = colorMappings[key] || {
      color: 'neutral',
      gradient: 'from-neutral-500/10 to-gray-500/10',
      border: 'border-neutral-200 dark:border-neutral-800',
      badge: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
    };

    return {
      color: mapping.color,
      icon: icons[key] || HelpCircle,
      label: labels[key] || status,
      gradient: mapping.gradient,
      border: mapping.border,
      badge: mapping.badge,
    };
  };

  const statusConfig = getStatusConfig(convergence.status);
  const StatusIcon = statusConfig.icon;

  // Get guideline data by key
  const getGuidelineData = (key: GuidelineKey) => {
    switch (key) {
      case 'sus':
        return sus;
      case 'societies':
        return societies;
      case 'india':
        return india;
      case 'uk':
        return uk;
      case 'who':
        return who;
      default:
        return null;
    }
  };

  return (
    <div className="group">
      {/* Main Card Container */}
      <div className={`
        relative overflow-hidden rounded-2xl border-2 ${statusConfig.border}
        bg-gradient-to-br ${statusConfig.gradient}
        backdrop-blur-sm transition-all duration-300
        hover:shadow-2xl hover:scale-[1.01]
      `}>
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

        {/* Header with Title & Status */}
        <div className="relative px-8 py-6 border-b border-neutral-200/50 dark:border-neutral-700/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2 leading-tight">
                {title}
              </h3>
            </div>
            <div className={`
              flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 ${statusConfig.badge}
              shadow-sm transition-transform group-hover:scale-105
            `}>
              <StatusIcon className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-sm font-bold whitespace-nowrap">
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Tab Navigation (for 3+ guidelines) */}
        {isCompactView && (
          <div className="lg:hidden relative px-6 py-4 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/50 dark:border-neutral-700/50 overflow-x-auto">
            <div className="flex gap-2 whitespace-nowrap">
              {availableGuidelines.map((guideKey) => {
                const config = guidelineConfigs[guideKey];
                const isSelected = selectedMobileTab === guideKey;
                return (
                  <button
                    key={guideKey}
                    onClick={() => setSelectedMobileTab(guideKey)}
                    className={`
                      px-4 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap border-2
                      ${isSelected
                        ? `${config.badge} border-${config.borderColor.split('-')[1]}-500`
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'
                      }
                    `}
                  >
                    <span>{config.country}</span> {config.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Comparison Grid - Desktop: side-by-side, Mobile: single tab */}
        <div className={`
          ${isCompactView
            ? 'hidden lg:grid'
            : ''
          }
          grid
          ${availableGuidelines.length === 2
            ? 'lg:grid-cols-2'
            : availableGuidelines.length === 3
            ? 'lg:grid-cols-3'
            : availableGuidelines.length === 4
            ? 'lg:grid-cols-4'
            : 'lg:grid-cols-5'
          }
          divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/50 dark:divide-neutral-700/50
        `}>
          {availableGuidelines.map((guideKey) => {
            const config = guidelineConfigs[guideKey];
            const data = getGuidelineData(guideKey);
            if (!data) return null;

            const isSelectedRegion = isMounted && guideKey === regionGuidelineKey;

            return (
              <GuidelineColumn
                key={guideKey}
                config={config}
                data={data}
                guideKey={guideKey}
                isSelectedRegion={isSelectedRegion}
              />
            );
          })}
        </div>

        {/* Mobile Single Column View (for 3+ guidelines) */}
        {isCompactView && (
          <div className="lg:hidden">
            {availableGuidelines.map((guideKey) => {
              const config = guidelineConfigs[guideKey];
              const data = getGuidelineData(guideKey);
              if (!data || selectedMobileTab !== guideKey) return null;

              const isSelectedRegion = isMounted && guideKey === regionGuidelineKey;

              return (
                <GuidelineColumn
                  key={guideKey}
                  config={config}
                  data={data}
                  guideKey={guideKey}
                  isSelectedRegion={isSelectedRegion}
                />
              );
            })}
          </div>
        )}

        {/* Convergence Analysis Footer */}
        <div className="relative px-8 py-6 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800/50 dark:to-neutral-900/50 border-t-2 border-neutral-200/50 dark:border-neutral-700/50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <StatusIcon className={`w-6 h-6 text-${statusConfig.color}-600 dark:text-${statusConfig.color}-400`} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Análise de Convergência
              </h5>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {convergence.description}{' '}
                {convergence.citations.length > 0 && <InlineCitation citation={convergence.citations} />}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Guideline Column Component
interface GuidelineColumnProps {
  config: GuidelineConfig;
  data: any; // Guideline data
  guideKey: GuidelineKey;
  isSelectedRegion?: boolean;
}

function GuidelineColumn({ config, data, guideKey, isSelectedRegion = false }: GuidelineColumnProps) {
  const Icon = config.icon;
  const hasJustification = 'justification' in data;
  const hasRecommendation = 'recommendation' in data;
  const hasCoverage = 'coverage' in data;

  return (
    <div className={`
      relative p-6 lg:p-8 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm
      transition-all duration-300
      ${isSelectedRegion ? `
        ring-2 ${config.borderColor}
        shadow-lg ${config.shadowColor}
        bg-gradient-to-br from-white/95 to-white/85 dark:from-neutral-900/95 dark:to-neutral-900/85
      ` : ''}
    `}>
      {/* Header */}
      <div className="mb-6 pb-5 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${config.bgColor} rounded-xl flex items-center justify-center shadow-lg ${config.shadowColor}`}>
            <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base lg:text-lg font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                {config.label}
              </h4>
              {isSelectedRegion && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${config.badge}`}>
                  Selected Region
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
              {config.country}
            </p>
          </div>
        </div>

        {/* Organization badges */}
        {data.organization && data.organization.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {data.organization.map((org: string) => (
              <span
                key={org}
                className={`px-2.5 py-1 ${config.badge} rounded-md text-xs font-bold border`}
              >
                {org}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <dl className="space-y-4 lg:space-y-5">
        <DataField
          label="População-alvo"
          value={data.population}
          citations={data.citations}
        />
        <DataField
          label="Método"
          value={data.method}
        />
        <DataField
          label="Periodicidade"
          value={data.periodicity}
        />
        {hasCoverage && (
          <DataField
            label="Cobertura Atual"
            value={data.coverage}
            highlight
          />
        )}
        {(hasJustification || hasRecommendation) && (
          <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
            <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              {hasRecommendation ? 'Recomendação Detalhada' : 'Justificativa Técnica'}
            </dt>
            <dd className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed italic bg-neutral-50 dark:bg-neutral-800/50 px-3 lg:px-4 py-3 rounded-lg">
              {hasRecommendation ? data.recommendation : data.justification}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

// Helper Component for Data Fields
function DataField({
  label,
  value,
  citations,
  highlight
}: {
  label: string;
  value: string;
  citations?: any[];
  highlight?: boolean;
}) {
  return (
    <div className={highlight ? 'bg-blue-50 dark:bg-blue-900/10 -mx-2 px-2 py-2 rounded-lg' : ''}>
      <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
        {label}
      </dt>
      <dd className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {value}{' '}
        {citations && citations.length > 0 && <InlineCitation citation={citations} />}
      </dd>
    </div>
  );
}
