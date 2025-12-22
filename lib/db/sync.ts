/**
 * DARWIN-MFC SYNC MANAGER
 * =======================
 *
 * Client-side sync management for offline-first data synchronization.
 * Coordinates with the service worker for background sync.
 *
 * Features:
 * - Online/offline detection
 * - Manual and automatic sync triggers
 * - Conflict resolution strategies
 * - Sync status tracking
 * - Delta sync (only changed records)
 */

import {
  syncQueueDB,
  progressDB,
  favoritesDB,
  notesDB,
  authTokensDB,
  offlineDataDB,
} from './indexedDB';
import type { SyncOperation, SyncStatus } from './schemas';

// =============================================================================
// TYPES
// =============================================================================

export interface SyncState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  pendingCount: number;
  hasAuth: boolean;
  error: string | null;
}

export interface SyncResult {
  success: boolean;
  synced: number;
  failed: number;
  errors: string[];
}

export interface ConflictResolution {
  strategy: 'client_wins' | 'server_wins' | 'merge' | 'manual';
  resolver?: (local: unknown, remote: unknown) => unknown;
}

export type SyncEventType =
  | 'sync_started'
  | 'sync_completed'
  | 'sync_failed'
  | 'online'
  | 'offline'
  | 'conflict_detected';

export type SyncEventCallback = (event: SyncEvent) => void;

export interface SyncEvent {
  type: SyncEventType;
  timestamp: string;
  data?: unknown;
}

// =============================================================================
// SYNC TAGS (must match service worker)
// =============================================================================

export const SYNC_TAGS = {
  USER_DATA: 'sync-user-data',
  FAVORITES: 'sync-favorites',
  NOTES: 'sync-notes',
  PROGRESS: 'sync-progress',
  QUEUE: 'sync-queue',
} as const;

// =============================================================================
// STATE
// =============================================================================

let syncState: SyncState = {
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  isSyncing: false,
  lastSyncedAt: null,
  pendingCount: 0,
  hasAuth: false,
  error: null,
};

const listeners: Set<SyncEventCallback> = new Set();

// =============================================================================
// EVENT SYSTEM
// =============================================================================

/**
 * Subscribe to sync events
 */
export function onSyncEvent(callback: SyncEventCallback): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Emit sync event to all listeners
 */
function emitEvent(type: SyncEventType, data?: unknown): void {
  const event: SyncEvent = {
    type,
    timestamp: new Date().toISOString(),
    data,
  };
  listeners.forEach((callback) => callback(event));
}

// =============================================================================
// ONLINE/OFFLINE DETECTION
// =============================================================================

/**
 * Initialize online/offline listeners
 */
export function initSyncListeners(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleOnline = () => {
    syncState.isOnline = true;
    emitEvent('online');
    // Trigger sync when coming back online
    triggerSync();
  };

  const handleOffline = () => {
    syncState.isOnline = false;
    emitEvent('offline');
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Listen for service worker messages
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'SYNC_COMPLETED') {
        syncState.isSyncing = false;
        syncState.lastSyncedAt = new Date().toISOString();
        emitEvent('sync_completed', event.data);
      } else if (event.data?.type === 'SYNC_FAILED') {
        syncState.isSyncing = false;
        syncState.error = event.data.error;
        emitEvent('sync_failed', event.data);
      } else if (event.data?.type === 'CONTENT_UPDATE_AVAILABLE') {
        // Handle content updates
        console.log('[Sync] New content available:', event.data.version);
      }
    });
  }

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

// =============================================================================
// SYNC TRIGGERS
// =============================================================================

/**
 * Trigger background sync via service worker
 */
export async function triggerSync(tag: string = SYNC_TAGS.USER_DATA): Promise<boolean> {
  if (!syncState.isOnline) {
    console.log('[Sync] Offline, skipping sync trigger');
    return false;
  }

  if (syncState.isSyncing) {
    console.log('[Sync] Sync already in progress');
    return false;
  }

  try {
    if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready;
      // Background Sync API type assertion
      const syncManager = (registration as ServiceWorkerRegistration & {
        sync: { register: (tag: string) => Promise<void> };
      }).sync;
      await syncManager.register(tag);
      syncState.isSyncing = true;
      emitEvent('sync_started', { tag });
      console.log('[Sync] Background sync registered:', tag);
      return true;
    } else {
      // Fallback: Manual sync
      return await manualSync();
    }
  } catch (error) {
    console.error('[Sync] Failed to register sync:', error);
    syncState.error = error instanceof Error ? error.message : 'Unknown error';
    return false;
  }
}

/**
 * Manual sync when background sync is not available
 */
export async function manualSync(): Promise<boolean> {
  if (!syncState.isOnline) {
    console.log('[Sync] Offline, cannot sync');
    return false;
  }

  if (syncState.isSyncing) {
    console.log('[Sync] Sync already in progress');
    return false;
  }

  try {
    syncState.isSyncing = true;
    emitEvent('sync_started');

    // Check auth
    const isValid = await authTokensDB.isValid();
    if (!isValid) {
      console.log('[Sync] No valid auth, skipping sync');
      syncState.isSyncing = false;
      return false;
    }

    // Send message to service worker to sync now
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const messageChannel = new MessageChannel();

      return new Promise((resolve) => {
        messageChannel.port1.onmessage = (event) => {
          syncState.isSyncing = false;
          if (event.data.success) {
            syncState.lastSyncedAt = new Date().toISOString();
            emitEvent('sync_completed');
            resolve(true);
          } else {
            syncState.error = event.data.error;
            emitEvent('sync_failed', { error: event.data.error });
            resolve(false);
          }
        };

        registration.active?.postMessage(
          { type: 'SYNC_NOW' },
          [messageChannel.port2]
        );
      });
    }

    syncState.isSyncing = false;
    return false;
  } catch (error) {
    syncState.isSyncing = false;
    syncState.error = error instanceof Error ? error.message : 'Unknown error';
    emitEvent('sync_failed', { error: syncState.error });
    return false;
  }
}

