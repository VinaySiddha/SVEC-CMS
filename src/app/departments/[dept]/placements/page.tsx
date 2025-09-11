import React from 'react';
import PlacementsList from '@/components/placements/PlacementsList';
import PlacementGallery from '@/components/placements/PlacementGallery';

interface PlacementsPageProps {
  params: {
    deptId: string;
  };
}

export default function PlacementsPage({ params }: PlacementsPageProps) {
  const { deptId } = params;
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Department Placements</h1>
      
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Placement Statistics</h2>
          <PlacementsList deptId={deptId} />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Placement Gallery</h2>
          <div className="max-w-3xl mx-auto">
            <PlacementGallery deptId={deptId} />
          </div>
        </section>
        
        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About Our Placements</h2>
          <p className="text-lg mb-4">
            Our department is committed to preparing students for successful careers through 
            industry-relevant education, training, and placement opportunities. We maintain 
            strong relationships with leading companies to ensure our students have access to 
            the best job opportunities.
          </p>
          <p className="text-lg">
            Our Training and Placement Cell works tirelessly to enhance students' skills and 
            connect them with suitable employment opportunities. The cell organizes various 
            activities including mock interviews, resume building workshops, and soft skills 
            training to prepare students for the corporate world.
          </p>
        </section>
      </div>
    </div>
  );
}
