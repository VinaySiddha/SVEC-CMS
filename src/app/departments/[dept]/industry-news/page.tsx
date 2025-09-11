"use client";

import { IndustryNewsView } from '@/components/industry-news';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function DepartmentIndustryNewsPage() {
  const params = useParams();
  const deptId = Array.isArray(params?.deptId) ? params.deptId[0] : (params?.deptId || '');
  const [departmentName, setDepartmentName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchDepartmentName = async () => {
      try {
        // Fetch department details
        const response = await fetch(`/api/departments/${deptId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch department');
        }
        
        const data = await response.json();
        setDepartmentName(data.name || deptId);
      } catch (error) {
        console.error('Error fetching department:', error);
        // Use the department ID as fallback
        setDepartmentName(deptId);
      } finally {
        setLoading(false);
      }
    };
    
    if (deptId) {
      fetchDepartmentName();
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {departmentName} Industry News
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Latest updates and news from industry partners related to the {departmentName} department at 
          Sri Vasavi Engineering College.
        </p>
      </div>
      
      <IndustryNewsView departmentFilter={deptId} />
    </div>
  );
}
