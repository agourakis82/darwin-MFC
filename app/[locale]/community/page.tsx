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
  TrendingUp,
  PlusCircle,
  Lock,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { PageContainer } from '@/app/components/Layout/Containers';
import { CategoryCard } from '@/app/components/Community';
import { FORUM_CATEGORIES } from '@/lib/types/community';
import { listPublishedCases } from '@/lib/supabase/services/community';
import { useAuth } from '@/lib/hooks/useAuth';
import { useEffect, useState } from 'react';

// =============================================================================
// COMPONENT
// =============================================================================

export default function CommunityPage() {
  const t = useTranslations('community');
  const tCommon = useTranslations('common');
  const tCases = useTranslations('community.cases');
  const { isAuthenticated } = useAuth();
  const [cases, setCases] = useState<any[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingCases(true);
      const res = await listPublishedCases({ limit: 6 });
      if (!mounted) return;
      setCases(res.data ?? []);
      setLoadingCases(false);
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-phosphate">
      {/* Hero Section */}
      <div className="gradient-darwin-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adenine-teal/10 dark:bg-cytosine-cyan/10 text-adenine-teal dark:text-cytosine-cyan text-sm font-semibold mb-4">
                <Users className="w-4 h-4" />
                {t('title')}
              </div>
              <h1 className="text-4xl font-bold text-helix-navy dark:text-white mb-3">
                {t('hero_title') ?? t('title')}
              </h1>
              <p className="text-lg text-carbon-700 dark:text-carbon-300 max-w-2xl">
                {t('description')}
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-2 min-w-[220px]">
              <Link
                href={isAuthenticated ? '/community/cases/new' : '/auth/login'}
                className="btn-darwin-primary px-5 py-3 justify-center"
              >
                <PlusCircle className="w-5 h-5" />
                {tCases('submit_case')}
              </Link>
              {!isAuthenticated && (
                <div className="text-xs text-carbon-600 dark:text-carbon-400 text-center">
                  <Lock className="w-3.5 h-3.5 inline-block mr-1" />
                  {t('auth_required_short')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <PageContainer className="py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Published cases */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-helix-navy dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-guanine-green" />
                  {tCases('title')}
                </h2>
                <Link
                  href="/community/cases/new"
                  className="hidden sm:inline-flex btn-darwin-secondary px-4 py-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  {tCases('submit_case')}
                </Link>
              </div>

              {loadingCases ? (
                <div className="card-darwin p-6 text-carbon-600 dark:text-carbon-400">
                  {tCommon('loading') ?? 'Loading...'}
                </div>
              ) : cases.length === 0 ? (
                <div className="card-darwin p-6 text-carbon-600 dark:text-carbon-400">
                  {tCases('none_published')}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {cases.map((c) => (
                    <Link
                      key={c.id}
                      href={`/community/cases?id=${encodeURIComponent(c.id)}`}
                      className="card-darwin p-6 hover:shadow-xl apple-transition block"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-carbon-900 dark:text-carbon-100 line-clamp-2">
                            {c.title}
                          </div>
                          <div className="mt-2 text-xs text-carbon-600 dark:text-carbon-400 flex flex-wrap gap-2">
                            <span>{c.specialty ?? 'APS'}</span>
                            <span className="hairline w-px h-4" />
                            <span>{new Date(c.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {c.verified && (
                          <div className="inline-flex items-center gap-1 text-xs font-semibold text-guanine-green">
                            <ShieldCheck className="w-4 h-4" />
                            {tCases('status.verified')}
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs text-carbon-600 dark:text-carbon-400">
                        <ThumbsUpMini count={c.upvotes ?? 0} />
                        <span className="hairline w-px h-4" />
                        <span>{(c.views ?? 0).toString()} {tCases('views')}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Forum Categories */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-helix-navy dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-adenine-teal dark:text-cytosine-cyan" />
                  {t('forums')}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {FORUM_CATEGORIES.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </section>

            {/* Recent Discussions Placeholder */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-helix-navy dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-guanine-green" />
                  {t('recent_discussions')}
                </h2>
              </div>

              <div className="card-darwin p-8 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-carbon-400" />
                <p className="text-carbon-600 dark:text-carbon-400">
                  {t('no_discussions')}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mentorship */}
            <div className="card-darwin p-6">
              <h3 className="font-semibold text-helix-navy dark:text-white mb-2">
                {t('mentorship.title') ?? 'Mentoria'}
              </h3>
              <p className="text-sm text-carbon-700 dark:text-carbon-300 mb-4">
                {t('mentorship.description') ?? 'Encontre mentores e peça orientação com responsabilidade.'}
              </p>
              <Link href="/community/mentorship" className="btn-darwin-primary px-5 py-3 justify-center">
                {t('mentorship.connect') ?? 'Conectar'}
              </Link>
            </div>

            {/* Guidelines */}
            <div className="card-darwin p-6">
              <h3 className="font-semibold text-helix-navy dark:text-white mb-4">
                {t('guidelines.title')}
              </h3>
              <ul className="space-y-3 text-sm text-carbon-700 dark:text-carbon-300">
                <li className="flex items-start gap-2">
                  <span className="text-guanine-green mt-0.5">✓</span>
                  {t('guidelines.respect')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-guanine-green mt-0.5">✓</span>
                  {t('guidelines.privacy')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-guanine-green mt-0.5">✓</span>
                  {t('guidelines.evidence')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-critical-red-600 mt-0.5">✗</span>
                  {t('guidelines.no_pii')}
                </li>
              </ul>
            </div>

            {/* Free Forever */}
            <div className="card-darwin p-6 bg-gradient-to-br from-helix-navy to-adenine-teal text-white border-0">
              <h3 className="font-bold mb-2">{t('free_forever.title')}</h3>
              <p className="text-sm text-white/80">
                {t('free_forever.description')}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

function ThumbsUpMini({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 1.98-1.7l1.2-8A2 2 0 0 0 19.48 9H14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span>{count}</span>
    </span>
  );
}
