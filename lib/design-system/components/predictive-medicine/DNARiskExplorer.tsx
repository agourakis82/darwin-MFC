/**
 * DNA RISK EXPLORER
 * =================
 *
 * Visualização interativa de cromossomos com variantes genéticas
 * Estilo futurista com hotspots de risco pulsantes
 *
 * Criado com o skill: genius-creative-uiux
 *
 * Features:
 * - Visualização de 23 pares de cromossomos
 * - Hotspots de variantes patogênicas com animação
 * - Zoom e navegação por cromossomo
 * - Detalhes de variantes on hover
 * - Scores de risco poligênico
 *
 * @example
 * ```tsx
 * import { DNARiskExplorer } from '@/lib/design-system/components/predictive-medicine/DNARiskExplorer';
 *
 * <DNARiskExplorer
 *   genomicProfile={genomicProfile}
 *   onVariantSelect={handleVariantSelect}
 * />
 * ```
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import { Card, CardHeader, CardTitle, CardContent } from '@/lib/design-system/primitives/card';
import {
  PulseWrapper,
  GlowWrapper,
  HeartbeatWrapper
} from '@/lib/design-system/animations/feedback';
import {
  FadeTransition,
  ScaleTransition,
  SlideTransition
} from '@/lib/design-system/animations/transitions';

// ============================================================================
// TYPES
// ============================================================================

interface GeneticVariant {
  id: string;
  chromosome: string;
  position: number;
  gene: string;
  reference: string;
  alternate: string;
  zygosity: 'heterozygous' | 'homozygous' | 'compound-heterozygous';
  pathogenicity: 'pathogenic' | 'likely-pathogenic' | 'uncertain' | 'likely-benign' | 'benign';
  clinicalSignificance: string;
  associatedConditions: string[];
  frequency: number; // Population frequency
}

interface PolygenicRiskScore {
  trait: string;
  score: number; // 0-1
  percentile: number; // 0-100
  confidence: number; // 0-1
  category: 'high' | 'moderate' | 'low';
}

interface GenomicProfile {
  patientId: string;
  analysisDate: Date;
  variants: GeneticVariant[];
  polygenicRiskScores: PolygenicRiskScore[];
  ancestry: {
    primary: string;
    admixture: Record<string, number>;
  };
}

interface DNARiskExplorerProps {
  genomicProfile: GenomicProfile;
  onVariantSelect?: (variant: GeneticVariant) => void;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CHROMOSOMES = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y'
];

const CHROMOSOME_SIZES: Record<string, number> = {
  '1': 249, '2': 243, '3': 198, '4': 191, '5': 181, '6': 171,
  '7': 159, '8': 146, '9': 141, '10': 136, '11': 135, '12': 133,
  '13': 115, '14': 107, '15': 102, '16': 90, '17': 83, '18': 80,
  '19': 59, '20': 64, '21': 47, '22': 51, 'X': 156, 'Y': 57
};

const pathogenicityColors = {
  pathogenic: {
    bg: 'bg-red-500',
    glow: 'rgba(239, 68, 68, 0.8)',
    text: 'text-red-600 dark:text-red-400',
    label: 'Patogênica'
  },
  'likely-pathogenic': {
    bg: 'bg-orange-500',
    glow: 'rgba(249, 115, 22, 0.8)',
    text: 'text-orange-600 dark:text-orange-400',
    label: 'Provavelmente Patogênica'
  },
  uncertain: {
    bg: 'bg-amber-500',
    glow: 'rgba(245, 158, 11, 0.6)',
    text: 'text-amber-600 dark:text-amber-400',
    label: 'Significância Incerta'
  },
  'likely-benign': {
    bg: 'bg-emerald-400',
    glow: 'rgba(52, 211, 153, 0.5)',
    text: 'text-emerald-600 dark:text-emerald-400',
    label: 'Provavelmente Benigna'
  },
  benign: {
    bg: 'bg-emerald-500',
    glow: 'rgba(16, 185, 129, 0.4)',
    text: 'text-emerald-600 dark:text-emerald-400',
    label: 'Benigna'
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Chromosome Visualization - Representação visual de um cromossomo
 */
