/**
 * MICROBIOME GALAXY
 * =================
 *
 * Visualização do microbioma como uma galáxia de constelações
 * Cada espécie é uma estrela, taxa maiores são sistemas solares
 *
 * Criado com o skill: genius-creative-uiux
 *
 * Features:
 * - Visualização de galáxia com órbitas de bactérias
 * - Zoom e pan interativo
 * - Filtros por filo/família/gênero
 * - Health markers como nebulosas coloridas
 * - Animações de partículas orbitando
 *
 * @example
 * ```tsx
 * import { MicrobiomeGalaxy } from '@/lib/design-system/components/predictive-medicine/MicrobiomeGalaxy';
 *
 * <MicrobiomeGalaxy
 *   microbiomeProfile={microbiomeProfile}
 *   onSpeciesSelect={handleSpeciesSelect}
 * />
 * ```
 */

'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import { Card, CardHeader, CardTitle, CardContent } from '@/lib/design-system/primitives/card';
import {
  PulseWrapper,
  GlowWrapper
} from '@/lib/design-system/animations/feedback';

// ============================================================================
// TYPES
// ============================================================================

interface MicrobiomeSpecies {
  id: string;
  name: string;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  abundance: number; // 0-1
  role: 'beneficial' | 'neutral' | 'potentially-harmful' | 'unknown';
  functions: string[];
}

interface HealthMarker {
  name: string;
  score: number; // 0-1
  status: 'optimal' | 'adequate' | 'suboptimal' | 'concerning';
  description: string;
}

interface DiversityMetrics {
  shannonIndex: number;
  simpsonIndex: number;
  observedSpecies: number;
  status: 'high' | 'moderate' | 'low';
}

interface MicrobiomeProfile {
  patientId: string;
  analysisDate: Date;
  species: MicrobiomeSpecies[];
  healthMarkers: HealthMarker[];
  diversity: DiversityMetrics;
  functionalCapacity: {
    shortChainFattyAcids: number;
    vitamins: number;
    immuneSupport: number;
    metabolism: number;
  };
}

interface MicrobiomeGalaxyProps {
  microbiomeProfile: MicrobiomeProfile;
  onSpeciesSelect?: (species: MicrobiomeSpecies) => void;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const roleColors = {
  beneficial: {
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.6)',
    label: 'Benéfica',
    emoji: '✨'
  },
  neutral: {
    color: '#6B7280',
    glow: 'rgba(107, 114, 128, 0.4)',
    label: 'Neutra',
    emoji: '⚪'
  },
  'potentially-harmful': {
    color: '#EF4444',
    glow: 'rgba(239, 68, 68, 0.6)',
    label: 'Pot. Prejudicial',
    emoji: '⚠️'
  },
  unknown: {
    color: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.5)',
    label: 'Desconhecida',
    emoji: '❓'
  }
};

