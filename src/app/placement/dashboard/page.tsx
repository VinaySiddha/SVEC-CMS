'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Home,
  BarChart3,
  Users,
  Briefcase,
  TrendingUp,
  Database,
  ArrowLeft
} from 'lucide-react';

interface PlacementStats {
  academic_year: string;
  category: 'UG' | 'PG';
  total_placed: number;
  average_package: number;
  highest_package: number;
  lowest_package: number;
  companies_visited: number;
}

interface PlacementDetails {
  academic_year: string;
  branch: string;
  category: 'UG' | 'PG';
  placed: number;
  not_placed: number;
  higher_studies: number;
}

interface PlacementStaff {
  id: number;
  name: string;
  designation: string;
  branch: string;
  email: string;
  phone?: string;
}

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
              <p className="text-lg text-gray-600">Department Management</p>
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

function PlacementStaffCard({ staff }: { staff: PlacementStaff }) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-2xl font-bold text-white">{staff.name[0]}</span>
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold text-gray-800">{staff.name}</h3>
            <p className="text-sm text-gray-600">{staff.designation}</p>
            <p className="text-xs text-gray-500 font-medium bg-blue-100 inline-block px-2 py-1 rounded">
              {staff.branch}
            </p>
            <div className="flex flex-col gap-1 mt-3 text-sm">
              <p className="text-gray-700">
                <span className="font-medium">Email:</span>{' '}
                <a href={`mailto:${staff.email}`} className="text-blue-600 hover:underline">
                  {staff.email}
                </a>
              </p>
              {staff.phone && (
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {staff.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  subtext,
  color
}: {
  icon: any;
  title: string;
  value: string | number;
  subtext?: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {subtext && <p className={`text-xs ${color}`}>{subtext}</p>}
          </div>
          <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function YearDetailAccordion({
  year,
  stats,
  details,
  index
}: {
  year: string;
  stats?: PlacementStats;
  details?: PlacementDetails[];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="mb-3 border border-red-200/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium px-6 py-4 flex items-center justify-between transition-colors"
      >
        <span className="text-lg">+ Placement Details of {year}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="bg-white p-6 space-y-6">
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 font-medium">Total Placed</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total_placed}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 font-medium">Companies Visited</p>
                <p className="text-2xl font-bold text-green-900">{stats.companies_visited}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600 font-medium">Average Package</p>
                <p className="text-2xl font-bold text-purple-900">₹{stats.average_package.toFixed(2)} LPA</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-600 font-medium">Highest Package</p>
                <p className="text-2xl font-bold text-orange-900">₹{stats.highest_package.toFixed(2)} LPA</p>
              </div>
            </div>
          )}

          {details && details.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Branch-wise Breakdown
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Branch</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Placed</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Not Placed</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Higher Studies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((detail, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">{detail.branch}</td>
                        <td className="px-4 py-3 text-center text-green-600 font-semibold">
                          {detail.placed}
                        </td>
                        <td className="px-4 py-3 text-center text-red-600 font-semibold">
                          {detail.not_placed}
                        </td>
                        <td className="px-4 py-3 text-center text-blue-600 font-semibold">
                          {detail.higher_studies}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PlacementDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [staffList, setStaffList] = useState<PlacementStaff[]>([]);
  const [placementStats, setPlacementStats] = useState<PlacementStats[]>([]);
  const [placementDetails, setPlacementDetails] = useState<PlacementDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'placement')) {
      router.replace('/auth/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch placement staff
        const staffRes = await fetch('/api/placement/staff');
        if (staffRes.ok) {
          setStaffList(await staffRes.json());
        }

        // Fetch placement statistics
        const statsRes = await fetch('/api/placement/statistics');
        if (statsRes.ok) {
          setPlacementStats(await statsRes.json());
        }

        // Fetch placement details
        const detailsRes = await fetch('/api/placement/details');
        if (detailsRes.ok) {
          setPlacementDetails(await detailsRes.json());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

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

  const groupedStats = placementStats.reduce((acc: any, stat) => {
    if (!acc[stat.academic_year]) {
      acc[stat.academic_year] = { UG: null, PG: null };
    }
    acc[stat.academic_year][stat.category] = stat;
    return acc;
  }, {});

  const getDetailsForYear = (year: string) => {
    return placementDetails.filter((d) => d.academic_year === year);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <PlacementHeader user={user} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Users}
            title="Total Staff Members"
            value={staffList.length}
            subtext="Active coordinators"
            color="blue"
          />
          <StatCard
            icon={TrendingUp}
            title="Statistics Years"
            value={Object.keys(groupedStats).length}
            subtext="Historical data"
            color="green"
          />
          <StatCard
            icon={Briefcase}
            title="Total Placements"
            value={placementStats.reduce((sum, s) => sum + s.total_placed, 0)}
            subtext="All categories"
            color="orange"
          />
        </div>

        {/* College Profile Section - Placeholder */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white pb-4">
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              College Placement Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-gray-700 mb-4">
                At our college, we don't just prepare students for careers; we ignite their passions and propel them
                towards success. Our placement program is more than a bridge to the professional world; it's a launchpad
                for dreams and aspirations.
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700">+ Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Placement Staff Section */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Placement Staff & Coordinators
              </CardTitle>
              <Input
                type="search"
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {staffList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {staffList
                  .filter(
                    (s) =>
                      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((staff) => (
                    <PlacementStaffCard key={staff.id} staff={staff} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No placement staff found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Placement Details by Year */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white pb-4">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Year-wise Placement Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {Object.keys(groupedStats)
              .sort()
              .reverse()
              .map((year, index) => (
                <YearDetailAccordion
                  key={year}
                  year={year}
                  stats={groupedStats[year].UG || groupedStats[year].PG}
                  details={getDetailsForYear(year)}
                  index={index}
                />
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
