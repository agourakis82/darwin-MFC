/**
 * DARWIN-MFC SYNC STORE
 * =====================
 *
 * Zustand store for managing offline sync state.
 * Handles sync queue, conflict resolution, and sync status.
 */

import { create } from 'zustand';
import {
  syncQueueDB,
  favoritesDB,
  notesDB,
  progressDB,
} from '../db/indexedDB';
import { api } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import type { SyncOperation } from '../db/schemas';

// =============================================================================
// TYPES
// =============================================================================

export interface SyncConflict {
  id: string;
  store: string;
  localRecord: Record<string, unknown>;
  serverRecord: Record<string, unknown>;
  conflictType: 'update' | 'delete';
  detectedAt: string;
}

export interface SyncState {
  // Status
  isSyncing: boolean;
  lastSyncAt: string | null;
  isOnline: boolean;

  // Queue
  pendingCount: number;
  failedCount: number;

  // Conflicts
  conflicts: SyncConflict[];

  // Progress
  syncProgress: {
    total: number;
    completed: number;
    failed: number;
  };

  // Error
  lastError: string | null;
}

export interface SyncActions {
  // Sync operations
  startSync: () => Promise<void>;
  cancelSync: () => void;

  // Queue management
  refreshQueueCount: () => Promise<void>;
  clearFailedQueue: () => Promise<void>;
  retryFailed: () => Promise<void>;

  // Conflict resolution
  resolveConflict: (conflictId: string, resolution: 'local' | 'server' | 'merge') => Promise<void>;
  dismissConflict: (conflictId: string) => void;

  // Status
  setOnlineStatus: (isOnline: boolean) => void;
  resetSyncState: () => void;
}

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: SyncState = {
  isSyncing: false,
  lastSyncAt: null,
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  pendingCount: 0,
  failedCount: 0,
  conflicts: [],
  syncProgress: {
    total: 0,
    completed: 0,
    failed: 0,
  },
  lastError: null,
};

// =============================================================================
// STORE
// =============================================================================

let syncAbortController: AbortController | null = null;

