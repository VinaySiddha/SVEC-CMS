'use client';

import { useEffect } from 'react';

export default function AuthDebugger() {
  useEffect(() => {
    const debugAuth = () => {
      
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
              id: payload.id,
              username: payload.username,
              role: payload.role,
              department: payload.department,
              iat: new Date(payload.iat * 1000),
              exp: new Date(payload.exp * 1000)
            });
            
            // Check if token will expire soon (within 1 hour)
            const timeUntilExpiry = (payload.exp * 1000) - Date.now();
            const hoursUntilExpiry = timeUntilExpiry / (1000 * 60 * 60);
            
            if (hoursUntilExpiry < 1) {
            }
          }
        } catch (error) {
        }
      } else {
      }
      
      // Check if we're on a protected page
      const isProtectedPage = window.location.pathname.includes('/dashboard') || 
                             window.location.pathname.includes('/admin') ||
                             window.location.pathname.includes('/departments');
      
    };

    // Debug on mount
    setTimeout(debugAuth, 1000); // Delay to ensure everything is loaded
    
    // Debug periodically
    const interval = setInterval(debugAuth, 30000); // Every 30 seconds
    
    // Debug on localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        setTimeout(debugAuth, 100);
      }
    };
    
    // Debug on page focus (for debugging page refreshes)
    const handleFocus = () => {
      setTimeout(debugAuth, 100);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return null; // This component doesn't render anything
}