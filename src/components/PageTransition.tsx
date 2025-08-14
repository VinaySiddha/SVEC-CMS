"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';
import LoadingOverlay from './LoadingOverlay';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const pathname = usePathname();
  const { setLoading } = useLoading();

  useEffect(() => {
    // Start page transition when pathname changes
    setIsVisible(false);
    setShowLoader(true);

    // Show content and stop loading after transition
    const timer = setTimeout(() => {
      setLoading(false); // Stop global loading
      setShowLoader(false);
      setIsVisible(true);
    }, 250); // Super quick transition - just enough to see the logo

    return () => clearTimeout(timer);
  }, [pathname, setLoading]);

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay isLoading={showLoader} size="large" />
      
      {/* Page Content */}
      <div
        className={`transition-all duration-200 ease-out ${isVisible
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
