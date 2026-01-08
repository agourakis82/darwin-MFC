'use client';

import { use, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, Baby, Stethoscope, AlertTriangle, CheckCircle, XCircle,
  Pill, FileText, Activity, Heart, TestTube, Clock, ChevronRight,
  BookOpen, Shield, Users, Info, Zap, Target, ClipboardList,
  TrendingUp, AlertCircle, Microscope, Syringe, Calendar, Wind,
  Ear, Droplets, Thermometer
} from 'lucide-react';
import { doencasPediatriaAPS } from '@/lib/data/doencas/pediatria-aps';
import { GradeEvidenceBadge } from '@/app/components/Evidence/GradeEvidenceBadge';

// Get disease by ID
function getDoencaPediatriaById(id: string) {
  return doencasPediatriaAPS.find(d => d.id === id);
}

// Subcategory color mapping
const subcategoryColors: Record<string, string> = {
  'respiratorio': 'from-sky-500 to-blue-600',
  'otorrinolaringologia': 'from-amber-500 to-orange-600',
  'gastrointestinal': 'from-orange-500 to-red-600',
  'urologico': 'from-purple-500 to-violet-600',
  'neurologico': 'from-indigo-500 to-purple-600',
  'dermatologico': 'from-pink-500 to-rose-600',
  'default': 'from-sky-500 to-blue-600'
};

// Subcategory icons
const subcategoryIcons: Record<string, React.ElementType> = {
  'respiratorio': Wind,
  'otorrinolaringologia': Ear,
  'gastrointestinal': Droplets,
  'urologico': Activity,
  'neurologico': Zap,
  'dermatologico': Thermometer,
  'default': Baby
};

