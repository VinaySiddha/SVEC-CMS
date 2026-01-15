'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  LogOut,
  ArrowLeft,
  Briefcase,
  Search,
  Images,
  FileText,
  User,
  Users,
  BarChart,
  Table,
  Building2,
  FileDown,
  Bell,
  Calendar
} from 'lucide-react';

// Placement modules configuration
const PLACEMENT_MODULES = [
  {
    key: 'carousel',
    name: 'Placement Carousel',
    icon: Images,
    description: 'Manage placement success story images and carousel',
    table: 'placement_carousel'
  },
  {
    key: 'intro',
    name: 'Placement Introduction',
    icon: FileText,
    description: 'Edit placement cell introduction and overview',
    table: 'placement_intro'
  },
  {
    key: 'officer',
    name: 'Placement Officer',
    icon: User,
    description: 'Manage placement officer information',
    table: 'placement_officer'
  },
  {
    key: 'team',
    name: 'Placement Team',
    icon: Users,
    description: 'Manage placement team members and coordinators',
    table: 'placement_team'
  },
  {
    key: 'charts',
    name: 'Year-wise Charts',
    icon: BarChart,
    description: 'Manage placement statistics and charts',
    table: 'placement_yearwise_charts'
  },
  {
    key: 'category',
    name: 'Category Table',
    icon: Table,
    description: 'Manage branch-wise placement data',
    table: 'placement_category_table'
  },
  {
    key: 'logos',
    name: 'Company Logos',
    icon: Building2,
    description: 'Manage recruiting company logos',
    table: 'placement_company_logos'
  },
  {
    key: 'pdfs',
    name: 'Placement PDFs',
    icon: FileDown,
    description: 'Manage placement reports and documents',
    table: 'placement_pdfs'
  },
  {
    key: 'noticeboard',
    name: 'Noticeboard',
    icon: Bell,
    description: 'Manage placement notices and announcements',
    table: 'placement_noticeboard'
  },
  {
    key: 'events',
    name: 'Placement Events',
    icon: Calendar,
    description: 'Manage recruitment events, circulars, and guidelines',
    table: 'placement_events'
  }
];

function PlacementHeader({ user }: { user: any }) {
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    window.location.href = '/auth/login';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 border border-blue-200 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Placement Cell</h1>
              <p className="text-lg text-gray-600">Content Management Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-gray-700">
              Welcome back, <span className="font-semibold">{user?.name}</span>!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <span className="text-sm text-gray-600">Department:</span>
            <span className="capitalize bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {user?.branch || 'Placement'}
            </span>
          </div>
          <a
            href="/placement/auth/login"
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 hover:bg-red-50 hover:border-red-200 hover:text-red-700 rounded-lg transition-colors font-medium flex items-center h-10 border"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PlacementDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'placement')) {
      router.replace('/auth/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Filter modules based on search query
  const filteredModules = PLACEMENT_MODULES.filter(
    (module) =>
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50 pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
        {/* Header */}
        <PlacementHeader user={user} />

        {/* Search Bar */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.key}
                href={`/placement/dashboard/${module.key}`}
                className="group"
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-2 border-transparent hover:border-orange-500/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {module.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-2">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-orange-600 font-medium group-hover:text-orange-700">
                      <span>Manage content</span>
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* No results message */}
        {filteredModules.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No modules found</h3>
              <p className="text-gray-600">
                Try adjusting your search to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Placement Cell Management</h3>
                <p className="text-sm text-gray-600">
                  Select a module above to manage placement cell content. Each module allows you to create, edit, and delete content specific to that section.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}