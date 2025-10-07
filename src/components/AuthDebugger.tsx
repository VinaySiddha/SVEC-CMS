'use client';

import { useEffect } from 'react';

export default function AuthDebugger() {
  useEffect(() => {
    const debugAuth = () => {
      console.log('🔍 === AUTH DEBUGGER ===');
      console.log('🌐 Current URL:', window.location.href);
      console.log('💾 LocalStorage authToken:', localStorage.getItem('authToken') ? 'EXISTS' : 'MISSING');
      
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            console.log('📋 Token payload:', {
              id: payload.id,
              username: payload.username,
              role: payload.role,
              department: payload.department,
              iat: new Date(payload.iat * 1000),
              exp: new Date(payload.exp * 1000)
            });
            console.log('⏰ Token expires:', new Date(payload.exp * 1000));
            console.log('✅ Token valid:', payload.exp > Date.now() / 1000);
            
            // Check if token will expire soon (within 1 hour)
            const timeUntilExpiry = (payload.exp * 1000) - Date.now();
            const hoursUntilExpiry = timeUntilExpiry / (1000 * 60 * 60);
            
            if (hoursUntilExpiry < 1) {
              console.warn('⚠️ Token expires in less than 1 hour:', hoursUntilExpiry.toFixed(2), 'hours');
            }
          }
        } catch (error) {
          console.error('❌ Token parsing error:', error);
        }
      } else {
        console.log('🚫 No token found in localStorage');
      }
      
      // Check if we're on a protected page
      const isProtectedPage = window.location.pathname.includes('/dashboard') || 
                             window.location.pathname.includes('/admin') ||
                             window.location.pathname.includes('/departments');
      console.log('🔐 Is protected page:', isProtectedPage);
      
      console.log('🔍 === END AUTH DEBUGGER ===');
    };

    // Debug on mount
    setTimeout(debugAuth, 1000); // Delay to ensure everything is loaded
    
    // Debug periodically
    const interval = setInterval(debugAuth, 30000); // Every 30 seconds
    
    // Debug on localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        console.log('🔄 Auth token changed in localStorage:', e.newValue ? 'SET' : 'REMOVED');
        setTimeout(debugAuth, 100);
      }
    };
    
    // Debug on page focus (for debugging page refreshes)
    const handleFocus = () => {
      console.log('👁️ Page focused - checking auth state');
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