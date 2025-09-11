import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LibraryResourceForm } from '@/components/forms/LibraryResourceForm';
import { LibraryResourcesList } from '@/components/lists/LibraryResourcesList';
import { LibraryResource } from '@/types/library-resources';

export default function AdminLibraryResourcesPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedResource, setSelectedResource] = useState<LibraryResource | undefined>(undefined);
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

  const handleEditResource = (resource: LibraryResource) => {
    setSelectedResource(resource);
    setActiveTab('edit');
  };

  const handleAddSuccess = () => {
    setActiveTab('list');
  };

  const handleEditSuccess = () => {
    setSelectedResource(undefined);
    setActiveTab('list');
  };

  const handleAddNew = () => {
    setSelectedResource(undefined);
    setActiveTab('add');
  };

  const handleBackToList = () => {
    setSelectedResource(undefined);
    setActiveTab('list');
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Library Resources Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list">Resources List</TabsTrigger>
            <TabsTrigger value="add">Add New Resource</TabsTrigger>
            {selectedResource && (
              <TabsTrigger value="edit">Edit Resource</TabsTrigger>
            )}
          </TabsList>

          {activeTab !== 'list' && (
            <Button variant="outline" onClick={handleBackToList}>
              Back to List
            </Button>
          )}
          
          {activeTab === 'list' && (
            <Button onClick={handleAddNew}>
              Add New Resource
            </Button>
          )}
        </div>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <LibraryResourcesList 
                departments={departments}
                onEdit={handleEditResource}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Library Resource</CardTitle>
            </CardHeader>
            <CardContent>
              <LibraryResourceForm
                departments={departments}
                onSuccess={handleAddSuccess}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          {selectedResource && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Library Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <LibraryResourceForm
                  resource={selectedResource}
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
