import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getDirection, formatLocaleForHTML } from '@/lib/i18n/utils';
import { locales, type Locale } from '@/i18n/config';
import RootLayoutContent from './RootLayoutContent';
import type { Metadata, Viewport } from 'next';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Disable dynamic rendering for static export
export const dynamic = 'force-static';
export const dynamicParams = false;

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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const direction = getDirection(locale as Locale);
  const htmlLang = formatLocaleForHTML(locale as Locale);

  return (
    <html lang={htmlLang} dir={direction} className="dark" suppressHydrationWarning>
      <head>
        {/* Theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('app-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <RootLayoutContent>{children}</RootLayoutContent>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

