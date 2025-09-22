import { MOUsView } from '@/components/mou';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage MOUs - SVEC Admin',
  description: 'Admin panel for managing Memorandums of Understanding at Sri Vasavi Engineering College.',
};

export default function AdminMOUsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage MOUs</h1>
        <Link 
          href="/admin/mous/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New MOU
        </Link>
      </div>
      
      <MOUsView isAdmin={true} />
    </div>
  );
}
