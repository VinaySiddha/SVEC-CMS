/**
 * Test page for faculty profiles API
 */

'use client';

import { useState, useEffect, FormEvent } from 'react';
import { FaSpinner, FaCheck, FaTimes, FaEdit, FaTrash, FaUpload } from 'react-icons/fa';

// Define the faculty profile type
interface FacultyProfile {
  id: number;
  dept: string;
  name: string;
  qualification: string | null;
  designation: string | null;
  email: string | null;
  phone: string | null;
  profile_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
}

export default function TestFacultyProfiles() {
  // State management
  const [profiles, setProfiles] = useState<FacultyProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dept: 'cse',
    name: '',
    qualification: '',
    designation: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Load profiles on component mount
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Fetch faculty profiles from API
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/faculty_profiles');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch profiles');
      }
      
      const data = await response.json();
      setProfiles(data.data || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching profiles');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      const formDataToSubmit = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });
      
      // Add file if selected
      if (selectedFile) {
        formDataToSubmit.append('profile', selectedFile);
      }
      
      const url = editId 
        ? `/api/faculty_profiles?id=${editId}`
        : '/api/faculty_profiles';
        
      const method = editId ? 'PUT' : 'POST';
      
      const token = localStorage.getItem('sessionId');
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSubmit,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${editId ? 'update' : 'create'} profile`);
      }
      
      // Reset form on success
      setFormData({
        dept: 'cse',
        name: '',
        qualification: '',
        designation: '',
      });
      setSelectedFile(null);
      setEditId(null);
      
      // Reload profiles
      fetchProfiles();
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting the form');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = (profile: FacultyProfile) => {
    setFormData({
      dept: profile.dept,
      name: profile.name,
      qualification: profile.qualification || '',
      designation: profile.designation || '',
    });
    setEditId(profile.id);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this profile?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/faculty_profiles?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete profile');
      }
      
      // Reload profiles
      fetchProfiles();
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the profile');
      setLoading(false);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setFormData({
      dept: 'cse',
      name: '',
      qualification: '',
      designation: '',
    });
    setSelectedFile(null);
    setEditId(null);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Faculty Profiles API Test</h1>
      
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
          {editId ? 'Edit Faculty Profile' : 'Add New Faculty Profile'}
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
              <label className="block mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            
            <div>
              <label className="block mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            
            <div>
              <label className="block mb-1">Profile Photo</label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="profile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label 
                  htmlFor="profile"
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded cursor-pointer flex items-center"
                >
                  <FaUpload className="mr-2" />
                  {selectedFile ? 'Change Photo' : 'Select Photo'}
                </label>
                {selectedFile && (
                  <span className="ml-3 text-sm text-gray-600">
                    {selectedFile.name}
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
                  {editId ? 'Update Profile' : 'Add Profile'}
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
      
      {/* Profiles List */}
      <div className="bg-white shadow-md rounded overflow-hidden">
        <h2 className="text-xl font-bold p-4 border-b">Faculty Profiles</h2>
        
        {loading && !profiles.length ? (
          <div className="flex justify-center items-center p-8">
            <FaSpinner className="animate-spin text-blue-500 text-2xl mr-3" />
            <span>Loading profiles...</span>
          </div>
        ) : profiles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No faculty profiles found. Add a profile to get started.
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
                    Profile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qualification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-t">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {profile.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {profile.profile_url ? (
                        <img 
                          src={profile.profile_url} 
                          alt={profile.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {profile.name.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap uppercase">
                      {profile.dept}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {profile.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {profile.qualification || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {profile.designation || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        profile.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : profile.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {profile.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(profile)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(profile.id)}
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
