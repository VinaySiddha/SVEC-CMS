"use client";

import { FDPForm } from '@/components/fdp';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAddFDPPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<{id: string; name: string}[]>([]);
  const [faculties, setFaculties] = useState<{id: string; name: string}[] | null>(null);
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        
        const data = await response.json();
        setDepartments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };
    
    fetchDepartments();
  }, []);
  
  useEffect(() => {
    const fetchFaculties = async () => {
      if (!selectedDept) {
        setFaculties(null);
        return;
      }
      
      try {
        const response = await fetch(`/api/faculty?dept=${selectedDept}`);
        if (!response.ok) {
          throw new Error('Failed to fetch faculty members');
        }
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setFaculties(data.map(f => ({ id: f.id, name: f.name })));
        } else {
          setFaculties([]);
        }
      } catch (error) {
        console.error('Error fetching faculty members:', error);
        setFaculties([]);
      }
    };
    
    if (selectedDept) {
      fetchFaculties();
    }
  }, [selectedDept]);
  
  const handleSuccess = () => {
    router.push('/admin/fdp');
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
          Add Faculty Development Program
        </h1>
        <p className="text-gray-600 max-w-3xl mb-4">
          Record details about a faculty development program, workshop, or training session attended by a faculty member.
        </p>
        
        <button 
          className="mb-6 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
          onClick={handleCancel}
        >
          &larr; Back to FDP Dashboard
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
