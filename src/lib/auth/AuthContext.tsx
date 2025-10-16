// src/lib/auth/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Client-side types (duplicated from auth.ts to avoid server imports)
interface User {
  id: number;
  username: string;
  email: string;
  department: string;
  department_name: string;
  role: 'admin' | 'faculty' | 'hod' | 'super_admin' | 'dept';
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  sessionId: string | null;
  isLoading: boolean;
  login: (sessionId: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (requiredDept?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      // console.log('🚀 Starting Auth Initialization');
      
      // Clear old JWT tokens and force re-login
      const oldToken = localStorage.getItem('authToken');
      if (oldToken) {
        console.log('🔄 Found old JWT token, clearing and forcing re-login...');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
      
      // Simple localStorage check for session data
      const storedSessionId = localStorage.getItem('sessionId');
      const storedUser = localStorage.getItem('userData');
      
      if (!storedSessionId || !storedUser) {
        console.log('❌ No session found');
        setSessionId(null);
        setUser(null);
        setIsLoading(false);
        return;
      }
      
      try {
        const userData = JSON.parse(storedUser);
        // console.log('✅ Session found, restoring user:', userData.username);
        
        setSessionId(storedSessionId);
        setUser(userData);
        // console.log('✅ Session restored successfully');
      } catch (error) {
        // console.log('❌ Invalid session data, clearing...');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('userData');
        setSessionId(null);
        setUser(null);
      }
      
      setIsLoading(false);
    };
    
    // Wait for client hydration
    if (typeof window !== 'undefined') {
      setTimeout(initializeAuth, 50);
    }
  }, []);

  const login = (newSessionId: string, userData: User) => {
    try {
      // console.log('=== Starting Login Process ===');
      // console.log('Session ID received:', newSessionId ? 'Yes' : 'No');
      // console.log('User data received:', userData);
      
      // console.log('✅ Logging in user:', userData.username);
      
      // Set state first
      setSessionId(newSessionId);
      setUser(userData);
      
      // Then save to localStorage
      try {
        localStorage.setItem('sessionId', newSessionId);
        localStorage.setItem('userData', JSON.stringify(userData));
        // console.log('✅ Session saved to localStorage');
        
        // Verify it was saved
        const saved = localStorage.getItem('sessionId');
        // if (saved === newSessionId) {
        //   // console.log('✅ Session verification in localStorage successful');
        // } else {
        //   console.error('❌ Session not properly saved to localStorage');
        // }
      } catch (storageError) {
        // console.error('❌ Failed to save session to localStorage:', storageError);
        throw new Error('Failed to save authentication state');
      }
      
      // console.log('=== Login Process Complete ===');
    } catch (error) {
      // console.error('❌ Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      // console.log('Logging out user:', user?.username);
      setSessionId(null);
      setUser(null);
      localStorage.removeItem('sessionId');
      localStorage.removeItem('userData');
      
      // Also clear any old auth-related storage
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear state even if localStorage fails
      setSessionId(null);
      setUser(null);
    }
  };

  const isAuthenticated = !!user && !!sessionId;

  const hasPermission = (requiredDept?: string): boolean => {
    if (!user) {
      // console.log('No user found for permission check');
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
      // console.log(`Permission denied: user dept '${user.department}' != required '${requiredDept}'`);
    }
    
    return hasAccess;
  };

  const value = {
    user,
    sessionId,
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
