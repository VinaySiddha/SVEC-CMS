import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HandbookForm } from '@/components/forms/HandbookForm2';
import { HandbooksList } from '@/components/lists/HandbooksList';
import { Handbook } from '@/types/handbooks';

export default function AdminHandbooksPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedHandbook, setSelectedHandbook] = useState<Handbook | undefined>(undefined);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([
    { id: 'cse', name: 'Computer Science Engineering' },
    { id: 'ece', name: 'Electronics & Communication Engineering' },
    { id: 'eee', name: 'Electrical & Electronics Engineering' },
    { id: 'mech', name: 'Mechanical Engineering' },
    { id: 'civil', name: 'Civil Engineering' },
    { id: 'it', name: 'Information Technology' },
    { id: 'aiml', name: 'AI & ML' },
    { id: 'ds', name: 'Data Science' },
  ]);

  const handleEditHandbook = (handbook: Handbook) => {
    setSelectedHandbook(handbook);
    setActiveTab('edit');
  };

  const handleAddSuccess = () => {
    setActiveTab('list');
  };

  const handleEditSuccess = () => {
    setSelectedHandbook(undefined);
    setActiveTab('list');
  };

  const handleAddNew = () => {
    setSelectedHandbook(undefined);
    setActiveTab('add');
  };

  const handleBackToList = () => {
    setSelectedHandbook(undefined);
    setActiveTab('list');
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Handbooks Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list">Handbooks List</TabsTrigger>
            <TabsTrigger value="add">Add New Handbook</TabsTrigger>
            {selectedHandbook && (
              <TabsTrigger value="edit">Edit Handbook</TabsTrigger>
            )}
          </TabsList>

          {activeTab !== 'list' && (
            <Button variant="outline" onClick={handleBackToList}>
              Back to List
            </Button>
          )}
          
          {activeTab === 'list' && (
            <Button onClick={handleAddNew}>
              Add New Handbook
            </Button>
          )}
        </div>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <HandbooksList 
                departments={departments}
                onEdit={handleEditHandbook}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Handbook</CardTitle>
            </CardHeader>
            <CardContent>
              <HandbookForm
                departments={departments}
                onSuccess={handleAddSuccess}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          {selectedHandbook && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Handbook</CardTitle>
              </CardHeader>
              <CardContent>
                <HandbookForm
                  handbook={selectedHandbook}
                  departments={departments}
                  onSuccess={handleEditSuccess}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
