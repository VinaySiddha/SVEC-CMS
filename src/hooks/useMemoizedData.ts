import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  loading: boolean;
}

interface UseMemoizedDataOptions {
  cacheTime?: number; // Cache duration in milliseconds (default: 5 minutes)
  enabled?: boolean; // Whether to enable the query
  refetchOnWindowFocus?: boolean;
}

// Global cache to share data across components
const globalCache = new Map<string, CacheEntry<any>>();

/**
 * Optimized data fetching hook with memoization and caching
 * Prevents duplicate API calls and unnecessary re-renders
 */
export function useMemoizedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseMemoizedDataOptions = {}
) {
  const {
    cacheTime = 5 * 60 * 1000, // 5 minutes default
    enabled = true,
    refetchOnWindowFocus = false
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check if data is fresh
  const isDataFresh = useCallback((entry: CacheEntry<T>) => {
    return Date.now() - entry.timestamp < cacheTime;
  }, [cacheTime]);

  // Memoized fetch function
  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!enabled) return;

    const cachedEntry = globalCache.get(key);
    
    // Return cached data if fresh and not forcing refresh
    if (cachedEntry && isDataFresh(cachedEntry) && !forceRefresh) {
      setData(cachedEntry.data);
      setLoading(false);
      return cachedEntry.data;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      
      // Update cache
      globalCache.set(key, {
        data: result,
        timestamp: Date.now(),
        loading: false
      });

      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
        setLoading(false);
      }
      throw err;
    }
  }, [key, fetcher, enabled, isDataFresh]);

  // Initial data fetch
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  // Window focus refetch
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      const cachedEntry = globalCache.get(key);
      if (cachedEntry && !isDataFresh(cachedEntry)) {
        fetchData(true);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, key, isDataFresh, fetchData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Memoized return value
  return useMemo(() => ({
    data,
    loading,
    error,
    refetch: () => fetchData(true),
    isStale: data ? !isDataFresh(globalCache.get(key) || { data, timestamp: 0, loading: false }) : false
  }), [data, loading, error, fetchData, isDataFresh, key]);
}

/**
 * Hook for multiple data queries with batching
 */
export function useMemoizedQueries<T extends Record<string, any>>(
  queries: {
    [K in keyof T]: {
      key: string;
      fetcher: () => Promise<T[K]>;
      options?: UseMemoizedDataOptions;
    }
  }
) {
  const results = {} as {
    [K in keyof T]: {
      data: T[K] | null;
      loading: boolean;
      error: Error | null;
      refetch: () => Promise<T[K]>;
      isStale: boolean;
    }
  };

  for (const [queryKey, query] of Object.entries(queries)) {
    const result = useMemoizedData<T[keyof T]>(query.key, query.fetcher, query.options);
    results[queryKey as keyof T] = result as any;
  }

  // Compute overall loading and error states
  const isLoading = Object.values(results).some(result => result.loading);
  const hasError = Object.values(results).some(result => result.error);
  const errors = Object.values(results)
    .map(result => result.error)
    .filter(Boolean);

  return useMemo(() => ({
    ...results,
    isLoading,
    hasError,
    errors,
    refetchAll: () => Promise.all(Object.values(results).map(result => result.refetch()))
  }), [results, isLoading, hasError, errors]);
}