"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { LayoutDashboard, Newspaper, Users, Settings, LogOut } from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, pathname, router]);


  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
          <p className="mt-4 text-muted-foreground">Initializing Admin Portal...</p>
        </div>
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') {
     return null; // Don't render layout if not logged in and not on login page
  }

  if (user && pathname === '/admin/login') {
    router.push('/admin/dashboard');
    return null; // Avoid rendering login page if user is already logged in
  }
  
  if(pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-center border-b border-gray-700">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-400">SVEC CMS</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/admin/content" className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            <Newspaper className="w-5 h-5 mr-3" />
            Content
          </Link>
          <Link href="/admin/users" className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            <Users className="w-5 h-5 mr-3" />
            User Management
          </Link>
          <Link href="/admin/settings" className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2.5 text-sm rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
