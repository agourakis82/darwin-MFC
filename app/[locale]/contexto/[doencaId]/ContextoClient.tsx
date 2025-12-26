'use client';

/**
 * CONTEXTO CLÍNICO CLIENT - DARWIN-MFC
 * =====================================
 * 
 * Componente cliente para a página de contexto clínico
 */

import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { 
  Stethoscope, 
  Pill, 
  Calculator, 
  GitFork, 
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  ClipboardList,
  ChevronRight,
  FileSearch
} from 'lucide-react';
import { useState, useCallback } from 'react';

// Data imports
import { doencas } from '@/lib/data/doencas';
import { 
  getMedicamentosForDoenca, 
  getProtocolosForDoenca, 
  getCalculadorasForDoenca,
  getRastreamentosForDoenca,
  getQuickActionsForDoenca,
  getContextualSuggestions
} from '@/lib/data/cross-references';

import { ContextualSuggestionCard } from '@/app/components/CrossReference/SmartLink';

interface ContextoClientProps {
  doencaId: string;
}

export default function ContextoClient({ doencaId }: ContextoClientProps) {
  const [activeTab, setActiveTab] = useState<'quickview' | 'medicamentos' | 'protocolos' | 'ferramentas'>('quickview');
  const [copiedAction, setCopiedAction] = useState<string | null>(null);

  // Find the disease
  const doenca = doencas.find(d => d.id === doencaId);
  
  // Get cross-references
  const medicamentosRefs = getMedicamentosForDoenca(doencaId);
  const protocolosRefs = getProtocolosForDoenca(doencaId);
  const calculadorasRefs = getCalculadorasForDoenca(doencaId);
  const rastreamentosRefs = getRastreamentosForDoenca(doencaId);
  const quickActions = getQuickActionsForDoenca(doencaId);
  const suggestions = getContextualSuggestions(doencaId);

  const copyToClipboard = useCallback(async (text: string, actionId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedAction(actionId);
    setTimeout(() => setCopiedAction(null), 2000);
  }, []);

  if (!doenca) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Condição não encontrada
        </h1>
        <Link href="/doencas" className="text-blue-600 hover:underline">
          Ver todas as doenças
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                <Link href="/doencas" className="hover:text-blue-600">Doenças</Link>
                <ChevronRight className="w-4 h-4" />
                <span>Contexto Clínico</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {doenca.titulo}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {doenca.ciap2.map(code => (
                  <span key={code} className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-sm font-medium rounded-full">
                    CIAP-2: {code}
                  </span>
                ))}
                {doenca.cid10.slice(0, 2).map(code => (
                  <span key={code} className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 text-sm font-medium rounded-full">
                    CID-10: {code}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'quickview', label: 'Resumo', icon: FileSearch },
            { id: 'medicamentos', label: `Medicamentos (${medicamentosRefs.length})`, icon: Pill },
            { id: 'protocolos', label: `Protocolos (${protocolosRefs.length})`, icon: GitFork },
            { id: 'ferramentas', label: 'Ferramentas', icon: Calculator },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* QuickView Tab */}
            {activeTab === 'quickview' && (
              <>
                {/* Definition */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    Definição
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {doenca.quickView.definicao}
                  </p>
                </div>

                {/* Diagnostic Criteria */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    Critérios Diagnósticos
                  </h2>
                  <ul className="space-y-2">
                    {doenca.quickView.criteriosDiagnosticos.map((criterio, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        {criterio}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatment */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    Tratamento de Primeira Linha
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Não-Farmacológico
                      </h3>
                      <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        {doenca.quickView.tratamentoPrimeiraLinha.naoFarmacologico.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Farmacológico
                      </h3>
                      <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        {doenca.quickView.tratamentoPrimeiraLinha.farmacologico.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Red Flags */}
                <div className="bg-red-50 dark:bg-red-950/50 rounded-2xl p-6 border border-red-200 dark:border-red-800">
                  <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Sinais de Alarme (Red Flags)
                  </h2>
                  <ul className="space-y-2">
                    {doenca.quickView.redFlags.map((flag, i) => (
                      <li key={i} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                        <span className="text-red-500">⚠️</span>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Medicamentos Tab */}
            {activeTab === 'medicamentos' && (
              <div className="space-y-4">
                {medicamentosRefs.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <Pill className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Nenhum medicamento vinculado ainda</p>
                  </div>
                ) : (
                  <>
                    {/* Primeira linha */}
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        Primeira Linha
                      </h3>
                      <div className="space-y-3">
                        {medicamentosRefs.filter(m => m.tipoUso === 'primeira_linha').map(med => (
                          <Link
                            key={med.medicamentoId}
                            href={`/medicamentos/${med.medicamentoId}`}
                            className="block bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                  {med.nomeGenerico}
                                </h4>
                                {med.posologiaResumida && (
                                  <p className="text-sm text-purple-600 dark:text-purple-400 font-mono">
                                    {med.posologiaResumida}
                                  </p>
                                )}
                                {med.indicacaoEspecifica && (
                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {med.indicacaoEspecifica}
                                  </p>
                                )}
                              </div>
                              <ArrowRight className="w-5 h-5 text-slate-400" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Segunda linha e alternativas */}
                    {medicamentosRefs.filter(m => m.tipoUso !== 'primeira_linha').length > 0 && (
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                          Segunda Linha / Alternativas
                        </h3>
                        <div className="space-y-3">
                          {medicamentosRefs.filter(m => m.tipoUso !== 'primeira_linha').map(med => (
                            <Link
                              key={med.medicamentoId}
                              href={`/medicamentos/${med.medicamentoId}`}
                              className="block bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-slate-900 dark:text-white">
                                      {med.nomeGenerico}
                                    </h4>
                                    <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs rounded-full">
                                      {med.tipoUso.replace('_', ' ')}
                                    </span>
                                  </div>
                                  {med.posologiaResumida && (
                                    <p className="text-sm text-purple-600 dark:text-purple-400 font-mono">
                                      {med.posologiaResumida}
                                    </p>
                                  )}
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Protocolos Tab */}
            {activeTab === 'protocolos' && (
              <div className="space-y-4">
                {protocolosRefs.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <GitFork className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Nenhum protocolo vinculado ainda</p>
                  </div>
                ) : (
                  protocolosRefs.map(prot => (
                    <Link
                      key={prot.protocoloId}
                      href={`/protocolos?id=${prot.protocoloId}`}
                      className="block bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                            <GitFork className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                              {prot.titulo}
                            </h4>
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                              {prot.tipoProtocolo}
                            </span>
                            {prot.descricaoBreve && (
                              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                {prot.descricaoBreve}
                              </p>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}

            {/* Ferramentas Tab */}
            {activeTab === 'ferramentas' && (
              <div className="space-y-6">
                {/* Calculadoras */}
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-600" />
                    Calculadoras Relevantes
                  </h3>
                  {calculadorasRefs.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhuma calculadora vinculada</p>
                  ) : (
                    <div className="grid gap-3">
                      {calculadorasRefs.map(calc => (
                        <Link
                          key={calc.calculadoraId}
                          href={`/calculadoras#${calc.calculadoraId}`}
                          className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                        >
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900 dark:text-white">{calc.nome}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{calc.descricaoBreve}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Rastreamentos */}
                {rastreamentosRefs.length > 0 && (
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <FileSearch className="w-5 h-5 text-cyan-600" />
                      Rastreamentos Relacionados
                    </h3>
                    <div className="grid gap-3">
                      {rastreamentosRefs.map(rast => (
                        <Link
                          key={rast.rastreamentoId}
                          href={`/rastreamento-sus#${rast.rastreamentoId}`}
                          className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors"
                        >
                          <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                            <FileSearch className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900 dark:text-white">{rast.titulo}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{rast.populacaoAlvo}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            {quickActions.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Copy className="w-5 h-5 text-blue-600" />
                  Ações Rápidas
                </h3>
                <div className="space-y-2">
                  {quickActions.map(action => (
                    <button
                      key={action.id}
                      onClick={() => copyToClipboard(action.conteudo, action.id)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-left"
                    >
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {action.titulo}
                      </span>
                      {copiedAction === action.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sugestões Contextuais */}
            {suggestions.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                  💡 Sugestões
                </h3>
                <div className="space-y-3">
                  {suggestions.slice(0, 4).map((sug, i) => (
                    <ContextualSuggestionCard
                      key={i}
                      type={sug.tipo as 'calculadora' | 'protocolo' | 'rastreamento' | 'medicamento' | 'doenca'}
                      id={sug.id}
                      title={sug.titulo}
                      reason={sug.motivo}
                      path={
                        sug.tipo === 'calculadora' ? `/calculadoras#${sug.id}` :
                        sug.tipo === 'protocolo' ? `/protocolos?id=${sug.id}` :
                        sug.tipo === 'rastreamento' ? `/rastreamento-sus#${sug.id}` :
                        '#'
                      }
                      priority={sug.prioridade}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Link to full disease page */}
            <Link
              href={`/doencas/${doencaId}`}
              className="block bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              <h3 className="font-bold mb-2">Ver conteúdo completo</h3>
              <p className="text-sm opacity-90">
                Epidemiologia, fisiopatologia, diagnóstico diferencial e mais
              </p>
              <div className="flex items-center gap-1 mt-3 text-sm font-medium">
                Acessar <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

