import React, { useMemo } from 'react';

export interface BoxPlotData {
  label: string;
  values: number[];
  color?: string;
  referenceRange?: { min: number; max: number };
}

export interface BoxPlotProps {
  data: BoxPlotData[];
  title?: string;
  height?: number;
  width?: number;
  yAxisLabel?: string;
  formatValue?: (value: number) => string;
  onOutlierClick?: (label: string, value: number) => void;
}

interface CalculatedBoxPlot {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers: number[];
  iqr: number;
  color: string;
  refMin?: number;
  refMax?: number;
}

const calculateQuartiles = (values: number[]): [number, number, number] => {
  const sorted = [...values].sort((a, b) => a - b);
  const q2 = sorted[Math.floor(sorted.length / 2)];
  const q1 = sorted[Math.floor(sorted.length / 4)];
  const q3 = sorted[Math.floor((sorted.length * 3) / 4)];
  return [q1, q2, q3];
};

export function BoxPlot({
  data,
  title,
  height = 400,
  width = 700,
  yAxisLabel,
  formatValue = (v) => v.toFixed(1),
  onOutlierClick,
}: BoxPlotProps) {
  const padding = { top: 20, right: 20, bottom: 50, left: 60 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const calculatedData = useMemo(() => {
    return data.map((d, idx) => {
      const sorted = [...d.values].sort((a, b) => a - b);
      const [q1, median, q3] = calculateQuartiles(d.values);
      const iqr = q3 - q1;
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;

      const min = sorted.find((v) => v >= lowerBound) || sorted[0];
      const max = sorted.findLast((v) => v <= upperBound) || sorted[sorted.length - 1];
      const outliers = sorted.filter((v) => v < lowerBound || v > upperBound);

      return {
        label: d.label,
        min,
        q1,
        median,
        q3,
        max,
        outliers,
        iqr,
        color: d.color || 'rgb(100, 150, 255)',
        refMin: d.referenceRange?.min,
        refMax: d.referenceRange?.max,
      };
    });
  }, [data]);

  const allValues = calculatedData.flatMap((d) => [d.min, d.max, ...(d.outliers || [])]);
  const yMin = Math.min(...allValues) * 0.9;
  const yMax = Math.max(...allValues) * 1.1;
  const yRange = yMax - yMin;

  const boxWidth = plotWidth / data.length / 2.5;
  const getY = (value: number) => padding.top + plotHeight - ((value - yMin) / yRange) * plotHeight;
  const getX = (index: number) => padding.left + (index * plotWidth) / data.length + plotWidth / (data.length * 2);

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {title && <h3 className="text-lg font-semibold text-neutral-200">{title}</h3>}

      <svg width={width} height={height} className="border border-neutral-700 rounded">
        {/* Reference range background (if applicable) */}
        {calculatedData[0]?.refMin !== undefined && (
          <rect
            x={padding.left}
            y={getY(calculatedData[0].refMax || yMax)}
            width={plotWidth}
            height={getY(calculatedData[0].refMin || yMin) - getY(calculatedData[0].refMax || yMax)}
            fill="rgba(100, 200, 100, 0.1)"
            stroke="rgba(100, 200, 100, 0.3)"
            strokeDasharray="2,2"
          />
        )}

        {/* Y-axis label */}
        <text x={15} y={padding.top + plotHeight / 2} textAnchor="middle" className="text-xs fill-neutral-400">
          {yAxisLabel}
        </text>

        {/* Y-axis ticks and labels */}
        {Array.from({ length: 6 }).map((_, i) => {
          const value = yMin + (yRange * i) / 5;
          const y = getY(value);
          return (
            <g key={`ytick-${i}`}>
              <line x1={padding.left - 5} y1={y} x2={padding.left} y2={y} stroke="rgb(80, 80, 100)" strokeWidth={1} />
              <text x={padding.left - 10} y={y + 3} textAnchor="end" className="text-xs fill-neutral-400">
                {formatValue(value)}
              </text>
            </g>
          );
        })}

        {/* Y-axis line */}
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="rgb(80, 80, 100)" strokeWidth={1} />

        {/* X-axis line */}
        <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="rgb(80, 80, 100)" strokeWidth={1} />

        {/* Box plots */}
        {calculatedData.map((box, idx) => {
          const x = getX(idx);
          const whiskerWidth = boxWidth * 0.5;

          return (
            <g key={`box-${idx}`}>
              {/* Whiskers (min-max lines) */}
              <line
                x1={x}
                y1={getY(box.min)}
                x2={x}
                y2={getY(box.max)}
                stroke={box.color}
                strokeWidth={1}
                opacity={0.6}
              />

              {/* Min cap */}
              <line
                x1={x - whiskerWidth}
                y1={getY(box.min)}
                x2={x + whiskerWidth}
                y2={getY(box.min)}
                stroke={box.color}
                strokeWidth={2}
              />

              {/* Max cap */}
              <line
                x1={x - whiskerWidth}
                y1={getY(box.max)}
                x2={x + whiskerWidth}
                y2={getY(box.max)}
                stroke={box.color}
                strokeWidth={2}
              />

              {/* Box (Q1-Q3) */}
              <rect
                x={x - boxWidth}
                y={getY(box.q3)}
                width={boxWidth * 2}
                height={Math.abs(getY(box.q1) - getY(box.q3))}
                fill={box.color}
                stroke={box.color}
                strokeWidth={2}
                opacity={0.6}
              />

              {/* Median line */}
              <line
                x1={x - boxWidth}
                y1={getY(box.median)}
                x2={x + boxWidth}
                y2={getY(box.median)}
                stroke="rgb(255, 255, 255)"
                strokeWidth={2}
              />

              {/* Outliers */}
              {box.outliers.map((outlier, oIdx) => (
                <circle
                  key={`outlier-${idx}-${oIdx}`}
                  cx={x}
                  cy={getY(outlier)}
                  r={3}
                  fill={box.color}
                  stroke={box.color}
                  strokeWidth={2}
                  className="cursor-pointer hover:r-5 transition-all"
                  onClick={() => onOutlierClick?.(box.label, outlier)}
                />
              ))}

              {/* X-axis label */}
              <text x={x} y={height - padding.bottom + 20} textAnchor="middle" className="text-xs font-medium fill-neutral-300">
                {box.label.length > 15 ? box.label.slice(0, 12) + '…' : box.label}
              </text>
            </g>
          );
        })}

        {/* Reference range legend */}
        {calculatedData[0]?.refMin !== undefined && (
          <g>
            <rect x={width - 150} y={padding.top + 10} width={10} height={10} fill="rgba(100, 200, 100, 0.3)" stroke="rgba(100, 200, 100, 0.5)" />
            <text x={width - 135} y={padding.top + 18} className="text-xs fill-neutral-400">
              Reference range
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="text-xs text-neutral-400">
        <p>Box shows interquartile range (Q1-Q3), line is median. Whiskers extend to min/max values. Dots are outliers.</p>
      </div>
    </div>
  );
}
