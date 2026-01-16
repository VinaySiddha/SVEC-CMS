'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { School, Database, ArrowLeft, Eye, Edit, Trash2, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExamSectionTopHeader } from '@/components/exam-section/ExamSectionTopHeader';
import toast from 'react-hot-toast';

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
  const [controllerData, setControllerData] = useState<any>(null);
  const [jntukData, setJntukData] = useState<any[]>([]);
  const [autonomousData, setAutonomousData] = useState<any[]>([]);
  const [rsacData, setRsacData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('controller');

  // Handle Delete for JNTUK items
  const handleDeleteJntuk = async (sno: number | string | undefined) => {
    if (!sno) return;
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch('/api/exam-section/jntuk-exam-section', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sno }),
      });
      if (res.ok) {
        setJntukData(prev => prev.filter(item => (item.sno ?? item.id) !== sno));
        toast.success('Item deleted successfully');
      } else {
        toast.error('Failed to delete item');
      }
    } catch (error) {
      toast.error('Error deleting item');
    }
  };

  // Handle Delete for Autonomous items
  const handleDeleteAutonomous = async (id: number | string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch('/api/exam-section/autonomous-exam-section', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setAutonomousData(prev => prev.filter(item => item.id !== id));
        toast.success('Item deleted successfully');
      } else {
        toast.error('Failed to delete item');
      }
    } catch (error) {
      toast.error('Error deleting item');
    }
  };

  // Handle Delete for RSAC items
  const handleDeleteRsac = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/exam-section/rsac/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRsacData(rsacData.filter(item => item.id !== id));
        toast.success('Item deleted successfully');
      } else {
        toast.error('Failed to delete item');
      }
    } catch (error) {
      toast.error('Error deleting item');
    }
  };

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'exam')) {
      router.replace('/exam-section/auth/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Fetch all exam section data
  useEffect(() => {
    const normalizeRecords = (payload: any) => {
      if (Array.isArray(payload)) return payload;
      if (payload && Array.isArray(payload.data)) return payload.data;
      return [];
    };

    const fetchAllData = async () => {
      try {
        setDataLoading(true);

        // Fetch Controller data
        const controllerRes = await fetch('/api/exam-section/controller-of-examinations');
        if (controllerRes.ok) {
          const controllerJson = await controllerRes.json();
          setControllerData(controllerJson.data || null);
        }

        // Fetch JNTUK data (use admin endpoint for manageable records)
        const jntukRes = await fetch('/api/exam-section/jntuk-exam-section');
        if (jntukRes.ok) {
          const jntukJson = await jntukRes.json();
          setJntukData(normalizeRecords(jntukJson));
        }

        // Fetch Autonomous data
        const autonomousRes = await fetch('/api/exam-section/autonomous');
        if (autonomousRes.ok) {
          const autonomousJson = await autonomousRes.json();
          setAutonomousData(normalizeRecords(autonomousJson));
        }

        // Fetch RSAC data
        const rsacRes = await fetch('/api/exam-section/rsac');
        if (rsacRes.ok) {
          const rsacJson = await rsacRes.json();
          setRsacData(normalizeRecords(rsacJson));
        }
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setDataLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

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
      icon: Bell,
      title: 'Noticeboard',
      description: 'Manage exam section notices and announcements',
      link: '/exam-section/noticeboard',
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600'
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

        {/* Data Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Controller Data</p>
                <p className="text-3xl font-bold text-gray-800">{controllerData ? '1' : '0'}</p>
                <Link href="/exam-section/controller-of-examinations" className="text-xs text-blue-600 hover:underline">
                  View Profile
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">JNTUK Records</p>
                <p className="text-3xl font-bold text-gray-800">{jntukData.length}</p>
                <Link href="/exam-section/jntuk" className="text-xs text-blue-600 hover:underline">
                  Manage JNTUK
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Autonomous Records</p>
                <p className="text-3xl font-bold text-gray-800">{autonomousData.length}</p>
                <Link href="/exam-section/autonomous" className="text-xs text-blue-600 hover:underline">
                  Manage Autonomous
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">RSAC Records</p>
                <p className="text-3xl font-bold text-gray-800">{rsacData.length}</p>
                <Link href="/exam-section/rsac" className="text-xs text-blue-600 hover:underline">
                  Manage RSAC
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table Section */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Entered Data Summary
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    View all entered exam section data
                  </p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-6 border-b border-gray-200 flex-wrap">
                <button
                  onClick={() => setActiveTab('controller')}
                  className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'controller'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Controller ({controllerData ? '1' : '0'})
                </button>
                <button
                  onClick={() => setActiveTab('jntuk')}
                  className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'jntuk'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  JNTUK ({jntukData.length})
                </button>
                <button
                  onClick={() => setActiveTab('autonomous')}
                  className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'autonomous'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Autonomous ({autonomousData.length})
                </button>
                <button
                  onClick={() => setActiveTab('rsac')}
                  className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'rsac'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  RSAC ({rsacData.length})
                </button>
              </div>
            </div>

            {/* Loading State */}
            {dataLoading ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                </div>
                <p className="text-gray-600">Loading data...</p>
              </div>
            ) : (
              <>
                {/* Controller Tab */}
                {activeTab === 'controller' && (
                  <div className="overflow-x-auto">
                    {controllerData ? (
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Designation</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Phone</th>
                            <th className="px-6 py-3 text-right font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-800 font-medium">{controllerData.name}</td>
                            <td className="px-6 py-4 text-gray-600">{controllerData.designation}</td>
                            <td className="px-6 py-4 text-gray-600">{controllerData.email || '-'}</td>
                            <td className="px-6 py-4 text-gray-600">{controllerData.phone || '-'}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link href="/exam-section/controller-of-examinations" className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-blue-100 text-blue-600">
                                  <Eye className="w-4 h-4" />
                                </Link>
                                <Link href="/exam-section/controller-of-examinations" className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-yellow-100 text-yellow-600">
                                  <Edit className="w-4 h-4" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No controller profile data entered yet</p>
                        <Link href="/exam-section/controller-of-examinations" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                          Create Profile
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* JNTUK Tab */}
                {activeTab === 'jntuk' && (
                  <div className="overflow-x-auto">
                    {jntukData.length > 0 ? (
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Title</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-right font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {jntukData.map((item: any, index) => {
                            const recordId = item.sno ?? item.id ?? index;
                            return (
                              <tr key={recordId} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-800 font-medium">{item.title || item.content || item.name || '-'}</td>
                                <td className="px-6 py-4 text-gray-600">{item.category || item.type || '-'}</td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-blue-100 text-blue-600">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <Link href={`/exam-section/jntuk?edit=${recordId}`} className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-yellow-100 text-yellow-600">
                                    <Edit className="w-4 h-4" />
                                  </Link>
                                  <button onClick={() => handleDeleteJntuk(recordId)} className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-red-100 text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No JNTUK data entered yet</p>
                        <Link href="/exam-section/jntuk" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                          Add JNTUK Data
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Autonomous Tab */}
                {activeTab === 'autonomous' && (
                  <div className="overflow-x-auto">
                    {autonomousData.length > 0 ? (
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Title</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-right font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {autonomousData.map((item: any) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-gray-800 font-medium">{item.title || item.name || '-'}</td>
                              <td className="px-6 py-4 text-gray-600">{item.category || item.type || '-'}</td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-blue-100 text-blue-600">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <Link href={`/exam-section/autonomous?edit=${item.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-yellow-100 text-yellow-600">
                                    <Edit className="w-4 h-4" />
                                  </Link>
                                  <button onClick={() => handleDeleteAutonomous(item.id)} className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-red-100 text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No Autonomous data data entered yet</p>
                        <Link href="/exam-section/autonomous" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                          Add Autonomous Data
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* RSAC Tab */}
                {activeTab === 'rsac' && (
                  <div className="overflow-x-auto">
                    {rsacData.length > 0 ? (
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Title</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-right font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {rsacData.map((item: any) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-gray-800 font-medium">{item.title || item.name || '-'}</td>
                              <td className="px-6 py-4 text-gray-600">{item.category || item.type || '-'}</td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-blue-100 text-blue-600">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <Link href={`/exam-section/autonomous?edit=${item.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-yellow-100 text-yellow-600">
                                    <Edit className="w-4 h-4" />
                                  </Link>
                                  <button className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-red-100 text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No RSAC data entered yet</p>
                        <Link href="/exam-section/rsac" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                          Add RSAC Data
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>


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