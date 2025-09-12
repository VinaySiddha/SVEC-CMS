"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SuperAdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  department: string;
  permissions: string[];
  last_login?: string;
}

interface SuperAdminContextType {
  user: SuperAdminUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  checkPermission: (permission: string) => boolean;
}

const SuperAdminContext = createContext<SuperAdminContextType | undefined>(undefined);

export const useSuperAdmin = () => {
  const context = useContext(SuperAdminContext);
  if (context === undefined) {
    throw new Error('useSuperAdmin must be used within a SuperAdminProvider');
  }
  return context;
};

export const SuperAdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SuperAdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/super-admin/auth/verify', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.valid && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
          if (pathname !== '/super-admin/login') {
            router.push('/super-admin/login');
          }
        }
      } else {
        setUser(null);
        if (pathname !== '/super-admin/login') {
          router.push('/super-admin/login');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      if (pathname !== '/super-admin/login') {
        router.push('/super-admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/super-admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      router.push('/super-admin/login');
    }
  };

  const checkPermission = (permission: string): boolean => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  // Auto-refresh auth every 30 minutes
  useEffect(() => {
    if (user) {
      const interval = setInterval(checkAuth, 30 * 60 * 1000); // 30 minutes
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <SuperAdminContext.Provider value={{ user, loading, logout, checkPermission }}>
      {children}
    </SuperAdminContext.Provider>
  );
};