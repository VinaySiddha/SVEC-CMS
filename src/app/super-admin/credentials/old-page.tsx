"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Key,
  Calendar,
  User,
  Building2,
  Shield,
  Users,
  Settings,
  Clock,
  Mail,
  Lock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserPlus,
  Download
} from 'lucide-react';

interface DepartmentUser {
  id: number;
  username: string;
  email: string;
  department: string;
  department_name: string;
  role: 'dept' | 'admin';
  access_level: 'read' | 'write' | 'admin';
  allowed_modules: string[];
  is_active: boolean;
  expires_at: string | null;
  last_login: string | null;
  login_count: number;
  session_timeout: number;
  max_sessions: number;
  notes: string | null;
  created_at: string;
  created_by: string;
  password_changed_at: string | null;
  must_change_password: boolean;
}

interface CreateUserForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  role: 'dept' | 'admin';
  access_level: 'read' | 'write' | 'admin';
  allowed_modules: string[];
  expires_at: string;
  notes: string;
  session_timeout: number;
  max_sessions: number;
  must_change_password: boolean;
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

const MODULES = [
  { id: 'faculty_profiles', name: 'Faculty Profiles', description: 'Manage faculty information and profiles' },
  { id: 'student_achievements', name: 'Student Achievements', description: 'Track and manage student accomplishments' },
  { id: 'faculty_achievements', name: 'Faculty Achievements', description: 'Record faculty achievements and awards' },
  { id: 'workshops', name: 'Workshops', description: 'Organize and manage workshops and training' },
  { id: 'fdp', name: 'Faculty Development Programs', description: 'FDP management and tracking' },
  { id: 'organized_events', name: 'Organized Events', description: 'Event planning and management' },
  { id: 'placements', name: 'Placements', description: 'Student placement and career services' },
  { id: 'labs', name: 'Laboratory Management', description: 'Lab resources and equipment management' },
  { id: 'industry_news', name: 'Industry News', description: 'Industry updates and news management' },
  { id: 'mous', name: 'MOUs', description: 'Memorandum of Understanding management' },
  { id: 'content_management', name: 'Content Management', description: 'Website content and media management' }
];

const ACCESS_LEVELS = {
  'read': { 
    name: 'Read Only', 
    description: 'View data and generate reports',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  'write': { 
    name: 'Read & Write', 
    description: 'View and modify data, limited admin functions',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  'admin': { 
    name: 'Full Admin', 
    description: 'Full control over department data and settings',
    color: 'bg-red-100 text-red-800 border-red-200'
  }
};

const CredentialManagement = () => {
  const [users, setUsers] = useState<DepartmentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<DepartmentUser | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  
  const [createForm, setCreateForm] = useState<CreateUserForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    role: 'dept',
    access_level: 'read',
    allowed_modules: [],
    expires_at: '',
    notes: '',
    session_timeout: 28800, // 8 hours
    max_sessions: 1,
    must_change_password: false
  });
  
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    inactive_users: 0,
    users_by_department: {} as Record<string, number>,
    users_by_access_level: {} as Record<string, number>
  });

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await fetch('/api/super-admin/credentials');
      if (response.ok) {
        const data = await response.json();
        setCredentials(data.credentials || []);
      }
    } catch (error) {
      console.error('Failed to fetch credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCredential = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch('/api/super-admin/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || 'Failed to create credential');
        return;
      }

      // Reset form and refresh list
      setCreateForm({
        username: '',
        email: '',
        password: '',
        department: '',
        access_level: 'read',
        specific_modules: [],
        expires_at: '',
        notes: '',
        session_timeout: 28800
      });
      setShowCreateForm(false);
      await fetchCredentials();

    } catch (error) {
      setFormError('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormChange = (field: keyof CreateCredentialForm, value: any) => {
    setCreateForm(prev => ({
      ...prev,
      [field]: value
    }));
    if (formError) setFormError('');
  };

  const handleModuleToggle = (module: string) => {
    setCreateForm(prev => ({
      ...prev,
      specific_modules: prev.specific_modules.includes(module)
        ? prev.specific_modules.filter(m => m !== module)
        : [...prev.specific_modules, module]
    }));
  };

  const filteredCredentials = credentials.filter(credential => {
    const matchesSearch = credential.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credential.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credential.department_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || credential.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'write': return 'bg-orange-100 text-orange-800';
      case 'read': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Credential Management</h1>
          <p className="text-gray-600">Create and manage department user credentials</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Credential
        </Button>
      </div>

      {/* Create Credential Modal */}
      {showCreateForm && (
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Create New Department Credential
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleCreateCredential} className="space-y-6">
              {formError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {formError}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={createForm.username}
                    onChange={(e) => handleFormChange('username', e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={createForm.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={createForm.password}
                    onChange={(e) => handleFormChange('password', e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={createForm.department}
                    onValueChange={(value) => handleFormChange('department', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(DEPARTMENTS).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="access_level">Access Level</Label>
                  <Select
                    value={createForm.access_level}
                    onValueChange={(value: 'read' | 'write' | 'admin') => handleFormChange('access_level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Read Only</SelectItem>
                      <SelectItem value="write">Read & Write</SelectItem>
                      <SelectItem value="admin">Admin Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expires_at">Expires At</Label>
                  <Input
                    id="expires_at"
                    type="datetime-local"
                    value={createForm.expires_at}
                    onChange={(e) => handleFormChange('expires_at', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Specific Modules Access</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {MODULES.map(module => (
                    <label key={module} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={createForm.specific_modules.includes(module)}
                        onChange={() => handleModuleToggle(module)}
                        className="rounded"
                      />
                      <span className="text-sm capitalize">
                        {module.replace(/_/g, ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={createForm.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  placeholder="Optional notes about this credential"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  disabled={formLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? 'Creating...' : 'Create Credential'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by username, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {Object.entries(DEPARTMENTS).map(([code, name]) => (
                <SelectItem key={code} value={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Credentials List */}
      <div className="space-y-4">
        {filteredCredentials.length > 0 ? (
          filteredCredentials.map((credential) => (
            <Card key={credential.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{credential.username}</h3>
                        <p className="text-sm text-gray-600">{credential.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={credential.is_active ? 'default' : 'destructive'}>
                          {credential.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="secondary" className={getAccessLevelColor(credential.access_level)}>
                          {credential.access_level}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        {credential.department_name}
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        {credential.login_count} logins
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Created: {new Date(credential.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {credential.last_login && (
                      <p className="text-xs text-gray-500 mt-2">
                        Last login: {new Date(credential.last_login).toLocaleString()}
                      </p>
                    )}

                    {credential.expires_at && (
                      <p className="text-xs text-orange-600 mt-1">
                        Expires: {new Date(credential.expires_at).toLocaleString()}
                      </p>
                    )}

                    {credential.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        "{credential.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Key className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No credentials found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterDepartment !== 'all'
                  ? 'No credentials match your current filters.'
                  : 'Create your first department credential to get started.'
                }
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Credential
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CredentialManagement;