/**
 * DARWIN-MFC IndexedDB Storage Utilities
 * ======================================
 *
 * Provides a robust local storage API for study data using IndexedDB
 * with graceful fallback to localStorage when IndexedDB is unavailable.
 *
 * Database: darwin-study-db
 * Version: 1
 *
 * Object Stores:
 * - cards: Study flashcards with spaced repetition data
 * - sessions: Study session records
 * - quizHistory: Quiz attempt results
 * - preferences: User preferences key-value store
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface StudyCard {
  id: string;
  front: string;
  back: string;
  type: 'flashcard' | 'clinical_case' | 'medication' | 'protocol';
  category: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  sourceId?: string;
  // Spaced repetition fields (SM-2 algorithm)
  easeFactor: number; // Default 2.5
  interval: number; // Days until next review
  repetitions: number;
  nextReviewDate: string; // ISO date string
  lastReviewDate?: string;
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface StudySession {
  id: string;
  date: string; // ISO date string
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  cardsReviewed: number;
  cardsCorrect: number;
  cardsIncorrect: number;
  cardIds: string[];
  type: 'flashcard' | 'quiz' | 'mixed';
  notes?: string;
}

export interface QuizResult {
  id: string;
  quizId: string;
  date: string; // ISO date string
  score: number; // 0-100
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeSpentSeconds: number;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOption: string | string[];
  isCorrect: boolean;
  timeSpentSeconds?: number;
}

export interface UserPreferences {
  key: string;
  value: unknown;
  updatedAt: string;
}

export interface StudyDatabase {
  cards: StudyCard[];
  sessions: StudySession[];
  quizHistory: QuizResult[];
  userPreferences: UserPreferences[];
}

// =============================================================================
// ERROR TYPES
// =============================================================================

export class StorageError extends Error {
  constructor(
    message: string,
    public readonly code: StorageErrorCode,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

export type StorageErrorCode =
  | 'INIT_FAILED'
  | 'NOT_SUPPORTED'
  | 'TRANSACTION_FAILED'
  | 'NOT_FOUND'
  | 'INVALID_DATA'
  | 'QUOTA_EXCEEDED'
  | 'VERSION_MISMATCH'
  | 'FALLBACK_FAILED';

// =============================================================================
// CONSTANTS
// =============================================================================

const DB_NAME = 'darwin-study-db';
const DB_VERSION = 1;
const FALLBACK_STORAGE_KEY = 'darwin-study-fallback';

const STORE_NAMES = {
  CARDS: 'cards',
  SESSIONS: 'sessions',
  QUIZ_HISTORY: 'quizHistory',
  PREFERENCES: 'preferences',
} as const;

// =============================================================================
// SSR SAFETY UTILITIES
// =============================================================================

function isIndexedDBAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof indexedDB === 'undefined') return false;
  // Test if IndexedDB is actually functional (some browsers block it in private mode)
  try {
    // Quick sanity check - this doesn't actually open a database
    indexedDB.open('__test__').onupgradeneeded = (e) => {
      (e.target as IDBOpenDBRequest).result.close();
      indexedDB.deleteDatabase('__test__');
    };
    return true;
  } catch {
    return false;
  }
}

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// =============================================================================
// FALLBACK STORAGE (localStorage)
// =============================================================================

class FallbackStorage {
  private getAll(): StudyDatabase {
    if (!isLocalStorageAvailable()) {
      return { cards: [], sessions: [], quizHistory: [], userPreferences: [] };
    }
    try {
      const data = localStorage.getItem(FALLBACK_STORAGE_KEY);
      if (!data) {
        return { cards: [], sessions: [], quizHistory: [], userPreferences: [] };
      }
      return JSON.parse(data);
    } catch {
      return { cards: [], sessions: [], quizHistory: [], userPreferences: [] };
    }
  }

  private saveAll(data: StudyDatabase): void {
    if (!isLocalStorageAvailable()) {
      throw new StorageError('localStorage not available', 'FALLBACK_FAILED');
    }
    try {
      localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        throw new StorageError('Storage quota exceeded', 'QUOTA_EXCEEDED', e);
      }
      throw new StorageError('Failed to save to localStorage', 'FALLBACK_FAILED', e);
    }
  }

  async saveCard(card: StudyCard): Promise<void> {
    const data = this.getAll();
    const index = data.cards.findIndex((c) => c.id === card.id);
    if (index >= 0) {
      data.cards[index] = card;
    } else {
      data.cards.push(card);
    }
    this.saveAll(data);
  }

  async getCards(): Promise<StudyCard[]> {
    return this.getAll().cards;
  }

  async getCardById(id: string): Promise<StudyCard | undefined> {
    return this.getAll().cards.find((c) => c.id === id);
  }

  async deleteCard(id: string): Promise<void> {
    const data = this.getAll();
    data.cards = data.cards.filter((c) => c.id !== id);
    this.saveAll(data);
  }

  async getDueCards(date?: Date): Promise<StudyCard[]> {
    const targetDate = date || new Date();
    const dateStr = targetDate.toISOString().split('T')[0];
    return this.getAll().cards.filter((c) => c.nextReviewDate <= dateStr);
  }

  async saveSession(session: StudySession): Promise<void> {
    const data = this.getAll();
    const index = data.sessions.findIndex((s) => s.id === session.id);
    if (index >= 0) {
      data.sessions[index] = session;
    } else {
      data.sessions.push(session);
    }
    this.saveAll(data);
  }

  async getSessions(limit?: number): Promise<StudySession[]> {
    const sessions = this.getAll().sessions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return limit ? sessions.slice(0, limit) : sessions;
  }

  async saveQuizResult(result: QuizResult): Promise<void> {
    const data = this.getAll();
    const index = data.quizHistory.findIndex((r) => r.id === result.id);
    if (index >= 0) {
      data.quizHistory[index] = result;
    } else {
      data.quizHistory.push(result);
    }
    this.saveAll(data);
  }

  async getQuizHistory(limit?: number): Promise<QuizResult[]> {
    const history = this.getAll().quizHistory.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return limit ? history.slice(0, limit) : history;
  }

  async savePreference(key: string, value: unknown): Promise<void> {
    const data = this.getAll();
    const index = data.userPreferences.findIndex((p) => p.key === key);
    const pref: UserPreferences = {
      key,
      value,
      updatedAt: new Date().toISOString(),
    };
    if (index >= 0) {
      data.userPreferences[index] = pref;
    } else {
      data.userPreferences.push(pref);
    }
    this.saveAll(data);
  }

  async getPreference<T = unknown>(key: string): Promise<T | undefined> {
    const pref = this.getAll().userPreferences.find((p) => p.key === key);
    return pref?.value as T | undefined;
  }

  async clearAll(): Promise<void> {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem(FALLBACK_STORAGE_KEY);
    }
  }

  async exportData(): Promise<string> {
    return JSON.stringify(this.getAll(), null, 2);
  }

  async importData(json: string): Promise<void> {
    try {
      const data = JSON.parse(json) as StudyDatabase;
      // Validate structure
      if (!data.cards || !data.sessions || !data.quizHistory || !data.userPreferences) {
        throw new StorageError('Invalid data structure', 'INVALID_DATA');
      }
      this.saveAll(data);
    } catch (e) {
      if (e instanceof StorageError) throw e;
      throw new StorageError('Failed to parse import data', 'INVALID_DATA', e);
    }
  }
}

// =============================================================================
// INDEXEDDB STORAGE
// =============================================================================

let dbInstance: IDBDatabase | null = null;
let dbInitPromise: Promise<IDBDatabase> | null = null;
const fallbackStorage = new FallbackStorage();
let usingFallback = false;

/**
 * Initialize the IndexedDB database
 * Creates object stores and indexes on first run
 */
