"use client";

import { LabForm } from '@/components/labs/LabForm';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AddLabPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Fetch departments for the dropdown
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        
        const data = await response.json();
        setDepartments(data.map((dept: any) => ({
          id: dept.id,
          name: dept.name
        })));
      } catch (error) {
        console.error('Error fetching departments:', error);
        // Add some default departments for fallback
        setDepartments([
          { id: 'CSE', name: 'Computer Science & Engineering' },
          { id: 'ECE', name: 'Electronics & Communication Engineering' },
          { id: 'EEE', name: 'Electrical & Electronics Engineering' },
          { id: 'MECH', name: 'Mechanical Engineering' },
          { id: 'CIVIL', name: 'Civil Engineering' },
          { id: 'IT', name: 'Information Technology' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDepartments();
  }, []);
  
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Lab</h1>
      <LabForm onSuccess={handleSuccess} departments={departments} />
    </div>
  );
}
