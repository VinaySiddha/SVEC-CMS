"use client";

import React, { useState, useCallback, useMemo, useTransition } from 'react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface OptimizedTabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  className?: string;
  tabButtonClassName?: string;
  tabContentClassName?: string;
  instantSwitch?: boolean; // New prop for ultra-fast switching
}

/**
 * Optimized Tabs component that prevents flickering and provides instant tab switching
 * Uses React.startTransition for non-blocking updates
 */
export const OptimizedTabs: React.FC<OptimizedTabsProps> = ({
  items,
  defaultActiveTab,
  className = "",
  tabButtonClassName = "",
  tabContentClassName = "",
  instantSwitch = true
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || items[0]?.id);
  const [isPending, startTransition] = useTransition();
  
  // Ultra-fast tab change handler
  const handleTabChange = useCallback((tabId: string) => {
    if (tabId === activeTab) return; // Prevent unnecessary updates
    
    if (instantSwitch) {
      // Immediate state change for instant feel
      setActiveTab(tabId);
    } else {
      // Use transition for smooth updates (if needed)
      startTransition(() => {
        setActiveTab(tabId);
      });
    }
  }, [activeTab, instantSwitch]);
  
  // Memoize active content with instant updates
  const activeContent = useMemo(() => {
    const activeItem = items.find(item => item.id === activeTab);
    return activeItem?.content;
  }, [items, activeTab]);
  
  // Memoized tab buttons with instant feedback
  const tabButtons = useMemo(() => 
    items.map((item) => {
      const isActive = activeTab === item.id;
      return (
        <button
          key={item.id}
          data-no-loading="true"
          onClick={() => handleTabChange(item.id)}
          className={cn(
            "tab-button px-4 py-2 rounded-lg font-medium focus:outline-none",
            isActive 
              ? "bg-primary text-white shadow-lg active-tab" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 inactive-tab",
            instantSwitch && "instant-tab-switch",
            tabButtonClassName
          )}
          style={{
            transition: instantSwitch ? 'all 0.1s ease-out' : 'all 0.2s ease-out',
            transform: 'translateZ(0)', // Hardware acceleration
          }}
          aria-selected={isActive}
          role="tab"
        >
          {item.label}
        </button>
      );
    }), [items, activeTab, tabButtonClassName, handleTabChange, instantSwitch]);
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* Tab Navigation */}
      <div 
        className="flex flex-wrap justify-center gap-2" 
        role="tablist"
        aria-label="Tab navigation"
      >
        {tabButtons}
      </div>
      
      {/* Tab Content - Instant switching */}
      <div 
        key={activeTab} // Force re-mount for instant content change
        className={cn(
          "tab-content smooth-tab-content",
          !isPending && "opacity-100",
          tabContentClassName
        )}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        style={{
          animation: instantSwitch ? 'quickFadeIn 0.1s ease-out' : 'none'
        }}
      >
        {activeContent}
      </div>
    </div>
  );
};

export default OptimizedTabs;