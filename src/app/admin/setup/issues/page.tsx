"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const initIssuesTable = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/init/issues');
      const data = await response.json();
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error initializing issues table:', error);
      setResult(JSON.stringify({ error: 'Failed to initialize table' }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Database Setup</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Initialize Issues Table</h2>
          <Button
            onClick={initIssuesTable}
            disabled={loading}
          >
            {loading ? 'Initializing...' : 'Create Issues Table'}
          </Button>
          
          {result && (
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-x-auto">
              {result}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
