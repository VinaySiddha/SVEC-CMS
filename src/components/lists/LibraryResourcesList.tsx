import { useState, useEffect } from 'react';
import { LibraryResource, ResourceType } from '@/types/library-resources';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  MoreHorizontal, 
  FileText, 
  Download, 
  Edit, 
  Trash,
  BookOpen,
  BookMarked,
  Newspaper,
  FileQuestion,
  File
} from 'lucide-react';

interface LibraryResourcesListProps {
  departments: { id: string; name: string }[];
  onEdit: (resource: LibraryResource) => void;
}

export function LibraryResourcesList({
  departments,
  onEdit,
}: LibraryResourcesListProps) {
  const [resources, setResources] = useState<LibraryResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      let url = '/api/library-resources?';
      
      const params = new URLSearchParams();
      if (selectedDept !== 'all') params.append('dept', selectedDept);
      if (selectedType !== 'all') params.append('type', selectedType);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`/api/library-resources?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch library resources');
      }
      
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching library resources:', error);
      toast.error('Failed to load library resources');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [selectedDept, selectedType]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    
    try {
      const response = await fetch(`/api/library-resources/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }
      
      toast.success('Resource deleted successfully');
      fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    }
  };

  const getDepartmentName = (id: string) => {
    const dept = departments.find(d => d.id === id);
    return dept ? dept.name : id;
  };

  const getResourceTypeIcon = (type: ResourceType) => {
    switch(type) {
      case 'Book':
        return <BookOpen className="h-4 w-4 mr-2" />;
      case 'Journal':
        return <BookMarked className="h-4 w-4 mr-2" />;
      case 'Magazine':
        return <Newspaper className="h-4 w-4 mr-2" />;
      case 'QuestionBank':
        return <FileQuestion className="h-4 w-4 mr-2" />;
      default:
        return <File className="h-4 w-4 mr-2" />;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResources();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h2 className="text-xl font-semibold">Library Resources</h2>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <form onSubmit={handleSearch} className="flex-1 sm:flex-none sm:min-w-[200px]">
            <Input
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-[150px]">
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
          
          <Select value={selectedDept} onValueChange={setSelectedDept}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            type="button"
            variant="outline" 
            onClick={fetchResources}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-muted/20 rounded-lg p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <p className="mt-4 text-lg font-medium">No resources found</p>
          <p className="text-muted-foreground">Try changing your search criteria or add new resources.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[220px]">Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Author/Publisher</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Inventory No.</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getResourceTypeIcon(resource.resource_type)}
                      {resource.resource_type}
                    </div>
                  </TableCell>
                  <TableCell>{resource.author}</TableCell>
                  <TableCell>{resource.year}</TableCell>
                  <TableCell>{resource.inventory_no}</TableCell>
                  <TableCell>{getDepartmentName(resource.dept)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {resource.file_url && (
                          <>
                            <DropdownMenuItem 
                              onClick={() => window.open(resource.file_url, '_blank')}
                              className="cursor-pointer"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View File
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a 
                                href={resource.file_url} 
                                download
                                className="flex items-center cursor-pointer"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem onClick={() => onEdit(resource)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(resource.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
