'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations();
  
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-medium">
              {t('footer.copyright')}
            </span>
            <Link
              href="/about"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              {t('about.title')}
            </Link>
          </div>
          <span className="flex items-center gap-2">
            <span className="text-neutral-400 dark:text-neutral-500">{t('footer.poweredBy')}</span>
            <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DARWIN
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
