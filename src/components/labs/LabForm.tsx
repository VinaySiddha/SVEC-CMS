"use client";

import { useState, useEffect } from 'react';
import { Lab, Configuration } from '@/utils/lab-utils';

interface LabFormProps {
  onSuccess?: () => void;
  initialData?: Lab | null;
  isEdit?: boolean;
  departments: { id: string; name: string }[];
}

export function LabForm({
  onSuccess,
  initialData = null,
  isEdit = false,
  departments,
}: LabFormProps) {
  const [dept, setDept] = useState<string>(initialData?.dept || '');
  const [labName, setLabName] = useState<string>(initialData?.lab_name || '');
  const [usage, setUsage] = useState<string>(initialData?.usage || '');
  const [status, setStatus] = useState<string>(initialData?.status || 'active');
  const [files, setFiles] = useState<File[]>([]);
  const [configurations, setConfigurations] = useState<Configuration[]>(
    initialData?.configurations || []
  );
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  // Configuration form state
  const [currentSystem, setCurrentSystem] = useState<string>('');
  const [currentQuantity, setCurrentQuantity] = useState<number | ''>('');
  const [currentDetails, setCurrentDetails] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  // Add or update configuration
  const handleAddConfiguration = () => {
    if (!currentSystem) {
      setError('System name is required');
      return;
    }
    
    if (!currentQuantity) {
      setError('Quantity is required');
      return;
    }
    
    const newConfig: Configuration = {
      system: currentSystem,
      quantity: Number(currentQuantity),
      details: currentDetails || undefined
    };
    
    if (editingIndex !== null) {
      // Update existing configuration
      const newConfigurations = [...configurations];
      newConfigurations[editingIndex] = newConfig;
      setConfigurations(newConfigurations);
    } else {
      // Add new configuration
      setConfigurations([...configurations, newConfig]);
    }
    
    // Reset form
    setCurrentSystem('');
    setCurrentQuantity('');
    setCurrentDetails('');
    setEditingIndex(null);
    setError('');
  };
  
  // Edit a configuration
  const handleEditConfiguration = (index: number) => {
    const config = configurations[index];
    setCurrentSystem(config.system);
    setCurrentQuantity(config.quantity);
    setCurrentDetails(config.details || '');
    setEditingIndex(index);
  };
  
  // Delete a configuration
  const handleDeleteConfiguration = (index: number) => {
    const newConfigurations = [...configurations];
    newConfigurations.splice(index, 1);
    setConfigurations(newConfigurations);
    
    // If deleting the one being edited, reset the form
    if (editingIndex === index) {
      setCurrentSystem('');
      setCurrentQuantity('');
      setCurrentDetails('');
      setEditingIndex(null);
    }
  };
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFiles = Array.from(e.target.files);
    
    // Check file sizes (max 3MB per file)
    const oversizedFiles = selectedFiles.filter(file => file.size > 3 * 1024 * 1024);
    
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the 3MB size limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    setFiles(selectedFiles);
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
      
      if (!labName) {
        setError('Lab name is required');
        setLoading(false);
        return;
      }
      
      // Create FormData
      const formData = new FormData();
      formData.append('dept', dept);
      formData.append('lab_name', labName);
      formData.append('configurations', JSON.stringify(configurations));
      formData.append('usage', usage);
      formData.append('status', status);
      
      // Add files
      if (files.length > 0) {
        files.forEach(file => {
          formData.append('files', file);
        });
      }
      
      // Send request
      const url = isEdit 
        ? `/api/labs/${initialData?.id}` 
        : '/api/labs';
      
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save lab');
      }
      
      // Success
      setMessage(isEdit ? 'Lab updated successfully!' : 'Lab added successfully!');
      
      if (!isEdit) {
        // Reset form for new submissions
        setDept('');
        setLabName('');
        setUsage('');
        setConfigurations([]);
        setStatus('active');
        setFiles([]);
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
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit Lab' : 'Add New Lab'}</h2>
      
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
            Lab Name
          </label>
          <input
            type="text"
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        {/* Configurations Section */}
        <div className="mb-6 border border-gray-200 rounded-md p-4">
          <h3 className="font-medium text-gray-700 mb-3">Lab Configurations</h3>
          
          {/* Configuration List */}
          {configurations.length > 0 && (
            <div className="mb-4">
              <table className="min-w-full divide-y divide-gray-200 mb-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {configurations.map((config, index) => (
                    <tr key={index} className={editingIndex === index ? "bg-blue-50" : ""}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{config.system}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{config.quantity}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{config.details || '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => handleEditConfiguration(index)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteConfiguration(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Add/Edit Configuration Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                System Name
              </label>
              <input
                type="text"
                value={currentSystem}
                onChange={(e) => setCurrentSystem(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Desktop Computer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={currentQuantity}
                onChange={(e) => setCurrentQuantity(e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 30"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Details (Optional)
              </label>
              <input
                type="text"
                value={currentDetails}
                onChange={(e) => setCurrentDetails(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Core i5, 8GB RAM"
              />
            </div>
          </div>
          
          <div className="mt-2 text-right">
            <button
              type="button"
              onClick={handleAddConfiguration}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingIndex !== null ? 'Update Configuration' : 'Add Configuration'}
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lab Usage
          </label>
          <textarea
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe how this lab is used..."
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lab Images (Max 3MB each)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            accept="image/*"
            multiple
          />
          {files.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              Selected files: {files.map(f => f.name).join(', ')}
            </div>
          )}
          {initialData?.image_url && initialData.image_url.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-2">Current images:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {initialData.image_url.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={`/uploads/${url}`}
                      alt={`Lab image ${idx + 1}`}
                      className="h-24 w-24 object-cover rounded"
                      onError={(e) => {
                        // If image fails to load, show a placeholder
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Image';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
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
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Lab' : 'Save Lab'}
          </button>
        </div>
      </form>
    </div>
  );
}
