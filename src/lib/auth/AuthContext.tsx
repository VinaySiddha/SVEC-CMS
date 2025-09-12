'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Client-side types (duplicated from auth.ts to avoid server imports)
interface User {
  id: number;
  username: string;
  email: string;
  department: string;
  department_name: string;
  role: 'admin' | 'faculty' | 'hod' | 'super_admin';
  is_active: boolean;
}

// Client-side token verification (simplified)
function verifyClientToken(token: string): { id: number; username: string; department: string; role: string } | null {
  try {
    // Simple base64 decode for client-side verification
    // Note: This is not secure verification, just for UI state management
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }
    
    return payload;
  } catch (error) {
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
    // Check for stored token on mount
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const decoded = verifyClientToken(storedToken);
      if (decoded) {
        setToken(storedToken);
        // Fetch user details from the decoded token
        // In a real app, you might want to fetch fresh user data
        setUser({
          id: decoded.id,
          username: decoded.username,
          email: '', // Will be populated from API call if needed
          department: decoded.department,
          department_name: '', // Will be populated from API call if needed
          role: decoded.role as 'admin' | 'faculty' | 'hod' | 'super_admin',
          is_active: true,
        });
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('authToken', newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = !!user && !!token;

  const hasPermission = (requiredDept?: string): boolean => {
    if (!user) return false;
    
    // Admin has access to everything
    if (user.role === 'admin') return true;
    
    // If no specific department required, any authenticated user can access
    if (!requiredDept) return true;
    
    // Department users can only access their own department
    return user.department === requiredDept;
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