export async function initDatabase(): Promise<IDBDatabase> {
  // Return cached instance if available
  if (dbInstance) {
    return dbInstance;
  }

  // Return pending initialization promise if already in progress
  if (dbInitPromise) {
    return dbInitPromise;
  }

  // Check if IndexedDB is available
  if (!isIndexedDBAvailable()) {
    usingFallback = true;
    throw new StorageError(
      'IndexedDB not available, using fallback storage',
      'NOT_SUPPORTED'
    );
  }

  dbInitPromise = new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        dbInitPromise = null;
        usingFallback = true;
        reject(
          new StorageError(
            'Failed to open database',
            'INIT_FAILED',
            request.error
          )
        );
      };

      request.onsuccess = () => {
        dbInstance = request.result;

        // Handle unexpected close
        dbInstance.onclose = () => {
          dbInstance = null;
          dbInitPromise = null;
        };

        // Handle version change from another tab
        dbInstance.onversionchange = () => {
          dbInstance?.close();
          dbInstance = null;
          dbInitPromise = null;
        };

        resolve(dbInstance);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const oldVersion = event.oldVersion;

        // Version 1: Initial schema
        if (oldVersion < 1) {
          // Cards store
          const cardsStore = db.createObjectStore(STORE_NAMES.CARDS, {
            keyPath: 'id',
          });
          cardsStore.createIndex('nextReviewDate', 'nextReviewDate', {
            unique: false,
          });
          cardsStore.createIndex('type', 'type', { unique: false });
          cardsStore.createIndex('category', 'category', { unique: false });

          // Sessions store
          const sessionsStore = db.createObjectStore(STORE_NAMES.SESSIONS, {
            keyPath: 'id',
          });
          sessionsStore.createIndex('date', 'date', { unique: false });

          // Quiz history store
          const quizStore = db.createObjectStore(STORE_NAMES.QUIZ_HISTORY, {
            keyPath: 'id',
          });
          quizStore.createIndex('date', 'date', { unique: false });
          quizStore.createIndex('score', 'score', { unique: false });
          quizStore.createIndex('quizId', 'quizId', { unique: false });

          // Preferences store
          db.createObjectStore(STORE_NAMES.PREFERENCES, {
            keyPath: 'key',
          });
        }

        // Future versions can add migrations here:
        // if (oldVersion < 2) { ... }
      };

      request.onblocked = () => {
        // Database is being used by another tab with an older version
        reject(
          new StorageError(
            'Database blocked by another tab',
            'VERSION_MISMATCH'
          )
        );
      };
    } catch (e) {
      dbInitPromise = null;
      usingFallback = true;
      reject(new StorageError('Failed to initialize database', 'INIT_FAILED', e));
    }
  });

  return dbInitPromise;
}

