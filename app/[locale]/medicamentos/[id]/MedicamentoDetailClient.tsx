'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  ArrowLeft, Baby, Heart,
  Clock, Shield, XCircle,
  CheckCircle, Stethoscope, AlertTriangle,
  Dna, ExternalLink, LockKeyhole, BadgeCheck, PackageSearch
} from 'lucide-react';
import { CLASSES_TERAPEUTICAS, type Medicamento } from '@/lib/types/medicamento';
import { useMedicalTerms } from '@/lib/i18n/useMedicalTerms';
import { PharmGKBDisplay } from '@/app/components/Ontology';
import { PharmGKBAlert } from '@/app/components/Pharmacogenomics/PharmGKBAlert';
import { PageContainer } from '@/app/components/Layout/Containers';
import { TrustBadge } from '@/app/components/ui/TrustBadge';
import { useGenotypeStore } from '@/lib/store/genotypeStore';
import { StaggerPageSections } from '@/lib/design-system/animations/page-transitions';
import { ScrollReveal } from '@/lib/design-system/animations/scroll';
import { getMedicationEvidenceSummary } from '@/lib/medication-safety';
import type { CanonicalMedicationIdentityView } from '@/lib/medication-safety';

interface MedicamentoDetailClientProps {
  medicamento: Medicamento;
  identity: CanonicalMedicationIdentityView;
  locale: string;
}

