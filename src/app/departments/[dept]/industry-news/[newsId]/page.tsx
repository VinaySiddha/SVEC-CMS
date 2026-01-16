"use client";

import { IndustryNewsForm } from '@/components/industry-news';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ManageIndustryNewsPage() {
  const params = useParams();
  const router = useRouter();
  const deptId = Array.isArray(params?.deptId) ? params.deptId[0] : (params?.deptId || '');
  const newsId = Array.isArray(params?.newsId) ? params.newsId[0] : params?.newsId;
  
  const [departmentName, setDepartmentName] = useState<string>('');
  const [departments, setDepartments] = useState<{id: string; name: string}[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(!!newsId);
  const [loading, setLoading] = useState<boolean>(true);
  const [news, setNews] = useState<any>(null);
  
  useEffect(() => {
    const fetchDepartmentAndNews = async () => {
      try {
        // Fetch department details
        const deptResponse = await fetch(`/api/departments/${deptId}`);
        if (!deptResponse.ok) {
          throw new Error('Failed to fetch department');
        }
        
        const deptData = await deptResponse.json();
        setDepartmentName(deptData.name || deptId);
        
        // Set departments for the form
        setDepartments([{ id: deptId, name: deptData.name || deptId }]);
        
        // If in edit mode, fetch the news item
        if (newsId) {
          const newsResponse = await fetch(`/api/industry-news/${newsId}`);
          if (!newsResponse.ok) {
            throw new Error('Failed to fetch news item');
          }
          
          const newsData = await newsResponse.json();
          setNews(newsData);
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
      fetchDepartmentAndNews();
    } else {
      setLoading(false);
    }
  }, [deptId, newsId]);
  
  const handleSuccess = () => {
    router.push(`/departments/${deptId}/industry-news`);
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
          {isEditMode ? 'Edit' : 'Add New'} Industry News - {departmentName}
        </h1>
        <p className="text-gray-600 max-w-3xl mb-4">
          {isEditMode 
            ? 'Update information about industry news for the department.' 
            : 'Add a new industry news item to keep students and faculty updated about industry collaborations.'}
        </p>
        
        <button 
          className="mb-6 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
          onClick={handleCancel}
        >
          &larr; Back to Industry News
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <IndustryNewsForm 
          departments={departments}
          initialData={news} 
          onSuccess={handleSuccess} 
          isEdit={isEditMode}
        />
      </div>
    </div>
  );
}
