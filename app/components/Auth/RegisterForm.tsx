'use client';

/**
 * REGISTER FORM COMPONENT
 * =======================
 *
 * Registration form with locale selection.
 * Supports pseudonymous accounts (email optional).
 */

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
  AlertCircle,
  Check,
  Globe,
  WifiOff,
} from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';
import { locales, localeNames } from '@/i18n/config';

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectUrl?: string;
}

export default function RegisterForm({ onSuccess, redirectUrl }: RegisterFormProps) {
  const t = useTranslations('auth');
  const { register, isLoading, error, clearError, isOffline } = useUserStore();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    locale: 'pt',
    countryCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError(null);
  };

  const validateForm = (): boolean => {
    clearError();
    setLocalError(null);

    if (!formData.username.trim()) {
      setLocalError(t('errors.username_required'));
      return false;
    }
    if (formData.username.length < 3) {
      setLocalError(t('errors.username_min_length'));
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setLocalError(t('errors.username_invalid'));
      return false;
    }
    if (!formData.password) {
      setLocalError(t('errors.password_required'));
      return false;
    }
    if (formData.password.length < 8) {
      setLocalError(t('errors.password_min_length'));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError(t('errors.password_mismatch'));
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setLocalError(t('errors.email_invalid'));
      return false;
    }
    if (!agreedToTerms) {
      setLocalError(t('errors.terms_required'));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register({
        username: formData.username.trim().toLowerCase(),
        email: formData.email || undefined,
        password: formData.password,
        locale: formData.locale,
        countryCode: formData.countryCode || undefined,
      });
      onSuccess?.();
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch {
      // Error is handled by the store
    }
  };

  const displayError = localError || error;

  // Password strength indicator
  const getPasswordStrength = (password: string): { strength: number; label: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['', t('password_weak'), t('password_fair'), t('password_good'), t('password_strong'), t('password_excellent')];
    return { strength, label: labels[strength] || '' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
              {t('offline.register_message')}
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
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
            {t('username')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder={t('username_placeholder')}
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {t('username_hint')}
          </p>
        </div>

        {/* Email Field (Optional) */}
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
              autoComplete="email"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {t('email_hint')}
          </p>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('password')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder={t('password_placeholder')}
              disabled={isLoading}
              autoComplete="new-password"
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
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded ${
                      level <= passwordStrength.strength
                        ? level <= 2
                          ? 'bg-red-500'
                          : level <= 3
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('confirm_password')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder={t('confirm_password_placeholder')}
              disabled={isLoading}
              autoComplete="new-password"
            />
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Check className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
        </div>

        {/* Locale Selection */}
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

        {/* Terms Agreement */}
        <div className="flex items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            disabled={isLoading}
          />
          <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
            {t('terms_agreement')}{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              {t('terms_link')}
            </Link>{' '}
            {t('and')}{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              {t('privacy_link')}
            </Link>
          </label>
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
              {t('creating_account')}
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              {t('register')}
            </>
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {t('already_have_account')}{' '}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            {t('login')}
          </Link>
        </p>
      </form>
    </div>
  );
}
