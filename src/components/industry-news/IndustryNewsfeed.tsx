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

interface NewsfeedProps {
  departmentFilter?: string;
  limit?: number;
  showViewAllLink?: boolean;
}

export function IndustryNewsfeed({ 
  departmentFilter,
  limit = 5,
  showViewAllLink = true
}: NewsfeedProps) {
  const [newsItems, setNewsItems] = useState<IndustryNews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
        {error}
      </div>
    );
  }
  
  if (newsItems.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
        No industry news available at this time.
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h3 className="text-lg font-medium text-gray-900">Industry News & Updates</h3>
      </div>
      
      <ul className="divide-y divide-gray-200">
        {newsItems.map((item) => (
          <li key={item.id} className="px-4 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-2 sm:mb-0">
                <h4 className="text-base font-medium text-gray-900">{item.title}</h4>
                <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500 space-x-4">
                  <span>{formatDateForDisplay(item.date)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{item.organization}</span>
                </div>
              </div>
              
              {item.document_url && (
                <a 
                  href={`/uploads/industry-news/${item.document_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-2 sm:mt-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  View
                </a>
              )}
            </div>
            
            {item.description && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ul>
      
      {showViewAllLink && (
        <div className="bg-gray-50 px-4 py-3 text-right">
          <Link 
            href={departmentFilter ? `/departments/${departmentFilter}/industry-news` : "/industry-news"}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View All News →
          </Link>
        </div>
      )}
    </div>
  );
}
