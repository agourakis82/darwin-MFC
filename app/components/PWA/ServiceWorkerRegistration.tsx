'use client';

/**
 * SERVICE WORKER REGISTRATION - DARWIN-MFC
 * =========================================
 *
 * Registers the service worker and handles updates.
 * Shows update notification when new version available.
 */

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { RefreshCw, X } from 'lucide-react';

export default function ServiceWorkerRegistration() {
  const t = useTranslations('common');
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });

        setRegistration(reg);
        console.log('[PWA] Service worker registered');

        // Check for updates periodically
        setInterval(() => {
          reg.update();
        }, 60 * 60 * 1000); // Every hour

        // Listen for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] New version available');
              setUpdateAvailable(true);
            }
          });
        });

      } catch (error) {
        console.error('[PWA] Service worker registration failed:', error);
      }
    };

    // Register after load
    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
      return () => window.removeEventListener('load', registerSW);
    }
  }, []);

  // Handle update
  const handleUpdate = useCallback(() => {
    if (!registration?.waiting) return;

    // Tell waiting service worker to take over
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // Reload page when new service worker activates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }, [registration]);

  // Handle dismiss
  const handleDismiss = useCallback(() => {
    setUpdateAvailable(false);
  }, []);

  if (!updateAvailable) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-down">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">
                {t('pwa.updateTitle') || 'Update Available'}
              </h3>
              <p className="text-sm text-white/80">
                {t('pwa.updateMessage') || 'New version ready to install'}
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

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-white text-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {t('pwa.updateButton') || 'Update Now'}
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            {t('pwa.later') || 'Later'}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
