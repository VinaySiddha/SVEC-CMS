import { useEffect, useRef, useCallback } from 'react';

interface UseAutoRefreshOptions {
  interval?: number; // Polling interval in milliseconds (default: 30 seconds)
  enabled?: boolean; // Whether auto-refresh is enabled (default: true)
  onRefresh?: () => void; // Callback when refresh occurs
  department?: string; // Department code for filtering updates
  module?: string; // Module key for filtering updates
}

/**
 * Custom hook for auto-refreshing data in department view pages
 * Automatically refetches data at specified intervals and when tab becomes visible
 * Also listens for admin updates via localStorage events
 */
export const useAutoRefresh = (
  refreshCallback: () => void,
  options: UseAutoRefreshOptions = {}
) => {
  const {
    interval = 30000, // Default 30 seconds
    enabled = true,
    onRefresh,
    department,
    module
  } = options;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastRefreshRef = useRef<number>(0);
  const storageEventListenerRef = useRef<((e: StorageEvent) => void) | null>(null);

  // Clear existing interval
  const clearRefreshInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start polling for updates
  const startRefreshInterval = useCallback(() => {
    if (!enabled) return;

    clearRefreshInterval();
    
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      // Prevent too frequent refreshes (minimum 5 seconds between refreshes)
      if (now - lastRefreshRef.current > 5000) {
        console.log('Auto-refreshing department data...');
        refreshCallback();
        onRefresh?.();
        lastRefreshRef.current = now;
      }
    }, interval);
  }, [enabled, interval, refreshCallback, onRefresh, clearRefreshInterval]);

  // Handle visibility change (refresh when tab becomes active)
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible' && enabled) {
      const now = Date.now();
      // Refresh if it's been more than 10 seconds since last refresh
      if (now - lastRefreshRef.current > 10000) {
        console.log('Refreshing data due to tab focus...');
        refreshCallback();
        onRefresh?.();
        lastRefreshRef.current = now;
      }
    }
  }, [enabled, refreshCallback, onRefresh]);

  // Handle storage events (refresh when admin makes changes in another tab)
  const handleStorageChange = useCallback((e: StorageEvent) => {
    if (e.key === 'admin_data_updated' && enabled) {
      try {
        const update = JSON.parse(e.newValue || '{}');
        const now = Date.now();
        
        // Check if this update is relevant to current view
        const isRelevantDepartment = !department || update.department === department;
        const isRelevantModule = !module || update.module === module;
        
        if (isRelevantDepartment && isRelevantModule) {
          console.log('🔄 Admin update detected, refreshing immediately:', {
            action: update.action,
            department: update.department,
            module: update.module
          });
          
          // Refresh immediately with minimal delay
          if (now - lastRefreshRef.current > 500) { // Prevent rapid consecutive refreshes
            refreshCallback();
            onRefresh?.();
            lastRefreshRef.current = now;
          }
        }
      } catch (error) {
        console.warn('Error parsing storage event:', error);
      }
    }
  }, [enabled, refreshCallback, onRefresh, department, module]);

  useEffect(() => {
    if (enabled) {
      // Set up polling interval
      startRefreshInterval();

      // Listen for visibility changes
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Listen for storage events (cross-tab communication)
      storageEventListenerRef.current = handleStorageChange;
      window.addEventListener('storage', handleStorageChange);

      return () => {
        clearRefreshInterval();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('storage', handleStorageChange);
      };
    } else {
      clearRefreshInterval();
    }
  }, [enabled, startRefreshInterval, handleVisibilityChange, handleStorageChange, clearRefreshInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearRefreshInterval();
    };
  }, [clearRefreshInterval]);

  return {
    forceRefresh: useCallback(() => {
      console.log('Force refreshing data...');
      refreshCallback();
      onRefresh?.();
      lastRefreshRef.current = Date.now();
    }, [refreshCallback, onRefresh])
  };
};