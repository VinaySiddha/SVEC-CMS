'use client';

import { useState, useEffect } from 'react';
import * as deptRules from '@/lib/deptRules';

export default function TestModuleRules() {
  const [selectedDept, setSelectedDept] = useState('cse');
  const [selectedSyllabusType, setSelectedSyllabusType] = useState('btech');
  const [availableModules, setAvailableModules] = useState<string[]>([]);
  const [availableSyllabusTypes, setAvailableSyllabusTypes] = useState<string[]>([]);
  const [availableResearchPrograms, setAvailableResearchPrograms] = useState<string[]>([]);
  
  const [testResult, setTestResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Get all departments for testing
  const allDepartments = Object.values(deptRules.DEPARTMENTS);
  
  // Update available options when department changes
  useEffect(() => {
    setAvailableModules(deptRules.getAvailableModules(selectedDept));
    setAvailableSyllabusTypes(deptRules.getSyllabusTypes(selectedDept));
    setAvailableResearchPrograms(deptRules.getStudentResearchPrograms(selectedDept));
    
    // Reset the syllabus type if not available for the new department
    if (!deptRules.getSyllabusTypes(selectedDept).includes(selectedSyllabusType)) {
      setSelectedSyllabusType(deptRules.getSyllabusTypes(selectedDept)[0] || '');
    }
  }, [selectedDept, selectedSyllabusType]);
  
  const addLog = (message: string) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
  
  // Test creating a syllabus document
  const testCreateSyllabus = async (useAllowedType: boolean) => {
    try {
      const type = useAllowedType 
        ? deptRules.getSyllabusTypes(selectedDept)[0]
        : (selectedDept === deptRules.DEPARTMENTS.MBA || selectedDept === deptRules.DEPARTMENTS.BSH)
          ? 'btech'  // This will be invalid for MBA/BSH
          : 'syllabus'; // This will be invalid for engineering depts
      
      addLog(`Testing syllabus creation for ${selectedDept} with type "${type}" (${useAllowedType ? 'should be allowed' : 'should be rejected'})`);
      
      // First try to login with a department user
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usernameOrEmail: `${selectedDept}_admin`,
          password: 'Dept@123'
        })
      });
      
      if (!loginResponse.ok) {
        // Create the department user if it doesn't exist
        addLog(`Creating ${selectedDept} department user...`);
        await fetch(`/api/setup?action=create-dept&dept=${selectedDept}`);
        
        // Try login again
        const retryLoginResponse = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usernameOrEmail: `${selectedDept}_admin`,
            password: 'Dept@123'
          })
        });
        
        if (!retryLoginResponse.ok) {
          throw new Error(`Failed to login as ${selectedDept}_admin`);
        }
      }
      
      // Now try to create a syllabus document
      const syllabusData = {
        title: `${selectedDept.toUpperCase()} Syllabus Test`,
        description: `Test syllabus for ${selectedDept}`,
        file_url: 'https://example.com/test-syllabus.pdf',
        type: type,
        academic_year: '2025-2026',
        semester: '1',
        regulation: 'R21',
        is_active: true
      };
      
      const response = await fetch('/api/syllabus_documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(syllabusData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        addLog(`✅ Syllabus created successfully: ${data.document.id}`);
      } else {
        addLog(`❌ Syllabus creation failed: ${data.error}`);
      }
      
      setTestResult({
        status: response.ok,
        statusCode: response.status,
        data: data,
        expected: useAllowedType
      });
      
      // Check if the result matches expectations
      const success = response.ok === useAllowedType;
      addLog(success 
        ? '✅ TEST PASSED: Result matches expectation' 
        : '❌ TEST FAILED: Result does not match expectation');
      
    } catch (error) {
      console.error('Test error:', error);
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setTestResult({
        status: false,
        error: String(error),
        expected: useAllowedType
      });
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Department Module Rules Tester</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">Department Selection</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {allDepartments.map(dept => (
            <button
              key={dept}
              className={`px-3 py-1 rounded ${selectedDept === dept ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedDept(dept)}
            >
              {dept.toUpperCase()}
            </button>
          ))}
        </div>
        
        <h3 className="font-medium mb-1">Available Modules:</h3>
        <div className="bg-white p-2 rounded mb-3 text-sm">
          {availableModules.map(module => (
            <span key={module} className="inline-block px-2 py-1 bg-blue-100 rounded m-1">
              {module}
            </span>
          ))}
          {availableModules.length === 0 && <span className="text-gray-500">None</span>}
        </div>
        
        <h3 className="font-medium mb-1">Available Syllabus Types:</h3>
        <div className="bg-white p-2 rounded mb-3 text-sm">
          {availableSyllabusTypes.map(type => (
            <span key={type} className="inline-block px-2 py-1 bg-green-100 rounded m-1">
              {type}
            </span>
          ))}
          {availableSyllabusTypes.length === 0 && <span className="text-gray-500">None</span>}
        </div>
        
        <h3 className="font-medium mb-1">Available Research Programs:</h3>
        <div className="bg-white p-2 rounded mb-3 text-sm">
          {availableResearchPrograms.map(program => (
            <span key={program} className="inline-block px-2 py-1 bg-purple-100 rounded m-1">
              {program}
            </span>
          ))}
          {availableResearchPrograms.length === 0 && <span className="text-gray-500">None</span>}
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">API Test</h2>
        <p className="mb-4">
          Test creating a syllabus document with allowed and disallowed types for the selected department.
        </p>
        
        <div className="flex gap-4">
          <button
            onClick={() => testCreateSyllabus(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create with Valid Type
          </button>
          <button
            onClick={() => testCreateSyllabus(false)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Create with Invalid Type
          </button>
        </div>
        
        {testResult && (
          <div className={`mt-4 p-3 rounded ${testResult.status === testResult.expected ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-semibold mb-1">
              {testResult.status === testResult.expected ? 'Test Passed' : 'Test Failed'}
            </h3>
            <div className="text-sm">
              <div>Status: {testResult.status ? 'Success' : 'Error'}</div>
              <div>Status Code: {testResult.statusCode}</div>
              {testResult.data && (
                <div className="mt-2">
                  <pre className="bg-white p-2 rounded overflow-x-auto">
                    {JSON.stringify(testResult.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-black text-green-400 p-4 rounded h-80 overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <div className="text-gray-500">No logs yet. Run a test to see output.</div>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  );
}
