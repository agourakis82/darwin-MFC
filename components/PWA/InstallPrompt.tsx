'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import {
  isAppInstallable,
  showInstallPrompt as showInstall,
  getInstallationStatus,
} from '@/lib/pwa/sw-register';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * PWA Install Prompt Component
 * Prompts users to install Darwin as a PWA
 */
export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [installStatus, setInstallStatus] = useState<'installable' | 'installed' | 'not-installable'>('not-installable');
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check installation status
    getInstallationStatus().then(status => {
      if (status === 'installable') {
        setInstallStatus('installable');
      } else if (status.startsWith('installed')) {
        setInstallStatus('installed');
      } else {
        setInstallStatus('not-installable');
      }
    });

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setShowPrompt(true);

      // Optionally hide the prompt after 30 seconds
      setTimeout(() => setShowPrompt(false), 30000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt.current) return;

    const success = await showInstall(deferredPrompt.current);

    if (success) {
      setShowPrompt(false);
      deferredPrompt.current = null;
      setInstallStatus('installed');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || installStatus !== 'installable') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="fixed bottom-6 right-6 max-w-sm z-40"
      >
        <div className="card-base p-4 space-y-3 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Install Darwin MFC
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Get fast access to your medical platform anytime, anywhere
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              aria-label="Dismiss install prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
            <div className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400">✓</span>
              <span>Works offline</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400">✓</span>
              <span>No app store needed</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600 dark:text-blue-400">✓</span>
              <span>Instant access from home screen</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleInstall}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium rounded-lg transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default InstallPrompt;
