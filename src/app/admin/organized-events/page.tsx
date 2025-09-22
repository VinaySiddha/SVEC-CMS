import { OrganizedEventView } from '@/components/organized-events';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Manage Organized Events - SVEC Admin',
  description: 'Admin panel for managing events organized by departments at Sri Vasavi Engineering College.',
};

export default function AdminOrganizedEventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Organized Events</h1>
        <Link 
          href="/admin/organized-events/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Event
        </Link>
      </div>
      
      <p className="text-gray-600 max-w-3xl mb-6">
        View and manage events organized by departments across the college. 
        Use this dashboard to track workshops, conferences, seminars, and other 
        events with their reports.
      </p>
      
      <OrganizedEventView isAdmin={true} />
    </div>
  );
}
