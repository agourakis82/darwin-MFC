'use client';

/**
 * PROFILE EDITOR COMPONENT
 * ========================
 *
 * Form for editing user profile information.
 */

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  User,
  Mail,
  Globe,
  MapPin,
  FileText,
  Briefcase,
  Save,
  X,
  Loader2,
  AlertCircle,
  Check,
} from 'lucide-react';
import { useAuth } from '@/app/components/Auth';
import { useUserStore } from '@/lib/store/userStore';
import { locales, localeNames } from '@/i18n/config';

interface ProfileEditorProps {
  onClose: () => void;
  onSave?: () => void;
}

export default function ProfileEditor({ onClose, onSave }: ProfileEditorProps) {
  const t = useTranslations('profile');
  const { user } = useAuth();
  const { updateProfile, isLoading, error, clearError } = useUserStore();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    locale: user?.locale || 'pt',
    countryCode: user?.countryCode || '',
    specialization: user?.specialization || '',
    bio: user?.bio || '',
  });
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError(null);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();
    setSuccess(false);

    // Validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setLocalError(t('errors.email_invalid'));
      return;
    }

    if (formData.bio && formData.bio.length > 500) {
      setLocalError(t('errors.bio_too_long'));
      return;
    }

    try {
      await updateProfile({
        email: formData.email || undefined,
        locale: formData.locale,
        countryCode: formData.countryCode || undefined,
        specialization: formData.specialization || undefined,
        bio: formData.bio || undefined,
      });

      setSuccess(true);
      setTimeout(() => {
        onSave?.();
        onClose();
      }, 1500);
    } catch {
      // Error handled by store
    }
  };

  const displayError = localError || error;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('edit_profile')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-sm text-green-700 dark:text-green-300">
                {t('profile_updated')}
              </p>
            </div>
          )}

          {/* Error Message */}
          {displayError && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{displayError}</p>
            </div>
          )}

          {/* Username (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('username')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={user?.username || ''}
                disabled
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t('username_cannot_change')}
            </p>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t('email')} <span className="text-gray-400">({t('optional')})</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={t('email_placeholder')}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Locale */}
          <div>
            <label
              htmlFor="locale"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t('language')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="locale"
                name="locale"
                value={formData.locale}
                onChange={handleChange}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={isLoading}
              >
                {locales.map((locale) => (
                  <option key={locale} value={locale}>
                    {localeNames[locale as keyof typeof localeNames]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="countryCode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t('country')} <span className="text-gray-400">({t('optional')})</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="countryCode"
                name="countryCode"
                type="text"
                value={formData.countryCode}
                onChange={handleChange}
                maxLength={3}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={t('country_placeholder')}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Specialization */}
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t('specialization')} <span className="text-gray-400">({t('optional')})</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="specialization"
                name="specialization"
                type="text"
                value={formData.specialization}
                onChange={handleChange}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={t('specialization_placeholder')}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t('bio')} <span className="text-gray-400">({t('optional')})</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder={t('bio_placeholder')}
                disabled={isLoading}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
              {formData.bio.length}/500
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('saving')}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {t('save')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
