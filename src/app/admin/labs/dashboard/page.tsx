import { LabsDashboard } from '@/components/labs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab Management Dashboard - SVEC Admin',
  description: 'Dashboard for computer labs management at Sri Vasavi Engineering College.',
};

export default function LabDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Lab Management Dashboard</h1>
      <LabsDashboard />
    </div>
  );
}
