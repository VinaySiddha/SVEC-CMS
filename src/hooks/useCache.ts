import { useEffect, useState } from 'react';

interface CacheConfig {
  key: string;
  ttl?: number; // Time to live in milliseconds (default: 24 hours)
}

const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours

export const useCache = <T>(
  fetchFn: () => Promise<T>,
  config: CacheConfig
): { data: T | null; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cache = localStorage.getItem(config.key);
    const ttl = config.ttl || DEFAULT_TTL;

    if (cache) {
      try {
        const { data: cachedData, timestamp } = JSON.parse(cache);
        const now = Date.now();

        // Check if cache is still valid
        if (now - timestamp < ttl) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn(`Failed to parse cache for ${config.key}:`, err);
      }
    }

    // Fetch fresh data if no valid cache
    fetchFn()
      .then((result) => {
        setData(result);
        // Store in cache with timestamp
        localStorage.setItem(
          config.key,
          JSON.stringify({
            data: result,
            timestamp: Date.now(),
          })
        );
      })
      .catch((err) => {
        setError(err);
        // On error, try to use stale cache as fallback
        if (cache) {
          try {
            const { data: staleCachedData } = JSON.parse(cache);
            setData(staleCachedData);
          } catch (e) {
            // Cache is completely invalid
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [config.key, config.ttl]);

  return { data, loading, error };
};

export const clearCache = (key?: string) => {
  if (key) {
    localStorage.removeItem(key);
  } else {
    // Clear all CMS cache items
    const keys = Object.keys(localStorage);
    keys.forEach((k) => {
      if (k.startsWith('cms_')) {
        localStorage.removeItem(k);
      }
    });
  }
};
