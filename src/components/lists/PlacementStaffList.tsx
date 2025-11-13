import { useState, useEffect } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  MoreHorizontal, 
  Edit, 
  Trash,
  Users,
  RefreshCw,
  Search
} from 'lucide-react';

interface PlacementStaff {
  id: number;
  name: string;
  designation: string;
  branch: string;
  email: string;
}

interface PlacementStaffListProps {
  onEdit: (staff: PlacementStaff) => void;
}

export function PlacementStaffList({ onEdit }: PlacementStaffListProps) {
  const [staff, setStaff] = useState<PlacementStaff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/placement/staff');
      if (!response.ok) {
        throw new Error('Failed to fetch staff');
      }
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
      toast.error('Failed to load staff members');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return;
    
    try {
      const response = await fetch(`/api/placement/staff/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete staff member');
      }
      
      toast.success('Staff member deleted successfully');
      fetchStaff(); // Refresh the list
    } catch (error) {
      console.error('Error deleting staff member:', error);
      toast.error('Failed to delete staff member');
    }
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Placement Staff ({staff.length})
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-[250px]"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={fetchStaff}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <p className="mt-4 text-lg font-medium">
              {searchQuery ? 'No staff members found' : 'No placement staff found'}
            </p>
            <p className="text-muted-foreground">
              {searchQuery 
                ? 'Try adjusting your search criteria.' 
                : 'Add new staff members to get started.'
              }
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">S.No</TableHead>
                  <TableHead>Faculty Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Email ID</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member, index) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {member.name}
                    </TableCell>
                    <TableCell>
                      {member.designation}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {member.branch || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {member.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => onEdit(member)}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(member.id)}
                            className="text-destructive focus:text-destructive cursor-pointer"
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
      </CardContent>

      {filteredStaff.length > 0 && (
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Showing {filteredStaff.length} of {staff.length} staff members
          </p>
        </CardFooter>
      )}
    </Card>
  );
}