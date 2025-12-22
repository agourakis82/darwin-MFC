/**
 * DARWIN-MFC DATABASE MODULE
 * ==========================
 *
 * Exports all database utilities and types.
 */

// Core database functions
export {
  getDB,
  closeDB,
  deleteDB,
  initDB,
  isIndexedDBAvailable,
  getStorageEstimate,
  STORES,
} from './indexedDB';

// Type-specific database operations
export {
  userProfileDB,
  progressDB,
  favoritesDB,
  notesDB,
  syncQueueDB,
  cachedCasesDB,
  cachedForumPostsDB,
  authTokensDB,
  offlineDataDB,
} from './indexedDB';

// Generic operations
export {
  get,
  getAll,
  getByIndex,
  put,
  putBatch,
  remove,
  clear,
  count,
} from './indexedDB';

// Sync operations
export {
  initSync,
  triggerSync,
  manualSync,
  queueOperation,
  getPendingCount,
  getSyncState,
  refreshSyncState,
  onSyncEvent,
  resolveConflict,
  getPendingData,
  markSynced,
  clearFailedOperations,
  SYNC_TAGS,
} from './sync';

// Types
export type {
  UserProfile,
  ModuleProgress,
  FavoriteItem,
  UserNote,
  SyncOperation,
  CachedCase,
  CachedForumPost,
  AuthTokens,
  OfflineData,
  SyncStatus,
} from './schemas';

// Sync types
export type {
  SyncState,
  SyncResult,
  SyncEvent,
  SyncEventType,
  SyncEventCallback,
  ConflictResolution,
} from './sync';

// Schema definitions
export {
  DB_NAME,
  DB_VERSION,
  STORE_DEFINITIONS,
  MIGRATIONS,
} from './schemas';
