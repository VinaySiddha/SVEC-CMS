"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Start transition
    setIsTransitioning(true);
    setIsPageVisible(false);

    // End transition after animation
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setIsPageVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  return {
    isTransitioning,
    isPageVisible,
  };
};
