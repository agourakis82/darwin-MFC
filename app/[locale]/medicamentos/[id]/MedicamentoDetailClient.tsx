'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  ArrowLeft, Pill, AlertTriangle, Baby, Heart, TestTube,
  Clock, Shield, BookOpen, ChevronRight, Activity, XCircle,
  CheckCircle, Info, Stethoscope
} from 'lucide-react';
import { medicamentos, getMedicamentoById } from '@/lib/data/medicamentos';
import { CLASSES_TERAPEUTICAS, CLASSIFICACAO_GESTACAO } from '@/lib/types/medicamento';
import { useMedicalTerms } from '@/lib/i18n/useMedicalTerms';
import { notFound } from 'next/navigation';

export default function MedicamentoDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('medicationDetail');
  const { translateMedication } = useMedicalTerms();
  const { id } = use(params);
  const medicamento = getMedicamentoById(id);

  if (!medicamento) {
    notFound();
  }

  const classeInfo = CLASSES_TERAPEUTICAS[medicamento.classeTerapeutica];
  const gestacaoInfo = CLASSIFICACAO_GESTACAO[medicamento.gestacao];
  const translatedName = translateMedication(medicamento.atcCode, medicamento.nomeGenerico);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb */}
      <Link
        href="/medicamentos"
        className="inline-flex items-center gap-2 text-[#86868b] hover:text-emerald-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('backToPharmacy')}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Pill className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] capitalize">
                {translatedName}
              </h1>
              {medicamento.rename && (
                <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full">
                  RENAME
                </span>
              )}
            </div>
            {medicamento.nomesComerciais && (
              <p className="text-lg text-[#86868b]">
                {medicamento.nomesComerciais.join(', ')}
              </p>
            )}
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 ${classeInfo.color} text-white text-sm font-medium rounded-full`}>
            {classeInfo.label}
          </span>
          <span className={`px-3 py-1 ${gestacaoInfo.color} text-white text-sm font-medium rounded-full flex items-center gap-1`}>
            <Baby className="w-4 h-4" />
            {t('badges.pregnancyCategory', { category: medicamento.gestacao })}
          </span>
          <span className={`px-3 py-1 ${medicamento.amamentacao.compativel ? 'bg-green-500' : 'bg-red-500'} text-white text-sm font-medium rounded-full`}>
            {medicamento.amamentacao.compativel ? t('badges.breastfeedingCompatible') : t('badges.breastfeedingAvoid')}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Mecanismo de Ação */}
        <div className="glass-strong rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            {t('sections.mechanismOfAction')}
          </h2>
          <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
            {medicamento.mecanismoAcao}
          </p>
        </div>

        {/* Indicações */}
        <div className="glass-strong rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-500" />
            {t('sections.indications')}
          </h2>
          <ul className="space-y-2">
            {medicamento.indicacoes.map((ind, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">{ind}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Posologia */}
        <div className="glass-strong rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-500" />
            {t('sections.dosage')}
          </h2>
          <div className="space-y-4">
            {medicamento.posologias.map((pos, idx) => (
              <div key={idx} className="bg-purple-500/10 rounded-xl p-4">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  {pos.indicacao}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">{t('dosage.adults')}:</span> {pos.adultos.dose}
                    <br />
                    <span className="text-[#86868b]">{t('dosage.frequency')}: {pos.adultos.frequencia}</span>
                    {pos.adultos.doseMaxima && (
                      <><br /><span className="text-[#86868b]">{t('dosage.maxDose')}: {pos.adultos.doseMaxima}</span></>
                    )}
                  </div>
                  {pos.pediatrico && (
                    <div>
                      <span className="font-medium">{t('dosage.pediatric')}:</span> {pos.pediatrico.dose}
                      <br />
                      <span className="text-[#86868b]">{pos.pediatrico.observacoes}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contraindicações */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            {t('sections.contraindications')}
          </h2>
          <ul className="space-y-2">
            {medicamento.contraindicacoes.map((ci, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-800 dark:text-red-200">{ci}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Efeitos Adversos */}
        <div className="glass-strong rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            {t('sections.adverseEffects')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">{t('adverseEffects.common')}:</h3>
              <ul className="space-y-1 text-sm">
                {medicamento.efeitosAdversos.comuns.map((ea, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    {ea}
                  </li>
                ))}
              </ul>
            </div>
            {medicamento.efeitosAdversos.graves && (
              <div>
                <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">{t('adverseEffects.severe')}:</h3>
                <ul className="space-y-1 text-sm">
                  {medicamento.efeitosAdversos.graves.map((ea, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      {ea}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Interações */}
        {medicamento.interacoes.length > 0 && (
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              {t('sections.drugInteractions')}
            </h2>
            <div className="space-y-3">
              {medicamento.interacoes.map((int, idx) => {
                const cores = {
                  leve: 'bg-yellow-500/20 border-yellow-500/30',
                  moderada: 'bg-orange-500/20 border-orange-500/30',
                  grave: 'bg-red-500/20 border-red-500/30',
                  contraindicada: 'bg-red-600/30 border-red-600/50'
                };
                return (
                  <div key={idx} className={`${cores[int.gravidade]} border rounded-xl p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{int.medicamento}</span>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        int.gravidade === 'contraindicada' ? 'bg-red-600 text-white' :
                        int.gravidade === 'grave' ? 'bg-red-500 text-white' :
                        int.gravidade === 'moderada' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-black'
                      }`}>
                        {t(`interactions.severity.${int.gravidade}`)}
                      </span>
                    </div>
                    <p className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
                      <strong>{t('interactions.effect')}:</strong> {int.efeito}
                    </p>
                    <p className="text-sm text-[#86868b] mt-1">
                      <strong>{t('interactions.management')}:</strong> {int.conduta}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ajuste Renal */}
        {medicamento.ajusteDoseRenal && medicamento.ajusteDoseRenal.length > 0 && (
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
              <TestTube className="w-5 h-5 text-blue-500" />
              {t('sections.renalAdjustment')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-2 px-4 font-semibold">{t('renalAdjustment.gfr')}</th>
                    <th className="text-left py-2 px-4 font-semibold">{t('renalAdjustment.adjustment')}</th>
                    <th className="text-left py-2 px-4 font-semibold">{t('renalAdjustment.observation')}</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamento.ajusteDoseRenal.map((ajuste, idx) => (
                    <tr key={idx} className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2 px-4 font-mono">{ajuste.tfg}</td>
                      <td className="py-2 px-4">{ajuste.ajuste}</td>
                      <td className="py-2 px-4 text-[#86868b]">{ajuste.observacao || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-blue-500/10 rounded-xl">
              <Link href="/calculadoras" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                <Activity className="w-4 h-4" />
                {t('renalAdjustment.calculatorLink')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Segurança na Gestação e Amamentação */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`rounded-2xl p-6 ${gestacaoInfo.color} bg-opacity-20`}>
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Baby className="w-5 h-5" />
              {t('safety.pregnancy')} - {gestacaoInfo.label}
            </h2>
            <p className="text-sm">{gestacaoInfo.descricao}</p>
          </div>

          <div className={`rounded-2xl p-6 ${medicamento.amamentacao.compativel ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              {t('safety.breastfeeding')}
            </h2>
            <p className="text-sm">{medicamento.amamentacao.observacao}</p>
          </div>
        </div>

        {/* Apresentações */}
        <div className="glass-strong rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-500" />
            {t('sections.availablePresentations')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {medicamento.apresentacoes.map((ap, idx) => (
              <div key={idx} className="bg-teal-500/10 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="font-medium capitalize">{ap.forma.replace('_', ' ')}</span>
                  <span className="text-[#86868b] ml-2">{ap.concentracao}</span>
                </div>
                {ap.disponivelSUS && (
                  <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded">
                    SUS
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Orientações ao Paciente */}
        {medicamento.orientacoesPaciente && medicamento.orientacoesPaciente.length > 0 && (
          <div className="glass-subtle rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-500" />
              {t('sections.patientGuidelines')}
            </h2>
            <ul className="space-y-2">
              {medicamento.orientacoesPaciente.map((ori, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className="text-cyan-500">💡</span>
                  <span>{ori}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Last Update */}
      <div className="mt-8 text-center text-sm text-[#86868b]">
        {t('lastUpdate')}: {medicamento.lastUpdate}
      </div>
    </div>
  );
}

