import React, { useState, useMemo } from 'react';

export interface NetworkNode {
  id: string;
  label: string;
  type?: 'medication' | 'gene' | 'disease' | 'symptom';
  value?: number;
  color?: string;
}

export interface NetworkEdge {
  source: string;
  target: string;
  weight?: number;
  type?: 'interacts' | 'causes' | 'treats' | 'metabolizes';
  label?: string;
}

export interface NetworkGraphProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  title?: string;
  height?: number;
  width?: number;
  onNodeClick?: (nodeId: string) => void;
  onEdgeClick?: (edge: NetworkEdge) => void;
}

interface CalculatedPosition {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

// Simple force-directed layout algorithm
const calculateLayout = (
  nodes: NetworkNode[],
  edges: NetworkEdge[],
  width: number,
  height: number,
  iterations: number = 50
): Map<string, CalculatedPosition> => {
  const positions = new Map<string, CalculatedPosition>();

  // Initialize positions randomly
  nodes.forEach((node) => {
    positions.set(node.id, {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
    });
  });

  // Force-directed simulation
  for (let iter = 0; iter < iterations; iter++) {
    // Reset forces
    positions.forEach((pos) => {
      pos.vx = 0;
      pos.vy = 0;
    });

    // Repulsive forces (between all nodes)
    const nodeArray = Array.from(positions.entries());
    for (let i = 0; i < nodeArray.length; i++) {
      for (let j = i + 1; j < nodeArray.length; j++) {
        const [, pos1] = nodeArray[i];
        const [, pos2] = nodeArray[j];

        const dx = pos2.x - pos1.x || 0.1;
        const dy = pos2.y - pos1.y || 0.1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = (50 * 50) / (dist * dist);

        pos1.vx! -= (force * dx) / dist;
        pos1.vy! -= (force * dy) / dist;
        pos2.vx! += (force * dx) / dist;
        pos2.vy! += (force * dy) / dist;
      }
    }

    // Attractive forces (along edges)
    edges.forEach((edge) => {
      const pos1 = positions.get(edge.source);
      const pos2 = positions.get(edge.target);

      if (!pos1 || !pos2) return;

      const dx = pos2.x - pos1.x;
      const dy = pos2.y - pos1.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
      const force = (dist * dist) / 50;

      pos1.vx! += (force * dx) / dist;
      pos1.vy! += (force * dy) / dist;
      pos2.vx! -= (force * dx) / dist;
      pos2.vy! -= (force * dy) / dist;
    });

    // Update positions
    positions.forEach((pos) => {
      const vMag = Math.sqrt(pos.vx! * pos.vx! + pos.vy! * pos.vy!);
      const maxV = 2;
      if (vMag > maxV) {
        pos.vx! = (pos.vx! / vMag) * maxV;
        pos.vy! = (pos.vy! / vMag) * maxV;
      }

      pos.x += pos.vx! * 0.1;
      pos.y += pos.vy! * 0.1;

      // Keep within bounds
      pos.x = Math.max(30, Math.min(width - 30, pos.x));
      pos.y = Math.max(30, Math.min(height - 30, pos.y));
    });
  }

  return positions;
};

const getNodeColor = (node: NetworkNode): string => {
  if (node.color) return node.color;
  switch (node.type) {
    case 'medication':
      return 'rgb(100, 150, 255)';
    case 'gene':
      return 'rgb(255, 150, 100)';
    case 'disease':
      return 'rgb(100, 255, 150)';
    case 'symptom':
      return 'rgb(255, 200, 100)';
    default:
      return 'rgb(150, 150, 200)';
  }
};

export function NetworkGraph({
  nodes,
  edges,
  title,
  height = 600,
  width = 800,
  onNodeClick,
  onEdgeClick,
}: NetworkGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const positions = useMemo(() => calculateLayout(nodes, edges, width, height), [nodes, edges, width, height]);

  const edgeStrokeStyle = (edge: NetworkEdge) => {
    switch (edge.type) {
      case 'interacts':
        return { strokeWidth: 2, strokeDasharray: '0', opacity: 0.6 };
      case 'causes':
        return { strokeWidth: 1.5, strokeDasharray: '5,3', opacity: 0.5 };
      case 'treats':
        return { strokeWidth: 2, strokeDasharray: '0', opacity: 0.6 };
      case 'metabolizes':
        return { strokeWidth: 1, strokeDasharray: '2,2', opacity: 0.4 };
      default:
        return { strokeWidth: 1, strokeDasharray: '0', opacity: 0.5 };
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {title && <h3 className="text-lg font-semibold text-neutral-200">{title}</h3>}

      <svg width={width} height={height} className="border border-neutral-700 rounded bg-neutral-900">
        {/* Edges */}
        {edges.map((edge, idx) => {
          const pos1 = positions.get(edge.source);
          const pos2 = positions.get(edge.target);

          if (!pos1 || !pos2) return null;

          const style = edgeStrokeStyle(edge);

          return (
            <g key={`edge-${idx}`} onClick={() => onEdgeClick?.(edge)} className="cursor-pointer">
              <line
                x1={pos1.x}
                y1={pos1.y}
                x2={pos2.x}
                y2={pos2.y}
                stroke="rgb(100, 150, 200)"
                {...style}
                className="hover:stroke-neutral-100 transition-colors"
              />

              {/* Edge label */}
              {edge.label && (
                <text
                  x={(pos1.x + pos2.x) / 2}
                  y={(pos1.y + pos2.y) / 2 - 5}
                  textAnchor="middle"
                  className="text-xs fill-neutral-500 pointer-events-none"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = positions.get(node.id);
          if (!pos) return null;

          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode === node.id;
          const radius = isHovered || isSelected ? 12 : 8;
          const color = getNodeColor(node);

          return (
            <g
              key={`node-${node.id}`}
              onClick={() => {
                onNodeClick?.(node.id);
                setSelectedNode(isSelected ? null : node.id);
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              {/* Shadow for selected nodes */}
              {isSelected && <circle cx={pos.x} cy={pos.y} r={radius + 4} fill="none" stroke="rgb(200, 200, 255)" strokeWidth={1} opacity={0.3} />}

              {/* Node circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={radius}
                fill={color}
                stroke={isHovered || isSelected ? 'rgb(255, 255, 255)' : 'rgba(200, 200, 200, 0.5)'}
                strokeWidth={isHovered || isSelected ? 2 : 1}
                opacity={isHovered || isSelected ? 1 : 0.8}
                className="transition-all"
              />

              {/* Node label */}
              <text
                x={pos.x}
                y={pos.y + 20}
                textAnchor="middle"
                className="text-xs font-medium fill-neutral-300 pointer-events-none"
              >
                {node.label.length > 12 ? node.label.slice(0, 10) + '…' : node.label}
              </text>

              {/* Tooltip on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={pos.x - 50}
                    y={pos.y - 50}
                    width={100}
                    height={40}
                    fill="rgb(30, 30, 40)"
                    stroke="rgb(150, 150, 200)"
                    strokeWidth={1}
                    rx={4}
                  />
                  <text x={pos.x} y={pos.y - 32} textAnchor="middle" className="text-xs font-semibold fill-neutral-200" pointerEvents="none">
                    {node.label}
                  </text>
                  <text x={pos.x} y={pos.y - 18} textAnchor="middle" className="text-xs fill-neutral-400" pointerEvents="none">
                    {node.type || 'entity'}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="font-semibold text-neutral-300 mb-2">Node Types:</p>
          {['medication', 'gene', 'disease', 'symptom'].map((type) => (
            <div key={type} className="flex items-center gap-2 mb-1">
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    type === 'medication'
                      ? 'rgb(100, 150, 255)'
                      : type === 'gene'
                        ? 'rgb(255, 150, 100)'
                        : type === 'disease'
                          ? 'rgb(100, 255, 150)'
                          : 'rgb(255, 200, 100)',
                }}
              />
              <span className="text-neutral-400 capitalize">{type}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="font-semibold text-neutral-300 mb-2">Edge Types:</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <line x1="0" y1="5" x2="20" y2="5" stroke="rgb(100, 150, 200)" strokeWidth="2" />
              <span className="text-neutral-400 text-xs">Interacts</span>
            </div>
            <div className="flex items-center gap-2">
              <line x1="0" y1="5" x2="20" y2="5" stroke="rgb(100, 150, 200)" strokeWidth="1.5" strokeDasharray="5,3" />
              <span className="text-neutral-400 text-xs">Causes</span>
            </div>
            <div className="flex items-center gap-2">
              <line x1="0" y1="5" x2="20" y2="5" stroke="rgb(100, 150, 200)" strokeWidth="1" strokeDasharray="2,2" />
              <span className="text-neutral-400 text-xs">Metabolizes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