const phylumColors: Record<string, string> = {
  'Firmicutes': '#3B82F6',
  'Bacteroidetes': '#10B981',
  'Proteobacteria': '#F59E0B',
  'Actinobacteria': '#EC4899',
  'Verrucomicrobia': '#8B5CF6',
  'Fusobacteria': '#EF4444',
  'Other': '#6B7280'
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Galaxy Star - Uma estrela representando uma espécie
 */
const GalaxyStar: React.FC<{
  species: MicrobiomeSpecies;
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  onSelect: () => void;
  onHover: (species: MicrobiomeSpecies | null) => void;
  isSelected: boolean;
}> = ({ species, position, orbitRadius, orbitSpeed, onSelect, onHover, isSelected }) => {
  const shouldReduceMotion = useReducedMotion();
  const roleConfig = roleColors[species.role];
  const phylumColor = phylumColors[species.phylum] || phylumColors['Other'];

  // Star size based on abundance
  const size = Math.max(8, species.abundance * 40);

  return (
    <motion.g
      className="cursor-pointer"
      onClick={onSelect}
      onMouseEnter={() => onHover(species)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Orbit trail */}
      {!shouldReduceMotion && orbitRadius > 0 && (
        <motion.circle
          cx={200}
          cy={200}
          r={orbitRadius}
          fill="none"
          stroke={phylumColor}
          strokeWidth={0.5}
          strokeOpacity={0.2}
          strokeDasharray="4 4"
        />
      )}

      {/* Star glow */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={size + 4}
        fill={roleConfig.glow}
        animate={!shouldReduceMotion && species.role === 'beneficial' ? {
          r: [size + 4, size + 8, size + 4],
          opacity: [0.4, 0.8, 0.4]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Star core */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={size}
        fill={`url(#gradient-${species.id})`}
        stroke={isSelected ? '#fff' : phylumColor}
        strokeWidth={isSelected ? 3 : 1}
        animate={!shouldReduceMotion ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Gradient definition */}
      <defs>
        <radialGradient id={`gradient-${species.id}`}>
          <stop offset="0%" stopColor="#fff" stopOpacity={0.9} />
          <stop offset="50%" stopColor={roleConfig.color} />
          <stop offset="100%" stopColor={phylumColor} />
        </radialGradient>
      </defs>
    </motion.g>
  );
};

/**
 * Health Nebula - Nebulosa representando um health marker
 */
const HealthNebula: React.FC<{
  marker: HealthMarker;
  index: number;
  total: number;
}> = ({ marker, index, total }) => {
  const shouldReduceMotion = useReducedMotion();

  const statusColors = {
    optimal: { from: '#10B981', to: '#34D399' },
    adequate: { from: '#3B82F6', to: '#60A5FA' },
    suboptimal: { from: '#F59E0B', to: '#FBBF24' },
    concerning: { from: '#EF4444', to: '#F87171' }
  };

  const colors = statusColors[marker.status];
  const angle = (index / total) * Math.PI * 2;
  const radius = 180;
  const x = 200 + Math.cos(angle) * radius;
  const y = 200 + Math.sin(angle) * radius;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ delay: index * 0.2 }}
    >
      <defs>
        <radialGradient id={`nebula-${index}`}>
          <stop offset="0%" stopColor={colors.from} stopOpacity={0.8} />
          <stop offset="100%" stopColor={colors.to} stopOpacity={0} />
        </radialGradient>
      </defs>

      <motion.ellipse
        cx={x}
        cy={y}
        rx={marker.score * 60 + 20}
        ry={marker.score * 40 + 15}
        fill={`url(#nebula-${index})`}
        animate={!shouldReduceMotion ? {
          rx: [marker.score * 60 + 20, marker.score * 65 + 25, marker.score * 60 + 20],
          ry: [marker.score * 40 + 15, marker.score * 45 + 20, marker.score * 40 + 15],
          opacity: [0.4, 0.6, 0.4]
        } : {}}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
      />
    </motion.g>
  );
};

/**
 * Diversity Ring - Anel mostrando diversidade
 */
const DiversityRing: React.FC<{
  diversity: DiversityMetrics;
}> = ({ diversity }) => {
  const shouldReduceMotion = useReducedMotion();

  const statusColors = {
    high: '#10B981',
    moderate: '#F59E0B',
    low: '#EF4444'
  };

  const color = statusColors[diversity.status];

  return (
    <motion.circle
      cx={200}
      cy={200}
      r={195}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeDasharray={`${diversity.shannonIndex * 100} ${1000 - diversity.shannonIndex * 100}`}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 2 }}
    />
  );
};

/**
 * Species Detail Tooltip
 */
