import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LibraryResource, ResourceType } from '@/types/library-resources';
import { 
  BookOpen,
  BookMarked,
  Newspaper,
  FileQuestion,
  File,
  Search,
  Download
} from 'lucide-react';

export default function DepartmentLibraryPage() {
  const router = useRouter();
  const { deptId } = router.query;
  
  const [resources, setResources] = useState<LibraryResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [departmentName, setDepartmentName] = useState('');
  
  // Map of department IDs to names
  const departmentMap: Record<string, string> = {
    'cse': 'Computer Science Engineering',
    'ece': 'Electronics & Communication Engineering',
    'eee': 'Electrical & Electronics Engineering',
    'mech': 'Mechanical Engineering',
    'civil': 'Civil Engineering',
    'it': 'Information Technology',
    'aiml': 'Artificial Intelligence & Machine Learning',
    'ds': 'Data Science',
  };

  useEffect(() => {
    if (deptId && typeof deptId === 'string') {
      setDepartmentName(departmentMap[deptId] || deptId.toUpperCase());
      fetchResources(deptId);
    }
  }, [deptId, selectedType]);

  const fetchResources = async (departmentId: string) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append('dept', departmentId);
      
      if (selectedType !== 'all') {
        params.append('type', selectedType);
      }
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      const response = await fetch(`/api/library-resources?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (deptId && typeof deptId === 'string') {
      fetchResources(deptId);
    }
  };

  const getResourceTypeIcon = (type: ResourceType) => {
    switch(type) {
      case 'Book':
        return <BookOpen className="h-6 w-6" />;
      case 'Journal':
        return <BookMarked className="h-6 w-6" />;
      case 'Magazine':
        return <Newspaper className="h-6 w-6" />;
      case 'QuestionBank':
        return <FileQuestion className="h-6 w-6" />;
      default:
        return <File className="h-6 w-6" />;
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">{departmentName} Library Resources</h1>
        <p className="text-muted-foreground">
          Browse books, journals, magazines, and other resources available in the department library
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, author or inventory number..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        <div className="flex gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Book">Books</SelectItem>
              <SelectItem value="Journal">Journals</SelectItem>
              <SelectItem value="Magazine">Magazines</SelectItem>
              <SelectItem value="QuestionBank">Question Banks</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Button type="button" onClick={() => deptId && typeof deptId === 'string' && fetchResources(deptId)}>
            Search
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      ) : resources.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center">
              <BookOpen className="h-16 w-16 text-muted-foreground/60" />
              <h3 className="mt-4 text-lg font-medium">No resources found</h3>
              <p className="mt-2 text-muted-foreground text-center max-w-md">
                No library resources match your search criteria. Try adjusting your filters or search terms.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="flex flex-col overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 rounded-md">
                    {getResourceTypeIcon(resource.resource_type)}
                  </div>
                  <div className="px-2 py-1 bg-secondary/50 rounded text-xs">
                    {resource.resource_type}
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">{resource.title}</CardTitle>
                <CardDescription>By: {resource.author}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span>{resource.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inventory No:</span>
                    <span className="font-mono">{resource.inventory_no}</span>
                  </div>
                </div>
              </CardContent>
              {resource.file_url && (
                <CardFooter className="pt-0">
                  <a 
                    href={resource.file_url} 
                    download
                    className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resource
                  </a>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
