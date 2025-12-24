'use client';

import { useEffect } from 'react';

interface LocaleHtmlAttributesProps {
  lang: string;
  dir: 'ltr' | 'rtl';
}

/**
 * Client component that updates the <html> element's lang and dir attributes
 * based on the current locale. This is needed because:
 * 1. The root layout has hardcoded lang="pt-BR"
 * 2. We need RTL support for Arabic locale
 * 3. Nested layouts in Next.js can't have their own <html> tags
 */
export default function LocaleHtmlAttributes({ lang, dir }: LocaleHtmlAttributesProps) {
  useEffect(() => {
    // Update html attributes on the client
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // This component renders nothing - it only updates attributes
  return null;
}
