import React, { useState } from 'react';

const BRAZIL_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

export interface GeoMapData {
  state: string;
  value: number;
  label?: string;
}

export interface GeoMapProps {
  title?: string;
  data: GeoMapData[];
  colorScheme?: 'sequential' | 'diverging';
  formatValue?: (value: number) => string;
  onStateClick?: (state: string, value: number) => void;
}

// Simplified Brazil map approximation
const getStatePosition = (state: string): { x: number; y: number } => {
  const positions: Record<string, { x: number; y: number }> = {
    AC: { x: 100, y: 400 }, AL: { x: 550, y: 550 }, AP: { x: 550, y: 100 },
    AM: { x: 250, y: 150 }, BA: { x: 550, y: 450 }, CE: { x: 500, y: 350 },
    DF: { x: 450, y: 350 }, ES: { x: 600, y: 400 }, GO: { x: 400, y: 380 },
    MA: { x: 450, y: 300 }, MT: { x: 350, y: 300 }, MS: { x: 350, y: 400 },
    MG: { x: 550, y: 380 }, PA: { x: 400, y: 200 }, PB: { x: 550, y: 380 },
    PR: { x: 500, y: 450 }, PE: { x: 560, y: 360 }, PI: { x: 480, y: 330 },
    RJ: { x: 600, y: 420 }, RN: { x: 550, y: 350 }, RS: { x: 450, y: 500 },
    RO: { x: 200, y: 350 }, RR: { x: 300, y: 80 }, SC: { x: 500, y: 470 },
    SP: { x: 520, y: 440 }, SE: { x: 560, y: 430 }, TO: { x: 380, y: 270 },
  };
  return positions[state] || { x: 400, y: 350 };
};

const getColor = (value: number, min: number, max: number, scheme: 'sequential' | 'diverging') => {
  const normalized = (value - min) / (max - min);

  if (scheme === 'diverging') {
    if (normalized < 0.5) {
      const t = normalized * 2;
      return `rgb(255, ${Math.round(200 + t * 55)}, ${Math.round(200 + t * 55)})`;
    } else {
      const t = (normalized - 0.5) * 2;
      return `rgb(${Math.round(200 - t * 155)}, ${Math.round(200 - t * 155)}, 255)`;
    }
  } else {
    const intensity = Math.round(normalized * 200);
    return `rgb(100, ${180 + intensity}, 150)`;
  }
};

export function GeoMap({
  title,
  data,
  colorScheme = 'sequential',
  formatValue = (v) => v.toFixed(1),
  onStateClick,
}: GeoMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const dataMap = new Map(data.map((d) => [d.state, d]));

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {title && <h3 className="text-lg font-semibold text-neutral-200">{title}</h3>}

      <div className="flex flex-col items-center gap-4">
        <svg width="700" height="600" className="border border-neutral-700 rounded" viewBox="0 0 700 600">
          {/* Simplified Brazil outline (very basic) */}
          <rect x="100" y="50" width="500" height="450" fill="rgba(100, 100, 120, 0.1)" stroke="rgb(100, 100, 120)" strokeWidth={2} />

          {/* State circles */}
          {BRAZIL_STATES.map((state) => {
            const pos = getStatePosition(state);
            const stateData = dataMap.get(state);
            const color = stateData ? getColor(stateData.value, min, max, colorScheme) : 'rgb(80, 80, 100)';
            const isHovered = hoveredState === state;

            return (
              <g
                key={state}
                onClick={() => stateData && onStateClick?.(state, stateData.value)}
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                className={stateData ? 'cursor-pointer' : ''}
              >
                {/* Circle for state */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHovered ? 20 : 15}
                  fill={color}
                  stroke={isHovered ? 'rgb(255, 255, 255)' : 'rgb(100, 100, 120)'}
                  strokeWidth={isHovered ? 3 : 1}
                  opacity={isHovered ? 1 : 0.7}
                  className="transition-all"
                />

                {/* State abbreviation */}
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  className="text-xs font-bold fill-neutral-900"
                  pointerEvents="none"
                >
                  {state}
                </text>

                {/* Tooltip on hover */}
                {isHovered && stateData && (
                  <g>
                    <rect
                      x={pos.x - 40}
                      y={pos.y - 40}
                      width={80}
                      height={35}
                      fill="rgb(30, 30, 40)"
                      stroke="rgb(150, 150, 200)"
                      strokeWidth={1}
                      rx={4}
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 25}
                      textAnchor="middle"
                      className="text-xs font-semibold fill-neutral-200"
                      pointerEvents="none"
                    >
                      {state}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y - 10}
                      textAnchor="middle"
                      className="text-xs fill-neutral-300"
                      pointerEvents="none"
                    >
                      {formatValue(stateData.value)}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Color scale legend */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>{formatValue(min)}</span>
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: getColor(min + ((max - min) * i) / 10, min, max, colorScheme),
                  border: '1px solid #333',
                }}
              />
            ))}
          </div>
          <span>{formatValue(max)}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="text-xs text-neutral-400">
        <p>Click on states to view detailed data. Larger circles indicate higher values.</p>
      </div>
    </div>
  );
}
