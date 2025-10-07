'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationContextType {
  goBack: () => void;
  canGoBack: boolean;
  navigationHistory: string[];
  pushToHistory: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  
  const pushToHistory = useCallback((path: string) => {
    setNavigationHistory(prev => {
      // Avoid duplicates and limit history size
      const newHistory = prev.filter(p => p !== path);
      return [...newHistory, path].slice(-10); // Keep last 10 entries
    });
  }, []);
  
  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      // Remove current page and go to previous
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current
      const previousPage = newHistory[newHistory.length - 1];
      
      setNavigationHistory(newHistory);
      
      if (previousPage) {
        router.push(previousPage);
      } else {
        router.back();
      }
    } else {
      router.back();
    }
  }, [navigationHistory, router]);
  
  const canGoBack = navigationHistory.length > 1 || typeof window !== 'undefined' && window.history.length > 1;
  
  return (
    <NavigationContext.Provider value={{
      goBack,
      canGoBack,
      navigationHistory,
      pushToHistory
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}