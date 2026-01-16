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
    BarChart,
    Trash2,
    Edit,
    X,
    Save,
    Loader2,
    Plus,
    Check
} from 'lucide-react';
import { toast } from 'sonner';

interface ChartData {
    id: number;
    year: string;
    civil: number;
    mech: number;
    eee: number;
    ece: number;
    cse: number;
    mba: number;
    aiml: number;
    cai: number;
    ect: number;
    cst: number;
    created_at: string;
}

export default function PlacementChartsPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        year: '',
        civil: 0,
        mech: 0,
        eee: 0,
        ece: 0,
        cse: 0,
        mba: 0,
        aiml: 0,
        cai: 0,
        ect: 0,
        cst: 0
    });

    // Edit state
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || user?.role !== 'placement')) {
            router.replace('/auth/login');
        }
    }, [authLoading, isAuthenticated, user, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchChartData();
        }
    }, [isAuthenticated]);

    const fetchChartData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/placement/charts');

            if (!response.ok) {
                throw new Error('Failed to fetch placement charts');
            }

            const data = await response.json();
            setChartData(data);
        } catch (error) {
            toast.error('Failed to load placement charts');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'year' ? value : parseInt(value) || 0
        }));
    };

    const resetForm = () => {
        setFormData({
            year: '',
            civil: 0,
            mech: 0,
            eee: 0,
            ece: 0,
            cse: 0,
            mba: 0,
            aiml: 0,
            cai: 0,
            ect: 0,
            cst: 0
        });
        setShowAddForm(false);
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.year.trim()) {
            toast.error('Year is required');
            return;
        }

        try {
            setIsSubmitting(true);

            // Save or update chart data
            const method = editingId ? 'PUT' : 'POST';
            const payload: any = {
                year: formData.year.trim(),
                civil: formData.civil,
                mech: formData.mech,
                eee: formData.eee,
                ece: formData.ece,
                cse: formData.cse,
                mba: formData.mba,
                aiml: formData.aiml,
                cai: formData.cai,
                ect: formData.ect,
                cst: formData.cst
            };

            if (editingId) {
                payload.id = editingId;
            }

            const response = await fetch('/api/placement/charts', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to ${editingId ? 'update' : 'add'} placement chart`);
            }

            toast.success(`Placement chart ${editingId ? 'updated' : 'added'} successfully!`);

            // Reset form and refresh data
            resetForm();
            fetchChartData();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save placement chart');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (chart: ChartData) => {
        setEditingId(chart.id);
        setShowAddForm(true);
        setFormData({
            year: chart.year,
            civil: chart.civil,
            mech: chart.mech,
            eee: chart.eee,
            ece: chart.ece,
            cse: chart.cse,
            mba: chart.mba,
            aiml: chart.aiml ?? 0,
            cai: chart.cai ?? 0,
            ect: chart.ect ?? 0,
            cst: chart.cst ?? 0
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this placement chart entry?')) {
            return;
        }

        try {
            const response = await fetch(`/api/placement/charts?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete placement chart');
            }

            toast.success('Placement chart deleted successfully!');
            fetchChartData();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete placement chart');
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
                                <BarChart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Year-wise Charts</h1>
                                <p className="text-gray-600">Manage placement statistics by year</p>
                            </div>
                        </div>
                        {!showAddForm && (
                            <Button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Year
                            </Button>
                        )}
                    </div>
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <BarChart className="w-5 h-5" />
                                {editingId ? 'Edit Year Data' : 'Add New Year Data'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Year Input */}
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

                                    {/* AIML */}
                                    <div className="space-y-2">
                                        <Label htmlFor="aiml" className="text-gray-700 font-medium text-sm">
                                            AIML
                                        </Label>
                                        <Input
                                            id="aiml"
                                            name="aiml"
                                            type="number"
                                            min="0"
                                            value={formData.aiml}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* CAI */}
                                    <div className="space-y-2">
                                        <Label htmlFor="cai" className="text-gray-700 font-medium text-sm">
                                            CAI
                                        </Label>
                                        <Input
                                            id="cai"
                                            name="cai"
                                            type="number"
                                            min="0"
                                            value={formData.cai}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* ECT */}
                                    <div className="space-y-2">
                                        <Label htmlFor="ect" className="text-gray-700 font-medium text-sm">
                                            ECT
                                        </Label>
                                        <Input
                                            id="ect"
                                            name="ect"
                                            type="number"
                                            min="0"
                                            value={formData.ect}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* CST */}
                                    <div className="space-y-2">
                                        <Label htmlFor="cst" className="text-gray-700 font-medium text-sm">
                                            CST
                                        </Label>
                                        <Input
                                            id="cst"
                                            name="cst"
                                            type="number"
                                            min="0"
                                            value={formData.cst}
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
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                {editingId ? 'Update Data' : 'Add Data'}
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

                {/* Chart Data Table */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <BarChart className="w-5 h-5" />
                            Placement Statistics ({chartData.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {chartData.length === 0 ? (
                            <div className="text-center py-12">
                                <BarChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Data Available</h3>
                                <p className="text-gray-600 mb-6">
                                    Add year-wise placement statistics to display charts.
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
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Civil</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Mech</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">EEE</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">ECE</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">CSE</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">MBA</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">AIML</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">CAI</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">ECT</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">CST</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Total</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chartData.map((chart) => {
                                            const total = chart.civil + chart.mech + chart.eee + chart.ece + chart.cse + chart.mba + (chart.aiml || 0) + (chart.cai || 0) + (chart.ect || 0) + (chart.cst || 0);
                                            return (
                                                <tr key={chart.id} className="border-b border-gray-100 hover:bg-orange-50/50 transition-colors">
                                                    <td className="px-4 py-4 text-sm font-bold text-gray-800">{chart.year}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.civil}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.mech}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.eee}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.ece}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.cse}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.mba}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.aiml ?? 0}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.cai ?? 0}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.ect ?? 0}</td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700">{chart.cst ?? 0}</td>
                                                    <td className="px-4 py-4 text-center text-sm font-bold text-orange-600">{total}</td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                onClick={() => handleEdit(chart)}
                                                                variant="outline"
                                                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                onClick={() => handleDelete(chart.id)}
                                                                variant="outline"
                                                                className="border-red-300 text-red-600 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t-2 border-gray-300 bg-gradient-to-r from-orange-50 to-red-50">
                                            <td className="px-4 py-3 text-sm font-bold text-gray-800">Overall Total</td>
                                            <td className="px-4 py-3 text-center text-sm font-bold text-gray-800">
                                                {chartData.reduce((sum, c) => sum + c.civil, 0)}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm font-bold text-gray-800">
                                                {chartData.reduce((sum, c) => sum + c.mech, 0)}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm font-bold text-gray-800">
                                                {chartData.reduce((sum, c) => sum + c.eee, 0)}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm font-bold text-gray-800">
                                                {chartData.reduce((sum, c) => sum + c.ece, 0)}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm font-bold text-gray-800">
                                                {chartData.reduce((sum, c) => sum + c.cse, 0)}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm font-bold text-gray-800">
                                                {chartData.reduce((sum, c) => sum + c.mba, 0)}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm font-bold text-orange-600 text-lg">
                                                {chartData.reduce((sum, c) => sum + c.civil + c.mech + c.eee + c.ece + c.cse + c.mba, 0)}
                                            </td>
                                            <td className="px-4 py-3"></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
