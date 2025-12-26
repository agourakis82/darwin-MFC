'use client';

/**
 * COMMUNITY HUB PAGE
 * ==================
 *
 * Main page for the community platform.
 * Shows forums, recent posts, and mentorship.
 */

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  Users,
  MessageSquare,
  GraduationCap,
  TrendingUp,
  PlusCircle,
  ChevronRight,
  Sparkles,
  Lock,
} from 'lucide-react';
import { CategoryCard } from '@/app/components/Community';
import { FORUM_CATEGORIES } from '@/lib/types/community';

// =============================================================================
// COMPONENT
// =============================================================================

export default function CommunityPage() {
  const t = useTranslations('community');

  // Placeholder stats
  const stats = [
    { label: t('stats.members'), value: '0', icon: Users, color: 'text-blue-500' },
    { label: t('stats.discussions'), value: '0', icon: MessageSquare, color: 'text-green-500' },
    { label: t('stats.mentors'), value: '0', icon: GraduationCap, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-10 h-10" />
            <h1 className="text-3xl font-bold">{t('title')}</h1>
          </div>
          <p className="text-lg text-indigo-100 max-w-2xl mb-8">
            {t('description')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-indigo-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                {t('coming_soon.title')}
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {t('coming_soon.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Forum Categories */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  {t('forums')}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {FORUM_CATEGORIES.map((category) => (
                  <div key={category.id} className="relative">
                    <CategoryCard category={category} />
                    {/* Overlay for coming soon */}
                    <div className="absolute inset-0 bg-gray-900/50 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-not-allowed">
                      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('coming_soon.badge')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Discussions Placeholder */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  {t('recent_discussions')}
                </h2>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  {t('no_discussions')}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mentorship Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <GraduationCap className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('mentorship.title')}</h3>
              <p className="text-purple-100 text-sm mb-4">
                {t('mentorship.description')}
              </p>
              <button
                disabled
                className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-not-allowed opacity-70"
              >
                <Lock className="w-4 h-4" />
                {t('coming_soon.badge')}
              </button>
            </div>

            {/* Guidelines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('guidelines.title')}
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {t('guidelines.respect')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {t('guidelines.privacy')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {t('guidelines.evidence')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  {t('guidelines.no_pii')}
                </li>
              </ul>
            </div>

            {/* Free Forever */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">{t('free_forever.title')}</h3>
              <p className="text-sm text-green-100">
                {t('free_forever.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
