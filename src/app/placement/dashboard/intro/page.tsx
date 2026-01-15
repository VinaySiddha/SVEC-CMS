'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    ArrowLeft,
    FileText,
    Edit,
    X,
    Check,
    Loader2,
    Save
} from 'lucide-react';
import { toast } from 'sonner';

interface PlacementIntro {
    id?: number;
    content: string;
    updated_at?: string;
}

export default function PlacementIntroPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [intro, setIntro] = useState<PlacementIntro | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || user?.role !== 'placement')) {
            router.replace('/auth/login');
        }
    }, [authLoading, isAuthenticated, user, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchIntro();
        }
    }, [isAuthenticated]);

    const fetchIntro = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/placement/intro');

            if (!response.ok) {
                throw new Error('Failed to fetch placement intro');
            }

            const data = await response.json();
            setIntro(data);
        } catch (error) {
            console.error('Error fetching placement intro:', error);
            toast.error('Failed to load placement intro');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => {
        setEditContent(intro?.content || '');
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditContent('');
    };

    const handleSave = async () => {
        // Validation
        if (!editContent.trim()) {
            toast.error('Content cannot be empty');
            return;
        }

        try {
            setIsSaving(true);

            // If no intro exists, create new one
            if (!intro?.id) {
                const response = await fetch('/api/placement/intro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: editContent.trim() })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to create placement intro');
                }

                toast.success('Placement intro created successfully!');
            } else {
                // Update existing intro
                const response = await fetch('/api/placement/intro', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: intro.id,
                        content: editContent.trim()
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to update placement intro');
                }

                toast.success('Placement intro updated successfully!');
            }

            setIsEditing(false);
            setEditContent('');
            fetchIntro();
        } catch (error: any) {
            console.error('Error saving placement intro:', error);
            toast.error(error.message || 'Failed to save placement intro');
        } finally {
            setIsSaving(false);
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
                            <h1 className="text-3xl font-bold text-gray-800">Placement Introduction</h1>
                            <p className="text-gray-600">Manage placement cell introduction content</p>
                        </div>
                    </div>
                </div>

                {/* Content Preview Card */}
                {!isEditing && (
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Current Introduction
                                </CardTitle>
                                <Button
                                    onClick={handleEdit}
                                    variant="secondary"
                                    size="sm"
                                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            {intro?.content ? (
                                <div className="prose max-w-none">
                                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                            {intro.content}
                                        </p>
                                    </div>
                                    {intro.updated_at && (
                                        <p className="text-sm text-gray-500 mt-4">
                                            Last updated: {new Date(intro.updated_at).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        No Introduction Content
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Click the Edit button above to add introduction content for the placement cell.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Edit Form Card */}
                {isEditing && (
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <Edit className="w-5 h-5" />
                                Edit Introduction
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                {/* Textarea */}
                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-gray-700 font-medium text-base">
                                        Introduction Content *
                                    </Label>
                                    <textarea
                                        id="content"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        disabled={isSaving}
                                        placeholder="Enter the placement cell introduction content here..."
                                        className="w-full min-h-[300px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-y disabled:opacity-50 disabled:cursor-not-allowed font-sans text-gray-800 leading-relaxed"
                                        style={{ minHeight: '300px' }}
                                    />
                                    <p className="text-sm text-gray-500">
                                        Write a compelling introduction about the placement cell, its mission, and achievements.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleSave}
                                        disabled={isSaving || !editContent.trim()}
                                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-6 py-2"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        onClick={handleCancelEdit}
                                        variant="outline"
                                        className="border-gray-300"
                                        disabled={isSaving}
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Help Card */}
                <Card className="bg-blue-50/50 backdrop-blur-sm border border-blue-200/50 rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-2">About This Section</h3>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    The placement introduction appears on the main placement page. It should provide
                                    an overview of the placement cell, its objectives, success stories, and how it
                                    supports students in their career journey. Keep it informative and engaging.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
