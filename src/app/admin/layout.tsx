'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Building2,
  User
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        router.push('/auth/login');
        return;
      }

      // Check if user has admin privileges
      if (user.role !== 'admin' && user.role !== 'super_admin') {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, user, router, isLoading]);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Departments', href: '/admin/departments', icon: Building2 },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Logo/Header */}
        <div className="relative h-20 px-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-between h-full">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">SVEC</span>
                <p className="text-xs text-blue-100 font-medium">Admin Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/20"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Navigation</h3>
          </div>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <div key={item.name} className="relative">
                <Button
                  variant="ghost"
                  className={`w-full justify-start h-12 px-4 mb-1 transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:from-blue-600 hover:to-indigo-700 transform scale-105' 
                      : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 hover:translate-x-1'
                  }`}
                  onClick={() => {
                    router.push(item.href);
                    setSidebarOpen(false);
                  }}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </Button>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full"></div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User info & logout */}
        <div className="border-t border-gray-200/50 p-6 bg-gradient-to-r from-gray-50 to-gray-100/50">
          <div className="flex items-center space-x-4 mb-4 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500 capitalize truncate">{user?.role || 'admin'}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full h-10 border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white/50 via-blue-50/30 to-indigo-100/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}