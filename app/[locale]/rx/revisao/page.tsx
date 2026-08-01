import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import ReviewStudioClient from './ReviewStudioClient';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export default async function MedicationReviewStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReviewStudioClient />;
}
