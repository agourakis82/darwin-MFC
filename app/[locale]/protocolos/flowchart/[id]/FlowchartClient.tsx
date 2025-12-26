'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Protocolo, ProtocolNode } from '@/lib/types/protocolo';
import FlowchartEngine from '@/app/components/Flowchart/FlowchartEngine';
import { useLocalizedProtocol } from '@/app/hooks/useLocalizedProtocol';

interface FlowchartClientProps {
  protocolo: Protocolo;
}

const categoriaColors: Record<string, { color: string; icon: string }> = {
  urgencia: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: '🚨' },
  cronico: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: '📅' },
  preventivo: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: '🛡️' },
  materno_infantil: { color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200', icon: '👶' },
  saude_mental: { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', icon: '🧠' },
  infectologia: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: '🦠' },
  cardiovascular: { color: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200', icon: '❤️' },
  endocrino: { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200', icon: '🔬' },
  respiratorio: { color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200', icon: '🫁' },
  gastro: { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200', icon: '🍽️' },
  dermatologia: { color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200', icon: '🩹' },
  musculoesqueletico: { color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200', icon: '🦴' },
};

const complexidadeColors: Record<string, string> = {
  basico: 'bg-green-500',
  intermediario: 'bg-yellow-500',
  avancado: 'bg-red-500',
};

export default function FlowchartClient({ protocolo }: FlowchartClientProps) {
  const t = useTranslations('flowchart');
  const [showInfo, setShowInfo] = useState(true);
  const [selectedNode, setSelectedNode] = useState<ProtocolNode | null>(null);
  
  // Adaptar protocolo ao locale atual
  const localizedProtocol = useLocalizedProtocol(protocolo);

  const categoriaInfo = categoriaColors[localizedProtocol.categoria] || { color: 'bg-gray-100 text-gray-800', icon: '📋' };
  const complexidadeColor = complexidadeColors[localizedProtocol.complexidade];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/protocolos"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>←</span>
                <span>{t('backToProtocols')}</span>
              </Link>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600" />
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  {localizedProtocol.titulo}
                </h1>
                {localizedProtocol.subtitulo && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {localizedProtocol.subtitulo}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Badges */}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoriaInfo.color}`}>
                {categoriaInfo.icon} {t(`categories.${localizedProtocol.categoria}`)}
              </span>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${complexidadeColor}`} />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t(`complexity.${localizedProtocol.complexidade}`)}
                </span>
              </div>

              {/* Toggle Info */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`p-2 rounded-lg transition-colors ${
                  showInfo
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                }`}
                title={showInfo ? t('hideInfo') : t('showInfo')}
              >
                ℹ️
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Painel de Informações */}
        {showInfo && (
          <aside className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Descrição */}
              <section>
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                  {t('sections.description')}
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {localizedProtocol.descricao}
                </p>
              </section>

              {/* Objetivos */}
              <section>
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                  🎯 {t('sections.objectives')}
                </h2>
                <ul className="space-y-1">
                  {localizedProtocol.objetivos.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </section>

              {/* População Alvo */}
              <section>
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                  👥 {t('sections.targetPopulation')}
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {localizedProtocol.populacaoAlvo}
                </p>
              </section>

              {/* Sinais de Alerta */}
              {localizedProtocol.sinaisAlerta && localizedProtocol.sinaisAlerta.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-2">
                    ⚠️ {t('sections.warningSignals')}
                  </h2>
                  <ul className="space-y-1">
                    {localizedProtocol.sinaisAlerta.map((sinal, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400"
                      >
                        <span>•</span>
                        {sinal}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Códigos */}
              <section>
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                  📋 {t('sections.codes')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {localizedProtocol.ciap2?.map((code) => (
                    <span
                      key={code}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded font-mono"
                    >
                      CIAP-2: {code}
                    </span>
                  ))}
                  {localizedProtocol.cid10?.map((code) => (
                    <span
                      key={code}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded font-mono"
                    >
                      CID-10: {code}
                    </span>
                  ))}
                </div>
              </section>

              {/* Medicamentos Relacionados */}
              {localizedProtocol.medicamentosRelacionados && localizedProtocol.medicamentosRelacionados.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                    💊 {t('sections.medications')}
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    {localizedProtocol.medicamentosRelacionados.map((med) => (
                      <Link
                        key={med}
                        href={`/medicamentos/${med}`}
                        className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 text-xs rounded hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors"
                      >
                        {med}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Doenças Relacionadas */}
              {localizedProtocol.doencasRelacionadas && localizedProtocol.doencasRelacionadas.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                    🩺 {t('sections.relatedDiseases')}
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    {localizedProtocol.doencasRelacionadas.map((doenca) => (
                      <Link
                        key={doenca}
                        href={`/doencas/${doenca}`}
                        className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs rounded hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
                      >
                        {doenca}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Encaminhamento */}
              {localizedProtocol.encaminhamento && (
                <section>
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                    🏥 {t('sections.whenToRefer')}
                  </h2>
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      {t('referral.to')}: {localizedProtocol.encaminhamento.paraCQuem}
                    </p>
                    <ul className="space-y-1">
                      {localizedProtocol.encaminhamento.quando.map((crit, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1">
                          <span className="text-pink-500">→</span>
                          {crit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Metadados */}
              <section className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-400 space-y-1">
                  <p>{t('metadata.version')}: {localizedProtocol.versao}</p>
                  <p>{t('metadata.update')}: {localizedProtocol.ultimaAtualizacao}</p>
                  <p>{t('metadata.source')}: {localizedProtocol.fonte}</p>
                </div>
              </section>
            </div>
          </aside>
        )}

        {/* Área do Fluxograma */}
        <main className="flex-1 relative">
          <FlowchartEngine
            nodes={localizedProtocol.nodes}
            edges={localizedProtocol.edges}
            onNodeClick={setSelectedNode}
            showMiniMap={true}
            showControls={true}
            interactive={true}
            className="h-full"
          />

          {/* Legenda */}
          <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
              {t('legend.title')}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500" />
                <span className="text-slate-600 dark:text-slate-300">{t('legend.start')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-indigo-500" />
                <span className="text-slate-600 dark:text-slate-300">{t('legend.end')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-500" />
                <span className="text-slate-600 dark:text-slate-300">{t('legend.decision')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-slate-600 dark:text-slate-300">{t('legend.action')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-purple-500" />
                <span className="text-slate-600 dark:text-slate-300">{t('legend.assessment')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-cyan-500" />
                <span className="text-slate-600 dark:text-slate-300">{t('legend.treatment')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-pink-500" />
                <span className="text-slate-600 dark:text-slate-300">{t('legend.refer')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-500" />
                <span className="text-slate-600 dark:text-slate-300">{t('legend.alert')}</span>
              </div>
            </div>
          </div>

          {/* Instruções */}
          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-lg px-3 py-2 text-xs text-slate-500 dark:text-slate-400">
            💡 {t('instructions')}
          </div>
        </main>
      </div>
    </div>
  );
}

