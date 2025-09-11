"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";

// Types
import { Association, AssociationEvent } from "@/types/associations";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Calendar, FileText, Users } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Association, AssociationEvent } from "@/types/associations";

interface AssociationsListProps {
  deptId: string;
  isAdmin?: boolean;
  allowAddNew?: boolean;
  onEditAssociation?: (association: Association) => void;
}

export function AssociationsList({
  deptId,
  isAdmin = false,
  allowAddNew = false,
  onEditAssociation,
}: AssociationsListProps) {
  const [associations, setAssociations] = useState<Association[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssociation, setSelectedAssociation] = useState<Association | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();

  // Fetch associations on component mount
  useEffect(() => {
    fetchAssociations();
  }, [deptId]);

  // Function to fetch associations
  const fetchAssociations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/departments/${deptId}/associations`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch associations");
      }
      
      const data = await response.json();
      setAssociations(data.associations || []);
    } catch (error) {
      console.error("Error fetching associations:", error);
      toast.error("Failed to load associations");
    } finally {
      setLoading(false);
    }
  };

  // Function to view association details
  const viewDetails = (association: Association) => {
    // Parse gallery JSON if it's a string
    if (typeof association.gallery === 'string') {
      try {
        association.gallery = JSON.parse(association.gallery);
      } catch (e) {
        association.gallery = [];
      }
    }
    
    setSelectedAssociation(association);
    setDetailsOpen(true);
  };

  // Function to edit association
  const editAssociation = (id: string) => {
    router.push(`/departments/${deptId}/associations/edit/${id}`);
  };

  // Function to confirm deletion
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  // Function to delete association
  const deleteAssociation = async () => {
    if (!deleteId) return;
    
    setDeleting(true);
    try {
      const response = await fetch(
        `/api/departments/${deptId}/associations/${deleteId}`,
        {
          method: "DELETE",
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to delete association");
      }
      
      // Remove from local state
      setAssociations((prev) =>
        prev.filter((item) => item.id !== deleteId)
      );
      
      toast.success("Association deleted successfully");
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting association:", error);
      toast.error("Failed to delete association");
    } finally {
      setDeleting(false);
    }
  };

  // Function to get event count
  const getEventCount = (association: Association): number => {
    if (!association.gallery) return 0;
    
    if (typeof association.gallery === 'string') {
      try {
        return JSON.parse(association.gallery).length;
      } catch (e) {
        return 0;
      }
    }
    
    return Array.isArray(association.gallery) ? association.gallery.length : 0;
  };

  // Render empty state
  if (!loading && associations.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Student Associations</CardTitle>
            <CardDescription>
              No associations found for this department
            </CardDescription>
          </div>
          {allowAddNew && (
            <Button
              onClick={() => router.push(`/departments/${deptId}/associations/new`)}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Association
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Users className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No associations yet</h3>
            <p className="text-sm text-gray-500 max-w-md mb-4">
              Student associations and clubs will appear here once they are added.
            </p>
            {allowAddNew && (
              <Button
                onClick={() => router.push(`/departments/${deptId}/associations/new`)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Your First Association
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Student Associations</CardTitle>
            <CardDescription>
              {loading
                ? "Loading associations..."
                : `${associations.length} association${
                    associations.length === 1 ? "" : "s"
                  } found`}
            </CardDescription>
          </div>
          {allowAddNew && (
            <Button
              onClick={() => router.push(`/departments/${deptId}/associations/new`)}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Association
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Events</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {associations.map((association) => (
                    <TableRow key={association.id}>
                      <TableCell className="font-medium">{association.name}</TableCell>
                      <TableCell>{association.role}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getEventCount(association)} event(s)
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(association.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => viewDetails(association)}
                            >
                              View Details
                            </DropdownMenuItem>
                            {isAdmin && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => editAssociation(association.id)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => confirmDelete(association.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </>
                            )}
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
      </Card>

      {/* Association Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {selectedAssociation && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedAssociation.name}</DialogTitle>
              <DialogDescription>
                <Badge variant="outline" className="mt-2">
                  {selectedAssociation.role}
                </Badge>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm">{selectedAssociation.description}</p>
              </div>

              {selectedAssociation.proof_url && (
                <div>
                  <h3 className="font-medium mb-2">Supporting Document</h3>
                  <Link
                    href={selectedAssociation.proof_url}
                    target="_blank"
                    className="flex items-center text-sm text-blue-600 hover:underline"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View Document
                  </Link>
                </div>
              )}

              <div className="mt-4">
                <h3 className="font-medium mb-2">Events</h3>
                {Array.isArray(selectedAssociation.gallery) &&
                selectedAssociation.gallery.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {selectedAssociation.gallery.map((event, index) => (
                      <AccordionItem
                        key={index}
                        value={`event-${index}`}
                      >
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <span>{event.title}</span>
                            <Badge variant="outline" className="ml-2">
                              {format(new Date(event.date), "MMM d, yyyy")}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="mb-2">{event.description}</p>
                          {event.image_url && (
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="mt-2 rounded-md max-h-48 object-cover"
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-sm text-gray-500">
                    No events associated with this association.
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                Close
              </Button>
              {isAdmin && (
                <Button
                  onClick={() => {
                    setDetailsOpen(false);
                    editAssociation(selectedAssociation.id);
                  }}
                >
                  Edit Association
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this association? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteAssociation}
              disabled={deleting}
            >
              {deleting ? <LoadingSpinner size="sm" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
