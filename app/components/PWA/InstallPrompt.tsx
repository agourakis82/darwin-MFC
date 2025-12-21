'use client';

/**
 * PWA INSTALL PROMPT - DARWIN-MFC
 * ================================
 *
 * Prompts users to install the app for offline access.
 * Designed for LMICs where offline capability is critical.
 *
 * Features:
 * - Detects install capability
 * - Shows contextual prompt
 * - Remembers user dismissal
 * - Supports all 9 languages
 */

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { X, Download, Smartphone, Wifi, WifiOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'darwin-mfc-install-dismissed';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function InstallPrompt() {
  const t = useTranslations('common');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Check if already installed
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         (window.navigator as Navigator & { standalone?: boolean }).standalone ||
                         document.referrer.includes('android-app://');

    setIsInstalled(isStandalone);

    // Check online status
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for install prompt
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Check if user dismissed recently
      const dismissedAt = localStorage.getItem(DISMISS_KEY);
      if (dismissedAt) {
        const dismissTime = parseInt(dismissedAt, 10);
        if (Date.now() - dismissTime < DISMISS_DURATION) {
          return;
        }
      }

      // Show prompt after delay (let user explore first)
      setTimeout(() => setShowPrompt(true), 30000); // 30 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Handle install
  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
    } catch (error) {
      console.error('Install failed:', error);
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  }, [deferredPrompt]);

  // Handle dismiss
  const handleDismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setShowPrompt(false);
  }, []);

  // Don't render if installed or no prompt available
  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-4 text-white">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {t('pwa.installTitle') || 'Install Darwin MFC'}
              </h3>
              <p className="text-sm text-white/80">
                {t('pwa.installSubtitle') || 'Works offline!'}
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Benefits */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <WifiOff className="w-4 h-4 text-green-300" />
            <span>{t('pwa.benefitOffline') || 'Access content without internet'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Download className="w-4 h-4 text-green-300" />
            <span>{t('pwa.benefitFast') || 'Faster loading, less data usage'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Smartphone className="w-4 h-4 text-green-300" />
            <span>{t('pwa.benefitApp') || 'Use like a native app'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 bg-white text-blue-600 font-semibold py-2.5 px-4 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {t('pwa.installButton') || 'Install'}
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
          >
            {t('pwa.later') || 'Later'}
          </button>
        </div>

        {/* Online status */}
        <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2 text-xs text-white/70">
          {isOnline ? (
            <>
              <Wifi className="w-3 h-3 text-green-300" />
              <span>{t('pwa.online') || 'Online - Perfect time to install!'}</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-yellow-300" />
              <span>{t('pwa.offline') || 'Offline - Install when connected'}</span>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
