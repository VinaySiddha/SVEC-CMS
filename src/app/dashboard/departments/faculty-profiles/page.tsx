'use client';

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCheck } from 'lucide-react';
import StatusBadge from '@/components/ui/status-badge';
import DataTable from '@/components/ui/data-table';
import ModalForm from '@/components/ui/modal-form';
import ConfirmModal from '@/components/ui/confirm-modal';
import { facultyProfileSchema, FacultyProfileFormData, FacultyProfileResponse } from '@/lib/validation/faculty-profile-schema';

export default function FacultyProfilesPage() {
  // Tab state
  const [activeTab, setActiveTab] = useState('teaching');
  
  // State for faculty profiles data (teaching faculty)
  const [profiles, setProfiles] = useState<FacultyProfileResponse[]>([]);
  // State for non-teaching staff
  const [nonTeachingStaff, setNonTeachingStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  
  // Form state for teaching faculty
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FacultyProfileFormData>({
    dept: '',
    name: '',
    qualification: '',
    designation: '',
    profile: undefined
  });
  
  // Form state for non-teaching staff
  const [isNonTeachingModalOpen, setIsNonTeachingModalOpen] = useState(false);
  const [nonTeachingFormData, setNonTeachingFormData] = useState({
    dept: 'eee',
    name: '',
    designation: '',
    email: '',
    phone: '',
    employee_id: ''
  });
  const [editingNonTeachingId, setEditingNonTeachingId] = useState<number | null>(null);
  
  // Delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Fetch data on component mount and when pagination changes
  useEffect(() => {
    fetchProfiles();
  }, [pagination.page, pagination.limit]);
  
  // Function to fetch faculty profiles from API
  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/faculty_profiles?page=${pagination.page}&limit=${pagination.limit}`
      );
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setProfiles(data.data || []);
      setPagination(prev => ({
        ...prev,
        total: data.meta?.total || 0
      }));
    } catch (err) {
      console.error('Error fetching faculty profiles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Function to handle file upload changes
  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      profile: file || undefined
    }));
    
    // Clear error for profile if it exists
    if (formErrors.profile) {
      setFormErrors(prev => ({
        ...prev,
        profile: ''
      }));
    }
  };
  
  // Function to open the modal form
  const openModal = () => {
    // Reset form data
    setFormData({
      dept: '',
      name: '',
      qualification: '',
      designation: '',
      profile: undefined
    });
    
    // Clear any previous errors
    setFormErrors({});
    setIsModalOpen(true);
  };
  
  // Function to close the modal form
  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
  };
  
  // Function to validate and submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data with zod
      facultyProfileSchema.parse(formData);
      
      setIsSubmitting(true);
      setFormErrors({});
      
      // Create FormData object for file upload
      const submitData = new FormData();
      submitData.append('dept', formData.dept);
      submitData.append('name', formData.name);
      
      if (formData.qualification) {
        submitData.append('qualification', formData.qualification);
      }
      
      if (formData.designation) {
        submitData.append('designation', formData.designation);
      }
      
      if (formData.profile) {
        submitData.append('profile', formData.profile);
      }
      
      // Submit data to API
      const response = await fetch('/api/faculty_profiles', {
        method: 'POST',
        body: submitData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      // Success - close modal and refresh data
      setIsModalOpen(false);
      fetchProfiles();
      
    } catch (err) {
      console.error('Form submission error:', err);
      
      if (err instanceof z.ZodError) {
        // Handle zod validation errors
        const errors: Record<string, string> = {};
        
        err.errors.forEach((error) => {
          if (error.path) {
            errors[error.path[0] as string] = error.message;
          }
        });
        
        setFormErrors(errors);
      } else if (err instanceof Error) {
        // Handle other errors
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Function to handle page change
  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      page
    }));
  };
  
  // Function to handle page size change
  const handleLimitChange = (limit: number) => {
    setPagination(prev => ({
      ...prev,
      page: 1,  // Reset to first page when changing page size
      limit
    }));
  };
  
  // Function to open delete confirmation modal
  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };
  
  // Function to handle delete
  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/faculty_profiles/${deleteId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      // Success - close modal and refresh data
      setDeleteConfirmOpen(false);
      setDeleteId(null);
      fetchProfiles();
      
    } catch (err) {
      console.error('Error deleting faculty profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete faculty profile');
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Table columns configuration
  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      cell: (profile: FacultyProfileResponse) => (
        <div className="font-medium text-gray-900">{profile.name}</div>
      )
    },
    {
      header: 'Qualification',
      accessor: 'qualification',
      cell: (profile: FacultyProfileResponse) => (
        <div>{profile.qualification || '-'}</div>
      )
    },
    {
      header: 'Designation',
      accessor: 'designation',
      cell: (profile: FacultyProfileResponse) => (
        <div>{profile.designation || '-'}</div>
      )
    },
    {
      header: 'Profile',
      accessor: 'profile_url',
      cell: (profile: FacultyProfileResponse) => (
        profile.profile_url ? (
          <a 
            href={profile.profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        )
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (profile: FacultyProfileResponse) => (
        <StatusBadge status={profile.status} />
      )
    },
    {
      header: 'Actions',
      accessor: (profile: FacultyProfileResponse) => (
        <div className="flex space-x-2">
          <button
            onClick={() => confirmDelete(profile.id)}
            className="text-red-600 hover:text-red-900"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
    }
  ];

  // Non-teaching staff management functions
  const fetchNonTeachingStaff = async () => {
    try {
      const response = await fetch('/api/public/departments/eee');
      if (!response.ok) throw new Error('Failed to fetch non-teaching staff');
      
      const result = await response.json();
      if (result.success && result.data && result.data.nonTeachingStaff) {
        setNonTeachingStaff(result.data.nonTeachingStaff);
      }
    } catch (error) {
      console.error('Error fetching non-teaching staff:', error);
    }
  };

  const handleNonTeachingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = editingNonTeachingId 
        ? `/api/admin/non-teaching-staff/${editingNonTeachingId}`
        : '/api/admin/non-teaching-staff';
      
      const method = editingNonTeachingId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nonTeachingFormData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save staff member');
      }

      setIsNonTeachingModalOpen(false);
      setEditingNonTeachingId(null);
      resetNonTeachingForm();
      fetchNonTeachingStaff();
    } catch (error) {
      console.error('Error saving non-teaching staff:', error);
      setError(error instanceof Error ? error.message : 'Failed to save staff member');
    }
  };

  const handleNonTeachingEdit = (staff: any) => {
    setEditingNonTeachingId(staff.id);
    setNonTeachingFormData({
      dept: staff.dept,
      name: staff.name,
      designation: staff.designation,
      email: staff.email || '',
      phone: staff.phone || '',
      employee_id: staff.employee_id || ''
    });
    setIsNonTeachingModalOpen(true);
  };

  const handleNonTeachingDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      try {
        const response = await fetch(`/api/admin/non-teaching-staff/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete staff member');
        }

        fetchNonTeachingStaff();
      } catch (error) {
        console.error('Error deleting non-teaching staff:', error);
        setError(error instanceof Error ? error.message : 'Failed to delete staff member');
      }
    }
  };

  const resetNonTeachingForm = () => {
    setNonTeachingFormData({
      dept: 'eee',
      name: '',
      designation: '',
      email: '',
      phone: '',
      employee_id: ''
    });
  };

  // Load non-teaching staff when tab changes
  useEffect(() => {
    if (activeTab === 'non-teaching') {
      fetchNonTeachingStaff();
    }
  }, [activeTab]);
  
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Faculty & Staff Management</h1>
        <p className="text-gray-600">Manage teaching faculty and non-teaching staff profiles</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teaching" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Teaching Faculty
          </TabsTrigger>
          <TabsTrigger value="non-teaching" className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Non-Teaching Staff
          </TabsTrigger>
        </TabsList>

        {/* Teaching Faculty Tab */}
        <TabsContent value="teaching" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Teaching Faculty Profiles</h2>
            <button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Faculty Profile
            </button>
          </div>
      
      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {/* Data Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <DataTable
          data={profiles}
          columns={columns}
          keyField="id"
          pagination={{
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total
          }}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          isLoading={loading}
          emptyMessage="No faculty profiles found"
        />
      </div>
        </TabsContent>

        {/* Non-Teaching Staff Tab */}
        <TabsContent value="non-teaching" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Non-Teaching Staff</h2>
            <button
              onClick={() => {
                setEditingNonTeachingId(null);
                resetNonTeachingForm();
                setIsNonTeachingModalOpen(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Staff Member
            </button>
          </div>

          {/* Non-Teaching Staff List */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {nonTeachingStaff.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <UserCheck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No non-teaching staff found.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {nonTeachingStaff.map((staff) => (
                  <div key={staff.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{staff.name}</h3>
                      <p className="text-sm text-gray-600">{staff.designation}</p>
                      {staff.email && (
                        <p className="text-sm text-gray-500">{staff.email}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleNonTeachingEdit(staff)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleNonTeachingDelete(staff.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-md text-red-700">
          {error}
        </div>
      )}
      <ModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Faculty Profile"
        isSubmitting={isSubmitting}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Department Field */}
            <div>
              <label htmlFor="dept" className="block text-sm font-medium text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="dept"
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  formErrors.dept ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.dept && (
                <p className="mt-1 text-sm text-red-600">{formErrors.dept}</p>
              )}
            </div>
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  formErrors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>
            
            {/* Qualification Field */}
            <div>
              <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            {/* Designation Field */}
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            {/* Profile Photo Upload */}
            <div>
              <label htmlFor="profile" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                id="profile"
                accept="image/jpeg,image/png"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.profile && (
                <p className="mt-1 text-sm text-red-600">{formErrors.profile}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">Upload profile photo (JPEG or PNG, max 2MB)</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              disabled={isSubmitting}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </ModalForm>

      {/* Add/Edit Non-Teaching Staff Modal */}
      <ModalForm
        isOpen={isNonTeachingModalOpen}
        onClose={() => {
          setIsNonTeachingModalOpen(false);
          setEditingNonTeachingId(null);
          resetNonTeachingForm();
        }}
        title={editingNonTeachingId ? "Edit Staff Member" : "Add Non-Teaching Staff Member"}
      >
        <form onSubmit={handleNonTeachingSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="staff_name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="staff_name"
                value={nonTeachingFormData.name}
                onChange={(e) => setNonTeachingFormData({...nonTeachingFormData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="staff_designation" className="block text-sm font-medium text-gray-700 mb-1">
                Designation *
              </label>
              <input
                type="text"
                id="staff_designation"
                value={nonTeachingFormData.designation}
                onChange={(e) => setNonTeachingFormData({...nonTeachingFormData, designation: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="staff_email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="staff_email"
                value={nonTeachingFormData.email}
                onChange={(e) => setNonTeachingFormData({...nonTeachingFormData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="staff_phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="staff_phone"
                value={nonTeachingFormData.phone}
                onChange={(e) => setNonTeachingFormData({...nonTeachingFormData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="staff_employee_id" className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID
              </label>
              <input
                type="text"
                id="staff_employee_id"
                value={nonTeachingFormData.employee_id}
                onChange={(e) => setNonTeachingFormData({...nonTeachingFormData, employee_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setIsNonTeachingModalOpen(false);
                setEditingNonTeachingId(null);
                resetNonTeachingForm();
              }}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              {editingNonTeachingId ? 'Update Staff Member' : 'Add Staff Member'}
            </button>
          </div>
        </form>
      </ModalForm>
      
      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Faculty Profile"
        message="Are you sure you want to delete this faculty profile? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        type="danger"
      />
    </div>
  );
}
