/**
 * DARWIN-MFC INDEXEDDB WRAPPER
 * ============================
 *
 * Lightweight IndexedDB wrapper for offline-first data persistence.
 * No external dependencies - pure browser API usage.
 *
 * Features:
 * - Promise-based API
 * - Automatic migrations
 * - Type-safe operations
 * - Transaction management
 * - Error handling with retry logic
 */

import {
  DB_NAME,
  DB_VERSION,
  STORES,
  STORE_DEFINITIONS,
  MIGRATIONS,
  type UserProfile,
  type ModuleProgress,
  type FavoriteItem,
  type UserNote,
  type SyncOperation,
  type CachedCase,
  type CachedForumPost,
  type AuthTokens,
  type OfflineData,
  type SyncStatus,
} from './schemas';

// =============================================================================
// DATABASE INSTANCE
// =============================================================================

let dbInstance: IDBDatabase | null = null;
let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Get or create database connection
 */
export async function getDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('[IDB] Failed to open database:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      dbInstance = request.result;

      // Handle connection close
      dbInstance.onclose = () => {
        dbInstance = null;
        dbPromise = null;
      };

      // Handle version change (another tab updated)
      dbInstance.onversionchange = () => {
        dbInstance?.close();
        dbInstance = null;
        dbPromise = null;
      };

      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      const transaction = request.transaction!;
      const oldVersion = event.oldVersion;

      console.log(`[IDB] Upgrading database from v${oldVersion} to v${DB_VERSION}`);

      // Run migrations
      MIGRATIONS.forEach((migration) => {
        if (migration.version > oldVersion) {
          console.log(`[IDB] Running migration to v${migration.version}`);
          migration.migrate(db, transaction);
        }
      });
    };

    request.onblocked = () => {
      console.warn('[IDB] Database blocked - close other tabs');
    };
  });

  return dbPromise;
}

/**
 * Close database connection
 */
export function closeDB(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
    dbPromise = null;
  }
}

/**
 * Delete entire database (use with caution)
 */
