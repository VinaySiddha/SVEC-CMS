/**
 * Test page for Board of Studies API
 */

'use client';

import { useState, useEffect, FormEvent } from 'react';
import { FaSpinner, FaCheck, FaTimes, FaEdit, FaTrash, FaUpload, FaDownload } from 'react-icons/fa';

// Define the board of studies type
interface BoardOfStudies {
  id: number;
  dept: string;
  description: string;
  document_url: string | null;
  academic_year: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function TestBoardOfStudies() {
  // State management
  const [documents, setDocuments] = useState<BoardOfStudies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dept: 'cse',
    description: '',
    academic_year: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Load documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Fetch documents from API
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/board_of_studies');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch documents');
      }
      
      const data = await response.json();
      setDocuments(data.data || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching documents');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds the maximum limit of 5MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (formData.description.length < 10) {
        setError('Description must be at least 10 characters long');
        return;
      }
      
      setSubmitting(true);
      setError(null);
      
      const formDataToSubmit = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });
      
      // Add file if selected
      if (selectedFile) {
        formDataToSubmit.append('document', selectedFile);
      }
      
      const url = editId 
        ? `/api/board_of_studies?id=${editId}`
        : '/api/board_of_studies';
        
      const method = editId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${editId ? 'update' : 'create'} document`);
      }
      
      // Reset form on success
      setFormData({
        dept: 'cse',
        description: '',
        academic_year: '',
      });
      setSelectedFile(null);
      setEditId(null);
      
      // Reload documents
      fetchDocuments();
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting the form');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = (document: BoardOfStudies) => {
    setFormData({
      dept: document.dept,
      description: document.description,
      academic_year: document.academic_year || '',
    });
    setEditId(document.id);
    setSelectedFile(null);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/board_of_studies?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete document');
      }
      
      // Reload documents
      fetchDocuments();
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the document');
      setLoading(false);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setFormData({
      dept: 'cse',
      description: '',
      academic_year: '',
    });
    setSelectedFile(null);
    setEditId(null);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Board of Studies API Test</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
          <button 
            onClick={() => setError(null)}
            className="text-sm underline mt-1"
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* Form */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">
          {editId ? 'Edit Document' : 'Add New Document'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Department *</label>
              <select
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="cse">CSE</option>
                <option value="ece">ECE</option>
                <option value="eee">EEE</option>
                <option value="civil">Civil</option>
                <option value="mech">Mechanical</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-1">Academic Year</label>
              <input
                type="text"
                name="academic_year"
                value={formData.academic_year}
                onChange={handleChange}
                placeholder="e.g., 2024-25"
                className="w-full border rounded p-2"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded p-2"
                placeholder="Enter a detailed description of this document (minimum 10 characters)"
                required
              />
              {formData.description && formData.description.length < 10 && (
                <p className="text-sm text-red-500 mt-1">
                  Description must be at least 10 characters (currently {formData.description.length})
                </p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-1">Document (PDF only, max 5MB)</label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="document"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label 
                  htmlFor="document"
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded cursor-pointer flex items-center"
                >
                  <FaUpload className="mr-2" />
                  {selectedFile ? 'Change Document' : 'Select Document'}
                </label>
                {selectedFile && (
                  <span className="ml-3 text-sm text-gray-600">
                    {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaCheck className="mr-2" />
                  {editId ? 'Update Document' : 'Add Document'}
                </>
              )}
            </button>
            
            {editId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Documents List */}
      <div className="bg-white shadow-md rounded overflow-hidden">
        <h2 className="text-xl font-bold p-4 border-b">Board of Studies Documents</h2>
        
        {loading && !documents.length ? (
          <div className="flex justify-center items-center p-8">
            <FaSpinner className="animate-spin text-blue-500 text-2xl mr-3" />
            <span>Loading documents...</span>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No documents found. Add a document to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Academic Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr key={document.id} className="border-t">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {document.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap uppercase">
                      {document.dept}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {document.academic_year || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md truncate">
                        {document.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {document.document_url ? (
                        <a 
                          href={document.document_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <FaDownload className="mr-2" />
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-400">No document</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        document.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : document.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {document.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(document.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(document)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(document.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
