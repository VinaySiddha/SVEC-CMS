"use client";

import { LabForm } from '@/components/labs/LabForm';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Configuration {
  system: string;
  quantity: number;
  details?: string;
}

interface Lab {
  id: string;
  dept: string;
  lab_name: string;
  configurations: Configuration[];
  usage: string | null;
  status: "active" | "inactive" | "maintenance";
  image_url: string[];
  created_at?: string;
  updated_at?: string;
}

export default function EditLabPage() {
  const router = useRouter();
  const params = useParams();
  const labId = Array.isArray(params?.id) ? params.id[0] : (params?.id || '');
  
  const [lab, setLab] = useState<Lab | null>(null);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the lab and departments in parallel
        const [labResponse, departmentsResponse] = await Promise.all([
          fetch(`/api/departments/labs/${labId}`),
          fetch('/api/departments')
        ]);
        
        if (!labResponse.ok) {
          throw new Error('Failed to fetch lab');
        }
        
        const labData = await labResponse.json();
        setLab(labData.lab);
        
        if (departmentsResponse.ok) {
          const departmentsData = await departmentsResponse.json();
          setDepartments(departmentsData.map((dept: any) => ({
            id: dept.id,
            name: dept.name
          })));
        } else {
          // Fallback departments
          setDepartments([
            { id: 'CSE', name: 'Computer Science & Engineering' },
            { id: 'ECE', name: 'Electronics & Communication Engineering' },
            { id: 'EEE', name: 'Electrical & Electronics Engineering' },
            { id: 'MECH', name: 'Mechanical Engineering' },
            { id: 'CIVIL', name: 'Civil Engineering' },
            { id: 'IT', name: 'Information Technology' },
          ]);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [labId]);
  
  const handleSuccess = () => {
    router.push('/admin/labs');
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <div className="mt-4">
          <button
            onClick={() => router.push('/admin/labs')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Labs
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Lab</h1>
      <LabForm 
        onSuccess={handleSuccess} 
        initialData={lab as any} 
        isEdit={true} 
        departments={departments} 
      />
    </div>
  );
}
