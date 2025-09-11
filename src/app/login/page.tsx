"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const { login, loading: authLoading, error: authError, user, checkAuthStatus } = useAuth();
  const router = useRouter();
  
  // Force logout and then check auth status on mount
  useEffect(() => {
    // First logout to clear any existing session
    fetch('/api/auth/logout', { credentials: 'include' })
      .then(() => {
        // Then check auth status to reset the state
        checkAuthStatus();
      })
      .catch(err => {
        console.error("Error during forced logout:", err);
        checkAuthStatus();
      });
  }, [checkAuthStatus]);
  
  // Comment out auto-redirect to require explicit login
  // useEffect(() => {
  //   if (user && !isRedirecting) {
  //     setIsRedirecting(true);
  //     console.log('User already logged in:', user);
      
  //     if (user.role === 'admin') {
  //       router.push('/admin');
  //     } else if (user.department) {
  //       router.push(`/departments/${user.department.toLowerCase()}`);
  //     } else {
  //       router.push('/');
  //     }
  //   }
  // }, [user, router, isRedirecting]);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setIsLoggingIn(true);
    
    console.log(`Login attempted with username: ${username}`);
    
    try {
      await login(username, password);
      // The redirect is handled in the AuthContext after successful login
    } catch (err) {
      console.error('Login error:', err);
      setLocalError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Login</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        {(localError || authError) && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-6 text-sm">
            {localError || authError}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-foreground block">
              Username or Email
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
              placeholder="Enter your username or email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <Link 
                href="/forgot" 
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 bg-primary text-primary-foreground rounded-md font-medium transition-colors ${
              isLoggingIn || authLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-95'
            }`}
            disabled={isLoggingIn || authLoading}
          >
            {isLoggingIn || authLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="text-primary font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
