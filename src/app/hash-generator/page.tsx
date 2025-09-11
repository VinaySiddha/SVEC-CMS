"use client";

import { useState } from 'react';

export default function HashGenerator() {
  const [password, setPassword] = useState('password123');
  const [hash, setHash] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateHash = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/hash-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate hash');
      }
      
      const data = await response.json();
      setHash(data.hash);
    } catch (err: any) {
      console.error('Error generating hash:', err);
      setError(err.message || 'An error occurred while generating the hash');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Password Hash Generator</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      
      <button
        onClick={generateHash}
        disabled={isGenerating}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isGenerating ? 'Generating...' : 'Generate Hash'}
      </button>
      
      {hash && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Generated Hash:</h2>
          <div className="bg-gray-100 p-4 rounded-md break-all font-mono text-sm">
            {hash}
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h3 className="font-semibold">Copy this to users.json:</h3>
            <pre className="mt-2 text-sm overflow-x-auto">
{`{
  "id": "1",
  "username": "admin",
  "password": "${hash}",
  "role": "admin",
  "department": null
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
