import { MOUsView } from '@/components/mou';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memorandums of Understanding - SVEC',
  description: 'List of Memorandums of Understanding (MOUs) with various organizations at Sri Vasavi Engineering College.',
};

export default function MOUsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Memorandums of Understanding (MOUs)</h1>
        <p className="text-gray-600 max-w-3xl">
          Sri Vasavi Engineering College has established Memorandums of Understanding (MOUs) with various organizations
          to provide enhanced learning opportunities, industry exposure, and career paths for our students.
        </p>
      </div>
      
      <MOUsView />
    </div>
  );
}
