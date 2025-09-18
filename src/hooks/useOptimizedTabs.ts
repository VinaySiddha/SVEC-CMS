"use client";

import { useState, useCallback, useMemo } from 'react';
import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
}

/**
 * Hook for ultra-fast tab management that prevents unnecessary re-renders
 * Optimized for instant tab switching with smooth animations
 */
export function useOptimizedTabs(items: TabItem[], defaultTab?: string) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);
  
  // Ultra-fast tab change handler with deduplication
  const handleTabChange = useCallback((tabId: string) => {
    // Prevent unnecessary state updates for better performance
    if (tabId !== activeTab) {
      // Use flushSync for immediate DOM updates if available
      if (typeof window !== 'undefined' && 'flushSync' in React) {
        (React as any).flushSync(() => {
          setActiveTab(tabId);
        });
      } else {
        setActiveTab(tabId);
      }
    }
  }, [activeTab]);
  
  // Memoized active item with instant updates
  const activeItem = useMemo(() => {
    return items.find(item => item.id === activeTab);
  }, [items, activeTab]);
  
  // Optimized tab button props generator with hardware acceleration
  const getTabButtonProps = useCallback((tabId: string) => ({
    'data-no-loading': 'true',
    'aria-selected': activeTab === tabId,
    'role': 'tab',
    onClick: () => handleTabChange(tabId),
    style: {
      transition: 'all 0.1s ease-out',
      transform: 'translateZ(0)', // Force hardware acceleration
      willChange: 'background-color, color, box-shadow'
    },
    className: `tab-button ${
      activeTab === tabId 
        ? 'active-tab bg-primary text-white shadow-lg' 
        : 'inactive-tab bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`
  }), [activeTab, handleTabChange]);
  
  return {
    activeTab,
    activeItem,
    handleTabChange,
    getTabButtonProps,
    isActive: useCallback((tabId: string) => activeTab === tabId, [activeTab])
  };
}