'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        // Redirect to login if not authenticated
        router.push('/auth/login');
        return;
      }

      // Redirect based on user role and department
      if (user.role === 'super_admin') {
        router.push('/super-admin/dashboard');
      } else if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (user.role === 'dept') {
        // For department users, redirect to department-specific dashboard
        router.push(`/departments/${user.department.toLowerCase()}/dashboard`);
      } else {
        // Default redirect for unknown roles
        router.push('/auth/login');
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  // Show loading spinner while determining where to redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Loading Dashboard...</h2>
        <p className="text-sm text-gray-600 mt-2">
          Redirecting you to the appropriate dashboard
        </p>
      </div>
    </div>
  );
}
