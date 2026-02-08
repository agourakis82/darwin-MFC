'use client';

import { useState, useMemo, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/lib/store/appStore';
import { PageContainer } from '@/app/components/Layout/Containers';
import {
  Search, Pill, Shield, ChevronRight, Activity, Baby, AlertTriangle, Globe, Loader2
} from 'lucide-react';
import { medicamentosConsolidados as localMedicamentos } from '@/lib/data/medicamentos/index';
import { CLASSES_TERAPEUTICAS, CLASSIFICACAO_GESTACAO, isAvailableInPublicSystem, getMedicamentosByClasse } from '@/lib/types/medicamento';
import { useMedicamentos } from '@/lib/hooks/use-medicamentos';
import { useMedicalTerms } from '@/lib/i18n/useMedicalTerms';
import { cn } from '@/lib/utils';

export default function MedicamentosClient() {
  const t = useTranslations('medicamentos');
  const { translateMedication } = useMedicalTerms();
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClasse, setSelectedClasse] = useState<string | 'todas'>('todas');
  const [showRENAME, setShowRENAME] = useState(false);

  // Fetch from Supabase when configured, falls back to local data
  const { data: supabaseMedicamentos, loading } = useMedicamentos();
  const medicamentos = supabaseMedicamentos.length > 0 ? supabaseMedicamentos : localMedicamentos;

  // Hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const medicamentosAgrupados = useMemo(() => getMedicamentosByClasse(medicamentos), [medicamentos]);

  const medicamentosFiltrados = useMemo(() => {
    let filtered = medicamentos;
    if (showRENAME) filtered = filtered.filter(m => m.rename);
    if (selectedClasse !== 'todas') filtered = filtered.filter(m => m.classeTerapeutica === selectedClasse);
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.nomeGenerico.toLowerCase().includes(term) ||
        m.nomesComerciais?.some(n => n.toLowerCase().includes(term)) ||
        m.indicacoes.some(i => i.toLowerCase().includes(term)) ||
        m.tags?.some(t => t.toLowerCase().includes(term))
      );
    }
    return filtered;
  }, [medicamentos, searchTerm, selectedClasse, showRENAME]);

  return (
    <div className="min-h-screen bg-paper-white dark:bg-carbon-950">
      <PageContainer className="py-12">
        {/* Header - High Authority */}
        <div className="mb-12 border-b border-carbon-200 dark:border-carbon-800 pb-8">
          <div className="flex items-baseline gap-4 mb-2">
            <h1 className="text-4xl font-display font-bold text-helix-navy dark:text-white">
              {t('title')}
            </h1>
            <span className="text-xs font-mono text-carbon-400 font-bold uppercase tracking-widest">
              {t('activeCompounds', { count: medicamentos.length })}
            </span>
          </div>
          <p className="text-lg text-carbon-500 font-body max-w-2xl leading-relaxed">
            {t('description')}
          </p>
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
        <div className="bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-clinical-gray dark:bg-carbon-800/50 border-b border-carbon-200 dark:border-carbon-700 px-6 py-3 text-[10px] font-bold text-carbon-400 uppercase tracking-widest">
            <div className="col-span-1">{t('table.category')}</div>
            <div className="col-span-4">{t('table.genericName')}</div>
            <div className="col-span-3">{t('table.indications')}</div>
            <div className="col-span-2">{t('table.pregnancy')}</div>
            <div className="col-span-2 text-right">{t('table.atcCode')}</div>
          </div>

          {medicamentosFiltrados.length === 0 ? (
            <div className="py-20 text-center text-carbon-500 font-body">{t('notFoundInHub')}</div>
          ) : (
            <div className="divide-y divide-carbon-100 dark:divide-carbon-800">
              {medicamentosFiltrados.map((med) => {
                const classeInfo = CLASSES_TERAPEUTICAS[med.classeTerapeutica];
                const gestacaoInfo = CLASSIFICACAO_GESTACAO[med.gestacao];
                return (
                  <Link
                    key={med.id}
                    href={`/medicamentos/${med.id}`}
                    className="grid grid-cols-12 items-center px-6 py-4 hover:bg-clinical-gray/50 dark:hover:bg-carbon-800/30 transition-all group"
                  >
                    <div className="col-span-1">
                      <div className={cn("w-8 h-8 rounded flex items-center justify-center text-white", classeInfo.color.replace('bg-', 'bg-'))}>
                         <Pill className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="col-span-4 pr-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-helix-navy dark:text-white group-hover:text-adenine-teal transition-colors capitalize">
                          {translateMedication(med.atcCode, med.nomeGenerico)}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          {med.rename && <Shield className="w-3 h-3 text-guanine-green" />}
                          {isMounted && isAvailableInPublicSystem(med, selectedRegion) && (
                            <Globe className="w-3 h-3 text-adenine-teal" />
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] font-mono text-carbon-400 uppercase tracking-tight">
                        {med.nomesComerciais?.slice(0, 3).join(' • ') || t('notAvailable')}
                      </p>
                    </div>
                    <div className="col-span-3 pr-4">
                      <p className="text-xs text-carbon-600 dark:text-carbon-400 line-clamp-1 font-body italic">
                        {med.indicacoes.slice(0, 2).join(', ')}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded text-white", gestacaoInfo.color.replace('bg-', 'bg-'))}>
                        {t('table.pregnancyCategory', { category: med.gestacao })}
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="font-mono text-xs font-bold text-helix-navy dark:text-carbon-400">
                        {med.atcCode}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Statistics */}
        <div className="mt-8 flex justify-between items-center text-[10px] font-bold text-carbon-400 uppercase tracking-widest">
           <div className="flex gap-4">
             <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-guanine-green" /> {t('footer.liveRepository')}</span>
             <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-adenine-teal" /> {t('footer.evidenceVerified')}</span>
           </div>
           <span>{t('footer.pharmacyLedger')}</span>
        </div>
      </PageContainer>
    </div>
  );
}
