/**
 * DARWIN-MFC CLINICAL CALCULATORS HUB
 * ====================================
 *
 * Main entry point for the clinical calculator suite.
 * Features evidence-based clinical decision support tools.
 */

import { locales } from '@/i18n/config';
import { setRequestLocale } from 'next-intl/server';
import CalculadorasHubClient from './CalculadorasHubClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';
export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CalculadorasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <CalculadorasHubClient />;
}
