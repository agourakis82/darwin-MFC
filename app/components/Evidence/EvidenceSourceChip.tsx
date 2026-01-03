'use client';

/**
 * DARWIN-MFC EVIDENCE SOURCE CHIP
 * ================================
 *
 * Compact chip component for displaying evidence source types
 * with color-coded indicators for quick recognition.
 *
 * @example
 * ```tsx
 * <EvidenceSourceChip source="pubmed" />
 * <EvidenceSourceChip source="cochrane" showLabel />
 * ```
 */

import { cn } from '@/lib/utils';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  BookOpen,
  FileText,
  Globe,
  Building2,
  Microscope,
  GraduationCap,
  Stethoscope,
  ScrollText,
  Database,
  Users,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export type EvidenceSource =
  | 'pubmed'
  | 'cochrane'
  | 'uptodate'
  | 'dynamed'
  | 'nice'
  | 'who'
  | 'cdc'
  | 'ema'
  | 'fda'
  | 'bmj'
  | 'lancet'
  | 'nejm'
  | 'jama'
  | 'society-guideline'
  | 'government'
  | 'systematic-review'
  | 'clinical-trial'
  | 'expert-consensus'
  | 'textbook'
  | 'other';

export interface EvidenceSourceChipProps {
  /** Source type */
  source: EvidenceSource;

  /** Show full label text */
  showLabel?: boolean;

  /** Size variant */
  size?: 'xs' | 'sm' | 'md';

  /** Custom class name */
  className?: string;

  /** Make chip clickable with link */
  href?: string;

