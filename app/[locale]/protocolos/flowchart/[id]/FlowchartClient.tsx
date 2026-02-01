'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Protocolo, ProtocolNode } from '@/lib/types/protocolo';
import FlowchartEngine from '@/app/components/Flowchart/FlowchartEngine';
import { PageContainer } from '@/app/components/Layout/Containers';
import { useLocalizedProtocol } from '@/app/hooks/useLocalizedProtocol';
import {
  ArrowLeft, Shield, Clock, BookOpen, Layers,
  Settings, Download, Share2, Info, ChevronRight, Activity,
  AlertTriangle, PanelLeftClose, PanelLeft, ZoomIn, Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowchartClientProps {
  protocolo: Protocolo;
}

export default function FlowchartClient({ protocolo }: FlowchartClientProps) {
  const t = useTranslations('flowchart');
  const [activeTab, setActiveTab] = useState<'flow' | 'details' | 'evidence'>('flow');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Collapsed by default for max flowchart space

  const localizedProtocol = useLocalizedProtocol(protocolo);

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-neutral-950 flex flex-col">
      {/* Header - Compact, clinical grade */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-[100]">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-3">
            <Link href="/protocolos" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
                {localizedProtocol.titulo}
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {localizedProtocol.categoria} • v{localizedProtocol.versao}
              </p>
            </div>
          </div>

          {/* Center: Tab Navigation */}
          <div className="hidden md:flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            {[
              { id: 'flow', label: 'Fluxograma', icon: Layers },
              { id: 'details', label: 'Etapas', icon: BookOpen },
              { id: 'evidence', label: 'Evidências', icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2",
                  activeTab === tab.id
                    ? "bg-white dark:bg-neutral-900 text-teal-700 dark:text-teal-300 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Toggle sidebar button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={cn(
                "p-2.5 rounded-lg border transition-colors flex items-center gap-2",
                sidebarOpen
                  ? "bg-teal-100 dark:bg-teal-900 border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
              <span className="hidden lg:inline text-sm font-medium">
                {sidebarOpen ? 'Ocultar Info' : 'Mostrar Info'}
              </span>
            </button>

            <button className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex border-t border-neutral-200 dark:border-neutral-800">
          {[
            { id: 'flow', label: 'Fluxograma', icon: Layers },
            { id: 'details', label: 'Etapas', icon: BookOpen },
            { id: 'evidence', label: 'Evidências', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2",
                activeTab === tab.id
                  ? "text-teal-700 dark:text-teal-300 border-b-2 border-teal-500"
                  : "text-neutral-500"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Red Flags Banner - Always visible if present */}
      {localizedProtocol.sinaisAlerta && localizedProtocol.sinaisAlerta.length > 0 && (
        <div className="bg-red-600 text-white px-4 py-3">
          <div className="flex items-center gap-3 max-w-7xl mx-auto">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1 flex items-center gap-4 overflow-x-auto">
              <span className="font-bold whitespace-nowrap">SINAIS DE ALERTA:</span>
              {localizedProtocol.sinaisAlerta.map((s, i) => (
                <span key={i} className="text-base whitespace-nowrap">{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Sidebar */}
        <aside
          className={cn(
            "border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-y-auto transition-all duration-300",
            sidebarOpen ? "w-80 lg:w-96" : "w-0"
          )}
        >
          {sidebarOpen && (
            <div className="p-5 space-y-6 w-80 lg:w-96">
              {/* Description */}
              <section className="bg-teal-50 dark:bg-teal-950/40 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
                <h4 className="text-sm font-bold text-teal-800 dark:text-teal-200 uppercase tracking-wider mb-2">
                  Resumo
                </h4>
                <p className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {localizedProtocol.descricao}
                </p>
              </section>

              {/* Objectives */}
              <section>
                <h4 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                  Objetivos
                </h4>
                <ul className="space-y-2">
                  {localizedProtocol.objetivos.map((obj, i) => (
                    <li key={i} className="flex gap-2 text-base text-neutral-800 dark:text-neutral-200">
                      <ChevronRight className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Codes */}
              <section>
                <h4 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                  Códigos
                </h4>
                <div className="flex flex-wrap gap-2">
                  {localizedProtocol.ciap2?.map(c => (
                    <span key={c} className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      CIAP: {c}
                    </span>
                  ))}
                  {localizedProtocol.cid10?.map(c => (
                    <span key={c} className="bg-teal-100 dark:bg-teal-900 px-3 py-1.5 rounded-lg text-sm font-semibold text-teal-700 dark:text-teal-300">
                      CID: {c}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          )}
        </aside>

        {/* Workspace - Maximum space for flowchart */}
        <main className="flex-1 relative bg-neutral-100 dark:bg-neutral-950">
          {activeTab === 'flow' && (
            <div className="w-full h-full">
              <FlowchartEngine
                nodes={localizedProtocol.nodes}
                edges={localizedProtocol.edges}
              />

              {/* Fullscreen hint */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm">
                <ZoomIn className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Use scroll para zoom • Arraste para mover
                </span>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="h-full overflow-y-auto">
              <div className="max-w-3xl mx-auto py-8 px-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 border-l-4 border-teal-500 pl-4">
                  Etapas do Protocolo
                </h2>
                <div className="space-y-4">
                  {localizedProtocol.nodes.filter(n => n.data.label).map((n, i) => (
                    <div key={n.id} className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm p-5 flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-lg font-bold text-teal-700 dark:text-teal-300 shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                          {n.data.label}
                        </h4>
                        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {n.data.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="h-full overflow-y-auto">
              <div className="max-w-3xl mx-auto py-8 px-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 border-l-4 border-teal-500 pl-4">
                  Base de Evidências
                </h2>
                <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                  <p className="text-base text-neutral-600 dark:text-neutral-400">
                    Referências e evidências científicas serão exibidas aqui.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}