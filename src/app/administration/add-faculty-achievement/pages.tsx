"use client";

import React, { Suspense } from 'react';
import AchievementForm from '@/components/achievement/AchievementForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AddFacultyAchievementPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Faculty Achievement</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <AchievementForm />
      </Suspense>
    </div>
  );
}
