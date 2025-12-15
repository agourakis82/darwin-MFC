'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, Pill, FileText, Calculator, AlertTriangle,
  CheckCircle, XCircle, Clock, Users, Heart, ChevronDown, ChevronUp,
  Stethoscope, Activity, Clipboard, Target, ExternalLink
} from 'lucide-react';
import { getDoencaById } from '@/lib/data/doencas/index';
import { CATEGORIAS_DOENCA } from '@/lib/types/doenca';
import { 
  getMedicamentosForDoenca, 
  getProtocolosForDoenca, 
  getCalculadorasForDoenca 
} from '@/lib/data/cross-references';
import { notFound } from 'next/navigation';

export default function DoencaDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const doenca = getDoencaById(id);
  const [showFullContent, setShowFullContent] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['epidemiologia']));
  
  if (!doenca) {
    notFound();
  }

  const categoriaInfo = doenca.categoria ? CATEGORIAS_DOENCA[doenca.categoria] : CATEGORIAS_DOENCA['outros'];
  
  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb */}
      <Link 
        href="/doencas" 
        className="inline-flex items-center gap-2 text-[#86868b] hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Doenças
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${categoriaInfo.color} rounded-2xl flex items-center justify-center shadow-lg`}>
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              {doenca.titulo}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 bg-gradient-to-r ${categoriaInfo.color} text-white text-sm font-medium rounded-full`}>
                {categoriaInfo.label}
              </span>
              {doenca.ciap2?.map(code => (
                <span key={code} className="px-3 py-1 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-mono rounded-full">
                  CIAP-2: {code}
                </span>
              ))}
              {doenca.cid10?.map(code => (
                <span key={code} className="px-3 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-mono rounded-full">
                  CID-10: {code}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Toggle View */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowFullContent(false)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              !showFullContent
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/50 dark:bg-neutral-800/50 text-[#86868b] hover:bg-blue-100'
            }`}
          >
            ⚡ QuickView (1 tela)
          </button>
          <button
            onClick={() => setShowFullContent(true)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              showFullContent
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/50 dark:bg-neutral-800/50 text-[#86868b] hover:bg-purple-100'
            }`}
          >
            📖 Versão Completa
          </button>
        </div>
      </div>

      {/* QuickView Content */}
      {!showFullContent && doenca.quickView ? (
        <div className="space-y-6">
          {/* Definição */}
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-500" />
              Definição
            </h2>
            <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
              {doenca.quickView.definicao}
            </p>
          </div>

          {/* Critérios Diagnósticos */}
          {doenca.quickView.criteriosDiagnosticos && (
            <div className="glass-strong rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
                <Clipboard className="w-5 h-5 text-emerald-500" />
                Critérios Diagnósticos
              </h2>
              <ul className="space-y-2">
                {doenca.quickView.criteriosDiagnosticos.map((criterio, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">{criterio}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tratamento */}
          {doenca.quickView.tratamentoPrimeiraLinha && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Não Farmacológico */}
              {doenca.quickView.tratamentoPrimeiraLinha.naoFarmacologico && (
                <div className="glass-strong rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    Tratamento Não Farmacológico
                  </h2>
                  <ul className="space-y-2">
                    {doenca.quickView.tratamentoPrimeiraLinha.naoFarmacologico.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-pink-500">•</span>
                        <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Farmacológico */}
              {doenca.quickView.tratamentoPrimeiraLinha.farmacologico && (
                <div className="glass-strong rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-blue-500" />
                    Tratamento Farmacológico (1ª linha)
                  </h2>
                  <ul className="space-y-2">
                    {doenca.quickView.tratamentoPrimeiraLinha.farmacologico.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-500">•</span>
                        <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Red Flags */}
          {doenca.quickView.redFlags && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                🚨 Red Flags - Quando Encaminhar
              </h2>
              <ul className="space-y-2">
                {doenca.quickView.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-red-800 dark:text-red-200 font-medium">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metas e Exames */}
          {(doenca.quickView.metasTerapeuticas || doenca.quickView.examesIniciais) && (
            <div className="grid md:grid-cols-2 gap-6">
              {doenca.quickView.metasTerapeuticas && (
                <div className="glass-subtle rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-500" />
                    Metas Terapêuticas
                  </h2>
                  <ul className="space-y-2">
                    {doenca.quickView.metasTerapeuticas.map((meta, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-amber-500">🎯</span>
                        <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">{meta}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {doenca.quickView.examesIniciais && (
                <div className="glass-subtle rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-500" />
                    Exames Iniciais
                  </h2>
                  <ul className="space-y-2">
                    {doenca.quickView.examesIniciais.map((exame, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-purple-500">📋</span>
                        <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">{exame}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ) : doenca.fullContent ? (
        /* Full Content */
        <div className="space-y-4">
          {/* Epidemiologia */}
          {doenca.fullContent.epidemiologia && (
            <CollapsibleSection
              title="Epidemiologia"
              icon={<Users className="w-5 h-5 text-blue-500" />}
              isExpanded={expandedSections.has('epidemiologia')}
              onToggle={() => toggleSection('epidemiologia')}
            >
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {doenca.fullContent.epidemiologia.prevalencia && (
                  <div className="bg-blue-500/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {doenca.fullContent.epidemiologia.prevalencia}
                    </div>
                    <div className="text-sm text-[#86868b]">Prevalência</div>
                  </div>
                )}
                {doenca.fullContent.epidemiologia.incidencia && (
                  <div className="bg-emerald-500/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {doenca.fullContent.epidemiologia.incidencia}
                    </div>
                    <div className="text-sm text-[#86868b]">Incidência</div>
                  </div>
                )}
                {doenca.fullContent.epidemiologia.mortalidade && (
                  <div className="bg-red-500/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {doenca.fullContent.epidemiologia.mortalidade}
                    </div>
                    <div className="text-sm text-[#86868b]">Mortalidade</div>
                  </div>
                )}
              </div>
              {doenca.fullContent.epidemiologia.fatoresRisco && (
                <div>
                  <h4 className="font-semibold mb-2">Fatores de Risco:</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {doenca.fullContent.epidemiologia.fatoresRisco.map((fator, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <span className="text-amber-500">⚠️</span>
                        {fator}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CollapsibleSection>
          )}

          {/* Quadro Clínico */}
          {doenca.fullContent?.quadroClinico && (
            <CollapsibleSection
              title="Quadro Clínico"
              icon={<Stethoscope className="w-5 h-5 text-emerald-500" />}
              isExpanded={expandedSections.has('quadroClinico')}
              onToggle={() => toggleSection('quadroClinico')}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Sintomas Principais:</h4>
                  <ul className="space-y-1">
                    {doenca.fullContent.quadroClinico.sintomasPrincipais?.map((s, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-emerald-500">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Sinais ao Exame Físico:</h4>
                  <ul className="space-y-1">
                    {doenca.fullContent.quadroClinico.sinaisExameFisico?.map((s, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-blue-500">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleSection>
          )}

          {/* Diagnóstico */}
          {doenca.fullContent?.diagnostico && (
            <CollapsibleSection
              title="Diagnóstico"
              icon={<Clipboard className="w-5 h-5 text-purple-500" />}
              isExpanded={expandedSections.has('diagnostico')}
              onToggle={() => toggleSection('diagnostico')}
            >
              <div className="space-y-4">
                {doenca.fullContent.diagnostico.criterios && (
                  <div>
                    <h4 className="font-semibold mb-2">Critérios Diagnósticos:</h4>
                    <ul className="space-y-1">
                      {doenca.fullContent.diagnostico.criterios.map((c, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {doenca.fullContent.diagnostico.diagnosticoDiferencial && (
                  <div>
                    <h4 className="font-semibold mb-2">Diagnóstico Diferencial:</h4>
                    <div className="flex flex-wrap gap-2">
                      {doenca.fullContent.diagnostico.diagnosticoDiferencial.map((d, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 text-sm rounded-full">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleSection>
          )}

          {/* Tratamento */}
          {doenca.fullContent?.tratamento && (
            <CollapsibleSection
              title="Tratamento Completo"
              icon={<Pill className="w-5 h-5 text-blue-500" />}
              isExpanded={expandedSections.has('tratamento')}
              onToggle={() => toggleSection('tratamento')}
            >
              <div className="space-y-6">
                {doenca.fullContent.tratamento.objetivos && (
                  <div>
                    <h4 className="font-semibold mb-2">Objetivos:</h4>
                    <ul className="space-y-1">
                      {doenca.fullContent.tratamento.objetivos.map((o, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <Target className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" /> {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-4">
                  {doenca.fullContent.tratamento.naoFarmacologico?.medidas && (
                    <div className="bg-pink-500/10 rounded-xl p-4">
                      <h4 className="font-semibold mb-2 text-pink-700 dark:text-pink-300">Não Farmacológico:</h4>
                      <ul className="space-y-1">
                        {doenca.fullContent.tratamento.naoFarmacologico.medidas.map((m, idx) => (
                          <li key={idx} className="text-sm">{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {doenca.fullContent.tratamento.farmacologico?.primeiraLinha && (
                    <div className="bg-blue-500/10 rounded-xl p-4">
                      <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Farmacológico (1ª linha):</h4>
                      {doenca.fullContent.tratamento.farmacologico.primeiraLinha.map((t, idx) => (
                        <div key={idx} className="mb-2">
                          <span className="font-medium">{t.classe}:</span>
                          <ul className="ml-4">
                            {t.medicamentos?.map((m, midx) => (
                              <li key={midx} className="text-sm">{m}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CollapsibleSection>
          )}

          {/* Acompanhamento */}
          {doenca.fullContent?.acompanhamento && (
            <CollapsibleSection
              title="Acompanhamento"
              icon={<Clock className="w-5 h-5 text-amber-500" />}
              isExpanded={expandedSections.has('acompanhamento')}
              onToggle={() => toggleSection('acompanhamento')}
            >
              <div className="space-y-4">
                {doenca.fullContent.acompanhamento.frequenciaConsultas && (
                  <div className="bg-amber-500/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-1">Frequência de Consultas:</h4>
                    <p className="text-sm">{doenca.fullContent.acompanhamento.frequenciaConsultas}</p>
                  </div>
                )}
                
                {doenca.fullContent.acompanhamento.metasTerapeuticas && (
                  <div>
                    <h4 className="font-semibold mb-2">Metas Terapêuticas:</h4>
                    <ul className="space-y-1">
                      {doenca.fullContent.acompanhamento.metasTerapeuticas.map((m, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <Target className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {doenca.fullContent.acompanhamento.criteriosEncaminhamento && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <h4 className="font-semibold mb-2 text-red-700 dark:text-red-400">Critérios de Encaminhamento:</h4>
                    <ul className="space-y-1">
                      {doenca.fullContent.acompanhamento.criteriosEncaminhamento.map((c, idx) => (
                        <li key={idx} className="text-sm text-red-800 dark:text-red-200">{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CollapsibleSection>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-neutral-500">
          Conteúdo detalhado em desenvolvimento
        </div>
      )}

      {/* Related Resources */}
      <div className="mt-12 grid md:grid-cols-3 gap-4">
        {((doenca as {medicamentos?: string[]}).medicamentos?.length ?? 0) > 0 && (
          <Link href="/medicamentos" className="glass-subtle rounded-xl p-4 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3">
              <Pill className="w-8 h-8 text-blue-500" />
              <div>
                <div className="font-semibold group-hover:text-blue-600">{(doenca as {medicamentos?: string[]}).medicamentos?.length} Medicamentos</div>
                <div className="text-sm text-[#86868b]">Ver no bulário</div>
              </div>
            </div>
          </Link>
        )}
        
        {((doenca as {protocolos?: string[]}).protocolos?.length ?? 0) > 0 && (
          <Link href="/protocolos" className="glass-subtle rounded-xl p-4 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-500" />
              <div>
                <div className="font-semibold group-hover:text-purple-600">{(doenca as {protocolos?: string[]}).protocolos?.length} Protocolos</div>
                <div className="text-sm text-[#86868b]">Ver algoritmos</div>
              </div>
            </div>
          </Link>
        )}
        
        {((doenca as {calculadoras?: string[]}).calculadoras?.length ?? 0) > 0 && (
          <Link href="/calculadoras" className="glass-subtle rounded-xl p-4 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-emerald-500" />
              <div>
                <div className="font-semibold group-hover:text-emerald-600">{(doenca as {calculadoras?: string[]}).calculadoras?.length} Calculadoras</div>
                <div className="text-sm text-[#86868b]">Usar ferramentas</div>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Cross-References Section */}
      <CrossReferencesSection doencaId={id} />

      {/* Context Link */}
      <div className="mt-8">
        <Link 
          href={`/contexto/${id}`}
          className="flex items-center justify-center gap-2 w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
        >
          <Clipboard className="w-5 h-5" />
          Abrir Contexto Clínico Integrado
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Last Update */}
      <div className="mt-8 text-center text-sm text-[#86868b]">
        Última atualização: {doenca.lastUpdate}
      </div>
    </div>
  );
}

// Cross-References Section Component
function CrossReferencesSection({ doencaId }: { doencaId: string }) {
  const medicamentos = getMedicamentosForDoenca(doencaId);
  const protocolos = getProtocolosForDoenca(doencaId);
  const calculadoras = getCalculadorasForDoenca(doencaId);

  const hasAnyRef = medicamentos.length > 0 || protocolos.length > 0 || calculadoras.length > 0;
  
  if (!hasAnyRef) return null;

  return (
    <div className="mt-8 glass-strong rounded-2xl p-6">
      <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
        🔗 Recursos Integrados
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        {/* Medicamentos */}
        {medicamentos.length > 0 && (
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
              <Pill className="w-4 h-4" />
              Medicamentos ({medicamentos.length})
            </h3>
            <ul className="space-y-2">
              {medicamentos.slice(0, 4).map(med => (
                <li key={med.medicamentoId}>
                  <Link 
                    href={`/medicamentos/${med.medicamentoId}`}
                    className="flex items-center justify-between p-2 bg-white/50 dark:bg-neutral-800/50 rounded-lg hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div>
                      <span className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                        {med.nomeGenerico}
                      </span>
                      {med.tipoUso === 'primeira_linha' && (
                        <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded">
                          1ª linha
                        </span>
                      )}
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#86868b]" />
                  </Link>
                </li>
              ))}
              {medicamentos.length > 4 && (
                <li className="text-sm text-[#86868b] text-center pt-2">
                  + {medicamentos.length - 4} mais
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Protocolos */}
        {protocolos.length > 0 && (
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
            <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Protocolos ({protocolos.length})
            </h3>
            <ul className="space-y-2">
              {protocolos.map(prot => (
                <li key={prot.protocoloId}>
                  <Link 
                    href={`/protocolos?id=${prot.protocoloId}`}
                    className="flex items-center justify-between p-2 bg-white/50 dark:bg-neutral-800/50 rounded-lg hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                      {prot.titulo}
                    </span>
                    <ExternalLink className="w-3 h-3 text-[#86868b]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Calculadoras */}
        {calculadoras.length > 0 && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculadoras ({calculadoras.length})
            </h3>
            <ul className="space-y-2">
              {calculadoras.map(calc => (
                <li key={calc.calculadoraId}>
                  <Link 
                    href={`/calculadoras#${calc.calculadoraId}`}
                    className="flex items-center justify-between p-2 bg-white/50 dark:bg-neutral-800/50 rounded-lg hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div>
                      <span className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                        {calc.nome}
                      </span>
                      {calc.prioritaria && (
                        <span className="ml-2 text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                          Prioritária
                        </span>
                      )}
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#86868b]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Collapsible Section Component
function CollapsibleSection({ 
  title, 
  icon, 
  isExpanded, 
  onToggle, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  isExpanded: boolean; 
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-strong rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-white/50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{title}</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-[#86868b]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#86868b]" />
        )}
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 text-[#1d1d1f] dark:text-[#f5f5f7]">
          {children}
        </div>
      )}
    </div>
  );
}

