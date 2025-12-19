'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <span className="font-medium">
          {t('footer.copyright')}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-neutral-400 dark:text-neutral-500">Powered by</span>
          <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DARWIN
          </span>
        </span>
      </div>
    </footer>
  );
}
