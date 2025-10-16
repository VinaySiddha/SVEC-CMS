'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth/AuthContext';
import { Building2, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: '', // username or email
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store session ID and user data
        login(data.sessionId, data.user);
        
        toast.success(`Welcome back, ${data.user.username}!`);
        
        // Redirect based on role
        if (data.user.role === 'super_admin') {
          router.push('/admin/dashboard');
        } else if (data.user.role === 'admin') {
          // Admin users can access both super admin dashboard and their department
          router.push('/admin/dashboard');
        } else if (data.user.role === 'dept') {
          // Redirect department users to their department dashboard
          router.push(`/departments/${data.user.department}/dashboard`);
        } else {
          // Default redirect for other roles
          router.push('/dashboard');
        }
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            SVEC CMS
          </h2>
          <p className="text-lg text-gray-600">
            Department Management System
          </p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 border-b border-gray-200/50 p-6">
            <CardTitle className="text-2xl font-bold text-gray-800 text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center text-lg">
              Sign in to access your department portal
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">Username or Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="identifier"
                    name="identifier"
                    type="text"
                    required
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="Enter your username or email"
                    disabled={isLoading}
                    className="pl-11 h-12 border-gray-200 focus:border-blue-300 focus:ring-blue-200 rounded-lg transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    className="pl-11 h-12 border-gray-200 focus:border-blue-300 focus:ring-blue-200 rounded-lg transition-colors"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in to Dashboard'
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Need access?{' '}
                <a 
                  href="mailto:admin@svec.edu.in" 
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Contact Administrator
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Access Levels</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-blue-800">Super Admin</p>
                  <p className="text-blue-600">Full system access and management</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-green-800">Admin</p>
                  <p className="text-green-600">Dashboard and department management</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-purple-800">Department</p>
                  <p className="text-purple-600">Specific department access and operations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
