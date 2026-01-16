'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Users, Building, TrendingUp, Award, BarChart3, PieChart } from 'lucide-react';

interface PlacementStats {
  id: number;
  academic_year: string;
  department_code: string;
  department_name: string;
  total_students: number;
  students_placed: number;
  placement_percentage: number;
  highest_package: number;
  average_package: number;
  companies_visited: number;
}

interface Company {
  id: number;
  name: string;
  logo_url?: string;
  industry: string;
  company_type: string;
  total_hires: number;
  avg_package: number;
  max_package: number;
}

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  is_active: boolean;
  profile_image_url?: string;
}

const PlacementAdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<PlacementStats[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Stats form state
  const [statsForm, setStatsForm] = useState({
    academic_year: '2024-25',
    department_code: '',
    department_name: '',
    total_students: 0,
    students_placed: 0,
    highest_package: 0,
    average_package: 0,
    companies_visited: 0
  });

  // Company form state
  const [companyForm, setCompanyForm] = useState({
    name: '',
    logo_url: '',
    industry: '',
    company_type: 'Service',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    is_active: true
  });

  // Team form state
  const [teamForm, setTeamForm] = useState({
    name: '',
    designation: '',
    department: '',
    role: 'Coordinator',
    email: '',
    phone: '',
    office_phone: '',
    office_extension: '',
    bio: '',
    profile_image_url: '',
    is_active: true
  });
  const [teamImageFile, setTeamImageFile] = useState<File | null>(null);
  const [teamImagePreview, setTeamImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch placement statistics
      const statsResponse = await fetch('/api/admin/placement-statistics');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data?.statistics || []);
      }

      // Fetch companies
      const companiesResponse = await fetch('/api/admin/companies');
      if (companiesResponse.ok) {
        const companiesData = await companiesResponse.json();
        setCompanies(companiesData.data?.companies || []);
      }

      // Fetch team members
      const teamResponse = await fetch('/api/admin/placement-team');
      if (teamResponse.ok) {
        const teamData = await teamResponse.json();
        setTeamMembers(teamData.data?.team_members || []);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = '/api/admin/placement-statistics';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingItem ? { ...statsForm, id: editingItem.id } : statsForm),
      });

      if (response.ok) {
        await fetchData();
        setShowAddModal(false);
        setEditingItem(null);
        resetForms();
      }
    } catch (error) {
    }
  };

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = '/api/admin/companies';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingItem ? { ...companyForm, id: editingItem.id } : companyForm),
      });

      if (response.ok) {
        await fetchData();
        setShowAddModal(false);
        setEditingItem(null);
        resetForms();
      }
    } catch (error) {
    }
  };

  const handleTeamImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      clearTeamImageSelection();
      return;
    }

    if (teamImagePreview && teamImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(teamImagePreview);
    }

    setTeamImageFile(file);
    setTeamImagePreview(URL.createObjectURL(file));
  };

  const clearTeamImageSelection = () => {
    if (teamImagePreview && teamImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(teamImagePreview);
    }
    setTeamImageFile(null);
    setTeamImagePreview(null);
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = '/api/admin/placement-team';
      let payload = editingItem ? { ...teamForm, id: editingItem.id } : teamForm;

      if (teamImageFile) {
        setIsUploadingImage(true);
        const uploadData = new FormData();
        uploadData.append('file', teamImageFile);
        uploadData.append('module', 'team');

        const uploadResponse = await fetch('/api/placement/upload', {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload profile image');
        }

        const uploadResult = await uploadResponse.json();
        payload = { ...payload, profile_image_url: uploadResult.url };
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchData();
        setShowAddModal(false);
        setEditingItem(null);
        resetForms();
      }
    } catch (error) {
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const urls = {
        stats: '/api/admin/placement-statistics',
        companies: '/api/admin/companies',
        team: '/api/admin/placement-team'
      };

      const response = await fetch(`${urls[type as keyof typeof urls]}?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
    }
  };

  const resetForms = () => {
    setStatsForm({
      academic_year: '2024-25',
      department_code: '',
      department_name: '',
      total_students: 0,
      students_placed: 0,
      highest_package: 0,
      average_package: 0,
      companies_visited: 0
    });
    setCompanyForm({
      name: '',
      logo_url: '',
      industry: '',
      company_type: 'Service',
      contact_person: '',
      contact_email: '',
      contact_phone: '',
      is_active: true
    });
    setTeamForm({
      name: '',
      designation: '',
      department: '',
      role: 'Coordinator',
      email: '',
      phone: '',
      office_phone: '',
      office_extension: '',
      bio: '',
      profile_image_url: '',
      is_active: true
    });
    clearTeamImageSelection();
  };

  const startEdit = (type: string, item: any) => {
    setEditingItem(item);
    if (type === 'stats') {
      setStatsForm(item);
    } else if (type === 'companies') {
      setCompanyForm(item);
    } else if (type === 'team') {
      setTeamForm({ ...item, profile_image_url: item.profile_image_url || '' });
      setTeamImageFile(null);
      setTeamImagePreview(item.profile_image_url || null);
    }
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-[#B22222]">Placement Management</h1>
            <div className="text-sm text-gray-600">
              Admin Panel - Sri Vasavi Engineering College
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'statistics', name: 'Statistics', icon: TrendingUp },
              { id: 'companies', name: 'Companies', icon: Building },
              { id: 'team', name: 'Team', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#B22222] text-white'
                      : 'text-gray-600 hover:text-[#B22222] hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-[#B22222]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Departments</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Building className="h-8 w-8 text-[#B22222]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Companies</p>
                    <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-[#B22222]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Team Members</p>
                    <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-[#B22222]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Placement %</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.length > 0 
                        ? (stats.reduce((acc, stat) => acc + stat.placement_percentage, 0) / stats.length).toFixed(1) 
                        : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Placement Statistics</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  resetForms();
                  setShowAddModal(true);
                }}
                className="bg-[#B22222] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#850209]"
              >
                <Plus className="w-4 h-4" />
                Add Statistics
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Academic Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Placed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Highest Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.map((stat) => (
                    <tr key={stat.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{stat.department_name}</div>
                        <div className="text-sm text-gray-500">{stat.department_code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.academic_year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.total_students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.students_placed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          stat.placement_percentage >= 90 
                            ? 'bg-green-100 text-green-800' 
                            : stat.placement_percentage >= 75 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {stat.placement_percentage.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{stat.highest_package} LPA
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => startEdit('stats', stat)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('stats', stat.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Companies</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  resetForms();
                  setShowAddModal(true);
                }}
                className="bg-[#B22222] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#850209]"
              >
                <Plus className="w-4 h-4" />
                Add Company
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div key={company.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit('companies', company)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('companies', company.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Industry:</span> {company.industry}</p>
                    <p><span className="font-medium">Type:</span> {company.company_type}</p>
                    <p><span className="font-medium">Total Hires:</span> {company.total_hires}</p>
                    <p><span className="font-medium">Avg Package:</span> ₹{company.avg_package?.toFixed(2)} LPA</p>
                    <p><span className="font-medium">Max Package:</span> ₹{company.max_package} LPA</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Placement Team</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  resetForms();
                  setShowAddModal(true);
                }}
                className="bg-[#B22222] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#850209]"
              >
                <Plus className="w-4 h-4" />
                Add Team Member
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.designation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.email}</div>
                        <div className="text-sm text-gray-500">{member.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => startEdit('team', member)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('team', member.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingItem ? 'Edit' : 'Add'} {
                  activeTab === 'statistics' ? 'Statistics' :
                  activeTab === 'companies' ? 'Company' :
                  activeTab === 'team' ? 'Team Member' : ''
                }
              </h3>
            </div>
            <div className="p-6">
              {/* Statistics Form */}
              {activeTab === 'statistics' && (
                <form onSubmit={handleSaveStats} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Academic Year
                      </label>
                      <input
                        type="text"
                        value={statsForm.academic_year}
                        onChange={(e) => setStatsForm({ ...statsForm, academic_year: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department Code
                      </label>
                      <input
                        type="text"
                        value={statsForm.department_code}
                        onChange={(e) => setStatsForm({ ...statsForm, department_code: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department Name
                    </label>
                    <input
                      type="text"
                      value={statsForm.department_name}
                      onChange={(e) => setStatsForm({ ...statsForm, department_name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Students
                      </label>
                      <input
                        type="number"
                        value={statsForm.total_students}
                        onChange={(e) => setStatsForm({ ...statsForm, total_students: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Students Placed
                      </label>
                      <input
                        type="number"
                        value={statsForm.students_placed}
                        onChange={(e) => setStatsForm({ ...statsForm, students_placed: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Highest Package (LPA)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={statsForm.highest_package}
                        onChange={(e) => setStatsForm({ ...statsForm, highest_package: parseFloat(e.target.value) })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Average Package (LPA)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={statsForm.average_package}
                        onChange={(e) => setStatsForm({ ...statsForm, average_package: parseFloat(e.target.value) })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Companies Visited
                    </label>
                    <input
                      type="number"
                      value={statsForm.companies_visited}
                      onChange={(e) => setStatsForm({ ...statsForm, companies_visited: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#B22222] text-white rounded-md hover:bg-[#850209]"
                    >
                      {editingItem ? 'Update' : 'Save'}
                    </button>
                  </div>
                </form>
              )}

              {/* Company Form */}
              {activeTab === 'companies' && (
                <form onSubmit={handleSaveCompany} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry
                      </label>
                      <input
                        type="text"
                        value={companyForm.industry}
                        onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Type
                      </label>
                      <select
                        value={companyForm.company_type}
                        onChange={(e) => setCompanyForm({ ...companyForm, company_type: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="Service">Service</option>
                        <option value="Product">Product</option>
                        <option value="Startup">Startup</option>
                        <option value="MNC">MNC</option>
                        <option value="Government">Government</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={companyForm.logo_url}
                      onChange={(e) => setCompanyForm({ ...companyForm, logo_url: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        value={companyForm.contact_person}
                        onChange={(e) => setCompanyForm({ ...companyForm, contact_person: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={companyForm.contact_email}
                        onChange={(e) => setCompanyForm({ ...companyForm, contact_email: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={companyForm.contact_phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, contact_phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={companyForm.is_active}
                      onChange={(e) => setCompanyForm({ ...companyForm, is_active: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="is_active" className="text-sm text-gray-700">
                      Active Company
                    </label>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#B22222] text-white rounded-md hover:bg-[#850209]"
                    >
                      {editingItem ? 'Update' : 'Save'}
                    </button>
                  </div>
                </form>
              )}

              {/* Team Form */}
              {activeTab === 'team' && (
                <form onSubmit={handleSaveTeam} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={teamForm.designation}
                      onChange={(e) => setTeamForm({ ...teamForm, designation: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        value={teamForm.department}
                        onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        value={teamForm.role}
                        onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="Head">Head</option>
                        <option value="Coordinator">Coordinator</option>
                        <option value="Assistant">Assistant</option>
                        <option value="Student Representative">Student Representative</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={teamForm.email}
                        onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={teamForm.phone}
                        onChange={(e) => setTeamForm({ ...teamForm, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Office Phone
                      </label>
                      <input
                        type="tel"
                        value={teamForm.office_phone}
                        onChange={(e) => setTeamForm({ ...teamForm, office_phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Office Extension
                      </label>
                      <input
                        type="text"
                        value={teamForm.office_extension}
                        onChange={(e) => setTeamForm({ ...teamForm, office_extension: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={teamForm.bio}
                      onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="team_is_active"
                      checked={teamForm.is_active}
                      onChange={(e) => setTeamForm({ ...teamForm, is_active: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="team_is_active" className="text-sm text-gray-700">
                      Active Member
                    </label>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#B22222] text-white rounded-md hover:bg-[#850209]"
                    >
                      {editingItem ? 'Update' : 'Save'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementAdminPanel;