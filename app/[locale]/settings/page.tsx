'use client';

/**
 * SETTINGS PAGE
 * =============
 *
 * User settings and profile management page.
 */

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <User className="w-4 h-4" />
              {t('profile.title')}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
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
        </div>
      </div>

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
