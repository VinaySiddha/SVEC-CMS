"use client";

import { useState, useEffect } from 'react';
import { Classroom } from '@/utils/classroom-utils';

interface ClassroomViewerProps {
  department?: string;
  type?: 'seminar' | 'timetable';
  showFilters?: boolean;
  departments?: { id: string; name: string }[];
}

export function ClassroomViewer({
  department,
  type = 'seminar',
  showFilters = true,
  departments = []
}: ClassroomViewerProps) {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>(department || '');
  const [selectedType, setSelectedType] = useState<string>(type || '');

  // Fetch classrooms
  const fetchClassrooms = async () => {
    setLoading(true);
    try {
      let url = '/api/classrooms';
      const params = new URLSearchParams();
      
      if (selectedDept) {
        params.append('dept', selectedDept);
      }
      
      if (selectedType) {
        params.append('type', selectedType);
      }
      
      // Only show active classrooms
      params.append('status', 'active');
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch classrooms');
      }
      
      setClassrooms(data.classrooms);
      
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchClassrooms();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    fetchClassrooms();
  }, [selectedDept, selectedType]);

  // Format capacity
  const formatCapacity = (capacity: number | null) => {
    if (!capacity) return 'N/A';
    return `${capacity} seats`;
  };

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments && departments.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">All Types</option>
                <option value="seminar">Seminar Halls</option>
                <option value="timetable">Timetables</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Loading...</p>
        </div>
      ) : classrooms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No items found.</p>
        </div>
      ) : (
        <div>
          {selectedType !== 'timetable' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classrooms
                .filter(c => c.type === 'seminar' || !selectedType)
                .map((classroom) => (
                  <div
                    key={classroom.id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    {classroom.document_url ? (
                      <div className="h-48 bg-gray-200">
                        <img
                          src={`/uploads/${classroom.document_url}`}
                          alt={classroom.description}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // If image fails to load, show a placeholder
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Classroom+Image';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                    <div className="p-4">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {classroom.dept}
                      </div>
                      <h3 className="mt-1 text-lg font-medium">
                        {classroom.description}
                      </h3>
                      <div className="mt-2 flex items-center">
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="ml-2 text-gray-700">
                          {formatCapacity(classroom.seating_capacity)}
                        </span>
                      </div>
                      {classroom.projector && (
                        <div className="mt-2 flex items-center">
                          <svg
                            className="h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="ml-2 text-gray-700">
                            Has Projector
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {selectedType !== 'seminar' && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Timetables</h2>
              <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timetable
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {classrooms
                      .filter(c => c.type === 'timetable' || !selectedType)
                      .map((timetable) => (
                        <tr key={timetable.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {timetable.dept}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {timetable.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {timetable.document_url ? (
                              <a
                                href={`/uploads/${timetable.document_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <svg
                                  className="h-4 w-4 mr-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                                View Timetable
                              </a>
                            ) : (
                              <span className="text-gray-400">
                                No document available
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
