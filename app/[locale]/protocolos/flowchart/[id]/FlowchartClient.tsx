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
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowchartClientProps {
  protocolo: Protocolo;
}

export default function FlowchartClient({ protocolo }: FlowchartClientProps) {
  const t = useTranslations('flowchart');
  const [activeTab, setActiveTab] = useState<'flow' | 'details' | 'evidence'>('flow');
  
  const localizedProtocol = useLocalizedProtocol(protocolo);

  return (
    <div className="min-h-screen bg-paper-white dark:bg-carbon-950 flex flex-col">
      {/* 0. Clinical HUD Header */}
      <header className="bg-white dark:bg-carbon-900 border-b border-carbon-200 dark:border-carbon-800 sticky top-0 z-[100]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/protocolos" className="p-2 hover:bg-clinical-gray dark:hover:bg-carbon-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-carbon-500" />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-0.5">
                <h1 className="text-xl font-display font-bold text-helix-navy dark:text-white">
                  {localizedProtocol.titulo}
                </h1>
                <span className="px-2 py-0.5 bg-helix-navy text-white text-[10px] font-bold uppercase rounded">
                  PROTOCOL HUD
                </span>
              </div>
              <p className="text-xs text-carbon-500 font-mono uppercase tracking-widest">
                {localizedProtocol.categoria} / v{localizedProtocol.versao} / {localizedProtocol.complexidade}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-clinical-gray dark:bg-carbon-800 p-1 rounded-lg flex border border-carbon-200 dark:border-carbon-700">
               {[
                 { id: 'flow', label: 'BIRD\'S EYE', icon: Layers },
                 { id: 'details', label: 'LEDGER', icon: BookOpen },
                 { id: 'evidence', label: 'EVIDENCE', icon: Shield },
               ].map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as any)}
                   className={cn(
                     "px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                     activeTab === tab.id 
                       ? "bg-white dark:bg-carbon-900 text-helix-navy shadow-sm border border-carbon-200 dark:border-carbon-700" 
                       : "text-carbon-400 hover:text-carbon-600"
                   )}
                 >
                   <tab.icon className="w-3 h-3" />
                   {tab.label}
                 </button>
               ))}
            </div>
            
            <div className="w-px h-8 bg-carbon-200 dark:bg-carbon-800 mx-2" />
            
            <button className="p-2.5 rounded-lg border border-carbon-200 dark:border-carbon-800 text-carbon-500 hover:bg-clinical-gray transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="btn-tactile-primary py-2 px-6 flex items-center gap-2 text-xs">
              <Share2 className="w-3.5 h-3.5" /> SHARE TRAIL
            </button>
          </div>
        </div>
      </header>

      {/* 1. Main Execution Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Intelligence Panel */}
        <aside className="w-80 border-r border-carbon-200 dark:border-carbon-800 bg-white dark:bg-carbon-900 overflow-y-auto hidden lg:block">
          <div className="p-6 space-y-10">
            <section>
              <h4 className="text-[10px] font-bold text-carbon-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Info className="w-3 h-3" /> Clinical Abstract
              </h4>
              <p className="text-sm font-body text-helix-navy dark:text-carbon-200 leading-relaxed italic">
                "{localizedProtocol.descricao}"
              </p>
            </section>

            <section>
              <h4 className="text-[10px] font-bold text-carbon-400 uppercase tracking-[0.2em] mb-4">Core Objectives</h4>
              <ul className="space-y-4">
                {localizedProtocol.objetivos.map((obj, i) => (
                  <li key={i} className="flex gap-3 text-xs text-carbon-700 dark:text-carbon-300">
                    <div className="w-5 h-5 rounded bg-guanine-green/10 flex items-center justify-center shrink-0">
                      <ChevronRight className="w-3 h-3 text-guanine-green" />
                    </div>
                    {obj}
                  </li>
                ))}
              </ul>
            </section>

            {localizedProtocol.sinaisAlerta && localizedProtocol.sinaisAlerta.length > 0 && (
              <section className="p-4 bg-critical-red/5 border border-critical-red/20 rounded-lg">
                <h4 className="text-[10px] font-bold text-critical-red uppercase tracking-widest mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" /> Red Flags
                </h4>
                <ul className="space-y-2">
                  {localizedProtocol.sinaisAlerta.map((s, i) => (
                    <li key={i} className="text-xs font-semibold text-critical-red/80">• {s}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h4 className="text-[10px] font-bold text-carbon-400 uppercase tracking-[0.2em] mb-4">Authority Index</h4>
              <div className="grid grid-cols-2 gap-2">
                {localizedProtocol.ciap2?.map(c => (
                  <div key={c} className="bg-clinical-gray dark:bg-carbon-800 p-2 rounded border border-carbon-200 text-[10px] font-mono font-bold text-helix-navy">CIAP: {c}</div>
                ))}
                {localizedProtocol.cid10?.map(c => (
                  <div key={c} className="bg-clinical-gray dark:bg-carbon-800 p-2 rounded border border-carbon-200 text-[10px] font-mono font-bold text-adenine-teal">CID: {c}</div>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* Dynamic Workspace */}
        <main className="flex-1 relative bg-paper-white dark:bg-carbon-950">
          {activeTab === 'flow' && (
            <div className="w-full h-full animate-in fade-in duration-500">
              <FlowchartEngine
                nodes={localizedProtocol.nodes}
                edges={localizedProtocol.edges}
              />
            </div>
          )}

          {activeTab === 'details' && (
            <div className="max-w-3xl mx-auto py-12 px-6 animate-in slide-in-from-bottom-4 duration-500">
               <h2 className="text-2xl font-display font-bold text-helix-navy dark:text-white mb-8">Protocol Execution Ledger</h2>
               <div className="space-y-6">
                  {localizedProtocol.nodes.filter(n => n.data.label).map((n, i) => (
                    <div key={n.id} className="p-6 card-ledger flex gap-6">
                       <div className="w-10 h-10 rounded bg-clinical-gray flex items-center justify-center font-mono font-bold text-helix-navy shrink-0">{i+1}</div>
                       <div>
                          <h4 className="font-bold text-helix-navy dark:text-white mb-2">{n.data.label}</h4>
                          <p className="text-sm font-body text-carbon-600 dark:text-carbon-400">{n.data.description}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* Instructions Overlay */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3 px-4 py-2 bg-white/80 dark:bg-carbon-900/80 backdrop-blur border border-carbon-200 dark:border-carbon-800 rounded-full shadow-elevation-1">
             <div className="w-2 h-2 rounded-full bg-adenine-teal animate-pulse" />
             <span className="text-[10px] font-bold text-carbon-500 uppercase tracking-widest">Live Trail Active</span>
          </div>
        </main>
      </div>
    </div>
  );
}