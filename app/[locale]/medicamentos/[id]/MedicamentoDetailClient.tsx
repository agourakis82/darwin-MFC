'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  ArrowLeft, Pill, AlertTriangle, Baby, Heart, TestTube,
  Clock, Shield, BookOpen, ChevronRight, Activity, XCircle,
  CheckCircle, Info, Stethoscope, Dna, FileText, Download
} from 'lucide-react';
import { medicamentosConsolidados as medicamentos, getMedicamentoById } from '@/lib/data/medicamentos/index';
import { CLASSES_TERAPEUTICAS, CLASSIFICACAO_GESTACAO } from '@/lib/types/medicamento';
import { useMedicalTerms } from '@/lib/i18n/useMedicalTerms';
import { notFound } from 'next/navigation';
import { PharmGKBDisplay } from '@/app/components/Ontology';
import { PageContainer } from '@/app/components/Layout/Containers';
import { cn } from '@/lib/utils';

export default function MedicamentoDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('medicationDetail');
  const { translateMedication } = useMedicalTerms();
  const { id } = use(params);
  const med = getMedicamentoById(id);

  if (!med) notFound();

  const classeInfo = CLASSES_TERAPEUTICAS[med.classeTerapeutica];
  const gestacaoInfo = CLASSIFICACAO_GESTACAO[med.gestacao];
  const translatedName = translateMedication(med.atcCode, med.nomeGenerico);

  // Pregnancy category colors - clinical grade
  const pregnancyCategoryColors: Record<string, string> = {
    A: 'bg-emerald-600',
    B: 'bg-teal-600',
    C: 'bg-amber-500',
    D: 'bg-red-600',
    X: 'bg-red-700',
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-neutral-950">
      {/* Breadcrumb - Clinical grade readable */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-base text-neutral-600 dark:text-neutral-400">
            <Link href="/medicamentos" className="hover:text-teal-600 transition-colors flex items-center gap-2 font-medium">
              <ArrowLeft className="w-5 h-5" /> {t('backToPharmacy')}
            </Link>
            <span className="text-neutral-300 dark:text-neutral-600">›</span>
            <span>{classeInfo.label}</span>
          </div>
        </div>
      </div>

      <PageContainer className="py-8">
        {/* Hero Header - Large, scannable */}
        <header className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
              {classeInfo.label}
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              ATC: {med.atcCode}
            </span>
            {med.rename && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                <Shield className="w-4 h-4" /> RENAME
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight capitalize">
            {translatedName}
          </h1>

          <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
            {med.mecanismoAcao}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-4 text-base text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Atualizado: {med.lastUpdate}
            </span>
          </div>
        </header>

        {/* PREGNANCY ALERT - Unmissable for D/X categories */}
        {(med.gestacao === 'D' || med.gestacao === 'X') && (
          <section className="bg-red-600 text-white rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Baby className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {med.gestacao === 'X' ? 'CONTRAINDICADO NA GESTAÇÃO' : 'RISCO NA GESTAÇÃO'}
                </h2>
                <p className="text-lg leading-relaxed opacity-95">
                  Categoria {med.gestacao} FDA. {gestacaoInfo.descricao}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Pregnancy Badge for other categories */}
        {med.gestacao !== 'D' && med.gestacao !== 'X' && (
          <div className="mb-8 p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm flex items-center gap-4">
            <Baby className="w-6 h-6 text-neutral-500" />
            <div className="flex items-center gap-3">
              <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">Gestação:</span>
              <span className={cn("px-3 py-1 rounded-full text-sm font-bold text-white", pregnancyCategoryColors[med.gestacao] || 'bg-neutral-500')}>
                Categoria {med.gestacao}
              </span>
              <span className="text-base text-neutral-600 dark:text-neutral-400">{gestacaoInfo.descricao}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Larger touch targets */}
          <aside className="lg:w-72 hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <nav className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-4">
                <h3 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4 px-2">
                  Navegação
                </h3>
                <div className="flex flex-col gap-1">
                  {[
                    { href: '#indications', icon: Stethoscope, label: 'Indicações' },
                    { href: '#dosage', icon: Clock, label: 'Posologia' },
                    { href: '#interactions', icon: AlertTriangle, label: 'Interações' },
                    { href: '#contraindications', icon: XCircle, label: 'Contraindicações' },
                  ].map(item => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </a>
                  ))}
                </div>
              </nav>

              {/* Commercial Names */}
              {med.nomesComerciais && med.nomesComerciais.length > 0 && (
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-5">
                  <h4 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
                    Nomes Comerciais
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {med.nomesComerciais.map(n => (
                      <span key={n} className="text-sm bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg text-neutral-700 dark:text-neutral-300">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-3xl space-y-8">
            {/* Indications - Key Points style */}
            <section id="indications" className="bg-teal-50 dark:bg-teal-950/40 rounded-2xl p-6 border-2 border-teal-200 dark:border-teal-800">
              <h2 className="text-lg font-bold text-teal-800 dark:text-teal-200 mb-4 flex items-center gap-2">
                <Stethoscope className="w-6 h-6" />
                INDICAÇÕES
              </h2>
              <ul className="space-y-3 text-base text-neutral-800 dark:text-neutral-200">
                {(med.indicacoes ?? []).map((ind, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Dosage - Quick reference cards */}
            <section id="dosage" className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 border-l-4 border-teal-500 pl-4">
                Posologia
              </h2>

              <div className="grid gap-4">
                {(med.posologias ?? []).map((p, i) => (
                  <div key={i} className="bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden">
                    <div className="bg-neutral-100 dark:bg-neutral-700 px-5 py-3">
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                        {p.indicacao}
                      </h3>
                    </div>
                    <div className="p-5 grid sm:grid-cols-2 gap-6">
                      {p.adultos && (
                        <div>
                          <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                            Adultos
                          </span>
                          <p className="text-lg text-teal-700 dark:text-teal-300 font-medium mt-1">
                            {p.adultos.dose}
                          </p>
                          <p className="text-base text-neutral-600 dark:text-neutral-400 mt-1">
                            {p.adultos.frequencia}
                          </p>
                        </div>
                      )}
                      {p.pediatrico && (
                        <div className="sm:border-l sm:border-neutral-200 dark:sm:border-neutral-700 sm:pl-6">
                          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                            Pediátrico
                          </span>
                          <p className="text-lg text-teal-700 dark:text-teal-300 font-medium mt-1">
                            {p.pediatrico.dose}
                          </p>
                          <p className="text-base text-neutral-600 dark:text-neutral-400 mt-1">
                            {p.pediatrico.observacoes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactions - Color-coded severity */}
            <section id="interactions" className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 border-l-4 border-teal-500 pl-4">
                Interações Medicamentosas
              </h2>

              <div className="space-y-4">
                {(med.interacoes ?? []).map((int, i) => (
                  <div key={i} className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-neutral-900 dark:text-white">
                        {int.medicamento}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-600 text-white">
                        GRAVE
                      </span>
                    </div>
                    <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {int.efeito}
                    </p>
                    <p className="text-base font-semibold text-red-700 dark:text-red-400 mt-3">
                      ⛔ {int.conduta}
                    </p>
                  </div>
                ))}

                {(!med.interacoes || med.interacoes.length === 0) && (
                  <p className="text-base text-neutral-600 dark:text-neutral-400 italic">
                    Nenhuma interação crítica registrada.
                  </p>
                )}
              </div>
            </section>

            {/* Contraindications & Breastfeeding */}
            <section id="contraindications" className="grid sm:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-base font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  CONTRAINDICAÇÕES
                </h3>
                <ul className="space-y-2">
                  {(med.contraindicacoes ?? []).map((c, i) => (
                    <li key={i} className="text-base text-neutral-800 dark:text-neutral-200 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-base font-bold text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  AMAMENTAÇÃO
                </h3>
                <p className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {med.amamentacao.observacao}
                </p>
              </div>
            </section>

            {/* PharmGKB */}
            <section>
              <PharmGKBDisplay
                medicationName={med.nomeGenerico}
                pharmgkbData={med.pharmgkb}
              />
            </section>
          </main>
        </div>
      </PageContainer>
    </div>
  );
}