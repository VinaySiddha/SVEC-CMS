"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload
} from 'lucide-react';

interface DataRecord {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  status?: string;
  [key: string]: any;
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

const DepartmentModuleManagement = () => {
  const params = useParams();
  const department = params.department as string;
  const module = params.module as string;
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<DataRecord | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const departmentName = DEPARTMENTS[department as keyof typeof DEPARTMENTS] || department;
  const moduleTitle = module.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  useEffect(() => {
    if (department && module) {
      fetchModuleData();
    }
  }, [department, module]);

  const fetchModuleData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/super-admin/data-management/${department}/${module}`);
      if (!response.ok) throw new Error('Failed to fetch module data');
      
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error('Error fetching module data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
      const response = await fetch(`/api/super-admin/data-management/${department}/${module}/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setData(data.filter(record => record.id !== id));
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const filteredData = data.filter(record => {
    const matchesSearch = (record.title || record.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (record.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading {moduleTitle} data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {moduleTitle} - {departmentName}
              </h1>
              <p className="text-gray-600">
                Manage {moduleTitle.toLowerCase()} for {department.toUpperCase()} department
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-4 py-2">
                {data.length} Records
              </Badge>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={`Search ${moduleTitle.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{moduleTitle} ({filteredData.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Title/Name</th>
                    <th className="text-left p-4">Description</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Created</th>
                    <th className="text-left p-4">Updated</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">
                          {record.title || record.name || `Record #${record.id}`}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {record.description || 'No description available'}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge 
                          className={
                            record.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {record.status || 'Active'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          {new Date(record.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          {new Date(record.updated_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedRecord(record);
                              setShowDetails(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(record.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    {/* Icon would go here */}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                  <p className="text-gray-500">
                    {searchTerm || filterStatus !== 'all'
                      ? 'Try adjusting your search or filters'
                      : `No ${moduleTitle.toLowerCase()} records found for this department`
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Record Details</DialogTitle>
            </DialogHeader>
            
            {selectedRecord && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Title/Name</label>
                    <p className="text-lg font-medium">
                      {selectedRecord.title || selectedRecord.name || `Record #${selectedRecord.id}`}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <Badge>{selectedRecord.status || 'Active'}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="mt-1">
                    {selectedRecord.description || 'No description available'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created At</label>
                    <p>{new Date(selectedRecord.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Updated At</label>
                    <p>{new Date(selectedRecord.updated_at).toLocaleString()}</p>
                  </div>
                </div>

                {/* Display other fields */}
                <div>
                  <label className="text-sm font-medium text-gray-500">Additional Data</label>
                  <div className="mt-2 space-y-2">
                    {Object.entries(selectedRecord).map(([key, value]) => {
                      if (['id', 'title', 'name', 'description', 'status', 'created_at', 'updated_at'].includes(key)) {
                        return null;
                      }
                      return (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="font-medium">{key.replace(/_/g, ' ').toUpperCase()}:</span>
                          <span>{String(value)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DepartmentModuleManagement;