'use client';

import ThemeProvider from '../components/Layout/ThemeProvider';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import { PWAProvider } from '../components/PWA';

/**
 * Root layout content component
 * Extracted to client component to allow use of hooks
 */
export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
        <PWAProvider />
        <KeyboardShortcuts />
        {/* Skip links for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          {/* Translation will be added via useTranslations hook in a client component wrapper if needed */}
          Pular para o conteúdo principal
        </a>
        <a 
          href="#main-nav" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-64 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Pular para navegação
        </a>
        
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <div className="hidden lg:block">
              <Sidebar />
            </div>
            <main id="main-content" className="flex-1 overflow-x-hidden" role="main" aria-label="Conteúdo principal">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
  );
}

