import React, { useState, useMemo } from 'react';

export interface TreemapNode {
  id: string;
  label: string;
  value: number;
  color?: string;
  children?: TreemapNode[];
}

export interface TreemapProps {
  data: TreemapNode;
  title?: string;
  height?: number;
  onNodeClick?: (node: TreemapNode) => void;
  formatValue?: (value: number) => string;
  maxDepth?: number;
}

interface CalculatedRect {
  id: string;
  label: string;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  color: string;
}

const calculateTreemap = (
  node: TreemapNode,
  x: number,
  y: number,
  width: number,
  height: number,
  depth: number,
  maxDepth: number,
  rects: CalculatedRect[]
): void => {
  if (depth > maxDepth) return;

  if (depth > 0) {
    rects.push({
      id: node.id,
      label: node.label,
      value: node.value,
      x,
      y,
      width,
      height,
      depth,
      color: node.color || generateColor(depth),
    });
  }

  if (!node.children || node.children.length === 0) return;

  const children = node.children.sort((a, b) => b.value - a.value);
  const totalValue = children.reduce((sum, c) => sum + c.value, 0);

  let dx = x;
  let dy = y;
  let remainingWidth = width;
  let remainingHeight = height;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const ratio = child.value / totalValue;

    if (remainingWidth > remainingHeight) {
      const childWidth = remainingWidth * ratio;
      calculateTreemap(child, dx, dy, childWidth, remainingHeight, depth + 1, maxDepth, rects);
      dx += childWidth;
      remainingWidth -= childWidth;
    } else {
      const childHeight = remainingHeight * ratio;
      calculateTreemap(child, dx, dy, remainingWidth, childHeight, depth + 1, maxDepth, rects);
      dy += childHeight;
      remainingHeight -= childHeight;
    }
  }
};

const generateColor = (depth: number): string => {
  const colors = [
    'rgb(100, 150, 255)',
    'rgb(150, 200, 255)',
    'rgb(100, 200, 150)',
    'rgb(200, 150, 100)',
    'rgb(255, 150, 100)',
  ];
  return colors[depth % colors.length];
};

export function Treemap({
  data,
  title,
  height = 500,
  onNodeClick,
  formatValue = (v) => v.toFixed(0),
  maxDepth = 3,
}: TreemapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const rects = useMemo(() => {
    const result: CalculatedRect[] = [];
    calculateTreemap(data, 20, 20, 760, height - 40, 0, maxDepth, result);
    return result;
  }, [data, height, maxDepth]);

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {title && <h3 className="text-lg font-semibold text-neutral-200">{title}</h3>}

      <svg width="100%" height={height} style={{ minHeight: height }} className="border border-neutral-700 rounded">
        {rects.map((rect) => (
          <g
            key={rect.id}
            onClick={() => onNodeClick?.(data)}
            onMouseEnter={() => setHoveredId(rect.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer"
          >
            {/* Rectangle */}
            <rect
              x={rect.x}
              y={rect.y}
              width={Math.max(0, rect.width)}
              height={Math.max(0, rect.height)}
              fill={rect.color}
              stroke={hoveredId === rect.id ? 'rgb(255, 255, 255)' : 'rgb(50, 50, 50)'}
              strokeWidth={hoveredId === rect.id ? 3 : 1}
              opacity={hoveredId === rect.id ? 1 : 0.8}
              className="transition-all"
            />

            {/* Label */}
            {rect.width > 50 && rect.height > 40 && (
              <>
                <text
                  x={rect.x + rect.width / 2}
                  y={rect.y + rect.height / 2 - 10}
                  textAnchor="middle"
                  className="text-sm font-semibold fill-neutral-900"
                  pointerEvents="none"
                >
                  {rect.label.length > 20 ? rect.label.slice(0, 17) + '…' : rect.label}
                </text>
                <text
                  x={rect.x + rect.width / 2}
                  y={rect.y + rect.height / 2 + 10}
                  textAnchor="middle"
                  className="text-xs fill-neutral-700"
                  pointerEvents="none"
                >
                  {formatValue(rect.value)}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="text-xs text-neutral-400">
        <p>Rectangle size represents relative value. Click to explore hierarchies.</p>
      </div>
    </div>
  );
}
