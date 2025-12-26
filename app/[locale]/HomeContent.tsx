import { Link } from '@/i18n/routing';
import { ArrowRight, BookOpen, TrendingUp, Users, FileText, Baby, Users as UsersIcon, Activity, Heart, Stethoscope, FileSearch, Calendar, Pill, Shield, Calculator, Brain, ClipboardList, Sparkles } from 'lucide-react';
import { doencasConsolidadas } from '@/lib/data/doencas/index';
import { medicamentosConsolidados } from '@/lib/data/medicamentos/index';
import { todosProtocolosFlowchart } from '@/lib/data/protocolos-flowchart';
import { getTranslations } from 'next-intl/server';
import { LearningWidget } from '@/app/components/Learning';

// Estatísticas dinâmicas
const stats = {
  doencas: doencasConsolidadas.length,
  medicamentos: medicamentosConsolidados.length,
  protocolos: todosProtocolosFlowchart.length,
};

export default async function HomeContent() {
  const t = await getTranslations('home');

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-900 mb-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{t('hero.badge')}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-emerald-50 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/doencas"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                {t('hero.exploreDiseases')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/medicamentos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                {t('hero.viewMedications')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.doencas}+</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">{t('stats.diseases')}</div>
              </div>
            </div>
            <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
              {t('stats.diseasesDesc')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.medicamentos}+</div>
                <div className="text-sm text-emerald-700 dark:text-emerald-300">{t('stats.medications')}</div>
              </div>
            </div>
            <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">
              {t('stats.medicationsDesc')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.protocolos}+</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">{t('stats.protocols')}</div>
              </div>
            </div>
            <p className="text-sm text-purple-600/80 dark:text-purple-400/80">
              {t('stats.protocolsDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Learning Widget Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-lg mx-auto">
          <LearningWidget />
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-[#1d1d1f] dark:text-[#f5f5f7]">
          {t('quickAccess.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/consulta-rapida"
            className="group p-6 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <Stethoscope className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-[#1d1d1f] dark:text-white mb-1">{t('quickAccess.quickConsult')}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('quickAccess.quickConsultDesc')}</p>
          </Link>

          <Link
            href="/calculadoras"
            className="group p-6 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg transition-all"
          >
            <Calculator className="w-8 h-8 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-[#1d1d1f] dark:text-white mb-1">{t('quickAccess.calculators')}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('quickAccess.calculatorsDesc')}</p>
          </Link>

          <Link
            href="/protocolos"
            className="group p-6 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all"
          >
            <FileSearch className="w-8 h-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-[#1d1d1f] dark:text-white mb-1">{t('quickAccess.protocols')}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('quickAccess.protocolsDesc')}</p>
          </Link>

          <Link
            href="/medicamentos/interacoes"
            className="group p-6 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-red-400 dark:hover:border-red-500 hover:shadow-lg transition-all"
          >
            <Shield className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-[#1d1d1f] dark:text-white mb-1">{t('quickAccess.interactions')}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('quickAccess.interactionsDesc')}</p>
          </Link>
        </div>
      </div>

      {/* Screening Categories */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-[#1d1d1f] dark:text-[#f5f5f7]">
          {t('screening.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Link
            href="/neonatal"
            className="group flex flex-col items-center p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 hover:shadow-md transition-all"
          >
            <Baby className="w-7 h-7 text-amber-600 dark:text-amber-400 mb-2" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">{t('screening.neonatal')}</span>
          </Link>

          <Link
            href="/infantil"
            className="group flex flex-col items-center p-5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:shadow-md transition-all"
          >
            <UsersIcon className="w-7 h-7 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">{t('screening.children')}</span>
          </Link>

          <Link
            href="/adultos"
            className="group flex flex-col items-center p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all"
          >
            <Activity className="w-7 h-7 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('screening.adults')}</span>
          </Link>

          <Link
            href="/cancer"
            className="group flex flex-col items-center p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all"
          >
            <Heart className="w-7 h-7 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">{t('screening.cancer')}</span>
          </Link>

          <Link
            href="/gestacao"
            className="group flex flex-col items-center p-5 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 hover:shadow-md transition-all"
          >
            <Heart className="w-7 h-7 text-pink-600 dark:text-pink-400 mb-2" />
            <span className="text-sm font-medium text-pink-700 dark:text-pink-300">{t('screening.pregnancy')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
