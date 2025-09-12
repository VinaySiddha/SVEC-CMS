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
  Download,
  Activity,
  AlertCircle
} from 'lucide-react';

interface DepartmentUser {
  id: number;
  username: string;
  email: string;
  department: string;
  department_name: string;
  role: 'dept' | 'admin';
  access_level?: 'read' | 'write' | 'admin'; // Optional since it doesn't exist in DB
  allowed_modules?: string[]; // Optional since it doesn't exist in DB
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
  access_level?: 'read' | 'write' | 'admin'; // Optional
  allowed_modules?: string[]; // Optional
  expires_at?: string; // Optional
  notes?: string; // Optional
  session_timeout?: number; // Optional
  max_sessions?: number; // Optional
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

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/super-admin/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      setUsers(data.users || []);
      setStats(data.stats || {
        total_users: 0,
        active_users: 0,
        inactive_users: 0,
        users_by_department: {},
        users_by_access_level: {}
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    // Validation
    if (createForm.password !== createForm.confirmPassword) {
      setFormError('Passwords do not match');
      setFormLoading(false);
      return;
    }

    if (createForm.password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      setFormLoading(false);
      return;
    }

    if (!createForm.username || !createForm.email || !createForm.department) {
      setFormError('Please fill in all required fields');
      setFormLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/super-admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create user');
      }

      await fetchUsers();
      setShowCreateDialog(false);
      resetForm();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const resetForm = () => {
    setCreateForm({
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
      session_timeout: 28800,
      max_sessions: 1,
      must_change_password: false
    });
    setFormError('');
  };

  const handleToggleUserStatus = async (userId: number, isActive: boolean) => {
    try {
      const response = await fetch(`/api/super-admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !isActive })
      });

      if (response.ok) {
        await fetchUsers();
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/super-admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || user.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && user.is_active) ||
                         (filterStatus === 'inactive' && !user.is_active);

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleModuleToggle = (moduleId: string) => {
    setCreateForm(prev => ({
      ...prev,
      allowed_modules: (prev.allowed_modules || []).includes(moduleId)
        ? (prev.allowed_modules || []).filter(id => id !== moduleId)
        : [...(prev.allowed_modules || []), moduleId]
    }));
  };

  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return 'Never';
    return new Date(lastLogin).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
              <p className="text-gray-600">Create and manage department credentials with granular permissions</p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create New User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Department User</DialogTitle>
                  <DialogDescription>
                    Add a new user with specific department access and permissions
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleCreateUser} className="space-y-6">
                  {formError && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">{formError}</AlertDescription>
                    </Alert>
                  )}

                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="permissions">Permissions</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="username">Username*</Label>
                          <Input
                            id="username"
                            value={createForm.username}
                            onChange={(e) => setCreateForm(prev => ({ ...prev, username: e.target.value }))}
                            placeholder="Enter username"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email*</Label>
                          <Input
                            id="email"
                            type="email"
                            value={createForm.email}
                            onChange={(e) => setCreateForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter email address"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="password">Password*</Label>
                          <Input
                            id="password"
                            type="password"
                            value={createForm.password}
                            onChange={(e) => setCreateForm(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter password"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password*</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={createForm.confirmPassword}
                            onChange={(e) => setCreateForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            placeholder="Confirm password"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="department">Department*</Label>
                          <Select 
                            value={createForm.department} 
                            onValueChange={(value) => setCreateForm(prev => ({ ...prev, department: value }))}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(DEPARTMENTS).map(([key, name]) => (
                                <SelectItem key={key} value={key}>{name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="role">User Role</Label>
                          <Select 
                            value={createForm.role} 
                            onValueChange={(value: 'dept' | 'admin') => setCreateForm(prev => ({ ...prev, role: value }))}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dept">Department User</SelectItem>
                              <SelectItem value="admin">Department Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="permissions" className="space-y-4">
                      <div>
                        <Label htmlFor="access_level">Access Level</Label>
                        <Select 
                          value={createForm.access_level} 
                          onValueChange={(value: 'read' | 'write' | 'admin') => 
                            setCreateForm(prev => ({ ...prev, access_level: value }))
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(ACCESS_LEVELS).map(([level, config]) => (
                              <SelectItem key={level} value={level}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{config.name}</span>
                                  <span className="text-sm text-gray-500">{config.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Allowed Modules</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2 max-h-64 overflow-y-auto">
                          {MODULES.map((module) => (
                            <div key={module.id} className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                              <Checkbox
                                id={module.id}
                                checked={(createForm.allowed_modules || []).includes(module.id)}
                                onCheckedChange={() => handleModuleToggle(module.id)}
                              />
                              <div className="flex-1">
                                <Label htmlFor={module.id} className="text-sm font-medium cursor-pointer">
                                  {module.name}
                                </Label>
                                <p className="text-xs text-gray-500">{module.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-4">
                      <div>
                        <Label htmlFor="expires_at">Account Expiry (Optional)</Label>
                        <Input
                          id="expires_at"
                          type="datetime-local"
                          value={createForm.expires_at}
                          onChange={(e) => setCreateForm(prev => ({ ...prev, expires_at: e.target.value }))}
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="session_timeout">Session Timeout (seconds)</Label>
                          <Input
                            id="session_timeout"
                            type="number"
                            value={createForm.session_timeout}
                            onChange={(e) => setCreateForm(prev => ({ ...prev, session_timeout: parseInt(e.target.value) || 28800 }))}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="max_sessions">Max Concurrent Sessions</Label>
                          <Input
                            id="max_sessions"
                            type="number"
                            min="1"
                            max="10"
                            value={createForm.max_sessions}
                            onChange={(e) => setCreateForm(prev => ({ ...prev, max_sessions: parseInt(e.target.value) || 1 }))}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="must_change_password"
                          checked={createForm.must_change_password}
                          onCheckedChange={(checked) => 
                            setCreateForm(prev => ({ ...prev, must_change_password: checked as boolean }))
                          }
                        />
                        <Label htmlFor="must_change_password">Require password change on first login</Label>
                      </div>

                      <div>
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={createForm.notes}
                          onChange={(e) => setCreateForm(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Add any additional notes about this user..."
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowCreateDialog(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={formLoading} className="bg-blue-600 hover:bg-blue-700">
                      {formLoading ? 'Creating...' : 'Create User'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total_users}</p>
                </div>
                <Users className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-green-600">{stats.active_users}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive Users</p>
                  <p className="text-3xl font-bold text-red-600">{stats.inactive_users}</p>
                </div>
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-3xl font-bold text-purple-600">{Object.keys(stats.users_by_department).length}</p>
                </div>
                <Building2 className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
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
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Department Users ({filteredUsers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">User</th>
                    <th className="text-left p-4">Department</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Access Level</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Last Login</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user.username[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{user.username}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{user.department_name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={ACCESS_LEVELS[user.access_level || 'read']?.color || 'bg-gray-100 text-gray-800 border-gray-200'}>
                          {ACCESS_LEVELS[user.access_level || 'read']?.name || 'Unknown'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={user.is_active}
                            onCheckedChange={() => handleToggleUserStatus(user.id, user.is_active)}
                            className="data-[state=checked]:bg-green-600"
                          />
                          <span className={`text-sm ${user.is_active ? 'text-green-600' : 'text-red-600'}`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{formatLastLogin(user.last_login)}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserDetails(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              // Handle edit user
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteUser(user.id)}
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

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-500">
                    {searchTerm || filterDepartment !== 'all' || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Create your first department user to get started'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Details Dialog */}
        <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            
            {selectedUser && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Username</Label>
                    <p className="text-lg font-medium">{selectedUser.username}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="text-lg">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Department</Label>
                    <p className="text-lg">{selectedUser.department_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Role</Label>
                    <Badge className="capitalize">{selectedUser.role}</Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Access Level</Label>
                  <div className="mt-1">
                    <Badge className={ACCESS_LEVELS[selectedUser.access_level || 'read']?.color || 'bg-gray-100 text-gray-800 border-gray-200'}>
                      {ACCESS_LEVELS[selectedUser.access_level || 'read']?.name || 'Unknown'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Allowed Modules</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(selectedUser.allowed_modules || []).map((moduleId) => {
                      const module = MODULES.find(m => m.id === moduleId);
                      return (
                        <Badge key={moduleId} variant="outline">
                          {module?.name || moduleId}
                        </Badge>
                      );
                    })}
                    {(!selectedUser.allowed_modules || selectedUser.allowed_modules.length === 0) && (
                      <Badge variant="outline" className="text-gray-500">
                        All Modules
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Login Count</Label>
                    <p className="text-lg font-medium">{selectedUser.login_count}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Max Sessions</Label>
                    <p className="text-lg">{selectedUser.max_sessions}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Session Timeout</Label>
                    <p className="text-lg">{selectedUser.session_timeout}s</p>
                  </div>
                </div>

                {selectedUser.notes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Notes</Label>
                    <p className="text-sm mt-1 p-3 bg-gray-50 rounded">{selectedUser.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CredentialManagement;