import { locales } from '@/i18n/config';
import { setRequestLocale } from 'next-intl/server';
import DoencasClient from './DoencasClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';
export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DoencasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <DoencasClient />;
}
