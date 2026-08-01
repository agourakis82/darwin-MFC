'use client';

import { useState, useMemo, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/lib/store/appStore';
import { PageContainer } from '@/app/components/Layout/Containers';
import { fadeInUp } from '@/lib/design-system/animations/presets';
import {
  Search, Pill, Shield, Globe, LockKeyhole
} from 'lucide-react';
import { medicamentosConsolidados as localMedicamentos } from '@/lib/data/medicamentos/index';
import { CLASSES_TERAPEUTICAS, isAvailableInPublicSystem, getMedicamentosByClasse } from '@/lib/types/medicamento';
import { useMedicamentos } from '@/lib/hooks/use-medicamentos';
import { useMedicalTerms } from '@/lib/i18n/useMedicalTerms';
import { cn } from '@/lib/utils';
import { getCanonicalMedicationCatalog, getMedicationEvidenceSummary } from '@/lib/medication-safety';

export default function MedicamentosClient() {
  const t = useTranslations('medicamentos');
  const { translateMedication } = useMedicalTerms();
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClasse, setSelectedClasse] = useState<string | 'todas'>('todas');
  const [showRENAME, setShowRENAME] = useState(false);

  // The service returns the local 717-item union plus optional Supabase editorial rows.
  const { data: supabaseMedicamentos, loading } = useMedicamentos();
  const medicamentos = supabaseMedicamentos.length > 0 ? supabaseMedicamentos : localMedicamentos;
  const canonicalCatalog = useMemo(() => getCanonicalMedicationCatalog(medicamentos), [medicamentos]);

  // Hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const medicamentosAgrupados = useMemo(
    () => getMedicamentosByClasse(canonicalCatalog.map(entry => entry.medication)),
    [canonicalCatalog],
  );

  const medicamentosFiltrados = useMemo(() => {
    let filtered = canonicalCatalog;
    if (showRENAME) filtered = filtered.filter(entry => entry.medication.rename);
    if (selectedClasse !== 'todas') filtered = filtered.filter(entry => entry.medication.classeTerapeutica === selectedClasse);
    if (searchTerm.trim()) {
      const term = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      filtered = filtered.filter(({ medication: med, identity }) =>
        identity.normalizedSearchText.includes(term)
        || med.indicacoes.some(indication => indication.toLowerCase().includes(term))
        || med.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }
    return filtered;
  }, [canonicalCatalog, searchTerm, selectedClasse, showRENAME]);

  return (
    <div className="min-h-screen bg-paper-white dark:bg-carbon-950">
      <PageContainer className="py-8 md:py-12">
        {/* Header - High Authority */}
        <div className="mb-8 border-b border-carbon-200 pb-6 dark:border-carbon-800 md:mb-12 md:pb-8">
          <div className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h1 className="text-3xl font-display font-bold text-helix-navy dark:text-white sm:text-4xl">
              {t('title')}
            </h1>
            <span className="text-xs font-mono text-carbon-400 font-bold uppercase tracking-widest">
              {canonicalCatalog.length} conceitos canônicos / 717 registros reconciliados
            </span>
          </div>
          <p className="max-w-2xl font-body text-base leading-relaxed text-carbon-500 sm:text-lg">
            {t('description')}
          </p>
          <div className="mt-4 flex max-w-3xl items-start gap-2 border-l-2 border-amber-400 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>Catálogo completo e pesquisável. Cálculos de dose permanecem bloqueados até a regra específica ter fonte vigente, integridade e revisão independente por médico e farmacêutico.</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-carbon-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg text-helix-navy dark:text-white focus:ring-1 focus:ring-adenine-teal outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowRENAME(!showRENAME)}
            className={cn(
              "px-6 py-3 border border-carbon-200 dark:border-carbon-800 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all",
              showRENAME ? "bg-guanine-green text-white" : "bg-white dark:bg-carbon-900 text-carbon-600 hover:bg-clinical-gray"
            )}
          >
            <Shield className="w-4 h-4" />
            {t('renameOnly')}
          </button>
        </div>

        {/* Therapeutic Classes Ledger */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex gap-px bg-carbon-200 dark:bg-carbon-800 border border-carbon-200 dark:border-carbon-800 rounded-lg overflow-hidden min-w-max">
            <button
              onClick={() => setSelectedClasse('todas')}
              className={cn(
                "px-6 py-4 transition-colors text-xs font-bold uppercase tracking-widest",
                selectedClasse === 'todas' ? "bg-helix-navy text-white" : "bg-white dark:bg-carbon-900 text-carbon-500 hover:bg-clinical-gray"
              )}
            >
              {t('allClasses')}
            </button>
            {medicamentosAgrupados.map(grupo => (
              <button
                key={grupo.classe}
                onClick={() => setSelectedClasse(grupo.classe)}
                className={cn(
                  "px-6 py-4 transition-colors text-xs font-bold uppercase tracking-widest border-l border-carbon-200 dark:border-carbon-800",
                  selectedClasse === grupo.classe ? "bg-adenine-teal text-white" : "bg-white dark:bg-carbon-900 text-carbon-500 hover:bg-clinical-gray"
                )}
              >
                {grupo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compound Ledger */}
        <motion.div
          className="bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg overflow-hidden"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="hidden grid-cols-12 bg-clinical-gray dark:bg-carbon-800/50 border-b border-carbon-200 dark:border-carbon-700 px-6 py-3 text-[10px] font-bold text-carbon-400 uppercase tracking-widest md:grid">
            <div className="col-span-1">{t('table.category')}</div>
            <div className="col-span-4">{t('table.genericName')}</div>
            <div className="col-span-3">{t('table.indications')}</div>
            <div className="col-span-2">Estado Darwin Rx</div>
            <div className="col-span-2 text-right">{t('table.atcCode')}</div>
          </div>

          {medicamentosFiltrados.length === 0 ? (
            <div className="py-20 text-center text-carbon-500 font-body">{t('notFoundInHub')}</div>
          ) : (
            <div className="divide-y divide-carbon-100 dark:divide-carbon-800">
              {medicamentosFiltrados.map(({ medication: med, identity }) => {
                const classeInfo = CLASSES_TERAPEUTICAS[med.classeTerapeutica];
                const evidence = getMedicationEvidenceSummary(med);
                return (
                  <Link
                    key={identity.conceptId}
                    href={`/medicamentos/${identity.canonicalPathId}`}
                    className="group flex items-start gap-3 px-4 py-4 transition-all hover:bg-clinical-gray/50 dark:hover:bg-carbon-800/30 md:grid md:grid-cols-12 md:items-center md:px-6"
                  >
                    <div className="shrink-0 md:col-span-1">
                      <div className={cn("w-8 h-8 rounded flex items-center justify-center text-white", classeInfo.color.replace('bg-', 'bg-'))}>
                         <Pill className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 md:col-span-4 md:pr-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-helix-navy dark:text-white group-hover:text-adenine-teal transition-colors capitalize">
                          {translateMedication(med.atcCode, identity.preferredName)}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          {med.rename && <Shield className="w-3 h-3 text-guanine-green" />}
                          {isMounted && isAvailableInPublicSystem(med, selectedRegion) && (
                            <Globe className="w-3 h-3 text-adenine-teal" />
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] font-mono text-carbon-400 uppercase tracking-tight">
                        {identity.aliasIds.length > 1
                          ? `${identity.aliasIds.length} aliases históricos · ${identity.productCount} apresentações`
                          : med.nomesComerciais?.slice(0, 3).join(' • ') || t('notAvailable')}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 md:hidden">
                        <span className={cn(
                          "rounded border px-2 py-0.5 text-[10px] font-bold",
                          evidence.knowledgeStatus === 'data-incomplete'
                            ? 'border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200'
                            : 'border-cyan-300 bg-cyan-50 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-200',
                        )}>
                          {evidence.statusLabel}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-carbon-500">
                          {identity.atcCodes.join(' · ') || t('notAvailable')}
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:col-span-3 md:block md:pr-4">
                      <p className="text-xs text-carbon-600 dark:text-carbon-400 line-clamp-1 font-body italic">
                        {med.indicacoes.slice(0, 2).join(', ')}
                      </p>
                    </div>
                    <div className="hidden md:col-span-2 md:block">
                      <span className={cn(
                        "rounded border px-2 py-0.5 text-[10px] font-bold",
                        evidence.knowledgeStatus === 'data-incomplete'
                          ? 'border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200'
                          : 'border-cyan-300 bg-cyan-50 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-200',
                      )}>
                        {evidence.statusLabel}
                      </span>
                    </div>
                    <div className="hidden text-right md:col-span-2 md:block">
                      <span className="font-mono text-xs font-bold text-helix-navy dark:text-carbon-400">
                        {identity.atcCodes.join(' · ') || t('notAvailable')}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Footer Statistics */}
        <div className="mt-8 flex flex-col gap-3 text-[10px] font-bold uppercase tracking-widest text-carbon-400 sm:flex-row sm:items-center sm:justify-between">
           <div className="flex flex-wrap gap-4">
             <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-guanine-green" /> {t('footer.liveRepository')}</span>
             <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-adenine-teal" /> Fontes em reconciliação</span>
           </div>
           <span>{t('footer.pharmacyLedger')}</span>
        </div>
      </PageContainer>
    </div>
  );
}