export default function PediatriaDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('common');
  const { id } = use(params);
  const doenca = getDoencaPediatriaById(id);
  const [activeTab, setActiveTab] = useState<'overview' | 'diagnosis' | 'treatment' | 'monitoring'>('overview');

  if (!doenca) {
    notFound();
  }

  const subcategory = doenca.subcategoria || 'default';
  const gradientClass = subcategoryColors[subcategory] || subcategoryColors.default;
  const Icon = subcategoryIcons[subcategory] || subcategoryIcons.default;

  // Get related conditions (same subcategory)
  const relatedConditions = doencasPediatriaAPS
    .filter(d => d.id !== id && d.subcategoria === subcategory)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <Link
        href="/pediatria-aps"
        className="inline-flex items-center gap-2 text-[#86868b] hover:text-sky-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Pediatria APS
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
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
          <Link
            href="/calculadoras"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
          >
            <Activity className="w-4 h-4" />
            Calculadoras
          </Link>
          <Link
            href="/medicamentos"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
          >
            <Pill className="w-4 h-4" />
            Medicamentos
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl mb-6 overflow-x-auto">
        {[
          { key: 'overview', label: 'Visão Geral', icon: BookOpen },
          { key: 'diagnosis', label: 'Diagnóstico', icon: Microscope },
          { key: 'treatment', label: 'Tratamento', icon: Pill },
          { key: 'monitoring', label: 'Acompanhamento', icon: Activity },
        ].map(({ key, label, icon: TabIcon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === key
                ? 'bg-white dark:bg-neutral-700 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-white/50 dark:hover:bg-neutral-700/50'
            }`}
          >
            <TabIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Definition */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-sky-500" />
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Definição</h2>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {doenca.quickView?.definicao}
              </p>
            </div>

            {/* Red Flags */}
            {doenca.quickView?.redFlags && doenca.quickView.redFlags.length > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">Sinais de Alerta (Red Flags)</h2>
                </div>
                <ul className="space-y-2">
                  {doenca.quickView.redFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-red-800 dark:text-red-200">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Epidemiology */}
            {doenca.fullContent?.epidemiologia && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Epidemiologia</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {doenca.fullContent.epidemiologia.prevalencia && (
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Prevalência</div>
                      <div className="font-medium text-neutral-900 dark:text-white">{doenca.fullContent.epidemiologia.prevalencia}</div>
                    </div>
                  )}
                  {doenca.fullContent.epidemiologia.incidencia && (
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Incidência</div>
                      <div className="font-medium text-neutral-900 dark:text-white">{doenca.fullContent.epidemiologia.incidencia}</div>
                    </div>
                  )}
                  {doenca.fullContent.epidemiologia.faixaEtaria && (
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Faixa Etária</div>
                      <div className="font-medium text-neutral-900 dark:text-white">{doenca.fullContent.epidemiologia.faixaEtaria}</div>
                    </div>
                  )}
                </div>
                {doenca.fullContent.epidemiologia.fatoresRisco && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Fatores de Risco:</div>
                    <div className="flex flex-wrap gap-2">
                      {doenca.fullContent.epidemiologia.fatoresRisco.map((fator, idx) => (
                        <span key={idx} className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-sm rounded-full">
                          {fator}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Diagnosis Tab */}
        {activeTab === 'diagnosis' && (
          <>
            {/* Diagnostic Criteria */}
            {doenca.quickView?.criteriosDiagnosticos && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Critérios Diagnósticos</h2>
                </div>
                <ul className="space-y-2">
                  {doenca.quickView.criteriosDiagnosticos.map((criterio, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 dark:text-neutral-300">{criterio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clinical Picture */}
            {doenca.fullContent?.quadroClinico && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Quadro Clínico</h2>
                </div>
                <div className="space-y-4">
                  {doenca.fullContent.quadroClinico.sintomasPrincipais && (
                    <div>
                      <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Sintomas Principais</h3>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {doenca.fullContent.quadroClinico.sintomasPrincipais.map((sintoma, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            {sintoma}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {doenca.fullContent.quadroClinico.sinaisExameFisico && (
                    <div>
                      <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Sinais no Exame Físico</h3>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {doenca.fullContent.quadroClinico.sinaisExameFisico.map((sinal, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            {sinal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Differential Diagnosis */}
            {doenca.fullContent?.diagnostico?.diagnosticoDiferencial && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Diagnóstico Diferencial</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {doenca.fullContent.diagnostico.diagnosticoDiferencial.map((diag, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg">
                      {diag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Labs & Exams */}
            {doenca.quickView?.examesIniciais && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <TestTube className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Exames Complementares</h2>
                </div>
                <ul className="space-y-2">
                  {doenca.quickView.examesIniciais.map((exame, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Microscope className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 dark:text-neutral-300">{exame}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Treatment Tab */}
        {activeTab === 'treatment' && (
          <>
            {/* Non-pharmacological */}
            {doenca.quickView?.tratamentoPrimeiraLinha?.naoFarmacologico && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-green-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Medidas Não Farmacológicas</h2>
                </div>
                <ul className="space-y-2">
                  {doenca.quickView.tratamentoPrimeiraLinha.naoFarmacologico.map((medida, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 dark:text-neutral-300">{medida}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pharmacological */}
            {doenca.quickView?.tratamentoPrimeiraLinha?.farmacologico && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <Pill className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Tratamento Farmacológico</h2>
                </div>
                <ul className="space-y-3">
                  {doenca.quickView.tratamentoPrimeiraLinha.farmacologico.map((med, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
                      <Syringe className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-800 dark:text-neutral-200">{med}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Treatment Details */}
            {doenca.fullContent?.tratamento?.farmacologico?.primeiraLinha && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Esquemas Terapêuticos Detalhados</h2>
                </div>
                <div className="space-y-4">
                  {doenca.fullContent.tratamento.farmacologico.primeiraLinha.map((esquema, idx) => (
                    <div key={idx} className="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                      <div className="font-semibold text-neutral-900 dark:text-white mb-2">{esquema.classe}</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {esquema.medicamentos.join(', ')}
                      </div>
                      {esquema.posologia && (
                        <div className="mt-2 text-sm text-sky-700 dark:text-sky-300">
                          {esquema.posologia}
                        </div>
                      )}
                      {esquema.observacoes && (
                        <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                          ⚠️ {esquema.observacoes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <>
            {/* Follow-up */}
            {doenca.fullContent?.acompanhamento && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-sky-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Acompanhamento</h2>
                </div>
                <div className="space-y-4">
                  {doenca.fullContent.acompanhamento.frequenciaConsultas && (
                    <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <span className="font-medium text-sky-900 dark:text-sky-100">Frequência de Consultas</span>
                      </div>
                      <p className="text-sky-800 dark:text-sky-200">{doenca.fullContent.acompanhamento.frequenciaConsultas}</p>
                    </div>
                  )}
                  {doenca.fullContent.acompanhamento.metasTerapeuticas && (
                    <div>
                      <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Metas Terapêuticas</h3>
                      <ul className="space-y-2">
                        {doenca.fullContent.acompanhamento.metasTerapeuticas.map((meta, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-neutral-700 dark:text-neutral-300">{meta}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Referral Criteria */}
            {doenca.fullContent?.acompanhamento?.criteriosEncaminhamento && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">Critérios de Encaminhamento</h2>
                </div>
                <ul className="space-y-2">
                  {doenca.fullContent.acompanhamento.criteriosEncaminhamento.map((criterio, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-amber-800 dark:text-amber-200">{criterio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prevention */}
            {doenca.fullContent?.prevencao && (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-green-500" />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Prevenção</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {doenca.fullContent.prevencao.primaria && (
                    <div>
                      <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Prevenção Primária</h3>
                      <ul className="space-y-1">
                        {doenca.fullContent.prevencao.primaria.map((med, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                            {med}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {doenca.fullContent.prevencao.secundaria && (
                    <div>
                      <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Prevenção Secundária</h3>
                      <ul className="space-y-1">
                        {doenca.fullContent.prevencao.secundaria.map((med, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                            {med}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Related Conditions */}
      {relatedConditions.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Condições Relacionadas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedConditions.map(condition => (
              <Link
                key={condition.id}
                href={`/pediatria-aps/${condition.id}`}
                className="group p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-sky-300 dark:hover:border-sky-600 transition-all"
              >
                <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 mb-1">
                  {condition.titulo}
                </h3>
                <div className="flex gap-2">
                  {condition.cid10?.slice(0, 2).map(code => (
                    <span key={code} className="text-xs text-neutral-500">{code}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
