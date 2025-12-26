import HomeContent from './HomeContent';
import { locales, type Locale } from '@/i18n/config';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Disable dynamic rendering for static export
export const dynamic = 'force-static';
export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering with next-intl
  setRequestLocale(locale);

  return <HomeContent />;
}

