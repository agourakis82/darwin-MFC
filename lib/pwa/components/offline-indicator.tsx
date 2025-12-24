/**
 * OFFLINE INDICATOR & FALLBACK SYSTEM
 * =====================================
 *
 * Visual indicators for online/offline status
 * Offline fallback pages and sync status
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import { WifiOff, Wifi, CloudOff, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../../design-system/primitives/button';
import { Card } from '../../design-system/primitives/card';
import { isOffline, onConnectionChange } from '../service-worker';

// ============================================================================
// OFFLINE BANNER
// ============================================================================

export const OfflineBanner: React.FC<{ className?: string }> = ({ className }) => {
  const [offline, setOffline] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Initial check
    setOffline(isOffline());

    // Listen for changes
    const cleanup = onConnectionChange((isOnline) => {
      setOffline(!isOnline);
      setShowBanner(!isOnline);

      // Auto-hide when back online
      if (isOnline) {
        setTimeout(() => setShowBanner(false), 3000);
      }
    });

    return cleanup;
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={cn(
            'fixed top-0 left-0 right-0 z-50 p-3',
            offline
              ? 'bg-red-600 text-white'
              : 'bg-green-600 text-white',
            className
          )}
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {offline ? (
                <>
                  <WifiOff className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    You're offline. Some features may be limited.
                  </span>
                </>
              ) : (
                <>
                  <Wifi className="w-5 h-5" />
                  <span className="text-sm font-medium">Back online!</span>
                </>
              )}
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-white hover:opacity-80"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// OFFLINE STATUS INDICATOR
// ============================================================================

export const OfflineStatusIndicator: React.FC<{ className?: string }> = ({ className }) => {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(isOffline());

    const cleanup = onConnectionChange((isOnline) => {
      setOffline(!isOnline);
    });

    return cleanup;
  }, []);

  if (!offline) return null;

  return (
    <div className={cn('flex items-center gap-2 text-red-600 dark:text-red-400', className)}>
      <WifiOff className="w-4 h-4" />
      <span className="text-sm font-medium">Offline</span>
    </div>
  );
};

// ============================================================================
// OFFLINE FALLBACK PAGE
// ============================================================================

export const OfflineFallback: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <CloudOff className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            You're Offline
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            It looks like you've lost your internet connection. Some features may not be available.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={handleRetry} className="w-full gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="font-medium mb-1">While you're offline:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Previously viewed content may be available</li>
                  <li>• Saved data is still accessible</li>
                  <li>• Changes will sync when you're back online</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
