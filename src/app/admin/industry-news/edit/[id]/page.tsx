"use client";

import { IndustryNewsForm } from '@/components/industry-news';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface IndustryNews {
  id: string;
  dept: string;
  title: string;
  organization: string;
  date: string;
  description: string | null;
  document_url: string | null;
}

export default function EditIndustryNewsPage() {
  const router = useRouter();
  const params = useParams();
  const newsId = Array.isArray(params?.id) ? params.id[0] : (params?.id || '');
  
  const [newsItem, setNewsItem] = useState<IndustryNews | null>(null);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the news item and departments in parallel
        const [newsResponse, departmentsResponse] = await Promise.all([
          fetch(`/api/departments/industry-news/${newsId}`),
          fetch('/api/departments')
        ]);
        
        if (!newsResponse.ok) {
          throw new Error('Failed to fetch news item');
        }
        
        const newsData = await newsResponse.json();
        setNewsItem(newsData.newsItem);
        
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
  }, [newsId]);
  
  const handleSuccess = () => {
    router.push('/admin/industry-news');
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
            onClick={() => router.push('/admin/industry-news')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Industry News
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Industry News</h1>
      <IndustryNewsForm 
        onSuccess={handleSuccess} 
        initialData={newsItem} 
        isEdit={true} 
        departments={departments} 
      />
    </div>
  );
}
