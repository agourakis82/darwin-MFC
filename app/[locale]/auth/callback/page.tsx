'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { Loader2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AuthCallbackPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      if (!isSupabaseConfigured || !supabase) {
        router.replace('/');
        return;
      }

      try {
        const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );

        if (error) {
          console.error('[AuthCallback] Error:', error.message);
          setError(error.message);
          // Redirect to login after delay on error
          setTimeout(() => router.replace('/auth/login'), 3000);
          return;
        }

        // Success — redirect to home
        router.replace('/');
      } catch (err) {
        console.error('[AuthCallback] Unexpected error:', err);
        setError(t('callback_error'));
        setTimeout(() => router.replace('/auth/login'), 3000);
      }
    }

    handleCallback();
  }, [router, t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-white dark:bg-carbon-950">
      <div className="text-center">
        {error ? (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            <p className="text-carbon-500 text-xs">{t('back_to_login')}...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-adenine-teal animate-spin" />
            <p className="text-carbon-600 dark:text-carbon-400 text-sm">
              {t('callback_processing')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
