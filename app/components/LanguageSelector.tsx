'use client';

import React, { useState, useEffect } from 'react';
import { locales, localeNames, localeFlags, type Locale, defaultLocale } from '@/i18n/config';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'dropdown' | 'buttons';
}

/**
 * Language selector component
 * Safe version that works with and without next-intl context
 */
export function LanguageSelector({ className = '', variant = 'dropdown' }: LanguageSelectorProps) {
  // Get locale from URL or default
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const localeMatch = path.match(/^\/(pt|en|es|fr|ru|ar|zh|el)/);
      if (localeMatch) {
        setCurrentLocale(localeMatch[1] as Locale);
      } else {
        const saved = localStorage.getItem('preferred-locale');
        if (saved && locales.includes(saved as Locale)) {
          setCurrentLocale(saved as Locale);
        }
      }
    }
  }, []);
  
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale);
      // Reload page with new locale in path
      const currentPath = window.location.pathname;
      const pathWithoutLocale = currentPath.replace(/^\/(pt|en|es|fr|ru|ar|zh|el)/, '') || '/';
      window.location.href = `/${newLocale}${pathWithoutLocale}`;
    }
    setIsOpen(false);
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex gap-2 flex-wrap ${className}`}>
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
              ${currentLocale === loc
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }
            `}
            aria-label={`Switch to ${localeNames[loc]}`}
          >
            <span className="mr-1.5">{localeFlags[loc]}</span>
            {localeNames[loc]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-neutral-100 dark:bg-neutral-800
          text-neutral-700 dark:text-neutral-300
          hover:bg-neutral-200 dark:hover:bg-neutral-700
          transition-colors
        "
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeFlags[currentLocale]}</span>
        <span className="hidden md:inline text-sm font-medium">{localeNames[currentLocale]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="
            absolute top-full right-0 mt-2 z-20
            bg-white dark:bg-neutral-800
            border border-neutral-200 dark:border-neutral-700
            rounded-lg shadow-lg
            min-w-[200px]
            overflow-hidden
          ">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`
                  w-full px-4 py-2.5 text-left
                  flex items-center gap-3
                  transition-colors
                  ${currentLocale === loc
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }
                `}
              >
                <span className="text-xl">{localeFlags[loc]}</span>
                <span className="flex-1 text-sm font-medium">{localeNames[loc]}</span>
                {currentLocale === loc && (
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
