import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getDirection, formatLocaleForHTML } from '@/lib/i18n/utils';
import { locales, type Locale } from '@/i18n/config';
import LocaleHtmlAttributes from './LocaleHtmlAttributes';
import { RegionProvider } from '@/lib/context/RegionContext';
import RegionOnboardingModal from '@/app/components/Region/RegionOnboardingModal';
import PSModeOnboardingModal from '@/app/components/PS/PSModeOnboardingModal';
import ModePersistenceGate from '@/app/components/PS/ModePersistenceGate';
import KeyboardShortcuts from '@/app/components/KeyboardShortcuts';
import { PWAProvider } from '@/app/components/PWA';
import { RouteChangeIndicator } from '@/lib/design-system/animations/page-transitions';
import PSRouteShell from '@/app/components/PS/PSRouteShell';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Disable dynamic rendering for static export
export const dynamic = 'force-static';
export const dynamicParams = false;

/**
 * Locale Layout - wraps locale-prefixed pages with translations
 *
 * IMPORTANT: This layout does NOT have its own html/body tags.
 * The root layout (app/layout.tsx) provides html/body and global providers.
 * This layout provides:
 * 1. NextIntlClientProvider for translations
 * 2. LocaleHtmlAttributes to update lang/dir attributes
 * 3. The locale shell UI (header/sidebar/footer, mobile nav, PWA UI)
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering with next-intl
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  const direction = getDirection(locale as Locale);
  const htmlLang = formatLocaleForHTML(locale as Locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtmlAttributes lang={htmlLang} dir={direction} />
      <RegionProvider>
        <ModePersistenceGate />
        <PWAProvider />
        <KeyboardShortcuts />
        <RouteChangeIndicator color="bg-adenine-teal" />
        <PSModeOnboardingModal />

        {/* Skip link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
            Pular para o conteúdo principal
        </a>

        <PSRouteShell>{children}</PSRouteShell>

        <RegionOnboardingModal />
      </RegionProvider>
    </NextIntlClientProvider>
  );
}
