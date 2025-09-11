import { FDPView } from '@/components/fdp';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Manage Faculty Development Programs - SVEC Admin',
  description: 'Admin panel for managing faculty development programs at Sri Vasavi Engineering College.',
};

export default function AdminFDPPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Faculty Development Programs</h1>
        <Link 
          href="/admin/fdp/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New FDP Record
        </Link>
      </div>
      
      <p className="text-gray-600 max-w-3xl mb-6">
        View and manage faculty development program records across all departments. 
        Use this dashboard to track workshops, training programs, and other professional 
        development activities attended by faculty members.
      </p>
      
      <FDPView isAdmin={true} />
    </div>
  );
}
