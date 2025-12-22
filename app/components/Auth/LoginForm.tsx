'use client';

/**
 * LOGIN FORM COMPONENT
 * ====================
 *
 * Login form with offline-first support.
 * Integrates with Keycloak OAuth2 via the auth API.
 */

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  WifiOff,
  Info,
} from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectUrl?: string;
}

export default function LoginForm({ onSuccess, redirectUrl }: LoginFormProps) {
  const t = useTranslations('auth');
  const { login, isLoading, error, clearError, isOffline } = useUserStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    // Validation
    if (!username.trim()) {
      setLocalError(t('errors.username_required'));
      return;
    }
    if (!password) {
      setLocalError(t('errors.password_required'));
      return;
    }
    if (password.length < 8) {
      setLocalError(t('errors.password_min_length'));
      return;
    }

    try {
      await login({ username: username.trim(), password });
      onSuccess?.();
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch {
      // Error is handled by the store
    }
  };

  const displayError = localError || error;

  return (
    <div className="w-full max-w-md">
      {/* Offline Warning */}
      {isOffline && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-3">
          <WifiOff className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              {t('offline.title')}
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              {t('offline.login_message')}
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {displayError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{displayError}</p>
          </div>
        )}

        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('username')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder={t('username_placeholder')}
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('password')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder={t('password_placeholder')}
              disabled={isLoading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isOffline}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('logging_in')}
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              {t('login')}
            </>
          )}
        </button>

        {/* Links */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/auth/forgot-password"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('forgot_password')}
          </Link>
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('create_account')}
          </Link>
        </div>
      </form>

      {/* Offline Info */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              {t('offline.info_title')}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              {t('offline.info_description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
