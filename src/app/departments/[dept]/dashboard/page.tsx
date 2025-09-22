'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Award, Settings, BarChart, Calendar, Building } from 'lucide-react';
import Link from 'next/link';

interface DepartmentDashboardProps {
  params: Promise<{ dept: string }>;
}

export default function DepartmentDashboard({ params }: DepartmentDashboardProps) {
  const [dept, setDept] = useState<string>('');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Resolve the params promise
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setDept(resolvedParams.dept);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth/login');
      return;
    }

    // Check if user has permission for this department
    if (user.role !== 'admin' && user.department !== dept && dept) {
      router.push('/unauthorized');
      return;
    }
  }, [user, isAuthenticated, dept, router]);

  if (!user || !dept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getDepartmentName = (code: string) => {
    const departments: { [key: string]: string } = {
      'cse': 'Computer Science and Engineering',
      'ece': 'Electronics and Communication Engineering',
      'eee': 'Electrical and Electronics Engineering',
      'mech': 'Mechanical Engineering',
      'civil': 'Civil Engineering',
      'aiml': 'Artificial Intelligence and Machine Learning',
      'ds': 'Data Science',
      'mba': 'Master of Business Administration',
      'bsh': 'Basic Sciences and Humanities'
    };
    return departments[code] || code.toUpperCase();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{getDepartmentName(dept)}</h1>
          <p className="text-muted-foreground">Department Dashboard</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Logged in as</p>
          <p className="font-semibold">{user.username} ({user.role})</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href={`/departments/${dept}/data-management`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Management</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Manage faculty, labs, achievements and more
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              Active faculty members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laboratories</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Research & teaching labs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">
              Enrolled students
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest updates and activities in your department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Award className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">New faculty achievement added</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Faculty profile updated</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Workshop scheduled</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href={`/departments/${dept}/data-management`}>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Manage Department Data
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start" disabled>
              <BarChart className="h-4 w-4 mr-2" />
              View Analytics (Coming Soon)
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled>
              <Award className="h-4 w-4 mr-2" />
              Generate Reports (Coming Soon)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Info</CardTitle>
            <CardDescription>Department overview and details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Department Code</p>
                <p className="text-sm text-muted-foreground">{dept.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Your Role</p>
                <p className="text-sm text-muted-foreground">{user.role}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Access Level</p>
                <p className="text-sm text-muted-foreground">
                  {user.role === 'admin' ? 'Full Access' : 'Department Access'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
