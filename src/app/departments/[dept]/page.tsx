'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface DepartmentPageProps {
  params: Promise<{ dept: string }>;
}

export default function DepartmentPage({ params }: DepartmentPageProps) {
  const router = useRouter();

  useEffect(() => {
    const redirectToDashboard = async () => {
      try {
        const resolvedParams = await params;
        const dept = resolvedParams.dept;
        
        // Redirect to the new dashboard page
        router.replace(`/departments/${dept}/dashboard`);
      } catch (error) {
        router.replace('/auth/login');
      }
    };

    redirectToDashboard();
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}
