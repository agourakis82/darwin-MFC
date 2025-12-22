/**
 * DARWIN-MFC DATABASE SCHEMAS
 * ===========================
 *
 * IndexedDB schema definitions for offline-first data persistence.
 * Designed for 7-day offline capability with minimal storage footprint.
 */

// =============================================================================
// DATABASE VERSION & CONFIGURATION
// =============================================================================

export const DB_NAME = 'darwin-mfc-db';
export const DB_VERSION = 1;

// Store names
export const STORES = {
  USER_PROFILE: 'userProfile',
  PROGRESS: 'progress',
  FAVORITES: 'favorites',
  NOTES: 'notes',
  SYNC_QUEUE: 'syncQueue',
  CACHED_CASES: 'cachedCases',
  CACHED_FORUM_POSTS: 'cachedForumPosts',
  AUTH_TOKENS: 'authTokens',
  OFFLINE_DATA: 'offlineData',
} as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  locale: string;
  countryCode?: string;
  isMentor: boolean;
  specialization?: string;
  bio?: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastSyncedAt?: string;
}

export interface ModuleProgress {
  id: string; // `${userId}_${learningPathId}_${moduleId}`
  userId: string;
  learningPathId: string;
  moduleId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  completedAt?: string;
  lastAccessedAt: string;
  syncStatus: SyncStatus;
}

export interface FavoriteItem {
  id: string; // `${userId}_${itemType}_${itemId}`
  userId: string;
  itemType: 'doenca' | 'medicamento' | 'protocolo' | 'rastreamento' | 'case' | 'post';
  itemId: string;
  createdAt: string;
  syncStatus: SyncStatus;
}

export interface UserNote {
  id: string; // `${userId}_${itemType}_${itemId}`
  userId: string;
  itemType: 'doenca' | 'medicamento' | 'protocolo' | 'rastreamento' | 'case';
  itemId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
}

export interface SyncOperation {
  id: string;
  userId: string;
  operation: 'create' | 'update' | 'delete';
  store: string;
  recordId: string;
  payload: Record<string, unknown>;
  createdAt: string;
  attempts: number;
  lastAttempt?: string;
  error?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export interface CachedCase {
  id: string;
  authorId: string;
  presentation: string;
  ageRange: string;
  diagnosisCodes: string[];
  status: 'draft' | 'pending_review' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  cachedAt: string;
}

export interface CachedForumPost {
  id: string;
  authorId: string;
  category: string;
  locale: string;
  title: string;
  content: string;
  isCase: boolean;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
  cachedAt: string;
}

export interface AuthTokens {
  id: string; // 'current'
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  offlineValidUntil: string; // 7 days from last online auth
  userId: string;
  encryptedAt: string;
}

export interface OfflineData {
  id: string;
  key: string;
  value: unknown;
  expiresAt?: string;
  updatedAt: string;
}

export type SyncStatus = 'synced' | 'pending' | 'conflict' | 'error';

// =============================================================================
// INDEX DEFINITIONS
// =============================================================================

export interface StoreIndex {
  name: string;
  keyPath: string | string[];
  options?: IDBIndexParameters;
}

export interface StoreDefinition {
  name: string;
  keyPath: string;
  autoIncrement?: boolean;
  indexes: StoreIndex[];
}

export const STORE_DEFINITIONS: StoreDefinition[] = [
  {
    name: STORES.USER_PROFILE,
    keyPath: 'id',
    indexes: [
      { name: 'username', keyPath: 'username', options: { unique: true } },
      { name: 'email', keyPath: 'email', options: { unique: false } },
    ],
  },
  {
    name: STORES.PROGRESS,
    keyPath: 'id',
    indexes: [
      { name: 'userId', keyPath: 'userId' },
      { name: 'learningPathId', keyPath: 'learningPathId' },
      { name: 'status', keyPath: 'status' },
      { name: 'syncStatus', keyPath: 'syncStatus' },
      { name: 'userId_learningPathId', keyPath: ['userId', 'learningPathId'] },
    ],
  },
  {
    name: STORES.FAVORITES,
    keyPath: 'id',
    indexes: [
      { name: 'userId', keyPath: 'userId' },
      { name: 'itemType', keyPath: 'itemType' },
      { name: 'syncStatus', keyPath: 'syncStatus' },
      { name: 'userId_itemType', keyPath: ['userId', 'itemType'] },
    ],
  },
  {
    name: STORES.NOTES,
    keyPath: 'id',
    indexes: [
      { name: 'userId', keyPath: 'userId' },
      { name: 'itemType', keyPath: 'itemType' },
      { name: 'syncStatus', keyPath: 'syncStatus' },
      { name: 'updatedAt', keyPath: 'updatedAt' },
    ],
  },
  {
    name: STORES.SYNC_QUEUE,
    keyPath: 'id',
    indexes: [
      { name: 'userId', keyPath: 'userId' },
      { name: 'status', keyPath: 'status' },
      { name: 'createdAt', keyPath: 'createdAt' },
      { name: 'store', keyPath: 'store' },
    ],
  },
  {
    name: STORES.CACHED_CASES,
    keyPath: 'id',
    indexes: [
      { name: 'authorId', keyPath: 'authorId' },
      { name: 'status', keyPath: 'status' },
      { name: 'cachedAt', keyPath: 'cachedAt' },
    ],
  },
  {
    name: STORES.CACHED_FORUM_POSTS,
    keyPath: 'id',
    indexes: [
      { name: 'category', keyPath: 'category' },
      { name: 'locale', keyPath: 'locale' },
      { name: 'cachedAt', keyPath: 'cachedAt' },
      { name: 'category_locale', keyPath: ['category', 'locale'] },
    ],
  },
  {
    name: STORES.AUTH_TOKENS,
    keyPath: 'id',
    indexes: [
      { name: 'userId', keyPath: 'userId' },
      { name: 'expiresAt', keyPath: 'expiresAt' },
    ],
  },
  {
    name: STORES.OFFLINE_DATA,
    keyPath: 'id',
    indexes: [
      { name: 'key', keyPath: 'key', options: { unique: true } },
      { name: 'expiresAt', keyPath: 'expiresAt' },
    ],
  },
];

// =============================================================================
// MIGRATION HELPERS
// =============================================================================

export interface Migration {
  version: number;
  migrate: (db: IDBDatabase, transaction: IDBTransaction) => void;
}

export const MIGRATIONS: Migration[] = [
  {
    version: 1,
    migrate: (db) => {
      // Initial schema creation
      STORE_DEFINITIONS.forEach((storeDef) => {
        if (!db.objectStoreNames.contains(storeDef.name)) {
          const store = db.createObjectStore(storeDef.name, {
            keyPath: storeDef.keyPath,
            autoIncrement: storeDef.autoIncrement,
          });

          storeDef.indexes.forEach((index) => {
            store.createIndex(index.name, index.keyPath, index.options);
          });
        }
      });
    },
  },
  // Future migrations will be added here
  // {
  //   version: 2,
  //   migrate: (db, transaction) => {
  //     // Add new store or modify existing
  //   },
  // },
];
