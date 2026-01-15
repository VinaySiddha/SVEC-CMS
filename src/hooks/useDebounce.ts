import { useState, useEffect } from 'react';

// Custom hook for debouncing values to reduce API calls
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for debounced async operations
export function useAsyncDebounce<T extends (...args: any[]) => Promise<any>>(
  callback: T,
  delay: number
) {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const debouncedCallback = (...args: Parameters<T>) => {
    setLoading(true);
    
    return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      const timeoutId = setTimeout(async () => {
        try {
          const result = await callback(...args);
          setLoading(false);
          resolve(result);
        } catch (error) {
          setLoading(false);
          reject(error);
        }
      }, delay);
    });
  };

  return { debouncedCallback: debouncedCallback as T, loading };
}