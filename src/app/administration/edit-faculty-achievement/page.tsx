import React from 'react';
import AchievementForm from '@/components/achievement/AchievementForm';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Edit Faculty Achievement | SVEC Admin',
  description: 'Edit an existing faculty achievement record',
};

export default function EditFacultyAchievementPage({ params }: PageProps) {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Faculty Achievement</h1>
      <AchievementForm achievementId={params.id} />
    </div>
  );
}
