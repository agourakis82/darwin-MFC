import React, { useMemo } from 'react';
import { Tooltip, ResponsiveContainer, Cell } from 'recharts';

export interface HeatmapData {
  row: string;
  column: string;
  value: number;
  intensity?: 'low' | 'medium' | 'high';
}

export interface HeatmapProps {
  data: HeatmapData[];
  title?: string;
  rows: string[];
  columns: string[];
  colorScheme?: 'sequential' | 'diverging';
  min?: number;
  max?: number;
  tooltipFormatter?: (value: number) => string;
  onClick?: (data: HeatmapData) => void;
  cellSize?: number;
  showLabels?: boolean;
}

const getIntensityColor = (value: number, min: number, max: number, scheme: 'sequential' | 'diverging') => {
  const normalized = (value - min) / (max - min);

  if (scheme === 'diverging') {
    // Diverging: red (low) → white (mid) → blue (high)
    if (normalized < 0.5) {
      const t = normalized * 2;
      return `rgb(255, ${Math.round(200 + t * 55)}, ${Math.round(200 + t * 55)})`;
    } else {
      const t = (normalized - 0.5) * 2;
      return `rgb(${Math.round(200 - t * 155)}, ${Math.round(200 - t * 155)}, 255)`;
    }
  } else {
    // Sequential: light (low) → dark (high)
    const intensity = Math.round(normalized * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  }
};

export function Heatmap({
  data,
  title,
  rows,
  columns,
  colorScheme = 'sequential',
  min,
  max,
  tooltipFormatter = (v) => v.toFixed(1),
  onClick,
  cellSize = 40,
  showLabels = true,
}: HeatmapProps) {
  const { calculatedMin, calculatedMax } = useMemo(() => {
    const values = data.map((d) => d.value);
    return {
      calculatedMin: min !== undefined ? min : Math.min(...values),
      calculatedMax: max !== undefined ? max : Math.max(...values),
    };
  }, [data, min, max]);

  const getLabelFontSize = () => {
    if (cellSize < 30) return '10px';
    if (cellSize < 50) return '12px';
    return '14px';
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      {title && <h3 className="text-lg font-semibold text-neutral-200">{title}</h3>}

      <div className="flex flex-col gap-2 overflow-auto">
        {/* Column headers */}
        <div className="flex gap-0">
          <div style={{ width: cellSize * 1.5 }} />
          {columns.map((col) => (
            <div
              key={col}
              style={{ width: cellSize }}
              className="flex items-center justify-center text-xs font-medium text-neutral-400"
            >
              {col}
            </div>
          ))}
        </div>

        {/* Heatmap rows */}
        {rows.map((row) => (
          <div key={row} className="flex gap-0">
            {/* Row label */}
            <div
              style={{ width: cellSize * 1.5 }}
              className="flex items-center text-xs font-medium text-neutral-400 pr-2"
            >
              {showLabels ? row : ''}
            </div>

            {/* Heatmap cells */}
            {columns.map((col) => {
              const cellData = data.find((d) => d.row === row && d.column === col);
              const value = cellData?.value ?? 0;
              const color = getIntensityColor(value, calculatedMin, calculatedMax, colorScheme);

              return (
                <div
                  key={`${row}-${col}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: color,
                    cursor: cellData ? 'pointer' : 'default',
                  }}
                  className="flex items-center justify-center border border-neutral-700 hover:opacity-80 transition-opacity"
                  onClick={() => cellData && onClick?.(cellData)}
                  title={cellData ? `${row} × ${col}: ${tooltipFormatter(value)}` : ''}
                >
                  {cellSize > 40 && (
                    <span style={{ fontSize: getLabelFontSize() }} className="text-neutral-900 font-semibold">
                      {tooltipFormatter(value)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-4">
        <span>Low</span>
        <div className="flex gap-1">
          {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
            <div
              key={intensity}
              style={{
                width: 20,
                height: 20,
                backgroundColor: getIntensityColor(
                  calculatedMin + (calculatedMax - calculatedMin) * intensity,
                  calculatedMin,
                  calculatedMax,
                  colorScheme
                ),
                border: '1px solid #333',
              }}
            />
          ))}
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
