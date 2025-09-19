"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { LogoLoader } from './LogoLoader';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsWithLoaderProps {
  items: TabItem[];
  defaultActiveTab?: string;
  className?: string;
  tabButtonClassName?: string;
  tabContentClassName?: string;
  loaderSize?: 'sm' | 'md' | 'lg' | 'xl';
  loaderDuration?: number; // Duration in milliseconds
  showLoaderText?: boolean;
}

/**
 * Enhanced Tabs component with logo loader for smooth transitions
 * Shows logo loader during tab switches to mask any latency
 */
export const TabsWithLoader: React.FC<TabsWithLoaderProps> = ({
  items,
  defaultActiveTab,
  className = "",
  tabButtonClassName = "",
  tabContentClassName = "",
  loaderSize = 'md',
  loaderDuration = 200,
  showLoaderText = false
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || items[0]?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);
  
  // Enhanced tab change handler with logo loader
  const handleTabChange = useCallback(async (tabId: string) => {
    if (tabId === activeTab || isLoading) return;
    
    // Show loader immediately
    setIsLoading(true);
    setPendingTab(tabId);
    
    // Small delay to ensure smooth transition and mask any latency
    await new Promise(resolve => setTimeout(resolve, loaderDuration));
    
    // Switch content
    setActiveTab(tabId);
    
    // Hide loader after content is rendered
    setTimeout(() => {
      setIsLoading(false);
      setPendingTab(null);
    }, 50); // Quick fade out
    
  }, [activeTab, isLoading, loaderDuration]);
  
  // Memoize active content
  const activeContent = useMemo(() => {
    const activeItem = items.find(item => item.id === activeTab);
    return activeItem?.content;
  }, [items, activeTab]);
  
  // Memoized tab buttons
  const tabButtons = useMemo(() => 
    items.map((item) => {
      const isActive = activeTab === item.id;
      const isPending = pendingTab === item.id;
      
      return (
        <button
          key={item.id}
          data-no-loading="true"
          onClick={() => handleTabChange(item.id)}
          disabled={isLoading}
          className={cn(
            "tab-button px-4 py-2 rounded-lg font-medium focus:outline-none relative",
            isActive 
              ? "bg-primary text-white shadow-lg active-tab" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 inactive-tab",
            isLoading && !isPending && "opacity-50 cursor-not-allowed",
            isPending && "bg-primary/80 text-white",
            tabButtonClassName
          )}
          style={{
            transition: 'all 0.1s ease-out',
            transform: 'translateZ(0)',
          }}
          aria-selected={isActive}
          role="tab"
        >
          {item.label}
          {/* Small loader indicator for pending tab */}
          {isPending && (
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <LogoLoader size="sm" showText={false} duration={0.8} />
            </div>
          )}
        </button>
      );
    }), [items, activeTab, pendingTab, isLoading, tabButtonClassName, handleTabChange]);
  
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
      
      {/* Tab Content with Loader Overlay */}
      <div className="relative min-h-[200px]">
        {/* Logo Loader Overlay */}
        {isLoading && (
          <div 
            className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg"
            style={{
              animation: 'logoFadeIn 0.15s ease-out'
            }}
          >
            <LogoLoader 
              size={loaderSize}
              showText={showLoaderText}
              text="Loading content..."
              duration={1.2}
            />
          </div>
        )}
        
        {/* Tab Content */}
        <div 
          key={activeTab}
          className={cn(
            "tab-content transition-opacity duration-100",
            isLoading ? "opacity-30" : "opacity-100",
            tabContentClassName
          )}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          style={{
            animation: !isLoading ? 'quickFadeIn 0.2s ease-out' : 'none'
          }}
        >
          {activeContent}
        </div>
      </div>
    </div>
  );
};

export default TabsWithLoader;