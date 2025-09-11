"use client";

import { useState, useEffect } from 'react';
import { ClassroomViewer } from '@/components/classrooms/ClassroomViewer';

export default function ClassroomsPage() {
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch departments');
        }
        
        setDepartments(data.departments.map((dept: any) => ({
          id: dept.code,
          name: dept.name
        })));
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Classrooms & Timetables</h1>
        <p className="mt-2 text-lg text-gray-600">
          Browse our campus classrooms and view department timetables.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <ClassroomViewer
          showFilters={true}
          departments={departments}
        />
      )}
    </div>
  );
}
