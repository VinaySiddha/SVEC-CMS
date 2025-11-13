'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Client-side types (duplicated from auth.ts to avoid server imports)
interface User {
  id: number;
  username: string;
  email: string;
  department: string;
  department_name: string;
  role: 'admin' | 'faculty' | 'hod' | 'super_admin' | 'dept' | 'exam' | 'placement';
  is_active: boolean;
}

// Client-side token verification (simplified)
function verifyClientToken(token: string): { id: number; username: string; department: string; role: string; email?: string; department_name?: string } | null {
  try {
    console.log('Verifying token:', token ? 'Token exists' : 'No token');
    
    // Simple base64 decode for client-side verification
    // Note: This is not secure verification, just for UI state management
    if (!token || typeof token !== 'string') {
      console.warn('Token is missing or not a string');
      return null;
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('Invalid JWT format - expected 3 parts, got:', parts.length);
      return null;
    }
    
    let payload;
    try {
      payload = JSON.parse(atob(parts[1]));
      console.log('Token payload decoded:', { id: payload.id, username: payload.username, role: payload.role, exp: payload.exp });
    } catch (decodeError) {
      console.error('Failed to decode token payload:', decodeError);
      return null;
    }
    
    // Check if token is expired (more lenient check)
    if (payload.exp) {
      const currentTime = Date.now() / 1000;
      const bufferTime = 300; // 5 minutes
      if (payload.exp < (currentTime - bufferTime)) {
        console.warn('Token expired:', { exp: payload.exp, current: currentTime, expired: payload.exp < currentTime });
        return null;
      }
      console.log('Token is valid, expires at:', new Date(payload.exp * 1000));
    }
    
    // Validate required fields
    if (!payload.id || !payload.username || !payload.role) {
      console.warn('Token missing required fields:', { id: !!payload.id, username: !!payload.username, role: !!payload.role });
      return null;
    }
    
    console.log('Token verification successful for user:', payload.username);
    return payload;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (requiredDept?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      console.log('🚀 Starting Auth Initialization');
      
      // Simple localStorage check
      const storedToken = localStorage.getItem('authToken');
      
      if (!storedToken) {
        console.log('❌ No token found');
        setToken(null);
        setUser(null);
        setIsLoading(false);
        return;
      }
      
      console.log('✅ Token found, verifying...');
      const decoded = verifyClientToken(storedToken);
      
      if (decoded) {
        console.log('✅ Token valid for:', decoded.username);
        
        const userData: User = {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email || '',
          department: decoded.department || '',
          department_name: decoded.department_name || '',
          role: decoded.role as User['role'],
          is_active: true,
        };
        
        setToken(storedToken);
        setUser(userData);
        console.log('✅ Session restored successfully');
      } else {
        console.log('❌ Token invalid, clearing...');
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
      }
      
      setIsLoading(false);
    };
    
    // Wait for client hydration
    if (typeof window !== 'undefined') {
      setTimeout(initializeAuth, 50);
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    try {
      console.log('=== Starting Login Process ===');
      console.log('Token received:', newToken ? 'Yes' : 'No');
      console.log('User data received:', userData);
      
      // Validate token before setting
      const decoded = verifyClientToken(newToken);
      if (!decoded) {
        throw new Error('Invalid token provided to login');
      }
      
      console.log('✅ Token validation successful, logging in user:', userData.username);
      
      // Set state first
      setToken(newToken);
      setUser(userData);
      
      // Then save to localStorage
      try {
        localStorage.setItem('authToken', newToken);
        console.log('✅ Token saved to localStorage');
        
        // Verify it was saved
        const saved = localStorage.getItem('authToken');
        if (saved === newToken) {
          console.log('✅ Token verification in localStorage successful');
        } else {
          console.error('❌ Token not properly saved to localStorage');
        }
      } catch (storageError) {
        console.error('❌ Failed to save token to localStorage:', storageError);
        throw new Error('Failed to save authentication state');
      }
      
      console.log('=== Login Process Complete ===');
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      console.log('Logging out user:', user?.username);
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');
      
      // Also clear any other auth-related storage
      localStorage.removeItem('userData');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear state even if localStorage fails
      setToken(null);
      setUser(null);
    }
  };

  const isAuthenticated = !!user && !!token;

  const hasPermission = (requiredDept?: string): boolean => {
    if (!user) {
      console.log('No user found for permission check');
      return false;
    }
    
    // Super admin has access to everything
    if (user.role === 'super_admin') return true;
    
    // Admin has access to everything
    if (user.role === 'admin') return true;
    
    // If no specific department required, any authenticated user can access
    if (!requiredDept) return true;
    
    // Department users can only access their own department
    const hasAccess = user.department === requiredDept;
    
    if (!hasAccess) {
      console.log(`Permission denied: user dept '${user.department}' != required '${requiredDept}'`);
    }
    
    return hasAccess;
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protecting routes
export function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  requiredDept?: string
) {
  return function AuthenticatedComponent(props: T) {
    const { isAuthenticated, hasPermission, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated || !hasPermission(requiredDept)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <a 
              href="/login" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go to Login
            </a>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
