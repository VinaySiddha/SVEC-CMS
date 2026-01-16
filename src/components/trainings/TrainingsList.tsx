"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Training } from "@/types/trainings";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
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
import { MoreHorizontal, Plus, FileText, Calendar, Clock } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface TrainingsListProps {
  deptId: string;
  isAdmin?: boolean;
  allowAddNew?: boolean;
}

export default function TrainingsList({
  deptId,
  isAdmin = false,
  allowAddNew = false,
}: TrainingsListProps) {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();

  // Fetch trainings on component mount
  useEffect(() => {
    fetchTrainings();
  }, [deptId]);

  // Function to fetch trainings
  const fetchTrainings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/departments/${deptId}/trainings`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch trainings");
      }
      
      const data = await response.json();
      setTrainings(data.trainings || []);
    } catch (error) {
      toast.error("Failed to load trainings");
    } finally {
      setLoading(false);
    }
  };

  // Function to view training details
  const viewDetails = (training: Training) => {
    setSelectedTraining(training);
    setDetailsOpen(true);
  };

  // Function to edit training
  const editTraining = (id: string) => {
    router.push(`/departments/${deptId}/trainings/edit/${id}`);
  };

  // Function to confirm deletion
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  // Function to delete training
  const deleteTraining = async () => {
    if (!deleteId) return;
    
    setDeleting(true);
    try {
      const response = await fetch(
        `/api/departments/${deptId}/trainings/${deleteId}`,
        {
          method: "DELETE",
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to delete training");
      }
      
      // Remove from local state
      setTrainings((prev) =>
        prev.filter((item) => item.id !== deleteId)
      );
      
      toast.success("Training deleted successfully");
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete training");
    } finally {
      setDeleting(false);
    }
  };

  // Calculate duration between two dates
  const getDurationText = (dateFrom: string, dateTo: string) => {
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    
    // Same day
    if (startDate.toDateString() === endDate.toDateString()) {
      return format(startDate, "MMM d, yyyy");
    }
    
    // Same month and year
    if (startDate.getMonth() === endDate.getMonth() && 
        startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`;
    }
    
    // Same year
    if (startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
    }
    
    // Different years
    return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  };

  // Render empty state
  if (!loading && trainings.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Professional Trainings</CardTitle>
            <CardDescription>
              No trainings found for this department
            </CardDescription>
          </div>
          {allowAddNew && (
            <Button
              onClick={() => router.push(`/departments/${deptId}/trainings/new`)}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Training
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No trainings yet</h3>
            <p className="text-sm text-gray-500 max-w-md mb-4">
              Professional development and training courses will appear here once added.
            </p>
            {allowAddNew && (
              <Button
                onClick={() => router.push(`/departments/${deptId}/trainings/new`)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Your First Training
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
            <CardTitle>Professional Trainings</CardTitle>
            <CardDescription>
              {loading
                ? "Loading trainings..."
                : `${trainings.length} training${
                    trainings.length === 1 ? "" : "s"
                  } found`}
            </CardDescription>
          </div>
          {allowAddNew && (
            <Button
              onClick={() => router.push(`/departments/${deptId}/trainings/new`)}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Training
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
                    <TableHead>Title</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead className="hidden md:table-cell">Duration</TableHead>
                    <TableHead className="hidden md:table-cell">Hours</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainings.map((training) => (
                    <TableRow key={training.id}>
                      <TableCell className="font-medium">{training.title}</TableCell>
                      <TableCell>{training.provider}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getDurationText(training.date_from, training.date_to)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {training.hours}
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
                              onClick={() => viewDetails(training)}
                            >
                              View Details
                            </DropdownMenuItem>
                            {isAdmin && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => editTraining(training.id)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => confirmDelete(training.id)}
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

      {/* Training Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {selectedTraining && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedTraining.title}</DialogTitle>
              <DialogDescription>
                <Badge variant="outline" className="mt-2">
                  {selectedTraining.provider}
                </Badge>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-gray-500">
                    {getDurationText(selectedTraining.date_from, selectedTraining.date_to)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Hours</p>
                  <p className="text-sm text-gray-500">
                    {selectedTraining.hours} hour{selectedTraining.hours !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {selectedTraining.certificate_url && (
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Certificate</p>
                    <a
                      href={selectedTraining.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Certificate
                    </a>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                Close
              </Button>
              {isAdmin && (
                <Button
                  onClick={() => {
                    setDetailsOpen(false);
                    editTraining(selectedTraining.id);
                  }}
                >
                  Edit Training
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
              Are you sure you want to delete this training? This action
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
              onClick={deleteTraining}
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
