/**
 * Skip Links Component
 * WCAG 2.2 AAA Compliant
 * Allows keyboard users to skip to main content
 */

'use client';

import { useTranslations } from 'next-intl';

export function SkipLinks() {
  const t = useTranslations('accessibility');

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-3 focus:rounded focus:text-base focus:font-medium focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label={t('skipToMainContent')}
      >
        {t('skipToMainContent')}
      </a>
      <a
        href="#navigation"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-3 focus:rounded focus:text-base focus:font-medium focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label={t('skipToNavigation')}
      >
        {t('skipToNavigation')}
      </a>
      <a
        href="#search"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-96 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-3 focus:rounded focus:text-base focus:font-medium focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label={t('skipToSearch')}
      >
        {t('skipToSearch')}
      </a>
    </>
  );
}

export default SkipLinks;
