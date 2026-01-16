'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, Edit2, Trash2, Plus, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface Notice {
  id: number;
  title: string;
  category: string;
  content: string;
  file_url?: string;
  posted_date: string;
  created_at?: string;
  updated_at?: string;
}

export default function PlacementNoticeboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [formData, setFormData] = useState<Partial<Notice>>({
    title: '',
    category: 'general',
    content: '',
    file_url: '',
    posted_date: new Date().toISOString().split('T')[0]
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const categories = [
    { value: 'general', label: 'General Notice' },
    { value: 'recruitment', label: 'Recruitment Drive' },
    { value: 'interview', label: 'Interview Schedule' },
    { value: 'events', label: 'Events' },
    { value: 'Images', label: 'Images' },
    
  ];

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Fetch notices
  const fetchNotices = async () => {
    try {
      setDataLoading(true);
      const response = await fetch('/api/placement/noticeboard');
      const data = await response.json();
      
      if (data.success) {
        setNotices(data.data || []);
      } else {
        toast.error(data.message || 'Failed to fetch notices');
      }
    } catch (error) {
      toast.error('Error fetching notices');
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only PDF, Word, Excel, and image files are allowed');
        return;
      }
      setUploadedFile(file);
      setFormData({ ...formData, file_url: file.name });
      toast.success('File selected: ' + file.name);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      let body: any = editingId ? { ...formData, id: editingId } : formData;
      
      // Handle file upload if a new file was selected
      if (uploadedFile && !editingId) {
        const formDataWithFile = new FormData();
        formDataWithFile.append('title', formData.title || '');
        formDataWithFile.append('category', formData.category || '');
        formDataWithFile.append('content', formData.content || '');
        formDataWithFile.append('posted_date', formData.posted_date || '');
        formDataWithFile.append('file', uploadedFile);

        const response = await fetch('/api/placement/noticeboard', {
          method: 'POST',
          body: formDataWithFile
        });
        const data = await response.json();
        if (data.success) {
          toast.success('Notice created successfully');
          setFormData({
            title: '',
            category: 'general',
            content: '',
            file_url: '',
            posted_date: new Date().toISOString().split('T')[0]
          });
          setUploadedFile(null);
          setIsAddingNew(false);
          await fetchNotices();
        } else {
          toast.error(data.message || 'Failed to create notice');
        }
        return;
      }

      // If editing and new file selected, include old file URL for deletion
      if (editingId && uploadedFile) {
        const currentNotice = notices.find(n => n.id === editingId);
        if (currentNotice?.file_url) {
          body.oldFileUrl = currentNotice.file_url;
        }
      }

      const response = await fetch('/api/placement/noticeboard', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingId ? 'Notice updated successfully (old file removed if replaced)' : 'Notice created successfully');
        setFormData({
          title: '',
          category: 'general',
          content: '',
          file_url: '',
          posted_date: new Date().toISOString().split('T')[0]
        });
        setUploadedFile(null);
        setEditingId(null);
        setIsAddingNew(false);
        await fetchNotices();
      } else {
        toast.error(data.message || 'Failed to save notice');
      }
    } catch (error) {
      toast.error('Error saving notice');
    }
  };

  // Handle edit
  const handleEdit = (notice: Notice) => {
    setFormData(notice);
    setEditingId(notice.id);
    setIsAddingNew(true);
    setUploadedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      title: '',
      category: 'general',
      content: '',
      file_url: '',
      posted_date: new Date().toISOString().split('T')[0]
    });
    setUploadedFile(null);
    setEditingId(null);
    setIsAddingNew(false);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;

    try {
      const response = await fetch('/api/placement/noticeboard', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Notice deleted successfully');
        await fetchNotices();
      } else {
        toast.error(data.message || 'Failed to delete notice');
      }
    } catch (error) {
      toast.error('Error deleting notice');
    }
  };

  // Filter notices
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50">
      {/* Top Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 sticky top-0 z-50 shadow-sm m-6 mt-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/placement/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 border border-blue-200 font-medium whitespace-nowrap">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Placement Noticeboard</h1>
              <p className="text-gray-600">Manage placement notices and announcements</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Add/Edit Form */}
        {isAddingNew && (
          <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {editingId ? 'Edit Notice' : 'Add New Notice'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Notice title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category || 'general'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Posted Date
                    </label>
                    <Input
                      type="date"
                      value={formData.posted_date || ''}
                      onChange={(e) => setFormData({ ...formData, posted_date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attachment (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      {uploadedFile && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded whitespace-nowrap">
                          ✓ {uploadedFile.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PDF, Word, Excel, or Image (Max 10MB)</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Notice content"
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                    {editingId ? 'Update Notice' : 'Add Notice'}
                  </Button>
                  <Button type="button" onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search & Filter */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="search"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {!isAddingNew && (
            <Button
              onClick={() => setIsAddingNew(true)}
              className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Notice
            </Button>
          )}
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <Card key={notice.id} className="hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          notice.category === 'urgent' ? 'bg-red-100 text-red-700' :
                          notice.category === 'recruitment' ? 'bg-blue-100 text-blue-700' :
                          notice.category === 'interview' ? 'bg-purple-100 text-purple-700' :
                          notice.category === 'deadline' ? 'bg-yellow-100 text-yellow-700' :
                          notice.category === 'company' ? 'bg-indigo-100 text-indigo-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {categories.find(c => c.value === notice.category)?.label}
                        </span>
                        <span className="text-xs text-gray-500">
                          {notice.posted_date ? new Date(notice.posted_date).toLocaleDateString('en-IN') : 'N/A'}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{notice.title}</h3>
                      <p className="text-gray-600 mb-3">{notice.content}</p>
                      {notice.file_url && (
                        <a
                          href={`/uploads/placement-noticeboard/${notice.file_url}`}
                          download
                          className="text-orange-600 hover:underline text-sm font-medium"
                        >
                          📎 Download Attachment
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(notice)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-yellow-100 text-yellow-600 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-red-100 text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 text-lg">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'No notices match your search criteria' 
                    : 'No notices yet. Create your first notice to get started!'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
