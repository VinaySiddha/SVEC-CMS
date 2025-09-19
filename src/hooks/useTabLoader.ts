"use client";

import { useState, useCallback } from 'react';

interface UseTabLoaderOptions {
  loaderDuration?: number;
  fadeOutDelay?: number;
}

/**
 * Custom hook for managing tab switching with logo loader
 * Provides smooth transitions that mask any content loading latency
 */
export function useTabLoader(
  initialTab: string, 
  options: UseTabLoaderOptions = {}
) {
  const {
    loaderDuration = 150,
    fadeOutDelay = 50
  } = options;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);

  const switchTab = useCallback(async (newTabId: string) => {
    if (newTabId === activeTab || isTabLoading) {
      return;
    }

    try {
      // Show loader immediately for visual feedback
      setIsTabLoading(true);
      setPendingTab(newTabId);

      // Small delay to ensure smooth transition and mask any prep work
      await new Promise(resolve => setTimeout(resolve, loaderDuration));

      // Switch to new tab content
      setActiveTab(newTabId);

      // Hide loader after content is rendered
      setTimeout(() => {
        setIsTabLoading(false);
        setPendingTab(null);
      }, fadeOutDelay);

    } catch (error) {
      // Handle any errors gracefully
      console.error('Tab switching error:', error);
      setIsTabLoading(false);
      setPendingTab(null);
    }
  }, [activeTab, isTabLoading, loaderDuration, fadeOutDelay]);

  const getTabButtonProps = useCallback((tabId: string) => ({
    'data-no-loading': 'true' as const,
    onClick: () => switchTab(tabId),
    disabled: isTabLoading,
    'aria-selected': activeTab === tabId,
    role: 'tab' as const,
    className: `
      transition-all duration-100 ease-out transform-gpu
      ${activeTab === tabId ? 'active-tab' : 'inactive-tab'}
      ${isTabLoading && pendingTab !== tabId ? 'opacity-50 cursor-not-allowed' : ''}
      ${pendingTab === tabId ? 'pending-tab' : ''}
    `.trim()
  }), [activeTab, isTabLoading, pendingTab, switchTab]);

  const getContentProps = useCallback(() => ({
    key: activeTab,
    className: `
      transition-opacity duration-100
      ${isTabLoading ? 'opacity-30' : 'opacity-100'}
    `.trim(),
    style: {
      animation: !isTabLoading ? 'quickFadeIn 0.2s ease-out' : 'none'
    }
  }), [activeTab, isTabLoading]);

  const getLoaderProps = useCallback(() => ({
    isVisible: isTabLoading,
    className: "absolute inset-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-20 flex items-center justify-center rounded-lg",
    style: {
      animation: 'logoFadeIn 0.1s ease-out'
    }
  }), [isTabLoading]);

  return {
    activeTab,
    isTabLoading,
    pendingTab,
    switchTab,
    getTabButtonProps,
    getContentProps,
    getLoaderProps,
    // Helper functions
    isActive: (tabId: string) => activeTab === tabId,
    isPending: (tabId: string) => pendingTab === tabId
  };
}

export default useTabLoader;