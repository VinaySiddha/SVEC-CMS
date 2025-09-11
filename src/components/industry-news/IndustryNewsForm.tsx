"use client";

import { useState } from 'react';
import { IndustryNews } from '@/utils/industry-news-utils';

interface IndustryNewsFormProps {
  onSuccess?: () => void;
  initialData?: IndustryNews | null;
  isEdit?: boolean;
  departments: { id: string; name: string }[];
}

export function IndustryNewsForm({
  onSuccess,
  initialData = null,
  isEdit = false,
  departments,
}: IndustryNewsFormProps) {
  const [dept, setDept] = useState<string>(initialData?.dept || '');
  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [organization, setOrganization] = useState<string>(initialData?.organization || '');
  const [date, setDate] = useState<string>(initialData?.date ? initialData.date.substring(0, 10) : '');
  const [description, setDescription] = useState<string>(initialData?.description || '');
  const [file, setFile] = useState<File | null>(null);
  const [removeDocument, setRemoveDocument] = useState<boolean>(false);
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
    
    setFile(selectedFile);
    setRemoveDocument(false);
    setError('');
  };
  
  // Handle document removal
  const handleRemoveDocument = () => {
    setRemoveDocument(true);
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
      
      if (!organization) {
        setError('Organization is required');
        setLoading(false);
        return;
      }
      
      if (!date) {
        setError('Date is required');
        setLoading(false);
        return;
      }
      
      // Create FormData
      const formData = new FormData();
      formData.append('dept', dept);
      formData.append('title', title);
      formData.append('organization', organization);
      formData.append('date', date);
      
      if (description) {
        formData.append('description', description);
      }
      
      // Add file if provided
      if (file) {
        formData.append('document_file', file);
      }
      
      // Handle document removal
      if (removeDocument) {
        formData.append('remove_document', 'true');
      }
      
      // Send request
      const url = isEdit 
        ? `/api/industry-news/${initialData?.id}` 
        : '/api/industry-news';
      
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save industry news');
      }
      
      // Success
      setMessage(isEdit ? 'Industry news updated successfully!' : 'Industry news added successfully!');
      
      if (!isEdit) {
        // Reset form for new submissions
        setDept('');
        setTitle('');
        setOrganization('');
        setDate('');
        setDescription('');
        setFile(null);
        setRemoveDocument(false);
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
        {isEdit ? 'Edit Industry News' : 'Add Industry News'}
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
            Title
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
            Organization
          </label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter a description of the news item..."
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document (Optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {file && (
            <div className="mt-2 text-sm text-gray-500">
              Selected file: {file.name}
            </div>
          )}
          {isEdit && initialData?.document_url && !file && !removeDocument && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Current document:</span>
              <a 
                href={`/uploads/industry-news/${initialData.document_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline mr-3"
              >
                View Document
              </a>
              <button
                type="button"
                onClick={handleRemoveDocument}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          )}
          {isEdit && removeDocument && (
            <div className="mt-2 text-sm text-red-600">
              Document will be removed upon save
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
