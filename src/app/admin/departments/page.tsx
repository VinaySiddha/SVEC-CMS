'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { apiGet } from '@/lib/api';
import { 
  Search, 
  Users, 
  BookOpen, 
  Building2, 
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

interface Department {
  code: string;
  name: string;
  totalRecords: number;
  modules: Array<{
    name: string;
    count: number;
    tableName: string;
  }>;
  moduleCount: number;
}

interface AdminData {
  overview: {
    totalDepartments: number;
    totalModules: number;
    totalRecords: number;
    activeDepartments: number;
  };
  departments: Department[];
}

export default function DepartmentsPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await apiGet('/api/admin/modules');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        // Validate data structure before setting state
        if (result.data.departments && Array.isArray(result.data.departments)) {
          setData(result.data);
        } else {
          // Set default data structure to prevent errors
          setData({
            overview: {
              totalDepartments: 0,
              totalModules: 0,
              totalRecords: 0,
              activeDepartments: 0
            },
            departments: []
          });
        }
      } else {
        setData({
          overview: {
            totalDepartments: 0,
            totalModules: 0,
            totalRecords: 0,
            activeDepartments: 0
          },
          departments: []
        });
      }
    } catch (error) {
      // Set fallback data to prevent undefined errors
      setData({
        overview: {
          totalDepartments: 0,
          totalModules: 0,
          totalRecords: 0,
          activeDepartments: 0
        },
        departments: []
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = data?.departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600">Manage all department modules and data</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Statistics Cards */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.overview.totalDepartments}</div>
              <p className="text-xs text-muted-foreground">
                {data.overview.activeDepartments} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.overview.totalModules}</div>
              <p className="text-xs text-muted-foreground">
                Across all departments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.overview.totalRecords.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Database entries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((data.overview.activeDepartments / data.overview.totalDepartments) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Departments with data
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.code} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{department.name}</CardTitle>
                  <CardDescription className="uppercase font-mono">
                    {department.code}
                  </CardDescription>
                </div>
                <Badge variant={department.totalRecords > 0 ? "default" : "secondary"}>
                  {department.totalRecords > 0 ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Modules</p>
                    <p className="font-semibold">{department.moduleCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Records</p>
                    <p className="font-semibold">{department.totalRecords.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Available Modules:</p>
                  <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                    {(department.modules || []).map((module) => (
                      <div key={module.name} className="flex justify-between text-xs p-1 bg-gray-50 rounded">
                        <span className="text-gray-600 capitalize truncate">
                          {module.name.replace(/[-_]/g, ' ')}
                        </span>
                        <span className="font-medium text-blue-600">{module.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedDepartment(department)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Manage Modules
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first department.'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Department Module Management Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedDepartment.name}</CardTitle>
                  <CardDescription>
                    Manage all modules for {selectedDepartment.code.toUpperCase()} department
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedDepartment(null)}>
                  <span className="text-xl">×</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-lg mb-2">Department Modules</h4>
                    <p className="text-gray-600 text-sm">
                      Click "Manage" to edit records for each module. Each module corresponds to a separate database table.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(selectedDepartment?.modules || []).map((module) => (
                      <Card key={module.name} className="hover:shadow-md transition-shadow border-2 hover:border-blue-200">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-sm capitalize">
                                {module.name.replace(/[-_]/g, ' ')}
                              </h5>
                              <Badge variant={module.count > 0 ? "default" : "secondary"}>
                                {module.count} records
                              </Badge>
                            </div>
                            
                            <div className="text-xs text-gray-500">
                              <div className="bg-gray-100 p-2 rounded font-mono text-xs">
                                Table: {module.tableName}
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs"
                                onClick={() => {
                                  // Navigate to module management page
                                  window.location.href = `/admin/departments/${selectedDepartment.code}/${module.name}?table=${module.tableName}`;
                                }}
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Manage
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={() => {
                                  // Navigate to add new record page
                                  window.location.href = `/admin/departments/${selectedDepartment.code}/${module.name}/add?table=${module.tableName}`;
                                }}
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add New
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {(!selectedDepartment?.modules || selectedDepartment.modules.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                      <p>No modules found for this department</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}