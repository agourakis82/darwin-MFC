import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import RegisterForm from '@/app/components/Auth/RegisterForm';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: `${t('register')} | Darwin MFC`,
    description: t('register_description'),
  };
}

function RegisterPageContent() {
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
              {t('create_account_title')}
            </h1>
            <p className="text-carbon-600 dark:text-carbon-400">
              {t('join_darwin')}
            </p>
          </div>

          <div className="bg-white dark:bg-carbon-800 rounded-2xl shadow-lg p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return <RegisterPageContent />;
}
