"use client";

import { useState, useCallback, useMemo, useRef } from 'react';

interface UseOptimizedTabLoaderOptions {
  preloadDelay?: number;
  animationDuration?: number;
}

/**
 * Ultra-fast tab loader hook with zero artificial delays
 * Optimized for instant tab switching with smooth animations
 */
export function useOptimizedTabLoader(
  initialTab: string, 
  options: UseOptimizedTabLoaderOptions = {}
) {
  const {
    preloadDelay = 0, // No artificial delay by default
    animationDuration = 200
  } = options;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const switchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Ultra-fast tab switching with deduplication
  const switchTab = useCallback((newTabId: string) => {
    // Prevent unnecessary switches and multiple rapid clicks
    if (newTabId === activeTab || isTransitioning) {
      return;
    }

    // Clear any pending transitions
    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current);
    }

    // Start transition animation
    setIsTransitioning(true);
    
    // Immediate tab switch for instant response
    setActiveTab(newTabId);

    // End transition after animation completes
    switchTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, animationDuration);

  }, [activeTab, isTransitioning, animationDuration]);

  // Memoized tab button props for performance
  const getTabButtonProps = useCallback((tabId: string) => ({
    onClick: () => switchTab(tabId),
    className: `px-6 py-3 rounded-lg font-medium transition-all duration-200 transform ${
      activeTab === tabId
        ? 'bg-[#B22222] text-white scale-105 shadow-lg'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
    } ${isTransitioning ? 'pointer-events-none' : ''}`,
    disabled: isTransitioning
  }), [activeTab, isTransitioning, switchTab]);

  // Memoized content props with smooth transitions
  const getContentProps = useCallback((tabId: string) => ({
    className: `transition-all duration-200 ${
      activeTab === tabId 
        ? 'opacity-100 transform translate-x-0' 
        : 'opacity-0 transform translate-x-4 pointer-events-none absolute'
    }`,
    style: {
      display: activeTab === tabId ? 'block' : 'none'
    }
  }), [activeTab]);

  // Memoized loader props (minimal usage)
  const getLoaderProps = useCallback(() => ({
    show: isTransitioning,
    className: 'transition-opacity duration-200'
  }), [isTransitioning]);

  // Cleanup timeout on unmount
  const cleanup = useCallback(() => {
    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current);
    }
  }, []);

  return {
    activeTab,
    isTabLoading: isTransitioning,
    isTransitioning,
    switchTab,
    getTabButtonProps,
    getContentProps,
    getLoaderProps,
    cleanup
  };
}