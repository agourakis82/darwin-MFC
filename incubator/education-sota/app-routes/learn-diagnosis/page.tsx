/**
 * KNOWLEDGE DIAGNOSIS PAGE
 * ========================
 *
 * Page for AI-powered knowledge gap diagnosis.
 * Uses the SOTA backend for advanced learning analytics.
 */

import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import DiagnosisClient from './DiagnosisClient';

// =============================================================================
// METADATA
// =============================================================================

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('sota.diagnosis');

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default async function DiagnosisPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-muted-foreground">Carregando...</div>
            </div>
          }
        >
          <DiagnosisClient />
        </Suspense>
      </div>
    </div>
  );
}
