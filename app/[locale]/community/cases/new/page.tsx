'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { CaseSubmissionForm } from '@/app/components/Community/CaseSubmissionForm';
import { createCase } from '@/lib/supabase/services/community';
import { useAuth } from '@/lib/hooks/useAuth';

export default function NewCasePage() {
  const tCommon = useTranslations('common');
  const tCommunity = useTranslations('community');
  const tCases = useTranslations('community.cases');
  const tAuth = useTranslations('auth');
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-phosphate flex items-center justify-center">
        <div className="text-carbon-600 dark:text-carbon-400">{tCommon('loading')}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-phosphate">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="card-darwin p-8">
            <h1 className="text-2xl font-bold mb-2 text-helix-navy dark:text-white">
              {tCommunity('auth_required_title')}
            </h1>
            <p className="text-carbon-600 dark:text-carbon-400 mb-6">
              {tCommunity('auth_required_short')}
            </p>
            <Link href="/auth/login" className="btn-darwin-primary">
              {tAuth('sign_in')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-phosphate">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tCommon('back')}
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-helix-navy dark:text-white mb-2">
            {tCases('submit_case')}
          </h1>
          <p className="text-carbon-600 dark:text-carbon-400">
            {tCases('review_notice')}
          </p>
        </div>

        <div className="card-darwin p-6 lg:p-8">
          <CaseSubmissionForm
            onSubmit={async (caseData, title) => {
              const { data, error } = await createCase({
                title,
                caseData,
                anonymized: true,
                tags: [],
              });

              if (error || !data) {
                throw new Error(error ?? 'Failed to create case');
              }

              router.push(`/community/cases?id=${encodeURIComponent(data.id)}`);
            }}
            onCancel={() => router.push('/community')}
          />
        </div>
      </div>
    </div>
  );
}
