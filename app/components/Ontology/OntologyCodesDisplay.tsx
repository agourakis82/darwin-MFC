'use client';

/**
 * DARWIN-MFC ONTOLOGY CODES DISPLAY
 * ==================================
 *
 * Component to display ontology codes (LOINC, HPO, ORDO, ICD-10, CIAP-2, SNOMED-CT)
 * for diseases and clinical conditions.
 *
 * @example
 * ```tsx
 * <OntologyCodesDisplay
 *   loinc={disease.loinc}
 *   hpo={disease.hpo}
 *   ordo={disease.ordo}
 *   icd10={disease.cid10}
 *   ciap2={disease.ciap2}
 *   snomedCT={disease.snomedCT}
 * />
 * ```
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Microscope,
  Brain,
  AlertCircle,
  FileCode,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Stethoscope,
  FlaskConical,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export interface OntologyCodesDisplayProps {
  /** LOINC codes for laboratory exams - supports both string[] and {code, name}[] formats */
  loinc?: string[] | { code: string; name: string }[];

  /** Human Phenotype Ontology codes */
  hpo?: string[];

  /** Orphanet Rare Disease Ontology codes */
  ordo?: string[];

  /** ICD-10 codes */
  icd10?: string[];

  /** CIAP-2 codes */
  ciap2?: string[];

  /** SNOMED-CT concept ID */
  snomedCT?: string;

  /** MeSH ID */
  meshId?: string;

  /** Disease Ontology ID */
  doid?: string;

  /** UMLS CUI */
  umlsCui?: string;

  /** Whether to show in compact mode */
  compact?: boolean;

  /** Custom class name */
  className?: string;
}

type OntologyType = 'loinc' | 'hpo' | 'ordo' | 'icd10' | 'ciap2' | 'snomedCT' | 'meshId' | 'doid' | 'umlsCui';

interface OntologyConfig {
  type: OntologyType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  urlTemplate?: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const ONTOLOGY_CONFIG: Record<OntologyType, OntologyConfig> = {
  loinc: {
    type: 'loinc',
    label: 'LOINC',
    description: 'Laboratory tests and clinical observations',
    icon: <FlaskConical className="w-4 h-4" />,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    urlTemplate: 'https://loinc.org/{{code}}/',
  },
  hpo: {
    type: 'hpo',
    label: 'HPO',
    description: 'Human Phenotype Ontology',
    icon: <Brain className="w-4 h-4" />,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    urlTemplate: 'https://hpo.jax.org/browse/term/{{code}}',
  },
  ordo: {
    type: 'ordo',
    label: 'ORDO',
    description: 'Orphanet Rare Disease Ontology',
    icon: <AlertCircle className="w-4 h-4" />,
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    urlTemplate: 'https://www.orpha.net/en/disease/detail/{{code}}',
  },
  icd10: {
    type: 'icd10',
    label: 'ICD-10',
    description: 'International Classification of Diseases',
    icon: <FileCode className="w-4 h-4" />,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    urlTemplate: 'https://icd.who.int/browse10/2019/en#/{{code}}',
  },
  ciap2: {
    type: 'ciap2',
    label: 'CIAP-2',
    description: 'International Classification of Primary Care',
    icon: <Stethoscope className="w-4 h-4" />,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  snomedCT: {
    type: 'snomedCT',
    label: 'SNOMED-CT',
    description: 'Systematized Nomenclature of Medicine',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    urlTemplate: 'https://browser.ihtsdotools.org/?perspective=full&conceptId1={{code}}',
  },
  meshId: {
    type: 'meshId',
    label: 'MeSH',
    description: 'Medical Subject Headings',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    urlTemplate: 'https://meshb.nlm.nih.gov/record/ui?ui={{code}}',
  },
  doid: {
    type: 'doid',
    label: 'DOID',
    description: 'Disease Ontology',
    icon: <Microscope className="w-4 h-4" />,
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20',
    urlTemplate: 'https://disease-ontology.org/term/{{code}}/',
  },
  umlsCui: {
    type: 'umlsCui',
    label: 'UMLS',
    description: 'Unified Medical Language System',
    icon: <FileCode className="w-4 h-4" />,
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/20',
  },
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface CodeBadgeProps {
  code: string;
  config: OntologyConfig;
  showCopy?: boolean;
}

function CodeBadge({ code, config, showCopy = true }: CodeBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const url = config.urlTemplate?.replace('{{code}}', encodeURIComponent(code));

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg',
        'border',
        config.bgColor,
        config.borderColor
      )}
    >
      <span className={config.color}>{config.icon}</span>
      <span className={cn('font-mono text-sm', config.color)}>{code}</span>

      {showCopy && (
        <button
          onClick={handleCopy}
          className={cn(
            'p-1 rounded hover:bg-white/50 dark:hover:bg-black/20',
            'transition-colors duration-150'
          )}
          title="Copy code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[#86868b]" />
          )}
        </button>
      )}

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'p-1 rounded hover:bg-white/50 dark:hover:bg-black/20',
            'transition-colors duration-150'
          )}
          title={`View in ${config.label}`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#86868b]" />
        </a>
      )}
    </div>
  );
}

