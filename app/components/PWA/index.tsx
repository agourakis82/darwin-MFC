'use client';

/**
 * PWA PROVIDER - DARWIN-MFC
 * ==========================
 *
 * Combines all PWA components for easy integration.
 * Add <PWAProvider /> to your root layout.
 */

import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues
const ServiceWorkerRegistration = dynamic(
  () => import('./ServiceWorkerRegistration'),
  { ssr: false }
);

const InstallPrompt = dynamic(
  () => import('./InstallPrompt'),
  { ssr: false }
);

const OfflineIndicator = dynamic(
  () => import('./OfflineIndicator'),
  { ssr: false }
);

export function PWAProvider() {
  return (
    <>
      <ServiceWorkerRegistration />
      <InstallPrompt />
      <OfflineIndicator />
    </>
  );
}

// Named exports for individual use
export { default as InstallPrompt } from './InstallPrompt';
export { default as ServiceWorkerRegistration } from './ServiceWorkerRegistration';
export { default as OfflineIndicator } from './OfflineIndicator';
