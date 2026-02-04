import React, { useMemo } from 'react';

export interface SankeyNode {
  id: string;
  label: string;
  color?: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
  label?: string;
}

export interface SankeyProps {
  nodes: SankeyNode[];
  links: SankeyLink[];
  title?: string;
  height?: number;
  onNodeClick?: (nodeId: string) => void;
  onLinkClick?: (link: SankeyLink) => void;
  formatValue?: (value: number) => string;
}

interface CalculatedNode extends SankeyNode {
  x: number;
  y: number;
  totalInput: number;
  totalOutput: number;
  index: number;
}

interface CalculatedLink extends SankeyLink {
  sourceIndex: number;
  targetIndex: number;
  sourceY: number;
  targetY: number;
  width: number;
}

export function Sankey({
  nodes,
  links,
  title,
  height = 400,
  onNodeClick,
  onLinkClick,
  formatValue = (v) => v.toFixed(0),
}: SankeyProps) {
  const { calculatedNodes, calculatedLinks } = useMemo(() => {
    const margin = { top: 20, right: 160, bottom: 20, left: 160 };
    const width = 800;

    // Calculate node positions
    const nodeMap = new Map(nodes.map((n, i) => [n.id, { ...n, index: i }]));
    const depths = new Map<string, number>();
    const visited = new Set<string>();

    // Calculate depth for each node using BFS
    const queue: string[] = [];
    nodes.forEach((n) => {
      const incoming = links.filter((l) => l.target === n.id);
      if (incoming.length === 0) {
        depths.set(n.id, 0);
        queue.push(n.id);
      }
    });

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      const outgoing = links.filter((l) => l.source === nodeId);
      outgoing.forEach((l) => {
        const currentDepth = depths.get(nodeId) ?? 0;
        if (!depths.has(l.target) || depths.get(l.target)! < currentDepth + 1) {
          depths.set(l.target, currentDepth + 1);
          queue.push(l.target);
        }
      });
    }

    const maxDepth = Math.max(...Array.from(depths.values()), 1);
    const nodeWidth = (width - margin.left - margin.right) / (maxDepth + 1);

    // Calculate input/output totals
    const inputTotals = new Map<string, number>();
    const outputTotals = new Map<string, number>();
    links.forEach((l) => {
      inputTotals.set(l.target, (inputTotals.get(l.target) ?? 0) + l.value);
      outputTotals.set(l.source, (outputTotals.get(l.source) ?? 0) + l.value);
    });

    // Group nodes by depth and assign Y positions
    const nodesByDepth = new Map<number, string[]>();
    depths.forEach((depth, nodeId) => {
      if (!nodesByDepth.has(depth)) nodesByDepth.set(depth, []);
      nodesByDepth.get(depth)!.push(nodeId);
    });

    const calculatedNodes = nodes.map((n, nodeIndex): CalculatedNode => {
      const depth = depths.get(n.id) ?? 0;
      const nodesAtDepth = nodesByDepth.get(depth) ?? [];
      const indexAtDepth = nodesAtDepth.indexOf(n.id);
      const nodeSpacing = (height - margin.top - margin.bottom) / Math.max(nodesAtDepth.length, 1);

      return {
        ...n,
        index: nodeIndex,
        x: margin.left + depth * nodeWidth,
        y: margin.top + indexAtDepth * nodeSpacing,
        totalInput: inputTotals.get(n.id) ?? 0,
        totalOutput: outputTotals.get(n.id) ?? 0,
      };
    });

    // Calculate links with curved paths
    const calculatedLinks = links.map((l): CalculatedLink => {
      const sourceNode = calculatedNodes.find((n) => n.id === l.source)!;
      const targetNode = calculatedNodes.find((n) => n.id === l.target)!;
      const maxLinkValue = Math.max(...links.map((lk) => lk.value));

      return {
        ...l,
        sourceIndex: sourceNode.index,
        targetIndex: targetNode.index,
        sourceY: sourceNode.y,
        targetY: targetNode.y,
        width: Math.max(1, (l.value / maxLinkValue) * 30),
      };
    });

    return { calculatedNodes, calculatedLinks };
  }, [nodes, links, height]);

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {title && <h3 className="text-lg font-semibold text-neutral-200">{title}</h3>}

      <svg width="100%" height={height} style={{ minHeight: height }} className="border border-neutral-700 rounded">
        {/* Links */}
        {calculatedLinks.map((link, idx) => {
          const x1 = calculatedNodes[link.sourceIndex].x + 80;
          const y1 = calculatedNodes[link.sourceIndex].y;
          const x2 = calculatedNodes[link.targetIndex].x - 80;
          const y2 = calculatedNodes[link.targetIndex].y;

          const controlX = (x1 + x2) / 2;
          const d = `M${x1},${y1} C${controlX},${y1} ${controlX},${y2} ${x2},${y2}`;

          return (
            <g key={`link-${idx}`}>
              <path
                d={d}
                fill="none"
                stroke="rgba(100, 200, 255, 0.3)"
                strokeWidth={link.width}
                strokeLinecap="round"
                className="hover:opacity-70 transition-opacity cursor-pointer"
                onClick={() => onLinkClick?.(link)}
              />
              {/* Link label */}
              {calculatedLinks.length < 10 && (
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 5}
                  textAnchor="middle"
                  className="text-xs fill-neutral-400"
                  pointerEvents="none"
                >
                  {formatValue(link.value)}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {calculatedNodes.map((node) => (
          <g key={`node-${node.id}`} onClick={() => onNodeClick?.(node.id)} className="cursor-pointer">
            {/* Node rectangle */}
            <rect
              x={node.x - 40}
              y={node.y - 20}
              width={80}
              height={40}
              fill={node.color || 'rgb(100, 150, 255)'}
              stroke="rgb(150, 180, 255)"
              strokeWidth={2}
              rx={4}
              className="hover:opacity-80 transition-opacity"
            />

            {/* Node label */}
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              className="text-xs font-medium fill-neutral-900"
              pointerEvents="none"
            >
              {node.label.length > 15 ? node.label.slice(0, 13) + '…' : node.label}
            </text>

            {/* Flow values */}
            <text
              x={node.x}
              y={node.y + 18}
              textAnchor="middle"
              className="text-xs fill-neutral-600"
              pointerEvents="none"
            >
              {formatValue(node.totalOutput || node.totalInput)}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="text-xs text-neutral-400">
        <p>Flow width represents relative magnitude. Wider paths indicate larger patient volumes.</p>
      </div>
    </div>
  );
}
