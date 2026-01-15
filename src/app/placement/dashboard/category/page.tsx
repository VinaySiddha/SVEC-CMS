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
    Table as TableIcon,
    Trash2,
    Edit,
    X,
    Save,
    Loader2,
    Plus,
    Check
} from 'lucide-react';
import { toast } from 'sonner';

interface CategoryStats {
    id: number;
    year: string;
    category: 'UG' | 'PG' | 'TOTAL';
    civil: number;
    mech: number;
    eee: number;
    ece: number;
    cse: number;
    mba: number;
    created_at: string;
}

export default function PlacementCategoryPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        year: '',
        category: 'UG' as 'UG' | 'PG' | 'TOTAL',
        civil: 0,
        mech: 0,
        eee: 0,
        ece: 0,
        cse: 0,
        mba: 0
    });

    // Edit state
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<CategoryStats | null>(null);

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || user?.role !== 'placement')) {
            router.replace('/auth/login');
        }
    }, [authLoading, isAuthenticated, user, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCategoryStats();
        }
    }, [isAuthenticated]);

    const fetchCategoryStats = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/placement/category');

            if (!response.ok) {
                throw new Error('Failed to fetch category stats');
            }

            const data = await response.json();
            setCategoryStats(data);
        } catch (error) {
            console.error('Error fetching category stats:', error);
            toast.error('Failed to load category stats');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'year' || name === 'category' ? value : parseInt(value) || 0
        }));
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        if (!editData) return;

        const value = e.target.value;
        setEditData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                [field]: field === 'year' || field === 'category' ? value : parseInt(value) || 0
            };
        });
    };

    const resetForm = () => {
        setFormData({
            year: '',
            category: 'UG',
            civil: 0,
            mech: 0,
            eee: 0,
            ece: 0,
            cse: 0,
            mba: 0
        });
        setShowAddForm(false);
        setEditingId(null);
        setEditData(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.year.trim()) {
            toast.error('Year is required');
            return;
        }

        if (!formData.category) {
            toast.error('Category is required');
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch('/api/placement/category', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add category stats');
            }

            toast.success('Category stats added successfully!');

            // Reset form and refresh data
            resetForm();
            fetchCategoryStats();
        } catch (error: any) {
            console.error('Error saving category stats:', error);
            toast.error(error.message || 'Failed to save category stats');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (stats: CategoryStats) => {
        setEditingId(stats.id);
        setEditData({ ...stats });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData(null);
    };

    const handleSaveEdit = async () => {
        if (!editData) return;

        // Validation
        if (!editData.year.trim()) {
            toast.error('Year is required');
            return;
        }

        if (!editData.category) {
            toast.error('Category is required');
            return;
        }

        try {
            const response = await fetch('/api/placement/category', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update category stats');
            }

            toast.success('Category stats updated successfully!');
            setEditingId(null);
            setEditData(null);
            fetchCategoryStats();
        } catch (error: any) {
            console.error('Error updating category stats:', error);
            toast.error(error.message || 'Failed to update category stats');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this category stats entry?')) {
            return;
        }

        try {
            const response = await fetch(`/api/placement/category?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete category stats');
            }

            toast.success('Category stats deleted successfully!');
            fetchCategoryStats();
        } catch (error: any) {
            console.error('Error deleting category stats:', error);
            toast.error(error.message || 'Failed to delete category stats');
        }
    };

    const getCategoryBadgeColor = (category: string) => {
        switch (category) {
            case 'UG':
                return 'bg-blue-100 text-blue-800';
            case 'PG':
                return 'bg-green-100 text-green-800';
            case 'TOTAL':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/placement/dashboard"
                                className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 border border-blue-200 font-medium"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Link>
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                <TableIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Category Table</h1>
                                <p className="text-gray-600">Manage branch-wise placement data by category</p>
                            </div>
                        </div>
                        {!showAddForm && (
                            <Button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Entry
                            </Button>
                        )}
                    </div>
                </div>

                {/* Add Form */}
                {showAddForm && (
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <TableIcon className="w-5 h-5" />
                                Add New Category Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Year and Category */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="year" className="text-gray-700 font-medium">
                                            Academic Year *
                                        </Label>
                                        <Input
                                            id="year"
                                            name="year"
                                            type="text"
                                            placeholder="e.g., 2023-24"
                                            value={formData.year}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-gray-700 font-medium">
                                            Category *
                                        </Label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="UG">UG</option>
                                            <option value="PG">PG</option>
                                            <option value="TOTAL">TOTAL</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Department Inputs Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {/* Civil */}
                                    <div className="space-y-2">
                                        <Label htmlFor="civil" className="text-gray-700 font-medium text-sm">
                                            Civil
                                        </Label>
                                        <Input
                                            id="civil"
                                            name="civil"
                                            type="number"
                                            min="0"
                                            value={formData.civil}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* Mech */}
                                    <div className="space-y-2">
                                        <Label htmlFor="mech" className="text-gray-700 font-medium text-sm">
                                            Mech
                                        </Label>
                                        <Input
                                            id="mech"
                                            name="mech"
                                            type="number"
                                            min="0"
                                            value={formData.mech}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* EEE */}
                                    <div className="space-y-2">
                                        <Label htmlFor="eee" className="text-gray-700 font-medium text-sm">
                                            EEE
                                        </Label>
                                        <Input
                                            id="eee"
                                            name="eee"
                                            type="number"
                                            min="0"
                                            value={formData.eee}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* ECE */}
                                    <div className="space-y-2">
                                        <Label htmlFor="ece" className="text-gray-700 font-medium text-sm">
                                            ECE
                                        </Label>
                                        <Input
                                            id="ece"
                                            name="ece"
                                            type="number"
                                            min="0"
                                            value={formData.ece}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* CSE */}
                                    <div className="space-y-2">
                                        <Label htmlFor="cse" className="text-gray-700 font-medium text-sm">
                                            CSE
                                        </Label>
                                        <Input
                                            id="cse"
                                            name="cse"
                                            type="number"
                                            min="0"
                                            value={formData.cse}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* MBA */}
                                    <div className="space-y-2">
                                        <Label htmlFor="mba" className="text-gray-700 font-medium text-sm">
                                            MBA
                                        </Label>
                                        <Input
                                            id="mba"
                                            name="mba"
                                            type="number"
                                            min="0"
                                            value={formData.mba}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-6 py-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Adding...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Add Entry
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={resetForm}
                                        variant="outline"
                                        className="border-gray-300"
                                        disabled={isSubmitting}
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Category Stats Table */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <TableIcon className="w-5 h-5" />
                            Category Statistics ({categoryStats.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {categoryStats.length === 0 ? (
                            <div className="text-center py-12">
                                <TableIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Data Available</h3>
                                <p className="text-gray-600 mb-6">
                                    Add category-wise placement statistics to display data.
                                </p>
                                <Button
                                    onClick={() => setShowAddForm(true)}
                                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add First Entry
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Year</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Category</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Civil</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Mech</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">EEE</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">ECE</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">CSE</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">MBA</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryStats.map((stats) => (
                                            <tr key={stats.id} className="border-b border-gray-100 hover:bg-orange-50/50 transition-colors">
                                                {editingId === stats.id && editData ? (
                                                    <>
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="text"
                                                                value={editData.year}
                                                                onChange={(e) => handleEditInputChange(e, 'year')}
                                                                className="w-full text-sm"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <select
                                                                value={editData.category}
                                                                onChange={(e) => handleEditInputChange(e, 'category')}
                                                                className="w-full h-9 px-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                            >
                                                                <option value="UG">UG</option>
                                                                <option value="PG">PG</option>
                                                                <option value="TOTAL">TOTAL</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                value={editData.civil}
                                                                onChange={(e) => handleEditInputChange(e, 'civil')}
                                                                className="w-20 text-sm text-center"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                value={editData.mech}
                                                                onChange={(e) => handleEditInputChange(e, 'mech')}
                                                                className="w-20 text-sm text-center"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                value={editData.eee}
                                                                onChange={(e) => handleEditInputChange(e, 'eee')}
                                                                className="w-20 text-sm text-center"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                value={editData.ece}
                                                                onChange={(e) => handleEditInputChange(e, 'ece')}
                                                                className="w-20 text-sm text-center"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                value={editData.cse}
                                                                onChange={(e) => handleEditInputChange(e, 'cse')}
                                                                className="w-20 text-sm text-center"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                value={editData.mba}
                                                                onChange={(e) => handleEditInputChange(e, 'mba')}
                                                                className="w-20 text-sm text-center"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={handleSaveEdit}
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
                                                        <td className="px-4 py-4 text-sm font-bold text-gray-800">{stats.year}</td>
                                                        <td className="px-4 py-4 text-center">
                                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(stats.category)}`}>
                                                                {stats.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-4 text-center text-sm text-gray-700">{stats.civil}</td>
                                                        <td className="px-4 py-4 text-center text-sm text-gray-700">{stats.mech}</td>
                                                        <td className="px-4 py-4 text-center text-sm text-gray-700">{stats.eee}</td>
                                                        <td className="px-4 py-4 text-center text-sm text-gray-700">{stats.ece}</td>
                                                        <td className="px-4 py-4 text-center text-sm text-gray-700">{stats.cse}</td>
                                                        <td className="px-4 py-4 text-center text-sm text-gray-700">{stats.mba}</td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleEdit(stats)}
                                                                    variant="outline"
                                                                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleDelete(stats.id)}
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
