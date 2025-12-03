'use client';

import React, { memo } from 'react';

// ============================================
// GENOGRAMA PREMIUM - PADRÃO SBMFC
// Design Premium com Alto Contraste
// ============================================

interface GenogramProps {
  onMemberClick?: (memberId: string) => void;
  highlightedMember?: string;
}

function Genogram({ onMemberClick, highlightedMember }: GenogramProps) {
  return (
    <div className="w-full">
      {/* Header Premium */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50" />
          <div className="relative w-12 h-12 rounded-2xl gradient-apple-blue flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Genograma Familiar
          </h3>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            Família Silva • 3 gerações
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
              {/* Premium Gradients - High Saturation */}
              <linearGradient id="maleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>

              <linearGradient id="femaleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>

              <linearGradient id="indexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>

              <linearGradient id="gestationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              {/* Fill gradients - visible in both modes */}
              <linearGradient id="maleFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dbeafe" />
                <stop offset="100%" stopColor="#bfdbfe" />
              </linearGradient>

              <linearGradient id="femaleFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fce7f3" />
                <stop offset="100%" stopColor="#fbcfe8" />
              </linearGradient>

              <linearGradient id="indexFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="100%" stopColor="#e9d5ff" />
              </linearGradient>

              <linearGradient id="gestationFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
              </linearGradient>

              {/* Filters */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15"/>
              </filter>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines - High Contrast */}
            <g className="connection-lines">
              <line x1="250" y1="80" x2="350" y2="80" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <line x1="300" y1="80" x2="300" y2="150" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <line x1="200" y1="150" x2="500" y2="150" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <line x1="200" y1="150" x2="200" y2="180" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <line x1="500" y1="150" x2="500" y2="180" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <line x1="500" y1="230" x2="500" y2="280" stroke="#a1a1aa" strokeWidth="2" strokeDasharray="6,4" strokeLinecap="round" />
              <line x1="460" y1="330" x2="540" y2="330" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <line x1="500" y1="330" x2="500" y2="380" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <line x1="420" y1="380" x2="580" y2="380" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <line x1="420" y1="380" x2="420" y2="400" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
              <line x1="580" y1="380" x2="580" y2="400" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* José (Avô) */}
            <g
              className="cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => onMemberClick?.('jose')}
              filter={highlightedMember === 'jose' ? 'url(#glow)' : 'url(#shadow)'}
            >
              <rect x="195" y="50" width="55" height="55" rx="8" fill="url(#maleFill)" />
              <rect x="195" y="50" width="55" height="55" rx="8" fill="none" stroke="url(#maleGrad)" strokeWidth={highlightedMember === 'jose' ? 4 : 3} />
              <text x="222" y="125" textAnchor="middle" className="text-xs font-bold" fill="#1e3a8a">José</text>
              <text x="222" y="140" textAnchor="middle" className="text-xs font-semibold" fill="#3b82f6">70 anos</text>
            </g>

            {/* Maria (Avó) */}
            <g
              className="cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => onMemberClick?.('maria')}
              filter={highlightedMember === 'maria' ? 'url(#glow)' : 'url(#shadow)'}
            >
              <circle cx="377" cy="77" r="28" fill="url(#femaleFill)" />
              <circle cx="377" cy="77" r="28" fill="none" stroke="url(#femaleGrad)" strokeWidth={highlightedMember === 'maria' ? 4 : 3} />
              <text x="377" y="125" textAnchor="middle" className="text-xs font-bold" fill="#9d174d">Maria</text>
              <text x="377" y="140" textAnchor="middle" className="text-xs font-semibold" fill="#ec4899">68 anos</text>
            </g>

            {/* Pedro (Filho) */}
            <g
              className="cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => onMemberClick?.('pedro')}
              filter={highlightedMember === 'pedro' ? 'url(#glow)' : 'url(#shadow)'}
            >
              <rect x="172" y="180" width="55" height="55" rx="8" fill="url(#maleFill)" />
              <rect x="172" y="180" width="55" height="55" rx="8" fill="none" stroke="url(#maleGrad)" strokeWidth={highlightedMember === 'pedro' ? 4 : 3} />
              <text x="200" y="255" textAnchor="middle" className="text-xs font-bold" fill="#1e3a8a">Pedro</text>
              <text x="200" y="270" textAnchor="middle" className="text-xs font-semibold" fill="#3b82f6">58 anos</text>
            </g>

            {/* Lúcia (Filha - Falecida) */}
            <g className="opacity-60" filter="url(#shadow)">
              <circle cx="500" cy="207" r="28" fill="#f5f5f5" />
              <circle cx="500" cy="207" r="28" fill="none" stroke="#9ca3af" strokeWidth="2" />
              <line x1="480" y1="187" x2="520" y2="227" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" />
              <line x1="520" y1="187" x2="480" y2="227" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" />
              <text x="500" y="255" textAnchor="middle" className="text-xs font-bold" fill="#6b7280">Lúcia †</text>
              <text x="500" y="270" textAnchor="middle" className="text-xs font-semibold" fill="#9ca3af">55 anos</text>
            </g>

            {/* Carlos */}
            <g
              className="cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => onMemberClick?.('carlos')}
              filter={highlightedMember === 'carlos' ? 'url(#glow)' : 'url(#shadow)'}
            >
              <rect x="405" y="300" width="55" height="55" rx="8" fill="url(#maleFill)" />
              <rect x="405" y="300" width="55" height="55" rx="8" fill="none" stroke="url(#maleGrad)" strokeWidth={highlightedMember === 'carlos' ? 4 : 3} />
              <text x="432" y="375" textAnchor="middle" className="text-xs font-bold" fill="#1e3a8a">Carlos</text>
              <text x="432" y="390" textAnchor="middle" className="text-xs font-semibold" fill="#3b82f6">35 anos</text>
            </g>

            {/* Ana (Pessoa Índice) */}
            <g
              className="cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={() => onMemberClick?.('ana')}
              filter={highlightedMember === 'ana' ? 'url(#glow)' : 'url(#shadow)'}
            >
              <circle cx="567" cy="327" r="30" fill="url(#indexFill)" />
              <circle cx="567" cy="327" r="30" fill="none" stroke="url(#indexGrad)" strokeWidth="4" />
              <circle cx="567" cy="327" r="10" fill="url(#indexGrad)" />
              <text x="567" y="375" textAnchor="middle" className="text-xs font-black" fill="#6b21a8">Ana ●</text>
              <text x="567" y="390" textAnchor="middle" className="text-xs font-bold" fill="#a855f7">32a • G2P1</text>
            </g>

            {/* Lucas */}
            <g
              className="cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => onMemberClick?.('lucas')}
              filter={highlightedMember === 'lucas' ? 'url(#glow)' : 'url(#shadow)'}
            >
              <rect x="392" y="405" width="50" height="50" rx="8" fill="url(#maleFill)" />
              <rect x="392" y="405" width="50" height="50" rx="8" fill="none" stroke="url(#maleGrad)" strokeWidth={highlightedMember === 'lucas' ? 4 : 3} />
              <text x="417" y="472" textAnchor="middle" className="text-xs font-bold" fill="#1e3a8a">Lucas</text>
              <text x="417" y="486" textAnchor="middle" className="text-[10px] font-bold" fill="#d97706">2a • atraso fala</text>
            </g>

            {/* Bebê (Gestação) */}
            <g
              className="cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => onMemberClick?.('bebe')}
              filter={highlightedMember === 'bebe' ? 'url(#glow)' : 'url(#shadow)'}
            >
              <polygon points="580,410 555,455 605,455" fill="url(#gestationFill)" />
              <polygon points="580,410 555,455 605,455" fill="none" stroke="url(#gestationGrad)" strokeWidth={highlightedMember === 'bebe' ? 4 : 3} strokeLinejoin="round" />
              <text x="580" y="472" textAnchor="middle" className="text-xs font-bold" fill="#047857">Bebê</text>
              <text x="580" y="486" textAnchor="middle" className="text-xs font-semibold" fill="#10b981">28 sem</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Premium Legend */}
      <div className="mt-6 p-5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
        <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          Legenda SBMFC
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">♂</span>
            </div>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Homem</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-100 border-2 border-pink-500 flex items-center justify-center">
              <span className="text-xs font-bold text-pink-600">♀</span>
            </div>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Mulher</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-emerald-500" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Gestação</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
            </div>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Pessoa índice</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-neutral-400 flex items-center justify-center opacity-60">
              <span className="text-xs font-bold text-neutral-500">✕</span>
            </div>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Falecido(a)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 rounded-full bg-neutral-500" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Casamento</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-6 flex flex-col items-center justify-center">
              <div className="w-0.5 h-full bg-neutral-500 rounded-full" />
            </div>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Filiação</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 border-t-2 border-dashed border-neutral-400" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">De falecido</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Genogram);
