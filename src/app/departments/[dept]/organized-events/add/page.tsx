"use client";

import { OrganizedEventForm } from '@/components/organized-events';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function AddOrganizedEventPage() {
  const params = useParams();
  const router = useRouter();
  const deptId = Array.isArray(params?.deptId) ? params.deptId[0] : (params?.deptId || '');
  
  const [departmentName, setDepartmentName] = useState<string>('');
  const [departments, setDepartments] = useState<{id: string; name: string}[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        // Fetch department details
        const response = await fetch(`/api/departments/${deptId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch department');
        }
        
        const data = await response.json();
        setDepartmentName(data.name || deptId);
        setDepartments([{ id: deptId, name: data.name || deptId }]);
      } catch (error) {
        console.error('Error fetching department:', error);
        // Use the department ID as fallback
        setDepartmentName(deptId);
        setDepartments([{ id: deptId, name: deptId }]);
      } finally {
        setLoading(false);
      }
    };
    
    if (deptId) {
      fetchDepartment();
    } else {
      setLoading(false);
    }
  }, [deptId]);
  
  const handleSuccess = () => {
    router.push(`/departments/${deptId}/organized-events`);
  };
  
  const handleCancel = () => {
    router.back();
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add Organized Event - {departmentName}
        </h1>
        <p className="text-gray-600 max-w-3xl mb-4">
          Add details about a workshop, conference, seminar, or other event organized by the department.
        </p>
        
        <button 
          className="mb-6 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
          onClick={handleCancel}
        >
          &larr; Back
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <OrganizedEventForm 
          departments={departments}
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
}