const SpeciesTooltip: React.FC<{
  species: MicrobiomeSpecies | null;
  position: { x: number; y: number };
}> = ({ species, position }) => {
  if (!species) return null;

  const roleConfig = roleColors[species.role];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute z-50 pointer-events-none"
      style={{
        left: position.x + 20,
        top: position.y - 10,
      }}
    >
      <Card variant="elevated" padding="sm" className="w-64 shadow-xl">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: roleConfig.color }}
          >
            {roleConfig.emoji}
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 italic">
              {species.name}
            </h4>
            <p className="text-xs text-neutral-500">
              {species.phylum} → {species.family}
            </p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">Abundância</span>
            <span className="font-medium">{(species.abundance * 100).toFixed(2)}%</span>
          </div>

          <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: roleConfig.color }}
              initial={{ width: 0 }}
              animate={{ width: `${species.abundance * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: roleConfig.color }}
            />
            <span style={{ color: roleConfig.color }}>{roleConfig.label}</span>
          </div>

          {species.functions.length > 0 && (
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700">
              <p className="text-xs text-neutral-500 mb-1">Funções:</p>
              <div className="flex flex-wrap gap-1">
                {species.functions.slice(0, 3).map((func, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded text-xs"
                  >
                    {func}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * Functional Capacity Bars
 */
const FunctionalCapacityBar: React.FC<{
  label: string;
  value: number;
  icon: string;
  color: string;
  index: number;
}> = ({ label, value, icon, color, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className="space-y-1"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2">
          <span>{icon}</span>
          <span className="text-neutral-600 dark:text-neutral-400">{label}</span>
        </span>
        <span className="font-medium">{Math.round(value * 100)}%</span>
      </div>

      <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: shouldReduceMotion ? 0 : 1, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const MicrobiomeGalaxy: React.FC<MicrobiomeGalaxyProps> = ({
  microbiomeProfile,
  onSpeciesSelect,
  className
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSpecies, setHoveredSpecies] = useState<MicrobiomeSpecies | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<MicrobiomeSpecies | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewFilter, setViewFilter] = useState<'all' | 'beneficial' | 'potentially-harmful'>('all');
  const [zoom, setZoom] = useState(1);

  // Calculate star positions
  const starPositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number; orbitRadius: number }> = {};

    // Sort by abundance to place larger stars closer to center
    const sortedSpecies = [...microbiomeProfile.species].sort((a, b) => b.abundance - a.abundance);

    sortedSpecies.forEach((species, index) => {
      // Golden angle distribution for nice spiral
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const angle = index * goldenAngle;
      const radius = 30 + Math.sqrt(index) * 20; // Spiral outward

      positions[species.id] = {
        x: 200 + Math.cos(angle) * radius,
        y: 200 + Math.sin(angle) * radius,
        orbitRadius: radius
      };
    });

    return positions;
  }, [microbiomeProfile.species]);

  // Filter species
  const filteredSpecies = useMemo(() => {
    if (viewFilter === 'all') return microbiomeProfile.species;
    return microbiomeProfile.species.filter(s => s.role === viewFilter);
  }, [microbiomeProfile.species, viewFilter]);

  // Stats
  const stats = useMemo(() => {
    const beneficial = microbiomeProfile.species.filter(s => s.role === 'beneficial').length;
    const harmful = microbiomeProfile.species.filter(s => s.role === 'potentially-harmful').length;
    const totalAbundanceBeneficial = microbiomeProfile.species
      .filter(s => s.role === 'beneficial')
      .reduce((acc, s) => acc + s.abundance, 0);

    return {
      beneficial,
      harmful,
      total: microbiomeProfile.species.length,
      beneficialRatio: totalAbundanceBeneficial
    };
  }, [microbiomeProfile.species]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleSpeciesSelect = (species: MicrobiomeSpecies) => {
    setSelectedSpecies(species);
    onSpeciesSelect?.(species);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <Card variant="glass" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <GlowWrapper color="rgba(139, 92, 246, 0.5)" intensity="normal">
              <span className="text-3xl">🦠</span>
            </GlowWrapper>
            Microbiome Galaxy
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <motion.div
              className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {stats.total}
              </p>
              <p className="text-sm text-neutral-500">Espécies</p>
            </motion.div>

            <motion.div
              className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {stats.beneficial}
              </p>
              <p className="text-sm text-emerald-600/70">Benéficas</p>
            </motion.div>

            <motion.div
              className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.harmful}
              </p>
              <p className="text-sm text-red-600/70">Pot. Prejudiciais</p>
            </motion.div>

            <motion.div
              className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {microbiomeProfile.diversity.observedSpecies}
              </p>
              <p className="text-sm text-purple-600/70">Diversidade</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Galaxy Visualization */}
      <Card variant="default" padding="lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🌌</span>
            Visualização da Galáxia
          </CardTitle>

          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
              {[
                { key: 'all', label: 'Todas' },
                { key: 'beneficial', label: 'Benéficas' },
                { key: 'potentially-harmful', label: 'Prejudiciais' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setViewFilter(key as typeof viewFilter)}
                  className={cn(
                    'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                    viewFilter === key
                      ? 'bg-white dark:bg-neutral-700 shadow'
                      : 'text-neutral-500 hover:text-neutral-700'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13H5v-2h14v2z" />
                </svg>
              </button>
              <span className="text-xs text-neutral-500 w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(z => Math.min(2, z + 0.25))}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div
            ref={containerRef}
            className="relative bg-gradient-to-br from-neutral-900 via-purple-950/20 to-neutral-900 rounded-xl overflow-hidden"
            style={{ height: 500 }}
            onMouseMove={handleMouseMove}
          >
            {/* Background stars */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={!shouldReduceMotion ? {
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1]
                  } : {}}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            {/* SVG Galaxy */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* Health marker nebulae */}
              {microbiomeProfile.healthMarkers.map((marker, index) => (
                <HealthNebula
                  key={marker.name}
                  marker={marker}
                  index={index}
                  total={microbiomeProfile.healthMarkers.length}
                />
              ))}

              {/* Diversity ring */}
              <DiversityRing diversity={microbiomeProfile.diversity} />

              {/* Center "sun" */}
              <motion.circle
                cx={200}
                cy={200}
                r={20}
                fill="url(#centerGradient)"
                animate={!shouldReduceMotion ? {
                  r: [20, 22, 20],
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <defs>
                <radialGradient id="centerGradient">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#4C1D95" />
                </radialGradient>
              </defs>

              {/* Species stars */}
              {filteredSpecies.map((species) => {
                const pos = starPositions[species.id];
                if (!pos) return null;

                return (
                  <GalaxyStar
                    key={species.id}
                    species={species}
                    position={{ x: pos.x, y: pos.y }}
                    orbitRadius={pos.orbitRadius}
                    orbitSpeed={species.abundance}
                    onSelect={() => handleSpeciesSelect(species)}
                    onHover={setHoveredSpecies}
                    isSelected={selectedSpecies?.id === species.id}
                  />
                );
              })}
            </svg>

            {/* Species tooltip */}
            <AnimatePresence>
              {hoveredSpecies && (
                <SpeciesTooltip
                  species={hoveredSpecies}
                  position={mousePosition}
                />
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs font-medium text-white mb-2">Legenda</p>
              <div className="space-y-1">
                {Object.entries(roleColors).map(([role, config]) => (
                  <div key={role} className="flex items-center gap-2 text-xs text-white/80">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <span>{config.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Markers */}
      <Card variant="default" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">💫</span>
            Marcadores de Saúde
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {microbiomeProfile.healthMarkers.map((marker, index) => {
              const statusConfig = {
                optimal: { color: '#10B981', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
                adequate: { color: '#3B82F6', bg: 'bg-blue-50 dark:bg-blue-950/30' },
                suboptimal: { color: '#F59E0B', bg: 'bg-amber-50 dark:bg-amber-950/30' },
                concerning: { color: '#EF4444', bg: 'bg-red-50 dark:bg-red-950/30' }
              };

              const config = statusConfig[marker.status];

              return (
                <motion.div
                  key={marker.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn('p-4 rounded-lg', config.bg)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{marker.name}</h4>
                    <span
                      className="text-sm font-medium capitalize"
                      style={{ color: config.color }}
                    >
                      {marker.status === 'optimal' ? 'Ótimo' :
                       marker.status === 'adequate' ? 'Adequado' :
                       marker.status === 'suboptimal' ? 'Subótimo' : 'Preocupante'}
                    </span>
                  </div>

                  <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: config.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${marker.score * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                    {marker.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Functional Capacity */}
      <Card variant="glass" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            Capacidade Funcional
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <FunctionalCapacityBar
              label="Ácidos Graxos de Cadeia Curta"
              value={microbiomeProfile.functionalCapacity.shortChainFattyAcids}
              icon="🧪"
              color="#10B981"
              index={0}
            />
            <FunctionalCapacityBar
              label="Produção de Vitaminas"
              value={microbiomeProfile.functionalCapacity.vitamins}
              icon="💊"
              color="#3B82F6"
              index={1}
            />
            <FunctionalCapacityBar
              label="Suporte Imunológico"
              value={microbiomeProfile.functionalCapacity.immuneSupport}
              icon="🛡️"
              color="#8B5CF6"
              index={2}
            />
            <FunctionalCapacityBar
              label="Metabolismo"
              value={microbiomeProfile.functionalCapacity.metabolism}
              icon="🔥"
              color="#F59E0B"
              index={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Selected Species Detail */}
      <AnimatePresence>
        {selectedSpecies && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card variant="elevated" padding="lg">
              <CardHeader className="flex flex-row items-start justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: roleColors[selectedSpecies.role].color }}
                  >
                    {roleColors[selectedSpecies.role].emoji}
                  </div>
                  <div>
                    <h3 className="italic">{selectedSpecies.name}</h3>
                    <p className="text-sm text-neutral-500 font-normal">
                      {selectedSpecies.phylum} → {selectedSpecies.class} → {selectedSpecies.family}
                    </p>
                  </div>
                </CardTitle>

                <button
                  onClick={() => setSelectedSpecies(null)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">Abundância</p>
                    <p className="text-2xl font-bold">{(selectedSpecies.abundance * 100).toFixed(2)}%</p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">Classificação</p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: roleColors[selectedSpecies.role].color }}
                    >
                      {roleColors[selectedSpecies.role].label}
                    </p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">Gênero</p>
                    <p className="text-lg font-semibold italic">{selectedSpecies.genus}</p>
                  </div>
                </div>

                {selectedSpecies.functions.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Funções no Organismo
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecies.functions.map((func, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-brand-primary-100 dark:bg-brand-primary-900/30 text-brand-primary-700 dark:text-brand-primary-300 rounded-full text-sm"
                        >
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MicrobiomeGalaxy;
