'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect user's preferred language
    let userLocale: Locale = defaultLocale;

    // Check localStorage for saved preference
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale && locales.includes(savedLocale as Locale)) {
      userLocale = savedLocale as Locale;
    } else {
      // Check browser language
      const browserLang = navigator.language.split('-')[0];
      if (locales.includes(browserLang as Locale)) {
        userLocale = browserLang as Locale;
      }
    }

    // Redirect to detected locale
    router.replace(`/${userLocale}`);
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Darwin MFC</h1>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
