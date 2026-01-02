import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getDirection, formatLocaleForHTML } from '@/lib/i18n/utils';
import { locales, type Locale } from '@/i18n/config';
import LocaleHtmlAttributes from './LocaleHtmlAttributes';
import { RegionProvider } from '@/lib/context/RegionContext';
import RegionOnboardingModal from '@/app/components/Region/RegionOnboardingModal';

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
 * The root layout (app/layout.tsx) provides html/body and navigation.
 * This layout only adds:
 * 1. NextIntlClientProvider for translations
 * 2. LocaleHtmlAttributes to update lang/dir attributes
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
        {children}
        <RegionOnboardingModal />
      </RegionProvider>
    </NextIntlClientProvider>
  );
}

