import { SuperAdminProvider } from '@/contexts/SuperAdminContext';
import SuperAdminLayout from '@/components/SuperAdminLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuperAdminProvider>
      <SuperAdminLayout>
        {children}
      </SuperAdminLayout>
    </SuperAdminProvider>
  );
}