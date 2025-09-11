"use client"

import { useEffect } from 'react';
import { AuthProvider } from '@/lib/auth/AuthContext';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add page-specific metadata or layout elements for the login page
  useEffect(() => {
    console.log('Login page loaded');
  }, []);

  return (
    <AuthProvider>
      <main className="flex min-h-screen flex-col">
        {children}
      </main>
    </AuthProvider>
  );
}
