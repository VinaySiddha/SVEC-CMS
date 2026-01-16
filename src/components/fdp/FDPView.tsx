"use client";

import { useState, useEffect } from 'react';
import { FacultyDevelopmentProgram, getFDPs, formatDateForDisplay } from '@/utils/fdp-utils';
import Link from 'next/link';

interface FDPViewProps {
  departmentFilter?: string;
  facultyFilter?: string;
  isAdmin?: boolean;
  limit?: number;
}

export function FDPView({ 
  departmentFilter,
  facultyFilter,
  isAdmin = false,
  limit
}: FDPViewProps) {
  const [fdps, setFdps] = useState<FacultyDevelopmentProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [departments, setDepartments] = useState<{[key: string]: string}>({});

  // Fetch FDPs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFdps = await getFDPs({
          departmentId: departmentFilter,
          facultyId: facultyFilter,
          limit
        });
        
        setFdps(fetchedFdps);
        
        // Fetch department names if admin view
        if (isAdmin && fetchedFdps.length > 0) {
          const deptIds = [...new Set(fetchedFdps.map(fdp => fdp.dept))];
          await fetchDepartmentNames(deptIds);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch FDP data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [departmentFilter, facultyFilter, isAdmin, limit]);
  
  // Fetch department names for display
  const fetchDepartmentNames = async (deptIds: string[]) => {
    try {
      const promises = deptIds.map(async (id) => {
        const response = await fetch(`/api/departments/${id}`);
        if (response.ok) {
          const dept = await response.json();
          return { id, name: dept.name };
        }
        return { id, name: id }; // Fallback to ID
      });
      
      const deptData = await Promise.all(promises);
      
      const deptMap: {[key: string]: string} = {};
      deptData.forEach(dept => {
        deptMap[dept.id] = dept.name;
      });
      
      setDepartments(deptMap);
    } catch (error) {
    }
  };

  // Handle FDP deletion
  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    
    if (window.confirm('Are you sure you want to delete this FDP record?')) {
      setDeleteId(id);
      setIsDeleting(true);
      
      try {
        const response = await fetch(`/api/fdp/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete FDP');
        }
        
        // Remove from the list
        setFdps(fdps.filter(fdp => fdp.id !== id));
      } catch (err: any) {
        setError(err.message || 'Failed to delete FDP');
      } finally {
        setIsDeleting(false);
        setDeleteId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  if (fdps.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded mb-4 text-center">
        No faculty development programs found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
              {isAdmin && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fdps.map((fdp) => (
              <tr key={fdp.id} className="hover:bg-gray-50">
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {departments[fdp.dept] || fdp.dept}
                  </td>
                )}
                <td className="px-6 py-4 text-sm text-gray-900">
                  {fdp.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {fdp.faculty_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {fdp.organizer}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {formatDateForDisplay(fdp.date_from)} - {formatDateForDisplay(fdp.date_to)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {fdp.certificate_url ? (
                    <a 
                      href={fdp.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Certificate
                    </a>
                  ) : (
                    <span>Not available</span>
                  )}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/fdp/edit/${fdp.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(fdp.id!)}
                      disabled={isDeleting && deleteId === fdp.id}
                      className={`text-red-600 hover:text-red-900 ${
                        isDeleting && deleteId === fdp.id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isDeleting && deleteId === fdp.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
