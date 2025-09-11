import { LabsView } from '@/components/labs/LabsView';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Computer Labs - SVEC Admin',
  description: 'Admin panel for managing computer labs at Sri Vasavi Engineering College.',
};

export default function AdminLabsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Labs</h1>
        <Link 
          href="/admin/labs/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Lab
        </Link>
      </div>
      
      <LabsView isAdmin={true} />
    </div>
  );
}
