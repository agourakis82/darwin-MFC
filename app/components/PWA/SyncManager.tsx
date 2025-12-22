'use client';

/**
 * SYNC MANAGER - DARWIN-MFC
 * =========================
 *
 * UI component for managing offline data synchronization.
 * Shows sync status, pending items, and allows manual sync.
 */

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Cloud,
  CloudOff,
  RefreshCw,
  Check,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Trash2,
  Database,
} from 'lucide-react';
import { syncQueueDB, getStorageEstimate, isIndexedDBAvailable } from '@/lib/db';

// =============================================================================
// TYPES
// =============================================================================

interface SyncStatus {
  isOnline: boolean;
  pendingCount: number;
  failedCount: number;
  lastSyncAt: string | null;
  isSyncing: boolean;
  storageUsage: {
    usage: number;
    quota: number;
    percent: number;
  };
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function SyncManager() {
  const t = useTranslations('common');
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState<SyncStatus>({
    isOnline: true,
    pendingCount: 0,
    failedCount: 0,
    lastSyncAt: null,
    isSyncing: false,
    storageUsage: { usage: 0, quota: 0, percent: 0 },
  });

  // ==========================================================================
  // FETCH STATUS
  // ==========================================================================

  const fetchStatus = useCallback(async () => {
    if (!isIndexedDBAvailable()) return;

    try {
      const [pending, all, storage] = await Promise.all([
        syncQueueDB.getPending(),
        syncQueueDB.getAll(),
        getStorageEstimate(),
      ]);

      const failed = all.filter((op) => op.status === 'failed');
      const lastSync = localStorage.getItem('darwin-mfc-last-sync');

      setStatus((prev) => ({
        ...prev,
        isOnline: navigator.onLine,
        pendingCount: pending.length,
        failedCount: failed.length,
        lastSyncAt: lastSync,
        storageUsage: storage,
      }));
    } catch (error) {
      console.error('[SyncManager] Failed to fetch status:', error);
    }
  }, []);

  // ==========================================================================
  // SYNC NOW
  // ==========================================================================

  const handleSyncNow = useCallback(async () => {
    if (!navigator.onLine || status.isSyncing) return;

    setStatus((prev) => ({ ...prev, isSyncing: true }));

    try {
      // Request background sync if supported
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;

        // Check if sync is supported (Background Sync API)
        if ('sync' in registration) {
          try {
            await (registration as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } }).sync.register('sync-user-data');
          } catch (syncError) {
            console.log('[SyncManager] Background sync not available:', syncError);
          }
        }

        // Also send message to service worker
        const messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = (event) => {
          if (event.data.success) {
            localStorage.setItem('darwin-mfc-last-sync', new Date().toISOString());
            fetchStatus();
          }
        };

        registration.active?.postMessage(
          { type: 'SYNC_NOW' },
          [messageChannel.port2]
        );
      }

      // Simulate sync completion after timeout
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, isSyncing: false }));
        fetchStatus();
      }, 3000);
    } catch (error) {
      console.error('[SyncManager] Sync failed:', error);
      setStatus((prev) => ({ ...prev, isSyncing: false }));
    }
  }, [status.isSyncing, fetchStatus]);

  // ==========================================================================
  // CLEAR FAILED
  // ==========================================================================

  const handleClearFailed = useCallback(async () => {
    if (!isIndexedDBAvailable()) return;

    try {
      const all = await syncQueueDB.getAll();
      const failed = all.filter((op) => op.status === 'failed');

      for (const op of failed) {
        await syncQueueDB.markCompleted(op.id);
      }

      fetchStatus();
    } catch (error) {
      console.error('[SyncManager] Failed to clear failed ops:', error);
    }
  }, [fetchStatus]);

  // ==========================================================================
  // EFFECTS
  // ==========================================================================

  useEffect(() => {
    fetchStatus();

    // Listen for online/offline changes
    const handleOnline = () => {
      setStatus((prev) => ({ ...prev, isOnline: true }));
      // Auto-sync when coming online
      handleSyncNow();
    };

    const handleOffline = () => {
      setStatus((prev) => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Periodic status refresh
    const interval = setInterval(fetchStatus, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [fetchStatus, handleSyncNow]);

  // ==========================================================================
  // RENDER HELPERS
  // ==========================================================================

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return t('pwa.never_synced') || 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return t('pwa.just_now') || 'Just now';
    if (diffMins < 60) return `${diffMins}m ${t('pwa.ago') || 'ago'}`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ${t('pwa.ago') || 'ago'}`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (): string => {
    if (!status.isOnline) return 'bg-yellow-500';
    if (status.failedCount > 0) return 'bg-red-500';
    if (status.pendingCount > 0) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStatusIcon = () => {
    if (!status.isOnline) return <CloudOff className="w-4 h-4" />;
    if (status.isSyncing) return <Loader2 className="w-4 h-4 animate-spin" />;
    if (status.failedCount > 0) return <AlertCircle className="w-4 h-4" />;
    if (status.pendingCount > 0) return <RefreshCw className="w-4 h-4" />;
    return <Check className="w-4 h-4" />;
  };

  // Don't show if IndexedDB isn't available
  if (!isIndexedDBAvailable()) {
    return null;
  }

  // Collapsed view - just a small indicator
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className={`fixed bottom-20 right-4 z-40 p-3 rounded-full shadow-lg ${getStatusColor()} text-white transition-all hover:scale-110`}
        title={t('pwa.sync_status') || 'Sync Status'}
      >
        {getStatusIcon()}
        {(status.pendingCount > 0 || status.failedCount > 0) && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-xs font-bold rounded-full flex items-center justify-center text-gray-900">
            {status.pendingCount + status.failedCount}
          </span>
        )}
      </button>
    );
  }

  // Expanded view
  return (
    <div className="fixed bottom-20 right-4 z-40 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className={`p-4 ${getStatusColor()} text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {status.isOnline ? (
              <Cloud className="w-5 h-5" />
            ) : (
              <CloudOff className="w-5 h-5" />
            )}
            <span className="font-semibold">
              {status.isOnline
                ? t('pwa.online') || 'Online'
                : t('pwa.offline') || 'Offline'}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 hover:bg-white/20 rounded"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Sync Status */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {t('pwa.last_sync') || 'Last sync'}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatDate(status.lastSyncAt)}
          </span>
        </div>

        {/* Pending Items */}
        {status.pendingCount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600 dark:text-blue-400">
              {t('pwa.pending_sync') || 'Pending sync'}
            </span>
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
              {status.pendingCount}
            </span>
          </div>
        )}

        {/* Failed Items */}
        {status.failedCount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-600 dark:text-red-400">
              {t('pwa.sync_failed') || 'Failed'}
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full font-medium">
                {status.failedCount}
              </span>
              <button
                onClick={handleClearFailed}
                className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                title={t('pwa.clear_failed') || 'Clear failed'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Storage Usage */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <Database className="w-4 h-4" />
            <span>{t('pwa.storage') || 'Storage'}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(status.storageUsage.percent, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatBytes(status.storageUsage.usage)}</span>
            <span>{formatBytes(status.storageUsage.quota)}</span>
          </div>
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSyncNow}
          disabled={!status.isOnline || status.isSyncing}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {status.isSyncing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('pwa.syncing') || 'Syncing...'}
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              {t('pwa.sync_now') || 'Sync Now'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
