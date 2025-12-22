'use client';

/**
 * CONTRIBUTE SECTION
 * ==================
 *
 * Information about how to contribute to the project.
 */

import { useTranslations } from 'next-intl';
import {
  Github,
  Heart,
  Code,
  Globe,
  MessageSquare,
  FileText,
  ExternalLink,
  Users,
  Sparkles,
} from 'lucide-react';

export default function ContributeSection() {
  const t = useTranslations('about');

  const contributionWays = [
    {
      icon: Globe,
      title: t('contribute.translation'),
      description: t('contribute.translation_desc'),
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      icon: FileText,
      title: t('contribute.content'),
      description: t('contribute.content_desc'),
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      icon: Code,
      title: t('contribute.code'),
      description: t('contribute.code_desc'),
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
    {
      icon: MessageSquare,
      title: t('contribute.feedback'),
      description: t('contribute.feedback_desc'),
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium mb-4">
          <Heart className="w-4 h-4" />
          {t('contribute.badge')}
        </div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
          {t('contribute.title')}
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {t('contribute.subtitle')}
        </p>
      </div>

      {/* Ways to contribute */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {contributionWays.map((way, index) => (
          <div
            key={index}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg ${way.color} flex items-center justify-center mb-4`}>
              <way.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {way.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {way.description}
            </p>
          </div>
        ))}
      </div>

      {/* GitHub CTA */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-8 text-white text-center">
        <Github className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h3 className="text-xl font-bold mb-2">{t('contribute.github_title')}</h3>
        <p className="text-neutral-300 mb-6 max-w-lg mx-auto">
          {t('contribute.github_desc')}
        </p>
        <a
          href="https://github.com/agourakis82/Darwin-MFC"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
        >
          <Github className="w-5 h-5" />
          {t('contribute.view_github')}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Free Forever Banner */}
      <div className="mt-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
        <Sparkles className="w-10 h-10 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">{t('free_forever.title')}</h3>
        <p className="text-green-100 max-w-2xl mx-auto">
          {t('free_forever.description')}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center border border-neutral-200 dark:border-neutral-700">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">238+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">{t('stats.diseases')}</div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center border border-neutral-200 dark:border-neutral-700">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">400+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">{t('stats.medications')}</div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center border border-neutral-200 dark:border-neutral-700">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">9</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">{t('stats.languages')}</div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center border border-neutral-200 dark:border-neutral-700">
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">13</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">{t('stats.calculators')}</div>
        </div>
      </div>
    </div>
  );
}
