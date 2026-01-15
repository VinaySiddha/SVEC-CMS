// API Response Caching Strategy
// Implements Redis-like caching for API endpoints using in-memory storage

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class APICacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Start cleanup of expired cache every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Get cached data if valid
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set cache data with TTL
   */
  set<T>(key: string, data: T, ttl: number = 24 * 60 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Clear specific cache or all
   */
  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => this.cache.delete(key));
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  /**
   * Destroy cache manager
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.cache.clear();
  }
}

export const apiCache = new APICacheManager();

// Cache key constants
export const CACHE_KEYS = {
  FACULTY: 'cache:faculty',
  TECHNICAL_FACULTY: 'cache:technical_faculty',
  STAFF: 'cache:staff',
  HANDBOOKS: 'cache:handbooks',
  WORKSHOPS: 'cache:workshops',
  ACADEMIC_TOPPERS: 'cache:academic_toppers',
  DEPARTMENT_OVERVIEW: 'cache:department_overview',
  BOS_MEMBERS: 'cache:bos_members',
  BOS_MINUTES: 'cache:bos_minutes',
  HACKATHONS: 'cache:hackathons',
  HACKATHONS_GALLERY: 'cache:hackathons_gallery',
  TECHNICAL_ASSOCIATION_GALLERY: 'cache:technical_association_gallery',
  EXTRA_CURRICULAR_GALLERY: 'cache:extra_curricular_gallery',
  PLACEMENTS: 'cache:placements',
};

// Default cache TTL: 24 hours
export const DEFAULT_CACHE_TTL = 24 * 60 * 60 * 1000;

// Short cache TTL for frequently updated data: 1 hour
export const SHORT_CACHE_TTL = 60 * 60 * 1000;
