'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { School, Database, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ExamSectionTopHeader } from '@/components/exam-section/ExamSectionTopHeader';

function ExamSectionHeader({ user }: { user: any }) {
  // Custom logout handler to redirect to admin login
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/auth/login';
  };
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 border border-blue-200 font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <Link href="/exam-section/dashboard" className="flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              ← Previous Page
            </Link>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Exam Section</h1>
              <p className="text-lg text-gray-600">Department Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-gray-700">Welcome back, <span className="font-semibold">{user?.username}</span>!</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <span className="text-sm text-gray-600">Role:</span>
            <span className="capitalize bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Exam</span>
          </div>
          <a 
            href="/auth/login"
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 hover:bg-red-50 hover:border-red-200 hover:text-red-700 rounded-lg transition-colors font-medium flex items-center h-10 border"
          >
            <span className="flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ExamSectionDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'exam')) {
      router.replace('/exam-section/auth/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  const modules = [
    {
      icon: School,
      title: 'JNTUK Exam Section',
      description: 'Manage JNTUK examination content',
      link: '/exam-section/jntuk',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Database,
      title: 'Autonomous Section',
      description: 'Handle autonomous examination system',
      link: '/exam-section/autonomous',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Database,
      title: 'RSAC Management',
      description: 'Manage regulations, syllabus and academic calendars',
      link: '/exam-section/rsac',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: School,
      title: 'Controller of Examinations',
      description: 'Manage controller profile and information',
      link: '/exam-section/controller-of-examinations',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Exam Section Top Header */}
      <ExamSectionTopHeader showNavigation={true} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <ExamSectionHeader user={user} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Department</p>
                  <p className="text-2xl font-bold text-gray-800">Exam Section</p>
                  <p className="text-xs text-blue-600">Active Status</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Available Modules</p>
                  <p className="text-2xl font-bold text-gray-800">{modules.length}</p>
                  <p className="text-xs text-green-600">Ready to use</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Access Level</p>
                  <p className="text-2xl font-bold text-gray-800 capitalize">Exam Admin</p>
                  <p className="text-xs text-purple-600">Permissions enabled</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Section */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Department Modules
                </h2>
                <p className="text-gray-500">
                  Access and manage examination content modules
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-red-100 text-red-800 rounded-full text-sm px-3 py-1">
                  {modules.length} modules available
                </span>
                <Input 
                  type="search"
                  placeholder="Search modules..."
                  className="w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Link key={index} href={module.link}>
                    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 ${module.bgColor} rounded-lg flex items-center justify-center transition-colors group-hover:bg-opacity-80`}>
                            <Icon className={`w-6 h-6 ${module.iconColor}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800 mb-1 group-hover:text-opacity-90">
                              {module.title}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {module.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}