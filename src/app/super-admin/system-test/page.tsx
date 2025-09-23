"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  Database, 
  Users, 
  Shield,
  Activity,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface SystemStatus {
  database: boolean;
  authentication: boolean;
  apis: boolean;
  dataManagement: boolean;
}

interface TestResults {
  overview: any;
  departments: any[];
  error?: string;
}

const SuperAdminSystemTest = () => {
  const router = useRouter();
  const [testing, setTesting] = useState(false);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    database: false,
    authentication: false,
    apis: false,
    dataManagement: false
  });
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const runSystemTests = async () => {
    setTesting(true);
    const newStatus: SystemStatus = {
      database: false,
      authentication: false,
      apis: false,
      dataManagement: false
    };

    try {
      // Test 1: Authentication Check
      console.log('Testing authentication...');
      const authResponse = await fetch('/api/super-admin/dashboard/stats');
      if (authResponse.ok) {
        newStatus.authentication = true;
        console.log('✓ Authentication working');
      } else {
        console.log('✗ Authentication failed:', authResponse.status);
      }

      // Test 2: Database Connection
      console.log('Testing database...');
      const dbResponse = await fetch('/api/super-admin/users');
      if (dbResponse.ok) {
        newStatus.database = true;
        console.log('✓ Database connection working');
      } else {
        console.log('✗ Database connection failed:', dbResponse.status);
      }

      // Test 3: API Endpoints
      console.log('Testing APIs...');
      const apiResponse = await fetch('/api/super-admin/departments');
      if (apiResponse.ok) {
        newStatus.apis = true;
        console.log('✓ API endpoints working');
      } else {
        console.log('✗ API endpoints failed:', apiResponse.status);
      }

      // Test 4: Data Management System
      console.log('Testing data management...');
      const dataResponse = await fetch('/api/super-admin/data-management/overview');
      if (dataResponse.ok) {
        const data = await dataResponse.json();
        newStatus.dataManagement = true;
        setTestResults({
          overview: data,
          departments: data.departments || []
        });
        console.log('✓ Data management system working');
      } else {
        console.log('✗ Data management system failed:', dataResponse.status);
        setTestResults({
          overview: null,
          departments: [],
          error: `Failed to fetch data: ${dataResponse.status}`
        });
      }

    } catch (error) {
      console.error('System test error:', error);
      setTestResults({
        overview: null,
        departments: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    setSystemStatus(newStatus);
    setTesting(false);
  };

  useEffect(() => {
    runSystemTests();
  }, []);

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    );
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const allSystemsOperational = Object.values(systemStatus).every(status => status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin System Test</h1>
          <p className="text-gray-600">Comprehensive system health check and functionality verification</p>
        </div>

        {/* Overall Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6" />
              System Status
              <Badge className={allSystemsOperational ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {allSystemsOperational ? 'All Systems Operational' : 'Issues Detected'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                {getStatusIcon(systemStatus.authentication)}
                <div>
                  <p className="font-medium">Authentication</p>
                  <p className="text-sm text-gray-500">JWT Token Verification</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                {getStatusIcon(systemStatus.database)}
                <div>
                  <p className="font-medium">Database</p>
                  <p className="text-sm text-gray-500">MySQL Connection</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                {getStatusIcon(systemStatus.apis)}
                <div>
                  <p className="font-medium">API Endpoints</p>
                  <p className="text-sm text-gray-500">REST API Functionality</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                {getStatusIcon(systemStatus.dataManagement)}
                <div>
                  <p className="font-medium">Data Management</p>
                  <p className="text-sm text-gray-500">Department Data Access</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        {testResults && (
          <div className="space-y-6">
            {testResults.error && (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  {testResults.error}
                </AlertDescription>
              </Alert>
            )}

            {systemStatus.dataManagement && testResults.departments && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="h-6 w-6" />
                    Data Management Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {testResults.departments.length}
                        </p>
                        <p className="text-sm text-gray-600">Active Departments</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {testResults.departments.reduce((sum, dept) => sum + (dept.stats?.total_records || 0), 0)}
                        </p>
                        <p className="text-sm text-gray-600">Total Records</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">9</p>
                        <p className="text-sm text-gray-600">Data Modules</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">
                          {testResults.departments.filter(dept => 
                            new Date().getTime() - new Date(dept.last_updated || 0).getTime() < 7 * 24 * 60 * 60 * 1000
                          ).length}
                        </p>
                        <p className="text-sm text-gray-600">Updated This Week</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Department Data Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {testResults.departments.slice(0, 6).map((dept: any, index: number) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{dept.department_name}</h5>
                              <Badge variant="outline">{dept.department?.toUpperCase()}</Badge>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p>Total Records: {dept.stats?.total_records || 0}</p>
                              <p>Faculty: {dept.stats?.faculty_profiles || 0}</p>
                              <p>Students: {dept.stats?.student_achievements || 0}</p>
                              <p>Last Updated: {new Date(dept.last_updated || 0).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button 
            onClick={runSystemTests} 
            disabled={testing}
            className="flex items-center gap-2"
          >
            <Activity className="h-4 w-4" />
            {testing ? 'Testing...' : 'Run Tests Again'}
          </Button>
          
          {allSystemsOperational && (
            <Button 
              variant="outline"
              onClick={() => router.push('/super-admin/data-management')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Go to Data Management
            </Button>
          )}
          
          <Button 
            variant="outline"
            onClick={() => router.push('/super-admin/credentials')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Manage Users
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSystemTest;