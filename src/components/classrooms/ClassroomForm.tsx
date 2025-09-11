"use client";

import { useState, useEffect } from 'react';
import { Classroom } from '@/utils/classroom-utils';

interface ClassroomFormProps {
  onSuccess?: () => void;
  initialData?: Classroom | null;
  isEdit?: boolean;
  departments: { id: string; name: string }[];
}

export function ClassroomForm({
  onSuccess,
  initialData = null,
  isEdit = false,
  departments,
}: ClassroomFormProps) {
  const [type, setType] = useState<'seminar' | 'timetable'>(initialData?.type || 'seminar');
  const [dept, setDept] = useState<string>(initialData?.dept || '');
  const [description, setDescription] = useState<string>(initialData?.description || '');
  const [seatingCapacity, setSeatingCapacity] = useState<number | ''>(initialData?.seating_capacity || '');
  const [projector, setProjector] = useState<boolean>(initialData?.projector || false);
  const [status, setStatus] = useState<string>(initialData?.status || 'active');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // Validate form
      if (!dept) {
        setError('Department is required');
        setLoading(false);
        return;
      }

      if (!description) {
        setError('Description is required');
        setLoading(false);
        return;
      }

      if (type === 'seminar' && !seatingCapacity) {
        setError('Seating capacity is required for seminar halls');
        setLoading(false);
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append('type', type);
      formData.append('dept', dept);
      formData.append('description', description);
      formData.append('status', status);
      formData.append('projector', projector.toString());
      
      if (seatingCapacity !== '') {
        formData.append('seating_capacity', seatingCapacity.toString());
      }
      
      if (file) {
        formData.append('file', file);
      }

      // Send request
      const url = isEdit 
        ? `/api/classrooms/${initialData?.id}` 
        : '/api/classrooms';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save classroom');
      }

      // Success
      setMessage(isEdit ? 'Classroom updated successfully!' : 'Classroom added successfully!');
      
      if (!isEdit) {
        // Reset form for new submissions
        setType('seminar');
        setDept('');
        setDescription('');
        setSeatingCapacity('');
        setProjector(false);
        setStatus('active');
        setFile(null);
      }
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit Classroom' : 'Add New Classroom'}</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="seminar"
                checked={type === 'seminar'}
                onChange={() => setType('seminar')}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Seminar Hall</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="timetable"
                checked={type === 'timetable'}
                onChange={() => setType('timetable')}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Timetable</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {type === 'seminar' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seating Capacity
              </label>
              <input
                type="number"
                min="1"
                value={seatingCapacity}
                onChange={(e) => setSeatingCapacity(e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required={type === 'seminar'}
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={projector}
                  onChange={(e) => setProjector(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Has Projector</span>
              </label>
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {type === 'seminar' ? 'Seminar Hall Image (Optional)' : 'Timetable Document'}
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            accept={type === 'seminar' ? 'image/*' : '.pdf,.doc,.docx,.xlsx,.xls'}
            required={type === 'timetable' && !initialData?.document_url}
          />
          {initialData?.document_url && (
            <div className="mt-2 text-sm text-gray-500">
              Current file: {initialData.document_url.split('/').pop()}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
