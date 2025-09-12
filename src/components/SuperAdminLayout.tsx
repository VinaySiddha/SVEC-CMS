"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSuperAdmin } from '@/contexts/SuperAdminContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Shield, 
  Home,
  Users,
  Building2,
  Key,
  Settings,
  FileText,
  Activity,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children }) => {
  const { user, logout } = useSuperAdmin();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/super-admin/dashboard',
      icon: Home,
      description: 'Overview and statistics'
    },
    {
      name: 'Department Management',
      href: '/super-admin/departments',
      icon: Building2,
      description: 'Manage all departments'
    },
    {
      name: 'Credential Management',
      href: '/super-admin/credentials',
      icon: Key,
      description: 'User access and permissions'
    },
    {
      name: 'User Management',
      href: '/super-admin/users',
      icon: Users,
      description: 'All system users'
    },
    {
      name: 'Audit Logs',
      href: '/super-admin/audit',
      icon: Activity,
      description: 'System activity logs'
    },
    {
      name: 'System Settings',
      href: '/super-admin/settings',
      icon: Settings,
      description: 'Global configurations'
    },
    {
      name: 'Reports',
      href: '/super-admin/reports',
      icon: FileText,
      description: 'Analytics and reports'
    }
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/super-admin/login');
  };

  const isActive = (href: string) => pathname === href;

  const Sidebar = () => (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Super Admin</h2>
            <p className="text-xs text-gray-500">SVEC-CMS</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.username}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            Online
          </Badge>
        </div>
        {user?.last_login && (
          <p className="text-xs text-gray-500 mt-2">
            Last login: {new Date(user.last_login).toLocaleString()}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`
              group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors
              ${isActive(item.href)
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <item.icon className={`
              flex-shrink-0 mr-3 w-5 h-5
              ${isActive(item.href) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
            `} />
            <div className="flex-1">
              <div>{item.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {item.description}
              </div>
            </div>
            {isActive(item.href) && (
              <ChevronRight className="w-4 h-4 text-blue-600" />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 transform transition-transform lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {navigationItems.find(item => isActive(item.href))?.name || 'Super Admin'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {navigationItems.find(item => isActive(item.href))?.description || 'System Administration'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500">
                  Super Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;