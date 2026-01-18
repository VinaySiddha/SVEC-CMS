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
    Plus,
    FileText,
    Trash2,
    Edit,
    X,
    Check,
    Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface MOU {
    id: number;
    company_name: string;
    image_url?: string;
    created_at?: string;
}

export default function PlacementMOUsPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [mous, setMous] = useState<MOU[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form state for adding/editing
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        company_name: '',
        image_url: ''
    });

    // File upload state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || user?.role !== 'placement')) {
            router.replace('/auth/login');
        }
    }, [authLoading, isAuthenticated, user, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchMOUs();
        }
    }, [isAuthenticated]);

    const fetchMOUs = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/placement-mous');

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error Response:', errorData);
                throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch MOUs`);
            }

            const data = await response.json();
            console.log('MOUs fetched successfully:', data);
            // API returns array directly
            setMous(Array.isArray(data) ? data : (Array.isArray(data.data?.mous) ? data.data.mous : []));
        } catch (error) {
            console.error('Error fetching MOUs:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to load MOUs');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const resetForm = () => {
        setFormData({
            company_name: '',
            image_url: ''
        });
        setEditingId(null);
        setShowForm(false);
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (mou: MOU) => {
        setFormData({
            company_name: mou.company_name,
            image_url: mou.image_url || ''
        });
        setEditingId(mou.id);
        setPreviewUrl(mou.image_url || null);
        setSelectedFile(null);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.company_name.trim()) {
            toast.error('Company name is required');
            return;
        }

        try {
            setIsSaving(true);
            let imageUrl = formData.image_url;

            // If a new file is selected, upload it first
            if (selectedFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', selectedFile);
                uploadFormData.append('module', 'logos');

                const uploadResponse = await fetch('/api/placement/upload', {
                    method: 'POST',
                    body: uploadFormData
                });

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(errorData.error || 'Failed to upload image');
                }

                const uploadData = await uploadResponse.json();
                imageUrl = uploadData.url;
            }

            // Save MOU with image URL
            const payload = {
                company_name: formData.company_name,
                image_url: imageUrl
            };

            if (editingId) {
                (payload as any).id = editingId;
            }

            const response = await fetch('/api/admin/placement-mous', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to ${editingId ? 'update' : 'create'} MOU`);
            }

            toast.success(`MOU ${editingId ? 'updated' : 'created'} successfully`);
            await fetchMOUs();
            resetForm();
        } catch (error) {
            console.error('Error saving MOU:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to save MOU');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this MOU?')) return;

        try {
            const response = await fetch(`/api/admin/placement-mous?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete MOU');
            }

            toast.success('MOU deleted successfully');
            await fetchMOUs();
        } catch (error) {
            console.error('Error deleting MOU:', error);
            toast.error('Failed to delete MOU');
        }
    };

    if (authLoading || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[#B22222]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/placement/dashboard"
                                className="text-[#B22222] hover:text-[#850209]"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-[#B22222]">MOUs Management</h1>
                                <p className="text-gray-600 text-sm">Manage Memorandum of Understanding</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="bg-[#B22222] hover:bg-[#850209]"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add MOU
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Upload New Company Logo Section */}
                <Card className="mb-8 border-l-4 border-l-orange-500">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Upload New Company Logo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* File Upload */}
                                <div>
                                    <Label htmlFor="mou_image" className="text-sm font-medium text-gray-700 block mb-2">
                                        Select Logo Image <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="flex flex-col gap-3">
                                        <Input
                                            id="mou_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="cursor-pointer"
                                            required={!editingId && !formData.image_url}
                                        />
                                        <p className="text-xs text-gray-500">
                                            Accepted formats: JPG, JPEG, PNG, WEBP (Max: 300 KB)
                                        </p>
                                        {previewUrl && (
                                            <div className="mt-2">
                                                <img 
                                                    src={previewUrl} 
                                                    alt="Preview" 
                                                    className="h-16 w-16 object-contain border rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Company Name */}
                                <div>
                                    <Label htmlFor="company_name" className="text-sm font-medium text-gray-700 block mb-2">
                                        Company Name (Optional)
                                    </Label>
                                    <Input
                                        id="company_name"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter company name..."
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSaving || (!selectedFile && !editingId)}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Upload Logo
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Company Logos Table */}
                <Card>
                    <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center gap-2">
                            📊 Company Logos ({mous.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {mous.length === 0 ? (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No company logos uploaded yet</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Logo</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Company Name</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Created At</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mous.map((mou) => (
                                            <tr key={mou.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4">
                                                    {mou.image_url ? (
                                                        <img
                                                            src={mou.image_url}
                                                            alt={mou.company_name || 'Company logo'}
                                                            className="h-12 w-12 object-contain bg-gray-100 rounded"
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 bg-gray-100 rounded" />
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-gray-700">
                                                    {mou.company_name || <span className="italic text-gray-400">No name</span>}
                                                </td>
                                                <td className="py-3 px-4 text-gray-700">
                                                    {mou.created_at ? new Date(mou.created_at).toLocaleDateString() : '-'}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                                            onClick={() => handleEdit(mou)}
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-600 border-red-600 hover:bg-red-50"
                                                            onClick={() => handleDelete(mou.id)}
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
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
