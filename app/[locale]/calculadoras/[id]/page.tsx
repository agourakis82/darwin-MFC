/**
 * DARWIN-MFC INDIVIDUAL CALCULATOR PAGE
 * ======================================
 *
 * Server component wrapper for individual clinical calculators.
 * Provides static params for SSG export.
 */

import { locales } from '@/i18n/config';
import { getCalculatorIds } from '@/lib/calculators';
import CalculatorDetailClient from './CalculatorDetailClient';

// Generate static params for all calculators in all locales
export function generateStaticParams() {
  const calculatorIds = getCalculatorIds();
  const params: { locale: string; id: string }[] = [];

  for (const locale of locales) {
    for (const id of calculatorIds) {
      params.push({ locale, id });
    }
  }

  return params;
}

export default function CalculatorDetailPage() {
  return <CalculatorDetailClient />;
}
