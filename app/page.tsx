'use client';

import { useEffect, useState } from 'react';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

export default function RootPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Prevent double redirect
    if (isRedirecting) return;
    setIsRedirecting(true);

    // Detect user's preferred language
    let userLocale: Locale = defaultLocale;

    try {
      // Check localStorage for saved preference
      const savedLocale = localStorage.getItem('preferred-locale');
      if (savedLocale && locales.includes(savedLocale as Locale)) {
        userLocale = savedLocale as Locale;
      } else {
        // Check browser language
        const browserLang = navigator.language?.split('-')[0];
        if (browserLang && locales.includes(browserLang as Locale)) {
          userLocale = browserLang as Locale;
        }
      }
    } catch {
      // localStorage might not be available
    }

    // Redirect using native location (works with static export)
    window.location.href = `/${userLocale}/`;
  }, [isRedirecting]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#1c1c1e',
      color: '#f5f5f7'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Darwin MFC</h1>
        <p style={{ color: '#86868b' }}>Redirecting...</p>
      </div>
    </div>
  );
}
