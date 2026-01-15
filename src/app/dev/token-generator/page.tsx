'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, RefreshCw, Key } from 'lucide-react';

export default function TokenUtilityPage() {
  const [generatedToken, setGeneratedToken] = useState('');
  const [userDetails, setUserDetails] = useState({
    username: 'cse_ai_admin',
    department: 'cse-ai',
    role: 'admin'
  });
  const [loading, setLoading] = useState(false);

  const generateToken = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/dev/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to generate token');
      }

      const data = await response.json();
      setGeneratedToken(data.token);
      
      // Automatically save to localStorage
      localStorage.setItem('authToken', data.token);
      
    } catch (error) {
      console.error('Failed to generate token:', error);
      alert('Failed to generate token. Please try again.');
    }
    
    setLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedToken);
      alert('Token copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const applyToken = () => {
    localStorage.setItem('authToken', generatedToken);
    alert('Token applied to localStorage! You can now use the admin dashboard.');
    
    // Reload the page to refresh auth state
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <Key className="inline-block w-8 h-8 mr-2 text-blue-600" />
            Admin Token Generator
          </h1>
          <p className="text-gray-600">
            Generate fresh authentication tokens for testing admin dashboard functionality
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Test Token</CardTitle>
            <CardDescription>
              Create a fresh JWT token for admin access. This token will be valid for 8 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={userDetails.username}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                />
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <select
                  id="department"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userDetails.department}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, department: e.target.value }))}
                >
                  <option value="cse-ai">CSE-AI</option>
                  <option value="aiml">AIML</option>
                  <option value="cse-ds">CSE-DS</option>
                  <option value="cse">CSE</option>
                  <option value="ece">ECE</option>
                  <option value="eee">EEE</option>
                  <option value="civil">Civil</option>
                  <option value="mech">Mechanical</option>
                  <option value="mba">MBA</option>
                  <option value="bsh">BSH</option>
                  <option value="cst">CST</option>
                  <option value="ect">ECT</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userDetails.role}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, role: e.target.value }))}
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                  <option value="dept">Department User</option>
                </select>
              </div>
            </div>
            
            <Button
              onClick={generateToken}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Key className="w-4 h-4 mr-2" />
              )}
              Generate Token
            </Button>
          </CardContent>
        </Card>

        {generatedToken && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Token Generated Successfully!</CardTitle>
              <CardDescription>
                Your authentication token is ready. Click "Apply Token" to use it immediately.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Generated JWT Token:</Label>
                <div className="relative">
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-md font-mono text-xs bg-gray-50"
                    value={generatedToken}
                    readOnly
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={applyToken} className="flex-1">
                  Apply Token & Reload
                </Button>
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              
              <Alert>
                <AlertDescription>
                  <strong>Token Details:</strong>
                  <br />• Username: {userDetails.username}
                  <br />• Department: {userDetails.department}
                  <br />• Role: {userDetails.role}
                  <br />• Expires: 8 hours from now
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Alert>
            <AlertDescription>
              <strong>Note:</strong> This is a development utility for testing admin functionality. 
              In production, tokens should only be generated through proper authentication flows.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}