const ChromosomeViz: React.FC<{
  chromosome: string;
  variants: GeneticVariant[];
  isSelected: boolean;
  onSelect: () => void;
  onVariantHover: (variant: GeneticVariant | null) => void;
}> = ({ chromosome, variants, isSelected, onSelect, onVariantHover }) => {
  const shouldReduceMotion = useReducedMotion();
  const size = CHROMOSOME_SIZES[chromosome] || 100;
  const height = Math.max(40, (size / 249) * 120); // Normalize to max 120px

  const pathogenicVariants = variants.filter(
    v => v.pathogenicity === 'pathogenic' || v.pathogenicity === 'likely-pathogenic'
  );

  return (
    <motion.div
      className={cn(
        'relative flex flex-col items-center cursor-pointer group',
        isSelected && 'z-10'
      )}
      onClick={onSelect}
      whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
      whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
    >
      {/* Chromosome body */}
      <div className="relative">
        <motion.div
          className={cn(
            'relative rounded-full transition-all duration-300',
            isSelected
              ? 'bg-gradient-to-b from-brand-primary-400 via-brand-primary-500 to-brand-primary-600'
              : 'bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-500 dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-800',
            pathogenicVariants.length > 0 && !isSelected &&
              'ring-2 ring-red-500/50'
          )}
          style={{
            width: isSelected ? 24 : 16,
            height: height,
          }}
          animate={isSelected ? {
            boxShadow: [
              '0 0 0px rgba(59, 130, 246, 0)',
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 0px rgba(59, 130, 246, 0)'
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Centromere */}
          <div
            className={cn(
              'absolute left-0 right-0 h-1 rounded-full',
              isSelected ? 'bg-brand-primary-300' : 'bg-neutral-200 dark:bg-neutral-500'
            )}
            style={{ top: '40%' }}
          />

          {/* Variant hotspots */}
          {variants.map((variant, index) => {
            const yPos = (variant.position / (size * 1000000)) * height;
            const config = pathogenicityColors[variant.pathogenicity];
            const isHighRisk = variant.pathogenicity === 'pathogenic' || variant.pathogenicity === 'likely-pathogenic';

            return (
              <motion.div
                key={variant.id}
                className={cn(
                  'absolute left-1/2 -translate-x-1/2 rounded-full cursor-pointer',
                  config.bg,
                  isHighRisk ? 'w-3 h-3' : 'w-2 h-2'
                )}
                style={{ top: Math.min(yPos, height - 8) }}
                onMouseEnter={() => onVariantHover(variant)}
                onMouseLeave={() => onVariantHover(null)}
                animate={isHighRisk && !shouldReduceMotion ? {
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    `0 0 0px ${config.glow}`,
                    `0 0 8px ${config.glow}`,
                    `0 0 0px ${config.glow}`
                  ]
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            );
          })}
        </motion.div>

        {/* Pathogenic count badge */}
        {pathogenicVariants.length > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            {pathogenicVariants.length}
          </motion.div>
        )}
      </div>

      {/* Label */}
      <span className={cn(
        'mt-2 text-xs font-medium transition-colors',
        isSelected
          ? 'text-brand-primary-600 dark:text-brand-primary-400'
          : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300'
      )}>
        {chromosome}
      </span>
    </motion.div>
  );
};

/**
 * Variant Detail Panel - Painel de detalhes da variante
 */
const VariantDetailPanel: React.FC<{
  variant: GeneticVariant | null;
}> = ({ variant }) => {
  if (!variant) return null;

  const config = pathogenicityColors[variant.pathogenicity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-80 z-50"
    >
      <Card variant="elevated" padding="md" className="shadow-xl">
        <div className="flex items-start gap-3">
          <GlowWrapper color={config.glow} intensity="normal">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold',
              config.bg
            )}>
              {variant.gene.slice(0, 2)}
            </div>
          </GlowWrapper>

          <div className="flex-1">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
              {variant.gene}
            </h4>
            <p className={cn('text-sm font-medium', config.text)}>
              {config.label}
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded p-2">
            <span className="text-neutral-500">Cromossomo</span>
            <p className="font-medium">{variant.chromosome}:{variant.position.toLocaleString()}</p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded p-2">
            <span className="text-neutral-500">Mudança</span>
            <p className="font-mono font-medium">{variant.reference} → {variant.alternate}</p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded p-2">
            <span className="text-neutral-500">Zigosidade</span>
            <p className="font-medium capitalize">{variant.zygosity.replace('-', ' ')}</p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded p-2">
            <span className="text-neutral-500">Frequência</span>
            <p className="font-medium">{(variant.frequency * 100).toFixed(4)}%</p>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs text-neutral-500 mb-1">Significância Clínica:</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {variant.clinicalSignificance}
          </p>
        </div>

        {variant.associatedConditions.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-neutral-500 mb-1">Condições Associadas:</p>
            <div className="flex flex-wrap gap-1">
              {variant.associatedConditions.map((condition, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

/**
 * Polygenic Risk Score Card
 */
const PolygenicRiskCard: React.FC<{
  score: PolygenicRiskScore;
  index: number;
}> = ({ score, index }) => {
  const shouldReduceMotion = useReducedMotion();

  const categoryConfig = {
    high: { color: 'from-red-500 to-red-600', bg: 'bg-red-50 dark:bg-red-950/30' },
    moderate: { color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    low: { color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' }
  };

  const config = categoryConfig[score.category];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className={cn('p-3 rounded-lg', config.bg)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {score.trait}
        </span>
        <span className="text-xs text-neutral-500">
          Percentil {score.percentile}
        </span>
      </div>

      <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r', config.color)}
          initial={{ width: 0 }}
          animate={{ width: `${score.score * 100}%` }}
          transition={{ duration: shouldReduceMotion ? 0 : 1, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <div className="flex items-center justify-between mt-1 text-xs text-neutral-500">
        <span>Confiança: {Math.round(score.confidence * 100)}%</span>
        <span className={cn(
          'font-medium',
          score.category === 'high' ? 'text-red-600' :
          score.category === 'moderate' ? 'text-amber-600' : 'text-emerald-600'
        )}>
          Risco {score.category === 'high' ? 'Alto' : score.category === 'moderate' ? 'Moderado' : 'Baixo'}
        </span>
      </div>
    </motion.div>
  );
};

/**
 * DNA Helix Animation - Decorative animated helix
 */
const DNAHelixAnimation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="absolute right-0 top-0 w-32 h-full opacity-10">
        <div className="w-full h-full bg-gradient-to-b from-brand-primary-500 to-purple-500 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-0 w-32 h-full overflow-hidden opacity-20 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-brand-primary-500"
          style={{ top: i * 60 }}
          animate={{
            x: [0, 40, 0, -40, 0],
            scale: [1, 0.8, 1, 0.8, 1],
            opacity: [0.5, 1, 0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut'
          }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`pair-${i}`}
          className="absolute w-4 h-4 rounded-full bg-purple-500"
          style={{ top: i * 60 + 20 }}
          animate={{
            x: [0, -40, 0, 40, 0],
            scale: [1, 0.8, 1, 0.8, 1],
            opacity: [0.5, 1, 0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const DNARiskExplorer: React.FC<DNARiskExplorerProps> = ({
  genomicProfile,
  onVariantSelect,
  className
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedChromosome, setSelectedChromosome] = useState<string | null>(null);
  const [hoveredVariant, setHoveredVariant] = useState<GeneticVariant | null>(null);
  const [viewMode, setViewMode] = useState<'karyotype' | 'list'>('karyotype');

  // Group variants by chromosome
  const variantsByChromosome = useMemo(() => {
    const grouped: Record<string, GeneticVariant[]> = {};
    CHROMOSOMES.forEach(chr => { grouped[chr] = []; });
    genomicProfile.variants.forEach(variant => {
      if (grouped[variant.chromosome]) {
        grouped[variant.chromosome].push(variant);
      }
    });
    return grouped;
  }, [genomicProfile.variants]);

  // Stats
  const stats = useMemo(() => {
    const pathogenic = genomicProfile.variants.filter(
      v => v.pathogenicity === 'pathogenic' || v.pathogenicity === 'likely-pathogenic'
    ).length;
    const uncertain = genomicProfile.variants.filter(v => v.pathogenicity === 'uncertain').length;
    const benign = genomicProfile.variants.filter(
      v => v.pathogenicity === 'benign' || v.pathogenicity === 'likely-benign'
    ).length;
    return { pathogenic, uncertain, benign, total: genomicProfile.variants.length };
  }, [genomicProfile.variants]);

  const selectedVariants = selectedChromosome
    ? variantsByChromosome[selectedChromosome]
    : [];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with stats */}
      <Card variant="glass" padding="lg" className="relative overflow-hidden">
        <DNAHelixAnimation />

        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <HeartbeatWrapper continuous>
              <span className="text-3xl">🧬</span>
            </HeartbeatWrapper>
            DNA Risk Explorer
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <motion.div
              className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {stats.total}
              </p>
              <p className="text-sm text-neutral-500">Variantes Totais</p>
            </motion.div>

            <motion.div
              className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PulseWrapper intensity="subtle" speed="slow" continuous={stats.pathogenic > 0}>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {stats.pathogenic}
                </p>
              </PulseWrapper>
              <p className="text-sm text-red-600/70 dark:text-red-400/70">Patogênicas</p>
            </motion.div>

            <motion.div
              className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {stats.uncertain}
              </p>
              <p className="text-sm text-amber-600/70 dark:text-amber-400/70">Incertas</p>
            </motion.div>

            <motion.div
              className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {stats.benign}
              </p>
              <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70">Benignas</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Karyotype View */}
      <Card variant="default" padding="lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🔬</span>
            Cariótipo Interativo
          </CardTitle>

          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('karyotype')}
              className={cn(
                'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                viewMode === 'karyotype'
                  ? 'bg-white dark:bg-neutral-700 shadow'
                  : 'text-neutral-500 hover:text-neutral-700'
              )}
            >
              Cariótipo
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                viewMode === 'list'
                  ? 'bg-white dark:bg-neutral-700 shadow'
                  : 'text-neutral-500 hover:text-neutral-700'
              )}
            >
              Lista
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            {viewMode === 'karyotype' ? (
              <motion.div
                key="karyotype"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                {/* Chromosome grid */}
                <div className="grid grid-cols-12 gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  {CHROMOSOMES.slice(0, 22).map((chr) => (
                    <ChromosomeViz
                      key={chr}
                      chromosome={chr}
                      variants={variantsByChromosome[chr]}
                      isSelected={selectedChromosome === chr}
                      onSelect={() => setSelectedChromosome(prev => prev === chr ? null : chr)}
                      onVariantHover={setHoveredVariant}
                    />
                  ))}
                </div>

                {/* Sex chromosomes */}
                <div className="flex justify-center gap-8 mt-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                  <ChromosomeViz
                    chromosome="X"
                    variants={variantsByChromosome['X']}
                    isSelected={selectedChromosome === 'X'}
                    onSelect={() => setSelectedChromosome(prev => prev === 'X' ? null : 'X')}
                    onVariantHover={setHoveredVariant}
                  />
                  <ChromosomeViz
                    chromosome="Y"
                    variants={variantsByChromosome['Y']}
                    isSelected={selectedChromosome === 'Y'}
                    onSelect={() => setSelectedChromosome(prev => prev === 'Y' ? null : 'Y')}
                    onVariantHover={setHoveredVariant}
                  />
                </div>

                {/* Variant tooltip */}
                <AnimatePresence>
                  {hoveredVariant && (
                    <VariantDetailPanel variant={hoveredVariant} />
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2 max-h-[500px] overflow-y-auto"
              >
                {genomicProfile.variants
                  .sort((a, b) => {
                    const order = { 'pathogenic': 0, 'likely-pathogenic': 1, 'uncertain': 2, 'likely-benign': 3, 'benign': 4 };
                    return order[a.pathogenicity] - order[b.pathogenicity];
                  })
                  .map((variant, index) => {
                    const config = pathogenicityColors[variant.pathogenicity];
                    return (
                      <motion.div
                        key={variant.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={cn(
                          'p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-shadow',
                          'bg-white dark:bg-neutral-800',
                          config.bg.replace('bg-', 'border-')
                        )}
                        onClick={() => onVariantSelect?.(variant)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold',
                              config.bg
                            )}>
                              {variant.chromosome}
                            </div>
                            <div>
                              <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                                {variant.gene}
                              </p>
                              <p className="text-xs text-neutral-500 font-mono">
                                {variant.reference} → {variant.alternate}
                              </p>
                            </div>
                          </div>
                          <span className={cn('text-xs font-medium px-2 py-1 rounded-full', config.bg.replace('bg-', 'bg-').replace('500', '100'), config.text)}>
                            {config.label}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Selected chromosome detail */}
      <AnimatePresence>
        {selectedChromosome && selectedVariants.length > 0 && (
          <SlideTransition show={true} direction="up">
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">📍</span>
                  Cromossomo {selectedChromosome} - {selectedVariants.length} variantes
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-3">
                  {selectedVariants.map((variant, index) => {
                    const config = pathogenicityColors[variant.pathogenicity];
                    return (
                      <motion.div
                        key={variant.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          'p-4 rounded-lg border cursor-pointer hover:shadow-lg transition-all',
                          config.bg.replace('bg-', 'bg-').replace('500', '50')
                        )}
                        onClick={() => onVariantSelect?.(variant)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">{variant.gene}</h4>
                            <p className={cn('text-sm', config.text)}>{config.label}</p>
                          </div>
                          <div className="text-right text-sm text-neutral-500">
                            <p>Posição: {variant.position.toLocaleString()}</p>
                            <p className="font-mono">{variant.reference} → {variant.alternate}</p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                          {variant.clinicalSignificance}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </SlideTransition>
        )}
      </AnimatePresence>

      {/* Polygenic Risk Scores */}
      <Card variant="default" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            Scores de Risco Poligênico
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {genomicProfile.polygenicRiskScores.map((score, index) => (
              <PolygenicRiskCard key={score.trait} score={score} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ancestry */}
      <Card variant="glass" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🌍</span>
            Ancestralidade Genética
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary-500 to-purple-500 flex items-center justify-center text-white text-2xl">
                🧬
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                Ancestralidade Principal: {genomicProfile.ancestry.primary}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(genomicProfile.ancestry.admixture).map(([region, percentage]) => (
                  <div key={region} className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-full px-3 py-1">
                    <span className="text-sm font-medium">{region}</span>
                    <span className="text-xs text-neutral-500">{(percentage * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DNARiskExplorer;
