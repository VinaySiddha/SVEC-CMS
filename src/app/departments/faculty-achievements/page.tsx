"use client";

import React, { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AchievementsList from '@/components/achievement/AchievementsList';
import { ACHIEVEMENT_TYPES } from '@/utils/faculty-achievements-utils';
import LoadingSpinner from '@/components/LoadingSpinner';

// Metadata is not supported in client components

export default function FacultyAchievementsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Faculty Achievements</h1>
      
      <div className="mx-auto max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Browse Achievements by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={ACHIEVEMENT_TYPES[0]} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
                {ACHIEVEMENT_TYPES.map(type => (
                  <TabsTrigger key={type} value={type} className="text-sm">
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {ACHIEVEMENT_TYPES.map(type => (
                <TabsContent key={type} value={type}>
                  <h2 className="text-xl font-semibold mb-4">{type}</h2>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AchievementsList isAdmin={false} />
                  </Suspense>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
