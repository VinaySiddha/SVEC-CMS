"use client";

import { useState, useEffect } from 'react';
import { MOU } from '@/utils/mou-utils';

interface MOUFormProps {
  onSuccess?: () => void;
  initialData?: MOU | null;
  isEdit?: boolean;
  departments: { id: string; name: string }[];
}

export function MOUForm({
  onSuccess,
  initialData = null,
  isEdit = false,
  departments,
}: MOUFormProps) {
  const [dept, setDept] = useState<string>(initialData?.dept || '');
  const [organizationName, setOrganizationName] = useState<string>(initialData?.organization_name || '');
  const [fromDate, setFromDate] = useState<string>(initialData?.from_date ? initialData.from_date.substring(0, 10) : '');
  const [toDate, setToDate] = useState<string>(initialData?.to_date ? initialData.to_date.substring(0, 10) : '');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFile = e.target.files[0];
    
    // Check file type
    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    setFile(selectedFile);
    setError('');
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
      
      if (!organizationName) {
        setError('Organization name is required');
        setLoading(false);
        return;
      }
      
      if (!isEdit && !file) {
        setError('Please upload a PDF document of the MOU');
        setLoading(false);
        return;
      }
      
      // Create FormData
      const formData = new FormData();
      formData.append('dept', dept);
      formData.append('organization_name', organizationName);
      
      if (fromDate) {
        formData.append('from_date', fromDate);
      }
      
      if (toDate) {
        formData.append('to_date', toDate);
      }
      
      // Add file if provided
      if (file) {
        formData.append('document_file', file);
      }
      
      // Send request
      const url = isEdit 
        ? `/api/mous/${initialData?.id}` 
        : '/api/mous';
      
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save MOU');
      }
      
      // Success
      setMessage(isEdit ? 'MOU updated successfully!' : 'MOU added successfully!');
      
      if (!isEdit) {
        // Reset form for new submissions
        setDept('');
        setOrganizationName('');
        setFromDate('');
        setToDate('');
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
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit MOU' : 'Add New MOU'}</h2>
      
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
            Organization Name
          </label>
          <input
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              min={fromDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MOU Document (PDF Only, Max 5MB)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            accept="application/pdf"
          />
          {file && (
            <div className="mt-2 text-sm text-gray-500">
              Selected file: {file.name}
            </div>
          )}
          {isEdit && initialData?.document_url && !file && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Current document:</span>
              <a 
                href={`/uploads/mous/${initialData.document_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                View PDF
              </a>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update MOU' : 'Save MOU'}
          </button>
        </div>
      </form>
    </div>
  );
}
