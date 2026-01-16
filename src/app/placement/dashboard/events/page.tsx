'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUp, Edit2, Trash2, Plus, ArrowLeft, Download, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface PlacementEvent {
  id: number;
  title: string;
  circular_url?: string;
  link?: string;
  guidelines_url?: string;
  created_at?: string;
  updated_at?: string;
}

export default function PlacementEventsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<PlacementEvent[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<PlacementEvent>>({
    title: '',
    circular_url: '',
    link: '',
    guidelines_url: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<{
    circular: File | null;
    guidelines: File | null;
  }>({
    circular: null,
    guidelines: null
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'placement')) {
      router.push('/placement/dashboard');
    }
  }, [isAuthenticated, isLoading, user, router]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setDataLoading(true);
      const response = await fetch('/api/placement/events');
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setEvents(result.data);
      }
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setDataLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'circular' | 'guidelines') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };

  const uploadFile = async (file: File, fileType: 'circular' | 'guidelines'): Promise<string> => {
    const formDataToSend = new FormData();
    formDataToSend.append('file', file);
    formDataToSend.append('folder', `placement_events/${fileType}`);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formDataToSend
    });

    const data = await response.json();
    if (data.success) {
      return data.url;
    }
    throw new Error(`Failed to upload ${fileType} file`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      const submitData: any = {
        ...formData,
        title: formData.title?.trim()
      };

      // Store old URLs for deletion on update
      if (editingId) {
        const currentEvent = events.find(e => e.id === editingId);
        if (currentEvent) {
          submitData.oldCircularUrl = currentEvent.circular_url;
          submitData.oldGuidelinesUrl = currentEvent.guidelines_url;
        }
      }

      // Upload circular PDF if new file is selected
      if (uploadedFiles.circular) {
        const circularUrl = await uploadFile(uploadedFiles.circular, 'circular');
        submitData.circular_url = circularUrl;
      }

      // Upload guidelines PDF if new file is selected
      if (uploadedFiles.guidelines) {
        const guidelinesUrl = await uploadFile(uploadedFiles.guidelines, 'guidelines');
        submitData.guidelines_url = guidelinesUrl;
      }

      if (editingId) {
        // Update existing event
        const response = await fetch('/api/placement/events', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...submitData })
        });

        const result = await response.json();
        if (result.success) {
          toast.success('Event updated successfully (old files removed if replaced)');
          setEditingId(null);
          setFormData({
            title: '',
            circular_url: '',
            link: '',
            guidelines_url: ''
          });
          setUploadedFiles({ circular: null, guidelines: null });
          fetchEvents();
        } else {
          toast.error(result.error || 'Failed to update event');
        }
      } else {
        // Create new event
        const response = await fetch('/api/placement/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        });

        const result = await response.json();
        if (result.success) {
          toast.success('Event created successfully');
          setFormData({
            title: '',
            circular_url: '',
            link: '',
            guidelines_url: ''
          });
          setUploadedFiles({ circular: null, guidelines: null });
          setIsAddingNew(false);
          fetchEvents();
        } else {
          toast.error(result.error || 'Failed to create event');
        }
      }
    } catch (error) {
      toast.error('An error occurred while saving the event');
    }
  };

  const handleEditClick = (event: PlacementEvent) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      circular_url: event.circular_url || '',
      link: event.link || '',
      guidelines_url: event.guidelines_url || ''
    });
    setUploadedFiles({ circular: null, guidelines: null });
    setIsAddingNew(false);
  };

  const handleDeleteClick = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`/api/placement/events?id=${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Event deleted successfully');
        fetchEvents();
      } else {
        toast.error(result.error || 'Failed to delete event');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the event');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setFormData({
      title: '',
      circular_url: '',
      link: '',
      guidelines_url: ''
    });
    setUploadedFiles({ circular: null, guidelines: null });
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading || dataLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/placement/dashboard"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 text-center flex-1">Placement Events</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search events by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Form Section */}
        {(isAddingNew || editingId) && (
          <Card className="mb-8 bg-white shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>
                {editingId ? 'Edit Event' : 'Add New Event'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    placeholder="Enter event title (e.g., TCS Recruitment Drive)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Link Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    External Link
                  </label>
                  <Input
                    type="url"
                    name="link"
                    value={formData.link || ''}
                    onChange={handleInputChange}
                    placeholder="Enter URL (e.g., https://company.com/careers)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Circular PDF Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Circular (PDF)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e, 'circular')}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {uploadedFiles.circular && (
                      <p className="text-sm text-green-600">✓ {uploadedFiles.circular.name}</p>
                    )}
                    {formData.circular_url && !uploadedFiles.circular && (
                      <p className="text-sm text-gray-600">Current: {formData.circular_url.split('/').pop()}</p>
                    )}
                  </div>
                </div>

                {/* Guidelines PDF Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Guidelines (PDF)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e, 'guidelines')}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {uploadedFiles.guidelines && (
                      <p className="text-sm text-green-600">✓ {uploadedFiles.guidelines.name}</p>
                    )}
                    {formData.guidelines_url && !uploadedFiles.guidelines && (
                      <p className="text-sm text-gray-600">Current: {formData.guidelines_url.split('/').pop()}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    {editingId ? 'Update Event' : 'Create Event'}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Add New Button */}
        {!isAddingNew && !editingId && (
          <div className="mb-6">
            <Button
              onClick={() => setIsAddingNew(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add New Event
            </Button>
          </div>
        )}

        {/* Events Table */}
        <Card className="bg-white shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardTitle>Events List ({filteredEvents.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredEvents.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No events found. {searchTerm && 'Try adjusting your search.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Files</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Link</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {event.title}
                        </td>
                        <td className="px-6 py-4 text-sm space-y-2">
                          <div className="flex gap-2">
                            {event.circular_url && (
                              <a
                                href={event.circular_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                              >
                                <Download className="w-3 h-3" />
                                Circular
                              </a>
                            )}
                            {event.guidelines_url && (
                              <a
                                href={event.guidelines_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                              >
                                <Download className="w-3 h-3" />
                                Guidelines
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {event.link ? (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Open
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditClick(event)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(event.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
