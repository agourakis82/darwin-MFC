'use client';

/**
 * SETTINGS PANEL COMPONENT
 * ========================
 *
 * User settings including notifications, privacy, and account actions.
 */

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Bell,
  Shield,
  Eye,
  Download,
  Trash2,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';
import { useAppStore } from '@/lib/store/appStore';

interface SettingsPanelProps {
  onLogout?: () => void;
}

export default function SettingsPanel({ onLogout }: SettingsPanelProps) {
  const t = useTranslations('settings');
  const { logout } = useUserStore();
  const { theme, toggleTheme } = useAppStore();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Settings state (would be persisted)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    progressReminders: true,
    communityUpdates: false,
    showProfile: true,
    showProgress: true,
    showActivity: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      onLogout?.();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Would call deleteAccount API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await logout();
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleExportData = async () => {
    // Would export user data to JSON
    const data = {
      exportedAt: new Date().toISOString(),
      // ... user data
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'darwin-mfc-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('appearance.title')}
          </h3>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('appearance.theme')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {theme === 'dark' ? t('appearance.dark') : t('appearance.light')}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {t('appearance.toggle')}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('notifications.title')}
            </h3>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <SettingToggle
            label={t('notifications.email')}
            description={t('notifications.email_desc')}
            enabled={settings.emailNotifications}
            onToggle={() => handleToggle('emailNotifications')}
          />
          <SettingToggle
            label={t('notifications.push')}
            description={t('notifications.push_desc')}
            enabled={settings.pushNotifications}
            onToggle={() => handleToggle('pushNotifications')}
          />
          <SettingToggle
            label={t('notifications.reminders')}
            description={t('notifications.reminders_desc')}
            enabled={settings.progressReminders}
            onToggle={() => handleToggle('progressReminders')}
          />
          <SettingToggle
            label={t('notifications.community')}
            description={t('notifications.community_desc')}
            enabled={settings.communityUpdates}
            onToggle={() => handleToggle('communityUpdates')}
          />
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('privacy.title')}
            </h3>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <SettingToggle
            label={t('privacy.show_profile')}
            description={t('privacy.show_profile_desc')}
            enabled={settings.showProfile}
            onToggle={() => handleToggle('showProfile')}
          />
          <SettingToggle
            label={t('privacy.show_progress')}
            description={t('privacy.show_progress_desc')}
            enabled={settings.showProgress}
            onToggle={() => handleToggle('showProgress')}
          />
          <SettingToggle
            label={t('privacy.show_activity')}
            description={t('privacy.show_activity_desc')}
            enabled={settings.showActivity}
            onToggle={() => handleToggle('showActivity')}
          />
        </div>
      </div>

      {/* Data & Account */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('data.title')}
            </h3>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Export Data */}
          <button
            onClick={handleExportData}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('data.export')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('data.export_desc')}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              {isLoggingOut ? (
                <Loader2 className="w-5 h-5 text-gray-600 dark:text-gray-400 animate-spin" />
              ) : (
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('data.logout')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('data.logout_desc')}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Delete Account */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-500" />
              <div className="text-left">
                <p className="font-medium text-red-600 dark:text-red-400">
                  {t('data.delete')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('data.delete_desc')}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('delete_confirm.title')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('delete_confirm.subtitle')}
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('delete_confirm.message')}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('deleting')}
                  </>
                ) : (
                  t('delete_confirm.confirm')
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Toggle component
interface SettingToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function SettingToggle({ label, description, enabled, onToggle }: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
