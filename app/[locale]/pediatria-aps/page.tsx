'use client';

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  Search,
  Baby,
  Wind,
  Ear,
  Thermometer,
  Activity,
  ChevronRight,
  BookOpen,
  Stethoscope,
  Shield,
  FileText,
  Droplets,
  Brain
} from 'lucide-react';
import { doencasPediatriaAPS } from '@/lib/data/doencas/pediatria-aps';

// Category icons for pediatrics
const categoryIcons: Record<string, React.ElementType> = {
  'respiratorio': Wind,
  'otorrinolaringologia': Ear,
  'gastrointestinal': Droplets,
  'urologico': Activity,
  'neurologico': Brain,
  'dermatologico': Thermometer,
  'pediatrico': Baby,
};

// Subcategory colors
const subcategoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'respiratorio': { bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-800' },
  'otorrinolaringologia': { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
  'gastrointestinal': { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' },
  'urologico': { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
  'default': { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
};

export default function PediatriaAPSPage() {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | 'todas'>('todas');

  // Get unique subcategories
  const subcategories = useMemo(() => {
    const subs = new Set(doencasPediatriaAPS.map(d => d.subcategoria || 'outros'));
    return Array.from(subs);
  }, []);

  // Filter diseases
  const filteredDiseases = useMemo(() => {
    let filtered = doencasPediatriaAPS;

    if (selectedSubcategory !== 'todas') {
      filtered = filtered.filter(d => (d.subcategoria || 'outros') === selectedSubcategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(d =>
        d.titulo?.toLowerCase().includes(term) ||
        d.sinonimos?.some(s => s.toLowerCase().includes(term)) ||
        d.cid10?.some(c => c.toLowerCase().includes(term)) ||
        d.tags?.some(t => t.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [searchTerm, selectedSubcategory]);

  // Group by subcategory
  const groupedDiseases = useMemo(() => {
    const grouped: Record<string, typeof doencasPediatriaAPS> = {};
    filteredDiseases.forEach(d => {
      const sub = d.subcategoria || 'outros';
      if (!grouped[sub]) grouped[sub] = [];
      grouped[sub].push(d);
    });
    return grouped;
  }, [filteredDiseases]);

  // Stats
  const stats = useMemo(() => ({
    total: doencasPediatriaAPS.length,
    respiratorio: doencasPediatriaAPS.filter(d => d.subcategoria === 'respiratorio').length,
    gastrointestinal: doencasPediatriaAPS.filter(d => d.subcategoria === 'gastrointestinal').length,
    otorrino: doencasPediatriaAPS.filter(d => d.subcategoria === 'otorrinolaringologia').length,
    urologico: doencasPediatriaAPS.filter(d => d.subcategoria === 'urologico').length,
  }), []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Baby className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
              {t('pediatria.title')}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              {t('pediatria.subtitle', { count: doencasPediatriaAPS.length })}
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-sky-200 dark:border-sky-800">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sky-900 dark:text-sky-100 mb-1">
                {t('pediatria.banner.title')}
              </h3>
              <p className="text-sm text-sky-700 dark:text-sky-300">
                {t('pediatria.banner.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('pediatria.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>
        <select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-sky-500"
        >
          <option value="todas">{t('pediatria.allCategories')}</option>
          {subcategories.map(sub => (
            <option key={sub} value={sub}>
              {t(`pediatria.categories.${sub}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-4 border border-sky-100 dark:border-sky-800">
          <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
            {stats.respiratorio}
          </div>
          <div className="text-sm text-sky-700 dark:text-sky-300">{t('pediatria.stats.respiratory')}</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stats.otorrino}
          </div>
          <div className="text-sm text-amber-700 dark:text-amber-300">{t('pediatria.stats.ent')}</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-100 dark:border-orange-800">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.gastrointestinal}
          </div>
          <div className="text-sm text-orange-700 dark:text-orange-300">{t('pediatria.stats.gi')}</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.urologico}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">{t('pediatria.stats.urologic')}</div>
        </div>
      </div>

      {/* Disease List */}
      <div className="space-y-8">
        {Object.entries(groupedDiseases).map(([subcategory, diseases]) => {
          const Icon = categoryIcons[subcategory] || BookOpen;
          const colors = subcategoryColors[subcategory] || subcategoryColors.default;
          return (
            <div key={subcategory}>
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-neutral-500" />
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  {t(`pediatria.categories.${subcategory}`)}
                </h2>
                <span className="text-sm text-neutral-400">({diseases.length})</span>
              </div>
              <div className="grid gap-3">
                {diseases.map(disease => (
                  <Link
                    key={disease.id}
                    href={`/pediatria-aps/${disease.id}`}
                    className="group bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                            {disease.titulo}
                          </h3>
                          {disease.tags?.includes('comum') && (
                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                              Comum
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                          {disease.quickView?.definicao}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {disease.cid10?.slice(0, 3).map(code => (
                            <span key={code} className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs rounded">
                              {code}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400">
              {t('pediatria.noResults')}
            </p>
          </div>
        )}
      </div>

      {/* Footer References */}
      <div className="mt-12 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-start gap-3">
          <FileText className="w-6 h-6 text-neutral-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
              {t('pediatria.references.title')}
            </h3>
            <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• Sociedade Brasileira de Pediatria (SBP) - Tratados e Diretrizes</li>
              <li>• AIDPI - Atenção Integrada às Doenças Prevalentes na Infância</li>
              <li>• Nelson Textbook of Pediatrics</li>
              <li>• Ministério da Saúde - Cadernos de Atenção Básica</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
