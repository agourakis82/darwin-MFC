/**
 * PWA INSTALL PROMPT
 * ===================
 *
 * Smart install prompt for PWA installation
 * A2HS (Add to Home Screen) support
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { Button } from '../../design-system/primitives/button';
import { Card } from '../../design-system/primitives/card';
import { isPWAInstallable, isInstalledPWA } from '../manifest-generator';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
  autoShow?: boolean;
  delayMs?: number;
  className?: string;
}

export const InstallPrompt: React.FC<InstallPromptProps> = ({
  onInstall,
  onDismiss,
  autoShow = true,
  delayMs = 30000, // 30 seconds default
  className,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    setIsInstalled(isInstalledPWA());

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Auto-show after delay
      if (autoShow && !isInstalled) {
        setTimeout(() => {
          setShowPrompt(true);
        }, delayMs);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [autoShow, delayMs, isInstalled]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        onInstall?.();
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Install prompt error:', error);
    }
  }, [deferredPrompt, onInstall]);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
    onDismiss?.();

    // Save dismissal in localStorage
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  }, [onDismiss]);

  // Don't show if already installed or no prompt available
  if (isInstalled || !deferredPrompt || !showPrompt) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={cn('fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50', className)}
      >
        <Card className="p-4 shadow-2xl border-2 border-brand-primary-500">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-brand-primary-100 dark:bg-brand-primary-900/30">
              <Download className="w-6 h-6 text-brand-primary-600 dark:text-brand-primary-400" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Install Darwin-MFC
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Install our app for faster access and offline support
              </p>

              <div className="flex items-center gap-2">
                <Button onClick={handleInstall} size="sm" className="gap-2">
                  <Smartphone className="w-4 h-4" />
                  Install App
                </Button>
                <Button onClick={handleDismiss} variant="ghost" size="sm">
                  Not Now
                </Button>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================================
// INSTALL BUTTON (for manual trigger)
// ============================================================================

export const InstallButton: React.FC<{
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ variant = 'default', size = 'md', className }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsInstalled(isInstalledPWA());

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Install prompt error:', error);
    }
  };

  // Don't show if already installed or no prompt available
  if (isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={cn('gap-2', className)}
    >
      <Download className="w-4 h-4" />
      Install App
    </Button>
  );
};

// ============================================================================
// PWA STATUS BADGE
// ============================================================================

export const PWAStatusBadge: React.FC<{ className?: string }> = ({ className }) => {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsInstalled(isInstalledPWA());

    const handleAppInstalled = () => {
      setIsInstalled(true);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isInstalled) return null;

  return (
    <div className={cn(
      'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      className
    )}>
      <Monitor className="w-3 h-3" />
      <span>Installed</span>
    </div>
  );
};
