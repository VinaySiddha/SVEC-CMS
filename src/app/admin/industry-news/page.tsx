import { IndustryNewsView } from '@/components/industry-news';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Industry News - SVEC Admin',
  description: 'Admin panel for managing industry news and updates at Sri Vasavi Engineering College.',
};

export default function AdminIndustryNewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Industry News</h1>
        <Link 
          href="/admin/industry-news/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add News Item
        </Link>
      </div>
      
      <IndustryNewsView isAdmin={true} />
    </div>
  );
}
