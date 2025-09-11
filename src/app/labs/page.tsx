import { LabsView } from '@/components/labs/LabsView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Labs - SVEC',
  description: 'Explore our computer labs and facilities at Sri Vasavi Engineering College.',
};

export default function LabsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Computer Labs</h1>
        <p className="text-gray-600 max-w-3xl">
          Sri Vasavi Engineering College provides state-of-the-art computer laboratories 
          equipped with the latest hardware and software to support academic learning, 
          research, and innovation.
        </p>
      </div>
      
      <LabsView />
    </div>
  );
}
