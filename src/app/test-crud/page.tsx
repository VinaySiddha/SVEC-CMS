'use client';

import { useState, useEffect } from 'react';
import { FacultyProfile } from '@/lib/entityConfig';

export default function TestCrud() {
  const [entities, setEntities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FacultyProfile>>({
    name: '',
    designation: 'Assistant Professor',
    qualification: 'Ph.D',
    specialization: 'Computer Science',
    experience: 5,
    email: 'faculty@example.com',
    joining_date: '2020-01-01',
    is_hod: false,
    is_active: true,
  });

  // Load faculty profiles on component mount
  useEffect(() => {
    fetchEntities();
  }, []);

  // Function to fetch faculty profiles
  const fetchEntities = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/faculty_profiles', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch faculty profiles');
      }
      
      const data = await response.json();
      setEntities(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new faculty profile
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/faculty_profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create faculty profile');
      }
      
      // Reset form and reload entities
      setFormData({
        name: '',
        designation: 'Assistant Professor',
        qualification: 'Ph.D',
        specialization: 'Computer Science',
        experience: 5,
        email: 'faculty@example.com',
        joining_date: '2020-01-01',
        is_hod: false,
        is_active: true,
      });
      fetchEntities();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a faculty profile
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this faculty profile?')) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/faculty_profiles/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete faculty profile');
      }
      
      fetchEntities();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? parseFloat(value) 
          : value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test CRUD Operations - Faculty Profiles</h1>
      
      {/* Error alert */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {/* Create form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Faculty Profile</h2>
        <form onSubmit={handleCreate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Joining Date</label>
              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="is_hod"
                checked={formData.is_hod}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">Is HOD</label>
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">Is Active</label>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Faculty Profile'}
            </button>
          </div>
        </form>
      </div>
      
      {/* List of faculty profiles */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Faculty Profiles</h2>
        
        {loading && <p className="text-gray-500">Loading...</p>}
        
        {!loading && entities.length === 0 && (
          <p className="text-gray-500">No faculty profiles found.</p>
        )}
        
        {entities.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Designation</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Is HOD</th>
                  <th className="px-4 py-2 text-left">Is Active</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entities.map((entity) => (
                  <tr key={entity.id} className="border-t">
                    <td className="px-4 py-2">{entity.id}</td>
                    <td className="px-4 py-2">{entity.name}</td>
                    <td className="px-4 py-2">{entity.designation}</td>
                    <td className="px-4 py-2">{entity.email}</td>
                    <td className="px-4 py-2">{entity.is_hod ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-2">{entity.is_active ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(entity.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
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
      </div>
    </div>
  );
}
