import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import LoginForm from '@/app/components/Auth/LoginForm';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: `${t('login')} | Darwin MFC`,
    description: t('login_description'),
  };
}

function LoginPageContent() {
  const t = useTranslations('auth');

  return (
    <div className="min-h-screen bg-gradient-to-br from-adenine-teal/5 via-white to-cytosine-cyan/5 dark:from-carbon-900 dark:via-carbon-800 dark:to-carbon-900">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('back_to_home')}
        </Link>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-helix-navy dark:text-white mb-2">
              {t('welcome_back')}
            </h1>
            <p className="text-carbon-600 dark:text-carbon-400">
              {t('sign_in_to_access')}
            </p>
          </div>

          <div className="bg-white dark:bg-carbon-800 rounded-2xl shadow-lg p-8">
            <LoginForm />
          </div>

          <p className="text-center text-sm text-carbon-500 dark:text-carbon-400 mt-6">
            {t('terms_notice')}{' '}
            <Link href="/terms" className="text-adenine-teal dark:text-cytosine-cyan hover:underline">
              {t('terms_of_service')}
            </Link>{' '}
            {t('and')}{' '}
            <Link href="/privacy" className="text-adenine-teal dark:text-cytosine-cyan hover:underline">
              {t('privacy_policy')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <LoginPageContent />;
}
