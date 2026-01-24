'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/pwa/sw-register';
import { useSkipToMainContent } from '@/lib/accessibility/hooks';

/**
 * PWA Initializer Component
 * Registers service worker and sets up PWA features on app load
 */
export function PWAInitializer() {
  // Setup accessibility
  useSkipToMainContent();

  useEffect(() => {
    // Register service worker for PWA functionality
    registerServiceWorker();

    // Cleanup for development
    return () => {
      // Service worker will continue running
    };
  }, []);

  return null; // This component doesn't render anything
}

export default PWAInitializer;
