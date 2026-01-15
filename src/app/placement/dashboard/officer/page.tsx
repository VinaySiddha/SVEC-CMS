'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    ArrowLeft,
    User,
    Edit,
    X,
    Save,
    Loader2,
    Upload,
    Check
} from 'lucide-react';
import { toast } from 'sonner';

interface PlacementOfficer {
    id: number;
    name: string;
    designation: string;
    email: string;
    phone: string;
    linkedin: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export default function PlacementOfficerPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [officer, setOfficer] = useState<PlacementOfficer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Form state for creating new officer
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        email: '',
        phone: '',
        linkedin: '',
        image_url: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Edit state
    const [editData, setEditData] = useState<PlacementOfficer | null>(null);
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || user?.role !== 'placement')) {
            router.replace('/auth/login');
        }
    }, [authLoading, isAuthenticated, user, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOfficer();
        }
    }, [isAuthenticated]);

    const fetchOfficer = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/placement/officer');

            if (!response.ok) {
                throw new Error('Failed to fetch placement officer');
            }

            const data = await response.json();
            setOfficer(data);
        } catch (error) {
            console.error('Error fetching placement officer:', error);
            toast.error('Failed to load placement officer');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setFormData((prev) => ({
                    ...prev,
                    image_url: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editData) {
            setEditData((prev) => prev ? { ...prev, [name]: value } : null);
        }
    };

    const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setEditImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditImagePreview(reader.result as string);
                if (editData) {
                    setEditData((prev) => prev ? { ...prev, image_url: reader.result as string } : null);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddOfficer = async () => {
        // Validation
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return;
        }
        if (!formData.designation.trim()) {
            toast.error('Designation is required');
            return;
        }
        if (!formData.email.trim()) {
            toast.error('Email is required');
            return;
        }
        if (!formData.phone.trim()) {
            toast.error('Phone is required');
            return;
        }
        if (!formData.image_url) {
            toast.error('Image is required');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/placement/officer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add officer');
            }

            toast.success('Placement officer added successfully!');
            setShowAddForm(false);
            setFormData({
                name: '',
                designation: '',
                email: '',
                phone: '',
                linkedin: '',
                image_url: ''
            });
            setImageFile(null);
            setImagePreview(null);
            fetchOfficer();
        } catch (error: any) {
            console.error('Error adding officer:', error);
            toast.error(error.message || 'Failed to add officer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditOfficer = () => {
        if (officer) {
            setEditData(officer);
            setEditImagePreview(officer.image_url);
            setIsEditing(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData(null);
        setEditImageFile(null);
        setEditImagePreview(null);
    };

    const handleSaveEdit = async () => {
        if (!editData) return;

        // Validation
        if (!editData.name.trim()) {
            toast.error('Name is required');
            return;
        }
        if (!editData.designation.trim()) {
            toast.error('Designation is required');
            return;
        }
        if (!editData.email.trim()) {
            toast.error('Email is required');
            return;
        }
        if (!editData.phone.trim()) {
            toast.error('Phone is required');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/placement/officer', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update officer');
            }

            toast.success('Placement officer updated successfully!');
            setIsEditing(false);
            setEditData(null);
            setEditImageFile(null);
            setEditImagePreview(null);
            fetchOfficer();
        } catch (error: any) {
            console.error('Error updating officer:', error);
            toast.error(error.message || 'Failed to update officer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteOfficer = async () => {
        if (!officer) return;

        if (!window.confirm('Are you sure you want to delete this officer?')) {
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch(`/api/placement/officer?id=${officer.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete officer');
            }

            toast.success('Placement officer deleted successfully!');
            setOfficer(null);
        } catch (error: any) {
            console.error('Error deleting officer:', error);
            toast.error(error.message || 'Failed to delete officer');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/placement/dashboard"
                                className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 border border-blue-200 font-medium"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Link>
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Placement Officer</h1>
                                <p className="text-gray-600">Manage placement cell officer information</p>
                            </div>
                        </div>
                        {officer && !isEditing && (
                            <Button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                {showAddForm ? (
                                    <>
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </>
                                ) : (
                                    'Add Officer'
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Officer Details Card */}
                {officer && !isEditing && (
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    {officer.name}
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleEditOfficer}
                                        variant="secondary"
                                        size="sm"
                                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={handleDeleteOfficer}
                                        variant="destructive"
                                        size="sm"
                                        disabled={isSubmitting}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Officer Image */}
                                <div className="flex flex-col items-center justify-center">
                                    {officer.image_url && (
                                        <img
                                            src={officer.image_url}
                                            alt={officer.name}
                                            className="w-48 h-48 rounded-lg object-cover border-4 border-orange-200 shadow-lg"
                                        />
                                    )}
                                </div>

                                {/* Officer Details */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600">Designation</label>
                                        <p className="text-lg text-gray-800 font-medium">{officer.designation}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600">Email</label>
                                        <p className="text-lg text-gray-800">
                                            <a href={`mailto:${officer.email}`} className="text-blue-600 hover:underline">
                                                {officer.email}
                                            </a>
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600">Phone</label>
                                        <p className="text-lg text-gray-800">
                                            <a href={`tel:${officer.phone}`} className="text-blue-600 hover:underline">
                                                {officer.phone}
                                            </a>
                                        </p>
                                    </div>
                                    {officer.linkedin && (
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600">LinkedIn</label>
                                            <p className="text-lg text-gray-800">
                                                <a href={officer.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    View Profile
                                                </a>
                                            </p>
                                        </div>
                                    )}
                                    {officer.updated_at && (
                                        <p className="text-sm text-gray-500 mt-4">
                                            Last updated: {new Date(officer.updated_at).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Edit Form */}
                {isEditing && editData && (
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <CardTitle>Edit Officer</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Image Upload */}
                                <div className="md:col-span-2">
                                    <Label className="text-sm font-semibold text-gray-700">Officer Image</Label>
                                    <div className="mt-2 flex items-center gap-4">
                                        {editImagePreview && (
                                            <img
                                                src={editImagePreview}
                                                alt="Preview"
                                                className="w-24 h-24 rounded-lg object-cover border-2 border-gray-300"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <label className="cursor-pointer flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors">
                                                <Upload className="w-4 h-4 mr-2 text-gray-600" />
                                                <span className="text-sm text-gray-600">Upload Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleEditImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Name *</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleEditInputChange}
                                        placeholder="Officer name"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Designation *</Label>
                                    <Input
                                        type="text"
                                        name="designation"
                                        value={editData.designation}
                                        onChange={handleEditInputChange}
                                        placeholder="e.g., Placement Officer"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Email *</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleEditInputChange}
                                        placeholder="email@example.com"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Phone *</Label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={editData.phone}
                                        onChange={handleEditInputChange}
                                        placeholder="+91 XXXXXXXXXX"
                                        className="mt-2"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label className="text-sm font-semibold text-gray-700">LinkedIn URL</Label>
                                    <Input
                                        type="url"
                                        name="linkedin"
                                        value={editData.linkedin}
                                        onChange={handleEditInputChange}
                                        placeholder="https://linkedin.com/in/..."
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                                <Button
                                    onClick={handleSaveEdit}
                                    disabled={isSubmitting}
                                    className="bg-green-600 hover:bg-green-700 flex-1"
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Button
                                    onClick={handleCancelEdit}
                                    disabled={isSubmitting}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Add Officer Form */}
                {showAddForm && !officer && (
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <CardTitle>Add Placement Officer</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Image Upload */}
                                <div className="md:col-span-2">
                                    <Label className="text-sm font-semibold text-gray-700">Officer Image *</Label>
                                    <div className="mt-2 flex items-center gap-4">
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-24 h-24 rounded-lg object-cover border-2 border-gray-300"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <label className="cursor-pointer flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors">
                                                <Upload className="w-4 h-4 mr-2 text-gray-600" />
                                                <span className="text-sm text-gray-600">Upload Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Name *</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Officer name"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Designation *</Label>
                                    <Input
                                        type="text"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Placement Officer"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Email *</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="email@example.com"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Phone *</Label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 XXXXXXXXXX"
                                        className="mt-2"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label className="text-sm font-semibold text-gray-700">LinkedIn URL</Label>
                                    <Input
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/..."
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                                <Button
                                    onClick={handleAddOfficer}
                                    disabled={isSubmitting}
                                    className="bg-orange-600 hover:bg-orange-700 flex-1"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? 'Adding...' : 'Add Officer'}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setFormData({
                                            name: '',
                                            designation: '',
                                            email: '',
                                            phone: '',
                                            linkedin: '',
                                            image_url: ''
                                        });
                                        setImageFile(null);
                                        setImagePreview(null);
                                    }}
                                    disabled={isSubmitting}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* No Officer Message */}
                {!officer && !showAddForm && (
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardContent className="p-12 text-center">
                            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Officer Found</h3>
                            <p className="text-gray-600 mb-6">
                                No placement officer has been added yet. Click the button below to add one.
                            </p>
                            <Button
                                onClick={() => setShowAddForm(true)}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                Add Officer
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