/**
 * Check if we're using fallback storage
 */
export function isUsingFallback(): boolean {
  return usingFallback;
}

/**
 * Get database instance, initializing if necessary
 */
async function getDB(): Promise<IDBDatabase> {
  if (usingFallback) {
    throw new StorageError('Using fallback storage', 'NOT_SUPPORTED');
  }
  return initDatabase();
}

/**
 * Execute a transaction with proper error handling
 */
async function withTransaction<T>(
  storeNames: string | string[],
  mode: IDBTransactionMode,
  callback: (stores: Record<string, IDBObjectStore>) => IDBRequest | IDBRequest[] | T
): Promise<T> {
  const db = await getDB();
  const names = Array.isArray(storeNames) ? storeNames : [storeNames];

  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction(names, mode);
      const stores: Record<string, IDBObjectStore> = {};

      for (const name of names) {
        stores[name] = transaction.objectStore(name);
      }

      const result = callback(stores);

      transaction.oncomplete = () => {
        // If result is an IDBRequest, we need to get its result
        if (result instanceof IDBRequest) {
          resolve(result.result as T);
        } else if (Array.isArray(result) && result[0] instanceof IDBRequest) {
          resolve(result.map((r) => (r as IDBRequest).result) as T);
        } else {
          resolve(result as T);
        }
      };

      transaction.onerror = () => {
        reject(
          new StorageError(
            'Transaction failed',
            'TRANSACTION_FAILED',
            transaction.error
          )
        );
      };

      transaction.onabort = () => {
        reject(
          new StorageError(
            'Transaction aborted',
            'TRANSACTION_FAILED',
            transaction.error
          )
        );
      };
    } catch (e) {
      reject(new StorageError('Failed to create transaction', 'TRANSACTION_FAILED', e));
    }
  });
}

