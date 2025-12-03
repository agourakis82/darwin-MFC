'use client';

import React, { memo } from 'react';
import { ecomapConnections } from '@/lib/data/caso-clinico';

// ============================================
// ECOMAPA PREMIUM - PADRÃO SBMFC
// Design Premium com Alto Contraste
// ============================================

interface EcomapProps {
  onConnectionClick?: (entity: string) => void;
  highlightedConnection?: string;
}

function Ecomap({ onConnectionClick, highlightedConnection }: EcomapProps) {
  const centerX = 400;
  const centerY = 250;

  const entityPositions: Record<string, { x: number; y: number }> = {
    'UBS Santa Maria': { x: centerX - 160, y: centerY - 120 },
    'Igreja Católica': { x: centerX + 160, y: centerY - 120 },
    'Creche Municipal': { x: centerX - 190, y: centerY + 80 },
    'Trabalho - Empresa de Ônibus': { x: centerX + 190, y: centerY + 20 },
    'Família Extensa': { x: centerX + 150, y: centerY + 140 },
    'Vizinhança': { x: centerX, y: centerY + 180 },
    'CRAS': { x: centerX - 190, y: centerY - 20 },
    'Escola (futuro)': { x: centerX - 100, y: centerY + 160 },
  };

  const getConnectionStyle = (type: string) => {
    switch (type) {
      case 'strong':
        return {
          strokeWidth: 6,
          dashArray: 'none',
          label: 'Forte',
          color: '#059669',
          bgClass: 'bg-emerald-100 dark:bg-emerald-900/40',
          borderClass: 'border-emerald-500',
          textClass: 'text-emerald-700 dark:text-emerald-300'
        };
      case 'moderate':
        return {
          strokeWidth: 4,
          dashArray: 'none',
          label: 'Moderada',
          color: '#2563eb',
          bgClass: 'bg-blue-100 dark:bg-blue-900/40',
          borderClass: 'border-blue-500',
          textClass: 'text-blue-700 dark:text-blue-300'
        };
      case 'weak':
        return {
          strokeWidth: 3,
          dashArray: '10,6',
          label: 'Fraca',
          color: '#71717a',
          bgClass: 'bg-neutral-100 dark:bg-neutral-800',
          borderClass: 'border-neutral-400',
          textClass: 'text-neutral-600 dark:text-neutral-300'
        };
      case 'stressful':
        return {
          strokeWidth: 4,
          dashArray: '6,4',
          label: 'Estressante',
          color: '#dc2626',
          bgClass: 'bg-red-100 dark:bg-red-900/40',
          borderClass: 'border-red-500',
          textClass: 'text-red-700 dark:text-red-300'
        };
      default:
        return {
          strokeWidth: 2,
          dashArray: 'none',
          label: '',
          color: '#71717a',
          bgClass: 'bg-neutral-100',
          borderClass: 'border-neutral-300',
          textClass: 'text-neutral-600'
        };
    }
  };

  const getEntityIcon = (entity: string) => {
    if (entity.includes('UBS')) return '🏥';
    if (entity.includes('Igreja')) return '⛪';
    if (entity.includes('Creche')) return '🎨';
    if (entity.includes('Trabalho')) return '🚌';
    if (entity.includes('Família')) return '👨‍👩‍👧';
    if (entity.includes('Vizinhança')) return '🏘️';
    if (entity.includes('CRAS')) return '🏛️';
    if (entity.includes('Escola')) return '📚';
    return '📍';
  };

  return (
    <div className="w-full">
      {/* Header Premium */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl blur-lg opacity-50" />
          <div className="relative w-12 h-12 rounded-2xl gradient-apple-green flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Ecomapa
          </h3>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            Relações família-comunidade
          </p>
        </div>
      </div>

      {/* SVG Container Premium */}
      <div className="relative">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 overflow-x-auto">
          <svg
            viewBox="0 0 800 500"
            className="w-full min-w-[640px] h-auto"
            style={{ maxHeight: '500px' }}
          >
            <defs>
              <filter id="ecoShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.12"/>
              </filter>

              <filter id="ecoGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines */}
            {ecomapConnections.map((conn, index) => {
              const pos = entityPositions[conn.entity];
              if (!pos) return null;

              const style = getConnectionStyle(conn.type);
              const isHighlighted = highlightedConnection === conn.entity;
              const midX = (centerX + pos.x) / 2;
              const midY = (centerY + pos.y) / 2;

              return (
                <g key={`conn-${index}`}>
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={style.color}
                    strokeWidth={isHighlighted ? style.strokeWidth + 2 : style.strokeWidth}
                    strokeDasharray={style.dashArray}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {conn.type === 'strong' && (
                    <circle cx={midX} cy={midY} r="6" fill={style.color} />
                  )}
                </g>
              );
            })}

            {/* Central Family */}
            <g filter="url(#ecoGlow)">
              <ellipse cx={centerX} cy={centerY} rx="90" ry="60" fill="#f3e8ff" />
              <ellipse cx={centerX} cy={centerY} rx="90" ry="60" fill="none" stroke="#7c3aed" strokeWidth="4" />
              <text x={centerX} y={centerY - 8} textAnchor="middle" className="text-sm font-black" fill="#6b21a8">FAMÍLIA</text>
              <text x={centerX} y={centerY + 16} textAnchor="middle" className="text-lg font-black" fill="#6b21a8">SILVA</text>
            </g>

            {/* Entity Nodes */}
            {ecomapConnections.map((conn, index) => {
              const pos = entityPositions[conn.entity];
              if (!pos) return null;

              const style = getConnectionStyle(conn.type);
              const isHighlighted = highlightedConnection === conn.entity;
              const shortName = conn.entity.split(' - ')[0].split(' (')[0];
              const icon = getEntityIcon(conn.entity);

              return (
                <g
                  key={`entity-${index}`}
                  className="cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => onConnectionClick?.(conn.entity)}
                  filter="url(#ecoShadow)"
                >
                  <ellipse cx={pos.x} cy={pos.y} rx="68" ry="38" fill="white" className="dark:fill-neutral-800" />
                  <ellipse
                    cx={pos.x}
                    cy={pos.y}
                    rx="68"
                    ry="38"
                    fill="none"
                    stroke={isHighlighted ? '#7c3aed' : style.color}
                    strokeWidth={isHighlighted ? 4 : 3}
                  />
                  <text x={pos.x} y={pos.y - 6} textAnchor="middle" className="text-lg">{icon}</text>
                  <text x={pos.x} y={pos.y + 14} textAnchor="middle" className="text-[11px] font-bold" fill={style.color}>
                    {shortName.length > 14 ? shortName.substring(0, 14) + '...' : shortName}
                  </text>
                  <text x={pos.x} y={pos.y + 28} textAnchor="middle" className="text-[10px] font-semibold" fill="#71717a">
                    {style.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Premium Legend */}
      <div className="mt-6 p-5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
        <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
          Tipos de Relação
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-1.5 rounded-full bg-emerald-600" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Forte</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-1 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Moderada</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-0.5 rounded-full bg-neutral-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #71717a 0px, #71717a 4px, transparent 4px, transparent 8px)' }} />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Fraca</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-1 rounded-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #dc2626 0px, #dc2626 3px, transparent 3px, transparent 6px)' }} />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Estressante</span>
          </div>
        </div>

        {/* Connection Details */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <h5 className="text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider mb-3">
            Detalhes das Conexões
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ecomapConnections.map((conn, i) => {
              const style = getConnectionStyle(conn.type);
              const icon = getEntityIcon(conn.entity);
              const shortName = conn.entity.split(' - ')[0].split(' (')[0];

              return (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${style.bgClass} border ${style.borderClass}`}>
                  <span className="text-lg flex-shrink-0">{icon}</span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold ${style.textClass} truncate`}>{shortName}</p>
                    <p className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed mt-0.5">
                      {conn.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Ecomap);
