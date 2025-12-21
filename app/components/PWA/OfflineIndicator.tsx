'use client';

/**
 * OFFLINE INDICATOR - DARWIN-MFC
 * ===============================
 *
 * Shows a subtle indicator when the user is offline.
 * Important for LMICs with intermittent connectivity.
 */

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineIndicator() {
  const t = useTranslations('common');
  const [isOnline, setIsOnline] = useState(true);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show reconnected message briefly
  if (showReconnected) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
        <div className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <span className="text-sm font-medium">
            {t('pwa.reconnected') || 'Back online!'}
          </span>
        </div>
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translate(-50%, 10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Show offline indicator
  if (!isOnline) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">
            {t('pwa.offlineMode') || 'Offline - Using cached data'}
          </span>
        </div>
      </div>
    );
  }

  return null;
}
