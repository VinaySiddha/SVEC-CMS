'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { ExamSectionHeader } from '@/components/exam-section/ExamSectionHeader';
import { ExamSectionTopHeader } from '@/components/exam-section/ExamSectionTopHeader';

interface ControllerProfile {
  id?: number;
  name: string;
  designation: string;
  title?: string;
  photo_url?: string;
  bio?: string;
  email?: string;
  phone?: string;
  office_address?: string;
  qualifications?: string;
  experience?: string;
  research_interests?: string;
  publications?: string;
  profile_url?: string;
  social_media_links?: Record<string, string>;
}

export default function ControllerOfExaminationsPage() {
  const [profile, setProfile] = useState<ControllerProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ControllerProfile>({
    name: '',
    designation: '',
    title: '',
    photo_url: '',
    bio: '',
    email: '',
    phone: '',
    office_address: '',
    qualifications: '',
    experience: '',
    research_interests: '',
    publications: '',
    profile_url: '',
    social_media_links: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    }
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/exam-section/controller-of-examinations');
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setProfile(data.data);
          setFormData(data.data);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      social_media_links: {
        ...prev.social_media_links,
        [platform]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.designation) {
      toast.error('Name and designation are required');
      return;
    }

    try {
      setLoading(true);
      let photoUrl = formData.photo_url;

      // Upload photo if a new file is selected
      if (photoFile) {
        const photoFormData = new FormData();
        photoFormData.append('file', photoFile);

        const uploadResponse = await fetch('/api/exam-section/controller-of-examinations/upload', {
          method: 'POST',
          body: photoFormData
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          photoUrl = uploadData.url;
        } else {
          const error = await uploadResponse.json();
          toast.error(error.error || 'Failed to upload photo');
          return;
        }
      }

      const response = await fetch('/api/exam-section/controller-of-examinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, photo_url: photoUrl })
      });

      if (response.ok) {
        toast.success(profile ? 'Profile updated successfully' : 'Profile created successfully');
        setIsEditing(false);
        setPhotoFile(null);
        fetchProfile();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save profile');
      }
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!profile?.id) return;
    if (!confirm('Are you sure you want to delete this profile?')) return;

    try {
      const response = await fetch(`/api/exam-section/controller-of-examinations?id=${profile.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Profile deleted successfully');
        setProfile(null);
        setPhotoFile(null);
        setFormData({
          name: '',
          designation: '',
          title: '',
          photo_url: '',
          bio: '',
          email: '',
          phone: '',
          office_address: '',
          qualifications: '',
          experience: '',
          research_interests: '',
          publications: '',
          profile_url: '',
          social_media_links: {}
        });
      }
    } catch (error) {
      toast.error('Failed to delete profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Exam Section Top Header */}
      <ExamSectionTopHeader showNavigation={true} />

      <div className="p-6">
        <ExamSectionHeader 
          pageTitle="Controller of Examinations"
          breadcrumbs={[
            { label: 'Exam Section', isActive: false },
            { label: 'Controller of Examinations', isActive: true }
          ]}
        />

        <div className="container mx-auto max-w-6xl space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Controller of Examinations</h1>
              <p className="text-gray-600 mt-1">Manage Controller of Examinations Profile</p>
            </div>
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                {profile ? 'Edit Profile' : 'Add Profile'}
              </Button>
            )}
          </div>

          {isEditing ? (
            // Edit Form
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{profile ? 'Edit Profile' : 'Create Profile'}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation *</Label>
                      <Input
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        placeholder="e.g., Sr.Asst.Professor"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., Controller of Examinations"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo (Max 250KB)</Label>
                      <div className="flex flex-col gap-2">
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 250 * 1024) {
                                toast.error('Photo size must not exceed 250KB');
                                e.target.value = '';
                              } else {
                                setPhotoFile(file);
                              }
                            }
                          }}
                        />
                        {(photoFile || formData.photo_url) && (
                          <div className="text-sm text-gray-600">
                            {photoFile ? `Selected: ${photoFile.name}` : `Current: ${formData.photo_url}`}
                          </div>
                        )}
                        {formData.photo_url && (
                          <img 
                            src={formData.photo_url} 
                            alt="Preview" 
                            className="w-20 h-20 object-cover rounded border"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Text Areas */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio || ''}
                      onChange={handleInputChange}
                      placeholder="Enter biographical information"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="office_address">Office Address</Label>
                    <Textarea
                      id="office_address"
                      name="office_address"
                      value={formData.office_address || ''}
                      onChange={handleInputChange}
                      placeholder="Enter office address"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="qualifications">Qualifications</Label>
                      <Textarea
                        id="qualifications"
                        name="qualifications"
                        value={formData.qualifications || ''}
                        onChange={handleInputChange}
                        placeholder="Enter qualifications (comma separated)"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience || ''}
                        onChange={handleInputChange}
                        placeholder="Enter years of experience and details"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="research_interests">Research Interests</Label>
                    <Textarea
                      id="research_interests"
                      name="research_interests"
                      value={formData.research_interests || ''}
                      onChange={handleInputChange}
                      placeholder="Enter research interests"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publications">Publications</Label>
                    <Textarea
                      id="publications"
                      name="publications"
                      value={formData.publications || ''}
                      onChange={handleInputChange}
                      placeholder="Enter publications"
                      rows={4}
                    />
                  </div>

                  {/* Social Media Links */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.keys(formData.social_media_links || {}).map(platform => (
                        <div key={platform} className="space-y-2">
                          <Label htmlFor={platform} className="capitalize">{platform}</Label>
                          <Input
                            id={platform}
                            value={formData.social_media_links?.[platform] || ''}
                            onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                            placeholder={`Enter ${platform} profile URL`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end border-t pt-6">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : profile ? (
            // Profile Display
            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Profile Image */}
                  <div className="md:col-span-1">
                    {profile.photo_url ? (
                      <img 
                        src={profile.photo_url} 
                        alt={profile.name}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No photo available</span>
                      </div>
                    )}
                  </div>

                  {/* Profile Information */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                      <p className="text-lg text-gray-600">{profile.designation}</p>
                      {profile.title && <p className="text-gray-600">{profile.title}</p>}
                    </div>

                    {profile.bio && (
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Bio</h3>
                        <p className="text-gray-600">{profile.bio}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {profile.email && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Email</p>
                          <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">
                            {profile.email}
                          </a>
                        </div>
                      )}
                      {profile.phone && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Phone</p>
                          <a href={`tel:${profile.phone}`} className="text-blue-600 hover:underline">
                            {profile.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {profile.qualifications && (
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Qualifications</h3>
                        <p className="text-gray-600">{profile.qualifications}</p>
                      </div>
                    )}

                    {profile.experience && (
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Experience</h3>
                        <p className="text-gray-600">{profile.experience}</p>
                      </div>
                    )}

                    {profile.social_media_links && Object.values(profile.social_media_links).some(link => link) && (
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Social Media</h3>
                        <div className="flex gap-4">
                          {Object.entries(profile.social_media_links).map(([platform, url]) => 
                            url ? (
                              <a 
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline capitalize text-sm"
                              >
                                {platform}
                              </a>
                            ) : null
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 pt-4 border-t">
                      <Button 
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        onClick={handleDelete}
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600 mb-4">No profile created yet</p>
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Profile
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
