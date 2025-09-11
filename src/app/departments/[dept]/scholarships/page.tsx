import React from 'react';
import ScholarshipsList from '@/components/scholarships/ScholarshipsList';

interface ScholarshipsPageProps {
  params: {
    deptId: string;
  };
}

export default function ScholarshipsPage({ params }: ScholarshipsPageProps) {
  const { deptId } = params;
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Department Scholarships</h1>
      
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Scholarship Records</h2>
          <ScholarshipsList deptId={deptId} isAdmin={false} />
        </section>
      </div>
    </div>
  );
}
