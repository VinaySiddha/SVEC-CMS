"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingText: string;
  setLoadingText: (text: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const autoClearTimeoutRef = useRef<number | null>(null);

  const setLoading = (loading: boolean) => {
    if (autoClearTimeoutRef.current) {
      window.clearTimeout(autoClearTimeoutRef.current);
      autoClearTimeoutRef.current = null;
    }

    setIsLoading(loading);

    // Safety: never allow the global loader to get stuck forever
    if (loading) {
      autoClearTimeoutRef.current = window.setTimeout(() => {
        setIsLoading(false);
        autoClearTimeoutRef.current = null;
      }, 8000);
    }
  };

  // Show a brief loader on full refresh/first load (so the animation is visible)
  useEffect(() => {
    // Trigger after hydration (SSR-safe) and keep visible at least 0.5s.
    setLoadingText('Loading...');
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if the clicked element or its parent is a link
      const link = target.closest('a, button[onclick], [role="button"], button');

      if (link) {
        // Skip loading for tab buttons, toggle buttons, and other UI elements
        const isTabButton = link.closest('[role="tablist"], .tab-navigation, .tabs-trigger') || 
                           link.classList.contains('tab-button') ||
                           link.getAttribute('aria-selected') !== null ||
                           (link as HTMLElement).dataset?.isTab === 'true';
        
        // Enhanced skip loading detection
        const skipLoading = link.getAttribute('data-no-loading') === 'true' ||
                           link.closest('[data-no-loading="true"]') ||
                           link.classList.contains('no-loading-btn');
        
        if (isTabButton || skipLoading) {
          return;
        }

        const href = link.getAttribute('href');
        const onclick = link.getAttribute('onclick');

        if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('#')) {
          // Use requestAnimationFrame for immediate response
          requestAnimationFrame(() => {
            setLoading(true);
            setLoadingText('Loading page...');
          });
        }
        else if (onclick || link.getAttribute('role') === 'button') {
          // Only trigger loading for actual navigation buttons, not UI toggles
          if (!link.closest('.ui-button, .toggle-button, .dropdown-trigger, .tab-content, [role="tabpanel"]')) {
            requestAnimationFrame(() => {
              setLoading(true);
              setLoadingText('Loading...');
              // Auto-clear for quick interactions
              setTimeout(() => setLoading(false), 100);
            });
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const value = {
    isLoading,
    setLoading,
    loadingText,
    setLoadingText,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
