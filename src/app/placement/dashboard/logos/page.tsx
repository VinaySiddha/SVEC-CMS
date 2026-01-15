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
    Upload,
    Building2,
    Trash2,
    Edit,
    X,
    Check,
    Loader2,
    Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface CompanyLogo {
    id: number;
    company_name: string | null;
    image_url: string;
    created_at: string;
}

export default function PlacementLogosPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [logos, setLogos] = useState<CompanyLogo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Upload form state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [companyName, setCompanyName] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Edit state
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<{
        company_name: string;
        image_url: string;
        newFile?: File | null;
        newPreviewUrl?: string | null;
    } | null>(null);

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || user?.role !== 'placement')) {
            router.replace('/auth/login');
        }
    }, [authLoading, isAuthenticated, user, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchLogos();
        }
    }, [isAuthenticated]);

    const fetchLogos = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/placement/logos');

            if (!response.ok) {
                throw new Error('Failed to fetch company logos');
            }

            const data = await response.json();
            setLogos(data);
        } catch (error) {
            console.error('Error fetching company logos:', error);
            toast.error('Failed to load company logos');
        } finally {
            setIsLoading(false);
        }
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

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && editData) {
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditData({
                    ...editData,
                    newFile: file,
                    newPreviewUrl: reader.result as string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error('Please select an image file');
            return;
        }

        try {
            setIsUploading(true);

            // Step 1: Upload image to server
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('module', 'logos');

            const uploadResponse = await fetch('/api/placement/upload', {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error || 'Failed to upload image');
            }

            const uploadData = await uploadResponse.json();

            // Step 2: Save to database
            const dbResponse = await fetch('/api/placement/logos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image_url: uploadData.url,
                    company_name: companyName.trim() || null
                })
            });

            if (!dbResponse.ok) {
                const errorData = await dbResponse.json();
                throw new Error(errorData.error || 'Failed to save company logo');
            }

            toast.success('Company logo added successfully!');

            // Reset form
            setSelectedFile(null);
            setCompanyName('');
            setPreviewUrl(null);

            // Reset file input
            const fileInput = document.getElementById('file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            // Refresh list
            fetchLogos();
        } catch (error: any) {
            console.error('Error uploading company logo:', error);
            toast.error(error.message || 'Failed to add company logo');
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (logo: CompanyLogo) => {
        setEditingId(logo.id);
        setEditData({
            company_name: logo.company_name || '',
            image_url: logo.image_url,
            newFile: null,
            newPreviewUrl: null
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData(null);
    };

    const handleSaveEdit = async (id: number) => {
        if (!editData) return;

        try {
            let finalImageUrl = editData.image_url;

            // If new file selected, upload it first
            if (editData.newFile) {
                const formData = new FormData();
                formData.append('file', editData.newFile);
                formData.append('module', 'logos');

                const uploadResponse = await fetch('/api/placement/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(errorData.error || 'Failed to upload new image');
                }

                const uploadData = await uploadResponse.json();
                finalImageUrl = uploadData.url;
            }

            // Update database
            const response = await fetch('/api/placement/logos', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    company_name: editData.company_name.trim() || null,
                    image_url: finalImageUrl
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update company logo');
            }

            toast.success('Company logo updated successfully!');
            setEditingId(null);
            setEditData(null);
            fetchLogos();
        } catch (error: any) {
            console.error('Error updating company logo:', error);
            toast.error(error.message || 'Failed to update company logo');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this company logo?')) {
            return;
        }

        try {
            const response = await fetch(`/api/placement/logos?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete company logo');
            }

            toast.success('Company logo deleted successfully!');
            fetchLogos();
        } catch (error: any) {
            console.error('Error deleting company logo:', error);
            toast.error(error.message || 'Failed to delete company logo');
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
                    <div className="flex items-center gap-4">
                        <Link
                            href="/placement/dashboard"
                            className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 border border-blue-200 font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Link>
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Company Logos</h1>
                            <p className="text-gray-600">Manage placement company logos</p>
                        </div>
                    </div>
                </div>

                {/* Upload Form */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Upload New Company Logo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* File Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="file-input" className="text-gray-700 font-medium">
                                        Select Logo Image *
                                    </Label>
                                    <Input
                                        id="file-input"
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleFileChange}
                                        className="cursor-pointer"
                                        disabled={isUploading}
                                    />
                                    <p className="text-xs text-gray-500">
                                        Accepted formats: JPG, JPEG, PNG, WEBP (Max: 300 KB)
                                    </p>
                                </div>

                                {/* Company Name Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="company-name" className="text-gray-700 font-medium">
                                        Company Name (Optional)
                                    </Label>
                                    <Input
                                        id="company-name"
                                        type="text"
                                        placeholder="Enter company name..."
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        disabled={isUploading}
                                    />
                                </div>
                            </div>

                            {/* Image Preview */}
                            {previewUrl && (
                                <div className="border-2 border-dashed border-orange-300 rounded-xl p-4 bg-orange-50/30">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                    <div className="relative w-full h-32 bg-white rounded-lg overflow-hidden shadow-sm">
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isUploading || !selectedFile}
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-6 py-2"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Logo
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Company Logos Table */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="w-5 h-5" />
                            Company Logos ({logos.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {logos.length === 0 ? (
                            <div className="text-center py-12">
                                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Logos Added</h3>
                                <p className="text-gray-600">Upload company logos to get started.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Logo</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Company Name</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created At</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logos.map((logo) => (
                                            <tr key={logo.id} className="border-b border-gray-100 hover:bg-orange-50/50 transition-colors">
                                                {editingId === logo.id && editData ? (
                                                    <>
                                                        {/* Edit Mode */}
                                                        <td className="px-4 py-4">
                                                            <div className="space-y-2">
                                                                <div className="relative w-24 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                                                    <Image
                                                                        src={editData.newPreviewUrl || editData.image_url}
                                                                        alt="Logo preview"
                                                                        fill
                                                                        className="object-contain"
                                                                    />
                                                                </div>
                                                                <Input
                                                                    type="file"
                                                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                                                    onChange={handleEditFileChange}
                                                                    className="text-xs cursor-pointer"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="text"
                                                                placeholder="Company name..."
                                                                value={editData.company_name}
                                                                onChange={(e) =>
                                                                    setEditData({ ...editData, company_name: e.target.value })
                                                                }
                                                                className="w-full"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-600">
                                                            {new Date(logo.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleSaveEdit(logo.id)}
                                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                                >
                                                                    <Check className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={handleCancelEdit}
                                                                    variant="outline"
                                                                    className="border-gray-300"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* View Mode */}
                                                        <td className="px-4 py-4">
                                                            <div className="relative w-24 h-16 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                                                                <Image
                                                                    src={logo.image_url}
                                                                    alt={logo.company_name || 'Company logo'}
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-800 font-medium">
                                                            {logo.company_name || (
                                                                <span className="text-gray-400 italic">No name</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-600">
                                                            {new Date(logo.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleEdit(logo)}
                                                                    variant="outline"
                                                                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleDelete(logo.id)}
                                                                    variant="outline"
                                                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </>
                                                )}
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
