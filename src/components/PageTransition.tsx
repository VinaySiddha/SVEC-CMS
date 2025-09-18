"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const { setLoading } = useLoading();

  useEffect(() => {
    // Only trigger transition for actual route changes, not hash changes or query params
    const currentPath = pathname?.split("?")[0].split("#")[0] ?? "";
    const previousPath = localStorage.getItem('previousPath') || '';
    
    // If it's the same path, skip the transition completely (for tab changes, etc.)
    if (currentPath === previousPath) {
      setIsVisible(true);
      setLoading(false);
      return;
    }
    
    // Store current path for next comparison
    localStorage.setItem('previousPath', currentPath);
    
    // For actual route changes, make transition much faster
    setIsVisible(false);

    // Ultra-fast transition - just enough to prevent flash
    const timer = setTimeout(() => {
      setLoading(false);
      setIsVisible(true);
    }, 100); // Reduced from 250ms to 100ms for snappier feel

    return () => clearTimeout(timer);
  }, [pathname, setLoading]);

  return (
    <>
      {/* Loading Overlay */}
      
      {/* Page Content - Faster transitions */}
      <div
        className={`transition-all duration-75 ease-out ${isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-1 scale-99'
          }`}
      >
        {children}
      </div>
    </>
  );
};

export default PageTransition;
