"use client"

import { AuthProvider } from '@/lib/auth/AuthContext';

export default function TestAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <main className="flex min-h-screen flex-col">
        {children}
      </main>
    </AuthProvider>
  );
}
