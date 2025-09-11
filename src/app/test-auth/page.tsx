"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';

const TestAuth = () => {
  const [testUsername, setTestUsername] = useState('admin');
  const [testPassword, setTestPassword] = useState('password123');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(false);
  
  // Use the auth context
  const { user, login, logout: authLogout, checkAuthStatus: contextCheckAuth } = useAuth();

  const checkAuthStatus = async () => {
    setCheckingAuth(true);
    try {
      // Use the context method first
      await contextCheckAuth();
      
      // Also fetch directly for display purposes
      const res = await fetch('/api/auth/check', {
        credentials: 'include'
      });
      
      const data = await res.json();
      setAuthStatus(data);
      
      if (!res.ok) {
        console.log('Not authenticated');
      } else {
        console.log('Authenticated as:', data.user);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setCheckingAuth(false);
    }
  };
  
  const logout = async () => {
    try {
      // Use the context logout first
      await authLogout();
      
      // Then do our local state cleanup
      setAuthStatus(null);
      setResponse(null);
      console.log('Logged out successfully');
      checkAuthStatus();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const testLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // First try using the context login
      try {
        await login(testUsername, testPassword);
        console.log('Login successful via context');
      } catch (contextError) {
        console.warn('Context login failed, trying direct API call', contextError);
        
        // Fall back to direct API call for testing
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: testUsername,
            password: testPassword
          }),
          credentials: 'include'
        });

        const data = await res.json();
        setResponse(data);
        
        if (!res.ok) {
          throw new Error(data.error || 'Authentication failed');
        }
        
        console.log('Login successful via direct API call:', data.user);
      }
      
      // After successful login, check auth status to confirm
      checkAuthStatus();
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Auth Test Page</h1>
      
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Test Login</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={testUsername}
              onChange={(e) => setTestUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <button
            onClick={testLogin}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {loading ? 'Testing...' : 'Test Login'}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}
        </div>
        
        {response && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Response:</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={checkAuthStatus}
            disabled={checkingAuth}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            {checkingAuth ? 'Checking...' : 'Check Auth Status'}
          </button>
          
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
        
        {authStatus && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Current Auth Status:</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {JSON.stringify(authStatus, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="text-sm">
        <p>Note: This is a testing page for development only.</p>
        <p>Available test accounts:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Username: admin / Password: password123 (Admin user)</li>
          <li>Username: cse_hod / Password: password123 (CSE department)</li>
          <li>Username: aiml_hod / Password: password123 (AIML department)</li>
        </ul>
      </div>
    </div>
  );
};

export default TestAuth;
