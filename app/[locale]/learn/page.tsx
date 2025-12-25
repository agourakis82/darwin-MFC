'use client';

/**
 * LEARNING HUB PAGE
 * =================
 *
 * Main page for the learning platform.
 * Lists all available learning paths with progress.
 */

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Trophy,
  TrendingUp,
  Flame,
  BarChart3,
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <GraduationCap className="w-10 h-10" />
              <h1 className="text-3xl font-bold">{t('title')}</h1>
            </div>
            {Object.keys(pathProgress).length > 0 && (
              <Link
                href="/learn/progress"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                {t('progress.title')}
              </Link>
            )}
          </div>
          <p className="text-lg text-blue-100 max-w-2xl">
            {t('description')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <stat.icon className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Continue Learning (if in progress) */}
        {inProgressPaths.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
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
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
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
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t('no_paths_available')}</p>
            </div>
          )}
        </section>

        {/* Coming Soon */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('coming_soon')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: t('coming.emergency'),
                description: t('coming.emergency_desc'),
                icon: '🚨',
              },
              {
                title: t('coming.mental_health'),
                description: t('coming.mental_health_desc'),
                icon: '🧠',
              },
              {
                title: t('coming.pediatrics'),
                description: t('coming.pediatrics_desc'),
                icon: '👶',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Free Forever Banner */}
        <section className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">{t('free_forever.title')}</h3>
          <p className="text-green-100 max-w-2xl mx-auto">
            {t('free_forever.description')}
          </p>
        </section>
      </div>
    </div>
  );
}
