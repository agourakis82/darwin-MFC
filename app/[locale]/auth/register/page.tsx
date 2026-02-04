import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import RegisterForm from '@/app/components/Auth/RegisterForm';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'auth' });

  return {
    title: `${t('register')} | Darwin MFC`,
    description: t('register_description'),
  };
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-adenine-teal/5 via-white to-cytosine-cyan/5 dark:from-carbon-900 dark:via-carbon-800 dark:to-carbon-900">
      <div className="container mx-auto px-4 py-12">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Darwin MFC
        </Link>

        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-helix-navy dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-carbon-600 dark:text-carbon-400">
              Join Darwin Medical Foundation Cluster
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white dark:bg-carbon-800 rounded-2xl shadow-lg p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