export default function MedicamentoDetailClient({ medicamento: med, identity, locale }: MedicamentoDetailClientProps) {
  const t = useTranslations('medicationDetail');
  const { translateMedication } = useMedicalTerms();

  const classeInfo = CLASSES_TERAPEUTICAS[med.classeTerapeutica];
  const evidence = getMedicationEvidenceSummary(med);
  const translatedName = translateMedication(med.atcCode, med.nomeGenerico);
  const { hasGenotypes } = useGenotypeStore();
  const hasPGxData = med.pharmgkb && med.pharmgkb.length > 0;
  const showPGxAlert = hasPGxData && hasGenotypes();

  useEffect(() => {
    if (!identity.requestedViaAlias) return;
    const canonicalPath = `/${locale}/medicamentos/${identity.canonicalPathId}/`;
    window.history.replaceState(window.history.state, '', canonicalPath);
  }, [identity.canonicalPathId, identity.requestedViaAlias, locale]);

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
        <header className="mb-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
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
            <span className={`inline-flex items-center gap-1 border px-3 py-1 text-sm font-bold ${
              evidence.knowledgeStatus === 'data-incomplete'
                ? 'border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200'
                : 'border-cyan-300 bg-cyan-50 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-200'
            }`}>
              <LockKeyhole className="h-4 w-4" /> {evidence.statusLabel}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight capitalize">
            {translatedName}
          </h1>

          <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
            {med.mecanismoAcao}
          </p>

          {med.editorialSummary ? (
            <div className="mb-6 border-l-2 border-cyan-500 bg-cyan-50 px-4 py-3 text-sm leading-relaxed text-cyan-950 dark:bg-cyan-950/20 dark:text-cyan-100">
              {med.editorialSummary}
            </div>
          ) : null}

          {/* Trust indicators */}
          <TrustBadge
            lastUpdated={med.lastUpdate}
            citationCount={med.citations?.length ?? 0}
            variant="inline"
            showLabels={true}
          />
          <div className="mt-5 grid gap-3 border-t border-neutral-200 pt-5 text-sm text-neutral-800 dark:border-neutral-800 dark:text-neutral-200 sm:grid-cols-3">
            <div><span className="block text-xs font-semibold uppercase text-neutral-500">Revisão informada</span>{evidence.reportedUpdateDate || 'Não estruturada'}</div>
            <div><span className="block text-xs font-semibold uppercase text-neutral-500">Fontes locais</span>{evidence.sourceReferenceCount}</div>
            <div><span className="block text-xs font-semibold uppercase text-neutral-500">Cálculo de dose</span>Bloqueado</div>
          </div>
          <div className="mt-5 border-t border-neutral-200 pt-5 dark:border-neutral-800">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-2 font-semibold text-teal-800 dark:text-teal-200">
                <BadgeCheck className="h-4 w-4" />
                {identity.status === 'source-confirmed' ? 'Identidade DCB confirmada' : 'Identidade candidata para revisão'}
              </span>
              <span className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <PackageSearch className="h-4 w-4" />
                {identity.productCount} apresentações · {identity.reviewRequiredProductCount} exigem revisão
              </span>
              <span className="font-mono text-xs text-neutral-500">{identity.conceptId}</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              {identity.aliasIds.length} registro{identity.aliasIds.length === 1 ? '' : 's'} legado{identity.aliasIds.length === 1 ? '' : 's'} preservado{identity.aliasIds.length === 1 ? '' : 's'}:
              {' '}{identity.aliases.map(alias => alias.displayName).join(' · ')}
            </p>
            {identity.dcbCodes.length > 0 && (
              <p className="mt-2 font-mono text-xs text-neutral-500">DCB {identity.dcbCodes.join(' · ')}</p>
            )}
          </div>
        </header>

        <section className="mb-8 border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/20">
          <div className="flex items-start gap-4">
            <Baby className="mt-0.5 h-6 w-6 shrink-0 text-amber-700 dark:text-amber-300" />
            <div>
              <h2 className="font-bold text-amber-950 dark:text-amber-100">Gravidez e lactação: avaliação narrativa</h2>
              <p className="mt-2 text-sm leading-relaxed text-amber-900 dark:text-amber-200">{evidence.pregnancyRiskNarrative}</p>
              <p className="mt-2 text-sm leading-relaxed text-amber-900 dark:text-amber-200">Lactação: {evidence.lactationNarrative}</p>
              <p className="mt-2 text-xs font-medium text-amber-800 dark:text-amber-300">As categorias históricas A/B/C/D/X não são usadas pelo Darwin Rx para decidir risco.</p>
            </div>
          </div>
        </section>

        <div className="mb-8 flex flex-wrap gap-3 text-sm">
          <a href={evidence.regulatorySourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-neutral-300 bg-white px-3 py-2 font-medium text-neutral-700 hover:border-teal-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
            Bulário Anvisa <ExternalLink className="h-4 w-4" />
          </a>
          <a href={evidence.formularySourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-neutral-300 bg-white px-3 py-2 font-medium text-neutral-700 hover:border-teal-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
            RENAME <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* PGx Alert Banner */}
        {showPGxAlert && (
          <section className="mb-8">
            <PharmGKBAlert
              medicationName={translatedName}
              pharmgkbData={med.pharmgkb!}
              onViewDetails={() => {
                const el = document.getElementById('pharmgkb');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </section>
        )}

        {/* PGx Banner - show link when medication has data but user has no genotypes */}
        {hasPGxData && !hasGenotypes() && (
          <section className="mb-8 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center gap-4">
            <Dna className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-base font-medium text-purple-800 dark:text-purple-200">
                Este medicamento tem dados farmacogenéticos
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Configure seus genótipos para ver alertas personalizados de dosagem.
              </p>
            </div>
            <Link
              href="/farmacogenetica"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
            >
              Configurar
            </Link>
          </section>
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
          <StaggerPageSections staggerDelay={0.1} className="flex-1 max-w-3xl space-y-8">
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
              <div className="mb-5 flex items-start gap-2 border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-200">
                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Texto legado para consulta e auditoria. Não é interpretado como regra, não calcula dose e não pode gerar rascunho verificado.</p>
              </div>

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
            <ScrollReveal animation="fadeInUp">
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
                    Nenhuma interação registrada neste item. Isso não confirma ausência de interação.
                  </p>
                )}
              </div>
            </section>
            </ScrollReveal>

            {/* Contraindications & Breastfeeding */}
            <ScrollReveal animation="fadeInUp">
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
            </ScrollReveal>

            {/* PharmGKB */}
            <ScrollReveal animation="fadeInUp">
            <section id="pharmgkb">
              <PharmGKBDisplay
                medicationName={med.nomeGenerico}
                pharmgkbData={med.pharmgkb}
              />
            </section>
            </ScrollReveal>
          </StaggerPageSections>
        </div>
      </PageContainer>
    </div>
  );
}
