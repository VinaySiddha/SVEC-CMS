"use client";

import { useState, useEffect } from 'react';
import { Lab, getLabs } from '@/utils/lab-utils';
import Link from 'next/link';

export function LabsDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    maintenance: 0,
    inactive: 0,
    byDepartment: {} as Record<string, number>
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchLabStats = async () => {
      try {
        // Get all labs regardless of status
        const response = await fetch('/api/labs?status=all');
        
        if (!response.ok) {
          throw new Error('Failed to fetch labs');
        }
        
        const labs = await response.json();
        
        // Calculate stats
        const newStats = {
          total: labs.length,
          active: labs.filter((lab: Lab) => lab.status === 'active').length,
          maintenance: labs.filter((lab: Lab) => lab.status === 'maintenance').length,
          inactive: labs.filter((lab: Lab) => lab.status === 'inactive').length,
          byDepartment: {} as Record<string, number>
        };
        
        // Count labs by department
        labs.forEach((lab: Lab) => {
          if (!newStats.byDepartment[lab.dept]) {
            newStats.byDepartment[lab.dept] = 0;
          }
          newStats.byDepartment[lab.dept]++;
        });
        
        setStats(newStats);
      } catch (err: any) {
        setError(err.message || 'Error fetching lab statistics');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLabStats();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Labs Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Labs</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-green-700">{stats.active}</p>
          <p className="text-sm text-gray-600">Active Labs</p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-yellow-700">{stats.maintenance}</p>
          <p className="text-sm text-gray-600">In Maintenance</p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-red-700">{stats.inactive}</p>
          <p className="text-sm text-gray-600">Inactive Labs</p>
        </div>
      </div>
      
      {/* Departments Summary */}
      {Object.keys(stats.byDepartment).length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Labs by Department</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(stats.byDepartment).map(([dept, count]) => (
              <div key={dept} className="border rounded-lg p-4 flex items-center justify-between">
                <span className="text-gray-800">{dept}</span>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-700 mr-2">{count}</span>
                  <Link 
                    href={`/departments/${dept}/labs`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 text-right">
        <Link 
          href="/admin/labs"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Manage Labs
        </Link>
      </div>
    </div>
  );
}
