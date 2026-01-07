'use client';

import { use, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, Baby, Stethoscope, AlertTriangle, CheckCircle, XCircle,
  Pill, FileText, Activity, Heart, TestTube, Clock, ChevronRight,
  BookOpen, GitBranch, Shield, Users, Info, Zap, Target, ClipboardList,
  TrendingUp, AlertCircle, Microscope, Syringe, Calendar
} from 'lucide-react';
import { getDoencaPrenatalById, doencasPrenatalAltoRisco } from '@/lib/data/doencas/prenatal-alto-risco';
import { GradeEvidenceBadge } from '@/app/components/Evidence/GradeEvidenceBadge';

// Map condition IDs to related flowchart IDs
const flowchartMap: Record<string, string> = {
  'diabetes-gestacional': 'dmg',
  'pre-eclampsia-eclampsia': 'pre-eclampsia',
  'hiv-gestacao': 'hiv-gestacao',
  'sifilis-gestacao': 'sifilis-gestacao',
};

// Category color mapping
const categoryColors: Record<string, string> = {
  'Classificação': 'from-blue-500 to-blue-600',
  'Endocrinológica': 'from-purple-500 to-purple-600',
  'Hipertensiva': 'from-red-500 to-red-600',
  'Infecciosa': 'from-amber-500 to-amber-600',
  'Cardiológica': 'from-pink-500 to-pink-600',
  'Hematológica': 'from-orange-500 to-orange-600',
  'Gemelar': 'from-teal-500 to-teal-600',
  'default': 'from-emerald-500 to-teal-600'
};

function getConditionCategory(id: string): string {
  if (id.includes('diabetes') || id.includes('tireoide') || id.includes('hipotireoidismo') || id.includes('hipertireoidismo')) return 'Endocrinológica';
  if (id.includes('eclampsia') || id.includes('hipertensao')) return 'Hipertensiva';
  if (id.includes('hiv') || id.includes('sifilis') || id.includes('hepatite')) return 'Infecciosa';
  if (id.includes('cardiopatia')) return 'Cardiológica';
  if (id.includes('trombofilia') || id.includes('anemia')) return 'Hematológica';
  if (id.includes('gemelar')) return 'Gemelar';
  if (id.includes('classificacao')) return 'Classificação';
  return 'default';
}

