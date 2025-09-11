import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Issue } from '@/types/issues';
import { IssueForm } from '@/components/department/IssueForm';
import { IssuesList } from '@/components/department/IssuesList';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';

interface IssuesProps {
  deptId: string;
}

export default function Issues({ deptId }: IssuesProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list');

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/departments/${deptId}/issues`);
      const data = await response.json();
      
      if (data.success) {
        setIssues(data.issues);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [deptId]);

  const handleFormSuccess = () => {
    setEditingIssue(null);
    setActiveTab('list');
    fetchIssues();
  };

  const handleEditIssue = (issue: Issue) => {
    setEditingIssue(issue);
    setActiveTab('add');
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Issues Management</h2>
        <p className="text-muted-foreground mt-1">
          Add and manage department issues and concerns.
        </p>
      </div>
      
      <Tabs 
        defaultValue="list" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="list">Issues List</TabsTrigger>
          <TabsTrigger value="add">{editingIssue ? 'Edit Issue' : 'Add Issue'}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <IssuesList
              issues={issues}
              deptId={deptId}
              onEditIssue={handleEditIssue}
              onRefresh={fetchIssues}
            />
          )}
        </TabsContent>
        
        <TabsContent value="add">
          <div className="max-w-2xl mx-auto">
            <IssueForm 
              deptId={deptId} 
              issue={editingIssue || undefined}
              onSuccess={handleFormSuccess} 
            />
            
            {editingIssue && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setEditingIssue(null);
                    setActiveTab('list');
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Cancel editing
                </button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