export const useSyncStore = create<SyncState & SyncActions>()((set, get) => ({
  ...initialState,

  // ===========================================================================
  // SYNC OPERATIONS
  // ===========================================================================

  startSync: async () => {
    const { isSyncing, isOnline } = get();

    if (isSyncing) {
      console.log('[Sync] Already syncing');
      return;
    }

    if (!isOnline) {
      console.log('[Sync] Offline, cannot sync');
      set({ lastError: 'Cannot sync while offline' });
      return;
    }

    syncAbortController = new AbortController();

    set({
      isSyncing: true,
      lastError: null,
      syncProgress: { total: 0, completed: 0, failed: 0 },
    });

    try {
      // Get pending operations
      const pending = await syncQueueDB.getPending();
      const total = pending.length;

      set({ syncProgress: { total, completed: 0, failed: 0 } });

      console.log(`[Sync] Starting sync of ${total} operations`);

      let completed = 0;
      let failed = 0;

      for (const operation of pending) {
        if (syncAbortController.signal.aborted) {
          console.log('[Sync] Sync cancelled');
          break;
        }

        try {
          await processSyncOperation(operation);
          await syncQueueDB.markCompleted(operation.id);
          completed++;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          await syncQueueDB.markFailed(operation.id, message);
          failed++;

          // Check for conflicts
          if (isConflictError(error)) {
            const conflict = await createConflict(operation, error);
            set((state) => ({
              conflicts: [...state.conflicts, conflict],
            }));
          }
        }

        set({ syncProgress: { total, completed, failed } });
      }

      // Also push any pending local data
      await pushPendingData();

      set({
        isSyncing: false,
        lastSyncAt: new Date().toISOString(),
      });

      // Refresh counts
      await get().refreshQueueCount();

      console.log(`[Sync] Completed: ${completed} success, ${failed} failed`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('[Sync] Sync failed:', message);
      set({
        isSyncing: false,
        lastError: message,
      });
    } finally {
      syncAbortController = null;
    }
  },

  cancelSync: () => {
    if (syncAbortController) {
      syncAbortController.abort();
      set({ isSyncing: false });
    }
  },

  // ===========================================================================
  // QUEUE MANAGEMENT
  // ===========================================================================

  refreshQueueCount: async () => {
    try {
      const pending = await syncQueueDB.getPending();
      const all = await syncQueueDB.getAll();
      const failed = all.filter((op) => op.status === 'failed');

      set({
        pendingCount: pending.length,
        failedCount: failed.length,
      });
    } catch (error) {
      console.error('[Sync] Failed to refresh queue count:', error);
    }
  },

  clearFailedQueue: async () => {
    try {
      const all = await syncQueueDB.getAll();
      const failed = all.filter((op) => op.status === 'failed');

      for (const op of failed) {
        await syncQueueDB.markCompleted(op.id);
      }

      await get().refreshQueueCount();
    } catch (error) {
      console.error('[Sync] Failed to clear failed queue:', error);
    }
  },

  retryFailed: async () => {
    try {
      const all = await syncQueueDB.getAll();
      const failed = all.filter((op) => op.status === 'failed');

      // Reset failed operations to pending
      for (const op of failed) {
        await syncQueueDB.add({
          userId: op.userId,
          operation: op.operation,
          store: op.store,
          recordId: op.recordId,
          payload: op.payload,
        });
        await syncQueueDB.markCompleted(op.id);
      }

      await get().refreshQueueCount();

      // Start sync
      await get().startSync();
    } catch (error) {
      console.error('[Sync] Failed to retry failed operations:', error);
    }
  },

  // ===========================================================================
  // CONFLICT RESOLUTION
  // ===========================================================================

  resolveConflict: async (conflictId: string, resolution: 'local' | 'server' | 'merge') => {
    const { conflicts } = get();
    const conflict = conflicts.find((c) => c.id === conflictId);

    if (!conflict) return;

    try {
      switch (resolution) {
        case 'local':
          // Push local version to server
          await api.put(
            `${ENDPOINTS.sync.resolve}/${conflict.store}/${conflictId}`,
            conflict.localRecord
          );
          break;

        case 'server':
          // Accept server version, update local
          await updateLocalRecord(conflict.store, conflict.serverRecord);
          break;

        case 'merge':
          // Merge records (server wins for conflicts, local for new fields)
          const merged = {
            ...conflict.localRecord,
            ...conflict.serverRecord,
            updatedAt: new Date().toISOString(),
          };
          await api.put(
            `${ENDPOINTS.sync.resolve}/${conflict.store}/${conflictId}`,
            merged
          );
          await updateLocalRecord(conflict.store, merged);
          break;
      }

      // Remove conflict from list
      set((state) => ({
        conflicts: state.conflicts.filter((c) => c.id !== conflictId),
      }));
    } catch (error) {
      console.error('[Sync] Failed to resolve conflict:', error);
      throw error;
    }
  },

  dismissConflict: (conflictId: string) => {
    set((state) => ({
      conflicts: state.conflicts.filter((c) => c.id !== conflictId),
    }));
  },

  // ===========================================================================
  // STATUS
  // ===========================================================================

  setOnlineStatus: (isOnline: boolean) => {
    const wasOffline = !get().isOnline;

    set({ isOnline });

    // Auto-sync when coming back online
    if (isOnline && wasOffline) {
      console.log('[Sync] Back online, starting sync');
      get().startSync();
    }
  },

  resetSyncState: () => {
    set(initialState);
  },
}));

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Process a single sync operation
 */
async function processSyncOperation(operation: SyncOperation): Promise<void> {
  const { payload } = operation;

  switch (operation.operation) {
    case 'create':
    case 'update':
      await api.post(ENDPOINTS.sync.push, {
        store: operation.store,
        operation: operation.operation,
        record: payload,
      });
      break;

    case 'delete':
      await api.post(ENDPOINTS.sync.push, {
        store: operation.store,
        operation: 'delete',
        recordId: operation.recordId,
      });
      break;
  }
}

/**
 * Push all pending local data
 */
async function pushPendingData(): Promise<void> {
  // Push pending favorites
  const pendingFavorites = await favoritesDB.getPending();
  if (pendingFavorites.length > 0) {
    await api.post(ENDPOINTS.favorites.sync, { items: pendingFavorites });
    // Mark as synced locally
    for (const fav of pendingFavorites) {
      await favoritesDB.add(fav.userId, fav.itemType, fav.itemId);
    }
  }

  // Push pending notes
  const pendingNotes = await notesDB.getPending();
  if (pendingNotes.length > 0) {
    await api.post(ENDPOINTS.notes.sync, { items: pendingNotes });
  }

  // Push pending progress
  const pendingProgress = await progressDB.getPending();
  if (pendingProgress.length > 0) {
    await api.post(ENDPOINTS.sync.push, {
      store: 'progress',
      items: pendingProgress,
    });
    for (const prog of pendingProgress) {
      await progressDB.markSynced(prog.id);
    }
  }
}

/**
 * Check if error is a conflict error
 */
function isConflictError(error: unknown): boolean {
  if (error instanceof Error && 'status' in error) {
    return (error as { status: number }).status === 409;
  }
  return false;
}

/**
 * Create a conflict record
 */
async function createConflict(
  operation: SyncOperation,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): Promise<SyncConflict> {
  return {
    id: operation.id,
    store: operation.store,
    localRecord: operation.payload as Record<string, unknown>,
    serverRecord: error.details?.serverRecord || {},
    conflictType: operation.operation === 'delete' ? 'delete' : 'update',
    detectedAt: new Date().toISOString(),
  };
}

/**
 * Update local record from server data
 */
async function updateLocalRecord(
  store: string,
  record: Record<string, unknown>
): Promise<void> {
  // This would update the appropriate IndexedDB store
  // Implementation depends on the store type
  console.log(`[Sync] Updating local record in ${store}:`, record.id);
}

// =============================================================================
// ONLINE/OFFLINE LISTENER
// =============================================================================

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useSyncStore.getState().setOnlineStatus(true);
  });

  window.addEventListener('offline', () => {
    useSyncStore.getState().setOnlineStatus(false);
  });
}

// =============================================================================
// EXPORT HELPERS
// =============================================================================

/**
 * Initialize sync on app start
 */
export async function initSync(): Promise<void> {
  await useSyncStore.getState().refreshQueueCount();

  // If online and has pending, start sync
  if (navigator.onLine && useSyncStore.getState().pendingCount > 0) {
    useSyncStore.getState().startSync();
  }
}
