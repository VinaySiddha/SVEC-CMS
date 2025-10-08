'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigation } from '@/contexts/NavigationContext';

export function NavigationTracker() {
  const pathname = usePathname();
  const { pushToHistory } = useNavigation();
  
  useEffect(() => {
    if (pathname) {
      pushToHistory(pathname);
    }
  }, [pathname, pushToHistory]);
  
  return null; // This component doesn't render anything
}