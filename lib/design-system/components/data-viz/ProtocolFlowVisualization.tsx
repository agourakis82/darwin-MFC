/**
 * PROTOCOL FLOW VISUALIZATION
 * ============================
 *
 * Interactive flowchart for clinical protocols and decision trees
 * Custom SVG-based renderer with hierarchical layout
 *
 * Features:
 * - Hierarchical tree layout (top-to-bottom or left-to-right)
 * - Multiple node types (decision, action, condition, outcome)
 * - Interactive nodes with expand/collapse
 * - Animated transitions
 * - Path highlighting
 * - Export to PNG/SVG
 * - Responsive zoom and pan
 */

'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  GitBranch,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Activity,
} from 'lucide-react';
import { Button } from '../../primitives/button';
import { Card } from '../../primitives/card';

// ============================================================================
// TYPES
// ============================================================================

export type FlowNodeType = 'start' | 'decision' | 'action' | 'condition' | 'outcome' | 'end';

export interface FlowNode {
  id: string;
  type: FlowNodeType;
  label: string;
  description?: string;
  children?: string[]; // IDs of child nodes
  metadata?: Record<string, any>;
  collapsed?: boolean;
}

export interface FlowEdge {
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

export interface NodePosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  level: number;
}

export interface ProtocolFlowVisualizationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flowVariants> {
  nodes: FlowNode[];
  edges?: FlowEdge[];
  title?: string;
  description?: string;
  direction?: 'vertical' | 'horizontal';
  width?: number;
  height?: number;
  showMinimap?: boolean;
  enableZoom?: boolean;
  enableExport?: boolean;
  onNodeClick?: (node: FlowNode) => void;
  onPathSelect?: (path: FlowNode[]) => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const flowVariants = cva(['relative w-full overflow-hidden'], {
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
// NODE CONFIGURATIONS
// ============================================================================

const nodeConfigs = {
  start: {
    color: 'hsl(142 71% 45%)',
    icon: Activity,
    width: 120,
    height: 60,
    shape: 'roundedRect',
  },
  decision: {
    color: 'hsl(38 92% 50%)',
    icon: GitBranch,
    width: 140,
    height: 70,
    shape: 'diamond',
  },
  action: {
    color: 'hsl(221 83% 53%)',
    icon: CheckCircle,
    width: 150,
    height: 70,
    shape: 'rect',
  },
  condition: {
    color: 'hsl(271 81% 56%)',
    icon: HelpCircle,
    width: 130,
    height: 65,
    shape: 'roundedRect',
  },
  outcome: {
    color: 'hsl(173 58% 39%)',
    icon: CheckCircle,
    width: 140,
    height: 70,
    shape: 'rect',
  },
  end: {
    color: 'hsl(0 84% 60%)',
    icon: AlertCircle,
    width: 120,
    height: 60,
    shape: 'roundedRect',
  },
};

// ============================================================================
// LAYOUT CALCULATOR
// ============================================================================

function calculateLayout(
  nodes: FlowNode[],
  direction: 'vertical' | 'horizontal'
): NodePosition[] {
  const positions: NodePosition[] = [];
  const levelGap = direction === 'vertical' ? 150 : 200;
  const siblingGap = direction === 'vertical' ? 200 : 120;

  // Build tree structure
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const rootNodes = nodes.filter(
    (node) => !nodes.some((n) => n.children?.includes(node.id))
  );

  // BFS to assign levels
  const levels: Map<string, number> = new Map();
  const queue: { id: string; level: number }[] = rootNodes.map((n) => ({
    id: n.id,
    level: 0,
  }));

  while (queue.length > 0) {
    const { id, level } = queue.shift()!;
    levels.set(id, level);

    const node = nodeMap.get(id);
    if (node?.children && !node.collapsed) {
      node.children.forEach((childId) => {
        queue.push({ id: childId, level: level + 1 });
      });
    }
  }

  // Calculate positions level by level
  const levelNodes: Map<number, string[]> = new Map();
  levels.forEach((level, id) => {
    if (!levelNodes.has(level)) levelNodes.set(level, []);
    levelNodes.get(level)!.push(id);
  });

  levelNodes.forEach((nodeIds, level) => {
    nodeIds.forEach((id, index) => {
      const node = nodeMap.get(id)!;
      const config = nodeConfigs[node.type];

      if (direction === 'vertical') {
        positions.push({
          id,
          x: index * siblingGap + 100,
          y: level * levelGap + 50,
          width: config.width,
          height: config.height,
          level,
        });
      } else {
        positions.push({
          id,
          x: level * levelGap + 50,
          y: index * siblingGap + 100,
          width: config.width,
          height: config.height,
          level,
        });
      }
    });
  });

  return positions;
}

// ============================================================================
// NODE COMPONENT
// ============================================================================

interface FlowNodeComponentProps {
  node: FlowNode;
  position: NodePosition;
  isSelected: boolean;
  direction: 'vertical' | 'horizontal';
  onClick: () => void;
  onToggleCollapse: () => void;
}

const FlowNodeComponent: React.FC<FlowNodeComponentProps> = ({
  node,
  position,
  isSelected,
  direction,
  onClick,
  onToggleCollapse,
}) => {
  const config = nodeConfigs[node.type];
  const Icon = config.icon;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      {/* Node shape */}
      {config.shape === 'diamond' ? (
        <motion.path
          d={`M ${position.x + position.width / 2} ${position.y}
              L ${position.x + position.width} ${position.y + position.height / 2}
              L ${position.x + position.width / 2} ${position.y + position.height}
              L ${position.x} ${position.y + position.height / 2} Z`}
          fill={config.color}
          fillOpacity={0.9}
          stroke={isSelected ? 'white' : 'transparent'}
          strokeWidth={isSelected ? 4 : 2}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      ) : (
        <motion.rect
          x={position.x}
          y={position.y}
          width={position.width}
          height={position.height}
          rx={config.shape === 'roundedRect' ? 8 : 0}
          fill={config.color}
          fillOpacity={0.9}
          stroke={isSelected ? 'white' : 'transparent'}
          strokeWidth={isSelected ? 4 : 2}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Label */}
      <text
        x={position.x + position.width / 2}
        y={position.y + position.height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={13}
        fontWeight="600"
        fill="white"
        className="pointer-events-none select-none"
      >
        {node.label.length > 20 ? node.label.substring(0, 20) + '...' : node.label}
      </text>

      {/* Collapse/Expand button */}
      {hasChildren && (
        <motion.g
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse();
          }}
          whileHover={{ scale: 1.2 }}
          className="cursor-pointer"
        >
          <circle
            cx={position.x + position.width - 15}
            cy={position.y + position.height - 15}
            r={12}
            fill="white"
            stroke={config.color}
            strokeWidth={2}
          />
          {node.collapsed ? (
            <ChevronRight
              className="w-4 h-4"
              style={{
                x: position.x + position.width - 23,
                y: position.y + position.height - 23,
              }}
            />
          ) : (
            <ChevronDown
              className="w-4 h-4"
              style={{
                x: position.x + position.width - 23,
                y: position.y + position.height - 23,
              }}
            />
          )}
        </motion.g>
      )}
    </motion.g>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ProtocolFlowVisualization = React.forwardRef<
  HTMLDivElement,
  ProtocolFlowVisualizationProps
>(
  (
    {
      nodes: initialNodes,
      edges: providedEdges,
      title,
      description,
      direction = 'vertical',
      width = 1000,
      height = 800,
      showMinimap = false,
      enableZoom = true,
      enableExport = true,
      onNodeClick,
      onPathSelect,
      variant,
      padding,
      className,
      ...props
    },
    ref
  ) => {
    // State
    const [nodes, setNodes] = useState(initialNodes);
    const [zoom, setZoom] = useState(1);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate edges if not provided
    const edges = useMemo(() => {
      if (providedEdges) return providedEdges;

      const calculatedEdges: FlowEdge[] = [];
      nodes.forEach((node) => {
        if (node.children && !node.collapsed) {
          node.children.forEach((childId) => {
            calculatedEdges.push({ source: node.id, target: childId });
          });
        }
      });
      return calculatedEdges;
    }, [nodes, providedEdges]);

    // Calculate layout
    const positions = useMemo(
      () => calculateLayout(nodes, direction),
      [nodes, direction]
    );

    // Handlers
    const handleNodeClick = useCallback(
      (node: FlowNode) => {
        setSelectedNode(node.id);
        onNodeClick?.(node);
      },
      [onNodeClick]
    );

    const handleToggleCollapse = useCallback((nodeId: string) => {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === nodeId ? { ...node, collapsed: !node.collapsed } : node
        )
      );
    }, []);

    const handleZoomIn = useCallback(() => {
      setZoom((prev) => Math.min(prev * 1.2, 3));
    }, []);

    const handleZoomOut = useCallback(() => {
      setZoom((prev) => Math.max(prev / 1.2, 0.5));
    }, []);

    const handleResetZoom = useCallback(() => {
      setZoom(1);
    }, []);

    const handleExport = useCallback(() => {
      // TODO: Implement export
      console.log('Export protocol flow');
    }, []);

    return (
      <Card
        ref={ref}
        className={cn(flowVariants({ variant, padding }), className)}
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

        {/* Flow Canvas */}
        <div
          ref={containerRef}
          className="relative bg-neutral-50 dark:bg-neutral-800/30 rounded-lg overflow-auto"
          style={{ width, height }}
        >
          <svg
            width={width}
            height={height}
            className="overflow-visible"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
          >
            {/* Edges */}
            <g className="edges">
              {edges.map((edge, index) => {
                const sourcePos = positions.find((p) => p.id === edge.source);
                const targetPos = positions.find((p) => p.id === edge.target);

                if (!sourcePos || !targetPos) return null;

                const x1 =
                  direction === 'vertical'
                    ? sourcePos.x + sourcePos.width / 2
                    : sourcePos.x + sourcePos.width;
                const y1 =
                  direction === 'vertical'
                    ? sourcePos.y + sourcePos.height
                    : sourcePos.y + sourcePos.height / 2;
                const x2 =
                  direction === 'vertical'
                    ? targetPos.x + targetPos.width / 2
                    : targetPos.x;
                const y2 =
                  direction === 'vertical'
                    ? targetPos.y
                    : targetPos.y + targetPos.height / 2;

                // Bezier curve for smooth connections
                const controlPoint1X = direction === 'vertical' ? x1 : (x1 + x2) / 2;
                const controlPoint1Y = direction === 'vertical' ? (y1 + y2) / 2 : y1;
                const controlPoint2X = direction === 'vertical' ? x2 : (x1 + x2) / 2;
                const controlPoint2Y = direction === 'vertical' ? (y1 + y2) / 2 : y2;

                return (
                  <motion.path
                    key={`edge-${index}`}
                    d={`M ${x1} ${y1} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${x2} ${y2}`}
                    stroke="hsl(var(--neutral-400))"
                    strokeWidth={2}
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                  />
                );
              })}
            </g>

            {/* Arrowhead marker */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3, 0 6"
                  fill="hsl(var(--neutral-400))"
                />
              </marker>
            </defs>

            {/* Nodes */}
            <g className="nodes">
              <AnimatePresence>
                {positions.map((position) => {
                  const node = nodes.find((n) => n.id === position.id);
                  if (!node) return null;

                  return (
                    <FlowNodeComponent
                      key={node.id}
                      node={node}
                      position={position}
                      isSelected={selectedNode === node.id}
                      direction={direction}
                      onClick={() => handleNodeClick(node)}
                      onToggleCollapse={() => handleToggleCollapse(node.id)}
                    />
                  );
                })}
              </AnimatePresence>
            </g>
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
            Node Types
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {(Object.keys(nodeConfigs) as FlowNodeType[]).map((type) => {
              const config = nodeConfigs[type];
              const Icon = config.icon;
              return (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: config.color }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 capitalize">
                    {type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    );
  }
);

ProtocolFlowVisualization.displayName = 'ProtocolFlowVisualization';
