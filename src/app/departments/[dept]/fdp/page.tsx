"use client";

import { FDPView } from '@/components/fdp';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function DepartmentFDPPage() {
  const params = useParams();
  const deptId = Array.isArray(params?.deptId) ? params.deptId[0] : (params?.deptId || '');
  const [departmentName, setDepartmentName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDepartmentAndUserRole = async () => {
      try {
        // Fetch department details
        const deptResponse = await fetch(`/api/departments/${deptId}`);
        if (!deptResponse.ok) {
          throw new Error('Failed to fetch department');
        }
        
        const deptData = await deptResponse.json();
        setDepartmentName(deptData.name || deptId);

        // Get user role from session
        const sessionResponse = await fetch('/api/auth/session');
        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();
          setUserRole(sessionData.role);
        }
      } catch (error) {
        setDepartmentName(deptId); // Fallback
      } finally {
        setLoading(false);
      }
    };
    
    if (deptId) {
      fetchDepartmentAndUserRole();
    } else {
      setLoading(false);
    }
  }, [deptId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  const isAdmin = userRole === 'admin' || userRole === 'department-admin';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {departmentName} Faculty Development Programs
          </h1>
          <p className="text-gray-600 max-w-3xl">
            List of faculty development programs, workshops, and training sessions attended by faculty members of the {departmentName} department.
          </p>
        </div>
        
        {isAdmin && (
          <Link 
            href={`/departments/${deptId}/fdp/add`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add FDP Record
          </Link>
        )}
      </div>
      
      <FDPView departmentFilter={deptId} />
    </div>
  );
}
