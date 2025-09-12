'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleGoBack = () => {
    if (user?.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You don't have permission to access this page. Your current role and department 
              may not have the required permissions.
            </p>
            
            {user && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  <strong>Logged in as:</strong> {user.username}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Department:</strong> {user.department_name || user.department}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Role:</strong> {user.role === 'admin' ? 'Administrator' : 'Department User'}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Button onClick={handleGoBack} className="w-full">
                Go to Dashboard
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="w-full"
              >
                Logout
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                If you believe this is an error, please contact your system administrator.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
