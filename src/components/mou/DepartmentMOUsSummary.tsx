"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MOU {
  id: number;
  dept: string;
  organization_name: string;
  from_date: string;
  to_date: string | null;
  description: string | null;
  document_url: string | null;
  status: string;
}

interface DepartmentMOUsSummaryProps {
  departmentId: string;
}

export function DepartmentMOUsSummary({ departmentId }: DepartmentMOUsSummaryProps) {
  const [mous, setMOUs] = useState<MOU[]>([]);
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

  useEffect(() => {
    const fetchMOUs = async () => {
      try {
        const response = await fetch(`/api/departments/mous?dept=${departmentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch MOUs');
        }
        
        const data = await response.json();
        setMOUs((data.mous || []).slice(0, 5)); // Show only up to 5 MOUs in the summary
      } catch (err: any) {
        setError(err.message || 'Failed to load MOUs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMOUs();
  }, [departmentId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
        {error}
      </div>
    );
  }
  
  if (mous.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <p className="text-gray-600">No MOUs available for this department.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4">Memorandums of Understanding</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-2 text-left">Organization</th>
              <th className="px-4 py-2 text-left">Validity</th>
              <th className="px-4 py-2 text-center">Document</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mous.map((mou) => (
              <tr key={mou.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{mou.organization_name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {mou.from_date && mou.to_date ? (
                    `${formatDateForDisplay(mou.from_date)} - ${formatDateForDisplay(mou.to_date)}`
                  ) : mou.from_date ? (
                    `From ${formatDateForDisplay(mou.from_date)}`
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <a 
                    href={`/uploads/mous/${mou.document_url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {mous.length >= 5 && (
        <div className="text-right mt-4">
          <Link 
            href={`/departments/${departmentId}/mous`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View All MOUs →
          </Link>
        </div>
      )}
    </div>
  );
}