export async function deleteDB(): Promise<void> {
  closeDB();
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// =============================================================================
// GENERIC CRUD OPERATIONS
// =============================================================================

/**
 * Get a record by key
 */
export async function get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Get all records from a store
 */
export async function getAll<T>(storeName: string): Promise<T[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Get records by index
 */
export async function getByIndex<T>(
  storeName: string,
  indexName: string,
  value: IDBValidKey
): Promise<T[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.getAll(value);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Put (create or update) a record
 */
export async function put<T>(storeName: string, record: T): Promise<IDBValidKey> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(record);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Put multiple records in a single transaction
 */
export async function putBatch<T>(storeName: string, records: T[]): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    records.forEach((record) => store.put(record));

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

/**
 * Delete a record by key
 */
export async function remove(storeName: string, key: IDBValidKey): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Clear all records from a store
 */
export async function clear(storeName: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Count records in a store
 */
export async function count(storeName: string): Promise<number> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.count();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// =============================================================================
// USER PROFILE OPERATIONS
// =============================================================================

export const userProfileDB = {
  async get(userId: string): Promise<UserProfile | undefined> {
    return get<UserProfile>(STORES.USER_PROFILE, userId);
  },

  async save(profile: UserProfile): Promise<void> {
    await put(STORES.USER_PROFILE, {
      ...profile,
      updatedAt: new Date().toISOString(),
    });
  },

  async delete(userId: string): Promise<void> {
    await remove(STORES.USER_PROFILE, userId);
  },

  async getByUsername(username: string): Promise<UserProfile | undefined> {
    const results = await getByIndex<UserProfile>(STORES.USER_PROFILE, 'username', username);
    return results[0];
  },
};

// =============================================================================
// PROGRESS OPERATIONS
// =============================================================================

export const progressDB = {
  async get(id: string): Promise<ModuleProgress | undefined> {
    return get<ModuleProgress>(STORES.PROGRESS, id);
  },

  async getByUser(userId: string): Promise<ModuleProgress[]> {
    return getByIndex<ModuleProgress>(STORES.PROGRESS, 'userId', userId);
  },

  async getByLearningPath(userId: string, learningPathId: string): Promise<ModuleProgress[]> {
    return getByIndex<ModuleProgress>(
      STORES.PROGRESS,
      'userId_learningPathId',
      [userId, learningPathId]
    );
  },

  async save(progress: ModuleProgress): Promise<void> {
    await put(STORES.PROGRESS, {
      ...progress,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  async getPending(): Promise<ModuleProgress[]> {
    return getByIndex<ModuleProgress>(STORES.PROGRESS, 'syncStatus', 'pending');
  },

  async markSynced(id: string): Promise<void> {
    const record = await this.get(id);
    if (record) {
      await this.save({ ...record, syncStatus: 'synced' as SyncStatus });
    }
  },
};

// =============================================================================
// FAVORITES OPERATIONS
// =============================================================================

export const favoritesDB = {
  async get(id: string): Promise<FavoriteItem | undefined> {
    return get<FavoriteItem>(STORES.FAVORITES, id);
  },

  async getByUser(userId: string): Promise<FavoriteItem[]> {
    return getByIndex<FavoriteItem>(STORES.FAVORITES, 'userId', userId);
  },

  async getByType(userId: string, itemType: FavoriteItem['itemType']): Promise<FavoriteItem[]> {
    return getByIndex<FavoriteItem>(STORES.FAVORITES, 'userId_itemType', [userId, itemType]);
  },

  async add(userId: string, itemType: FavoriteItem['itemType'], itemId: string): Promise<void> {
    const id = `${userId}_${itemType}_${itemId}`;
    await put(STORES.FAVORITES, {
      id,
      userId,
      itemType,
      itemId,
      createdAt: new Date().toISOString(),
      syncStatus: 'pending' as SyncStatus,
    });
  },

  async remove(userId: string, itemType: FavoriteItem['itemType'], itemId: string): Promise<void> {
    const id = `${userId}_${itemType}_${itemId}`;
    await remove(STORES.FAVORITES, id);
  },

  async exists(userId: string, itemType: FavoriteItem['itemType'], itemId: string): Promise<boolean> {
    const id = `${userId}_${itemType}_${itemId}`;
    const record = await this.get(id);
    return !!record;
  },

  async getPending(): Promise<FavoriteItem[]> {
    return getByIndex<FavoriteItem>(STORES.FAVORITES, 'syncStatus', 'pending');
  },
};

// =============================================================================
// NOTES OPERATIONS
// =============================================================================

export const notesDB = {
  async get(id: string): Promise<UserNote | undefined> {
    return get<UserNote>(STORES.NOTES, id);
  },

  async getByUser(userId: string): Promise<UserNote[]> {
    return getByIndex<UserNote>(STORES.NOTES, 'userId', userId);
  },

  async save(
    userId: string,
    itemType: UserNote['itemType'],
    itemId: string,
    content: string
  ): Promise<void> {
    const id = `${userId}_${itemType}_${itemId}`;
    const existing = await this.get(id);
    const now = new Date().toISOString();

    await put(STORES.NOTES, {
      id,
      userId,
      itemType,
      itemId,
      content,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      syncStatus: 'pending' as SyncStatus,
    });
  },

  async delete(userId: string, itemType: UserNote['itemType'], itemId: string): Promise<void> {
    const id = `${userId}_${itemType}_${itemId}`;
    await remove(STORES.NOTES, id);
  },

  async getPending(): Promise<UserNote[]> {
    return getByIndex<UserNote>(STORES.NOTES, 'syncStatus', 'pending');
  },
};

// =============================================================================
// SYNC QUEUE OPERATIONS
// =============================================================================

export const syncQueueDB = {
  async add(operation: Omit<SyncOperation, 'id' | 'createdAt' | 'attempts' | 'status'>): Promise<void> {
    const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await put(STORES.SYNC_QUEUE, {
      ...operation,
      id,
      createdAt: new Date().toISOString(),
      attempts: 0,
      status: 'pending' as const,
    });
  },

  async getPending(): Promise<SyncOperation[]> {
    return getByIndex<SyncOperation>(STORES.SYNC_QUEUE, 'status', 'pending');
  },

  async getAll(): Promise<SyncOperation[]> {
    return getAll<SyncOperation>(STORES.SYNC_QUEUE);
  },

  async markInProgress(id: string): Promise<void> {
    const record = await get<SyncOperation>(STORES.SYNC_QUEUE, id);
    if (record) {
      await put(STORES.SYNC_QUEUE, {
        ...record,
        status: 'in_progress' as const,
        lastAttempt: new Date().toISOString(),
        attempts: record.attempts + 1,
      });
    }
  },

  async markCompleted(id: string): Promise<void> {
    await remove(STORES.SYNC_QUEUE, id);
  },

  async markFailed(id: string, error: string): Promise<void> {
    const record = await get<SyncOperation>(STORES.SYNC_QUEUE, id);
    if (record) {
      const status = record.attempts >= 3 ? 'failed' : 'pending';
      await put(STORES.SYNC_QUEUE, {
        ...record,
        status,
        error,
      });
    }
  },

  async clearCompleted(): Promise<void> {
    const completed = await getByIndex<SyncOperation>(STORES.SYNC_QUEUE, 'status', 'completed');
    for (const op of completed) {
      await remove(STORES.SYNC_QUEUE, op.id);
    }
  },

  async count(): Promise<number> {
    return count(STORES.SYNC_QUEUE);
  },
};

// =============================================================================
// AUTH TOKENS OPERATIONS
// =============================================================================

export const authTokensDB = {
  async get(): Promise<AuthTokens | undefined> {
    return get<AuthTokens>(STORES.AUTH_TOKENS, 'current');
  },

  async save(tokens: Omit<AuthTokens, 'id' | 'encryptedAt'>): Promise<void> {
    await put(STORES.AUTH_TOKENS, {
      ...tokens,
      id: 'current',
      encryptedAt: new Date().toISOString(),
    });
  },

  async clear(): Promise<void> {
    await clear(STORES.AUTH_TOKENS);
  },

  async isValid(): Promise<boolean> {
    const tokens = await this.get();
    if (!tokens) return false;

    const now = new Date();
    const offlineValidUntil = new Date(tokens.offlineValidUntil);

    return now < offlineValidUntil;
  },

  async isExpired(): Promise<boolean> {
    const tokens = await this.get();
    if (!tokens) return true;

    const now = new Date();
    const expiresAt = new Date(tokens.expiresAt);

    return now >= expiresAt;
  },
};

// =============================================================================
// CACHED CONTENT OPERATIONS
// =============================================================================

export const cachedCasesDB = {
  async get(id: string): Promise<CachedCase | undefined> {
    return get<CachedCase>(STORES.CACHED_CASES, id);
  },

  async getAll(): Promise<CachedCase[]> {
    return getAll<CachedCase>(STORES.CACHED_CASES);
  },

  async save(caseData: Omit<CachedCase, 'cachedAt'>): Promise<void> {
    await put(STORES.CACHED_CASES, {
      ...caseData,
      cachedAt: new Date().toISOString(),
    });
  },

  async saveBatch(cases: Array<Omit<CachedCase, 'cachedAt'>>): Promise<void> {
    const cachedAt = new Date().toISOString();
    await putBatch(
      STORES.CACHED_CASES,
      cases.map((c) => ({ ...c, cachedAt }))
    );
  },

  async delete(id: string): Promise<void> {
    await remove(STORES.CACHED_CASES, id);
  },

  async clear(): Promise<void> {
    await clear(STORES.CACHED_CASES);
  },
};

export const cachedForumPostsDB = {
  async get(id: string): Promise<CachedForumPost | undefined> {
    return get<CachedForumPost>(STORES.CACHED_FORUM_POSTS, id);
  },

  async getByCategory(category: string, locale: string): Promise<CachedForumPost[]> {
    return getByIndex<CachedForumPost>(
      STORES.CACHED_FORUM_POSTS,
      'category_locale',
      [category, locale]
    );
  },

  async save(post: Omit<CachedForumPost, 'cachedAt'>): Promise<void> {
    await put(STORES.CACHED_FORUM_POSTS, {
      ...post,
      cachedAt: new Date().toISOString(),
    });
  },

  async saveBatch(posts: Array<Omit<CachedForumPost, 'cachedAt'>>): Promise<void> {
    const cachedAt = new Date().toISOString();
    await putBatch(
      STORES.CACHED_FORUM_POSTS,
      posts.map((p) => ({ ...p, cachedAt }))
    );
  },

  async clear(): Promise<void> {
    await clear(STORES.CACHED_FORUM_POSTS);
  },
};

// =============================================================================
// OFFLINE DATA (KEY-VALUE STORE)
// =============================================================================

export const offlineDataDB = {
  async get<T>(key: string): Promise<T | undefined> {
    const results = await getByIndex<OfflineData>(STORES.OFFLINE_DATA, 'key', key);
    const record = results[0];

    if (!record) return undefined;

    // Check expiration
    if (record.expiresAt && new Date(record.expiresAt) < new Date()) {
      await this.delete(key);
      return undefined;
    }

    return record.value as T;
  },

  async set<T>(key: string, value: T, expiresInMs?: number): Promise<void> {
    const now = new Date();
    await put(STORES.OFFLINE_DATA, {
      id: key,
      key,
      value,
      expiresAt: expiresInMs ? new Date(now.getTime() + expiresInMs).toISOString() : undefined,
      updatedAt: now.toISOString(),
    });
  },

  async delete(key: string): Promise<void> {
    const results = await getByIndex<OfflineData>(STORES.OFFLINE_DATA, 'key', key);
    for (const record of results) {
      await remove(STORES.OFFLINE_DATA, record.id);
    }
  },

  async clearExpired(): Promise<void> {
    const all = await getAll<OfflineData>(STORES.OFFLINE_DATA);
    const now = new Date();
    for (const record of all) {
      if (record.expiresAt && new Date(record.expiresAt) < now) {
        await remove(STORES.OFFLINE_DATA, record.id);
      }
    }
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get database storage usage estimate
 */
export async function getStorageEstimate(): Promise<{
  usage: number;
  quota: number;
  percent: number;
}> {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      usage: estimate.usage || 0,
      quota: estimate.quota || 0,
      percent: estimate.quota ? (estimate.usage || 0) / estimate.quota * 100 : 0,
    };
  }
  return { usage: 0, quota: 0, percent: 0 };
}

/**
 * Check if IndexedDB is available
 */
export function isIndexedDBAvailable(): boolean {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null;
  } catch {
    return false;
  }
}

/**
 * Initialize database (call on app start)
 */
export async function initDB(): Promise<void> {
  if (!isIndexedDBAvailable()) {
    console.warn('[IDB] IndexedDB is not available');
    return;
  }

  try {
    await getDB();
    console.log('[IDB] Database initialized successfully');
  } catch (error) {
    console.error('[IDB] Failed to initialize database:', error);
  }
}

// Export stores constant for external reference
export { STORES };
