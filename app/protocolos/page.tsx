'use client';

/**
 * PÁGINA DE PROTOCOLOS INTERATIVOS - DARWIN-MFC
 * ==============================================
 * 
 * Fluxogramas clicáveis para decisão clínica
 */

import { useState } from 'react';
import { GitFork, Search, Filter, ChevronRight } from 'lucide-react';
import { getAllProtocolos, getProtocoloById } from '@/lib/data/protocolos';
import FlowchartEngine from '@/app/components/Protocolos/FlowchartEngine';

export default function ProtocolosPage() {
  const protocolos = getAllProtocolos();
  const [selectedProtocolo, setSelectedProtocolo] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProtocolos = protocolos.filter(p => 
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedProtocoloData = selectedProtocolo ? getProtocoloById(selectedProtocolo) : null;

  const getCategoriaColor = (categoria: string) => {
    const colors: Record<string, string> = {
      diagnostico: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      tratamento: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      acompanhamento: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      encaminhamento: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      preventivo: 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300',
    };
    return colors[categoria] || 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
  };

  const getComplexityColor = (complexity: string) => {
    const colors: Record<string, string> = {
      simples: 'text-green-600 dark:text-green-400',
      moderado: 'text-amber-600 dark:text-amber-400',
      complexo: 'text-red-600 dark:text-red-400',
    };
    return colors[complexity] || 'text-slate-600 dark:text-slate-400';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <GitFork className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Protocolos Interativos
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Fluxogramas clicáveis para decisão clínica na APS
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar protocolos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Protocol List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-semibold text-slate-900 dark:text-white mb-3">
              {filteredProtocolos.length} protocolo{filteredProtocolos.length !== 1 ? 's' : ''} disponível{filteredProtocolos.length !== 1 ? 'eis' : ''}
            </h2>
            
            {filteredProtocolos.map(protocolo => (
              <button
                key={protocolo.id}
                onClick={() => setSelectedProtocolo(protocolo.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedProtocolo === protocolo.id
                    ? 'bg-orange-50 dark:bg-orange-950 border-orange-300 dark:border-orange-700 shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {protocolo.titulo}
                    </h3>
                    {protocolo.subtitulo && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                        {protocolo.subtitulo}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoriaColor(protocolo.categoria)}`}>
                        {protocolo.categoria}
                      </span>
                      <span className={`text-xs ${getComplexityColor(protocolo.complexity)}`}>
                        {protocolo.complexity} • {protocolo.tempoEstimado}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    selectedProtocolo === protocolo.id ? 'text-orange-500 rotate-90' : 'text-slate-400'
                  }`} />
                </div>
              </button>
            ))}

            {filteredProtocolos.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum protocolo encontrado</p>
              </div>
            )}
          </div>

          {/* Flowchart Area */}
          <div className="lg:col-span-2">
            {selectedProtocoloData ? (
              <FlowchartEngine 
                protocolo={selectedProtocoloData}
                onComplete={(result) => {
                  console.log('Protocolo completado:', result);
                }}
              />
            ) : (
              <div className="h-[600px] bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <div className="text-center text-slate-500 dark:text-slate-400">
                  <GitFork className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium mb-2">Selecione um protocolo</p>
                  <p className="text-sm">Escolha um protocolo na lista ao lado para visualizar o fluxograma</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50 rounded-2xl border border-orange-200 dark:border-orange-800">
          <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-2">
            💡 Como usar os protocolos
          </h3>
          <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
            <li>• Clique nos botões para navegar pelo fluxograma</li>
            <li>• O caminho percorrido fica destacado em verde</li>
            <li>• Ao final, clique em &quot;Copiar&quot; para exportar o resultado para o prontuário</li>
            <li>• Use &quot;Reiniciar&quot; para recomeçar a qualquer momento</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
