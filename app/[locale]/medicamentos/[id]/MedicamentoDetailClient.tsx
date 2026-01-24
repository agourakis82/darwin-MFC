'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  ArrowLeft, Pill, AlertTriangle, Baby, Heart, TestTube,
  Clock, Shield, BookOpen, ChevronRight, Activity, XCircle,
  CheckCircle, Info, Stethoscope, Dna, FileText, Download
} from 'lucide-react';
import { medicamentos, getMedicamentoById } from '@/lib/data/medicamentos';
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

  return (
    <div className="min-h-screen bg-paper-white dark:bg-carbon-950">
      {/* 0. Breadcrumb HUD */}
      <div className="border-b border-carbon-200 dark:border-carbon-800 bg-clinical-gray/50 dark:bg-carbon-900/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono text-carbon-500 uppercase tracking-widest">
            <Link href="/medicamentos" className="hover:text-helix-navy transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> {t('backToPharmacy')}
            </Link>
            <span className="text-carbon-300">/</span>
            <span className="text-carbon-400">{classeInfo.label}</span>
            <span className="text-carbon-300">/</span>
            <span className="text-helix-navy dark:text-white font-bold">{translatedName}</span>
          </div>
          
          <div className="flex gap-4">
             <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-carbon-500 hover:text-helix-navy">
               <Download className="w-3 h-3" /> Export Monograph
             </button>
          </div>
        </div>
      </div>

      {/* 1. Clinical Abstract HUD */}
      <div className="clinical-abstract">
        <div className="flex items-center gap-2">
          <span className="text-carbon-400 uppercase tracking-wider">ATC:</span>
          <span className="bg-helix-navy text-white px-2 py-0.5 rounded text-[10px] font-bold">{med.atcCode}</span>
        </div>
        <div className="w-px h-4 bg-carbon-200 dark:bg-carbon-800" />
        <div className="flex items-center gap-2">
          <span className="text-carbon-400 uppercase tracking-wider">PREGNANCY:</span>
          <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold text-white", gestacaoInfo.color.replace('bg-', 'bg-'))}>
            CAT {med.gestacao}
          </span>
        </div>
        <div className="w-px h-4 bg-carbon-200 dark:bg-carbon-800" />
        {med.rename && (
          <span className="text-guanine-green font-bold flex items-center gap-1">
            <Shield className="w-3 h-3" /> RENAME LIST
          </span>
        )}
        <div className="ml-auto flex items-center gap-3">
          <span className="text-carbon-400">UPDATED:</span>
          <span className="font-bold">{med.lastUpdate}</span>
        </div>
      </div>

      <PageContainer className="py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* 2. Sidebar Navigation */}
          <aside className="lg:w-64 hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <nav className="flex flex-col gap-4">
                <a href="#action" className="text-sm font-semibold text-helix-navy flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Mechanism
                </a>
                <a href="#indications" className="text-sm font-semibold text-carbon-500 hover:text-helix-navy flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" /> Indications
                </a>
                <a href="#dosage" className="text-sm font-semibold text-carbon-500 hover:text-helix-navy flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Dosage
                </a>
                <a href="#interactions" className="text-sm font-semibold text-carbon-500 hover:text-helix-navy flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Interactions
                </a>
              </nav>

              <div className="p-4 bg-clinical-gray dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg">
                <h4 className="text-[10px] font-bold text-carbon-400 uppercase tracking-widest mb-3">Commercial Names</h4>
                <div className="flex flex-wrap gap-2">
                  {med.nomesComerciais?.map(n => (
                    <span key={n} className="text-[10px] font-mono bg-white dark:bg-carbon-800 border border-carbon-200 px-1.5 py-0.5 rounded text-carbon-600">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* 3. Main Content */}
          <main className="flex-1 max-w-3xl space-y-16">
            <header>
               <h1 className="text-4xl sm:text-5xl font-display font-bold text-helix-navy dark:text-white mb-4 capitalize">
                 {translatedName}
               </h1>
               <p className="text-lg text-carbon-500 font-body leading-relaxed max-w-xl">
                 Comprehensive pharmaceutical reference for clinical decision support in primary care settings.
               </p>
            </header>

            {/* 3.1 Mechanism of Action */}
            <section id="action">
               <div className="flex items-center gap-2 mb-6">
                 <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-carbon-400">Pharmacological Basis</h2>
               </div>
               <div className="p-8 bg-clinical-gray dark:bg-carbon-900 border-l-4 border-adenine-teal rounded-r-lg">
                 <p className="text-lg font-body leading-relaxed text-helix-navy dark:text-carbon-100">
                   {med.mecanismoAcao}
                 </p>
               </div>
            </section>

            {/* 3.2 Indications */}
            <section id="indications">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-carbon-400 mb-6">Clinical Indications</h2>
              <div className="grid gap-3">
                {med.indicacoes.map((ind, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 card-ledger">
                    <CheckCircle className="w-5 h-5 text-guanine-green" />
                    <span className="font-semibold text-helix-navy dark:text-carbon-200">{ind}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3.3 Dosage Registry */}
            <section id="dosage">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-carbon-400 mb-6">Dosage & Administration</h2>
              <div className="space-y-4">
                {med.posologias.map((p, i) => (
                  <div key={i} className="card-ledger">
                    <div className="bg-clinical-gray dark:bg-carbon-800 px-6 py-3 border-b border-carbon-200 dark:border-carbon-700">
                       <h3 className="text-sm font-bold text-helix-navy dark:text-white uppercase tracking-wider">{p.indicacao}</h3>
                    </div>
                    <div className="p-6 grid sm:grid-cols-2 gap-8">
                       <div className="space-y-2">
                         <span className="text-[10px] font-bold text-carbon-400 uppercase tracking-widest">Adult Protocol</span>
                         <p className="font-mono text-sm text-helix-navy dark:text-carbon-200 font-bold">{p.adultos.dose}</p>
                         <p className="text-xs text-carbon-500 font-body">{p.adultos.frequencia}</p>
                       </div>
                       {p.pediatrico && (
                         <div className="space-y-2 border-l border-carbon-200 dark:border-carbon-800 pl-8">
                           <span className="text-[10px] font-bold text-adenine-teal uppercase tracking-widest">Pediatric HUD</span>
                           <p className="font-mono text-sm text-helix-navy dark:text-carbon-200 font-bold">{p.pediatrico.dose}</p>
                           <p className="text-xs text-carbon-500 font-body">{p.pediatrico.observacoes}</p>
                         </div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3.4 Risk Management */}
            <section id="interactions" className="space-y-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-carbon-400 mb-6">Interaction Ledger</h2>
              
              <div className="space-y-3">
                {med.interacoes.map((int, i) => (
                  <div key={i} className="flex gap-6 p-6 card-ledger border-l-4 border-l-critical-red">
                     <div className="w-12 h-12 rounded bg-critical-red/5 flex items-center justify-center flex-shrink-0">
                       <AlertTriangle className="w-6 h-6 text-critical-red" />
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                           <h4 className="font-bold text-helix-navy dark:text-white">{int.medicamento}</h4>
                           <span className="text-[10px] font-bold uppercase bg-critical-red text-white px-2 py-0.5 rounded">CRITICAL</span>
                        </div>
                        <p className="text-sm font-body text-carbon-600 dark:text-carbon-400 leading-relaxed">
                          {int.efeito}
                        </p>
                        <div className="mt-4 p-3 bg-clinical-gray dark:bg-carbon-800 rounded border border-carbon-200 text-xs font-semibold text-helix-navy">
                          CONDUTA: {int.conduta}
                        </div>
                     </div>
                  </div>
                ))}
              </div>

              {/* Safety Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-6 bg-critical-red/5 border border-critical-red/20 rounded-lg">
                   <h4 className="text-[10px] font-bold text-critical-red uppercase tracking-widest mb-3 flex items-center gap-2">
                     <XCircle className="w-3 h-3" /> Contraindications
                   </h4>
                   <ul className="space-y-2">
                     {med.contraindicacoes.slice(0, 3).map((c, i) => (
                       <li key={i} className="text-xs text-carbon-700 dark:text-carbon-300 font-body">• {c}</li>
                     ))}
                   </ul>
                </div>
                <div className="p-6 bg-guanine-green/5 border border-guanine-green/20 rounded-lg">
                   <h4 className="text-[10px] font-bold text-guanine-green uppercase tracking-widest mb-3 flex items-center gap-2">
                     <Heart className="w-3 h-3" /> Breastfeeding
                   </h4>
                   <p className="text-xs text-carbon-700 dark:text-carbon-300 font-body">
                     {med.amamentacao.observacao}
                   </p>
                </div>
              </div>
            </section>

            {/* PharmGKB HUD */}
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