  /** Tooltip override text */
  tooltipText?: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

interface SourceConfig {
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
}

const sourceConfig: Record<EvidenceSource, SourceConfig> = {
  pubmed: {
    label: 'PubMed',
    shortLabel: 'PM',
    description: 'National Library of Medicine database',
    icon: Database,
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  cochrane: {
    label: 'Cochrane Library',
    shortLabel: 'CL',
    description: 'Cochrane systematic reviews',
    icon: BookOpen,
    color: 'text-purple-700 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/50',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  uptodate: {
    label: 'UpToDate',
    shortLabel: 'UT',
    description: 'Evidence-based clinical decision support',
    icon: Stethoscope,
    color: 'text-teal-700 dark:text-teal-400',
    bgColor: 'bg-teal-50 dark:bg-teal-950/50',
    borderColor: 'border-teal-200 dark:border-teal-800',
  },
  dynamed: {
    label: 'DynaMed',
    shortLabel: 'DM',
    description: 'Evidence-based point-of-care tool',
    icon: Microscope,
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  nice: {
    label: 'NICE Guidelines',
    shortLabel: 'NICE',
    description: 'UK National Institute for Health and Care Excellence',
    icon: Building2,
    color: 'text-indigo-700 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/50',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
  },
  who: {
    label: 'WHO',
    shortLabel: 'WHO',
    description: 'World Health Organization',
    icon: Globe,
    color: 'text-sky-700 dark:text-sky-400',
    bgColor: 'bg-sky-50 dark:bg-sky-950/50',
    borderColor: 'border-sky-200 dark:border-sky-800',
  },
  cdc: {
    label: 'CDC',
    shortLabel: 'CDC',
    description: 'US Centers for Disease Control and Prevention',
    icon: Building2,
    color: 'text-cyan-700 dark:text-cyan-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/50',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
  },
  ema: {
    label: 'EMA',
    shortLabel: 'EMA',
    description: 'European Medicines Agency',
    icon: Building2,
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  fda: {
    label: 'FDA',
    shortLabel: 'FDA',
    description: 'US Food and Drug Administration',
    icon: Building2,
    color: 'text-slate-700 dark:text-slate-400',
    bgColor: 'bg-slate-50 dark:bg-slate-950/50',
    borderColor: 'border-slate-200 dark:border-slate-800',
  },
  bmj: {
    label: 'BMJ',
    shortLabel: 'BMJ',
    description: 'British Medical Journal',
    icon: FileText,
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/50',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  lancet: {
    label: 'The Lancet',
    shortLabel: 'LAN',
    description: 'The Lancet medical journal',
    icon: FileText,
    color: 'text-rose-700 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-950/50',
    borderColor: 'border-rose-200 dark:border-rose-800',
  },
  nejm: {
    label: 'NEJM',
    shortLabel: 'NEJM',
    description: 'New England Journal of Medicine',
    icon: FileText,
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  jama: {
    label: 'JAMA',
    shortLabel: 'JAMA',
    description: 'Journal of the American Medical Association',
    icon: FileText,
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/50',
    borderColor: 'border-orange-200 dark:border-orange-800',
  },
  'society-guideline': {
    label: 'Society Guideline',
    shortLabel: 'SG',
    description: 'Medical society clinical practice guideline',
    icon: GraduationCap,
    color: 'text-violet-700 dark:text-violet-400',
    bgColor: 'bg-violet-50 dark:bg-violet-950/50',
    borderColor: 'border-violet-200 dark:border-violet-800',
  },
  government: {
    label: 'Government',
    shortLabel: 'GOV',
    description: 'Government health authority',
    icon: Building2,
    color: 'text-neutral-700 dark:text-neutral-400',
    bgColor: 'bg-neutral-100 dark:bg-neutral-800/50',
    borderColor: 'border-neutral-200 dark:border-neutral-700',
  },
  'systematic-review': {
    label: 'Systematic Review',
    shortLabel: 'SR',
    description: 'Systematic review or meta-analysis',
    icon: BookOpen,
    color: 'text-fuchsia-700 dark:text-fuchsia-400',
    bgColor: 'bg-fuchsia-50 dark:bg-fuchsia-950/50',
    borderColor: 'border-fuchsia-200 dark:border-fuchsia-800',
  },
  'clinical-trial': {
    label: 'Clinical Trial',
    shortLabel: 'CT',
    description: 'Registered clinical trial data',
    icon: FlaskConical,
    color: 'text-lime-700 dark:text-lime-400',
    bgColor: 'bg-lime-50 dark:bg-lime-950/50',
    borderColor: 'border-lime-200 dark:border-lime-800',
  },
  'expert-consensus': {
    label: 'Expert Consensus',
    shortLabel: 'EC',
    description: 'Expert consensus statement',
    icon: Users,
    color: 'text-pink-700 dark:text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-950/50',
    borderColor: 'border-pink-200 dark:border-pink-800',
  },
  textbook: {
    label: 'Textbook',
    shortLabel: 'TB',
    description: 'Medical textbook reference',
    icon: ScrollText,
    color: 'text-stone-700 dark:text-stone-400',
    bgColor: 'bg-stone-50 dark:bg-stone-950/50',
    borderColor: 'border-stone-200 dark:border-stone-800',
  },
  other: {
    label: 'Other',
    shortLabel: 'OTH',
    description: 'Other evidence source',
    icon: FileText,
    color: 'text-gray-700 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800/50',
    borderColor: 'border-gray-200 dark:border-gray-700',
  },
};

const sizeClasses = {
  xs: {
    chip: 'px-1.5 py-0.5 text-[10px] gap-0.5 rounded',
    icon: 'w-2.5 h-2.5',
  },
  sm: {
    chip: 'px-2 py-0.5 text-xs gap-1 rounded-md',
    icon: 'w-3 h-3',
  },
  md: {
    chip: 'px-2.5 py-1 text-sm gap-1.5 rounded-md',
    icon: 'w-3.5 h-3.5',
  },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function EvidenceSourceChip({
  source,
  showLabel = false,
  size = 'sm',
  className,
  href,
  tooltipText,
}: EvidenceSourceChipProps) {
  const config = sourceConfig[source];
  const sizes = sizeClasses[size];
  const Icon = config.icon;

  const chipContent = (
    <span
      className={cn(
        'inline-flex items-center font-medium border',
        config.bgColor,
        config.borderColor,
        config.color,
        sizes.chip,
        href && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
    >
      <Icon className={sizes.icon} aria-hidden="true" />
      <span>{showLabel ? config.label : config.shortLabel}</span>
    </span>
  );

  const wrappedContent = href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex">
      {chipContent}
    </a>
  ) : (
    chipContent
  );

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{wrappedContent}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs px-3 py-2 text-sm bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700"
            sideOffset={5}
          >
            <div className="space-y-1">
              <div className={cn('font-semibold', config.color)}>{config.label}</div>
              <div className="text-neutral-600 dark:text-neutral-400">
                {tooltipText || config.description}
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
 * Group of source chips for multiple references
 */
export function EvidenceSourceGroup({
  sources,
  maxDisplay = 3,
  size = 'sm',
  className,
}: {
  sources: EvidenceSource[];
  maxDisplay?: number;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}) {
  const displaySources = sources.slice(0, maxDisplay);
  const remainingCount = sources.length - maxDisplay;

  return (
    <div className={cn('inline-flex flex-wrap items-center gap-1', className)}>
      {displaySources.map((source, index) => (
        <EvidenceSourceChip key={`${source}-${index}`} source={source} size={size} />
      ))}
      {remainingCount > 0 && (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span
                className={cn(
                  'inline-flex items-center justify-center font-medium rounded-md',
                  'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
                  'border border-neutral-200 dark:border-neutral-700',
                  size === 'xs' && 'px-1 py-0.5 text-[10px]',
                  size === 'sm' && 'px-1.5 py-0.5 text-xs',
                  size === 'md' && 'px-2 py-1 text-sm'
                )}
              >
                +{remainingCount}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="z-50 px-3 py-2 text-sm bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700"
                sideOffset={5}
              >
                <div className="space-y-1">
                  {sources.slice(maxDisplay).map((source, index) => (
                    <div key={index} className="text-neutral-600 dark:text-neutral-400">
                      {sourceConfig[source].label}
                    </div>
                  ))}
                </div>
                <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
}

export default EvidenceSourceChip;
