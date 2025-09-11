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
import { MoreHorizontal, Plus, Calendar, FileText, Award, Medal } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";

// Types
import { Hackathon, Winner } from "@/types/hackathons";

interface HackathonsListProps {
  deptId: string;
  allowAddNew?: boolean;
  isAdmin?: boolean;
  onEditHackathon?: (hackathon: Hackathon) => void;
}

export function HackathonsList({ deptId, allowAddNew = true, isAdmin = false, onEditHackathon }: HackathonsListProps) {
  const router = useRouter();
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string | null>(null);

  // Fetch hackathons on component mount
  useEffect(() => {
    fetchHackathons();
  }, [deptId, filterLevel]);

  // Fetch hackathons from API
  const fetchHackathons = async () => {
    setLoading(true);
    try {
      let url = `/api/hackathons?dept=${deptId}`;
      if (filterLevel) {
        url += `&level=${filterLevel}`;
      }
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch hackathons");
      }
      
      const data = await response.json();
      setHackathons(data.hackathons || []);
    } catch (error) {
      console.error("Error fetching hackathons:", error);
      toast.error("Failed to load hackathons");
    } finally {
      setLoading(false);
    }
  };

  // Delete a hackathon
  const deleteHackathon = async (id: string) => {
    try {
      const response = await fetch(`/api/hackathons?id=${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete hackathon");
      }
      
      // Remove the deleted hackathon from the state
      setHackathons((prev) => prev.filter((hackathon) => hackathon.id !== id));
      toast.success("Hackathon deleted successfully");
    } catch (error) {
      console.error("Error deleting hackathon:", error);
      toast.error("Failed to delete hackathon");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  // Handle edit button click
  const handleEdit = (hackathon: Hackathon) => {
    if (onEditHackathon) {
      onEditHackathon(hackathon);
    } else if (isAdmin) {
      router.push(`/admin/hackathons/edit/${hackathon.id}`);
    }
  };

  // Handle delete button click
  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  // Parse winners from hackathon
  const parseWinners = (winnersData: string | Winner[] | undefined): Winner[] => {
    if (!winnersData) return [];
    
    if (typeof winnersData === 'string') {
      try {
        return JSON.parse(winnersData) as Winner[];
      } catch (e) {
        return [];
      }
    }
    
    return Array.isArray(winnersData) ? winnersData : [];
  };

  // Get badge color for hackathon level
  const getLevelBadgeColor = (level: string): string => {
    switch (level) {
      case 'International':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case 'National':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case 'State':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Hackathons</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {deptId !== "all" 
              ? `Hackathons for ${deptId} department`
              : "All hackathons across departments"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterLevel === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterLevel(null)}
              className="h-8"
            >
              All
            </Button>
            <Button
              variant={filterLevel === "Internal" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterLevel("Internal")}
              className="h-8"
            >
              Internal
            </Button>
            <Button
              variant={filterLevel === "State" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterLevel("State")}
              className="h-8"
            >
              State
            </Button>
            <Button
              variant={filterLevel === "National" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterLevel("National")}
              className="h-8"
            >
              National
            </Button>
            <Button
              variant={filterLevel === "International" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterLevel("International")}
              className="h-8"
            >
              International
            </Button>
          </div>

          {(isAdmin && allowAddNew) && (
            <Button 
              size="sm"
              className="ml-2" 
              onClick={() => router.push("/admin/hackathons/new")}
            >
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : hackathons.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No hackathons found</p>
          {(isAdmin && allowAddNew) && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => router.push("/admin/hackathons/new")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Hackathon
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Proof</TableHead>
                {isAdmin && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {hackathons.map((hackathon) => (
                <TableRow key={hackathon.id}>
                  <TableCell className="font-medium">
                    {hackathon.title}
                    {parseWinners(hackathon.winners).length > 0 && (
                      <div className="mt-1 flex items-center">
                        <Medal className="h-3.5 w-3.5 text-amber-500 mr-1" />
                        <span className="text-xs text-gray-500">
                          {parseWinners(hackathon.winners).length} winner(s)
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getLevelBadgeColor(hackathon.level)} variant="outline">
                      {hackathon.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{hackathon.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-3.5 w-3.5 text-gray-500" />
                      {format(new Date(hackathon.date), "MMM d, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    {hackathon.proof_url ? (
                      <a 
                        href={hackathon.proof_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <FileText className="mr-1 h-3.5 w-3.5" />
                        <span>View</span>
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm italic">None</span>
                    )}
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
                          <DropdownMenuItem onClick={() => handleEdit(hackathon)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(hackathon.id)}
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
              hackathon and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => deleteId && deleteHackathon(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
