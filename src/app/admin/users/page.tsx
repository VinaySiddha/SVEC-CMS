
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus } from 'lucide-react';

const UserManagementPage = () => {
  // Placeholder data - this will be fetched from Firestore
  const users = [
    { id: '1', email: 'superadmin@svec.ac.in', role: 'Super Admin' },
    { id: '2', email: 'cse_admin@svec.ac.in', role: 'Department Admin', department: 'CSE' },
    { id: '3', email: 'ece_admin@svec.ac.in', role: 'Department Admin', department: 'ECE' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-muted-foreground">
          Manage administrator accounts for the SVEC website.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Admin Users</CardTitle>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">
            <UserPlus className="h-4 w-4" />
            Add New User
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                  <th scope="col" className="px-6 py-3">Department</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.department || 'N/A'}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button className="font-medium text-blue-600 hover:underline">Edit</button>
                      <button className="font-medium text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementPage;
