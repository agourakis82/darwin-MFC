'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DarwinLogo } from '../Brand';

export default function Footer() {
  const t = useTranslations();
  
  return (
    <footer className="border-t border-carbon-200 dark:border-carbon-700 bg-phosphate dark:bg-carbon-900 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <DarwinLogo variant="compact" size="sm" animated={false} />
            <p className="text-sm text-carbon-500 dark:text-carbon-400 text-center md:text-left max-w-xs">
              Clinical Intelligence, Evolved. Your trusted companion for evidence-based Family Medicine.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/doencas"
              className="text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan transition-colors"
            >
              Conditions
            </Link>
            <Link
              href="/medicamentos"
              className="text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan transition-colors"
            >
              Medications
            </Link>
            <Link
              href="/protocolos"
              className="text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan transition-colors"
            >
              Protocols
            </Link>
            <Link
              href="/about"
              className="text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan transition-colors"
            >
              {t('about.title')}
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1 text-sm text-carbon-500 dark:text-carbon-400">
            <span>{t('footer.copyright')}</span>
            <span className="flex items-center gap-2">
              <span className="text-carbon-400 dark:text-carbon-500">{t('footer.poweredBy')}</span>
              <span className="font-bold bg-gradient-to-r from-adenine-teal to-guanine-green bg-clip-text text-transparent">
                DARWIN MEDICAL HUB
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
