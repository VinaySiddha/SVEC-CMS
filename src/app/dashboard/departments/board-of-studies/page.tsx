'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, FileText, Users, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

// TypeScript interfaces
interface BoardMember {
  id: number;
  dept: string;
  member_name: string;
  designation: string;
  organization: string;
  role: string;
  year: string;
  contact_email?: string;
  image_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface MeetingMinute {
  id: number;
  dept: string;
  meeting_title: string;
  meeting_number: number;
  meeting_date: string;
  document_url: string;
  academic_year: string;
  description?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export default function BoardOfStudiesPage() {
  // State management
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [meetingMinutes, setMeetingMinutes] = useState<MeetingMinute[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('members');
  
  // Member form state
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null);
  const [memberForm, setMemberForm] = useState({
    dept: 'eee',
    member_name: '',
    designation: '',
    organization: '',
    role: '',
    year: new Date().getFullYear().toString(),
    contact_email: '',
    status: 'approved' as 'pending' | 'approved' | 'rejected'
  });

  // Meeting minute form state
  const [showMinuteForm, setShowMinuteForm] = useState(false);
  const [editingMinute, setEditingMinute] = useState<MeetingMinute | null>(null);
  const [minuteForm, setMinuteForm] = useState({
    dept: 'eee',
    meeting_title: '',
    meeting_number: 1,
    meeting_date: '',
    document_url: '',
    academic_year: '',
    description: '',
    status: 'active' as 'active' | 'inactive'
  });

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/board-of-studies?dept=eee', {
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      
      if (result.success && result.data) {
        setMembers(result.data.members || []);
        setMeetingMinutes(result.data.minutes || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Member management functions
  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = editingMember 
        ? `/api/admin/board-of-studies/members/${editingMember.id}`
        : '/api/admin/board-of-studies';
      
      const method = editingMember ? 'PUT' : 'POST';
      const body = editingMember 
        ? memberForm 
        : { type: 'member', ...memberForm };

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save member');
      }

      toast.success(editingMember ? 'Member updated successfully' : 'Member added successfully');
      setShowMemberForm(false);
      setEditingMember(null);
      resetMemberForm();
      fetchData();
    } catch (error) {
      console.error('Error saving member:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save member');
    }
  };

  const handleMemberEdit = (member: BoardMember) => {
    setEditingMember(member);
    setMemberForm({
      dept: member.dept,
      member_name: member.member_name,
      designation: member.designation,
      organization: member.organization,
      role: member.role,
      year: member.year,
      contact_email: member.contact_email || '',
      status: member.status
    });
    setShowMemberForm(true);
  };

  const handleMemberDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await fetch(`/api/admin/board-of-studies/members/${id}`, {
          method: 'DELETE',
          cache: 'no-store'
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete member');
        }

        toast.success('Member deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting member:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to delete member');
      }
    }
  };

  const resetMemberForm = () => {
    setMemberForm({
      dept: 'eee',
      member_name: '',
      designation: '',
      organization: '',
      role: '',
      year: new Date().getFullYear().toString(),
      contact_email: '',
      status: 'approved' as 'pending' | 'approved' | 'rejected'
    });
  };

  // Meeting minute management functions
  const handleMinuteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = editingMinute 
        ? `/api/admin/board-of-studies/minutes/${editingMinute.id}`
        : '/api/admin/board-of-studies';
      
      const method = editingMinute ? 'PUT' : 'POST';
      const body = editingMinute 
        ? minuteForm 
        : { type: 'minute', ...minuteForm };

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save meeting minute');
      }

      toast.success(editingMinute ? 'Meeting minute updated successfully' : 'Meeting minute added successfully');
      setShowMinuteForm(false);
      setEditingMinute(null);
      resetMinuteForm();
      fetchData();
    } catch (error) {
      console.error('Error saving meeting minute:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save meeting minute');
    }
  };

  const handleMinuteEdit = (minute: MeetingMinute) => {
    setEditingMinute(minute);
    setMinuteForm({
      dept: minute.dept,
      meeting_title: minute.meeting_title,
      meeting_number: minute.meeting_number,
      meeting_date: minute.meeting_date,
      document_url: minute.document_url,
      academic_year: minute.academic_year,
      description: minute.description || '',
      status: minute.status
    });
    setShowMinuteForm(true);
  };

  const handleMinuteDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this meeting minute?')) {
      try {
        const response = await fetch(`/api/admin/board-of-studies/minutes/${id}`, {
          method: 'DELETE',
          cache: 'no-store'
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete meeting minute');
        }

        toast.success('Meeting minute deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting meeting minute:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to delete meeting minute');
      }
    }
  };

  const resetMinuteForm = () => {
    setMinuteForm({
      dept: 'eee',
      meeting_title: '',
      meeting_number: 1,
      meeting_date: '',
      document_url: '',
      academic_year: '',
      description: '',
      status: 'active' as 'active' | 'inactive'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Board of Studies Management</h1>
          <p className="text-gray-600 mt-2">Manage Board of Studies members and meeting minutes</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            BOS Members
          </TabsTrigger>
          <TabsTrigger value="minutes" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Meeting Minutes
          </TabsTrigger>
        </TabsList>

        {/* Board Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Board of Studies Members
                </CardTitle>
                <Button
                  onClick={() => {
                    setEditingMember(null);
                    resetMemberForm();
                    setShowMemberForm(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showMemberForm && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleMemberSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="member_name">Member Name *</Label>
                          <Input
                            id="member_name"
                            value={memberForm.member_name}
                            onChange={(e) => setMemberForm({...memberForm, member_name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="designation">Designation *</Label>
                          <Input
                            id="designation"
                            value={memberForm.designation}
                            onChange={(e) => setMemberForm({...memberForm, designation: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="organization">Organization *</Label>
                          <Input
                            id="organization"
                            value={memberForm.organization}
                            onChange={(e) => setMemberForm({...memberForm, organization: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Role/Position *</Label>
                          <Input
                            id="role"
                            value={memberForm.role}
                            onChange={(e) => setMemberForm({...memberForm, role: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="year">Year</Label>
                          <Input
                            id="year"
                            value={memberForm.year}
                            onChange={(e) => setMemberForm({...memberForm, year: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact_email">Contact Email</Label>
                          <Input
                            id="contact_email"
                            type="email"
                            value={memberForm.contact_email}
                            onChange={(e) => setMemberForm({...memberForm, contact_email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button type="submit" className="flex items-center gap-2">
                          {editingMember ? 'Update Member' : 'Add Member'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowMemberForm(false);
                            setEditingMember(null);
                            resetMemberForm();
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Members List */}
              <div className="space-y-4">
                {members.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No board members found. Add your first member to get started.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {members.map((member) => (
                      <Card key={member.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{member.member_name}</h3>
                            <p className="text-gray-600">{member.designation}</p>
                            <p className="text-sm text-gray-500">{member.organization}</p>
                            <p className="text-sm font-medium text-blue-600">{member.role}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMemberEdit(member)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleMemberDelete(member.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meeting Minutes Tab */}
        <TabsContent value="minutes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Meeting Minutes
                </CardTitle>
                <Button
                  onClick={() => {
                    setEditingMinute(null);
                    resetMinuteForm();
                    setShowMinuteForm(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Meeting Minute
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showMinuteForm && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>{editingMinute ? 'Edit Meeting Minute' : 'Add New Meeting Minute'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleMinuteSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="meeting_title">Meeting Title *</Label>
                          <Input
                            id="meeting_title"
                            value={minuteForm.meeting_title}
                            onChange={(e) => setMinuteForm({...minuteForm, meeting_title: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="meeting_number">Meeting Number *</Label>
                          <Input
                            id="meeting_number"
                            type="number"
                            value={minuteForm.meeting_number}
                            onChange={(e) => setMinuteForm({...minuteForm, meeting_number: parseInt(e.target.value)})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="meeting_date">Meeting Date *</Label>
                          <Input
                            id="meeting_date"
                            type="date"
                            value={minuteForm.meeting_date}
                            onChange={(e) => setMinuteForm({...minuteForm, meeting_date: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="academic_year">Academic Year *</Label>
                          <Input
                            id="academic_year"
                            value={minuteForm.academic_year}
                            onChange={(e) => setMinuteForm({...minuteForm, academic_year: e.target.value})}
                            placeholder="e.g., 2023-24"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="document_url">Document URL *</Label>
                          <Input
                            id="document_url"
                            value={minuteForm.document_url}
                            onChange={(e) => setMinuteForm({...minuteForm, document_url: e.target.value})}
                            placeholder="https://example.com/document.pdf"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={minuteForm.description}
                            onChange={(e) => setMinuteForm({...minuteForm, description: e.target.value})}
                            placeholder="Optional description or notes about the meeting"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button type="submit" className="flex items-center gap-2">
                          {editingMinute ? 'Update Meeting Minute' : 'Add Meeting Minute'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowMinuteForm(false);
                            setEditingMinute(null);
                            resetMinuteForm();
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Meeting Minutes List */}
              <div className="space-y-4">
                {meetingMinutes.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No meeting minutes found. Add your first meeting minute to get started.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {meetingMinutes.map((minute) => (
                      <Card key={minute.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{minute.meeting_title}</h3>
                            <p className="text-gray-600">Meeting #{minute.meeting_number}</p>
                            <p className="text-sm text-gray-500">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {new Date(minute.meeting_date).toLocaleDateString()} • {minute.academic_year}
                            </p>
                            {minute.description && (
                              <p className="text-sm text-gray-600 mt-2">{minute.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(minute.document_url, '_blank')}
                            >
                              <FileText className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMinuteEdit(minute)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleMinuteDelete(minute.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}