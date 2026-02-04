import React, { useMemo } from 'react';

export interface RadarDataPoint {
  axis: string;
  value: number;
  fullMark?: number;
}

export interface RadarSeries {
  name: string;
  data: RadarDataPoint[];
  color?: string;
  opacity?: number;
}

export interface RadarChartProps {
  series: RadarSeries[];
  title?: string;
  height?: number;
  maxValue?: number;
  levels?: number;
  onPointClick?: (series: string, axis: string, value: number) => void;
}

export function RadarChart({
  series,
  title,
  height = 400,
  maxValue,
  levels = 5,
  onPointClick,
}: RadarChartProps) {
  const size = 400;
  const radius = size / 2 - 40;
  const center = size / 2;

  const { axes, calculatedMaxValue } = useMemo(() => {
    const allAxes = series[0]?.data.map((d) => d.axis) || [];
    const max = maxValue || Math.max(...series.flatMap((s) => s.data.map((d) => d.value)));
    return { axes: allAxes, calculatedMaxValue: max };
  }, [series, maxValue]);

  const angleSlice = (Math.PI * 2) / axes.length;

  const getX = (angle: number, distance: number) => center + distance * Math.cos(angle - Math.PI / 2);
  const getY = (angle: number, distance: number) => center + distance * Math.sin(angle - Math.PI / 2);

  const getPolygonPoints = (data: RadarDataPoint[]): string => {
    return data
      .map((d, i) => {
        const angle = angleSlice * i;
        const distance = (d.value / calculatedMaxValue) * radius;
        return `${getX(angle, distance)},${getY(angle, distance)}`;
      })
      .join(' ');
  };

  const colors = [
    'rgba(100, 150, 255, ',
    'rgba(150, 200, 100, ',
    'rgba(255, 150, 100, ',
    'rgba(200, 150, 255, ',
    'rgba(100, 200, 200, ',
  ];

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {title && <h3 className="text-lg font-semibold text-neutral-200">{title}</h3>}

      <svg width={size} height={size} className="border border-neutral-700 rounded mx-auto">
        {/* Concentric circles (levels) */}
        {Array.from({ length: levels }).map((_, i) => {
          const levelRadius = (radius / levels) * (i + 1);
          return (
            <circle
              key={`level-${i}`}
              cx={center}
              cy={center}
              r={levelRadius}
              fill="none"
              stroke="rgb(80, 80, 100)"
              strokeWidth={1}
              strokeDasharray="2,2"
            />
          );
        })}

        {/* Axis lines */}
        {axes.map((axis, i) => {
          const angle = angleSlice * i;
          const x = getX(angle, radius);
          const y = getY(angle, radius);
          return (
            <line key={`axis-${i}`} x1={center} y1={center} x2={x} y2={y} stroke="rgb(80, 80, 100)" strokeWidth={1} />
          );
        })}

        {/* Radar polygons */}
        {series.map((s, seriesIdx) => {
          const color = s.color || colors[seriesIdx % colors.length];
          const opacity = s.opacity ?? 0.5;

          return (
            <g key={`series-${seriesIdx}`}>
              <polygon
                points={getPolygonPoints(s.data)}
                fill={`${color}${opacity})`}
                stroke={`${color}1)`}
                strokeWidth={2}
                className="hover:opacity-80 transition-opacity"
              />

              {/* Data points */}
              {s.data.map((d, i) => {
                const angle = angleSlice * i;
                const distance = (d.value / calculatedMaxValue) * radius;
                const x = getX(angle, distance);
                const y = getY(angle, distance);

                return (
                  <circle
                    key={`point-${seriesIdx}-${i}`}
                    cx={x}
                    cy={y}
                    r={4}
                    fill={`${color}1)`}
                    stroke={`${color}1)`}
                    className="cursor-pointer hover:r-6 transition-all"
                    onClick={() => onPointClick?.(s.name, d.axis, d.value)}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Axis labels */}
        {axes.map((axis, i) => {
          const angle = angleSlice * i;
          const labelDistance = radius + 30;
          const x = getX(angle, labelDistance);
          const y = getY(angle, labelDistance);

          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-neutral-300"
            >
              {axis}
            </text>
          );
        })}

        {/* Level labels */}
        {Array.from({ length: levels }).map((_, i) => {
          const levelRadius = (radius / levels) * (i + 1);
          const percentage = Math.round(((i + 1) / levels) * 100);
          return (
            <text
              key={`level-label-${i}`}
              x={center + levelRadius}
              y={center - 5}
              className="text-xs fill-neutral-500"
            >
              {percentage}%
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        {series.map((s, i) => (
          <div key={`legend-${i}`} className="flex items-center gap-2">
            <div
              style={{
                backgroundColor: `${colors[i % colors.length]}0.8)`,
                width: 12,
                height: 12,
                borderRadius: 2,
              }}
            />
            <span className="text-neutral-300">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
