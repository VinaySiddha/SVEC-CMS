
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Home, Newspaper } from 'lucide-react';

const ContentManagementPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground">
          Select a page to edit its content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Pages</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 text-left">
            <Home className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Home Page</h3>
              <p className="text-sm text-muted-foreground">Stats, Quick Links, News</p>
            </div>
          </button>
          <button className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 text-left">
            <Book className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">About Page</h3>
              <p className="text-sm text-muted-foreground">Achievements, Leadership</p>
            </div>
          </button>
          <button className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 text-left">
            <Newspaper className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Academics Page</h3>
              <p className="text-sm text-muted-foreground">Programs, Features</p>
            </div>
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementPage;
