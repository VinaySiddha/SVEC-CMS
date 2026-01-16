import { useState, useEffect } from 'react';
import { Handbook } from '@/types/handbooks';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { toast } from 'sonner';
import { MoreHorizontal, FileText, Download, Edit, Trash } from 'lucide-react';

interface HandbooksListProps {
  departments: { id: string; name: string }[];
  onEdit: (handbook: Handbook) => void;
}

export function HandbooksList({ departments, onEdit }: HandbooksListProps) {
  const [handbooks, setHandbooks] = useState<Handbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const fetchHandbooks = async () => {
    try {
      setIsLoading(true);
      const url = selectedDept === 'all' 
        ? '/api/handbooks' 
        : `/api/handbooks?dept=${selectedDept}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch handbooks');
      }
      
      const data = await response.json();
      setHandbooks(data);
    } catch (error) {
      toast.error('Failed to load handbooks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHandbooks();
  }, [selectedDept]);

  const handleDeptChange = (value: string) => {
    setSelectedDept(value);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this handbook?')) return;
    
    try {
      const response = await fetch(`/api/handbooks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete handbook');
      }
      
      toast.success('Handbook deleted successfully');
      fetchHandbooks();
    } catch (error) {
      toast.error('Failed to delete handbook');
    }
  };

  const getDepartmentName = (id: string) => {
    const dept = departments.find(d => d.id === id);
    return dept ? dept.name : id;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Handbooks</h2>
        
        <div className="flex items-center gap-4">
          <Select value={selectedDept} onValueChange={handleDeptChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
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
            variant="outline" 
            onClick={() => fetchHandbooks()}
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
      ) : handbooks.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="text-center text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-2">No handbooks found</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Edition</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {handbooks.map((handbook) => (
              <TableRow key={handbook.id}>
                <TableCell>{handbook.title}</TableCell>
                <TableCell>{getDepartmentName(handbook.dept)}</TableCell>
                <TableCell>{handbook.edition}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <a 
                          href={handbook.document_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center cursor-pointer"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(handbook)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(handbook.id)}
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
      )}
    </div>
  );
}
