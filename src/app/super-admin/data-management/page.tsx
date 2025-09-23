"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Users, 
  GraduationCap,
  Award,
  Building2,
  Calendar,
  Briefcase,
  FlaskConical,
  BookOpen,
  TrendingUp,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Plus,
  BarChart3
} from 'lucide-react';

interface DataStats {
  faculty_profiles: number;
  student_achievements: number;
  faculty_achievements: number;
  placements: number;
  workshops: number;
  organized_events: number;
  labs: number;
  fdp: number;
  industry_news: number;
  total_records: number;
}

interface DepartmentData {
  department: string;
  department_name: string;
  stats: DataStats;
  last_updated: string;
}

const DEPARTMENTS = {
  'cse': 'Computer Science and Engineering',
  'cseai': 'CSE (Artificial Intelligence)', 
  'cseds': 'CSE (Data Science)',
  'aiml': 'Artificial Intelligence and Machine Learning',
  'cst': 'Computer Science and Technology',
  'ece': 'Electronics and Communication Engineering',
  'ect': 'Electronics and Communication Technology',
  'eee': 'Electrical and Electronics Engineering', 
  'civil': 'Civil Engineering',
  'mech': 'Mechanical Engineering',
  'mba': 'Master of Business Administration',
  'bsh': 'Basic Sciences and Humanities'
};

const DATA_MODULES = [
  { id: 'faculty_profiles', name: 'Faculty Profiles', icon: Users, description: 'Faculty information and profiles' },
  { id: 'student_achievements', name: 'Student Achievements', icon: Award, description: 'Student accomplishments and awards' },
  { id: 'faculty_achievements', name: 'Faculty Achievements', icon: GraduationCap, description: 'Faculty achievements and recognitions' },
  { id: 'placements', name: 'Placements', icon: Briefcase, description: 'Student placement records' },
  { id: 'workshops', name: 'Workshops', icon: BookOpen, description: 'Workshop and training programs' },
  { id: 'organized_events', name: 'Organized Events', icon: Calendar, description: 'Events organized by departments' },
  { id: 'labs', name: 'Laboratory Management', icon: FlaskConical, description: 'Lab facilities and equipment' },
  { id: 'fdp', name: 'Faculty Development Programs', icon: TrendingUp, description: 'FDP participation and organization' },
  { id: 'industry_news', name: 'Industry News', icon: BarChart3, description: 'Industry updates and news' }
];

const SuperAdminDataManagement = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const fetchDataOverview = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/super-admin/data-management/overview');
      if (!response.ok) throw new Error('Failed to fetch data overview');
      
      const data = await response.json();
      setDepartmentData(data.departments || []);
    } catch (error) {
      console.error('Error fetching data overview:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalStats = () => {
    return departmentData.reduce((totals, dept) => {
      Object.keys(dept.stats).forEach(key => {
        if (key !== 'total_records') {
          totals[key] = (totals[key] || 0) + dept.stats[key as keyof DataStats];
        }
      });
      return totals;
    }, {} as Record<string, number>);
  };

  const filteredDepartments = departmentData.filter(dept => {
    const matchesDepartment = selectedDepartment === 'all' || dept.department === selectedDepartment;
    const matchesSearch = dept.department_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data overview...</p>
        </div>
      </div>
    );
  }

  const totalStats = getTotalStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Management</h1>
              <p className="text-gray-600">Manage all department data across the institution</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Bulk Operations
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">By Department</TabsTrigger>
            <TabsTrigger value="modules">By Module</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Global Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {DATA_MODULES.map((module) => (
                <Card key={module.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{module.name}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {totalStats[module.id] || 0}
                        </p>
                      </div>
                      <module.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Department Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentData.map((dept) => (
                <Card key={dept.department} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{dept.department_name}</CardTitle>
                      <Badge variant="outline">{dept.department.toUpperCase()}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{dept.stats.total_records}</p>
                        <p className="text-sm text-gray-600">Total Records</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Faculty:</span>
                          <span className="font-medium">{dept.stats.faculty_profiles}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Students:</span>
                          <span className="font-medium">{dept.stats.student_achievements}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Placements:</span>
                          <span className="font-medium">{dept.stats.placements}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Events:</span>
                          <span className="font-medium">{dept.stats.organized_events}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-3">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedDepartment(dept.department);
                            setActiveTab('departments');
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 flex gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search departments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {Object.entries(DEPARTMENTS).map(([key, name]) => (
                          <SelectItem key={key} value={key}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Data Management */}
            <div className="grid grid-cols-1 gap-6">
              {filteredDepartments.map((dept) => (
                <Card key={dept.department}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{dept.department_name}</CardTitle>
                        <p className="text-sm text-gray-500">
                          Last updated: {new Date(dept.last_updated).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">{dept.department.toUpperCase()}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {DATA_MODULES.map((module) => (
                        <div key={module.id} className="text-center p-4 border rounded-lg hover:bg-gray-50">
                          <module.icon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                          <p className="text-sm font-medium">{module.name}</p>
                          <p className="text-lg font-bold text-blue-600">
                            {dept.stats[module.id as keyof DataStats] || 0}
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mt-2"
                            onClick={() => {
                              // Navigate to specific module management
                              router.push(`/super-admin/data/${dept.department}/${module.id}`);
                            }}
                          >
                            Manage
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            {/* Module Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DATA_MODULES.map((module) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <module.icon className="h-8 w-8 text-blue-600" />
                      <div>
                        <CardTitle>{module.name}</CardTitle>
                        <p className="text-sm text-gray-500">{module.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-3xl font-bold text-blue-600">
                          {totalStats[module.id] || 0}
                        </p>
                        <p className="text-sm text-gray-600">Total Records</p>
                      </div>
                      
                      <div className="space-y-2">
                        {departmentData
                          .filter(dept => (dept.stats[module.id as keyof DataStats] || 0) > 0)
                          .sort((a, b) => (b.stats[module.id as keyof DataStats] || 0) - (a.stats[module.id as keyof DataStats] || 0))
                          .slice(0, 5)
                          .map(dept => (
                            <div key={dept.department} className="flex justify-between text-sm">
                              <span>{dept.department.toUpperCase()}</span>
                              <span className="font-medium">
                                {dept.stats[module.id as keyof DataStats] || 0}
                              </span>
                            </div>
                          ))
                        }
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          // Navigate to module-specific management
                          router.push(`/super-admin/data/module/${module.id}`);
                        }}
                      >
                        Manage All {module.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Growth Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Analytics charts and insights will be implemented here.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Performance metrics and comparisons will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDataManagement;