/**
 * CACHING LAYER FOR FETCHERS
 * ===========================
 * 
 * In-memory cache with TTL (Time To Live) for fetcher results.
 * Reduces API calls and improves performance.
 */

import type { FetchQuery, FetchResult } from '../types';

/**
 * Cache entry with expiration
 */
interface CacheEntry {
  result: FetchResult;
  expiresAt: number; // Unix timestamp in milliseconds
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum number of entries
}

/**
 * Default cache configuration
 */
const DEFAULT_CONFIG: CacheConfig = {
  ttl: 3600000, // 1 hour
  maxSize: 1000, // 1000 entries
};

/**
 * In-memory cache for fetcher results
 */
export class FetcherCache {
  private cache = new Map<string, CacheEntry>();
  private config: CacheConfig;
  
  // Metrics
  private hits = 0;
  private misses = 0;
  private evictions = 0;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Generate cache key from query
   */
  private getCacheKey(fetcherName: string, query: FetchQuery): string {
    const parts = [
      fetcherName,
      query.topic,
      query.diseaseCode || '',
      query.medicationCode || '',
      JSON.stringify(query.filters || {}),
    ];
    return parts.join('::');
  }

  /**
   * Check if entry is expired
   */
  private isExpired(entry: CacheEntry): boolean {
    return Date.now() > entry.expiresAt;
  }

  /**
   * Evict oldest entries if cache is full
   */
  private evictIfNeeded(): void {
    if (this.cache.size >= this.config.maxSize) {
      // Simple LRU: delete first entry (oldest)
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
        this.evictions++;
      }
    }
  }

  /**
   * Get cached result
   */
  get(fetcherName: string, query: FetchQuery): FetchResult | null {
    const key = this.getCacheKey(fetcherName, query);
    const entry = this.cache.get(key);

    if (!entry) {
      this.misses++;
      return null;
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    this.hits++;
    return entry.result;
  }

  /**
   * Set cached result
   */
  set(fetcherName: string, query: FetchQuery, result: FetchResult): void {
    this.evictIfNeeded();
    
    const key = this.getCacheKey(fetcherName, query);
    const entry: CacheEntry = {
      result,
      expiresAt: Date.now() + this.config.ttl,
    };
    
    this.cache.set(key, entry);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
  }

  /**
   * Clear expired entries
   */
  clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache metrics
   */
  getMetrics() {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      evictions: this.evictions,
      size: this.cache.size,
      hitRate: total > 0 ? this.hits / total : 0,
      missRate: total > 0 ? this.misses / total : 0,
    };
  }
}

/**
 * Global cache instance
 */
export const globalCache = new FetcherCache();

/**
 * Cached Fetcher Wrapper
 * =======================
 *
 * Wraps any fetcher with caching capability.
 * Uses Decorator pattern.
 */

import type { Fetcher } from '../types';

export class CachedFetcher implements Fetcher {
  name: string;
  source: Fetcher['source'];
  priority: number;

  private baseFetcher: Fetcher;
  private cache: FetcherCache;

  constructor(baseFetcher: Fetcher, cache: FetcherCache = globalCache) {
    this.baseFetcher = baseFetcher;
    this.cache = cache;
    this.name = `${baseFetcher.name} (Cached)`;
    this.source = baseFetcher.source;
    this.priority = baseFetcher.priority;
  }

  async isAvailable(): Promise<boolean> {
    return this.baseFetcher.isAvailable();
  }

  async fetch(query: FetchQuery): Promise<FetchResult> {
    // Try cache first
    const cached = this.cache.get(this.baseFetcher.name, query);
    if (cached) {
      return cached;
    }

    // Cache miss - fetch from source
    const result = await this.baseFetcher.fetch(query);

    // Store in cache
    this.cache.set(this.baseFetcher.name, query, result);

    return result;
  }
}

/**
 * Helper function to wrap fetcher with cache
 */
export function withCache(fetcher: Fetcher, cache?: FetcherCache): CachedFetcher {
  return new CachedFetcher(fetcher, cache);
}

