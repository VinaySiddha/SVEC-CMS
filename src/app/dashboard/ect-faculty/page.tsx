'use client';

import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, X } from 'lucide-react';

interface Faculty {
  id: number;
  name: string;
  qualification: string;
  designation: string;
  profileUrl: string;
  faculty_type: string;
  date_of_joining: string;
}

export default function ECTFacultyDashboard() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    designation: '',
    profile_url: '',
    faculty_type: 'teaching',
    date_of_joining: ''
  });

  // Fetch faculty data
  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ect-faculty', { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch faculty');
      const data = await response.json();
      setFaculty(data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      alert('Failed to load faculty data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open modal for adding
  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentFaculty(null);
    setFormData({
      name: '',
      qualification: '',
      designation: '',
      profile_url: '',
      faculty_type: 'teaching',
      date_of_joining: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (facultyMember: Faculty) => {
    setIsEditMode(true);
    setCurrentFaculty(facultyMember);
    setFormData({
      name: facultyMember.name,
      qualification: facultyMember.qualification || '',
      designation: facultyMember.designation,
      profile_url: facultyMember.profileUrl || '',
      faculty_type: facultyMember.faculty_type || 'teaching',
      date_of_joining: facultyMember.date_of_joining ? facultyMember.date_of_joining.split('T')[0] : ''
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFaculty(null);
    setFormData({
      name: '',
      qualification: '',
      designation: '',
      profile_url: '',
      faculty_type: 'teaching',
      date_of_joining: ''
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.designation) {
      alert('Please fill in all required fields (Name and Designation)');
      return;
    }

    try {
      const url = isEditMode ? `/api/ect-faculty?id=${currentFaculty?.id}` : '/api/ect-faculty';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save faculty member');
      }

      alert(isEditMode ? 'Faculty member updated successfully!' : 'Faculty member added successfully!');
      closeModal();
      fetchFaculty();
    } catch (error) {
      console.error('Error saving faculty:', error);
      alert(error instanceof Error ? error.message : 'Failed to save faculty member');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this faculty member?')) return;

    try {
      const response = await fetch(`/api/ect-faculty?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete faculty member');
      }

      alert('Faculty member deleted successfully!');
      fetchFaculty();
    } catch (error) {
      console.error('Error deleting faculty:', error);
      alert('Failed to delete faculty member');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[#B22222]" />
            <h1 className="text-3xl font-bold text-gray-900">ECT Faculty Management</h1>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#B22222] text-white rounded-lg hover:bg-[#A01E1E] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Faculty
          </button>
        </div>

        {/* Faculty Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#B22222] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading faculty...</p>
          </div>
        ) : faculty.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No faculty members found. Click "Add Faculty" to get started.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Joining</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {faculty.map((member, index) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.qualification || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.designation}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          member.faculty_type === 'teaching' ? 'bg-blue-100 text-blue-800' :
                          member.faculty_type === 'technical' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {member.faculty_type || 'teaching'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.date_of_joining ? new Date(member.date_of_joining).toLocaleDateString('en-GB') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(member)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditMode ? 'Edit Faculty Member' : 'Add New Faculty Member'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22222] focus:border-transparent"
                  placeholder="Enter faculty name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22222] focus:border-transparent"
                  placeholder="e.g., M.Tech, Ph.D."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22222] focus:border-transparent"
                  placeholder="e.g., Professor, Associate Professor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile URL
                </label>
                <input
                  type="url"
                  name="profile_url"
                  value={formData.profile_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22222] focus:border-transparent"
                  placeholder="https://example.com/profile.pdf"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Faculty Type
                </label>
                <select
                  name="faculty_type"
                  value={formData.faculty_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22222] focus:border-transparent"
                >
                  <option value="teaching">Teaching</option>
                  <option value="technical">Technical</option>
                  <option value="non_teaching">Non-Teaching</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Joining <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date_of_joining"
                  value={formData.date_of_joining}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22222] focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#B22222] text-white rounded-lg hover:bg-[#A01E1E] transition-colors font-medium"
                >
                  {isEditMode ? 'Update Faculty' : 'Add Faculty'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
