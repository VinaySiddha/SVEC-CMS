"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MOU {
  id: string;
  dept: string;
  organization_name: string;
  from_date: string;
  to_date: string | null;
  description: string | null;
  document_url: string | null;
  status: string;
}

interface MOUsViewProps {
  departmentFilter?: string;
  isAdmin?: boolean;
  limit?: number;
}

export function MOUsView({ 
  departmentFilter,
  isAdmin = false,
  limit
}: MOUsViewProps) {
  const [mous, setMOUs] = useState<MOU[]>([]);
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

  // Fetch MOUs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (departmentFilter) queryParams.append('dept', departmentFilter);
        
        const response = await fetch(`/api/departments/mous?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch MOUs');
        }
        
        const data = await response.json();
        // Apply limit if specified
        const limitedMOUs = limit && data.mous ? data.mous.slice(0, limit) : data.mous || [];
        setMOUs(limitedMOUs);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch MOUs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [departmentFilter, limit]);

  // Handle MOU deletion
  const handleDelete = async (id: string) => {
    // Show confirmation dialog
    if (!window.confirm('Are you sure you want to delete this MOU? This action cannot be undone.')) {
      return;
    }
    
    setDeleteId(id);
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/mous/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete MOU');
      }
      
      // Remove the deleted MOU from the state
      setMOUs(mous.filter(mou => mou.id !== id));
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

  if (mous.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-5 rounded text-center">
        No MOUs found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Organization</th>
            <th className="py-3 px-6 text-left">Department</th>
            <th className="py-3 px-6 text-left">From Date</th>
            <th className="py-3 px-6 text-left">To Date</th>
            <th className="py-3 px-6 text-center">Document</th>
            {isAdmin && <th className="py-3 px-6 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {mous.map((mou) => (
            <tr key={mou.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left">
                {mou.organization_name}
              </td>
              <td className="py-3 px-6 text-left">
                {mou.dept}
              </td>
              <td className="py-3 px-6 text-left">
                {mou.from_date ? formatDateForDisplay(mou.from_date) : '-'}
              </td>
              <td className="py-3 px-6 text-left">
                {mou.to_date ? formatDateForDisplay(mou.to_date) : '-'}
              </td>
              <td className="py-3 px-6 text-center">
                <a 
                  href={`/uploads/mous/${mou.document_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700 transition"
                >
                  View PDF
                </a>
              </td>
              {isAdmin && (
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <Link 
                      href={`/admin/mous/edit/${mou.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(mou.id)}
                      disabled={isDeleting && deleteId === mou.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {isDeleting && deleteId === mou.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
