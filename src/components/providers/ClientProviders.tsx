'use client';

import { AuthProvider } from '@/lib/auth/AuthContext';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { NavigationTracker } from './NavigationTracker';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NavigationProvider>
        <NavigationTracker />
        {children}
      </NavigationProvider>
    </AuthProvider>
  );
}

// Also export as default for flexibility
export default ClientProviders;
