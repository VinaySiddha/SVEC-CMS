"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useToast } from "../ui/use-toast";
import LoadingSpinner from "../LoadingSpinner";
import { FileText, Trash2, Download } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface PlacementData {
  id: number;
  academic_year: string;
  total_offers: number;
  highest_package: number;
  average_package: number;
  report_url: string | null;
}

interface PlacementsListProps {
  deptId: string;
  isAdmin?: boolean;
  onRefresh?: () => void;
}

export default function PlacementsList({ deptId, isAdmin = false, onRefresh }: PlacementsListProps) {
  const [placements, setPlacements] = useState<PlacementData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const fetchPlacements = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/departments/${deptId}/placements`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch placements data');
      }
      
      const data = await response.json();
      setPlacements(data.placements);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load placement data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, [deptId]);

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/departments/${deptId}/placements`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete placement entry');
      }
      
      // Remove the deleted item from the state
      setPlacements(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Success",
        description: "Placement entry deleted successfully",
      });
      
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete placement entry",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (placements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Placement Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            No placement statistics available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Placement Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Academic Year</TableHead>
                <TableHead>Total Offers</TableHead>
                <TableHead>Highest Package (LPA)</TableHead>
                <TableHead>Average Package (LPA)</TableHead>
                <TableHead>Report</TableHead>
                {isAdmin && <TableHead className="w-16">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {placements.map((placement) => (
                <TableRow key={placement.id}>
                  <TableCell>{placement.academic_year}</TableCell>
                  <TableCell>{placement.total_offers}</TableCell>
                  <TableCell>{placement.highest_package.toFixed(2)}</TableCell>
                  <TableCell>{placement.average_package.toFixed(2)}</TableCell>
                  <TableCell>
                    {placement.report_url ? (
                      <a 
                        href={placement.report_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <FileText size={16} className="mr-1" />
                        <span>Report</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-sm">No report</span>
                    )}
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            disabled={isDeleting}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the 
                              placement statistics for {placement.academic_year}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(placement.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
