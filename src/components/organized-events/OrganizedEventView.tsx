"use client";

import { useState, useEffect } from 'react';
import { OrganizedEvent, getOrganizedEvents, formatDateForDisplay } from '@/utils/organized-events-utils';
import Link from 'next/link';

interface OrganizedEventViewProps {
  departmentFilter?: string;
  isAdmin?: boolean;
  limit?: number;
}

export function OrganizedEventView({ 
  departmentFilter,
  isAdmin = false,
  limit
}: OrganizedEventViewProps) {
  const [events, setEvents] = useState<OrganizedEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [departments, setDepartments] = useState<{[key: string]: string}>({});

  // Fetch events on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEvents = await getOrganizedEvents({
          departmentId: departmentFilter,
          limit
        });
        
        setEvents(fetchedEvents);
        
        // Fetch department names if admin view
        if (isAdmin && fetchedEvents.length > 0) {
          const deptIds = [...new Set(fetchedEvents.map(event => event.dept))];
          await fetchDepartmentNames(deptIds);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch organized events');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [departmentFilter, isAdmin, limit]);
  
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
      console.error('Error fetching department names:', error);
    }
  };

  // Handle event deletion
  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    
    if (window.confirm('Are you sure you want to delete this event record?')) {
      setDeleteId(id);
      setIsDeleting(true);
      
      try {
        const response = await fetch(`/api/organized-events/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete event');
        }
        
        // Remove from the list
        setEvents(events.filter(event => event.id !== id));
      } catch (err: any) {
        setError(err.message || 'Failed to delete event');
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

  if (events.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded mb-4 text-center">
        No organized events found.
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
              {isAdmin && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {departments[event.dept] || event.dept}
                  </td>
                )}
                <td className="px-6 py-4 text-sm text-gray-900">
                  {event.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {event.organizer}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {formatDateForDisplay(event.date_from)} - {formatDateForDisplay(event.date_to)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {event.report_url ? (
                    <a 
                      href={event.report_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Report
                    </a>
                  ) : (
                    <span>Not available</span>
                  )}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/organized-events/edit/${event.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id!)}
                      disabled={isDeleting && deleteId === event.id}
                      className={`text-red-600 hover:text-red-900 ${
                        isDeleting && deleteId === event.id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isDeleting && deleteId === event.id ? 'Deleting...' : 'Delete'}
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
