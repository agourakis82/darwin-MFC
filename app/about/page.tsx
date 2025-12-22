import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutAuthor from '@/app/components/About/AboutAuthor';
import ContributeSection from '@/app/components/About/ContributeSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('about.title'),
    description: t('about.bio'),
    openGraph: {
      title: t('about.title'),
      description: t('about.bio'),
      type: 'profile',
    },
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto py-8">
        <AboutAuthor />
        <div className="border-t border-neutral-200 dark:border-neutral-800 my-12" />
        <ContributeSection />
      </div>
    </div>
  );
}