interface OntologySectionProps {
  config: OntologyConfig;
  codes: string[];
  isExpanded: boolean;
  onToggle: () => void;
  compact?: boolean;
}

function OntologySection({
  config,
  codes,
  isExpanded,
  onToggle,
  compact = false,
}: OntologySectionProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {codes.map((code) => (
          <CodeBadge key={code} code={code} config={config} showCopy={false} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl border overflow-hidden',
        config.borderColor,
        config.bgColor
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3',
          'hover:bg-white/30 dark:hover:bg-black/10',
          'transition-colors duration-200'
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center',
              'bg-white/50 dark:bg-black/20',
              config.color
            )}
          >
            {config.icon}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]'
                )}
              >
                {config.label}
              </span>
              <span
                className={cn(
                  'px-2 py-0.5 text-xs rounded-full',
                  config.bgColor,
                  config.color
                )}
              >
                {codes.length}
              </span>
            </div>
            <div className="text-sm text-[#86868b]">{config.description}</div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-[#86868b]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#86868b]" />
        )}
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2">
              <div className="flex flex-wrap gap-2">
                {codes.map((code) => (
                  <CodeBadge key={code} code={code} config={config} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function OntologyCodesDisplay({
  loinc,
  hpo,
  ordo,
  icd10,
  ciap2,
  snomedCT,
  meshId,
  doid,
  umlsCui,
  compact = false,
  className,
}: OntologyCodesDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<Set<OntologyType>>(
    new Set(['loinc', 'hpo'])
  );

  // Build sections from available data
  const sections: Array<{ type: OntologyType; codes: string[] }> = [];

  if (loinc && loinc.length > 0) {
    // Normalize LOINC codes - handle both string[] and {code, name}[] formats
    const loincCodes = loinc.map(item => typeof item === 'string' ? item : item.code);
    sections.push({ type: 'loinc', codes: loincCodes });
  }
  if (hpo && hpo.length > 0) {
    sections.push({ type: 'hpo', codes: hpo });
  }
  if (ordo && ordo.length > 0) {
    sections.push({ type: 'ordo', codes: ordo });
  }
  if (icd10 && icd10.length > 0) {
    sections.push({ type: 'icd10', codes: icd10 });
  }
  if (ciap2 && ciap2.length > 0) {
    sections.push({ type: 'ciap2', codes: ciap2 });
  }
  if (snomedCT) {
    sections.push({ type: 'snomedCT', codes: [snomedCT] });
  }
  if (meshId) {
    sections.push({ type: 'meshId', codes: [meshId] });
  }
  if (doid) {
    sections.push({ type: 'doid', codes: [doid] });
  }
  if (umlsCui) {
    sections.push({ type: 'umlsCui', codes: [umlsCui] });
  }

  // No ontology codes available
  if (sections.length === 0) {
    return null;
  }

  const toggleSection = (type: OntologyType) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const totalCodes = sections.reduce((sum, s) => sum + s.codes.length, 0);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      {!compact && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <FileCode className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
              Ontology Codes
            </h3>
            <p className="text-sm text-[#86868b]">
              {totalCodes} code{totalCodes > 1 ? 's' : ''} across{' '}
              {sections.length} ontolog{sections.length > 1 ? 'ies' : 'y'}
            </p>
          </div>
        </div>
      )}

      {/* Sections */}
      <div className={cn(compact ? 'flex flex-wrap gap-2' : 'space-y-3')}>
        {sections.map((section) => {
          const config = ONTOLOGY_CONFIG[section.type];
          return (
            <OntologySection
              key={section.type}
              config={config}
              codes={section.codes}
              isExpanded={expandedSections.has(section.type)}
              onToggle={() => toggleSection(section.type)}
              compact={compact}
            />
          );
        })}
      </div>
    </div>
  );
}

export default OntologyCodesDisplay;
