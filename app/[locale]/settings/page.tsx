'use client';

/**
 * SETTINGS PAGE
 * =============
 *
 * User settings and profile management page.
 */

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { ContentContainer } from '@/app/components/Layout/Containers';
import { ArrowLeft, User, Settings as SettingsIcon, Loader2 } from 'lucide-react';
import { ProfileCard, ProfileEditor, SettingsPanel } from '@/app/components/Profile';
import { useUserStore } from '@/lib/store/userStore';

type Tab = 'profile' | 'settings';

export default function SettingsPage() {
  const t = useTranslations();
  const router = useRouter();
  const { isAuthenticated, isInitialized, initialize } = useUserStore();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [showEditor, setShowEditor] = useState(false);

  // Initialize auth on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Redirect if not authenticated
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isInitialized, isAuthenticated, router]);

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-phosphate">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-adenine-teal dark:text-cytosine-cyan mx-auto" />
          <p className="mt-4 text-carbon-600 dark:text-carbon-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-phosphate">
      {/* Header */}
      <div className="header-darwin">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </Link>
        </div>
      </div>

      <ContentContainer className="py-8">
        {/* Content Container already has max-w-4xl built-in */}
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-adenine-teal text-white'
                  : 'bg-white dark:bg-carbon-900 text-carbon-700 dark:text-carbon-200 hover:bg-carbon-100 dark:hover:bg-carbon-800'
              }`}
            >
              <User className="w-4 h-4" />
              {t('profile.title')}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-adenine-teal text-white'
                  : 'bg-white dark:bg-carbon-900 text-carbon-700 dark:text-carbon-200 hover:bg-carbon-100 dark:hover:bg-carbon-800'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              {t('settings.title')}
            </button>
          </div>

          {/* Content */}
          {activeTab === 'profile' && (
            <ProfileCard onEdit={() => setShowEditor(true)} />
          )}

          {activeTab === 'settings' && <SettingsPanel />}
      </ContentContainer>

      {/* Profile Editor Modal */}
      {showEditor && (
        <ProfileEditor
          onClose={() => setShowEditor(false)}
          onSave={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
