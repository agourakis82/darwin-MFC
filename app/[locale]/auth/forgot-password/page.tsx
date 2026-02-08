'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Mail, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { resetPassword } from '@/lib/supabase/auth';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError(t('errors.email_required'));
      return;
    }

    if (!isSupabaseConfigured) {
      setError(t('errors.generic'));
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await resetPassword(email.trim());
      if (resetError) {
        setError(resetError.message);
      } else {
        setSent(true);
      }
    } catch {
      setError(t('errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-adenine-teal/5 via-white to-cytosine-cyan/5 dark:from-carbon-900 dark:via-carbon-800 dark:to-carbon-900">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('back_to_login')}
        </Link>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-helix-navy dark:text-white mb-2">
              {t('forgot_password_title')}
            </h1>
            <p className="text-carbon-600 dark:text-carbon-400">
              {t('forgot_password_description')}
            </p>
          </div>

          <div className="bg-white dark:bg-carbon-800 rounded-2xl shadow-lg p-8">
            {sent ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-guanine-green mx-auto mb-4" />
                <p className="text-sm text-carbon-600 dark:text-carbon-400">
                  {t('reset_email_sent')}
                </p>
                <Link
                  href="/auth/login"
                  className="inline-block mt-6 text-sm text-adenine-teal hover:underline"
                >
                  {t('back_to_login')}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('email')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder={t('email_placeholder')}
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('sending')}
                    </>
                  ) : (
                    t('send_reset_link')
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
