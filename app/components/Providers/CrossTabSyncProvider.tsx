'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store/appStore';
import { setupCrossTabSync } from '@/lib/store/syncMiddleware';

/**
 * CrossTabSyncProvider
 * ====================
 * Sets up cross-tab synchronization for the app store.
 * Syncs theme, contentMode, viewMode, and locale across browser tabs.
 *
 * Add this component near the root of your app (e.g., in layout.tsx).
 */
export function CrossTabSyncProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cleanup = setupCrossTabSync(useAppStore, {
      channelName: 'darwin-mfc-sync',
      partialize: (state) => ({
        theme: state.theme,
        contentMode: state.contentMode,
        viewMode: state.viewMode,
        locale: state.locale,
      }),
      debounceMs: 100,
    });

    return cleanup;
  }, []);

  return <>{children}</>;
}

export default CrossTabSyncProvider;