/**
 * Helper to promisify IDBRequest
 */
function promisifyRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(new StorageError('Request failed', 'TRANSACTION_FAILED', request.error));
  });
}

// =============================================================================
// CARD OPERATIONS
// =============================================================================

/**
 * Save a study card (creates or updates)
 */
export async function saveStudyCard(card: StudyCard): Promise<void> {
  if (usingFallback) {
    return fallbackStorage.saveCard(card);
  }

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.CARDS, 'readwrite');
      const store = transaction.objectStore(STORE_NAMES.CARDS);

      const request = store.put({
        ...card,
        updatedAt: new Date().toISOString(),
      });

      request.onerror = () =>
        reject(new StorageError('Failed to save card', 'TRANSACTION_FAILED', request.error));
      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(new StorageError('Transaction failed', 'TRANSACTION_FAILED', transaction.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.saveCard(card);
    }
    throw e;
  }
}

/**
 * Save multiple cards in a single transaction
 */
export async function saveStudyCards(cards: StudyCard[]): Promise<void> {
  if (usingFallback) {
    for (const card of cards) {
      await fallbackStorage.saveCard(card);
    }
    return;
  }

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.CARDS, 'readwrite');
      const store = transaction.objectStore(STORE_NAMES.CARDS);
      const now = new Date().toISOString();

      for (const card of cards) {
        store.put({ ...card, updatedAt: now });
      }

      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(new StorageError('Transaction failed', 'TRANSACTION_FAILED', transaction.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      for (const card of cards) {
        await fallbackStorage.saveCard(card);
      }
      return;
    }
    throw e;
  }
}

/**
 * Get all study cards
 */
export async function getStudyCards(): Promise<StudyCard[]> {
  if (usingFallback) {
    return fallbackStorage.getCards();
  }

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.CARDS, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.CARDS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () =>
        reject(new StorageError('Failed to get cards', 'TRANSACTION_FAILED', request.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.getCards();
    }
    throw e;
  }
}

/**
 * Get a single study card by ID
 */
export async function getStudyCardById(id: string): Promise<StudyCard | undefined> {
  if (usingFallback) {
    return fallbackStorage.getCardById(id);
  }

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.CARDS, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.CARDS);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || undefined);
      request.onerror = () =>
        reject(new StorageError('Failed to get card', 'TRANSACTION_FAILED', request.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.getCardById(id);
    }
    throw e;
  }
}

/**
 * Delete a study card
 */
export async function deleteStudyCard(id: string): Promise<void> {
  if (usingFallback) {
    return fallbackStorage.deleteCard(id);
  }

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.CARDS, 'readwrite');
      const store = transaction.objectStore(STORE_NAMES.CARDS);
      const request = store.delete(id);

      request.onerror = () =>
        reject(new StorageError('Failed to delete card', 'TRANSACTION_FAILED', request.error));
      transaction.oncomplete = () => resolve();
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.deleteCard(id);
    }
    throw e;
  }
}

/**
 * Get cards that are due for review
 */
export async function getDueCards(date?: Date): Promise<StudyCard[]> {
  if (usingFallback) {
    return fallbackStorage.getDueCards(date);
  }

  try {
    const targetDate = date || new Date();
    const dateStr = targetDate.toISOString().split('T')[0];
    const db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.CARDS, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.CARDS);
      const index = store.index('nextReviewDate');

      // Get all cards with nextReviewDate <= targetDate
      const range = IDBKeyRange.upperBound(dateStr + 'T23:59:59.999Z');
      const request = index.getAll(range);

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () =>
        reject(new StorageError('Failed to get due cards', 'TRANSACTION_FAILED', request.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.getDueCards(date);
    }
    throw e;
  }
}

