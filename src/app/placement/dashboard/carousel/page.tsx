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
    Image as ImageIcon,
    Trash2,
    Edit,
    X,
    Check,
    Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface CarouselImage {
    id: number;
    image_url: string;
    alt_text: string;
    created_at: string;
}

export default function PlacementCarouselPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Upload form state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [altText, setAltText] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Edit state
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editAltText, setEditAltText] = useState('');

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || user?.role !== 'placement')) {
            router.replace('/auth/login');
        }
    }, [authLoading, isAuthenticated, user, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCarouselImages();
        }
    }, [isAuthenticated]);

    const fetchCarouselImages = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/placement/carousel');

            if (!response.ok) {
                throw new Error('Failed to fetch carousel images');
            }

            const data = await response.json();
            setCarouselImages(data);
        } catch (error) {
            console.error('Error fetching carousel images:', error);
            toast.error('Failed to load carousel images');
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

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error('Please select an image file');
            return;
        }

        if (!altText.trim()) {
            toast.error('Please enter alt text for the image');
            return;
        }

        try {
            setIsUploading(true);

            // Step 1: Upload image to server
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('module', 'carousel');

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
            const dbResponse = await fetch('/api/placement/carousel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image_url: uploadData.url,
                    alt_text: altText.trim()
                })
            });

            if (!dbResponse.ok) {
                const errorData = await dbResponse.json();
                throw new Error(errorData.error || 'Failed to save carousel image');
            }

            toast.success('Carousel image added successfully!');

            // Reset form
            setSelectedFile(null);
            setAltText('');
            setPreviewUrl(null);

            // Reset file input
            const fileInput = document.getElementById('file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            // Refresh list
            fetchCarouselImages();
        } catch (error: any) {
            console.error('Error uploading carousel image:', error);
            toast.error(error.message || 'Failed to add carousel image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (image: CarouselImage) => {
        setEditingId(image.id);
        setEditAltText(image.alt_text);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditAltText('');
    };

    const handleSaveEdit = async (id: number) => {
        if (!editAltText.trim()) {
            toast.error('Alt text cannot be empty');
            return;
        }

        try {
            const response = await fetch('/api/placement/carousel', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    alt_text: editAltText.trim()
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update alt text');
            }

            toast.success('Alt text updated successfully!');
            setEditingId(null);
            setEditAltText('');
            fetchCarouselImages();
        } catch (error: any) {
            console.error('Error updating alt text:', error);
            toast.error(error.message || 'Failed to update alt text');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this carousel image?')) {
            return;
        }

        try {
            const response = await fetch(`/api/placement/carousel?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete carousel image');
            }

            toast.success('Carousel image deleted successfully!');
            fetchCarouselImages();
        } catch (error: any) {
            console.error('Error deleting carousel image:', error);
            toast.error(error.message || 'Failed to delete carousel image');
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
                            <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Placement Carousel</h1>
                            <p className="text-gray-600">Manage placement success story images</p>
                        </div>
                    </div>
                </div>

                {/* Upload Form */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Upload New Carousel Image
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* File Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="file-input" className="text-gray-700 font-medium">
                                        Select Image *
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

                                {/* Alt Text Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="alt-text" className="text-gray-700 font-medium">
                                        Alt Text *
                                    </Label>
                                    <Input
                                        id="alt-text"
                                        type="text"
                                        placeholder="Describe the image..."
                                        value={altText}
                                        onChange={(e) => setAltText(e.target.value)}
                                        disabled={isUploading}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Brief description for accessibility
                                    </p>
                                </div>
                            </div>

                            {/* Preview */}
                            {previewUrl && (
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                                    <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
                                    <div className="relative w-full max-w-md mx-auto aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isUploading || !selectedFile || !altText.trim()}
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
                                        Upload Image
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Carousel Images Table */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            Existing Carousel Images ({carouselImages.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {carouselImages.length === 0 ? (
                            <div className="text-center py-12">
                                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No carousel images yet</h3>
                                <p className="text-gray-600">Upload your first carousel image to get started.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image Preview</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Alt Text</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created Date</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carouselImages.map((image) => (
                                            <tr key={image.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="px-4 py-4 text-sm text-gray-700">{image.id}</td>
                                                <td className="px-4 py-4">
                                                    <div className="relative w-24 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={image.image_url}
                                                            alt={image.alt_text}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    {editingId === image.id ? (
                                                        <Input
                                                            type="text"
                                                            value={editAltText}
                                                            onChange={(e) => setEditAltText(e.target.value)}
                                                            className="w-full"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <p className="text-sm text-gray-700">{image.alt_text}</p>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {new Date(image.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {editingId === image.id ? (
                                                            <>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleSaveEdit(image.id)}
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
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleEdit(image)}
                                                                    variant="outline"
                                                                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleDelete(image.id)}
                                                                    variant="outline"
                                                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </>
                                                        )}
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
