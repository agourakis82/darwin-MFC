'use client';

import { use, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAppStore } from '@/lib/store/appStore';
import {
  ArrowLeft, BookOpen, Pill, FileText, Calculator, AlertTriangle,
  CheckCircle, XCircle, Clock, Users, Heart, ChevronDown, ChevronUp,
  Stethoscope, Activity, Clipboard, Target, ExternalLink, ClipboardCheck,
  ChevronRight, Globe, TrendingUp
} from 'lucide-react';
import { CATEGORIAS_DOENCA, getRegionalPrevalence, getRegionalGuideline } from '@/lib/types/doenca';
import { useLocalizedDisease, LocalizedDoenca } from '@/lib/hooks/useLocalizedDisease';
import {
  getMedicamentosForDoenca,
  getProtocolosForDoenca,
  getCalculadorasForDoenca
} from '@/lib/data/cross-references';
import { notFound } from 'next/navigation';
import ChecklistConsultaComponent from '@/app/components/Checklist/ChecklistConsulta';
import { generateChecklistFromDoenca } from '@/lib/utils/checklist-generator';
import { OntologyCodesDisplay } from '@/app/components/Ontology';
import { PageContainer } from '@/app/components/Layout/Containers';
import { cn } from '@/lib/utils';

// Loading Skeleton Component
function DoencaDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
      <div className="h-5 w-32 bg-carbon-200 dark:bg-carbon-800 rounded mb-8" />
      <div className="flex gap-8">
        <div className="hidden lg:block w-64 space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-4 bg-carbon-200 dark:bg-carbon-800 rounded w-full" />
          ))}
        </div>
        <div className="flex-1 space-y-6">
          <div className="h-12 bg-carbon-200 dark:bg-carbon-800 rounded w-3/4" />
          <div className="h-32 bg-carbon-200 dark:bg-carbon-800 rounded w-full" />
        </div>
      </div>
    </div>
  );
}

// Error Display Component
function DoencaDetailError({ error }: { error: Error }) {
  const t = useTranslations('diseaseDetail');

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="p-12 border border-critical-red/20 bg-critical-red/5 rounded-lg text-center">
        <AlertTriangle className="w-12 h-12 text-critical-red mx-auto mb-4" />
        <h2 className="text-xl font-display font-bold text-helix-navy dark:text-white mb-2">{t('error.title')}</h2>
        <p className="text-carbon-500 mb-6">{error.message || t('error.generic')}</p>
        <Link href="/doencas" className="btn-tactile inline-block">
          {t('backToDiseases')}
        </Link>
      </div>
    </div>
  );
}

