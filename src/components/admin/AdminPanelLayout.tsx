'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Settings, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Filter,
  Search,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AdminPanelLayoutProps {
  children: React.ReactNode;
}

export default function AdminPanelLayout({ children }: AdminPanelLayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState({
    pendingApprovals: 0,
    totalUsers: 0,
    totalDepartments: 12,
    recentActivity: 0
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth/login');
      return;
    }

    // Check if user has admin or super_admin privileges
    if (user.role !== 'admin' && user.role !== 'super_admin') {
      router.push('/unauthorized');
      return;
    }

    fetchDashboardStats();
    fetchNotifications();
  }, [user, isAuthenticated, router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/admin/notifications', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/auth/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: TrendingUp,
      href: '/admin/dashboard'
    },
    {
      id: 'approvals',
      label: 'Approvals',
      icon: CheckCircle,
      href: '/admin/approvals',
      badge: stats.pendingApprovals > 0 ? stats.pendingApprovals : null
    },
    {
      id: 'departments',
      label: 'Departments',
      icon: Users,
      href: '/admin/departments'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      href: '/admin/users'
    },
    {
      id: 'data-management',
      label: 'Data Management',
      icon: FileText,
      href: '/admin/data-management'
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs',
      icon: FileText,
      href: '/admin/audit-logs'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-10 px-3 text-left"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {user.username?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.username}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role?.replace('_', ' ')}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              SVEC-CMS Admin Panel
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 w-64"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>

            {/* Quick stats */}
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span>{stats.pendingApprovals} pending</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-500" />
                <span>{stats.totalUsers} users</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}