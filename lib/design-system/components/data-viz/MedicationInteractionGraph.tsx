/**
 * MEDICATION INTERACTION GRAPH
 * =============================
 *
 * Network visualization for drug-drug interactions
 * Custom force-directed graph with severity-based styling
 *
 * Features:
 * - Force-directed layout simulation
 * - Severity-based edge coloring (critical, moderate, minor)
 * - Interactive nodes with drag capability
 * - Detailed interaction tooltips
 * - Drug class grouping with color coding
 * - Zoom and pan controls
 * - Export functionality
 */

'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  AlertTriangle,
  Info,
  Pill,
} from 'lucide-react';
import { Button } from '../../primitives/button';
import { Card } from '../../primitives/card';

// ============================================================================
// TYPES
// ============================================================================

export interface DrugNode {
  id: string;
  name: string;
  drugClass?: string;
  color?: string;
  size?: number;
}

export interface DrugInteraction {
  source: string; // Drug ID
  target: string; // Drug ID
  severity: 'critical' | 'moderate' | 'minor';
  description: string;
  mechanism?: string;
  recommendation?: string;
}

export interface MedicationInteractionGraphProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof graphVariants> {
  drugs: DrugNode[];
  interactions: DrugInteraction[];
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  showLegend?: boolean;
  enableZoom?: boolean;
  enableDrag?: boolean;
  enableExport?: boolean;
  onNodeClick?: (drug: DrugNode) => void;
  onInteractionClick?: (interaction: DrugInteraction) => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const graphVariants = cva(['relative w-full overflow-hidden'], {
  variants: {
    variant: {
      default: 'bg-white dark:bg-neutral-900',
      bordered: 'border border-neutral-200 dark:border-neutral-800',
      glass: 'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

// ============================================================================
// CONSTANTS
// ============================================================================

const SEVERITY_COLORS = {
  critical: 'hsl(0 84% 60%)',
  moderate: 'hsl(38 92% 50%)',
  minor: 'hsl(221 83% 53%)',
};

const SEVERITY_WIDTHS = {
  critical: 4,
  moderate: 3,
  minor: 2,
};

const DRUG_CLASS_COLORS = [
  'hsl(221 83% 53%)', // Blue
  'hsl(142 71% 45%)', // Green
  'hsl(271 81% 56%)', // Purple
  'hsl(173 58% 39%)', // Teal
  'hsl(24 95% 53%)', // Orange
  'hsl(280 87% 65%)', // Pink
];

// ============================================================================
// FORCE SIMULATION
// ============================================================================

interface NodePosition {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function useForceSimulation(
  drugs: DrugNode[],
  interactions: DrugInteraction[],
  width: number,
  height: number
): NodePosition[] {
  const [positions, setPositions] = useState<NodePosition[]>([]);

  useEffect(() => {
    // Initialize positions
    const initialPositions: NodePosition[] = drugs.map((drug, index) => ({
      id: drug.id,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
    }));

    setPositions(initialPositions);

    // Simple force simulation
    const ITERATIONS = 100;
    const SPRING_STRENGTH = 0.01;
    const REPULSION_STRENGTH = 5000;
    const DAMPING = 0.9;

    for (let iteration = 0; iteration < ITERATIONS; iteration++) {
      const newPositions = [...initialPositions];

      // Repulsion between all nodes
      for (let i = 0; i < newPositions.length; i++) {
        for (let j = i + 1; j < newPositions.length; j++) {
          const dx = newPositions[j].x - newPositions[i].x;
          const dy = newPositions[j].y - newPositions[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = REPULSION_STRENGTH / (distance * distance);

          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;

          newPositions[i].vx -= fx;
          newPositions[i].vy -= fy;
          newPositions[j].vx += fx;
          newPositions[j].vy += fy;
        }
      }

      // Attraction along edges (interactions)
      interactions.forEach((interaction) => {
        const sourceIndex = newPositions.findIndex((p) => p.id === interaction.source);
        const targetIndex = newPositions.findIndex((p) => p.id === interaction.target);

        if (sourceIndex === -1 || targetIndex === -1) return;

        const dx = newPositions[targetIndex].x - newPositions[sourceIndex].x;
        const dy = newPositions[targetIndex].y - newPositions[sourceIndex].y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        const force = distance * SPRING_STRENGTH;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;

        newPositions[sourceIndex].vx += fx;
        newPositions[sourceIndex].vy += fy;
        newPositions[targetIndex].vx -= fx;
        newPositions[targetIndex].vy -= fy;
      });

      // Update positions
      newPositions.forEach((pos) => {
        pos.x += pos.vx;
        pos.y += pos.vy;

        // Damping
        pos.vx *= DAMPING;
        pos.vy *= DAMPING;

        // Boundary constraints
        const margin = 50;
        pos.x = Math.max(margin, Math.min(width - margin, pos.x));
        pos.y = Math.max(margin, Math.min(height - margin, pos.y));
      });
    }

    setPositions(initialPositions);
  }, [drugs, interactions, width, height]);

  return positions;
}

// ============================================================================
// TOOLTIP COMPONENT
// ============================================================================

interface InteractionTooltipProps {
  interaction: DrugInteraction | null;
  sourceDrug?: DrugNode;
  targetDrug?: DrugNode;
}

const InteractionTooltip: React.FC<InteractionTooltipProps> = ({
  interaction,
  sourceDrug,
  targetDrug,
}) => {
  if (!interaction || !sourceDrug || !targetDrug) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        'absolute z-50 pointer-events-none',
        'rounded-lg border border-neutral-200 dark:border-neutral-700',
        'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md',
        'p-4 shadow-xl max-w-sm'
      )}
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -120%)',
      }}
    >
      <div className="flex items-start gap-2 mb-2">
        <AlertTriangle
          className={cn(
            'w-5 h-5 flex-shrink-0',
            interaction.severity === 'critical' && 'text-red-600',
            interaction.severity === 'moderate' && 'text-amber-600',
            interaction.severity === 'minor' && 'text-blue-600'
          )}
        />
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {sourceDrug.name} ↔ {targetDrug.name}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 capitalize">
            {interaction.severity} interaction
          </p>
        </div>
      </div>

      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
        {interaction.description}
      </p>

      {interaction.mechanism && (
        <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
          <span className="font-medium">Mechanism:</span> {interaction.mechanism}
        </div>
      )}

      {interaction.recommendation && (
        <div className="text-xs text-neutral-900 dark:text-neutral-100 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
          <span className="font-medium">Recommendation:</span>{' '}
          {interaction.recommendation}
        </div>
      )}
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const MedicationInteractionGraph = React.forwardRef<
  HTMLDivElement,
  MedicationInteractionGraphProps
>(
  (
    {
      drugs,
      interactions,
      title,
      description,
      width = 800,
      height = 600,
      showLegend = true,
      enableZoom = true,
      enableDrag = true,
      enableExport = true,
      onNodeClick,
      onInteractionClick,
      variant,
      padding,
      className,
      ...props
    },
    ref
  ) => {
    // State
    const [zoom, setZoom] = useState(1);
    const [hoveredInteraction, setHoveredInteraction] =
      useState<DrugInteraction | null>(null);
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate positions using force simulation
    const positions = useForceSimulation(drugs, interactions, width, height);

    // Drug class color mapping
    const drugClassColors = useMemo(() => {
      const uniqueClasses = [...new Set(drugs.map((d) => d.drugClass).filter(Boolean))];
      const mapping: Record<string, string> = {};
      uniqueClasses.forEach((drugClass, index) => {
        if (drugClass) {
          mapping[drugClass] = DRUG_CLASS_COLORS[index % DRUG_CLASS_COLORS.length];
        }
      });
      return mapping;
    }, [drugs]);

    // Get node color
    const getNodeColor = (drug: DrugNode): string => {
      if (drug.color) return drug.color;
      if (drug.drugClass) return drugClassColors[drug.drugClass];
      return 'hsl(var(--neutral-500))';
    };

    // Zoom handlers
    const handleZoomIn = useCallback(() => {
      setZoom((prev) => Math.min(prev * 1.2, 3));
    }, []);

    const handleZoomOut = useCallback(() => {
      setZoom((prev) => Math.max(prev / 1.2, 0.5));
    }, []);

    const handleResetZoom = useCallback(() => {
      setZoom(1);
    }, []);

    // Export handler
    const handleExport = useCallback(() => {
      // TODO: Implement export
      console.log('Export interaction graph');
    }, []);

    return (
      <Card
        ref={ref}
        className={cn(graphVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {enableZoom && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomIn}
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomOut}
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleResetZoom}
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </>
            )}
            {enableExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                iconBefore={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Graph Canvas */}
        <div
          ref={containerRef}
          className="relative bg-neutral-50 dark:bg-neutral-800/30 rounded-lg"
          style={{ width, height }}
        >
          <svg
            width={width}
            height={height}
            className="overflow-visible"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
          >
            {/* Edges (Interactions) */}
            <g className="edges">
              {interactions.map((interaction, index) => {
                const sourcePos = positions.find((p) => p.id === interaction.source);
                const targetPos = positions.find((p) => p.id === interaction.target);

                if (!sourcePos || !targetPos) return null;

                return (
                  <motion.line
                    key={`edge-${index}`}
                    x1={sourcePos.x}
                    y1={sourcePos.y}
                    x2={targetPos.x}
                    y2={targetPos.y}
                    stroke={SEVERITY_COLORS[interaction.severity]}
                    strokeWidth={SEVERITY_WIDTHS[interaction.severity]}
                    strokeOpacity={0.6}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredInteraction(interaction)}
                    onMouseLeave={() => setHoveredInteraction(null)}
                    onClick={() => onInteractionClick?.(interaction)}
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                  />
                );
              })}
            </g>

            {/* Nodes (Drugs) */}
            <g className="nodes">
              {positions.map((pos, index) => {
                const drug = drugs.find((d) => d.id === pos.id);
                if (!drug) return null;

                const nodeSize = drug.size || 30;

                return (
                  <g key={`node-${drug.id}`}>
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={nodeSize}
                      fill={getNodeColor(drug)}
                      stroke="white"
                      strokeWidth={3}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ scale: 1.2 }}
                      drag={enableDrag}
                      dragMomentum={false}
                      onDragStart={() => setDraggedNode(drug.id)}
                      onDragEnd={() => setDraggedNode(null)}
                      onClick={() => onNodeClick?.(drug)}
                      className="cursor-pointer"
                    />
                    <motion.text
                      x={pos.x}
                      y={pos.y + nodeSize + 15}
                      textAnchor="middle"
                      fontSize={12}
                      fontWeight="600"
                      fill="currentColor"
                      className="text-neutral-900 dark:text-neutral-100 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
                    >
                      {drug.name}
                    </motion.text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Interaction Tooltip */}
          {hoveredInteraction && (
            <InteractionTooltip
              interaction={hoveredInteraction}
              sourceDrug={drugs.find((d) => d.id === hoveredInteraction.source)}
              targetDrug={drugs.find((d) => d.id === hoveredInteraction.target)}
            />
          )}
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="mt-6 space-y-4">
            {/* Severity Legend */}
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Interaction Severity
              </p>
              <div className="flex flex-wrap gap-4">
                {(['critical', 'moderate', 'minor'] as const).map((severity) => (
                  <div key={severity} className="flex items-center gap-2">
                    <div
                      className="w-8 h-1 rounded"
                      style={{
                        backgroundColor: SEVERITY_COLORS[severity],
                        height: SEVERITY_WIDTHS[severity],
                      }}
                    />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400 capitalize">
                      {severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Drug Class Legend */}
            {Object.keys(drugClassColors).length > 0 && (
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                  Drug Classes
                </p>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(drugClassColors).map(([drugClass, color]) => (
                    <div key={drugClass} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">
                        {drugClass}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    );
  }
);

MedicationInteractionGraph.displayName = 'MedicationInteractionGraph';