/**
 * Get cards by type
 */
export async function getCardsByType(type: StudyCard['type']): Promise<StudyCard[]> {
  if (usingFallback) {
    const cards = await fallbackStorage.getCards();
    return cards.filter((c) => c.type === type);
  }

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.CARDS, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.CARDS);
      const index = store.index('type');
      const request = index.getAll(type);

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () =>
        reject(new StorageError('Failed to get cards by type', 'TRANSACTION_FAILED', request.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      const cards = await fallbackStorage.getCards();
      return cards.filter((c) => c.type === type);
    }
    throw e;
  }
}

// =============================================================================
// SESSION OPERATIONS
// =============================================================================

/**
 * Save a study session
 */
export async function saveSession(session: StudySession): Promise<void> {
  if (usingFallback) {
    return fallbackStorage.saveSession(session);
  }

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.SESSIONS, 'readwrite');
      const store = transaction.objectStore(STORE_NAMES.SESSIONS);
      const request = store.put(session);

      request.onerror = () =>
        reject(new StorageError('Failed to save session', 'TRANSACTION_FAILED', request.error));
      transaction.oncomplete = () => resolve();
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.saveSession(session);
    }
    throw e;
  }
}

/**
 * Get study sessions, optionally limited
 */
export async function getSessions(limit?: number): Promise<StudySession[]> {
  if (usingFallback) {
    return fallbackStorage.getSessions(limit);
  }

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.SESSIONS, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.SESSIONS);
      const index = store.index('date');

      // Open cursor in reverse order (newest first)
      const request = index.openCursor(null, 'prev');
      const results: StudySession[] = [];
      let count = 0;

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor && (!limit || count < limit)) {
          results.push(cursor.value);
          count++;
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () =>
        reject(new StorageError('Failed to get sessions', 'TRANSACTION_FAILED', request.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.getSessions(limit);
    }
    throw e;
  }
}

/**
 * Get sessions within a date range
 */
export async function getSessionsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<StudySession[]> {
  if (usingFallback) {
    const sessions = await fallbackStorage.getSessions();
    return sessions.filter((s) => {
      const date = new Date(s.date);
      return date >= startDate && date <= endDate;
    });
  }

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.SESSIONS, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.SESSIONS);
      const index = store.index('date');

      const range = IDBKeyRange.bound(
        startDate.toISOString(),
        endDate.toISOString()
      );
      const request = index.getAll(range);

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () =>
        reject(new StorageError('Failed to get sessions', 'TRANSACTION_FAILED', request.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      const sessions = await fallbackStorage.getSessions();
      return sessions.filter((s) => {
        const date = new Date(s.date);
        return date >= startDate && date <= endDate;
      });
    }
    throw e;
  }
}

// =============================================================================
// QUIZ HISTORY OPERATIONS
// =============================================================================

/**
 * Save a quiz result
 */
export async function saveQuizResult(result: QuizResult): Promise<void> {
  if (usingFallback) {
    return fallbackStorage.saveQuizResult(result);
  }

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.QUIZ_HISTORY, 'readwrite');
      const store = transaction.objectStore(STORE_NAMES.QUIZ_HISTORY);
      const request = store.put(result);

      request.onerror = () =>
        reject(new StorageError('Failed to save quiz result', 'TRANSACTION_FAILED', request.error));
      transaction.oncomplete = () => resolve();
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.saveQuizResult(result);
    }
    throw e;
  }
}

/**
 * Get quiz history, optionally limited
 */
export async function getQuizHistory(limit?: number): Promise<QuizResult[]> {
  if (usingFallback) {
    return fallbackStorage.getQuizHistory(limit);
  }

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.QUIZ_HISTORY, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.QUIZ_HISTORY);
      const index = store.index('date');

      // Open cursor in reverse order (newest first)
      const request = index.openCursor(null, 'prev');
      const results: QuizResult[] = [];
      let count = 0;

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor && (!limit || count < limit)) {
          results.push(cursor.value);
          count++;
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () =>
        reject(new StorageError('Failed to get quiz history', 'TRANSACTION_FAILED', request.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.getQuizHistory(limit);
    }
    throw e;
  }
}

