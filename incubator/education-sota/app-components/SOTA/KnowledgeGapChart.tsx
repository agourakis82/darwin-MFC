'use client';

/**
 * KNOWLEDGE GAP CHART
 * ===================
 *
 * Radar chart visualization for knowledge gap analysis.
 * Shows mastery levels across different areas.
 */

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts';

// =============================================================================
// TYPES
// =============================================================================

interface GapItem {
  id: string;
  name: string;
  level: number;
  priority: string;
}

interface KnowledgeGapChartProps {
  criticalGaps: GapItem[];
  moderateGaps: GapItem[];
  strengths: GapItem[];
}

// =============================================================================
// COMPONENT
// =============================================================================

export function KnowledgeGapChart({
  criticalGaps,
  moderateGaps,
  strengths,
}: KnowledgeGapChartProps) {
  // Combine all areas for the chart
  const allAreas = [
    ...criticalGaps.map((g) => ({ ...g, category: 'critical' })),
    ...moderateGaps.map((g) => ({ ...g, category: 'moderate' })),
    ...strengths.map((g) => ({ ...g, category: 'strength' })),
  ];

  // Limit to 10 items for readability
  const chartData = allAreas.slice(0, 10).map((area) => ({
    name: area.name.length > 15 ? area.name.substring(0, 12) + '...' : area.name,
    fullName: area.name,
    level: area.level,
    target: 80, // Target mastery level
    category: area.category,
  }));

  // If not enough data, show placeholder
  if (chartData.length < 3) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        <p>Dados insuficientes para visualização</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            tickCount={5}
          />

          {/* Target line */}
          <Radar
            name="Meta (80%)"
            dataKey="target"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.1}
            strokeDasharray="5 5"
          />

          {/* Current level */}
          <Radar
            name="Nível Atual"
            dataKey="level"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.4}
            strokeWidth={2}
          />

          <Tooltip
            content={({ payload, label }) => {
              if (payload && payload.length > 0) {
                const data = payload[0].payload;
                return (
                  <div className="bg-popover border rounded-lg p-3 shadow-lg">
                    <p className="font-medium">{data.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      Nível: <span className="font-medium text-foreground">{data.level}%</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Meta: <span className="font-medium text-foreground">{data.target}%</span>
                    </p>
                    <div className="mt-1">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded ${
                          data.category === 'critical'
                            ? 'bg-red-500/10 text-red-500'
                            : data.category === 'moderate'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-green-500/10 text-green-500'
                        }`}
                      >
                        {data.category === 'critical'
                          ? 'Crítico'
                          : data.category === 'moderate'
                          ? 'Moderado'
                          : 'Forte'}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => (
              <span className="text-sm text-muted-foreground">{value}</span>
            )}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default KnowledgeGapChart;
