/**
 * ANALYTICS PROVIDER
 * ==================
 *
 * Wraps the app to enable automatic page view tracking
 */

'use client';

import { usePageTracking } from '@/lib/analytics/hooks';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  // Automatically track page views
  usePageTracking();

  return <>{children}</>;
}
