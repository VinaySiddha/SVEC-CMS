"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Users, 
  TrendingUp,
  Activity,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Mail,
  Phone,
  Calendar,
  Award
} from 'lucide-react';

interface Department {
  code: string;
  name: string;
  hod_name: string;
  hod_image: string | null;
  vision: string | null;
  mission: string | null;
  about: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  statistics: {
    user_count: number;
    faculty_count: number;
    student_achievements: number;
    faculty_achievements: number;
  };
  recent_activities: Array<{
    action: string;
    user_name: string | null;
    created_at: string;
  }>;
}

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/super-admin/departments');
      if (response.ok) {
        const data = await response.json();
        setDepartments(data.departments || []);
      }
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.hod_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const DepartmentCard = ({ department }: { department: Department }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{department.name}</CardTitle>
              <p className="text-sm text-gray-600">{department.code.toUpperCase()}</p>
            </div>
          </div>
          <Badge variant="secondary" className={getStatusColor(department.status)}>
            {department.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* HOD Information */}
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm">
              <strong>HOD:</strong> {department.hod_name}
            </span>
          </div>

          {/* Contact Information */}
          {department.contact_email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{department.contact_email}</span>
            </div>
          )}

          {department.contact_phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{department.contact_phone}</span>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {department.statistics.user_count}
              </div>
              <div className="text-xs text-gray-600">Users</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {department.statistics.faculty_count}
              </div>
              <div className="text-xs text-gray-600">Faculty</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">
                {department.statistics.student_achievements}
              </div>
              <div className="text-xs text-gray-600">Student Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {department.statistics.faculty_achievements}
              </div>
              <div className="text-xs text-gray-600">Faculty Achievements</div>
            </div>
          </div>

          {/* Recent Activity */}
          {department.recent_activities.length > 0 && (
            <div className="pt-3 border-t">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Recent Activity</span>
              </div>
              <div className="space-y-1">
                {department.recent_activities.slice(0, 3).map((activity, idx) => (
                  <div key={idx} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <div className="font-medium">
                      {activity.action.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
                    </div>
                    <div className="flex justify-between">
                      <span>{activity.user_name || 'System'}</span>
                      <span>{new Date(activity.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDepartment(department)}
            >
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Manage
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DepartmentDetailModal = ({ department }: { department: Department }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{department.name}</CardTitle>
              <p className="text-gray-600">{department.code.toUpperCase()}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDepartment(null)}
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Department Information</h3>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Head of Department</label>
                <p className="text-gray-900">{department.hod_name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(department.status)}>
                    {department.status}
                  </Badge>
                </div>
              </div>

              {department.contact_email && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{department.contact_email}</p>
                </div>
              )}

              {department.contact_phone && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900">{department.contact_phone}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-600">Created</label>
                <p className="text-gray-900">
                  {new Date(department.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {department.statistics.user_count}
                  </div>
                  <div className="text-sm text-blue-700">Total Users</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {department.statistics.faculty_count}
                  </div>
                  <div className="text-sm text-green-700">Faculty Members</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {department.statistics.student_achievements}
                  </div>
                  <div className="text-sm text-purple-700">Student Achievements</div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {department.statistics.faculty_achievements}
                  </div>
                  <div className="text-sm text-orange-700">Faculty Achievements</div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          {(department.vision || department.mission) && (
            <div className="mt-6 space-y-4">
              {department.vision && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Vision</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {department.vision}
                  </p>
                </div>
              )}
              
              {department.mission && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Mission</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {department.mission}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* About */}
          {department.about && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">About</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {department.about}
              </p>
            </div>
          )}

          {/* Recent Activities */}
          {department.recent_activities.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Recent Activities</h4>
              <div className="space-y-2">
                {department.recent_activities.map((activity, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">
                          {activity.action.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
                        </p>
                        <p className="text-xs text-gray-600">
                          by {activity.user_name || 'System'}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Department Management</h1>
          <p className="text-gray-600">Manage all department data and access</p>
        </div>
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {departments.length}
            </div>
            <div className="text-sm text-gray-600">Total Departments</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {departments.reduce((sum, dept) => sum + dept.statistics.user_count, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {departments.reduce((sum, dept) => sum + dept.statistics.faculty_count, 0)}
            </div>
            <div className="text-sm text-gray-600">Faculty Members</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {departments.filter(dept => dept.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Active Departments</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search departments by name, code, or HOD..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <DepartmentCard key={department.code} department={department} />
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? 'No departments match your search criteria.'
                : 'No departments have been added yet.'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Department Detail Modal */}
      {selectedDepartment && (
        <DepartmentDetailModal department={selectedDepartment} />
      )}
    </div>
  );
};

export default DepartmentManagement;