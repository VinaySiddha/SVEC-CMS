"use client";

import { FDPForm } from '@/components/fdp';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function AddFDPPage() {
  const params = useParams();
  const router = useRouter();
  const deptId = Array.isArray(params?.deptId) ? params.deptId[0] : (params?.deptId || '');
  
  const [departmentName, setDepartmentName] = useState<string>('');
  const [departments, setDepartments] = useState<{id: string; name: string}[]>([]);
  const [faculties, setFaculties] = useState<{id: string; name: string}[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchDepartmentAndFaculties = async () => {
      try {
        // Fetch department details
        const deptResponse = await fetch(`/api/departments/${deptId}`);
        if (!deptResponse.ok) {
          throw new Error('Failed to fetch department');
        }
        
        const deptData = await deptResponse.json();
        setDepartmentName(deptData.name || deptId);
        setDepartments([{ id: deptId, name: deptData.name || deptId }]);
        
        // Try to fetch faculty members for this department
        try {
          const facultyResponse = await fetch(`/api/faculty?dept=${deptId}`);
          if (facultyResponse.ok) {
            const facultyData = await facultyResponse.json();
            if (Array.isArray(facultyData) && facultyData.length > 0) {
              setFaculties(facultyData.map(f => ({ 
                id: f.id, 
                name: f.name 
              })));
            }
          }
        } catch (facultyError) {
          // Continue without faculty data
        }
      } catch (error) {
        // Use the department ID as fallback
        setDepartmentName(deptId);
        setDepartments([{ id: deptId, name: deptId }]);
      } finally {
        setLoading(false);
      }
    };
    
    if (deptId) {
      fetchDepartmentAndFaculties();
    } else {
      setLoading(false);
    }
  }, [deptId]);
  
  const handleSuccess = () => {
    router.push(`/departments/${deptId}/fdp`);
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
          Add Faculty Development Program - {departmentName}
        </h1>
        <p className="text-gray-600 max-w-3xl mb-4">
          Add details about a faculty development program, workshop, or training session attended by a faculty member.
        </p>
        
        <button 
          className="mb-6 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
          onClick={handleCancel}
        >
          &larr; Back
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <FDPForm 
          departments={departments}
          faculties={faculties}
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
}