/**
 * Get quiz history for a specific quiz
 */
export async function getQuizHistoryByQuizId(quizId: string): Promise<QuizResult[]> {
  if (usingFallback) {
    const history = await fallbackStorage.getQuizHistory();
    return history.filter((r) => r.quizId === quizId);
  }

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.QUIZ_HISTORY, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.QUIZ_HISTORY);
      const index = store.index('quizId');
      const request = index.getAll(quizId);

      request.onsuccess = () => {
        const results = request.result || [];
        // Sort by date descending
        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        resolve(results);
      };
      request.onerror = () =>
        reject(new StorageError('Failed to get quiz history', 'TRANSACTION_FAILED', request.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      const history = await fallbackStorage.getQuizHistory();
      return history.filter((r) => r.quizId === quizId);
    }
    throw e;
  }
}

// =============================================================================
// PREFERENCES OPERATIONS
// =============================================================================

/**
 * Save a user preference
 */
export async function savePreference(key: string, value: unknown): Promise<void> {
  if (usingFallback) {
    return fallbackStorage.savePreference(key, value);
  }

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.PREFERENCES, 'readwrite');
      const store = transaction.objectStore(STORE_NAMES.PREFERENCES);
      const request = store.put({
        key,
        value,
        updatedAt: new Date().toISOString(),
      });

      request.onerror = () =>
        reject(new StorageError('Failed to save preference', 'TRANSACTION_FAILED', request.error));
      transaction.oncomplete = () => resolve();
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.savePreference(key, value);
    }
    throw e;
  }
}

/**
 * Get a user preference
 */
export async function getPreference<T = unknown>(key: string): Promise<T | undefined> {
  if (usingFallback) {
    return fallbackStorage.getPreference<T>(key);
  }

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.PREFERENCES, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.PREFERENCES);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? (result.value as T) : undefined);
      };
      request.onerror = () =>
        reject(new StorageError('Failed to get preference', 'TRANSACTION_FAILED', request.error));
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.getPreference<T>(key);
    }
    throw e;
  }
}

/**
 * Delete a user preference
 */
export async function deletePreference(key: string): Promise<void> {
  if (usingFallback) {
    // For fallback, we can save undefined to effectively delete
    return fallbackStorage.savePreference(key, undefined);
  }

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.PREFERENCES, 'readwrite');
      const store = transaction.objectStore(STORE_NAMES.PREFERENCES);
      const request = store.delete(key);

      request.onerror = () =>
        reject(new StorageError('Failed to delete preference', 'TRANSACTION_FAILED', request.error));
      transaction.oncomplete = () => resolve();
    });
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.savePreference(key, undefined);
    }
    throw e;
  }
}

// =============================================================================
// DATA MANAGEMENT
// =============================================================================

/**
 * Clear all data from all stores
 */
export async function clearAllData(): Promise<void> {
  if (usingFallback) {
    return fallbackStorage.clearAll();
  }

  try {
    const db = await getDB();
    await Promise.all(
      Object.values(STORE_NAMES).map(
        (storeName) =>
          new Promise<void>((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onerror = () =>
              reject(new StorageError('Failed to clear store', 'TRANSACTION_FAILED', request.error));
            transaction.oncomplete = () => resolve();
          })
      )
    );
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.clearAll();
    }
    throw e;
  }
}

/**
 * Export all data as JSON string
 */
export async function exportData(): Promise<string> {
  if (usingFallback) {
    return fallbackStorage.exportData();
  }

  try {
    const [cards, sessions, quizHistory] = await Promise.all([
      getStudyCards(),
      getSessions(),
      getQuizHistory(),
    ]);

    // Get all preferences
    const db = await getDB();
    const userPreferences = await new Promise<UserPreferences[]>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAMES.PREFERENCES, 'readonly');
      const store = transaction.objectStore(STORE_NAMES.PREFERENCES);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () =>
        reject(new StorageError('Failed to export preferences', 'TRANSACTION_FAILED', request.error));
    });

    const data: StudyDatabase = {
      cards,
      sessions,
      quizHistory,
      userPreferences,
    };

    return JSON.stringify(data, null, 2);
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.exportData();
    }
    throw e;
  }
}

