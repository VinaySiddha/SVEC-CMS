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
    FileText,
    Trash2,
    Edit,
    X,
    Check,
    Loader2,
    ExternalLink,
    FilePlus
} from 'lucide-react';
import { toast } from 'sonner';

interface PlacementPDF {
    id: number;
    year: string;
    title: string | null;
    pdf_url: string;
    created_at: string;
}

export default function PlacementPDFsPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [pdfs, setPdfs] = useState<PlacementPDF[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Upload form state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [year, setYear] = useState('');
    const [title, setTitle] = useState('');

    // Edit state
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<{
        year: string;
        title: string;
        pdf_url: string;
        newFile?: File | null;
    } | null>(null);

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || user?.role !== 'placement')) {
            router.replace('/auth/login');
        }
    }, [authLoading, isAuthenticated, user, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchPDFs();
        }
    }, [isAuthenticated]);

    const fetchPDFs = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/placement/pdfs');

            if (!response.ok) {
                throw new Error('Failed to fetch placement PDFs');
            }

            const data = await response.json();
            setPdfs(data);
        } catch (error) {
            console.error('Error fetching placement PDFs:', error);
            toast.error('Failed to load placement PDFs');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.name.toLowerCase().endsWith('.pdf')) {
                toast.error('Please select a PDF file');
                e.target.value = '';
                return;
            }

            // Validate file size (1 MB = 1048576 bytes)
            if (file.size > 1048576) {
                toast.error('PDF file size must be less than 1 MB');
                e.target.value = '';
                return;
            }

            setSelectedFile(file);
        }
    };

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && editData) {
            // Validate file type
            if (!file.name.toLowerCase().endsWith('.pdf')) {
                toast.error('Please select a PDF file');
                e.target.value = '';
                return;
            }

            // Validate file size
            if (file.size > 1048576) {
                toast.error('PDF file size must be less than 1 MB');
                e.target.value = '';
                return;
            }

            setEditData({
                ...editData,
                newFile: file
            });
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!year.trim()) {
            toast.error('Year is required');
            return;
        }

        if (!selectedFile) {
            toast.error('Please select a PDF file');
            return;
        }

        try {
            setIsUploading(true);

            // Step 1: Upload PDF to server
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('module', 'pdf');

            const uploadResponse = await fetch('/api/placement/upload', {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error || 'Failed to upload PDF');
            }

            const uploadData = await uploadResponse.json();

            // Step 2: Save to database
            const dbResponse = await fetch('/api/placement/pdfs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    year: year.trim(),
                    title: title.trim() || null,
                    pdf_url: uploadData.url
                })
            });

            if (!dbResponse.ok) {
                const errorData = await dbResponse.json();
                throw new Error(errorData.error || 'Failed to save placement PDF');
            }

            toast.success('Placement PDF added successfully!');

            // Reset form
            setSelectedFile(null);
            setYear('');
            setTitle('');

            // Reset file input
            const fileInput = document.getElementById('file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            // Refresh list
            fetchPDFs();
        } catch (error: any) {
            console.error('Error uploading placement PDF:', error);
            toast.error(error.message || 'Failed to add placement PDF');
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (pdf: PlacementPDF) => {
        setEditingId(pdf.id);
        setEditData({
            year: pdf.year,
            title: pdf.title || '',
            pdf_url: pdf.pdf_url,
            newFile: null
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData(null);
    };

    const handleSaveEdit = async (id: number) => {
        if (!editData) return;

        // Validation
        if (!editData.year.trim()) {
            toast.error('Year is required');
            return;
        }

        try {
            let finalPdfUrl = editData.pdf_url;

            // If new file selected, upload it first
            if (editData.newFile) {
                const formData = new FormData();
                formData.append('file', editData.newFile);
                formData.append('module', 'pdf');

                const uploadResponse = await fetch('/api/placement/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(errorData.error || 'Failed to upload new PDF');
                }

                const uploadData = await uploadResponse.json();
                finalPdfUrl = uploadData.url;
            }

            // Update database
            const response = await fetch('/api/placement/pdfs', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    year: editData.year.trim(),
                    title: editData.title.trim() || null,
                    pdf_url: finalPdfUrl
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update placement PDF');
            }

            toast.success('Placement PDF updated successfully!');
            setEditingId(null);
            setEditData(null);
            fetchPDFs();
        } catch (error: any) {
            console.error('Error updating placement PDF:', error);
            toast.error(error.message || 'Failed to update placement PDF');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this placement PDF?')) {
            return;
        }

        try {
            const response = await fetch(`/api/placement/pdfs?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete placement PDF');
            }

            toast.success('Placement PDF deleted successfully!');
            fetchPDFs();
        } catch (error: any) {
            console.error('Error deleting placement PDF:', error);
            toast.error(error.message || 'Failed to delete placement PDF');
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
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Placement PDFs</h1>
                            <p className="text-gray-600">Manage placement reports and documents</p>
                        </div>
                    </div>
                </div>

                {/* Upload Form */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Upload New PDF
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Year Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="year" className="text-gray-700 font-medium">
                                        Year *
                                    </Label>
                                    <Input
                                        id="year"
                                        type="text"
                                        placeholder="e.g., 2023-24"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        disabled={isUploading}
                                    />
                                </div>

                                {/* Title Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-gray-700 font-medium">
                                        Title (Optional)
                                    </Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="e.g., Annual Report"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        disabled={isUploading}
                                    />
                                </div>

                                {/* File Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="file-input" className="text-gray-700 font-medium">
                                        PDF File *
                                    </Label>
                                    <Input
                                        id="file-input"
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={handleFileChange}
                                        className="cursor-pointer"
                                        disabled={isUploading}
                                    />
                                    <p className="text-xs text-gray-500">
                                        Max file size: 1 MB
                                    </p>
                                </div>
                            </div>

                            {/* Selected File Info */}
                            {selectedFile && (
                                <div className="border-2 border-dashed border-orange-300 rounded-xl p-4 bg-orange-50/30">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-8 h-8 text-red-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{selectedFile.name}</p>
                                            <p className="text-xs text-gray-600">
                                                {(selectedFile.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isUploading || !selectedFile || !year.trim()}
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
                                        Upload PDF
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* PDFs Table */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Placement PDFs ({pdfs.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {pdfs.length === 0 ? (
                            <div className="text-center py-12">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No PDFs Uploaded</h3>
                                <p className="text-gray-600">Upload placement reports and documents to get started.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Year</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">PDF Link</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Uploaded At</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pdfs.map((pdf) => (
                                            <tr key={pdf.id} className="border-b border-gray-100 hover:bg-orange-50/50 transition-colors">
                                                {editingId === pdf.id && editData ? (
                                                    <>
                                                        {/* Edit Mode */}
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="text"
                                                                value={editData.year}
                                                                onChange={(e) =>
                                                                    setEditData({ ...editData, year: e.target.value })
                                                                }
                                                                className="w-32"
                                                                placeholder="Year"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="text"
                                                                value={editData.title}
                                                                onChange={(e) =>
                                                                    setEditData({ ...editData, title: e.target.value })
                                                                }
                                                                className="w-full"
                                                                placeholder="Title (optional)"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex flex-col items-center gap-2">
                                                                <Input
                                                                    type="file"
                                                                    accept=".pdf,application/pdf"
                                                                    onChange={handleEditFileChange}
                                                                    className="text-xs cursor-pointer max-w-xs"
                                                                />
                                                                {editData.newFile && (
                                                                    <p className="text-xs text-green-600 font-medium">
                                                                        New file selected
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-600">
                                                            {new Date(pdf.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleSaveEdit(pdf.id)}
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
                                                        <td className="px-4 py-4 text-sm font-bold text-gray-800">
                                                            {pdf.year}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-700">
                                                            {pdf.title || (
                                                                <span className="text-gray-400 italic">No title</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-4 text-center">
                                                            <a
                                                                href={pdf.pdf_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                                View PDF
                                                            </a>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-600">
                                                            {new Date(pdf.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleEdit(pdf)}
                                                                    variant="outline"
                                                                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleDelete(pdf.id)}
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
