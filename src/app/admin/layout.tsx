
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { app, db } from '@/lib/firebase';
import { LayoutDashboard, Newspaper, Users, Settings, LogOut } from 'lucide-react';

interface UserProfile {
  role: 'superadmin' | 'department_admin';
  department?: string;
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch user profile from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        } else {
          // Handle case where user exists in Auth but not in Firestore
          setUserProfile(null); 
          // You might want to log them out or assign a default role
          await signOut(auth);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
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
  
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

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

  if (!user) {
     return null; 
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
          {userProfile?.role === 'superadmin' && (
            <>
              <Link href="/admin/users" className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-gray-700 transition-colors">
                <Users className="w-5 h-5 mr-3" />
                User Management
              </Link>
              <Link href="/admin/settings" className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-gray-700 transition-colors">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </>
          )}
        </nav>
        <div className="p-4 border-t border-gray-700">
           <div className="px-4 py-3 mb-2 border-b border-gray-700">
            <p className="text-sm font-medium text-white">{user.email}</p>
            <p className="text-xs text-gray-400 capitalize">{userProfile?.role?.replace('_', ' ')}</p>
          </div>
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
