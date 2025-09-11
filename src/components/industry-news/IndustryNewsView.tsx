"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface IndustryNews {
  id: string;
  dept: string;
  title: string;
  organization: string;
  date: string;
  description: string | null;
  document_url: string | null;
  created_at?: string;
  updated_at?: string;
}

interface IndustryNewsViewProps {
  departmentFilter?: string;
  isAdmin?: boolean;
  limit?: number;
}

export function IndustryNewsView({ 
  departmentFilter,
  isAdmin = false,
  limit
}: IndustryNewsViewProps) {
  const [newsItems, setNewsItems] = useState<IndustryNews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Format date for display (YYYY-MM-DD to DD MMM YYYY)
  const formatDateForDisplay = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Invalid date, return original
    
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit',
      month: 'short', 
      year: 'numeric'
    };
    return date.toLocaleDateString('en-GB', options);
  };
  
  // Fetch news items on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (departmentFilter) queryParams.append('dept', departmentFilter);
        if (limit) queryParams.append('limit', limit.toString());
        
        const response = await fetch(`/api/departments/industry-news?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch industry news');
        }
        
        const data = await response.json();
        setNewsItems(data.news || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch industry news');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [departmentFilter, limit]);

  // Handle news item deletion
  const handleDelete = async (id: string) => {
    // Show confirmation dialog
    if (!window.confirm('Are you sure you want to delete this news item? This action cannot be undone.')) {
      return;
    }
    
    setDeleteId(id);
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/industry-news/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete news item');
      }
      
      // Remove the deleted item from the state
      setNewsItems(newsItems.filter(item => item.id !== id));
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-5 rounded text-center">
        No industry news found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {newsItems.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{formatDateForDisplay(item.date)}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {item.organization}
              </span>
            </div>
            
            {item.description && (
              <div className="text-gray-700 mb-4">
                <p>{item.description}</p>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Department: {item.dept}
              </div>
              
              <div className="flex space-x-3">
                {item.document_url && (
                  <a 
                    href={`/uploads/industry-news/${item.document_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    View Document
                  </a>
                )}
                
                {isAdmin && (
                  <div className="flex space-x-3">
                    <Link 
                      href={`/admin/industry-news/edit/${item.id}`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting && deleteId === item.id}
                      className="text-red-600 hover:text-red-900 text-sm disabled:opacity-50"
                    >
                      {isDeleting && deleteId === item.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
