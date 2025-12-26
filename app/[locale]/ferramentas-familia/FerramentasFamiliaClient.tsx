'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Users, Network, BookOpen, Info, AlertCircle } from 'lucide-react';

// Dynamic imports para evitar SSR issues com React Flow
const GenogramaEditor = dynamic(
  () => import('@/app/components/FamilyTools/GenogramaEditor'),
  { ssr: false, loading: () => <LoadingPlaceholder /> }
);

const EcomapaEditor = dynamic(
  () => import('@/app/components/FamilyTools/EcomapaEditor'),
  { ssr: false, loading: () => <LoadingPlaceholder /> }
);

function LoadingPlaceholder() {
  return (
    <div className="h-[600px] w-full bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
      </div>
    </div>
  );
}

type TabType = 'genograma' | 'ecomapa';

export default function FerramentasFamiliaClient() {
  const t = useTranslations('familyTools');
  const [activeTab, setActiveTab] = useState<TabType>('genograma');

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <p className="text-neutral-600 dark:text-neutral-400">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">{t('instructions.title')}</p>
            <ul className="text-blue-700 dark:text-blue-400 space-y-1">
              <li>• <strong>{t('instructions.drag')}</strong> {t('instructions.dragDesc')}</li>
              <li>• <strong>{t('instructions.connect')}</strong> {t('instructions.connectDesc')}</li>
              <li>• <strong>{t('instructions.click')}</strong> {t('instructions.clickDesc')}</li>
              <li>• <strong>{t('instructions.export')}</strong> {t('instructions.exportDesc')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('genograma')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'genograma'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Users className="w-5 h-5" />
          {t('tabs.genogram')}
        </button>
        <button
          onClick={() => setActiveTab('ecomapa')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'ecomapa'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Network className="w-5 h-5" />
          {t('tabs.ecomap')}
        </button>
      </div>

      {/* Editor Area */}
      <div className="mb-8">
        {activeTab === 'genograma' ? <GenogramaEditor /> : <EcomapaEditor />}
      </div>

      {/* Referências */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sobre o Genograma */}
        <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold">{t('about.genogram.title')}</h3>
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
            <p>{t('about.genogram.description')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('about.genogram.item1')}</li>
              <li>{t('about.genogram.item2')}</li>
              <li>{t('about.genogram.item3')}</li>
              <li>{t('about.genogram.item4')}</li>
            </ul>
            <p className="text-xs mt-3 text-neutral-500">
              {t('about.genogram.reference')}
            </p>
          </div>
        </div>

        {/* Sobre o Ecomapa */}
        <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold">{t('about.ecomap.title')}</h3>
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
            <p>{t('about.ecomap.description')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('about.ecomap.item1')}</li>
              <li>{t('about.ecomap.item2')}</li>
              <li>{t('about.ecomap.item3')}</li>
              <li>{t('about.ecomap.item4')}</li>
            </ul>
            <div className="mt-3 p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
              <p className="text-xs font-medium">{t('about.ecomap.bondTypes')}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">{t('bonds.strong')}</span>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">{t('bonds.moderate')}</span>
                <span className="text-xs px-2 py-0.5 bg-neutral-200 text-neutral-600 rounded">{t('bonds.weak')}</span>
                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">{t('bonds.stressful')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dica de uso clínico */}
      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">{t('clinicalTip.title')}</p>
            <p className="text-amber-700 dark:text-amber-400">{t('clinicalTip.text')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