// =============================================================================
// QUEUE OPERATIONS
// =============================================================================

/**
 * Add operation to sync queue
 */
export async function queueOperation(
  userId: string,
  operation: SyncOperation['operation'],
  store: string,
  recordId: string,
  payload: Record<string, unknown>
): Promise<void> {
  await syncQueueDB.add({
    userId,
    operation,
    store,
    recordId,
    payload,
  });

  syncState.pendingCount = await syncQueueDB.count();

  // Trigger sync if online
  if (syncState.isOnline) {
    triggerSync(SYNC_TAGS.QUEUE);
  }
}

/**
 * Get pending operations count
 */
export async function getPendingCount(): Promise<number> {
  const count = await syncQueueDB.count();
  syncState.pendingCount = count;
  return count;
}

/**
 * Clear failed operations
 */
export async function clearFailedOperations(): Promise<void> {
  const all = await syncQueueDB.getAll();
  const failed = all.filter((op) => op.status === 'failed');

  for (const op of failed) {
    await syncQueueDB.markCompleted(op.id);
  }

  syncState.pendingCount = await syncQueueDB.count();
}

// =============================================================================
// SYNC STATUS
// =============================================================================

/**
 * Get current sync state
 */
export function getSyncState(): SyncState {
  return { ...syncState };
}

/**
 * Update sync state from service worker
 */
export async function refreshSyncState(): Promise<SyncState> {
  try {
    // Update pending count
    syncState.pendingCount = await syncQueueDB.count();

    // Check auth status
    syncState.hasAuth = await authTokensDB.isValid();

    // Get last sync time from offline data
    const lastSync = await offlineDataDB.get<string>('lastSyncedAt');
    syncState.lastSyncedAt = lastSync || null;

    // Check online status
    syncState.isOnline = navigator.onLine;

    // Get status from service worker
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const messageChannel = new MessageChannel();

      await new Promise<void>((resolve) => {
        messageChannel.port1.onmessage = (event) => {
          syncState.pendingCount = event.data.queueCount || syncState.pendingCount;
          syncState.hasAuth = event.data.hasAuth ?? syncState.hasAuth;
          syncState.isOnline = event.data.isOnline ?? syncState.isOnline;
          resolve();
        };

        registration.active?.postMessage(
          { type: 'GET_SYNC_STATUS' },
          [messageChannel.port2]
        );

        // Timeout after 1s
        setTimeout(resolve, 1000);
      });
    }
  } catch (error) {
    console.error('[Sync] Failed to refresh state:', error);
  }

  return { ...syncState };
}

// =============================================================================
// CONFLICT RESOLUTION
// =============================================================================

/**
 * Resolve sync conflict
 */
export function resolveConflict<T>(
  local: T,
  remote: T,
  resolution: ConflictResolution
): T {
  switch (resolution.strategy) {
    case 'client_wins':
      return local;
    case 'server_wins':
      return remote;
    case 'merge':
      if (resolution.resolver) {
        return resolution.resolver(local, remote) as T;
      }
      // Default merge: prefer remote but keep local-only fields
      return { ...local, ...remote };
    case 'manual':
      // Return local and let UI handle it
      emitEvent('conflict_detected', { local, remote });
      return local;
    default:
      return remote;
  }
}

/**
 * Mark item as having conflict
 */
export async function markConflict(
  store: 'progress' | 'favorites' | 'notes',
  id: string
): Promise<void> {
  const status: SyncStatus = 'conflict';

  switch (store) {
    case 'progress':
      const progress = await progressDB.get(id);
      if (progress) {
        await progressDB.save({ ...progress, syncStatus: status });
      }
      break;
    case 'favorites':
      // Favorites don't have individual update, would need different handling
      break;
    case 'notes':
      // Notes would need similar handling
      break;
  }
}

// =============================================================================
// DATA HELPERS
// =============================================================================

/**
 * Get all pending data for sync
 */
export async function getPendingData(): Promise<{
  progress: Awaited<ReturnType<typeof progressDB.getPending>>;
  favorites: Awaited<ReturnType<typeof favoritesDB.getPending>>;
  notes: Awaited<ReturnType<typeof notesDB.getPending>>;
  queue: Awaited<ReturnType<typeof syncQueueDB.getPending>>;
}> {
  const [progress, favorites, notes, queue] = await Promise.all([
    progressDB.getPending(),
    favoritesDB.getPending(),
    notesDB.getPending(),
    syncQueueDB.getPending(),
  ]);

  return { progress, favorites, notes, queue };
}

/**
 * Mark last sync time
 */
export async function markSynced(): Promise<void> {
  const now = new Date().toISOString();
  await offlineDataDB.set('lastSyncedAt', now);
  syncState.lastSyncedAt = now;
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize sync manager
 */
export async function initSync(): Promise<SyncState> {
  // Initialize listeners
  const cleanup = initSyncListeners();

  // Refresh state
  await refreshSyncState();

  // Trigger initial sync if online and have pending data
  if (syncState.isOnline && syncState.pendingCount > 0 && syncState.hasAuth) {
    triggerSync();
  }

  return getSyncState();
}

// Export for testing
export { syncState as _syncState };
