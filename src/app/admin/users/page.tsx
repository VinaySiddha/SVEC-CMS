'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Users, 
  UserPlus, 
  Shield, 
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';

// Mock user data - replace with actual API call
const mockUsers = [
  {
    id: 1,
    name: 'Dr. John Smith',
    email: 'john.smith@svec.edu.in',
    role: 'admin',
    department: 'Computer Science & AI',
    phone: '+91 9876543210',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2023-08-15T09:00:00Z'
  },
  {
    id: 2,
    name: 'Prof. Sarah Johnson',
    email: 'sarah.johnson@svec.edu.in',
    role: 'faculty',
    department: 'Electronics & Communication',
    phone: '+91 9876543211',
    status: 'active',
    lastLogin: '2024-01-14T16:45:00Z',
    createdAt: '2023-07-20T11:30:00Z'
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    email: 'michael.brown@svec.edu.in',
    role: 'super_admin',
    department: 'Administration',
    phone: '+91 9876543212',
    status: 'active',
    lastLogin: '2024-01-15T08:15:00Z',
    createdAt: '2023-01-10T10:00:00Z'
  },
  {
    id: 4,
    name: 'Prof. Emily Davis',
    email: 'emily.davis@svec.edu.in',
    role: 'faculty',
    department: 'Civil Engineering',
    phone: '+91 9876543213',
    status: 'inactive',
    lastLogin: '2024-01-10T14:20:00Z',
    createdAt: '2023-09-05T13:45:00Z'
  }
];

const roleColors = {
  super_admin: 'bg-red-100 text-red-800',
  admin: 'bg-blue-100 text-blue-800',
  faculty: 'bg-green-100 text-green-800',
  staff: 'bg-yellow-100 text-yellow-800'
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  suspended: 'bg-red-100 text-red-800'
};

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin' || u.role === 'super_admin').length,
    faculty: users.filter(u => u.role === 'faculty').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {userStats.active} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.admins}</div>
            <p className="text-xs text-muted-foreground">
              Admin & Super Admin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.faculty}</div>
            <p className="text-xs text-muted-foreground">
              Teaching staff
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((userStats.active / userStats.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              User activity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select 
          value={selectedRole} 
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="super_admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="faculty">Faculty</option>
          <option value="staff">Staff</option>
        </select>

        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="w-3 h-3 mr-1" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                        {user.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{user.department}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                        {user.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{formatLastLogin(user.lastLogin)}</div>
                      <div className="text-xs text-gray-500">Joined {formatDate(user.createdAt)}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Get started by adding your first user.'}
              </p>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}