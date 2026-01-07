'use client';

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  Search,
  Heart,
  Baby,
  AlertTriangle,
  Activity,
  Bug,
  Droplets,
  ChevronRight,
  BookOpen,
  Stethoscope,
  Shield,
  FileText
} from 'lucide-react';
import { doencasPrenatalAltoRisco } from '@/lib/data/doencas/prenatal-alto-risco';

// Risk level configuration
const RISK_LEVELS = {
  'muito-alto': { label: 'Muito Alto Risco', color: 'from-red-600 to-rose-700', icon: AlertTriangle },
  'alto': { label: 'Alto Risco', color: 'from-orange-500 to-amber-600', icon: Activity },
  'medio': { label: 'Risco Intermediário', color: 'from-yellow-500 to-amber-500', icon: Heart },
};

// Category icons
const categoryIcons: Record<string, React.ElementType> = {
  'ginecologico': Baby,
  'endocrino': Droplets,
  'cardiovascular': Heart,
  'infecciosas': Bug,
  'hematologico': Activity,
};

export default function PrenatalAltoRiscoPage() {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'todas'>('todas');

  // Get unique categories from prenatal diseases
  const categories = useMemo(() => {
    const cats = new Set(doencasPrenatalAltoRisco.map(d => d.categoria));
    return Array.from(cats);
  }, []);

  // Filter diseases
  const filteredDiseases = useMemo(() => {
    let filtered = doencasPrenatalAltoRisco;

    if (selectedCategory !== 'todas') {
      filtered = filtered.filter(d => d.categoria === selectedCategory);
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
  }, [searchTerm, selectedCategory]);

  // Group by category for display
  const groupedDiseases = useMemo(() => {
    const grouped: Record<string, typeof doencasPrenatalAltoRisco> = {};
    filteredDiseases.forEach(d => {
      const cat = d.categoria || 'outros';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(d);
    });
    return grouped;
  }, [filteredDiseases]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
              {t('prenatal.title')}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              {t('prenatal.subtitle', { count: doencasPrenatalAltoRisco.length })}
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-800">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-rose-900 dark:text-rose-100 mb-1">
                {t('prenatal.banner.title')}
              </h3>
              <p className="text-sm text-rose-700 dark:text-rose-300">
                {t('prenatal.banner.description')}
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
            placeholder={t('prenatal.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-rose-500"
        >
          <option value="todas">{t('prenatal.allCategories')}</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {t(`prenatal.categories.${cat}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {doencasPrenatalAltoRisco.filter(d => d.tags?.includes('alto-risco')).length}
          </div>
          <div className="text-sm text-red-700 dark:text-red-300">{t('prenatal.stats.highRisk')}</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {doencasPrenatalAltoRisco.filter(d => d.categoria === 'infecciosas').length}
          </div>
          <div className="text-sm text-amber-700 dark:text-amber-300">{t('prenatal.stats.infections')}</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {doencasPrenatalAltoRisco.filter(d => d.categoria === 'endocrino').length}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">{t('prenatal.stats.endocrine')}</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {doencasPrenatalAltoRisco.filter(d => d.categoria === 'cardiovascular').length}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">{t('prenatal.stats.cardiovascular')}</div>
        </div>
      </div>

      {/* Disease List */}
      <div className="space-y-8">
        {Object.entries(groupedDiseases).map(([category, diseases]) => {
          const Icon = categoryIcons[category] || BookOpen;
          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-neutral-500" />
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  {t(`prenatal.categories.${category}`)}
                </h2>
                <span className="text-sm text-neutral-400">({diseases.length})</span>
              </div>
              <div className="grid gap-3">
                {diseases.map(disease => (
                  <Link
                    key={disease.id}
                    href={`/doencas/${disease.id}`}
                    className="group bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 hover:border-rose-300 dark:hover:border-rose-600 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                            {disease.titulo}
                          </h3>
                          {disease.tags?.includes('alto-risco') && (
                            <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                              Alto Risco
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
                      <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
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
              {t('prenatal.noResults')}
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-12 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-start gap-3">
          <FileText className="w-6 h-6 text-neutral-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
              {t('prenatal.references.title')}
            </h3>
            <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• Manual de Gestação de Alto Risco - MS 2022</li>
              <li>• Diretrizes SBD 2024-2025</li>
              <li>• FEBRASGO Protocolos 2024</li>
              <li>• ACOG Practice Bulletins 2020-2024</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
