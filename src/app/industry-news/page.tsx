import { IndustryNewsView } from '@/components/industry-news';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry News - SVEC',
  description: 'Latest updates and news from industry partners of Sri Vasavi Engineering College.',
};

export default function IndustryNewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry News & Updates</h1>
        <p className="text-gray-600 max-w-3xl">
          Stay updated with the latest news, events, and announcements from our industry partners.
          These updates provide valuable insights into industry trends, opportunities, and collaborations.
        </p>
      </div>
      
      <IndustryNewsView />
    </div>
  );
}
