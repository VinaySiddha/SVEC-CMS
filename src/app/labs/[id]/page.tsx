"use client";

import { LabDetail } from '@/components/labs/LabDetail';
import { useParams } from 'next/navigation';

export default function LabDetailPage() {
  const params = useParams();
  const labId = Array.isArray(params?.id) ? params.id[0] : (params?.id || '');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <LabDetail labId={labId} />
    </div>
  );
}
