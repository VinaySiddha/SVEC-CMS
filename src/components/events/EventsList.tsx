"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";

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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Plus, Calendar, FileText, Camera } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

// Types
import { Event, GalleryItem } from "@/types/events";

interface EventsListProps {
  deptId: string;
  allowAddNew?: boolean;
  isAdmin?: boolean;
  onEditEvent?: (event: Event) => void;
}

export function EventsList({ deptId, allowAddNew = true, isAdmin = false, onEditEvent }: EventsListProps) {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  // Fetch events for the department
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/departments/${deptId}/events`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        toast.error("Could not load events");
      } finally {
        setLoading(false);
      }
    };

    if (deptId) {
      fetchEvents();
    }
  }, [deptId]);

  const viewEventDetails = (event: Event) => {
    setSelectedEvent(event);
    setDetailsOpen(true);
  };

  const editEvent = (eventId: string) => {
    router.push(`/departments/${deptId}/events/edit/${eventId}`);
  };

  const confirmDeleteEvent = (eventId: string) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

  const deleteEvent = async () => {
    if (!eventToDelete) return;
    
    setDeleting(eventToDelete);
    try {
      const response = await fetch(`/api/departments/${deptId}/events?id=${eventToDelete}`, {
        method: "DELETE",
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success("Event deleted successfully");
        setEvents(events.filter(event => event.id !== eventToDelete));
      } else {
        toast.error(result.message || "Failed to delete event");
      }
    } catch (error) {
      toast.error("Failed to delete event");
    } finally {
      setDeleting(null);
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "cultural":
        return <Badge className="bg-purple-600">Cultural</Badge>;
      case "sports":
        return <Badge className="bg-green-600">Sports</Badge>;
      case "community":
        return <Badge className="bg-blue-600">Community</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  const parseGallery = (galleryData: string | GalleryItem[] | undefined): GalleryItem[] => {
    if (!galleryData) return [];
    
    if (typeof galleryData === 'string') {
      try {
        return JSON.parse(galleryData) as GalleryItem[];
      } catch (e) {
        return [];
      }
    }
    
    return Array.isArray(galleryData) ? galleryData : [];
  };

  // Render empty state
  if (!loading && events.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Department Events</CardTitle>
            <CardDescription>
              No events found for this department
            </CardDescription>
          </div>
          {allowAddNew && (
            <Button
              onClick={() => router.push(`/departments/${deptId}/events/new`)}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Event
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No events yet</h3>
            <p className="text-sm text-gray-500 max-w-md mb-4">
              Events will appear here once they are added.
            </p>
            {allowAddNew && (
              <Button onClick={() => router.push(`/departments/${deptId}/events/new`)}>
                Add Your First Event
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Department Events</CardTitle>
          <CardDescription>
            Manage events for your department
          </CardDescription>
        </div>
        {allowAddNew && (
          <Button
            onClick={() => router.push(`/departments/${deptId}/events/new`)}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Event
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map(event => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{getCategoryBadge(event.category)}</TableCell>
                    <TableCell>{format(new Date(event.date), "dd MMM yyyy")}</TableCell>
                    <TableCell>
                      {parseGallery(event.gallery).length} images
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
                          <DropdownMenuItem onClick={() => viewEventDetails(event)}>
                            View Details
                          </DropdownMenuItem>
                          {isAdmin && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => editEvent(event.id)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => confirmDeleteEvent(event.id)}
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

      {/* Event Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {selectedEvent && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                {getCategoryBadge(selectedEvent.category)}
                <span className="ml-2 text-sm">
                  {format(new Date(selectedEvent.date), "MMMM d, yyyy")}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm">{selectedEvent.description}</p>
              </div>

              {selectedEvent.proof_url && (
                <div>
                  <h3 className="font-medium mb-2">Supporting Document</h3>
                  <Link
                    href={selectedEvent.proof_url}
                    target="_blank"
                    className="flex items-center text-sm text-blue-600 hover:underline"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View Document
                  </Link>
                </div>
              )}

              <div className="mt-4">
                <h3 className="font-medium mb-2">Gallery</h3>
                {parseGallery(selectedEvent.gallery).length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {parseGallery(selectedEvent.gallery).map((item, index) => (
                      <div key={index} className="relative">
                        <img
                          src={item.url}
                          alt={item.caption || `Image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        {item.caption && (
                          <p className="text-xs mt-1 text-center text-gray-500">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No images in the gallery.
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
                    editEvent(selectedEvent.id);
                  }}
                >
                  Edit Event
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteEvent}
              disabled={!!deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
