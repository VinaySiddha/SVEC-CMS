"use client";

import { useState, useEffect } from 'react';
import { OrganizedEvent } from '@/utils/organized-events-utils';

interface OrganizedEventFormProps {
  onSuccess?: () => void;
  initialData?: OrganizedEvent | null;
  isEdit?: boolean;
  departments: { id: string; name: string }[];
}

export function OrganizedEventForm({
  onSuccess,
  initialData = null,
  isEdit = false,
  departments,
}: OrganizedEventFormProps) {
  const [dept, setDept] = useState<string>(initialData?.dept || '');
  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [organizer, setOrganizer] = useState<string>(initialData?.organizer || '');
  const [dateFrom, setDateFrom] = useState<string>(initialData?.date_from ? initialData.date_from.substring(0, 10) : '');
  const [dateTo, setDateTo] = useState<string>(initialData?.date_to ? initialData.date_to.substring(0, 10) : '');
  const [file, setFile] = useState<File | null>(null);
  const [removeReport, setRemoveReport] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFile = e.target.files[0];
    
    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }
    
    // Check file type (PDF only)
    if (!selectedFile.type.includes('pdf')) {
      setError('Only PDF files are allowed');
      return;
    }
    
    setFile(selectedFile);
    setRemoveReport(false);
    setError('');
  };
  
  // Handle document removal
  const handleRemoveReport = () => {
    setRemoveReport(true);
    setFile(null);
  };
  
  // Submit form
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
      
      if (!title) {
        setError('Title is required');
        setLoading(false);
        return;
      }
      
      if (!organizer) {
        setError('Organizer is required');
        setLoading(false);
        return;
      }
      
      if (!dateFrom) {
        setError('Start date is required');
        setLoading(false);
        return;
      }
      
      if (!dateTo) {
        setError('End date is required');
        setLoading(false);
        return;
      }
      
      // Create FormData
      const formData = new FormData();
      formData.append('dept', dept);
      formData.append('title', title);
      formData.append('organizer', organizer);
      formData.append('date_from', dateFrom);
      formData.append('date_to', dateTo);
      
      // Add file if provided
      if (file) {
        formData.append('report_file', file);
      }
      
      // Handle document removal
      if (removeReport) {
        formData.append('remove_report', 'true');
      }
      
      // Send request
      const url = isEdit 
        ? `/api/organized-events/${initialData?.id}` 
        : '/api/organized-events';
      
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save organized event');
      }
      
      // Success
      setMessage(isEdit ? 'Event updated successfully!' : 'Event added successfully!');
      
      if (!isEdit) {
        // Reset form for new submissions
        setDept('');
        setTitle('');
        setOrganizer('');
        setDateFrom('');
        setDateTo('');
        setFile(null);
        setRemoveReport(false);
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
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? 'Edit Organized Event' : 'Add Organized Event'}
      </h2>
      
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
            Event Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organizer
          </label>
          <input
            type="text"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
            placeholder="Department/Organization that organized the event"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Report
          </label>
          
          {initialData?.report_url && !removeReport ? (
            <div className="mb-2">
              <div className="flex items-center space-x-2">
                <a 
                  href={initialData.report_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Current Report
                </a>
                <button
                  type="button"
                  onClick={handleRemoveReport}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
          
          <p className="mt-1 text-sm text-gray-500">
            Upload event report in PDF format (max 10MB)
          </p>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : isEdit ? 'Update Event' : 'Add Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
