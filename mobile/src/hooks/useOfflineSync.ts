/**
 * Hook para gerenciar sincronização offline
 */

import { useState, useEffect } from 'react';
import { offlineSyncService, type SyncStatus } from '../services/offline-sync';

export function useOfflineSync() {
  const [status, setStatus] = useState<SyncStatus>(offlineSyncService.getStatus());

  useEffect(() => {
    const unsubscribe = offlineSyncService.addSyncListener(newStatus => {
      setStatus(newStatus);
    });

    return unsubscribe;
  }, []);

  const sync = async () => {
    await offlineSyncService.sync();
  };

  const clearCache = async () => {
    await offlineSyncService.clearCache();
  };

  return {
    status,
    sync,
    clearCache,
    isOnline: status.isOnline,
    isSyncing: status.isSyncing,
    pendingChanges: status.pendingChanges,
    lastSync: status.lastSync,
  };
}

