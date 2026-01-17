/**
 * Cross-Tab Sync Utilities for Zustand
 * =====================================
 * Uses BroadcastChannel API to sync state changes across browser tabs.
 * Falls back gracefully when BroadcastChannel is not available (SSR, older browsers).
 */

// Generate unique tab ID
const TAB_ID = typeof crypto !== 'undefined'
  ? crypto.randomUUID?.() || Math.random().toString(36).slice(2)
  : Math.random().toString(36).slice(2);

interface SyncMessage<T> {
  type: 'STATE_UPDATE';
  payload: Partial<T>;
  timestamp: number;
  tabId: string;
}

/**
 * Creates a cross-tab sync channel that broadcasts state updates.
 * Use this with Zustand's subscribe method to sync state across tabs.
 *
 * @example
 * ```typescript
 * const { broadcast, subscribe, unsubscribe } = createSyncChannel<AppState>('darwin-mfc-sync');
 *
 * // Subscribe to updates from other tabs
 * subscribe((state) => {
 *   useAppStore.setState(state);
 * });
 *
 * // Broadcast local changes
 * useAppStore.subscribe((state) => {
 *   broadcast({ theme: state.theme, contentMode: state.contentMode });
 * });
 * ```
 */
export function createSyncChannel<T>(channelName: string = 'darwin-mfc-sync') {
  let channel: BroadcastChannel | null = null;
  let listeners: Array<(state: Partial<T>) => void> = [];

  // Initialize BroadcastChannel if available
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      channel = new BroadcastChannel(channelName);

      channel.onmessage = (event: MessageEvent<SyncMessage<T>>) => {
        const { type, payload, tabId } = event.data;

        // Ignore messages from this tab
        if (tabId === TAB_ID) return;

        if (type === 'STATE_UPDATE' && payload) {
          listeners.forEach((listener) => listener(payload));
        }
      };

      channel.onmessageerror = (error) => {
        console.warn('[sync] BroadcastChannel message error:', error);
      };
    } catch (error) {
      console.warn('[sync] Failed to create BroadcastChannel:', error);
    }
  }

  return {
    /**
     * Broadcast state updates to other tabs
     */
    broadcast: (state: Partial<T>) => {
      if (!channel) return;

      const message: SyncMessage<T> = {
        type: 'STATE_UPDATE',
        payload: state,
        timestamp: Date.now(),
        tabId: TAB_ID,
      };

      try {
        channel.postMessage(message);
      } catch (error) {
        console.warn('[sync] Failed to broadcast:', error);
      }
    },

    /**
     * Subscribe to state updates from other tabs
     */
    subscribe: (listener: (state: Partial<T>) => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },

    /**
     * Close the channel
     */
    close: () => {
      channel?.close();
      listeners = [];
    },

    /**
     * Check if sync is available
     */
    isAvailable: () => channel !== null,
  };
}

/**
 * Hook to enable cross-tab sync for a Zustand store.
 * Call this once in your app to set up sync.
 *
 * @example
 * ```typescript
 * // In your app initialization or layout
 * useEffect(() => {
 *   const cleanup = setupCrossTabSync(useAppStore, {
 *     channelName: 'darwin-mfc-sync',
 *     partialize: (state) => ({
 *       theme: state.theme,
 *       contentMode: state.contentMode,
 *     }),
 *   });
 *   return cleanup;
 * }, []);
 * ```
 */
export function setupCrossTabSync<T extends object>(
  store: {
    getState: () => T;
    setState: (state: Partial<T>) => void;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
  },
  options: {
    channelName?: string;
    partialize?: (state: T) => Partial<T>;
    debounceMs?: number;
  } = {}
): () => void {
  const {
    channelName = 'darwin-mfc-sync',
    partialize = (state: T) => state,
    debounceMs = 100,
  } = options;

  const sync = createSyncChannel<T>(channelName);

  if (!sync.isAvailable()) {
    return () => {}; // No-op cleanup
  }

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
  let isUpdatingFromSync = false;

  // Subscribe to updates from other tabs
  const unsubscribeFromSync = sync.subscribe((state) => {
    isUpdatingFromSync = true;
    store.setState(state);
    isUpdatingFromSync = false;
  });

  // Subscribe to local changes and broadcast
  const unsubscribeFromStore = store.subscribe((state) => {
    if (isUpdatingFromSync) return;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      const partialState = partialize(state);
      sync.broadcast(partialState);
    }, debounceMs);
  });

  // Cleanup function
  return () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    unsubscribeFromSync();
    unsubscribeFromStore();
    sync.close();
  };
}

export default setupCrossTabSync;