/**
 * Import data from JSON string
 */
export async function importData(json: string): Promise<void> {
  if (usingFallback) {
    return fallbackStorage.importData(json);
  }

  let data: StudyDatabase;
  try {
    data = JSON.parse(json);
  } catch (e) {
    throw new StorageError('Invalid JSON', 'INVALID_DATA', e);
  }

  // Validate structure
  if (
    !data ||
    !Array.isArray(data.cards) ||
    !Array.isArray(data.sessions) ||
    !Array.isArray(data.quizHistory) ||
    !Array.isArray(data.userPreferences)
  ) {
    throw new StorageError('Invalid data structure', 'INVALID_DATA');
  }

  try {
    const db = await getDB();

    // Clear existing data first
    await clearAllData();

    // Import cards
    if (data.cards.length > 0) {
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAMES.CARDS, 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.CARDS);
        for (const card of data.cards) {
          store.put(card);
        }
        transaction.oncomplete = () => resolve();
        transaction.onerror = () =>
          reject(new StorageError('Failed to import cards', 'TRANSACTION_FAILED', transaction.error));
      });
    }

    // Import sessions
    if (data.sessions.length > 0) {
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAMES.SESSIONS, 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.SESSIONS);
        for (const session of data.sessions) {
          store.put(session);
        }
        transaction.oncomplete = () => resolve();
        transaction.onerror = () =>
          reject(new StorageError('Failed to import sessions', 'TRANSACTION_FAILED', transaction.error));
      });
    }

    // Import quiz history
    if (data.quizHistory.length > 0) {
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAMES.QUIZ_HISTORY, 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.QUIZ_HISTORY);
        for (const result of data.quizHistory) {
          store.put(result);
        }
        transaction.oncomplete = () => resolve();
        transaction.onerror = () =>
          reject(new StorageError('Failed to import quiz history', 'TRANSACTION_FAILED', transaction.error));
      });
    }

    // Import preferences
    if (data.userPreferences.length > 0) {
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAMES.PREFERENCES, 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.PREFERENCES);
        for (const pref of data.userPreferences) {
          store.put(pref);
        }
        transaction.oncomplete = () => resolve();
        transaction.onerror = () =>
          reject(new StorageError('Failed to import preferences', 'TRANSACTION_FAILED', transaction.error));
      });
    }
  } catch (e) {
    if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
      usingFallback = true;
      return fallbackStorage.importData(json);
    }
    throw e;
  }
}

/**
 * Get storage statistics
 */
export async function getStorageStats(): Promise<{
  cardCount: number;
  sessionCount: number;
  quizCount: number;
  dueCardCount: number;
  isUsingFallback: boolean;
  estimatedSize?: number;
}> {
  const cards = await getStudyCards();
  const sessions = await getSessions();
  const quizHistory = await getQuizHistory();
  const dueCards = await getDueCards();

  let estimatedSize: number | undefined;

  // Try to estimate storage size
  if (!usingFallback && typeof navigator !== 'undefined' && 'storage' in navigator) {
    try {
      const estimate = await navigator.storage.estimate();
      estimatedSize = estimate.usage;
    } catch {
      // Storage estimation not available
    }
  }

  return {
    cardCount: cards.length,
    sessionCount: sessions.length,
    quizCount: quizHistory.length,
    dueCardCount: dueCards.length,
    isUsingFallback: usingFallback,
    estimatedSize,
  };
}

/**
 * Close the database connection
 */
export function closeDatabase(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
    dbInitPromise = null;
  }
}

/**
 * Reset the storage module (useful for testing)
 */
export function resetStorage(): void {
  closeDatabase();
  usingFallback = false;
}
