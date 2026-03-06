'use client';

/**
 * LEARNING HUB PAGE
 * =================
 *
 * Main page for the learning platform.
 * Lists all available learning paths with progress.
 */

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { PageContainer } from '@/app/components/Layout/Containers';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Trophy,
  TrendingUp,
  Flame,
  BarChart3,
  AlertTriangle,
  Brain,
  Baby,
} from 'lucide-react';
import { PathCard } from '@/app/components/Learning';
import {
  getPublishedLearningPaths,
  getTotalModulesCount,
  getTotalEstimatedHours,
} from '@/lib/data/learning-paths';
import { useLearningStore } from '@/lib/store/learningStore';

// =============================================================================
// COMPONENT
// =============================================================================

export default function LearnPage() {
  const t = useTranslations('learning');

  const learningPaths = getPublishedLearningPaths();
  const totalModules = getTotalModulesCount();
  const totalHours = getTotalEstimatedHours();

  // Get user progress from learning store
  const { pathProgress, streakDays, certificates } = useLearningStore();

  // Calculate completed paths
  const completedPathsCount = Object.values(pathProgress).filter(
    (p) => p.status === 'completed' || p.status === 'certified'
  ).length;

  // Get paths in progress for "Continue Learning" section
  const inProgressPaths = learningPaths.filter(
    (path) => pathProgress[path.id]?.status === 'in_progress'
  );

  const stats = [
    {
      icon: BookOpen,
      label: t('stats.paths'),
      value: `${completedPathsCount}/${learningPaths.length}`,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: GraduationCap,
      label: t('stats.modules'),
      value: totalModules.toString(),
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: Flame,
      label: t('stats.streak'),
      value: `${streakDays}d`,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      icon: Trophy,
      label: t('stats.certificates'),
      value: certificates.length.toString(),
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
    },
  ];

  return (
    <div className="min-h-screen bg-phosphate">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-helix-navy to-adenine-teal text-white">
        <PageContainer className="py-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <GraduationCap className="w-10 h-10" />
              <h1 className="text-3xl font-bold">{t('title')}</h1>
            </div>
            {Object.keys(pathProgress).length > 0 && (
              <Link
                href="/learn/progress"
                className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 rounded-xl apple-transition-fast text-sm font-semibold"
              >
                <BarChart3 className="w-4 h-4" />
                {t('progress.title')}
              </Link>
            )}
          </div>
          <p className="text-lg text-white/80 max-w-2xl">
            {t('description')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
              >
                <stat.icon className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>

      {/* Main Content */}
      <PageContainer className="py-8">
        {/* Continue Learning (if in progress) */}
        {inProgressPaths.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-helix-navy dark:text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-thymine-gold" />
                {t('continue_learning')}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressPaths.map((path) => (
                <PathCard
                  key={path.id}
                  path={path}
                  progress={pathProgress[path.id]}
                  isLocked={false}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Learning Paths */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-helix-navy dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-adenine-teal dark:text-cytosine-cyan" />
              {t('available_paths')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <PathCard
                key={path.id}
                path={path}
                progress={pathProgress[path.id]}
                isLocked={false}
              />
            ))}
          </div>

          {learningPaths.length === 0 && (
            <div className="text-center py-12 text-carbon-600 dark:text-carbon-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t('no_paths_available')}</p>
            </div>
          )}
        </section>

        {/* Coming Soon */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-helix-navy dark:text-white mb-6">
            {t('coming_soon')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: t('coming.emergency'),
                description: t('coming.emergency_desc'),
                Icon: AlertTriangle,
              },
              {
                title: t('coming.mental_health'),
                description: t('coming.mental_health_desc'),
                Icon: Brain,
              },
              {
                title: t('coming.pediatrics'),
                description: t('coming.pediatrics_desc'),
                Icon: Baby,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-carbon-100 dark:bg-carbon-900 rounded-2xl border border-carbon-200 dark:border-carbon-800"
              >
                <item.Icon className="w-7 h-7 mb-3 text-adenine-teal dark:text-cytosine-cyan" aria-hidden="true" />
                <h3 className="font-semibold text-helix-navy dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-carbon-600 dark:text-carbon-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Free Forever Banner */}
        <section className="mt-12 bg-gradient-to-r from-guanine-green to-adenine-teal rounded-3xl p-8 text-white text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-2">{t('free_forever.title')}</h3>
          <p className="text-white/85 max-w-2xl mx-auto">
            {t('free_forever.description')}
          </p>
        </section>
      </PageContainer>
    </div>
  );
}
