'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { FacultyProfile } from '@/pages/api/faculty-profiles';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface FacultyProfilesListProps {
  dept: string;
  onEdit: (profile: FacultyProfile) => void;
  onView: (profile: FacultyProfile) => void;
}

export function FacultyProfilesList({
  dept,
  onEdit,
  onView,
}: FacultyProfilesListProps) {
  const [profiles, setProfiles] = useState<FacultyProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch faculty profiles
  const fetchProfiles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/faculty-profiles?dept=${dept}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch faculty profiles');
      }
      
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching faculty profiles:', error);
      toast.error('Failed to load faculty profiles');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete faculty profile
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this faculty profile?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/faculty-profiles/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete faculty profile');
      }
      
      toast.success('Faculty profile deleted successfully');
      fetchProfiles();
    } catch (error) {
      console.error('Error deleting faculty profile:', error);
      toast.error('Failed to delete faculty profile');
    }
  };

  // Load profiles on mount
  useEffect(() => {
    fetchProfiles();
  }, [dept]);

  // Get status badge
  const getStatusBadge = (status: string = 'pending') => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="font-medium text-lg mb-2">No faculty profiles found</h3>
          <p className="text-gray-500">
            Create a new faculty profile to get started
          </p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      {profile.photo ? (
                        <Image
                          src={profile.photo}
                          alt={profile.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No img</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.designation}</TableCell>
                  <TableCell>{profile.qualification}</TableCell>
                  <TableCell>{profile.experience} years</TableCell>
                  <TableCell>{getStatusBadge(profile.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onView(profile)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(profile)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(profile.id)}>
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