export default function PrenatalDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('common');
  const { id } = use(params);
  const doenca = getDoencaPrenatalById(id);
  const [activeTab, setActiveTab] = useState<'overview' | 'diagnosis' | 'treatment' | 'monitoring'>('overview');

  if (!doenca) {
    notFound();
  }

  const category = getConditionCategory(id);
  const gradientClass = categoryColors[category] || categoryColors.default;
  const relatedFlowchart = flowchartMap[id];

  // Get related conditions (same category)
  const relatedConditions = doencasPrenatalAltoRisco
    .filter(d => d.id !== id && getConditionCategory(d.id) === category)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <Link
        href="/prenatal-alto-risco"
        className="inline-flex items-center gap-2 text-[#86868b] hover:text-pink-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('prenatal.title')}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center shadow-lg`}>
            <Baby className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                {doenca.titulo}
              </h1>
              {doenca.quickView?.gradeLevel && (
                <GradeEvidenceBadge level={doenca.quickView.gradeLevel} size="sm" />
              )}
            </div>
            {doenca.sinonimos && doenca.sinonimos.length > 0 && (
              <p className="text-lg text-[#86868b] mt-1">
                {doenca.sinonimos.slice(0, 3).join(' • ')}
              </p>
            )}
          </div>
        </div>

        {/* Ontology Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {doenca.cid10 && doenca.cid10.map((code, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-mono rounded-full">
              CID-10: {code}
            </span>
          ))}
          {doenca.ciap2 && doenca.ciap2.map((code, idx) => (
            <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 text-sm font-mono rounded-full">
              CIAP-2: {code}
            </span>
          ))}
          {doenca.snomedCT && (
            <span className="px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 text-sm font-mono rounded-full">
              SNOMED: {doenca.snomedCT}
            </span>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {relatedFlowchart && (
            <Link
              href={`/protocolos/flowchart/${relatedFlowchart}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <GitBranch className="w-4 h-4" />
              Ver Fluxograma
            </Link>
          )}
          <Link
            href="/calculadoras"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
          >
            <Activity className="w-4 h-4" />
            Calculadoras
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl mb-6 overflow-x-auto">
        {[
          { key: 'overview', label: 'Visão Geral', icon: BookOpen },
          { key: 'diagnosis', label: 'Diagnóstico', icon: Microscope },
          { key: 'treatment', label: 'Tratamento', icon: Pill },
          { key: 'monitoring', label: 'Monitoramento', icon: Activity },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === key
                ? 'bg-white dark:bg-neutral-700 text-pink-600 dark:text-pink-400 shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Definition */}
            {doenca.quickView?.definicao && (
              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  Definição
                </h2>
                <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed text-lg">
                  {doenca.quickView.definicao}
                </p>
              </div>
            )}

            {/* Risk Classification (if present) */}
            {doenca.quickView?.classificacaoRisco && (
              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-500" />
                  Classificação de Risco
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {doenca.quickView.classificacaoRisco.map((nivel, idx) => {
                    const colors: Record<string, string> = {
                      baixo: 'border-green-500 bg-green-500/10',
                      moderado: 'border-yellow-500 bg-yellow-500/10',
                      alto: 'border-orange-500 bg-orange-500/10',
                      muito_alto: 'border-red-500 bg-red-500/10',
                    };
                    return (
                      <div key={idx} className={`border-l-4 ${colors[nivel.nivel]} rounded-r-xl p-4`}>
                        <h3 className="font-bold capitalize mb-2">{nivel.nivel.replace('_', ' ')}</h3>
                        <ul className="text-sm space-y-1 mb-3">
                          {nivel.criterios.map((c, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm font-medium text-[#86868b]">
                          <strong>Conduta:</strong> {nivel.conduta}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Red Flags */}
            {doenca.quickView?.redFlags && doenca.quickView.redFlags.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Sinais de Alarme (Red Flags)
                </h2>
                <div className="grid md:grid-cols-2 gap-2">
                  {doenca.quickView.redFlags.map((flag, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-red-800 dark:text-red-200">{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Therapeutic Goals */}
            {doenca.quickView?.metasTerapeuticas && (
              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  Metas Terapêuticas
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {doenca.quickView.metasTerapeuticas.map((meta, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-emerald-500/10 rounded-xl p-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{meta}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Diagnosis Tab */}
        {activeTab === 'diagnosis' && (
          <>
            {/* Diagnostic Criteria */}
            {doenca.quickView?.criteriosDiagnosticos && (
              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-blue-500" />
                  Critérios Diagnósticos
                </h2>
                <ul className="space-y-3">
                  {doenca.quickView.criteriosDiagnosticos.map((criterio, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-blue-500/10 rounded-xl p-4">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">{criterio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Initial Exams */}
            {doenca.quickView?.examesIniciais && doenca.quickView.examesIniciais.length > 0 && (
              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-purple-500" />
                  Exames Iniciais
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {doenca.quickView.examesIniciais.map((exame, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-purple-500/10 rounded-xl p-3">
                      <Microscope className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">{exame}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Differential Diagnosis */}
            {doenca.fullContent?.diagnostico?.diagnosticoDiferencial && doenca.fullContent.diagnostico.diagnosticoDiferencial.length > 0 && (
              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-orange-500" />
                  Diagnóstico Diferencial
                </h2>
                <div className="space-y-2">
                  {doenca.fullContent.diagnostico.diagnosticoDiferencial.map((dd, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-orange-500/10 rounded-xl p-3">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span>{dd}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Treatment Tab */}
        {activeTab === 'treatment' && (
          <>
            {/* First-Line Treatment */}
            {doenca.quickView?.tratamentoPrimeiraLinha && (
              <>
                {/* Non-Pharmacological */}
                {doenca.quickView.tratamentoPrimeiraLinha.naoFarmacologico && (
                  <div className="glass-strong rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-green-500" />
                      Tratamento Não Farmacológico
                    </h2>
                    <ul className="space-y-2">
                      {doenca.quickView.tratamentoPrimeiraLinha.naoFarmacologico.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pharmacological */}
                {doenca.quickView.tratamentoPrimeiraLinha.farmacologico && (
                  <div className="glass-strong rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                      <Pill className="w-5 h-5 text-blue-500" />
                      Tratamento Farmacológico
                    </h2>
                    <div className="space-y-3">
                      {doenca.quickView.tratamentoPrimeiraLinha.farmacologico.map((item, idx) => (
                        <div key={idx} className="bg-blue-500/10 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <Syringe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Full Treatment (from fullContent) */}
            {doenca.fullContent?.tratamento?.farmacologico && (
              <>
                {doenca.fullContent.tratamento.farmacologico.primeiraLinha && doenca.fullContent.tratamento.farmacologico.primeiraLinha.length > 0 && (
                  <div className="glass-strong rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      Primeira Linha
                    </h2>
                    <div className="space-y-4">
                      {doenca.fullContent.tratamento.farmacologico.primeiraLinha.map((trat, idx) => (
                        <div key={idx} className="bg-amber-500/10 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{trat.classe}</h3>
                            {trat.gradeLevel && (
                              <GradeEvidenceBadge level={trat.gradeLevel} size="xs" />
                            )}
                          </div>
                          <p className="text-sm mb-1">
                            <strong>Medicamentos:</strong> {trat.medicamentos.join(', ')}
                          </p>
                          {trat.posologia && (
                            <p className="text-sm text-[#86868b]">
                              <strong>Posologia:</strong> {trat.posologia}
                            </p>
                          )}
                          {trat.observacoes && (
                            <p className="text-sm text-[#86868b] mt-1">
                              <strong>Obs:</strong> {trat.observacoes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {doenca.fullContent.tratamento.farmacologico.segundaLinha && doenca.fullContent.tratamento.farmacologico.segundaLinha.length > 0 && (
                  <div className="glass-strong rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-500" />
                      Segunda Linha
                    </h2>
                    <div className="space-y-4">
                      {doenca.fullContent.tratamento.farmacologico.segundaLinha.map((trat, idx) => (
                        <div key={idx} className="bg-purple-500/10 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{trat.classe}</h3>
                            {trat.gradeLevel && (
                              <GradeEvidenceBadge level={trat.gradeLevel} size="xs" />
                            )}
                          </div>
                          <p className="text-sm mb-1">
                            <strong>Medicamentos:</strong> {trat.medicamentos.join(', ')}
                          </p>
                          {trat.posologia && (
                            <p className="text-sm text-[#86868b]">
                              <strong>Posologia:</strong> {trat.posologia}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

          </>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <>
            {/* Follow-up Exams */}
            {doenca.quickView?.examesSeguimento && doenca.quickView.examesSeguimento.length > 0 && (
              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Exames de Seguimento
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {doenca.quickView.examesSeguimento.map((exame, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-blue-500/10 rounded-xl p-3">
                      <TestTube className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{exame}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up Protocol */}
            {doenca.fullContent?.acompanhamento && (
              <div className="glass-strong rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-500" />
                  Protocolo de Seguimento
                </h2>
                <div className="space-y-4">
                  {doenca.fullContent.acompanhamento.frequenciaConsultas && (
                    <div className="bg-teal-500/10 rounded-xl p-4">
                      <h3 className="font-semibold mb-2">Frequência de Consultas</h3>
                      <p>{doenca.fullContent.acompanhamento.frequenciaConsultas}</p>
                    </div>
                  )}
                  {doenca.fullContent.acompanhamento.metasTerapeuticas && doenca.fullContent.acompanhamento.metasTerapeuticas.length > 0 && (
                    <div className="bg-green-500/10 rounded-xl p-4">
                      <h3 className="font-semibold mb-2">Metas Terapêuticas</h3>
                      <ul className="space-y-1">
                        {doenca.fullContent.acompanhamento.metasTerapeuticas.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span className="text-sm">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Referral Criteria */}
            {doenca.fullContent?.acompanhamento?.criteriosEncaminhamento && doenca.fullContent.acompanhamento.criteriosEncaminhamento.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Critérios de Encaminhamento
                </h2>
                <ul className="space-y-2">
                  {doenca.fullContent.acompanhamento.criteriosEncaminhamento.map((criterio, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{criterio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {/* Related Conditions */}
      {relatedConditions.length > 0 && (
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Condições Relacionadas
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedConditions.map((cond) => (
              <Link
                key={cond.id}
                href={`/prenatal-alto-risco/${cond.id}`}
                className="glass-strong rounded-xl p-4 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center`}>
                    <Baby className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate group-hover:text-pink-600 transition-colors">
                      {cond.titulo}
                    </h3>
                    {cond.cid10 && cond.cid10[0] && (
                      <span className="text-xs text-[#86868b]">{cond.cid10[0]}</span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-pink-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links Footer */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          href="/prenatal-alto-risco"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#86868b] hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Todas as Condições
        </Link>
        <Link
          href="/protocolos"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#86868b] hover:text-pink-600 transition-colors"
        >
          <FileText className="w-4 h-4" />
          Protocolos
        </Link>
        <Link
          href="/medicamentos"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#86868b] hover:text-pink-600 transition-colors"
        >
          <Pill className="w-4 h-4" />
          Medicamentos
        </Link>
      </div>
    </div>
  );
}
