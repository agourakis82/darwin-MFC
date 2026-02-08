'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Dna, ShieldCheck, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { medicamentosConsolidados } from '@/lib/data/medicamentos/index';
import { GenotypeSimulator } from '@/app/components/Pharmacogenomics/GenotypeSimulator';
import { useGenotypeStore } from '@/lib/store/genotypeStore';

export default function FarmacogeneticaClient() {
  const t = useTranslations();
  const { genotypes, setGenotype, clearGenotypes } = useGenotypeStore();

  // Filter medications that have rich pharmgkb data (with variants[])
  const medicationsWithPGx = useMemo(() => {
    return medicamentosConsolidados.filter(
      (med) =>
        med.pharmgkb &&
        med.pharmgkb.length > 0 &&
        med.pharmgkb.some((pgx) => pgx.variants && pgx.variants.length > 0)
    );
  }, []);

  const handleGenotypeChange = (newGenotypes: Record<string, string>) => {
    Object.entries(newGenotypes).forEach(([gene, diplotype]) => {
      if (diplotype) {
        setGenotype(gene, diplotype);
      }
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          {t('common.backToHome')}
        </Link>

        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-500/30 dark:to-blue-500/30 rounded-xl border border-purple-500/20 dark:border-purple-500/30">
              <Dna size={32} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                {t('pharmacogenomics.title')}
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-1">
                {t('pharmacogenomics.subtitle')}
              </p>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            {t('pharmacogenomics.heroDescription')}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{medicationsWithPGx.length}</span>
              <span className="text-sm text-purple-600 dark:text-purple-400 ml-2">
                {medicationsWithPGx.length === 1 ? 'medicamento' : 'medicamentos'}
              </span>
            </div>
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">7</span>
              <span className="text-sm text-blue-600 dark:text-blue-400 ml-2">genes</span>
            </div>
            {Object.keys(genotypes).length > 0 && (
              <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {Object.keys(genotypes).length}
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 ml-2">
                  {t('pharmacogenomics.genotypeSet')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Clear button */}
        {Object.keys(genotypes).length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={clearGenotypes}
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              {t('pharmacogenomics.clearAll')}
            </button>
          </div>
        )}

        {/* Genotype Simulator */}
        <div className="bg-neutral-900 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-800 mb-10">
          <GenotypeSimulator
            medications={medicationsWithPGx}
            onGenotypeChange={handleGenotypeChange}
          />
        </div>

        {/* Evidence Levels */}
        <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={20} className="text-neutral-600 dark:text-neutral-400" />
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              {t('pharmacogenomics.evidenceLevels')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(['1A', '1B', '2A', '2B'] as const).map((level) => {
              const colors = {
                '1A': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
                '1B': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
                '2A': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
                '2B': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
              };

              return (
                <div key={level} className={`px-4 py-3 rounded-lg border ${colors[level]}`}>
                  <p className="text-sm font-medium">
                    {t(`pharmacogenomics.level${level}`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <ShieldCheck size={20} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {t('pharmacogenomics.educationalDisclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
}