export default function DoencaDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('diseaseDetail');
  const { id } = use(params);
  const { disease: doenca, isLoading, error } = useLocalizedDisease(id);
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const [isMounted, setIsMounted] = useState(false);

  const [activeView, setActiveView] = useState<'quick' | 'full' | 'checklist'>('quick');

  // Hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (isLoading) return <DoencaDetailSkeleton />;
  if (error) return <DoencaDetailError error={error} />;
  if (!doenca) notFound();

  const categoriaInfo = doenca.categoria ? CATEGORIAS_DOENCA[doenca.categoria] : CATEGORIAS_DOENCA['outros'];
  const checklist = generateChecklistFromDoenca(doenca as any);

  // Regional data
  const regionalPrevalence = isMounted && doenca ? getRegionalPrevalence(doenca as any, selectedRegion) : null;
  const regionalGuideline = isMounted && doenca ? getRegionalGuideline(doenca as any, selectedRegion) : null;

  const sections = [
    { id: 'definition', label: t('sections.definition'), icon: Stethoscope },
    { id: 'diagnosis', label: t('sections.diagnosticCriteria'), icon: Clipboard },
    { id: 'treatment', label: t('sections.fullTreatment'), icon: Pill },
    { id: 'follow-up', label: t('sections.followUp'), icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-paper-white dark:bg-carbon-950">
      {/* 0. Breadcrumb HUD */}
      <div className="border-b border-carbon-200 dark:border-carbon-800 bg-clinical-gray/50 dark:bg-carbon-900/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono text-carbon-500 uppercase tracking-widest">
            <Link href="/doencas" className="hover:text-helix-navy transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> {t('backToDiseases')}
            </Link>
            <span className="text-carbon-300">/</span>
            <span className="text-carbon-400">{categoriaInfo.label}</span>
            <span className="text-carbon-300">/</span>
            <span className="text-helix-navy dark:text-white font-bold">{doenca.titulo}</span>
          </div>
          
          <div className="flex gap-1">
            {['quick', 'full', 'checklist'].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view as any)}
                className={cn(
                  "px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded transition-all",
                  activeView === view 
                    ? "bg-helix-navy text-white" 
                    : "text-carbon-500 hover:bg-carbon-200 dark:hover:bg-carbon-800"
                )}
              >
                {t(`views.${view === 'quick' ? 'quickView' : view === 'full' ? 'fullVersion' : 'checklist'}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. The Metadata Abstract */}
      <div className="clinical-abstract">
        <div className="flex items-center gap-2">
          <span className="text-carbon-400">CIAP-2:</span>
          {doenca.ciap2?.map(c => <span key={c} className="bg-helix-navy/10 text-helix-navy px-1.5 rounded">{c}</span>)}
        </div>
        <div className="w-px h-4 bg-carbon-200 dark:bg-carbon-800" />
        <div className="flex items-center gap-2">
          <span className="text-carbon-400">CID-10:</span>
          {doenca.cid10?.map(c => <span key={c} className="bg-adenine-teal/10 text-adenine-teal px-1.5 rounded">{c}</span>)}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-carbon-400">UPDATED:</span>
          <span className="font-bold">{doenca.lastUpdate}</span>
        </div>
      </div>

      {/* Regional Context Information */}
      {isMounted && (regionalPrevalence || regionalGuideline) && (
        <div className="border-b border-carbon-200 dark:border-carbon-800 bg-clinical-gray/30 dark:bg-carbon-900/30">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regionalPrevalence && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-adenine-teal/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-adenine-teal" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-carbon-400 uppercase tracking-widest mb-1.5">
                      Regional Prevalence ({selectedRegion})
                    </div>
                    <div className="text-lg font-display font-bold text-helix-navy dark:text-white mb-1">
                      {regionalPrevalence.value}
                    </div>
                    <div className="text-xs text-carbon-500">
                      Source: {regionalPrevalence.source} ({regionalPrevalence.year})
                    </div>
                  </div>
                </div>
              )}
              {regionalGuideline && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-guanine-green/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-guanine-green" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-carbon-400 uppercase tracking-widest mb-1.5">
                      Regional Guideline ({selectedRegion})
                    </div>
                    <div className="text-base font-semibold text-helix-navy dark:text-white mb-1">
                      {regionalGuideline.name}
                    </div>
                    <div className="text-xs text-carbon-500 flex items-center gap-1 flex-wrap">
                      <span>{regionalGuideline.organization} ({regionalGuideline.year})</span>
                      {regionalGuideline.url && (
                        <>
                          <span className="text-carbon-300">•</span>
                          <a
                            href={regionalGuideline.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-adenine-teal hover:underline inline-flex items-center gap-1"
                          >
                            View guideline <ExternalLink className="w-3 h-3" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <PageContainer className="py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* 2. Sticky ToC Sidebar */}
          <aside className="lg:w-64 hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <div>
                <h4 className="text-[10px] font-bold text-carbon-400 uppercase tracking-[0.2em] mb-4">Contents</h4>
                <nav className="flex flex-col gap-2">
                  {sections.map(s => (
                    <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-3 text-sm text-carbon-500 hover:text-helix-navy transition-colors">
                      <div className="w-1 h-1 rounded-full bg-carbon-300 group-hover:bg-helix-navy transition-colors" />
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
              
              <div className="pt-8 border-t border-carbon-200 dark:border-carbon-800">
                <h4 className="text-[10px] font-bold text-carbon-400 uppercase tracking-[0.2em] mb-4">Actions</h4>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center gap-2 text-xs font-semibold text-carbon-600 hover:text-adenine-teal">
                    <ClipboardCheck className="w-4 h-4" /> Export Protocol
                  </button>
                  <button className="flex items-center gap-2 text-xs font-semibold text-carbon-600 hover:text-adenine-teal">
                    <FileText className="w-4 h-4" /> Print Guidelines
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* 3. Main Clinical Column */}
          <main className="flex-1 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-helix-navy dark:text-white mb-6">
              {doenca.titulo}
            </h1>

            {activeView === 'checklist' ? (
              <ChecklistConsultaComponent
                checklist={checklist}
                onComplete={(progress) => {
                  localStorage.setItem(`checklist-${checklist.id}`, JSON.stringify(progress));
                }}
              />
            ) : (
              <div className="space-y-16">
                {/* 3.1 The Bottom Line (Summary) */}
                <section id="definition">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded bg-helix-navy/5 flex items-center justify-center">
                      <Stethoscope className="w-4 h-4 text-helix-navy" />
                    </div>
                    <h2 className="text-xl font-display font-bold uppercase tracking-widest text-carbon-400">01. {t('sections.definition')}</h2>
                  </div>
                  <div className="bg-thymine-gold/5 border-l-4 border-thymine-gold p-6 rounded-r-lg italic font-body text-lg leading-relaxed text-helix-navy dark:text-carbon-100">
                    "{doenca.quickView?.definicao || doenca.fullContent?.quadroClinico?.sintomasPrincipais?.[0]}"
                  </div>
                </section>

                {/* 3.2 Clinical Ledger Sections */}
                <section id="diagnosis" className="space-y-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded bg-adenine-teal/5 flex items-center justify-center">
                      <Clipboard className="w-4 h-4 text-adenine-teal" />
                    </div>
                    <h2 className="text-xl font-display font-bold uppercase tracking-widest text-carbon-400">02. {t('sections.diagnosticCriteria')}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {(doenca.quickView?.criteriosDiagnosticos || doenca.fullContent?.diagnostico?.criterios)?.map((c, i) => (
                      <div key={i} className="flex gap-4 p-4 card-ledger group">
                        <div className="w-6 h-6 rounded-full bg-carbon-100 dark:bg-carbon-800 flex items-center justify-center text-[10px] font-bold text-carbon-500 group-hover:bg-adenine-teal group-hover:text-white transition-colors">
                          {i + 1}
                        </div>
                        <p className="flex-1 text-carbon-700 dark:text-carbon-300">{c}</p>
                      </div>
                    ))}
                  </div>

                  {doenca.quickView?.redFlags && (
                    <div className="p-6 border border-critical-red/20 bg-critical-red/5 rounded-lg">
                      <h4 className="flex items-center gap-2 text-critical-red font-bold text-xs uppercase tracking-widest mb-4">
                        <AlertTriangle className="w-4 h-4" /> {t('sections.redFlags')}
                      </h4>
                      <ul className="space-y-3">
                        {doenca.quickView.redFlags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-semibold text-critical-red/80">
                            <span className="text-critical-red">•</span> {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>

                {/* 3.3 Management Protocol */}
                <section id="treatment" className="space-y-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded bg-guanine-green/5 flex items-center justify-center">
                      <Pill className="w-4 h-4 text-guanine-green" />
                    </div>
                    <h2 className="text-xl font-display font-bold uppercase tracking-widest text-carbon-400">03. Clinical Management</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-clinical-gray dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg">
                      <h4 className="text-[10px] font-bold text-carbon-400 uppercase tracking-[0.2em] mb-4">Pharmacological</h4>
                      <ul className="space-y-3">
                        {(doenca.quickView?.tratamentoPrimeiraLinha?.farmacologico || []).map((item, i) => (
                          <li key={i} className="text-sm flex gap-3 text-helix-navy dark:text-carbon-200">
                            <CheckCircle className="w-4 h-4 text-adenine-teal flex-shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 bg-clinical-gray dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg">
                      <h4 className="text-[10px] font-bold text-carbon-400 uppercase tracking-[0.2em] mb-4">Non-Pharmacological</h4>
                      <ul className="space-y-3">
                        {(doenca.quickView?.tratamentoPrimeiraLinha?.naoFarmacologico || []).map((item, i) => (
                          <li key={i} className="text-sm flex gap-3 text-helix-navy dark:text-carbon-200">
                            <div className="w-4 h-4 border border-carbon-300 rounded-full flex-shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 4. Cross References */}
                <CrossReferencesSection doencaId={id} />
              </div>
            )}
          </main>
        </div>
      </PageContainer>
    </div>
  );
}

function CrossReferencesSection({ doencaId }: { doencaId: string }) {
  const t = useTranslations('diseaseDetail');
  const medicamentos = getMedicamentosForDoenca(doencaId);
  const protocolos = getProtocolosForDoenca(doencaId);
  const calculadoras = getCalculadorasForDoenca(doencaId);

  if (medicamentos.length === 0 && protocolos.length === 0 && calculadoras.length === 0) return null;

  return (
    <div className="mt-20 pt-12 border-t border-carbon-200 dark:border-carbon-800">
      <h3 className="text-[10px] font-bold text-carbon-400 uppercase tracking-[0.3em] mb-8">Related Authority Data</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicamentos.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-helix-navy dark:text-carbon-200 flex items-center gap-2">
              <Pill className="w-4 h-4" /> Pharmacy Hub
            </h4>
            <div className="flex flex-col gap-2">
              {medicamentos.slice(0, 3).map(m => (
                <Link key={m.medicamentoId} href={`/medicamentos/${m.medicamentoId}`} className="text-sm text-adenine-teal hover:underline flex items-center justify-between group">
                  {m.nomeGenerico} <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
        {protocolos.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-helix-navy dark:text-carbon-200 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Logic Trails
            </h4>
            <div className="flex flex-col gap-2">
              {protocolos.map(p => (
                <Link key={p.protocoloId} href={`/protocolos?id=${p.protocoloId}`} className="text-sm text-adenine-teal hover:underline flex items-center justify-between group">
                  {p.titulo} <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
        {calculadoras.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-helix-navy dark:text-carbon-200 flex items-center gap-2">
              <Calculator className="w-4 h-4" /> Metric HUD
            </h4>
            <div className="flex flex-col gap-2">
              {calculadoras.map(c => (
                <Link key={c.calculadoraId} href={`/calculadoras#${c.calculadoraId}`} className="text-sm text-adenine-teal hover:underline flex items-center justify-between group">
                  {c.nome} <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}