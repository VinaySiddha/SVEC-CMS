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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Plus, FileText, FileCheck, Clock, Filter } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";

// Types
import { Resource } from "@/types/resources";

interface ResourcesListProps {
  deptId: string;
  allowAddNew?: boolean;
  isAdmin?: boolean;
  onEditResource?: (resource: Resource) => void;
}

export function ResourcesList({ deptId, allowAddNew = true, isAdmin = false, onEditResource }: ResourcesListProps) {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filterRegulation, setFilterRegulation] = useState<string | null>(null);
  const [filterSemester, setFilterSemester] = useState<string | null>(null);

  // Fetch resources on component mount
  useEffect(() => {
    fetchResources();
  }, [deptId, filterRegulation, filterSemester]);

  // Fetch resources from API
  const fetchResources = async () => {
    setLoading(true);
    try {
      let url = `/api/resources?dept=${deptId}`;
      if (filterRegulation) {
        url += `&regulation=${filterRegulation}`;
      }
      if (filterSemester) {
        url += `&semester=${filterSemester}`;
      }
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }
      
      const data = await response.json();
      setResources(data.resources || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  // Delete a resource
  const deleteResource = async (id: string) => {
    try {
      const response = await fetch(`/api/resources?id=${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete resource");
      }
      
      // Remove the deleted resource from the state
      setResources((prev) => prev.filter((resource) => resource.id !== id));
      toast.success("Resource deleted successfully");
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  // Handle edit button click
  const handleEdit = (resource: Resource) => {
    if (onEditResource) {
      onEditResource(resource);
    } else if (isAdmin) {
      router.push(`/admin/resources/edit/${resource.id}`);
    }
  };

  // Handle delete button click
  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  // Get unique regulation values from resources
  const regulations = Array.from(new Set(resources.map(r => r.regulation))).sort();
  
  // Get unique semester values from resources
  const semesters = Array.from(new Set(resources.map(r => r.semester))).sort();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-semibold">Academic Resources</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {deptId !== "all" 
              ? `Resources for ${deptId} department`
              : "All resources across departments"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex flex-col space-y-2 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filters</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Regulation:</span>
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant={filterRegulation === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterRegulation(null)}
                    className="h-7 text-xs"
                  >
                    All
                  </Button>
                  {regulations.map(reg => (
                    <Button
                      key={reg}
                      variant={filterRegulation === reg ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterRegulation(reg)}
                      className="h-7 text-xs"
                    >
                      {reg}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Semester:</span>
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant={filterSemester === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterSemester(null)}
                    className="h-7 text-xs"
                  >
                    All
                  </Button>
                  {semesters.map(sem => (
                    <Button
                      key={sem}
                      variant={filterSemester === sem ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterSemester(sem)}
                      className="h-7 text-xs"
                    >
                      {sem}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {(isAdmin && allowAddNew) && (
            <Button 
              size="sm"
              className="ml-auto" 
              onClick={() => router.push("/admin/resources/new")}
            >
              <Plus className="mr-1 h-4 w-4" /> Add Resource
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No resources found</p>
          {(isAdmin && allowAddNew) && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => router.push("/admin/resources/new")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Regulation</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Downloads</TableHead>
                {isAdmin && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">
                    {resource.title}
                  </TableCell>
                  <TableCell>{resource.subject}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {resource.regulation}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                      {resource.semester}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {resource.ppt_url ? (
                        <a 
                          href={resource.ppt_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:underline text-sm"
                        >
                          <FileText className="mr-1 h-3.5 w-3.5" />
                          <span>Presentation</span>
                        </a>
                      ) : null}
                      
                      {resource.qbank_url ? (
                        <a 
                          href={resource.qbank_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-green-600 hover:underline text-sm"
                        >
                          <FileCheck className="mr-1 h-3.5 w-3.5" />
                          <span>Question Bank</span>
                        </a>
                      ) : null}
                      
                      {resource.old_paper_url ? (
                        <a 
                          href={resource.old_paper_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-amber-600 hover:underline text-sm"
                        >
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          <span>Old Papers</span>
                        </a>
                      ) : null}
                      
                      {!resource.ppt_url && !resource.qbank_url && !resource.old_paper_url && (
                        <span className="text-gray-400 text-xs italic">No files</span>
                      )}
                    </div>
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(resource)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(resource.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              resource and all associated files.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => deleteId && deleteResource(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
